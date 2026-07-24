
const KEY='homeos_ws06b_state_v1';

const recipes={
 toast:{name:'계란토스트',ingredients:[['bread','식빵',2,'장','fresh'],['egg','계란',2,'개','fresh'],['butter','버터',10,'g','monthly']]},
 oatmeal:{name:'오트밀 바나나볼',ingredients:[['oat','오트밀',80,'g','monthly'],['banana','바나나',1,'개','fresh'],['milk','우유',300,'ml','fresh']]},
 riceEgg:{name:'계란간장밥',ingredients:[['rice','쌀',180,'g','monthly'],['egg','계란',2,'개','fresh'],['soy','진간장',1,'큰술','monthly']]},
 jeyuk:{name:'제육볶음',ingredients:[['pork','돼지고기',400,'g','fresh'],['onion','양파',1,'개','fresh'],['greenOnion','대파',1,'대','fresh'],['gochujang','고추장',2,'큰술','monthly']]},
 kimchi:{name:'김치찌개',ingredients:[['kimchi','신김치',300,'g','fresh'],['pork','돼지고기',200,'g','fresh'],['tofu','두부',1,'모','fresh'],['greenOnion','대파',.5,'대','fresh']]},
 curry:{name:'카레',ingredients:[['rice','쌀',250,'g','monthly'],['pork','돼지고기',250,'g','fresh'],['onion','양파',1,'개','fresh'],['potato','감자',2,'개','fresh'],['carrot','당근',1,'개','fresh'],['curryPowder','카레가루',100,'g','monthly']]},
 chicken:{name:'간장닭볶음',ingredients:[['chicken','닭정육',500,'g','fresh'],['onion','양파',1,'개','fresh'],['soy','진간장',3,'큰술','monthly'],['garlic','다진 마늘',1,'큰술','monthly']]},
 tofu:{name:'두부조림',ingredients:[['tofu','두부',2,'모','fresh'],['greenOnion','대파',.5,'대','fresh'],['soy','진간장',3,'큰술','monthly'],['chili','고춧가루',1,'큰술','monthly']]},
 bulgogi:{name:'소불고기',ingredients:[['beef','소고기 불고기용',400,'g','fresh'],['onion','양파',1,'개','fresh'],['greenOnion','대파',1,'대','fresh'],['soy','진간장',3,'큰술','monthly']]},
 pasta:{name:'토마토파스타',ingredients:[['pasta','파스타면',300,'g','monthly'],['tomatoSauce','토마토소스',500,'g','monthly'],['onion','양파',.5,'개','fresh'],['garlic','다진 마늘',1,'큰술','monthly']]},
 ramen:{name:'라면과 계란',ingredients:[['ramen','라면',2,'봉','monthly'],['egg','계란',2,'개','fresh'],['greenOnion','대파',.3,'대','fresh']]},
 sandwich:{name:'햄치즈샌드위치',ingredients:[['bread','식빵',4,'장','fresh'],['ham','햄',4,'장','fresh'],['cheese','치즈',4,'장','fresh'],['lettuce','상추',4,'장','fresh']]},
 bibimbap:{name:'야채비빔밥',ingredients:[['rice','쌀',220,'g','monthly'],['egg','계란',2,'개','fresh'],['spinach','시금치',150,'g','fresh'],['carrot','당근',1,'개','fresh'],['gochujang','고추장',2,'큰술','monthly']]},
 soup:{name:'소고기미역국',ingredients:[['beef','소고기 국거리',250,'g','fresh'],['seaweed','미역',30,'g','monthly'],['soy','국간장',2,'큰술','monthly'],['garlic','다진 마늘',1,'큰술','monthly']]},
 friedRice:{name:'김치볶음밥',ingredients:[['rice','쌀',220,'g','monthly'],['kimchi','신김치',250,'g','fresh'],['egg','계란',2,'개','fresh'],['greenOnion','대파',.5,'대','fresh']]}
};

const breakfastCycle=['toast','oatmeal','riceEgg','sandwich'];
const lunchCycle=['jeyuk','curry','tofu','pasta','bibimbap','friedRice'];
const dinnerCycle=['kimchi','chicken','bulgogi','soup','ramen','curry'];

function iso(d){return d.toISOString().slice(0,10)}
function addDays(d,n){const x=new Date(d);x.setDate(x.getDate()+n);return x}
function startOfWeek(d){const x=new Date(d),day=x.getDay();x.setDate(x.getDate()-(day===0?6:day-1));return x}
function endOfWeek(d){return addDays(startOfWeek(d),6)}
function monthKey(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function makeMonthPlan(year,month){
 const result={},days=new Date(year,month+1,0).getDate();
 for(let day=1;day<=days;day++){
  const dt=new Date(year,month,day),key=iso(dt),offset=day-1;
  result[key]={
   breakfast:{recipeId:breakfastCycle[offset%breakfastCycle.length],status:'planned'},
   lunch:{recipeId:lunchCycle[offset%lunchCycle.length],status:'planned'},
   dinner:{recipeId:dinnerCycle[offset%dinnerCycle.length],status:'planned'}
  };
 }
 return result;
}
function fresh(){
 const now=new Date(),mk=monthKey(now);
 return {
  tab:'today',servings:2,largeBatch:false,
  viewedYear:now.getFullYear(),viewedMonth:now.getMonth(),
  selectedDate:iso(now),
  months:{[mk]:makeMonthPlan(now.getFullYear(),now.getMonth())},
  inventory:{
   bread:{name:'식빵',q:6,unit:'장'},egg:{name:'계란',q:8,unit:'개'},butter:{name:'버터',q:30,unit:'g'},
   rice:{name:'쌀',q:2000,unit:'g'},pork:{name:'돼지고기',q:400,unit:'g'},onion:{name:'양파',q:2,unit:'개'},
   greenOnion:{name:'대파',q:1,unit:'대'},kimchi:{name:'신김치',q:500,unit:'g'},tofu:{name:'두부',q:1,unit:'모'},
   milk:{name:'우유',q:500,unit:'ml'},banana:{name:'바나나',q:2,unit:'개'},oat:{name:'오트밀',q:300,unit:'g'},
   soy:{name:'진간장',q:10,unit:'큰술'},gochujang:{name:'고추장',q:6,unit:'큰술'},garlic:{name:'다진 마늘',q:5,unit:'큰술'}
  },
  shoppingRange:'next7',customStart:iso(now),customEnd:iso(addDays(now,6)),
  shopping:{},processed:{}
 };
}
let state=load(),modal=null;

function load(){try{return JSON.parse(localStorage.getItem(KEY))||fresh()}catch{return fresh()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function e(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function toast(msg){const t=document.getElementById('toast');t.hidden=false;t.textContent=msg;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,5000)}
function ensureMonth(year,month){
 const mk=year+'-'+String(month+1).padStart(2,'0');
 if(!state.months[mk])state.months[mk]=makeMonthPlan(year,month);
 return state.months[mk];
}
function getMealDay(key){
 const d=new Date(key+'T00:00:00'),mk=monthKey(d);
 if(!state.months[mk])state.months[mk]=makeMonthPlan(d.getFullYear(),d.getMonth());
 return state.months[mk][key];
}
function scale(q){return Math.round(q*(state.servings/2)*100)/100}
function statusLabel(s){return ({planned:'예정',cooked:'조리 완료',dining_out:'외식',delivery:'배달',convenience:'간편식',lunchbox:'도시락',skipped:'건너뜀'})[s]||s}
function statusClass(s){return s==='cooked'?'done':(['dining_out','delivery','convenience','lunchbox','skipped'].includes(s)?'exception':'')}
function rangeDates(){
 const today=new Date(),r=state.shoppingRange;
 let start,end;
 if(r==='today'){start=today;end=today}
 else if(r==='week'){start=startOfWeek(today);end=endOfWeek(today)}
 else if(r==='next7'){start=today;end=addDays(today,6)}
 else if(r==='month'){start=new Date(today.getFullYear(),today.getMonth(),1);end=new Date(today.getFullYear(),today.getMonth()+1,0)}
 else {start=new Date(state.customStart+'T00:00:00');end=new Date(state.customEnd+'T00:00:00')}
 return [start,end];
}
function calculateShopping(){
 const [start,end]=rangeDates(),req={};
 for(let d=new Date(start);d<=end;d=addDays(d,1)){
  const day=getMealDay(iso(d));
  if(!day)continue;
  Object.values(day).forEach(m=>{
   if(!['planned'].includes(m.status))return;
   const r=recipes[m.recipeId];
   r.ingredients.forEach(([id,name,q,unit,storage])=>{
    const k=id+'|'+unit;
    req[k]??={id,name,unit,storage,required:0,sources:[]};
    req[k].required+=scale(q);req[k].sources.push(r.name);
   });
  });
 }
 const next={};
 Object.values(req).forEach(x=>{
  x.required=Math.round(x.required*100)/100;
  const inv=state.inventory[x.id],available=inv&&inv.unit===x.unit?Number(inv.q):0;
  const shortage=Math.max(0,Math.round((x.required-available)*100)/100);
  if(shortage>0)next[x.id]={...x,available,shortage,planned:state.shopping[x.id]?.userAdjusted?state.shopping[x.id].planned:shortage,checked:state.shopping[x.id]?.checked||false,userAdjusted:state.shopping[x.id]?.userAdjusted||false};
 });
 state.shopping=next;save();
}
function todayView(){
 const key=iso(new Date()),day=getMealDay(key);
 return `<div class="header"><div><h1>오늘의 식사</h1><div class="sub">${key} · ${state.largeBatch?'대용량 ':''}${state.servings}인분</div></div><button class="ghost" onclick="openSettings()">인원 설정</button></div>
 ${Object.entries(day).map(([type,m])=>`<section class="card"><div class="meal-head"><div><div class="meal-type">${({breakfast:'아침',lunch:'점심',dinner:'저녁'})[type]}</div><div class="meal-name">${recipes[m.recipeId].name}</div></div><span class="status ${statusClass(m.status)}">${statusLabel(m.status)}</span></div>
 <div class="meal-actions"><button class="primary" onclick="markCooked('${key}','${type}')">조리 완료</button><button class="secondary" onclick="openDate('${key}')">오늘 식단 보기</button><button class="ghost wide" onclick="markException('${key}','${type}')">오늘은 안 먹어요</button></div></section>`).join('')}
 <section class="card"><h3>한 달 식단이 준비되어 있어요</h3><p class="muted">홈에는 오늘 식단만 표시됩니다. 아래 식단 탭에서 한 달 전체를 확인할 수 있어요.</p><button class="secondary" style="width:100%" onclick="setTab('plan')">한 달 식단 보기</button></section>`;
}
function planView(){
 const y=state.viewedYear,m=state.viewedMonth,plan=ensureMonth(y,m),first=new Date(y,m,1),start=new Date(y,m,1-first.getDay()),today=iso(new Date());
 let cells='';
 for(let i=0;i<42;i++){
  const d=addDays(start,i),key=iso(d),same=d.getMonth()===m,day=getMealDay(key);
  cells+=`<div class="day-cell ${same?'':'other'} ${key===today?'today':''}" onclick="openDate('${key}')"><div class="day-number">${d.getDate()}</div>
   ${day?`<span class="day-meal">${recipes[day.breakfast.recipeId].name}</span><span class="day-meal">${recipes[day.lunch.recipeId].name}</span><span class="day-meal">${recipes[day.dinner.recipeId].name}</span>`:''}</div>`;
 }
 return `<div class="header"><div><h1>한 달 식단</h1><div class="sub">날짜를 눌러 메뉴를 확인하거나 변경하세요.</div></div></div>
 <div class="month-nav"><button class="ghost" onclick="moveMonth(-1)">이전 달</button><div class="month-title">${y}년 ${m+1}월</div><button class="ghost" onclick="moveMonth(1)">다음 달</button></div>
 <section class="card"><div class="calendar-grid">${['일','월','화','수','목','금','토'].map(x=>`<div class="weekday">${x}</div>`).join('')}${cells}</div></section>`;
}
function shoppingView(){
 calculateShopping();
 const [start,end]=rangeDates(),items=Object.values(state.shopping),freshItems=items.filter(x=>x.storage==='fresh'),monthlyItems=items.filter(x=>x.storage==='monthly');
 const buttons=[['today','오늘'],['week','이번 주'],['next7','다음 7일'],['month','이번 달'],['custom','직접 선택']];
 function group(title,list,desc){
  return `<div class="shopping-group"><div class="group-title">${title}</div><div class="muted small" style="margin-bottom:8px">${desc}</div>${list.length?list.map(x=>shoppingCard(x)).join(''):'<section class="card"><div class="muted">해당 품목이 없어요.</div></section>'}</div>`;
 }
 return `<div class="header"><div><h1>기간별 장보기</h1><div class="sub">${iso(start)} ~ ${iso(end)}</div></div></div>
 <div class="range-controls">${buttons.map(([id,l])=>`<button class="${state.shoppingRange===id?'active primary':'ghost'}" onclick="setRange('${id}')">${l}</button>`).join('')}</div>
 ${state.shoppingRange==='custom'?`<div class="range-dates"><input type="date" value="${state.customStart}" onchange="setCustomStart(this.value)"><input type="date" value="${state.customEnd}" onchange="setCustomEnd(this.value)"></div>`:''}
 <div class="note" style="margin-bottom:14px">기본값은 다음 7일입니다. 신선식품은 주간 구매, 장기보관 식품은 월간 구매에 적합하도록 구분해 표시합니다.</div>
 ${group('신선식품·주간 구매 권장',freshItems,'채소, 두부, 육류, 우유처럼 오래 보관하기 어려운 품목')}
 ${group('장기보관·월간 구매 가능',monthlyItems,'쌀, 양념, 건면처럼 비교적 오래 보관할 수 있는 품목')}`;
}
function shoppingCard(x){
 return `<section class="card"><div class="shopping-item-head"><div><h3>${x.name}</h3><div class="small muted">${[...new Set(x.sources)].slice(0,4).join(', ')}</div></div><input type="checkbox" ${x.checked?'checked':''} onchange="checkItem('${x.id}',this.checked)"></div>
 <div class="ingredient-row"><span>기간 필요량</span><strong>${x.required}${x.unit}</strong></div>
 <div class="ingredient-row"><span>현재 재고</span><strong>${x.available}${x.unit}</strong></div>
 <div class="ingredient-row"><span>부족량</span><strong>${x.shortage}${x.unit}</strong></div>
 <div class="form-row"><label>실제 구매 수량</label><input type="number" step="0.1" value="${x.planned}" onchange="adjustPurchase('${x.id}',this.value)"></div>
 <button class="primary" style="width:100%" onclick="purchase('${x.id}')">구매 완료 · 재고 반영</button></section>`;
}
function inventoryView(){
 return `<div class="header"><div><h1>우리집 식재료</h1><div class="sub">재고를 수정하면 선택 기간의 장보기가 다시 계산됩니다.</div></div></div><section class="card">${Object.entries(state.inventory).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([id,x])=>`<div class="mini-row"><span>${x.name}</span><span><input style="width:85px;padding:8px;border:1px solid var(--line);border-radius:10px" type="number" step="0.1" value="${x.q}" onchange="editInventory('${id}',this.value)"> ${x.unit}</span></div>`).join('')}</section>`;
}
function moreView(){
 return `<div class="header"><div><h1>더보기</h1><div class="sub">데이터 관리</div></div></div><section class="card"><button class="secondary" style="width:100%;margin-bottom:9px" onclick="backup()">백업 저장</button><label class="primary" style="display:block;text-align:center;padding:14px;border-radius:14px;margin-bottom:9px">백업 복원<input hidden type="file" accept="application/json" onchange="restore(this.files[0])"></label><button class="danger" style="width:100%" onclick="resetAll()">데모 초기화</button></section>`;
}
function nav(){return `<nav class="tabs"><div class="tabs-inner">${[['today','오늘'],['plan','식단'],['shopping','장보기'],['inventory','우리집'],['more','더보기']].map(([id,l])=>`<button class="tab ${state.tab===id?'active':''}" onclick="setTab('${id}')">${l}</button>`).join('')}</div></nav>`}
function dateModal(){
 const day=getMealDay(state.selectedDate),labels={breakfast:'아침',lunch:'점심',dinner:'저녁'};
 return `<div class="modal"><div class="panel"><div class="modal-head"><div><h2>${state.selectedDate} 식단</h2><div class="muted">메뉴를 바꾸면 장보기가 다시 계산됩니다.</div></div><button class="close" onclick="closeModal()">×</button></div>
 <div class="date-meals">${Object.entries(day).map(([type,m])=>`<div class="date-meal-card"><div class="meal-type">${labels[type]}</div><h3>${recipes[m.recipeId].name}</h3><select onchange="changeMeal('${state.selectedDate}','${type}',this.value)">${Object.entries(recipes).map(([id,r])=>`<option value="${id}" ${id===m.recipeId?'selected':''}>${r.name}</option>`).join('')}</select></div>`).join('')}</div></div></div>`;
}
function settingsModal(){
 return `<div class="modal"><div class="panel"><div class="modal-head"><h2>조리 인원</h2><button class="close" onclick="closeModal()">×</button></div><section class="card"><h3>일반 조리</h3><div class="range-controls">${[1,2,3,4,5,6].map(n=>`<button class="${!state.largeBatch&&state.servings===n?'primary':'ghost'}" onclick="chooseServings(${n},false)">${n}인분</button>`).join('')}</div></section><section class="card"><h3>대용량 조리</h3><div class="form-row"><label>인원</label><input id="largeCount" type="number" min="7" max="30" value="${state.largeBatch?state.servings:8}"></div><button class="secondary" style="width:100%" onclick="chooseLarge()">대용량으로 적용</button></section></div></div>`;
}
function exceptionModal(){
 return `<div class="modal"><div class="panel"><div class="modal-head"><h2>오늘은 안 먹어요</h2><button class="close" onclick="closeModal()">×</button></div><div class="range-controls">${[['dining_out','외식'],['delivery','배달'],['convenience','간편식'],['lunchbox','도시락'],['skipped','건너뛰기']].map(([s,l])=>`<button class="ghost" onclick="applyException('${s}')">${l}</button>`).join('')}</div></div></div>`;
}
function render(){
 let view=state.tab==='today'?todayView():state.tab==='plan'?planView():state.tab==='shopping'?shoppingView():state.tab==='inventory'?inventoryView():moreView();
 document.getElementById('app').innerHTML=`<main class="shell">${view}</main>${nav()}${modal==='date'?dateModal():modal==='settings'?settingsModal():modal==='exception'?exceptionModal():''}`;
}
window.setTab=t=>{state.tab=t;save();render()}
window.moveMonth=n=>{state.viewedMonth+=n;if(state.viewedMonth<0){state.viewedMonth=11;state.viewedYear--}if(state.viewedMonth>11){state.viewedMonth=0;state.viewedYear++}ensureMonth(state.viewedYear,state.viewedMonth);save();render()}
window.openDate=k=>{state.selectedDate=k;modal='date';render()}
window.closeModal=()=>{modal=null;render()}
window.changeMeal=(dateKey,type,recipeId)=>{getMealDay(dateKey)[type].recipeId=recipeId;calculateShopping();save();render();toast('메뉴를 변경하고 장보기를 다시 계산했어요.')}
window.setRange=r=>{state.shoppingRange=r;calculateShopping();save();render()}
window.setCustomStart=v=>{state.customStart=v;calculateShopping();save();render()}
window.setCustomEnd=v=>{state.customEnd=v;calculateShopping();save();render()}
window.checkItem=(id,v)=>{if(state.shopping[id])state.shopping[id].checked=v;save()}
window.adjustPurchase=(id,v)=>{if(state.shopping[id]){state.shopping[id].planned=Number(v)||0;state.shopping[id].userAdjusted=true;save()}}
window.purchase=id=>{const x=state.shopping[id];if(!x)return;const inv=state.inventory[id]||{name:x.name,q:0,unit:x.unit};inv.q=Math.round((Number(inv.q)+Number(x.planned))*100)/100;state.inventory[id]=inv;calculateShopping();save();render();toast(x.name+' 재고에 반영했어요.')}
window.editInventory=(id,v)=>{state.inventory[id].q=Number(v)||0;calculateShopping();save();render()}
window.openSettings=()=>{modal='settings';render()}
window.chooseServings=(n,large)=>{state.servings=n;state.largeBatch=large;modal=null;calculateShopping();save();render()}
window.chooseLarge=()=>{state.servings=Math.max(7,Number(document.getElementById('largeCount').value)||7);state.largeBatch=true;modal=null;calculateShopping();save();render()}
window.markCooked=(dateKey,type)=>{const m=getMealDay(dateKey)[type];m.status='cooked';calculateShopping();save();render();toast('조리 완료로 표시했어요.')}
window.markException=(dateKey,type)=>{state.selectedDate=dateKey;state.exceptionType=type;modal='exception';render()}
window.applyException=s=>{getMealDay(state.selectedDate)[state.exceptionType].status=s;modal=null;calculateShopping();save();render();toast(statusLabel(s)+'으로 표시했어요.')}
window.backup=()=>{const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='homeos-ws06b-backup.json';a.click();URL.revokeObjectURL(a.href)}
window.restore=f=>{if(!f)return;const rd=new FileReader();rd.onload=()=>{try{state=JSON.parse(rd.result);save();render();toast('백업을 복원했어요.')}catch{alert('올바른 백업 파일이 아니에요.')}};rd.readAsText(f)}
window.resetAll=()=>{if(confirm('데모 데이터를 초기화할까요?')){state=fresh();save();render()}}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
calculateShopping();render();
