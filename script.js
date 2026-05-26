// Tab switching
function initTabs(){
  document.querySelectorAll('.tabs-wrap').forEach(wrap=>{
    const btns=wrap.querySelectorAll('.tab-btn');
    const panels=wrap.querySelectorAll('.tab-content');
    btns.forEach((btn,i)=>{
      btn.addEventListener('click',()=>{
        btns.forEach(b=>b.classList.remove('active'));
        panels.forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        panels[i] && panels[i].classList.add('active');
      });
    });
    // activate first
    btns[0] && btns[0].classList.add('active');
    panels[0] && panels[0].classList.add('active');
  });
}

// Highlight active nav link
function initNav(){
  const links=document.querySelectorAll('.nav-links a');
  const cur=window.location.pathname.split('/').pop()||'index.html';
  links.forEach(a=>{
    const href=a.getAttribute('href')||'';
    if(href===cur||(cur===''&&href==='index.html')) a.classList.add('active');
  });
}

// Animate counters
function animateCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=parseFloat(el.dataset.count);
    const suffix=el.dataset.suffix||'';
    const dur=1200;
    const step=16;
    const inc=target/(dur/step);
    let cur=0;
    const timer=setInterval(()=>{
      cur+=inc;
      if(cur>=target){cur=target;clearInterval(timer);}
      el.textContent=Number.isInteger(target)?Math.round(cur)+suffix:(cur.toFixed(1))+suffix;
    },step);
  });
}

// Intersection observer for counter animation
function initAnimations(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('[data-count]').forEach(el=>{
          if(!el.dataset.animated){el.dataset.animated=true;animateCounters();}
        });
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.3});
  document.querySelectorAll('.kpi-grid,.kpi-section').forEach(el=>obs.observe(el));
}

document.addEventListener('DOMContentLoaded',()=>{
  initTabs();
  initNav();
  initAnimations();
});
