import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../workers/inquiries/index.mjs';
const origin='https://thyncandthryve.com';
const data={name:'Synthetic Test',email:'synthetic@example.invalid',company:'Sample Co',interest:'general',message:'Test only',source:'company',token:'test-token'};
const request=(payload=data,from=origin)=>new Request('https://worker.example.invalid/',{method:'POST',headers:{Origin:from,'content-type':'application/json'},body:JSON.stringify(payload)});
const env=(changes={})=>({EMAIL_ENABLED:'1',TURNSTILE_SECRET:'mock-secret',SENDER_EMAIL:'notifications@example.invalid',RECIPIENT_EMAIL:'test@example.invalid',EMAIL:{send:async()=>({messageId:'synthetic'})},...changes});
test('does not send when disabled',async()=>{let sent=0;const x=await worker.fetch(request(),env({EMAIL_ENABLED:'0',EMAIL:{send:async()=>{sent++}}}));assert.equal(x.status,503);assert.equal(sent,0);});
test('rejects unexpected origins',async()=>{const x=await worker.fetch(request(data,'https://malicious.example.invalid'),env());assert.equal(x.status,403);});
test('rejects incomplete input before siteverify',async()=>{const x=await worker.fetch(request({...data,email:'invalid'}),env());assert.equal(x.status,400);});
test('rejects challenge failed server-side',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:false});try{const x=await worker.fetch(request(),env());assert.equal(x.status,403);}finally{globalThis.fetch=original;}});
test('rejects valid captcha for unrelated hostname',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:true,hostname:'malicious.example.invalid',action:'company_inquiry'});try{const x=await worker.fetch(request(),env());assert.equal(x.status,403);}finally{globalThis.fetch=original;}});
test('rejects mismatched Turnstile action',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:true,hostname:'thyncandthryve.com',action:'product_inquiry'});try{const x=await worker.fetch(request(),env());assert.equal(x.status,403);}finally{globalThis.fetch=original;}});
test('sends once only when challenge fully validated',async()=>{const original=globalThis.fetch;globalThis.fetch=async()=>Response.json({success:true,hostname:'thyncandthryve.com',action:'company_inquiry'});let mail;try{const x=await worker.fetch(request(),env({EMAIL:{send:async m=>{mail=m;return{messageId:'synthetic'}}}}));assert.equal(x.status,200);assert.equal(mail.to,'test@example.invalid');assert.equal(mail.subject,'Thync & Thryve service enquiry');assert.match(mail.text,/Synthetic Test/);}finally{globalThis.fetch=original;}});

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
