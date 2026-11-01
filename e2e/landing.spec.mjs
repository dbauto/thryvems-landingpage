import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
mkdirSync('test-results/screenshots',{recursive:true});
test('product landing preserves the company identity, modules, tiers and navigation',async({page})=>{
 await page.goto('/thryvems.html');
 await expect(page).toHaveTitle(/ThryveMS/);
 await expect(page.locator('.puzzle-piece')).toHaveCount(0);
 await expect(page.locator('.product-hero')).toBeVisible();
 await expect(page.locator('.product-hero-caption')).toContainText('Synthetic example data');
 await expect(page.locator('#pricing')).toBeAttached();
 await expect(page.locator('#pricing')).toContainText('Base');
 await expect(page.locator('#pricing')).toContainText('Mid');
 await expect(page.locator('#pricing')).toContainText('Enterprise');
 await expect(page.getByRole('link',{name:'Thync & Thryve'}).first()).toHaveAttribute('href','index.html');
 await expect(page.locator('.problem-word').first()).toBeAttached();
 await expect(page.locator('#modules')).toContainText('Audit Management');
 await expect(page.locator('body')).not.toContainText('iQMS');
});
test('calculator keeps existing Base, Mid and annual price rules', async({page})=>{
 await page.goto('/thryvems.html');
 await expect(page.locator('[data-b="perMonthTxt"]')).toHaveText('₱7,800');
 await page.locator('#calculator [data-action="pickBase"]').click();
 await expect(page.locator('[data-b="perMonthTxt"]')).toHaveText('₱7,000');
 await page.locator('#pricing [data-action="setAnnual"]').click();
 await expect(page.locator('[data-b="perMonthTxt"]')).toHaveText('₱5,600');
 await page.locator('#calculator [data-action="pickMid"]').click();
 await expect(page.locator('[data-b="planName"]').first()).toHaveText('Mid');
 await page.locator('#users').evaluate(el=>{el.value='35';el.dispatchEvent(new Event('input',{bubbles:true}));});
 await expect(page.locator('[data-b="perMonthTxt"]')).toHaveText('₱7,280');
});
test('product hero is static, followed by scroll-driven feature story',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/thryvems.html');
 await expect(page.locator('h1')).toContainText('Quality management.');
 await expect(page.locator('h1')).toContainText('Made workable.');
 await expect(page.locator('.puzzle-stage')).toHaveCount(0);
 await expect(page.locator('.product-hero .product-hero-browser')).toBeVisible();
 await page.screenshot({path:'test-results/screenshots/product-hero-desktop.png'});
 await page.evaluate(()=>{
  const section=document.querySelector('#system');
  window.scrollTo({top:section.getBoundingClientRect().top+scrollY+230,behavior:'instant'});
 });
 await page.waitForTimeout(180);
 await expect(page.locator('.story-item').first()).toHaveClass(/active/);
 await expect(page.locator('.demo-panel').first()).toHaveClass(/active/);
 await expect(page.locator('.story-browser')).toBeVisible();
 await expect(page.locator('.story-browser-sidebar img')).toHaveAttribute('src','assets/thryvems-logo.svg');
 await expect(page.locator('.story-screen-panel')).toHaveCount(4);
 await expect(page.locator('.story-readiness')).toBeVisible();
 await expect(page.locator('.story-browser-caption')).toContainText('Synthetic example data');
 await expect(page.locator('.story-browser-location')).toHaveText('Overview');
 await page.screenshot({path:'test-results/screenshots/story-readiness-desktop.png'});
 await page.evaluate(()=>{
  const item=document.querySelectorAll('.story-item')[2];
  window.scrollTo({top:item.getBoundingClientRect().top+scrollY-230,behavior:'instant'});
 });
 await page.waitForTimeout(180);
 await expect(page.locator('.story-item').nth(2)).toHaveClass(/active/);
 await expect(page.locator('.demo-panel').nth(2)).toHaveClass(/active/);
 await expect(page.locator('.story-audit-calendar')).toBeVisible();
 await expect(page.locator('.story-browser-location')).toHaveText('Audits');
 await page.screenshot({path:'test-results/screenshots/story-audits-desktop.png'});
 await expect(page.locator('.back-to-top')).toHaveClass(/visible/);
 await page.locator('.back-to-top').click();
 await page.waitForFunction(()=>scrollY<10,{}, {timeout:15000});
});
for(const width of [390,768,1280,1920]){
 test('responsive layout '+width+'px has no horizontal overflow and produces screenshot',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/thryvems.html');
  await expect(page.locator('h1')).toContainText('Made workable.');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  if (overflow > 2) {
    const offenders = await page.evaluate(()=>[...document.querySelectorAll('body *')]
      .filter(el=>{const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left < -2)})
      .slice(0,14).map(el=>({tag:el.tagName,cls:el.className?.toString().slice(0,90),text:el.textContent?.trim().slice(0,50),rect:{x:Math.round(el.getBoundingClientRect().x),w:Math.round(el.getBoundingClientRect().width),right:Math.round(el.getBoundingClientRect().right)}})));
    console.log('Overflow diagnostics', width, JSON.stringify(offenders));
  }
  expect(overflow).toBeLessThanOrEqual(2);
  await page.screenshot({path:'test-results/screenshots/landing-'+width+'.png',fullPage:true});
 });
}
test('problem statement reaches a readable centered hold', async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/thryvems.html');
 await page.evaluate(()=>{
  const section=document.querySelector('.problem-scroll');
  window.scrollTo({top:section.getBoundingClientRect().top+scrollY+Math.max(1,section.offsetHeight-innerHeight)*.55,behavior:"instant"});
 });
 await page.waitForTimeout(200);
 const data=await page.locator('.big-statement').evaluate(el=>{
  const r=el.getBoundingClientRect();
  return {center:r.top+r.height/2,words:[...el.querySelectorAll('.problem-word')].map(w=>Number(getComputedStyle(w).opacity))};
 });
 expect(Math.abs(data.center-450)).toBeLessThan(60);
 expect(Math.min(...data.words)).toBeGreaterThan(.95);
 await page.screenshot({path:'test-results/screenshots/problem-held-desktop.png',fullPage:false});
});

test('fixed navigation and Thync & Thryve typography on desktop and mobile',async({page})=>{
  await page.setViewportSize({width:1280,height:900});
  await page.goto('/thryvems.html');
  await page.evaluate(()=>document.fonts.ready);
  const fonts=await page.evaluate(()=>({
    body:getComputedStyle(document.body).fontFamily,
    title:getComputedStyle(document.querySelector('h1')).fontFamily,
    nav:getComputedStyle(document.querySelector('.nav')).position,
    navFont:getComputedStyle(document.querySelector('.nav-links')).fontFamily
  }));
  expect(fonts.body).toContain('Inter');
  expect(fonts.title).toContain('Montserrat');
  expect(fonts.navFont).toContain('Montserrat');
  expect(fonts.nav).toBe('fixed');

  await page.evaluate(()=>window.scrollTo({top:3000,behavior:'instant'}));
  const navTop=await page.locator('.nav').evaluate(el=>el.getBoundingClientRect().top);
  expect(Math.abs(navTop-16)).toBeLessThan(2);
  await page.screenshot({path:'test-results/screenshots/fixed-nav-desktop.png'});

  await page.setViewportSize({width:390,height:844});
  await page.evaluate(()=>window.scrollTo({top:1900,behavior:'instant'}));
  const mobileTop=await page.locator('.nav').evaluate(el=>el.getBoundingClientRect().top);
  expect(Math.abs(mobileTop-10)).toBeLessThan(2);
  await page.locator('.menu-toggle').click();
  await expect(page.locator('.mobile-menu')).toHaveClass(/open/);
  await page.screenshot({path:'test-results/screenshots/fixed-nav-mobile.png'});
});

test('hero and storytelling order are accessible with reduced motion', async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/thryvems.html');
 const details=await page.evaluate(()=>{
  const hero=document.querySelector('.product-hero');
  const system=document.querySelector('#system');
  const problem=document.querySelector('.problem');
  return {
   heroBeforeSystem:hero.compareDocumentPosition(system) & Node.DOCUMENT_POSITION_FOLLOWING,
   storyBeforeProblem:system.compareDocumentPosition(problem) & Node.DOCUMENT_POSITION_FOLLOWING,
   heroPosition:getComputedStyle(hero).position,
   heroHeight:hero.getBoundingClientRect().height
  };
 });
 expect(details.heroBeforeSystem).toBeTruthy();
 expect(details.storyBeforeProblem).toBeTruthy();
 expect(details.heroPosition).not.toBe('sticky');
 expect(details.heroHeight).toBeLessThan(1400);
 await expect(page.locator('.product-hero-visual')).toBeVisible();
});

test('mobile story stages are selectable without pinned puzzle animation', async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/thryvems.html');
 const story=page.locator('.story-item');
 await story.nth(1).click();
 await expect(story.nth(1)).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('.demo-top h4')).toHaveText('Documents in review');
 await story.nth(2).click();
 await expect(page.locator('.demo-top h4')).toHaveText('Audit management');
 await expect(page.locator('.demo-panel').nth(2)).toHaveClass(/active/);
 await page.screenshot({path:'test-results/screenshots/story-mobile-selected.png'});
});

test('scroll story keeps the hero dashboard design while panels change',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/thryvems.html');
 await page.evaluate(()=>{
   const story=document.querySelector('#system');
   window.scrollTo({top:story.getBoundingClientRect().top+scrollY+225,behavior:'instant'});
 });
 await expect(page.locator('.story-screen-panel').first()).toHaveClass(/active/);
 const style=await page.locator('.story-browser').evaluate(el=>({
   frame:getComputedStyle(el).borderRadius,
   side:getComputedStyle(el.querySelector('.story-browser-sidebar')).backgroundColor,
   visible:getComputedStyle(el).visibility,
   layout:el.querySelector('.story-browser-app').getBoundingClientRect().height
 }));
 expect(style.visible).toBe('visible');
 expect(style.layout).toBeGreaterThan(350);
 await expect(page.locator('.story-metrics')).toBeVisible();
 await expect(page.locator('.product-sticky')).toHaveCSS('opacity','1');
 await expect(page.locator('.story-screen-panel').nth(1)).toHaveCSS('display','none');
 await page.screenshot({path:'test-results/screenshots/story-matching-hero-readiness.png'});
 const labels=['Documents in review','Audit management','Corrective actions'];
 for(let i=1;i<4;i++){
   await page.evaluate(i=>{
      const item=document.querySelectorAll('.story-item')[i];
      window.scrollTo({top:item.getBoundingClientRect().top+scrollY-220,behavior:'instant'});
   },i);
   await expect(page.locator('.demo-panel').nth(i)).toHaveClass(/active/);
   await expect(page.locator('.demo-top h4')).toHaveText(labels[i-1]);
 }
 await expect(page.locator('.story-actions-card')).toBeVisible();
 await expect(page.locator('.story-screen-panel').first()).toHaveCSS('display','none');
 await page.waitForTimeout(340);
 await page.screenshot({path:'test-results/screenshots/story-matching-hero-actions.png'});
});
test('mobile story preview matches hero shell and supports all stage selections', async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/thryvems.html');
 await page.locator('.story-item').nth(1).click();
 await expect(page.locator('.story-browser-location')).toHaveText('Documents');
 await expect(page.locator('.story-document-list')).toBeVisible();
 await page.locator('.story-item').nth(3).click();
 await expect(page.locator('.story-actions-card')).toBeVisible();
 await expect(page.locator('.demo-nav span').nth(3)).toHaveClass(/active/);
 await page.locator('.story-browser').scrollIntoViewIfNeeded();
 await page.waitForTimeout(340);
 const previewRect=await page.locator('.story-browser').evaluate(el=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom}});
 expect(previewRect.top).toBeLessThan(844);
 expect(previewRect.bottom).toBeGreaterThan(0);
 await page.screenshot({path:'test-results/screenshots/story-matching-hero-mobile-actions.png'});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 expect(overflow).toBeLessThanOrEqual(2);
});

test('post-problem modules, tiers, stack and timeline animate as scroll advances and reverses',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/thryvems.html');
 await expect(page.locator('html')).toHaveClass(/after-problem-motion/);
 const go=(selector,offset)=>page.evaluate(({selector,offset})=>{
   const el=document.querySelector(selector);
   if(!el) throw Error('Missing target '+selector);
   const target=el.getBoundingClientRect().top+scrollY-offset;
   window.scrollTo({top:target,behavior:'instant'});
 },{selector,offset});
 const progress=selector=>page.locator(selector).first().evaluate(el=>Number(el.style.getPropertyValue('--after-progress')));
 const rowUnderline=()=>page.locator('.process-step').first().evaluate(el=>{
   const row=el.getBoundingClientRect();
   const style=getComputedStyle(el,'::after');
   const number=el.querySelector('.n').getBoundingClientRect();
   return {width:parseFloat(style.width),height:parseFloat(style.height),
     left:parseFloat(style.left),bottom:parseFloat(style.bottom),
     color:style.backgroundColor,numberBottom:number.bottom,
     rowBottom:row.bottom,processListBefore:getComputedStyle(el.parentElement,'::before').content};
 });

 await go('#modules .module',600);
 await expect.poll(()=>progress('#modules .module')).toBeGreaterThan(.05);
 const mid=await progress('#modules .module');
 await page.screenshot({path:'test-results/screenshots/motion-modules-mid.png'});
 await go('#modules .module',100);
 await expect.poll(()=>progress('#modules .module')).toBeGreaterThan(.95);
 const full=await progress('#modules .module');
 expect(full).toBeGreaterThan(mid);
 await page.screenshot({path:'test-results/screenshots/motion-modules-full.png'});
 await go('#modules .module',650);
 await expect.poll(()=>progress('#modules .module')).toBeLessThan(mid);

 await go('#pricing > div:nth-child(2)',270);
 await expect.poll(()=>progress('#pricing > div:nth-child(2) > div')).toBeGreaterThan(.85);
 await expect(page.locator('#pricing')).toContainText('Enterprise');
 await page.screenshot({path:'test-results/screenshots/motion-pricing.png'});

 await go('.integration-visual',140);
 await expect.poll(()=>progress('.integration-visual .stack-card.one')).toBeGreaterThan(.8);
 await expect(page.locator('.stack-card')).toHaveCount(3);
 await expect(page.locator('.integration h2')).toHaveClass(/visible/);
 await page.waitForTimeout(950);
 await page.screenshot({path:'test-results/screenshots/motion-integration.png'});

 await go('.process-list',250);
 await expect.poll(()=>progress('.process-step')).toBeGreaterThan(.20);
 const underline=await rowUnderline();
 expect(underline.processListBefore).toBe('none');
 expect(underline.height).toBe(2);
 expect(underline.left).toBe(0);
 expect(underline.bottom).toBe(-1);
 expect(underline.width).toBeGreaterThan(900);
 await page.screenshot({path:'test-results/screenshots/motion-process-line-aligned.png'});
 await go('.process-step:first-child',600);
 await expect.poll(()=>progress('.process-step')).toBeLessThan(.9);
 const partial=await progress('.process-step');
 expect(partial).toBeGreaterThan(.15);
 await go('.process-step:first-child',100);
 await expect.poll(()=>progress('.process-step')).toBeGreaterThan(.95);
 expect(await progress('.process-step')).toBeGreaterThan(partial);
 await go('.process-step:last-child',110);
 await expect.poll(()=>progress('.process-step:last-child')).toBeGreaterThan(.95);
 await page.screenshot({path:'test-results/screenshots/motion-process.png'});
 await go('.process-step:first-child',640);
 await expect.poll(()=>progress('.process-step')).toBeLessThan(partial);

 await go('#contact .contact-card',180);
 await expect.poll(()=>progress('#contact .contact-copy')).toBeGreaterThan(.70);
 await expect(page.locator('.contact-form')).toBeVisible();
 await expect(page.locator('.contact-card')).toHaveClass(/visible/);
 await page.waitForTimeout(950);
 await page.screenshot({path:'test-results/screenshots/motion-contact.png'});
});

test('post-problem choreography stays compact on mobile and honors reduced motion',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/thryvems.html');
 await page.evaluate(()=>{
  const card=document.querySelector('#modules .module');
  window.scrollTo({top:card.getBoundingClientRect().top+scrollY-140,behavior:'instant'});
 });
 await expect.poll(()=>page.locator('#modules .module').first().evaluate(el=>Number(el.style.getPropertyValue('--after-progress')))).toBeGreaterThan(.95);
 const mobile=await page.locator('#modules .module').first().evaluate(el=>getComputedStyle(el).transform);
 expect(mobile).not.toBe('none');
 await page.screenshot({path:'test-results/screenshots/motion-modules-mobile.png'});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(2);

 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload();
 await expect(page.locator('html')).not.toHaveClass(/after-problem-motion/);
 await page.locator('#pricing').scrollIntoViewIfNeeded();
 await expect(page.locator('[data-b="baseShown"]')).not.toBeEmpty();
 await expect(page.locator('.integration-visual .stack-card')).toHaveCount(3);
 await page.screenshot({path:'test-results/screenshots/motion-reduced-mobile.png'});
});

test('implementation progress never crosses numbered steps at desktop and mobile sizes',async({page})=>{
 for (const width of [390,768,1280,1920]) {
   await page.setViewportSize({width,height:900});
   await page.goto('/thryvems.html');
   await page.evaluate(()=>{
     const list=document.querySelector('.process-list');
     window.scrollTo({top:list.getBoundingClientRect().top+scrollY-220,behavior:'instant'});
   });
   await expect.poll(()=>page.locator('.process-step').first().evaluate(
     el=>Number(el.style.getPropertyValue('--after-progress')))).toBeGreaterThan(.20);
   const placement=await page.evaluate(()=>{
     const list=document.querySelector('.process-list');
     const row=list.querySelector('.process-step');
     const num=row.querySelector('.n').getBoundingClientRect();
     const rowRect=row.getBoundingClientRect();
     const line=getComputedStyle(row,'::after');
     return {verticalLine:getComputedStyle(list,'::before').content,
       underlineHeight:parseFloat(line.height),left:parseFloat(line.left),
       right:parseFloat(line.right),rowHeight:rowRect.height,
       numberBottom:num.bottom,rowBottom:rowRect.bottom,
       overflows:document.documentElement.scrollWidth-document.documentElement.clientWidth};
   });
   expect(placement.verticalLine).toBe('none');
   expect(placement.underlineHeight).toBe(2);
   expect(placement.left).toBe(0);
   expect(placement.right).toBe(0);
   expect(placement.rowBottom-placement.numberBottom).toBeGreaterThan(10);
   expect(placement.overflows).toBeLessThanOrEqual(2);
   await page.screenshot({path:'test-results/screenshots/implementation-progress-'+width+'.png'});
 }
});

test('company homepage shows ISO guidance and shared training/consultancy scope without fake bookings',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/index.html');
 await expect(page).toHaveTitle(/Thync & Thryve/);
 await expect(page.locator('#iso-guide')).toContainText('Not sure which ISO standard applies');
 await expect(page.locator('#programs .company-standard')).toHaveCount(7);
 await expect(page.locator('#programs')).toContainText('Training and consultancy');
 await expect(page.locator('#programs')).toContainText('proposed');
 await expect(page.locator('#about')).toContainText('ISO training, consultancy and digital QMS solutions.');
 await expect(page.locator('#about')).not.toContainText('[One line');
 await expect(page.locator('#schedule')).not.toContainText('[DATE]');
 await expect(page.locator('#schedule')).not.toContainText('Register');
 await expect(page.locator('#contact button')).toBeDisabled();
 await expect(page.locator('#contact')).toContainText('does not send or save enquiries');
 await expect(page.locator('a[href="thryvems.html"]').first()).toBeAttached();
 const areas=[
  ['quality','ISO 9001 Lead Auditor Training'],
  ['environment','Environmental Aspects and Impacts Assessment Workshop'],
  ['safety','Hazard Identification and Risk Assessment Workshop'],
  ['technology','ISO/IEC 42001:2023'],
  ['food','HACCP Principles and Application'],
  ['governance','ISO 31000:2018'],
  ['sectors','ISO/IEC 17025:2017'],
 ];
 for(const [area,program] of areas){
  const details=page.locator('#standard-'+area);
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open','');
  await expect(details).toContainText(program);
  await expect(details).toContainText('Consultancy');
  await expect(details.locator('.company-standards-cta')).toHaveAttribute('href','#contact');
 }
 await page.screenshot({path:'test-results/screenshots/company-training-consultancy-expanded.png',fullPage:true});
 await page.locator('#standard-quality summary').click();
 await expect(page.locator('#standard-quality')).not.toHaveAttribute('open','');
});

for(const width of [390,768,1280,1920]){
 test('company homepage is readable and scroll-free horizontally at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/index.html');
  await expect(page.getByRole('heading',{level:1})).toContainText('Think it through');
  await expect(page.locator('#programs .company-standard')).toHaveCount(7);
  await expect(page.locator('a[href="#iso-guide"]').first()).toBeAttached();
  if(width===390){
    const headingPx=await page.locator('#top h1').evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
    expect(headingPx).toBeLessThanOrEqual(48);
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  if(overflow>2){
   const offenders=await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>{
    const r=el.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left< -2)
   }).slice(0,10).map(el=>({tag:el.tagName,text:el.textContent?.slice(0,45),width:Math.round(el.getBoundingClientRect().width)})));
   console.log('Company overflow',width,JSON.stringify(offenders));
  }
  expect(overflow).toBeLessThanOrEqual(2);
  await page.screenshot({path:'test-results/screenshots/company-'+width+'.png',fullPage:true});
 });
}

test('company links lead to real sections, no unverified booking or broken catalog anchors',async({page})=>{
 await page.goto('/index.html');
 const internalLinks=await page.locator('a[href^="#"]').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')));
 const missing=await page.evaluate(links=>links.filter(h=>h.length>1&&!document.getElementById(h.slice(1))),internalLinks);
 expect(missing).toEqual([]);
 await expect(page.getByRole('link',{name:'Explore training programs'})).toHaveAttribute('href','#programs');
 await expect(page.locator('#programs')).toContainText('independent bodies');
 await page.locator('#standard-sectors summary').focus();
 await page.keyboard.press('Enter');
 await expect(page.locator('#standard-sectors')).toHaveAttribute('open','');
 const productLink=page.locator('a[href="thryvems.html"]').first();
 await expect(productLink).toBeAttached();
 await page.screenshot({path:'test-results/screenshots/company-accessible-catalog.png'});
});

test('company tells a four-stage connected story as objects and route travel with scroll',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/index.html');
 const story=page.locator('#company-story');
 await expect(page.locator('html')).toHaveClass(/company-motion-enabled/);
 await expect(story.locator('[data-motion-object]')).toHaveCount(4);
 await expect(story.locator('[data-motion-chapter]')).toHaveCount(4);
 const seek=p=>page.evaluate(p=>{
  const el=document.querySelector('#company-story');
  const top=el.getBoundingClientRect().top+scrollY;
  const travel=el.offsetHeight-innerHeight;
  window.scrollTo({top:top+travel*p,behavior:'instant'});
 },p);
 const progress=()=>story.evaluate(el=>Number(el.style.getPropertyValue('--story-progress')));
 const arrival=i=>story.locator('[data-motion-object="'+i+'"]').evaluate(el=>Number(el.style.getPropertyValue('--arrival')));
 const dot=()=>story.locator('.company-motion-traveler').evaluate(el=>Number(el.getAttribute('cx'))+Number(el.getAttribute('cy')));
 await seek(.06);
 await expect.poll(progress).toBeGreaterThan(.05);
 await expect.poll(()=>arrival(1)).toBeLessThan(.25);
 const startDot=await dot();
 await page.screenshot({path:'test-results/screenshots/company-story-learn.png'});
 await seek(.37);
 await expect.poll(progress).toBeGreaterThan(.35);
 await expect.poll(()=>arrival(1)).toBeGreaterThan(.90);
 await expect(story.locator('[data-motion-chapter="1"]')).toHaveClass(/is-active/);
 const middleDot=await dot();
 expect(middleDot).not.toBe(startDot);
 await page.screenshot({path:'test-results/screenshots/company-story-train.png'});
 await seek(.63);
 await expect.poll(()=>arrival(2)).toBeGreaterThan(.80);
 await expect(story.locator('[data-motion-chapter="2"]')).toHaveClass(/is-active/);
 await page.screenshot({path:'test-results/screenshots/company-story-consultancy.png'});
 await seek(.94);
 await expect.poll(()=>arrival(3)).toBeGreaterThan(.95);
 await expect(story.locator('[data-motion-chapter="3"]')).toHaveClass(/is-active/);
 await expect(story.locator('.company-motion-current')).toHaveText('04');
 const finalDot=await dot();
 expect(finalDot).not.toBe(middleDot);
 await page.screenshot({path:'test-results/screenshots/company-story-thryvems.png'});
 await seek(.06);
 await expect.poll(()=>arrival(3)).toBeLessThan(.08);
 await expect(story.locator('.company-motion-current')).toHaveText('01');
 await expect(story.locator('[data-motion-chapter="0"]')).toHaveClass(/is-active/);
});

for(const width of [390,768,1280,1920]){
 test('company motion graphics keep existing layout readable at '+width+'px',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/index.html');
  await expect(page.locator('#company-story .company-motion-object')).toHaveCount(4);
  await expect(page.locator('#programs .company-standard')).toHaveCount(7);
  await expect(page.locator('#contact button')).toBeDisabled();
  const story=page.locator('#company-story');
  if(width<=860){
    const shape=await story.evaluate(el=>({
      sticky:getComputedStyle(el.querySelector('.company-motion-sticky')).position,
      height:el.getBoundingClientRect().height,
      allVisible:[...el.querySelectorAll('.company-motion-object')].every(x=>getComputedStyle(x).opacity==='1')
    }));
    expect(shape.sticky).toBe('relative');
    expect(shape.height).toBeLessThan(1450);
    expect(shape.allVisible).toBe(true);
  } else {
    await story.scrollIntoViewIfNeeded();
    await expect.poll(()=>story.evaluate(el=>getComputedStyle(el.querySelector('.company-motion-sticky')).position)).toBe('sticky');
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  await story.locator('.company-motion-board').scrollIntoViewIfNeeded();
  await page.screenshot({path:'test-results/screenshots/company-story-'+width+'.png'});
  if(width===390){
    const gap=await page.locator('.company-motion-board').evaluate(el=>{
      const label=el.querySelector('.company-motion-board-label').getBoundingClientRect();
      const first=el.querySelector('.company-motion-object-0').getBoundingClientRect();
      return first.top-label.bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(5);
    await page.screenshot({path:'test-results/screenshots/company-story-mobile-graphic.png'});
  }
 });
}

test('company story remains legible, accessible and static with reduced motion or missing JS',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/index.html');
 await expect(page.locator('html')).not.toHaveClass(/company-motion-enabled/);
 const s=await page.locator('#company-story').evaluate(el=>({
   sticky:getComputedStyle(el.querySelector('.company-motion-sticky')).position,
   height:el.getBoundingClientRect().height,
   opacity:[...el.querySelectorAll('.company-motion-object')].map(e=>getComputedStyle(e).opacity),
 }));
 expect(s.sticky).not.toBe('sticky');
 expect(s.height).toBeLessThan(1100);
 expect(s.opacity.every(x=>Number(x)===1)).toBe(true);
 await expect(page.locator('#company-story')).toContainText('ThryveMS');
 await page.screenshot({path:'test-results/screenshots/company-story-reduced-motion.png'});
 await page.route('**/thync-thryve-motion.js*',route=>route.abort());
 await page.reload();
 await expect(page.locator('#company-story .company-motion-object')).toHaveCount(4);
 await expect(page.locator('#company-story .company-motion-chapter')).toHaveCount(4);
 await expect(page.locator('#company-story')).toBeVisible();
});

test('company service sections have different scroll entrances without interrupting details',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/index.html');
 const item=page.locator('.company-step').first();
 await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
 await expect.poll(()=>item.evaluate(el=>Number(el.style.getPropertyValue('--scene-reveal')))).toBeLessThan(.05);
 await item.scrollIntoViewIfNeeded();
 await expect.poll(()=>item.evaluate(el=>Number(el.style.getPropertyValue('--scene-reveal')))).toBeGreaterThan(.65);
 const first=page.locator('#standard-quality summary');
 await first.click();
 await expect(page.locator('#standard-quality')).toHaveAttribute('open','');
 await expect(page.locator('#standard-quality')).toContainText('ISO 9001 Internal Auditor Training');
});


test('company Solutions and How we work cards continue the scroll-motion story without changing links or prices',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/index.html');
 await expect(page.locator('.company-solution-plans > a')).toHaveCount(3);
 await expect(page.locator('.company-work-steps > div')).toHaveCount(4);
 const query=selector=>page.locator(selector).first().evaluate(el=>Number(el.style.getPropertyValue('--scene-reveal')));
 const enter=selector=>page.evaluate(selector=>{
  const el=document.querySelector(selector);
  window.scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.5,behavior:'instant'});
 },selector);
 await enter('.company-solution-plans');
 await expect.poll(()=>query('.company-solution-plans > a')).toBeGreaterThan(.65);
 await expect(page.locator('.company-solution-plans')).toContainText('₱4,000');
 await expect(page.locator('.company-solution-plans')).toContainText('₱6,500');
 const solutionGaps=await page.locator('.company-solution-plans > a').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect()));
 for(let i=0;i<solutionGaps.length-1;i++)expect(solutionGaps[i+1].top-solutionGaps[i].bottom).toBeGreaterThanOrEqual(0);
 await page.screenshot({path:'test-results/screenshots/company-solutions-motion.png'});
 await enter('.company-work-steps');
 await expect.poll(()=>query('.company-work-steps > div')).toBeGreaterThan(.65);
 await expect(page.locator('.company-work-steps')).toContainText('Run & improve');
 const workGaps=await page.locator('.company-work-steps > div').evaluateAll(nodes=>nodes.map(n=>n.getBoundingClientRect()));
 for(let i=0;i<workGaps.length-1;i++)expect(workGaps[i+1].left-workGaps[i].right).toBeGreaterThanOrEqual(0);
 await page.screenshot({path:'test-results/screenshots/company-how-we-work-motion.png'});
});

test('company Back to top matches product layout, only appears after scrolling, and returns to hero',async({page})=>{
 for(const width of [390,768,1280,1920]){
  await page.setViewportSize({width,height:900});
  await page.goto('/index.html');
  const topButton=page.getByRole('button',{name:'Back to top',includeHidden:true});
  await expect(topButton).toHaveCount(1);
  await expect(topButton).not.toBeVisible();
  await expect(topButton).toHaveAttribute('aria-hidden','true');
  await expect(topButton).toHaveAttribute('tabindex','-1');
  await page.evaluate(()=>window.scrollTo({top:Math.min(document.documentElement.scrollHeight-innerHeight,850),behavior:'instant'}));
  await expect.poll(()=>topButton.getAttribute('aria-hidden')).toBe('false');
  await expect(topButton).toBeVisible();
  await expect(topButton).toHaveClass(/visible/);
  await page.waitForTimeout(450); // Measure after the same product entrance transition has settled.
  const companyRect=await topButton.boundingBox();
  expect(companyRect).toBeTruthy();
  expect(Math.abs(companyRect.x + companyRect.width/2-width/2)).toBeLessThan(2);
  expect(companyRect.width).toBe(width<=760?52:58);
  expect(Math.abs(900-companyRect.y-companyRect.height-(width<=760?16:Math.max(18,Math.min(width*.024,32))))).toBeLessThan(2);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(2);
  await page.screenshot({path:'test-results/screenshots/company-back-to-top-'+width+'.png'});
  await topButton.click();
  await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:12000}).toBeLessThan(10);
  await expect(topButton).not.toBeVisible();
  await expect(topButton).toHaveAttribute('tabindex','-1');

  // Match exact size and centered placement on the reference ThryveMS landing.
  await page.goto('/thryvems.html');
  await page.evaluate(()=>window.scrollTo({top:900,behavior:'instant'}));
  const productButton=page.locator('.back-to-top');
  await expect(productButton).toBeVisible();
  await page.waitForTimeout(450); // The reference button uses a .32s transform transition.
  const productRect=await productButton.boundingBox();
  expect(productRect).toBeTruthy();
  expect(Math.abs(companyRect.x-productRect.x)).toBeLessThan(2);
  expect(Math.abs(companyRect.width-productRect.width)).toBeLessThan(1);
  expect(Math.abs(companyRect.y-productRect.y)).toBeLessThan(2);
 }
});

test('company Back to top supports keyboard and prefers reduced motion',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/index.html');
 await page.evaluate(()=>window.scrollTo({top:920,behavior:'instant'}));
 const button=page.locator('.company-back-to-top');
 await expect(button).toHaveAttribute('aria-label','Back to top');
 await expect(button).toBeVisible();
 await expect(button).toHaveAttribute('tabindex','0');
 await button.focus();
 await expect(button).toBeFocused();
 await page.keyboard.press('Enter');
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeLessThan(10);
 await expect(button).not.toBeVisible();
 await expect(button).toHaveAttribute('aria-hidden','true');
});

test('cookie notice is accurate, accessible, dismissible and shared across both pages', async ({page}) => {
 await page.goto('/index.html');
 const notice=page.getByRole('region',{name:'Cookie notice'});
 await expect(notice).toBeVisible();
 await expect(notice).toContainText('do not use optional analytics or advertising cookies');
 await notice.getByRole('link',{name:'Cookie details'}).click();
 await expect(page).toHaveURL(/cookies\.html$/);
 await expect(page.locator('h1')).toHaveText('Cookie notice');
 await page.getByRole('region',{name:'Cookie notice'}).getByRole('button',{name:'Got it'}).click();
 await page.goto('/thryvems.html');
 await expect(page.getByRole('region',{name:'Cookie notice'})).toHaveCount(0);
});
test('both inquiry forms stay disabled without real backend readiness', async ({page}) => {
 for(const path of ['/index.html','/thryvems.html']){
  await page.goto(path);
  await expect(page.locator('[data-inquiry-submit]')).toBeDisabled();
  await expect(page.locator('[data-inquiry-form] [data-human-check]')).toHaveCount(1);
  await expect(page.locator('[data-inquiry-status]')).not.toContainText('was received');
 }
});
test('company inquiry requires human verification and confirms only accepted server delivery', async ({page}) => {
 let sent=null;
 await page.route('**/api/inquiry/config',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ready:true,sitekey:'1x00000000000000000000AA'})}));
 await page.route('**/api/inquiry',async route => {
   sent=route.request().postDataJSON();
   await route.fulfill({status:200,contentType:'application/json',body:'{"accepted":true}'});
 });
 await page.addInitScript(() => {
   window.__callbacks={};
   window.turnstile={
     render:(slot,options)=>{window.__callbacks[slot.closest('form').dataset.inquiryForm]=options.callback;return 'widget';},
     reset:()=>{}
   };
 });
 await page.goto('/index.html');
 const form=page.locator('[data-inquiry-form="company"]');
 await expect(form.locator('[data-inquiry-submit]')).toBeDisabled();
 await form.locator('[name=name]').fill('Sample Contact');
 await form.locator('[name=email]').fill('sample@example.invalid');
 await form.locator('[name=interest]').selectOption({label:'Consultancy'});
 await form.locator('[name=message]').fill('Synthetic inquiry');
 await page.evaluate(()=>window.__callbacks.company('synthetic-human-token'));
 await expect(form.locator('[data-inquiry-submit]')).toBeEnabled();
 await form.locator('[data-inquiry-submit]').click();
 await expect(form.locator('[data-inquiry-status]')).toContainText('enquiry was received');
 expect(sent).toMatchObject({source:'company',name:'Sample Contact',email:'sample@example.invalid',interest:'Consultancy',turnstileToken:'synthetic-human-token'});
 await expect(form.locator('[data-inquiry-submit]')).toBeDisabled();
});
test('rejected delivery never shows successful submission',async({page})=>{
 await page.route('**/api/inquiry/config',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ready:true,sitekey:'1x00000000000000000000AA'})}));
 await page.route('**/api/inquiry',route=>route.fulfill({status:503,contentType:'application/json',body:'{"accepted":false}'}));
 await page.addInitScript(()=>{window.__callbacks={};window.turnstile={render:(slot,opt)=>{window.__callbacks[slot.closest('form').dataset.inquiryForm]=opt.callback;return 1;},reset:()=>{}};});
 await page.goto('/thryvems.html');
 const form=page.locator('[data-inquiry-form="thryvems"]');
 await form.locator('[name=name]').fill('Sample Contact');
 await form.locator('[name=email]').fill('sample@example.invalid');
 await page.evaluate(()=>window.__callbacks.thryvems('synthetic-human-token'));
 await form.locator('[data-inquiry-submit]').click();
 await expect(form.locator('[data-inquiry-status]')).toContainText('could not confirm delivery');
 await expect(form.locator('[data-inquiry-submit]')).toBeDisabled();
});
