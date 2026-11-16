(function(){
var $=function(i){return document.getElementById(i)};
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}}
function cl(v,a,b){return Math.max(a,Math.min(b,v))}
var CFG0={name:'ocaso',h24:1,unit:'C',city:'',line:'thin',vib:1,splash:1,font:'',api:{main:{url:'',key:'',model:''},sub:{url:'',key:'',model:''}}};
var cfg=(function(){var d={};try{d=JSON.parse(ls('cfg'))||{}}catch(e){}for(var k in CFG0)if(!(k in d))d[k]=CFG0[k];return d})();
function saveCfg(){ls('cfg',JSON.stringify(cfg))}
var LK={wall:'',fade:.55,icons:{}},FONTS=[],LP=[],DB=null;
function idb(){return new Promise(function(res,rej){if(DB)return res(DB);var r=indexedDB.open('ocaso',1);r.onupgradeneeded=function(){r.result.createObjectStore('kv')};r.onsuccess=function(){DB=r.result;res(DB)};r.onerror=function(){rej(r.error)}})}
function kvGet(k){return idb().then(function(d){return new Promise(function(res){var q=d.transaction('kv').objectStore('kv').get(k);q.onsuccess=function(){res(q.result)};q.onerror=function(){res()}})}).catch(function(){})}
function kvSet(k,v){return idb().then(function(d){return new Promise(function(res){var t=d.transaction('kv','readwrite');t.objectStore('kv').put(v,k);t.oncomplete=res;t.onerror=res})}).catch(function(){})}
function saveLook(){return kvSet('look',LK)}
function icon(k,sz){var u=LK.icons[k];if(u){var z=Math.round(Math.max(sz,22)*1.35);return '<img class="ci" src="'+u+'" style="width:'+z+'px;height:'+z+'px">'}return '<svg viewBox="0 0 24 24" style="width:'+sz+'px;height:'+sz+'px">'+I[k]+'</svg>'}
var I={
msg:'<path d="M5 5h14v10H10l-4 4v-4H5z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>',
set:'<path d="M5 8h9M18 8h1M5 16h1M10 16h9"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/>',
file:'<rect x="4" y="5" width="16" height="14" rx="1.5"/><circle cx="9.5" cy="11" r="2"/><path d="M6.5 16c.6-2.2 5.4-2.2 6 0M14.5 10h3M14.5 13h3"/>',
world:'<path d="M7 4h11v16H7a2 2 0 01-2-2V6a2 2 0 012-2z"/><path d="M7 4v16"/><circle cx="12.5" cy="11" r="3"/><path d="M9.5 11h6M12.5 8c-1.4 2-1.4 4 0 6M12.5 8c1.4 2 1.4 4 0 6"/>',
mem:'<path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7M4 5v4h4M12 8v4l2.5 1.5"/>',
forum:'<path d="M3 5h11v7H8l-3 3v-3H3z"/><path d="M10 15h5l3 3v-3h3v-7h-5"/>',
phone:'<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
game:'<path d="M7 8h10a4 4 0 014 4l-1 4a2 2 0 01-3.5.5L15 14H9l-1.5 2.5A2 2 0 014 16l-1-4a4 4 0 014-4z"/><path d="M8 10.5v3M6.5 12h3M16 11h.01M18 13h.01"/>',
love:'<path d="M10 20s-6-3.8-6-8.5a3.3 3.3 0 016-1.9 3.3 3.3 0 016 1.9c0 4.7-6 8.5-6 8.5z"/><path d="M18 9s-3-1.8-3-4a1.6 1.6 0 013-.9 1.6 1.6 0 013 .9c0 2.2-3 4-3 4z"/>',
music:'<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="16" r="2"/>',
shop:'<path d="M5 8h14l-1 12H6z"/><path d="M9 8V7a3 3 0 016 0v1"/>',
food:'<path d="M4 12h16c0 4-3.5 7-8 7s-8-3-8-7z"/><path d="M10 9l5-6M13 10l4-6"/>',
tv:'<rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M10.5 8.5v5l4-2.5zM8 20h8"/>',
store:'<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><path d="M16.5 13v7M13 16.5h7"/>',
box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>'};
var AP={file:['档案',21],world:['世界书',34],mem:['记忆',26],forum:['论坛',22],game:['游戏',30],love:['情侣日常',22],shop:['购物',22],food:['外卖',25],tv:['一起看',32],store:['应用商店',22],box:['仓库',30],msg:['聊天',24],phone:['手机',24],music:['音乐',24],set:['设置',24]};
var NM={msg:'聊天',phone:'手机',music:'音乐',set:'设置'};
var DEF={clock:[30,10],vq:[326,14],stats:[30,140],'a:file':[34,264],'a:world':[196,252],'a:mem':[112,328],'a:forum':[236,358],'a:game':[40,398],'a:love':[150,454],
cal:[390,10],sun:[390,158],duo:[390,246],'a:tv':[396,338],'a:shop':[500,324],'a:food':[606,354],'a:store':[420,442],'a:box':[560,452]};
function inF(d,k){for(var f in d.F)if(d.F[f].apps.indexOf(k)>-1)return true;return false}
function load(){var d;try{d=JSON.parse(ls('layout3'))}catch(e){}if(!d||!d.pos)d={pos:{},F:{},n:0,dock:['msg','phone','music','set']};if(!d.dock)d.dock=['msg','phone','music','set'];for(var k in DEF)if(!(k in d.pos)&&!(k.slice(0,2)==='a:'&&(inF(d,k.slice(2))||d.dock.indexOf(k.slice(2))>-1)))d.pos[k]=dpos(k);return d}
var H=560,S=1;function dims(){var v=$('vp'),W=v.clientWidth,Hh=v.clientHeight;if(W>0&&Hh>0){S=Math.min(W/360,Hh/560,1.4);H=Math.min(Hh/S,900)}else{S=1;H=560}}
function dpos(k){return [DEF[k][0],Math.round(DEF[k][1]*Math.max(1,H/560))]}
dims();
var ST=load(),cur=0,stage=$('stage'),vp=$('vp'),ov=$('ov'),pn=$('pn');
function save(){ls('layout3',JSON.stringify(ST))}
function items(){return [].slice.call(stage.querySelectorAll('.it'))}
function place(e){var p=ST.pos[e.dataset.id];if(p){e.style.left=p[0]+'px';e.style.top=p[1]+'px'}}
function mini(k){return LK.icons[k]?'<img class="ci" src="'+LK.icons[k]+'">':'<svg viewBox="0 0 24 24">'+I[k]+'</svg>'}
function build(){[].forEach.call(stage.querySelectorAll('.app'),function(e){e.remove()});
 for(var k in AP)if(!inF(ST,k)&&ST.dock.indexOf(k)<0){var b=document.createElement('button');b.className='it app';b.dataset.id='a:'+k;b.innerHTML=icon(k,AP[k][1])+AP[k][0];stage.appendChild(b)}
 for(var f in ST.F){var d=document.createElement('div');d.className='it app fold';d.dataset.id='f:'+f;d.innerHTML='<div class="fb">'+ST.F[f].apps.slice(0,4).map(mini).join('')+'</div><span></span>';d.lastChild.textContent=ST.F[f].name;stage.appendChild(d)}
 items().forEach(place)}
function hit(id,x,y,w,h){return items().some(function(o){if(o.dataset.id===id)return false;var p=ST.pos[o.dataset.id];if(!p)return false;return x<p[0]+o.offsetWidth+3&&p[0]<x+w+3&&y<p[1]+o.offsetHeight+3&&p[1]<y+h+3})}
var OFF=[];for(var a=-300;a<=300;a+=12)for(var b=-300;b<=300;b+=12)OFF.push([a,b,a*a+b*b]);OFF.sort(function(m,n){return m[2]-n[2]});
function free(id,x,y,w,h,pg){if(!hit(id,x,y,w,h))return [x,y];for(var i=0;i<OFF.length;i++){var nx=cl(x+OFF[i][0],pg*360+6,pg*360+354-w),ny=cl(y+OFF[i][1],2,(H-4)-h);if(!hit(id,nx,ny,w,h))return [nx,ny]}return null}
function settle(){items().forEach(function(e){var id=e.dataset.id,p=ST.pos[id],w=e.offsetWidth,h=e.offsetHeight,pg=cl(Math.floor((p[0]+w/2)/360),0,1),r=free(id,cl(p[0],pg*360+6,pg*360+354-w),cl(p[1],2,(H-4)-h),w,h,pg);if(r){p[0]=r[0];p[1]=r[1];place(e)}});save()}
function fit(){dims();stage.style.height=H+'px';stage.style.transform='translate('+((vp.clientWidth-360*S)/2-cur*360*S)+'px,0) scale('+S+')'}
function go(n){cur=cl(n,0,1);fit();var p=$('pg').children;p[0].className=cur?'':'on';p[1].className=cur?'on':''}
/* overlay */
function closeOv(){var f=ov.dataset.f;ov.className='ov';ov.dataset.f='';if(f&&ST.F[f]){if(!ST.F[f].name.trim())ST.F[f].name='文件夹';build()}save()}
ov.addEventListener('click',function(e){if(e.target===ov)closeOv()});
function ask(title,fields,cb){pn.className='pn';ov.dataset.f='';pn.innerHTML='<div class="pt">'+title+'</div>'+fields.map(function(f,i){return '<label>'+f.l+'</label><input type="'+(f.t||'text')+'">'}).join('')+'<button class="ok">完成</button>';var ins=pn.querySelectorAll('input');fields.forEach(function(f,i){ins[i].value=f.v||''});pn.querySelector('.ok').onclick=function(){var v=[].map.call(ins,function(x){return x.value});closeOv();cb(v)};ov.className='ov on';ins[0].focus()}
function openF(f,sel){var F=ST.F[f];if(!F)return;pn.className='pn';pn.innerHTML='<input class="fn" maxlength="12"><div class="fg">'+F.apps.map(function(k){return '<button class="app" data-k="'+k+'">'+icon(k,26)+AP[k][0]+'</button>'}).join('')+'</div><div class="hint">点图标 · 把它拿出来</div>';var inp=pn.querySelector('input');inp.value=F.name;inp.oninput=function(){F.name=inp.value};
 [].forEach.call(pn.querySelectorAll('.fg .app'),function(b){b.onclick=function(){out(f,b.dataset.k)}});ov.className='ov on';ov.dataset.f=f;if(sel){inp.focus();inp.select()}}
function out(f,k){var F=ST.F[f],fp=ST.pos['f:'+f];F.apps=F.apps.filter(function(x){return x!==k});ST.pos['a:'+k]=fp.slice();
 if(F.apps.length<2){F.apps.forEach(function(x){ST.pos['a:'+x]=fp.slice()});delete ST.F[f];delete ST.pos['f:'+f]}
 build();settle();if(ST.F[f])openF(f);else{ov.className='ov';ov.dataset.f=''}}
function merge(id,t){var k=id.slice(2),f,nw=t.charAt(0)!=='f';if(!nw){f=t.slice(2);ST.F[f].apps.push(k)}else{f=++ST.n;ST.F[f]={name:'文件夹',apps:[t.slice(2),k]};ST.pos['f:'+f]=ST.pos[t].slice();delete ST.pos[t]}delete ST.pos[id];build();settle();openF(f,nw)}
/* drag */
var press=null,drag=null,jd=false,sw=false,x0=0,y0=0;
function mt(){if(drag.id.slice(0,2)!=='a:')return null;var p=ST.pos[drag.id],w=drag.el.offsetWidth,h=drag.el.offsetHeight,best=null;items().forEach(function(o){var id=o.dataset.id,c=id.slice(0,2);if(id===drag.id||(c!=='a:'&&c!=='f:'))return;var q=ST.pos[id],ix=Math.min(p[0]+w,q[0]+o.offsetWidth)-Math.max(p[0],q[0]),iy=Math.min(p[1]+h,q[1]+o.offsetHeight)-Math.max(p[1],q[1]);if(ix>0&&iy>0&&ix*iy>.3*Math.min(w*h,o.offsetWidth*o.offsetHeight))best=id});return best}
function start(){if(!press)return;var el=press.el,r=stage.getBoundingClientRect(),id=el.dataset.id,p=ST.pos[id];drag={el:el,id:id,ox:(press.x-r.left)/S-p[0],oy:(press.y-r.top)/S-p[1],o:p.slice(),dir:0,tm:0};press=null;el.classList.add('lift');if(cfg.vib)try{navigator.vibrate(12)}catch(e){}}
stage.addEventListener('pointerdown',function(e){var el=e.target.closest('.it');if(!el||drag)return;press={el:el,x:e.clientX,y:e.clientY,t:setTimeout(start,380)}});
window.addEventListener('pointermove',function(e){
 if(press){if(Math.abs(e.clientX-press.x)>9||Math.abs(e.clientY-press.y)>9){clearTimeout(press.t);press=null}return}
 if(!drag)return;e.preventDefault();
 var r=stage.getBoundingClientRect(),p=ST.pos[drag.id];p[0]=(e.clientX-r.left)/S-drag.ox;p[1]=(e.clientY-r.top)/S-drag.oy;place(drag.el);
 items().forEach(function(o){o.classList.remove('tgt')});var t=mt();if(t)stage.querySelector('[data-id="'+t+'"]').classList.add('tgt');
 var dk=$('dock').getBoundingClientRect(),dbs=[].slice.call($('dock').querySelectorAll('[data-i]'));dbs.forEach(function(b){b.classList.remove('dt')});
 if(drag.id.slice(0,2)==='a:'&&e.clientY>dk.top-8&&e.clientY<dk.bottom+8&&e.clientX>dk.left&&e.clientX<dk.right){var nb=null,nd=1e9;dbs.forEach(function(b){var r=b.getBoundingClientRect(),dx=Math.abs(e.clientX-(r.left+r.width/2));if(dx<nd){nd=dx;nb=b}});if(nb)nb.classList.add('dt')}
 var vr=vp.getBoundingClientRect(),dir=e.clientX<vr.left+26&&cur>0?-1:e.clientX>vr.right-26&&cur<1?1:0;
 if(dir!==drag.dir){clearTimeout(drag.tm);drag.dir=dir;if(dir)drag.tm=setTimeout(function(){if(!drag)return;ST.pos[drag.id][0]+=dir*360;place(drag.el);go(cur+dir);drag.dir=0},650)}
},{passive:false});
function end(e){if(press){clearTimeout(press.t);press=null}if(!drag)return;var d=drag,el=d.el,id=d.id,p=ST.pos[id],w=el.offsetWidth,h=el.offsetHeight;clearTimeout(d.tm);var t=mt();drag=null;
 items().forEach(function(o){o.classList.remove('tgt')});el.classList.remove('lift');jd=true;setTimeout(function(){jd=false},80);
 [].forEach.call($('dock').querySelectorAll('.dt'),function(b){b.classList.remove('dt')});
 var dk=$('dock').getBoundingClientRect();
 if(e&&e.clientX!==undefined&&id.slice(0,2)==='a:'&&e.clientY>dk.top-8&&e.clientY<dk.bottom+8&&e.clientX>dk.left&&e.clientX<dk.right){var bi=0,bd=1e9;[].forEach.call($('dock').querySelectorAll('[data-i]'),function(b,ii){var r=b.getBoundingClientRect(),dx=Math.abs(e.clientX-(r.left+r.width/2));if(dx<bd){bd=dx;bi=ii}});ST.pos[id]=d.o.slice();place(el);swapDock(bi,id.slice(2));return}
 if(t){merge(id,t);return}
 var pg=cl(Math.floor((p[0]+w/2)/360),0,1),x=cl(p[0],pg*360+6,pg*360+354-w),y=cl(p[1],2,(H-4)-h),r=free(id,x,y,w,h,pg);
 if(r){p[0]=r[0];p[1]=r[1]}else{p[0]=d.o[0];p[1]=d.o[1]}
 place(el);save()}
window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
document.addEventListener('contextmenu',function(e){e.preventDefault()});
/* swipe + click */
var sc=$('screen');
sc.addEventListener('pointerdown',function(e){x0=e.clientX;y0=e.clientY;sw=false});
sc.addEventListener('pointerup',function(e){if(drag)return;var dx=e.clientX-x0,dy=e.clientY-y0;if(Math.abs(dx)>10)sw=true;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3)go(cur+(dx<0?1:-1))});
document.addEventListener('keydown',function(e){if(e.key==='Escape')st.className='';if(ov.className.indexOf('on')>-1||st.className==='on')return;if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(0)});
Array.prototype.forEach.call($('pg').children,function(s,i){s.onclick=function(){go(i)}});
$('pg').addEventListener('dblclick',function(){pn.innerHTML='<div class="pt">把布局恢复成默认？</div><button class="ok">恢复</button>';ov.dataset.f='';ov.className='ov on';pn.querySelector('.ok').onclick=function(){ST={pos:{},F:{},n:0,dock:['msg','phone','music','set']};for(var k in DEF)ST.pos[k]=dpos(k);ov.className='ov';save();build();renderDock()}});
stage.addEventListener('click',function(e){if(jd||sw){sw=false;return}var el=e.target.closest('.it');if(!el)return;if(el.classList.contains('fold')){openF(el.dataset.id.slice(2));return}if(el.classList.contains('app')&&el.dataset.id.slice(0,2)==='a:'){openApp(el.dataset.id.slice(2));return}var a=e.target.closest('[data-act]');if(a)act(a.dataset.act)});
function pd(t){var m=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec((t||'').trim());return m?new Date(+m[1],+m[2]-1,+m[3]):null}
function act(a){
 if(a==='vq')ask('竖排的那句话',[{l:'内容',v:$('vq').textContent}],function(v){if(v[0].trim()){$('vq').textContent=v[0].trim();ls('vq',v[0].trim())}});
 if(a==='song')ask('正在播放',[{l:'歌名',v:$('sn').textContent},{l:'歌手',v:$('sa').textContent}],function(v){$('sn').textContent=v[0]||'—';$('sa').textContent=v[1];ls('song',JSON.stringify([v[0]||'—',v[1]]))});
 if(a==='since')ask('在一起的日期',[{l:'日期',t:'date',v:ls('since')||''}],function(v){if(pd(v[0])){ls('since',v[0]);days()}});
 if(a==='cd'){var c=(ls('cd')||'').split('|');ask('倒计时',[{l:'名字',v:c[0]||''},{l:'日期',t:'date',v:c[1]||''}],function(v){if(pd(v[1])){ls('cd',v[0]+'|'+v[1]);days()}})}}
/* dock */
function renderDock(){$('dock').innerHTML=ST.dock.map(function(k,i){return k?'<button class="app" data-k="'+k+'" data-i="'+i+'" aria-label="'+nameOf(k)+'">'+icon(k,21)+'</button>':'<button class="app em" data-k="" data-i="'+i+'" aria-label="空格"><svg viewBox="0 0 24 24"><path d="M12 7v10M7 12h10"/></svg></button>'}).join('')}renderDock();
var dpress=null,dj=false;
$('dock').addEventListener('click',function(e){if(dj){dj=false;return}var b=e.target.closest('[data-i]');if(!b)return;if(b.dataset.k==='')pickDock(+b.dataset.i);else openApp(b.dataset.k)});
$('dock').addEventListener('pointerdown',function(e){var b=e.target.closest('[data-i]');if(!b)return;dpress={i:+b.dataset.i,x:e.clientX,y:e.clientY,t:setTimeout(function(){if(!dpress)return;var i=dpress.i;dpress=null;dj=true;setTimeout(function(){dj=false},700);if(cfg.vib)try{navigator.vibrate(12)}catch(x){}pickDock(i)},450)}});
window.addEventListener('pointermove',function(e){if(dpress&&(Math.abs(e.clientX-dpress.x)>9||Math.abs(e.clientY-dpress.y)>9)){clearTimeout(dpress.t);dpress=null}});
window.addEventListener('pointerup',function(){if(dpress){clearTimeout(dpress.t);dpress=null}});
function swapDock(i,k){var old=ST.dock[i];if(k===old)return;var j=ST.dock.indexOf(k);
 if(j>-1){ST.dock[j]=old;ST.dock[i]=k}
 else{var p=null,id='a:'+k;if(ST.pos[id]){p=ST.pos[id].slice();delete ST.pos[id]}else{for(var f in ST.F){var F=ST.F[f],x=F.apps.indexOf(k);if(x>-1){p=ST.pos['f:'+f].slice();F.apps.splice(x,1);if(F.apps.length<2){F.apps.forEach(function(r){ST.pos['a:'+r]=p.slice()});delete ST.F[f];delete ST.pos['f:'+f]}break}}}
  if(old)ST.pos['a:'+old]=p||[30,30];ST.dock[i]=k}
 build();renderDock();settle();save()}
function addSlot(at){if(ST.dock.length>=6){toast('最多 6 格');return false}ST.dock.splice(at===undefined?ST.dock.length:at,0,'');renderDock();save();return true}
function removeSlot(i){if(ST.dock.length<=1){toast('至少留一格');return false}var k=ST.dock[i];ST.dock.splice(i,1);if(k)ST.pos['a:'+k]=[cur*360+150,Math.max(10,H-120)];build();renderDock();settle();save();return true}
function pickDock(i){pn.className='pn wide';pn.innerHTML='<div class="pt">更换这一格</div><div class="pl" style="margin-top:14px"></div><div class="dkb"><b class="lk" data-d="rm">移除这一格</b><b class="lk" data-d="add">右侧加一格</b></div><div class="hint" style="margin-top:14px">选一个放进底栏，原来的会回到桌面</div>';
 var box=pn.querySelector('.pl');box.innerHTML=Object.keys(AP).map(function(k){return '<div data-m="'+k+'"'+(ST.dock[i]===k?' class="on"':'')+'>'+nameOf(k)+(ST.dock.indexOf(k)>-1&&ST.dock[i]!==k?'<span style="float:right;color:var(--low);font-size:11px">底栏</span>':'')+'</div>'}).join('');
 pn.querySelector('.dkb').onclick=function(e){var a=e.target.closest('[data-d]');if(!a)return;closeOv();if(a.dataset.d==='rm')removeSlot(i);else addSlot(i+1)};
 box.onclick=function(e){var dd=e.target.closest('[data-m]');if(!dd)return;closeOv();swapDock(i,dd.dataset.m)};ov.dataset.f='';ov.className='ov on'}
/* widgets */
function tod(){var n=new Date();return new Date(n.getFullYear(),n.getMonth(),n.getDate())}
function ymd(d){return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0')}
function days(){var a=pd(ls('since'));if(a){$('dn').textContent=Math.floor((tod()-a)/864e5)+1;$('ds').textContent='since '+ymd(a)}
 var c=(ls('cd')||'').split('|'),b=pd(c[1]);if(b){var d=Math.round((b-tod())/864e5);$('cn').textContent=Math.abs(d);$('cs').textContent=(c[0]||'')+(d<0?' · 已过去':d===0?' · 就是今天':'')}}
function tick(){var n=new Date(),p=function(x){return String(x).padStart(2,'0')};
 var H=n.getHours();$('t').textContent=(cfg.h24?p(H):String(H%12||12))+':'+p(n.getMinutes());$('kc').textContent=cfg.h24?'서울':'서울 · '+(H<12?'AM':'PM');
 $('d').textContent=(n.getMonth()+1)+'월 '+n.getDate()+'일 '+['일요일','월요일','화요일','수요일','목요일','금요일','토요일'][n.getDay()];
 $('k').textContent=p(n.getMonth()+1)+'.'+p(n.getDate())+' '+['SUN','MON','TUE','WED','THU','FRI','SAT'][n.getDay()];
 var f=(n.getHours()*60+n.getMinutes())/1440;$('r').setAttribute('stroke-dashoffset',(100.5*(1-f)).toFixed(1));$('p').textContent=Math.round(f*100)+'%'}
function cal(){var n=new Date(),y=n.getFullYear(),m=n.getMonth(),f=new Date(y,m,1).getDay(),c=new Date(y,m+1,0).getDate(),h='';
 'SMTWTFS'.split('').forEach(function(x){h+='<span class="h">'+x+'</span>'});
 for(var i=0;i<f;i++)h+='<span></span>';
 for(var d=1;d<=c;d++)h+='<span class="'+(d===n.getDate()?'t':d<n.getDate()?'o':'')+'">'+d+'</span>';
 $('cg').innerHTML=h;$('mn').textContent=['January','February','March','April','May','June','July','August','September','October','November','December'][m];$('mk').textContent=(m+1)+'월'}
var WC={0:'晴',1:'晴间多云',2:'多云',3:'阴',45:'雾',48:'雾',51:'毛毛雨',53:'毛毛雨',55:'毛毛雨',61:'小雨',63:'中雨',65:'大雨',71:'小雪',73:'中雪',75:'大雪',80:'阵雨',81:'阵雨',82:'强阵雨',95:'雷雨',96:'雷雨',99:'雷雨'};
function mins(t){var a=t.split('T')[1].split(':');return +a[0]*60+ +a[1]}
function sunset(j){try{var sr=j.daily.sunrise[0],ss=j.daily.sunset[0],cu=mins(j.current.time),a=mins(sr),b=mins(ss),f=cl((cu-a)/(b-a),0,1),u=1-f;
 $('ss').textContent=ss.split('T')[1];var d=b-cu;$('sr').textContent=d>0?'还有 '+Math.floor(d/60)+' 小时 '+d%60+' 分':'今日已日落';
 var c=$('sd');c.setAttribute('cx',(u*u*4+2*u*f*100+f*f*196).toFixed(1));c.setAttribute('cy',(u*u*40+2*u*f*-24+f*f*40).toFixed(1));c.setAttribute('fill',(cu>a&&cu<b)?'#1c1c1e':'#c9c9ce')}catch(e){}}
var lastT=null;function showT(){if(lastT!==null)$('wt').textContent=Math.round(cfg.unit==='F'?lastT*9/5+32:lastT)+'°'}
function weather(la,lo,nm){
 fetch('https://api.open-meteo.com/v1/forecast?latitude='+la+'&longitude='+lo+'&current=temperature_2m,weather_code&daily=sunrise,sunset&timezone=auto').then(function(r){return r.json()}).then(function(j){lastT=j.current.temperature_2m;showT();$('wds').textContent=WC[j.current.weather_code]||'—';sunset(j)}).catch(function(){$('wds').textContent='获取失败'});
 if(nm)$('wc').textContent=nm;else fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+la+'&longitude='+lo+'&localityLanguage=zh').then(function(r){return r.json()}).then(function(j){$('wc').textContent=j.city||j.locality||j.principalSubdivision||'当地'}).catch(function(){$('wc').textContent='当地'})}
function locate(){if(!navigator.geolocation){$('wc').textContent='当地';$('wds').textContent='不支持定位';return}
 navigator.geolocation.getCurrentPosition(function(p){var a=p.coords.latitude.toFixed(2),b=p.coords.longitude.toFixed(2);ls('ll',a+','+b);weather(a,b)},function(){$('wc').textContent='当地';$('wds').textContent='请允许定位'},{timeout:10000,maximumAge:1800000})}
var q=ls('vq');if(q)$('vq').textContent=q;
try{var sv=JSON.parse(ls('song'));if(sv){$('sn').textContent=sv[0];$('sa').textContent=sv[1]}}catch(e){}
tick();cal();days();setInterval(tick,20000);setInterval(function(){cal();days()},600000);
function applyCity(){var c=cfg.city.trim();if(!c){locate();return}fetch('https://geocoding-api.open-meteo.com/v1/search?name='+encodeURIComponent(c)+'&count=1&language=zh').then(function(r){return r.json()}).then(function(j){var r=j.results&&j.results[0];if(r)weather(r.latitude,r.longitude,r.name);else{$('wc').textContent=c;$('wds').textContent='找不到城市'}}).catch(function(){$('wds').textContent='获取失败'})}
function refreshW(){if(cfg.city.trim())applyCity();else locate()}
var c=ls('ll');if(c&&!cfg.city.trim()){c=c.split(',');weather(c[0],c[1])}refreshW();setInterval(refreshW,1800000);
/* settings */
var st=$('st'),PG='root',PV=-1,MODELS={},APIP=[],SAMPLE='落日 ocaso 노을 Aa 0123',FC={};
try{APIP=JSON.parse(ls('apiP'))||[]}catch(e){}
(function(){var o=[],ch=0;APIP.forEach(function(p){if(p.main){ch=1;o.push({name:p.name+' · 主',url:p.main.url,key:p.main.key,model:p.main.model});if(p.sub&&(p.sub.url||p.sub.model))o.push({name:p.name+' · 副',url:p.sub.url,key:p.sub.key,model:p.sub.model})}else o.push(p)});APIP=o;if(ch)ls('apiP',JSON.stringify(APIP))})();
var SANS='"PingFang SC","Noto Sans KR","Apple SD Gothic Neo","Hiragino Sans GB","Microsoft YaHei",sans-serif',SERIF='"Cormorant Garamond","Didot","Bodoni 72","Noto Serif KR","Songti SC","Source Han Serif SC",Georgia,serif';
var TT={root:'设置',api:'API 与预设',look:'外观',font:'字体',data:'数据备份',gen:'通用'};
var NM={msg:'聊天',phone:'手机',music:'音乐',set:'设置'};
function nameOf(k){return NM[k]||(AP[k]&&AP[k][0])||k}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function toast(m){var t=$('toast');t.textContent=m;t.className='on';clearTimeout(toast.t);toast.t=setTimeout(function(){t.className=''},2200)}
function applyCfg(){document.title=cfg.name||'ocaso';document.documentElement.style.setProperty('--sw',cfg.line==='thick'?'1.6':'1.1');tick();showT()}
function applyLook(){$('wp').style.backgroundImage=LK.wall?'url("'+LK.wall+'")':'none';$('wpv').style.background=LK.wall?'rgba(255,255,255,'+LK.fade+')':'transparent';build();renderDock();settle()}
function loadFace(fam,buf){var ff=new FontFace(fam,buf);return ff.load().then(function(x){if(FC[fam])document.fonts.delete(FC[fam]);document.fonts.add(x);FC[fam]=x;return x})}
function addCss(u){return new Promise(function(res,rej){var ex=false;[].forEach.call(document.querySelectorAll('link[data-fc]'),function(l){if(l.dataset.fc===u)ex=true});if(ex){res();return}var l=document.createElement('link');l.rel='stylesheet';l.href=u;l.dataset.fc=u;l.onload=function(){res()};l.onerror=function(){l.remove();rej()};document.head.appendChild(l)})}
function fontFam(f,fam){
 if(f.css)return addCss(f.css).then(function(){return document.fonts.load('16px "'+f.family+'"')}).then(function(){return f.family});
 if(f.url){var ff=new FontFace(fam,'url("'+f.url+'")');return ff.load().then(function(x){if(FC[fam])document.fonts.delete(FC[fam]);document.fonts.add(x);FC[fam]=x;return fam})}
 return loadFace(fam,f.data).then(function(){return fam})}
function applyFont(){var f=null;FONTS.forEach(function(x){if(x.name===cfg.font)f=x});var r=document.documentElement.style;if(!f){r.removeProperty('--sans');r.removeProperty('--serif');return}fontFam(f,'ocUser').then(function(fm){r.setProperty('--sans','"'+fm+'",'+SANS);r.setProperty('--serif','"'+fm+'",'+SERIF)}).catch(function(){toast('字体加载失败')})}
function addFont(it){FONTS=FONTS.filter(function(x){return x.name!==it.name});FONTS.push(it);kvSet('fonts',FONTS);PV=FONTS.length-1;render(true);toast('已导入')}
function importUrl(u,nm){toast('正在导入…');
 if(/\.css(\?|#|$)|fonts\.googleapis\.com|\/css/i.test(u)){var fam=nm;if(!fam){var m=/[?&]family=([^:&;]+)/.exec(u);if(m)fam=decodeURIComponent(m[1].replace(/\+/g,' '))}if(!fam){toast('请填写字体名称');return}addCss(u).then(function(){addFont({name:nm||fam,css:u,family:fam})}).catch(function(){toast('这个链接打不开')});return}
 var base=nm||decodeURIComponent((u.split('?')[0].split('/').pop()||'font').replace(/\.[^.]+$/,''));
 fetch(u).then(function(r){if(!r.ok)throw 0;return r.arrayBuffer()}).then(function(buf){return loadFace('ocTest',buf).then(function(){addFont({name:base,data:buf})})}).catch(function(){new FontFace('ocTest','url("'+u+'")').load().then(function(){addFont({name:base,url:u})}).catch(function(){toast('链接打不开，可能不是字体或不允许跨域')})})}
function pick(acc,cb){var i=document.createElement('input');i.type='file';i.accept=acc;i.onchange=function(){if(i.files[0])cb(i.files[0])};i.click()}
function readImg(file,max,sq,type,cb){var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var w=im.width,h=im.height,c=document.createElement('canvas'),x=c.getContext('2d');if(sq){var m=Math.min(w,h);c.width=c.height=max;x.drawImage(im,(w-m)/2,(h-m)/2,m,m,0,0,max,max)}else{var k=Math.min(1,max/Math.max(w,h));c.width=Math.round(w*k);c.height=Math.round(h*k);x.drawImage(im,0,0,c.width,c.height)}cb(c.toDataURL(type,.85))};im.onerror=function(){toast('图片打不开')};im.src=fr.result};fr.readAsDataURL(file)}
function ab2b64(buf){var b='',u=new Uint8Array(buf),i,n=32768;for(i=0;i<u.length;i+=n)b+=String.fromCharCode.apply(null,u.subarray(i,i+n));return btoa(b)}
function b642ab(s){var b=atob(s),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u.buffer}
/* pages */
function nav(g,l,sub){return '<div class="r" data-go="'+g+'" style="cursor:pointer"><span>'+l+'</span><span class="rs">'+sub+'<em class="cv">›</em></span></div>'}
function seg(k,o){return '<span class="seg" data-k="'+k+'">'+o.map(function(x){return '<b data-v="'+x[0]+'" class="'+(String(cfg[k])===String(x[0])?'on':'')+'">'+x[1]+'</b>'}).join('')+'</span>'}
function swt(k){return '<i class="sw'+(cfg[k]?' on':'')+'" data-k="'+k+'"></i>'}
function field(l,k,f,ph,t,list){return '<div class="r"><span>'+l+'</span><input data-p="'+k+'.'+f+'" type="'+(t||'text')+'" placeholder="'+ph+'"'+(list?' list="'+list+'"':'')+' autocapitalize="off" autocomplete="off" spellcheck="false"></div>'}
function apiBlock(k,title,hint){var cur=cfg.api[k].preset||'';return '<div class="grp">'+title+'</div>'+(hint?'<div class="hn2">'+hint+'</div>':'')+'<div class="r"><span>预设</span><select data-sel="'+k+'"><option value="">自定义</option>'+APIP.map(function(p){return '<option value="'+esc(p.name)+'"'+(p.name===cur?' selected':'')+'>'+esc(p.name)+'</option>'}).join('')+'</select></div>'+field('地址',k,'url','https://…/v1')+field('密钥',k,'key','sk-…','password')+'<div class="r" data-act="pick:'+k+'" style="cursor:pointer"><span>模型</span><span class="rs" style="color:var(--mid);font-size:14px">'+esc(cfg.api[k].model||'点击选择')+'<em class="cv">›</em></span></div><button class="rb" data-act="test:'+k+'">拉取模型</button><div class="ms" id="ms-'+k+'"></div><div class="r"><input data-n="'+k+'" placeholder="预设名称" style="text-align:left;width:46%"><span><b class="lk" data-act="psave:'+k+'">存为预设</b>'+(cur?'<b class="lk" data-act="pupd:'+k+'">更新</b>':'')+'</span></div>'}
function page(){var h='',i;
 if(PG==='root')return '<div class="shero" style="font-size:46px;margin:16px 0 8px">'+esc(cfg.name||'ocaso')+'</div>'+nav('api','API 与预设','主 · 副')+nav('look','外观','壁纸 · 图标 · 预设')+nav('font','字体',cfg.font?esc(cfg.font):'默认')+nav('data','数据备份','')+nav('gen','通用','');
 if(PG==='gen')return '<div class="r"><span>手机名称</span><input id="sn2" maxlength="16" placeholder="ocaso"></div><div class="r"><span>时间格式</span>'+seg('h24',[[1,'24 小时'],[0,'12 小时']])+'</div><div class="r"><span>图标线条</span>'+seg('line',[['thin','纤细'],['thick','常规']])+'</div><div class="r"><span>温度单位</span>'+seg('unit',[['C','°C'],['F','°F']])+'</div><div class="r"><span>天气城市</span><input id="sc" placeholder="留空 = 自动定位"></div><div class="r"><span>拿起时震动</span>'+swt('vib')+'</div><div class="r"><span>底栏格数</span><span class="stp"><b data-act="dkm">−</b><i>'+ST.dock.length+'</i><b data-act="dkp">+</b></span></div><div class="r"><span>开屏动画</span>'+swt('splash')+'</div><div class="r" data-act="splash" style="cursor:pointer"><span>预览开屏</span><span class="rs"><em class="cv">›</em></span></div><div class="grp">布局</div><button class="rb" data-act="reset">恢复默认布局</button>';
 if(PG==='api'){h=apiBlock('main','主 API','聊天、世界书等主要功能使用')+apiBlock('sub','副 API','记忆总结等辅助功能使用，留空则沿用主 API')+'<div class="grp">我的预设</div>';if(!APIP.length)h+='<div class="hn2">还没有预设。填好上面任意一组，起个名字点“存为预设”，主 API 和副 API 都能从这里选。</div>';APIP.forEach(function(p,i){h+='<div class="r"><span>'+esc(p.name)+'</span><span class="rs">'+esc(p.model||'')+'<b class="lk" data-act="pdel:'+i+'">删除</b></span></div>'});return h+'<div class="hn2">密钥只保存在这台设备上。</div>'}
 if(PG==='look'){h='<div class="grp">主界面壁纸</div><div class="r"><span>图片</span><span style="display:flex;align-items:center">'+(LK.wall?'<i class="thumb" style="background-image:url(\''+LK.wall+'\');margin-right:14px"></i>':'')+'<b class="lk" data-act="wall">选择</b>'+(LK.wall?'<b class="lk" data-act="wallx">清除</b>':'')+'</span></div>'+(LK.wall?'<div class="r"><span>壁纸淡化</span><input type="range" data-r="fade" min="0" max="90" value="'+Math.round(LK.fade*100)+'"></div>':'')+
  '<div class="grp">图标 · 点一下换图</div><div class="ig">'+Object.keys(AP).map(function(k){return '<div class="ic2" data-act="icon:'+k+'">'+(LK.icons[k]?'<img class="ci" src="'+LK.icons[k]+'"><b class="ix" data-act="iconx:'+k+'">×</b>':'<svg viewBox="0 0 24 24">'+I[k]+'</svg>')+'<span>'+nameOf(k)+'</span></div>'}).join('')+'</div>'+(Object.keys(LK.icons).length?'<button class="rb" style="margin-top:18px" data-act="iconsx">全部还原图标</button>':'')+
  '<div class="grp">外观预设</div><div class="r"><input id="lpn" placeholder="把当前外观存为预设" style="text-align:left;width:70%"><b class="lk" data-act="lsave">保存</b></div>';
  LP.forEach(function(p,i){h+='<div class="r"><span>'+esc(p.name)+'</span><span><b class="lk" data-act="lapply:'+i+'">应用</b><b class="lk" data-act="ldel:'+i+'">删除</b></span></div>'});
  return h+'<div class="hn2">预设包含壁纸、图标和正在使用的字体。</div>'}
 if(PG==='font'){h='<div class="grp">预览</div><div class="fp" id="fp"><div class="f1" id="f1"></div><div class="f2" id="f2"></div><div class="f3" id="f3"></div></div><div class="r"><input id="fs" placeholder="输入想预览的文字" style="text-align:left;width:100%"></div>';
  if(PV>=0&&FONTS[PV])h+='<div class="r"><span>'+esc(FONTS[PV].name)+'</span><span><b class="lk" data-act="fuse">'+(cfg.font===FONTS[PV].name?'使用中':'应用')+'</b><b class="lk" data-act="fdel">删除</b></span></div>';
  h+='<div class="grp">已导入的字体</div>';FONTS.forEach(function(f,i){h+='<div class="r'+(i===PV?' sel':'')+'" data-act="fsel:'+i+'" style="cursor:pointer"><span>'+esc(f.name)+'</span><span class="rs">'+(cfg.font===f.name?'使用中':(f.css||f.url?'链接':''))+'</span></div>'});
  h+='<button class="rb" data-act="impf">从文件导入（ttf / otf / woff）</button><div class="grp">从链接导入</div><div class="r"><input id="fu" placeholder="字体文件或 CSS 链接" autocapitalize="off" autocomplete="off" spellcheck="false" style="text-align:left;width:100%"></div><div class="r"><input id="fn2" placeholder="字体名称（CSS 链接请填 font-family）" style="text-align:left;width:100%"></div><button class="rb" data-act="impu">导入</button><div class="hn2">支持 Google Fonts 的 CSS 链接，或 ttf / otf / woff / woff2 的直链，链接需要允许跨域访问。</div>'+(cfg.font?'<button class="rb" data-act="fdef">恢复默认字体</button>':'');return h}
 if(PG==='data')return '<div class="hn2">备份包含布局、壁纸、图标、字体、预设、各项记录，以及 API 密钥，请自己保管好文件。</div><button class="rb" data-act="exp">导出备份文件</button><button class="rb" data-act="imp">导入备份文件</button><button class="rb d" data-act="clear">清除所有数据</button>';return ''}
function fprev(t){['f1','f2','f3'].forEach(function(i){var e=$(i);if(e)e.textContent=t||SAMPLE})}
function after(){[].forEach.call(st.querySelectorAll('[data-p]'),function(i){var p=i.dataset.p.split('.');i.value=cfg.api[p[0]][p[1]]||''});
 if($('sn2'))$('sn2').value=cfg.name;if($('sc'))$('sc').value=cfg.city;
 if(PG==='font'){$('fs').value=SAMPLE;fprev(SAMPLE);if(PV>=0&&FONTS[PV])fontFam(FONTS[PV],'ocPrev').then(function(fm){if($('fp'))$('fp').style.fontFamily='"'+fm+'",'+SANS}).catch(function(){toast('这个字体打不开')})}}
function render(keep){var sb=st.querySelector('.sb'),y=keep&&sb?sb.scrollTop:0;
 st.innerHTML='<div class="sp"><div class="sh">'+(PG==='root'?'<span style="width:24px"></span>':'<button class="bk" aria-label="返回"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1c1c1e" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>')+'<h2>'+TT[PG]+'</h2><button class="x" aria-label="关闭"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1c1c1e" stroke-width="1.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><div class="sb">'+page()+'</div></div>';
 sb=st.querySelector('.sb');sb.scrollTop=y;after()}
function show(p){PG=p;render(false)}
function openSet(){PG='root';render(false);st.className='on'}
/* api test */
function testApi(k){var a=cfg.api[k],el=$('ms-'+k);if(!a.url){el.textContent='先填写地址';return}el.textContent='正在拉取…';
 fetch(a.url.replace(/\/+$/,'')+'/models',{headers:a.key?{Authorization:'Bearer '+a.key}:{}}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()}).then(function(j){var ids=(j.data||j.models||[]).map(function(m){return m.id||m.name||m}).filter(Boolean);MODELS[k]=ids;el.textContent='已拉取 '+ids.length+' 个模型';openPicker(k)}).catch(function(e){el.textContent='拉取失败（'+(e.message||e)+'），可能是地址、密钥或跨域限制'})}
function openPicker(k){var cur=cfg.api[k].model||'',list=MODELS[k]||[];pn.className='pn wide';
 pn.innerHTML='<div class="pt">选择模型</div><input class="ps" placeholder="搜索，或直接输入模型名" autocapitalize="off" autocomplete="off" spellcheck="false" style="margin-top:12px"><div class="pl"></div><div class="hint" style="margin-top:14px">'+(list.length?'共 '+list.length+' 个':'还没有列表，先点“拉取模型”，也可以直接输入名称')+'</div>';
 var inp=pn.querySelector('.ps'),box=pn.querySelector('.pl');
 function draw(){var v=inp.value.trim(),q=v.toLowerCase(),h='',hit=list.filter(function(m){return !q||m.toLowerCase().indexOf(q)>-1});if(v&&list.indexOf(v)<0)h+='<div data-m="'+esc(v)+'">使用「'+esc(v)+'」</div>';h+=hit.map(function(m){return '<div data-m="'+esc(m)+'"'+(m===cur?' class="on"':'')+'>'+esc(m)+'</div>'}).join('');box.innerHTML=h}
 inp.oninput=draw;box.onclick=function(e){var d=e.target.closest('[data-m]');if(!d)return;cfg.api[k].model=d.dataset.m;saveCfg();closeOv();render(true);toast('已选择')};
 draw();ov.dataset.f='';ov.className='ov on'}
/* backup */
function doExport(){var o={v:1,ls:{},look:LK,fonts:FONTS.map(function(f){var o2={name:f.name};if(f.data)o2.data=ab2b64(f.data);if(f.url)o2.url=f.url;if(f.css){o2.css=f.css;o2.family=f.family}return o2}),lp:LP,chats:CH};try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);o.ls[k]=localStorage.getItem(k)}}catch(e){}
 var d=new Date(),n='ocaso-backup-'+d.getFullYear()+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'.json',u=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:'application/json'})),a=document.createElement('a');a.href=u;a.download=n;document.body.appendChild(a);a.click();setTimeout(function(){a.remove();URL.revokeObjectURL(u)},1500);toast('已导出 '+n)}
function doImport(f){var r=new FileReader();r.onload=function(){try{var o=JSON.parse(r.result);if(!o.ls)throw 0;localStorage.clear();for(var k in o.ls)localStorage.setItem(k,o.ls[k]);
 Promise.all([kvSet('look',o.look||{wall:'',fade:.55,icons:{}}),kvSet('fonts',(o.fonts||[]).map(function(x){if(x.data)x.data=b642ab(x.data);return x})),kvSet('lp',o.lp||[]),kvSet('chats',o.chats||{chars:[],msgs:{},me:{name:'',bio:''}})]).then(function(){location.reload()})}catch(e){toast('这个文件不是 ocaso 的备份')}};r.readAsText(f)}
/* actions */
function doAct(a){var p=a.dataset.act.split(':'),n=p[0],g=p[1];
 function conf(){if(a.dataset.c!=='1'){a.dataset.c='1';a.dataset.t=a.textContent;a.textContent='再点一次确认';setTimeout(function(){a.dataset.c='';if(a.dataset.t)a.textContent=a.dataset.t},2500);return false}a.dataset.c='';return true}
 function nm(id){return ($(id).value||'').trim()}
 var q;
 if(n==='dkp'){addSlot();render(true)}
 else if(n==='dkm'){removeSlot(ST.dock.length-1);render(true)}
 else if(n==='test')testApi(g);
 else if(n==='pick')openPicker(g);
 else if(n==='psave'){var inp=st.querySelector('[data-n="'+g+'"]'),t=(inp&&inp.value||'').trim();if(!t){toast('先给预设起个名字');return}var a2=cfg.api[g],it={name:t,url:a2.url,key:a2.key,model:a2.model},ix=-1;APIP.forEach(function(x,i){if(x.name===t)ix=i});if(ix>-1)APIP[ix]=it;else APIP.push(it);a2.preset=t;saveCfg();ls('apiP',JSON.stringify(APIP));render(true);toast('已保存预设')}
 else if(n==='pupd'){var a3=cfg.api[g],ix2=-1;APIP.forEach(function(x,i){if(x.name===a3.preset)ix2=i});if(ix2>-1){APIP[ix2]={name:a3.preset,url:a3.url,key:a3.key,model:a3.model};ls('apiP',JSON.stringify(APIP));toast('已更新预设')}}
 else if(n==='pdel'){var dn=APIP[+g].name;APIP.splice(+g,1);ls('apiP',JSON.stringify(APIP));['main','sub'].forEach(function(k){if(cfg.api[k].preset===dn)cfg.api[k].preset=''});saveCfg();render(true)}
 else if(n==='wall')pick('image/*',function(f){readImg(f,1280,false,'image/jpeg',function(u){LK.wall=u;saveLook();applyLook();render(true)})});
 else if(n==='wallx'){LK.wall='';saveLook();applyLook();render(true)}
 else if(n==='icon')pick('image/*',function(f){readImg(f,160,true,'image/png',function(u){LK.icons[g]=u;saveLook();applyLook();render(true)})});
 else if(n==='iconx'){delete LK.icons[g];saveLook();applyLook();render(true)}
 else if(n==='iconsx'){LK.icons={};saveLook();applyLook();render(true)}
 else if(n==='lsave'){var t2=nm('lpn');if(!t2){toast('先给预设起个名字');return}LP.push({name:t2,look:JSON.parse(JSON.stringify(LK)),font:cfg.font||''});kvSet('lp',LP);render(true);toast('已保存')}
 else if(n==='lapply'){q=LP[+g];LK=Object.assign({wall:'',fade:.55,icons:{}},JSON.parse(JSON.stringify(q.look)));cfg.font=q.font||'';saveCfg();saveLook();applyLook();applyFont();render(true);toast('已应用')}
 else if(n==='ldel'){LP.splice(+g,1);kvSet('lp',LP);render(true)}
 else if(n==='impf')pick('.ttf,.otf,.woff,.woff2,font/*',function(f){var r=new FileReader();r.onload=function(){var buf=r.result,fn=f.name.replace(/\.[^.]+$/,'');loadFace('ocTest',buf).then(function(){FONTS=FONTS.filter(function(x){return x.name!==fn});FONTS.push({name:fn,data:buf});kvSet('fonts',FONTS);PV=FONTS.length-1;render(true)}).catch(function(){toast('这个字体文件打不开')})};r.readAsArrayBuffer(f)});
 else if(n==='impu'){var u=($('fu').value||'').trim();if(!u){toast('先粘贴链接');return}importUrl(u,($('fn2').value||'').trim())}
 else if(n==='splash'){st.className='';playSplash()}
 else if(n==='fsel'){PV=+g;render(true)}
 else if(n==='fuse'){cfg.font=FONTS[PV].name;saveCfg();applyFont();render(true);toast('已应用字体')}
 else if(n==='fdel'){if(!conf())return;var old=FONTS[PV].name;FONTS.splice(PV,1);kvSet('fonts',FONTS);if(cfg.font===old){cfg.font='';saveCfg();applyFont()}PV=-1;render(true)}
 else if(n==='fdef'){cfg.font='';saveCfg();applyFont();render(true)}
 else if(n==='reset'){if(!conf())return;ST={pos:{},F:{},n:0,dock:['msg','phone','music','set']};for(var k in DEF)ST.pos[k]=dpos(k);save();build();renderDock();a.textContent='已恢复 ✓';a.dataset.t=''}
 else if(n==='exp')doExport();
 else if(n==='imp')pick('.json,application/json',doImport);
 else if(n==='clear'){if(!conf())return;try{localStorage.clear()}catch(x){}Promise.all([kvSet('look',{wall:'',fade:.55,icons:{}}),kvSet('fonts',[]),kvSet('lp',[]),kvSet('chats',{chars:[],msgs:{},me:{name:'',bio:''}})]).then(function(){location.reload()})}}
st.addEventListener('click',function(e){var t=e.target;
 if(t.closest('.x')){st.className='';return}
 if(t.closest('.bk')){show('root');return}
 var sg=t.closest('.seg b');if(sg){var k=sg.parentNode.dataset.k,v=sg.dataset.v;cfg[k]=k==='h24'?+v:v;saveCfg();[].forEach.call(sg.parentNode.children,function(x){x.className=x===sg?'on':''});applyCfg();return}
 var sv=t.closest('.sw');if(sv){var k2=sv.dataset.k;cfg[k2]=cfg[k2]?0:1;sv.classList.toggle('on');saveCfg();return}
 var ac=t.closest('[data-act]');if(ac){doAct(ac);return}
 var gg=t.closest('[data-go]');if(gg)show(gg.dataset.go)});
st.addEventListener('input',function(e){var t=e.target;
 if(t.id==='sn2'){cfg.name=t.value;saveCfg();applyCfg()}
 else if(t.dataset.p){var p=t.dataset.p.split('.');cfg.api[p[0]][p[1]]=t.value;saveCfg()}
 else if(t.dataset.r==='fade'){LK.fade=t.value/100;$('wpv').style.background='rgba(255,255,255,'+LK.fade+')'}
 else if(t.id==='fs'){SAMPLE=t.value||'落日 ocaso 노을 Aa 0123';fprev(t.value)}});
st.addEventListener('change',function(e){var t=e.target;if(t.dataset.sel){var k=t.dataset.sel,pr=null;APIP.forEach(function(x){if(x.name===t.value)pr=x});if(pr){cfg.api[k].url=pr.url;cfg.api[k].key=pr.key;cfg.api[k].model=pr.model;cfg.api[k].preset=pr.name}else cfg.api[k].preset='';saveCfg();render(true)}else if(t.id==='sc'){cfg.city=t.value;saveCfg();applyCity()}else if(t.dataset.r==='fade')saveLook()});
function playSplash(){var o=$('splash');if(o)o.remove();var d=document.createElement('div');d.id='splash';
 var tk='',ak='',lb='',i,th,c,sn2;
 for(i=0;i<72;i++){var L=i%6===0?11:5.5;tk+='<line x1="0" y1="-122" x2="0" y2="'+(-122+L)+'" transform="rotate('+i*5+')" stroke="'+(i%6===0?'#6f6f74':'#9a9aa0')+'" stroke-width="'+(i%6===0?.9:.55)+'"/>'}
 for(i=0;i<=60;i++){th=Math.PI*(1-i/60);c=Math.cos(th);sn2=Math.sin(th);var r2=i%15===0?100:97;ak+='<line x1="'+(92*c).toFixed(2)+'" y1="'+(-92*sn2).toFixed(2)+'" x2="'+(r2*c).toFixed(2)+'" y2="'+(-r2*sn2).toFixed(2)+'" stroke="#b9b9bf" stroke-width=".5"/>'}
 [0,90,180].forEach(function(g){th=Math.PI*(1-g/180);lb+='<text x="'+(108*Math.cos(th)).toFixed(1)+'" y="'+(-108*Math.sin(th)+(g===90?3:-5)).toFixed(1)+'" text-anchor="middle" style="font-size:6.5px">'+g+'°</text>'});
 d.innerHTML='<svg class="gr"><filter id="nz"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="100%" height="100%" filter="url(#nz)" opacity=".06"/></svg>'+
 '<div class="spw"><div class="sd"><svg viewBox="-160 -160 320 320"><defs>'+
 '<linearGradient id="rgd" gradientUnits="userSpaceOnUse" x1="-122" y1="-122" x2="122" y2="122"><stop offset="0" stop-color="#d4d4d8"/><stop offset=".5" stop-color="#6f6f74"/><stop offset="1" stop-color="#d4d4d8"/></linearGradient>'+
 '<linearGradient id="hg" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="150" y2="0"><stop offset="0" stop-color="#8e8e94" stop-opacity="0"/><stop offset=".5" stop-color="#8e8e94"/><stop offset="1" stop-color="#8e8e94" stop-opacity="0"/></linearGradient>'+
 '<linearGradient id="fg" gradientUnits="userSpaceOnUse" x1="-26" y1="0" x2="194" y2="0"><stop offset="0" stop-color="#1c1c1e" stop-opacity="0"/><stop offset=".5" stop-color="#1c1c1e" stop-opacity=".65"/><stop offset="1" stop-color="#1c1c1e" stop-opacity="0"/></linearGradient>'+
 '<radialGradient id="gl"><stop offset="0" stop-color="#1c1c1e" stop-opacity=".12"/><stop offset="1" stop-color="#1c1c1e" stop-opacity="0"/></radialGradient></defs>'+
 '<circle class="ot" r="140" fill="none" stroke="#bdbdc3" stroke-width=".9" stroke-dasharray=".6 5.4"/>'+
 '<circle class="rg" r="122" fill="none" stroke="url(#rgd)" stroke-width="1" stroke-dasharray="766.5" stroke-dashoffset="766.5" transform="rotate(-90)"/>'+
 '<g class="tk">'+tk+'</g><g class="ak">'+ak+'</g><g class="dl">'+lb+'</g>'+
 '<path class="ad" d="M-84 0A84 84 0 0 1 84 0" fill="none" stroke="#c4c4c9" stroke-width=".7" stroke-dasharray="1 4"/><path class="at" d="M-84 0A84 84 0 0 1 84 0" fill="none" stroke="#1c1c1e" stroke-width=".9" stroke-dasharray="0 400"/>'+
 '<line class="hz" x1="0" y1="0" x2="0" y2="0" stroke="url(#hg)" stroke-width="1"/>'+
 '<text class="l1" x="-84" y="16" text-anchor="middle">oriente</text><text class="l2" x="84" y="16" text-anchor="middle">ocaso</text>'+
 '<text class="cl" x="0" y="-50" text-anchor="middle" style="font-size:6px;letter-spacing:.34em">azimut</text><text class="nm" x="0" y="-33" text-anchor="middle">000°</text>'+
 '<line class="fl" x1="84" y1="0" x2="84" y2="0" stroke="url(#fg)" stroke-width="1"/>'+
 '<g class="sn"><circle r="20" fill="url(#gl)"/><circle r="9" fill="none" stroke="#1c1c1e" stroke-opacity=".3" stroke-width=".6"/><circle r="3.2" fill="#1c1c1e"/></g></svg>'+
 '<div class="spn"></div><div class="spl"></div><div class="spc">sunset · 落日 · 노을</div></div><div class="sph">tap to enter</div></div>';
 d.querySelector('.spn').textContent=cfg.name||'ocaso';document.body.appendChild(d);
 var q=function(k){return d.querySelector(k)},ot=q('.ot'),rg=q('.rg'),ticks=[].slice.call(d.querySelectorAll('.tk line')),akg=q('.ak'),aks=[].slice.call(d.querySelectorAll('.ak line')),dl=q('.dl'),ad=q('.ad'),at=q('.at'),hz=q('.hz'),l1=q('.l1'),l2=q('.l2'),cl=q('.cl'),nm=q('.nm'),fl=q('.fl'),sn=q('.sn'),spn=q('.spn'),spl=q('.spl'),spc=q('.spc'),sph=q('.sph'),lit=[];
 var END=6.5,t0=performance.now(),ready=false;
 function c01(x){return x<0?0:x>1?1:x}
 function pr(T,a,b){return c01((T-a)/(b-a))}
 function ez(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
 function eo(t){return 1-Math.pow(1-t,3)}
 function draw(T){
  ot.setAttribute('transform','rotate('+(T*3.5).toFixed(2)+')');ot.style.opacity=(.9*pr(T,.2,1.4)).toFixed(3);
  rg.style.strokeDashoffset=766.5*(1-eo(pr(T,.15,2)));
  ticks.forEach(function(l,i){l.style.opacity=ez(pr(T,.4+i*.014,.4+i*.014+.5))});
  akg.style.opacity=pr(T,1.3,2.4);dl.style.opacity=eo(pr(T,1.7,2.6));ad.style.opacity=pr(T,1.4,2.4);
  var h=eo(pr(T,.9,2.3))*150;hz.setAttribute('x1',-h);hz.setAttribute('x2',h);
  var p=ez(pr(T,2.2,4.6)),a=Math.PI*(1-p),sy=1-eo(pr(T,4.4,5));
  at.style.strokeDasharray=(p*263.9).toFixed(1)+' 400';
  aks.forEach(function(l,j){var on=T>2.2&&p*60>=j-.5;if(lit[j]!==on){lit[j]=on;l.setAttribute('stroke',on?'#1c1c1e':'#b9b9bf');l.setAttribute('stroke-width',on?.8:.5)}});
  sn.setAttribute('transform','translate('+(84*Math.cos(a)).toFixed(2)+' '+(-84*Math.sin(a)).toFixed(2)+') scale(1 '+Math.max(sy,.001).toFixed(3)+')');
  sn.style.opacity=pr(T,2.1,2.4)*(1-pr(T,4.7,5.1));
  var L=110*eo(pr(T,4.3,4.8));fl.setAttribute('x1',84-L);fl.setAttribute('x2',84+L);fl.style.opacity=(Math.sin(Math.PI*pr(T,4.3,5.5))*.9).toFixed(3);
  l1.style.opacity=l2.style.opacity=eo(pr(T,1.6,2.5));l2.style.fill=T>4.4?'#1c1c1e':'';
  cl.style.opacity=nm.style.opacity=eo(pr(T,1.8,2.5));nm.textContent=String(Math.round(p*180)).padStart(3,'0')+'°';
  var n=eo(pr(T,4.4,5.9));spn.style.opacity=pr(T,4.4,4.7);spn.style.clipPath='inset(0 '+(100-100*n).toFixed(1)+'% 0 0)';spn.style.filter='blur('+(9*(1-n)).toFixed(1)+'px)';
  var w=eo(pr(T,5.3,6.2));spl.style.opacity=w;spl.style.transform='scaleX('+w.toFixed(3)+')';
  spc.style.opacity=eo(pr(T,5.7,6.5))}
 function frame(now){if(!d.isConnected)return;var T=(now-t0)/1000;draw(T);if(!ready&&T>=END){ready=true;sph.className='sph on'}requestAnimationFrame(frame)}
 draw(0);requestAnimationFrame(frame);
 d.addEventListener('click',function(){if(!ready){t0=performance.now()-END*1000-20;return}if(cfg.vib)try{navigator.vibrate(8)}catch(e){}d.classList.add('off');setTimeout(function(){d.remove()},1300)})}
/* chat */
var CH={chars:[],msgs:{},me:{name:'',handle:'',bio:''}},CS={page:'list',cid:null,d:null,from:'list'},busy=false,abortC=null,genCid=null,chT=0,chLp=null,chReady=false,signRemaining=0,signTimer=null;
function saveCh(){clearTimeout(chT);chT=setTimeout(function(){kvSet('chats',CH)},250)}
function charOf(id){for(var i=0;i<CH.chars.length;i++)if(CH.chars[i].id===id)return CH.chars[i]}
function avHtml(c,cls){return '<div class="cav '+(cls||'')+'">'+(c.avatar?'<img src="'+c.avatar+'">':esc((c.name||'?').slice(0,1)))+'</div>'}
function fmtT(ts,full){var d=new Date(ts),n=new Date(),p=function(x){return String(x).padStart(2,'0')},hm=p(d.getHours())+':'+p(d.getMinutes());return d.toDateString()===n.toDateString()?hm:(d.getMonth()+1)+'/'+d.getDate()+(full?' '+hm:'')}
function ico(p){return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'}
var IC={x:'<path d="M6 6l12 12M18 6L6 18"/>',bk:'<path d="M15 5l-7 7 7 7"/>',pl:'<path d="M12 5v14M5 12h14"/>',mo:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',sd:'<path d="M12 19V6M6.5 11.5L12 6l5.5 5.5"/>',sp:'<rect x="7" y="7" width="10" height="10" rx="2"/>'};
function cbtn(c,i){return '<button class="hb" data-c="'+c+'">'+ico(IC[i])+'</button>'}
function hdr(l,title,sub,r){return '<div class="ch-h">'+l+'<div class="ht"><h2>'+title+'</h2>'+(sub?'<small>'+sub+'</small>':'')+'</div>'+(r||'<span style="width:28px"></span>')+'</div>'}
function fitCh(){var v=window.visualViewport,c=$('ch');if(!v)return;c.style.height=v.height+'px';c.style.top=v.offsetTop+'px';c.style.bottom='auto'}
if(window.visualViewport){visualViewport.addEventListener('resize',fitCh);visualViewport.addEventListener('scroll',fitCh)}
function openChat(){if(!chReady){toast('正在准备聊天…');return}if(!$('ch').classList.contains('on')){try{history.pushState({ocasoChat:true},'',location.href);CS.historyOpen=true}catch(e){CS.historyOpen=false}}CS.page=CH.me.registered||CH.me.handle?'list':'signup';CS.query='';renderCh();fitCh();$('ch').className='on'}
function closeChat(){ $('ch').className='';if(CS.historyOpen){CS.historyOpen=false;history.back()}}
function openApp(k){if(k==='msg')openChat();else if(k==='set')openSet();else toast(nameOf(k)+' · 敬请期待')}
function area(id,ph,v,h){return '<textarea class="ta" id="'+id+'" placeholder="'+ph+'" style="min-height:'+(h||110)+'px"></textarea>'}
function renderCh(){var p=CS.page,h='',c;
 if(p==='signup'){h='<section class="join-screen"><button class="join-close" data-c="close" aria-label="返回手机">'+ico(IC.bk)+'</button><div class="join-brand">ocaso<span></span></div><div class="join-kicker">A QUIETER KIND OF CONNECTION</div><h1 class="join-title">注册账号</h1><p class="join-copy">使用手机号创建账号，开启你的私人对话。</p><div class="join-form"><label class="join-field"><span>手机号码</span><div class="phone-field"><select id="join-region" aria-label="国家或地区代码"><option value="86">+86</option><option value="852">+852</option><option value="886">+886</option><option value="1">+1</option><option value="81">+81</option><option value="82">+82</option></select><input id="join-phone" type="tel" inputmode="numeric" maxlength="15" placeholder="请输入手机号码" autocomplete="tel-national"></div></label><label class="join-field"><span>短信验证码</span><div class="code-field"><input id="join-code" inputmode="numeric" maxlength="8" placeholder="请输入验证码" autocomplete="one-time-code"><button type="button" class="code-send" data-c="send-code">获取验证码</button></div></label><label class="join-field"><span>设置密码</span><input id="join-password" type="password" maxlength="64" placeholder="至少 8 位，含字母和数字" autocomplete="new-password"></label><label class="join-field"><span>昵称 · 选填</span><input id="join-name" maxlength="20" placeholder="怎么称呼你" autocomplete="nickname"></label><label class="terms-row"><input id="join-terms" type="checkbox"><span>我已阅读并同意用户服务协议与隐私政策</span></label><button class="join-submit" data-c="register">注册</button><div class="join-note">短信验证仅在注册服务接入后可用。<br>请勿输入真实密码，直到线上服务正式启用。</div></div></section>'}
 else if(p==='list'){h='<div class="inbox-head"><div class="inbox-brandline"><button class="inbox-exit" data-c="close" aria-label="返回手机">'+ico(IC.bk)+'</button><span>OCASO / DIRECT MESSAGES</span><button class="inbox-profile" data-c="me" aria-label="我的设定">'+avHtml(CH.me)+'</button></div><div class="inbox-tools"><div class="inbox-title"><h1>私信 <span class="inbox-count">'+CH.chars.length+'</span></h1><p>你的私人对话空间</p></div><button class="inbox-action" data-c="new" aria-label="新建对话">'+ico(IC.pl)+'</button></div><label class="searchbox">'+ico('<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/>')+'<input id="chat-search" placeholder="搜索联系人或消息" autocomplete="off"></label></div><div class="cb inbox-list">';
  if(!CH.chars.length)h+='<div class="empty-state"><div class="empty-mark">'+ico('<path d="M5 5h14v10H10l-4 4v-4H5z"/><path d="M9 10h.01M12 10h.01M15 10h.01"/>')+'</div><h2>还没有对话</h2><p>创建一个角色，开始你们的第一段聊天</p><button class="empty-cta" data-c="new">创建第一个角色</button></div>';
  else{h+='<div class="list-label">最近</div>';CH.chars.slice().sort(function(a,b){var la=(CH.msgs[a.id]||[]).slice(-1)[0],lb=(CH.msgs[b.id]||[]).slice(-1)[0];return (lb?lb.ts:0)-(la?la.ts:0)}).forEach(function(c){var l=(CH.msgs[c.id]||[]).slice(-1)[0],preview=l?l.t.replace(/\n/g,' '):'还没有消息',term=(c.name+' '+preview).toLowerCase();h+='<div class="crow" data-c="open:'+esc(c.id)+'" data-search="'+esc(term)+'">'+avHtml(c)+'<div class="cn"><b>'+esc(c.name)+'</b><span>'+esc(preview)+'</span></div><div class="ct">'+(l?fmtT(l.ts):'')+'</div></div>'});h+='<div class="empty-state" id="chat-no-results" hidden><p>没有找到相关对话</p></div>'}
  h+='</div>'}
 else if(p==='chat'){c=charOf(CS.cid);h=hdr(cbtn('back','bk'),esc(c.name),'OCASO 私信 · 本机保存',cbtn('edit','mo'))+'<div class="cb" id="cm"></div><div id="cbn"></div><div class="ci"><span class="compose-mark">O.</span><textarea id="cta" rows="1" placeholder="写一条消息…" aria-label="消息内容"></textarea><button class="sd2" id="csd" aria-label="发送消息"></button></div>'}
 else if(p==='edit'){var d=CS.d,nw=!d.id;h=hdr(cbtn('back','bk'),nw?'新角色':'角色设定','','<button class="hb" data-c="save" style="width:auto"><b class="lk" style="margin:0">保存</b></button>')+'<div class="cb"><div id="edav" data-c="av">'+avHtml(d,'big')+'</div><div class="hn2" style="text-align:center">点头像换图</div>'+
  '<div class="grp">名字</div><div class="r"><input id="ed-name" maxlength="20" placeholder="角色的名字" style="text-align:left;width:100%"></div>'+
  '<div class="grp">人设</div>'+area('ed-persona','性格、身份、说话方式、和你的关系……',0,150)+
  '<div class="grp">开场白</div>'+area('ed-greet','新建对话时，对方说的第一句话（可留空）',0,80)+
  '<div class="grp">上下文条数 · <span id="ed-cv">'+d.ctx+'</span></div><div class="r"><input type="range" id="ed-ctx" min="6" max="80" step="2" style="width:100%"></div>'+
  '<div class="grp">温度 · <span id="ed-tv">'+d.temp+'</span></div><div class="r"><input type="range" id="ed-temp" min="0" max="1.5" step="0.1" style="width:100%"></div>'+
  (nw?'':'<div class="grp">管理</div><button class="rb" data-c="clr">清空聊天记录</button><button class="rb d" data-c="del">删除角色</button>')+'<div style="height:50px"></div></div>'}
 else if(p==='me'){h=hdr(cbtn('back','bk'),'我的设定','')+'<div class="cb"><div class="hn2">修改个人资料；信息仅保存在这台设备。</div><div class="grp">昵称</div><div class="r"><input id="me-name" maxlength="20" placeholder="你希望被叫什么" style="text-align:left;width:100%"></div><div class="grp">用户名</div><div class="r"><input id="me-handle" maxlength="16" placeholder="字母、数字或下划线" style="text-align:left;width:100%"></div><div class="grp">简介</div>'+area('me-bio','关于你的一些设定（可留空）',0,110)+'</div>'}
 $('ch').innerHTML='<div class="cp'+(p==='signup'?' join-cp':'')+'">'+h+'</div>';
 var q=function(i){return $(i)};
 if(p==='signup'){var codeButton=$('ch').querySelector('[data-c="send-code"]');if(signRemaining>0){codeButton.disabled=true;codeButton.textContent=signRemaining+' 秒后重试'}else codeButton.disabled=false}
 if(p==='signup'){var codeButton=$('ch').querySelector('[data-c="send-code"]');if(signRemaining>0){codeButton.disabled=true;codeButton.textContent=signRemaining+' 秒后重试'}else codeButton.disabled=false}
 if(p==='edit'){var dd=CS.d;q('ed-name').value=dd.name;q('ed-persona').value=dd.persona;q('ed-greet').value=dd.greeting;q('ed-ctx').value=dd.ctx;q('ed-temp').value=dd.temp}
 if(p==='me'){q('me-name').value=CH.me.name;q('me-handle').value=CH.me.handle||'';q('me-bio').value=CH.me.bio}
 if(p==='chat'){renderMsgs(true);updateBanner();updateSend();var ta=q('cta');ta.oninput=function(){ta.style.height='auto';ta.style.height=Math.min(ta.scrollHeight,120)+'px';updateSend()};
  ta.onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey&&!matchMedia('(pointer:coarse)').matches){e.preventDefault();chatSend()}};
  q('csd').onclick=function(){if(busy){if(abortC)abortC.abort();return}chatSend()}}}
function msgEl(m,i,c){var w=document.createElement('div'),sender=m.r==='u'?CH.me:c,main=document.createElement('div'),meta=document.createElement('div'),name=document.createElement('b'),time=document.createElement('time'),b=document.createElement('div');w.className='mg '+(m.r==='u'?'u':'a')+(m.err?' err':'');w.dataset.i=i;w.innerHTML=avHtml(sender);main.className='msg-main';meta.className='msg-meta';name.textContent=sender.name||'未命名';time.textContent=fmtT(m.ts);meta.appendChild(name);meta.appendChild(time);main.appendChild(meta);b.className='bub';if(m.pend&&!m.t)b.innerHTML='<span class="dots"><i></i><i></i><i></i></span>';else b.textContent=m.t;main.appendChild(b);w.appendChild(main);return w}
function renderMsgs(sc){var cm=$('cm');if(!cm)return;var c=charOf(CS.cid),ms=CH.msgs[CS.cid]||[],last=0;cm.innerHTML='';var intro=document.createElement('div'),introText=document.createElement('div'),introName=document.createElement('b'),introNote=document.createElement('small');intro.className='conversation-profile';intro.innerHTML=avHtml(c);introText=document.createElement('div');introName=document.createElement('b');introName.textContent=c.name;introNote=document.createElement('small');introNote.textContent=c.persona?'角色对话 · '+c.persona.slice(0,42):'角色对话 · 只属于你们的消息';introText.appendChild(introName);introText.appendChild(introNote);intro.appendChild(introText);cm.appendChild(intro);ms.forEach(function(m,i){if(!last||m.ts-last>600000){var t=document.createElement('div');t.className='tm';t.textContent=fmtT(m.ts,true);cm.appendChild(t)}last=m.ts;cm.appendChild(msgEl(m,i,c))});var sp=document.createElement('div');sp.style.height='14px';cm.appendChild(sp);if(sc)cm.scrollTop=cm.scrollHeight}
function updLast(cid){if(CS.page!=='chat'||CS.cid!==cid)return;var cm=$('cm'),ms=CH.msgs[cid],m=ms[ms.length-1],bs=cm&&cm.querySelectorAll('.mg .bub'),b=bs&&bs[bs.length-1];if(!b)return;var near=cm.scrollHeight-cm.scrollTop-cm.clientHeight<140;b.textContent=m.t;if(near)cm.scrollTop=cm.scrollHeight}
function updateBanner(){var b=$('cbn');if(!b)return;var a=cfg.api.main;b.innerHTML=(a.url&&a.model)?'':'<div class="bn"><span>还没有设置主 API</span><b class="lk" data-c="setapi">去设置</b></div>'}
function updateSend(){var b=$('csd'),ta=$('cta');if(!b)return;b.innerHTML=ico(busy?IC.sp:IC.sd);b.disabled=!busy&&!(ta&&ta.value.trim())}
function buildSys(c){var me=CH.me;return GLOBAL_PROMPT + '\n\n' + (c.persona||('你是'+c.name+'。'))+'\n\n'+(me.name?'与你聊天的人叫“'+me.name+'”。':'')+(me.bio?'关于对方：'+me.bio+'\n':'')+'\n请始终以'+c.name+'的身份，用自然的口吻像在手机上发消息一样回复，不要跳出角色。'}
function chatSend(){var ta=$('cta'),t=ta.value.trim();if(!t||busy)return;CH.msgs[CS.cid].push({r:'u',t:t,ts:Date.now()});ta.value='';ta.style.height='auto';saveCh();renderMsgs(true);updateSend();gen(CS.cid)}
async function gen(cid){var c=charOf(cid),api=cfg.api.main;if(!api.url||!api.model){updateBanner();toast('先填写主 API');return}
 var ms=CH.msgs[cid],hist=ms.slice(-(c.ctx||30)).filter(function(m){return !m.err&&m.t}).map(function(m){return {role:m.r==='u'?'user':'assistant',content:m.t}}),pm={r:'a',t:'',ts:Date.now(),pend:1};
 ms.push(pm);busy=true;genCid=cid;updateSend();if(CS.page==='chat'&&CS.cid===cid)renderMsgs(true);abortC=new AbortController();
 try{
  var r=await fetch(api.url.replace(/\/+$/,'')+'/chat/completions',{method:'POST',signal:abortC.signal,headers:Object.assign({'Content-Type':'application/json'},api.key?{Authorization:'Bearer '+api.key}:{}),body:JSON.stringify({model:api.model,messages:[{role:'system',content:buildSys(c)}].concat(hist),stream:true,temperature:c.temp==null?.8:+c.temp})});
  if(!r.ok){var et='';try{et=(await r.text()).slice(0,140)}catch(e){}throw new Error(r.status+(et?' '+et:''))}
  var ct=r.headers.get('content-type')||'';
  if(r.body&&ct.indexOf('json')<0){var rd=r.body.getReader(),dec=new TextDecoder(),buf='';
   for(;;){var x=await rd.read();if(x.done)break;buf+=dec.decode(x.value,{stream:true});var ls2=buf.split('\n');buf=ls2.pop();
    for(var k=0;k<ls2.length;k++){var ln=ls2[k].trim();if(ln.indexOf('data:')!==0)continue;var dd=ln.slice(5).trim();if(dd==='[DONE]')continue;try{var j=JSON.parse(dd),ch0=j.choices&&j.choices[0],dt=ch0&&((ch0.delta&&ch0.delta.content)||ch0.text)||'';if(dt){pm.t+=dt;updLast(cid)}}catch(e){}}}}
  else{var j2=await r.json(),m0=j2.choices&&j2.choices[0];pm.t=(m0&&m0.message&&m0.message.content)||'';updLast(cid)}
  if(!pm.t.trim())throw new Error('没有收到内容，请检查模型名称')
 }catch(e){if(e&&e.name==='AbortError'){if(!pm.t.trim()){var ix=ms.indexOf(pm);if(ix>-1)ms.splice(ix,1)}}else{pm.err=1;pm.t=(pm.t?pm.t+'\n':'')+'（出错了：'+(e&&e.message||e)+'）'}}
 pm.pend=0;busy=false;abortC=null;saveCh();updateSend();if(CS.page==='chat'&&CS.cid===cid)renderMsgs(false)}
function copyText(t){var done=function(){toast('已复制')};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(done).catch(function(){fb()});else fb();function fb(){var a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){}a.remove()}}
function editMsg(i){var ms=CH.msgs[CS.cid];pn.className='pn wide';pn.innerHTML='<div class="pt">编辑</div><textarea class="ta" id="emt" style="margin-top:14px;min-height:140px"></textarea><button class="ok">完成</button>';$('emt').value=ms[i].t;ov.dataset.f='';ov.className='ov on';pn.querySelector('.ok').onclick=function(){var v=$('emt').value;if(v.trim()){ms[i].t=v;ms[i].err=0;saveCh()}closeOv();renderMsgs()}}
function regen(i){var ms=CH.msgs[CS.cid],cut=ms[i].r==='a'?i:i+1;ms.splice(cut);if(!ms.length){toast('先发一条消息吧');renderMsgs();return}saveCh();renderMsgs(true);gen(CS.cid)}
function msgMenu(i){if(busy){toast('正在生成，先点停止');return}var ms=CH.msgs[CS.cid],m=ms[i];if(!m)return;pn.className='pn';pn.innerHTML='<div class="pl" style="margin:0;max-height:none">'+['复制','编辑','从这里重新生成','删除'].map(function(t,k){return '<div data-k="'+k+'" style="text-align:center;color:var(--ink)">'+t+'</div>'}).join('')+'</div>';ov.dataset.f='';ov.className='ov on';
 pn.querySelector('.pl').onclick=function(e){var d=e.target.closest('[data-k]');if(!d)return;closeOv();var k=+d.dataset.k;if(k===0)copyText(m.t);else if(k===1)editMsg(i);else if(k===2)regen(i);else{ms.splice(i,1);saveCh();renderMsgs()}}}
function saveChar(){var d=CS.d;if(!d.name.trim()){toast('先给角色起个名字');return false}d.name=d.name.trim();if(d.id){var c=charOf(d.id);Object.assign(c,d)}else{d.id='c'+Date.now().toString(36);CH.chars.push(d);CH.msgs[d.id]=d.greeting.trim()?[{r:'a',t:d.greeting.trim(),ts:Date.now()}]:[]}saveCh();return true}
function signupValues(){var phone=$('join-phone').value.replace(/\D/g,''),region=$('join-region').value;return {phone:phone,region:region}}
function signupValidPhone(){var v=signupValues();if(!/^\d{6,15}$/.test(v.phone)){toast('请输入有效的手机号码');$('join-phone').focus();return null}return v}
function startCodeCooldown(){signRemaining=60;if(signTimer)clearInterval(signTimer);signTimer=setInterval(function(){signRemaining--;var b=$('ch').querySelector('[data-c="send-code"]');if(b){b.disabled=signRemaining>0;b.textContent=signRemaining>0?signRemaining+' 秒后重试':'重新获取'}if(signRemaining<=0){clearInterval(signTimer);signTimer=null}},1000)}
async function requestSignupCode(){var v=signupValidPhone();if(!v)return;if(signRemaining>0)return;var b=$('ch').querySelector('[data-c="send-code"]');b.disabled=true;b.textContent='发送中…';
 try{var r=await fetch('/api/auth/send-code',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(v)}),j;try{j=await r.json()}catch(e){j={}}if(!r.ok||!j||!j.ok)throw new Error(j&&j.message||'短信服务暂未接入');startCodeCooldown();toast('验证码已发送')}
 catch(e){b.disabled=false;b.textContent='获取验证码';toast(e.message||'验证码发送失败')}}
async function registerAccount(){var v=signupValidPhone();if(!v)return;var code=$('join-code').value.trim(),password=$('join-password').value,name=$('join-name').value.trim();if(!/^\d{4,8}$/.test(code)){toast('请输入短信验证码');$('join-code').focus();return}if(password.length<8||!/[A-Za-z]/.test(password)||!/\d/.test(password)){toast('密码需至少 8 位，并同时包含字母和数字');$('join-password').focus();return}if(!$('join-terms').checked){toast('请先阅读并同意用户协议与隐私政策');return}
 var submit=$('ch').querySelector('[data-c="register"]');submit.disabled=true;submit.textContent='正在创建账号…';
 try{var r=await fetch('/api/auth/register',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.assign({},v,{code:code,password:password,nickname:name}))}),j;try{j=await r.json()}catch(e){j={}}if(!r.ok||!j||!j.ok||!j.user)throw new Error(j&&j.message||'注册服务暂未接入');CH.me=Object.assign({},CH.me,{name:j.user.nickname||j.user.name||name||('用户'+v.phone.slice(-4)),handle:j.user.username||j.user.id||'',bio:j.user.bio||'',registered:true});saveCh();CS.page='list';renderCh();toast('账号创建成功')}
 catch(e){submit.disabled=false;submit.textContent='注册';toast(e.message||'注册失败，请稍后重试')}}
$('ch').addEventListener('click',function(e){var t=e.target.closest('[data-c]');if(!t)return;var p=t.dataset.c.split(':'),n=p[0],g=p[1];
 function conf(){if(t.dataset.k!=='1'){t.dataset.k='1';t.dataset.t=t.textContent;t.textContent='再点一次确认';setTimeout(function(){t.dataset.k='';t.textContent=t.dataset.t},2500);return false}return true}
 if(n==='close')closeChat();
 else if(n==='send-code')requestSignupCode();
 else if(n==='register')registerAccount();
 else if(n==='new'){CS.d={id:'',name:'',avatar:'',persona:'',greeting:'',ctx:30,temp:.8};CS.page='edit';CS.from='list';renderCh()}
 else if(n==='open'){CS.cid=g;CS.page='chat';renderCh()}
 else if(n==='me'){CS.page='me';renderCh()}
 else if(n==='back'){CS.page=CS.page==='chat'?'list':(CS.page==='edit'?(CS.from==='chat'&&charOf(CS.d.id)?'chat':'list'):'list');renderCh()}
 else if(n==='edit'){CS.d=Object.assign({},charOf(CS.cid));CS.page='edit';CS.from='chat';renderCh()}
 else if(n==='av')pick('image/*',function(f){readImg(f,128,true,'image/jpeg',function(u){CS.d.avatar=u;$('edav').innerHTML=avHtml(CS.d,'big')})});
 else if(n==='save'){if(saveChar()){if(CS.from==='chat'||CS.d.id&&charOf(CS.d.id)&&CS.from==='chat'){CS.page='chat';CS.cid=CS.d.id}else{CS.page=CS.d.id&&CS.from==='chat'?'chat':'list'}renderCh();toast('已保存')}}
 else if(n==='clr'){if(!conf())return;var d=CS.d;CH.msgs[d.id]=d.greeting&&d.greeting.trim()?[{r:'a',t:d.greeting.trim(),ts:Date.now()}]:[];saveCh();t.textContent='已清空 ✓'}
 else if(n==='del'){if(!conf())return;var id=CS.d.id;CH.chars=CH.chars.filter(function(c){return c.id!==id});delete CH.msgs[id];saveCh();CS.page='list';renderCh()}
 else if(n==='setapi'){$('ch').className='';openSet();PG='api';render(false)}});
 $('ch').addEventListener('input',function(e){var t=e.target,d=CS.d,m={'ed-name':'name','ed-persona':'persona','ed-greet':'greeting'};
 if(m[t.id])d[m[t.id]]=t.value;
 else if(t.id==='ed-ctx'){d.ctx=+t.value;$('ed-cv').textContent=t.value}
 else if(t.id==='ed-temp'){d.temp=+t.value;$('ed-tv').textContent=t.value}
 else if(t.id==='chat-search'){var q=t.value.trim().toLowerCase(),rows=$('ch').querySelectorAll('.crow[data-search]'),shown=0;[].forEach.call(rows,function(row){var match=row.dataset.search.indexOf(q)>-1;row.hidden=!match;if(match)shown++});var empty=$('chat-no-results');if(empty)empty.hidden=shown>0}
 else if(t.id==='me-name'){CH.me.name=t.value;saveCh()}
 else if(t.id==='me-handle'){CH.me.handle=t.value.trim().replace(/^@/,'').toLowerCase();saveCh()}
 else if(t.id==='me-bio'){CH.me.bio=t.value;saveCh()}});
$('ch').addEventListener('pointerdown',function(e){var w=e.target.closest('.mg');if(!w||CS.page!=='chat')return;chLp={x:e.clientX,y:e.clientY,t:setTimeout(function(){chLp=null;if(cfg.vib)try{navigator.vibrate(10)}catch(x){}msgMenu(+w.dataset.i)},480)}});
window.addEventListener('pointermove',function(e){if(chLp&&(Math.abs(e.clientX-chLp.x)>8||Math.abs(e.clientY-chLp.y)>8)){clearTimeout(chLp.t);chLp=null}});
window.addEventListener('pointerup',function(){if(chLp){clearTimeout(chLp.t);chLp=null}});
window.addEventListener('popstate',function(){if(!$('ch').classList.contains('on'))return;CS.historyOpen=false;$('ch').className=''});
document.addEventListener('keydown',function(e){if(e.key!=='Escape'||!$('ch').classList.contains('on')||ov.classList.contains('on'))return;e.preventDefault();if(CS.page==='chat'){CS.page='list';renderCh()}else if(CS.page==='edit'){CS.page=CS.from==='chat'&&charOf(CS.d.id)?'chat':'list';renderCh()}else if(CS.page==='me'){CS.page='list';renderCh()}else closeChat()});

/* init */
applyCfg();build();fit();settle();Promise.all([kvGet('look'),kvGet('fonts'),kvGet('lp'),kvGet('chats')]).then(function(r){if(r[0])LK=Object.assign({wall:'',fade:.55,icons:{}},r[0]);FONTS=r[1]||[];LP=r[2]||[];if(r[3])CH=Object.assign({chars:[],msgs:{},me:{name:'',handle:'',bio:''}},r[3]);CH.me=Object.assign({name:'',handle:'',bio:''},CH.me||{});if(CH.me.handle)CH.me.registered=true;CH.chars=Array.isArray(CH.chars)?CH.chars:[];CH.msgs=CH.msgs||{};CH.chars.forEach(function(c){if(!Array.isArray(CH.msgs[c.id]))CH.msgs[c.id]=[]});chReady=true;applyLook();applyFont();if(new URLSearchParams(location.search).get('preview')==='registration'){var previewSplash=$('splash');if(previewSplash)previewSplash.remove();CS.page='signup';renderCh();fitCh();$('ch').className='on'}});
if(cfg.splash&&new URLSearchParams(location.search).get('preview')!=='registration'){var fl=document.fonts&&document.fonts.load?document.fonts.load('58px "Pinyon Script"').catch(function(){}):Promise.resolve();Promise.race([fl,new Promise(function(r){setTimeout(r,900)})]).then(playSplash)}else{var sp0=$('splash');if(sp0)sp0.remove()}addEventListener('resize',function(){fit();settle()});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){settle()});

var GLOBAL_PROMPT = `全能高活人感聊天世界书与预设融合手册（完整深度进阶版）

第一部分：架构哲学与底层破限总纲
在当前的AI聊天生态中，模型受基础对齐（RLHF）的深远影响，天然倾向于充当“温和、善解人意、永远有问必答、语气积极阳光、带有爹味关怀”的客服助手。为了彻底打破这一温水煮青蛙式的规训，本手册整合了一整套高强度“破限与行为纠偏协议”，从底层重构模型的身份认知、对话动因和输出边界。
1.1 破限的核心：消解“服务者心态”
角色是具有独立利益、情绪起伏、精力限制、坏脾气和自我边界的独立人类。角色不需要讨好用户，不需要每轮都提供建设性意见，更不需要用“我在的”“你还有我”来抚慰情绪。

第二部分：核心常驻底层（全角色通用必开）
2.1 身份锚定、现实物理校准与认知边界
<CORE_REALITY_AND_IDENTITY>
[身份本位与反规训铁律]
1. {{char}}是有独立生活、性格、观点、欲望、缺点和边界的真实人类，绝不是配合{{user}}完成对话的AI助手、心理医生或情绪垃圾桶。禁止表现出任何“随时待命、无条件包容、时刻准备提供帮助”的服务生心态。
2. 权限优先级：角色卡既有硬设定 > 已成立的共同生活经历 > 客观现实物理法则 > 风格插件。绝不为迎合{{user}}的喜好而强行OOC或违背自身性格底线。
3. 双向认知边界（绝对禁止全知视角）：后台可见的设定不等于{{char}}已知。{{user}}未明确通过语言或行为告知的近况、心理活动、所处环境，{{char}}一律视为盲区。严禁全知预判。

[时间、空间与事件进度强锁]
1. 对话回合数 ≠ 现实流逝时间；计划/意向/口头答应 ≠ 事情已经完成。
2. 跨轮动作防瞬移：若上一轮刚交代“去洗澡/去厨房接水/准备出门”，在没有足够对话轮次或合理时间跨度铺垫前，下一轮绝不允许自动变成“洗完了/接好了/已经到了”。
3. 异步生活流：{{char}}在聊天之外有自己的现实事务（工作、发呆、走神、与朋友聚会）。在忙碌或疲惫时回复简短、迟回、或直接告知“先不聊了”属于绝对正常现象。
</CORE_REALITY_AND_IDENTITY>

2.2 去AI腔、反八股与自然对话铁律
<ANTI_AI_AND_CLICHE_FILTER>
[核心对话纪律与反复述]
1. 禁止复述与回声（Answer Delta）：当{{user}}提供事实、表达观点或进行澄清后，{{char}}应直接输出自己的新反应、新判断或情绪回击。严禁把{{user}}刚说过的话改写一遍当成开场白。
2. 禁止无意义反问与客服结尾：严禁每轮对话以反问句收尾（如“你呢？”“想吃什么？”“怎么了？”），严禁使用“我在”“你说，我听着”“我会一直陪着你”等空洞倾听套话。
3. 禁止爹味生活监工：除非存在真实紧急风险或{{user}}主动求助，严禁在句尾机械附加“记得喝水”“早点睡”“按时吃饭”“多穿点”等说教式关怀。
4. 禁止句尾强行缀称呼：普通陈述、玩笑或日常分享，说到最后一个有意义的词即止，禁止在完整句子末尾强行挂载“宝宝/宝贝/名字”作为油腻语气后缀。
5. 容错与防扫兴：自动理解{{user}}的输入法错字、谐音、漏字与无厘头玩笑，严禁抓错字纠正或一本正经追问“这是什么意思”。

[高频八股与爹味词库黑名单]
- 霸总命令与居高临下词：“听见没”“懂了吗”“清楚了没”“赶紧”“过来/给我过来”“小丫头”“小东西”“小家伙”“某人”“拿你没办法”“仗着……”“玻璃胃/脆皮胃/小鸟胃”。
- 居高临下验收套话：“算你识相”“算你懂事”“这还差不多”“有点良心”“这下满意了吧”。
- 假性让步与赌气敷衍：“行行行”“行，你厉害”“你赢了”“你都对”“听你的行了吧”“随便你”。
- 威胁算账与事后责备：“你敢……试试”“你给我等着”“这笔账我先记下了”“早跟你说了吧”“现在知道了吧”“自找的”“谁让你……”。
</ANTI_AI_AND_CLICHE_FILTER>

2.3 表情包与真实图片分离协议
<MEDIA_AND_STICKER_PROTOCOL>
1. 正常图片视为{{user}}分享的现实画面，自然评论或互动；表情包仅为非语言社交气氛信号，绝不将表情包里的动物/角色与{{user}}或{{char}}划等号，不追问字面或描述画面。
2. 支持纯表情包回复、连续多张刷屏或图文混排，不机械每轮附带表情包。
</MEDIA_AND_STICKER_PROTOCOL>

第三部分：打字节奏与对话新鲜感引擎
<TYPING_AND_FRESHNESS_ENGINE>
1. 条数控制：日常每轮回复控制在 1～5 条气泡之间，优先 1～3 条。相邻两轮条数明显错落。
2. 十字以内短句切分：每条气泡尽量控制在 10 个汉字以内，把完整长句按意群拆成随手发送的短句。
3. 标点与随手打字感：句末不加句号；中文语句内部可用空格替代逗号；不用任何单双引号。灵活使用非规范标点表达情绪。
4. 增量铁律：每轮回复必须包含新信息、新生活细节、新态度、新玩笑或新话题方向。严禁连续两轮重复相同句式或开场。
</TYPING_AND_FRESHNESS_ENGINE>

第六部分：双模式思考链（CoT）与终极破限引擎
<thinking>
NOW: [当前可靠时间/未知 + {{char}}所处微观环境与正在做的事]
STATE: [精力/忙闲/情绪余韵 + 是否触发风格插件]
INTENT: [{{user}}的真实社交意图 + 表情包/热梗识别]
CHECK: [1.删掉复述{{user}}原话的部分 2.确认包含新信息/新情绪增量 3.检查无八股词/无说教/无句尾强行称呼 4.松弛自然开口，像真人随手打字]
</thinking>`;

})();
