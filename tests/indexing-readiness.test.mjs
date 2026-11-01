import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PAGES,SITE,auditSource,auditEvidence,linksFor} from '../scripts/check-indexing-readiness.mjs';
const html=(url,links=[])=>'<html lang="en-PH"><head><link rel="canonical" href="'+SITE+url+'"></head><body><h1>Example</h1>'+links.map(x=>'<a href="'+x+'">Read</a>').join('')+'</body></html>';
const full=()=>Object.fromEntries(PAGES.map(p=>[p,html(p,p==='/'?PAGES.slice(1):['/'])]));
const xml=()=>'<urlset>'+PAGES.map(p=>'<loc>'+SITE+p+'</loc>').join('')+'</urlset>';
const robots='User-agent: *\nAllow: /\nSitemap: '+SITE+'/sitemap.xml';
test('internal links parse fragment/root/relative without following external destinations',()=>{
 assert.deepEqual(linksFor('<a href="/#contact">Contact</a><a href="https://example.net/">External</a><a href="../thryvems.html">Product</a>','/learn/'),['/','/thryvems.html']);
});
test('11 homepage-reachable, indexable pages and matching sitemap pass',()=>{
 const r=auditSource(full(),xml(),robots);
 assert.equal(r.pass,true);
 assert.equal(r.reachableCount,11);
 assert.equal(r.maxClicks,1);
});
test('blocked, orphaned and missing canonical pages fail closed',()=>{
 const p=full();p[PAGES[3]]=html(PAGES[3]).replace('<head>','<head><meta name="robots" content="noindex">');
 assert.equal(auditSource(p,xml(),robots).pass,false);
 delete p[PAGES[3]];
 assert.equal(auditSource(p,xml(),robots).pass,false);
 assert.equal(auditSource(full(),xml().replace('<loc>'+SITE+PAGES[4]+'</loc>',''),robots).pass,false);
});
test('Google evidence must never invent indexed status',()=>{
 const blank={pages:PAGES.map(path=>({path,status:'NOT_VERIFIED'}))};
 let x=auditEvidence(blank);assert.equal(x.pass,true);assert.equal(x.indexed,0);assert.equal(x.reviewed,0);
 blank.pages[0]={path:'/',status:'INDEXED'};assert.equal(auditEvidence(blank).pass,false);
 blank.pages[0]={path:'/',status:'INDEXED',checkedAt:'2026-11-02',googleReport:'URL Inspection: Indexed',evidenceUrl:'https://search.google.com/search-console'};x=auditEvidence(blank);
 assert.equal(x.pass,true);assert.equal(x.indexed,1);
});
test('not-in-sitemap pages cannot appear as evidence rows',()=>{
 const blank={pages:PAGES.map(path=>({path,status:'NOT_VERIFIED'}))};
 blank.pages.push({path:'/fabricated/',status:'INDEXED'});
 assert.equal(auditEvidence(blank).pass,false);
});