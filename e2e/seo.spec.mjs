import {test,expect} from '@playwright/test';
const slugs=[
 'iso-consultancy-philippines','iso-9001-certification-philippines',
 'iso-14001-certification-philippines','iso-45001-consultant-philippines',
 'iso-27001-consultant-philippines','iso-22000-consultant-philippines',
 'trainings/iso-internal-auditor-training-philippines',
 'learn/how-to-get-iso-certified-philippines','learn/iso-certification-cost-philippines'
];
for(const slug of slugs){
 test('SEO static page crawls: '+slug,async({page})=>{
  const response=await page.goto('/'+slug+'/');
  expect(response.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://thyncandthryve.com/'+slug+'/');
  await expect(page.locator('html')).toHaveAttribute('lang','en-PH');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.{75,}/);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.locator('details')).toHaveCount(6);
  await expect(page.getByRole('link',{name:'HOME',exact:true})).toHaveAttribute('href','/');
 });
}
test('robots.txt, sitemap.xml and main canonical all agree',async({page,request})=>{
 const robots=await request.get('/robots.txt');
 expect(robots.ok()).toBeTruthy();
 expect(await robots.text()).toContain('Sitemap: https://thyncandthryve.com/sitemap.xml');
 const sm=await request.get('/sitemap.xml');
 expect(sm.ok()).toBeTruthy();
 const sitemap=await sm.text();
 expect((sitemap.match(/<loc>/g)||[]).length).toBe(15);
 expect(sitemap).not.toContain('github.io');
 await page.goto('/');
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://thyncandthryve.com/');
 await expect(page.locator('h1')).toContainText('ISO training and consultancy in the Philippines');
 const sections=page.locator('section[aria-labelledby="iso-service-guides"]');
 await expect(sections.getByRole('link',{name:'ISO 9001 certification'})).toHaveAttribute('href','/iso-9001-certification-philippines/');
 await page.goto('/thryvems.html');
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://thyncandthryve.com/thryvems.html');
});
test('content pages are readable on 390 and 768 px and do not activate inquiry forms',async({page})=>{
 for(const width of [390,768]){
  await page.setViewportSize({width,height:800});
  for(const p of ['/iso-consultancy-philippines/','/learn/how-to-get-iso-certified-philippines/']){
   await page.goto(p);
   const overflows=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
   expect(overflows).toBe(false);
   await expect(page.locator('main')).toBeVisible();
  }
 }
 await page.goto('/');
 await expect(page.locator('button[data-inquiry-submit]')).toBeDisabled();
});

test('product landing has no actual horizontal scroll on 390px mobile',async({page})=>{
 await page.setViewportSize({width:390,height:800});
 await page.goto('/thryvems.html');
 await expect(page.locator('h1')).toBeVisible();
 const out=await page.evaluate(()=>{
   window.scrollTo({left:100,top:0,behavior:'instant'});
   return {scrollX:window.scrollX};
 });
 if(out.scrollX!==0) {
  const rootCauses=await page.evaluate(()=>{
    const root=document.documentElement;
    const baseline=root.scrollWidth;
    const children=[...document.body.children];
    const samples=[];
    for(const el of children){
      const original=el.style.display;
      el.style.display='none';
      const result=root.scrollWidth;
      el.style.display=original;
      samples.push({tag:el.tagName,cls:String(el.className).slice(0,80),id:el.id,afterHide:result,delta:baseline-result});
    }
    return {baseline,samples:samples.filter(x=>x.delta>0).sort((a,b)=>b.delta-a.delta)};
  });
  console.log('390 mobile root overflow culprit',JSON.stringify(rootCauses));
 }
 expect(out.scrollX).toBe(0);
});

test('Phase 3 buyer-guide pages keep existing layout at four widths',async({page})=>{
 const pages=[
  ['consultancy','/iso-consultancy-philippines/'],
  ['iso9001','/iso-9001-certification-philippines/'],
  ['cost','/learn/iso-certification-cost-philippines/'],
  ['steps','/learn/how-to-get-iso-certified-philippines/']
 ];
 for(const width of [390,768,1280,1920]){
  await page.setViewportSize({width,height:860});
  for(const [name,path] of pages){
   const res=await page.goto(path,{waitUntil:'load'});
   expect(res.status()).toBe(200);
   await page.evaluate(()=>document.fonts.ready);
   await expect(page.locator('main h2').first()).toBeVisible();
   const state=await page.evaluate(()=>({
    scroll:document.documentElement.scrollWidth-window.innerWidth,
    nav:[...document.querySelectorAll('.seo-nav a')].map(a=>a.textContent.trim()),
    mainH1:document.querySelectorAll('h1').length
   }));
   expect(state.scroll).toBeLessThanOrEqual(1);
   expect(state.mainH1).toBe(1);
   expect(state.nav).toEqual(['HOME','LEARN','TRAININGS','CONSULTANCY','SOLUTIONS','ABOUT US']);
   await page.screenshot({path:'test-results/screenshots/seo-phase3-'+name+'-'+width+'.png',animations:'disabled'});
  }
 }
});

test('six company menu destinations navigate to dedicated pages at 390/768/1280/1920',async({page})=>{
 const menu=[['HOME','/'],['LEARN','/learn/'],['TRAININGS','/trainings/'],['CONSULTANCY','/consultancy/'],['SOLUTIONS','/thryvems.html'],['ABOUT US','/about/']];
 const overview=[['learn','LEARN'],['trainings','TRAININGS'],['consultancy','CONSULTANCY'],['about','ABOUT US']];
 for(const width of [390,768,1280,1920]){
  await page.setViewportSize({width,height:860});
  await page.goto('/');
  const homeNav=page.getByRole('navigation',{name:'Main'});
  for(const [label,href] of menu)await expect(homeNav.getByRole('link',{name:label,exact:true})).toHaveAttribute('href',href);
  for(const [slug,selected] of overview){
   const response=await page.goto('/'+slug+'/',{waitUntil:'load'});
   expect(response.status()).toBe(200);
   await page.evaluate(()=>document.fonts.ready);
   const nav=page.getByRole('navigation',{name:'Main'});
   for(const [label,href] of menu)await expect(nav.getByRole('link',{name:label,exact:true})).toHaveAttribute('href',href);
   await expect(nav.getByRole('link',{name:selected,exact:true})).toHaveAttribute('aria-current','page');
   await expect(page.locator('h1')).toHaveCount(1);
   await expect(page.locator('meta[name="description"]')).toHaveAttribute('content',/.{75,}/);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
   await page.screenshot({path:'test-results/screenshots/menu-'+slug+'-'+width+'.png',animations:'disabled'});
  }
 }
});
test('main menu navigation works from internal ISO pages',async({page})=>{
 await page.goto('/iso-9001-certification-philippines/');
 const nav=page.getByRole('navigation',{name:'Main'});
 await nav.getByRole('link',{name:'TRAININGS',exact:true}).click();
 await expect(page).toHaveURL(/\/trainings\/$/);
 await expect(page.getByRole('heading',{level:1})).toContainText('ISO training');
 await page.getByRole('navigation',{name:'Main'}).getByRole('link',{name:'ABOUT US',exact:true}).click();
 await expect(page).toHaveURL(/\/about\/$/);
});
