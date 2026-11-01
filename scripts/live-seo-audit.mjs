import { promises as dns } from 'node:dns';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const origin = 'https://thyncandthryve.com';
export const expectedUrls = [
  '/', '/thryvems.html', '/iso-consultancy-philippines/',
  '/iso-9001-certification-philippines/', '/iso-14001-certification-philippines/',
  '/iso-45001-consultant-philippines/', '/iso-27001-consultant-philippines/',
  '/iso-22000-consultant-philippines/',
  '/trainings/iso-internal-auditor-training-philippines/',
  '/learn/how-to-get-iso-certified-philippines/',
  '/learn/iso-certification-cost-philippines/'
];
const expectedA = ['185.199.108.153','185.199.109.153','185.199.110.153','185.199.111.153'];

export function inspectHtml(html, path) {
  const canonical = origin + path;
  const match = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  return {
    pass: match?.[1] === canonical &&
      /<html\s+lang="en-PH"/i.test(html) &&
      /<h1(?:\s|>)/i.test(html) &&
      !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html),
    canonical: match?.[1] ?? null,
    expected: canonical
  };
}
export function inspectRobots(robots) {
  return /(?:^|\n)User-agent:\s*\*(?:\r?\n)/i.test(robots) &&
    !/(?:^|\n)Disallow:\s*\/(?:\r?\n|$)/i.test(robots) &&
    robots.includes('Sitemap: '+origin+'/sitemap.xml');
}
export function inspectSitemap(xml) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const expected = expectedUrls.map(p=>origin+p);
  return {pass: xml.includes('<urlset') &&
    urls.length === expected.length &&
    new Set(urls).size === expected.length &&
    expected.every(u=>urls.includes(u)),
    count: urls.length, expected: expected.length};
}
export function inspectRedirect(hops, finalUrl) {
  return hops.length>0 && hops.every(h=>[301,308].includes(h.status)) &&
    finalUrl===origin+'/';
}
async function request(url) {
  let current = url;
  const hops = [];
  for (let n=0;n<6;n++) {
    const res = await fetch(current, {redirect:'manual',signal:AbortSignal.timeout(12000),headers:{'user-agent':'ThyncThryve-SEO-Release-Audit/1.0'}});
    if ([301,302,303,307,308].includes(res.status)) {
      const location=res.headers.get('location');
      if (!location) throw Error('Redirect without Location');
      const next=new URL(location,current).href;
      hops.push({status:res.status,url:current,to:next});
      if (!/^https?:\/\//.test(next)) throw Error('Unexpected redirect');
      current=next;
      continue;
    }
    const body=await res.text();
    return {status:res.status,finalUrl:current,hops,body};
  }
  throw Error('Redirect loop or too many redirects');
}
export async function runAudit() {
  const checks=[];
  const add=(id,pass,details)=>checks.push({id,status:pass?'PASS':'FAIL',details});
  try {
    const ips=(await dns.resolve4('thyncandthryve.com')).sort();
    add('dns-apex',JSON.stringify(ips)===JSON.stringify([...expectedA].sort()),{ips,expected:expectedA});
  } catch(e) {add('dns-apex',false,{error:String(e)});}
  try {
    const aliases=(await dns.resolveCname('www.thyncandthryve.com')).map(x=>x.replace(/\.$/,'').toLowerCase());
    add('dns-www',aliases.includes('dbauto.github.io'),{aliases,expected:'dbauto.github.io'});
  } catch(e) {add('dns-www',false,{error:String(e)});}
  for (const url of ['http://thyncandthryve.com/','https://www.thyncandthryve.com/']) {
    try {
      const r=await request(url);
      add(url.startsWith('http:')?'redirect-http':'redirect-www',
        inspectRedirect(r.hops,r.finalUrl),{hops:r.hops,finalUrl:r.finalUrl,status:r.status});
    }catch(e) {add(url.startsWith('http:')?'redirect-http':'redirect-www',false,{error:String(e)});}
  }
  for (const path of expectedUrls) {
    try {
      const r=await request(origin+path);
      const html=inspectHtml(r.body,path);
      add('url-'+path,r.status===200&&r.finalUrl===origin+path&&html.pass,
        {status:r.status,finalUrl:r.finalUrl,canonical:html.canonical,httpsVerified:true});
    } catch(e){add('url-'+path,false,{error:String(e)});}
  }
  try {
    const robots=await request(origin+'/robots.txt');
    add('robots',robots.status===200&&inspectRobots(robots.body),
      {status:robots.status,finalUrl:robots.finalUrl,valid:inspectRobots(robots.body)});
  }catch(e){add('robots',false,{error:String(e)});}
  try {
    const sitemap=await request(origin+'/sitemap.xml');
    const parsed=inspectSitemap(sitemap.body);
    add('sitemap',sitemap.status===200&&parsed.pass,
      {status:sitemap.status,finalUrl:sitemap.finalUrl,...parsed});
  }catch(e){add('sitemap',false,{error:String(e)});}
  try {
    const missing=await request(origin+'/thync-thryve-seo-audit-nonexistent-404');
    add('real-404',missing.status===404,{status:missing.status,finalUrl:missing.finalUrl});
  }catch(e){add('real-404',false,{error:String(e)});}
  const passed=checks.filter(x=>x.status==='PASS').length;
  const report={schema:1,checkedAt:new Date().toISOString(),host:'thyncandthryve.com',
    passed,failed:checks.length-passed,total:checks.length,automatedChecksPass:passed===checks.length,
    phase1Complete:false,manualGatesPending:['live-responsive-evidence','second-independent-successful-run'],
    note:'HTTPS trust is checked by Node fetch for every HTTPS URL; Google index status is out of scope.',
    checks};
  const filename=process.env.AUDIT_REPORT||'phase1-live-audit.json';
  writeFileSync(filename,JSON.stringify(report,null,2)+'\n');
  console.log('Phase 1 production audit: '+passed+'/'+checks.length+' PASS; report '+filename);
  for (const item of checks) console.log(item.status+' '+item.id+' '+JSON.stringify(item.details));
  if (report.failed) process.exitCode=1;
  return report;
}
if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  await runAudit();
}
