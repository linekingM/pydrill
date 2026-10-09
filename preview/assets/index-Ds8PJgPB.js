(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const g of c.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&a(g)}).observe(document,{childList:!0,subtree:!0});function t(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(i){if(i.ep)return;i.ep=!0;const c=t(i);fetch(i.href,c)}})();let _e=null;async function Vt(e=!1){if(_e&&!e)return _e;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return _e=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function ue(e){const n=new Map;for(const i of e)n.has(i.topic)||n.set(i.topic,[]),n.get(i.topic).push(i);const t=[];let a=0;for(const[i,c]of n.entries())t.push({name:i,index:a,questions:c}),a++;return t}function De(e,n){const t=ue(e);for(const a of t){const i=a.questions.findIndex(c=>c.id===n);if(i!==-1)return{topic:a,indexInTopic:i}}return null}const Et=[];let St=()=>{};function Fe(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(c,g)=>(t.push(g),"([^/?#]+)")).replace(/\//g,"\\/"),i=new RegExp(`^${a}$`);Et.push({regex:i,paramNames:t,handler:n})}function Gt(e){St=e}function de(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function te(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?We():window.location.hash=n}function Te(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,i={};return t&&new URLSearchParams(t).forEach((g,o)=>{i[o]=g}),{path:a,query:i}}function We(){de();const{path:e,query:n}=Te();for(const t of Et){const a=e.match(t.regex);if(a){const i={};t.paramNames.forEach((c,g)=>{i[c]=a[g+1]?decodeURIComponent(a[g+1]):""}),t.handler(i,n);return}}St({},n)}function Qt(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",We),We()}const Qe="pydrill.v1.records",Ne="pydrill.v1.last",Re=new Set;function Nt(e){return Re.add(e),()=>{Re.delete(e)}}function Tt(){for(const e of Re)try{e()}catch(n){console.error("Error in store listener:",n)}}function J(){try{const e=localStorage.getItem(Qe);if(!e)return{};const n=JSON.parse(e);return typeof n!="object"||n===null?{}:n}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function be(e){return J()[e]}function Oe(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function qt(e){try{localStorage.setItem(Qe,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}Tt()}function Zt(e,n){const t=J(),a=t[e.id];let i,c=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(i="correct",c=(a==null?void 0:a.inWrongBook)??!1):(i="wrong",c=!0):(i="ungraded",c=!1);const o={choice:n,result:i,submittedAt:Date.now(),inWrongBook:c};if(i==="wrong")o.lastWrongChoice=n,o.lastWrongAt=o.submittedAt;else{const b=Oe(a);b&&(o.lastWrongChoice=b,typeof(a==null?void 0:a.lastWrongAt)=="number"?o.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&(o.lastWrongAt=a.submittedAt))}return t[e.id]=o,qt(t),o}function mt(e){const n=J();n[e]&&(n[e]={...n[e],inWrongBook:!1},qt(n))}function Yt(){try{localStorage.removeItem(Qe)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(Ne)}catch(e){console.error("Failed to clear last position:",e)}Tt()}function Kt(e){try{const n=localStorage.getItem(Ne);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,i=t.at;return typeof a!="string"||a.length===0||typeof i!="number"||!Number.isFinite(i)||!e.some(c=>c.id===a)?null:{id:a,at:i}}catch(n){return console.warn("Failed to parse last position:",n),null}}function Jt(e){try{localStorage.setItem(Ne,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Xt(e){var a;const n=J();let t=0;for(const i of e)((a=n[i.id])==null?void 0:a.result)==="correct"&&t++;return t}function Bt(e){const n=J();return e.filter(t=>{var a;return!!((a=n[t.id])!=null&&a.inWrongBook)})}function en(e){var i;const n=J(),t=e.length;let a=0;for(const c of e)((i=n[c.id])==null?void 0:i.result)==="correct"&&a++;return{correct:a,total:t}}function tn(e){const n=J();let t=0,a=0,i=0;for(const c of e){const g=n[c.id];g&&(t++,g.result==="correct"&&a++,g.inWrongBook&&i++)}return{submittedCount:t,correctCount:a,wrongBookCount:i}}const nn="pydrill.devPageIds";function Ue(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function sn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:Ue(new URLSearchParams(e.slice(n+1)).get("dev"))}function an(){const e=window.location.hostname,n=window.location.pathname||"";return n.includes("/preview/")||n.endsWith("/preview")?!0:e==="localhost"||e==="127.0.0.1"||e==="::1"||e==="[::1]"||e.endsWith(".local")}function rn(){const e=sn();if(e!==null)return e;const n=Ue(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=Ue(localStorage.getItem(nn));if(t!==null)return t}catch{}return an()}function on(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:null}function vt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function ze(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!rn()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const a=document.createElement("div");a.className="dev-page-id",a.setAttribute("data-testid","dev-page-id"),a.setAttribute("data-page",String(e)),a.setAttribute("aria-hidden","true"),a.textContent=t,document.body.appendChild(a)}function cn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),i=n.getDate();return(Math.floor(Date.UTC(t,a,i)/864e5)%e+e)%e}function ln(e,n=new Date){if(e.length===0)return;const t=cn(e.length,n);return e[t]}function dn(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function un(e,n=new Date){const t=be(e.id),a=n.getTime();return!t||!dn(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天答错",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function pn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function gn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function fn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function hn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function wt(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function mn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function vn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Mt(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function wn(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function bn(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function bt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function Ve(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function yt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function It(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function Ht(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function Le(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",i=e==="wrong",c=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${pn(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${gn(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${i?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${fn(i)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">错题本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${c?"active":""}" data-testid="tab-me">
          ${hn(c)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const yn=""+new URL("hero-tree-BQtvnSiX.svg",import.meta.url).href,_t=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,xn=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,$n=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,kn=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function Pe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Cn(e){const n=J(),a=Bt(e).length,i=ue(e),c=i.length,g=ln(e),o=g?un(g):{statusText:"今天还没做",isCompletedToday:!1},b=g?De(e,g.id):null,E=b?b.indexInTopic+1:1,Z=b?b.topic.questions.length:2,p=g?`${g.topic} · 第 ${E}/${Z} 题`:"今日一题",j=new Date,Y=`${j.getMonth()+1}月${j.getDate()}日`,D=g!=null&&g.code?g.code.split(`
`).slice(0,3).join(`
`):"",L=i[0],F=(L==null?void 0:L.name)||"",q=L&&L.questions.length>0?L.questions.find(f=>!n[f.id])||L.questions[0]:void 0,r=Kt(e),s=r?e.find(f=>f.id===r.id):void 0,l=s?De(e,s.id):null,d=s!=null&&s.code?(s.code.split(`
`)[0]||"").trim():"",u=s&&l?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${yt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${Pe(l.topic.name)} · 第 ${l.indexInTopic+1}/${l.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${s.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${d?`<div class="continue-code"><code>${Pe(d)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${yt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${Pe(F)}」开始吧，一次一小步。</p>
          ${q?`<a href="#/q/${q.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${yn}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${wn()}</span>
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
        <a href="#/q/${(g==null?void 0:g.id)||(q==null?void 0:q.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${xn}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${o.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${$n}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${c} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${kn}" alt="错题本" class="entry-icon-direct" />
          <span class="entry-card-title">错题本</span>
          <span class="entry-card-sub">${a>0?`${a} 题待温习`:"错题本空"}</span>
        </a>
      </section>

      ${u}

      ${g?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${Y}</span>
              <h3 class="daily-q-title">${p}</h3>
            </div>
            <span class="chip-status ${o.result==="correct"?"chip-green":o.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${o.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${g.stem}</p>

          ${D?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${D}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${g.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${o.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${_t}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Le("home",a)}
  `}const An={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Fn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Ln(e){const n=ue(e),t=J(),a=Xt(e),i=Bt(e).length,c=n.map((g,o)=>{const{correct:b,total:E}=en(g.questions),Z=E>0?b/E*100:0,p=g.questions.find(D=>!t[D.id])||g.questions[0],j=An[g.name]??Fn[g.name],Y=o%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${o}"
          onclick="window.location.hash = '#/q/${p.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${Ht(g.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${g.name}</h2>
                <span class="topic-index-badge">#${String(o+1).padStart(2,"0")}</span>
              </div>
              ${j?`<p class="topic-sub" data-testid="topic-sub-${o}">${j}</p>`:""}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${o}">${b} / ${E}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            <div class="topic-long-fill tone-${Y}" data-testid="topic-bar-${o}" style="width: ${Z}%;"></div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${Ve()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已做对 ${a} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${_t}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${c}
      </section>
    </div>

    ${Le("topics",i)}
  `}const En=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href,Ge=""+new URL("mascot-sad-Dg1R60AV.svg",import.meta.url).href;function Sn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Tn(e,n){const t=J(),a=ue(e),i=e.filter(b=>{var E;return!!((E=t[b.id])!=null&&E.inWrongBook)}),c=i.length;if(c===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">错题本</h1>
              <span class="title-doodle-leaf">${Ve()}</span>
            </div>
            <p class="section-desc">答错的题会自动收进这里</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Ge}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="错题本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${En}" alt="空白小本子" class="wrong-empty-img" />
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

      ${Le("wrong",0)}
    `;let g=i[0].id;for(const b of a){const E=b.questions.find(Z=>{var p;return!!((p=t[Z.id])!=null&&p.inWrongBook)});if(E){g=E.id;break}}const o=a.map(b=>{const E=b.questions.filter(Y=>{var D;return!!((D=t[Y.id])!=null&&D.inWrongBook)});if(E.length===0)return"";const p=E.filter(Y=>{var D;return((D=t[Y.id])==null?void 0:D.result)==="correct"}).length/E.length*100,j=String(b.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${b.index}"
          href="#/q/${E[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${Ht(b.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${Sn(b.name)}</span>
              <span class="wrong-topic-index">#${j}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${b.index}">${E.length}</span> 道错题待温习
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" data-testid="wrong-topic-bar-${b.index}" style="width: ${p}%;"></div>
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
            <span class="title-doodle-leaf">${Ve()}</span>
          </div>
          <p class="section-desc">答错的题会自动收进这里</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Ge}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <div class="wrong-summary-count-row">
          <span>现在有</span>
          <span class="wrong-summary-count-num" data-testid="wrong-count">${c}</span>
          <span>题待温习</span>
        </div>
        <a href="#/q/${g}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有错题的知识点">
        ${o}
      </section>
    </div>

    ${Le("wrong",c)}
  `}const Se=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function qn(e,n){const{submittedCount:t,correctCount:a,wrongBookCount:i}=tn(e);return typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const c=document.getElementById("clear-confirm-modal");c&&c.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const c=document.getElementById("clear-confirm-modal");c&&c.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Yt();const c=document.getElementById("clear-confirm-modal");c&&c.classList.add("hidden"),n&&n()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Se}" alt="小芽啾" class="me-avatar-img" />
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
            <span class="stat-col-label">错题本</span>
            <span class="stat-col-num num-brown">${i}</span>
          </div>
        </div>

        <div class="stats-motto-row">
          <span>${It(16)} 慢慢学，每一题都是进步的脚步</span>
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
              ${bt()}
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
            ${bt()}
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

    ${Le("me",i)}
  `}var xt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Bn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var je={exports:{}},$t;function Mn(){return $t||($t=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var i=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,c=0,g={},o={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function r(s){return s instanceof b?new b(s.type,r(s.content),s.alias):Array.isArray(s)?s.map(r):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(r){return Object.prototype.toString.call(r).slice(8,-1)},objId:function(r){return r.__id||Object.defineProperty(r,"__id",{value:++c}),r.__id},clone:function r(s,l){l=l||{};var d,u;switch(o.util.type(s)){case"Object":if(u=o.util.objId(s),l[u])return l[u];d={},l[u]=d;for(var f in s)s.hasOwnProperty(f)&&(d[f]=r(s[f],l));return d;case"Array":return u=o.util.objId(s),l[u]?l[u]:(d=[],l[u]=d,s.forEach(function($,v){d[v]=r($,l)}),d);default:return s}},getLanguage:function(r){for(;r;){var s=i.exec(r.className);if(s)return s[1].toLowerCase();r=r.parentElement}return"none"},setLanguage:function(r,s){r.className=r.className.replace(RegExp(i,"gi"),""),r.classList.add("language-"+s)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(d){var r=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(d.stack)||[])[1];if(r){var s=document.getElementsByTagName("script");for(var l in s)if(s[l].src==r)return s[l]}return null}},isActive:function(r,s,l){for(var d="no-"+s;r;){var u=r.classList;if(u.contains(s))return!0;if(u.contains(d))return!1;r=r.parentElement}return!!l}},languages:{plain:g,plaintext:g,text:g,txt:g,extend:function(r,s){var l=o.util.clone(o.languages[r]);for(var d in s)l[d]=s[d];return l},insertBefore:function(r,s,l,d){d=d||o.languages;var u=d[r],f={};for(var $ in u)if(u.hasOwnProperty($)){if($==s)for(var v in l)l.hasOwnProperty(v)&&(f[v]=l[v]);l.hasOwnProperty($)||(f[$]=u[$])}var M=d[r];return d[r]=f,o.languages.DFS(o.languages,function(_,re){re===M&&_!=r&&(this[_]=f)}),f},DFS:function r(s,l,d,u){u=u||{};var f=o.util.objId;for(var $ in s)if(s.hasOwnProperty($)){l.call(s,$,s[$],d||$);var v=s[$],M=o.util.type(v);M==="Object"&&!u[f(v)]?(u[f(v)]=!0,r(v,l,null,u)):M==="Array"&&!u[f(v)]&&(u[f(v)]=!0,r(v,l,$,u))}}},plugins:{},highlightAll:function(r,s){o.highlightAllUnder(document,r,s)},highlightAllUnder:function(r,s,l){var d={callback:l,container:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",d),d.elements=Array.prototype.slice.apply(d.container.querySelectorAll(d.selector)),o.hooks.run("before-all-elements-highlight",d);for(var u=0,f;f=d.elements[u++];)o.highlightElement(f,s===!0,d.callback)},highlightElement:function(r,s,l){var d=o.util.getLanguage(r),u=o.languages[d];o.util.setLanguage(r,d);var f=r.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(f,d);var $=r.textContent,v={element:r,language:d,grammar:u,code:$};function M(re){v.highlightedCode=re,o.hooks.run("before-insert",v),v.element.innerHTML=v.highlightedCode,o.hooks.run("after-highlight",v),o.hooks.run("complete",v),l&&l.call(v.element)}if(o.hooks.run("before-sanity-check",v),f=v.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!v.code){o.hooks.run("complete",v),l&&l.call(v.element);return}if(o.hooks.run("before-highlight",v),!v.grammar){M(o.util.encode(v.code));return}if(s&&a.Worker){var _=new Worker(o.filename);_.onmessage=function(re){M(re.data)},_.postMessage(JSON.stringify({language:v.language,code:v.code,immediateClose:!0}))}else M(o.highlight(v.code,v.grammar,v.language))},highlight:function(r,s,l){var d={code:r,grammar:s,language:l};if(o.hooks.run("before-tokenize",d),!d.grammar)throw new Error('The language "'+d.language+'" has no grammar.');return d.tokens=o.tokenize(d.code,d.grammar),o.hooks.run("after-tokenize",d),b.stringify(o.util.encode(d.tokens),d.language)},tokenize:function(r,s){var l=s.rest;if(l){for(var d in l)s[d]=l[d];delete s.rest}var u=new p;return j(u,u.head,r),Z(r,u,s,u.head,0),D(u)},hooks:{all:{},add:function(r,s){var l=o.hooks.all;l[r]=l[r]||[],l[r].push(s)},run:function(r,s){var l=o.hooks.all[r];if(!(!l||!l.length))for(var d=0,u;u=l[d++];)u(s)}},Token:b};a.Prism=o;function b(r,s,l,d){this.type=r,this.content=s,this.alias=l,this.length=(d||"").length|0}b.stringify=function r(s,l){if(typeof s=="string")return s;if(Array.isArray(s)){var d="";return s.forEach(function(M){d+=r(M,l)}),d}var u={type:s.type,content:r(s.content,l),tag:"span",classes:["token",s.type],attributes:{},language:l},f=s.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(u.classes,f):u.classes.push(f)),o.hooks.run("wrap",u);var $="";for(var v in u.attributes)$+=" "+v+'="'+(u.attributes[v]||"").replace(/"/g,"&quot;")+'"';return"<"+u.tag+' class="'+u.classes.join(" ")+'"'+$+">"+u.content+"</"+u.tag+">"};function E(r,s,l,d){r.lastIndex=s;var u=r.exec(l);if(u&&d&&u[1]){var f=u[1].length;u.index+=f,u[0]=u[0].slice(f)}return u}function Z(r,s,l,d,u,f){for(var $ in l)if(!(!l.hasOwnProperty($)||!l[$])){var v=l[$];v=Array.isArray(v)?v:[v];for(var M=0;M<v.length;++M){if(f&&f.cause==$+","+M)return;var _=v[M],re=_.inside,$e=!!_.lookbehind,ce=!!_.greedy,h=_.alias;if(ce&&!_.pattern.global){var k=_.pattern.toString().match(/[imsuy]*$/)[0];_.pattern=RegExp(_.pattern.source,k+"g")}for(var P=_.pattern||_,x=d.next,S=u;x!==s.tail&&!(f&&S>=f.reach);S+=x.value.length,x=x.next){var w=x.value;if(s.length>r.length)return;if(!(w instanceof b)){var m=1,C;if(ce){if(C=E(P,S,r,$e),!C||C.index>=r.length)break;var X=C.index,W=C.index+C[0].length,I=S;for(I+=x.value.length;X>=I;)x=x.next,I+=x.value.length;if(I-=x.value.length,S=I,x.value instanceof b)continue;for(var R=x;R!==s.tail&&(I<W||typeof R.value=="string");R=R.next)m++,I+=R.value.length;m--,w=r.slice(S,I),C.index-=S}else if(C=E(P,0,w,$e),!C)continue;var X=C.index,ee=C[0],K=w.slice(0,X),V=w.slice(X+ee.length),O=S+w.length;f&&O>f.reach&&(f.reach=O);var se=x.prev;K&&(se=j(s,se,K),S+=K.length),Y(s,se,m);var qe=new b($,re?o.tokenize(ee,re):ee,h,ee);if(x=j(s,se,qe),V&&j(s,x,V),m>1){var ke={cause:$+","+M,reach:O};Z(r,s,l,x.prev,S,ke),f&&ke.reach>f.reach&&(f.reach=ke.reach)}}}}}}function p(){var r={value:null,prev:null,next:null},s={value:null,prev:r,next:null};r.next=s,this.head=r,this.tail=s,this.length=0}function j(r,s,l){var d=s.next,u={value:l,prev:s,next:d};return s.next=u,d.prev=u,r.length++,u}function Y(r,s,l){for(var d=s.next,u=0;u<l&&d!==r.tail;u++)d=d.next;s.next=d,d.prev=s,r.length-=u}function D(r){for(var s=[],l=r.head.next;l!==r.tail;)s.push(l.value),l=l.next;return s}if(!a.document)return a.addEventListener&&(o.disableWorkerMessageHandler||a.addEventListener("message",function(r){var s=JSON.parse(r.data),l=s.language,d=s.code,u=s.immediateClose;a.postMessage(o.highlight(d,o.languages[l],l)),u&&a.close()},!1)),o;var L=o.util.currentScript();L&&(o.filename=L.src,L.hasAttribute("data-manual")&&(o.manual=!0));function F(){o.manual||o.highlightAll()}if(!o.manual){var q=document.readyState;q==="loading"||q==="interactive"&&L&&L.defer?document.addEventListener("DOMContentLoaded",F):window.requestAnimationFrame?window.requestAnimationFrame(F):window.setTimeout(F,16)}return o})(n);e.exports&&(e.exports=t),typeof xt<"u"&&(xt.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(i,c){var g={};g["language-"+c]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[c]},g.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:g}};o["language-"+c]={pattern:/[\s\S]+/,inside:t.languages[c]};var b={};b[i]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return i}),"i"),lookbehind:!0,greedy:!0,inside:o},t.languages.insertBefore("markup","cdata",b)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,i){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[i,"language-"+i],inside:t.languages[i]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var i=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+i.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+i.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+i.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+i.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:i,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var c=a.languages.markup;c&&(c.tag.addInlined("style","css"),c.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",i=function(L,F){return"✖ Error "+L+" while fetching file: "+F},c="✖ Error: File does not exist or is empty",g={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",b="loading",E="loaded",Z="failed",p="pre[data-src]:not(["+o+'="'+E+'"]):not(['+o+'="'+b+'"])';function j(L,F,q){var r=new XMLHttpRequest;r.open("GET",L,!0),r.onreadystatechange=function(){r.readyState==4&&(r.status<400&&r.responseText?F(r.responseText):r.status>=400?q(i(r.status,r.statusText)):q(c))},r.send(null)}function Y(L){var F=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(L||"");if(F){var q=Number(F[1]),r=F[2],s=F[3];return r?s?[q,Number(s)]:[q,void 0]:[q,q]}}t.hooks.add("before-highlightall",function(L){L.selector+=", "+p}),t.hooks.add("before-sanity-check",function(L){var F=L.element;if(F.matches(p)){L.code="",F.setAttribute(o,b);var q=F.appendChild(document.createElement("CODE"));q.textContent=a;var r=F.getAttribute("data-src"),s=L.language;if(s==="none"){var l=(/\.(\w+)$/.exec(r)||[,"none"])[1];s=g[l]||l}t.util.setLanguage(q,s),t.util.setLanguage(F,s);var d=t.plugins.autoloader;d&&d.loadLanguages(s),j(r,function(u){F.setAttribute(o,E);var f=Y(F.getAttribute("data-range"));if(f){var $=u.split(/\r\n?|\n/g),v=f[0],M=f[1]==null?$.length:f[1];v<0&&(v+=$.length),v=Math.max(0,Math.min(v-1,$.length)),M<0&&(M+=$.length),M=Math.max(0,Math.min(M,$.length)),u=$.slice(v,M).join(`
`),F.hasAttribute("data-start")||F.setAttribute("data-start",String(v+1))}q.textContent=u,t.highlightElement(q)},function(u){F.setAttribute(o,Z),q.textContent=u})}}),t.plugins.fileHighlight={highlight:function(F){for(var q=(F||document).querySelectorAll(p),r=0,s;s=q[r++];)t.highlightElement(s)}};var D=!1;t.fileHighlight=function(){D||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),D=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(je)),je.exports}var In=Mn();const kt=Bn(In);var Ct={},At;function Hn(){return At||(At=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),Ct}Hn();function _n(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="language-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((i,c)=>{const g=c+1,b=kt.highlight(i,kt.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${g}</span><span class="code-line-content">${b}</span></div>`}).join("")}</code></pre></div>`}function Ft(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),i=String(n.getHours()).padStart(2,"0"),c=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${i}:${c}`}function N(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Lt(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${N(t)}</code>`)}function Pn(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,i="";n!==-1&&(a=e.slice(0,n).trim(),i=e.slice(n+t).trim(),i=i.replace(/^[：:\s]+/,""));const c=a.split(/\n+/).map(o=>o.trim()).filter(Boolean).map(o=>`<p class="explanation-p">${Lt(o)}</p>`).join("");let g="";if(i){const o=Lt(i);g=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Mt(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${o}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${c}
      ${g}
    </div>
  `}function jn(e,n,t,a="topic"){de();const i=a==="daily"||a==="wrong"?a:"topic",c=n.find(h=>h.id===t);if(!c){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,ze(vt(i,!1));return}Jt(c.id);const g=De(n,c.id),o=(g==null?void 0:g.topic)||ue(n)[0],b=g?g.indexInTopic:0,E=o.questions.length,Z=be(c.id);o.questions.filter(h=>{var k;return!!((k=J()[h.id])!=null&&k.inWrongBook)}).length;const p={from:i,selectedChoice:i==="wrong"?null:Z?Z.choice:null,isRedoing:!1,wrongFresh:i==="wrong",showLastTrace:!1,showEndCard:!1,justRemovedWrong:!1},j=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let Y=0,D=null,L=!1;const F='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',q='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function r(h){return/Error|Exception/.test(h)}function s(h,k,P,x){return k!=="graded"?P===h?"selected":"idle":c.answer&&h===c.answer?"correct":P===h&&(x==null?void 0:x.result)==="wrong"?"wrong":"locked"}function l(h,k,P){const x=h.querySelector(".opt-badge"),S=h.querySelector(".opt-text"),w=h.querySelector(".opt-status");if(!x||!S||!w)return;const m=h.getAttribute("data-error")==="1";h.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),x.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),S.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),h.setAttribute("aria-checked",P?"true":"false"),k==="correct"?h.setAttribute("data-state","correct"):k==="wrong"?h.setAttribute("data-state","wrong"):h.removeAttribute("data-state"),k==="selected"||k==="correct"?(h.classList.add(k==="correct"?"opt-card-correct":"opt-card-selected"),k==="selected"&&h.classList.add("opt-pressable"),x.classList.add(k==="correct"?"opt-badge-correct":"opt-badge-selected"),S.classList.add("opt-text-strong"),w.innerHTML=F):k==="wrong"?(h.classList.add("opt-card-wrong"),x.classList.add("opt-badge-wrong"),S.classList.add("opt-text-strong","opt-text-wrong"),w.innerHTML=q):k==="locked"?(h.classList.add("opt-card-locked"),x.classList.add("opt-badge-default"),m&&S.classList.add("opt-text-error"),w.innerHTML=""):(h.classList.add("opt-card-default","opt-pressable"),x.classList.add("opt-badge-default"),m&&S.classList.add("opt-text-error"),w.innerHTML="")}function d(h,k,P,x){const S=r(h.text),w=["option-item"],m=["opt-badge"],C=["opt-text"];let W="",I="";k==="selected"?(w.push("opt-card-selected","opt-pressable"),m.push("opt-badge-selected"),C.push("opt-text-strong"),W=F):k==="correct"?(w.push("opt-card-correct"),m.push("opt-badge-correct"),C.push("opt-text-strong"),W=F,I='data-state="correct"'):k==="wrong"?(w.push("opt-card-wrong"),m.push("opt-badge-wrong"),C.push("opt-text-strong","opt-text-wrong"),W=q,I='data-state="wrong"'):k==="locked"?(w.push("opt-card-locked"),m.push("opt-badge-default"),S&&C.push("opt-text-error")):(w.push("opt-card-default","opt-pressable"),m.push("opt-badge-default"),S&&C.push("opt-text-error"));const R=(h.hint||"").trim(),X=x!=="none"&&R?`<div class="opt-hint-clip${x==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${N(h.key)}">${N(R)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${P?"true":"false"}"
            ${I}
            class="${w.join(" ")}"
            data-testid="option-${N(h.key)}"
            data-key="${N(h.key)}"
            data-error="${S?"1":"0"}"
          >
            <span class="${m.join(" ")}">${N(h.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${C.join(" ")}">${N(h.text)}</span>
                <span class="opt-status">${W}</span>
              </div>
              ${X}
            </div>
          </div>
        `}const u='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',f='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let $=0;function v(){var k;(k=document.getElementById("pydrill-wrong-toast"))==null||k.remove();const h=document.createElement("div");h.id="pydrill-wrong-toast",h.className="wrong-toast",h.setAttribute("role","status"),h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从错题本移出</span>',document.body.appendChild(h),window.setTimeout(()=>{h.remove()},1500)}function M(){const h=e.querySelector("#q-toggle-last");if(!h)return;const k=p.showLastTrace;h.setAttribute("aria-pressed",k?"true":"false");const P=h.querySelector("span");P&&(P.textContent=k?"隐藏上次":"看上次答错");const x=h.querySelector("svg");x&&(x.outerHTML=k?f:u)}function _(h,k,P,x){const S=(k.hint||"").trim(),w=h.querySelector(".opt-body");if(!w)return;let m=h.querySelector(".opt-hint-clip");if(P&&S){m||(m=document.createElement("div"),m.className="opt-hint-clip",m.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${N(k.key)}">${N(S)}</p></div>`,w.appendChild(m));const C=m;requestAnimationFrame(()=>{requestAnimationFrame(()=>{x===$&&C.classList.add("is-open")})})}else if(m){m.classList.remove("is-open");const C=m,W=x,I=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{W===$&&C.remove()},I?0:200)}}function re(h){const k=++$,P=be(c.id),x=Oe(P),S=(c.answer||"").trim();e.querySelectorAll(".option-item").forEach(m=>{const C=m.getAttribute("data-key")||"",W=c.options.find(se=>se.key===C);if(!h){const se=p.selectedChoice===C;l(m,se?"selected":"idle",se),W&&_(m,W,!1,k);return}const I=m.querySelector(".opt-badge"),R=m.querySelector(".opt-text"),X=m.querySelector(".opt-status");if(!I||!R||!X)return;const ee=m.getAttribute("data-error")==="1",K=!!x&&C===x,V=!!S&&C===S;m.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),I.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),R.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),m.setAttribute("aria-checked","false"),m.removeAttribute("data-state"),K&&!V?(m.classList.add("opt-card-trace-last"),I.classList.add("opt-badge-trace-last"),R.classList.add("opt-text-strong","opt-text-trace-last")):V?(m.classList.add("opt-card-trace-correct"),I.classList.add("opt-badge-trace-correct"),R.classList.add("opt-text-strong","opt-text-trace-correct")):(m.classList.add("opt-card-default","opt-card-trace-dim"),I.classList.add("opt-badge-default"),ee&&R.classList.add("opt-text-error"));const O=[];K&&O.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${N(C)}">上次选的 ${N(C)}</span>`),V&&O.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${N(C)}">正确答案 ${N(C)}</span>`),X.innerHTML=O.length?`<span class="opt-trace-tag-row">${O.join("")}</span>`:"",W&&_(m,W,K||V,k)});const w=e.querySelector("#q-submit-btn");if(w){const m=h||!p.selectedChoice;w.disabled=m,w.classList.toggle("btn-disabled",m)}}function $e(h){ze(vt(p.from,p.showEndCard)),(h||p.showEndCard)&&de()}function ce(){var at,rt,ot,it,ct,lt,dt,ut,pt,gt,ft,ht;const h=++Y,k=D!==c.id;D=c.id;const P=be(c.id),x=Oe(P).length>0,w=p.isRedoing||p.wrongFresh?void 0:P,m=!!w;m&&(p.showLastTrace=!1);const C=L&&m;L=!1;let W="#/topics";p.from==="daily"&&(W="#/"),p.from==="wrong"&&(W="#/wrong");let I="知识点练习";p.from==="daily"?I="今日一题":p.from==="wrong"&&(I="错题本");let R=null,X=null,ee=!1,K=!1,V=o.questions,O=b;if(p.from==="wrong"){const y=J();V=o.questions.filter(A=>{var T;return!!((T=y[A.id])!=null&&T.inWrongBook)}),O=V.findIndex(A=>A.id===c.id)}p.from==="daily"?(K=!0,ee=!0,V=[],O=0):O<0?(K=!0,ee=!0):(K=O===0,ee=O>=V.length-1,K||(R=V[O-1].id),ee||(X=V[O+1].id));const se=O>=0?O+1:1,qe=p.from==="wrong"?Math.max(V.length,1):E,ke=p.from==="wrong"?`${o.name} · 错题 ${se}/${qe}`:`${o.name} · 第 ${b+1}/${E} 题`;if(p.showEndCard){if(p.from==="daily"){te("#/");return}const y=p.from==="topic",A=J();let T="",H="",B="#/topics",z="返回知识点列表",oe="",le="";if(y){let ne=0;for(const U of o.questions)((at=A[U.id])==null?void 0:at.result)==="correct"&&ne++;T="这个知识点做完了",H=`本组共 ${E} 题 · 你已做对 ${ne}/${E} 题`,B="#/topics",z="返回知识点列表",oe=`
          <div class="end-questions-list">
            ${o.questions.map((U,ae)=>{const ve=ae+1,Q=A[U.id],we=(Q==null?void 0:Q.result)==="correct",Ie=(Q==null?void 0:Q.result)==="wrong";let pe="end-chip-gray",ge="· 未做";we?(pe="end-chip-green",ge="✓ 答对"):Ie&&(pe="end-chip-red",ge="✗ 答错");const He=U.code?U.code.split(`
`)[0].trim():U.stem;return`
              <a href="#/q/${U.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${ve} 题</span>
                  <span class="end-q-code">${N(He)}</span>
                </div>
                <span class="end-chip ${pe}">${ge}</span>
              </a>
            `}).join("")}
          </div>
        `;const G=ue(n),he=G.findIndex(U=>U.name===o.name),me=he!==-1&&he<G.length-1?G[he+1]:null;me&&me.questions.length>0&&(le=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{const ne=o.questions.filter(U=>{var ae;return!!((ae=A[U.id])!=null&&ae.inWrongBook)}),ie=ne.length;T="错题本这一轮看完了",H=`好样的！这一轮看了 ${ie} 题，多练几遍思路更清晰。`,B="#/wrong",z="返回错题本",ie>0?oe=`
            <div class="end-questions-list">
              ${ne.map((ae,ve)=>{const Q=A[ae.id],we=(Q==null?void 0:Q.result)==="correct",Ie=(Q==null?void 0:Q.result)==="wrong";let pe="end-chip-gray",ge="· 未做";we?(pe="end-chip-green",ge="✓ 答对"):Ie&&(pe="end-chip-red",ge="✗ 答错");const He=ae.code?ae.code.split(`
`)[0].trim():ae.stem;return`
                <a href="#/q/${ae.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">错题 ${ve+1}/${ie}</span>
                    <span class="end-q-code">${N(He)}</span>
                  </div>
                  <span class="end-chip ${pe}">${ge}</span>
                </a>
              `}).join("")}
            </div>
          `:oe=`
            <div class="end-empty-row">
              ${It(18)}
              <span>错题本已经清空了</span>
            </div>
          `;const G=ue(n),he=G.findIndex(U=>U.name===o.name);let me=null;if(he!==-1)for(let U=1;U<G.length;U++){const ve=G[(he+U)%G.length].questions.find(Q=>{var we;return!!((we=A[Q.id])!=null&&we.inWrongBook)});if(ve){me=ve.id;break}}me&&(le=`
            <a
              href="#/q/${me}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const Ae=p.from==="wrong"?"错题本 · 完成":`${o.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${j}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${wt()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${Ae}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Se}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${T}</h2>
              <p class="end-sub">${H}</p>

              ${oe}

              <div class="end-action-wrap flex-col-gap">
                <button
                  type="button"
                  class="btn-primary w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${z}
                </button>
                ${le}
              </div>
            </div>
          </main>
        </div>
      `,(rt=document.getElementById("q-back-btn"))==null||rt.addEventListener("click",()=>{te(W)}),(ot=document.getElementById("end-leave-btn"))==null||ot.addEventListener("click",()=>{te(B)}),(it=document.getElementById("end-next-topic-btn"))==null||it.addEventListener("click",()=>{const ne=ue(n),ie=ne.findIndex(G=>G.name===o.name);if(ie!==-1&&ie<ne.length-1){const G=ne[ie+1];te(`#/q/${G.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(ne=>{ne.addEventListener("click",ie=>{const G=ne.getAttribute("href");G&&(ie.preventDefault(),te(G))})}),$e(k);return}const Ee=m?C?"pending":"graded":"answering",jt=Ee==="answering"?"none":Ee==="pending"?"closed":"open",Ze=Ee==="graded"?(w==null?void 0:w.choice)??null:p.selectedChoice,Dt=c.options.map(y=>d(y,s(y.key,Ee,Ze,w),Ze===y.key,jt)).join("");let Ye="";if(m&&w){let y=Se,A="答对了！";const T=Ft(w.submittedAt);let H=`你选了 ${w.choice} · 正确答案 ${c.answer} · ${T} 提交`,B="banner-correct",z="",oe="";w.result==="wrong"?(y=Ge,A="答错了",H=`你选了 ${w.choice} · 正确答案是 ${c.answer} · ${T} 提交`,B="banner-wrong",w.inWrongBook&&(z='<span class="result-tag-badge tag-wrong">已加入错题本</span>')):w.result==="correct"?w.inWrongBook&&p.from!=="wrong"?oe=`
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
          `:p.justRemovedWrong&&p.from!=="wrong"&&(oe=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出错题本 ✓</span>
            </div>
          `):w.result==="ungraded"&&(y=Se,A="已提交（未判分）",H=`这题的答案还没编写 · ${T} 提交`,B="banner-ungraded"),Ye=`
        <section class="result-banner ${B}" data-testid="result-banner" data-result="${w.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${y}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${A}</h2>
              <p class="result-sub">${H}</p>
            </div>
            ${z?`<div class="result-tag-wrap">${z}</div>`:""}
          </div>
          ${oe}
        </section>
      `}let Ke="";if(m&&w){const y=Pn(c.explanation);Ke=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Mt()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${y}
          </div>
        </section>
      `}let Je="";c.animationId!=null&&m&&(Je=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let Xe="";if(p.isRedoing&&p.from!=="wrong"){const y=be(c.id);if(y){const A=y.result==="correct"?"答对":y.result==="wrong"?"答错":"已提交",T=Ft(y.submittedAt);Xe=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${A}（选 ${y.choice} · ${T}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Wt=p.from==="wrong"?V:o.questions,et=p.from!=="wrong"||m,Rt=Wt.map((y,A)=>{const T=A+1,H=y.id===c.id,B=be(y.id),z=et&&(B==null?void 0:B.result)==="correct",oe=et&&(B==null?void 0:B.result)==="wrong";let le="switcher-unanswered",Ae=`<span>${T}</span>`;return z?(le="switcher-correct",Ae=mn()):oe&&(le="switcher-wrong",Ae=vn()),H&&(le+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${le} active-press"
            data-testid="q-switch-${T}"
            data-qid="${y.id}"
            title="第 ${T} 题"
          >
            ${Ae}
          </button>
        `}).join(""),Ot=m?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${bn(14)}
          <span>重做</span>
        </button>
      `:"",tt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${K?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${K?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,nt=ee?"完成":"下一题 ›",st=ee?' data-action="finish"':"",Ut=`
      <button
        type="button"
        class="btn-nav-next active-press"
        data-testid="next"
        id="q-next-btn"${st}
      >
        <span>${nt}</span>
      </button>
    `,zt=`
      <button
        type="button"
        class="btn-next-main active-press"
        data-testid="next"
        id="q-next-btn"${st}
      >
        <span>${nt}</span>
      </button>
    `;let Be="";if(m)Be=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${tt}
            ${Ot}
            ${zt}
          </div>
        </div>
      `;else{const y=!!p.selectedChoice;Be=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${tt}
            <button
              type="button"
              class="btn-submit-main active-press ${y?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${y?"":"disabled"}
            >
              <span>${y?"提交答案":"提交"}</span>
            </button>
            ${Ut}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${j}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${wt()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${ke}</span>
          ${p.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出错题本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <div class="q-source-badge" data-testid="q-source">
              <span class="status-dot-green"></span>
              <span>${I}</span>
            </div>
            ${p.from==="wrong"?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${p.showLastTrace?"true":"false"}" ${x&&!m?"":"disabled"}>
                    ${p.showLastTrace?f:u}
                    <span>${p.showLastTrace?"隐藏上次":"看上次答错"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${Rt}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${Xe}

          <!-- 4. Result Banner (if submitted) -->
          ${Ye}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${c.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${c.code?_n(c.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Dt}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${Ke}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${Je}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Be}
      </div>
    `,(ct=document.getElementById("q-back-btn"))==null||ct.addEventListener("click",()=>{te(W)}),m)(ut=document.getElementById("q-redo-btn"))==null||ut.addEventListener("click",()=>{p.isRedoing=!0,p.selectedChoice=null,p.showLastTrace=!1,p.justRemovedWrong=!1,ce()}),p.from!=="wrong"&&((pt=document.getElementById("q-remove-wrong-btn"))==null||pt.addEventListener("click",()=>{mt(c.id),p.justRemovedWrong=!0,ce()}));else{const y=e.querySelectorAll(".option-item");y.forEach(A=>{A.addEventListener("click",()=>{if(p.showLastTrace)return;const T=A.getAttribute("data-key");if(!T||T===p.selectedChoice)return;p.selectedChoice=T,y.forEach(B=>{const z=B.getAttribute("data-key")===T;l(B,z?"selected":"idle",z)});const H=e.querySelector("#q-submit-btn");if(H){H.disabled=!1,H.classList.remove("btn-disabled");const B=H.querySelector("span");B&&(B.textContent="提交答案")}})}),(lt=document.getElementById("q-submit-btn"))==null||lt.addEventListener("click",()=>{!p.selectedChoice||p.showLastTrace||(Zt(c,p.selectedChoice),p.isRedoing=!1,p.wrongFresh=!1,p.showLastTrace=!1,p.justRemovedWrong=!1,L=!0,ce())}),(dt=document.getElementById("q-toggle-last"))==null||dt.addEventListener("click",()=>{const A=e.querySelector("#q-toggle-last");!A||A.disabled||m||(p.showLastTrace=!p.showLastTrace,M(),re(p.showLastTrace))})}p.from==="wrong"&&((gt=document.getElementById("q-remove-wrong-btn"))==null||gt.addEventListener("click",()=>{const y=c.id;mt(y),v();const A=J(),T=o.questions.find(H=>{var B;return H.id===y||!((B=A[H.id])!=null&&B.inWrongBook)?!1:o.questions.findIndex(z=>z.id===H.id)>b});te(T?`#/q/${T.id}?from=wrong`:"#/wrong")})),(ft=document.getElementById("q-prev-btn"))==null||ft.addEventListener("click",()=>{R&&te(`#/q/${R}?from=${p.from}`)}),(ht=document.getElementById("q-next-btn"))==null||ht.addEventListener("click",()=>{if(X){te(`#/q/${X}?from=${p.from}`);return}if(p.from==="daily"){te("#/");return}p.showEndCard=!0,ce()}),e.querySelectorAll(".q-switch-pill").forEach(y=>{y.addEventListener("click",()=>{const A=y.getAttribute("data-qid");A&&A!==c.id&&te(`#/q/${A}?from=${p.from}`)})});const Ce=e.querySelector(".q-switcher-group"),Me=e.querySelector(".switcher-current");if(Ce&&Me){const y=Me.getBoundingClientRect().left-Ce.getBoundingClientRect().left,A=Ce.scrollLeft+y-(Ce.clientWidth-Me.offsetWidth)/2;Ce.scrollLeft=Math.max(0,A)}if(C&&w){const y=w;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(h!==Y||!e.isConnected)return;const A=e.querySelector("[data-view-token]");!A||A.getAttribute("data-view-token")!==j||e.querySelectorAll(".option-item").forEach(T=>{var z;const H=T.getAttribute("data-key")||"",B=y.choice===H;l(T,s(H,"graded",y.choice,y),B),(z=T.querySelector(".opt-hint-clip"))==null||z.classList.add("is-open")})})})}$e(k)}ce()}const ye=document.getElementById("app");let xe=[];function fe(){const{path:e}=Te();e==="/"||e===""?ye.innerHTML=Cn(xe):e==="/topics"?ye.innerHTML=Ln(xe):e==="/wrong"?ye.innerHTML=Tn(xe):e==="/me"&&(ye.innerHTML=qn(xe,fe));const n=on(e);n!=null&&ze(n)}async function Pt(){var n;try{xe=await Vt()}catch{ye.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Pt()});return}Fe("/",()=>{de(),fe()}),Fe("/topics",()=>{de(),fe()}),Fe("/wrong",()=>{de(),fe()}),Fe("/me",()=>{de(),fe()}),Fe("/q/:id",(t,a)=>{de();const i=t.id,c=a.from||"topic";jn(ye,xe,i,c)}),Gt(()=>{te("#/")}),Nt(()=>{const{path:t}=Te();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me")&&fe()});const e=()=>{const{path:t}=Te();(t==="/"||t==="")&&fe()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Qt()}Pt();
