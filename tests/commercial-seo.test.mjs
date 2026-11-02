import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {inspectCommercial,fileFor} from '../scripts/check-commercial-seo.mjs';
const map=JSON.parse(readFileSync('plan/seo-phase3-keyword-map.json','utf8'));
const pages=()=>Object.fromEntries(map.pages.map(({path})=>[path,readFileSync(fileFor(path),'utf8')]));
test('all 11 published pages have one distinct mapped commercial intent',()=>{
 const r=inspectCommercial(map,pages());
 assert.equal(r.pass,true);
 assert.equal(r.validated,11);
 assert.equal(r.duplicateTitles,0);
 assert.equal(r.duplicateDescriptions,0);
});
test('two pages cannot share one target search intent',()=>{
 const copy=structuredClone(map);copy.pages[2].primary=copy.pages[3].primary;
 assert.equal(inspectCommercial(copy,pages()).pass,false);
});
test('no duplicate titles or descriptions',()=>{
 const html=pages(),a='/iso-9001-certification-philippines/',b='/iso-consultancy-philippines/';
 html[a]=html[a].replace(/<title>[\s\S]*?<\/title>/,html[b].match(/<title>[\s\S]*?<\/title>/)[0]);
 assert(inspectCommercial(map,html).problems.some(x=>x.includes('Duplicate page title')));
});
test('unverified title and canonical edits fail audit',()=>{
 const html=pages(),p='/iso-9001-certification-philippines/';
 html[p]=html[p].replace('rel="canonical" href="https://thyncandthryve.com/iso-9001-certification-philippines/"','rel="canonical" href="https://other.example/"');
 assert(inspectCommercial(map,html).problems.some(x=>x.includes('Mismatched canonical')));
});
test('removing critical ISO 9001 source or buyer guidance fails',()=>{
 const html=pages(),p='/iso-9001-certification-philippines/';
 html[p]=html[p].replace('https://committee.iso.org/news/2026/09/ISO9001-2026','');
 assert(inspectCommercial(map,html).problems.some(x=>x.includes('Missing buyer guidance')));
});