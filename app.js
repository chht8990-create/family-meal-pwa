
const KEY='homeos_ws06a_state_v1';

const recipes={
 jeyuk:{
  id:'jeyuk',name:'제육볶음',version:'2.0.0',baseServings:4,
  summary:'물이 생기지 않고 불맛과 윤기가 살아 있는 제육볶음',
  difficulty:'보통',prepMinutes:25,cookMinutes:15,
  tools:['30cm 이상 프라이팬','큰 볼','집게 또는 긴 주걱','계량스푼','도마','칼'],
  checklist:[
   '고기는 키친타월로 겉면의 물기를 제거했나요?',
   '양파·당근·대파를 모두 썰어 두었나요?',
   '양념을 한 그릇에 미리 섞었나요?',
   '고기를 한 번에 넣지 않고 두 번으로 나눌 준비가 되었나요?'
  ],
  ingredients:[
   {id:'pork',name:'돼지고기 앞다리살',q:800,unit:'g',track:true},
   {id:'onion',name:'양파',q:1.3,unit:'개',track:true},
   {id:'greenOnion',name:'대파',q:1.3,unit:'대',track:true},
   {id:'carrot',name:'당근',q:.7,unit:'개',track:true},
   {id:'gochujang',name:'고추장',q:4,unit:'큰술',track:true},
   {id:'soy',name:'진간장',q:4,unit:'큰술',track:true},
   {id:'chili',name:'고춧가루',q:2.7,unit:'큰술',track:true},
   {id:'sugar',name:'설탕',q:2,unit:'큰술',track:true},
   {id:'garlic',name:'다진 마늘',q:2,unit:'큰술',track:true},
   {id:'sesame',name:'참기름',q:1.3,unit:'큰술',track:true}
  ],
  preparation:[
   '돼지고기는 4~5cm 크기로 펼쳐지게 썰고 키친타월로 눌러 물기를 제거합니다.',
   '양파는 1cm 폭, 당근은 0.4cm 두께, 대파는 4cm 길이로 썹니다.',
   '고추장·간장·고춧가루·설탕·마늘을 섞어 양념을 만듭니다.',
   '고기에 양념을 버무려 최소 20분 재웁니다.'
  ],
  steps:[
   {
    title:'팬을 충분히 예열하기',
    action:'빈 팬을 강불에 올려 1분 30초 정도 예열합니다. 기름은 아직 넣지 않습니다.',
    heat:'강불',minutes:2,
    why:'팬 온도가 충분히 올라가야 고기를 넣었을 때 수분이 빠르게 증발하고 삶아지지 않습니다.',
    fail:'팬이 덜 달궈지면 고기에서 물이 한꺼번에 나오고 양념이 묽어집니다.',
    fix:'팬에 물이 생기기 시작하면 고기를 일부 덜어내고 강불을 유지한 채 수분부터 날립니다.',
    cue:'손을 팬 위 15cm에 댔을 때 강한 열기가 느껴지고, 물 한 방울이 바로 튀며 증발합니다.'
   },
   {
    title:'고기 절반만 펼쳐 굽기',
    action:'고기 절반을 팬에 겹치지 않게 펼칩니다. 처음 1분은 움직이지 말고, 이후 뒤집어 2~3분 볶습니다.',
    heat:'강불',minutes:4,
    why:'처음 1분 동안 표면을 익혀야 고기 맛이 진해지고 팬 온도도 덜 떨어집니다.',
    fail:'고기를 전부 넣거나 계속 뒤적이면 팬 온도가 떨어져 물이 생깁니다.',
    fix:'팬이 젖어 보이면 고기를 건드리지 말고 강불에서 1분 더 두어 수분을 날립니다.',
    cue:'붉은색이 20% 이하로 남고, 가장자리에 갈색 구운 면이 보입니다.'
   },
   {
    title:'남은 고기 볶기',
    action:'첫 번째 고기를 잠시 접시에 덜고, 남은 고기를 같은 방식으로 볶습니다.',
    heat:'강불',minutes:4,
    why:'4인분 이상은 팬을 나눠 써야 고기와 양념이 고르게 볶아집니다.',
    fail:'첫 번째 고기까지 계속 팬에 두면 두 번째 고기가 들어갈 때 수분이 다시 많아집니다.',
    fix:'팬 바닥에 양념이 타기 시작하면 물 1큰술만 넣어 긁어낸 뒤 바로 고기를 넣습니다.',
    cue:'두 번째 고기도 붉은색이 거의 사라지고 팬 바닥에 국물이 고이지 않습니다.'
   },
   {
    title:'단단한 채소부터 볶기',
    action:'덜어둔 고기를 다시 넣고 당근을 먼저 1분, 양파를 넣어 2분 볶습니다.',
    heat:'중강불',minutes:3,
    why:'당근은 익는 데 오래 걸리고 양파는 빨리 무르기 때문에 순서를 나눕니다.',
    fail:'양파와 대파까지 한꺼번에 넣으면 채소 수분 때문에 양념이 묽어집니다.',
    fix:'물이 많아지면 팬 가장자리에 재료를 펼치고 중간을 비운 뒤 강불로 1~2분 끓입니다.',
    cue:'당근은 살짝 휘어지고 양파 가장자리는 투명하지만 중심은 형태를 유지합니다.'
   },
   {
    title:'대파와 참기름으로 마무리',
    action:'대파를 넣어 40초 볶고 불을 끕니다. 참기름을 둘러 10초간 섞습니다.',
    heat:'중강불 → 불 끔',minutes:1,
    why:'대파와 참기름은 오래 가열하면 향이 날아가므로 마지막에 넣습니다.',
    fail:'참기름을 불 위에서 오래 볶으면 향이 약하고 느끼하게 느껴질 수 있습니다.',
    fix:'이미 오래 볶았다면 접시에 담은 뒤 참기름 몇 방울과 통깨를 추가합니다.',
    cue:'팬 바닥에 묽은 국물이 거의 없고, 고기 표면에 윤기가 돌며 대파 향이 선명합니다.'
   }
  ],
  finalChecks:['돼지고기 중심에 붉은 부분이 없습니다.','팬 바닥에 묽은 국물이 거의 없습니다.','양파는 투명하지만 완전히 흐물거리지는 않습니다.','양념은 고기에 붙어 윤기가 납니다.'],
  troubleshooting:[
   ['물이 너무 많아요','팬이 작거나 고기를 한 번에 많이 넣었을 가능성이 큽니다. 고기를 일부 덜고 강불에서 수분부터 날리세요.'],
   ['너무 짜요','물보다 양파나 양배추를 추가해 2분 더 볶으세요. 밥과 곁들일 때는 간을 더하지 마세요.'],
   ['너무 매워요','설탕 1작은술 또는 올리고당과 양파를 추가하세요. 물을 많이 넣으면 맛이 묽어집니다.'],
   ['고기가 질겨요','너무 오래 볶았을 수 있습니다. 물 2큰술을 넣고 뚜껑을 덮어 약불에서 2분만 부드럽게 익히세요.']
  ],
  storage:{fridge:'밀폐 용기에 담아 냉장 2일',freezer:'1회분씩 나눠 냉동 2주',reheat:'팬에 물 1큰술을 넣고 중약불에서 4~5분 데웁니다.'},
  reuse:['제육덮밥','제육볶음밥','제육김밥','제육 또띠아']
 },
 kimchi:{
  id:'kimchi',name:'김치찌개',version:'2.0.0',baseServings:4,
  summary:'신김치의 깊은 맛과 돼지고기 감칠맛이 살아 있는 김치찌개',
  difficulty:'보통',prepMinutes:12,cookMinutes:32,
  tools:['2.5L 이상 냄비','국자','도마','칼','계량컵','계량스푼'],
  checklist:['김치가 충분히 익은 신김치인가요?','두부와 대파를 미리 썰었나요?','김치 국물을 버리지 않고 준비했나요?'],
  ingredients:[
   {id:'kimchi',name:'신김치',q:600,unit:'g',track:true},
   {id:'pork',name:'돼지고기',q:400,unit:'g',track:true},
   {id:'tofu',name:'두부',q:1.3,unit:'모',track:true},
   {id:'greenOnion',name:'대파',q:1,unit:'대',track:true},
   {id:'chili',name:'고춧가루',q:1.3,unit:'큰술',track:true},
   {id:'garlic',name:'다진 마늘',q:1.3,unit:'큰술',track:true}
  ],
  preparation:['김치는 4cm 길이로, 돼지고기는 3cm 크기로 썹니다.','두부는 1.5cm 두께로 썰고 대파는 어슷썹니다.'],
  steps:[
   {title:'돼지고기 겉면 익히기',action:'냄비를 중불로 달군 뒤 돼지고기를 넣어 3분 볶습니다.',heat:'중불',minutes:3,why:'고기 겉면을 먼저 익히면 잡내가 줄고 국물 맛이 진해집니다.',fail:'고기가 냄비에 달라붙으면 냄비가 덜 달궈졌거나 수분이 많습니다.',fix:'불을 낮추고 물 1큰술을 넣어 바닥을 긁습니다.',cue:'고기 표면의 붉은색이 사라지고 기름이 조금 나옵니다.'},
   {title:'김치 충분히 볶기',action:'김치와 김치 국물 4큰술을 넣고 5분 볶습니다.',heat:'중불',minutes:5,why:'김치를 먼저 볶으면 신맛이 부드러워지고 깊은 맛이 납니다.',fail:'바로 물을 부으면 김치 맛이 겉돌 수 있습니다.',fix:'이미 물을 부었다면 뚜껑을 열고 5분 더 끓이세요.',cue:'김치 숨이 죽고 색이 짙어지며 냄비 바닥에 붉은 기름이 보입니다.'},
   {title:'센불에서 끓이기',action:'물 1.2L를 붓고 고춧가루와 마늘을 넣어 센불에서 끓입니다.',heat:'센불',minutes:8,why:'처음에 강하게 끓여 재료의 맛을 국물에 빠르게 섞습니다.',fail:'거품이 넘칠 수 있습니다.',fix:'끓기 시작하면 바로 중약불로 낮추고 거품을 걷습니다.',cue:'냄비 전체가 고르게 끓고 국물 색이 붉게 균일합니다.'},
   {title:'중약불에서 푹 끓이기',action:'뚜껑을 반쯤 덮고 중약불에서 15분 끓입니다.',heat:'중약불',minutes:15,why:'강불로 계속 끓이면 국물이 빨리 줄고 김치가 부드러워지기 전에 짜집니다.',fail:'국물이 너무 빨리 줄면 불이 강한 상태입니다.',fix:'뜨거운 물을 100ml씩 보충하고 불을 낮춥니다.',cue:'김치 줄기가 부드럽게 휘고 국물에 붉은 기름이 떠 있습니다.'},
   {title:'두부와 대파 넣기',action:'두부와 대파를 넣고 중불에서 4분 더 끓입니다.',heat:'중불',minutes:4,why:'두부는 오래 끓이면 부서지기 쉬워 마지막에 넣습니다.',fail:'국자로 세게 젓으면 두부가 부서집니다.',fix:'냄비를 가볍게 흔들어 재료를 섞습니다.',cue:'두부 중심까지 뜨겁고 대파 향이 올라옵니다.'}
  ],
  finalChecks:['김치 줄기가 부드럽게 씹힙니다.','국물에 붉은 기름이 얇게 떠 있습니다.','돼지고기 중심이 완전히 익었습니다.','두부가 부서지지 않고 형태를 유지합니다.'],
  troubleshooting:[['너무 시어요','설탕 1작은술을 넣고 3분 더 끓이세요.'],['국물이 밍밍해요','뚜껑을 열고 5분 더 끓여 농축하세요.'],['너무 짜요','뜨거운 물 100ml와 두부 또는 양파를 추가하세요.']],
  storage:{fridge:'식힌 뒤 냉장 3일',freezer:'두부를 제외하고 냉동 2주',reheat:'냄비에서 완전히 끓인 뒤 2분 더 가열합니다.'},
  reuse:['김치찌개 라면','김치죽','김치찌개 볶음밥']
 },
 toast:{
  id:'toast',name:'계란토스트',version:'2.0.0',baseServings:2,
  summary:'버터 향이 나고 계란이 촉촉한 간단 아침 메뉴',
  difficulty:'쉬움',prepMinutes:5,cookMinutes:10,
  tools:['프라이팬','뒤집개','볼','젓가락 또는 거품기'],
  checklist:['계란을 미리 풀었나요?','버터를 두 번 사용할 양으로 나눴나요?','구운 식빵을 겹치지 않을 접시가 있나요?'],
  ingredients:[
   {id:'bread',name:'식빵',q:2,unit:'장',track:true},
   {id:'egg',name:'계란',q:2,unit:'개',track:true},
   {id:'butter',name:'버터',q:10,unit:'g',track:true},
   {id:'salt',name:'소금',q:1,unit:'꼬집',track:false}
  ],
  preparation:['계란을 볼에 깨고 소금을 넣어 노른자와 흰자가 섞일 정도로만 풉니다.'],
  steps:[
   {title:'식빵 굽기',action:'팬을 중약불로 1분 예열하고 버터 절반을 녹인 뒤 식빵을 앞뒤로 1분씩 굽습니다.',heat:'중약불',minutes:3,why:'센불에서는 버터가 타고 식빵 겉만 빨리 검어집니다.',fail:'식빵이 검게 변하면 불이 너무 강합니다.',fix:'팬을 불에서 20초 내리고 키친타월로 탄 버터를 닦습니다.',cue:'표면이 연한 갈색이고 가장자리가 바삭합니다.'},
   {title:'계란 천천히 익히기',action:'남은 버터를 녹이고 계란물을 부어 가장자리가 익을 때까지 30초 기다린 뒤 안쪽으로 접습니다.',heat:'약불',minutes:3,why:'약불에서 천천히 익혀야 계란이 질기지 않고 촉촉합니다.',fail:'계란 표면이 갈색이면 불이 강합니다.',fix:'즉시 불을 끄고 잔열로 마무리하세요.',cue:'표면에 흐르는 계란물이 거의 없지만 완전히 마르지는 않았습니다.'},
   {title:'조립하기',action:'식빵 사이에 계란을 넣고 취향에 따라 케첩을 얇게 바릅니다.',heat:'불 끔',minutes:1,why:'뜨거울 때 바로 조립해야 식빵과 계란 온도가 맞습니다.',fail:'구운 식빵을 겹쳐 두면 수증기로 눅눅해집니다.',fix:'마른 팬에서 앞뒤로 20초씩 다시 데우세요.',cue:'식빵은 바삭하고 계란 중심은 촉촉합니다.'}
  ],
  finalChecks:['식빵 표면이 연한 갈색입니다.','계란에 흐르는 액체가 없습니다.','계란이 갈색으로 마르지 않았습니다.'],
  troubleshooting:[['식빵이 눅눅해요','마른 팬에서 약불로 앞뒤 20초씩 다시 구우세요.'],['계란이 퍽퍽해요','다음에는 표면에 약간의 윤기가 남았을 때 불을 끄세요.']],
  storage:{fridge:'가능하면 바로 먹고 남으면 냉장 1일',freezer:'권장하지 않음',reheat:'마른 팬 약불에서 앞뒤로 1분씩 데웁니다.'},
  reuse:['토스트 샌드위치','계란 크루통']
 }
};

function fresh(){
 const today=new Date().toISOString().slice(0,10);
 return {
  date:today,servings:2,largeBatch:false,tab:'today',
  meals:{
   breakfast:{id:'breakfast',label:'아침',recipeId:'toast',status:'planned',inventoryApplied:false},
   lunch:{id:'lunch',label:'점심',recipeId:'jeyuk',status:'planned',inventoryApplied:false},
   dinner:{id:'dinner',label:'저녁',recipeId:'kimchi',status:'planned',inventoryApplied:false}
  },
  inventory:{
   bread:{name:'식빵',q:4,unit:'장'},egg:{name:'계란',q:4,unit:'개'},butter:{name:'버터',q:30,unit:'g'},
   pork:{name:'돼지고기',q:500,unit:'g'},onion:{name:'양파',q:1,unit:'개'},greenOnion:{name:'대파',q:.5,unit:'대'},
   carrot:{name:'당근',q:.5,unit:'개'},kimchi:{name:'신김치',q:300,unit:'g'},tofu:{name:'두부',q:.5,unit:'모'},
   gochujang:{name:'고추장',q:3,unit:'큰술'},soy:{name:'진간장',q:3,unit:'큰술'},chili:{name:'고춧가루',q:2,unit:'큰술'},
   sugar:{name:'설탕',q:5,unit:'큰술'},garlic:{name:'다진 마늘',q:2,unit:'큰술'},sesame:{name:'참기름',q:2,unit:'큰술'}
  },
  shopping:{},session:null,undo:null,processed:{}
 };
}
let state=load(),modal=null,modalKey=null,recipeMode='beginner',tick=null;

function load(){try{return JSON.parse(localStorage.getItem(KEY))||fresh()}catch{return fresh()}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function e(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function factor(recipe){return state.servings/recipe.baseServings}
function qty(v,recipe){return Math.round(v*factor(recipe)*100)/100}
function label(s){return ({planned:'예정',cooking:'조리 중',cooked:'조리 완료',eaten:'식사 완료',dining_out:'외식',delivery:'배달',convenience:'간편식',lunchbox:'도시락',skipped:'건너뜀'})[s]||s}
function stClass(s){return ['cooked','eaten'].includes(s)?'done':(['dining_out','delivery','convenience','lunchbox','skipped'].includes(s)?'exception':'')}
function toast(msg,undo){
 const t=document.getElementById('toast');t.hidden=false;t.innerHTML=e(msg)+(undo?`<button id="undo">실행 취소</button>`:'');
 if(undo)document.getElementById('undo').onclick=undo;
 clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,10000);
}
function recalc(){
 const req={};
 Object.values(state.meals).forEach(m=>{
  if(!['planned','cooking'].includes(m.status))return;
  const r=recipes[m.recipeId];
  r.ingredients.filter(i=>i.track).forEach(i=>{
   const k=i.id+'|'+i.unit;
   req[k]??={id:i.id,name:i.name,unit:i.unit,q:0,sources:[]};
   req[k].q+=qty(i.q,r);req[k].sources.push(r.name);
  });
 });
 const next={};
 Object.values(req).forEach(x=>{
  const inv=state.inventory[x.id],available=inv&&inv.unit===x.unit?Number(inv.q):0;
  const short=Math.max(0,Math.round((x.q-available)*100)/100);
  if(short>0)next[x.id]={...x,required:x.q,available,short,planned:state.shopping[x.id]?.userAdjusted?state.shopping[x.id].planned:short,checked:state.shopping[x.id]?.checked||false,userAdjusted:state.shopping[x.id]?.userAdjusted||false,status:'generated'};
 });
 state.shopping=next;save();
}
function consume(key){
 const m=state.meals[key],r=recipes[m.recipeId],changes=[];
 r.ingredients.filter(i=>i.track).forEach(i=>{
  const need=qty(i.q,r),inv=state.inventory[i.id]||{name:i.name,q:0,unit:i.unit};
  const before=Number(inv.q)||0;inv.q=Math.max(0,Math.round((before-need)*100)/100);
  state.inventory[i.id]=inv;changes.push({id:i.id,before});
 });
 return changes;
}
function complete(key){
 const m=state.meals[key],id='complete:'+m.id;
 if(state.processed[id]||m.inventoryApplied)return;
 const prev=JSON.parse(JSON.stringify(m)),changes=consume(key);
 m.status='cooked';m.inventoryApplied=true;state.processed[id]=true;state.session=null;modal=null;
 state.undo={type:'complete',key,prev,changes,id};recalc();save();render();
 toast('조리 완료로 표시하고 재고를 반영했어요.',()=>{
  const u=state.undo;if(!u||u.type!=='complete')return;
  state.meals[u.key]=u.prev;u.changes.forEach(c=>state.inventory[c.id].q=c.before);
  delete state.processed[u.id];state.undo=null;recalc();save();render();toast('조리 완료와 재고 차감을 취소했어요.');
 });
}
function exception(key,s){
 const prev=JSON.parse(JSON.stringify(state.meals[key]));state.meals[key].status=s;
 state.undo={type:'exception',key,prev};modal=null;recalc();save();render();
 toast(label(s)+'으로 표시했어요.',()=>{
  const u=state.undo;if(!u||u.type!=='exception')return;
  state.meals[u.key]=u.prev;state.undo=null;recalc();save();render();toast('실행 취소했어요.');
 });
}
function startCooking(key){
 const m=state.meals[key],r=recipes[m.recipeId];m.status='cooking';
 state.session={key,recipeId:r.id,recipeVersion:r.version,index:0,timer:null,status:'active'};
 modal='cooking';save();render();
}
function remaining(){
 if(!state.session?.timer)return null;
 return Math.max(0,Math.ceil((state.session.timer.endsAt-Date.now())/1000));
}
function timeText(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function startTimer(min){
 state.session.timer={endsAt:Date.now()+min*60000,label:min+'분 타이머'};save();render();
 clearInterval(tick);tick=setInterval(render,1000);
}
function purchase(id){
 const x=state.shopping[id],inv=state.inventory[id]||{name:x.name,q:0,unit:x.unit};
 const action='purchase:'+id+':'+Date.now();
 if(state.processed[action])return;
 inv.q=Math.round((Number(inv.q)+Number(x.planned))*100)/100;
 state.inventory[id]=inv;state.processed[action]=true;recalc();save();render();toast(x.name+' 구매 수량을 재고에 반영했어요.');
}
function nav(){
 return `<nav class="tabs"><div class="tabs-inner">${[['today','오늘'],['plan','식단'],['shopping','장보기'],['inventory','우리집'],['more','더보기']].map(x=>`<button class="tab ${state.tab===x[0]?'active':''}" onclick="setTab('${x[0]}')">${x[1]}</button>`).join('')}</div></nav>`;
}
function today(){
 return `<div class="header"><div><h1>오늘의 식사</h1><div class="sub">${state.date} · ${state.largeBatch?'대용량 '+state.servings+'인분':state.servings+'인분'}</div></div><button class="ghost" onclick="openSettings()">인원 설정</button></div>
 ${Object.entries(state.meals).map(([k,m])=>{const r=recipes[m.recipeId];return `<section class="card">
  <div class="meal-head"><div><div class="meal-type">${m.label}</div><div class="meal-name">${r.name}</div></div><span class="status ${stClass(m.status)}">${label(m.status)}</span></div>
  <div class="meal-actions">
   <button class="primary" onclick="startCooking('${k}')">${m.status==='cooking'?'조리 이어서':'조리 시작'}</button>
   <button class="secondary" onclick="openRecipe('${k}')">상세 레시피</button>
   <button class="ghost wide" onclick="openException('${k}')">오늘은 안 먹어요</button>
  </div>
 </section>`}).join('')}
 <div class="section-head"><h2>장보기 부족 항목</h2><button class="secondary" onclick="setTab('shopping')">${Object.keys(state.shopping).length}개</button></div>
 <section class="card">${Object.values(state.shopping).slice(0,4).map(x=>`<div class="mini-row"><span>${x.name}</span><strong>${x.short}${x.unit} 부족</strong></div>`).join('')||'<div class="muted">현재 부족한 품목이 없어요.</div>'}</section>`;
}
function shopping(){
 const a=Object.values(state.shopping);
 return `<div class="header"><div><h1>장보기</h1><div class="sub">현재 식단과 재고를 다시 계산한 결과예요.</div></div></div>
 ${a.length?a.map(x=>`<section class="card"><div class="meal-head"><div><h3>${x.name}</h3><div class="small muted">${[...new Set(x.sources)].join(', ')}</div></div><input type="checkbox" ${x.checked?'checked':''} onchange="checkItem('${x.id}',this.checked)"></div>
 <div class="mini-row"><span>전체 필요량</span><strong>${x.required}${x.unit}</strong></div>
 <div class="mini-row"><span>현재 재고</span><strong>${x.available}${x.unit}</strong></div>
 <div class="mini-row"><span>부족량</span><strong>${x.short}${x.unit}</strong></div>
 <div class="form-row"><label>실제 구매 수량</label><input type="number" step="0.1" value="${x.planned}" onchange="adjust('${x.id}',this.value)"></div>
 <button class="primary" style="width:100%" onclick="purchase('${x.id}')">구매 완료 · 재고 반영</button></section>`).join(''):'<div class="empty">장보기 부족 항목이 없어요.</div>'}`;
}
function inventory(){
 return `<div class="header"><div><h1>우리집 식재료</h1><div class="sub">수량을 수정하면 장보기가 즉시 다시 계산돼요.</div></div></div><section class="card">${Object.entries(state.inventory).sort((a,b)=>a[1].name.localeCompare(b[1].name)).map(([id,x])=>`<div class="mini-row"><span>${x.name}</span><span><input style="width:82px;padding:8px;border:1px solid var(--line);border-radius:10px" type="number" step="0.1" value="${x.q}" onchange="editInv('${id}',this.value)"> ${x.unit}</span></div>`).join('')}</section>`;
}
function plan(){return `<div class="header"><div><h1>식단</h1><div class="sub">현재는 오늘 식단의 통합 사용성을 검증합니다.</div></div></div><section class="card">${Object.values(state.meals).map(m=>`<div class="mini-row"><span>${m.label}</span><strong>${recipes[m.recipeId].name}</strong></div>`).join('')}</section>`}
function more(){return `<div class="header"><div><h1>더보기</h1><div class="sub">데이터 관리</div></div></div><section class="card"><button class="secondary" style="width:100%;margin-bottom:9px" onclick="backup()">백업 저장</button><label class="primary" style="display:block;text-align:center;padding:14px;border-radius:14px;margin-bottom:9px">백업 복원<input hidden type="file" accept="application/json" onchange="restore(this.files[0])"></label><button class="danger" style="width:100%" onclick="resetAll()">데모 초기화</button></section>`}
function recipeModal(){
 const m=state.meals[modalKey],r=recipes[m.recipeId],begin=recipeMode==='beginner';
 return `<div class="modal"><div class="panel"><div class="modal-head"><div><h2>${r.name}</h2><div class="muted">Recipe Experience 2.0</div></div><button class="close" onclick="closeModal()">×</button></div>
 <div class="recipe-hero"><h2>${r.summary}</h2><div class="chips"><span class="chip">${state.servings}인분</span><span class="chip">준비 ${r.prepMinutes}분</span><span class="chip">조리 ${r.cookMinutes}분</span><span class="chip">${r.difficulty}</span></div></div>
 <div class="mode-switch"><button class="${begin?'active ghost':'ghost'}" onclick="setRecipeMode('beginner')">초보자 모드</button><button class="${!begin?'active ghost':'ghost'}" onclick="setRecipeMode('quick')">빠른 보기</button></div>
 ${begin?`<section class="card"><h3>조리 전 체크</h3>${r.checklist.map((x,i)=>`<label class="check-item"><input type="checkbox"><span>${x}</span></label>`).join('')}</section>
 <section class="card"><h3>필요한 도구</h3><div class="tool-grid">${r.tools.map(x=>`<span class="tool">${x}</span>`).join('')}</div></section>`:''}
 <section class="card"><h3>재료</h3>${r.ingredients.map(i=>`<div class="ingredient"><span>${i.name}</span><strong>${qty(i.q,r)} ${i.unit}</strong></div>`).join('')}</section>
 ${begin?`<section class="card"><h3>조리 전 준비</h3>${r.preparation.map((x,i)=>`<div class="recipe-step"><span class="step-num">${i+1}</span>${x}</div>`).join('')}</section>`:''}
 <section class="card"><h3>조리 단계</h3>${r.steps.map((s,i)=>`<div class="recipe-step"><h3><span class="step-num">${i+1}</span>${s.title}</h3><p>${s.action}</p><div class="chips"><span class="chip">${s.heat}</span><span class="chip">${s.minutes}분</span></div>${begin?`<div class="detail-box why"><strong>왜 이렇게 하나요?</strong><div>${s.why}</div></div><div class="detail-box fail"><strong>실패하기 쉬운 부분</strong><div>${s.fail}</div><strong>바로 해결</strong><div>${s.fix}</div></div><div class="detail-box cue"><strong>완료 판단 기준</strong><div>${s.cue}</div></div>`:''}</div>`).join('')}</section>
 ${begin?`<section class="card"><h3>최종 완성 체크</h3>${r.finalChecks.map(x=>`<label class="check-item"><input type="checkbox"><span>${x}</span></label>`).join('')}</section>
 <section class="card"><h3>문제가 생겼을 때</h3>${r.troubleshooting.map(x=>`<div class="recipe-step"><strong>${x[0]}</strong><p>${x[1]}</p></div>`).join('')}</section>
 <section class="card"><h3>보관과 재가열</h3><div class="mini-row"><span>냉장</span><strong>${r.storage.fridge}</strong></div><div class="mini-row"><span>냉동</span><strong>${r.storage.freezer}</strong></div><div class="mini-row"><span>재가열</span><strong>${r.storage.reheat}</strong></div><h3 style="margin-top:18px">남은 음식 활용</h3><div class="tool-grid">${r.reuse.map(x=>`<span class="tool">${x}</span>`).join('')}</div></section>`:''}
 <button class="primary" style="width:100%" onclick="startCooking('${modalKey}')">이 레시피로 조리 시작</button></div></div>`;
}
function exceptionModal(){return `<div class="modal"><div class="panel"><div class="modal-head"><div><h2>오늘은 안 먹어요</h2><div class="muted">계획이 바뀌는 것도 정상이에요.</div></div><button class="close" onclick="closeModal()">×</button></div><div class="exception-grid">${[['dining_out','외식'],['delivery','배달'],['convenience','간편식'],['lunchbox','도시락'],['skipped','건너뛰기']].map(x=>`<button class="ghost" onclick="markException('${x[0]}')">${x[1]}</button>`).join('')}</div></div></div>`}
function cookingModal(){
 const s=state.session,r=recipes[s.recipeId],x=r.steps[s.index],rem=remaining();
 return `<div class="modal"><div class="panel full"><div class="cook-wrap"><div class="modal-head"><div><div class="meal-type">${r.name}</div><h2>${s.index+1} / ${r.steps.length}단계</h2></div><button class="close" onclick="pauseClose()">×</button></div><div class="progress"><span style="width:${(s.index+1)/r.steps.length*100}%"></span></div>
 <div class="cook-card"><h2 class="cook-title">${x.title}</h2><p class="cook-action">${x.action}</p><div class="info-grid"><div class="info-box"><strong>불 세기</strong><div>${x.heat}</div></div><div class="info-box"><strong>예상 시간</strong><div>${x.minutes}분</div></div></div>
 <div class="detail-box why"><strong>왜 이렇게 하나요?</strong><div>${x.why}</div></div><div class="detail-box fail"><strong>실패하면</strong><div>${x.fail}</div><strong>바로 해결</strong><div>${x.fix}</div></div><div class="detail-box cue"><strong>다음 단계 판단</strong><div>${x.cue}</div></div>
 ${rem===null?`<button class="secondary" style="width:100%;margin-top:14px" onclick="startTimer(${x.minutes})">${x.minutes}분 타이머 시작</button>`:`<div class="timer-box"><div class="muted small">${s.timer.label}</div><div class="timer-time">${timeText(rem)}</div><button class="secondary" onclick="addTime(60)">+1분</button></div>`}</div>
 <div class="cook-buttons"><button class="ghost" onclick="prev()" ${s.index===0?'disabled':''}>이전 단계</button>${s.index===r.steps.length-1?`<button class="primary" onclick="openFinish()">조리 완료 확인</button>`:`<button class="primary" onclick="next()">다음 단계</button>`}</div></div></div></div>`;
}
function finishModal(){
 const s=state.session,r=recipes[s.recipeId];
 return `<div class="modal"><div class="panel"><div class="modal-head"><h2>정말 조리가 끝났나요?</h2><button class="close" onclick="modal='cooking';render()">×</button></div><section class="card"><h3>${r.name}</h3><p class="muted">완료하면 아래 재료가 재고에서 차감되고 장보기가 다시 계산됩니다.</p>${r.ingredients.filter(i=>i.track).slice(0,6).map(i=>`<div class="ingredient"><span>${i.name}</span><strong>${qty(i.q,r)}${i.unit}</strong></div>`).join('')}</section><button class="primary" style="width:100%;margin-bottom:9px" onclick="finishNow()">조리 완료 및 재고 반영</button><button class="ghost" style="width:100%" onclick="modal='cooking';render()">계속 조리하기</button></div></div>`;
}
function settingsModal(){
 return `<div class="modal"><div class="panel"><div class="modal-head"><h2>조리 인원</h2><button class="close" onclick="closeModal()">×</button></div><section class="card"><h3>일반 조리</h3><div class="tool-grid">${[1,2,3,4,5,6].map(n=>`<button class="${!state.largeBatch&&state.servings===n?'primary':'ghost'}" onclick="chooseServings(${n},false)">${n}인분</button>`).join('')}</div></section><section class="card"><h3>대용량 조리</h3><p class="muted">7인분 이상은 팬 크기와 조리 횟수가 달라질 수 있어 별도로 표시해요.</p><div class="form-row"><label>인원</label><input type="number" min="7" max="30" value="${state.largeBatch?state.servings:8}" id="largeCount"></div><button class="secondary" style="width:100%" onclick="chooseLarge()">대용량으로 적용</button></section></div></div>`;
}
function render(){
 recalc();
 let v=state.tab==='today'?today():state.tab==='shopping'?shopping():state.tab==='inventory'?inventory():state.tab==='plan'?plan():more();
 document.getElementById('app').innerHTML=`<main class="shell">${v}</main>${nav()}${modal==='recipe'?recipeModal():modal==='exception'?exceptionModal():modal==='cooking'?cookingModal():modal==='finish'?finishModal():modal==='settings'?settingsModal():''}`;
}
window.setTab=t=>{state.tab=t;save();render()}
window.openRecipe=k=>{modalKey=k;modal='recipe';render()}
window.openException=k=>{modalKey=k;modal='exception';render()}
window.openSettings=()=>{modal='settings';render()}
window.closeModal=()=>{modal=null;render()}
window.setRecipeMode=m=>{recipeMode=m;render()}
window.startCooking=startCooking
window.markException=s=>exception(modalKey,s)
window.next=()=>{const r=recipes[state.session.recipeId];if(state.session.index<r.steps.length-1)state.session.index++;state.session.timer=null;save();render()}
window.prev=()=>{if(state.session.index>0)state.session.index--;state.session.timer=null;save();render()}
window.startTimer=startTimer
window.addTime=sec=>{if(state.session?.timer){state.session.timer.endsAt+=sec*1000;save();render()}}
window.pauseClose=()=>{modal=null;save();render();toast('조리 진행 위치를 저장했어요.')}
window.openFinish=()=>{modal='finish';render()}
window.finishNow=()=>complete(state.session.key)
window.checkItem=(id,v)=>{state.shopping[id].checked=v;save()}
window.adjust=(id,v)=>{state.shopping[id].planned=Number(v)||0;state.shopping[id].userAdjusted=true;save()}
window.purchase=purchase
window.editInv=(id,v)=>{state.inventory[id].q=Number(v)||0;recalc();save();render()}
window.chooseServings=(n,large)=>{state.servings=n;state.largeBatch=large;modal=null;recalc();save();render()}
window.chooseLarge=()=>{const n=Math.max(7,Number(document.getElementById('largeCount').value)||7);state.servings=n;state.largeBatch=true;modal=null;recalc();save();render()}
window.backup=()=>{const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='homeos-ws06a-backup.json';a.click();URL.revokeObjectURL(a.href)}
window.restore=f=>{if(!f)return;const rd=new FileReader();rd.onload=()=>{try{state=JSON.parse(rd.result);save();render();toast('백업을 복원했어요.')}catch{alert('올바른 백업 파일이 아니에요.')}};rd.readAsText(f)}
window.resetAll=()=>{if(confirm('데모 데이터를 초기화할까요?')){state=fresh();save();render()}}
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
recalc();render();
