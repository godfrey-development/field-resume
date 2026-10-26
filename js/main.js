(function(){
  const body = document.body;

  // ---- dropdowns: View Entry and Expand Details both toggle the same panel ----
  document.querySelectorAll('.view-btn, .expand-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const entry = btn.closest('.entry');
      const open = entry.classList.toggle('open');
      entry.querySelectorAll('.view-btn, .expand-toggle').forEach(b=>b.setAttribute('aria-expanded', open));
      entry.querySelectorAll('.expand-toggle .pm').forEach(pm=>pm.textContent = open ? '−' : '+');
    });
  });

  // ---- rail: collapse/expand on desktop, drawer on narrow screens ----
  const railToggle = document.getElementById('railToggle');
  const menuBtn = document.getElementById('menuBtn');
  const scrim = document.getElementById('scrim');
  function setRail(open){
    body.classList.toggle('rail-open', open);
    railToggle.setAttribute('aria-expanded', open);
    railToggle.querySelector('.lbl').textContent = open ? 'Collapse' : '';
    try{ localStorage.setItem('fm-rail', open ? '1' : '0'); }catch(e){}
  }
  let saved = null;
  try{ saved = localStorage.getItem('fm-rail'); }catch(e){}
  setRail(saved === '1');
  railToggle.addEventListener('click', ()=>setRail(!body.classList.contains('rail-open')));

  function setDrawer(open){
    body.classList.toggle('drawer-open', open);
    menuBtn.setAttribute('aria-expanded', open);
  }
  menuBtn.addEventListener('click', ()=>setDrawer(!body.classList.contains('drawer-open')));
  scrim.addEventListener('click', ()=>setDrawer(false));
  document.querySelectorAll('.rail-nav a').forEach(a=>a.addEventListener('click', ()=>setDrawer(false)));
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') setDrawer(false); });

  // ---- close the slide-out menu if the window is widened past phone/tablet size ----
  window.addEventListener('resize', ()=>{ if(window.innerWidth > 860) setDrawer(false); });

  // ---- lightbox for field photos ----
  const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap');
  document.querySelectorAll('[data-lb]').forEach(b=>b.addEventListener('click', ()=>{
    const img = b.querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    lbCap.textContent = b.parentElement.querySelector('figcaption')?.textContent || '';
    if(lb.showModal) lb.showModal();
  }));
  document.getElementById('lbClose').addEventListener('click', ()=>lb.close());
  lb.addEventListener('click', e=>{ if(e.target === lb) lb.close(); });

  // ---- active tab + rail highlight on scroll ----
  const tabLinks = Array.from(document.querySelectorAll('.tabs a'));
  const railLinks = Array.from(document.querySelectorAll('.rail-nav a'));
  const spy = new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(!e.isIntersecting) return;
      const id = e.target.id;
      railLinks.forEach(a=>a.classList.toggle('here', a.getAttribute('href') === '#'+id));
      const tab = id.startsWith('e-') ? 'entries' : id;
      tabLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+tab));
    });
  },{rootMargin:'-30% 0px -55% 0px'});
  document.querySelectorAll('.entry[id]').forEach(t=>spy.observe(t));
})();
