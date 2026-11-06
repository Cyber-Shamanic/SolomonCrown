/* SolomonCrown 0.0.2: independent PNG assets with genuine alpha and per-artwork halo */
(() => {
  'use strict';
  const assets=window.SCAssets||[];
  const root=document.querySelector('#asset-gallery');
  const filters=document.querySelector('#asset-filters');
  if(!root||!filters)return;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const kinds=['הכול',...new Set(assets.map(x=>x.kind))];
  let current='הכול';
  document.querySelector('#asset-total').textContent=`${assets.length} איורים נפרדים`;
  filters.innerHTML=kinds.map((k,i)=>`<button type="button" class="${i===0?'active':''}" data-kind="${esc(k)}" aria-pressed="${i===0}">${esc(k)}${i===0?` · ${assets.length}`:''}</button>`).join('');
  function draw(){
    const selected=assets.filter(x=>current==='הכול'||x.kind===current);
    root.innerHTML=selected.map(x=>{
      const png=`assets/v002/${x.file}`;
      const webp=png.replace(/\.png$/,'.webp');
      return `<article class="asset-tile" style="--sticker-glow:${esc(x.glow)}">
        <a class="asset-preview" href="${png}" target="_blank" rel="noopener noreferrer" aria-label="פתח קובץ PNG מקורי של ${esc(x.name)}"><img src="${webp}" alt="${esc(x.name)} — איור מקורי על רקע שקוף" loading="lazy"></a>
        <div class="asset-info"><small>${esc(x.kind)} · PNG מקורי</small><h3>${esc(x.name)}</h3><p>${esc(x.note)}</p></div>
        <a class="asset-download" href="${png}" download="${esc(x.file)}">↓ הורד PNG נפרד</a>
      </article>`;
    }).join('');
    document.querySelector('#asset-count').textContent=`מוצגים ${selected.length} מתוך ${assets.length} נכסים. הקבצים עצמאיים, בלי חיתוך מתוך תמונת גיליון.`;
  }
  filters.addEventListener('click',e=>{
    const btn=e.target.closest('[data-kind]');if(!btn)return;
    current=btn.dataset.kind;
    filters.querySelectorAll('button').forEach(x=>{const active=x===btn;x.classList.toggle('active',active);x.setAttribute('aria-pressed',active?'true':'false')});
    draw();
  });
  draw();
})();
