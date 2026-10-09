(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const u of i.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();let Re=null;async function rn(e=!1){if(Re&&!e)return Re;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return Re=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function pe(e){const n=new Map;for(const o of e)n.has(o.topic)||n.set(o.topic,[]),n.get(o.topic).push(o);const t=[];let s=0;for(const[o,i]of n.entries())t.push({name:o,index:s,questions:i}),s++;return t}function Oe(e,n){const t=pe(e);for(const s of t){const o=s.questions.findIndex(i=>i.id===n);if(o!==-1)return{topic:s,indexInTopic:o}}return null}const Dt=[];let jt=()=>{};function Ee(e,n){const t=[],s=e.replace(/:([a-zA-Z0-9_]+)/g,(i,u)=>(t.push(u),"([^/?#]+)")).replace(/\//g,"\\/"),o=new RegExp(`^${s}$`);Dt.push({regex:o,paramNames:t,handler:n})}function on(e){jt=e}function ue(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function te(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?Ue():window.location.hash=n}function Be(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),s=n.startsWith("/")?n:"/"+n,o={};return t&&new URLSearchParams(t).forEach((u,c)=>{o[c]=u}),{path:s,query:o}}function Ue(){ue();const{path:e,query:n}=Be();for(const t of Dt){const s=e.match(t.regex);if(s){const o={};t.paramNames.forEach((i,u)=>{o[i]=s[u+1]?decodeURIComponent(s[u+1]):""}),t.handler(o,n);return}}jt({},n)}function cn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",Ue),Ue()}const Je="pydrill.v1.records",Xe="pydrill.v1.last",ze=new Set;function ln(e){return ze.add(e),()=>{ze.delete(e)}}function Wt(){for(const e of ze)try{e()}catch(n){console.error("Error in store listener:",n)}}function Q(){try{const e=localStorage.getItem(Je);if(!e)return{};const n=JSON.parse(e);return typeof n!="object"||n===null?{}:n}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function $e(e){return Q()[e]}function Ne(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function Ot(e){try{localStorage.setItem(Je,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}Wt()}function dn(e,n){const t=Q(),s=t[e.id],o=!!(s!=null&&s.inWrongBook);let i,u=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(i="correct",u=o):(i="wrong",u=!0):(i="ungraded",u=!1);const y=o&&(i==="correct"||i==="wrong"),x={choice:n,result:i,submittedAt:Date.now(),inWrongBook:u,wrongBookReviewed:y};if(i==="wrong")x.lastWrongChoice=n,x.lastWrongAt=x.submittedAt;else{const P=Ne(s);P&&(x.lastWrongChoice=P,typeof(s==null?void 0:s.lastWrongAt)=="number"?x.lastWrongAt=s.lastWrongAt:(s==null?void 0:s.result)==="wrong"&&(x.lastWrongAt=s.submittedAt))}return t[e.id]=x,Ot(t),x}function kt(e){const n=Q();n[e]&&(n[e]={...n[e],inWrongBook:!1},Ot(n))}function un(){try{localStorage.removeItem(Je)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(Xe)}catch(e){console.error("Failed to clear last position:",e)}Wt()}function pn(e){try{const n=localStorage.getItem(Xe);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const s=t.id,o=t.at;return typeof s!="string"||s.length===0||typeof o!="number"||!Number.isFinite(o)||!e.some(i=>i.id===s)?null:{id:s,at:o}}catch(n){return console.warn("Failed to parse last position:",n),null}}function gn(e){try{localStorage.setItem(Xe,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function fn(e){var s;const n=Q();let t=0;for(const o of e)((s=n[o.id])==null?void 0:s.result)==="correct"&&t++;return t}function Ut(e){const n=Q();return e.filter(t=>{var s;return!!((s=n[t.id])!=null&&s.inWrongBook)})}function hn(e){const n=Q(),t=e.length;let s=0;for(const o of e)n[o.id]&&s++;return{done:s,total:t}}function mn(e){const n=Q();let t=0,s=0,o=0;for(const i of e){const u=n[i.id];u&&(t++,u.result==="correct"&&s++,u.inWrongBook&&o++)}return{submittedCount:t,correctCount:s,wrongBookCount:o}}const vn="pydrill.devPageIds";function Ve(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function wn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:Ve(new URLSearchParams(e.slice(n+1)).get("dev"))}function bn(){const e=window.location.hostname,n=window.location.pathname||"";return n.includes("/preview/")||n.endsWith("/preview")?!0:e==="localhost"||e==="127.0.0.1"||e==="::1"||e==="[::1]"||e.endsWith(".local")}function yn(){const e=wn();if(e!==null)return e;const n=Ve(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=Ve(localStorage.getItem(vn));if(t!==null)return t}catch{}return bn()}function xn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:null}function At(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function Ge(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!yn()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const s=document.createElement("div");s.className="dev-page-id",s.setAttribute("data-testid","dev-page-id"),s.setAttribute("data-page",String(e)),s.setAttribute("aria-hidden","true"),s.textContent=t,document.body.appendChild(s)}function $n(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),s=n.getMonth(),o=n.getDate();return(Math.floor(Date.UTC(t,s,o)/864e5)%e+e)%e}function kn(e,n=new Date){if(e.length===0)return;const t=$n(e.length,n);return e[t]}function An(e,n){const t=new Date(e),s=new Date(n);return t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()}function Cn(e,n=new Date){const t=$e(e.id),s=n.getTime();return!t||!An(t.submittedAt,s)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天答错",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Fn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Tn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function En(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Sn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Ct(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function Ln(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function qn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function zt(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function Bn(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function Mn(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function Ft(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function Qe(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Tt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function Nt(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function Vt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function Se(e,n=0){if(e==="none")return"";const t=e==="home",s=e==="topics",o=e==="wrong",i=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${Fn(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${s?"active":""}" data-testid="tab-topics">
          ${Tn(s)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${o?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${En(o)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">错题本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${i?"active":""}" data-testid="tab-me">
          ${Sn(i)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const In=""+new URL("hero-tree-BQtvnSiX.svg",import.meta.url).href,Gt=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,_n=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,Hn=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,Pn=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function De(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Rn(e){const n=Q(),s=Ut(e).length,o=pe(e),i=o.length,u=kn(e),c=u?Cn(u):{statusText:"今天还没做",isCompletedToday:!1},y=u?Oe(e,u.id):null,x=y?y.indexInTopic+1:1,P=y?y.topic.questions.length:2,d=u?`${u.topic} · 第 ${x}/${P} 题`:"今日一题",M=new Date,D=`${M.getMonth()+1}月${M.getDate()}日`,H=u!=null&&u.code?u.code.split(`
`).slice(0,3).join(`
`):"",T=o[0],E=(T==null?void 0:T.name)||"",q=T&&T.questions.length>0?T.questions.find(f=>!n[f.id])||T.questions[0]:void 0,r=pn(e),a=r?e.find(f=>f.id===r.id):void 0,l=a?Oe(e,a.id):null,p=a!=null&&a.code?(a.code.split(`
`)[0]||"").trim():"",g=a&&l?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Tt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${De(l.topic.name)} · 第 ${l.indexInTopic+1}/${l.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${a.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${p?`<div class="continue-code"><code>${De(p)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Tt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${De(E)}」开始吧，一次一小步。</p>
          ${q?`<a href="#/q/${q.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${In}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${Bn()}</span>
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
        <a href="#/q/${(u==null?void 0:u.id)||(q==null?void 0:q.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${_n}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${c.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${Hn}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${i} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${Pn}" alt="错题本" class="entry-icon-direct" />
          <span class="entry-card-title">错题本</span>
          <span class="entry-card-sub">${s>0?`${s} 题待温习`:"错题本空"}</span>
        </a>
      </section>

      ${g}

      ${u?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${D}</span>
              <h3 class="daily-q-title">${d}</h3>
            </div>
            <span class="chip-status ${c.result==="correct"?"chip-green":c.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${c.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${u.stem}</p>

          ${H?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${H}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${u.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${c.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${Gt}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Se("home",s)}
  `}const Dn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},jn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Wn(e){const n=pe(e),t=Q(),s=fn(e),o=Ut(e).length,i=n.map((u,c)=>{const{done:y,total:x}=hn(u.questions),P=x>0?y/x*100:0,d=u.questions.find(H=>!t[H.id])||u.questions[0],M=Dn[u.name]??jn[u.name],D=c%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${c}"
          onclick="window.location.hash = '#/q/${d.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${Vt(u.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${u.name}</h2>
                <span class="topic-index-badge">#${String(c+1).padStart(2,"0")}</span>
              </div>
              ${M?`<p class="topic-sub" data-testid="topic-sub-${c}">${M}</p>`:""}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${c}">${y} / ${x}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            <div class="topic-long-fill tone-${D}" data-testid="topic-bar-${c}" style="width: ${P}%;"></div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${Qe()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已做对 ${s} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Gt}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${i}
      </section>
    </div>

    ${Se("topics",o)}
  `}const On=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href,Ye=""+new URL("mascot-sad-Dg1R60AV.svg",import.meta.url).href;function Un(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function zn(e,n){const t=Q(),s=pe(e),o=e.filter(y=>{var x;return!!((x=t[y.id])!=null&&x.inWrongBook)}),i=o.length;if(i===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">错题本</h1>
              <span class="title-doodle-leaf">${Qe()}</span>
            </div>
            <p class="section-desc">答错的题会自动收进这里</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Ye}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="错题本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${On}" alt="空白小本子" class="wrong-empty-img" />
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

      ${Se("wrong",0)}
    `;let u=o[0].id;for(const y of s){const x=y.questions.find(P=>{var d;return!!((d=t[P.id])!=null&&d.inWrongBook)});if(x){u=x.id;break}}const c=s.map(y=>{const x=y.questions.filter(D=>{var H;return!!((H=t[D.id])!=null&&H.inWrongBook)});if(x.length===0)return"";const d=x.filter(D=>{var H;return!!((H=t[D.id])!=null&&H.wrongBookReviewed)}).length/x.length*100,M=String(y.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${y.index}"
          href="#/q/${x[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${Vt(y.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${Un(y.name)}</span>
              <span class="wrong-topic-index">#${M}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${y.index}">${x.length}</span> 道错题待温习
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" data-testid="wrong-topic-bar-${y.index}" style="width: ${d}%;"></div>
            </div>
          </div>
          <span class="wrong-topic-chevron" aria-hidden="true">›</span>
        </a>
      `}).join("");return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">错题本</h1>
            <span class="title-doodle-leaf">${Qe()}</span>
          </div>
          <p class="section-desc">答错的题会自动收进这里</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Ye}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <div class="wrong-summary-count-row">
          <span>现在有</span>
          <span class="wrong-summary-count-num" data-testid="wrong-count">${i}</span>
          <span>题待温习</span>
        </div>
        <a href="#/q/${u}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有错题的知识点">
        ${c}
      </section>
    </div>

    ${Se("wrong",i)}
  `}const qe=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function Nn(e,n){const{submittedCount:t,correctCount:s,wrongBookCount:o}=mn(e);return typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const i=document.getElementById("clear-confirm-modal");i&&i.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const i=document.getElementById("clear-confirm-modal");i&&i.classList.add("hidden")},window.__pydrill_confirmClear=()=>{un();const i=document.getElementById("clear-confirm-modal");i&&i.classList.add("hidden"),n&&n()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${qe}" alt="小芽啾" class="me-avatar-img" />
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
            <span class="stat-col-num">${t}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-col-label label-orange">做对</span>
            <span class="stat-col-num num-orange">${s}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-col-label">错题本</span>
            <span class="stat-col-num num-brown">${o}</span>
          </div>
        </div>

        <div class="stats-motto-row">
          <span>${Nt(16)} 慢慢学，每一题都是进步的脚步</span>
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
              ${Ft()}
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
            ${Ft()}
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

    ${Se("me",o)}
  `}const Ze=globalThis;Ze.Prism=Ze.Prism??{};Ze.Prism.manual=!0;var Et=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Vn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var je={exports:{}},St;function Gn(){return St||(St=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(s){var o=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,i=0,u={},c={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function r(a){return a instanceof y?new y(a.type,r(a.content),a.alias):Array.isArray(a)?a.map(r):a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(r){return Object.prototype.toString.call(r).slice(8,-1)},objId:function(r){return r.__id||Object.defineProperty(r,"__id",{value:++i}),r.__id},clone:function r(a,l){l=l||{};var p,g;switch(c.util.type(a)){case"Object":if(g=c.util.objId(a),l[g])return l[g];p={},l[g]=p;for(var f in a)a.hasOwnProperty(f)&&(p[f]=r(a[f],l));return p;case"Array":return g=c.util.objId(a),l[g]?l[g]:(p=[],l[g]=p,a.forEach(function(k,v){p[v]=r(k,l)}),p);default:return a}},getLanguage:function(r){for(;r;){var a=o.exec(r.className);if(a)return a[1].toLowerCase();r=r.parentElement}return"none"},setLanguage:function(r,a){r.className=r.className.replace(RegExp(o,"gi"),""),r.classList.add("language-"+a)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(p){var r=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(p.stack)||[])[1];if(r){var a=document.getElementsByTagName("script");for(var l in a)if(a[l].src==r)return a[l]}return null}},isActive:function(r,a,l){for(var p="no-"+a;r;){var g=r.classList;if(g.contains(a))return!0;if(g.contains(p))return!1;r=r.parentElement}return!!l}},languages:{plain:u,plaintext:u,text:u,txt:u,extend:function(r,a){var l=c.util.clone(c.languages[r]);for(var p in a)l[p]=a[p];return l},insertBefore:function(r,a,l,p){p=p||c.languages;var g=p[r],f={};for(var k in g)if(g.hasOwnProperty(k)){if(k==a)for(var v in l)l.hasOwnProperty(v)&&(f[v]=l[v]);l.hasOwnProperty(k)||(f[k]=g[k])}var I=p[r];return p[r]=f,c.languages.DFS(c.languages,function(W,re){re===I&&W!=r&&(this[W]=f)}),f},DFS:function r(a,l,p,g){g=g||{};var f=c.util.objId;for(var k in a)if(a.hasOwnProperty(k)){l.call(a,k,a[k],p||k);var v=a[k],I=c.util.type(v);I==="Object"&&!g[f(v)]?(g[f(v)]=!0,r(v,l,null,g)):I==="Array"&&!g[f(v)]&&(g[f(v)]=!0,r(v,l,k,g))}}},plugins:{},highlightAll:function(r,a){c.highlightAllUnder(document,r,a)},highlightAllUnder:function(r,a,l){var p={callback:l,container:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};c.hooks.run("before-highlightall",p),p.elements=Array.prototype.slice.apply(p.container.querySelectorAll(p.selector)),c.hooks.run("before-all-elements-highlight",p);for(var g=0,f;f=p.elements[g++];)c.highlightElement(f,a===!0,p.callback)},highlightElement:function(r,a,l){var p=c.util.getLanguage(r),g=c.languages[p];c.util.setLanguage(r,p);var f=r.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&c.util.setLanguage(f,p);var k=r.textContent,v={element:r,language:p,grammar:g,code:k};function I(re){v.highlightedCode=re,c.hooks.run("before-insert",v),v.element.innerHTML=v.highlightedCode,c.hooks.run("after-highlight",v),c.hooks.run("complete",v),l&&l.call(v.element)}if(c.hooks.run("before-sanity-check",v),f=v.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!v.code){c.hooks.run("complete",v),l&&l.call(v.element);return}if(c.hooks.run("before-highlight",v),!v.grammar){I(c.util.encode(v.code));return}if(a&&s.Worker){var W=new Worker(c.filename);W.onmessage=function(re){I(re.data)},W.postMessage(JSON.stringify({language:v.language,code:v.code,immediateClose:!0}))}else I(c.highlight(v.code,v.grammar,v.language))},highlight:function(r,a,l){var p={code:r,grammar:a,language:l};if(c.hooks.run("before-tokenize",p),!p.grammar)throw new Error('The language "'+p.language+'" has no grammar.');return p.tokens=c.tokenize(p.code,p.grammar),c.hooks.run("after-tokenize",p),y.stringify(c.util.encode(p.tokens),p.language)},tokenize:function(r,a){var l=a.rest;if(l){for(var p in l)a[p]=l[p];delete a.rest}var g=new d;return M(g,g.head,r),P(r,g,a,g.head,0),H(g)},hooks:{all:{},add:function(r,a){var l=c.hooks.all;l[r]=l[r]||[],l[r].push(a)},run:function(r,a){var l=c.hooks.all[r];if(!(!l||!l.length))for(var p=0,g;g=l[p++];)g(a)}},Token:y};s.Prism=c;function y(r,a,l,p){this.type=r,this.content=a,this.alias=l,this.length=(p||"").length|0}y.stringify=function r(a,l){if(typeof a=="string")return a;if(Array.isArray(a)){var p="";return a.forEach(function(I){p+=r(I,l)}),p}var g={type:a.type,content:r(a.content,l),tag:"span",classes:["token",a.type],attributes:{},language:l},f=a.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(g.classes,f):g.classes.push(f)),c.hooks.run("wrap",g);var k="";for(var v in g.attributes)k+=" "+v+'="'+(g.attributes[v]||"").replace(/"/g,"&quot;")+'"';return"<"+g.tag+' class="'+g.classes.join(" ")+'"'+k+">"+g.content+"</"+g.tag+">"};function x(r,a,l,p){r.lastIndex=a;var g=r.exec(l);if(g&&p&&g[1]){var f=g[1].length;g.index+=f,g[0]=g[0].slice(f)}return g}function P(r,a,l,p,g,f){for(var k in l)if(!(!l.hasOwnProperty(k)||!l[k])){var v=l[k];v=Array.isArray(v)?v:[v];for(var I=0;I<v.length;++I){if(f&&f.cause==k+","+I)return;var W=v[I],re=W.inside,Ce=!!W.lookbehind,le=!!W.greedy,h=W.alias;if(le&&!W.pattern.global){var A=W.pattern.toString().match(/[imsuy]*$/)[0];W.pattern=RegExp(W.pattern.source,A+"g")}for(var O=W.pattern||W,$=p.next,L=g;$!==a.tail&&!(f&&L>=f.reach);L+=$.value.length,$=$.next){var b=$.value;if(a.length>r.length)return;if(!(b instanceof y)){var m=1,F;if(le){if(F=x(O,L,r,Ce),!F||F.index>=r.length)break;var ee=F.index,U=F.index+F[0].length,_=L;for(_+=$.value.length;ee>=_;)$=$.next,_+=$.value.length;if(_-=$.value.length,L=_,$.value instanceof y)continue;for(var z=$;z!==a.tail&&(_<U||typeof z.value=="string");z=z.next)m++,_+=z.value.length;m--,b=r.slice(L,_),F.index-=L}else if(F=x(O,0,b,Ce),!F)continue;var ee=F.index,J=F[0],X=b.slice(0,ee),j=b.slice(ee+J.length),N=L+b.length;f&&N>f.reach&&(f.reach=N);var se=$.prev;X&&(se=M(a,se,X),L+=X.length),D(a,se,m);var Me=new y(k,re?c.tokenize(J,re):J,h,J);if($=M(a,se,Me),j&&M(a,$,j),m>1){var ve={cause:k+","+I,reach:N};P(r,a,l,$.prev,L,ve),f&&ve.reach>f.reach&&(f.reach=ve.reach)}}}}}}function d(){var r={value:null,prev:null,next:null},a={value:null,prev:r,next:null};r.next=a,this.head=r,this.tail=a,this.length=0}function M(r,a,l){var p=a.next,g={value:l,prev:a,next:p};return a.next=g,p.prev=g,r.length++,g}function D(r,a,l){for(var p=a.next,g=0;g<l&&p!==r.tail;g++)p=p.next;a.next=p,p.prev=a,r.length-=g}function H(r){for(var a=[],l=r.head.next;l!==r.tail;)a.push(l.value),l=l.next;return a}if(!s.document)return s.addEventListener&&(c.disableWorkerMessageHandler||s.addEventListener("message",function(r){var a=JSON.parse(r.data),l=a.language,p=a.code,g=a.immediateClose;s.postMessage(c.highlight(p,c.languages[l],l)),g&&s.close()},!1)),c;var T=c.util.currentScript();T&&(c.filename=T.src,T.hasAttribute("data-manual")&&(c.manual=!0));function E(){c.manual||c.highlightAll()}if(!c.manual){var q=document.readyState;q==="loading"||q==="interactive"&&T&&T.defer?document.addEventListener("DOMContentLoaded",E):window.requestAnimationFrame?window.requestAnimationFrame(E):window.setTimeout(E,16)}return c})(n);e.exports&&(e.exports=t),typeof Et<"u"&&(Et.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(o,i){var u={};u["language-"+i]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[i]},u.cdata=/^<!\[CDATA\[|\]\]>$/i;var c={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:u}};c["language-"+i]={pattern:/[\s\S]+/,inside:t.languages[i]};var y={};y[o]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return o}),"i"),lookbehind:!0,greedy:!0,inside:c},t.languages.insertBefore("markup","cdata",y)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(s,o){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[o,"language-"+o],inside:t.languages[o]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(s){var o=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+o.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+o.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+o.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+o.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:o,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var i=s.languages.markup;i&&(i.tag.addInlined("style","css"),i.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",o=function(T,E){return"✖ Error "+T+" while fetching file: "+E},i="✖ Error: File does not exist or is empty",u={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},c="data-src-status",y="loading",x="loaded",P="failed",d="pre[data-src]:not(["+c+'="'+x+'"]):not(['+c+'="'+y+'"])';function M(T,E,q){var r=new XMLHttpRequest;r.open("GET",T,!0),r.onreadystatechange=function(){r.readyState==4&&(r.status<400&&r.responseText?E(r.responseText):r.status>=400?q(o(r.status,r.statusText)):q(i))},r.send(null)}function D(T){var E=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(T||"");if(E){var q=Number(E[1]),r=E[2],a=E[3];return r?a?[q,Number(a)]:[q,void 0]:[q,q]}}t.hooks.add("before-highlightall",function(T){T.selector+=", "+d}),t.hooks.add("before-sanity-check",function(T){var E=T.element;if(E.matches(d)){T.code="",E.setAttribute(c,y);var q=E.appendChild(document.createElement("CODE"));q.textContent=s;var r=E.getAttribute("data-src"),a=T.language;if(a==="none"){var l=(/\.(\w+)$/.exec(r)||[,"none"])[1];a=u[l]||l}t.util.setLanguage(q,a),t.util.setLanguage(E,a);var p=t.plugins.autoloader;p&&p.loadLanguages(a),M(r,function(g){E.setAttribute(c,x);var f=D(E.getAttribute("data-range"));if(f){var k=g.split(/\r\n?|\n/g),v=f[0],I=f[1]==null?k.length:f[1];v<0&&(v+=k.length),v=Math.max(0,Math.min(v-1,k.length)),I<0&&(I+=k.length),I=Math.max(0,Math.min(I,k.length)),g=k.slice(v,I).join(`
`),E.hasAttribute("data-start")||E.setAttribute("data-start",String(v+1))}q.textContent=g,t.highlightElement(q)},function(g){E.setAttribute(c,P),q.textContent=g})}}),t.plugins.fileHighlight={highlight:function(E){for(var q=(E||document).querySelectorAll(d),r=0,a;a=q[r++];)t.highlightElement(a)}};var H=!1;t.fileHighlight=function(){H||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),H=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(je)),je.exports}var Qn=Gn();const Lt=Vn(Qn);var qt={},Bt;function Yn(){return Bt||(Bt=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),qt}Yn();function Zn(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((o,i)=>{const u=i+1,y=Lt.highlight(o,Lt.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${u}</span><span class="code-line-content">${y}</span></div>`}).join("")}</code></pre></div>`}function Mt(e){const n=new Date(e),t=n.getMonth()+1,s=n.getDate(),o=String(n.getHours()).padStart(2,"0"),i=String(n.getMinutes()).padStart(2,"0");return`${t}月${s}日 ${o}:${i}`}function K(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const It=200,_t=1600,Ht=300,Kn=1800;let me=0,ce=0,Pt=!1;function Jn(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ke(){me+=1,ce&&(window.clearTimeout(ce),ce=0),document.querySelectorAll('[data-testid="finish-tip"]').forEach(e=>{e instanceof HTMLElement&&e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function Xn(){Pt||(Pt=!0,window.addEventListener("hashchange",Ke))}function es(e,n){const t=n.getBoundingClientRect(),s=t.left+t.width/2,o=e.offsetWidth,i=e.offsetHeight,u=1,c=6,y=36,x=8,P=document.documentElement.clientWidth;let d=s+u+y+c,M=d-o;M<x&&(M=x,d=M+o),d>P-x&&(d=P-x,M=Math.max(x,d-o),d=M+o);let D=d-u-c-s;const H=12,T=Math.max(H,o-u*2-12-H);D<H&&(D=H),D>T&&(D=T),e.style.right=`${Math.round(P-d)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-10-i)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(D)}px`)}function ts(e,n){if(n!==me||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(o=>o.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:Ht,easing:"ease",fill:"forwards"}),s=()=>{n===me&&e.remove()};t.onfinish=s,window.setTimeout(s,Ht+60)}function We(e,n,t,s){ce&&window.clearTimeout(ce),ce=window.setTimeout(()=>{if(ce=0,!(n!==me||!e.isConnected)){if(!s){e.remove();return}ts(e,n)}},t)}function ns(){const e=document.getElementById("q-next-btn");if(!e)return;me+=1;const n=me;ce&&(window.clearTimeout(ce),ce=0);const t=Jn();let s=document.querySelector('[data-testid="finish-tip"]');const o=!!s;if(s?document.querySelectorAll('[data-testid="finish-tip"]').forEach(u=>{u!==s&&u.remove()}):(s=document.createElement("div"),s.className="finish-tip",s.setAttribute("data-testid","finish-tip"),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.innerHTML='<span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟</span><span class="finish-tip-arrow"></span>',document.body.appendChild(s)),es(s,e),t){s.getAnimations().forEach(u=>u.cancel()),s.style.opacity="1",s.style.transform="none",We(s,n,Kn,!1);return}if(o){s.getAnimations().forEach(u=>u.cancel()),s.style.opacity="1",s.style.transform="translateY(0)",We(s,n,_t,!0);return}const i=s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:It,easing:"ease-out",fill:"forwards"});i.onfinish=()=>{n!==me||!s.isConnected||(s.style.opacity="1",s.style.transform="translateY(0)")},We(s,n,It+_t,!0)}function Rt(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${K(t)}</code>`)}function ss(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let s=e,o="";n!==-1&&(s=e.slice(0,n).trim(),o=e.slice(n+t).trim(),o=o.replace(/^[：:\s]+/,""));const i=s.split(/\n+/).map(c=>c.trim()).filter(Boolean).map(c=>`<p class="explanation-p">${Rt(c)}</p>`).join("");let u="";if(o){const c=Rt(o);u=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${zt(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${c}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${i}
      ${u}
    </div>
  `}function as(e,n,t,s="topic"){Xn(),Ke(),ue();const o=s==="daily"||s==="wrong"?s:"topic",i=n.find(h=>h.id===t);if(!i){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Ge(At(o,!1));return}gn(i.id);const u=Oe(n,i.id),c=(u==null?void 0:u.topic)||pe(n)[0],y=u?u.indexInTopic:0,x=c.questions.length,P=$e(i.id);c.questions.filter(h=>{var A;return!!((A=Q()[h.id])!=null&&A.inWrongBook)}).length;const d={from:o,selectedChoice:o==="wrong"?null:P?P.choice:null,isRedoing:!1,wrongFresh:o==="wrong",showLastTrace:!1,showEndCard:!1,justRemovedWrong:!1},M=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let D=0,H=null,T=!1;const E='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',q='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function r(h){return/Error|Exception/.test(h)}function a(h,A,O,$){return A!=="graded"?O===h?"selected":"idle":i.answer&&h===i.answer?"correct":O===h&&($==null?void 0:$.result)==="wrong"?"wrong":"locked"}function l(h,A,O){const $=h.querySelector(".opt-badge"),L=h.querySelector(".opt-text"),b=h.querySelector(".opt-status");if(!$||!L||!b)return;const m=h.getAttribute("data-error")==="1";h.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),$.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),L.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),h.setAttribute("aria-checked",O?"true":"false"),A==="correct"?h.setAttribute("data-state","correct"):A==="wrong"?h.setAttribute("data-state","wrong"):h.removeAttribute("data-state"),A==="selected"||A==="correct"?(h.classList.add(A==="correct"?"opt-card-correct":"opt-card-selected"),A==="selected"&&h.classList.add("opt-pressable"),$.classList.add(A==="correct"?"opt-badge-correct":"opt-badge-selected"),L.classList.add("opt-text-strong"),b.innerHTML=E):A==="wrong"?(h.classList.add("opt-card-wrong"),$.classList.add("opt-badge-wrong"),L.classList.add("opt-text-strong","opt-text-wrong"),b.innerHTML=q):A==="locked"?(h.classList.add("opt-card-locked"),$.classList.add("opt-badge-default"),m&&L.classList.add("opt-text-error"),b.innerHTML=""):(h.classList.add("opt-card-default","opt-pressable"),$.classList.add("opt-badge-default"),m&&L.classList.add("opt-text-error"),b.innerHTML="")}function p(h,A,O,$){const L=r(h.text),b=["option-item"],m=["opt-badge"],F=["opt-text"];let U="",_="";A==="selected"?(b.push("opt-card-selected","opt-pressable"),m.push("opt-badge-selected"),F.push("opt-text-strong"),U=E):A==="correct"?(b.push("opt-card-correct"),m.push("opt-badge-correct"),F.push("opt-text-strong"),U=E,_='data-state="correct"'):A==="wrong"?(b.push("opt-card-wrong"),m.push("opt-badge-wrong"),F.push("opt-text-strong","opt-text-wrong"),U=q,_='data-state="wrong"'):A==="locked"?(b.push("opt-card-locked"),m.push("opt-badge-default"),L&&F.push("opt-text-error")):(b.push("opt-card-default","opt-pressable"),m.push("opt-badge-default"),L&&F.push("opt-text-error"));const z=(h.hint||"").trim(),ee=$!=="none"&&z?`<div class="opt-hint-clip${$==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${K(h.key)}">${K(z)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${O?"true":"false"}"
            ${_}
            class="${b.join(" ")}"
            data-testid="option-${K(h.key)}"
            data-key="${K(h.key)}"
            data-error="${L?"1":"0"}"
          >
            <span class="${m.join(" ")}">${K(h.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${F.join(" ")}">${K(h.text)}</span>
                <span class="opt-status">${U}</span>
              </div>
              ${ee}
            </div>
          </div>
        `}const g='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',f='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let k=0;function v(){var A;(A=document.getElementById("pydrill-wrong-toast"))==null||A.remove();const h=document.createElement("div");h.id="pydrill-wrong-toast",h.className="wrong-toast",h.setAttribute("role","status"),h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从错题本移出</span>',document.body.appendChild(h),window.setTimeout(()=>{h.remove()},1500)}function I(){const h=e.querySelector("#q-toggle-last");if(!h)return;const A=d.showLastTrace;h.setAttribute("aria-pressed",A?"true":"false");const O=h.querySelector("span");O&&(O.textContent=A?"隐藏上次":"看上次答错");const $=h.querySelector("svg");$&&($.outerHTML=A?f:g)}function W(h,A,O,$){const L=(A.hint||"").trim(),b=h.querySelector(".opt-body");if(!b)return;let m=h.querySelector(".opt-hint-clip");if(O&&L){m||(m=document.createElement("div"),m.className="opt-hint-clip",m.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${K(A.key)}">${K(L)}</p></div>`,b.appendChild(m));const F=m;requestAnimationFrame(()=>{requestAnimationFrame(()=>{$===k&&F.classList.add("is-open")})})}else if(m){m.classList.remove("is-open");const F=m,U=$,_=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{U===k&&F.remove()},_?0:200)}}function re(h){const A=++k,O=$e(i.id),$=Ne(O),L=(i.answer||"").trim();e.querySelectorAll(".option-item").forEach(m=>{const F=m.getAttribute("data-key")||"",U=i.options.find(se=>se.key===F);if(!h){const se=d.selectedChoice===F;l(m,se?"selected":"idle",se),U&&W(m,U,!1,A);return}const _=m.querySelector(".opt-badge"),z=m.querySelector(".opt-text"),ee=m.querySelector(".opt-status");if(!_||!z||!ee)return;const J=m.getAttribute("data-error")==="1",X=!!$&&F===$,j=!!L&&F===L;m.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),_.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),z.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),m.setAttribute("aria-checked","false"),m.removeAttribute("data-state"),X&&!j?(m.classList.add("opt-card-trace-last"),_.classList.add("opt-badge-trace-last"),z.classList.add("opt-text-strong","opt-text-trace-last")):j?(m.classList.add("opt-card-trace-correct"),_.classList.add("opt-badge-trace-correct"),z.classList.add("opt-text-strong","opt-text-trace-correct")):(m.classList.add("opt-card-default","opt-card-trace-dim"),_.classList.add("opt-badge-default"),J&&z.classList.add("opt-text-error"));const N=[];X&&N.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${K(F)}">上次选的 ${K(F)}</span>`),j&&N.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${K(F)}">正确答案 ${K(F)}</span>`),ee.innerHTML=N.length?`<span class="opt-trace-tag-row">${N.join("")}</span>`:"",U&&W(m,U,X||j,A)});const b=e.querySelector("#q-submit-btn");if(b){const m=h||!d.selectedChoice;b.disabled=m,b.classList.toggle("btn-disabled",m)}}function Ce(h){Ge(At(d.from,d.showEndCard)),(h||d.showEndCard)&&ue()}function le(){var ut,pt,gt,ft,ht,mt,vt,wt,bt,yt,xt,$t;Ke();const h=++D,A=H!==i.id;H=i.id;const O=$e(i.id),$=Ne(O).length>0,b=d.isRedoing||d.wrongFresh?void 0:O,m=!!b;m&&(d.showLastTrace=!1);const F=T&&m;T=!1;let U="#/topics";d.from==="daily"&&(U="#/"),d.from==="wrong"&&(U="#/wrong");let _="知识点练习";d.from==="daily"?_="今日一题":d.from==="wrong"&&(_="错题本");let z=null,ee=null,J=!1,X=!1,j=c.questions,N=y;if(d.from==="wrong"){const w=Q();j=c.questions.filter(C=>{var S;return!!((S=w[C.id])!=null&&S.inWrongBook)}),N=j.findIndex(C=>C.id===i.id)}d.from==="daily"?(X=!0,J=!0,j=[i],N=0):N<0?(X=!0,J=!0):(X=N===0,J=N>=j.length-1,X||(z=j[N-1].id),J||(ee=j[N+1].id));const se=Q(),Me=j.length>0&&j.every(w=>!!se[w.id]),ve=J&&!Me,Yt=N>=0?N+1:1,Zt=d.from==="wrong"?Math.max(j.length,1):x,Kt=d.from==="wrong"?`${c.name} · 错题 ${Yt}/${Zt}`:`${c.name} · 第 ${y+1}/${x} 题`;if(d.showEndCard){if(d.from==="daily"){te("#/");return}const w=d.from==="topic",C=Q();let S="",R="",B="#/topics",G="返回知识点列表",oe="",de="";if(w){let ne=0;for(const V of c.questions)((ut=C[V.id])==null?void 0:ut.result)==="correct"&&ne++;S="这个知识点做完了",R=`本组共 ${x} 题 · 你已做对 ${ne}/${x} 题`,B="#/topics",G="返回知识点列表",oe=`
          <div class="end-questions-list">
            ${c.questions.map((V,ae)=>{const ye=ae+1,Z=C[V.id],xe=(Z==null?void 0:Z.result)==="correct",He=(Z==null?void 0:Z.result)==="wrong";let ge="end-chip-gray",fe="· 未做";xe?(ge="end-chip-green",fe="✓ 答对"):He&&(ge="end-chip-red",fe="✗ 答错");const Pe=V.code?V.code.split(`
`)[0].trim():V.stem;return`
              <a href="#/q/${V.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${ye} 题</span>
                  <span class="end-q-code">${K(Pe)}</span>
                </div>
                <span class="end-chip ${ge}">${fe}</span>
              </a>
            `}).join("")}
          </div>
        `;const Y=pe(n),we=Y.findIndex(V=>V.name===c.name),be=we!==-1&&we<Y.length-1?Y[we+1]:null;be&&be.questions.length>0&&(de=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{const ne=c.questions.filter(V=>{var ae;return!!((ae=C[V.id])!=null&&ae.inWrongBook)}),ie=ne.length;S="错题本这一轮看完了",R=`好样的！这一轮看了 ${ie} 题，多练几遍思路更清晰。`,B="#/wrong",G="返回错题本",ie>0?oe=`
            <div class="end-questions-list">
              ${ne.map((ae,ye)=>{const Z=C[ae.id],xe=(Z==null?void 0:Z.result)==="correct",He=(Z==null?void 0:Z.result)==="wrong";let ge="end-chip-gray",fe="· 未做";xe?(ge="end-chip-green",fe="✓ 答对"):He&&(ge="end-chip-red",fe="✗ 答错");const Pe=ae.code?ae.code.split(`
`)[0].trim():ae.stem;return`
                <a href="#/q/${ae.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">错题 ${ye+1}/${ie}</span>
                    <span class="end-q-code">${K(Pe)}</span>
                  </div>
                  <span class="end-chip ${ge}">${fe}</span>
                </a>
              `}).join("")}
            </div>
          `:oe=`
            <div class="end-empty-row">
              ${Nt(18)}
              <span>错题本已经清空了</span>
            </div>
          `;const Y=pe(n),we=Y.findIndex(V=>V.name===c.name);let be=null;if(we!==-1)for(let V=1;V<Y.length;V++){const ye=Y[(we+V)%Y.length].questions.find(Z=>{var xe;return!!((xe=C[Z.id])!=null&&xe.inWrongBook)});if(ye){be=ye.id;break}}be&&(de=`
            <a
              href="#/q/${be}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const Te=d.from==="wrong"?"错题本 · 完成":`${c.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${M}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${Ct()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${Te}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${qe}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${S}</h2>
              <p class="end-sub">${R}</p>

              ${oe}

              <div class="end-action-wrap flex-col-gap">
                <button
                  type="button"
                  class="btn-primary w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${G}
                </button>
                ${de}
              </div>
            </div>
          </main>
        </div>
      `,(pt=document.getElementById("q-back-btn"))==null||pt.addEventListener("click",()=>{te(U)}),(gt=document.getElementById("end-leave-btn"))==null||gt.addEventListener("click",()=>{te(B)}),(ft=document.getElementById("end-next-topic-btn"))==null||ft.addEventListener("click",()=>{const ne=pe(n),ie=ne.findIndex(Y=>Y.name===c.name);if(ie!==-1&&ie<ne.length-1){const Y=ne[ie+1];te(`#/q/${Y.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(ne=>{ne.addEventListener("click",ie=>{const Y=ne.getAttribute("href");Y&&(ie.preventDefault(),te(Y))})}),Ce(A);return}const Le=m?F?"pending":"graded":"answering",Jt=Le==="answering"?"none":Le==="pending"?"closed":"open",et=Le==="graded"?(b==null?void 0:b.choice)??null:d.selectedChoice,Xt=i.options.map(w=>p(w,a(w.key,Le,et,b),et===w.key,Jt)).join("");let tt="";if(m&&b){let w=qe,C="答对了！";const S=Mt(b.submittedAt);let R=`你选了 ${b.choice} · 正确答案 ${i.answer} · ${S} 提交`,B="banner-correct",G="",oe="";b.result==="wrong"?(w=Ye,C="答错了",R=`你选了 ${b.choice} · 正确答案是 ${i.answer} · ${S} 提交`,B="banner-wrong",b.inWrongBook&&(G='<span class="result-tag-badge tag-wrong">已加入错题本</span>')):b.result==="correct"?b.inWrongBook&&d.from!=="wrong"?oe=`
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
          `:d.justRemovedWrong&&d.from!=="wrong"&&(oe=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出错题本 ✓</span>
            </div>
          `):b.result==="ungraded"&&(w=qe,C="已提交（未判分）",R=`这题的答案还没编写 · ${S} 提交`,B="banner-ungraded"),tt=`
        <section class="result-banner ${B}" data-testid="result-banner" data-result="${b.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${w}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${C}</h2>
              <p class="result-sub">${R}</p>
            </div>
            ${G?`<div class="result-tag-wrap">${G}</div>`:""}
          </div>
          ${oe}
        </section>
      `}let nt="";if(m&&b){const w=ss(i.explanation);nt=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${zt()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${w}
          </div>
        </section>
      `}let st="";i.animationId!=null&&m&&(st=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let at="";if(d.isRedoing&&d.from!=="wrong"){const w=$e(i.id);if(w){const C=w.result==="correct"?"答对":w.result==="wrong"?"答错":"已提交",S=Mt(w.submittedAt);at=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${C}（选 ${w.choice} · ${S}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const en=d.from==="wrong"?j:c.questions,rt=d.from!=="wrong"||m,tn=en.map((w,C)=>{const S=C+1,R=w.id===i.id,B=$e(w.id),G=rt&&(B==null?void 0:B.result)==="correct",oe=rt&&(B==null?void 0:B.result)==="wrong";let de="switcher-unanswered",Te=`<span>${S}</span>`;return G?(de="switcher-correct",Te=Ln()):oe&&(de="switcher-wrong",Te=qn()),R&&(de+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${de} active-press"
            data-testid="q-switch-${S}"
            data-qid="${w.id}"
            title="第 ${S} 题"
          >
            ${Te}
          </button>
        `}).join(""),nn=m?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${Mn(14)}
          <span>重做</span>
        </button>
      `:"",ot=`
      <button
        type="button"
        class="btn-nav-prev active-press ${X?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${X?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,it=J?"完成":"下一题 ›",ct=J?' data-action="finish"':"",lt=ve?" btn-finish-locked":"",dt=ve?' aria-disabled="true"':"",sn=`
      <button
        type="button"
        class="btn-nav-next active-press${lt}"
        data-testid="next"
        id="q-next-btn"${ct}${dt}
      >
        <span>${it}</span>
      </button>
    `,an=`
      <button
        type="button"
        class="btn-next-main active-press${lt}"
        data-testid="next"
        id="q-next-btn"${ct}${dt}
      >
        <span>${it}</span>
      </button>
    `;let Ie="";if(m)Ie=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${ot}
            ${nn}
            ${an}
          </div>
        </div>
      `;else{const w=!!d.selectedChoice;Ie=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${ot}
            <button
              type="button"
              class="btn-submit-main active-press ${w?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${w?"":"disabled"}
            >
              <span>${w?"提交答案":"提交"}</span>
            </button>
            ${sn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${M}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${Ct()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${Kt}</span>
          ${d.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出错题本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <div class="q-source-badge" data-testid="q-source">
              <span class="status-dot-green"></span>
              <span>${_}</span>
            </div>
            ${d.from==="wrong"?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${d.showLastTrace?"true":"false"}" ${$&&!m?"":"disabled"}>
                    ${d.showLastTrace?f:g}
                    <span>${d.showLastTrace?"隐藏上次":"看上次答错"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${tn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${at}

          <!-- 4. Result Banner (if submitted) -->
          ${tt}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${i.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${i.code?Zn(i.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Xt}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${nt}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${st}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ie}
      </div>
    `,(ht=document.getElementById("q-back-btn"))==null||ht.addEventListener("click",()=>{te(U)}),m)(wt=document.getElementById("q-redo-btn"))==null||wt.addEventListener("click",()=>{d.isRedoing=!0,d.selectedChoice=null,d.showLastTrace=!1,d.justRemovedWrong=!1,le()}),d.from!=="wrong"&&((bt=document.getElementById("q-remove-wrong-btn"))==null||bt.addEventListener("click",()=>{kt(i.id),d.justRemovedWrong=!0,le()}));else{const w=e.querySelectorAll(".option-item");w.forEach(C=>{C.addEventListener("click",()=>{if(d.showLastTrace)return;const S=C.getAttribute("data-key");if(!S||S===d.selectedChoice)return;d.selectedChoice=S,w.forEach(B=>{const G=B.getAttribute("data-key")===S;l(B,G?"selected":"idle",G)});const R=e.querySelector("#q-submit-btn");if(R){R.disabled=!1,R.classList.remove("btn-disabled");const B=R.querySelector("span");B&&(B.textContent="提交答案")}})}),(mt=document.getElementById("q-submit-btn"))==null||mt.addEventListener("click",()=>{!d.selectedChoice||d.showLastTrace||(dn(i,d.selectedChoice),d.isRedoing=!1,d.wrongFresh=!1,d.showLastTrace=!1,d.justRemovedWrong=!1,T=!0,le())}),(vt=document.getElementById("q-toggle-last"))==null||vt.addEventListener("click",()=>{const C=e.querySelector("#q-toggle-last");!C||C.disabled||m||(d.showLastTrace=!d.showLastTrace,I(),re(d.showLastTrace))})}d.from==="wrong"&&((yt=document.getElementById("q-remove-wrong-btn"))==null||yt.addEventListener("click",()=>{const w=i.id;kt(w),v();const C=Q(),S=c.questions.find(R=>{var B;return R.id===w||!((B=C[R.id])!=null&&B.inWrongBook)?!1:c.questions.findIndex(G=>G.id===R.id)>y});te(S?`#/q/${S.id}?from=wrong`:"#/wrong")})),(xt=document.getElementById("q-prev-btn"))==null||xt.addEventListener("click",()=>{z&&te(`#/q/${z}?from=${d.from}`)}),($t=document.getElementById("q-next-btn"))==null||$t.addEventListener("click",()=>{if(ee){te(`#/q/${ee}?from=${d.from}`);return}const w=Q();if(!(j.length>0&&j.every(S=>!!w[S.id]))){ns();return}if(d.from==="daily"){te("#/");return}d.showEndCard=!0,le()}),e.querySelectorAll(".q-switch-pill").forEach(w=>{w.addEventListener("click",()=>{const C=w.getAttribute("data-qid");C&&C!==i.id&&te(`#/q/${C}?from=${d.from}`)})});const Fe=e.querySelector(".q-switcher-group"),_e=e.querySelector(".switcher-current");if(Fe&&_e){const w=_e.getBoundingClientRect().left-Fe.getBoundingClientRect().left,C=Fe.scrollLeft+w-(Fe.clientWidth-_e.offsetWidth)/2;Fe.scrollLeft=Math.max(0,C)}if(F&&b){const w=b;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(h!==D||!e.isConnected)return;const C=e.querySelector("[data-view-token]");!C||C.getAttribute("data-view-token")!==M||e.querySelectorAll(".option-item").forEach(S=>{var G;const R=S.getAttribute("data-key")||"",B=w.choice===R;l(S,a(R,"graded",w.choice,w),B),(G=S.querySelector(".opt-hint-clip"))==null||G.classList.add("is-open")})})})}Ce(A)}le()}const ke=document.getElementById("app");let Ae=[];function he(){const{path:e}=Be();e==="/"||e===""?ke.innerHTML=Rn(Ae):e==="/topics"?ke.innerHTML=Wn(Ae):e==="/wrong"?ke.innerHTML=zn(Ae):e==="/me"&&(ke.innerHTML=Nn(Ae,he));const n=xn(e);n!=null&&Ge(n)}async function Qt(){var n;try{Ae=await rn()}catch{ke.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Qt()});return}Ee("/",()=>{ue(),he()}),Ee("/topics",()=>{ue(),he()}),Ee("/wrong",()=>{ue(),he()}),Ee("/me",()=>{ue(),he()}),Ee("/q/:id",(t,s)=>{ue();const o=t.id,i=s.from||"topic";as(ke,Ae,o,i)}),on(()=>{te("#/")}),ln(()=>{const{path:t}=Be();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me")&&he()});const e=()=>{const{path:t}=Be();(t==="/"||t==="")&&he()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),cn()}Qt();
