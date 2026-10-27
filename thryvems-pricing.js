
(function(){
var P={base:{name:'Base',fee:4000,incl:15,per:300,max:25},mid:{name:'Mid',fee:6500,incl:25,per:260,max:75}};
var st={plan:'mid',users:30,billing:'monthly'};
var php=function(n){return '\u20B1'+Math.round(n).toLocaleString('en-PH');};
var slider=document.getElementById('users');
function set(k,v){document.querySelectorAll('[data-b="'+k+'"]').forEach(function(e){e.textContent=v;});}
function render(){
 var annual=st.billing==='annual',f=annual?0.8:1,p=P[st.plan];
 st.users=Math.min(Math.max(st.users,1),p.max);
 var extra=Math.max(0,st.users-p.incl),monthly=p.fee+extra*p.per,perMonth=monthly*f;
 var v={baseShown:php(4000*f),midShown:php(6500*f),
  baseSub:annual?php(38400)+' billed yearly \u00B7 15 users, +'+php(240)+'/added user':'15 users included \u00B7 +\u20B1300 per added user',
  midSub:annual?php(62400)+' billed yearly \u00B7 25 users, +'+php(208)+'/added user':'25 users included \u00B7 +\u20B1260 per added user',
  planName:p.name,users:st.users,maxUsers:p.max,incl:p.incl,extra:extra,feeTxt:php(p.fee),perTxt:php(p.per),extraTxt:php(extra*p.per),
  discTxt:php(monthly*0.2),perMonthTxt:php(perMonth),
  billNote:annual?'Billed '+php(perMonth*12)+' yearly. You save '+php(monthly*12*0.2)+' a year.':'Billed monthly. Switch to annual to save '+php(monthly*12*0.2)+' a year.'};
 for(var k in v)set(k,v[k]);
 slider.max=p.max;slider.value=st.users;
 var on={setMonthly:!annual,setAnnual:annual,pickBase:st.plan==='base',pickMid:st.plan==='mid'};
 document.querySelectorAll('button.tgl').forEach(function(b){b.setAttribute('aria-pressed',on[b.dataset.action]?'true':'false');});
 var show={annual:annual,showEntHint:st.plan==='mid'&&st.users>35};
 document.querySelectorAll('[data-show]').forEach(function(e){e.hidden=!show[e.dataset.show];});
}
var acts={setMonthly:function(){st.billing='monthly';},setAnnual:function(){st.billing='annual';},
 pickBase:function(){st.plan='base';},pickMid:function(){st.plan='mid';}};
document.querySelectorAll('[data-action]').forEach(function(b){b.addEventListener('click',function(){acts[b.dataset.action]();render();
 if(!b.classList.contains('tgl'))document.getElementById('calculator').scrollIntoView({behavior:'smooth',block:'center'});});});
slider.addEventListener('input',function(){st.users=parseInt(slider.value,10)||1;render();});
render();
})();
