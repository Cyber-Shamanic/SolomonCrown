/* SolomonCrown 0.0.2 — searchable, accessible Hebrew catalog. */
(() => {
  'use strict';
  const spirits=window.SC.spiritsHe;
  const $=s=>document.querySelector(s);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>String(s).normalize('NFD').replace(/[\u0591-\u05C7]/g,'').normalize('NFC').toLowerCase();
  const ranks=[...new Set(spirits.flatMap(x=>x.ranks))];
  ranks.forEach(rank=>{const o=document.createElement('option');o.value=rank;o.textContent=rank;$('#rank-filter').append(o)});
  const expand=document.createElement('button');expand.id='expand-all';expand.className='small-btn';expand.textContent='פתח פירוט לכולם';$('#clear-filter').after(expand);
  const description=document.querySelector('#names .section-heading p');
  if(description)description.textContent='72 שמות בתעתיק עברי מקורב ובכתיב המקורי, לפי סדרם. לכל שם תיאור מסורתי, אופי סמלי, תחום עיסוק ודרך גישה ללימוד. השמות והייחוסים אינם פרקי תנ״ך.';
  const legend=document.querySelector('.alphabet-note');
  if(legend)legend.innerHTML='<span>אופן הקריאה:</span> <strong>מספר סידורי</strong> · <strong>שם בעברית ובמקור</strong> · <strong>תחום ומעמד</strong> · <strong>פרטים נפתחים</strong>';
  const note=document.querySelector('.variant-note p');
  if(note)note.textContent='התעתיק העברי נועד להנגיש את הקריאה ואינו טוען להגייה היסטורית מוסכמת. יש שונות בין כתבי היד, לדוגמה: Samigina / Gamigin, Bathin / Bathim, Marax / Morax, Vine / Viné ו־Cimejes / Cimeies. בפרטי כל כרטיס נשמר גם הכתיב הלטיני להצלבה עם מהדורת המקור.';
  let expanded=new Set();
  function render(){
    const q=normalize($('#spirit-search').value.trim());
    const rank=$('#rank-filter').value;
    const filtered=spirits.filter(x=>(!rank||x.ranks.includes(rank))&&(!q||[x.name,x.heName,x.domain,x.traits,x.summary,x.approach,x.ranks.join(' '),String(x.number)].some(v=>normalize(v).includes(q))));
    $('#spirit-grid').innerHTML=filtered.map(x=>`<article class="spirit-name spirit-entry" id="name-${x.number}">
      <div class="spirit-entry-top"><span class="spirit-number">${String(x.number).padStart(2,'0')}</span><span class="spirit-domain">${esc(x.domain)}</span></div>
      <h3>${esc(x.heName)}</h3><small class="latin-name" lang="en">${esc(x.name)}</small>
      <div class="spirit-rank">${x.ranks.map(esc).join(' · ')}</div>
      <p class="spirit-description">${esc(x.summary)}</p>
      <details ${expanded.has(x.number)?'open':''} data-detail="${x.number}"><summary>מאפיינים · אופי · צורת גישה <span>⌄</span></summary>
        <div class="spirit-detail-content"><div><b>♛ אופי סמלי</b><p>${esc(x.traits)}</p></div><div><b>✦ תחום העיסוק בטקסט</b><p>${esc(x.domain)}</p></div><div><b>☼ גישה מעשית ללימוד</b><p>${esc(x.approach)}</p></div><small>התיאור מיוחס ל־Ars Goetia; המאפיינים הסמליים והגישה המעשית הם פרשנות מקורית, ללא טקסי זימון.</small></div>
      </details></article>`).join('')||'<p class="empty-state">לא נמצאו שמות התואמים לסינון. אפשר לחפש גם בעברית וגם בלטינית.</p>';
    document.querySelectorAll('[data-detail]').forEach(el=>el.addEventListener('toggle',()=>{const n=Number(el.dataset.detail);if(el.open)expanded.add(n);else expanded.delete(n)}));
    $('#spirit-count').textContent=`מוצגים ${filtered.length} מתוך ${spirits.length} שמות · תעתיק עברי מקורב · תיאורים ממקורות היסטוריים, פרשנות מוסרית חדשה`;
  }
  $('#spirit-search').addEventListener('input',render);
  $('#rank-filter').addEventListener('change',render);
  $('#clear-filter').addEventListener('click',()=>{$('#spirit-search').value='';$('#rank-filter').value='';render()});
  render();
  $('#copy-names').addEventListener('click',()=>{
    const content=spirits.map(x=>`${String(x.number).padStart(2,'0')}. ${x.heName} (${x.name}) — ${x.domain}\n${x.summary}\nאופי סמלי: ${x.traits}\nצורת גישה ללימוד: ${x.approach}`).join('\n\n');
    const data='SolomonCrown v0.0.2 · ע״ב השמות: קטלוג לימודי לפי Ars Goetia\n\n'+content+'\n\nלאון יעקובוב (AnLoMinus) · Cyber Shamanic';
    const success=()=>{const toast=$('#toast');toast.textContent='כל 72 הרשומות הועתקו בעברית';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)};
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(data).then(success,()=>alert('העתקה לא זמינה בדפדפן זה'));
    else{const el=document.createElement('textarea');el.value=data;document.body.append(el);el.select();document.execCommand('copy');el.remove();success()}
  });
  const btn=document.querySelector('#expand-all');
  if(btn)btn.addEventListener('click',()=>{const all=[...document.querySelectorAll('[data-detail]')];const open=all.some(x=>!x.open);all.forEach(x=>x.open=open);btn.textContent=open?'סגור פירוט':'פתח פירוט לכולם'});
})();
