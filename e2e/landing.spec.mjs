import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
mkdirSync('test-results/screenshots',{recursive:true});
test('product landing preserves the company identity, modules, tiers and navigation',async({page})=>{
 await page.goto('/thryvems.html');
 await expect(page).toHaveTitle(/ThryveMS/);
 await expect(page.locator('.puzzle-piece')).toHaveCount(9);
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
test('puzzle assembles and holds with a scroll-to-top control',async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.goto('/thryvems.html');
 const scroll=async raw=>page.evaluate(raw=>{
  const hero=document.querySelector('.hero-puzzle');
  window.scrollTo({top:hero.offsetTop+Math.max(1,hero.offsetHeight-innerHeight)*raw,behavior:"instant"});
 },raw);
 await scroll(.56);
 await expect(page.locator('.hero-puzzle')).toHaveClass(/focused/);
 await expect(page.locator('.hero-puzzle')).toHaveClass(/solved/);
 const center=await page.locator('.puzzle-stage').evaluate(el=>{const r=el.getBoundingClientRect();return r.top+r.height/2});
 expect(Math.abs(center-450)).toBeLessThan(55);
 await expect(page.locator('.back-to-top')).toHaveClass(/visible/);
 await page.screenshot({path:'test-results/screenshots/puzzle-held-desktop.png',fullPage:false});
 await page.locator('.back-to-top').click();
 await page.waitForFunction(()=>scrollY<10,{}, {timeout:15000});
});
for(const width of [390,768,1280,1920]){
 test('responsive layout '+width+'px has no horizontal overflow and produces screenshot',async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.goto('/thryvems.html');
  await expect(page.locator('h1')).toContainText('Bring every');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
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
