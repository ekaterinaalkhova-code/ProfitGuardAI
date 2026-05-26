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



// ProfitGuard instant site agent
function initProfitGuardAgent(){
  if(document.getElementById('pg-agent-root')) return;

  const knowledge = [
    {
      keys:['что такое','profitguard','платформа','product','продукт'],
      answer:'ProfitGuard Platform — B2B-платформа коммерческого контроля для ритейла, дистрибуции и sales-команд. Она превращает выгрузки 1С и Excel ПланФакт в dashboard: план/факт, прогноз месяца, GAP, клиенты риска, дистр-пакеты, АКБ, запасы и action-list.'
    },
    {
      keys:['модули','модуль','distribution','retail','sales','ceo','inventory','commercial'],
      answer:'В платформе 3 ключевых продукта: RetailGuard — автозаказ, ABC/XYZ и управление остатками; DistributionGuard — заказы, перемещения между регионами и Trade Marketing внутри дистрибуции; SalesControl — action-list и контроль исполнения sales-команды.'
    },
    {
      keys:['distributionguard','commercial','план факт','план/факт','дистр','акб'],
      answer:'DistributionGuard решает задачи заказов и перемещений между регионами: где дефицит, где излишек, что переместить, что заказать поставщику и как закрыть supply gap.'
    },
    {
      keys:['retailguard','inventory','запас','остат','oos','overstock','frozen','автозаказ'],
      answer:'RetailGuard управляет retail-остатками: автозаказ P1/P2/P3, ABC/XYZ, OOS, overstock, dead stock, frozen capital и приоритеты закупа по SKU.'
    },
    {
      keys:['trade','trade marketing','оборачиваемость','промо','акб','дожим'],
      answer:'Trade Marketing находится внутри DistributionGuard: он управляет оборачиваемостью, промо, sell-out, АКБ, клиентами риска и дистр-пакетами через связку регион → клиент → пакет → действие.'
    },
    {
      keys:['файлы','загрузка','1с','excel','планфакт','выгрузка'],
      answer:'Для пилота нужны: ПланФакт Excel, выгрузка продаж текущего месяца из 1С, выгрузка прошлого месяца для АКБ и при необходимости дневная выгрузка. Платформа проверяет структуру, считает KPI и формирует Excel-экспорт.'
    },
    {
      keys:['срок','пилот','сколько дней','запуск','внедрение'],
      answer:'Пилот можно запустить за 10 рабочих дней: 1–2 день диагностика данных, 3–5 день настройка под формат компании, 6–8 день первый расчёт и проверка, 9–10 день презентация CEO и обучение команды.'
    },
    {
      keys:['стоимость','цена','тариф','подписка','сколько стоит'],
      answer:'Пилотный формат обычно оценивается отдельно после диагностики данных. Для коммерческой модели возможны тарифы: Starter, Business и Enterprise — в зависимости от модулей, пользователей, интеграций и SLA.'
    },
    {
      keys:['безопасность','data leak','dlp','данные','конфиденциальность'],
      answer:'ProfitGuard проектируется с учётом Data Leak Prevention: контроль источников данных, обработка файлов внутри сессии/закрытого контура, роли доступа, история загрузок и отказ от передачи коммерческих данных в открытые каналы.'
    },
    {
      keys:['контакт','связаться','whatsapp','телефон','демо','презентация'],
      answer:'Для запуска пилота свяжитесь с Екатериной Денисовой: WhatsApp / телефон +7 777 009 07 03. Можно запросить демо, диагностику ваших выгрузок и оценку пилота.'
    }
  ];

  function findAnswer(q){
    const text = (q || '').toLowerCase();
    let best = null;
    let score = 0;
    for(const item of knowledge){
      const s = item.keys.reduce((acc,k)=>acc + (text.includes(k.toLowerCase()) ? 1 : 0), 0);
      if(s > score){ score = s; best = item; }
    }
    if(best) return best.answer;
    return 'Могу ответить по ProfitGuard Platform, модулям RetailGuard / DistributionGuard / SalesControl, пилоту, файлам 1С/Excel, АКБ, план-факту, запасам и стоимости. Напишите вопрос короче или свяжитесь напрямую: +7 777 009 07 03.';
  }

  const styles = document.createElement('style');
  styles.textContent = `
    .pg-agent-fab{position:fixed;right:22px;bottom:22px;z-index:9999;border:0;border-radius:999px;background:#185FA5;color:#fff;padding:14px 18px;font-weight:800;box-shadow:0 18px 40px rgba(15,23,42,.22);cursor:pointer;font-size:14px}
    .pg-agent{position:fixed;right:22px;bottom:82px;width:min(380px,calc(100vw - 32px));height:520px;max-height:calc(100vh - 110px);background:#fff;border:1px solid #E2E8F0;border-radius:18px;box-shadow:0 24px 70px rgba(15,23,42,.25);z-index:9999;display:none;overflow:hidden}
    .pg-agent.open{display:flex;flex-direction:column}
    .pg-agent-head{background:#0F172A;color:#fff;padding:16px 18px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
    .pg-agent-title{font-size:15px;font-weight:800;line-height:1.2}
    .pg-agent-sub{font-size:11px;color:#CBD5E1;margin-top:3px;line-height:1.35}
    .pg-agent-close{background:rgba(255,255,255,.12);border:0;color:#fff;border-radius:8px;width:28px;height:28px;cursor:pointer;font-size:18px}
    .pg-agent-body{padding:14px;overflow-y:auto;flex:1;background:#F8FAFC}
    .pg-msg{padding:10px 12px;border-radius:13px;margin-bottom:9px;font-size:13px;line-height:1.45;white-space:pre-wrap}
    .pg-msg.bot{background:#fff;color:#0F172A;border:1px solid #E2E8F0}
    .pg-msg.user{background:#185FA5;color:#fff;margin-left:42px}
    .pg-quick{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0 4px}
    .pg-quick button{border:1px solid #CBD5E1;background:#fff;color:#0F172A;border-radius:999px;padding:7px 9px;font-size:11px;cursor:pointer}
    .pg-agent-input{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid #E2E8F0}
    .pg-agent-input input{flex:1;border:1px solid #CBD5E1;border-radius:999px;padding:11px 13px;font-size:13px;color:#0F172A;outline:none}
    .pg-agent-input button{border:0;background:#185FA5;color:#fff;border-radius:999px;padding:0 14px;font-weight:800;cursor:pointer}
    .pg-agent-wa{display:block;margin-top:8px;color:#185FA5;font-weight:800;text-decoration:none}
    @media(max-width:640px){.pg-agent{right:12px;bottom:72px;width:calc(100vw - 24px);height:70vh}.pg-agent-fab{right:12px;bottom:14px}}
  `;
  document.head.appendChild(styles);

  const root = document.createElement('div');
  root.id = 'pg-agent-root';
  root.innerHTML = `
    <button class="pg-agent-fab" type="button">💬 Задать вопрос</button>
    <div class="pg-agent" role="dialog" aria-label="ProfitGuard agent">
      <div class="pg-agent-head">
        <div>
          <div class="pg-agent-title">ProfitGuard Agent</div>
          <div class="pg-agent-sub">Отвечает по платформе, модулям, пилоту и загрузке данных</div>
        </div>
        <button class="pg-agent-close" type="button">×</button>
      </div>
      <div class="pg-agent-body">
        <div class="pg-msg bot">Здравствуйте. Я отвечу на вопросы по ProfitGuard Platform. Спросите про модули, пилот, загрузку 1С/Excel, АКБ, запасы или стоимость.</div>
        <div class="pg-quick">
          <button type="button">Что такое ProfitGuard?</button>
          <button type="button">Какие модули есть?</button>
          <button type="button">Как запустить пилот?</button>
          <button type="button">Какие файлы нужны?</button>
        </div>
      </div>
      <form class="pg-agent-input">
        <input type="text" placeholder="Напишите вопрос..." autocomplete="off">
        <button type="submit">→</button>
      </form>
    </div>
  `;
  document.body.appendChild(root);

  const fab = root.querySelector('.pg-agent-fab');
  const box = root.querySelector('.pg-agent');
  const close = root.querySelector('.pg-agent-close');
  const body = root.querySelector('.pg-agent-body');
  const form = root.querySelector('.pg-agent-input');
  const input = root.querySelector('input');

  function addMsg(text, who){
    const msg = document.createElement('div');
    msg.className = 'pg-msg ' + who;
    msg.textContent = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
  }
  function ask(q){
    if(!q || !q.trim()) return;
    addMsg(q, 'user');
    const ans = findAnswer(q);
    setTimeout(()=>{
      addMsg(ans, 'bot');
      if(q.toLowerCase().includes('контакт') || q.toLowerCase().includes('пилот') || q.toLowerCase().includes('демо')){
        const a = document.createElement('a');
        a.className = 'pg-agent-wa';
        a.href = 'https://wa.me/77770090703';
        a.target = '_blank';
        a.textContent = 'Написать Екатерине в WhatsApp →';
        body.appendChild(a);
        body.scrollTop = body.scrollHeight;
      }
    }, 180);
  }

  fab.addEventListener('click',()=>{box.classList.toggle('open'); setTimeout(()=>input.focus(), 100);});
  close.addEventListener('click',()=>box.classList.remove('open'));
  form.addEventListener('submit',e=>{e.preventDefault(); const q=input.value; input.value=''; ask(q);});
  root.querySelectorAll('.pg-quick button').forEach(btn=>btn.addEventListener('click',()=>ask(btn.textContent)));
}

document.addEventListener('DOMContentLoaded',()=>{
  initProfitGuardAgent();
});
