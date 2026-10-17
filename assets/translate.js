/* Language chooser: pick your mother tongue; the page is auto-translated (Google Website Translator, loaded only when needed). */
(function(){
const KEY='jap-gra-n5-lang';
const LANGS=[['ko','한국어','Korean'],['en','English','English'],['ja','日本語','Japanese'],['zh-CN','简体中文','Chinese (Simplified)'],['zh-TW','繁體中文','Chinese (Traditional)'],['es','Español','Spanish'],['pt','Português','Portuguese'],['fr','Français','French'],['de','Deutsch','German'],['it','Italiano','Italian'],['ru','Русский','Russian'],['ar','العربية','Arabic'],['hi','हिन्दी','Hindi'],['bn','বাংলা','Bengali'],['id','Bahasa Indonesia','Indonesian'],['ms','Bahasa Melayu','Malay'],['th','ไทย','Thai'],['vi','Tiếng Việt','Vietnamese'],['tl','Filipino','Filipino'],['tr','Türkçe','Turkish'],['pl','Polski','Polish'],['nl','Nederlands','Dutch'],['uk','Українська','Ukrainian'],['fa','فارسی','Persian'],['he','עברית','Hebrew'],['sw','Kiswahili','Swahili'],['ur','اردو','Urdu'],['ta','தமிழ்','Tamil'],['te','తెలుగు','Telugu'],['mr','मराठी','Marathi'],['gu','ગુજરાતી','Gujarati'],['kn','ಕನ್ನಡ','Kannada'],['ml','മലയാളം','Malayalam'],['pa','ਪੰਜਾਬੀ','Punjabi'],['ne','नेपाली','Nepali'],['si','සිංහල','Sinhala'],['my','မြန်မာ','Burmese'],['km','ខ្មែរ','Khmer'],['lo','ລາວ','Lao'],['mn','Монгол','Mongolian'],['kk','Қазақша','Kazakh'],['uz','Oʻzbekcha','Uzbek'],['ky','Кыргызча','Kyrgyz'],['tg','Тоҷикӣ','Tajik'],['az','Azərbaycanca','Azerbaijani'],['ka','ქართული','Georgian'],['hy','Հայերեն','Armenian'],['ro','Română','Romanian'],['hu','Magyar','Hungarian'],['cs','Čeština','Czech'],['sk','Slovenčina','Slovak'],['bg','Български','Bulgarian'],['sr','Српски','Serbian'],['hr','Hrvatski','Croatian'],['sl','Slovenščina','Slovenian'],['el','Ελληνικά','Greek'],['sv','Svenska','Swedish'],['no','Norsk','Norwegian'],['da','Dansk','Danish'],['fi','Suomi','Finnish'],['et','Eesti','Estonian'],['lv','Latviešu','Latvian'],['lt','Lietuvių','Lithuanian'],['is','Íslenska','Icelandic'],['ca','Català','Catalan'],['af','Afrikaans','Afrikaans'],['am','አማርኛ','Amharic'],['ha','Hausa','Hausa'],['yo','Yorùbá','Yoruba'],['ig','Igbo','Igbo'],['zu','isiZulu','Zulu'],['so','Soomaali','Somali'],['ps','پښتو','Pashto'],['ku','Kurdî','Kurdish'],['mg','Malagasy','Malagasy'],['haw','ʻŌlelo Hawaiʻi','Hawaiian']];
const names=Object.fromEntries(LANGS.map(l=>[l[0],l[1]]));
const store={get(){try{return localStorage.getItem(KEY);}catch(e){return null;}},set(v){try{localStorage.setItem(KEY,v);}catch(e){}}};
function clearCookie(){
  const h=location.hostname, past='expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie='googtrans=;'+past+';path=/';
  document.cookie='googtrans=;'+past+';path=/;domain='+h;
  document.cookie='googtrans=;'+past+';path=/;domain=.'+h;
}
function setCookie(code){
  clearCookie();
  if(code==='ko') return;
  document.cookie='googtrans=/ko/'+code+';path=/';
}
function apply(code){ store.set(code); setCookie(code); location.reload(); }
let cur=store.get();
function guess(){
  const nav=(navigator.languages&&navigator.languages[0]||navigator.language||'en').toLowerCase();
  const exact=LANGS.find(l=>l[0].toLowerCase()===nav); if(exact) return exact[0];
  const base=nav.split('-')[0]; const b=LANGS.find(l=>l[0].toLowerCase()===base); return b?b[0]:'en';
}
// load Google translator only for non-Korean
function loadGoogle(code){
  if(!code||code==='ko') return;
  setCookie(code);
  const d=document.createElement('div'); d.id='google_translate_element'; d.style.display='none'; d.setAttribute('translate','no'); document.body.appendChild(d);
  window.googleTranslateElementInit=function(){
    try{ new google.translate.TranslateElement({pageLanguage:'ko',autoDisplay:false,includedLanguages:LANGS.map(l=>l[0]).filter(c=>c!=='ko').join(',')},'google_translate_element'); }catch(e){}
  };
  const s=document.createElement('script'); s.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; s.async=true;
  s.onerror=()=>{ const n=document.getElementById('langBtn'); if(n) n.title='번역 서버에 연결할 수 없어요 / Translation service unavailable'; };
  document.head.appendChild(s);
}
function modal(first){
  if(document.getElementById('langModal')) return;
  const m=document.createElement('div'); m.id='langModal'; m.className='langmodal notranslate'; m.setAttribute('translate','no'); m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true');
  const sug=guess();
  m.innerHTML=`<div class="lm-box"><div class="lm-head"><h2>🌐 Choose your language · 모국어 선택</h2>${first?'':'<button type="button" class="lm-x" aria-label="close">×</button>'}</div>
  <p class="lm-p">Select your mother tongue and this site will be translated automatically.<br>모국어를 선택하면 사이트 전체가 자동으로 번역됩니다. (일본어 예문은 그대로 유지돼요)</p>
  <input class="lm-find" type="search" placeholder="Search · 검색 (English, 한국어, Español …)" aria-label="search language" autocomplete="off">
  <div class="lm-grid" id="lmGrid"></div>
  <p class="lm-note">Auto-translation is provided by Google Translate and may contain errors. Japanese sentences stay in Japanese. · 자동 번역은 Google 번역을 이용하며 오역이 있을 수 있어요.</p></div>`;
  document.body.appendChild(m);
  const grid=m.querySelector('#lmGrid');
  function draw(q){
    q=(q||'').trim().toLowerCase();
    const list=LANGS.filter(l=>!q||l.join(' ').toLowerCase().includes(q));
    const top=sug&&!q?[LANGS.find(l=>l[0]===sug)]:[];
    grid.innerHTML=top.map(l=>btn(l,true)).join('')+list.filter(l=>!top.includes(l)).map(l=>btn(l,false)).join('');
  }
  const btn=(l,rec)=>`<button type="button" data-c="${l[0]}" class="${l[0]===(cur||'ko')?'on':''}${rec?' rec':''}"><b>${l[1]}</b><small>${l[2]}${rec?' · ✓ detected':''}</small></button>`;
  draw('');
  m.querySelector('.lm-find').addEventListener('input',e=>draw(e.target.value));
  grid.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; const c=b.dataset.c; if(c===(cur||'ko') && !first){ m.remove(); return; } apply(c); });
  const x=m.querySelector('.lm-x'); if(x) x.onclick=()=>m.remove();
  m.addEventListener('click',e=>{ if(e.target===m && !first) m.remove(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && !first) m.remove(); });
  setTimeout(()=>{const f=m.querySelector('.lm-find'); if(f&&!first) f.focus();},50);
}
function init(){
  const b=document.createElement('button'); b.id='langBtn'; b.type='button'; b.className='langbtn notranslate'; b.setAttribute('translate','no');
  b.innerHTML='🌐 <span>'+(names[cur||'ko']||'Language')+'</span>'; b.setAttribute('aria-label','Language / 언어');
  b.onclick=()=>modal(false); document.body.appendChild(b);
  if(!cur){ modal(true); }
  else loadGoogle(cur);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
