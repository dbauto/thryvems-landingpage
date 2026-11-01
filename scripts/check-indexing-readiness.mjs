import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

export const SITE='https://thyncandthryve.com';
export const PAGES=[
  '/','/thryvems.html','/iso-consultancy-philippines/',
  '/iso-9001-certification-philippines/','/iso-14001-certification-philippines/',
  '/iso-45001-consultant-philippines/','/iso-27001-consultant-philippines/',
  '/iso-22000-consultant-philippines/',
  '/trainings/iso-internal-auditor-training-philippines/',
  '/learn/how-to-get-iso-certified-philippines/',
  '/learn/iso-certification-cost-philippines/'
];
export const fileFor=url=>url==='/'?'index.html':url.endsWith('/')?url.slice(1)+'index.html':url.slice(1);
export function linksFor(html,path){
  const matches=[...html.matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi)];
  return [...new Set(matches.map(m=>{
    try{
      const dest=new URL(m[1],SITE+path);
      if(dest.origin!==SITE)return null;
      return dest.pathname;
    }catch{return null;}
  }).filter(Boolean))];
}
export function auditSource(pages,xml,robots){
  const problems=[];
  const expected=PAGES.map(p=>SITE+p);
  const listed=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  if(listed.length!==expected.length||new Set(listed).size!==expected.length||expected.some(p=>!listed.includes(p))) problems.push('Sitemap URLs do not match 11 intended pages');
  if(!robots.includes('Sitemap: '+SITE+'/sitemap.xml')||/(?:^|\n)Disallow:\s*\/\s*(?:\r?\n|$)/i.test(robots))problems.push('Robots sitemap/crawl rule differs from intended site');
  const graph={};
  const details=[];
  for(const path of PAGES){
    const html=pages[path];
    if(typeof html!=='string'){problems.push('Missing source '+path);continue;}
    const canonical=html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1]??null;
    const noindex=/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
    const headings=[...html.matchAll(/<h1(?:\s|>)/gi)].length;
    const anchors=linksFor(html,path);
    graph[path]=anchors.filter(p=>PAGES.includes(p));
    if(canonical!==SITE+path)problems.push('Incorrect canonical '+path);
    if(noindex)problems.push('Blocked by noindex '+path);
    if(headings!==1)problems.push('H1 count '+path+': '+headings);
    details.push({path,canonical,headings,noindex,linksToTrackedPages:graph[path].length});
  }
  const depth={'/':0};
  const queue=['/'];
  while(queue.length){
    const from=queue.shift();
    for(const dest of graph[from]??[])if(depth[dest]===undefined){depth[dest]=depth[from]+1;queue.push(dest);}
  }
  for(const path of PAGES)if(depth[path]===undefined||depth[path]>2)problems.push('Not discoverable within 2 clicks: '+path);
  return {pass:problems.length===0,problems,pageCount:details.length,reachableCount:Object.keys(depth).length,maxClicks:Math.max(...Object.values(depth)),pages:details.map(d=>({...d,clicksFromHomepage:depth[d.path]??null}))};
}
export function auditEvidence(statuses,paths=PAGES){
  if(!statuses||!Array.isArray(statuses.pages))return {pass:false,problems:['Missing Search Console evidence pages array']};
  const problems=[],keys=new Set(),allowed=new Set(['NOT_VERIFIED','DISCOVERED_NOT_INDEXED','CRAWLED_NOT_INDEXED','INDEXED','EXCLUDED','ERROR']);
  let indexed=0,reviewed=0;
  for(const item of statuses.pages){
    if(!paths.includes(item.path)||keys.has(item.path))problems.push('Unknown or repeated path: '+String(item.path));
    keys.add(item.path);
    if(!allowed.has(item.status))problems.push('Invalid status for '+item.path);
    if(item.status!=='NOT_VERIFIED'){
      reviewed++;
      if(!item.checkedAt||!item.evidenceUrl?.startsWith('https://')||!item.googleReport)problems.push('Claim without dated Search Console evidence: '+item.path);
      if(item.status==='INDEXED')indexed++;
    }
  }
  if(keys.size!==paths.length||paths.some(p=>!keys.has(p)))problems.push('Google evidence must include all canonical pages');
  return {pass:problems.length===0,problems,reviewed,indexed,total:paths.length,indexRate:reviewed?indexed/paths.length:null,allVerified:reviewed===paths.length};
}
export function run(){
  const pages=Object.fromEntries(PAGES.map(p=>[p,readFileSync(fileFor(p),'utf8')]));
  const source=auditSource(pages,readFileSync('sitemap.xml','utf8'),readFileSync('robots.txt','utf8'));
  const statuses=JSON.parse(readFileSync('plan/google-indexing-evidence.json','utf8'));
  const evidence=auditEvidence(statuses);
  const report={checkedAt:new Date().toISOString(),source,evidence,
    phase2Complete:false,
    note:'Source reachability is not proof of Google indexing. Phase 2 requires verified Search Console ownership and Google evidence. No tokens or credentials are stored.'};
  writeFileSync('phase2-indexing-readiness.json',JSON.stringify(report,null,2)+'\n');
  console.log('SEO Phase 2 source readiness: '+(source.pass?'PASS':'FAIL')+'; '+source.reachableCount+'/'+PAGES.length+' reachable; max '+source.maxClicks+' clicks');
  console.log('Search Console evidence: '+evidence.reviewed+'/'+PAGES.length+' reviewed; '+evidence.indexed+' confirmed indexed (unverified pages are not indexed-status claims)');
  for(const issue of [...source.problems,...evidence.problems])console.log('FAIL: '+issue);
  if(!source.pass||!evidence.pass)process.exitCode=1;
  return report;
}
if(process.argv[1]&&resolve(process.argv[1])===resolve('scripts/check-indexing-readiness.mjs'))run();
