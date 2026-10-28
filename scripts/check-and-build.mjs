import { readFileSync, readdirSync, mkdirSync, copyFileSync, cpSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const root = process.cwd();
const html = readFileSync(resolve(root,'thryvems.html'),'utf8');
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
  'assets/thryvems-logo.svg','assets/thryvems-logo.png','assets/thync-thryve-logo.png']) {
  assert(existsSync(join(root,file)), 'Referenced asset missing: '+file);
}
const dest=resolve(root,'dist');
rmSync(dest,{recursive:true,force:true});
mkdirSync(dest,{recursive:true});
for(const file of ['index.html','thryvems.html','thryvems-motion.css','thryvems-product-hero.css','thryvems-story-preview.css','thryvems-motion.js','thryvems-pricing.js']) {
  copyFileSync(resolve(root,file), join(dest,file));
}
cpSync(resolve(root,'assets'),join(dest,'assets'),{recursive:true});
console.log('Static build validation passed. Product page, calculator, company homepage, and assets copied to dist.');
