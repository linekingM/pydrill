var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=null;async function u(e=!1){if(l&&!e)return l;try{let e=await fetch(`./question-bank/questions.json`);if(!e.ok)throw Error(`HTTP ${e.status} when fetching questions`);let t=await e.json();return l=t,t}catch(e){throw console.error(`Failed to load questions:`,e),e}}function d(e){let t=new Map;for(let n of e)t.has(n.topic)||t.set(n.topic,[]),t.get(n.topic).push(n);let n=[],r=0;for(let[e,i]of t.entries())n.push({name:e,index:r,questions:i}),r++;return n}function f(e,t){let n=d(e);for(let e of n){let n=e.questions.findIndex(e=>e.id===t);if(n!==-1)return{topic:e,indexInTopic:n}}return null}var p=[],m=()=>{};function h(e,t){let n=[],r=e.replace(/:([a-zA-Z0-9_]+)/g,(e,t)=>(n.push(t),`([^/?#]+)`)).replace(/\//g,`\\/`),i=RegExp(`^${r}$`);p.push({regex:i,paramNames:n,handler:t})}function g(e){m=e}function _(e){let t=e;t.startsWith(`#`)||(t=`#`+(t.startsWith(`/`)?t:`/`+t)),window.location.hash===t?y():window.location.hash=t}function v(){let[e,t]=(window.location.hash.slice(1)||`/`).split(`?`),n=e.startsWith(`/`)?e:`/`+e,r={};return t&&new URLSearchParams(t).forEach((e,t)=>{r[t]=e}),{path:n,query:r}}function y(){let{path:e,query:t}=v();for(let n of p){let r=e.match(n.regex);if(r){let e={};n.paramNames.forEach((t,n)=>{e[t]=r[n+1]?decodeURIComponent(r[n+1]):``}),n.handler(e,t);return}}m({},t)}function b(){window.addEventListener(`hashchange`,y),y()}var x=`pydrill.v1.records`,S=`pydrill.v1.last`,C=new Set;function w(e){return C.add(e),()=>{C.delete(e)}}function T(){for(let e of C)try{e()}catch(e){console.error(`Error in store listener:`,e)}}function E(){try{let e=localStorage.getItem(x);if(!e)return{};let t=JSON.parse(e);return typeof t!=`object`||!t?{}:t}catch(e){return console.warn(`Failed to parse records from localStorage:`,e),{}}}function D(e){return E()[e]}function O(e){try{localStorage.setItem(x,JSON.stringify(e))}catch(e){console.error(`Failed to save records to localStorage:`,e)}T()}function k(e,t){let n=E(),r=n[e.id],i,a=!1;e.answer&&e.answer.trim().length>0?t===e.answer.trim()?(i=`correct`,a=r?.inWrongBook??!1):(i=`wrong`,a=!0):(i=`ungraded`,a=!1);let o={choice:t,result:i,submittedAt:Date.now(),inWrongBook:a};return n[e.id]=o,O(n),o}function A(e){let t=E();t[e]&&(t[e]={...t[e],inWrongBook:!1},O(t))}function j(){try{localStorage.removeItem(x)}catch(e){console.error(`Failed to clear localStorage:`,e)}try{localStorage.removeItem(S)}catch(e){console.error(`Failed to clear last position:`,e)}T()}function M(e){try{let t=localStorage.getItem(S);if(!t)return null;let n=JSON.parse(t);if(!n||typeof n!=`object`||Array.isArray(n))return null;let r=n.id,i=n.at;return typeof r!=`string`||r.length===0||typeof i!=`number`||!Number.isFinite(i)||!e.some(e=>e.id===r)?null:{id:r,at:i}}catch(e){return console.warn(`Failed to parse last position:`,e),null}}function N(e){try{localStorage.setItem(S,JSON.stringify({id:e,at:Date.now()}))}catch(e){console.error(`Failed to save last position:`,e)}}function P(e){let t=E(),n=0;for(let r of e)t[r.id]?.result===`correct`&&n++;return n}function F(e){let t=E();return e.filter(e=>!!t[e.id]?.inWrongBook)}function ee(e){let t=E(),n=e.length,r=0;for(let n of e)t[n.id]?.result===`correct`&&r++;return{correct:r,total:n}}function I(e){let t=E(),n=0,r=0,i=0;for(let a of e){let e=t[a.id];e&&(n++,e.result===`correct`&&r++,e.inWrongBook&&i++)}return{submittedCount:n,correctCount:r,wrongBookCount:i}}function te(e,t=new Date){if(e===0)return 0;let n=t.getFullYear(),r=t.getMonth(),i=t.getDate();return(Math.floor(Date.UTC(n,r,i)/864e5)%e+e)%e}function ne(e,t=new Date){if(e.length!==0)return e[te(e.length,t)]}function re(e,t){let n=new Date(e),r=new Date(t);return n.getFullYear()===r.getFullYear()&&n.getMonth()===r.getMonth()&&n.getDate()===r.getDate()}function ie(e,t=new Date){let n=D(e.id),r=t.getTime();return!n||!re(n.submittedAt,r)?{statusText:`今天还没做`,isCompletedToday:!1}:n.result===`correct`?{statusText:`今天答对`,isCompletedToday:!0,result:`correct`}:n.result===`wrong`?{statusText:`今天答错`,isCompletedToday:!0,result:`wrong`}:{statusText:`今天已提交（未判分）`,isCompletedToday:!0,result:`ungraded`}}function ae(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?`#E9964F`:`currentColor`}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?`#E9964F`:`none`}" />
    ${e?`<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>`:``}
  </svg>`}function oe(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?`#E9964F`:`currentColor`}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?`<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>`:``}
  </svg>`}function se(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?`#E9964F`:`currentColor`}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?`#E9964F`:`none`}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?`<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>`:``}
  </svg>`}function ce(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?`#E9964F`:`currentColor`}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?`<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>`:``}
  </svg>`}function le(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function L(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function ue(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function de(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function fe(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function pe(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function R(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function z(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function B(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function V(e=16,t=`#7C8F62`){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function me(e){return e.includes(`字符串`)||e.includes(`循环`)?`<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>`:e.includes(`元组`)||e.includes(`引用`)?`<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>`:e.includes(`函数`)||e.includes(`默认参数`)?`<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>`:e.includes(`列表`)||e.includes(`切片`)?`<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>`:e.includes(`字典`)?`<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>`:e.includes(`作用域`)||e.includes(`变量`)?`<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>`:e.includes(`类`)||e.includes(`对象`)?`<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>`:`<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>`}function H(e,t=0){if(e===`none`)return``;let n=e===`home`,r=e===`topics`,i=e===`wrong`,a=e===`me`;return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${n?`active`:``}" data-testid="tab-home">
          ${ae(n)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${r?`active`:``}" data-testid="tab-topics">
          ${oe(r)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${i?`active`:``}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${se(i)}
            ${t>0?`<span class="nav-badge" data-testid="wrong-count">${t}</span>`:``}
          </div>
          <span class="bottom-nav-label">错题本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${a?`active`:``}" data-testid="tab-me">
          ${ce(a)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}var he=new URL(`hero-tree-BQtvnSiX.svg`,import.meta.url).href,ge=new URL(`mascot-books-ChtzdIQo.svg`,import.meta.url).href,_e=new URL(`icon-calendar-CxLZz4gM.svg`,import.meta.url).href,ve=new URL(`icon-books-DPG9c4Rf.svg`,import.meta.url).href,ye=new URL(`icon-notebook-DrFh_u_v.svg`,import.meta.url).href;function U(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function be(e){let t=E(),n=F(e).length,r=d(e),i=r.length,a=ne(e),o=a?ie(a):{statusText:`今天还没做`,isCompletedToday:!1},s=a?f(e,a.id):null,c=s?s.indexInTopic+1:1,l=s?s.topic.questions.length:2,u=a?`${a.topic} · 第 ${c}/${l} 题`:`今日一题`,p=new Date,m=`${p.getMonth()+1}月${p.getDate()}日`,h=a?.code?a.code.split(`
`).slice(0,3).join(`
`):``,g=r[0],_=g?.name||``,v=g&&g.questions.length>0?g.questions.find(e=>!t[e.id])||g.questions[0]:void 0,y=M(e),b=y?e.find(e=>e.id===y.id):void 0,x=b?f(e,b.id):null,S=b?.code?(b.code.split(`
`)[0]||``).trim():``,C=b&&x?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${B(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${U(x.topic.name)} · 第 ${x.indexInTopic+1}/${x.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${b.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${S?`<div class="continue-code"><code>${U(S)}</code></div>`:``}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${B(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${U(_)}」开始吧，一次一小步。</p>
          ${v?`<a href="#/q/${v.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:``}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${he}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${fe()}</span>
          </div>
          <p class="hero-subtitle">
            <span class="subtitle-badge">学 Python</span>
            <span class="subtitle-dot">·</span>
            <span class="subtitle-text">每天一道小题</span>
          </p>
          <div class="hero-scattered-petals" aria-hidden="true">
            <span class="petal petal-1"></span>
            <span class="petal petal-2"></span>
            <span class="petal petal-3"></span>
            <span class="petal petal-4"></span>
            <span class="petal petal-5"></span>
            <span class="petal petal-6"></span>
          </div>
        </div>
      </header>

      <section class="home-entry-grid" aria-label="快捷入口">
        <a href="#/q/${a?.id||v?.id||`q001`}?from=daily" class="entry-card active-press">
          <img src="${_e}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${o.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${ve}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${i} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${ye}" alt="错题本" class="entry-icon-direct" />
          <span class="entry-card-title">错题本</span>
          <span class="entry-card-sub">${n>0?`${n} 题待温习`:`错题本空`}</span>
        </a>
      </section>

      ${C}

      ${a?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${m}</span>
              <h3 class="daily-q-title">${u}</h3>
            </div>
            <span class="chip-status ${o.result===`correct`?`chip-green`:o.result===`wrong`?`chip-red`:`chip-orange`}" data-testid="daily-status">
              ${o.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${a.stem}</p>

          ${h?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${h}</code></pre>
            </div>
          `:``}

          <div class="daily-action-row">
            <a href="#/q/${a.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${o.isCompletedToday?`查看结果`:`开始做题`}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${ge}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:``}
    </div>

    ${H(`home`,n)}
  `}var xe={"字符串/循环":`continue、break 与 for…else`,"元组/引用":`不可变的元组、+= 与引用`,"函数/默认参数":`默认值在 def 时就定好`,"列表/切片":`反向切片、复制与引用`,字典:`键的相等、get 与 setdefault`,"作用域/变量":`局部变量、闭包晚绑定`,"类/对象":`类属性共享、继承与重写`,异常处理:`try/except/else/finally 的顺序`};function Se(e){let t=d(e),n=E(),r=P(e),i=F(e).length,a=t.map((e,t)=>{let{correct:r,total:i}=ee(e.questions),a=i>0?r/i*100:0,o=e.questions.find(e=>!n[e.id])||e.questions[0],s=xe[e.name],c=t%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${t}"
          onclick="window.location.hash = '#/q/${o.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${me(e.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${e.name}</h2>
                <span class="topic-index-badge">#${String(t+1).padStart(2,`0`)}</span>
              </div>
              ${s?`<p class="topic-sub" data-testid="topic-sub-${t}">${s}</p>`:``}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${t}">${r} / ${i}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            ${a>0?`<div class="topic-long-fill tone-${c}" style="width: ${a}%;"></div>`:``}
          </div>
        </article>
      `}).join(``);return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${z()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已做对 ${r} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${ge}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${a}
      </section>
    </div>

    ${H(`topics`,i)}
  `}var Ce=new URL(`notebook-empty-DNz-TYOq.svg`,import.meta.url).href,W=new URL(`mascot-sad-Dg1R60AV.svg`,import.meta.url).href,G=`all`,K=null;function q(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function we(e){let t=new Date(e);return`${t.getMonth()+1}月${t.getDate()}日`}function Te(e){let t=e.indexOf(`/`);return t===-1?e:e.slice(0,t)}function Ee(e){let t=new Map;for(let n of d(e)){let e=n.questions.length;n.questions.forEach((r,i)=>{t.set(r.id,{topicIndex:n.index,topicName:n.name,n:i+1,m:e})})}return t}function De(e,t){K||={};let n=e[0];for(let r of e)!(String(r)in K)&&K[r]===void 0&&(K[r]=t<=30||r===n);return K}function Oe(e,t){let n=E(),r=Ee(e),i=e.filter(e=>!!n[e.id]?.inWrongBook),a=i.length;if(typeof window<`u`){let e=window;e.__pydrill_removeWrong=e=>{A(e),t&&t()},e.__pydrillWrongToggle=e=>{K||={},K[e]=!K[e],t&&t()},e.__pydrillWrongFilter=e=>{if(e===`all`)G=`all`;else{let t=Number(e);G=t,K||={},K[t]=!0}t&&t()},queueMicrotask(()=>{let e=document.querySelector(`.wrong-filters`),t=e?.querySelector(`.wrong-filter.is-on`);if(!e||!t)return;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();r.left<n.left+12?e.scrollLeft-=n.left+12-r.left:r.right>n.right-28&&(e.scrollLeft+=r.right-(n.right-28))})}if(a===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">错题本</h1>
              <span class="title-doodle-leaf">${z()}</span>
            </div>
            <p class="section-desc">答错的题会自动收进这里；答对后可以手动移出</p>
          </div>
          <div class="header-illustration-right">
            <img src="${W}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="错题本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${Ce}" alt="空白小本子" class="wrong-empty-img" />
          </div>
          <h2 class="wrong-empty-title">错题本是空的</h2>
          <p class="wrong-empty-desc">答错的题会自动收进这里。</p>
          <div class="wrong-empty-action">
            <a href="#/" class="btn-primary active-press">
              <span>去做今日一题</span>
            </a>
          </div>
        </section>
      </div>

      ${H(`wrong`,0)}
    `;let o=new Map;for(let e of i){let t=r.get(e.id);if(!t)continue;let n=o.get(t.topicIndex);n?n.push(e):o.set(t.topicIndex,[e])}let s=[...o.keys()].sort((e,t)=>e-t);G!==`all`&&!o.has(G)&&(G=`all`);let c=De(s,a),l=i[0].id,u=[`<button type="button" class="wrong-filter${G===`all`?` is-on`:``}" data-testid="wrong-filter-all" onclick="window.__pydrillWrongFilter('all')">全部 ${a}</button>`,...s.map(e=>{let t=r.get(o.get(e)[0].id).topicName,n=o.get(e).length;return`<button type="button" class="wrong-filter${G===e?` is-on`:``}" data-testid="wrong-filter-${e}" onclick="window.__pydrillWrongFilter('${e}')">${q(t)} ${n}</button>`})].join(``),d=s.map(e=>{let t=o.get(e),i=r.get(t[0].id),a=c[e]!==!1,s=G===`all`||G===e,l=t.map(e=>{let t=n[e.id],i=r.get(e.id),a=t?.result===`correct`,o=t?.submittedAt?we(t.submittedAt):``,s=e.code?(e.code.split(`
`)[0]||``).trim():``,c=a?`<button type="button" class="wrong-remove-btn" data-testid="wrong-item-remove-${e.id}" onclick="event.stopPropagation(); window.__pydrill_removeWrong && window.__pydrill_removeWrong('${e.id}')">移出</button>`:``;return`
            <div class="wrong-item-row active-press" data-testid="wrong-item-${e.id}" onclick="window.location.hash = '#/q/${e.id}?from=wrong'">
              <span class="wrong-topic-chip">${q(Te(i.topicName))}</span>
              <span class="wrong-row-title">第 ${i.n}/${i.m} 题</span>
              ${s?`<span class="wrong-row-code">${q(s)}</span>`:`<span class="wrong-row-code"></span>`}
              <span class="wrong-row-side">
                <span class="wrong-row-meta">
                  <span class="chip-status ${a?`chip-green`:`chip-red`}" data-testid="wrong-item-status-${e.id}">${a?`答对`:`答错`}</span>
                  ${o?`<span class="wrong-row-date">${o}</span>`:``}
                </span>
                ${c}
              </span>
            </div>
          `}).join(``);return`
        <section class="wrong-group" data-testid="wrong-group-${e}" ${s?``:`hidden`}>
          <button type="button" class="wrong-group-toggle" data-testid="wrong-group-toggle-${e}" aria-expanded="${a?`true`:`false`}" onclick="window.__pydrillWrongToggle(${e})">
            <span class="topic-custom-icon-box topic-icon-sm">${me(i.topicName)}</span>
            <span class="wrong-group-name">${q(i.topicName)}</span>
            <span class="wrong-group-count" data-testid="wrong-group-count-${e}">${t.length}</span>
            <svg class="wrong-chevron${a?` is-open`:``}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <div class="wrong-group-items" ${a?``:`hidden`}>
            ${l}
          </div>
        </section>
      `}).join(``);return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">错题本</h1>
            <span class="title-doodle-leaf">${z()}</span>
          </div>
          <p class="section-desc">答错的题会自动收进这里；答对后可以手动移出</p>
        </div>
        <div class="header-illustration-right">
          <img src="${W}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <div class="wrong-summary-count-row">
          <span>现在有&nbsp;</span>
          <span class="wrong-summary-count-num" data-testid="wrong-count">${a}</span>
          <span>&nbsp;题待温习</span>
        </div>
        <a href="#/q/${l}?from=wrong" class="btn-primary w-full active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <div class="wrong-filters-wrap">
        <div class="wrong-filters" aria-label="按知识点筛选">
          ${u}
        </div>
      </div>

      <section class="wrong-groups" aria-label="错题列表">
        ${d}
      </section>
    </div>

    ${H(`wrong`,a)}
  `}var J=new URL(`mascot-happy-Urhu8y7U.svg`,import.meta.url).href;function ke(e,t){let{submittedCount:n,correctCount:r,wrongBookCount:i}=I(e);return typeof window<`u`&&(window.__pydrill_showClearDialog=()=>{let e=document.getElementById(`clear-confirm-modal`);e&&e.classList.remove(`hidden`)},window.__pydrill_hideClearDialog=()=>{let e=document.getElementById(`clear-confirm-modal`);e&&e.classList.add(`hidden`)},window.__pydrill_confirmClear=()=>{j();let e=document.getElementById(`clear-confirm-modal`);e&&e.classList.add(`hidden`),t&&t()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${J}" alt="小芽啾" class="me-avatar-img" />
          <span class="me-avatar-sparkle">✦</span>
        </div>
        <h1 class="me-title-group">
          <span class="me-title-hand">PyDrill</span>
          <span class="me-badge">学 Python</span>
        </h1>
        <p class="me-sub">学 Python 的随身小练习本</p>
        <div class="me-storage-pill">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
          <span>只在这台手机的浏览器里记录</span>
        </div>
      </section>

      <!-- 2. Stats Card -->
      <section class="card paper-card me-stats-card">
        <div class="card-header-row mb-3">
          <div class="flex items-center gap-2">
            <span class="stats-icon-dot"></span>
            <h2 class="card-title">练习小结</h2>
          </div>
        </div>

        <div class="stats-columns-grid">
          <div class="stat-col">
            <span class="stat-col-label">已提交</span>
            <span class="stat-col-num">${n}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-col-label label-orange">做对</span>
            <span class="stat-col-num num-orange">${r}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-col-label">错题本</span>
            <span class="stat-col-num num-brown">${i}</span>
          </div>
        </div>

        <div class="stats-motto-row">
          <span>${V(16)} 慢慢学，每一题都是进步的脚步</span>
        </div>
      </section>

      <!-- 3. Settings & Info Cards -->
      <section class="me-info-section">
        <div class="card paper-card me-info-list">
          <div class="me-info-item">
            <div class="me-info-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="11" x2="13" y2="11" />
              </svg>
            </div>
            <div class="me-info-content">
              <div class="me-info-row">
                <span class="me-info-title">关于记录</span>
                <span class="chip-status chip-green">本地存储</span>
              </div>
              <p class="me-info-desc">记录保存在本机浏览器，清除网站数据后会重置。</p>
            </div>
          </div>

          <div class="me-info-item">
            <div class="me-info-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <div class="me-info-content">
              <div class="me-info-row">
                <span class="me-info-title">题库版本</span>
                <span class="chip-status chip-orange">v1 · 16 题 · 8 个知识点</span>
              </div>
              <p class="me-info-desc">8 个知识点 · 每个知识点 2 题</p>
            </div>
          </div>
        </div>

        <!-- Clear Records Action Card -->
        <div class="card paper-card me-danger-card">
          <div class="me-danger-item">
            <div class="me-danger-icon-box">
              ${R()}
            </div>
            <div class="me-danger-content">
              <div class="me-info-row">
                <span class="me-danger-title">清除全部记录</span>
                <button
                  type="button"
                  class="btn-danger-sm active-press"
                  data-testid="clear-records"
                  onclick="window.__pydrill_showClearDialog?.();"
                >
                  清空
                </button>
              </div>
              <p class="me-danger-desc">将重置已提交的答题历史与错题本，恢复为初始状态。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Confirmation Dialog Modal -->
      <div id="clear-confirm-modal" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="card paper-card modal-card">
          <div class="modal-icon-wrap">
            ${R()}
          </div>
          <h3 id="modal-title" class="modal-title">确定清除全部记录吗？</h3>
          <p class="modal-desc">清除后，所有答题结果与错题本都将重置为初始状态，无法恢复。</p>
          <div class="modal-actions">
            <button
              type="button"
              class="btn-modal-cancel active-press"
              onclick="window.__pydrill_hideClearDialog?.();"
            >
              取消
            </button>
            <button
              type="button"
              class="btn-modal-confirm active-press"
              data-testid="clear-confirm"
              onclick="window.__pydrill_confirmClear?.();"
            >
              确定清除
            </button>
          </div>
        </div>
      </div>
    </div>

    ${H(`me`,i)}
  `}var Ae=c(o(((e,t)=>{var n=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,r={},i={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof a?new a(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/\u00a0/g,` `)},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){n||={};var r,a;switch(i.util.type(t)){case`Object`:if(a=i.util.objId(t),n[a])return n[a];for(var o in r={},n[a]=r,t)t.hasOwnProperty(o)&&(r[o]=e(t[o],n));return r;case`Array`:return a=i.util.objId(t),n[a]?n[a]:(r=[],n[a]=r,t.forEach(function(t,i){r[i]=e(t,n)}),r);default:return t}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return`none`},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,`gi`),``),e.classList.add(`language-`+n)},currentScript:function(){if(typeof document>`u`)return null;if(document.currentScript&&document.currentScript.tagName===`SCRIPT`)return document.currentScript;try{throw Error()}catch(r){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(e){var t=document.getElementsByTagName(`script`);for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var r=`no-`+t;e;){var i=e.classList;if(i.contains(t))return!0;if(i.contains(r))return!1;e=e.parentElement}return!!n}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(e,t){var n=i.util.clone(i.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){r||=i.languages;var a=r[e],o={};for(var s in a)if(a.hasOwnProperty(s)){if(s==t)for(var c in n)n.hasOwnProperty(c)&&(o[c]=n[c]);n.hasOwnProperty(s)||(o[s]=a[s])}var l=r[e];return r[e]=o,i.languages.DFS(i.languages,function(t,n){n===l&&t!=e&&(this[t]=o)}),o},DFS:function e(t,n,r,a){a||={};var o=i.util.objId;for(var s in t)if(t.hasOwnProperty(s)){n.call(t,s,t[s],r||s);var c=t[s],l=i.util.type(c);l===`Object`&&!a[o(c)]?(a[o(c)]=!0,e(c,n,null,a)):l===`Array`&&!a[o(c)]&&(a[o(c)]=!0,e(c,n,s,a))}}},plugins:{},highlightAll:function(e,t){i.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,container:e,selector:`code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code`};i.hooks.run(`before-highlightall`,r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),i.hooks.run(`before-all-elements-highlight`,r);for(var a=0,o;o=r.elements[a++];)i.highlightElement(o,t===!0,r.callback)},highlightElement:function(t,n,r){var a=i.util.getLanguage(t),o=i.languages[a];i.util.setLanguage(t,a);var s=t.parentElement;s&&s.nodeName.toLowerCase()===`pre`&&i.util.setLanguage(s,a);var c={element:t,language:a,grammar:o,code:t.textContent};function l(e){c.highlightedCode=e,i.hooks.run(`before-insert`,c),c.element.innerHTML=c.highlightedCode,i.hooks.run(`after-highlight`,c),i.hooks.run(`complete`,c),r&&r.call(c.element)}if(i.hooks.run(`before-sanity-check`,c),s=c.element.parentElement,s&&s.nodeName.toLowerCase()===`pre`&&!s.hasAttribute(`tabindex`)&&s.setAttribute(`tabindex`,`0`),!c.code){i.hooks.run(`complete`,c),r&&r.call(c.element);return}if(i.hooks.run(`before-highlight`,c),!c.grammar){l(i.util.encode(c.code));return}if(n&&e.Worker){var u=new Worker(i.filename);u.onmessage=function(e){l(e.data)},u.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else l(i.highlight(c.code,c.grammar,c.language))},highlight:function(e,t,n){var r={code:e,grammar:t,language:n};if(i.hooks.run(`before-tokenize`,r),!r.grammar)throw Error(`The language "`+r.language+`" has no grammar.`);return r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run(`after-tokenize`,r),a.stringify(i.util.encode(r.tokens),r.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var r in n)t[r]=n[r];delete t.rest}var i=new c;return l(i,i.head,e),s(e,i,t,i.head,0),d(i)},hooks:{all:{},add:function(e,t){var n=i.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=i.hooks.all[e];if(n&&n.length)for(var r=0,a;a=n[r++];)a(t)}},Token:a};e.Prism=i;function a(e,t,n,r){this.type=e,this.content=t,this.alias=n,this.length=(r||``).length|0}a.stringify=function e(t,n){if(typeof t==`string`)return t;if(Array.isArray(t)){var r=``;return t.forEach(function(t){r+=e(t,n)}),r}var a={type:t.type,content:e(t.content,n),tag:`span`,classes:[`token`,t.type],attributes:{},language:n},o=t.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),i.hooks.run(`wrap`,a);var s=``;for(var c in a.attributes)s+=` `+c+`="`+(a.attributes[c]||``).replace(/"/g,`&quot;`)+`"`;return`<`+a.tag+` class="`+a.classes.join(` `)+`"`+s+`>`+a.content+`</`+a.tag+`>`};function o(e,t,n,r){e.lastIndex=t;var i=e.exec(n);if(i&&r&&i[1]){var a=i[1].length;i.index+=a,i[0]=i[0].slice(a)}return i}function s(e,t,n,r,c,d){for(var f in n)if(n.hasOwnProperty(f)&&n[f]){var p=n[f];p=Array.isArray(p)?p:[p];for(var m=0;m<p.length;++m){if(d&&d.cause==f+`,`+m)return;var h=p[m],g=h.inside,_=!!h.lookbehind,v=!!h.greedy,y=h.alias;if(v&&!h.pattern.global){var b=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,b+`g`)}for(var x=h.pattern||h,S=r.next,C=c;S!==t.tail&&!(d&&C>=d.reach);C+=S.value.length,S=S.next){var w=S.value;if(t.length>e.length)return;if(!(w instanceof a)){var T=1,E;if(v){if(E=o(x,C,e,_),!E||E.index>=e.length)break;var D=E.index,O=E.index+E[0].length,k=C;for(k+=S.value.length;D>=k;)S=S.next,k+=S.value.length;if(k-=S.value.length,C=k,S.value instanceof a)continue;for(var A=S;A!==t.tail&&(k<O||typeof A.value==`string`);A=A.next)T++,k+=A.value.length;T--,w=e.slice(C,k),E.index-=C}else if(E=o(x,0,w,_),!E)continue;var D=E.index,j=E[0],M=w.slice(0,D),N=w.slice(D+j.length),P=C+w.length;d&&P>d.reach&&(d.reach=P);var F=S.prev;M&&(F=l(t,F,M),C+=M.length),u(t,F,T);var ee=new a(f,g?i.tokenize(j,g):j,y,j);if(S=l(t,F,ee),N&&l(t,S,N),T>1){var I={cause:f+`,`+m,reach:P};s(e,t,n,S.prev,C,I),d&&I.reach>d.reach&&(d.reach=I.reach)}}}}}}function c(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function l(e,t,n){var r=t.next,i={value:n,prev:t,next:r};return t.next=i,r.prev=i,e.length++,i}function u(e,t,n){for(var r=t.next,i=0;i<n&&r!==e.tail;i++)r=r.next;t.next=r,r.prev=t,e.length-=i}function d(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}if(!e.document)return e.addEventListener&&(i.disableWorkerMessageHandler||e.addEventListener(`message`,function(t){var n=JSON.parse(t.data),r=n.language,a=n.code,o=n.immediateClose;e.postMessage(i.highlight(a,i.languages[r],r)),o&&e.close()},!1)),i;var f=i.util.currentScript();f&&(i.filename=f.src,f.hasAttribute(`data-manual`)&&(i.manual=!0));function p(){i.manual||i.highlightAll()}if(!i.manual){var m=document.readyState;m===`loading`||m===`interactive`&&f&&f.defer?document.addEventListener(`DOMContentLoaded`,p):window.requestAnimationFrame?window.requestAnimationFrame(p):window.setTimeout(p,16)}return i}(typeof window<`u`?window:typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope?self:{});t!==void 0&&t.exports&&(t.exports=n),typeof global<`u`&&(global.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:`attr-equals`},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:`named-entity`},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside[`attr-value`].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside[`internal-subset`].inside=n.languages.markup,n.hooks.add(`wrap`,function(e){e.type===`entity`&&(e.attributes.title=e.content.replace(/&amp;/,`&`))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(e,t){var r={};r[`language-`+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};i[`language-`+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var a={};a[e]={pattern:RegExp(`(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])*?(?=<\\/__>)`.replace(/__/g,function(){return e}),`i`),lookbehind:!0,greedy:!0,inside:i},n.languages.insertBefore(`markup`,`cdata`,a)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(e,t){n.languages.markup.tag.inside[`special-attr`].push({pattern:RegExp(`(^|["'\\s])(?:`+e+`)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`,`i`),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,`language-`+t],inside:n.languages[t]},punctuation:[{pattern:/^=/,alias:`attr-equals`},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend(`markup`,{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,(function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|`+t.source+`)*?(?:;|(?=\\s*\\{))`),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:`selector`},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp(`\\burl\\((?:`+t.source+`|(?:[^\\\\\\r\\n()"']|\\\\[\\s\\S])*)\\)`,`i`),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp(`^`+t.source+`$`),alias:`url`}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+t.source+`)*(?=\\s*\\{)`),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined(`style`,`css`),n.tag.addAttribute(`style`,`css`))})(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend(`clike`,{"class-name":[n.languages.clike[`class-name`],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(`(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])`),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript[`class-name`][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore(`javascript`,`keyword`,{regex:{pattern:RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))`),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:`language-regex`,inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:`function`},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore(`javascript`,`string`,{hashbang:{pattern:/^#!.*/,greedy:!0,alias:`comment`},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:`string`},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:`punctuation`},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:`property`}}),n.languages.insertBefore(`javascript`,`operator`,{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:`property`}}),n.languages.markup&&(n.languages.markup.tag.addInlined(`script`,`javascript`),n.languages.markup.tag.addAttribute(`on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)`,`javascript`)),n.languages.js=n.languages.javascript,(function(){if(n===void 0||typeof document>`u`)return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var e=`Loading…`,t=function(e,t){return`✖ Error `+e+` while fetching file: `+t},r=`✖ Error: File does not exist or is empty`,i={js:`javascript`,py:`python`,rb:`ruby`,ps1:`powershell`,psm1:`powershell`,sh:`bash`,bat:`batch`,h:`c`,tex:`latex`},a=`data-src-status`,o=`loading`,s=`loaded`,c=`failed`,l=`pre[data-src]:not([`+a+`="`+s+`"]):not([`+a+`="`+o+`"])`;function u(e,n,i){var a=new XMLHttpRequest;a.open(`GET`,e,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?n(a.responseText):a.status>=400?i(t(a.status,a.statusText)):i(r))},a.send(null)}function d(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||``);if(t){var n=Number(t[1]),r=t[2],i=t[3];return r?i?[n,Number(i)]:[n,void 0]:[n,n]}}n.hooks.add(`before-highlightall`,function(e){e.selector+=`, `+l}),n.hooks.add(`before-sanity-check`,function(t){var r=t.element;if(r.matches(l)){t.code=``,r.setAttribute(a,o);var f=r.appendChild(document.createElement(`CODE`));f.textContent=e;var p=r.getAttribute(`data-src`),m=t.language;if(m===`none`){var h=(/\.(\w+)$/.exec(p)||[,`none`])[1];m=i[h]||h}n.util.setLanguage(f,m),n.util.setLanguage(r,m);var g=n.plugins.autoloader;g&&g.loadLanguages(m),u(p,function(e){r.setAttribute(a,s);var t=d(r.getAttribute(`data-range`));if(t){var i=e.split(/\r\n?|\n/g),o=t[0],c=t[1]==null?i.length:t[1];o<0&&(o+=i.length),o=Math.max(0,Math.min(o-1,i.length)),c<0&&(c+=i.length),c=Math.max(0,Math.min(c,i.length)),e=i.slice(o,c).join(`
`),r.hasAttribute(`data-start`)||r.setAttribute(`data-start`,String(o+1))}f.textContent=e,n.highlightElement(f)},function(e){r.setAttribute(a,c),f.textContent=e})}}),n.plugins.fileHighlight={highlight:function(e){for(var t=(e||document).querySelectorAll(l),r=0,i;i=t[r++];)n.highlightElement(i)}};var f=!1;n.fileHighlight=function(){f||=(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}})()}))(),1);Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:`punctuation`},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:`string`},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:[`annotation`,`punctuation`],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python[`string-interpolation`].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python;function je(e){return!e||!e.trim()?``:`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="language-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((e,t)=>`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${t+1}</span><span class="code-line-content">${Ae.default.highlight(e,Ae.default.languages.python,`python`)||`&#8203;`}</span></div>`).join(``)}</code></pre></div>`}function Y(e){let t=new Date(e);return`${t.getMonth()+1}月${t.getDate()}日 ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`}function X(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Me(e){return e.replace(/`([^`]+)`/g,(e,t)=>`<code class="inline-code">${X(t)}</code>`)}function Ne(e){if(!e||!e.trim())return`解析还没编写`;let t=e.indexOf(`易错点：`),n=4;t===-1&&(t=e.indexOf(`易错点:`),n=4);let r=e,i=``;t!==-1&&(r=e.slice(0,t).trim(),i=e.slice(t+n).trim(),i=i.replace(/^[：:\s]+/,``));let a=r.split(/\n+/).map(e=>e.trim()).filter(Boolean).map(e=>`<p class="explanation-p">${Me(e)}</p>`).join(``),o=``;if(i){let e=Me(i);o=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${de(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${e}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${a}
      ${o}
    </div>
  `}function Pe(e,t,n,r=`topic`){let i=r===`daily`||r===`wrong`?r:`topic`,a=t.find(e=>e.id===n);if(!a){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `;return}N(a.id);let o=f(t,a.id),s=o?.topic||d(t)[0],c=o?o.indexInTopic:0,l=s.questions.length,u=F(t),p=D(a.id),m={questionId:n,from:i,selectedChoice:p?p.choice:null,isRedoing:!1,showEndCard:!1,wrongRoundTotal:u.length,justRemovedWrong:!1};function h(){let n=m.isRedoing?void 0:D(a.id),r=!!n,i=`#/topics`;m.from===`daily`&&(i=`#/`),m.from===`wrong`&&(i=`#/wrong`);let o=`知识点练习`;if(m.from===`daily`)o=`今日一题`;else if(m.from===`wrong`){let e=F(t),n=e.findIndex(e=>e.id===a.id);o=`错题本 ${n===-1?``:`第 ${n+1}/${e.length} 题`}`.trim()}let u=null,p=null,g=!1,v=!1;if(m.from===`topic`)v=c===0,g=c>=l-1,v||(u=s.questions[c-1].id),g||(p=s.questions[c+1].id);else if(m.from===`wrong`){let e=E(),n=t.filter(t=>e[t.id]?.inWrongBook),r=t.findIndex(e=>e.id===a.id),i=n.filter(e=>t.findIndex(t=>t.id===e.id)<r);i.length>0?u=i[i.length-1].id:v=!0;let o=n.filter(e=>t.findIndex(t=>t.id===e.id)>r);o.length>0?p=o[0].id:g=!0}else v=!0,g=!0;if(m.showEndCard){let n=m.from===`topic`,r=E(),a=``,o=``,c=`#/topics`,u=`返回知识点列表`,p=``,h=``;if(n){let e=0;for(let t of s.questions)r[t.id]?.result===`correct`&&e++;a=`这个知识点做完了`,o=`本组共 ${l} 题 · 你已做对 ${e}/${l} 题`,c=`#/topics`,u=`返回知识点列表`,p=`
          <div class="end-questions-list">
            ${s.questions.map((e,t)=>{let n=t+1,i=r[e.id],a=i?.result===`correct`,o=i?.result===`wrong`,s=`end-chip-gray`,c=`· 未做`;a?(s=`end-chip-green`,c=`✓ 答对`):o&&(s=`end-chip-red`,c=`✗ 答错`);let l=e.code?e.code.split(`
`)[0].trim():e.stem;return`
              <a href="#/q/${e.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${n} 题</span>
                  <span class="end-q-code">${X(l)}</span>
                </div>
                <span class="end-chip ${s}">${c}</span>
              </a>
            `}).join(``)}
          </div>
        `;let n=d(t),i=n.findIndex(e=>e.name===s.name),f=i!==-1&&i<n.length-1?n[i+1]:null;f&&f.questions.length>0&&(h=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{a=`错题本这一轮看完了`,o=`好样的！这一轮看了 ${m.wrongRoundTotal||1} 题，多练几遍思路更清晰。`,c=`#/wrong`,u=`返回错题本`;let e=F(t);p=e.length>0?`
            <div class="end-questions-list">
              ${e.map(e=>{let n=f(t,e.id),i=n?n.indexInTopic+1:1,a=n?n.topic.questions.length:2,o=r[e.id],s=o?.result===`correct`,c=o?.result===`wrong`,l=`end-chip-gray`,u=`· 未做`;s?(l=`end-chip-green`,u=`✓ 答对`):c&&(l=`end-chip-red`,u=`✗ 答错`);let d=e.code?e.code.split(`
`)[0].trim():e.stem;return`
                <a href="#/q/${e.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left end-q-row-left--stack">
                    <span class="end-q-idx">${X(e.topic)} · 第 ${i}/${a} 题</span>
                    <span class="end-q-code">${X(d)}</span>
                  </div>
                  <span class="end-chip ${l}">${u}</span>
                </a>
              `}).join(``)}
            </div>
          `:`
            <div class="end-empty-row">
              ${V(18)}
              <span>错题本已经清空了</span>
            </div>
          `}let g=m.from===`wrong`?`错题本 · 完成`:`${s.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${le()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${g}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${J}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${a}</h2>
              <p class="end-sub">${o}</p>

              ${p}

              <div class="end-action-wrap flex-col-gap">
                <button
                  type="button"
                  class="btn-primary w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${u}
                </button>
                ${h}
              </div>
            </div>
          </main>
        </div>
      `,document.getElementById(`q-back-btn`)?.addEventListener(`click`,()=>{_(i)}),document.getElementById(`end-leave-btn`)?.addEventListener(`click`,()=>{_(c)}),document.getElementById(`end-next-topic-btn`)?.addEventListener(`click`,()=>{let e=d(t),n=e.findIndex(e=>e.name===s.name);if(n!==-1&&n<e.length-1){let t=e[n+1];_(`#/q/${t.questions[0].id}?from=topic`)}});return}let y=a.options.map(e=>{let t=m.selectedChoice===e.key,i=!!a.answer&&e.key===a.answer,o=``,s=`opt-badge-default`,c=`opt-card-default`,l=`<div class="opt-radio-circle"></div>`,u=!1;r&&n?i?(o=`data-state="correct"`,c=`opt-card-correct`,s=`opt-badge-correct`,u=!0,l=`<div class="opt-icon-correct">${L()}</div>`):t&&n.result===`wrong`&&(o=`data-state="wrong"`,c=`opt-card-wrong`,s=`opt-badge-wrong`,l=`<div class="opt-icon-wrong">${ue()}</div>`):t&&(c=`opt-card-selected`,s=`opt-badge-selected`,u=!0,l=`<div class="opt-icon-correct">${L()}</div>`);let d=/Error|Exception/.test(e.text),f=`opt-text${u?` opt-text-strong`:``}${d?` opt-text-error`:``}`,p=(e.hint||``).trim(),h=r&&p?`<p class="opt-hint${i?` opt-hint-on-correct`:``}" data-testid="option-hint-${e.key}">${X(p)}</p>`:``;return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${t?`true`:`false`}"
            ${o}
            class="option-item ${c} active-press"
            data-testid="option-${e.key}"
            data-key="${e.key}"
          >
            <span class="opt-badge ${s}">${X(e.key)}</span>
            <div class="opt-body">
              <span class="${f}">${X(e.text)}</span>
              ${h}
            </div>
            <div class="opt-mark">${l}</div>
          </div>
        `}).join(``),b=``;if(r&&n){let e=J,t=`答对了！`,r=Y(n.submittedAt),i=`你选了 ${n.choice} · 正确答案 ${a.answer} · ${r} 提交`,o=`banner-correct`,s=``,c=``;n.result===`wrong`?(e=W,t=`答错了`,i=`你选了 ${n.choice} · 正确答案是 ${a.answer} · ${r} 提交`,o=`banner-wrong`,n.inWrongBook&&(s=`<span class="result-tag-badge tag-wrong">已加入错题本</span>`)):n.result===`correct`?n.inWrongBook?c=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-action-text">这题还在错题本里，最近一次答对了</span>
              <button
                type="button"
                class="btn-remove-wrong-banner active-press"
                data-testid="remove-wrong"
                id="q-remove-wrong-btn"
              >
                <span>移出错题本</span>
              </button>
            </div>
          `:m.justRemovedWrong&&(c=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出错题本 ✓</span>
            </div>
          `):n.result===`ungraded`&&(e=J,t=`已提交（未判分）`,i=`这题的答案还没编写 · ${r} 提交`,o=`banner-ungraded`),b=`
        <section class="result-banner ${o}" data-testid="result-banner" data-result="${n.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${e}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${t}</h2>
              <p class="result-sub">${i}</p>
            </div>
            ${s?`<div class="result-tag-wrap">${s}</div>`:``}
          </div>
          ${c}
        </section>
      `}let x=``;if(r&&n){let e=Ne(a.explanation);x=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${de()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${e}
          </div>
        </section>
      `}let S=``;a.animationId!=null&&r&&(S=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let C=``;if(m.isRedoing){let e=D(a.id);if(e){let t=e.result===`correct`?`答对`:e.result===`wrong`?`答错`:`已提交`,n=Y(e.submittedAt);C=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${t}（选 ${e.choice} · ${n}）· 提交前离开不会改变成绩</span>
          </div>
        `}}let w=s.questions.map((e,t)=>{let n=t+1,r=e.id===a.id,i=D(e.id),o=i?.result===`correct`,s=i?.result===`wrong`,c=`switcher-unanswered`,l=`<span>${n}</span>`;return o?(c=`switcher-correct`,l=L()):s&&(c=`switcher-wrong`,l=ue()),r&&(c+=` switcher-current`),`
          <button
            type="button"
            class="q-switch-pill ${c} active-press"
            data-testid="q-switch-${n}"
            data-qid="${e.id}"
            title="第 ${n} 题"
          >
            ${l}
          </button>
        `}).join(``),T=r?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${pe()}
          <span>重做</span>
        </button>
      `:``,O=`
      <button
        type="button"
        class="btn-nav-prev active-press ${v?`btn-disabled`:``}"
        data-testid="prev"
        id="q-prev-btn"
        ${v?`disabled`:``}
      >
        <span>‹ 上一题</span>
      </button>
    `,j=``;if(r)j=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${O}
            ${T}
            
      <button
        type="button"
        class="btn-next-main active-press"
        data-testid="next"
        id="q-next-btn"
      >
        <span>下一题 ›</span>
      </button>
    
          </div>
        </div>
      `;else{let e=!!m.selectedChoice;j=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${O}
            <button
              type="button"
              class="btn-submit-main active-press ${e?``:`btn-disabled`}"
              data-testid="submit"
              id="q-submit-btn"
              ${e?``:`disabled`}
            >
              <span>${e?`提交答案`:`提交`}</span>
            </button>
            
      <button
        type="button"
        class="btn-nav-next active-press"
        data-testid="next"
        id="q-next-btn"
      >
        <span>下一题 ›</span>
      </button>
    
          </div>
        </div>
      `}e.innerHTML=`
      <div class="page-wrapper page-question">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${le()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${s.name} · 第 ${c+1}/${l} 题</span>
          <div class="w-9 h-9"></div>
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-source-badge" data-testid="q-source">
            <span class="status-dot-green"></span>
            <span>${o}</span>
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${w}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${C}

          <!-- 4. Result Banner (if submitted) -->
          ${b}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${a.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${a.code?je(a.code):``}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${y}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${x}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${S}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${j}
      </div>
    `,document.getElementById(`q-back-btn`)?.addEventListener(`click`,()=>{_(i)}),r?(document.getElementById(`q-redo-btn`)?.addEventListener(`click`,()=>{m.isRedoing=!0,m.selectedChoice=null,m.justRemovedWrong=!1,h()}),document.getElementById(`q-remove-wrong-btn`)?.addEventListener(`click`,()=>{A(a.id),m.justRemovedWrong=!0,h()})):(e.querySelectorAll(`.option-item`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-key`);t&&(m.selectedChoice=t,h())})}),document.getElementById(`q-submit-btn`)?.addEventListener(`click`,()=>{m.selectedChoice&&(k(a,m.selectedChoice),m.isRedoing=!1,m.justRemovedWrong=!1,h())})),document.getElementById(`q-prev-btn`)?.addEventListener(`click`,()=>{u&&_(`#/q/${u}?from=${m.from}`)}),document.getElementById(`q-next-btn`)?.addEventListener(`click`,()=>{p?_(`#/q/${p}?from=${m.from}`):(m.showEndCard=!0,h())}),e.querySelectorAll(`.q-switch-pill`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-qid`);t&&t!==a.id&&_(`#/q/${t}?from=${m.from}`)})});let M=e.querySelector(`.q-switcher-group`),N=e.querySelector(`.switcher-current`);if(M&&N){let e=N.getBoundingClientRect().left-M.getBoundingClientRect().left,t=M.scrollLeft+e-(M.clientWidth-N.offsetWidth)/2;M.scrollLeft=Math.max(0,t)}}h()}var Z=document.getElementById(`app`),Q=[];function $(){let{path:e}=v();e===`/`||e===``?Z.innerHTML=be(Q):e===`/topics`?Z.innerHTML=Se(Q):e===`/wrong`?Z.innerHTML=Oe(Q,$):e===`/me`&&(Z.innerHTML=ke(Q,$))}async function Fe(){try{Q=await u()}catch{Z.innerHTML=`
      <div class="page-wrapper select-none">
        <div class="card paper-card text-center" style="margin-top: 40px; padding: 32px 20px;">
          <h2 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">题库加载失败</h2>
          <p style="font-size: 13px; color: var(--color-secondary); margin-bottom: 20px;">
            网络暂时不可用或题库文件丢失，请点击下方按钮重试。
          </p>
          <button type="button" id="retry-load-btn" class="btn-primary active-press">
            <span>重试</span>
          </button>
        </div>
      </div>
    `,document.getElementById(`retry-load-btn`)?.addEventListener(`click`,()=>{Fe()});return}h(`/`,()=>{Z.innerHTML=be(Q)}),h(`/topics`,()=>{Z.innerHTML=Se(Q)}),h(`/wrong`,()=>{Z.innerHTML=Oe(Q,$)}),h(`/me`,()=>{Z.innerHTML=ke(Q,$)}),h(`/q/:id`,(e,t)=>{let n=e.id,r=t.from||`topic`;Pe(Z,Q,n,r)}),g(()=>{_(`#/`)}),w(()=>{let{path:e}=v();(e===`/`||e===`/topics`||e===`/wrong`||e===`/me`)&&$()});let e=()=>{let{path:e}=v();(e===`/`||e===``)&&$()};document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&e()}),window.addEventListener(`focus`,e),b()}Fe();