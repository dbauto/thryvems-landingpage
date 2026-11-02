import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
export const HOST='https://thyncandthryve.com';
const expectedPaths=['/','/thryvems.html','/iso-consultancy-philippines/',
 '/iso-9001-certification-philippines/','/iso-14001-certification-philippines/',
 '/iso-45001-consultant-philippines/','/iso-27001-consultant-philippines/',
 '/iso-22000-consultant-philippines/','/trainings/iso-internal-auditor-training-philippines/',
 '/learn/how-to-get-iso-certified-philippines/','/learn/iso-certification-cost-philippines/'];
export const fileFor=p=>p==='/'?'index.html':p.endsWith('/')?p.slice(1)+'index.html':p.slice(1);
export const clean=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
export function inspectCommercial(map,source){
 const problems=[],details=[],seen=new Set(),primaries=new Set(),titles=new Set(),descs=new Set();
 if(map?.schema!==1||!Array.isArray(map.pages))return {pass:false,problems:['Missing SEO keyword map']};
 if(map.pages.length!==expectedPaths.length)problems.push('Expected exactly 11 commercial intent mappings');
 for(const m of map.pages){
  if(!expectedPaths.includes(m.path)||seen.has(m.path))problems.push('Invalid/duplicate SEO path: '+m.path);
  seen.add(m.path);
  const primary=clean(m.primary??'').toLowerCase();
  if(!primary||primaries.has(primary))problems.push('Duplicate or empty primary search intent '+m.path);
  primaries.add(primary);
  if(typeof m.intent!=='string'||m.intent.length<12)problems.push('Missing distinct search intent rationale '+m.path);
  const html=source[m.path];
  if(!html){problems.push('Missing page HTML '+m.path);continue;}
  const title=clean(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]??'');
  const description=clean(html.match(/<meta name="description" content="([^"]*)"/i)?.[1]??'');
  const h1Count=[...html.matchAll(/<h1(?:\s|>)/gi)].length;
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]??'';
  if(!title.toLowerCase().includes(primary))problems.push('Title does not match its primary search intent '+m.path);
  if(title.length<15||title.length>72)problems.push('Title length out of bounds '+m.path);
  if(description.length<75||description.length>155)problems.push('Description length out of bounds '+m.path);
  if(titles.has(title.toLowerCase()))problems.push('Duplicate page title '+m.path);
  if(descs.has(description.toLowerCase()))problems.push('Duplicate page description '+m.path);
  titles.add(title.toLowerCase());descs.add(description.toLowerCase());
  if(h1Count!==1)problems.push('Missing or duplicated H1 '+m.path);
  if(canonical!==HOST+m.path)problems.push('Mismatched canonical '+m.path);
  details.push({path:m.path,primary:m.primary,intent:m.intent,titleLength:title.length,descriptionLength:description.length,h1Count,canonicalPass:canonical===HOST+m.path});
 }
 for(const p of expectedPaths)if(!seen.has(p))problems.push('Unmapped published SEO page: '+p);
 const required={
  '/iso-consultancy-philippines/':['What to ask an ISO consultant to deliver','certification body','gap-assessment'],
  '/iso-9001-certification-philippines/':['ISO 9001 readiness: check actual operating evidence','ISO 9001:2026 on 16 September 2026','https://committee.iso.org/news/2026/09/ISO9001-2026'],
  '/learn/iso-certification-cost-philippines/':['A like-for-like ISO certification quotation checklist','surveillance','certification body'],
  '/learn/how-to-get-iso-certified-philippines/':['What help can a consultant provide?','independent certification body','consultancy']
 };
 for(const [path,fragments] of Object.entries(required)){
   const html=source[path]??'';
   for(const fragment of fragments)if(!html.toLowerCase().includes(fragment.toLowerCase()))problems.push('Missing buyer guidance '+path+': '+fragment);
 }
 return {pass:problems.length===0,total:expectedPaths.length,validated:details.length,
  buyerGuides:Object.keys(required).length,duplicateTitles:details.length-titles.size,
  duplicateDescriptions:details.length-descs.size,problems,pages:details};
}
export function run(){
 const map=JSON.parse(readFileSync('plan/seo-phase3-keyword-map.json','utf8'));
 const source=Object.fromEntries(map.pages.map(({path})=>[path,readFileSync(fileFor(path),'utf8')]));
 const result=inspectCommercial(map,source);
 const report={checkedAt:new Date().toISOString(),...result,
  actualGoogleRankingsVerified:false,
  note:'Passing source QA does not establish rankings, search volumes, authority or confirmed company service offerings.'};
 writeFileSync('phase3-commercial-audit.json',JSON.stringify(report,null,2)+'\n');
 console.log('Phase 3 commercial SEO: '+(result.pass?'PASS':'FAIL')+' '+result.validated+'/'+result.total+
  ' mapped pages; '+result.buyerGuides+' actionable buyer guides; '+result.duplicateTitles+' duplicate titles');
 for(const issue of result.problems)console.log('FAIL: '+issue);
 if(!result.pass)process.exitCode=1;
 return report;
}
if(process.argv[1]&&resolve(process.argv[1])===resolve('scripts/check-commercial-seo.mjs'))run();
