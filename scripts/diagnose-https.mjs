// Read-only GitHub-hosted diagnostic. Never edits DNS, Pages or repo configuration.
import dns from 'node:dns/promises';
import tls from 'node:tls';
const hosts = ['thyncandthryve.com', 'www.thyncandthryve.com'];
const safe = value => JSON.stringify(value);
async function probe(name, action) {
  try { console.log(name + ': ' + safe(await action())); }
  catch (error) { console.log(name + ' ERROR: ' + safe({ code:error.code || error.name, message:error.message })); }
}
async function tlsCertificate(host) {
  return await new Promise((resolve,reject)=>{
    const socket=tls.connect({host,port:443,servername:host,rejectUnauthorized:false,timeout:7000},()=>{
      const cert=socket.getPeerCertificate();
      const result={
        tlsAuthorized:socket.authorized,
        authorizationError:socket.authorizationError || null,
        subject:cert?.subject?.CN || null,
        issuer:cert?.issuer?.CN || null,
        validFrom:cert?.valid_from || null,
        validTo:cert?.valid_to || null,
        subjectAlternativeNames:cert?.subjectaltname || null
      };
      socket.end();resolve(result);
    });
    socket.on('timeout',()=>socket.destroy(Object.assign(new Error('TLS handshake timed out'),{code:'ETIMEDOUT'})));
    socket.on('error',reject);
  });
}
for(const host of hosts){
  console.log('\n=== '+host+' ===');
  await probe('DNS A',()=>dns.resolve4(host));
  await probe('DNS AAAA',()=>dns.resolve6(host));
  await probe('DNS CNAME',()=>dns.resolveCname(host));
  await probe('DNS CAA',()=>dns.resolveCaa(host));
  await probe('TLS certificate',()=>tlsCertificate(host));
  for(const protocol of ['https','http']){
    await probe(protocol.toUpperCase()+' HTTP',async()=>{
      const response=await fetch(protocol+'://'+host+'/',{redirect:'manual',signal:AbortSignal.timeout(8000)});
      return {status:response.status,location:response.headers.get('location'),server:response.headers.get('server')};
    });
  }
}
if(process.env.GH_TOKEN){
  await probe('GitHub Pages settings (read-only)',async()=>{
    const response=await fetch('https://api.github.com/repos/dbauto/thryvems-landingpage/pages',{
      headers:{
        authorization:'Bearer '+process.env.GH_TOKEN,
        accept:'application/vnd.github+json',
        'x-github-api-version':'2022-11-28',
        'user-agent':'ThyncAndThryvePagesDiagnostics'
      },
      signal:AbortSignal.timeout(8000)
    });
    const body=await response.json();
    return {
      status:response.status,
      cname:body?.cname || null,
      httpsEnforced:body?.https_enforced ?? null,
      httpsCertificate:body?.https_certificate ? {
        state:body.https_certificate.state || null,
        description:body.https_certificate.description || null,
        domains:body.https_certificate.domains || null,
        expiresAt:body.https_certificate.expires_at || null
      }:null,
      message:response.ok?null:body?.message?.slice(0,200)
    };
  });
}
