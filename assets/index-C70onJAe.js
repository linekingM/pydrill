(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const p of s)if(p.type==="childList")for(const c of p.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const p={};return s.integrity&&(p.integrity=s.integrity),s.referrerPolicy&&(p.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?p.credentials="include":s.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function a(s){if(s.ep)return;s.ep=!0;const p=t(s);fetch(s.href,p)}})();let Qe=null;async function mn(e=!1){if(Qe&&!e)return Qe;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return Qe=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function ie(e){const n=new Map;for(const s of e)n.has(s.topic)||n.set(s.topic,[]),n.get(s.topic).push(s);const t=[];let a=0;for(const[s,p]of n.entries())t.push({name:s,index:a,questions:p}),a++;return t}function Re(e,n){const t=ie(e);for(const a of t){const s=a.questions.findIndex(p=>p.id===n);if(s!==-1)return{topic:a,indexInTopic:s}}return null}const Qt=[];let Gt=()=>{};function ke(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(p,c)=>(t.push(c),"([^/?#]+)")).replace(/\//g,"\\/"),s=new RegExp(`^${a}$`);Qt.push({regex:s,paramNames:t,handler:n})}function wn(e){Gt=e}function oe(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function O(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?Ze():window.location.hash=n}function Oe(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,s={};return t&&new URLSearchParams(t).forEach((c,i)=>{s[i]=c}),{path:a,query:s}}function Ze(){oe();const{path:e,query:n}=Oe();for(const t of Qt){const a=e.match(t.regex);if(a){const s={};t.paramNames.forEach((p,c)=>{s[p]=a[c+1]?decodeURIComponent(a[c+1]):""}),t.handler(s,n);return}}Gt({},n)}function bn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",Ze),Ze()}const nt="pydrill.v1.records",st="pydrill.v1.last",Ke=new Set;function yn(e){return Ke.add(e),()=>{Ke.delete(e)}}function Vt(){for(const e of Ke)try{e()}catch(n){console.error("Error in store listener:",n)}}function K(){try{const e=localStorage.getItem(nt);if(!e)return{};const n=JSON.parse(e);return typeof n!="object"||n===null?{}:n}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Ce(e){return K()[e]}function Je(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function Yt(e){try{localStorage.setItem(nt,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}Vt()}function $n(e,n){const t=K(),a=t[e.id],s=!!(a!=null&&a.inWrongBook);let p,c=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(p="correct",c=s):(p="wrong",c=!0):(p="ungraded",c=!1);const f=s&&(p==="correct"||p==="wrong"),$={choice:n,result:p,submittedAt:Date.now(),inWrongBook:c,wrongBookReviewed:f};if(p==="wrong")$.lastWrongChoice=n,$.lastWrongAt=$.submittedAt;else{const T=Je(a);T&&($.lastWrongChoice=T,typeof(a==null?void 0:a.lastWrongAt)=="number"?$.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&($.lastWrongAt=a.submittedAt))}return t[e.id]=$,Yt(t),$}function St(e){const n=K();n[e]&&(n[e]={...n[e],inWrongBook:!1},Yt(n))}function kn(){try{localStorage.removeItem(nt)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(st)}catch(e){console.error("Failed to clear last position:",e)}Vt()}function Zt(e){try{const n=localStorage.getItem(st);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,s=t.at;return typeof a!="string"||a.length===0||typeof s!="number"||!Number.isFinite(s)||!e.some(p=>p.id===a)?null:{id:a,at:s}}catch(n){return console.warn("Failed to parse last position:",n),null}}function xn(e){try{localStorage.setItem(st,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Kt(e){const n=K();return e.filter(t=>{var a;return!!((a=n[t.id])!=null&&a.inWrongBook)})}function Cn(e){const n=K(),t=e.length;let a=0;for(const s of e)n[s.id]&&a++;return{done:a,total:t}}function An(e){const n=K();let t=0,a=0,s=0;for(const p of e){const c=n[p.id];c&&(t++,c.result==="correct"&&a++,c.inWrongBook&&s++)}return{submittedCount:t,correctCount:a,wrongBookCount:s}}const Ln="pydrill.devPageIds";function Xe(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function En(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:Xe(new URLSearchParams(e.slice(n+1)).get("dev"))}function Tn(){return!0}function Sn(){const e=En();if(e!==null)return e;const n=Xe(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=Xe(localStorage.getItem(Ln));if(t!==null)return t}catch{}return Tn()}function Fn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e==="/overview"?10:null}function Ft(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function Ue(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!Sn()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const a=document.createElement("div");a.className="dev-page-id",a.setAttribute("data-testid","dev-page-id"),a.setAttribute("data-page",String(e)),a.setAttribute("aria-hidden","true"),a.textContent=t,document.body.appendChild(a)}function Bn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),s=n.getDate();return(Math.floor(Date.UTC(t,a,s)/864e5)%e+e)%e}function qn(e,n=new Date){if(e.length===0)return;const t=Bn(e.length,n);return e[t]}function Mn(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function In(e,n=new Date){const t=Ce(e.id),a=n.getTime();return!t||!Mn(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Hn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function _n(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Pn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Wn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Bt(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function jn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function Dn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Jt(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  </svg>`}function On(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function qt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function et(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Mt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function Xt(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function en(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function _e(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",s=e==="wrong",p=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${Hn(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${_n(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${s?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${Pn(s)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${p?"active":""}" data-testid="tab-me">
          ${Wn(p)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const Un=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,Pe=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,zn=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,Nn=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,Qn=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function Ge(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Gn(e){const n=K(),a=Kt(e).length,s=ie(e),p=s.length,c=qn(e),i=c?In(c):{statusText:"今天还没做",isCompletedToday:!1},f=c?Re(e,c.id):null,$=f?f.indexInTopic+1:1,T=f?f.topic.questions.length:2,I=c?`${c.topic} · 第 ${$}/${T} 题`:"今日一题",l=new Date,H=`${l.getMonth()+1}月${l.getDate()}日`,_=c!=null&&c.code?c.code.split(`
`).slice(0,3).join(`
`):"",L=s[0],S=(L==null?void 0:L.name)||"",q=L&&L.questions.length>0?L.questions.find(v=>!n[v.id])||L.questions[0]:void 0,o=Zt(e),r=o?e.find(v=>v.id===o.id):void 0,d=r?Re(e,r.id):null,u=r!=null&&r.code?(r.code.split(`
`)[0]||"").trim():"",h=r&&d?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Mt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${Ge(d.topic.name)} · 第 ${d.indexInTopic+1}/${d.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${r.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${u?`<div class="continue-code"><code>${Ge(u)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Mt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${Ge(S)}」开始吧，一次一小步。</p>
          ${q?`<a href="#/q/${q.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${Un}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
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
        <a href="#/q/${(c==null?void 0:c.id)||(q==null?void 0:q.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${zn}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${i.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${Nn}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${p} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${Qn}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${a>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${h}

      ${c?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${H}</span>
              <h3 class="daily-q-title">${I}</h3>
            </div>
            <span class="chip-status ${i.result==="correct"?"chip-green":i.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${i.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${c.stem}</p>

          ${_?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${_}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${c.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${i.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${Pe}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${_e("home",a)}
  `}const Vn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Yn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Zn(e){const n=ie(e),t=K(),a=t,s=e.filter(i=>!!a[i.id]).length,p=Kt(e).length,c=n.map((i,f)=>{const{done:$,total:T}=Cn(i.questions),I=T>0?$/T*100:0,l=i.questions.find(L=>!t[L.id])||i.questions[0],H=Vn[i.name]??Yn[i.name],_=f%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${f}"
          onclick="window.location.hash = '#/q/${l.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${en(i.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${i.name}</h2>
                <span class="topic-index-badge">#${String(f+1).padStart(2,"0")}</span>
              </div>
              ${H?`<p class="topic-sub" data-testid="topic-sub-${f}">${H}</p>`:""}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${f}">${$} / ${T}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            <div class="topic-long-fill tone-${_}" data-testid="topic-bar-${f}" style="width: ${I}%;"></div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${et()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已完成 ${s} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Pe}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${c}
      </section>
    </div>

    ${_e("topics",p)}
  `}const Kn=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function Jn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Xn(e,n){const t=K(),a=ie(e),s=e.filter(f=>{var $;return!!(($=t[f.id])!=null&&$.inWrongBook)}),p=s.length;if(p===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${et()}</span>
            </div>
            <p class="section-desc">没做对的题会放进这里，慢慢巩固</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Pe}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="温习本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${Kn}" alt="空白小本子" class="wrong-empty-img" />
          </div>
          <h2 class="wrong-empty-title">温习本是空的</h2>
          <p class="wrong-empty-desc">没做对的题会放进这里，慢慢巩固。</p>
          <div class="wrong-empty-action">
            <a href="#/" class="btn-primary active-press">
              <span>去做今日一题</span>
            </a>
          </div>
        </section>
      </div>

      ${_e("wrong",0)}
    `;let c=s[0].id;for(const f of a){const $=f.questions.find(T=>{var I;return!!((I=t[T.id])!=null&&I.inWrongBook)});if($){c=$.id;break}}const i=a.map(f=>{const $=f.questions.filter(H=>{var _;return!!((_=t[H.id])!=null&&_.inWrongBook)});if($.length===0)return"";const I=$.filter(H=>{var _;return!!((_=t[H.id])!=null&&_.wrongBookReviewed)}).length/$.length*100,l=String(f.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${f.index}"
          href="#/q/${$[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${en(f.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${Jn(f.name)}</span>
              <span class="wrong-topic-index">#${l}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${f.index}">${$.length}</span> 题待巩固
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" data-testid="wrong-topic-bar-${f.index}" style="width: ${I}%;"></div>
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
            <span class="title-doodle-leaf">${et()}</span>
          </div>
          <p class="section-desc">没做对的题会放进这里，慢慢巩固</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Pe}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <a href="#/q/${c}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有待巩固题的知识点">
        ${i}
      </section>
    </div>

    ${_e("wrong",p)}
  `}const je=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function es(e,n){const{submittedCount:t,correctCount:a,wrongBookCount:s}=An(e),p=ie(e),c=p.map(i=>`${i.name} ${i.questions.length}`).join(" · ");return typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const i=document.getElementById("clear-confirm-modal");i&&i.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const i=document.getElementById("clear-confirm-modal");i&&i.classList.add("hidden")},window.__pydrill_confirmClear=()=>{kn();const i=document.getElementById("clear-confirm-modal");i&&i.classList.add("hidden"),n&&n()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${je}" alt="小芽啾" class="me-avatar-img" />
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
          <span>${Xt(16)} 慢慢学，每一题都是进步的脚步</span>
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
                <span class="chip-status chip-orange" data-testid="bank-version">${e.length} 题 · ${p.length} 个知识点</span>
              </div>
              <p class="me-info-desc" data-testid="bank-desc">${c}</p>
            </div>
          </div>
        </div>

        <!-- Clear Records Action Card -->
        <div class="card paper-card me-danger-card">
          <div class="me-danger-item">
            <div class="me-danger-icon-box">
              ${qt()}
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
            ${qt()}
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

    ${_e("me",s)}
  `}const tt=globalThis;tt.Prism=tt.Prism??{};tt.Prism.manual=!0;var It=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ts(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Ve={exports:{}},Ht;function ns(){return Ht||(Ht=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,p=0,c={},i={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function o(r){return r instanceof f?new f(r.type,o(r.content),r.alias):Array.isArray(r)?r.map(o):r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(o){return Object.prototype.toString.call(o).slice(8,-1)},objId:function(o){return o.__id||Object.defineProperty(o,"__id",{value:++p}),o.__id},clone:function o(r,d){d=d||{};var u,h;switch(i.util.type(r)){case"Object":if(h=i.util.objId(r),d[h])return d[h];u={},d[h]=u;for(var v in r)r.hasOwnProperty(v)&&(u[v]=o(r[v],d));return u;case"Array":return h=i.util.objId(r),d[h]?d[h]:(u=[],d[h]=u,r.forEach(function(A,w){u[w]=o(A,d)}),u);default:return r}},getLanguage:function(o){for(;o;){var r=s.exec(o.className);if(r)return r[1].toLowerCase();o=o.parentElement}return"none"},setLanguage:function(o,r){o.className=o.className.replace(RegExp(s,"gi"),""),o.classList.add("language-"+r)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(u){var o=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(u.stack)||[])[1];if(o){var r=document.getElementsByTagName("script");for(var d in r)if(r[d].src==o)return r[d]}return null}},isActive:function(o,r,d){for(var u="no-"+r;o;){var h=o.classList;if(h.contains(r))return!0;if(h.contains(u))return!1;o=o.parentElement}return!!d}},languages:{plain:c,plaintext:c,text:c,txt:c,extend:function(o,r){var d=i.util.clone(i.languages[o]);for(var u in r)d[u]=r[u];return d},insertBefore:function(o,r,d,u){u=u||i.languages;var h=u[o],v={};for(var A in h)if(h.hasOwnProperty(A)){if(A==r)for(var w in d)d.hasOwnProperty(w)&&(v[w]=d[w]);d.hasOwnProperty(A)||(v[A]=h[A])}var W=u[o];return u[o]=v,i.languages.DFS(i.languages,function(U,ee){ee===W&&U!=o&&(this[U]=v)}),v},DFS:function o(r,d,u,h){h=h||{};var v=i.util.objId;for(var A in r)if(r.hasOwnProperty(A)){d.call(r,A,r[A],u||A);var w=r[A],W=i.util.type(w);W==="Object"&&!h[v(w)]?(h[v(w)]=!0,o(w,d,null,h)):W==="Array"&&!h[v(w)]&&(h[v(w)]=!0,o(w,d,A,h))}}},plugins:{},highlightAll:function(o,r){i.highlightAllUnder(document,o,r)},highlightAllUnder:function(o,r,d){var u={callback:d,container:o,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",u),u.elements=Array.prototype.slice.apply(u.container.querySelectorAll(u.selector)),i.hooks.run("before-all-elements-highlight",u);for(var h=0,v;v=u.elements[h++];)i.highlightElement(v,r===!0,u.callback)},highlightElement:function(o,r,d){var u=i.util.getLanguage(o),h=i.languages[u];i.util.setLanguage(o,u);var v=o.parentElement;v&&v.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(v,u);var A=o.textContent,w={element:o,language:u,grammar:h,code:A};function W(ee){w.highlightedCode=ee,i.hooks.run("before-insert",w),w.element.innerHTML=w.highlightedCode,i.hooks.run("after-highlight",w),i.hooks.run("complete",w),d&&d.call(w.element)}if(i.hooks.run("before-sanity-check",w),v=w.element.parentElement,v&&v.nodeName.toLowerCase()==="pre"&&!v.hasAttribute("tabindex")&&v.setAttribute("tabindex","0"),!w.code){i.hooks.run("complete",w),d&&d.call(w.element);return}if(i.hooks.run("before-highlight",w),!w.grammar){W(i.util.encode(w.code));return}if(r&&a.Worker){var U=new Worker(i.filename);U.onmessage=function(ee){W(ee.data)},U.postMessage(JSON.stringify({language:w.language,code:w.code,immediateClose:!0}))}else W(i.highlight(w.code,w.grammar,w.language))},highlight:function(o,r,d){var u={code:o,grammar:r,language:d};if(i.hooks.run("before-tokenize",u),!u.grammar)throw new Error('The language "'+u.language+'" has no grammar.');return u.tokens=i.tokenize(u.code,u.grammar),i.hooks.run("after-tokenize",u),f.stringify(i.util.encode(u.tokens),u.language)},tokenize:function(o,r){var d=r.rest;if(d){for(var u in d)r[u]=d[u];delete r.rest}var h=new I;return l(h,h.head,o),T(o,h,r,h.head,0),_(h)},hooks:{all:{},add:function(o,r){var d=i.hooks.all;d[o]=d[o]||[],d[o].push(r)},run:function(o,r){var d=i.hooks.all[o];if(!(!d||!d.length))for(var u=0,h;h=d[u++];)h(r)}},Token:f};a.Prism=i;function f(o,r,d,u){this.type=o,this.content=r,this.alias=d,this.length=(u||"").length|0}f.stringify=function o(r,d){if(typeof r=="string")return r;if(Array.isArray(r)){var u="";return r.forEach(function(W){u+=o(W,d)}),u}var h={type:r.type,content:o(r.content,d),tag:"span",classes:["token",r.type],attributes:{},language:d},v=r.alias;v&&(Array.isArray(v)?Array.prototype.push.apply(h.classes,v):h.classes.push(v)),i.hooks.run("wrap",h);var A="";for(var w in h.attributes)A+=" "+w+'="'+(h.attributes[w]||"").replace(/"/g,"&quot;")+'"';return"<"+h.tag+' class="'+h.classes.join(" ")+'"'+A+">"+h.content+"</"+h.tag+">"};function $(o,r,d,u){o.lastIndex=r;var h=o.exec(d);if(h&&u&&h[1]){var v=h[1].length;h.index+=v,h[0]=h[0].slice(v)}return h}function T(o,r,d,u,h,v){for(var A in d)if(!(!d.hasOwnProperty(A)||!d[A])){var w=d[A];w=Array.isArray(w)?w:[w];for(var W=0;W<w.length;++W){if(v&&v.cause==A+","+W)return;var U=w[W],ee=U.inside,be=!!U.lookbehind,fe=!!U.greedy,ce=U.alias;if(fe&&!U.pattern.global){var ye=U.pattern.toString().match(/[imsuy]*$/)[0];U.pattern=RegExp(U.pattern.source,ye+"g")}for(var m=U.pattern||U,g=u.next,k=h;g!==r.tail&&!(v&&k>=v.reach);k+=g.value.length,g=g.next){var C=g.value;if(r.length>o.length)return;if(!(C instanceof f)){var F=1,b;if(fe){if(b=$(m,k,o,be),!b||b.index>=o.length)break;var R=b.index,y=b.index+b[0].length,B=k;for(B+=g.value.length;R>=B;)g=g.next,B+=g.value.length;if(B-=g.value.length,k=B,g.value instanceof f)continue;for(var P=g;P!==r.tail&&(B<y||typeof P.value=="string");P=P.next)F++,B+=P.value.length;F--,C=o.slice(k,B),b.index-=k}else if(b=$(m,0,C,be),!b)continue;var R=b.index,z=b[0],se=C.slice(0,R),he=C.slice(R+z.length),J=k+C.length;v&&J>v.reach&&(v.reach=J);var Y=g.prev;se&&(Y=l(r,Y,se),k+=se.length),H(r,Y,F);var N=new f(A,ee?i.tokenize(z,ee):z,ce,z);if(g=l(r,Y,N),he&&l(r,g,he),F>1){var Q={cause:A+","+W,reach:J};T(o,r,d,g.prev,k,Q),v&&Q.reach>v.reach&&(v.reach=Q.reach)}}}}}}function I(){var o={value:null,prev:null,next:null},r={value:null,prev:o,next:null};o.next=r,this.head=o,this.tail=r,this.length=0}function l(o,r,d){var u=r.next,h={value:d,prev:r,next:u};return r.next=h,u.prev=h,o.length++,h}function H(o,r,d){for(var u=r.next,h=0;h<d&&u!==o.tail;h++)u=u.next;r.next=u,u.prev=r,o.length-=h}function _(o){for(var r=[],d=o.head.next;d!==o.tail;)r.push(d.value),d=d.next;return r}if(!a.document)return a.addEventListener&&(i.disableWorkerMessageHandler||a.addEventListener("message",function(o){var r=JSON.parse(o.data),d=r.language,u=r.code,h=r.immediateClose;a.postMessage(i.highlight(u,i.languages[d],d)),h&&a.close()},!1)),i;var L=i.util.currentScript();L&&(i.filename=L.src,L.hasAttribute("data-manual")&&(i.manual=!0));function S(){i.manual||i.highlightAll()}if(!i.manual){var q=document.readyState;q==="loading"||q==="interactive"&&L&&L.defer?document.addEventListener("DOMContentLoaded",S):window.requestAnimationFrame?window.requestAnimationFrame(S):window.setTimeout(S,16)}return i})(n);e.exports&&(e.exports=t),typeof It<"u"&&(It.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,p){var c={};c["language-"+p]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[p]},c.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:c}};i["language-"+p]={pattern:/[\s\S]+/,inside:t.languages[p]};var f={};f[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",f)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var p=a.languages.markup;p&&(p.tag.addInlined("style","css"),p.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",s=function(L,S){return"✖ Error "+L+" while fetching file: "+S},p="✖ Error: File does not exist or is empty",c={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",f="loading",$="loaded",T="failed",I="pre[data-src]:not(["+i+'="'+$+'"]):not(['+i+'="'+f+'"])';function l(L,S,q){var o=new XMLHttpRequest;o.open("GET",L,!0),o.onreadystatechange=function(){o.readyState==4&&(o.status<400&&o.responseText?S(o.responseText):o.status>=400?q(s(o.status,o.statusText)):q(p))},o.send(null)}function H(L){var S=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(L||"");if(S){var q=Number(S[1]),o=S[2],r=S[3];return o?r?[q,Number(r)]:[q,void 0]:[q,q]}}t.hooks.add("before-highlightall",function(L){L.selector+=", "+I}),t.hooks.add("before-sanity-check",function(L){var S=L.element;if(S.matches(I)){L.code="",S.setAttribute(i,f);var q=S.appendChild(document.createElement("CODE"));q.textContent=a;var o=S.getAttribute("data-src"),r=L.language;if(r==="none"){var d=(/\.(\w+)$/.exec(o)||[,"none"])[1];r=c[d]||d}t.util.setLanguage(q,r),t.util.setLanguage(S,r);var u=t.plugins.autoloader;u&&u.loadLanguages(r),l(o,function(h){S.setAttribute(i,$);var v=H(S.getAttribute("data-range"));if(v){var A=h.split(/\r\n?|\n/g),w=v[0],W=v[1]==null?A.length:v[1];w<0&&(w+=A.length),w=Math.max(0,Math.min(w-1,A.length)),W<0&&(W+=A.length),W=Math.max(0,Math.min(W,A.length)),h=A.slice(w,W).join(`
`),S.hasAttribute("data-start")||S.setAttribute("data-start",String(w+1))}q.textContent=h,t.highlightElement(q)},function(h){S.setAttribute(i,T),q.textContent=h})}}),t.plugins.fileHighlight={highlight:function(S){for(var q=(S||document).querySelectorAll(I),o=0,r;r=q[o++];)t.highlightElement(r)}};var _=!1;t.fileHighlight=function(){_||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),_=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(Ve)),Ve.exports}var ss=ns();const _t=ts(ss);var Pt={},Wt;function as(){return Wt||(Wt=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),Pt}as();function rs(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((s,p)=>{const c=p+1,f=_t.highlight(s,_t.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${c}</span><span class="code-line-content">${f}</span></div>`}).join("")}</code></pre></div>`}function jt(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),s=String(n.getHours()).padStart(2,"0"),p=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${s}:${p}`}function X(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Dt=200,Rt=1600,Ot=300,os=1800;let Le=0,pe=0,Ut=!1;function is(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let De="#/overview";function cs(e,n){return n<=3?Array.from({length:n},(t,a)=>a):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function He(){Le+=1,pe&&(window.clearTimeout(pe),pe=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function ls(){Ut||(Ut=!0,window.addEventListener("hashchange",He))}function ds(e,n){const t=n.getBoundingClientRect(),a=t.left+t.width/2,s=e.offsetWidth,p=e.offsetHeight,c=1,i=6,f=40,$=8,T=document.documentElement.clientWidth;let I=a+c+f+i,l=I-s;l<$&&(l=$,I=l+s),I>T-$&&(I=T-$,l=Math.max($,I-s),I=l+s);let H=I-c-i-a;const _=12,L=Math.max(_,s-c*2-12-_);H<_&&(H=_),H>L&&(H=L),e.style.right=`${Math.round(T-I)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-p)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(H)}px`)}function ps(e,n){if(n!==Le||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(s=>s.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:Ot,easing:"ease",fill:"forwards"}),a=()=>{n===Le&&e.remove()};t.onfinish=a,window.setTimeout(a,Ot+60)}function Ye(e,n,t,a){pe&&window.clearTimeout(pe),pe=window.setTimeout(()=>{if(pe=0,!(n!==Le||!e.isConnected)){if(!a){e.remove();return}ps(e,n)}},t)}function us(e=De){var i;const n=document.getElementById("q-next-btn");if(!n)return;De=e,Le+=1;const t=Le;pe&&(window.clearTimeout(pe),pe=0);const a=is();let s=document.querySelector(".finish-tip");const p=!!s;if(s?document.querySelectorAll(".finish-tip").forEach(f=>{f!==s&&f.remove()}):(s=document.createElement("div"),s.className="finish-tip tip-bubble",s.setAttribute("data-testid","tip-bubble"),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(s),(i=s.querySelector(".finish-tip-tag"))==null||i.addEventListener("click",f=>{f.stopPropagation(),He(),O(De)})),ds(s,n),a){s.getAnimations().forEach(f=>f.cancel()),s.style.opacity="1",s.style.transform="none",Ye(s,t,os,!1);return}if(p){s.getAnimations().forEach(f=>f.cancel()),s.style.opacity="1",s.style.transform="translateY(0)",Ye(s,t,Rt,!0);return}const c=s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:Dt,easing:"ease-out",fill:"forwards"});c.onfinish=()=>{t!==Le||!s.isConnected||(s.style.opacity="1",s.style.transform="translateY(0)")},Ye(s,t,Dt+Rt,!0)}function zt(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${X(t)}</code>`)}function gs(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,s="";n!==-1&&(a=e.slice(0,n).trim(),s=e.slice(n+t).trim(),s=s.replace(/^[：:\s]+/,""));const p=a.split(/\n+/).map(i=>i.trim()).filter(Boolean).map(i=>`<p class="explanation-p">${zt(i)}</p>`).join("");let c="";if(s){const i=zt(s);c=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Jt(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${i}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${p}
      ${c}
    </div>
  `}function Te(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function fs(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),a=n.querySelector(".code-header");if(!t)return;const s=()=>{const p=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",p),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${a?a.offsetHeight:0}px`),s(),t.addEventListener("scroll",s,{passive:!0})})}function Nt(e,n,t,a="topic",s={}){var ye;ls(),He(),oe();const p=a==="daily"||a==="wrong"?a:"topic",c=n.find(m=>m.id===t);if(!c){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Ue(Ft(p,!1));return}if(p==="wrong"&&!s.endCard&&!((ye=Ce(c.id))!=null&&ye.inWrongBook)){window.location.replace(`#/q/${c.id}?from=topic`);return}s.endCard||xn(c.id);const i=Re(n,c.id),f=(i==null?void 0:i.topic)||ie(n)[0],$=i?i.indexInTopic:0,T=f.questions.length,I=Ce(c.id);f.questions.filter(m=>{var g;return!!((g=K()[m.id])!=null&&g.inWrongBook)}).length;const l={from:p,selectedChoice:p==="wrong"?null:I?I.choice:null,isRedoing:!1,wrongFresh:p==="wrong",showLastTrace:!1,showEndCard:!!s.endCard&&p!=="daily",justRemovedWrong:!1},H=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let _=0,L=null,S=!1;const q='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',o='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function r(m){return/Error|Exception/.test(m)}function d(m,g,k,C){return g!=="graded"?k===m?"selected":"idle":c.answer&&m===c.answer?"correct":k===m&&(C==null?void 0:C.result)==="wrong"?"wrong":"locked"}function u(m,g,k){const C=m.querySelector(".opt-badge"),F=m.querySelector(".opt-text"),b=m.querySelector(".opt-status");if(!C||!F||!b)return;const y=m.getAttribute("data-error")==="1";m.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),C.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),F.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),m.setAttribute("aria-checked",k?"true":"false"),g==="correct"?m.setAttribute("data-state","correct"):g==="wrong"?m.setAttribute("data-state","wrong"):m.removeAttribute("data-state"),g==="selected"||g==="correct"?(m.classList.add(g==="correct"?"opt-card-correct":"opt-card-selected"),g==="selected"&&m.classList.add("opt-pressable"),C.classList.add(g==="correct"?"opt-badge-correct":"opt-badge-selected"),F.classList.add("opt-text-strong"),b.innerHTML=q):g==="wrong"?(m.classList.add("opt-card-wrong"),C.classList.add("opt-badge-wrong"),F.classList.add("opt-text-strong","opt-text-wrong"),b.innerHTML=o):g==="locked"?(m.classList.add("opt-card-locked"),C.classList.add("opt-badge-default"),y&&F.classList.add("opt-text-error"),b.innerHTML=""):(m.classList.add("opt-card-default","opt-pressable"),C.classList.add("opt-badge-default"),y&&F.classList.add("opt-text-error"),b.innerHTML="")}function h(m,g,k,C){const F=r(m.text),b=["option-item"],y=["opt-badge"],B=["opt-text"];let P="",R="";g==="selected"?(b.push("opt-card-selected","opt-pressable"),y.push("opt-badge-selected"),B.push("opt-text-strong"),P=q):g==="correct"?(b.push("opt-card-correct"),y.push("opt-badge-correct"),B.push("opt-text-strong"),P=q,R='data-state="correct"'):g==="wrong"?(b.push("opt-card-wrong"),y.push("opt-badge-wrong"),B.push("opt-text-strong","opt-text-wrong"),P=o,R='data-state="wrong"'):g==="locked"?(b.push("opt-card-locked"),y.push("opt-badge-default"),F&&B.push("opt-text-error")):(b.push("opt-card-default","opt-pressable"),y.push("opt-badge-default"),F&&B.push("opt-text-error"));const z=(m.hint||"").trim(),se=C!=="none"&&z?`<div class="opt-hint-clip${C==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${X(m.key)}">${X(z)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${k?"true":"false"}"
            ${R}
            class="${b.join(" ")}"
            data-testid="option-${X(m.key)}"
            data-key="${X(m.key)}"
            data-error="${F?"1":"0"}"
          >
            <span class="${y.join(" ")}">${X(m.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${B.join(" ")}">${X(m.text)}</span>
                <span class="opt-status">${P}</span>
              </div>
              ${se}
            </div>
          </div>
        `}const v='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',A='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let w=0;function W(){var g;(g=document.getElementById("pydrill-wrong-toast"))==null||g.remove();const m=document.createElement("div");m.id="pydrill-wrong-toast",m.className="wrong-toast",m.setAttribute("role","status"),m.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(m),window.setTimeout(()=>{m.remove()},1500)}function U(){const m=e.querySelector("#q-toggle-last");if(!m)return;const g=l.showLastTrace;m.setAttribute("aria-pressed",g?"true":"false");const k=m.querySelector("span");k&&(k.textContent=g?"隐藏上次":"看上次思路");const C=m.querySelector("svg");C&&(C.outerHTML=g?A:v)}function ee(m,g,k,C){const F=(g.hint||"").trim(),b=m.querySelector(".opt-body");if(!b)return;let y=m.querySelector(".opt-hint-clip");if(k&&F){y||(y=document.createElement("div"),y.className="opt-hint-clip",y.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${X(g.key)}">${X(F)}</p></div>`,b.appendChild(y));const B=y;requestAnimationFrame(()=>{requestAnimationFrame(()=>{C===w&&B.classList.add("is-open")})})}else if(y){y.classList.remove("is-open");const B=y,P=C,R=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{P===w&&B.remove()},R?0:200)}}function be(m){const g=++w,k=Ce(c.id),C=Je(k),F=(c.answer||"").trim();e.querySelectorAll(".option-item").forEach(y=>{const B=y.getAttribute("data-key")||"",P=c.options.find(Q=>Q.key===B);if(!m){const Q=l.selectedChoice===B;u(y,Q?"selected":"idle",Q),P&&ee(y,P,!1,g);return}const R=y.querySelector(".opt-badge"),z=y.querySelector(".opt-text"),se=y.querySelector(".opt-status");if(!R||!z||!se)return;const he=y.getAttribute("data-error")==="1",J=!!C&&B===C,Y=!!F&&B===F;y.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),R.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),z.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),y.setAttribute("aria-checked","false"),y.removeAttribute("data-state"),J&&!Y?(y.classList.add("opt-card-trace-last"),R.classList.add("opt-badge-trace-last"),z.classList.add("opt-text-strong","opt-text-trace-last")):Y?(y.classList.add("opt-card-trace-correct"),R.classList.add("opt-badge-trace-correct"),z.classList.add("opt-text-strong","opt-text-trace-correct")):(y.classList.add("opt-card-default","opt-card-trace-dim"),R.classList.add("opt-badge-default"),he&&z.classList.add("opt-text-error"));const N=[];J&&N.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${X(B)}">上次选的 ${X(B)}</span>`),Y&&N.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${X(B)}">正确答案 ${X(B)}</span>`),se.innerHTML=N.length?`<span class="opt-trace-tag-row">${N.join("")}</span>`:"",P&&ee(y,P,J||Y,g)});const b=e.querySelector("#q-submit-btn");if(b){const y=m||!l.selectedChoice;b.disabled=y,b.classList.toggle("btn-disabled",y)}}function fe(m){Ue(Ft(l.from,l.showEndCard)),(m||l.showEndCard)&&oe()}function ce(){var vt,mt,wt,bt,yt,$t,kt,xt,Ct,At,Lt,Et,Tt;He();const m=++_,g=L!==c.id;L=c.id;const k=Ce(c.id),C=Je(k).length>0,b=l.isRedoing||l.wrongFresh?void 0:k,y=!!b;y&&(l.showLastTrace=!1);const B=S&&y;S=!1;let P="#/topics";l.from==="daily"&&(P="#/"),l.from==="wrong"&&(P="#/wrong");const R=`#/overview?from=${l.from}&qid=${c.id}${l.from==="topic"?"&topic="+encodeURIComponent(f.name):""}`;De=R;let z="题目总览";l.from==="daily"&&(z="今日一题");let se=null,he=null,J=!1,Y=!1,N=f.questions,Q=$;if(l.from==="wrong"){const x=K();N=f.questions.filter(E=>{var M;return!!((M=x[E.id])!=null&&M.inWrongBook)}),Q=N.findIndex(E=>E.id===c.id)}l.from==="daily"?(Y=!0,J=!0,N=[c],Q=0):Q<0?(Y=!0,J=!0):(Y=Q===0,J=Q>=N.length-1,Y||(se=N[Q-1].id),J||(he=N[Q+1].id));const nn=K(),sn=N.length>0&&N.every(x=>Te(nn[x.id],l.from)),at=J&&!sn,an=Q>=0?Q+1:1,rn=l.from==="wrong"?Math.max(N.length,1):T,on=l.from==="wrong"?`${f.name} · 温习 ${an}/${rn}`:l.from==="daily"?`今日一题 · ${f.name}`:`${f.name} · 第 ${$+1}/${T} 题`;if(l.showEndCard){if(l.from==="daily"){O("#/");return}const x=l.from==="topic",E=K();let M="",D="",j="#/topics",G="返回知识点列表",le="",Fe="",ve="";if(x){let te=0;for(const Z of f.questions)((vt=E[Z.id])==null?void 0:vt.result)==="wrong"&&te++;M="这个知识点做完了",te>0?(D=`今天发现 ${te} 道需要巩固的题`,ve=`
            <a
              href="#/wrong"
              class="btn-primary w-full active-press end-review-btn"
              data-testid="end-wrong-btn"
              id="end-wrong-btn"
            >
              <span>去温习</span>
            </a>
          `):D="全对！这一组你已经完全掌握了",j="#/topics",G="返回知识点列表",le=`
          <div class="end-questions-list">
            ${f.questions.map((Z,ae)=>{const V=ae+1,re=E[Z.id],de=(re==null?void 0:re.result)==="correct",Ee=(re==null?void 0:re.result)==="wrong";let Me="end-chip-gray",$e="· 未做";de?(Me="end-chip-green",$e="✓ 答对"):Ee&&(Me="end-chip-red",$e="待巩固");const Ie=Z.title&&Z.title.trim()?Z.title.trim():Z.code?Z.code.split(`
`)[0].trim():Z.stem;return`
              <a href="#/q/${Z.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${V} 题</span>
                  <span class="end-q-code">${X(Ie)}</span>
                </div>
                <span class="end-chip ${Me}">${$e}</span>
              </a>
            `}).join("")}
          </div>
        `;const ne=ie(n),me=ne.findIndex(Z=>Z.name===f.name),qe=me!==-1&&me<ne.length-1?ne[me+1]:null;qe&&qe.questions.length>0&&(Fe=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{const te=f.questions.filter(ae=>{var V;return!!((V=E[ae.id])!=null&&V.inWrongBook)}),ue=te.length,ne=te.filter(ae=>{var V;return((V=E[ae.id])==null?void 0:V.result)==="correct"}).length;M="温习本这一轮看完了",ne>0?D=`好样的！你已经纠正了 ${ne} 道之前做错的题。`:D="再练一轮，会越来越熟。",j="#/wrong",G="返回温习本",ue>0?le=`
            <div class="end-questions-list">
              ${te.map((V,re)=>{const de=E[V.id],Ee=(de==null?void 0:de.result)==="correct",Me=(de==null?void 0:de.result)==="wrong";let $e="end-chip-gray",Ie="· 未做";Ee?($e="end-chip-green",Ie="✓ 答对"):Me&&($e="end-chip-red",Ie="待巩固");const vn=V.title&&V.title.trim()?V.title.trim():V.code?V.code.split(`
`)[0].trim():V.stem;return`
                <a href="#/q/${V.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${re+1}/${ue}</span>
                    <span class="end-q-code">${X(vn)}</span>
                  </div>
                  <span class="end-chip ${$e}">${Ie}</span>
                </a>
              `}).join("")}
            </div>
          `:le=`
            <div class="end-empty-row">
              ${Xt(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const me=ie(n),qe=me.findIndex(ae=>ae.name===f.name);let Z=null;if(qe!==-1)for(let ae=1;ae<me.length;ae++){const re=me[(qe+ae)%me.length].questions.find(de=>{var Ee;return!!((Ee=E[de.id])!=null&&Ee.inWrongBook)});if(re){Z=re.id;break}}Z&&(Fe=`
            <a
              href="#/q/${Z}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const Be=l.from==="wrong"?"温习本 · 完成":`${f.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${H}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${Bt()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${Be}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${je}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${M}</h2>
              <p class="end-sub" data-testid="end-subtitle">${D}</p>

              ${le}

              <div class="end-action-wrap flex-col-gap">
                ${ve}
                <button
                  type="button"
                  class="${ve?"btn-secondary":"btn-primary"} w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${G}
                </button>
                ${Fe}
              </div>
            </div>
          </main>
        </div>
      `,(mt=document.getElementById("q-back-btn"))==null||mt.addEventListener("click",()=>{O(P)}),(wt=document.getElementById("end-leave-btn"))==null||wt.addEventListener("click",()=>{O(j)}),(bt=document.getElementById("end-next-topic-btn"))==null||bt.addEventListener("click",()=>{const te=ie(n),ue=te.findIndex(ne=>ne.name===f.name);if(ue!==-1&&ue<te.length-1){const ne=te[ue+1];O(`#/q/${ne.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(te=>{te.addEventListener("click",ue=>{const ne=te.getAttribute("href");ne&&(ue.preventDefault(),O(ne))})}),fe(g);return}const We=y?B?"pending":"graded":"answering",cn=We==="answering"?"none":We==="pending"?"closed":"open",rt=We==="graded"?(b==null?void 0:b.choice)??null:l.selectedChoice,ln=c.options.map(x=>h(x,d(x.key,We,rt,b),rt===x.key,cn)).join("");let ot="";if(y&&b){let x=je,E="答对了，理解到位";const M=jt(b.submittedAt);let D=`你选了 ${b.choice} · 正确答案 ${c.answer} · ${M} 提交`,j="banner-correct",G="",le="";b.result==="wrong"?(x=Pe,E="这题有个小坑，看看解析",D=`你选了 ${b.choice} · 正确答案是 ${c.answer} · ${M} 提交`,j="banner-wrong",b.inWrongBook&&(G='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):b.result==="correct"?b.inWrongBook&&l.from!=="wrong"?le=`
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
          `:l.justRemovedWrong&&l.from!=="wrong"&&(le=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出温习本 ✓</span>
            </div>
          `):b.result==="ungraded"&&(x=je,E="已提交（未判分）",D=`这题的答案还没编写 · ${M} 提交`,j="banner-ungraded"),ot=`
        <section class="result-banner ${j}" data-testid="result-banner" data-result="${b.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${x}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${E}</h2>
              <p class="result-sub">${D}</p>
              ${G?`<div class="result-tag-wrap result-tag-below">${G}</div>`:""}
            </div>
          </div>
          ${le}
        </section>
      `}let it="";if(y&&b){const x=gs(c.explanation);it=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Jt()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${x}
          </div>
        </section>
      `}let ct="";c.animationId!=null&&y&&(ct=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let lt="";if(l.isRedoing&&l.from!=="wrong"){const x=Ce(c.id);if(x){const E=x.result==="correct"?"答对":x.result==="wrong"?"待巩固":"已提交",M=jt(x.submittedAt);lt=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${E}（选 ${x.choice} · ${M}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const dt=l.from==="wrong"?N:f.questions,dn=l.from!=="wrong"||y,pn=dt.length,un=cs(Math.max(0,Q),pn).map(x=>{const E=dt[x],M=x+1,D=E.id===c.id,j=Ce(E.id),G=dn&&Te(j,l.from),le=G&&(j==null?void 0:j.result)==="correct",Fe=G&&(j==null?void 0:j.result)==="wrong";let ve="switcher-unanswered",Be=`<span>${M}</span>`;return le?(ve="switcher-correct",Be=jn()):Fe&&(ve="switcher-wrong",Be=Dn()),D&&(ve+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${ve} active-press"
            data-testid="q-switch-${M}"
            data-qid="${E.id}"
            title="第 ${M} 题"
          >
            ${Be}
          </button>
        `}).join(""),gn=y?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${On(14)}
          <span>重做</span>
        </button>
      `:"",pt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${Y?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${Y?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,ut=J?"完成":"下一题 ›",gt=J?' data-action="finish"':"",ft=at?" btn-finish-locked":"",ht=at?' aria-disabled="true"':"",fn=`
      <button
        type="button"
        class="btn-nav-next active-press${ft}"
        data-testid="next"
        id="q-next-btn"${gt}${ht}
      >
        <span>${ut}</span>
      </button>
    `,hn=`
      <button
        type="button"
        class="btn-next-main active-press${ft}"
        data-testid="next"
        id="q-next-btn"${gt}${ht}
      >
        <span>${ut}</span>
      </button>
    `;let ze="";if(y)ze=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${pt}
            ${gn}
            ${hn}
          </div>
        </div>
      `;else{const x=!!l.selectedChoice;ze=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${pt}
            <button
              type="button"
              class="btn-submit-main active-press ${x?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${x?"":"disabled"}
            >
              <span>${x?"提交答案":"提交"}</span>
            </button>
            ${fn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${H}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${Bt()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${on}</span>
          ${l.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出温习本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <button type="button" class="q-source-badge q-source-chip active-press" data-testid="q-source" id="q-overview-chip">
              <span class="status-dot-green"></span>
              <span>${z}</span>
            </button>
            ${l.from==="wrong"?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${l.showLastTrace?"true":"false"}" ${C?"":"disabled"}>
                    ${l.showLastTrace?A:v}
                    <span>${l.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${un}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${lt}

          <!-- 4. Result Banner (if submitted) -->
          ${ot}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${c.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${c.code?rs(c.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${ln}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${it}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${ct}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${ze}
      </div>
    `,(yt=document.getElementById("q-back-btn"))==null||yt.addEventListener("click",()=>{O(P)}),($t=document.getElementById("q-overview-chip"))==null||$t.addEventListener("click",()=>{O(R)}),y)(xt=document.getElementById("q-redo-btn"))==null||xt.addEventListener("click",()=>{l.isRedoing=!0,l.selectedChoice=null,l.showLastTrace=!1,l.justRemovedWrong=!1,ce()}),l.from!=="wrong"&&((Ct=document.getElementById("q-remove-wrong-btn"))==null||Ct.addEventListener("click",()=>{St(c.id),l.justRemovedWrong=!0,ce()}));else{const x=e.querySelectorAll(".option-item");x.forEach(E=>{E.addEventListener("click",()=>{if(l.showLastTrace)return;const M=E.getAttribute("data-key");if(!M||M===l.selectedChoice)return;l.selectedChoice=M,x.forEach(j=>{const G=j.getAttribute("data-key")===M;u(j,G?"selected":"idle",G)});const D=e.querySelector("#q-submit-btn");if(D){D.disabled=!1,D.classList.remove("btn-disabled");const j=D.querySelector("span");j&&(j.textContent="提交答案")}})}),(kt=document.getElementById("q-submit-btn"))==null||kt.addEventListener("click",()=>{!l.selectedChoice||l.showLastTrace||($n(c,l.selectedChoice),l.isRedoing=!1,l.wrongFresh=!1,l.showLastTrace=!1,l.justRemovedWrong=!1,S=!0,ce())})}l.from==="wrong"&&((At=document.getElementById("q-remove-wrong-btn"))==null||At.addEventListener("click",()=>{const x=c.id;St(x),W();const E=K(),M=f.questions.find(D=>{var j;return D.id===x||!((j=E[D.id])!=null&&j.inWrongBook)?!1:f.questions.findIndex(G=>G.id===D.id)>$});O(M?`#/q/${M.id}?from=wrong`:"#/wrong")})),(Lt=document.getElementById("q-toggle-last"))==null||Lt.addEventListener("click",()=>{const x=e.querySelector("#q-toggle-last");if(!(!x||x.disabled)){if(l.showLastTrace=!l.showLastTrace,y&&!l.showLastTrace){ce();return}U(),be(l.showLastTrace)}}),(Et=document.getElementById("q-prev-btn"))==null||Et.addEventListener("click",()=>{se&&O(`#/q/${se}?from=${l.from}`)}),(Tt=document.getElementById("q-next-btn"))==null||Tt.addEventListener("click",()=>{if(he){O(`#/q/${he}?from=${l.from}`);return}const x=K();if(!(N.length>0&&N.every(D=>Te(x[D.id],l.from)))){us(R);return}if(l.from==="daily"){O("#/");return}const M=l.from==="wrong"?"wrong":"topic";He(),window.history.replaceState(null,"",P),window.location.hash=`#/done/${M}/${f.index}`}),e.querySelectorAll(".q-switch-pill").forEach(x=>{x.addEventListener("click",()=>{const E=x.getAttribute("data-qid");E&&E!==c.id&&O(`#/q/${E}?from=${l.from}`)})});const Se=e.querySelector(".q-switcher-group"),Ne=e.querySelector(".switcher-current");if(Se&&Ne){const x=Ne.getBoundingClientRect().left-Se.getBoundingClientRect().left,E=Se.scrollLeft+x-(Se.clientWidth-Ne.offsetWidth)/2;Se.scrollLeft=Math.max(0,E)}if(B&&b){const x=b;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(m!==_||!e.isConnected)return;const E=e.querySelector("[data-view-token]");!E||E.getAttribute("data-view-token")!==H||e.querySelectorAll(".option-item").forEach(M=>{var G;const D=M.getAttribute("data-key")||"",j=x.choice===D;u(M,d(D,"graded",x.choice,x),j),(G=M.querySelector(".opt-hint-clip"))==null||G.classList.add("is-open")})})})}fs(e),fe(g)}ce()}function xe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function hs(e){const n=e.title||e.summary;if(n&&n.trim())return n.trim();const t=(e.stem||"").split(`
`)[0].trim();return t.length>20?t.slice(0,18)+"…":t||"单选题"}function vs(e,n,t){var ee,be,fe,ce,ye,m;oe(),Ue(10);const a=t.from==="daily"||t.from==="wrong"?t.from:"topic",s=t.qid,p=t.topic?decodeURIComponent(t.topic):"";if(!s&&!p&&!t.from){window.location.replace("#/");return}let c=s?n.find(g=>g.id===s):void 0;if(!c){const g=Zt(n);c=g?n.find(k=>k.id===g.id):n[0]}const i=ie(n);let f=p?i.find(g=>g.name===p):c?(ee=Re(n,c.id))==null?void 0:ee.topic:i[0];f||(f=i[0]);const $=K();if(a==="wrong"&&!f.questions.some(g=>{var k;return(k=$[g.id])==null?void 0:k.inWrongBook})){const g=i.find(k=>k.questions.some(C=>{var F;return(F=$[C.id])==null?void 0:F.inWrongBook}));if(!g){window.location.replace("#/wrong");return}f=g,(!c||!((be=$[c.id])!=null&&be.inWrongBook))&&(c=g.questions.find(k=>{var C;return(C=$[k.id])==null?void 0:C.inWrongBook}))}let T=f.questions,I=f.name;if(a==="daily")T=c?[c]:[n[0]],I="今日一题";else if(a==="wrong"){const g=f.questions.filter(k=>{var C;return!!((C=$[k.id])!=null&&C.inWrongBook)});g.length>0&&(T=g)}const l=T.length;let H=0,_=0,L=0;for(const g of T){const k=$[g.id];k&&Te(k,a)&&(H++,k.result==="correct"?_++:k.result==="wrong"&&L++)}const S=Math.max(0,l-H),q=l>0?Math.round(H/l*100):0,o=94.25,r=l>0?(_/l*o).toFixed(2):"0",d=l>0?(L/l*o).toFixed(2):"0",u=`-${r}`,h=(c==null?void 0:c.id)||(T[0]?T[0].id:""),v=`#/q/${h}?from=${a}`,A=T.find(g=>!Te($[g.id],a)),w=A||c||T[0],W=T.indexOf(w)+1,U=T.map((g,k)=>{const C=k+1,F=$[g.id],b=Te(F,a),y=b&&(F==null?void 0:F.result)==="correct",B=b&&(F==null?void 0:F.result)==="wrong",P=g.id===h,R=hs(g),z=g.topic;return y?`
          <button
            class="overview-card overview-card-correct ${P?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${g.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">Q${C}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已掌握
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${xe(R)}</span>
              <span class="overview-card-tag tag-correct">${xe(z)}</span>
            </div>
          </button>
        `:B?`
          <button
            class="overview-card overview-card-wrong ${P?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${g.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">Q${C}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${xe(R)}</span>
              <span class="overview-card-tag tag-wrong">${xe(z)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${P?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${g.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">Q${C}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${xe(R)}</span>
              <span class="overview-card-tag tag-unanswered">${xe(z)}</span>
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5e3f34" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div class="overview-header-titles">
          <h1 class="overview-page-title">${xe(I)} · 题目总览</h1>
          <p class="overview-page-sub">共 ${l} 题 · 知识点强化</p>
        </div>
        <div class="overview-header-spacer" aria-hidden="true"></div>
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
              ${parseFloat(d)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${d} ${o}" stroke-dashoffset="${u}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${q}%</span>
              <span class="overview-donut-fraction">${H}/${l}</span>
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
              <span class="overview-submitted-chip">已作答 ${H} 题</span>
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
                <span class="overview-legend-num">${S} 题</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Question Grid Section -->
        <section class="overview-grid-section">
          <div class="overview-grid-header">
            <div class="overview-grid-title-group">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5e3f34" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <h2 class="overview-grid-heading">题目索引</h2>
            </div>
            <span class="overview-grid-count-chip">${l} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${U}
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
            <span>${A?`继续第 ${W} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(fe=document.getElementById("overview-back-btn"))==null||fe.addEventListener("click",()=>{O(v)}),(ce=document.getElementById("overview-return-btn"))==null||ce.addEventListener("click",()=>{O(v)}),(ye=document.getElementById("overview-dock-left"))==null||ye.addEventListener("click",()=>{O(v)}),(m=document.getElementById("overview-dock-right"))==null||m.addEventListener("click",()=>{O(`#/q/${w.id}?from=${a}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(g=>{g.addEventListener("click",()=>{const k=g.getAttribute("data-qid");k&&O(`#/q/${k}?from=${a}`)})})}const we=document.getElementById("app");let ge=[];function Ae(){const{path:e}=Oe();e==="/"||e===""?we.innerHTML=Gn(ge):e==="/topics"?we.innerHTML=Zn(ge):e==="/wrong"?we.innerHTML=Xn(ge):e==="/me"&&(we.innerHTML=es(ge,Ae));const n=Fn(e);n!=null&&Ue(n)}async function tn(){var n;try{ge=await mn()}catch{we.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{tn()});return}ke("/",()=>{oe(),Ae()}),ke("/topics",()=>{oe(),Ae()}),ke("/wrong",()=>{oe(),Ae()}),ke("/me",()=>{oe(),Ae()}),ke("/q/:id",(t,a)=>{oe();const s=t.id,p=a.from||"topic";Nt(we,ge,s,p)}),ke("/done/:kind/:topicIndex",t=>{oe();const s=ie(ge)[Number(t.topicIndex)];if(!s||!s.questions.length){O("#/");return}const p=t.kind==="wrong"?"wrong":"topic",c=p==="topic"?s.questions[s.questions.length-1].id:s.questions[0].id;Nt(we,ge,c,p,{endCard:!0})}),ke("/overview",(t,a)=>{oe(),vs(we,ge,a)}),wn(()=>{O("#/")}),yn(()=>{const{path:t}=Oe();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me")&&Ae()});const e=()=>{const{path:t}=Oe();(t==="/"||t==="")&&Ae()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),bn()}tn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
