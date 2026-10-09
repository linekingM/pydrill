(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))a(c);new MutationObserver(c=>{for(const o of c)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&a(g)}).observe(document,{childList:!0,subtree:!0});function t(c){const o={};return c.integrity&&(o.integrity=c.integrity),c.referrerPolicy&&(o.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?o.credentials="include":c.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(c){if(c.ep)return;c.ep=!0;const o=t(c);fetch(c.href,o)}})();let _e=null;async function Kt(e=!1){if(_e&&!e)return _e;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return _e=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function ue(e){const n=new Map;for(const c of e)n.has(c.topic)||n.set(c.topic,[]),n.get(c.topic).push(c);const t=[];let a=0;for(const[c,o]of n.entries())t.push({name:c,index:a,questions:o}),a++;return t}function De(e,n){const t=ue(e);for(const a of t){const c=a.questions.findIndex(o=>o.id===n);if(c!==-1)return{topic:a,indexInTopic:c}}return null}const qt=[];let Bt=()=>{};function Fe(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(o,g)=>(t.push(g),"([^/?#]+)")).replace(/\//g,"\\/"),c=new RegExp(`^${a}$`);qt.push({regex:c,paramNames:t,handler:n})}function Jt(e){Bt=e}function de(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function te(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?We():window.location.hash=n}function Te(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,c={};return t&&new URLSearchParams(t).forEach((g,i)=>{c[i]=g}),{path:a,query:c}}function We(){de();const{path:e,query:n}=Te();for(const t of qt){const a=e.match(t.regex);if(a){const c={};t.paramNames.forEach((o,g)=>{c[o]=a[g+1]?decodeURIComponent(a[g+1]):""}),t.handler(c,n);return}}Bt({},n)}function Xt(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",We),We()}const Qe="pydrill.v1.records",Ze="pydrill.v1.last",Re=new Set;function en(e){return Re.add(e),()=>{Re.delete(e)}}function Mt(){for(const e of Re)try{e()}catch(n){console.error("Error in store listener:",n)}}function N(){try{const e=localStorage.getItem(Qe);if(!e)return{};const n=JSON.parse(e);return typeof n!="object"||n===null?{}:n}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function ye(e){return N()[e]}function Oe(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function It(e){try{localStorage.setItem(Qe,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}Mt()}function tn(e,n){const t=N(),a=t[e.id],c=!!(a!=null&&a.inWrongBook);let o,g=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(o="correct",g=c):(o="wrong",g=!0):(o="ungraded",g=!1);const y=c&&(o==="correct"||o==="wrong"),$={choice:n,result:o,submittedAt:Date.now(),inWrongBook:g,wrongBookReviewed:y};if(o==="wrong")$.lastWrongChoice=n,$.lastWrongAt=$.submittedAt;else{const V=Oe(a);V&&($.lastWrongChoice=V,typeof(a==null?void 0:a.lastWrongAt)=="number"?$.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&($.lastWrongAt=a.submittedAt))}return t[e.id]=$,It(t),$}function bt(e){const n=N();n[e]&&(n[e]={...n[e],inWrongBook:!1},It(n))}function nn(){try{localStorage.removeItem(Qe)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(Ze)}catch(e){console.error("Failed to clear last position:",e)}Mt()}function sn(e){try{const n=localStorage.getItem(Ze);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,c=t.at;return typeof a!="string"||a.length===0||typeof c!="number"||!Number.isFinite(c)||!e.some(o=>o.id===a)?null:{id:a,at:c}}catch(n){return console.warn("Failed to parse last position:",n),null}}function an(e){try{localStorage.setItem(Ze,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function rn(e){var a;const n=N();let t=0;for(const c of e)((a=n[c.id])==null?void 0:a.result)==="correct"&&t++;return t}function Ht(e){const n=N();return e.filter(t=>{var a;return!!((a=n[t.id])!=null&&a.inWrongBook)})}function on(e){const n=N(),t=e.length;let a=0;for(const c of e)n[c.id]&&a++;return{done:a,total:t}}function cn(e){const n=N();let t=0,a=0,c=0;for(const o of e){const g=n[o.id];g&&(t++,g.result==="correct"&&a++,g.inWrongBook&&c++)}return{submittedCount:t,correctCount:a,wrongBookCount:c}}const ln="pydrill.devPageIds";function Ue(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function dn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:Ue(new URLSearchParams(e.slice(n+1)).get("dev"))}function un(){const e=window.location.hostname,n=window.location.pathname||"";return n.includes("/preview/")||n.endsWith("/preview")?!0:e==="localhost"||e==="127.0.0.1"||e==="::1"||e==="[::1]"||e.endsWith(".local")}function pn(){const e=dn();if(e!==null)return e;const n=Ue(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=Ue(localStorage.getItem(ln));if(t!==null)return t}catch{}return un()}function gn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:null}function yt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function ze(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!pn()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const a=document.createElement("div");a.className="dev-page-id",a.setAttribute("data-testid","dev-page-id"),a.setAttribute("data-page",String(e)),a.setAttribute("aria-hidden","true"),a.textContent=t,document.body.appendChild(a)}function fn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),c=n.getDate();return(Math.floor(Date.UTC(t,a,c)/864e5)%e+e)%e}function hn(e,n=new Date){if(e.length===0)return;const t=fn(e.length,n);return e[t]}function mn(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function vn(e,n=new Date){const t=ye(e.id),a=n.getTime();return!t||!mn(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天答错",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function wn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function bn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function yn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function xn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function xt(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function $n(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function kn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function _t(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function Cn(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function An(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function $t(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function Ve(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function kt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function Pt(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function jt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function Le(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",c=e==="wrong",o=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${wn(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${bn(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${c?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${yn(c)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">错题本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${o?"active":""}" data-testid="tab-me">
          ${xn(o)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const Fn=""+new URL("hero-tree-BQtvnSiX.svg",import.meta.url).href,Dt=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,Ln=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,Sn=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,En=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function Pe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Tn(e){const n=N(),a=Ht(e).length,c=ue(e),o=c.length,g=hn(e),i=g?vn(g):{statusText:"今天还没做",isCompletedToday:!1},y=g?De(e,g.id):null,$=y?y.indexInTopic+1:1,V=y?y.topic.questions.length:2,p=g?`${g.topic} · 第 ${$}/${V} 题`:"今日一题",D=new Date,K=`${D.getMonth()+1}月${D.getDate()}日`,W=g!=null&&g.code?g.code.split(`
`).slice(0,3).join(`
`):"",S=c[0],L=(S==null?void 0:S.name)||"",q=S&&S.questions.length>0?S.questions.find(f=>!n[f.id])||S.questions[0]:void 0,r=sn(e),s=r?e.find(f=>f.id===r.id):void 0,l=s?De(e,s.id):null,d=s!=null&&s.code?(s.code.split(`
`)[0]||"").trim():"",u=s&&l?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${kt(18)}
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
            ${kt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${Pe(L)}」开始吧，一次一小步。</p>
          ${q?`<a href="#/q/${q.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${Fn}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${Cn()}</span>
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
          <img src="${Ln}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${i.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${Sn}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${o} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${En}" alt="错题本" class="entry-icon-direct" />
          <span class="entry-card-title">错题本</span>
          <span class="entry-card-sub">${a>0?`${a} 题待温习`:"错题本空"}</span>
        </a>
      </section>

      ${u}

      ${g?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${K}</span>
              <h3 class="daily-q-title">${p}</h3>
            </div>
            <span class="chip-status ${i.result==="correct"?"chip-green":i.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${i.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${g.stem}</p>

          ${W?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${W}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${g.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${i.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${Dt}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Le("home",a)}
  `}const qn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Bn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Mn(e){const n=ue(e),t=N(),a=rn(e),c=Ht(e).length,o=n.map((g,i)=>{const{done:y,total:$}=on(g.questions),V=$>0?y/$*100:0,p=g.questions.find(W=>!t[W.id])||g.questions[0],D=qn[g.name]??Bn[g.name],K=i%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${i}"
          onclick="window.location.hash = '#/q/${p.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${jt(g.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${g.name}</h2>
                <span class="topic-index-badge">#${String(i+1).padStart(2,"0")}</span>
              </div>
              ${D?`<p class="topic-sub" data-testid="topic-sub-${i}">${D}</p>`:""}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${i}">${y} / ${$}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            <div class="topic-long-fill tone-${K}" data-testid="topic-bar-${i}" style="width: ${V}%;"></div>
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
          <img src="${Dt}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${o}
      </section>
    </div>

    ${Le("topics",c)}
  `}const In=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href,Ge=""+new URL("mascot-sad-Dg1R60AV.svg",import.meta.url).href;function Hn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _n(e,n){const t=N(),a=ue(e),c=e.filter(y=>{var $;return!!(($=t[y.id])!=null&&$.inWrongBook)}),o=c.length;if(o===0)return`
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
            <img src="${In}" alt="空白小本子" class="wrong-empty-img" />
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
    `;let g=c[0].id;for(const y of a){const $=y.questions.find(V=>{var p;return!!((p=t[V.id])!=null&&p.inWrongBook)});if($){g=$.id;break}}const i=a.map(y=>{const $=y.questions.filter(K=>{var W;return!!((W=t[K.id])!=null&&W.inWrongBook)});if($.length===0)return"";const p=$.filter(K=>{var W;return!!((W=t[K.id])!=null&&W.wrongBookReviewed)}).length/$.length*100,D=String(y.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${y.index}"
          href="#/q/${$[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${jt(y.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${Hn(y.name)}</span>
              <span class="wrong-topic-index">#${D}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${y.index}">${$.length}</span> 道错题待温习
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" data-testid="wrong-topic-bar-${y.index}" style="width: ${p}%;"></div>
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
          <span class="wrong-summary-count-num" data-testid="wrong-count">${o}</span>
          <span>题待温习</span>
        </div>
        <a href="#/q/${g}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有错题的知识点">
        ${i}
      </section>
    </div>

    ${Le("wrong",o)}
  `}const Ee=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function Pn(e,n){const{submittedCount:t,correctCount:a,wrongBookCount:c}=cn(e);return typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const o=document.getElementById("clear-confirm-modal");o&&o.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const o=document.getElementById("clear-confirm-modal");o&&o.classList.add("hidden")},window.__pydrill_confirmClear=()=>{nn();const o=document.getElementById("clear-confirm-modal");o&&o.classList.add("hidden"),n&&n()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Ee}" alt="小芽啾" class="me-avatar-img" />
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
            <span class="stat-col-num num-brown">${c}</span>
          </div>
        </div>

        <div class="stats-motto-row">
          <span>${Pt(16)} 慢慢学，每一题都是进步的脚步</span>
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
              ${$t()}
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
            ${$t()}
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

    ${Le("me",c)}
  `}const Ne=globalThis;Ne.Prism=Ne.Prism??{};Ne.Prism.manual=!0;var Ct=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function jn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var je={exports:{}},At;function Dn(){return At||(At=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var c=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,o=0,g={},i={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function r(s){return s instanceof y?new y(s.type,r(s.content),s.alias):Array.isArray(s)?s.map(r):s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(r){return Object.prototype.toString.call(r).slice(8,-1)},objId:function(r){return r.__id||Object.defineProperty(r,"__id",{value:++o}),r.__id},clone:function r(s,l){l=l||{};var d,u;switch(i.util.type(s)){case"Object":if(u=i.util.objId(s),l[u])return l[u];d={},l[u]=d;for(var f in s)s.hasOwnProperty(f)&&(d[f]=r(s[f],l));return d;case"Array":return u=i.util.objId(s),l[u]?l[u]:(d=[],l[u]=d,s.forEach(function(k,v){d[v]=r(k,l)}),d);default:return s}},getLanguage:function(r){for(;r;){var s=c.exec(r.className);if(s)return s[1].toLowerCase();r=r.parentElement}return"none"},setLanguage:function(r,s){r.className=r.className.replace(RegExp(c,"gi"),""),r.classList.add("language-"+s)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(d){var r=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(d.stack)||[])[1];if(r){var s=document.getElementsByTagName("script");for(var l in s)if(s[l].src==r)return s[l]}return null}},isActive:function(r,s,l){for(var d="no-"+s;r;){var u=r.classList;if(u.contains(s))return!0;if(u.contains(d))return!1;r=r.parentElement}return!!l}},languages:{plain:g,plaintext:g,text:g,txt:g,extend:function(r,s){var l=i.util.clone(i.languages[r]);for(var d in s)l[d]=s[d];return l},insertBefore:function(r,s,l,d){d=d||i.languages;var u=d[r],f={};for(var k in u)if(u.hasOwnProperty(k)){if(k==s)for(var v in l)l.hasOwnProperty(v)&&(f[v]=l[v]);l.hasOwnProperty(k)||(f[k]=u[k])}var M=d[r];return d[r]=f,i.languages.DFS(i.languages,function(P,re){re===M&&P!=r&&(this[P]=f)}),f},DFS:function r(s,l,d,u){u=u||{};var f=i.util.objId;for(var k in s)if(s.hasOwnProperty(k)){l.call(s,k,s[k],d||k);var v=s[k],M=i.util.type(v);M==="Object"&&!u[f(v)]?(u[f(v)]=!0,r(v,l,null,u)):M==="Array"&&!u[f(v)]&&(u[f(v)]=!0,r(v,l,k,u))}}},plugins:{},highlightAll:function(r,s){i.highlightAllUnder(document,r,s)},highlightAllUnder:function(r,s,l){var d={callback:l,container:r,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",d),d.elements=Array.prototype.slice.apply(d.container.querySelectorAll(d.selector)),i.hooks.run("before-all-elements-highlight",d);for(var u=0,f;f=d.elements[u++];)i.highlightElement(f,s===!0,d.callback)},highlightElement:function(r,s,l){var d=i.util.getLanguage(r),u=i.languages[d];i.util.setLanguage(r,d);var f=r.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(f,d);var k=r.textContent,v={element:r,language:d,grammar:u,code:k};function M(re){v.highlightedCode=re,i.hooks.run("before-insert",v),v.element.innerHTML=v.highlightedCode,i.hooks.run("after-highlight",v),i.hooks.run("complete",v),l&&l.call(v.element)}if(i.hooks.run("before-sanity-check",v),f=v.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!v.code){i.hooks.run("complete",v),l&&l.call(v.element);return}if(i.hooks.run("before-highlight",v),!v.grammar){M(i.util.encode(v.code));return}if(s&&a.Worker){var P=new Worker(i.filename);P.onmessage=function(re){M(re.data)},P.postMessage(JSON.stringify({language:v.language,code:v.code,immediateClose:!0}))}else M(i.highlight(v.code,v.grammar,v.language))},highlight:function(r,s,l){var d={code:r,grammar:s,language:l};if(i.hooks.run("before-tokenize",d),!d.grammar)throw new Error('The language "'+d.language+'" has no grammar.');return d.tokens=i.tokenize(d.code,d.grammar),i.hooks.run("after-tokenize",d),y.stringify(i.util.encode(d.tokens),d.language)},tokenize:function(r,s){var l=s.rest;if(l){for(var d in l)s[d]=l[d];delete s.rest}var u=new p;return D(u,u.head,r),V(r,u,s,u.head,0),W(u)},hooks:{all:{},add:function(r,s){var l=i.hooks.all;l[r]=l[r]||[],l[r].push(s)},run:function(r,s){var l=i.hooks.all[r];if(!(!l||!l.length))for(var d=0,u;u=l[d++];)u(s)}},Token:y};a.Prism=i;function y(r,s,l,d){this.type=r,this.content=s,this.alias=l,this.length=(d||"").length|0}y.stringify=function r(s,l){if(typeof s=="string")return s;if(Array.isArray(s)){var d="";return s.forEach(function(M){d+=r(M,l)}),d}var u={type:s.type,content:r(s.content,l),tag:"span",classes:["token",s.type],attributes:{},language:l},f=s.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(u.classes,f):u.classes.push(f)),i.hooks.run("wrap",u);var k="";for(var v in u.attributes)k+=" "+v+'="'+(u.attributes[v]||"").replace(/"/g,"&quot;")+'"';return"<"+u.tag+' class="'+u.classes.join(" ")+'"'+k+">"+u.content+"</"+u.tag+">"};function $(r,s,l,d){r.lastIndex=s;var u=r.exec(l);if(u&&d&&u[1]){var f=u[1].length;u.index+=f,u[0]=u[0].slice(f)}return u}function V(r,s,l,d,u,f){for(var k in l)if(!(!l.hasOwnProperty(k)||!l[k])){var v=l[k];v=Array.isArray(v)?v:[v];for(var M=0;M<v.length;++M){if(f&&f.cause==k+","+M)return;var P=v[M],re=P.inside,ke=!!P.lookbehind,ce=!!P.greedy,h=P.alias;if(ce&&!P.pattern.global){var C=P.pattern.toString().match(/[imsuy]*$/)[0];P.pattern=RegExp(P.pattern.source,C+"g")}for(var j=P.pattern||P,x=d.next,T=u;x!==s.tail&&!(f&&T>=f.reach);T+=x.value.length,x=x.next){var b=x.value;if(s.length>r.length)return;if(!(b instanceof y)){var m=1,F;if(ce){if(F=$(j,T,r,ke),!F||F.index>=r.length)break;var ee=F.index,R=F.index+F[0].length,I=T;for(I+=x.value.length;ee>=I;)x=x.next,I+=x.value.length;if(I-=x.value.length,T=I,x.value instanceof y)continue;for(var O=x;O!==s.tail&&(I<R||typeof O.value=="string");O=O.next)m++,I+=O.value.length;m--,b=r.slice(T,I),F.index-=T}else if(F=$(j,0,b,ke),!F)continue;var ee=F.index,J=F[0],X=b.slice(0,ee),_=b.slice(ee+J.length),U=T+b.length;f&&U>f.reach&&(f.reach=U);var se=x.prev;X&&(se=D(s,se,X),T+=X.length),K(s,se,m);var qe=new y(k,re?i.tokenize(J,re):J,h,J);if(x=D(s,se,qe),_&&D(s,x,_),m>1){var he={cause:k+","+M,reach:U};V(r,s,l,x.prev,T,he),f&&he.reach>f.reach&&(f.reach=he.reach)}}}}}}function p(){var r={value:null,prev:null,next:null},s={value:null,prev:r,next:null};r.next=s,this.head=r,this.tail=s,this.length=0}function D(r,s,l){var d=s.next,u={value:l,prev:s,next:d};return s.next=u,d.prev=u,r.length++,u}function K(r,s,l){for(var d=s.next,u=0;u<l&&d!==r.tail;u++)d=d.next;s.next=d,d.prev=s,r.length-=u}function W(r){for(var s=[],l=r.head.next;l!==r.tail;)s.push(l.value),l=l.next;return s}if(!a.document)return a.addEventListener&&(i.disableWorkerMessageHandler||a.addEventListener("message",function(r){var s=JSON.parse(r.data),l=s.language,d=s.code,u=s.immediateClose;a.postMessage(i.highlight(d,i.languages[l],l)),u&&a.close()},!1)),i;var S=i.util.currentScript();S&&(i.filename=S.src,S.hasAttribute("data-manual")&&(i.manual=!0));function L(){i.manual||i.highlightAll()}if(!i.manual){var q=document.readyState;q==="loading"||q==="interactive"&&S&&S.defer?document.addEventListener("DOMContentLoaded",L):window.requestAnimationFrame?window.requestAnimationFrame(L):window.setTimeout(L,16)}return i})(n);e.exports&&(e.exports=t),typeof Ct<"u"&&(Ct.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(c,o){var g={};g["language-"+o]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[o]},g.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:g}};i["language-"+o]={pattern:/[\s\S]+/,inside:t.languages[o]};var y={};y[c]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return c}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",y)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,c){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[c,"language-"+c],inside:t.languages[c]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var c=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+c.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+c.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+c.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+c.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:c,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var o=a.languages.markup;o&&(o.tag.addInlined("style","css"),o.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",c=function(S,L){return"✖ Error "+S+" while fetching file: "+L},o="✖ Error: File does not exist or is empty",g={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",y="loading",$="loaded",V="failed",p="pre[data-src]:not(["+i+'="'+$+'"]):not(['+i+'="'+y+'"])';function D(S,L,q){var r=new XMLHttpRequest;r.open("GET",S,!0),r.onreadystatechange=function(){r.readyState==4&&(r.status<400&&r.responseText?L(r.responseText):r.status>=400?q(c(r.status,r.statusText)):q(o))},r.send(null)}function K(S){var L=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S||"");if(L){var q=Number(L[1]),r=L[2],s=L[3];return r?s?[q,Number(s)]:[q,void 0]:[q,q]}}t.hooks.add("before-highlightall",function(S){S.selector+=", "+p}),t.hooks.add("before-sanity-check",function(S){var L=S.element;if(L.matches(p)){S.code="",L.setAttribute(i,y);var q=L.appendChild(document.createElement("CODE"));q.textContent=a;var r=L.getAttribute("data-src"),s=S.language;if(s==="none"){var l=(/\.(\w+)$/.exec(r)||[,"none"])[1];s=g[l]||l}t.util.setLanguage(q,s),t.util.setLanguage(L,s);var d=t.plugins.autoloader;d&&d.loadLanguages(s),D(r,function(u){L.setAttribute(i,$);var f=K(L.getAttribute("data-range"));if(f){var k=u.split(/\r\n?|\n/g),v=f[0],M=f[1]==null?k.length:f[1];v<0&&(v+=k.length),v=Math.max(0,Math.min(v-1,k.length)),M<0&&(M+=k.length),M=Math.max(0,Math.min(M,k.length)),u=k.slice(v,M).join(`
`),L.hasAttribute("data-start")||L.setAttribute("data-start",String(v+1))}q.textContent=u,t.highlightElement(q)},function(u){L.setAttribute(i,V),q.textContent=u})}}),t.plugins.fileHighlight={highlight:function(L){for(var q=(L||document).querySelectorAll(p),r=0,s;s=q[r++];)t.highlightElement(s)}};var W=!1;t.fileHighlight=function(){W||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),W=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(je)),je.exports}var Wn=Dn();const Ft=jn(Wn);var Lt={},St;function Rn(){return St||(St=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),Lt}Rn();function On(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((c,o)=>{const g=o+1,y=Ft.highlight(c,Ft.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${g}</span><span class="code-line-content">${y}</span></div>`}).join("")}</code></pre></div>`}function Et(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),c=String(n.getHours()).padStart(2,"0"),o=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${c}:${o}`}function Y(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Tt(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${Y(t)}</code>`)}function Un(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,c="";n!==-1&&(a=e.slice(0,n).trim(),c=e.slice(n+t).trim(),c=c.replace(/^[：:\s]+/,""));const o=a.split(/\n+/).map(i=>i.trim()).filter(Boolean).map(i=>`<p class="explanation-p">${Tt(i)}</p>`).join("");let g="";if(c){const i=Tt(c);g=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${_t(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${i}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${o}
      ${g}
    </div>
  `}function zn(e,n,t,a="topic"){de();const c=a==="daily"||a==="wrong"?a:"topic",o=n.find(h=>h.id===t);if(!o){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,ze(yt(c,!1));return}an(o.id);const g=De(n,o.id),i=(g==null?void 0:g.topic)||ue(n)[0],y=g?g.indexInTopic:0,$=i.questions.length,V=ye(o.id);i.questions.filter(h=>{var C;return!!((C=N()[h.id])!=null&&C.inWrongBook)}).length;const p={from:c,selectedChoice:c==="wrong"?null:V?V.choice:null,isRedoing:!1,wrongFresh:c==="wrong",showLastTrace:!1,showEndCard:!1,justRemovedWrong:!1},D=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let K=0,W=null,S=!1;const L='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',q='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function r(h){return/Error|Exception/.test(h)}function s(h,C,j,x){return C!=="graded"?j===h?"selected":"idle":o.answer&&h===o.answer?"correct":j===h&&(x==null?void 0:x.result)==="wrong"?"wrong":"locked"}function l(h,C,j){const x=h.querySelector(".opt-badge"),T=h.querySelector(".opt-text"),b=h.querySelector(".opt-status");if(!x||!T||!b)return;const m=h.getAttribute("data-error")==="1";h.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),x.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),T.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),h.setAttribute("aria-checked",j?"true":"false"),C==="correct"?h.setAttribute("data-state","correct"):C==="wrong"?h.setAttribute("data-state","wrong"):h.removeAttribute("data-state"),C==="selected"||C==="correct"?(h.classList.add(C==="correct"?"opt-card-correct":"opt-card-selected"),C==="selected"&&h.classList.add("opt-pressable"),x.classList.add(C==="correct"?"opt-badge-correct":"opt-badge-selected"),T.classList.add("opt-text-strong"),b.innerHTML=L):C==="wrong"?(h.classList.add("opt-card-wrong"),x.classList.add("opt-badge-wrong"),T.classList.add("opt-text-strong","opt-text-wrong"),b.innerHTML=q):C==="locked"?(h.classList.add("opt-card-locked"),x.classList.add("opt-badge-default"),m&&T.classList.add("opt-text-error"),b.innerHTML=""):(h.classList.add("opt-card-default","opt-pressable"),x.classList.add("opt-badge-default"),m&&T.classList.add("opt-text-error"),b.innerHTML="")}function d(h,C,j,x){const T=r(h.text),b=["option-item"],m=["opt-badge"],F=["opt-text"];let R="",I="";C==="selected"?(b.push("opt-card-selected","opt-pressable"),m.push("opt-badge-selected"),F.push("opt-text-strong"),R=L):C==="correct"?(b.push("opt-card-correct"),m.push("opt-badge-correct"),F.push("opt-text-strong"),R=L,I='data-state="correct"'):C==="wrong"?(b.push("opt-card-wrong"),m.push("opt-badge-wrong"),F.push("opt-text-strong","opt-text-wrong"),R=q,I='data-state="wrong"'):C==="locked"?(b.push("opt-card-locked"),m.push("opt-badge-default"),T&&F.push("opt-text-error")):(b.push("opt-card-default","opt-pressable"),m.push("opt-badge-default"),T&&F.push("opt-text-error"));const O=(h.hint||"").trim(),ee=x!=="none"&&O?`<div class="opt-hint-clip${x==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${Y(h.key)}">${Y(O)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${j?"true":"false"}"
            ${I}
            class="${b.join(" ")}"
            data-testid="option-${Y(h.key)}"
            data-key="${Y(h.key)}"
            data-error="${T?"1":"0"}"
          >
            <span class="${m.join(" ")}">${Y(h.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${F.join(" ")}">${Y(h.text)}</span>
                <span class="opt-status">${R}</span>
              </div>
              ${ee}
            </div>
          </div>
        `}const u='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',f='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let k=0;function v(){var C;(C=document.getElementById("pydrill-wrong-toast"))==null||C.remove();const h=document.createElement("div");h.id="pydrill-wrong-toast",h.className="wrong-toast",h.setAttribute("role","status"),h.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从错题本移出</span>',document.body.appendChild(h),window.setTimeout(()=>{h.remove()},1500)}function M(){const h=e.querySelector("#q-toggle-last");if(!h)return;const C=p.showLastTrace;h.setAttribute("aria-pressed",C?"true":"false");const j=h.querySelector("span");j&&(j.textContent=C?"隐藏上次":"看上次答错");const x=h.querySelector("svg");x&&(x.outerHTML=C?f:u)}function P(h,C,j,x){const T=(C.hint||"").trim(),b=h.querySelector(".opt-body");if(!b)return;let m=h.querySelector(".opt-hint-clip");if(j&&T){m||(m=document.createElement("div"),m.className="opt-hint-clip",m.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${Y(C.key)}">${Y(T)}</p></div>`,b.appendChild(m));const F=m;requestAnimationFrame(()=>{requestAnimationFrame(()=>{x===k&&F.classList.add("is-open")})})}else if(m){m.classList.remove("is-open");const F=m,R=x,I=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{R===k&&F.remove()},I?0:200)}}function re(h){const C=++k,j=ye(o.id),x=Oe(j),T=(o.answer||"").trim();e.querySelectorAll(".option-item").forEach(m=>{const F=m.getAttribute("data-key")||"",R=o.options.find(se=>se.key===F);if(!h){const se=p.selectedChoice===F;l(m,se?"selected":"idle",se),R&&P(m,R,!1,C);return}const I=m.querySelector(".opt-badge"),O=m.querySelector(".opt-text"),ee=m.querySelector(".opt-status");if(!I||!O||!ee)return;const J=m.getAttribute("data-error")==="1",X=!!x&&F===x,_=!!T&&F===T;m.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),I.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),O.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),m.setAttribute("aria-checked","false"),m.removeAttribute("data-state"),X&&!_?(m.classList.add("opt-card-trace-last"),I.classList.add("opt-badge-trace-last"),O.classList.add("opt-text-strong","opt-text-trace-last")):_?(m.classList.add("opt-card-trace-correct"),I.classList.add("opt-badge-trace-correct"),O.classList.add("opt-text-strong","opt-text-trace-correct")):(m.classList.add("opt-card-default","opt-card-trace-dim"),I.classList.add("opt-badge-default"),J&&O.classList.add("opt-text-error"));const U=[];X&&U.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${Y(F)}">上次选的 ${Y(F)}</span>`),_&&U.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${Y(F)}">正确答案 ${Y(F)}</span>`),ee.innerHTML=U.length?`<span class="opt-trace-tag-row">${U.join("")}</span>`:"",R&&P(m,R,X||_,C)});const b=e.querySelector("#q-submit-btn");if(b){const m=h||!p.selectedChoice;b.disabled=m,b.classList.toggle("btn-disabled",m)}}function ke(h){ze(yt(p.from,p.showEndCard)),(h||p.showEndCard)&&de()}function ce(){var it,ct,lt,dt,ut,pt,gt,ft,ht,mt,vt,wt;const h=++K,C=W!==o.id;W=o.id;const j=ye(o.id),x=Oe(j).length>0,b=p.isRedoing||p.wrongFresh?void 0:j,m=!!b;m&&(p.showLastTrace=!1);const F=S&&m;S=!1;let R="#/topics";p.from==="daily"&&(R="#/"),p.from==="wrong"&&(R="#/wrong");let I="知识点练习";p.from==="daily"?I="今日一题":p.from==="wrong"&&(I="错题本");let O=null,ee=null,J=!1,X=!1,_=i.questions,U=y;if(p.from==="wrong"){const w=N();_=i.questions.filter(A=>{var E;return!!((E=w[A.id])!=null&&E.inWrongBook)}),U=_.findIndex(A=>A.id===o.id)}p.from==="daily"?(X=!0,J=!0,_=[o],U=0):U<0?(X=!0,J=!0):(X=U===0,J=U>=_.length-1,X||(O=_[U-1].id),J||(ee=_[U+1].id));const se=N(),qe=_.length>0&&_.every(w=>!!se[w.id]),he=J&&!qe,Rt=U>=0?U+1:1,Ot=p.from==="wrong"?Math.max(_.length,1):$,Ut=p.from==="wrong"?`${i.name} · 错题 ${Rt}/${Ot}`:`${i.name} · 第 ${y+1}/${$} 题`;if(p.showEndCard){if(p.from==="daily"){te("#/");return}const w=p.from==="topic",A=N();let E="",H="",B="#/topics",G="返回知识点列表",oe="",le="";if(w){let ne=0;for(const z of i.questions)((it=A[z.id])==null?void 0:it.result)==="correct"&&ne++;E="这个知识点做完了",H=`本组共 ${$} 题 · 你已做对 ${ne}/${$} 题`,B="#/topics",G="返回知识点列表",oe=`
          <div class="end-questions-list">
            ${i.questions.map((z,ae)=>{const we=ae+1,Z=A[z.id],be=(Z==null?void 0:Z.result)==="correct",Ie=(Z==null?void 0:Z.result)==="wrong";let pe="end-chip-gray",ge="· 未做";be?(pe="end-chip-green",ge="✓ 答对"):Ie&&(pe="end-chip-red",ge="✗ 答错");const He=z.code?z.code.split(`
`)[0].trim():z.stem;return`
              <a href="#/q/${z.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${we} 题</span>
                  <span class="end-q-code">${Y(He)}</span>
                </div>
                <span class="end-chip ${pe}">${ge}</span>
              </a>
            `}).join("")}
          </div>
        `;const Q=ue(n),me=Q.findIndex(z=>z.name===i.name),ve=me!==-1&&me<Q.length-1?Q[me+1]:null;ve&&ve.questions.length>0&&(le=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{const ne=i.questions.filter(z=>{var ae;return!!((ae=A[z.id])!=null&&ae.inWrongBook)}),ie=ne.length;E="错题本这一轮看完了",H=`好样的！这一轮看了 ${ie} 题，多练几遍思路更清晰。`,B="#/wrong",G="返回错题本",ie>0?oe=`
            <div class="end-questions-list">
              ${ne.map((ae,we)=>{const Z=A[ae.id],be=(Z==null?void 0:Z.result)==="correct",Ie=(Z==null?void 0:Z.result)==="wrong";let pe="end-chip-gray",ge="· 未做";be?(pe="end-chip-green",ge="✓ 答对"):Ie&&(pe="end-chip-red",ge="✗ 答错");const He=ae.code?ae.code.split(`
`)[0].trim():ae.stem;return`
                <a href="#/q/${ae.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">错题 ${we+1}/${ie}</span>
                    <span class="end-q-code">${Y(He)}</span>
                  </div>
                  <span class="end-chip ${pe}">${ge}</span>
                </a>
              `}).join("")}
            </div>
          `:oe=`
            <div class="end-empty-row">
              ${Pt(18)}
              <span>错题本已经清空了</span>
            </div>
          `;const Q=ue(n),me=Q.findIndex(z=>z.name===i.name);let ve=null;if(me!==-1)for(let z=1;z<Q.length;z++){const we=Q[(me+z)%Q.length].questions.find(Z=>{var be;return!!((be=A[Z.id])!=null&&be.inWrongBook)});if(we){ve=we.id;break}}ve&&(le=`
            <a
              href="#/q/${ve}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const Ae=p.from==="wrong"?"错题本 · 完成":`${i.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${D}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${xt()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${Ae}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Ee}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${E}</h2>
              <p class="end-sub">${H}</p>

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
                ${le}
              </div>
            </div>
          </main>
        </div>
      `,(ct=document.getElementById("q-back-btn"))==null||ct.addEventListener("click",()=>{te(R)}),(lt=document.getElementById("end-leave-btn"))==null||lt.addEventListener("click",()=>{te(B)}),(dt=document.getElementById("end-next-topic-btn"))==null||dt.addEventListener("click",()=>{const ne=ue(n),ie=ne.findIndex(Q=>Q.name===i.name);if(ie!==-1&&ie<ne.length-1){const Q=ne[ie+1];te(`#/q/${Q.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(ne=>{ne.addEventListener("click",ie=>{const Q=ne.getAttribute("href");Q&&(ie.preventDefault(),te(Q))})}),ke(C);return}const Se=m?F?"pending":"graded":"answering",zt=Se==="answering"?"none":Se==="pending"?"closed":"open",Ye=Se==="graded"?(b==null?void 0:b.choice)??null:p.selectedChoice,Vt=o.options.map(w=>d(w,s(w.key,Se,Ye,b),Ye===w.key,zt)).join("");let Ke="";if(m&&b){let w=Ee,A="答对了！";const E=Et(b.submittedAt);let H=`你选了 ${b.choice} · 正确答案 ${o.answer} · ${E} 提交`,B="banner-correct",G="",oe="";b.result==="wrong"?(w=Ge,A="答错了",H=`你选了 ${b.choice} · 正确答案是 ${o.answer} · ${E} 提交`,B="banner-wrong",b.inWrongBook&&(G='<span class="result-tag-badge tag-wrong">已加入错题本</span>')):b.result==="correct"?b.inWrongBook&&p.from!=="wrong"?oe=`
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
          `):b.result==="ungraded"&&(w=Ee,A="已提交（未判分）",H=`这题的答案还没编写 · ${E} 提交`,B="banner-ungraded"),Ke=`
        <section class="result-banner ${B}" data-testid="result-banner" data-result="${b.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${w}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${A}</h2>
              <p class="result-sub">${H}</p>
            </div>
            ${G?`<div class="result-tag-wrap">${G}</div>`:""}
          </div>
          ${oe}
        </section>
      `}let Je="";if(m&&b){const w=Un(o.explanation);Je=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${_t()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${w}
          </div>
        </section>
      `}let Xe="";o.animationId!=null&&m&&(Xe=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let et="";if(p.isRedoing&&p.from!=="wrong"){const w=ye(o.id);if(w){const A=w.result==="correct"?"答对":w.result==="wrong"?"答错":"已提交",E=Et(w.submittedAt);et=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${A}（选 ${w.choice} · ${E}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Gt=p.from==="wrong"?_:i.questions,tt=p.from!=="wrong"||m,Nt=Gt.map((w,A)=>{const E=A+1,H=w.id===o.id,B=ye(w.id),G=tt&&(B==null?void 0:B.result)==="correct",oe=tt&&(B==null?void 0:B.result)==="wrong";let le="switcher-unanswered",Ae=`<span>${E}</span>`;return G?(le="switcher-correct",Ae=$n()):oe&&(le="switcher-wrong",Ae=kn()),H&&(le+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${le} active-press"
            data-testid="q-switch-${E}"
            data-qid="${w.id}"
            title="第 ${E} 题"
          >
            ${Ae}
          </button>
        `}).join(""),Qt=m?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${An(14)}
          <span>重做</span>
        </button>
      `:"",nt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${X?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${X?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,st=J?"完成":"下一题 ›",at=J?' data-action="finish"':"",rt=he?" btn-disabled":"",ot=he?' disabled aria-disabled="true"':"",Zt=`
      <button
        type="button"
        class="btn-nav-next active-press${rt}"
        data-testid="next"
        id="q-next-btn"${at}${ot}
      >
        <span>${st}</span>
      </button>
    `,Yt=`
      <button
        type="button"
        class="btn-next-main active-press${rt}"
        data-testid="next"
        id="q-next-btn"${at}${ot}
      >
        <span>${st}</span>
      </button>
    `;let Be="";if(m)Be=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${nt}
            ${Qt}
            ${Yt}
          </div>
        </div>
      `;else{const w=!!p.selectedChoice;Be=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${nt}
            <button
              type="button"
              class="btn-submit-main active-press ${w?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${w?"":"disabled"}
            >
              <span>${w?"提交答案":"提交"}</span>
            </button>
            ${Zt}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${D}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${xt()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${Ut}</span>
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
              ${Nt}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${et}

          <!-- 4. Result Banner (if submitted) -->
          ${Ke}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${o.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${o.code?On(o.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Vt}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${Je}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${Xe}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Be}
      </div>
    `,(ut=document.getElementById("q-back-btn"))==null||ut.addEventListener("click",()=>{te(R)}),m)(ft=document.getElementById("q-redo-btn"))==null||ft.addEventListener("click",()=>{p.isRedoing=!0,p.selectedChoice=null,p.showLastTrace=!1,p.justRemovedWrong=!1,ce()}),p.from!=="wrong"&&((ht=document.getElementById("q-remove-wrong-btn"))==null||ht.addEventListener("click",()=>{bt(o.id),p.justRemovedWrong=!0,ce()}));else{const w=e.querySelectorAll(".option-item");w.forEach(A=>{A.addEventListener("click",()=>{if(p.showLastTrace)return;const E=A.getAttribute("data-key");if(!E||E===p.selectedChoice)return;p.selectedChoice=E,w.forEach(B=>{const G=B.getAttribute("data-key")===E;l(B,G?"selected":"idle",G)});const H=e.querySelector("#q-submit-btn");if(H){H.disabled=!1,H.classList.remove("btn-disabled");const B=H.querySelector("span");B&&(B.textContent="提交答案")}})}),(pt=document.getElementById("q-submit-btn"))==null||pt.addEventListener("click",()=>{!p.selectedChoice||p.showLastTrace||(tn(o,p.selectedChoice),p.isRedoing=!1,p.wrongFresh=!1,p.showLastTrace=!1,p.justRemovedWrong=!1,S=!0,ce())}),(gt=document.getElementById("q-toggle-last"))==null||gt.addEventListener("click",()=>{const A=e.querySelector("#q-toggle-last");!A||A.disabled||m||(p.showLastTrace=!p.showLastTrace,M(),re(p.showLastTrace))})}p.from==="wrong"&&((mt=document.getElementById("q-remove-wrong-btn"))==null||mt.addEventListener("click",()=>{const w=o.id;bt(w),v();const A=N(),E=i.questions.find(H=>{var B;return H.id===w||!((B=A[H.id])!=null&&B.inWrongBook)?!1:i.questions.findIndex(G=>G.id===H.id)>y});te(E?`#/q/${E.id}?from=wrong`:"#/wrong")})),(vt=document.getElementById("q-prev-btn"))==null||vt.addEventListener("click",()=>{O&&te(`#/q/${O}?from=${p.from}`)}),(wt=document.getElementById("q-next-btn"))==null||wt.addEventListener("click",()=>{if(ee){te(`#/q/${ee}?from=${p.from}`);return}const w=N();if(_.length>0&&_.every(E=>!!w[E.id])){if(p.from==="daily"){te("#/");return}p.showEndCard=!0,ce()}}),e.querySelectorAll(".q-switch-pill").forEach(w=>{w.addEventListener("click",()=>{const A=w.getAttribute("data-qid");A&&A!==o.id&&te(`#/q/${A}?from=${p.from}`)})});const Ce=e.querySelector(".q-switcher-group"),Me=e.querySelector(".switcher-current");if(Ce&&Me){const w=Me.getBoundingClientRect().left-Ce.getBoundingClientRect().left,A=Ce.scrollLeft+w-(Ce.clientWidth-Me.offsetWidth)/2;Ce.scrollLeft=Math.max(0,A)}if(F&&b){const w=b;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(h!==K||!e.isConnected)return;const A=e.querySelector("[data-view-token]");!A||A.getAttribute("data-view-token")!==D||e.querySelectorAll(".option-item").forEach(E=>{var G;const H=E.getAttribute("data-key")||"",B=w.choice===H;l(E,s(H,"graded",w.choice,w),B),(G=E.querySelector(".opt-hint-clip"))==null||G.classList.add("is-open")})})})}ke(C)}ce()}const xe=document.getElementById("app");let $e=[];function fe(){const{path:e}=Te();e==="/"||e===""?xe.innerHTML=Tn($e):e==="/topics"?xe.innerHTML=Mn($e):e==="/wrong"?xe.innerHTML=_n($e):e==="/me"&&(xe.innerHTML=Pn($e,fe));const n=gn(e);n!=null&&ze(n)}async function Wt(){var n;try{$e=await Kt()}catch{xe.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Wt()});return}Fe("/",()=>{de(),fe()}),Fe("/topics",()=>{de(),fe()}),Fe("/wrong",()=>{de(),fe()}),Fe("/me",()=>{de(),fe()}),Fe("/q/:id",(t,a)=>{de();const c=t.id,o=a.from||"topic";zn(xe,$e,c,o)}),Jt(()=>{te("#/")}),en(()=>{const{path:t}=Te();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me")&&fe()});const e=()=>{const{path:t}=Te();(t==="/"||t==="")&&fe()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Xt()}Wt();
