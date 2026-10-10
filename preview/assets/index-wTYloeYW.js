(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const p of c.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&a(p)}).observe(document,{childList:!0,subtree:!0});function t(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(s){if(s.ep)return;s.ep=!0;const c=t(s);fetch(s.href,c)}})();let Ue=null;async function fn(e=!1){if(Ue&&!e)return Ue;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return Ue=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function ge(e){const n=new Map;for(const s of e)n.has(s.topic)||n.set(s.topic,[]),n.get(s.topic).push(s);const t=[];let a=0;for(const[s,c]of n.entries())t.push({name:s,index:a,questions:c}),a++;return t}function _e(e,n){const t=ge(e);for(const a of t){const s=a.questions.findIndex(c=>c.id===n);if(s!==-1)return{topic:a,indexInTopic:s}}return null}const zt=[];let Qt=()=>{};function Ae(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(c,p)=>(t.push(p),"([^/?#]+)")).replace(/\//g,"\\/"),s=new RegExp(`^${a}$`);zt.push({regex:s,paramNames:t,handler:n})}function hn(e){Qt=e}function de(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function N(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?Ve():window.location.hash=n}function Pe(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,s={};return t&&new URLSearchParams(t).forEach((p,i)=>{s[i]=p}),{path:a,query:s}}function Ve(){de();const{path:e,query:n}=Pe();for(const t of zt){const a=e.match(t.regex);if(a){const s={};t.paramNames.forEach((c,p)=>{s[c]=a[p+1]?decodeURIComponent(a[p+1]):""}),t.handler(s,n);return}}Qt({},n)}function vn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",Ve),Ve()}const et="pydrill.v1.records",tt="pydrill.v1.last",Ge=new Set;function mn(e){return Ge.add(e),()=>{Ge.delete(e)}}function Nt(){for(const e of Ge)try{e()}catch(n){console.error("Error in store listener:",n)}}function G(){try{const e=localStorage.getItem(et);if(!e)return{};const n=JSON.parse(e);return typeof n!="object"||n===null?{}:n}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Ee(e){return G()[e]}function Ye(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function Vt(e){try{localStorage.setItem(et,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}Nt()}function wn(e,n){const t=G(),a=t[e.id],s=!!(a!=null&&a.inWrongBook);let c,p=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(c="correct",p=s):(c="wrong",p=!0):(c="ungraded",p=!1);const h=s&&(c==="correct"||c==="wrong"),$={choice:n,result:c,submittedAt:Date.now(),inWrongBook:p,wrongBookReviewed:h};if(c==="wrong")$.lastWrongChoice=n,$.lastWrongAt=$.submittedAt;else{const q=Ye(a);q&&($.lastWrongChoice=q,typeof(a==null?void 0:a.lastWrongAt)=="number"?$.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&($.lastWrongAt=a.submittedAt))}return t[e.id]=$,Vt(t),$}function Tt(e){const n=G();n[e]&&(n[e]={...n[e],inWrongBook:!1},Vt(n))}function bn(){try{localStorage.removeItem(et)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(tt)}catch(e){console.error("Failed to clear last position:",e)}Nt()}function Gt(e){try{const n=localStorage.getItem(tt);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,s=t.at;return typeof a!="string"||a.length===0||typeof s!="number"||!Number.isFinite(s)||!e.some(c=>c.id===a)?null:{id:a,at:s}}catch(n){return console.warn("Failed to parse last position:",n),null}}function yn(e){try{localStorage.setItem(tt,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function $n(e){var a;const n=G();let t=0;for(const s of e)((a=n[s.id])==null?void 0:a.result)==="correct"&&t++;return t}function Yt(e){const n=G();return e.filter(t=>{var a;return!!((a=n[t.id])!=null&&a.inWrongBook)})}function xn(e){const n=G(),t=e.length;let a=0;for(const s of e)n[s.id]&&a++;return{done:a,total:t}}function kn(e){const n=G();let t=0,a=0,s=0;for(const c of e){const p=n[c.id];p&&(t++,p.result==="correct"&&a++,p.inWrongBook&&s++)}return{submittedCount:t,correctCount:a,wrongBookCount:s}}const Cn="pydrill.devPageIds";function Ze(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function An(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:Ze(new URLSearchParams(e.slice(n+1)).get("dev"))}function En(){const e=window.location.hostname,n=window.location.pathname||"";return n.includes("/preview/")||n.endsWith("/preview")?!0:e==="localhost"||e==="127.0.0.1"||e==="::1"||e==="[::1]"||e.endsWith(".local")}function Ln(){const e=An();if(e!==null)return e;const n=Ze(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=Ze(localStorage.getItem(Cn));if(t!==null)return t}catch{}return En()}function Tn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e==="/overview"?10:null}function Ft(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function je(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!Ln()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const a=document.createElement("div");a.className="dev-page-id",a.setAttribute("data-testid","dev-page-id"),a.setAttribute("data-page",String(e)),a.setAttribute("aria-hidden","true"),a.textContent=t,document.body.appendChild(a)}function Fn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),s=n.getDate();return(Math.floor(Date.UTC(t,a,s)/864e5)%e+e)%e}function Sn(e,n=new Date){if(e.length===0)return;const t=Fn(e.length,n);return e[t]}function Bn(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function qn(e,n=new Date){const t=Ee(e.id),a=n.getTime();return!t||!Bn(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天答错",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Mn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function In(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Hn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function _n(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function St(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function Pn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function jn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Zt(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function Rn(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function Dn(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function Bt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function Ke(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function qt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function Kt(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function Jt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function qe(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",s=e==="wrong",c=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${Mn(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${In(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${s?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${Hn(s)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${c?"active":""}" data-testid="tab-me">
          ${_n(c)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const Wn=""+new URL("hero-tree-BQtvnSiX.svg",import.meta.url).href,Xt=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,On=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,Un=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,zn=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function ze(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Qn(e){const n=G(),a=Yt(e).length,s=ge(e),c=s.length,p=Sn(e),i=p?qn(p):{statusText:"今天还没做",isCompletedToday:!1},h=p?_e(e,p.id):null,$=h?h.indexInTopic+1:1,q=h?h.topic.questions.length:2,d=p?`${p.topic} · 第 ${$}/${q} 题`:"今日一题",F=new Date,P=`${F.getMonth()+1}月${F.getDate()}日`,_=p!=null&&p.code?p.code.split(`
`).slice(0,3).join(`
`):"",L=s[0],B=(L==null?void 0:L.name)||"",I=L&&L.questions.length>0?L.questions.find(f=>!n[f.id])||L.questions[0]:void 0,o=Gt(e),r=o?e.find(f=>f.id===o.id):void 0,l=r?_e(e,r.id):null,u=r!=null&&r.code?(r.code.split(`
`)[0]||"").trim():"",g=r&&l?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${qt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${ze(l.topic.name)} · 第 ${l.indexInTopic+1}/${l.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${r.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${u?`<div class="continue-code"><code>${ze(u)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${qt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${ze(B)}」开始吧，一次一小步。</p>
          ${I?`<a href="#/q/${I.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${Wn}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${Rn()}</span>
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
        <a href="#/q/${(p==null?void 0:p.id)||(I==null?void 0:I.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${On}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${i.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${Un}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${c} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${zn}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${a>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${g}

      ${p?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${P}</span>
              <h3 class="daily-q-title">${d}</h3>
            </div>
            <span class="chip-status ${i.result==="correct"?"chip-green":i.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${i.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${p.stem}</p>

          ${_?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${_}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${p.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${i.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${Xt}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${qe("home",a)}
  `}const Nn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Vn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Gn(e){const n=ge(e),t=G(),a=$n(e),s=Yt(e).length,c=n.map((p,i)=>{const{done:h,total:$}=xn(p.questions),q=$>0?h/$*100:0,d=p.questions.find(_=>!t[_.id])||p.questions[0],F=Nn[p.name]??Vn[p.name],P=i%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${i}"
          onclick="window.location.hash = '#/q/${d.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${Jt(p.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${p.name}</h2>
                <span class="topic-index-badge">#${String(i+1).padStart(2,"0")}</span>
              </div>
              ${F?`<p class="topic-sub" data-testid="topic-sub-${i}">${F}</p>`:""}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${i}">${h} / ${$}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            <div class="topic-long-fill tone-${P}" data-testid="topic-bar-${i}" style="width: ${q}%;"></div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${Ke()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已做对 ${a} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Xt}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${c}
      </section>
    </div>

    ${qe("topics",s)}
  `}const Yn=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href,Je=""+new URL("mascot-sad-Dg1R60AV.svg",import.meta.url).href;function Zn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Kn(e,n){const t=G(),a=ge(e),s=e.filter(h=>{var $;return!!(($=t[h.id])!=null&&$.inWrongBook)}),c=s.length;if(c===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${Ke()}</span>
            </div>
            <p class="section-desc">答错的题会自动收进这里</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Je}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="温习本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${Yn}" alt="空白小本子" class="wrong-empty-img" />
          </div>
          <h2 class="wrong-empty-title">温习本是空的</h2>
          <p class="wrong-empty-desc">答错的题会自动收进这里。</p>
          <div class="wrong-empty-action">
            <a href="#/" class="btn-primary active-press">
              <span>去做今日一题</span>
            </a>
          </div>
        </section>
      </div>

      ${qe("wrong",0)}
    `;let p=s[0].id;for(const h of a){const $=h.questions.find(q=>{var d;return!!((d=t[q.id])!=null&&d.inWrongBook)});if($){p=$.id;break}}const i=a.map(h=>{const $=h.questions.filter(P=>{var _;return!!((_=t[P.id])!=null&&_.inWrongBook)});if($.length===0)return"";const d=$.filter(P=>{var _;return!!((_=t[P.id])!=null&&_.wrongBookReviewed)}).length/$.length*100,F=String(h.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${h.index}"
          href="#/q/${$[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${Jt(h.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${Zn(h.name)}</span>
              <span class="wrong-topic-index">#${F}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${h.index}">${$.length}</span> 题待巩固
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" data-testid="wrong-topic-bar-${h.index}" style="width: ${d}%;"></div>
            </div>
          </div>
          <span class="wrong-topic-chevron" aria-hidden="true">›</span>
        </a>
      `}).join("");return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">温习本</h1>
            <span class="title-doodle-leaf">${Ke()}</span>
          </div>
          <p class="section-desc">答错的题会自动收进这里</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Je}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <a href="#/q/${p}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有错题的知识点">
        ${i}
      </section>
    </div>

    ${qe("wrong",c)}
  `}const Ie=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function Jn(e,n){const{submittedCount:t,correctCount:a,wrongBookCount:s}=kn(e);return typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const c=document.getElementById("clear-confirm-modal");c&&c.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const c=document.getElementById("clear-confirm-modal");c&&c.classList.add("hidden")},window.__pydrill_confirmClear=()=>{bn();const c=document.getElementById("clear-confirm-modal");c&&c.classList.add("hidden"),n&&n()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Ie}" alt="小芽啾" class="me-avatar-img" />
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
            <span class="stat-col-num num-orange">${a}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-col-label">温习本</span>
            <span class="stat-col-num num-brown">${s}</span>
          </div>
        </div>

        <div class="stats-motto-row">
          <span>${Kt(16)} 慢慢学，每一题都是进步的脚步</span>
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
              ${Bt()}
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
              <p class="me-danger-desc">将重置已提交的答题历史与温习本，恢复为初始状态。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Confirmation Dialog Modal -->
      <div id="clear-confirm-modal" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="card paper-card modal-card">
          <div class="modal-icon-wrap">
            ${Bt()}
          </div>
          <h3 id="modal-title" class="modal-title">确定清除全部记录吗？</h3>
          <p class="modal-desc">清除后，所有答题结果与温习本都将重置为初始状态，无法恢复。</p>
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

    ${qe("me",s)}
  `}const Xe=globalThis;Xe.Prism=Xe.Prism??{};Xe.Prism.manual=!0;var Mt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Xn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Qe={exports:{}},It;function es(){return It||(It=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,c=0,p={},i={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function o(r){return r instanceof h?new h(r.type,o(r.content),r.alias):Array.isArray(r)?r.map(o):r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(o){return Object.prototype.toString.call(o).slice(8,-1)},objId:function(o){return o.__id||Object.defineProperty(o,"__id",{value:++c}),o.__id},clone:function o(r,l){l=l||{};var u,g;switch(i.util.type(r)){case"Object":if(g=i.util.objId(r),l[g])return l[g];u={},l[g]=u;for(var f in r)r.hasOwnProperty(f)&&(u[f]=o(r[f],l));return u;case"Array":return g=i.util.objId(r),l[g]?l[g]:(u=[],l[g]=u,r.forEach(function(C,w){u[w]=o(C,l)}),u);default:return r}},getLanguage:function(o){for(;o;){var r=s.exec(o.className);if(r)return r[1].toLowerCase();o=o.parentElement}return"none"},setLanguage:function(o,r){o.className=o.className.replace(RegExp(s,"gi"),""),o.classList.add("language-"+r)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(u){var o=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(u.stack)||[])[1];if(o){var r=document.getElementsByTagName("script");for(var l in r)if(r[l].src==o)return r[l]}return null}},isActive:function(o,r,l){for(var u="no-"+r;o;){var g=o.classList;if(g.contains(r))return!0;if(g.contains(u))return!1;o=o.parentElement}return!!l}},languages:{plain:p,plaintext:p,text:p,txt:p,extend:function(o,r){var l=i.util.clone(i.languages[o]);for(var u in r)l[u]=r[u];return l},insertBefore:function(o,r,l,u){u=u||i.languages;var g=u[o],f={};for(var C in g)if(g.hasOwnProperty(C)){if(C==r)for(var w in l)l.hasOwnProperty(w)&&(f[w]=l[w]);l.hasOwnProperty(C)||(f[C]=g[C])}var j=u[o];return u[o]=f,i.languages.DFS(i.languages,function(O,ee){ee===j&&O!=o&&(this[O]=f)}),f},DFS:function o(r,l,u,g){g=g||{};var f=i.util.objId;for(var C in r)if(r.hasOwnProperty(C)){l.call(r,C,r[C],u||C);var w=r[C],j=i.util.type(w);j==="Object"&&!g[f(w)]?(g[f(w)]=!0,o(w,l,null,g)):j==="Array"&&!g[f(w)]&&(g[f(w)]=!0,o(w,l,C,g))}}},plugins:{},highlightAll:function(o,r){i.highlightAllUnder(document,o,r)},highlightAllUnder:function(o,r,l){var u={callback:l,container:o,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",u),u.elements=Array.prototype.slice.apply(u.container.querySelectorAll(u.selector)),i.hooks.run("before-all-elements-highlight",u);for(var g=0,f;f=u.elements[g++];)i.highlightElement(f,r===!0,u.callback)},highlightElement:function(o,r,l){var u=i.util.getLanguage(o),g=i.languages[u];i.util.setLanguage(o,u);var f=o.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(f,u);var C=o.textContent,w={element:o,language:u,grammar:g,code:C};function j(ee){w.highlightedCode=ee,i.hooks.run("before-insert",w),w.element.innerHTML=w.highlightedCode,i.hooks.run("after-highlight",w),i.hooks.run("complete",w),l&&l.call(w.element)}if(i.hooks.run("before-sanity-check",w),f=w.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!w.code){i.hooks.run("complete",w),l&&l.call(w.element);return}if(i.hooks.run("before-highlight",w),!w.grammar){j(i.util.encode(w.code));return}if(r&&a.Worker){var O=new Worker(i.filename);O.onmessage=function(ee){j(ee.data)},O.postMessage(JSON.stringify({language:w.language,code:w.code,immediateClose:!0}))}else j(i.highlight(w.code,w.grammar,w.language))},highlight:function(o,r,l){var u={code:o,grammar:r,language:l};if(i.hooks.run("before-tokenize",u),!u.grammar)throw new Error('The language "'+u.language+'" has no grammar.');return u.tokens=i.tokenize(u.code,u.grammar),i.hooks.run("after-tokenize",u),h.stringify(i.util.encode(u.tokens),u.language)},tokenize:function(o,r){var l=r.rest;if(l){for(var u in l)r[u]=l[u];delete r.rest}var g=new d;return F(g,g.head,o),q(o,g,r,g.head,0),_(g)},hooks:{all:{},add:function(o,r){var l=i.hooks.all;l[o]=l[o]||[],l[o].push(r)},run:function(o,r){var l=i.hooks.all[o];if(!(!l||!l.length))for(var u=0,g;g=l[u++];)g(r)}},Token:h};a.Prism=i;function h(o,r,l,u){this.type=o,this.content=r,this.alias=l,this.length=(u||"").length|0}h.stringify=function o(r,l){if(typeof r=="string")return r;if(Array.isArray(r)){var u="";return r.forEach(function(j){u+=o(j,l)}),u}var g={type:r.type,content:o(r.content,l),tag:"span",classes:["token",r.type],attributes:{},language:l},f=r.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(g.classes,f):g.classes.push(f)),i.hooks.run("wrap",g);var C="";for(var w in g.attributes)C+=" "+w+'="'+(g.attributes[w]||"").replace(/"/g,"&quot;")+'"';return"<"+g.tag+' class="'+g.classes.join(" ")+'"'+C+">"+g.content+"</"+g.tag+">"};function $(o,r,l,u){o.lastIndex=r;var g=o.exec(l);if(g&&u&&g[1]){var f=g[1].length;g.index+=f,g[0]=g[0].slice(f)}return g}function q(o,r,l,u,g,f){for(var C in l)if(!(!l.hasOwnProperty(C)||!l[C])){var w=l[C];w=Array.isArray(w)?w:[w];for(var j=0;j<w.length;++j){if(f&&f.cause==C+","+j)return;var O=w[j],ee=O.inside,fe=!!O.lookbehind,re=!!O.greedy,v=O.alias;if(re&&!O.pattern.global){var A=O.pattern.toString().match(/[imsuy]*$/)[0];O.pattern=RegExp(O.pattern.source,A+"g")}for(var k=O.pattern||O,b=u.next,S=g;b!==r.tail&&!(f&&S>=f.reach);S+=b.value.length,b=b.next){var y=b.value;if(r.length>o.length)return;if(!(y instanceof h)){var m=1,T;if(re){if(T=$(k,S,o,fe),!T||T.index>=o.length)break;var te=T.index,W=T.index+T[0].length,H=S;for(H+=b.value.length;te>=H;)b=b.next,H+=b.value.length;if(H-=b.value.length,S=H,b.value instanceof h)continue;for(var U=b;U!==r.tail&&(H<W||typeof U.value=="string");U=U.next)m++,H+=U.value.length;m--,y=o.slice(S,H),T.index-=S}else if(T=$(k,0,y,fe),!T)continue;var te=T.index,ie=T[0],Y=y.slice(0,te),K=y.slice(te+ie.length),z=S+y.length;f&&z>f.reach&&(f.reach=z);var Q=b.prev;Y&&(Q=F(r,Q,Y),S+=Y.length),P(r,Q,m);var De=new h(C,ee?i.tokenize(ie,ee):ie,v,ie);if(b=F(r,Q,De),K&&F(r,b,K),m>1){var Le={cause:C+","+j,reach:z};q(o,r,l,b.prev,S,Le),f&&Le.reach>f.reach&&(f.reach=Le.reach)}}}}}}function d(){var o={value:null,prev:null,next:null},r={value:null,prev:o,next:null};o.next=r,this.head=o,this.tail=r,this.length=0}function F(o,r,l){var u=r.next,g={value:l,prev:r,next:u};return r.next=g,u.prev=g,o.length++,g}function P(o,r,l){for(var u=r.next,g=0;g<l&&u!==o.tail;g++)u=u.next;r.next=u,u.prev=r,o.length-=g}function _(o){for(var r=[],l=o.head.next;l!==o.tail;)r.push(l.value),l=l.next;return r}if(!a.document)return a.addEventListener&&(i.disableWorkerMessageHandler||a.addEventListener("message",function(o){var r=JSON.parse(o.data),l=r.language,u=r.code,g=r.immediateClose;a.postMessage(i.highlight(u,i.languages[l],l)),g&&a.close()},!1)),i;var L=i.util.currentScript();L&&(i.filename=L.src,L.hasAttribute("data-manual")&&(i.manual=!0));function B(){i.manual||i.highlightAll()}if(!i.manual){var I=document.readyState;I==="loading"||I==="interactive"&&L&&L.defer?document.addEventListener("DOMContentLoaded",B):window.requestAnimationFrame?window.requestAnimationFrame(B):window.setTimeout(B,16)}return i})(n);e.exports&&(e.exports=t),typeof Mt<"u"&&(Mt.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,c){var p={};p["language-"+c]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[c]},p.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:p}};i["language-"+c]={pattern:/[\s\S]+/,inside:t.languages[c]};var h={};h[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",h)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var c=a.languages.markup;c&&(c.tag.addInlined("style","css"),c.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",s=function(L,B){return"✖ Error "+L+" while fetching file: "+B},c="✖ Error: File does not exist or is empty",p={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",h="loading",$="loaded",q="failed",d="pre[data-src]:not(["+i+'="'+$+'"]):not(['+i+'="'+h+'"])';function F(L,B,I){var o=new XMLHttpRequest;o.open("GET",L,!0),o.onreadystatechange=function(){o.readyState==4&&(o.status<400&&o.responseText?B(o.responseText):o.status>=400?I(s(o.status,o.statusText)):I(c))},o.send(null)}function P(L){var B=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(L||"");if(B){var I=Number(B[1]),o=B[2],r=B[3];return o?r?[I,Number(r)]:[I,void 0]:[I,I]}}t.hooks.add("before-highlightall",function(L){L.selector+=", "+d}),t.hooks.add("before-sanity-check",function(L){var B=L.element;if(B.matches(d)){L.code="",B.setAttribute(i,h);var I=B.appendChild(document.createElement("CODE"));I.textContent=a;var o=B.getAttribute("data-src"),r=L.language;if(r==="none"){var l=(/\.(\w+)$/.exec(o)||[,"none"])[1];r=p[l]||l}t.util.setLanguage(I,r),t.util.setLanguage(B,r);var u=t.plugins.autoloader;u&&u.loadLanguages(r),F(o,function(g){B.setAttribute(i,$);var f=P(B.getAttribute("data-range"));if(f){var C=g.split(/\r\n?|\n/g),w=f[0],j=f[1]==null?C.length:f[1];w<0&&(w+=C.length),w=Math.max(0,Math.min(w-1,C.length)),j<0&&(j+=C.length),j=Math.max(0,Math.min(j,C.length)),g=C.slice(w,j).join(`
`),B.hasAttribute("data-start")||B.setAttribute("data-start",String(w+1))}I.textContent=g,t.highlightElement(I)},function(g){B.setAttribute(i,q),I.textContent=g})}}),t.plugins.fileHighlight={highlight:function(B){for(var I=(B||document).querySelectorAll(d),o=0,r;r=I[o++];)t.highlightElement(r)}};var _=!1;t.fileHighlight=function(){_||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),_=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(Qe)),Qe.exports}var ts=es();const Ht=Xn(ts);var _t={},Pt;function ns(){return Pt||(Pt=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),_t}ns();function ss(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((s,c)=>{const p=c+1,h=Ht.highlight(s,Ht.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${p}</span><span class="code-line-content">${h}</span></div>`}).join("")}</code></pre></div>`}function jt(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),s=String(n.getHours()).padStart(2,"0"),c=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${s}:${c}`}function Z(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Rt=200,Dt=1600,Wt=300,as=1800;let ke=0,pe=0,Ot=!1;function rs(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let He="#/overview";function os(e,n){return n<=3?Array.from({length:n},(t,a)=>a):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function Re(){ke+=1,pe&&(window.clearTimeout(pe),pe=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function is(){Ot||(Ot=!0,window.addEventListener("hashchange",Re))}function cs(e,n){const t=n.getBoundingClientRect(),a=t.left+t.width/2,s=e.offsetWidth,c=e.offsetHeight,p=1,i=6,h=40,$=8,q=document.documentElement.clientWidth;let d=a+p+h+i,F=d-s;F<$&&(F=$,d=F+s),d>q-$&&(d=q-$,F=Math.max($,d-s),d=F+s);let P=d-p-i-a;const _=12,L=Math.max(_,s-p*2-12-_);P<_&&(P=_),P>L&&(P=L),e.style.right=`${Math.round(q-d)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-c)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(P)}px`)}function ls(e,n){if(n!==ke||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(s=>s.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:Wt,easing:"ease",fill:"forwards"}),a=()=>{n===ke&&e.remove()};t.onfinish=a,window.setTimeout(a,Wt+60)}function Ne(e,n,t,a){pe&&window.clearTimeout(pe),pe=window.setTimeout(()=>{if(pe=0,!(n!==ke||!e.isConnected)){if(!a){e.remove();return}ls(e,n)}},t)}function ds(e=He){var i;const n=document.getElementById("q-next-btn");if(!n)return;He=e,ke+=1;const t=ke;pe&&(window.clearTimeout(pe),pe=0);const a=rs();let s=document.querySelector(".finish-tip");const c=!!s;if(s?document.querySelectorAll(".finish-tip").forEach(h=>{h!==s&&h.remove()}):(s=document.createElement("div"),s.className="finish-tip tip-bubble",s.setAttribute("data-testid","tip-bubble"),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(s),(i=s.querySelector(".finish-tip-tag"))==null||i.addEventListener("click",h=>{h.stopPropagation(),Re(),N(He)})),cs(s,n),a){s.getAnimations().forEach(h=>h.cancel()),s.style.opacity="1",s.style.transform="none",Ne(s,t,as,!1);return}if(c){s.getAnimations().forEach(h=>h.cancel()),s.style.opacity="1",s.style.transform="translateY(0)",Ne(s,t,Dt,!0);return}const p=s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:Rt,easing:"ease-out",fill:"forwards"});p.onfinish=()=>{t!==ke||!s.isConnected||(s.style.opacity="1",s.style.transform="translateY(0)")},Ne(s,t,Rt+Dt,!0)}function Ut(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${Z(t)}</code>`)}function ps(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,s="";n!==-1&&(a=e.slice(0,n).trim(),s=e.slice(n+t).trim(),s=s.replace(/^[：:\s]+/,""));const c=a.split(/\n+/).map(i=>i.trim()).filter(Boolean).map(i=>`<p class="explanation-p">${Ut(i)}</p>`).join("");let p="";if(s){const i=Ut(s);p=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Zt(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${i}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${c}
      ${p}
    </div>
  `}function us(e,n,t,a="topic"){is(),Re(),de();const s=a==="daily"||a==="wrong"?a:"topic",c=n.find(v=>v.id===t);if(!c){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,je(Ft(s,!1));return}yn(c.id);const p=_e(n,c.id),i=(p==null?void 0:p.topic)||ge(n)[0],h=p?p.indexInTopic:0,$=i.questions.length,q=Ee(c.id);i.questions.filter(v=>{var A;return!!((A=G()[v.id])!=null&&A.inWrongBook)}).length;const d={from:s,selectedChoice:s==="wrong"?null:q?q.choice:null,isRedoing:!1,wrongFresh:s==="wrong",showLastTrace:!1,showEndCard:!1,justRemovedWrong:!1},F=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let P=0,_=null,L=!1;const B='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',I='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function o(v){return/Error|Exception/.test(v)}function r(v,A,k,b){return A!=="graded"?k===v?"selected":"idle":c.answer&&v===c.answer?"correct":k===v&&(b==null?void 0:b.result)==="wrong"?"wrong":"locked"}function l(v,A,k){const b=v.querySelector(".opt-badge"),S=v.querySelector(".opt-text"),y=v.querySelector(".opt-status");if(!b||!S||!y)return;const m=v.getAttribute("data-error")==="1";v.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),b.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),S.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),v.setAttribute("aria-checked",k?"true":"false"),A==="correct"?v.setAttribute("data-state","correct"):A==="wrong"?v.setAttribute("data-state","wrong"):v.removeAttribute("data-state"),A==="selected"||A==="correct"?(v.classList.add(A==="correct"?"opt-card-correct":"opt-card-selected"),A==="selected"&&v.classList.add("opt-pressable"),b.classList.add(A==="correct"?"opt-badge-correct":"opt-badge-selected"),S.classList.add("opt-text-strong"),y.innerHTML=B):A==="wrong"?(v.classList.add("opt-card-wrong"),b.classList.add("opt-badge-wrong"),S.classList.add("opt-text-strong","opt-text-wrong"),y.innerHTML=I):A==="locked"?(v.classList.add("opt-card-locked"),b.classList.add("opt-badge-default"),m&&S.classList.add("opt-text-error"),y.innerHTML=""):(v.classList.add("opt-card-default","opt-pressable"),b.classList.add("opt-badge-default"),m&&S.classList.add("opt-text-error"),y.innerHTML="")}function u(v,A,k,b){const S=o(v.text),y=["option-item"],m=["opt-badge"],T=["opt-text"];let W="",H="";A==="selected"?(y.push("opt-card-selected","opt-pressable"),m.push("opt-badge-selected"),T.push("opt-text-strong"),W=B):A==="correct"?(y.push("opt-card-correct"),m.push("opt-badge-correct"),T.push("opt-text-strong"),W=B,H='data-state="correct"'):A==="wrong"?(y.push("opt-card-wrong"),m.push("opt-badge-wrong"),T.push("opt-text-strong","opt-text-wrong"),W=I,H='data-state="wrong"'):A==="locked"?(y.push("opt-card-locked"),m.push("opt-badge-default"),S&&T.push("opt-text-error")):(y.push("opt-card-default","opt-pressable"),m.push("opt-badge-default"),S&&T.push("opt-text-error"));const U=(v.hint||"").trim(),te=b!=="none"&&U?`<div class="opt-hint-clip${b==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${Z(v.key)}">${Z(U)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${k?"true":"false"}"
            ${H}
            class="${y.join(" ")}"
            data-testid="option-${Z(v.key)}"
            data-key="${Z(v.key)}"
            data-error="${S?"1":"0"}"
          >
            <span class="${m.join(" ")}">${Z(v.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${T.join(" ")}">${Z(v.text)}</span>
                <span class="opt-status">${W}</span>
              </div>
              ${te}
            </div>
          </div>
        `}const g='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',f='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let C=0;function w(){var A;(A=document.getElementById("pydrill-wrong-toast"))==null||A.remove();const v=document.createElement("div");v.id="pydrill-wrong-toast",v.className="wrong-toast",v.setAttribute("role","status"),v.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(v),window.setTimeout(()=>{v.remove()},1500)}function j(){const v=e.querySelector("#q-toggle-last");if(!v)return;const A=d.showLastTrace;v.setAttribute("aria-pressed",A?"true":"false");const k=v.querySelector("span");k&&(k.textContent=A?"隐藏上次":"看上次思路");const b=v.querySelector("svg");b&&(b.outerHTML=A?f:g)}function O(v,A,k,b){const S=(A.hint||"").trim(),y=v.querySelector(".opt-body");if(!y)return;let m=v.querySelector(".opt-hint-clip");if(k&&S){m||(m=document.createElement("div"),m.className="opt-hint-clip",m.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${Z(A.key)}">${Z(S)}</p></div>`,y.appendChild(m));const T=m;requestAnimationFrame(()=>{requestAnimationFrame(()=>{b===C&&T.classList.add("is-open")})})}else if(m){m.classList.remove("is-open");const T=m,W=b,H=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{W===C&&T.remove()},H?0:200)}}function ee(v){const A=++C,k=Ee(c.id),b=Ye(k),S=(c.answer||"").trim();e.querySelectorAll(".option-item").forEach(m=>{const T=m.getAttribute("data-key")||"",W=c.options.find(Q=>Q.key===T);if(!v){const Q=d.selectedChoice===T;l(m,Q?"selected":"idle",Q),W&&O(m,W,!1,A);return}const H=m.querySelector(".opt-badge"),U=m.querySelector(".opt-text"),te=m.querySelector(".opt-status");if(!H||!U||!te)return;const ie=m.getAttribute("data-error")==="1",Y=!!b&&T===b,K=!!S&&T===S;m.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),H.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),U.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),m.setAttribute("aria-checked","false"),m.removeAttribute("data-state"),Y&&!K?(m.classList.add("opt-card-trace-last"),H.classList.add("opt-badge-trace-last"),U.classList.add("opt-text-strong","opt-text-trace-last")):K?(m.classList.add("opt-card-trace-correct"),H.classList.add("opt-badge-trace-correct"),U.classList.add("opt-text-strong","opt-text-trace-correct")):(m.classList.add("opt-card-default","opt-card-trace-dim"),H.classList.add("opt-badge-default"),ie&&U.classList.add("opt-text-error"));const z=[];Y&&z.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${Z(T)}">上次选的 ${Z(T)}</span>`),K&&z.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${Z(T)}">正确答案 ${Z(T)}</span>`),te.innerHTML=z.length?`<span class="opt-trace-tag-row">${z.join("")}</span>`:"",W&&O(m,W,Y||K,A)});const y=e.querySelector("#q-submit-btn");if(y){const m=v||!d.selectedChoice;y.disabled=m,y.classList.toggle("btn-disabled",m)}}function fe(v){je(Ft(d.from,d.showEndCard)),(v||d.showEndCard)&&de()}function re(){var ht,vt,mt,wt,bt,yt,$t,xt,kt,Ct,At,Et,Lt;Re();const v=++P,A=_!==c.id;_=c.id;const k=Ee(c.id),b=Ye(k).length>0,y=d.isRedoing||d.wrongFresh?void 0:k,m=!!y;m&&(d.showLastTrace=!1);const T=L&&m;L=!1;let W="#/topics";d.from==="daily"&&(W="#/"),d.from==="wrong"&&(W="#/wrong");const H=`#/overview?from=${d.from}&qid=${c.id}${d.from==="topic"?"&topic="+encodeURIComponent(i.name):""}`;He=H;let U="题目总览";d.from==="daily"&&(U="今日一题");let te=null,ie=null,Y=!1,K=!1,z=i.questions,Q=h;if(d.from==="wrong"){const x=G();z=i.questions.filter(E=>{var M;return!!((M=x[E.id])!=null&&M.inWrongBook)}),Q=z.findIndex(E=>E.id===c.id)}d.from==="daily"?(K=!0,Y=!0,z=[c],Q=0):Q<0?(K=!0,Y=!0):(K=Q===0,Y=Q>=z.length-1,K||(te=z[Q-1].id),Y||(ie=z[Q+1].id));const De=G(),Le=z.length>0&&z.every(x=>!!De[x.id]),nt=Y&&!Le,tn=Q>=0?Q+1:1,nn=d.from==="wrong"?Math.max(z.length,1):$,sn=d.from==="wrong"?`${i.name} · 错题 ${tn}/${nn}`:`${i.name} · 第 ${h+1}/${$} 题`;if(d.showEndCard){if(d.from==="daily"){N("#/");return}const x=d.from==="topic",E=G();let M="",D="",R="#/topics",V="返回知识点列表",ce="",he="",me="";if(x){let J=0;for(const se of i.questions)((ht=E[se.id])==null?void 0:ht.result)==="wrong"&&J++;M="这个知识点做完了",J>0?(D=`今天已经发现 ${J} 个需要巩固的知识点`,me=`
            <a
              href="#/wrong"
              class="btn-primary w-full active-press end-review-btn"
              data-testid="end-wrong-btn"
              id="end-wrong-btn"
            >
              <span>去温习</span>
            </a>
          `):D="全对！这一组你已经完全掌握了",R="#/topics",V="返回知识点列表",ce=`
          <div class="end-questions-list">
            ${i.questions.map((se,ae)=>{const X=ae+1,oe=E[se.id],le=(oe==null?void 0:oe.result)==="correct",Ce=(oe==null?void 0:oe.result)==="wrong";let Se="end-chip-gray",we="· 未做";le?(Se="end-chip-green",we="✓ 答对"):Ce&&(Se="end-chip-red",we="✗ 答错");const Be=se.code?se.code.split(`
`)[0].trim():se.stem;return`
              <a href="#/q/${se.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${X} 题</span>
                  <span class="end-q-code">${Z(Be)}</span>
                </div>
                <span class="end-chip ${Se}">${we}</span>
              </a>
            `}).join("")}
          </div>
        `;const ne=ge(n),ve=ne.findIndex(se=>se.name===i.name),Fe=ve!==-1&&ve<ne.length-1?ne[ve+1]:null;Fe&&Fe.questions.length>0&&(he=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{const J=i.questions.filter(ae=>{var X;return!!((X=E[ae.id])!=null&&X.inWrongBook)}),ue=J.length,ne=J.filter(ae=>{var X;return((X=E[ae.id])==null?void 0:X.result)==="correct"}).length;M="温习本这一轮看完了",ne>0?D=`好样的！你已经纠正了 ${ne} 道之前做错的题。`:D="再练一轮，会越来越熟。",R="#/wrong",V="返回温习本",ue>0?ce=`
            <div class="end-questions-list">
              ${J.map((X,oe)=>{const le=E[X.id],Ce=(le==null?void 0:le.result)==="correct",Se=(le==null?void 0:le.result)==="wrong";let we="end-chip-gray",Be="· 未做";Ce?(we="end-chip-green",Be="✓ 答对"):Se&&(we="end-chip-red",Be="✗ 答错");const gn=X.code?X.code.split(`
`)[0].trim():X.stem;return`
                <a href="#/q/${X.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">错题 ${oe+1}/${ue}</span>
                    <span class="end-q-code">${Z(gn)}</span>
                  </div>
                  <span class="end-chip ${we}">${Be}</span>
                </a>
              `}).join("")}
            </div>
          `:ce=`
            <div class="end-empty-row">
              ${Kt(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const ve=ge(n),Fe=ve.findIndex(ae=>ae.name===i.name);let se=null;if(Fe!==-1)for(let ae=1;ae<ve.length;ae++){const oe=ve[(Fe+ae)%ve.length].questions.find(le=>{var Ce;return!!((Ce=E[le.id])!=null&&Ce.inWrongBook)});if(oe){se=oe.id;break}}se&&(he=`
            <a
              href="#/q/${se}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const un=d.from==="wrong"?"温习本 · 完成":`${i.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${F}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${St()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${un}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Ie}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${M}</h2>
              <p class="end-sub" data-testid="end-subtitle">${D}</p>

              ${ce}

              <div class="end-action-wrap flex-col-gap">
                ${me}
                <button
                  type="button"
                  class="${me?"btn-secondary":"btn-primary"} w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${V}
                </button>
                ${he}
              </div>
            </div>
          </main>
        </div>
      `,(vt=document.getElementById("q-back-btn"))==null||vt.addEventListener("click",()=>{N(W)}),(mt=document.getElementById("end-leave-btn"))==null||mt.addEventListener("click",()=>{N(R)}),(wt=document.getElementById("end-next-topic-btn"))==null||wt.addEventListener("click",()=>{const J=ge(n),ue=J.findIndex(ne=>ne.name===i.name);if(ue!==-1&&ue<J.length-1){const ne=J[ue+1];N(`#/q/${ne.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(J=>{J.addEventListener("click",ue=>{const ne=J.getAttribute("href");ne&&(ue.preventDefault(),N(ne))})}),fe(A);return}const Me=m?T?"pending":"graded":"answering",an=Me==="answering"?"none":Me==="pending"?"closed":"open",st=Me==="graded"?(y==null?void 0:y.choice)??null:d.selectedChoice,rn=c.options.map(x=>u(x,r(x.key,Me,st,y),st===x.key,an)).join("");let at="";if(m&&y){let x=Ie,E="答对了，理解到位";const M=jt(y.submittedAt);let D=`你选了 ${y.choice} · 正确答案 ${c.answer} · ${M} 提交`,R="banner-correct",V="",ce="";y.result==="wrong"?(x=Je,E="这题有个小坑，看看解析",D=`你选了 ${y.choice} · 正确答案是 ${c.answer} · ${M} 提交`,R="banner-wrong",y.inWrongBook&&(V='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):y.result==="correct"?y.inWrongBook&&d.from!=="wrong"?ce=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-action-text">这题还在温习本里，最近一次答对了</span>
              <button
                type="button"
                class="btn-remove-wrong-banner active-press"
                data-testid="remove-wrong"
                id="q-remove-wrong-btn"
              >
                <span>移出温习本</span>
              </button>
            </div>
          `:d.justRemovedWrong&&d.from!=="wrong"&&(ce=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出温习本 ✓</span>
            </div>
          `):y.result==="ungraded"&&(x=Ie,E="已提交（未判分）",D=`这题的答案还没编写 · ${M} 提交`,R="banner-ungraded"),at=`
        <section class="result-banner ${R}" data-testid="result-banner" data-result="${y.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${x}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${E}</h2>
              <p class="result-sub">${D}</p>
            </div>
            ${V?`<div class="result-tag-wrap">${V}</div>`:""}
          </div>
          ${ce}
        </section>
      `}let rt="";if(m&&y){const x=ps(c.explanation);rt=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Zt()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${x}
          </div>
        </section>
      `}let ot="";c.animationId!=null&&m&&(ot=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let it="";if(d.isRedoing&&d.from!=="wrong"){const x=Ee(c.id);if(x){const E=x.result==="correct"?"答对":x.result==="wrong"?"答错":"已提交",M=jt(x.submittedAt);it=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${E}（选 ${x.choice} · ${M}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const ct=d.from==="wrong"?z:i.questions,lt=d.from!=="wrong"||m,on=ct.length,cn=os(Math.max(0,Q),on).map(x=>{const E=ct[x],M=x+1,D=E.id===c.id,R=Ee(E.id),V=lt&&(R==null?void 0:R.result)==="correct",ce=lt&&(R==null?void 0:R.result)==="wrong";let he="switcher-unanswered",me=`<span>${M}</span>`;return V?(he="switcher-correct",me=Pn()):ce&&(he="switcher-wrong",me=jn()),D&&(he+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${he} active-press"
            data-testid="q-switch-${M}"
            data-qid="${E.id}"
            title="第 ${M} 题"
          >
            ${me}
          </button>
        `}).join(""),ln=m?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${Dn(14)}
          <span>重做</span>
        </button>
      `:"",dt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${K?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${K?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,pt=Y?"完成":"下一题 ›",ut=Y?' data-action="finish"':"",gt=nt?" btn-finish-locked":"",ft=nt?' aria-disabled="true"':"",dn=`
      <button
        type="button"
        class="btn-nav-next active-press${gt}"
        data-testid="next"
        id="q-next-btn"${ut}${ft}
      >
        <span>${pt}</span>
      </button>
    `,pn=`
      <button
        type="button"
        class="btn-next-main active-press${gt}"
        data-testid="next"
        id="q-next-btn"${ut}${ft}
      >
        <span>${pt}</span>
      </button>
    `;let We="";if(m)We=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${dt}
            ${ln}
            ${pn}
          </div>
        </div>
      `;else{const x=!!d.selectedChoice;We=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${dt}
            <button
              type="button"
              class="btn-submit-main active-press ${x?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${x?"":"disabled"}
            >
              <span>${x?"提交答案":"提交"}</span>
            </button>
            ${dn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${F}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${St()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${sn}</span>
          ${d.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出温习本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <button type="button" class="q-source-badge q-source-chip active-press" data-testid="q-source" id="q-overview-chip">
              <span class="status-dot-green"></span>
              <span>${U}</span>
            </button>
            ${d.from==="wrong"?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${d.showLastTrace?"true":"false"}" ${b&&!m?"":"disabled"}>
                    ${d.showLastTrace?f:g}
                    <span>${d.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${cn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${it}

          <!-- 4. Result Banner (if submitted) -->
          ${at}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${c.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${c.code?ss(c.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${rn}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${rt}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${ot}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${We}
      </div>
    `,(bt=document.getElementById("q-back-btn"))==null||bt.addEventListener("click",()=>{N(W)}),(yt=document.getElementById("q-overview-chip"))==null||yt.addEventListener("click",()=>{N(H)}),m)(kt=document.getElementById("q-redo-btn"))==null||kt.addEventListener("click",()=>{d.isRedoing=!0,d.selectedChoice=null,d.showLastTrace=!1,d.justRemovedWrong=!1,re()}),d.from!=="wrong"&&((Ct=document.getElementById("q-remove-wrong-btn"))==null||Ct.addEventListener("click",()=>{Tt(c.id),d.justRemovedWrong=!0,re()}));else{const x=e.querySelectorAll(".option-item");x.forEach(E=>{E.addEventListener("click",()=>{if(d.showLastTrace)return;const M=E.getAttribute("data-key");if(!M||M===d.selectedChoice)return;d.selectedChoice=M,x.forEach(R=>{const V=R.getAttribute("data-key")===M;l(R,V?"selected":"idle",V)});const D=e.querySelector("#q-submit-btn");if(D){D.disabled=!1,D.classList.remove("btn-disabled");const R=D.querySelector("span");R&&(R.textContent="提交答案")}})}),($t=document.getElementById("q-submit-btn"))==null||$t.addEventListener("click",()=>{!d.selectedChoice||d.showLastTrace||(wn(c,d.selectedChoice),d.isRedoing=!1,d.wrongFresh=!1,d.showLastTrace=!1,d.justRemovedWrong=!1,L=!0,re())}),(xt=document.getElementById("q-toggle-last"))==null||xt.addEventListener("click",()=>{const E=e.querySelector("#q-toggle-last");!E||E.disabled||m||(d.showLastTrace=!d.showLastTrace,j(),ee(d.showLastTrace))})}d.from==="wrong"&&((At=document.getElementById("q-remove-wrong-btn"))==null||At.addEventListener("click",()=>{const x=c.id;Tt(x),w();const E=G(),M=i.questions.find(D=>{var R;return D.id===x||!((R=E[D.id])!=null&&R.inWrongBook)?!1:i.questions.findIndex(V=>V.id===D.id)>h});N(M?`#/q/${M.id}?from=wrong`:"#/wrong")})),(Et=document.getElementById("q-prev-btn"))==null||Et.addEventListener("click",()=>{te&&N(`#/q/${te}?from=${d.from}`)}),(Lt=document.getElementById("q-next-btn"))==null||Lt.addEventListener("click",()=>{if(ie){N(`#/q/${ie}?from=${d.from}`);return}const x=G();if(!(z.length>0&&z.every(M=>!!x[M.id]))){ds(H);return}if(d.from==="daily"){N("#/");return}d.showEndCard=!0,re()}),e.querySelectorAll(".q-switch-pill").forEach(x=>{x.addEventListener("click",()=>{const E=x.getAttribute("data-qid");E&&E!==c.id&&N(`#/q/${E}?from=${d.from}`)})});const Te=e.querySelector(".q-switcher-group"),Oe=e.querySelector(".switcher-current");if(Te&&Oe){const x=Oe.getBoundingClientRect().left-Te.getBoundingClientRect().left,E=Te.scrollLeft+x-(Te.clientWidth-Oe.offsetWidth)/2;Te.scrollLeft=Math.max(0,E)}if(T&&y){const x=y;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(v!==P||!e.isConnected)return;const E=e.querySelector("[data-view-token]");!E||E.getAttribute("data-view-token")!==F||e.querySelectorAll(".option-item").forEach(M=>{var V;const D=M.getAttribute("data-key")||"",R=x.choice===D;l(M,r(D,"graded",x.choice,x),R),(V=M.querySelector(".opt-hint-clip"))==null||V.classList.add("is-open")})})})}fe(A)}re()}function be(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gs(e){const n=e.title||e.summary;if(n&&n.trim())return n.trim();const t=(e.stem||"").split(`
`)[0].trim();return t.length>20?t.slice(0,18)+"…":t||"单选题"}function fs(e,n,t){var ee,fe,re,v,A;de(),je(10);const a=t.from==="daily"||t.from==="wrong"?t.from:"topic",s=t.qid,c=t.topic?decodeURIComponent(t.topic):"";let p=s?n.find(k=>k.id===s):void 0;if(!p){const k=Gt(n);p=k?n.find(b=>b.id===k.id):n[0]}const i=ge(n);let h=c?i.find(k=>k.name===c):p?(ee=_e(n,p.id))==null?void 0:ee.topic:i[0];h||(h=i[0]);const $=G();let q=h.questions,d=h.name;if(a==="daily")q=p?[p]:[n[0]],d="今日一题";else if(a==="wrong"){const k=h.questions.filter(b=>{var S;return!!((S=$[b.id])!=null&&S.inWrongBook)});k.length>0&&(q=k)}const F=q.length;let P=0,_=0,L=0;for(const k of q){const b=$[k.id];b&&(P++,b.result==="correct"?_++:b.result==="wrong"&&L++)}const B=Math.max(0,F-P),I=F>0?Math.round(P/F*100):0,o=94.25,r=F>0?(_/F*o).toFixed(2):"0",l=F>0?(L/F*o).toFixed(2):"0",u=`-${r}`,g=(p==null?void 0:p.id)||(q[0]?q[0].id:""),f=`#/q/${g}?from=${a}`,C=q.find(k=>!$[k.id]),w=C||p||q[0],j=q.indexOf(w)+1,O=q.map((k,b)=>{const S=b+1,y=$[k.id],m=(y==null?void 0:y.result)==="correct",T=(y==null?void 0:y.result)==="wrong",W=k.id===g,H=gs(k),U=k.topic;return m?`
          <button
            class="overview-card overview-card-correct ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${k.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">Q${S}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已掌握
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${be(H)}</span>
              <span class="overview-card-tag tag-correct">${be(U)}</span>
            </div>
          </button>
        `:T?`
          <button
            class="overview-card overview-card-wrong ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${k.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">Q${S}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${be(H)}</span>
              <span class="overview-card-tag tag-wrong">${be(U)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${k.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">Q${S}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${be(H)}</span>
              <span class="overview-card-tag tag-unanswered">${be(U)}</span>
            </div>
          </button>
        `}).join("");e.innerHTML=`
    <div class="page-wrapper page-overview select-none" data-testid="overview-page">
      <!-- Top Header -->
      <header class="overview-top-header">
        <button
          type="button"
          class="overview-back-icon-btn active-press"
          id="overview-back-btn"
          data-testid="overview-back"
          aria-label="返回做题"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5E4337" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="overview-header-titles">
          <h1 class="overview-page-title">${be(d)} · 题目总览</h1>
          <p class="overview-page-sub">共 ${F} 题 · 知识点强化</p>
        </div>
        <button
          type="button"
          class="overview-return-link-btn active-press"
          id="overview-return-btn"
        >
          <span>返回做题</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </header>

      <!-- Main Content Area -->
      <main class="overview-main-content">
        <!-- Donut Progress Card (D6-top-v3) -->
        <section class="overview-progress-card" data-testid="overview-donut">
          <!-- Left: Donut Chart -->
          <div class="overview-donut-wrap">
            <svg class="overview-donut-svg" viewBox="0 0 36 36">
              <circle cx="18" cy="18" fill="none" r="15" stroke="#e3e4d5" stroke-width="3.8"></circle>
              ${parseFloat(r)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#52643b" stroke-dasharray="${r} ${o}" stroke-dashoffset="0" stroke-width="3.8"></circle>`:""}
              ${parseFloat(l)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#C9772E" stroke-dasharray="${l} ${o}" stroke-dashoffset="${u}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${I}%</span>
              <span class="overview-donut-fraction">${P}/${F}</span>
            </div>
          </div>

          <!-- Right: Title & Stacked Legend -->
          <div class="overview-legend-col">
            <div class="overview-legend-header">
              <div class="overview-legend-title-group">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52643b" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                <span class="overview-legend-heading">作答进度</span>
              </div>
              <span class="overview-submitted-chip">已作答 ${P} 题</span>
            </div>

            <div class="overview-legend-items">
              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-green"></span>
                  <span>已掌握</span>
                </div>
                <span class="overview-legend-num">${_} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-orange"></span>
                  <span>待巩固</span>
                </div>
                <span class="overview-legend-num">${L} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-gray"></span>
                  <span>未作答</span>
                </div>
                <span class="overview-legend-num">${B} 题</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Question Grid Section -->
        <section class="overview-grid-section">
          <div class="overview-grid-header">
            <div class="overview-grid-title-group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E4337" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <h2 class="overview-grid-heading">题目索引</h2>
            </div>
            <span class="overview-grid-count-chip">${F} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${O}
          </div>
        </section>
      </main>

      <!-- Bottom Floating Action Dock -->
      <div class="overview-bottom-dock">
        <div class="overview-dock-tray">
          <button
            type="button"
            class="overview-dock-btn-secondary active-press"
            id="overview-dock-left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 19l-7-7 7-7"/>
            </svg>
            <span>返回做题</span>
          </button>
          <button
            type="button"
            class="overview-dock-btn-primary active-press"
            id="overview-dock-right"
          >
            <span>${C?`继续第 ${j} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(fe=document.getElementById("overview-back-btn"))==null||fe.addEventListener("click",()=>{N(f)}),(re=document.getElementById("overview-return-btn"))==null||re.addEventListener("click",()=>{N(f)}),(v=document.getElementById("overview-dock-left"))==null||v.addEventListener("click",()=>{N(f)}),(A=document.getElementById("overview-dock-right"))==null||A.addEventListener("click",()=>{N(`#/q/${w.id}?from=${a}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(k=>{k.addEventListener("click",()=>{const b=k.getAttribute("data-qid");b&&N(`#/q/${b}?from=${a}`)})})}const $e=document.getElementById("app");let xe=[];function ye(){const{path:e}=Pe();e==="/"||e===""?$e.innerHTML=Qn(xe):e==="/topics"?$e.innerHTML=Gn(xe):e==="/wrong"?$e.innerHTML=Kn(xe):e==="/me"&&($e.innerHTML=Jn(xe,ye));const n=Tn(e);n!=null&&je(n)}async function en(){var n;try{xe=await fn()}catch{$e.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{en()});return}Ae("/",()=>{de(),ye()}),Ae("/topics",()=>{de(),ye()}),Ae("/wrong",()=>{de(),ye()}),Ae("/me",()=>{de(),ye()}),Ae("/q/:id",(t,a)=>{de();const s=t.id,c=a.from||"topic";us($e,xe,s,c)}),Ae("/overview",(t,a)=>{de(),fs($e,xe,a)}),hn(()=>{N("#/")}),mn(()=>{const{path:t}=Pe();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me")&&ye()});const e=()=>{const{path:t}=Pe();(t==="/"||t==="")&&ye()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),vn()}en();
