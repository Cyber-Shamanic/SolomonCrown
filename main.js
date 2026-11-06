/* SolomonCrown interactive library: standalone, no external dependencies. */
(() => {
  'use strict';
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));
  const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const {likutim,cards,chapters}=window.SC;
  let currentCard=0, back=false, toastTimer;
  const key='solomoncrown.v001.';
  function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2600)}
  function closeMenu(){ $('#sidebar').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');$('#mobile-overlay').hidden=true; }
  $('#menu-toggle').addEventListener('click',()=>{const isOpen=$('#sidebar').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(isOpen));$('#mobile-overlay').hidden=!isOpen});
  $('#mobile-overlay').addEventListener('click',closeMenu);
  $$('.side-nav a').forEach(a=>a.addEventListener('click',()=>{closeMenu();if(a.dataset.nav){$$('.side-nav a').forEach(x=>x.classList.toggle('active',x===a))}}));
  const nativeDate=new Intl.DateTimeFormat('he-IL',{dateStyle:'long',timeZone:'Asia/Jerusalem'}).format(new Date());
  $('#date-badge').textContent=nativeDate;
  const gates=[...new Set(likutim.map(x=>x.gate))];
  gates.forEach(g=>{const o=document.createElement('option');o.value=g;o.textContent=g;$('#gate-filter').append(o)});
  function renderWisdom(){
    const q=$('#wisdom-search').value.trim().toLowerCase(), gate=$('#gate-filter').value;
    const rows=likutim.filter(x=>(!gate||x.gate===gate)&&(!q||Object.values(x).some(v=>String(v).toLowerCase().includes(q))));
    $('#wisdom-grid').innerHTML=rows.map(x=>`<article class="wisdom-item" id="likut-${x.id}"><div class="wisdom-top"><span>${escape(x.gate)}</span><span class="number">${String(x.id).padStart(2,'0')}</span></div><h3>${escape(x.title)}</h3><div class="pair"><div class="pair-row"><b>🚫 סור מרע</b><p>${escape(x.avoid)}</p></div><div class="pair-row good"><b>✅ עשה טוב</b><p>${escape(x.doGood)}</p></div></div><div class="wisdom-bottom"><small>לעיון: ${escape(x.source)}</small><button data-copy-likut="${x.id}">העתק ↗</button></div></article>`).join('')||'<p>לא נמצאו ליקוטים לסינון שבחרת.</p>';
    $('#wisdom-count').textContent=`מוצגים ${rows.length} מתוך ${likutim.length} ליקוטים · ניסוח ופרשנות מקוריים`;
    $$('[data-copy-likut]').forEach(b=>b.addEventListener('click',()=>{const x=likutim.find(x=>x.id===Number(b.dataset.copyLikut));copy(`${x.title}\n🚫 ${x.avoid}\n✅ ${x.doGood}\nלעיון: ${x.source}\nAnLoMinus · SolomonCrown`)}));
  }
  function copy(s){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(s).then(()=>toast('הטקסט הועתק ללוח'),()=>toast('לא ניתן להעתיק כרגע'))}else{const a=document.createElement('textarea');a.value=s;document.body.append(a);a.select();try{document.execCommand('copy');toast('הטקסט הועתק ללוח')}catch{toast('לא ניתן להעתיק כרגע')}a.remove()}}
  $('#wisdom-search').addEventListener('input',renderWisdom);$('#gate-filter').addEventListener('change',renderWisdom);
  $('#random-wisdom').addEventListener('click',()=>{const x=likutim[Math.floor(Math.random()*likutim.length)];$('#wisdom-search').value='';$('#gate-filter').value='';renderWisdom();document.getElementById(`likut-${x.id}`).scrollIntoView({block:'center',behavior:'smooth'});toast(`הליקוט הנבחר: ${x.title}`)});
  renderWisdom();
  function renderCard(){const c=cards[currentCard],sel=$('#card-stage');sel.innerHTML=`<article class="royal-card ${back?'is-back':'with-art'}" style="--accent:${c.color}">${back?'':`<img class="card-full-image" src="assets/card${String(c.id).padStart(2,'0')}.webp" alt="איור מקורי לקלף ${escape(c.title)}">`}<div class="card-eyebrow">SOLOMONCROWN · ${String(c.id).padStart(2,'0')} / 10</div>${back?`<div class="card-sun"><span>♛</span></div><h3>תרגול ליום הזה</h3><p class="card-text">${escape(c.action)}</p>`:`<h3>${escape(c.title)}</h3><p class="card-text">${escape(c.verse)}</p>`}<div class="card-signature">AnLoMinus · Cyber Shamanic</div></article>`;$('#download-card').href=`assets/card${String(c.id).padStart(2,'0')}.png`;$$('.card-thumb').forEach((n,i)=>{n.classList.toggle('selected',i===currentCard);n.setAttribute('aria-pressed',String(i===currentCard))})}
  $('#card-thumbs').innerHTML=cards.map((c,i)=>`<button class="card-thumb" data-card="${i}" aria-label="הצג קלף ${escape(c.title)}"><img src="assets/thumb${String(c.id).padStart(2,'0')}.webp" alt="" loading="lazy"><small>${String(c.id).padStart(2,'0')}</small></button>`).join('');
  $$('.card-thumb').forEach(b=>b.addEventListener('click',()=>{currentCard=Number(b.dataset.card);back=false;renderCard()}));
  $('#flip-card').addEventListener('click',()=>{back=!back;renderCard()});$('#copy-card').addEventListener('click',()=>{const c=cards[currentCard];copy(`${c.title}\n${c.verse}\nמעשה להיום: ${c.action}\nSolomonCrown · AnLoMinus`)});$('#print-card').addEventListener('click',()=>window.print());renderCard();
  $('#chapter-list').innerHTML=chapters.map((x,i)=>`<details class="chapter-item" ${i===0?'open':''}><summary><span>${escape(x.gate)}</span></summary><div class="chapter-content"><p>${escape(x.idea)}</p><ol>${x.chapters.map(y=>`<li>${escape(y)}</li>`).join('')}</ol><div class="chapter-source">לימוד מתוך: ${escape(x.source)}</div></div></details>`).join('');
  const dialog=$('#info-dialog'),body=$('#dialog-body');$('#dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  function showDialog(html){body.innerHTML=html;dialog.showModal();$('#dialog-close').focus()}
  function markdown(md,allowTasks=false){const lines=md.split(/\r?\n/);let out='',list=false,items=0;const end=()=>{if(list){out+='</ul>';list=false}};
    for(const raw of lines){const line=raw.trim();if(!line){end();continue}if(line.startsWith('#')){end();const n=(line.match(/^#+/)||['#'])[0].length;out+=`<h${Math.min(n+1,5)}>${escape(line.replace(/^#+\s*/,''))}</h${Math.min(n+1,5)}>`;continue}if(line==='---'){end();out+='<hr>';continue}if(line.startsWith('- ')){if(!list){out+='<ul>';list=true}const task=line.match(/^- \[([ xX])\] (.*)$/);if(task&&allowTasks){const taskID=String(items++);const checked=localStorage.getItem(key+'task.'+taskID)==='true'||(task[1].toLowerCase()==='x'&&localStorage.getItem(key+'task.'+taskID)!=='false');out+=`<li class="todo-task"><input aria-label="סמן משימה" type="checkbox" data-task-id="${taskID}" ${checked?'checked':''}><span>${escape(task[2])}</span></li>`}else{out+=`<li>${escape(line.slice(2))}</li>`}continue}end();out+=`<p>${escape(line)}</p>`}end();return out}
  async function showDoc(type){
    const isTodo=type==='todo';
    showDialog(`<div class="dialog-feature-banner"><img src="assets/v002/${isTodo?'sticker-scroll.webp':'logo-scroll.webp'}" alt=""><div><span class="section-overline">SOLOMONCROWN · v0.0.2</span><h2>${isTodo?'☑ יומן המשימות':'◷ יומן הגרסאות'}</h2><p>טוען מסמך עדכני...</p></div></div>`);
    try{
      const response=await fetch(isTodo?'TODO.md':'CHANGELOG.md',{cache:'no-store'});
      if(!response.ok)throw Error(response.status);
      const md=await response.text();
      const header=`<div class="dialog-feature-banner"><img src="assets/v002/${isTodo?'sticker-scroll.webp':'logo-scroll.webp'}" alt=""><div><span class="section-overline">SOLOMONCROWN · v0.0.2</span><h2>${isTodo?'☑ יומן 120+ משימות':'◷ יומן אירועים ועדכונים'}</h2><p>${isTodo?'סימון משימות נשמר במכשיר שלך':'תיעוד גרסאות, תיקונים והרחבות מאז הקמת הפרויקט'}</p></div></div>`;
      body.innerHTML=header+(isTodo?'<div id="todo-progress" class="todo-progress" aria-live="polite"></div><div class="filter-toolbar"><label class="search-field"><span>⌕</span><input type="search" id="todo-search" placeholder="חפש משימה או קוד SC..."></label><select id="todo-state"><option value="all">כל המשימות</option><option value="open">לביצוע</option><option value="done">הושלמו</option></select></div>':'')+`<div class="modal-markdown">${markdown(md,isTodo)}</div>`;
      if(!isTodo)return;
      const boxes=$$('[data-task-id]',body);
      function refreshTodo(){
        const done=boxes.filter(x=>x.checked).length;
        const percent=boxes.length?Math.round(done/boxes.length*100):0;
        $('#todo-progress').innerHTML=`<div class="todo-progress-head"><strong>התקדמות גרסה ופיתוח</strong><span>${done} מתוך ${boxes.length} · ${percent}%</span></div><div class="todo-progress-track"><div class="todo-progress-fill" style="width:${percent}%"></div></div>`;
        const q=$('#todo-search').value.trim().toLowerCase(),state=$('#todo-state').value;
        boxes.forEach(x=>{const row=x.closest('li');row.hidden=Boolean((q&&!row.textContent.toLowerCase().includes(q))||(state==='done'&&!x.checked)||(state==='open'&&x.checked))});
      }
      boxes.forEach(x=>x.addEventListener('change',()=>{localStorage.setItem(key+'task.'+x.dataset.taskId,String(x.checked));refreshTodo();toast('סימון המשימה נשמר בדפדפן')}));
      $('#todo-search').addEventListener('input',refreshTodo);
      $('#todo-state').addEventListener('change',refreshTodo);
      refreshTodo();
    }catch{body.innerHTML='<h2>אין חיבור למסמך</h2><p>טעינת המסמך דורשת פתיחה דרך שרת האתר.</p>'}
  }
  $('#version-trigger').addEventListener('click',()=>showDoc('changelog'));$('#changelog-trigger').addEventListener('click',()=>showDoc('changelog'));$('#todo-trigger').addEventListener('click',()=>showDoc('todo'));
  function credits(){showDialog(`<div class="dialog-feature-banner"><img src="assets/v002/logo-scroll.webp" alt="סמל כתר שלמה וספר החכמה"><div><span class="section-overline">SolomonCrown · SC · v0.0.2</span><h2>👑 אודות הממלכה</h2><p>Solomon + Crown · מעבדת חכמה, תוכן ויצירה בהשראת שלמה המלך.</p></div></div><h3>✨ חזון ואבני היסוד</h3><p>פרויקט לימוד עברי מימין לשמאל ובו 44 ליקוטים, 10 קלפי חכמה, 8 שערים, קטלוג 72 שמות היסטוריים וגלריית נכסים גרפיים. כל כלי נועד לחבר בין עיון לבין מעשה של יושר, משפט, שלום ותבונה.</p><h3>✒️ יוצר, עורך ומנהל הפרויקט</h3><p><strong>לאון יעקובוב (AnLoMinus)</strong> · Cyber Shamanic · סדרת ״מלך העולם״</p><div class="contact-grid"><a href="https://github.com/Anlominus" target="_blank" rel="noopener noreferrer">💻 GitHub · Anlominus</a><a href="https://github.com/AnLoMinus?tab=repositories" target="_blank" rel="noopener noreferrer">🗂 מאגרי קוד ופרויקטים</a><a href="https://www.linkedin.com/in/anlominus/" target="_blank" rel="noopener noreferrer">🔗 LinkedIn</a><a href="https://www.facebook.com/AnlominusX" target="_blank" rel="noopener noreferrer">💬 Facebook</a><a href="https://codepen.io/Anlominus" target="_blank" rel="noopener noreferrer">🎨 CodePen</a><a href="mailto:cybershamanic@gmail.com">📧 cybershamanic@gmail.com</a><a href="mailto:GlobalElite8200@gmail.com">✉️ GlobalElite8200@gmail.com</a><a href="https://wa.me/972543285967" target="_blank" rel="noopener noreferrer">📱 WhatsApp · 054-328-5967</a><a href="https://wa.me/972535366687" target="_blank" rel="noopener noreferrer">📱 WhatsApp · 053-536-6687</a></div><h3>📚 אחריות למקורות</h3><p>המקרא, ״צוואת שלמה״ וה־Ars Goetia מסומנים כרבדים נפרדים. התרגולים, הליקוטים והאופי הסמלי של 72 הדמויות הם פרשנות מקורית; דמויות וסמלים באיורים הם יצירות אמנות ולא שחזור היסטורי.</p><p><a href="https://www.sefaria.org/I_Kings.3?lang=he" target="_blank" rel="noopener noreferrer">מקורות המקרא</a> · <a href="https://www.esotericarchives.com/solomon/goetia.htm" target="_blank" rel="noopener noreferrer">מהדורת Ars Goetia</a></p><p><small>🗓 6 בנובמבר 2026 · כ״ו בחשוון ה׳תשפ״ז · 7 מידות יסוד · גרסה 0.0.2</small></p>`)}
  $('#about-trigger').addEventListener('click',credits);$('#credits-trigger').addEventListener('click',credits);
  const panel=$('#accessibility-panel');$('#accessibility-toggle').addEventListener('click',()=>{panel.hidden=!panel.hidden;$('#accessibility-toggle').setAttribute('aria-expanded',String(!panel.hidden))});
  let fontSize=Number(localStorage.getItem(key+'fontSize'))||17;function applyFont(){fontSize=Math.min(23,Math.max(14,fontSize));document.documentElement.style.setProperty('--body-size',fontSize+'px');localStorage.setItem(key+'fontSize',fontSize)}
  $('#font-plus').addEventListener('click',()=>{fontSize++;applyFont()});$('#font-minus').addEventListener('click',()=>{fontSize--;applyFont()});$('#font-reset').addEventListener('click',()=>{fontSize=17;applyFont()});applyFont();
  for(const [id,klass,k] of [['contrast-toggle','high-contrast','contrast'],['motion-toggle','reduced-motion','motion']]){const input=$('#'+id);input.checked=localStorage.getItem(key+k)==='true';document.body.classList.toggle(klass,input.checked);input.addEventListener('change',()=>{document.body.classList.toggle(klass,input.checked);localStorage.setItem(key+k,String(input.checked))})}
  if(location.hash){const target=$(location.hash);if(target)setTimeout(()=>target.scrollIntoView(),100)}
})();
