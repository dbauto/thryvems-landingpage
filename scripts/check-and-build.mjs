import { readFileSync, readdirSync, mkdirSync, copyFileSync, cpSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const apexDomain = readFileSync(resolve(root, 'CNAME'), 'utf8').trim();
assert.equal(apexDomain, 'thyncandthryve.com', 'GitHub Pages must target only the proposed company apex domain');
assert(!apexDomain.includes(' '), 'GitHub Pages CNAME must contain only one domain');
const html = readFileSync(resolve(root,'thryvems.html'),'utf8');
const companyHtml = readFileSync(resolve(root,'index.html'),'utf8');
const companyCss = readFileSync(resolve(root,'thync-thryve-company.css'),'utf8');
const companyBackToTopJs = readFileSync(resolve(root,'thync-thryve-back-to-top.js'),'utf8');
const companyMotionCss = readFileSync(resolve(root,'thync-thryve-motion.css'),'utf8');
const companyMotionJs = readFileSync(resolve(root,'thync-thryve-motion.js'),'utf8');
const pricingJs = readFileSync(resolve(root,'thryvems-pricing.js'),'utf8');
const motionJs = readFileSync(resolve(root,'thryvems-motion.js'),'utf8');
const css = readFileSync(resolve(root,'thryvems-motion.css'),'utf8');
const heroCss = readFileSync(resolve(root,'thryvems-product-hero.css'),'utf8');
const postProblemCss = readFileSync(resolve(root,'thryvems-after-problem-motion.css'),'utf8');
const postProblemJs = readFileSync(resolve(root,'thryvems-after-problem-motion.js'),'utf8');
const storyCss = readFileSync(resolve(root,'thryvems-story-preview.css'),'utf8');
const cookieJs = readFileSync(resolve(root,'site-cookie-notice.js'),'utf8');
const cookieHtml = readFileSync(resolve(root,'cookies.html'),'utf8');
const cookieCss = readFileSync(resolve(root,'site-interactions.css'),'utf8');
const formJs = readFileSync(resolve(root,'site-inquiry.js'),'utf8');
const formCfg = readFileSync(resolve(root,'site-inquiry-config.js'),'utf8');
assert(formCfg.includes('enabled: false') && formCfg.includes("endpoint: ''"), 'Form integration must be disabled pending external setup');
assert(formJs.includes('JSON.stringify({name,email,company,message,interest,source:formSource,token})') && formJs.includes('fetch(config.endpoint'), 'Formspree/Turnstile integration contract missing');
assert(!formJs.includes('thync.thryve@gmail.com'), 'Never hardcode real receiving address into public JS');
for(const page of [companyHtml,html]) {
 assert(page.includes('data-inquiry-form=') && page.includes('site-inquiry-config.js') && page.includes('site-inquiry.js'), 'Protected form and config must be available on both landing pages');
 assert(page.includes('data-human-check') && page.includes('data-inquiry-submit disabled'), 'Unconfigured form must fail closed');
}
for (const page of [companyHtml,html]) {
  assert(page.includes('site-cookie-notice.js') && page.includes('site-interactions.css'), 'Cookie notice must be on both landing pages');
}
assert(cookieJs.includes('thync-thryve.cookie-notice.v1'), 'Cookie acknowledgement must persist locally');
assert(cookieJs.includes('cookies.html') && cookieHtml.includes('We currently do not use optional analytics'), 'Cookie details must be truthful');
assert(cookieCss.includes('.site-cookie-notice'), 'Cookie notice uses existing company brand styles');

for (const id of ['top','system','modules','pricing','calculator','process','faq','contact']) {
  assert.match(html, new RegExp('id="'+id+'"'), 'Missing required section '+id);
}
for (const word of ['Base','Mid','Enterprise','ThryveMS','Thync &amp; Thryve','Request a walkthrough']) {
  assert(html.includes(word),'Missing business content '+word);
}
assert(!html.includes('iQMS'),'Old product name must not appear in ThryveMS page');
// Company website must be an honest, accessible service catalog rather than
// outdated placeholder schedules, unsupported booking, or single-standard claims.
for (const required of ['id="iso-guide"','id="programs"','id="consultancy-areas"','id="about"',
  'id="contact"','Training and consultancy','ISO 9001:2026','ISO 14001:2026',
  'ISO 45001:2018','ISO/IEC 27001','ISO 22000:2018','ISO 31000:2018',
  'ISO 13485:2016','thryvems.html']) {
  assert(companyHtml.includes(required),'Company homepage missing: '+required);
}
assert.equal((companyHtml.match(/<details class="company-standard"/g)||[]).length,7,
  'The seven ISO topic groups must be expandable and shared between training/consultancy');
assert(!/\[DATE\]|\[One line|\[Company story|\[Credentials/.test(companyHtml),
  'No invented schedule, company background or accreditation placeholders');
assert(companyHtml.includes('Enquiry form not yet active') &&
  companyHtml.includes('data-inquiry-submit disabled aria-disabled="true"'), 'Do not claim working lead submission');
assert(companyHtml.includes('thync-thryve-company.css'), 'Company styles not loaded');
assert.match(companyCss,/company-catalog-grid/);
const companyFavicon = readFileSync(resolve(root,'assets/thync-thryve-favicon.png'));
assert(companyHtml.includes('rel="icon" type="image/png" sizes="64x64" href="./assets/thync-thryve-favicon.png?v=20261101-2"'),
  'Company page must use the Thync & Thryve emblem favicon');
assert(!companyHtml.includes('<link rel="icon" href="assets/thryvems-logo.png">'),
  'Company favicon must not use the ThryveMS product mark');
assert(html.includes('href="./assets/thryvems-logo.png"'),
  'Product page favicon must remain ThryveMS');
assert(companyFavicon.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
  'Company favicon must be a valid PNG');
assert(companyFavicon.readUInt32BE(16)===64 && companyFavicon.readUInt32BE(20)===64,
  'Company favicon must be square and readable at browser-tab sizes');
assert(companyHtml.includes('class="company-back-to-top"') && companyHtml.includes('aria-label="Back to top"'), 'Company back to top button missing');
assert(companyHtml.includes('thync-thryve-back-to-top.js'), 'Company back to top JS not loaded');
assert.match(companyCss,/\.company-back-to-top\.visible/);
assert.match(companyBackToTopJs,/window\.scrollTo/);
assert(companyHtml.includes('id="company-story"') && companyHtml.includes('company-motion-board'),
  'The company scroll story must be present');
assert.equal((companyHtml.match(/data-motion-object="/g)||[]).length,4,
  'The connected illustration must have four moving objects');
assert.equal((companyHtml.match(/data-motion-chapter="/g)||[]).length,4,
  'The story must have four matching narrative steps');
assert(companyHtml.includes('thync-thryve-motion.css') && companyHtml.includes('thync-thryve-motion.js'),
  'Company scroll motion assets must be loaded');
assert.match(companyMotionCss,/company-motion-enabled/);
assert.match(companyMotionJs,/getPointAtLength/);
assert.match(pricingJs, /fee:4000,incl:15,per:300,max:25/);
assert.match(pricingJs, /fee:6500,incl:25,per:260,max:75/);
assert.match(pricingJs, /annual\?0\.8:1/);
assert.match(motionJs, /storyItems/);
assert.match(heroCss, /\.product-hero/);
assert.match(postProblemCss, /after-problem-motion/);
assert.match(postProblemJs, /requestAnimationFrame/);
assert(html.includes('thryvems-after-problem-motion.css'), 'Post-problem CSS not included in HTML');
assert(html.includes('thryvems-after-problem-motion.js'), 'Post-problem JS not included in HTML');
assert.match(storyCss, /\.story-browser/);
assert.match(html, /class="story-browser product-hero-browser"/);
assert.match(html, /thryvems-story-preview\.css/);
assert.equal((html.match(/class="demo-panel story-screen-panel/g)||[]).length, 4, 'Preserve four walkthrough screens');
assert.match(html, /class="hero product-hero"/);
assert(!html.includes('puzzle-piece'), 'Rejected puzzle hero must not appear');
assert(html.indexOf('id="system"') < html.indexOf('class="problem"'), 'The product scroll story should start immediately after the hero');
for (const file of ['thryvems-motion.css','thryvems-product-hero.css','thryvems-story-preview.css','thryvems-after-problem-motion.css','thryvems-after-problem-motion.js','thryvems-motion.js','thryvems-pricing.js',
  'assets/thryvems-logo.svg','assets/thryvems-logo.png','assets/thync-thryve-logo.png','assets/thync-thryve-favicon.png','thync-thryve-company.css','thync-thryve-motion.css','thync-thryve-motion.js','thync-thryve-back-to-top.js']) {
  assert(existsSync(join(root,file)), 'Referenced asset missing: '+file);
}

// SEO QA: static pages must be searchable without JavaScript and have aligned metadata.
const seoSlugs = [
 'iso-consultancy-philippines',
 'iso-9001-certification-philippines',
 'iso-14001-certification-philippines',
 'iso-45001-consultant-philippines',
 'iso-27001-consultant-philippines',
 'iso-22000-consultant-philippines',
 'trainings/iso-internal-auditor-training-philippines',
 'learn/how-to-get-iso-certified-philippines',
 'learn/iso-certification-cost-philippines'
];
const sitemap = readFileSync(resolve(root,'sitemap.xml'),'utf8');
const robots = readFileSync(resolve(root,'robots.txt'),'utf8');
assert(robots.includes('Sitemap: https://thyncandthryve.com/sitemap.xml'),'Missing sitemap directive');
assert(sitemap.includes('<urlset') && !sitemap.includes('dbauto.github.io'),'Invalid sitemap origin');
const seoPages = [
 {slug:'',body:companyHtml,file:'index.html'},
 {slug:'thryvems.html',body:html,file:'thryvems.html'},
 ...seoSlugs.map(slug=>({slug:slug+'/',body:readFileSync(resolve(root,slug,'index.html'),'utf8'),file:slug+'/index.html'}))
];
for (const page of seoPages) {
 const canonical = 'https://thyncandthryve.com/' + page.slug;
 assert(page.body.includes('<html lang="en-PH">'),page.file+' missing PH language');
 assert(page.body.includes('rel="canonical" href="'+canonical+'"'),page.file+' incorrect canonical');
 assert(sitemap.includes('<loc>'+canonical+'</loc>'),page.file+' missing sitemap URL');
 assert(!page.body.includes('name="robots" content="noindex'),page.file+' accidentally nonindexed');
 const title=page.body.match(/<title>([^<]+)<\/title>/)?.[1]||'';
 const desc=page.body.match(/<meta name="description" content="([^"]+)"/)?.[1]||'';
 assert(title.length>10&&title.length<=72,page.file+' missing useful title');
 assert(desc.length>75&&desc.length<=155,page.file+' invalid description');
 assert((page.body.match(/<h1[ >]/g)||[]).length===1,page.file+' must have one H1');
 assert(page.body.includes('application/ld+json'),page.file+' missing structured data');
 assert(page.body.includes('property="og:title"') && page.body.includes('name="twitter:card"'),page.file+' missing social metadata');
 if(page.slug.endsWith('/')) {
  const visible=page.body.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
  const count=visible.trim().split(/\s+/).length;
  assert(count>=600&&count<=1200,page.file+' expected substantial original content, got '+count);
  assert((page.body.match(/<details>/g)||[]).length>=5,page.file+' missing FAQs');
 }
}
assert.equal((sitemap.match(/<loc>/g)||[]).length,seoPages.length,'sitemap includes non-canonical or unbuilt pages');
assert(html.includes('rel="canonical" href="https://thyncandthryve.com/thryvems.html"'),'Product canonical points to GitHub Pages');

const dest=resolve(root,'dist');
rmSync(dest,{recursive:true,force:true});
mkdirSync(dest,{recursive:true});
for(const file of ['cookies.html','site-cookie-notice.js','site-interactions.css','site-inquiry-config.js','site-inquiry.js','index.html','thync-thryve-company.css','thync-thryve-motion.css','thync-thryve-motion.js','thync-thryve-back-to-top.js','thryvems.html','thryvems-motion.css','thryvems-product-hero.css','thryvems-story-preview.css','thryvems-after-problem-motion.css','thryvems-motion.js','thryvems-after-problem-motion.js','thryvems-pricing.js']) {
  copyFileSync(resolve(root,file), join(dest,file));
}
cpSync(resolve(root,'assets'),join(dest,'assets'),{recursive:true});
copyFileSync(resolve(root,'CNAME'),join(dest,'CNAME'));
for(const file of ['seo-service.css','robots.txt','sitemap.xml','404.html']) copyFileSync(resolve(root,file),join(dest,file));
for(const slug of seoSlugs) cpSync(resolve(root,slug),join(dest,slug),{recursive:true});
for (const file of ['thryvems-after-problem-motion.css','thryvems-after-problem-motion.js']) {
  assert(existsSync(join(dest,file)), 'Build output is missing motion asset: '+file);
}
console.log('Static build validation passed. SEO content, sitemap, canonicals, homepage, product, and assets copied to dist.');
