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
 const line=()=>page.locator('.process-list').evaluate(el=>Number(el.style.getPropertyValue('--after-line')));

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
 await page.screenshot({path:'test-results/screenshots/motion-integration.png'});

 await go('.process-list',100);
 await expect.poll(line).toBeGreaterThan(.25);
 const first=await line();
 await go('.process-step:last-child',110);
 await expect.poll(line).toBeGreaterThan(.80);
 expect(await line()).toBeGreaterThan(first);
 await page.screenshot({path:'test-results/screenshots/motion-process.png'});

 await go('#contact .contact-card',180);
 await expect.poll(()=>progress('#contact .contact-copy')).toBeGreaterThan(.70);
 await expect(page.locator('.contact-form')).toBeVisible();
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
