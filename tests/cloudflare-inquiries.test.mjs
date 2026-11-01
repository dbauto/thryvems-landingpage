import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../workers/inquiries/index.mjs';
const origin='https://thyncandthryve.com';
const data={name:'Synthetic Test',email:'synthetic@example.invalid',company:'Sample Co',interest:'general',message:'Test only',source:'company',token:'test-token'};
const request=(payload=data,from=origin)=>new Request('https://worker.example.invalid/',{method:'POST',headers:{Origin:from,'content-type':'application/json'},body:JSON.stringify(payload)});
const env=(changes={})=>({EMAIL_ENABLED:'1',TURNSTILE_SECRET:'mock-secret',RECIPIENT_EMAIL:'test@example.invalid',...changes});
test('does not send when disabled',async()=>{const x=await worker.fetch(request(),env({EMAIL_ENABLED:'0'}));assert.equal(x.status,503);});
test('rejects unexpected origins',async()=>{const x=await worker.fetch(request(data,'https://malicious.example.invalid'),env());assert.equal(x.status,403);});
test('rejects incomplete input before siteverify',async()=>{const x=await worker.fetch(request({...data,email:'invalid'}),env());assert.equal(x.status,400);});
test('rejects challenge failed server-side',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:false});try{const x=await worker.fetch(request(),env());assert.equal(x.status,403);}finally{globalThis.fetch=original;}});
test('rejects valid captcha for unrelated hostname',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:true,hostname:'malicious.example.invalid',action:'company_inquiry'});try{const x=await worker.fetch(request(),env());assert.equal(x.status,403);}finally{globalThis.fetch=original;}});
test('rejects mismatched Turnstile action',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:true,hostname:'thyncandthryve.com',action:'product_inquiry'});try{const x=await worker.fetch(request(),env());assert.equal(x.status,403);}finally{globalThis.fetch=original;}});
test('sends once only after a valid Turnstile challenge via FormSubmit',async()=>{
 const original=globalThis.fetch;
 let sent=0,submission;
 globalThis.fetch=async(url,options)=>{
  if(String(url).includes('siteverify'))return Response.json({success:true,hostname:'thyncandthryve.com',action:'company_inquiry'});
  assert.equal(url,'https://formsubmit.co/ajax/test@example.invalid');
  assert.equal(options.method,'POST');
  assert.equal(options.redirect,'error');
  sent++;
  submission=JSON.parse(options.body);
  return Response.json({success:'true'});
 };
 try{
  const result=await worker.fetch(request(),env());
  assert.equal(result.status,200);
  assert.equal(sent,1);
  assert.equal(submission.name,'Synthetic Test');
  assert.equal(submission.email,'synthetic@example.invalid');
  assert.equal(submission._subject,'Thync & Thryve service enquiry');
  assert.equal(submission._captcha,'false');
  assert.equal(submission.token,undefined);
 }finally{globalThis.fetch=original;}
});

test('browser preflight returns empty HTTP 204 with proper CORS headers without sender configuration',async()=>{
 const request=new Request('https://worker.example.invalid/',{
  method:'OPTIONS',
  headers:{Origin:origin,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type'}
 });
 const response=await worker.fetch(request,env({EMAIL_ENABLED:'0'}));
 assert.equal(response.status,204);
 assert.equal(await response.text(),'');
 assert.equal(response.headers.get('access-control-allow-origin'),origin);
 assert.match(response.headers.get('access-control-allow-methods'),/POST/);
 assert.match(response.headers.get('access-control-allow-headers'),/content-type/);
});

test('provider rejection fails closed and does not report a submitted enquiry',async()=>{
 const original=globalThis.fetch;
 globalThis.fetch=async(url)=>String(url).includes('siteverify')
  ? Response.json({success:true,hostname:'thyncandthryve.com',action:'company_inquiry'})
  : Response.json({success:false,message:'Not activated'});
 try{assert.equal((await worker.fetch(request(),env())).status,502);}
 finally{globalThis.fetch=original;}
});
test('provider HTTP errors fail closed',async()=>{
 const original=globalThis.fetch;
 globalThis.fetch=async(url)=>String(url).includes('siteverify')
  ? Response.json({success:true,hostname:'thyncandthryve.com',action:'company_inquiry'})
  : Response.json({success:false},{status:429});
 try{assert.equal((await worker.fetch(request(),env())).status,502);}
 finally{globalThis.fetch=original;}
});
test('invalid fixed recipient never reaches the provider',async()=>{
 const original=globalThis.fetch;let providerHits=0;
 globalThis.fetch=async(url)=>{
  if(String(url).includes('siteverify'))return Response.json({success:true,hostname:'thyncandthryve.com',action:'company_inquiry'});
  providerHits++;return Response.json({success:true});
 };
 try{
  assert.equal((await worker.fetch(request(),env({RECIPIENT_EMAIL:'bad/path@example.invalid'}))).status,503);
  assert.equal(providerHits,0);
 }finally{globalThis.fetch=original;}
});
test('Turnstile failure makes no FormSubmit requests',async()=>{
 const original=globalThis.fetch;let providerHits=0;
 globalThis.fetch=async url=>{
  if(String(url).includes('siteverify'))return Response.json({success:false});
  providerHits++;return Response.json({success:true});
 };
 try{
  assert.equal((await worker.fetch(request(),env())).status,403);
  assert.equal(providerHits,0);
 }finally{globalThis.fetch=original;}
});
