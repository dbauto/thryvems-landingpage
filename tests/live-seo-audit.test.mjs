import {test} from 'node:test';
import assert from 'node:assert/strict';
import {expectedUrls,inspectHtml,inspectRobots,inspectSitemap,inspectRedirect,origin} from '../scripts/live-seo-audit.mjs';

test('all 15 canonical URLs are unique',()=>{
 assert.equal(expectedUrls.length,15);
 assert.equal(new Set(expectedUrls).size,15);
});
test('HTML checks canonical and prevents noindex',()=>{
 const good='<html lang="en-PH"><link rel="canonical" href="'+origin+'/"><h1>Services</h1>';
 assert.equal(inspectHtml(good,'/').pass,true);
 assert.equal(inspectHtml(good+'<meta name="robots" content="noindex,follow">','/').pass,false);
 assert.equal(inspectHtml(good,'/thryvems.html').pass,false);
});
test('sitemap must match all canonical URLs without duplicates',()=>{
 const sitemap='<urlset>'+expectedUrls.map(p=>'<loc>'+origin+p+'</loc>').join('')+'</urlset>';
 assert.equal(inspectSitemap(sitemap).pass,true);
 assert.equal(inspectSitemap(sitemap.replace('</urlset>','<loc>'+origin+'/</loc></urlset>')).pass,false);
});
test('robots must advertise correct sitemap and permit crawling',()=>{
 const valid='User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n';
 assert.equal(inspectRobots(valid),true);
 assert.equal(inspectRobots(valid+'Disallow: /\n'),false);
});
test('redirects require permanent status and preferred HTTPS apex',()=>{
 const hops=[{status:301}];
 assert.equal(inspectRedirect(hops,origin+'/'),true);
 assert.equal(inspectRedirect([{status:302}],origin+'/'),false);
 assert.equal(inspectRedirect(hops,'https://www.thyncandthryve.com/'),false);
});
