
const KEY='homeos_ws06_state_v1';

const recipes={
  recipe_egg_toast:{
    id:'recipe_egg_toast',name:'계란토스트',version:'1.0.0',baseServings:6,
    time:{prepMinutes:5,cookMinutes:10,totalMinutes:15},difficulty:'쉬움',
    ingredients:[
      {id:'bread',name:'식빵',quantity:6,unit:'장',track:true},
      {id:'egg',name:'계란',quantity:6,unit:'개',track:true},
      {id:'butter',name:'버터',quantity:30,unit:'g',track:true},
      {id:'salt',name:'소금',quantity:2,unit:'꼬집',track:false}
    ],
    prep:['계란을 그릇에 깨고 소금을 넣어 가볍게 풀어 주세요.'],
    steps:[
      {title:'식빵 굽기',text:'팬을 중약불로 예열하고 버터 절반을 녹인 뒤 식빵을 앞뒤로 1분씩 굽습니다.',heat:'중약불',minutes:4,cue:'식빵 표면이 옅은 갈색이고 가장자리가 바삭합니다.'},
      {title:'계란 익히기',text:'남은 버터를 녹이고 계란물을 넓게 부어 익힙니다. 가장자리가 익으면 식빵 크기로 접습니다.',heat:'중약불',minutes:4,cue:'계란 표면에 흐르는 액체가 거의 없습니다.'},
      {title:'완성',text:'식빵 사이에 계란을 넣고 취향에 따라 케첩을 바릅니다.',heat:'불 끔',minutes:2,cue:'따뜻할 때 바로 담아냅니다.'}
    ],
    tips:['불이 강하면 버터와 식빵이 빨리 탑니다.','여러 장을 구운 경우 겹쳐 두지 마세요.'],
    storage:'가능하면 바로 먹고, 남은 경우 냉장 1일 이내 섭취하세요.'
  },
  recipe_jeyuk:{
    id:'recipe_jeyuk',name:'제육볶음',version:'1.0.0',baseServings:6,
    time:{prepMinutes:20,cookMinutes:15,totalMinutes:55},difficulty:'보통',
    ingredients:[
      {id:'pork',name:'돼지고기 앞다리살',quantity:1200,unit:'g',track:true},
      {id:'onion',name:'양파',quantity:2,unit:'개',track:true},
      {id:'green_onion',name:'대파',quantity:2,unit:'대',track:true},
      {id:'carrot',name:'당근',quantity:1,unit:'개',track:true},
      {id:'gochujang',name:'고추장',quantity:6,unit:'큰술',track:true},
      {id:'soy',name:'진간장',quantity:6,unit:'큰술',track:true},
      {id:'chili',name:'고춧가루',quantity:4,unit:'큰술',track:true},
      {id:'sugar',name:'설탕',quantity:3,unit:'큰술',track:true},
      {id:'garlic',name:'다진 마늘',quantity:3,unit:'큰술',track:true},
      {id:'sesame',name:'참기름',quantity:2,unit:'큰술',track:true}
    ],
    prep:['돼지고기는 키친타월로 핏물을 제거합니다.','양파·당근·대파를 미리 썹니다.','양념을 섞어 고기에 버무린 뒤 20분 재웁니다.'],
    steps:[
      {title:'팬 예열',text:'넓은 팬을 강불에서 1분간 충분히 예열합니다.',heat:'강불',minutes:1,cue:'팬에서 강한 열기가 느껴집니다.'},
      {title:'고기 볶기',text:'고기를 두 번으로 나눠 팬에 펼쳐 넣고 처음 1분은 건드리지 않은 뒤 볶습니다.',heat:'강불',minutes:6,cue:'고기의 붉은색이 거의 사라집니다.'},
      {title:'채소 넣기',text:'당근과 양파를 넣고 물이 생기지 않도록 중강불에서 볶습니다.',heat:'중강불',minutes:4,cue:'양파 가장자리가 투명해집니다.'},
      {title:'마무리',text:'대파를 넣어 볶고 불을 끈 뒤 참기름을 넣어 섞습니다.',heat:'중강불',minutes:2,cue:'팬 바닥에 물이 거의 남지 않습니다.'}
    ],
    tips:['6인분은 고기를 두 번으로 나눠 볶으세요.','참기름은 불을 끈 뒤 넣으세요.'],
    storage:'냉장 2일, 냉동 2주 보관 가능합니다.'
  },
  recipe_kimchi:{
    id:'recipe_kimchi',name:'김치찌개',version:'1.0.0',baseServings:6,
    time:{prepMinutes:10,cookMinutes:30,totalMinutes:40},difficulty:'보통',
    ingredients:[
      {id:'kimchi',name:'신김치',quantity:900,unit:'g',track:true},
      {id:'pork',name:'돼지고기',quantity:600,unit:'g',track:true},
      {id:'tofu',name:'두부',quantity:2,unit:'모',track:true},
      {id:'green_onion',name:'대파',quantity:1.5,unit:'대',track:true},
      {id:'chili',name:'고춧가루',quantity:2,unit:'큰술',track:true},
      {id:'garlic',name:'다진 마늘',quantity:2,unit:'큰술',track:true}
    ],
    prep:['김치와 돼지고기를 한입 크기로 썹니다.','두부는 1.5cm 두께로 썰고 대파는 어슷썹니다.'],
    steps:[
      {title:'김치와 고기 볶기',text:'냄비에 돼지고기를 3분 볶다가 김치를 넣어 5분 더 볶습니다.',heat:'중불',minutes:8,cue:'고기 겉면이 익고 김치 숨이 죽습니다.'},
      {title:'끓이기',text:'물을 붓고 센불에서 끓인 뒤 양념을 넣습니다.',heat:'센불',minutes:8,cue:'국물이 전체적으로 세게 끓습니다.'},
      {title:'푹 끓이기',text:'중약불로 낮춰 뚜껑을 반쯤 덮고 끓입니다.',heat:'중약불',minutes:15,cue:'김치가 부드럽고 국물에 붉은 기름이 돕니다.'},
      {title:'두부와 대파',text:'두부와 대파를 넣고 4분 더 끓입니다.',heat:'중불',minutes:4,cue:'두부 중심까지 뜨겁습니다.'}
    ],
    tips:['김치가 덜 익었다면 볶는 시간을 늘리세요.','간은 마지막에 조절하세요.'],
    storage:'냉장 3일, 냉동 2주 보관 가능합니다.'
  }
};

function initialState(){
  const today=new Date().toISOString().slice(0,10);
  return {
    date:today,
    servings:6,
    tab:'today',
    meals:{
      breakfast:{id:'meal_breakfast',type:'아침',recipeId:'recipe_egg_toast',status:'planned',inventoryApplied:false},
      lunch:{id:'meal_lunch',type:'점심',recipeId:'recipe_jeyuk',status:'planned',inventoryApplied:false},
      dinner:{id:'meal_dinner',type:'저녁',recipeId:'recipe_kimchi',status:'planned',inventoryApplied:false}
    },
    inventory:{
      bread:{name:'식빵',quantity:8,unit:'장'},
      egg:{name:'계란',quantity:10,unit:'개'},
      butter:{name:'버터',quantity:100,unit:'g'},
      pork:{name:'돼지고기',quantity:1500,unit:'g'},
      onion:{name:'양파',quantity:1,unit:'개'},
      green_onion:{name:'대파',quantity:1,unit:'대'},
      carrot:{name:'당근',quantity:1,unit:'개'},
      kimchi:{name:'신김치',quantity:700,unit:'g'},
      tofu:{name:'두부',quantity:1,unit:'모'},
      gochujang:{name:'고추장',quantity:10,unit:'큰술'},
      soy:{name:'진간장',quantity:10,unit:'큰술'},
      chili:{name:'고춧가루',quantity:6,unit:'큰술'},
      sugar:{name:'설탕',quantity:10,unit:'큰술'},
      garlic:{name:'다진 마늘',quantity:8,unit:'큰술'},
      sesame:{name:'참기름',quantity:5,unit:'큰술'}
    },
    shopping:{},
    cookingSession:null,
    undo:null,
    eventKeys:{},
    version:1
  };
}

let state=load();
let modal=null;
let timerInterval=null;

function load(){
  try{
    const raw=localStorage.getItem(KEY);
    return raw?JSON.parse(raw):initialState();
  }catch(e){return initialState();}
}
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function uid(prefix){return prefix+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));}
function scale(q){return Math.round((q*state.servings/6)*100)/100;}
function statusLabel(s){
  return ({planned:'예정',cooking:'조리 중',cooked:'조리 완료',eaten:'식사 완료',dining_out:'외식',delivery:'배달',convenience:'간편식',lunchbox:'도시락',skipped:'건너뜀'})[s]||s;
}
function statusClass(s){return ['cooked','eaten'].includes(s)?'cooked':(['dining_out','delivery','convenience','lunchbox','skipped'].includes(s)?'exception':'');}
function showToast(text,undoFn){
  const t=document.getElementById('toast');
  t.hidden=false;
  t.innerHTML=esc(text)+(undoFn?` <button id="undoToast">실행 취소</button>`:'');
  if(undoFn) document.getElementById('undoToast').onclick=undoFn;
  clearTimeout(showToast._t);
  showToast._t=setTimeout(()=>t.hidden=true,10000);
}
function recalcShopping(){
  const required={};
  Object.values(state.meals).forEach(meal=>{
    if(!['planned','cooking'].includes(meal.status)) return;
    const r=recipes[meal.recipeId];
    r.ingredients.filter(x=>x.track).forEach(i=>{
      const key=i.id+'::'+i.unit;
      required[key]??={id:i.id,name:i.name,unit:i.unit,quantity:0,sources:[]};
      required[key].quantity+=scale(i.quantity);
      required[key].sources.push(r.name);
    });
  });
  const next={};
  Object.values(required).forEach(req=>{
    const inv=state.inventory[req.id];
    const available=inv&&inv.unit===req.unit?Number(inv.quantity):0;
    const shortage=Math.max(0,Math.round((req.quantity-available)*100)/100);
    if(shortage>0){
      next[req.id]={id:req.id,name:req.name,unit:req.unit,required:req.quantity,available,quantity:shortage,planned:shortage,checked:false,status:'generated',sources:req.sources};
    }
  });
  Object.values(state.shopping).forEach(old=>{
    if(old.status==='stored' || old.status==='cancelled') return;
    if(next[old.id] && old.userAdjusted){
      next[old.id].planned=old.planned;
      next[old.id].userAdjusted=true;
      next[old.id].checked=old.checked;
    }else if(!next[old.id] && old.manual){
      next[old.id]=old;
    }
  });
  state.shopping=next;
  save();
}
function consumeRecipe(meal){
  const r=recipes[meal.recipeId], changes=[];
  r.ingredients.filter(i=>i.track).forEach(i=>{
    const q=scale(i.quantity), inv=state.inventory[i.id]||{name:i.name,quantity:0,unit:i.unit};
    const before=Number(inv.quantity)||0;
    inv.quantity=Math.max(0,Math.round((before-q)*100)/100);
    state.inventory[i.id]=inv;
    changes.push({id:i.id,before,after:inv.quantity});
  });
  return changes;
}
function restoreChanges(changes){changes.forEach(c=>{if(state.inventory[c.id])state.inventory[c.id].quantity=c.before;});}
function completeMeal(key){
  const meal=state.meals[key];
  const idem='complete_'+meal.id;
  if(state.eventKeys[idem]||meal.inventoryApplied) return;
  const prev=JSON.parse(JSON.stringify(meal));
  const changes=consumeRecipe(meal);
  meal.status='cooked';meal.inventoryApplied=true;
  state.eventKeys[idem]=true;
  state.undo={type:'mealComplete',key,prev,changes,idem};
  recalcShopping();save();render();
  showToast('조리 완료로 표시했어요.',()=>{
    const u=state.undo;if(!u||u.type!=='mealComplete')return;
    state.meals[u.key]=u.prev;restoreChanges(u.changes);delete state.eventKeys[u.idem];state.undo=null;
    recalcShopping();save();render();showToast('실행 취소했어요.');
  });
}
function markException(key,status){
  const meal=state.meals[key],prev=JSON.parse(JSON.stringify(meal));
  meal.status=status;meal.inventoryApplied=false;
  state.undo={type:'exception',key,prev};
  recalcShopping();save();modal=null;render();
  showToast(statusLabel(status)+'으로 표시했어요.',()=>{
    const u=state.undo;if(!u||u.type!=='exception')return;
    state.meals[u.key]=u.prev;state.undo=null;recalcShopping();save();render();showToast('실행 취소했어요.');
  });
}
function startCooking(key){
  const meal=state.meals[key],r=recipes[meal.recipeId];
  meal.status='cooking';
  state.cookingSession={mealKey:key,recipeId:r.id,recipeVersion:r.version,index:0,status:'active',timer:null};
  save();modal='cooking';render();
}
function finishCooking(){
  const key=state.cookingSession.mealKey;
  state.cookingSession.status='completed';state.cookingSession=null;modal=null;save();
  completeMeal(key);
}
function startTimer(minutes){
  const endsAt=Date.now()+minutes*60000;
  state.cookingSession.timer={endsAt,label:minutes+'분 타이머'};save();render();
  if(timerInterval)clearInterval(timerInterval);
  timerInterval=setInterval(()=>render(),1000);
}
function timerRemaining(){
  const t=state.cookingSession?.timer;
  if(!t)return null;
  return Math.max(0,Math.ceil((t.endsAt-Date.now())/1000));
}
function formatSec(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
function purchaseItem(id){
  const item=state.shopping[id];
  const qty=Number(item.planned)||0;
  const inv=state.inventory[id]||{name:item.name,quantity:0,unit:item.unit};
  if(inv.unit!==item.unit){alert('현재 프로토타입에서는 같은 단위만 재고에 반영할 수 있어요.');return;}
  const idem='purchase_'+id+'_'+state.date;
  if(state.eventKeys[idem])return;
  inv.quantity=Math.round((Number(inv.quantity)+qty)*100)/100;
  state.inventory[id]=inv;state.eventKeys[idem]=true;
  item.status='stored';item.checked=true;
  recalcShopping();save();render();showToast(item.name+' 재고에 반영했어요.');
}
function downloadBackup(){
  const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='homeos-backup.json';a.click();URL.revokeObjectURL(a.href);
}
function importBackup(file){
  const reader=new FileReader();
  reader.onload=()=>{try{state=JSON.parse(reader.result);save();render();showToast('백업을 복원했어요.');}catch(e){alert('올바른 백업 파일이 아니에요.');}};
  reader.readAsText(file);
}

function homeView(){
  const meals=Object.entries(state.meals).map(([key,m])=>{
    const r=recipes[m.recipeId];
    return `<section class="card">
      <div class="meal-head">
        <div><div class="meal-type">${m.type}</div><div class="meal-name">${esc(r.name)}</div></div>
        <span class="status ${statusClass(m.status)}">${statusLabel(m.status)}</span>
      </div>
      <div class="actions">
        <button class="secondary" onclick="openRecipe('${key}')">레시피</button>
        ${m.status==='planned'?`<button class="primary" onclick="startCooking('${key}')">조리 시작</button>`:
          m.status==='cooking'?`<button class="primary" onclick="resumeCooking()">조리 이어서</button>`:
          m.status==='cooked'?`<button class="ghost" onclick="markEaten('${key}')">식사 완료</button>`:`<button class="ghost" disabled>처리 완료</button>`}
        <button class="ghost more" onclick="openMealMore('${key}')">더보기</button>
      </div>
    </section>`;
  }).join('');
  const shoppingCount=Object.keys(state.shopping).length;
  const low=Object.values(state.inventory).filter(x=>Number(x.quantity)<=0).slice(0,4);
  return `<div class="header"><div><h1>오늘 해야 할 것</h1><div class="subtitle">${state.date} · ${state.servings}인 기준</div></div>
    <button class="icon-btn ghost" onclick="openSettings()">설정</button></div>
    ${meals}
    <div class="section-title"><h2>장보기</h2><button class="secondary" onclick="setTab('shopping')">${shoppingCount}개 보기</button></div>
    <section class="card">${shoppingCount?`<div class="muted">식단과 재고를 기준으로 부족한 품목을 준비했어요.</div>`:`<div class="muted">현재 부족한 장보기 품목이 없어요.</div>`}</section>
    <div class="section-title"><h2>재고 부족</h2></div>
    <section class="card">${low.length?low.map(x=>`<div class="mini-row"><span>${esc(x.name)}</span><strong>${x.quantity}${x.unit}</strong></div>`).join(''):`<div class="muted">완전히 소진된 재료가 없어요.</div>`}</section>`;
}
function shoppingView(){
  const items=Object.values(state.shopping);
  return `<div class="header"><div><h1>장보기</h1><div class="subtitle">체크 후 구매 완료를 눌러야 재고에 반영돼요.</div></div></div>
  ${items.length?items.map(i=>`<section class="card">
    <div class="meal-head"><div><h3>${esc(i.name)}</h3><div class="small muted">필요 ${i.quantity}${i.unit} · 재고 ${i.available??0}${i.unit}</div></div>
    <input type="checkbox" ${i.checked?'checked':''} onchange="toggleCheck('${i.id}',this.checked)" aria-label="${esc(i.name)} 체크"></div>
    <div class="form-row"><label>구매 수량</label><input type="number" step="0.1" value="${i.planned}" onchange="adjustPurchase('${i.id}',this.value)"></div>
    <button class="primary" style="width:100%;margin-top:8px" onclick="purchaseItem('${i.id}')">구매 완료 · 재고 반영</button>
  </section>`).join(''):`<div class="empty">장볼 품목이 없어요.</div>`}`;
}
function inventoryView(){
  return `<div class="header"><div><h1>우리집 식재료</h1><div class="subtitle">현재 보유 수량</div></div></div>
  <section class="card">${Object.entries(state.inventory).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([id,i])=>`
    <div class="mini-row"><span>${esc(i.name)}</span><span><input style="width:80px;padding:8px;border:1px solid var(--line);border-radius:10px" type="number" step="0.1" value="${i.quantity}" onchange="editInventory('${id}',this.value)"> ${i.unit}</span></div>`).join('')}</section>`;
}
function planView(){
  return `<div class="header"><div><h1>식단</h1><div class="subtitle">통합 프로토타입에서는 오늘 식단부터 검증합니다.</div></div></div>
  <section class="card">${Object.values(state.meals).map(m=>`<div class="mini-row"><span>${m.type}</span><strong>${recipes[m.recipeId].name}</strong></div>`).join('')}</section>`;
}
function moreView(){
  return `<div class="header"><div><h1>더보기</h1><div class="subtitle">백업과 초기화</div></div></div>
  <section class="card">
    <button class="secondary" style="width:100%;margin-bottom:10px" onclick="downloadBackup()">백업 파일 저장</button>
    <label class="primary" style="display:block;text-align:center;padding:14px;border-radius:14px;margin-bottom:10px">백업 파일 복원<input hidden type="file" accept="application/json" onchange="importBackup(this.files[0])"></label>
    <button class="danger" style="width:100%" onclick="resetApp()">데모 데이터 초기화</button>
  </section>`;
}
function tabs(){
  return `<nav class="tabs"><div class="tabs-inner">
  ${[['today','오늘'],['plan','식단'],['shopping','장보기'],['inventory','우리집'],['more','더보기']].map(([id,label])=>`<button class="tab ${state.tab===id?'active':''}" onclick="setTab('${id}')">${label}</button>`).join('')}
  </div></nav>`;
}
function recipeModal(key){
  const m=state.meals[key],r=recipes[m.recipeId];
  return `<div class="modal"><div class="modal-panel"><div class="modal-head"><div><h2>${esc(r.name)}</h2><div class="muted">${state.servings}인 기준</div></div><button class="close" onclick="closeModal()">×</button></div>
  <div class="recipe-meta"><span class="chip">${r.time.totalMinutes}분</span><span class="chip">${r.difficulty}</span><span class="chip">v${r.version}</span></div>
  <section class="card"><h3>재료</h3>${r.ingredients.map(i=>`<div class="ingredient"><span>${esc(i.name)}</span><strong>${scale(i.quantity)} ${i.unit}</strong></div>`).join('')}</section>
  <section class="card"><h3>조리 전 준비</h3>${r.prep.map((x,i)=>`<div class="step"><strong>${i+1}</strong>${esc(x)}</div>`).join('')}</section>
  <section class="card"><h3>조리 순서</h3>${r.steps.map((s,i)=>`<div class="step"><strong>${i+1}. ${esc(s.title)}</strong><div>${esc(s.text)}</div><div class="small muted">${s.heat} · ${s.minutes}분</div></div>`).join('')}</section>
  <section class="card"><h3>실패 방지 팁</h3>${r.tips.map(x=>`<p>• ${esc(x)}</p>`).join('')}<h3 style="margin-top:18px">보관</h3><p>${esc(r.storage)}</p></section>
  <button class="primary" style="width:100%" onclick="startCooking('${key}')">조리 모드 시작</button>
  </div></div>`;
}
function mealMoreModal(key){
  return `<div class="modal"><div class="modal-panel"><div class="modal-head"><h2>오늘은 어떻게 할까요?</h2><button class="close" onclick="closeModal()">×</button></div>
  <section class="card">
    ${[['dining_out','외식'],['delivery','배달'],['convenience','간편식'],['lunchbox','도시락'],['skipped','건너뛰기']].map(([s,l])=>`<button class="ghost" style="width:100%;margin-bottom:8px" onclick="markException('${key}','${s}')">${l}</button>`).join('')}
  </section></div></div>`;
}
function cookingModal(){
  const s=state.cookingSession,r=recipes[s.recipeId],step=r.steps[s.index],remaining=timerRemaining();
  return `<div class="modal"><div class="modal-panel cooking">
    <div class="modal-head"><div><div class="meal-type">${r.name}</div><h2>${s.index+1} / ${r.steps.length}단계</h2></div><button class="close" onclick="pauseAndClose()">×</button></div>
    <div class="progress"><span style="width:${((s.index+1)/r.steps.length)*100}%"></span></div>
    <div class="cook-step"><div class="meal-type">${esc(step.heat)} · 약 ${step.minutes}분</div><h2>${esc(step.title)}</h2><p>${esc(step.text)}</p>
      <div class="cue"><strong>이렇게 되면 다음 단계예요</strong><div>${esc(step.cue)}</div></div>
      ${remaining!==null?`<div class="timer-box"><div class="small muted">${esc(s.timer.label)}</div><div class="timer-time">${formatSec(remaining)}</div><button class="secondary" onclick="addTimer(60)">+1분</button></div>`:
      `<button class="secondary" style="width:100%;margin-top:16px" onclick="startTimer(${step.minutes})">${step.minutes}분 타이머 시작</button>`}
    </div>
    <div class="cook-actions"><button class="ghost" onclick="prevStep()" ${s.index===0?'disabled':''}>이전</button>
    ${s.index===r.steps.length-1?`<button class="primary" onclick="confirmFinish()">조리 완료</button>`:`<button class="primary" onclick="nextStep()">다음 단계</button>`}</div>
  </div></div>`;
}
function finishConfirmModal(){
  const s=state.cookingSession,r=recipes[s.recipeId];
  return `<div class="modal"><div class="modal-panel"><div class="modal-head"><h2>조리가 끝났나요?</h2><button class="close" onclick="modal='cooking';render()">×</button></div>
  <section class="card"><h3>${r.name}</h3><p class="muted">완료하면 사용한 재료가 재고에서 차감되고 장보기가 다시 계산돼요.</p>
  ${r.ingredients.filter(i=>i.track).slice(0,5).map(i=>`<div class="ingredient"><span>${i.name}</span><strong>${scale(i.quantity)}${i.unit}</strong></div>`).join('')}</section>
  <button class="primary" style="width:100%;margin-bottom:10px" onclick="finishCooking()">조리 완료</button>
  <button class="ghost" style="width:100%" onclick="modal='cooking';render()">계속 조리하기</button>
  </div></div>`;
}
function settingsModal(){
  return `<div class="modal"><div class="modal-panel"><div class="modal-head"><h2>설정</h2><button class="close" onclick="closeModal()">×</button></div>
  <section class="card"><div class="form-row"><label>가족 인원</label><select onchange="changeServings(this.value)">${[2,3,4,5,6,7,8,9,10].map(n=>`<option ${state.servings===n?'selected':''}>${n}</option>`).join('')}</select></div></section>
  </div></div>`;
}
function render(){
  recalcShopping();
  const view=state.tab==='today'?homeView():state.tab==='shopping'?shoppingView():state.tab==='inventory'?inventoryView():state.tab==='plan'?planView():moreView();
  document.getElementById('app').innerHTML=`<main class="shell">${view}</main>${tabs()}${modal==='recipe'?recipeModal(modalKey):modal==='mealMore'?mealMoreModal(modalKey):modal==='cooking'?cookingModal():modal==='finish'?finishConfirmModal():modal==='settings'?settingsModal():''}`;
}
let modalKey=null;
window.openRecipe=k=>{modalKey=k;modal='recipe';render();}
window.openMealMore=k=>{modalKey=k;modal='mealMore';render();}
window.closeModal=()=>{modal=null;render();}
window.openSettings=()=>{modal='settings';render();}
window.setTab=t=>{state.tab=t;save();render();}
window.startCooking=startCooking;
window.resumeCooking=()=>{modal='cooking';render();}
window.markException=markException;
window.markEaten=k=>{state.meals[k].status='eaten';save();render();showToast('식사 완료로 표시했어요.');}
window.nextStep=()=>{const s=state.cookingSession,r=recipes[s.recipeId];if(s.index<r.steps.length-1)s.index++;s.timer=null;save();render();}
window.prevStep=()=>{const s=state.cookingSession;if(s.index>0)s.index--;s.timer=null;save();render();}
window.startTimer=startTimer;
window.addTimer=sec=>{if(state.cookingSession?.timer){state.cookingSession.timer.endsAt+=sec*1000;save();render();}}
window.pauseAndClose=()=>{modal=null;save();render();showToast('조리 진행 위치를 저장했어요.');}
window.confirmFinish=()=>{modal='finish';render();}
window.toggleCheck=(id,v)=>{state.shopping[id].checked=v;state.shopping[id].status=v?'checked':'ready';save();}
window.adjustPurchase=(id,v)=>{state.shopping[id].planned=Number(v)||0;state.shopping[id].userAdjusted=true;save();}
window.editInventory=(id,v)=>{state.inventory[id].quantity=Number(v)||0;recalcShopping();save();render();}
window.changeServings=v=>{state.servings=Number(v);recalcShopping();save();modal=null;render();}
window.downloadBackup=downloadBackup;
window.importBackup=importBackup;
window.resetApp=()=>{if(confirm('데모 데이터를 초기화할까요?')){state=initialState();save();render();}}
window.purchaseItem=purchaseItem;

if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
recalcShopping();render();
