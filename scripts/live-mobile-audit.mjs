import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const pages=[['company','/'],['software','/thryvems.html'],['consultancy','/iso-consultancy-philippines/']];
const widths=[390,768,1280,1920];
const checks=[];
mkdirSync('test-results/phase1-live',{recursive:true});
let browser;
try{
 browser=await chromium.launch({headless:true});
 for(const [name,path] of pages) for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:800},deviceScaleFactor:1});
   let details={};
   try{
     const response=await page.goto('https://thyncandthryve.com'+path,{waitUntil:'load',timeout:25000});
     await page.locator('h1').first().waitFor({state:'visible',timeout:10000});
     await page.evaluate(async()=>{await document.fonts.ready;await new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done)));});
     details=await page.evaluate(()=>({
       viewport:window.innerWidth,
       documentWidth:document.documentElement.scrollWidth,
       navLinks:document.querySelectorAll('nav a[href],header a[href]').length,
       hasH1:Boolean(document.querySelector('h1')),
       cssLoaded:location.pathname.includes('iso-consultancy')?getComputedStyle(document.querySelector('.seo-nav')).display==='flex':location.pathname.includes('thryvems.html')?getComputedStyle(document.body).overflowX==='hidden':true
     }));
     if(details.documentWidth>details.viewport+1){
       details.overflowCandidates=await page.evaluate(()=>{
         return [...document.querySelectorAll('body *')].map(el=>{
           const rect=el.getBoundingClientRect();
           const st=getComputedStyle(el);
           return {tag:el.tagName.toLowerCase(),className:String(el.className?.baseVal??el.className??'').slice(0,110),
             text:(el.textContent??'').replace(/\s+/g,' ').slice(0,75),
             right:Math.round(rect.right),left:Math.round(rect.left),width:Math.round(rect.width),
             scroll:el.scrollWidth,client:el.clientWidth,overflowX:st.overflowX,position:st.position};
         }).filter(x=>x.right>innerWidth+1||x.left< -1)
           .sort((a,b)=>b.right-a.right).slice(0,12);
       });
     }
     details.horizontalScroll=await page.evaluate(async()=>{window.scrollTo({left:100,top:window.scrollY,behavior:'instant'});await new Promise(done=>requestAnimationFrame(done));const x=window.scrollX;window.scrollTo({left:0,top:window.scrollY,behavior:'instant'});return x;});
     await page.screenshot({path:'test-results/phase1-live/'+name+'-'+width+'.png',animations:'disabled'});
     const pass=response.status()===200&&details.horizontalScroll===0&&details.navLinks>0&&details.hasH1&&details.cssLoaded;
     checks.push({page:name,width,status:pass?'PASS':'FAIL',http:response.status(),...details});
   }catch(e){checks.push({page:name,width,status:'FAIL',error:String(e),...details});}
   finally{await page.close();}
 }
}finally{if(browser)await browser.close();}
const passed=checks.filter(x=>x.status==='PASS').length;
const report={at:new Date().toISOString(),passed,total:checks.length,failed:checks.length-passed,checks};
writeFileSync('test-results/phase1-live/mobile.json',JSON.stringify(report,null,2)+'\n');
console.log('Phase 1 live browser: '+passed+'/'+checks.length+' PASS');
for(const x of checks)console.log(x.status+' '+x.page+' '+x.width+' '+JSON.stringify(x));
if(passed!==checks.length)process.exitCode=1;
