import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

export const ORIGIN='https://thyncandthryve.com';
export const RELEASE_MARKERS=[
 {path:'/iso-consultancy-philippines/',marker:'What to ask an ISO consultant to deliver'},
 {path:'/iso-9001-certification-philippines/',marker:'ISO 9001 readiness: check actual operating evidence'},
 {path:'/learn/iso-certification-cost-philippines/',marker:'A like-for-like ISO certification quotation checklist'},
 {path:'/learn/how-to-get-iso-certified-philippines/',marker:'What help can a consultant provide?'}
];
export function inspectHtml(html,{path,marker}){
 const full=ORIGIN+path;
 const canonical=html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1]??null;
 return {
   marker:html.includes(marker),
   canonical:canonical===full,
   h1:(html.match(/<h1(?:\s|>)/gi)||[]).length===1,
   indexable:!/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)
 };
}
export function assessRelease(pages){
 const rows=RELEASE_MARKERS.map(item=>{
   const x=pages[item.path];
   if(!x)return {...item,status:'FAIL',error:'Missing live response'};
   const criteria=inspectHtml(x.html,item);
   const pass=x.status===200&&x.finalUrl===ORIGIN+item.path&&Object.values(criteria).every(Boolean);
   return {...item,status:pass?'PASS':'FAIL',httpStatus:x.status,finalUrl:x.finalUrl,criteria};
 });
 return {total:rows.length,passed:rows.filter(x=>x.status==='PASS').length,
  failed:rows.filter(x=>x.status==='FAIL').length,pass:rows.every(x=>x.status==='PASS'),rows};
}
export async function auditLive(fetcher=fetch){
 const live={};
 for(const {path} of RELEASE_MARKERS){
  try{
   const response=await fetcher(ORIGIN+path,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'ThyncThryve-SEO-Release-Verification/1.0','Cache-Control':'no-cache'},redirect:'follow'});
   live[path]={status:response.status,finalUrl:response.url,html:await response.text()};
  }catch(error){live[path]={status:null,finalUrl:null,html:'',error:String(error)};}
 }
 const outcome=assessRelease(live);
 const result={checkedAt:new Date().toISOString(),site:ORIGIN,expectedRelease:'Phase 3 commercial content (PR #23)',
  ...outcome,failures:Object.entries(live).filter(([,x])=>x.error).map(([path,x])=>({path,error:x.error}))};
 writeFileSync('phase3-live-content-audit.json',JSON.stringify(result,null,2)+'\n');
 console.log('Phase 3 live release evidence: '+result.passed+'/'+result.total+' PASS');
 for(const row of result.rows)console.log(row.status+' '+row.path+' HTTP '+row.httpStatus+' '+JSON.stringify(row.criteria));
 if(!result.pass)process.exitCode=1;
 return result;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) await auditLive();
