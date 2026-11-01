// Public inquiry endpoint for Cloudflare Workers. Not deployed until DNS, email and live tests are approved.
const ALLOWED_ORIGINS=new Set(['https://thyncandthryve.com','https://www.thyncandthryve.com']);
const reply=(code,body,origin)=>new Response(code===204?null:JSON.stringify(body),{status:code,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','access-control-allow-origin':ALLOWED_ORIGINS.has(origin)?origin:'https://thyncandthryve.com','vary':'Origin','access-control-allow-methods':'POST, OPTIONS','access-control-allow-headers':'content-type'}});
const clean=(data,key,max)=>{const value=data[key];return typeof value==='string'&&value.length<=max?value.trim():null;};
export default {
 async fetch(request,env){
  const origin=request.headers.get('origin')||'';
  if(!ALLOWED_ORIGINS.has(origin))return reply(403,{ok:false,error:'Origin not allowed'},origin);
  if(request.method==='OPTIONS')return reply(204,{ok:true},origin);
  if(request.method!=='POST')return reply(405,{ok:false,error:'Method not allowed'},origin);
  if(!env.TURNSTILE_SECRET||!env.RECIPIENT_EMAIL||env.EMAIL_ENABLED!=='1')return reply(503,{ok:false,error:'Inquiry service is not configured'},origin);
  if(Number(request.headers.get('content-length')||0)>16000)return reply(413,{ok:false,error:'Submission is too large'},origin);
  const type=request.headers.get('content-type')||'';
  if(!type.startsWith('application/json'))return reply(415,{ok:false,error:'Expected JSON'},origin);
  let data;try{const raw=await request.text();if(raw.length>16000)return reply(413,{ok:false,error:'Submission is too large'},origin);data=JSON.parse(raw);}catch{return reply(400,{ok:false,error:'Invalid data'},origin);}
  const name=clean(data,'name',120),email=clean(data,'email',254),message=clean(data,'message',3000),company=clean(data,'company',160),interest=clean(data,'interest',80),token=clean(data,'token',2048);
  const source=data.source==='thryvems'?'thryvems':data.source==='company'?'company':null;
  if(!name||!email||!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)||message===null||company===null||interest===null||!token||!source)return reply(400,{ok:false,error:'Complete the form and human check'},origin);
  const result=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined})}).then(r=>r.json()).catch(()=>({success:false}));
  if(!result.success||!['thyncandthryve.com','www.thyncandthryve.com'].includes(result.hostname)||result.action!==(source==='thryvems'?'product_inquiry':'company_inquiry'))return reply(403,{ok:false,error:'Human verification unsuccessful'},origin);
  const subject=source==='thryvems'?'ThryveMS walkthrough enquiry':'Thync & Thryve service enquiry';
  // FormSubmit hosts the mail delivery step only. Never expose the recipient to the browser,
  // and do not send until a valid server-verified, single-use Turnstile token is accepted.
  if(!/^[^\\s@/]+@[^\\s@/]+\\.[^\\s@/]+$/.test(env.RECIPIENT_EMAIL))return reply(503,{ok:false,error:'Inquiry service is not configured'},origin);
  try{
   const response=await fetch('https://formsubmit.co/ajax/'+env.RECIPIENT_EMAIL,{
    method:'POST',
    headers:{'content-type':'application/json','accept':'application/json'},
    body:JSON.stringify({name,email,company,interest,message,source,_subject:subject,_captcha:'false'}),
    redirect:'error',
    signal:AbortSignal.timeout(8000)
   });
   if(!response.ok)return reply(502,{ok:false,error:'Delivery unavailable'},origin);
   const result=await response.json();
   if(result?.success!==true&&result?.success!=='true')return reply(502,{ok:false,error:'Delivery unavailable'},origin);
   return reply(200,{ok:true},origin);
  }catch{return reply(502,{ok:false,error:'Delivery unavailable'},origin);}
 }
};
