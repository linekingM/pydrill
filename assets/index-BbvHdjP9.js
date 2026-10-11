(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const r of u.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(a){if(a.ep)return;a.ep=!0;const u=t(a);fetch(a.href,u)}})();let Ke=null;async function Ln(e=!1){if(Ke&&!e)return Ke;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return Ke=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function ce(e){const n=new Map;for(const a of e)n.has(a.topic)||n.set(a.topic,[]),n.get(a.topic).push(a);const t=[];let s=0;for(const[a,u]of n.entries())t.push({name:a,index:s,questions:u}),s++;return t}function Ue(e,n){const t=ce(e);for(const s of t){const a=s.questions.findIndex(u=>u.id===n);if(a!==-1)return{topic:s,indexInTopic:a}}return null}const tn=[];let nn=()=>{};function xe(e,n){const t=[],s=e.replace(/:([a-zA-Z0-9_]+)/g,(u,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),a=new RegExp(`^${s}$`);tn.push({regex:a,paramNames:t,handler:n})}function En(e){nn=e}function oe(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function z(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?nt():window.location.hash=n}function Ne(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),s=n.startsWith("/")?n:"/"+n,a={};return t&&new URLSearchParams(t).forEach((r,l)=>{a[l]=r}),{path:s,query:a}}function nt(){oe();const{path:e,query:n}=Ne();for(const t of tn){const s=e.match(t.regex);if(s){const a={};t.paramNames.forEach((u,r)=>{a[u]=s[r+1]?decodeURIComponent(s[r+1]):""}),t.handler(a,n);return}}nn({},n)}function Fn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",nt),nt()}const ct="pydrill.v1.records",lt="pydrill.v1.last",dt="pydrill.days",st=new Set;function qn(e){return st.add(e),()=>{st.delete(e)}}function sn(){for(const e of st)try{e()}catch(n){console.error("Error in store listener:",n)}}function K(){try{const e=localStorage.getItem(ct);if(!e)return{};const n=JSON.parse(e);return typeof n!="object"||n===null?{}:n}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Ae(e){return K()[e]}function at(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function an(e){try{localStorage.setItem(ct,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}sn()}function Ie(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${s}`}function rn(){try{const e=localStorage.getItem(dt);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function on(e){const n=Ie(),t=rn();if(!t.includes(n)){t.push(n);try{localStorage.setItem(dt,JSON.stringify(t))}catch(s){console.error("Failed to save active days to localStorage:",s)}}}function Bn(e,n){on();const t=K(),s=t[e.id],a=!!(s!=null&&s.inWrongBook);let u,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(u="correct",r=a):(u="wrong",r=!0):(u="ungraded",r=!1);const f=a&&(u==="correct"||u==="wrong"),v={choice:n,result:u,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:f};if(u==="wrong")v.lastWrongChoice=n,v.lastWrongAt=v.submittedAt;else{const T=at(s);T&&(v.lastWrongChoice=T,typeof(s==null?void 0:s.lastWrongAt)=="number"?v.lastWrongAt=s.lastWrongAt:(s==null?void 0:s.result)==="wrong"&&(v.lastWrongAt=s.submittedAt))}return t[e.id]=v,an(t),v}function jt(e){const n=K();n[e]&&(n[e]={...n[e],inWrongBook:!1},an(n))}function Mn(){try{localStorage.removeItem(ct)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(lt)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(dt)}catch(e){console.error("Failed to clear active days:",e)}sn()}function cn(e){try{const n=localStorage.getItem(lt);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const s=t.id,a=t.at;return typeof s!="string"||s.length===0||typeof a!="number"||!Number.isFinite(a)||!e.some(u=>u.id===s)?null:{id:s,at:a}}catch(n){return console.warn("Failed to parse last position:",n),null}}function In(e){try{localStorage.setItem(lt,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Qe(e){const n=K();return e.filter(t=>{var s;return!!((s=n[t.id])!=null&&s.inWrongBook)})}function Hn(e){const n=K(),t=e.length;let s=0;for(const a of e)n[a.id]&&s++;return{done:s,total:t}}const _n="pydrill.devPageIds";function rt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function Dn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:rt(new URLSearchParams(e.slice(n+1)).get("dev"))}function Pn(){return!0}function ln(){const e=Dn();if(e!==null)return e;const n=rt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=rt(localStorage.getItem(_n));if(t!==null)return t}catch{}return Pn()}function dn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:null}function Wt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function _e(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!ln()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const s=document.createElement("div");s.className="dev-page-id",s.setAttribute("data-testid","dev-page-id"),s.setAttribute("data-page",String(e)),s.setAttribute("aria-hidden","true"),s.textContent=t,document.body.appendChild(s)}function jn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),s=n.getMonth(),a=n.getDate();return(Math.floor(Date.UTC(t,s,a)/864e5)%e+e)%e}function Wn(e,n=new Date){if(e.length===0)return;const t=jn(e.length,n);return e[t]}function Rn(e,n){const t=new Date(e),s=new Date(n);return t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()}function On(e,n=new Date){const t=Ae(e.id),s=n.getTime();return!t||!Rn(t.submittedAt,s)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Un(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Nn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Qn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function zn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function Rt(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function Vn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function Gn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function pn(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function Yn(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function Zn(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function Kn(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function it(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Ot(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function Jn(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function un(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function qe(e,n=0){if(e==="none")return"";const t=e==="home",s=e==="topics",a=e==="wrong",u=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${Un(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${s?"active":""}" data-testid="tab-topics">
          ${Nn(s)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${a?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${Qn(a)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${u?"active":""}" data-testid="tab-me">
          ${zn(u)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const Xn=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,De=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,es=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,ts=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,ns=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function Je(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ss(e){const n=K(),s=Qe(e).length,a=ce(e),u=a.length,r=Wn(e),l=r?On(r):{statusText:"今天还没做",isCompletedToday:!1},f=r?Ue(e,r.id):null,v=f?f.indexInTopic+1:1,T=f?f.topic.questions.length:2,L=r?`${r.topic} · 第 ${v}/${T} 题`:"今日一题",o=new Date,D=`${o.getMonth()+1}月${o.getDate()}日`,q=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",A=a[0],E=(A==null?void 0:A.name)||"",F=A&&A.questions.length>0?A.questions.find(h=>!n[h.id])||A.questions[0]:void 0,c=cn(e),i=c?e.find(h=>h.id===c.id):void 0,d=i?Ue(e,i.id):null,g=i!=null&&i.code?(i.code.split(`
`)[0]||"").trim():"",p=i&&d?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Ot(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${Je(d.topic.name)} · 第 ${d.indexInTopic+1}/${d.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${i.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${g?`<div class="continue-code"><code>${Je(g)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Ot(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${Je(E)}」开始吧，一次一小步。</p>
          ${F?`<a href="#/q/${F.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${Xn}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${Yn()}</span>
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
        <a href="#/q/${(r==null?void 0:r.id)||(F==null?void 0:F.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${es}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${l.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${ts}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${u} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${ns}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${s>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${p}

      ${r?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${D}</span>
              <h3 class="daily-q-title">${L}</h3>
            </div>
            <span class="chip-status ${l.result==="correct"?"chip-green":l.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${l.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${r.stem}</p>

          ${q?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${q}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${r.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${l.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${De}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${qe("home",s)}
  `}const gn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},fn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function ze(e,n,t){const s=[],a=new Map;let u=0,r=null;for(const v of e){const T=v.subtopic&&v.subtopic.trim()?v.subtopic.trim():null;if(T){r=null;let L=a.get(T);L||(L={name:T,questions:[]},a.set(T,L),s.push(L)),L.questions.push(v)}else(!r||r.questions.length>=10)&&(u++,r={name:`第 ${u} 节`,questions:[]},s.push(r)),r.questions.push(v)}const l=[];let f=1;for(const v of s)for(let T=0;T<v.questions.length;T+=10){const L=v.questions.slice(T,T+10),o=L.reduce((q,A)=>q+(typeof A.difficulty=="number"?A.difficulty:2),0),D=Math.max(1,Math.min(3,Math.round(o/L.length)));l.push({index:f,name:v.name,topicIndex:n,topicName:t,questions:L,avgDifficulty:D}),f++}return l}function We(e,n){const t=e.questions.length;let s=0;for(const l of e.questions)n[l.id]&&s++;const a=t>0&&s===t,u=s>0&&!a;return{submittedCount:s,totalCount:t,isCompleted:a,isInProgress:u,isNotStarted:s===0}}function as(e,n,t,s){const a=ze(e,n,t);let u=0;for(const r of a){const{isCompleted:l}=We(r,s);l&&u++}return{sections:a,completedSections:u,totalSections:a.length}}function rs(e){const n=ce(e),t=K(),s=e.filter(r=>!!t[r.id]).length,a=Qe(e).length,u=n.map((r,l)=>{const{completedSections:f,totalSections:v}=as(r.questions,l,r.name,t),T=v>0?f/v:0,L=gn[r.name]??fn[r.name],o=r.questions.filter(A=>!!t[A.id]).length,D=r.questions.length;let q="";return f>0&&(q=`<circle class="ring-fill-bar" cx="18" cy="18" r="14" stroke-dasharray="87.96" stroke-dashoffset="${(87.96*(1-T)).toFixed(2)}"></circle>`),`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${l}"
          onclick="window.location.hash = '#/topic/${l}'"
        >
          <div class="topic-custom-icon-box">
            ${un(r.name)}
          </div>
          <div class="topic-card-text">
            <div class="topic-header-row">
              <h2 class="topic-name">${r.name}</h2>
              <span class="topic-index-badge">#${String(l+1).padStart(2,"0")}</span>
            </div>
            ${L?`<p class="topic-sub" data-testid="topic-sub-${l}">${L}</p>`:""}
          </div>
          <div
            class="topic-ring-col"
            data-testid="topic-ring-${l}"
            data-done-sections="${f}"
            data-total-sections="${v}"
            aria-label="${r.name}进度"
          >
            <span class="sr-only" data-testid="topic-progress-${l}">${o} / ${D}</span>
            <svg class="progress-ring-svg" viewBox="0 0 36 36">
              <circle class="ring-bg-track" cx="18" cy="18" r="14"></circle>
              ${q}
            </svg>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${it()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已完成 ${s} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${De}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${u}
      </section>
    </div>

    ${qe("topics",a)}
  `}function je(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function is(e,n){const t=ce(e),s=parseInt(n,10),a=t[s]||t[0];if(!a)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const u=K(),r=Qe(e).length,l=ze(a.questions,a.index,a.name),f=gn[a.name]||fn[a.name]||"";let v=0;for(const p of l)We(p,u).isCompleted&&v++;const T=l.length,L=T>0?v/T:0,o=150.8,D=(o*(1-L)).toFixed(1),q=l.map(p=>{const{submittedCount:h,totalCount:C,isCompleted:m,isInProgress:I}=We(p,u);let O="";m?O=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="0"/>
            </svg>
            <svg class="sec-ring-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        `:I?O=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-h/C)).toFixed(1)}"/>
            </svg>
            <span class="sec-ring-num is-progress">${p.index}</span>
          </div>
        `:O=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
            </svg>
            <span class="sec-ring-num">${p.index}</span>
          </div>
        `;let G="";m?G='<span class="sec-tag tag-done">已完成</span>':I?G='<span class="sec-tag tag-progress">进行中</span>':G='<span class="sec-tag tag-pending">未开始</span>';let ae="";p.avgDifficulty===1?ae='<span class="diff-dot dot-green"></span><span>入门</span>':p.avgDifficulty===2?ae='<span class="diff-dot dot-orange"></span><span>进阶</span>':ae='<span class="diff-dot dot-orange"></span><span class="diff-dot dot-orange"></span><span>挑战</span>';const te=`#/q/${(p.questions.find($=>!u[$.id])||p.questions[0]).id}?from=topic&sec=${p.index}`;let re="";return m?re=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${p.index}" onclick="window.location.hash='${te}'">
            再练一次
          </button>
        `:I?re=`
          <button type="button" class="sec-btn sec-btn-primary active-press" data-testid="sec-btn-${p.index}" onclick="window.location.hash='${te}'">
            <span>继续</span>
            <svg class="sec-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        `:re=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${p.index}" onclick="window.location.hash='${te}'">
            开始练
          </button>
        `,`
        <div class="${I?"topic-detail-sec-row is-in-progress":"topic-detail-sec-row"}" data-testid="sec-row-${p.index}">
          ${I?'<span class="sec-accent-bar" aria-hidden="true"></span>':""}
          ${O}
          <div class="sec-row-center">
            <div class="sec-row-title-line">
              <span class="sec-row-title">${p.index} ${je(p.name)}</span>
              ${G}
            </div>
            <div class="sec-row-meta-line">
              <span class="sec-diff-badge">${ae}</span>
              <span class="sec-meta-sep">·</span>
              <span class="sec-count-mono" data-testid="sec-count-${p.index}">${h}/${C}</span>
            </div>
          </div>
          ${re}
        </div>
      `}).join(""),A=l.find(p=>!We(p,u).isCompleted),E=!A,F=E?l[0]:A,c=F.index,i=E?"再练 第1节":`继续 第${c}节`,g=`#/q/${(F.questions.find(p=>!u[p.id])||F.questions[0]).id}?from=topic&sec=${c}`;return`
    <div class="page-wrapper page-topic-detail">
      <!-- Top Navigation Bar -->
      <header class="topic-detail-header">
        <a href="#/topics" aria-label="返回知识点列表" class="topic-detail-back-btn active-press" data-testid="detail-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </a>

        <div class="topic-detail-header-title-wrap">
          <h1 class="topic-detail-header-title">知识点详情</h1>
          <span class="topic-detail-index-badge">#${String(a.index+1).padStart(2,"0")}</span>
        </div>

        <div class="topic-detail-header-spacer" aria-hidden="true"></div>
      </header>

      <!-- Overview Card -->
      <section class="card paper-card topic-detail-overview-card">
        <div class="topic-detail-overview-info">
          <h2 class="topic-detail-name">${je(a.name)}</h2>
          ${f?`<p class="topic-detail-intro">${je(f)}</p>`:""}
          <div class="topic-detail-counts">
            <span>共 ${T} 小节</span>
            <span class="topic-detail-counts-dot">·</span>
            <span>${a.questions.length} 道题目</span>
          </div>
        </div>

        <div class="topic-detail-big-ring-wrap" data-testid="detail-ring" aria-label="已完成 ${v}/${T} 节">
          <svg class="topic-detail-big-ring-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" class="topic-detail-ring-track" stroke-width="5"/>
            ${v>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${o}" stroke-dashoffset="${D}"/>`:""}
          </svg>
          <div class="topic-detail-big-ring-inner">
            <span class="topic-detail-ring-fraction">${v}/${T}<span class="topic-detail-ring-unit">节</span></span>
            <span class="topic-detail-ring-status">已完成</span>
          </div>
        </div>
      </section>

      <!-- Section List Title Row -->
      <div class="topic-detail-list-title-row">
        <div class="topic-detail-list-title-group">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <h3 class="topic-detail-list-heading">小节清单</h3>
        </div>
        <span class="topic-detail-list-sub">按顺序循序渐进</span>
      </div>

      <!-- Main Sections Paper Card -->
      <section class="card paper-card topic-detail-sections-container">
        ${q}
      </section>

      <!-- Quiet Study Note -->
      <div class="topic-detail-quiet-note">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm0-13a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm0 8a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"/>
        </svg>
        <span>按小节拆解练习，温和消化每一个 Python 知识点</span>
      </div>

      <!-- Sticky Bottom Bar -->
      <div class="topic-detail-bottom-bar-wrap">
        <div class="topic-detail-bottom-bar">
          <div class="bottom-bar-info">
            <span class="bottom-bar-sub">当前进度</span>
            <span class="bottom-bar-title">第 ${c} 节 · ${je(F.name)}</span>
          </div>
          <button
            type="button"
            class="bottom-bar-cta-btn active-press"
            data-testid="detail-continue"
            onclick="window.location.hash='${g}'"
          >
            <span>${i}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    ${qe("topics",r)}
  `}const os=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function cs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ls(e,n){const t=K(),s=ce(e),a=e.filter(f=>{var v;return!!((v=t[f.id])!=null&&v.inWrongBook)}),u=a.length;if(u===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${it()}</span>
            </div>
            <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
          </div>
          <div class="header-illustration-right">
            <img src="${De}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="温习本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${os}" alt="空白小本子" class="wrong-empty-img" />
          </div>
          <h2 class="wrong-empty-title">温习本是空的</h2>
          <p class="wrong-empty-desc">需要温习的题会放进这里，慢慢巩固。</p>
          <div class="wrong-empty-action">
            <a href="#/" class="btn-primary active-press">
              <span>去做今日一题</span>
            </a>
          </div>
        </section>
      </div>

      ${qe("wrong",0)}
    `;let r=a[0].id;for(const f of s){const v=f.questions.find(T=>{var L;return!!((L=t[T.id])!=null&&L.inWrongBook)});if(v){r=v.id;break}}const l=s.map(f=>{const v=f.questions.filter(D=>{var q;return!!((q=t[D.id])!=null&&q.inWrongBook)});if(v.length===0)return"";const L=v.filter(D=>{var q;return!!((q=t[D.id])!=null&&q.wrongBookReviewed)}).length/v.length*100,o=String(f.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${f.index}"
          href="#/q/${v[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${un(f.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${cs(f.name)}</span>
              <span class="wrong-topic-index">#${o}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${f.index}">${v.length}</span> 题待巩固
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" data-testid="wrong-topic-bar-${f.index}" style="width: ${L}%;"></div>
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
            <span class="title-doodle-leaf">${it()}</span>
          </div>
          <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
        </div>
        <div class="header-illustration-right">
          <img src="${De}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <a href="#/q/${r}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>从第一题开始重做</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有待巩固题的知识点">
        ${l}
      </section>
    </div>

    ${qe("wrong",u)}
  `}const Re=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function Xe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ds(e){const n=new Date(e),t=new Date,s=Ie(t),a=Ie(n);if(a===s)return"今天";const u=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return a===Ie(u)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function ps(e,n){const t=K(),s=ce(e),a=Qe(e).length,u=rn(),r=u.length,l=new Date,f=l.getDay(),v=f===0?-6:1-f,T=new Date(l.getFullYear(),l.getMonth(),l.getDate()+v),L=["一","二","三","四","五","六","日"],o=new Set(u);let D=0;const q=L.map((d,g)=>{const p=new Date(T.getFullYear(),T.getMonth(),T.getDate()+g),h=Ie(p),C=o.has(h);return C&&D++,`
        <div class="day-dot-item">
          <span class="day-name">${d}</span>
          <div class="day-dot ${C?"active is-on":""}" data-testid="me-week-dot-${g}"></div>
        </div>
      `}).join(""),A=s.map((d,g)=>{const{done:p,total:h}=Hn(d.questions);let C="";return p>0&&(C=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(p/h*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${g}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${d.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${C}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${g}">${p}/${h}</span>
          </div>
          <span class="ring-label">${Xe(d.name)}</span>
        </div>
      `}).join(""),E=a>0?`<div class="review-count-highlight">${a} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',F=Object.entries(t).filter(([d,g])=>typeof g.submittedAt=="number").sort((d,g)=>g[1].submittedAt-d[1].submittedAt).slice(0,3);let c="";F.length===0?c='<div class="recent-empty">还没有练习记录</div>':c=F.map(([d,g],p)=>{const h=e.find(I=>I.id===d);if(!h)return"";const C=h.title||(h.stem?h.stem.split(`
`)[0].trim():"Python 练习题"),m=ds(g.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${p}" onclick="window.location.hash='#/q/${h.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${Xe(C)}</div>
              <div class="recent-topic-sub">· ${Xe(h.topic)}</div>
            </div>
            <span class="recent-time">${m}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const d=document.getElementById("clear-confirm-modal");d&&d.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const d=document.getElementById("clear-confirm-modal");d&&d.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Mn();const d=document.getElementById("clear-confirm-modal");d&&d.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=d=>{try{localStorage.setItem("pydrill.devPageIds",d?"true":"false")}catch{}const g=dn("/me");_e(g)});const i=ln();return`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Card -->
      <header class="card paper-card profile-header-card select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Re}" alt="小芽啾" class="me-avatar-img" />
          <span class="me-avatar-sparkle">✦</span>
        </div>
        <div class="header-info-col">
          <div class="header-top-row">
            <span class="brand-title">PyDrill</span>
            <span class="days-badge" data-testid="me-days">已经学了 ${r} 天</span>
          </div>
          <p class="brand-sub">学 Python 的随身小练习本</p>
        </div>
      </header>

      <!-- 2. Rhythm Card (Week days) -->
      <section class="card paper-card rhythm-card">
        <div class="rhythm-header">
          <span class="rhythm-text" data-testid="me-week-text">这周来过 ${D} 天，慢慢来就好</span>
        </div>
        <div class="rhythm-dots-row">
          ${q}
        </div>
      </section>

      <!-- 3. Topic Map Card (8 rings) -->
      <section class="card paper-card topic-map-card">
        <div class="section-title-row">
          <h2 class="section-title">
            <span class="section-title-leaf">
              <svg fill="none" height="15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24" width="15">
                <path d="M12 22V12"></path>
                <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#D5EAB6"></path>
                <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#D5EAB6"></path>
              </svg>
            </span>
            知识点地图
          </h2>
          <span class="section-tag">${s.length} 个核心专题</span>
        </div>
        <div class="rings-grid">
          ${A}
        </div>
      </section>

      <!-- 4. Dual Half-width Cards: 温习本 & 最近练习 -->
      <div class="dual-cards-row">
        <!-- Card A: 温习本 Entry -->
        <section class="card paper-card review-card">
          <div class="review-card-top">
            <span class="card-mini-title">
              <svg fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14">
                <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5"></path>
                <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z"></path>
              </svg>
              温习本
            </span>
            ${E}
          </div>
          <a class="btn-review-go active-press" data-testid="me-go-wrong" href="#/wrong">
            去温习 ›
          </a>
        </section>

        <!-- Card B: 最近练习 -->
        <section class="card paper-card recent-card">
          <span class="card-mini-title">
            <svg fill="none" height="14" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="14">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            最近练习
          </span>
          <div class="recent-list">
            ${c}
          </div>
        </section>
      </div>

      <!-- 5. Settings Card -->
      <section class="card paper-card settings-card">
        <!-- Row 1: 显示页码 with Toggle -->
        <div class="setting-row">
          <div class="setting-info-block">
            <span class="setting-label">显示页码</span>
            <span class="setting-subtext">每页右上角显示页码 P1、P2…，方便反馈时说是哪一页</span>
          </div>
          <label class="switch-wrap">
            <input
              type="checkbox"
              id="dev-page-toggle"
              data-testid="toggle-dev"
              ${i?"checked":""}
              onchange="window.__pydrill_toggleDevPage?.(this.checked)"
            />
            <span class="switch-slider"></span>
          </label>
        </div>

        <!-- Row 2: 关于 / 题库版本 -->
        <div class="setting-row">
          <div class="setting-info-block">
            <span class="setting-label">关于 / 题库版本</span>
            <span class="setting-subtext">Python 语法基础题库</span>
          </div>
          <span class="setting-value-chip" data-testid="bank-version">80 题 · 8 个知识点</span>
        </div>

        <!-- Row 3: 本地存储说明 -->
        <div class="setting-row">
          <div class="setting-info-block">
            <span class="setting-label">本地存储</span>
            <span class="setting-subtext">记录只保存在这台手机的浏览器里，轻巧无负担</span>
          </div>
        </div>

        <!-- Row 4: 重置学习进度 -->
        <div class="setting-row">
          <div class="reset-btn-row active-press" data-testid="clear-records" role="button" onclick="window.__pydrill_showClearDialog?.();">
            <div class="setting-info-block">
              <span class="reset-text">重置学习进度</span>
              <span class="setting-subtext">清空答题记录并重新开始</span>
            </div>
            <span class="reset-chevron">›</span>
          </div>
        </div>
      </section>

      <!-- Confirmation Dialog Modal -->
      <div id="clear-confirm-modal" class="modal-backdrop hidden" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="card paper-card modal-card">
          <div class="modal-icon-wrap">
            ${Kn()}
          </div>
          <h3 id="modal-title" class="modal-title">确定重置学习进度吗？</h3>
          <p class="modal-desc">清空后，所有答题历史、上次位置与天数都将重置为初始状态，无法恢复。</p>
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
              确定重置
            </button>
          </div>
        </div>
      </div>
    </div>

    ${qe("me",a)}
  `}const ot=globalThis;ot.Prism=ot.Prism??{};ot.Prism.manual=!0;var Ut=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function us(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var et={exports:{}},Nt;function gs(){return Nt||(Nt=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(s){var a=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,u=0,r={},l={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function c(i){return i instanceof f?new f(i.type,c(i.content),i.alias):Array.isArray(i)?i.map(c):i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(c){return Object.prototype.toString.call(c).slice(8,-1)},objId:function(c){return c.__id||Object.defineProperty(c,"__id",{value:++u}),c.__id},clone:function c(i,d){d=d||{};var g,p;switch(l.util.type(i)){case"Object":if(p=l.util.objId(i),d[p])return d[p];g={},d[p]=g;for(var h in i)i.hasOwnProperty(h)&&(g[h]=c(i[h],d));return g;case"Array":return p=l.util.objId(i),d[p]?d[p]:(g=[],d[p]=g,i.forEach(function(C,m){g[m]=c(C,d)}),g);default:return i}},getLanguage:function(c){for(;c;){var i=a.exec(c.className);if(i)return i[1].toLowerCase();c=c.parentElement}return"none"},setLanguage:function(c,i){c.className=c.className.replace(RegExp(a,"gi"),""),c.classList.add("language-"+i)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(g){var c=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(c){var i=document.getElementsByTagName("script");for(var d in i)if(i[d].src==c)return i[d]}return null}},isActive:function(c,i,d){for(var g="no-"+i;c;){var p=c.classList;if(p.contains(i))return!0;if(p.contains(g))return!1;c=c.parentElement}return!!d}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(c,i){var d=l.util.clone(l.languages[c]);for(var g in i)d[g]=i[g];return d},insertBefore:function(c,i,d,g){g=g||l.languages;var p=g[c],h={};for(var C in p)if(p.hasOwnProperty(C)){if(C==i)for(var m in d)d.hasOwnProperty(m)&&(h[m]=d[m]);d.hasOwnProperty(C)||(h[C]=p[C])}var I=g[c];return g[c]=h,l.languages.DFS(l.languages,function(O,G){G===I&&O!=c&&(this[O]=h)}),h},DFS:function c(i,d,g,p){p=p||{};var h=l.util.objId;for(var C in i)if(i.hasOwnProperty(C)){d.call(i,C,i[C],g||C);var m=i[C],I=l.util.type(m);I==="Object"&&!p[h(m)]?(p[h(m)]=!0,c(m,d,null,p)):I==="Array"&&!p[h(m)]&&(p[h(m)]=!0,c(m,d,C,p))}}},plugins:{},highlightAll:function(c,i){l.highlightAllUnder(document,c,i)},highlightAllUnder:function(c,i,d){var g={callback:d,container:c,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};l.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),l.hooks.run("before-all-elements-highlight",g);for(var p=0,h;h=g.elements[p++];)l.highlightElement(h,i===!0,g.callback)},highlightElement:function(c,i,d){var g=l.util.getLanguage(c),p=l.languages[g];l.util.setLanguage(c,g);var h=c.parentElement;h&&h.nodeName.toLowerCase()==="pre"&&l.util.setLanguage(h,g);var C=c.textContent,m={element:c,language:g,grammar:p,code:C};function I(G){m.highlightedCode=G,l.hooks.run("before-insert",m),m.element.innerHTML=m.highlightedCode,l.hooks.run("after-highlight",m),l.hooks.run("complete",m),d&&d.call(m.element)}if(l.hooks.run("before-sanity-check",m),h=m.element.parentElement,h&&h.nodeName.toLowerCase()==="pre"&&!h.hasAttribute("tabindex")&&h.setAttribute("tabindex","0"),!m.code){l.hooks.run("complete",m),d&&d.call(m.element);return}if(l.hooks.run("before-highlight",m),!m.grammar){I(l.util.encode(m.code));return}if(i&&s.Worker){var O=new Worker(l.filename);O.onmessage=function(G){I(G.data)},O.postMessage(JSON.stringify({language:m.language,code:m.code,immediateClose:!0}))}else I(l.highlight(m.code,m.grammar,m.language))},highlight:function(c,i,d){var g={code:c,grammar:i,language:d};if(l.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=l.tokenize(g.code,g.grammar),l.hooks.run("after-tokenize",g),f.stringify(l.util.encode(g.tokens),g.language)},tokenize:function(c,i){var d=i.rest;if(d){for(var g in d)i[g]=d[g];delete i.rest}var p=new L;return o(p,p.head,c),T(c,p,i,p.head,0),q(p)},hooks:{all:{},add:function(c,i){var d=l.hooks.all;d[c]=d[c]||[],d[c].push(i)},run:function(c,i){var d=l.hooks.all[c];if(!(!d||!d.length))for(var g=0,p;p=d[g++];)p(i)}},Token:f};s.Prism=l;function f(c,i,d,g){this.type=c,this.content=i,this.alias=d,this.length=(g||"").length|0}f.stringify=function c(i,d){if(typeof i=="string")return i;if(Array.isArray(i)){var g="";return i.forEach(function(I){g+=c(I,d)}),g}var p={type:i.type,content:c(i.content,d),tag:"span",classes:["token",i.type],attributes:{},language:d},h=i.alias;h&&(Array.isArray(h)?Array.prototype.push.apply(p.classes,h):p.classes.push(h)),l.hooks.run("wrap",p);var C="";for(var m in p.attributes)C+=" "+m+'="'+(p.attributes[m]||"").replace(/"/g,"&quot;")+'"';return"<"+p.tag+' class="'+p.classes.join(" ")+'"'+C+">"+p.content+"</"+p.tag+">"};function v(c,i,d,g){c.lastIndex=i;var p=c.exec(d);if(p&&g&&p[1]){var h=p[1].length;p.index+=h,p[0]=p[0].slice(h)}return p}function T(c,i,d,g,p,h){for(var C in d)if(!(!d.hasOwnProperty(C)||!d[C])){var m=d[C];m=Array.isArray(m)?m:[m];for(var I=0;I<m.length;++I){if(h&&h.cause==C+","+I)return;var O=m[I],G=O.inside,ae=!!O.lookbehind,ve=!!O.greedy,te=O.alias;if(ve&&!O.pattern.global){var re=O.pattern.toString().match(/[imsuy]*$/)[0];O.pattern=RegExp(O.pattern.source,re+"g")}for(var w=O.pattern||O,$=g.next,y=p;$!==i.tail&&!(h&&y>=h.reach);y+=$.value.length,$=$.next){var k=$.value;if(i.length>c.length)return;if(!(k instanceof f)){var M=1,b;if(ve){if(b=v(w,y,c,ae),!b||b.index>=c.length)break;var P=b.index,x=b.index+b[0].length,_=y;for(_+=$.value.length;P>=_;)$=$.next,_+=$.value.length;if(_-=$.value.length,y=_,$.value instanceof f)continue;for(var U=$;U!==i.tail&&(_<x||typeof U.value=="string");U=U.next)M++,_+=U.value.length;M--,k=c.slice(y,_),b.index-=y}else if(b=v(w,0,k,ae),!b)continue;var P=b.index,Q=b[0],X=k.slice(0,P),ye=k.slice(P+Q.length),le=y+k.length;h&&le>h.reach&&(h.reach=le);var Y=$.prev;X&&(Y=o(i,Y,X),y+=X.length),D(i,Y,M);var ne=new f(C,G?l.tokenize(Q,G):Q,te,Q);if($=o(i,Y,ne),ye&&o(i,$,ye),M>1){var W={cause:C+","+I,reach:le};T(c,i,d,$.prev,y,W),h&&W.reach>h.reach&&(h.reach=W.reach)}}}}}}function L(){var c={value:null,prev:null,next:null},i={value:null,prev:c,next:null};c.next=i,this.head=c,this.tail=i,this.length=0}function o(c,i,d){var g=i.next,p={value:d,prev:i,next:g};return i.next=p,g.prev=p,c.length++,p}function D(c,i,d){for(var g=i.next,p=0;p<d&&g!==c.tail;p++)g=g.next;i.next=g,g.prev=i,c.length-=p}function q(c){for(var i=[],d=c.head.next;d!==c.tail;)i.push(d.value),d=d.next;return i}if(!s.document)return s.addEventListener&&(l.disableWorkerMessageHandler||s.addEventListener("message",function(c){var i=JSON.parse(c.data),d=i.language,g=i.code,p=i.immediateClose;s.postMessage(l.highlight(g,l.languages[d],d)),p&&s.close()},!1)),l;var A=l.util.currentScript();A&&(l.filename=A.src,A.hasAttribute("data-manual")&&(l.manual=!0));function E(){l.manual||l.highlightAll()}if(!l.manual){var F=document.readyState;F==="loading"||F==="interactive"&&A&&A.defer?document.addEventListener("DOMContentLoaded",E):window.requestAnimationFrame?window.requestAnimationFrame(E):window.setTimeout(E,16)}return l})(n);e.exports&&(e.exports=t),typeof Ut<"u"&&(Ut.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(a,u){var r={};r["language-"+u]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[u]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var l={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};l["language-"+u]={pattern:/[\s\S]+/,inside:t.languages[u]};var f={};f[a]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:l},t.languages.insertBefore("markup","cdata",f)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(s,a){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[a,"language-"+a],inside:t.languages[a]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(s){var a=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+a.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+a.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+a.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+a.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:a,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var u=s.languages.markup;u&&(u.tag.addInlined("style","css"),u.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",a=function(A,E){return"✖ Error "+A+" while fetching file: "+E},u="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},l="data-src-status",f="loading",v="loaded",T="failed",L="pre[data-src]:not(["+l+'="'+v+'"]):not(['+l+'="'+f+'"])';function o(A,E,F){var c=new XMLHttpRequest;c.open("GET",A,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status<400&&c.responseText?E(c.responseText):c.status>=400?F(a(c.status,c.statusText)):F(u))},c.send(null)}function D(A){var E=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(A||"");if(E){var F=Number(E[1]),c=E[2],i=E[3];return c?i?[F,Number(i)]:[F,void 0]:[F,F]}}t.hooks.add("before-highlightall",function(A){A.selector+=", "+L}),t.hooks.add("before-sanity-check",function(A){var E=A.element;if(E.matches(L)){A.code="",E.setAttribute(l,f);var F=E.appendChild(document.createElement("CODE"));F.textContent=s;var c=E.getAttribute("data-src"),i=A.language;if(i==="none"){var d=(/\.(\w+)$/.exec(c)||[,"none"])[1];i=r[d]||d}t.util.setLanguage(F,i),t.util.setLanguage(E,i);var g=t.plugins.autoloader;g&&g.loadLanguages(i),o(c,function(p){E.setAttribute(l,v);var h=D(E.getAttribute("data-range"));if(h){var C=p.split(/\r\n?|\n/g),m=h[0],I=h[1]==null?C.length:h[1];m<0&&(m+=C.length),m=Math.max(0,Math.min(m-1,C.length)),I<0&&(I+=C.length),I=Math.max(0,Math.min(I,C.length)),p=C.slice(m,I).join(`
`),E.hasAttribute("data-start")||E.setAttribute("data-start",String(m+1))}F.textContent=p,t.highlightElement(F)},function(p){E.setAttribute(l,T),F.textContent=p})}}),t.plugins.fileHighlight={highlight:function(E){for(var F=(E||document).querySelectorAll(L),c=0,i;i=F[c++];)t.highlightElement(i)}};var q=!1;t.fileHighlight=function(){q||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),q=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(et)),et.exports}var fs=gs();const Qt=us(fs);var zt={},Vt;function hs(){return Vt||(Vt=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),zt}hs();function vs(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((a,u)=>{const r=u+1,f=Qt.highlight(a,Qt.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${f}</span></div>`}).join("")}</code></pre></div>`}function Gt(e){const n=new Date(e),t=n.getMonth()+1,s=n.getDate(),a=String(n.getHours()).padStart(2,"0"),u=String(n.getMinutes()).padStart(2,"0");return`${t}月${s}日 ${a}:${u}`}function ee(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Yt=200,Zt=1600,Kt=300,ms=1800;let Te=0,he=0,Jt=!1;function ws(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let Oe="#/overview";function bs(e,n){return n<=3?Array.from({length:n},(t,s)=>s):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function He(){Te+=1,he&&(window.clearTimeout(he),he=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function ys(){Jt||(Jt=!0,window.addEventListener("hashchange",He))}function $s(e,n){const t=n.getBoundingClientRect(),s=t.left+t.width/2,a=e.offsetWidth,u=e.offsetHeight,r=1,l=6,f=40,v=8,T=document.documentElement.clientWidth;let L=s+r+f+l,o=L-a;o<v&&(o=v,L=o+a),L>T-v&&(L=T-v,o=Math.max(v,L-a),L=o+a);let D=L-r-l-s;const q=12,A=Math.max(q,a-r*2-12-q);D<q&&(D=q),D>A&&(D=A),e.style.right=`${Math.round(T-L)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-u)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(D)}px`)}function ks(e,n){if(n!==Te||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(a=>a.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:Kt,easing:"ease",fill:"forwards"}),s=()=>{n===Te&&e.remove()};t.onfinish=s,window.setTimeout(s,Kt+60)}function tt(e,n,t,s){he&&window.clearTimeout(he),he=window.setTimeout(()=>{if(he=0,!(n!==Te||!e.isConnected)){if(!s){e.remove();return}ks(e,n)}},t)}function xs(e=Oe){var l;const n=document.getElementById("q-next-btn");if(!n)return;Oe=e,Te+=1;const t=Te;he&&(window.clearTimeout(he),he=0);const s=ws();let a=document.querySelector(".finish-tip");const u=!!a;if(a?document.querySelectorAll(".finish-tip").forEach(f=>{f!==a&&f.remove()}):(a=document.createElement("div"),a.className="finish-tip tip-bubble",a.setAttribute("data-testid","tip-bubble"),a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(a),(l=a.querySelector(".finish-tip-tag"))==null||l.addEventListener("click",f=>{f.stopPropagation(),He(),z(Oe)})),$s(a,n),s){a.getAnimations().forEach(f=>f.cancel()),a.style.opacity="1",a.style.transform="none",tt(a,t,ms,!1);return}if(u){a.getAnimations().forEach(f=>f.cancel()),a.style.opacity="1",a.style.transform="translateY(0)",tt(a,t,Zt,!0);return}const r=a.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:Yt,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==Te||!a.isConnected||(a.style.opacity="1",a.style.transform="translateY(0)")},tt(a,t,Yt+Zt,!0)}function Xt(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${ee(t)}</code>`)}function Cs(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let s=e,a="";n!==-1&&(s=e.slice(0,n).trim(),a=e.slice(n+t).trim(),a=a.replace(/^[：:\s]+/,""));const u=s.split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>`<p class="explanation-p">${Xt(l)}</p>`).join("");let r="";if(a){const l=Xt(a);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${pn(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${l}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${u}
      ${r}
    </div>
  `}function Fe(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function Ss(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),s=n.querySelector(".code-header");if(!t)return;const a=()=>{const u=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",u),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${s?s.offsetHeight:0}px`),a(),t.addEventListener("scroll",a,{passive:!0})})}function en(e,n,t,s="topic",a={}){var re;ys(),He(),oe();const u=s==="daily"||s==="wrong"?s:"topic",r=n.find(w=>w.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,_e(Wt(u,!1));return}if(u==="wrong"&&!a.endCard&&!((re=Ae(r.id))!=null&&re.inWrongBook)){window.location.replace(`#/q/${r.id}?from=topic`);return}a.endCard||In(r.id);const l=Ue(n,r.id),f=(l==null?void 0:l.topic)||ce(n)[0],v=l?l.indexInTopic:0,T=f.questions.length,L=Ae(r.id);f.questions.filter(w=>{var $;return!!(($=K()[w.id])!=null&&$.inWrongBook)}).length;const o={from:u,sec:a.sec,selectedChoice:u==="wrong"?null:L?L.choice:null,isRedoing:!1,wrongFresh:u==="wrong",showLastTrace:!1,showEndCard:!!a.endCard&&u!=="daily",justRemovedWrong:!1},D=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let q=0,A=null,E=!1;const F='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',c='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function i(w){return/Error|Exception/.test(w)}function d(w,$,y,k){return $!=="graded"?y===w?"selected":"idle":r.answer&&w===r.answer?"correct":y===w&&(k==null?void 0:k.result)==="wrong"?"wrong":"locked"}function g(w,$,y){const k=w.querySelector(".opt-badge"),M=w.querySelector(".opt-text"),b=w.querySelector(".opt-status");if(!k||!M||!b)return;const x=w.getAttribute("data-error")==="1";w.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),k.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),M.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),w.setAttribute("aria-checked",y?"true":"false"),$==="correct"?w.setAttribute("data-state","correct"):$==="wrong"?w.setAttribute("data-state","wrong"):w.removeAttribute("data-state"),$==="selected"||$==="correct"?(w.classList.add($==="correct"?"opt-card-correct":"opt-card-selected"),$==="selected"&&w.classList.add("opt-pressable"),k.classList.add($==="correct"?"opt-badge-correct":"opt-badge-selected"),M.classList.add("opt-text-strong"),b.innerHTML=F):$==="wrong"?(w.classList.add("opt-card-wrong"),k.classList.add("opt-badge-wrong"),M.classList.add("opt-text-strong","opt-text-wrong"),b.innerHTML=c):$==="locked"?(w.classList.add("opt-card-locked"),k.classList.add("opt-badge-default"),x&&M.classList.add("opt-text-error"),b.innerHTML=""):(w.classList.add("opt-card-default","opt-pressable"),k.classList.add("opt-badge-default"),x&&M.classList.add("opt-text-error"),b.innerHTML="")}function p(w,$,y,k){const M=i(w.text),b=["option-item"],x=["opt-badge"],_=["opt-text"];let U="",P="";$==="selected"?(b.push("opt-card-selected","opt-pressable"),x.push("opt-badge-selected"),_.push("opt-text-strong"),U=F):$==="correct"?(b.push("opt-card-correct"),x.push("opt-badge-correct"),_.push("opt-text-strong"),U=F,P='data-state="correct"'):$==="wrong"?(b.push("opt-card-wrong"),x.push("opt-badge-wrong"),_.push("opt-text-strong","opt-text-wrong"),U=c,P='data-state="wrong"'):$==="locked"?(b.push("opt-card-locked"),x.push("opt-badge-default"),M&&_.push("opt-text-error")):(b.push("opt-card-default","opt-pressable"),x.push("opt-badge-default"),M&&_.push("opt-text-error"));const Q=(w.hint||"").trim(),X=k!=="none"&&Q?`<div class="opt-hint-clip${k==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${ee(w.key)}">${ee(Q)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${y?"true":"false"}"
            ${P}
            class="${b.join(" ")}"
            data-testid="option-${ee(w.key)}"
            data-key="${ee(w.key)}"
            data-error="${M?"1":"0"}"
          >
            <span class="${x.join(" ")}">${ee(w.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${_.join(" ")}">${ee(w.text)}</span>
                <span class="opt-status">${U}</span>
              </div>
              ${X}
            </div>
          </div>
        `}const h='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',C='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let m=0;function I(){var $;($=document.getElementById("pydrill-wrong-toast"))==null||$.remove();const w=document.createElement("div");w.id="pydrill-wrong-toast",w.className="wrong-toast",w.setAttribute("role","status"),w.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(w),window.setTimeout(()=>{w.remove()},1500)}function O(){const w=e.querySelector("#q-toggle-last");if(!w)return;const $=o.showLastTrace;w.setAttribute("aria-pressed",$?"true":"false");const y=w.querySelector("span");y&&(y.textContent=$?"隐藏上次":"看上次思路");const k=w.querySelector("svg");k&&(k.outerHTML=$?C:h)}function G(w,$,y,k){const M=($.hint||"").trim(),b=w.querySelector(".opt-body");if(!b)return;let x=w.querySelector(".opt-hint-clip");if(y&&M){x||(x=document.createElement("div"),x.className="opt-hint-clip",x.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${ee($.key)}">${ee(M)}</p></div>`,b.appendChild(x));const _=x;requestAnimationFrame(()=>{requestAnimationFrame(()=>{k===m&&_.classList.add("is-open")})})}else if(x){x.classList.remove("is-open");const _=x,U=k,P=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{U===m&&_.remove()},P?0:200)}}function ae(w){const $=++m,y=Ae(r.id),k=at(y),M=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(x=>{const _=x.getAttribute("data-key")||"",U=r.options.find(W=>W.key===_);if(!w){const W=o.selectedChoice===_;g(x,W?"selected":"idle",W),U&&G(x,U,!1,$);return}const P=x.querySelector(".opt-badge"),Q=x.querySelector(".opt-text"),X=x.querySelector(".opt-status");if(!P||!Q||!X)return;const ye=x.getAttribute("data-error")==="1",le=!!k&&_===k,Y=!!M&&_===M;x.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),P.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),Q.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),x.setAttribute("aria-checked","false"),x.removeAttribute("data-state"),le&&!Y?(x.classList.add("opt-card-trace-last"),P.classList.add("opt-badge-trace-last"),Q.classList.add("opt-text-strong","opt-text-trace-last")):Y?(x.classList.add("opt-card-trace-correct"),P.classList.add("opt-badge-trace-correct"),Q.classList.add("opt-text-strong","opt-text-trace-correct")):(x.classList.add("opt-card-default","opt-card-trace-dim"),P.classList.add("opt-badge-default"),ye&&Q.classList.add("opt-text-error"));const ne=[];le&&ne.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${ee(_)}">上次选的 ${ee(_)}</span>`),Y&&ne.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${ee(_)}">正确答案 ${ee(_)}</span>`),X.innerHTML=ne.length?`<span class="opt-trace-tag-row">${ne.join("")}</span>`:"",U&&G(x,U,le||Y,$)});const b=e.querySelector("#q-submit-btn");if(b){const x=w||!o.selectedChoice;b.disabled=x,b.classList.toggle("btn-disabled",x)}}function ve(w){_e(Wt(o.from,o.showEndCard)),(w||o.showEndCard)&&oe()}function te(){var St,At,Tt,Lt,Et,Ft,qt,Bt,Mt,It,Ht,_t,Dt;He();const w=++q,$=A!==r.id;A=r.id;const y=Ae(r.id),k=at(y).length>0,b=o.isRedoing||o.wrongFresh?void 0:y,x=!!b;x&&(o.showLastTrace=!1);const _=E&&x;E=!1;const U=o.sec!=null?`&sec=${o.sec}`:"";let P="#/topics";o.from==="daily"&&(P="#/"),o.from==="wrong"&&(P="#/wrong"),o.from==="topic"&&o.sec!=null&&(P=`#/topic/${f.index}`);const Q=`#/overview?from=${o.from}&qid=${r.id}${o.from==="topic"?"&topic="+encodeURIComponent(f.name):""}${U}`;Oe=Q;let X="题目总览";o.from==="daily"&&(X="今日一题");let ye=null,le=null,Y=!1,ne=!1,W=f.questions,de=v;if(o.from==="wrong"){const S=K();W=f.questions.filter(B=>{var H;return!!((H=S[B.id])!=null&&H.inWrongBook)}),de=W.findIndex(B=>B.id===r.id)}else if(o.from==="topic"&&o.sec!=null){const B=ze(f.questions,f.index,f.name).find(H=>H.index===o.sec);B&&(W=B.questions,de=W.findIndex(H=>H.id===r.id))}o.from==="daily"?(ne=!0,Y=!0,W=[r],de=0):de<0?(ne=!0,Y=!0):(ne=de===0,Y=de>=W.length-1,ne||(ye=W[de-1].id),Y||(le=W[de+1].id));const vn=K(),mn=W.length>0&&W.every(S=>Fe(vn[S.id],o.from)),pt=Y&&!mn,ut=de>=0?de+1:1,gt=o.from==="wrong"?Math.max(W.length,1):o.sec!=null?W.length:T,wn=o.from==="wrong"?`${f.name} · 温习 ${ut}/${gt}`:o.from==="daily"?`今日一题 · ${f.name}`:o.sec!=null?`${f.name} · 第${o.sec}节 ${ut}/${gt}`:`${f.name} · 第 ${v+1}/${T} 题`;if(o.showEndCard){if(o.from==="daily"){z("#/");return}const S=o.from==="topic",B=K();let H="",R="",j="#/topics",V="返回知识点列表",ue="",Le="",me="";if(S){if(o.sec!=null)H=`第 ${o.sec} 节做完了`,R=`这一节共 ${W.length} 道题目，循序渐进掌握每一个知识点`,j=`#/topic/${f.index}`,V="返回小节列表",me="",Le="";else{let N=0;for(const J of f.questions)((St=B[J.id])==null?void 0:St.result)==="wrong"&&N++;H="这个知识点做完了",N>0?(R=`今天发现 ${N} 道需要巩固的题`,me=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):R="这一组你已经完全掌握了",j="#/topics",V="返回知识点列表";const ge=ce(n),$e=ge.findIndex(J=>J.name===f.name),se=$e!==-1&&$e<ge.length-1?ge[$e+1]:null;se&&se.questions.length>0&&(Le=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}ue=`
          <div class="end-questions-list">
            ${(o.sec!=null?W:f.questions).map((N,ge)=>{const $e=ge+1,se=B[N.id],J=(se==null?void 0:se.result)==="correct",Z=(se==null?void 0:se.result)==="wrong";let ke="end-chip-gray",ie="· 未做";J?(ke="end-chip-green",ie="✓ 已完成"):Z&&(ke="end-chip-red",ie="待巩固");const Ee=N.title&&N.title.trim()?N.title.trim():N.code?N.code.split(`
`)[0].trim():N.stem;return`
              <a href="${`#/q/${N.id}?from=topic${U}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${$e} 题</span>
                  <span class="end-q-code">${ee(Ee)}</span>
                </div>
                <span class="end-chip ${ke}">${ie}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const pe=f.questions.filter(J=>{var Z;return!!((Z=B[J.id])!=null&&Z.inWrongBook)}),we=pe.length,N=pe.filter(J=>{var Z;return((Z=B[J.id])==null?void 0:Z.result)==="correct"}).length;H="温习本这一轮看完了",N>0?R=`好样的！你已经纠正了 ${N} 道之前做错的题。`:R="再练一轮，会越来越熟。",j="#/wrong",V="返回温习本",we>0?ue=`
            <div class="end-questions-list">
              ${pe.map((Z,ke)=>{const ie=B[Z.id],Ee=(ie==null?void 0:ie.result)==="correct",Pt=(ie==null?void 0:ie.result)==="wrong";let Ye="end-chip-gray",Ze="· 未做";Ee?(Ye="end-chip-green",Ze="✓ 答对"):Pt&&(Ye="end-chip-red",Ze="待巩固");const Tn=Z.title&&Z.title.trim()?Z.title.trim():Z.code?Z.code.split(`
`)[0].trim():Z.stem;return`
                <a href="#/q/${Z.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${ke+1}/${we}</span>
                    <span class="end-q-code">${ee(Tn)}</span>
                  </div>
                  <span class="end-chip ${Ye}">${Ze}</span>
                </a>
              `}).join("")}
            </div>
          `:ue=`
            <div class="end-empty-row">
              ${Jn(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const ge=ce(n),$e=ge.findIndex(J=>J.name===f.name);let se=null;if($e!==-1)for(let J=1;J<ge.length;J++){const ke=ge[($e+J)%ge.length].questions.find(ie=>{var Ee;return!!((Ee=B[ie.id])!=null&&Ee.inWrongBook)});if(ke){se=ke.id;break}}se&&(Le=`
            <a
              href="#/q/${se}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const Me=o.from==="wrong"?"温习本 · 完成":`${f.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${D}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${Rt()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${Me}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Re}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${H}</h2>
              <p class="end-sub" data-testid="end-subtitle">${R}</p>

              ${ue}

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
                ${Le}
              </div>
            </div>
          </main>
        </div>
      `,(At=document.getElementById("q-back-btn"))==null||At.addEventListener("click",()=>{z(P)}),(Tt=document.getElementById("end-leave-btn"))==null||Tt.addEventListener("click",()=>{z(j)}),(Lt=document.getElementById("end-next-topic-btn"))==null||Lt.addEventListener("click",()=>{const pe=ce(n),we=pe.findIndex(N=>N.name===f.name);if(we!==-1&&we<pe.length-1){const N=pe[we+1];z(`#/q/${N.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(pe=>{pe.addEventListener("click",we=>{const N=pe.getAttribute("href");N&&(we.preventDefault(),z(N))})}),ve($);return}const Pe=x?_?"pending":"graded":"answering",bn=Pe==="answering"?"none":Pe==="pending"?"closed":"open",ft=Pe==="graded"?(b==null?void 0:b.choice)??null:o.selectedChoice,yn=r.options.map(S=>p(S,d(S.key,Pe,ft,b),ft===S.key,bn)).join("");let ht="";if(x&&b){let S=Re,B="答对了，理解到位";const H=Gt(b.submittedAt);let R=`你选了 ${b.choice} · 正确答案 ${r.answer} · ${H} 提交`,j="banner-correct",V="",ue="";b.result==="wrong"?(S=De,B="这题有个小坑，看看解析",R=`你选了 ${b.choice} · 正确答案是 ${r.answer} · ${H} 提交`,j="banner-wrong",b.inWrongBook&&(V='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):b.result==="correct"?b.inWrongBook&&o.from!=="wrong"?ue=`
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
          `:o.justRemovedWrong&&o.from!=="wrong"&&(ue=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出温习本 ✓</span>
            </div>
          `):b.result==="ungraded"&&(S=Re,B="已提交（未判分）",R=`这题的答案还没编写 · ${H} 提交`,j="banner-ungraded"),ht=`
        <section class="result-banner ${j}" data-testid="result-banner" data-result="${b.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${S}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${B}</h2>
              <p class="result-sub">${R}</p>
              ${V?`<div class="result-tag-wrap result-tag-below">${V}</div>`:""}
            </div>
          </div>
          ${ue}
        </section>
      `}let vt="";if(x&&b){const S=Cs(r.explanation);vt=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${pn()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${S}
          </div>
        </section>
      `}let mt="";r.animationId!=null&&x&&(mt=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let wt="";if(o.isRedoing&&o.from!=="wrong"){const S=Ae(r.id);if(S){const B=S.result==="correct"?"已掌握":S.result==="wrong"?"待巩固":"已提交",H=Gt(S.submittedAt);wt=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${B}（选 ${S.choice} · ${H}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const bt=o.from==="wrong"||o.sec!=null?W:f.questions,$n=o.from!=="wrong"||x,kn=bt.length,xn=bs(Math.max(0,de),kn).map(S=>{const B=bt[S],H=S+1,R=B.id===r.id,j=Ae(B.id),V=$n&&Fe(j,o.from),ue=V&&(j==null?void 0:j.result)==="correct",Le=V&&(j==null?void 0:j.result)==="wrong";let me="switcher-unanswered",Me=`<span>${H}</span>`;return ue?(me="switcher-correct",Me=Vn()):Le&&(me="switcher-wrong",Me=Gn()),R&&(me+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${me} active-press"
            data-testid="q-switch-${H}"
            data-qid="${B.id}"
            title="第 ${H} 题"
          >
            ${Me}
          </button>
        `}).join(""),Cn=x?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${Zn(14)}
          <span>重做</span>
        </button>
      `:"",yt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${ne?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${ne?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,$t=Y?"完成":"下一题 ›",kt=Y?' data-action="finish"':"",xt=pt?" btn-finish-locked":"",Ct=pt?' aria-disabled="true"':"",Sn=`
      <button
        type="button"
        class="btn-nav-next active-press${xt}"
        data-testid="next"
        id="q-next-btn"${kt}${Ct}
      >
        <span>${$t}</span>
      </button>
    `,An=`
      <button
        type="button"
        class="btn-next-main active-press${xt}"
        data-testid="next"
        id="q-next-btn"${kt}${Ct}
      >
        <span>${$t}</span>
      </button>
    `;let Ve="";if(x)Ve=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${yt}
            ${Cn}
            ${An}
          </div>
        </div>
      `;else{const S=!!o.selectedChoice;Ve=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${yt}
            <button
              type="button"
              class="btn-submit-main active-press ${S?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${S?"":"disabled"}
            >
              <span>${S?"提交答案":"提交"}</span>
            </button>
            ${Sn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${D}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${Rt()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${wn}</span>
          ${o.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出温习本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <button type="button" class="q-source-badge q-source-chip active-press" data-testid="q-source" id="q-overview-chip">
              <span class="status-dot-green"></span>
              <span>${X}</span>
            </button>
            ${o.from==="wrong"?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${o.showLastTrace?"true":"false"}" ${k?"":"disabled"}>
                    ${o.showLastTrace?C:h}
                    <span>${o.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${xn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${wt}

          <!-- 4. Result Banner (if submitted) -->
          ${ht}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${r.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${r.code?vs(r.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${yn}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${vt}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${mt}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ve}
      </div>
    `,(Et=document.getElementById("q-back-btn"))==null||Et.addEventListener("click",()=>{z(P)}),(Ft=document.getElementById("q-overview-chip"))==null||Ft.addEventListener("click",()=>{z(Q)}),x)(Bt=document.getElementById("q-redo-btn"))==null||Bt.addEventListener("click",()=>{o.isRedoing=!0,o.selectedChoice=null,o.showLastTrace=!1,o.justRemovedWrong=!1,te()}),o.from!=="wrong"&&((Mt=document.getElementById("q-remove-wrong-btn"))==null||Mt.addEventListener("click",()=>{jt(r.id),o.justRemovedWrong=!0,te()}));else{const S=e.querySelectorAll(".option-item");S.forEach(B=>{B.addEventListener("click",()=>{if(o.showLastTrace)return;const H=B.getAttribute("data-key");if(!H||H===o.selectedChoice)return;o.selectedChoice=H,S.forEach(j=>{const V=j.getAttribute("data-key")===H;g(j,V?"selected":"idle",V)});const R=e.querySelector("#q-submit-btn");if(R){R.disabled=!1,R.classList.remove("btn-disabled");const j=R.querySelector("span");j&&(j.textContent="提交答案")}})}),(qt=document.getElementById("q-submit-btn"))==null||qt.addEventListener("click",()=>{!o.selectedChoice||o.showLastTrace||(Bn(r,o.selectedChoice),o.isRedoing=!1,o.wrongFresh=!1,o.showLastTrace=!1,o.justRemovedWrong=!1,E=!0,te())})}o.from==="wrong"&&((It=document.getElementById("q-remove-wrong-btn"))==null||It.addEventListener("click",()=>{const S=r.id;jt(S),I();const B=K(),H=f.questions.find(R=>{var j;return R.id===S||!((j=B[R.id])!=null&&j.inWrongBook)?!1:f.questions.findIndex(V=>V.id===R.id)>v});z(H?`#/q/${H.id}?from=wrong`:"#/wrong")})),(Ht=document.getElementById("q-toggle-last"))==null||Ht.addEventListener("click",()=>{const S=e.querySelector("#q-toggle-last");if(!(!S||S.disabled)){if(o.showLastTrace=!o.showLastTrace,x&&!o.showLastTrace){te();return}O(),ae(o.showLastTrace)}}),(_t=document.getElementById("q-prev-btn"))==null||_t.addEventListener("click",()=>{ye&&z(`#/q/${ye}?from=${o.from}${U}`)}),(Dt=document.getElementById("q-next-btn"))==null||Dt.addEventListener("click",()=>{if(le){z(`#/q/${le}?from=${o.from}${U}`);return}const S=K();if(!(W.length>0&&W.every(R=>Fe(S[R.id],o.from)))){xs(Q);return}if(o.from==="daily"){z("#/");return}const H=o.from==="wrong"?"wrong":"topic";He(),window.history.replaceState(null,"",P),window.location.hash=`#/done/${H}/${f.index}${o.sec!=null?"?sec="+o.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(S=>{S.addEventListener("click",()=>{const B=S.getAttribute("data-qid");B&&B!==r.id&&z(`#/q/${B}?from=${o.from}${U}`)})});const Be=e.querySelector(".q-switcher-group"),Ge=e.querySelector(".switcher-current");if(Be&&Ge){const S=Ge.getBoundingClientRect().left-Be.getBoundingClientRect().left,B=Be.scrollLeft+S-(Be.clientWidth-Ge.offsetWidth)/2;Be.scrollLeft=Math.max(0,B)}if(_&&b){const S=b;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(w!==q||!e.isConnected)return;const B=e.querySelector("[data-view-token]");!B||B.getAttribute("data-view-token")!==D||e.querySelectorAll(".option-item").forEach(H=>{var V;const R=H.getAttribute("data-key")||"",j=S.choice===R;g(H,d(R,"graded",S.choice,S),j),(V=H.querySelector(".opt-hint-clip"))==null||V.classList.add("is-open")})})})}Ss(e),ve($)}te()}function Se(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function As(e){const n=e.title||e.summary;if(n&&n.trim())return n.trim();const t=(e.stem||"").split(`
`)[0].trim();return t.length>20?t.slice(0,18)+"…":t||"单选题"}function Ts(e,n,t){var ae,ve,te,re,w,$;oe(),_e(10);const s=t.from==="daily"||t.from==="wrong"?t.from:"topic",a=t.qid,u=t.topic?decodeURIComponent(t.topic):"";if(!a&&!u&&!t.from){window.location.replace("#/");return}let r=a?n.find(y=>y.id===a):void 0;if(!r){const y=cn(n);r=y?n.find(k=>k.id===y.id):n[0]}const l=ce(n);let f=u?l.find(y=>y.name===u):r?(ae=Ue(n,r.id))==null?void 0:ae.topic:l[0];f||(f=l[0]);const v=K();if(s==="wrong"&&!f.questions.some(y=>{var k;return(k=v[y.id])==null?void 0:k.inWrongBook})){const y=l.find(k=>k.questions.some(M=>{var b;return(b=v[M.id])==null?void 0:b.inWrongBook}));if(!y){window.location.replace("#/wrong");return}f=y,(!r||!((ve=v[r.id])!=null&&ve.inWrongBook))&&(r=y.questions.find(k=>{var M;return(M=v[k.id])==null?void 0:M.inWrongBook}))}const T=t.sec?parseInt(t.sec,10):void 0,L=T!=null?`&sec=${T}`:"";let o=f.questions,D=f.name;if(s==="daily")o=r?[r]:[n[0]],D="今日一题";else if(s==="wrong"){const y=f.questions.filter(k=>{var M;return!!((M=v[k.id])!=null&&M.inWrongBook)});y.length>0&&(o=y)}else if(s==="topic"&&T!=null){const k=ze(f.questions,f.index,f.name).find(M=>M.index===T);k&&(o=k.questions,D=`${f.name} · 第${T}节`)}const q=o.length;let A=0,E=0,F=0;for(const y of o){const k=v[y.id];k&&Fe(k,s)&&(A++,k.result==="correct"?E++:k.result==="wrong"&&F++)}const c=Math.max(0,q-A),i=94.25,d=q>0?(E/q*i).toFixed(2):"0",g=q>0?(F/q*i).toFixed(2):"0",p=`-${d}`,h=(r==null?void 0:r.id)||(o[0]?o[0].id:""),C=`#/q/${h}?from=${s}${L}`,m=o.find(y=>!Fe(v[y.id],s)),I=m||r||o[0],O=o.indexOf(I)+1,G=o.map((y,k)=>{const M=k+1,b=v[y.id],x=Fe(b,s),_=x&&(b==null?void 0:b.result)==="correct",U=x&&(b==null?void 0:b.result)==="wrong",P=y.id===h,Q=As(y),X=y.topic;return _?`
          <button
            class="overview-card overview-card-correct ${P?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${y.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">Q${M}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已掌握
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${Se(Q)}</span>
              <span class="overview-card-tag tag-correct">${Se(X)}</span>
            </div>
          </button>
        `:U?`
          <button
            class="overview-card overview-card-wrong ${P?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${y.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">Q${M}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${Se(Q)}</span>
              <span class="overview-card-tag tag-wrong">${Se(X)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${P?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${y.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">Q${M}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${Se(Q)}</span>
              <span class="overview-card-tag tag-unanswered">${Se(X)}</span>
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
          <h1 class="overview-page-title">${Se(D)} · 题目总览</h1>
          <p class="overview-page-sub">共 ${q} 题 · 知识点强化</p>
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
              ${parseFloat(d)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#52643b" stroke-dasharray="${d} ${i}" stroke-dashoffset="0" stroke-width="3.8"></circle>`:""}
              ${parseFloat(g)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${g} ${i}" stroke-dashoffset="${p}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${A}/${q}</span>
              <span class="overview-donut-fraction">已完成</span>
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
              <span class="overview-submitted-chip">已作答 ${A} 题</span>
            </div>

            <div class="overview-legend-items">
              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-green"></span>
                  <span>已掌握</span>
                </div>
                <span class="overview-legend-num">${E} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-orange"></span>
                  <span>待巩固</span>
                </div>
                <span class="overview-legend-num">${F} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-gray"></span>
                  <span>未作答</span>
                </div>
                <span class="overview-legend-num">${c} 题</span>
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
            <span class="overview-grid-count-chip">${q} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${G}
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
            <span>${m?`继续第 ${O} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(te=document.getElementById("overview-back-btn"))==null||te.addEventListener("click",()=>{z(C)}),(re=document.getElementById("overview-return-btn"))==null||re.addEventListener("click",()=>{z(C)}),(w=document.getElementById("overview-dock-left"))==null||w.addEventListener("click",()=>{z(C)}),($=document.getElementById("overview-dock-right"))==null||$.addEventListener("click",()=>{z(`#/q/${I.id}?from=${s}${L}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(y=>{y.addEventListener("click",()=>{const k=y.getAttribute("data-qid");k&&z(`#/q/${k}?from=${s}${L}`)})})}const be=document.getElementById("app");let fe=[];function Ce(){const{path:e}=Ne();if(e==="/"||e==="")be.innerHTML=ss(fe);else if(e==="/topics")be.innerHTML=rs(fe);else if(e.startsWith("/topic/")){const t=e.slice(7);be.innerHTML=is(fe,t)}else e==="/wrong"?be.innerHTML=ls(fe):e==="/me"&&(be.innerHTML=ps(fe,Ce));const n=dn(e);n!=null&&_e(n)}async function hn(){var n;on();try{fe=await Ln()}catch{be.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{hn()});return}xe("/",()=>{oe(),Ce()}),xe("/topics",()=>{oe(),Ce()}),xe("/wrong",()=>{oe(),Ce()}),xe("/me",()=>{oe(),Ce()}),xe("/topic/:topicIndex",()=>{oe(),Ce()}),xe("/q/:id",(t,s)=>{oe();const a=t.id,u=s.from||"topic",r=s.sec?parseInt(s.sec,10):void 0;en(be,fe,a,u,{sec:r})}),xe("/done/:kind/:topicIndex",(t,s)=>{oe();const u=ce(fe)[Number(t.topicIndex)];if(!u||!u.questions.length){z("#/");return}const r=t.kind==="wrong"?"wrong":"topic",l=s.sec?parseInt(s.sec,10):void 0,f=r==="topic"?u.questions[u.questions.length-1].id:u.questions[0].id;en(be,fe,f,r,{endCard:!0,sec:l})}),xe("/overview",(t,s)=>{oe(),Ts(be,fe,s)}),En(()=>{z("#/")}),qn(()=>{const{path:t}=Ne();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ce()});const e=()=>{const{path:t}=Ne();(t==="/"||t==="")&&Ce()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Fn()}hn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
