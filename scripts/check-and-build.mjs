import { readFileSync, readdirSync, mkdirSync, copyFileSync, cpSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
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
  companyHtml.includes('disabled aria-disabled="true"'), 'Do not claim working lead submission');
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
const dest=resolve(root,'dist');
rmSync(dest,{recursive:true,force:true});
mkdirSync(dest,{recursive:true});
for(const file of ['index.html','thync-thryve-company.css','thync-thryve-motion.css','thync-thryve-motion.js','thync-thryve-back-to-top.js','thryvems.html','thryvems-motion.css','thryvems-product-hero.css','thryvems-story-preview.css','thryvems-after-problem-motion.css','thryvems-motion.js','thryvems-after-problem-motion.js','thryvems-pricing.js']) {
  copyFileSync(resolve(root,file), join(dest,file));
}
cpSync(resolve(root,'assets'),join(dest,'assets'),{recursive:true});
for (const file of ['thryvems-after-problem-motion.css','thryvems-after-problem-motion.js']) {
  assert(existsSync(join(dest,file)), 'Build output is missing motion asset: '+file);
}
console.log('Static build validation passed. Product page, calculator, company homepage, and assets copied to dist.');
