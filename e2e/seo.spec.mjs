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
  await expect(page.getByRole('link',{name:'HOME'})).toHaveAttribute('href','/');
 });
}
test('robots.txt, sitemap.xml and main canonical all agree',async({page,request})=>{
 const robots=await request.get('/robots.txt');
 expect(robots.ok()).toBeTruthy();
 expect(await robots.text()).toContain('Sitemap: https://thyncandthryve.com/sitemap.xml');
 const sm=await request.get('/sitemap.xml');
 expect(sm.ok()).toBeTruthy();
 const sitemap=await sm.text();
 expect((sitemap.match(/<loc>/g)||[]).length).toBe(11);
 expect(sitemap).not.toContain('github.io');
 await page.goto('/');
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://thyncandthryve.com/');
 await expect(page.locator('h1')).toContainText('ISO consultancy in the Philippines');
 const sections=page.locator('#iso-service-guides');
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
