const KEY='familyMealPwaDataV1';
const money=n=>new Intl.NumberFormat('ko-KR').format(Math.round(n||0))+'원';
const uid=()=>Math.random().toString(36).slice(2)+Date.now().toString(36);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const nowMonth=()=>new Date().toISOString().slice(0,7);

const demoPlan={
 month:nowMonth(), basePeople:6,
 meals:Array.from({length:30},(_,i)=>{const menus=[['제육볶음','김치찌개'],['닭갈비','고등어구이'],['카레라이스','삼겹살구이'],['소불고기','순두부찌개'],['돈까스','김치볶음밥'],['닭볶음탕','계란찜'],['오징어볶음','부대찌개']][i%7];return {day:i+1,lunch:menus[0],dinner:menus[1],prep:i%3===0?'고기 1팩 냉장 해동':'필요 채소 확인'};}),
 recipes:{
 '제육볶음':{ingredients:[['돼지 앞다리살',1,'kg'],['양파',0.4,'kg'],['대파',0.2,'단']],steps:['고기를 양념에 버무립니다.','채소와 함께 센 불에 볶습니다.']},
 '김치찌개':{ingredients:[['김치',0.8,'kg'],['돼지 앞다리살',0.5,'kg'],['두부',1,'모']],steps:['김치와 고기를 볶습니다.','물을 붓고 끓인 뒤 두부를 넣습니다.']},
 '닭갈비':{ingredients:[['닭다리살',1,'kg'],['양배추',0.5,'통'],['양파',0.3,'kg']],steps:['닭고기와 양념을 볶습니다.','채소를 넣고 익힙니다.']},
 '고등어구이':{ingredients:[['고등어',3,'토막']],steps:['물기를 제거합니다.','팬이나 에어프라이어로 굽습니다.']},
 '카레라이스':{ingredients:[['돼지 앞다리살',0.5,'kg'],['감자',0.6,'kg'],['양파',0.5,'kg'],['카레',1,'팩']],steps:['재료를 볶습니다.','물과 카레를 넣고 끓입니다.']},
 '삼겹살구이':{ingredients:[['삼겹살',1.2,'kg'],['상추',2,'봉']],steps:['삼겹살을 굽습니다.','쌈채소와 함께 냅니다.']},
 '소불고기':{ingredients:[['소불고기',1,'kg'],['양파',0.4,'kg']],steps:['불고기를 양념합니다.','양파와 함께 볶습니다.']},
 '순두부찌개':{ingredients:[['순두부',3,'봉'],['계란',2,'개']],steps:['육수와 양념을 끓입니다.','순두부와 계란을 넣습니다.']},
 '돈까스':{ingredients:[['돈까스',6,'장'],['양배추',0.3,'통']],steps:['돈까스를 조리합니다.','양배추를 곁들입니다.']},
 '김치볶음밥':{ingredients:[['김치',0.5,'kg'],['계란',6,'개']],steps:['김치를 볶습니다.','밥을 넣고 볶아 계란을 곁들입니다.']},
 '닭볶음탕':{ingredients:[['닭다리살',1.2,'kg'],['감자',0.7,'kg'],['양파',0.4,'kg']],steps:['닭과 양념을 끓입니다.','채소를 넣어 익힙니다.']},
 '계란찜':{ingredients:[['계란',10,'개']],steps:['계란물을 만듭니다.','약불에서 익힙니다.']},
 '오징어볶음':{ingredients:[['오징어',1,'kg'],['양파',0.4,'kg'],['대파',0.2,'단']],steps:['채소와 오징어를 센 불에 볶습니다.']},
 '부대찌개':{ingredients:[['소시지',0.8,'kg'],['김치',0.5,'kg'],['두부',1,'모']],steps:['재료와 육수를 넣고 끓입니다.']}
 },
 prices:{'돼지 앞다리살':11000,'양파':2200,'대파':2500,'김치':6500,'두부':1800,'닭다리살':9500,'양배추':5000,'고등어':4500,'감자':2500,'카레':3500,'삼겹살':19000,'상추':3500,'소불고기':24000,'순두부':1500,'계란':350,'돈까스':2200,'오징어':14000,'소시지':12000},
 units:{'돈까스':'장','고등어':'토막','계란':'개','두부':'모','순두부':'봉','카레':'팩','상추':'봉','대파':'단','양배추':'통'}
};

function defaultState(){return {people:6,currentMonth:demoPlan.month,plans:{[demoPlan.month]:demoPlan},inventory:[
 {id:uid(),name:'삼겹살',qty:2.4,unit:'kg',location:'냉동실',min:1},
 {id:uid(),name:'계란',qty:24,unit:'개',location:'냉장실',min:12},
 {id:uid(),name:'양파',qty:3,unit:'kg',location:'실온',min:1},
 {id:uid(),name:'김치',qty:6,unit:'kg',location:'김치냉장고',min:2}
],mealChecks:{},shoppingChecks:{}}}
let state=load(); let phase=1; let deferredPrompt=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||defaultState()}catch{return defaultState()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state));renderAll()}
function plan(){return state.plans[state.currentMonth]||null}
function factor(){return state.people/(plan()?.basePeople||6)}
function inventoryMap(){return Object.fromEntries(state.inventory.map(x=>[x.name,x]))}
function requirements(){const p=plan();if(!p)return {};const out={};p.meals.forEach(m=>[m.lunch,m.dinner].forEach(name=>{const r=p.recipes[name];if(!r)return;r.ingredients.forEach(([n,q,u])=>{const key=n+'|'+u;out[key]=(out[key]||0)+q*factor()})}));return out}
function shoppingItems(){const p=plan();if(!p)return [];const inv=inventoryMap();return Object.entries(requirements()).map(([key,needed])=>{const [name,unit]=key.split('|');const have=inv[name]?.unit===unit?inv[name].qty:0;const buy=Math.max(0,needed-have);const price=p.prices[name]||0;return {name,unit,needed,have,buy,phase: shelfPhase(name),cost:buy*price}}).filter(x=>x.buy>0.001)}
function shelfPhase(name){return ['우유','두부','순두부','상추','콩나물','숙주','바나나'].some(x=>name.includes(x))?2:1}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}

function renderAll(){document.querySelector('#monthPicker').value=state.currentMonth;document.querySelector('#peopleSelect').value=String(state.people);renderHome();renderMeals();renderShopping();renderInventory()}
function renderHome(){const p=plan(), today=new Date(), day=(today.toISOString().slice(0,7)===state.currentMonth)?today.getDate():1;const m=p?.meals.find(x=>x.day===day)||p?.meals[0];const card=document.querySelector('#todayCard');
 if(!p){card.innerHTML='<h2>등록된 식단이 없습니다</h2><p>설정에서 월간 JSON을 가져오세요.</p>';return}
 card.innerHTML=`<div class="date">${esc(state.currentMonth)} · ${day}일</div><h2>오늘의 식단</h2>${['lunch','dinner'].map((k,i)=>`<div class="meal-row"><span>${i?'저녁':'점심'} · <b>${esc(m[k])}</b></span><button onclick="showRecipe('${encodeURIComponent(m[k])}')">레시피</button></div>`).join('')}`;
 const items=shoppingItems();document.querySelector('#budgetTotal').textContent=money(items.reduce((s,x)=>s+x.cost,0));document.querySelector('#needCount').textContent=items.length+'개';document.querySelector('#lowStockCount').textContent=state.inventory.filter(x=>x.qty<=x.min).length+'개';document.querySelector('#cookedCount').textContent=Object.values(state.mealChecks).filter(Boolean).length+'회';
 const tm=p.meals.find(x=>x.day===Math.min(day+1,p.meals.length));document.querySelector('#tomorrowPrep').textContent=tm?`${tm.day}일: ${tm.prep||'별도 준비 없음'}`:'다음 식단이 없습니다.'}
function renderMeals(){const p=plan(), box=document.querySelector('#mealList');if(!p){box.innerHTML='<div class="empty">식단을 가져오세요.</div>';return}box.innerHTML=p.meals.map(m=>`<article class="item"><div class="item-top"><div><h3>${m.day}일</h3><div class="meta">${esc(m.prep||'')}</div></div></div><div class="meal-actions">${[['lunch','점심'],['dinner','저녁']].map(([k,label])=>{const id=`${state.currentMonth}-${m.day}-${k}`,done=!!state.mealChecks[id];return `<div class="meal-action ${done?'done':''}"><label>${label} · ${esc(m[k])}</label><div><button onclick="showRecipe('${encodeURIComponent(m[k])}')">보기</button><input class="check" type="checkbox" ${done?'checked':''} onchange="toggleMeal('${id}','${encodeURIComponent(m[k])}',this.checked)"></div></div>`}).join('')}</div></article>`).join('')}
function renderShopping(){const list=shoppingItems().filter(x=>x.phase===phase), box=document.querySelector('#shoppingList');document.querySelector('#shoppingHint').textContent=`${state.people}명 기준 · 재고 차감 반영`;if(!list.length){box.innerHTML='<div class="empty card">구매할 품목이 없습니다.</div>';return}box.innerHTML=list.map(x=>{const id=`${state.currentMonth}-${phase}-${x.name}`,done=!!state.shoppingChecks[id];return `<article class="item shopping-row ${done?'done':''}"><input class="check" type="checkbox" ${done?'checked':''} onchange="toggleShopping('${id}','${encodeURIComponent(x.name)}',${x.buy},'${x.unit}',this.checked)"><div><h3>${esc(x.name)}</h3><div class="meta">필요 ${x.needed.toFixed(2)}${x.unit} − 재고 ${x.have.toFixed(2)}${x.unit}</div><div class="budget">예상 ${money(x.cost)}</div></div><div class="qty">${x.buy.toFixed(2)}${x.unit}</div></article>`}).join('')}
function renderInventory(){const box=document.querySelector('#inventoryList');if(!state.inventory.length){box.innerHTML='<div class="empty card">등록된 재고가 없습니다.</div>';return}box.innerHTML=state.inventory.sort((a,b)=>a.location.localeCompare(b.location)||a.name.localeCompare(b.name)).map(x=>`<article class="item ${x.qty<=x.min?'stock-low':'stock-ok'}"><div class="item-top"><div><h3>${esc(x.name)}</h3><div class="meta">${esc(x.location)} · 최소 ${x.min}${esc(x.unit)}</div></div><strong>${x.qty.toFixed(2)}${esc(x.unit)}</strong></div><div class="stock-controls"><button class="secondary" onclick="adjustStock('${x.id}',-1)">−1</button><button class="secondary" onclick="adjustStock('${x.id}',1)">+1</button><button class="text-btn" onclick="editInventory('${x.id}')">수정</button><button class="text-btn" onclick="deleteInventory('${x.id}')">삭제</button></div></article>`).join('')}

window.showRecipe=function(encoded){const name=decodeURIComponent(encoded),r=plan()?.recipes[name];document.querySelector('#recipeTitle').textContent=name;document.querySelector('#recipeBody').innerHTML=r?`<h3>${state.people}명 기준 재료</h3><ul class="recipe-ingredients">${r.ingredients.map(([n,q,u])=>`<li>${esc(n)} ${(q*factor()).toFixed(2)}${esc(u)}</li>`).join('')}</ul><h3>조리 순서</h3><ol class="recipe-steps">${r.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol>`:'<p>등록된 레시피가 없습니다.</p>';document.querySelector('#recipeDialog').showModal()}
window.toggleMeal=function(id,encoded,checked){state.mealChecks[id]=checked;if(checked){const name=decodeURIComponent(encoded),r=plan()?.recipes[name];if(r){const inv=inventoryMap();r.ingredients.forEach(([n,q,u])=>{if(inv[n]&&inv[n].unit===u)inv[n].qty=Math.max(0,inv[n].qty-q*factor())})}toast('조리 완료 및 재고 차감')}save()}
window.toggleShopping=function(id,encoded,qty,unit,checked){state.shoppingChecks[id]=checked;if(checked){const name=decodeURIComponent(encoded);let item=state.inventory.find(x=>x.name===name&&x.unit===unit);if(item)item.qty+=qty;else state.inventory.push({id:uid(),name,qty,unit,location:'미지정',min:0});toast('구매 완료 및 재고 추가')}save()}
window.adjustStock=function(id,d){const x=state.inventory.find(x=>x.id===id);if(x){x.qty=Math.max(0,x.qty+d);save()}}
window.editInventory=function(id){const x=state.inventory.find(x=>x.id===id);if(!x)return;invId.value=x.id;invName.value=x.name;invQty.value=x.qty;invUnit.value=x.unit;invLocation.value=x.location;invMin.value=x.min;inventoryDialog.showModal()}
window.deleteInventory=function(id){if(confirm('이 재료를 삭제할까요?')){state.inventory=state.inventory.filter(x=>x.id!==id);save()}}

function download(obj,name){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}));a.download=name;a.click();URL.revokeObjectURL(a.href)}
async function readJson(file){return JSON.parse(await file.text())}
function validPlan(p){return p&&typeof p.month==='string'&&Array.isArray(p.meals)&&p.recipes&&typeof p.recipes==='object'}

document.querySelectorAll('.bottom-nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.bottom-nav button,.page').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelector('#'+b.dataset.page).classList.add('active')});
document.querySelectorAll('.segmented button').forEach(b=>b.onclick=()=>{phase=Number(b.dataset.phase);document.querySelectorAll('.segmented button').forEach(x=>x.classList.toggle('active',x===b));renderShopping()});
monthPicker.onchange=e=>{state.currentMonth=e.target.value;save()};peopleSelect.onchange=e=>{state.people=Number(e.target.value);save()};resetMealChecks.onclick=()=>{if(confirm('현재 조리 체크를 모두 초기화할까요?')){Object.keys(state.mealChecks).filter(k=>k.startsWith(state.currentMonth)).forEach(k=>delete state.mealChecks[k]);save()}};
addInventoryBtn.onclick=()=>{inventoryForm.reset();invId.value='';invMin.value=0;inventoryDialog.showModal()};saveInventory.onclick=e=>{e.preventDefault();if(!inventoryForm.reportValidity())return;const data={id:invId.value||uid(),name:invName.value.trim(),qty:Number(invQty.value),unit:invUnit.value.trim(),location:invLocation.value,min:Number(invMin.value||0)};const idx=state.inventory.findIndex(x=>x.id===data.id);if(idx>=0)state.inventory[idx]=data;else state.inventory.push(data);inventoryDialog.close();save();toast('재고 저장')};closeRecipe.onclick=()=>recipeDialog.close();
importFile.onchange=async e=>{try{const p=await readJson(e.target.files[0]);if(!validPlan(p))throw new Error('형식 오류');state.plans[p.month]=p;state.currentMonth=p.month;save();toast('월간 식단을 가져왔습니다')}catch(err){alert('올바른 월간 식단 JSON 파일이 아닙니다.')}};
downloadSample.onclick=()=>{const p=plan();if(p)download(p,`${p.month}-월간식단.json`)};exportBackup.onclick=()=>download(state,`우리집식단-전체백업-${new Date().toISOString().slice(0,10)}.json`);restoreBackup.onchange=async e=>{try{const d=await readJson(e.target.files[0]);if(!d.plans||!Array.isArray(d.inventory))throw new Error();state=d;save();toast('전체 백업 복원 완료')}catch{alert('올바른 전체 백업 파일이 아닙니다.')}};resetAll.onclick=()=>{if(confirm('모든 식단·재고·체크 데이터를 삭제할까요?')){state=defaultState();save()}};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;installBtn.classList.remove('hidden')});installBtn.onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.classList.add('hidden')}};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
renderAll();
