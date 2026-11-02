import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RELEASE_MARKERS,ORIGIN,inspectHtml,assessRelease} from '../scripts/audit-live-commercial.mjs';
const fixture=()=>Object.fromEntries(RELEASE_MARKERS.map(x=>[x.path,{
 status:200,finalUrl:ORIGIN+x.path,
 html:'<!doctype html><html><head><link rel="canonical" href="'+ORIGIN+x.path+'"></head><body><h1>ISO services</h1><h2>'+x.marker+'</h2></body></html>'
}]));
test('all four released commercial sections and 200/canonicals are required',()=>{
 const r=assessRelease(fixture());assert.equal(r.passed,4);assert.equal(r.pass,true);
});
test('source-only deployment with missing section fails',()=>{
 const pages=fixture();pages[RELEASE_MARKERS[1].path].html=pages[RELEASE_MARKERS[1].path].html.replace(RELEASE_MARKERS[1].marker,'Old content');
 assert.equal(assessRelease(pages).pass,false);
});
test('bad HTTPS canonical, noindex and wrong response fail',()=>{
 const pages=fixture();pages[RELEASE_MARKERS[0].path].status=404;assert.equal(assessRelease(pages).pass,false);
 const p=fixture();p[RELEASE_MARKERS[0].path].html=p[RELEASE_MARKERS[0].path].html.replace('href="https://thyncandthryve.com/','href="http://example.test/');
 assert.equal(assessRelease(p).pass,false);
 const item=RELEASE_MARKERS[0]; const html=fixture()[item.path].html;
 assert.equal(inspectHtml(html.replace('<head>','<head><meta name="robots" content="noindex">'),item).indexable,false);
});