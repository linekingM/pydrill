(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(s){if(s.ep)return;s.ep=!0;const d=t(s);fetch(s.href,d)}})();let nt=null;async function Nn(e=!1){if(nt&&!e)return nt;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return nt=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function le(e){const n=new Map;for(const s of e)n.has(s.topic)||n.set(s.topic,[]),n.get(s.topic).push(s);const t=[];let a=0;for(const[s,d]of n.entries())t.push({name:s,index:a,questions:d}),a++;return t}function Ve(e,n){const t=le(e);for(const a of t){const s=a.questions.findIndex(d=>d.id===n);if(s!==-1)return{topic:a,indexInTopic:s}}return null}const mn=[];let wn=()=>{};function xe(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(d,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),s=new RegExp(`^${a}$`);mn.push({regex:s,paramNames:t,handler:n})}function zn(e){wn=e}function ce(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function V(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?pt():window.location.hash=n}function Ge(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,s={};return t&&new URLSearchParams(t).forEach((r,i)=>{s[i]=r}),{path:a,query:s}}function pt(){ce();const{path:e,query:n}=Ge();for(const t of mn){const a=e.match(t.regex);if(a){const s={};t.paramNames.forEach((d,r)=>{s[d]=a[r+1]?decodeURIComponent(a[r+1]):""}),t.handler(s,n);return}}wn({},n)}function Qn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",pt),pt()}const Ye="pydrill.v1.records",mt="pydrill.v1.last",wt="pydrill.days",ut=new Set;function Vn(e){return ut.add(e),()=>{ut.delete(e)}}function bn(){for(const e of ut)try{e()}catch(n){console.error("Error in store listener:",n)}}function X(e){if(!e||!e.inWrongBook)return!1;const n=typeof e.choice=="string"&&e.choice.length>0,t=e.result==="wrong"||e.result==="correct";return n&&t}function Gn(e){let n=!1;for(const t of Object.keys(e)){const a=e[t];if(a&&a.inWrongBook){const s=typeof a.choice=="string"&&a.choice.length>0,d=a.result==="wrong"||a.result==="correct";(!s||!d)&&(a.inWrongBook=!1,n=!0)}}return n}function Y(){try{const e=localStorage.getItem(Ye);if(!e)return{};const n=JSON.parse(e);if(typeof n!="object"||n===null)return{};const t=n;if(Gn(t))try{localStorage.setItem(Ye,JSON.stringify(t))}catch(a){console.error("Failed to save sanitized records to localStorage:",a)}return t}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Le(e){return Y()[e]}function _e(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function yn(e){try{localStorage.setItem(Ye,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}bn()}function Re(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${a}`}function $n(){try{const e=localStorage.getItem(wt);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function xn(e){const n=Re(),t=$n();if(!t.includes(n)){t.push(n);try{localStorage.setItem(wt,JSON.stringify(t))}catch(a){console.error("Failed to save active days to localStorage:",a)}}}function Yn(e,n){xn();const t=Y(),a=t[e.id],s=X(a);let d,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(d="correct",r=s):(d="wrong",r=!0):(d="ungraded",r=!1);const u=s&&(d==="correct"||d==="wrong"),v={choice:n,result:d,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:u};if(d==="wrong")v.lastWrongChoice=n,v.lastWrongAt=v.submittedAt;else{const m=_e(a);m&&(v.lastWrongChoice=m,typeof(a==null?void 0:a.lastWrongAt)=="number"?v.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&(v.lastWrongAt=a.submittedAt))}return t[e.id]=v,yn(t),v}function Zt(e){const n=Y();n[e]&&(n[e]={...n[e],inWrongBook:!1},yn(n))}function Zn(){try{localStorage.removeItem(Ye)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(mt)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(wt)}catch(e){console.error("Failed to clear active days:",e)}bn()}function kn(e){try{const n=localStorage.getItem(mt);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,s=t.at;return typeof a!="string"||a.length===0||typeof s!="number"||!Number.isFinite(s)||!e.some(d=>d.id===a)?null:{id:a,at:s}}catch(n){return console.warn("Failed to parse last position:",n),null}}function Kn(e){try{localStorage.setItem(mt,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Ze(e){const n=Y();return e.filter(t=>X(n[t.id]))}function Jn(e){const n=Y(),t=e.length;let a=0;for(const s of e)n[s.id]&&a++;return{done:a,total:t}}const Xn="pydrill.devPageIds";function gt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function es(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:gt(new URLSearchParams(e.slice(n+1)).get("dev"))}function ts(){return!0}function Cn(){const e=es();if(e!==null)return e;const n=gt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=gt(localStorage.getItem(Xn));if(t!==null)return t}catch{}return ts()}function Sn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:e==="/lab/water"?99:null}function Kt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function ns(e){return Number(e.getAttribute("data-page")||0)}function Ie(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!Cn()){n==null||n.remove();return}const t=e===99?"试玩":`P${e}`,a=n??(()=>{const s=document.createElement("div");return s.className="dev-page-id",s.setAttribute("data-testid","dev-page-id"),s.setAttribute("aria-hidden","true"),document.body.appendChild(s),s})();if(a.textContent=t,a.setAttribute("data-page",String(e)),a.title=e===99?"方案B水瓶试玩（实验）":"长按打开方案B水瓶试玩 #/lab/water",a.classList.add("is-lab-entry"),!a.dataset.labBound){a.dataset.labBound="1";let s=null;const d=()=>{s!=null&&(window.clearTimeout(s),s=null)};a.addEventListener("pointerdown",r=>{ns(a)!==99&&(d(),s=window.setTimeout(()=>{s=null,window.location.hash="#/lab/water"},650),r.stopPropagation())}),a.addEventListener("pointerup",d),a.addEventListener("pointerleave",d),a.addEventListener("pointercancel",d)}}function ss(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),s=n.getDate();return(Math.floor(Date.UTC(t,a,s)/864e5)%e+e)%e}function as(e,n=new Date){if(e.length===0)return;const t=ss(e.length,n);return e[t]}function rs(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function os(e,n=new Date){const t=Le(e.id),a=n.getTime();return!t||!rs(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function is(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function cs(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ls(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ds(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ft(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function ps(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function us(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Ln(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function gs(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function fs(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function hs(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function ht(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Jt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function vs(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function bt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function En(){return`<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24" width="16">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>`}function Pe(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",s=e==="wrong",d=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${is(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${cs(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${s?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${ls(s)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${d?"active":""}" data-testid="tab-me">
          ${ds(d)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const ms=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,Oe=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,ws=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,bs=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,ys=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function st(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function $s(e){const n=Y(),a=Ze(e).length,s=le(e),d=s.length,r=as(e),i=r?os(r):{statusText:"今天还没做",isCompletedToday:!1},u=r?Ve(e,r.id):null,v=u?u.indexInTopic+1:1,m=u?u.topic.questions.length:2,L=r?`${r.topic} · 第 ${v}/${m} 题`:"今日一题",y=new Date,o=`${y.getMonth()+1}月${y.getDate()}日`,E=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",S=s[0],q=(S==null?void 0:S.name)||"",B=S&&S.questions.length>0?S.questions.find(b=>!n[b.id])||S.questions[0]:void 0,l=kn(e),c=l?e.find(b=>b.id===l.id):void 0,p=c?Ve(e,c.id):null,f=c!=null&&c.code?(c.code.split(`
`)[0]||"").trim():"",g=c&&p?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Jt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${st(p.topic.name)} · 第 ${p.indexInTopic+1}/${p.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${c.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${f?`<div class="continue-code"><code>${st(f)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Jt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${st(q)}」开始吧，一次一小步。</p>
          ${B?`<a href="#/q/${B.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${ms}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${gs()}</span>
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
        <a href="#/q/${(r==null?void 0:r.id)||(B==null?void 0:B.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${ws}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${i.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${bs}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${d} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${ys}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${a>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${g}

      ${r?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${o}</span>
              <h3 class="daily-q-title">${L}</h3>
            </div>
            <span class="chip-status ${i.result==="correct"?"chip-green":i.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${i.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${r.stem}</p>

          ${E?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${E}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${r.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${i.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${Oe}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Pe("home",a)}
  `}const xs={"字符串/循环":["字符串操作","循环控制"],"元组/引用":["元组基础","引用与可变性","同一性与拷贝"],"函数/默认参数":["函数定义与返回值","参数传递与调用","默认参数机制"],"列表/切片":["切片索引与步长","列表修改与拷贝"],字典:["访问与成员检查","常用字典方法","键的特性与哈希"],"作用域/变量":["全局与局部变量","变量生命周期","嵌套作用域与闭包"],"类/对象":["类属性与实例属性","方法定义与调用","继承与特殊方法"],异常处理:["异常捕获与匹配","流程控制与清理","异常抛出与自定义"]},An={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Tn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function yt(e,n,t){const a=[],s=new Map;let d=0,r=null;for(const y of e){const o=y.subtopic&&y.subtopic.trim()?y.subtopic.trim():null;if(o){r=null;let E=s.get(o);E||(E={name:o,questions:[]},s.set(o,E),a.push(E)),E.questions.push(y)}else(!r||r.questions.length>=10)&&(d++,r={name:`第 ${d} 节`,questions:[]},a.push(r)),r.questions.push(y)}const i=xs[t]||[],u=y=>{const o=i.indexOf(y);return o<0?i.length:o};a.sort((y,o)=>u(y.name)-u(o.name));const v=y=>typeof y.difficulty=="number"?y.difficulty:2;for(const y of a)y.questions.sort((o,E)=>v(o)-v(E)||(o.id<E.id?-1:o.id>E.id?1:0));const m=[];let L=1;for(const y of a)for(let o=0;o<y.questions.length;o+=10){const E=y.questions.slice(o,o+10),S=E.reduce((B,l)=>B+(typeof l.difficulty=="number"?l.difficulty:2),0),q=Math.max(1,Math.min(3,Math.round(S/E.length)));m.push({index:L,name:y.name,topicIndex:n,topicName:t,questions:E,avgDifficulty:q}),L++}return m}function at(e,n){const t=e.questions.length;let a=0;for(const i of e.questions)n[i.id]&&a++;const s=t>0&&a===t,d=a>0&&!s;return{submittedCount:a,totalCount:t,isCompleted:s,isInProgress:d,isNotStarted:a===0}}const rt={"字符串/循环":"#7a9a5c","元组/引用":"#8a6b55","函数/默认参数":"#c47a3a","列表/切片":"#5f8a7a",字典:"#9a6b7a","作用域/变量":"#6b7a8a","类/对象":"#8a7a5c",异常处理:"#a07050"},ks="#7a9a5c";function $t(e){if(rt[e])return rt[e];for(const[n,t]of Object.entries(rt))if(e.includes(n)||n.includes(e))return t;return ks}function Xt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Cs(e){const n=le(e),t=Y(),a=e.filter(r=>!!t[r.id]).length,s=Ze(e).length,d=n.map((r,i)=>{const u=An[r.name]??Tn[r.name],v=r.questions.filter(S=>!!t[S.id]).length,m=r.questions.length,L=m>0?v/m*100:0,y=L===0?"0":L.toFixed(1),o=L===0?"0%":`${L.toFixed(1)}%`,E=$t(r.name);return`
        <article
          class="card paper-card topic-card topic-progress-card active-press"
          data-testid="topic-card-${i}"
          onclick="window.location.hash = '#/topic/${i}'"
        >
          <div
            class="card-bar-fill"
            data-testid="topic-card-fill-${i}"
            data-pct="${y}"
            data-submitted="${v}"
            data-total="${m}"
            style="width: ${o}; background-color: ${E}; color: ${E};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">
              ${bt(r.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${Xt(r.name)}</h2>
                <span class="topic-index-badge">#${String(i+1).padStart(2,"0")}</span>
              </div>
              ${u?`<p class="topic-sub" data-testid="topic-sub-${i}">${Xt(u)}</p>`:""}
            </div>
            <span class="sr-only" data-testid="topic-progress-${i}">${v} / ${m}</span>
            <div class="topic-chevron-col" aria-hidden="true">
              ${En()}
            </div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${ht()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已完成 ${a} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Oe}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${d}
      </section>
    </div>

    ${Pe("topics",s)}
  `}function Ne(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ss(e,n){const t=le(e),a=parseInt(n,10),s=t[a]||t[0];if(!s)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const d=Y(),r=Ze(e).length,i=yt(s.questions,s.index,s.name),u=An[s.name]||Tn[s.name]||"";let v=0;for(const g of i)at(g,d).isCompleted&&v++;const m=i.length,L=m>0?v/m:0,y=150.8,o=(y*(1-L)).toFixed(1),E=i.map(g=>{const{submittedCount:b,totalCount:T,isCompleted:$,isInProgress:P}=at(g,d);let R="";$?R=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="0"/>
            </svg>
            <svg class="sec-ring-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        `:P?R=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-b/T)).toFixed(1)}"/>
            </svg>
            <span class="sec-ring-num is-progress">${g.index}</span>
          </div>
        `:R=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
            </svg>
            <span class="sec-ring-num">${g.index}</span>
          </div>
        `;let N="";$?N='<span class="sec-tag tag-done">已完成</span>':P?N='<span class="sec-tag tag-progress">进行中</span>':N='<span class="sec-tag tag-pending">未开始</span>';let ee="";g.avgDifficulty===1?ee='<span class="diff-dot dot-green"></span><span>入门</span>':g.avgDifficulty===2?ee='<span class="diff-dot dot-orange"></span><span>进阶</span>':ee='<span class="diff-dot dot-orange"></span><span class="diff-dot dot-orange"></span><span>挑战</span>';const te=`#/q/${(g.questions.find(A=>!d[A.id])||g.questions[0]).id}?from=topic&sec=${g.index}${$?"&retry=1":""}`;let G="";return $?G=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${g.index}" onclick="window.location.hash='${te}'">
            再练一次
          </button>
        `:P?G=`
          <button type="button" class="sec-btn sec-btn-primary active-press" data-testid="sec-btn-${g.index}" onclick="window.location.hash='${te}'">
            <span>继续</span>
            <svg class="sec-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        `:G=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${g.index}" onclick="window.location.hash='${te}'">
            开始练
          </button>
        `,`
        <div class="${P?"topic-detail-sec-row is-in-progress":"topic-detail-sec-row"}" data-testid="sec-row-${g.index}">
          ${P?'<span class="sec-accent-bar" aria-hidden="true"></span>':""}
          ${R}
          <div class="sec-row-center">
            <div class="sec-row-title-line">
              <span class="sec-row-title">${g.index} ${Ne(g.name)}</span>
              ${N}
            </div>
            <div class="sec-row-meta-line">
              <span class="sec-diff-badge">${ee}</span>
              <span class="sec-meta-sep">·</span>
              <span class="sec-count-mono" data-testid="sec-count-${g.index}">${b}/${T}</span>
            </div>
          </div>
          ${G}
        </div>
      `}).join(""),S=i.find(g=>!at(g,d).isCompleted),q=!S,B=q?i[0]:S,l=B.index,c=q?"再练 第1节":`继续 第${l}节`,f=`#/q/${(B.questions.find(g=>!d[g.id])||B.questions[0]).id}?from=topic&sec=${l}${q?"&retry=1":""}`;return`
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
          <span class="topic-detail-index-badge">#${String(s.index+1).padStart(2,"0")}</span>
        </div>

        <div class="topic-detail-header-spacer" aria-hidden="true"></div>
      </header>

      <!-- Overview Card -->
      <section class="card paper-card topic-detail-overview-card">
        <div class="topic-detail-overview-info">
          <h2 class="topic-detail-name">${Ne(s.name)}</h2>
          ${u?`<p class="topic-detail-intro">${Ne(u)}</p>`:""}
          <div class="topic-detail-counts">
            <span>共 ${m} 小节</span>
            <span class="topic-detail-counts-dot">·</span>
            <span>${s.questions.length} 道题目</span>
          </div>
        </div>

        <div class="topic-detail-big-ring-wrap" data-testid="detail-ring" aria-label="已完成 ${v}/${m} 节">
          <svg class="topic-detail-big-ring-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" class="topic-detail-ring-track" stroke-width="5"/>
            ${v>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${y}" stroke-dashoffset="${o}"/>`:""}
          </svg>
          <div class="topic-detail-big-ring-inner">
            <span class="topic-detail-ring-fraction">${v}/${m}<span class="topic-detail-ring-unit">节</span></span>
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
        ${E}
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
            <span class="bottom-bar-title">第 ${l} 节 · ${Ne(B.name)}</span>
          </div>
          <button
            type="button"
            class="bottom-bar-cta-btn active-press"
            data-testid="detail-continue"
            onclick="window.location.hash='${f}'"
          >
            <span>${c}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    ${Pe("topics",r)}
  `}const Ls=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function Es(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const ot="pydrill.lastRandomWrong";function As(e){const n=Y(),t=e.filter(r=>X(n[r.id]));if(t.length===0)return null;if(t.length===1){const r=t[0].id;try{sessionStorage.setItem(ot,r)}catch{}return r}let a=null;try{a=sessionStorage.getItem(ot)}catch{}const s=a&&t.some(r=>r.id===a)?t.filter(r=>r.id!==a):t,d=s[Math.floor(Math.random()*s.length)];try{sessionStorage.setItem(ot,d.id)}catch{}return d.id}function Ts(e,n){var u;const t=Y(),a=le(e),s=e.filter(v=>X(t[v.id])),d=s.length;if(d===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${ht()}</span>
            </div>
            <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Oe}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="温习本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${Ls}" alt="空白小本子" class="wrong-empty-img" />
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

      ${Pe("wrong",0)}
    `;const r=((u=s[Math.floor(Math.random()*s.length)])==null?void 0:u.id)??"",i=a.map(v=>{const m=v.questions.filter(l=>X(t[l.id]));if(m.length===0)return"";const L=v.questions.filter(l=>!!t[l.id]).length,y=v.questions.length,o=y>0?L/y*100:0,E=o===0?"0":o.toFixed(1),S=o===0?"0%":`${o.toFixed(1)}%`,q=$t(v.name),B=String(v.index+1).padStart(2,"0");return`
        <a
          class="topic-progress-card wrong-topic-card active-press"
          data-testid="wrong-topic-${v.index}"
          href="#/q/${m[0].id}?from=wrong"
        >
          <div
            class="card-bar-fill"
            data-testid="wrong-topic-fill-${v.index}"
            data-pct="${E}"
            data-submitted="${L}"
            data-total="${y}"
            style="width: ${S}; background-color: ${q}; color: ${q};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">${bt(v.name)}</div>
            <div class="wrong-topic-main">
              <div class="wrong-topic-name-row">
                <span class="wrong-topic-name">${Es(v.name)}</span>
                <span class="wrong-topic-index">#${B}</span>
              </div>
              <div class="wrong-topic-meta">
                <span class="topic-meta-highlight" data-testid="wrong-topic-count-${v.index}">${m.length}</span> 题待巩固
              </div>
            </div>
            <div class="topic-chevron-col" aria-hidden="true">
              ${En()}
            </div>
          </div>
        </a>
      `}).join("");return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">温习本</h1>
            <span class="title-doodle-leaf">${ht()}</span>
          </div>
          <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Oe}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <a href="#/q/${r}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>随机抽一题</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有待巩固题的知识点">
        ${i}
      </section>
    </div>

    ${Pe("wrong",d)}
  `}const ze=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function it(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Fs(e){const n=new Date(e),t=new Date,a=Re(t),s=Re(n);if(s===a)return"今天";const d=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return s===Re(d)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function qs(e,n){const t=Y(),a=le(e),s=Ze(e).length,d=$n(),r=d.length,i=new Date,u=i.getDay(),v=u===0?-6:1-u,m=new Date(i.getFullYear(),i.getMonth(),i.getDate()+v),L=["一","二","三","四","五","六","日"],y=new Set(d);let o=0;const E=L.map((p,f)=>{const g=new Date(m.getFullYear(),m.getMonth(),m.getDate()+f),b=Re(g),T=y.has(b);return T&&o++,`
        <div class="day-dot-item">
          <span class="day-name">${p}</span>
          <div class="day-dot ${T?"active is-on":""}" data-testid="me-week-dot-${f}"></div>
        </div>
      `}).join(""),S=a.map((p,f)=>{const{done:g,total:b}=Jn(p.questions);let T="";return g>0&&(T=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(g/b*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${f}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${p.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${T}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${f}">${g}/${b}</span>
          </div>
          <span class="ring-label">${it(p.name)}</span>
        </div>
      `}).join(""),q=s>0?`<div class="review-count-highlight">${s} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',B=Object.entries(t).filter(([p,f])=>typeof f.submittedAt=="number").sort((p,f)=>f[1].submittedAt-p[1].submittedAt).slice(0,3);let l="";B.length===0?l='<div class="recent-empty">还没有练习记录</div>':l=B.map(([p,f],g)=>{const b=e.find(N=>N.id===p);if(!b)return"";const T=b.title||(b.stem?b.stem.split(`
`)[0].trim():"Python 练习题"),$=T.match(/^[Qq]0*(\d+)$/),P=$?$[1]:T,R=Fs(f.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${g}" onclick="window.location.hash='#/q/${b.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${it(P)}</div>
              <div class="recent-topic-sub">· ${it(b.topic)}</div>
            </div>
            <span class="recent-time">${R}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Zn();const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=p=>{try{localStorage.setItem("pydrill.devPageIds",p?"true":"false")}catch{}const f=Sn("/me");Ie(f)});const c=Cn();return`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Card -->
      <header class="card paper-card profile-header-card select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${ze}" alt="小芽啾" class="me-avatar-img" />
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
          <span class="rhythm-text" data-testid="me-week-text">这周来过 ${o} 天，慢慢来就好</span>
        </div>
        <div class="rhythm-dots-row">
          ${E}
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
          <span class="section-tag">${a.length} 个核心专题</span>
        </div>
        <div class="rings-grid">
          ${S}
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
            ${q}
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
            ${l}
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
              ${c?"checked":""}
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
            ${hs()}
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

    ${Pe("me",s)}
  `}const vt=globalThis;vt.Prism=vt.Prism??{};vt.Prism.manual=!0;var en=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ms(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ct={exports:{}},tn;function Bs(){return tn||(tn=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,r={},i={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function l(c){return c instanceof u?new u(c.type,l(c.content),c.alias):Array.isArray(c)?c.map(l):c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(l){return Object.prototype.toString.call(l).slice(8,-1)},objId:function(l){return l.__id||Object.defineProperty(l,"__id",{value:++d}),l.__id},clone:function l(c,p){p=p||{};var f,g;switch(i.util.type(c)){case"Object":if(g=i.util.objId(c),p[g])return p[g];f={},p[g]=f;for(var b in c)c.hasOwnProperty(b)&&(f[b]=l(c[b],p));return f;case"Array":return g=i.util.objId(c),p[g]?p[g]:(f=[],p[g]=f,c.forEach(function(T,$){f[$]=l(T,p)}),f);default:return c}},getLanguage:function(l){for(;l;){var c=s.exec(l.className);if(c)return c[1].toLowerCase();l=l.parentElement}return"none"},setLanguage:function(l,c){l.className=l.className.replace(RegExp(s,"gi"),""),l.classList.add("language-"+c)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(f){var l=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(f.stack)||[])[1];if(l){var c=document.getElementsByTagName("script");for(var p in c)if(c[p].src==l)return c[p]}return null}},isActive:function(l,c,p){for(var f="no-"+c;l;){var g=l.classList;if(g.contains(c))return!0;if(g.contains(f))return!1;l=l.parentElement}return!!p}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(l,c){var p=i.util.clone(i.languages[l]);for(var f in c)p[f]=c[f];return p},insertBefore:function(l,c,p,f){f=f||i.languages;var g=f[l],b={};for(var T in g)if(g.hasOwnProperty(T)){if(T==c)for(var $ in p)p.hasOwnProperty($)&&(b[$]=p[$]);p.hasOwnProperty(T)||(b[T]=g[T])}var P=f[l];return f[l]=b,i.languages.DFS(i.languages,function(R,N){N===P&&R!=l&&(this[R]=b)}),b},DFS:function l(c,p,f,g){g=g||{};var b=i.util.objId;for(var T in c)if(c.hasOwnProperty(T)){p.call(c,T,c[T],f||T);var $=c[T],P=i.util.type($);P==="Object"&&!g[b($)]?(g[b($)]=!0,l($,p,null,g)):P==="Array"&&!g[b($)]&&(g[b($)]=!0,l($,p,T,g))}}},plugins:{},highlightAll:function(l,c){i.highlightAllUnder(document,l,c)},highlightAllUnder:function(l,c,p){var f={callback:p,container:l,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",f),f.elements=Array.prototype.slice.apply(f.container.querySelectorAll(f.selector)),i.hooks.run("before-all-elements-highlight",f);for(var g=0,b;b=f.elements[g++];)i.highlightElement(b,c===!0,f.callback)},highlightElement:function(l,c,p){var f=i.util.getLanguage(l),g=i.languages[f];i.util.setLanguage(l,f);var b=l.parentElement;b&&b.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(b,f);var T=l.textContent,$={element:l,language:f,grammar:g,code:T};function P(N){$.highlightedCode=N,i.hooks.run("before-insert",$),$.element.innerHTML=$.highlightedCode,i.hooks.run("after-highlight",$),i.hooks.run("complete",$),p&&p.call($.element)}if(i.hooks.run("before-sanity-check",$),b=$.element.parentElement,b&&b.nodeName.toLowerCase()==="pre"&&!b.hasAttribute("tabindex")&&b.setAttribute("tabindex","0"),!$.code){i.hooks.run("complete",$),p&&p.call($.element);return}if(i.hooks.run("before-highlight",$),!$.grammar){P(i.util.encode($.code));return}if(c&&a.Worker){var R=new Worker(i.filename);R.onmessage=function(N){P(N.data)},R.postMessage(JSON.stringify({language:$.language,code:$.code,immediateClose:!0}))}else P(i.highlight($.code,$.grammar,$.language))},highlight:function(l,c,p){var f={code:l,grammar:c,language:p};if(i.hooks.run("before-tokenize",f),!f.grammar)throw new Error('The language "'+f.language+'" has no grammar.');return f.tokens=i.tokenize(f.code,f.grammar),i.hooks.run("after-tokenize",f),u.stringify(i.util.encode(f.tokens),f.language)},tokenize:function(l,c){var p=c.rest;if(p){for(var f in p)c[f]=p[f];delete c.rest}var g=new L;return y(g,g.head,l),m(l,g,c,g.head,0),E(g)},hooks:{all:{},add:function(l,c){var p=i.hooks.all;p[l]=p[l]||[],p[l].push(c)},run:function(l,c){var p=i.hooks.all[l];if(!(!p||!p.length))for(var f=0,g;g=p[f++];)g(c)}},Token:u};a.Prism=i;function u(l,c,p,f){this.type=l,this.content=c,this.alias=p,this.length=(f||"").length|0}u.stringify=function l(c,p){if(typeof c=="string")return c;if(Array.isArray(c)){var f="";return c.forEach(function(P){f+=l(P,p)}),f}var g={type:c.type,content:l(c.content,p),tag:"span",classes:["token",c.type],attributes:{},language:p},b=c.alias;b&&(Array.isArray(b)?Array.prototype.push.apply(g.classes,b):g.classes.push(b)),i.hooks.run("wrap",g);var T="";for(var $ in g.attributes)T+=" "+$+'="'+(g.attributes[$]||"").replace(/"/g,"&quot;")+'"';return"<"+g.tag+' class="'+g.classes.join(" ")+'"'+T+">"+g.content+"</"+g.tag+">"};function v(l,c,p,f){l.lastIndex=c;var g=l.exec(p);if(g&&f&&g[1]){var b=g[1].length;g.index+=b,g[0]=g[0].slice(b)}return g}function m(l,c,p,f,g,b){for(var T in p)if(!(!p.hasOwnProperty(T)||!p[T])){var $=p[T];$=Array.isArray($)?$:[$];for(var P=0;P<$.length;++P){if(b&&b.cause==T+","+P)return;var R=$[P],N=R.inside,ee=!!R.lookbehind,ue=!!R.greedy,te=R.alias;if(ue&&!R.pattern.global){var G=R.pattern.toString().match(/[imsuy]*$/)[0];R.pattern=RegExp(R.pattern.source,G+"g")}for(var C=R.pattern||R,A=f.next,x=g;A!==c.tail&&!(b&&x>=b.reach);x+=A.value.length,A=A.next){var F=A.value;if(c.length>l.length)return;if(!(F instanceof u)){var h=1,w;if(ue){if(w=v(C,x,l,ee),!w||w.index>=l.length)break;var j=w.index,k=w.index+w[0].length,I=x;for(I+=A.value.length;j>=I;)A=A.next,I+=A.value.length;if(I-=A.value.length,x=I,A.value instanceof u)continue;for(var D=A;D!==c.tail&&(I<k||typeof D.value=="string");D=D.next)h++,I+=D.value.length;h--,F=l.slice(x,I),w.index-=x}else if(w=v(C,0,F,ee),!w)continue;var j=w.index,O=w[0],z=F.slice(0,j),Ae=F.slice(j+O.length),ge=x+F.length;b&&ge>b.reach&&(b.reach=ge);var oe=A.prev;z&&(oe=y(c,oe,z),x+=z.length),o(c,oe,h);var ae=new u(T,N?i.tokenize(O,N):O,te,O);if(A=y(c,oe,ae),Ae&&y(c,A,Ae),h>1){var ne={cause:T+","+P,reach:ge};m(l,c,p,A.prev,x,ne),b&&ne.reach>b.reach&&(b.reach=ne.reach)}}}}}}function L(){var l={value:null,prev:null,next:null},c={value:null,prev:l,next:null};l.next=c,this.head=l,this.tail=c,this.length=0}function y(l,c,p){var f=c.next,g={value:p,prev:c,next:f};return c.next=g,f.prev=g,l.length++,g}function o(l,c,p){for(var f=c.next,g=0;g<p&&f!==l.tail;g++)f=f.next;c.next=f,f.prev=c,l.length-=g}function E(l){for(var c=[],p=l.head.next;p!==l.tail;)c.push(p.value),p=p.next;return c}if(!a.document)return a.addEventListener&&(i.disableWorkerMessageHandler||a.addEventListener("message",function(l){var c=JSON.parse(l.data),p=c.language,f=c.code,g=c.immediateClose;a.postMessage(i.highlight(f,i.languages[p],p)),g&&a.close()},!1)),i;var S=i.util.currentScript();S&&(i.filename=S.src,S.hasAttribute("data-manual")&&(i.manual=!0));function q(){i.manual||i.highlightAll()}if(!i.manual){var B=document.readyState;B==="loading"||B==="interactive"&&S&&S.defer?document.addEventListener("DOMContentLoaded",q):window.requestAnimationFrame?window.requestAnimationFrame(q):window.setTimeout(q,16)}return i})(n);e.exports&&(e.exports=t),typeof en<"u"&&(en.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,d){var r={};r["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[d]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};i["language-"+d]={pattern:/[\s\S]+/,inside:t.languages[d]};var u={};u[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",u)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var d=a.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",s=function(S,q){return"✖ Error "+S+" while fetching file: "+q},d="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",u="loading",v="loaded",m="failed",L="pre[data-src]:not(["+i+'="'+v+'"]):not(['+i+'="'+u+'"])';function y(S,q,B){var l=new XMLHttpRequest;l.open("GET",S,!0),l.onreadystatechange=function(){l.readyState==4&&(l.status<400&&l.responseText?q(l.responseText):l.status>=400?B(s(l.status,l.statusText)):B(d))},l.send(null)}function o(S){var q=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S||"");if(q){var B=Number(q[1]),l=q[2],c=q[3];return l?c?[B,Number(c)]:[B,void 0]:[B,B]}}t.hooks.add("before-highlightall",function(S){S.selector+=", "+L}),t.hooks.add("before-sanity-check",function(S){var q=S.element;if(q.matches(L)){S.code="",q.setAttribute(i,u);var B=q.appendChild(document.createElement("CODE"));B.textContent=a;var l=q.getAttribute("data-src"),c=S.language;if(c==="none"){var p=(/\.(\w+)$/.exec(l)||[,"none"])[1];c=r[p]||p}t.util.setLanguage(B,c),t.util.setLanguage(q,c);var f=t.plugins.autoloader;f&&f.loadLanguages(c),y(l,function(g){q.setAttribute(i,v);var b=o(q.getAttribute("data-range"));if(b){var T=g.split(/\r\n?|\n/g),$=b[0],P=b[1]==null?T.length:b[1];$<0&&($+=T.length),$=Math.max(0,Math.min($-1,T.length)),P<0&&(P+=T.length),P=Math.max(0,Math.min(P,T.length)),g=T.slice($,P).join(`
`),q.hasAttribute("data-start")||q.setAttribute("data-start",String($+1))}B.textContent=g,t.highlightElement(B)},function(g){q.setAttribute(i,m),B.textContent=g})}}),t.plugins.fileHighlight={highlight:function(q){for(var B=(q||document).querySelectorAll(L),l=0,c;c=B[l++];)t.highlightElement(c)}};var E=!1;t.fileHighlight=function(){E||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),E=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(ct)),ct.exports}var Is=Bs();const nn=Ms(Is);var sn={},an;function Ps(){return an||(an=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),sn}Ps();function Hs(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((s,d)=>{const r=d+1,u=nn.highlight(s,nn.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${u}</span></div>`}).join("")}</code></pre></div>`}function rn(e){const n=e.match(/^[Qq]0*(\d+)$/);return n?n[1]:e}function on(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),s=String(n.getHours()).padStart(2,"0"),d=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${s}:${d}`}function se(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const cn=200,ln=1600,dn=300,Ds=1800;let qe=0,be=0,pn=!1;function _s(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let Qe="#/overview";function Rs(e,n){return n<=3?Array.from({length:n},(t,a)=>a):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function je(){qe+=1,be&&(window.clearTimeout(be),be=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function js(){pn||(pn=!0,window.addEventListener("hashchange",je))}function Os(e,n){const t=n.getBoundingClientRect(),a=t.left+t.width/2,s=e.offsetWidth,d=e.offsetHeight,r=1,i=6,u=40,v=8,m=document.documentElement.clientWidth;let L=a+r+u+i,y=L-s;y<v&&(y=v,L=y+s),L>m-v&&(L=m-v,y=Math.max(v,L-s),L=y+s);let o=L-r-i-a;const E=12,S=Math.max(E,s-r*2-12-E);o<E&&(o=E),o>S&&(o=S),e.style.right=`${Math.round(m-L)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-d)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(o)}px`)}function Ws(e,n){if(n!==qe||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(s=>s.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:dn,easing:"ease",fill:"forwards"}),a=()=>{n===qe&&e.remove()};t.onfinish=a,window.setTimeout(a,dn+60)}function lt(e,n,t,a){be&&window.clearTimeout(be),be=window.setTimeout(()=>{if(be=0,!(n!==qe||!e.isConnected)){if(!a){e.remove();return}Ws(e,n)}},t)}function Us(e=Qe){var i;const n=document.getElementById("q-next-btn");if(!n)return;Qe=e,qe+=1;const t=qe;be&&(window.clearTimeout(be),be=0);const a=_s();let s=document.querySelector(".finish-tip");const d=!!s;if(s?document.querySelectorAll(".finish-tip").forEach(u=>{u!==s&&u.remove()}):(s=document.createElement("div"),s.className="finish-tip tip-bubble",s.setAttribute("data-testid","tip-bubble"),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(s),(i=s.querySelector(".finish-tip-tag"))==null||i.addEventListener("click",u=>{u.stopPropagation(),je(),V(Qe)})),Os(s,n),a){s.getAnimations().forEach(u=>u.cancel()),s.style.opacity="1",s.style.transform="none",lt(s,t,Ds,!1);return}if(d){s.getAnimations().forEach(u=>u.cancel()),s.style.opacity="1",s.style.transform="translateY(0)",lt(s,t,ln,!0);return}const r=s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:cn,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==qe||!s.isConnected||(s.style.opacity="1",s.style.transform="translateY(0)")},lt(s,t,cn+ln,!0)}function un(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${se(t)}</code>`)}function Ns(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,s="";n!==-1&&(a=e.slice(0,n).trim(),s=e.slice(n+t).trim(),s=s.replace(/^[：:\s]+/,""));const d=a.split(/\n+/).map(i=>i.trim()).filter(Boolean).map(i=>`<p class="explanation-p">${un(i)}</p>`).join("");let r="";if(s){const i=un(s);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Ln(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${i}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${d}
      ${r}
    </div>
  `}function Be(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function zs(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),a=n.querySelector(".code-header");if(!t)return;const s=()=>{const d=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",d),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${a?a.offsetHeight:0}px`),s(),t.addEventListener("scroll",s,{passive:!0})})}function gn(e,n,t,a="topic",s={}){js(),je(),ce();const d=a==="daily"||a==="wrong"?a:"topic",r=n.find(C=>C.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Ie(Kt(d,!1));return}if(d==="wrong"&&!s.endCard&&!X(Le(r.id))){window.location.replace(`#/q/${r.id}?from=topic`);return}s.endCard||Kn(r.id);const i=Ve(n,r.id),u=(i==null?void 0:i.topic)||le(n)[0],v=i?i.indexInTopic:0,m=u.questions.length,L=Le(r.id);u.questions.filter(C=>X(Y()[C.id])).length;const y=!!s.retry&&d==="topic",o={from:d,sec:s.sec,retry:y,prevChoice:L==null?void 0:L.choice,selectedChoice:d==="wrong"||y?null:L?L.choice:null,isRedoing:y,wrongFresh:d==="wrong",showLastTrace:!1,showEndCard:!!s.endCard&&d!=="daily",justRemovedWrong:!1},E=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let S=0,q=null,B=!1;const l='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',c='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function p(C){return/Error|Exception/.test(C)}function f(C,A,x,F){return A!=="graded"?x===C?"selected":"idle":r.answer&&C===r.answer?"correct":x===C&&(F==null?void 0:F.result)==="wrong"?"wrong":"locked"}function g(C,A,x){const F=C.querySelector(".opt-badge"),h=C.querySelector(".opt-text"),w=C.querySelector(".opt-status");if(!F||!h||!w)return;const k=C.getAttribute("data-error")==="1";C.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),F.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),h.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),C.setAttribute("aria-checked",x?"true":"false"),A==="correct"?C.setAttribute("data-state","correct"):A==="wrong"?C.setAttribute("data-state","wrong"):C.removeAttribute("data-state"),A==="selected"||A==="correct"?(C.classList.add(A==="correct"?"opt-card-correct":"opt-card-selected"),A==="selected"&&C.classList.add("opt-pressable"),F.classList.add(A==="correct"?"opt-badge-correct":"opt-badge-selected"),h.classList.add("opt-text-strong"),w.innerHTML=l):A==="wrong"?(C.classList.add("opt-card-wrong"),F.classList.add("opt-badge-wrong"),h.classList.add("opt-text-strong","opt-text-wrong"),w.innerHTML=c):A==="locked"?(C.classList.add("opt-card-locked"),F.classList.add("opt-badge-default"),k&&h.classList.add("opt-text-error"),w.innerHTML=""):(C.classList.add("opt-card-default","opt-pressable"),F.classList.add("opt-badge-default"),k&&h.classList.add("opt-text-error"),w.innerHTML="")}function b(C,A,x,F){const h=p(C.text),w=["option-item"],k=["opt-badge"],I=["opt-text"];let D="",j="";A==="selected"?(w.push("opt-card-selected","opt-pressable"),k.push("opt-badge-selected"),I.push("opt-text-strong"),D=l):A==="correct"?(w.push("opt-card-correct"),k.push("opt-badge-correct"),I.push("opt-text-strong"),D=l,j='data-state="correct"'):A==="wrong"?(w.push("opt-card-wrong"),k.push("opt-badge-wrong"),I.push("opt-text-strong","opt-text-wrong"),D=c,j='data-state="wrong"'):A==="locked"?(w.push("opt-card-locked"),k.push("opt-badge-default"),h&&I.push("opt-text-error")):(w.push("opt-card-default","opt-pressable"),k.push("opt-badge-default"),h&&I.push("opt-text-error"));const O=(C.hint||"").trim(),z=F!=="none"&&O?`<div class="opt-hint-clip${F==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${se(C.key)}">${se(O)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${x?"true":"false"}"
            ${j}
            class="${w.join(" ")}"
            data-testid="option-${se(C.key)}"
            data-key="${se(C.key)}"
            data-error="${h?"1":"0"}"
          >
            <span class="${k.join(" ")}">${se(C.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${I.join(" ")}">${se(C.text)}</span>
                <span class="opt-status">${D}</span>
              </div>
              ${z}
            </div>
          </div>
        `}const T='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',$='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let P=0;function R(){var A;(A=document.getElementById("pydrill-wrong-toast"))==null||A.remove();const C=document.createElement("div");C.id="pydrill-wrong-toast",C.className="wrong-toast",C.setAttribute("role","status"),C.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(C),window.setTimeout(()=>{C.remove()},1500)}function N(){const C=e.querySelector("#q-toggle-last");if(!C)return;const A=o.showLastTrace;C.setAttribute("aria-pressed",A?"true":"false");const x=C.querySelector("span");x&&(x.textContent=A?"隐藏上次":"看上次思路");const F=C.querySelector("svg");F&&(F.outerHTML=A?$:T)}function ee(C,A,x,F){const h=(A.hint||"").trim(),w=C.querySelector(".opt-body");if(!w)return;let k=C.querySelector(".opt-hint-clip");if(x&&h){k||(k=document.createElement("div"),k.className="opt-hint-clip",k.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${se(A.key)}">${se(h)}</p></div>`,w.appendChild(k));const I=k;requestAnimationFrame(()=>{requestAnimationFrame(()=>{F===P&&I.classList.add("is-open")})})}else if(k){k.classList.remove("is-open");const I=k,D=F,j=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{D===P&&I.remove()},j?0:200)}}function ue(C){const A=++P,x=Le(r.id),F=o.from==="topic"&&(o.prevChoice||(x==null?void 0:x.choice))||_e(x),h=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(k=>{const I=k.getAttribute("data-key")||"",D=r.options.find(ne=>ne.key===I);if(!C){const ne=o.selectedChoice===I;g(k,ne?"selected":"idle",ne),D&&ee(k,D,!1,A);return}const j=k.querySelector(".opt-badge"),O=k.querySelector(".opt-text"),z=k.querySelector(".opt-status");if(!j||!O||!z)return;const Ae=k.getAttribute("data-error")==="1",ge=!!F&&I===F,oe=!!h&&I===h;k.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),j.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),O.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),k.setAttribute("aria-checked","false"),k.removeAttribute("data-state"),ge&&!oe?(k.classList.add("opt-card-trace-last"),j.classList.add("opt-badge-trace-last"),O.classList.add("opt-text-strong","opt-text-trace-last")):oe?(k.classList.add("opt-card-trace-correct"),j.classList.add("opt-badge-trace-correct"),O.classList.add("opt-text-strong","opt-text-trace-correct")):(k.classList.add("opt-card-default","opt-card-trace-dim"),j.classList.add("opt-badge-default"),Ae&&O.classList.add("opt-text-error"));const ae=[];ge&&ae.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${se(I)}">上次选的 ${se(I)}</span>`),oe&&ae.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${se(I)}">正确答案 ${se(I)}</span>`),z.innerHTML=ae.length?`<span class="opt-trace-tag-row">${ae.join("")}</span>`:"",D&&ee(k,D,ge||oe,A)});const w=e.querySelector("#q-submit-btn");if(w){const k=C||!o.selectedChoice;w.disabled=k,w.classList.toggle("btn-disabled",k)}}function te(C){Ie(Kt(o.from,o.showEndCard)),(C||o.showEndCard)&&ce()}function G(){var Ht,Dt,_t,Rt,jt,Ot,Wt,Ut,Nt,zt,Qt,Vt,Gt;je();const C=++S,A=q!==r.id;q=r.id;const x=Le(r.id),F=o.from==="topic"?!!(o.prevChoice||x!=null&&x.choice||_e(x)):_e(x).length>0,w=o.isRedoing||o.wrongFresh?void 0:x,k=!!w;k&&(o.showLastTrace=!1);const I=B&&k;B=!1;const D=o.sec!=null?`&sec=${o.sec}`:"",j=o.from==="topic"&&o.retry?"&retry=1":"";let O="#/topics";o.from==="daily"&&(O="#/"),o.from==="wrong"&&(O="#/wrong"),o.from==="topic"&&o.sec!=null&&(O=`#/topic/${u.index}`);const z=`#/overview?from=${o.from}&qid=${r.id}${o.from==="topic"?"&topic="+encodeURIComponent(u.name):""}${D}${j}`;Qe=z;let Ae="题目总览";o.from==="daily"&&(Ae="今日一题");let ge=null,oe=null,ae=!1,ne=!1,Z=u.questions,fe=v;if(o.from==="wrong"){const M=Y();Z=u.questions.filter(H=>X(M[H.id])),fe=Z.findIndex(H=>H.id===r.id)}else if(o.from==="topic"&&o.sec!=null){const H=yt(u.questions,u.index,u.name).find(_=>_.index===o.sec);H&&(Z=H.questions,fe=Z.findIndex(_=>_.id===r.id))}o.from==="daily"?(ne=!0,ae=!0,Z=[r],fe=0):fe<0?(ne=!0,ae=!0):(ne=fe===0,ae=fe>=Z.length-1,ne||(ge=Z[fe-1].id),ae||(oe=Z[fe+1].id));const Mn=Y(),Bn=Z.length>0&&Z.every(M=>Be(Mn[M.id],o.from)),xt=ae&&!Bn,kt=fe>=0?fe+1:1,Ct=o.from==="wrong"?Math.max(Z.length,1):o.sec!=null?Z.length:m,In=o.from==="wrong"?`${u.name} · 温习 ${kt}/${Ct}`:o.from==="daily"?`今日一题 · ${u.name}`:o.sec!=null?`${u.name} · 第${o.sec}节 ${kt}/${Ct}`:`${u.name} · 第 ${v+1}/${m} 题`;if(o.showEndCard){if(o.from==="daily"){V("#/");return}const M=o.from==="topic",H=Y();let _="",W="",U="#/topics",K="返回知识点列表",me="",Me="",ye="";if(M){if(o.sec!=null)_=`第 ${o.sec} 节做完了`,W=`这一节共 ${Z.length} 道题目，循序渐进掌握每一个知识点`,U=`#/topic/${u.index}`,K="返回小节列表",ye="",Me="";else{let Q=0;for(const J of u.questions)((Ht=H[J.id])==null?void 0:Ht.result)==="wrong"&&Q++;_="这个知识点做完了",Q>0?(W=`今天发现 ${Q} 道需要巩固的题`,ye=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):W="这一组你已经完全掌握了",U="#/topics",K="返回知识点列表";const we=le(n),Ce=we.findIndex(J=>J.name===u.name),ie=Ce!==-1&&Ce<we.length-1?we[Ce+1]:null;ie&&ie.questions.length>0&&(Me=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}me=`
          <div class="end-questions-list">
            ${(o.sec!=null?Z:u.questions).map((Q,we)=>{const Ce=we+1,ie=H[Q.id],J=(ie==null?void 0:ie.result)==="correct",re=(ie==null?void 0:ie.result)==="wrong";let Se="end-chip-gray",de="· 未做";J?(Se="end-chip-green",de="✓ 已完成"):re&&(Se="end-chip-red",de="待巩固");const Xe=rn(Q.title&&Q.title.trim()?Q.title.trim():Q.code?Q.code.split(`
`)[0].trim():Q.stem);return`
              <a href="${`#/q/${Q.id}?from=topic${D}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${Ce} 题</span>
                  <span class="end-q-code">${se(Xe)}</span>
                </div>
                <span class="end-chip ${Se}">${de}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const he=u.questions.filter(J=>X(H[J.id])),$e=he.length,Q=he.filter(J=>{var re;return((re=H[J.id])==null?void 0:re.result)==="correct"}).length;_="温习本这一轮看完了",Q>0?W=`好样的！你已经纠正了 ${Q} 道之前做错的题。`:W="再练一轮，会越来越熟。",U="#/wrong",K="返回温习本",$e>0?me=`
            <div class="end-questions-list">
              ${he.map((re,Se)=>{const de=H[re.id],Xe=(de==null?void 0:de.result)==="correct",Yt=(de==null?void 0:de.result)==="wrong";let et="end-chip-gray",tt="· 未做";Xe?(et="end-chip-green",tt="✓ 答对"):Yt&&(et="end-chip-red",tt="待巩固");const Un=rn(re.title&&re.title.trim()?re.title.trim():re.code?re.code.split(`
`)[0].trim():re.stem);return`
                <a href="#/q/${re.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${Se+1}/${$e}</span>
                    <span class="end-q-code">${se(Un)}</span>
                  </div>
                  <span class="end-chip ${et}">${tt}</span>
                </a>
              `}).join("")}
            </div>
          `:me=`
            <div class="end-empty-row">
              ${vs(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const we=le(n),Ce=we.findIndex(J=>J.name===u.name);let ie=null;if(Ce!==-1)for(let J=1;J<we.length;J++){const Se=we[(Ce+J)%we.length].questions.find(de=>X(H[de.id]));if(Se){ie=Se.id;break}}ie&&(Me=`
            <a
              href="#/q/${ie}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const De=o.from==="wrong"?"温习本 · 完成":`${u.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${E}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${ft()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${De}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${ze}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${_}</h2>
              <p class="end-sub" data-testid="end-subtitle">${W}</p>

              ${me}

              <div class="end-action-wrap flex-col-gap">
                ${ye}
                <button
                  type="button"
                  class="${ye?"btn-secondary":"btn-primary"} w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${K}
                </button>
                ${Me}
              </div>
            </div>
          </main>
        </div>
      `,(Dt=document.getElementById("q-back-btn"))==null||Dt.addEventListener("click",()=>{V(O)}),(_t=document.getElementById("end-leave-btn"))==null||_t.addEventListener("click",()=>{V(U)}),(Rt=document.getElementById("end-next-topic-btn"))==null||Rt.addEventListener("click",()=>{const he=le(n),$e=he.findIndex(Q=>Q.name===u.name);if($e!==-1&&$e<he.length-1){const Q=he[$e+1];V(`#/q/${Q.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(he=>{he.addEventListener("click",$e=>{const Q=he.getAttribute("href");Q&&($e.preventDefault(),V(Q))})}),te(A);return}const Ue=k?I?"pending":"graded":"answering",Pn=Ue==="answering"?"none":Ue==="pending"?"closed":"open",St=Ue==="graded"?(w==null?void 0:w.choice)??null:o.selectedChoice,Hn=r.options.map(M=>b(M,f(M.key,Ue,St,w),St===M.key,Pn)).join("");let Lt="";if(k&&w){let M=ze,H="答对了，理解到位";const _=on(w.submittedAt);let W=`你选了 ${w.choice} · 正确答案 ${r.answer} · ${_} 提交`,U="banner-correct",K="",me="";w.result==="wrong"?(M=Oe,H="这题有个小坑，看看解析",W=`你选了 ${w.choice} · 正确答案是 ${r.answer} · ${_} 提交`,U="banner-wrong",w.inWrongBook&&(K='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):w.result==="correct"?w.inWrongBook&&o.from!=="wrong"?me=`
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
          `:o.justRemovedWrong&&o.from!=="wrong"&&(me=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出温习本 ✓</span>
            </div>
          `):w.result==="ungraded"&&(M=ze,H="已提交（未判分）",W=`这题的答案还没编写 · ${_} 提交`,U="banner-ungraded"),Lt=`
        <section class="result-banner ${U}" data-testid="result-banner" data-result="${w.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${M}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${H}</h2>
              <p class="result-sub">${W}</p>
              ${K?`<div class="result-tag-wrap result-tag-below">${K}</div>`:""}
            </div>
          </div>
          ${me}
        </section>
      `}let Et="";if(k&&w){const M=Ns(r.explanation);Et=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Ln()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${M}
          </div>
        </section>
      `}let At="";r.animationId!=null&&k&&(At=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let Tt="";if(o.isRedoing&&o.from!=="wrong"){const M=Le(r.id);if(M){const H=M.result==="correct"?"已学习":M.result==="wrong"?"待巩固":"已提交",_=on(M.submittedAt);Tt=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${H}（选 ${M.choice} · ${_}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Ft=o.from==="wrong"||o.sec!=null?Z:u.questions,Dn=o.from!=="wrong"||k,_n=Ft.length,Rn=Rs(Math.max(0,fe),_n).map(M=>{const H=Ft[M],_=M+1,W=H.id===r.id,U=Le(H.id),K=Dn&&Be(U,o.from),me=K&&(U==null?void 0:U.result)==="correct",Me=K&&(U==null?void 0:U.result)==="wrong";let ye="switcher-unanswered",De=`<span>${_}</span>`;return me?(ye="switcher-correct",De=ps()):Me&&(ye="switcher-wrong",De=us()),W&&(ye+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${ye} active-press"
            data-testid="q-switch-${_}"
            data-qid="${H.id}"
            title="第 ${_} 题"
          >
            ${De}
          </button>
        `}).join(""),jn=k?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${fs(14)}
          <span>重做</span>
        </button>
      `:"",qt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${ne?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${ne?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,Mt=ae?"完成":"下一题 ›",Bt=ae?' data-action="finish"':"",It=xt?" btn-finish-locked":"",Pt=xt?' aria-disabled="true"':"",On=`
      <button
        type="button"
        class="btn-nav-next active-press${It}"
        data-testid="next"
        id="q-next-btn"${Bt}${Pt}
      >
        <span>${Mt}</span>
      </button>
    `,Wn=`
      <button
        type="button"
        class="btn-next-main active-press${It}"
        data-testid="next"
        id="q-next-btn"${Bt}${Pt}
      >
        <span>${Mt}</span>
      </button>
    `;let Ke="";if(k)Ke=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${qt}
            ${jn}
            ${Wn}
          </div>
        </div>
      `;else{const M=!!o.selectedChoice;Ke=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${qt}
            <button
              type="button"
              class="btn-submit-main active-press ${M?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${M?"":"disabled"}
            >
              <span>${M?"提交答案":"提交"}</span>
            </button>
            ${On}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${E}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${ft()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${In}</span>
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
              <span>${Ae}</span>
            </button>
            ${o.from==="wrong"||o.from==="topic"&&(o.retry||o.isRedoing)?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${o.showLastTrace?"true":"false"}" ${F?"":"disabled"}>
                    ${o.showLastTrace?$:T}
                    <span>${o.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${Rn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${Tt}

          <!-- 4. Result Banner (if submitted) -->
          ${Lt}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${r.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${r.code?Hs(r.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Hn}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${Et}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${At}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ke}
      </div>
    `,(jt=document.getElementById("q-back-btn"))==null||jt.addEventListener("click",()=>{V(O)}),(Ot=document.getElementById("q-overview-chip"))==null||Ot.addEventListener("click",()=>{V(z)}),k)(Ut=document.getElementById("q-redo-btn"))==null||Ut.addEventListener("click",()=>{var M;o.isRedoing=!0,o.prevChoice=(M=Le(r.id))==null?void 0:M.choice,o.selectedChoice=null,o.showLastTrace=!1,o.justRemovedWrong=!1,G()}),o.from!=="wrong"&&((Nt=document.getElementById("q-remove-wrong-btn"))==null||Nt.addEventListener("click",()=>{Zt(r.id),o.justRemovedWrong=!0,G()}));else{const M=e.querySelectorAll(".option-item");M.forEach(H=>{H.addEventListener("click",()=>{if(o.showLastTrace)return;const _=H.getAttribute("data-key");if(!_||_===o.selectedChoice)return;o.selectedChoice=_,M.forEach(U=>{const K=U.getAttribute("data-key")===_;g(U,K?"selected":"idle",K)});const W=e.querySelector("#q-submit-btn");if(W){W.disabled=!1,W.classList.remove("btn-disabled");const U=W.querySelector("span");U&&(U.textContent="提交答案")}})}),(Wt=document.getElementById("q-submit-btn"))==null||Wt.addEventListener("click",()=>{!o.selectedChoice||o.showLastTrace||(Yn(r,o.selectedChoice),o.isRedoing=!1,o.retry=!1,o.wrongFresh=!1,o.showLastTrace=!1,o.justRemovedWrong=!1,B=!0,G())})}o.from==="wrong"&&((zt=document.getElementById("q-remove-wrong-btn"))==null||zt.addEventListener("click",()=>{const M=r.id;Zt(M),R();const H=Y(),_=u.questions.find(W=>W.id===M||!X(H[W.id])?!1:u.questions.findIndex(U=>U.id===W.id)>v);V(_?`#/q/${_.id}?from=wrong`:"#/wrong")})),(Qt=document.getElementById("q-toggle-last"))==null||Qt.addEventListener("click",()=>{const M=e.querySelector("#q-toggle-last");if(!(!M||M.disabled)){if(o.showLastTrace=!o.showLastTrace,k&&!o.showLastTrace){G();return}N(),ue(o.showLastTrace)}}),(Vt=document.getElementById("q-prev-btn"))==null||Vt.addEventListener("click",()=>{ge&&V(`#/q/${ge}?from=${o.from}${D}${j}`)}),(Gt=document.getElementById("q-next-btn"))==null||Gt.addEventListener("click",()=>{if(oe){V(`#/q/${oe}?from=${o.from}${D}${j}`);return}const M=Y();if(!(Z.length>0&&Z.every(W=>Be(M[W.id],o.from)))){Us(z);return}if(o.from==="daily"){V("#/");return}const _=o.from==="wrong"?"wrong":"topic";je(),window.history.replaceState(null,"",O),window.location.hash=`#/done/${_}/${u.index}${o.sec!=null?"?sec="+o.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(M=>{M.addEventListener("click",()=>{const H=M.getAttribute("data-qid");H&&H!==r.id&&V(`#/q/${H}?from=${o.from}${D}${j}`)})});const He=e.querySelector(".q-switcher-group"),Je=e.querySelector(".switcher-current");if(He&&Je){const M=Je.getBoundingClientRect().left-He.getBoundingClientRect().left,H=He.scrollLeft+M-(He.clientWidth-Je.offsetWidth)/2;He.scrollLeft=Math.max(0,H)}if(I&&w){const M=w;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(C!==S||!e.isConnected)return;const H=e.querySelector("[data-view-token]");!H||H.getAttribute("data-view-token")!==E||e.querySelectorAll(".option-item").forEach(_=>{var K;const W=_.getAttribute("data-key")||"",U=M.choice===W;g(_,f(W,"graded",M.choice,M),U),(K=_.querySelector(".opt-hint-clip"))==null||K.classList.add("is-open")})})})}zs(e),te(A)}G()}function Te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Qs(e){const n=e.title||e.summary;if(n&&n.trim()){const s=n.trim(),d=s.match(/^[Qq]0*(\d+)$/);return d?d[1]:s}const t=(e.stem||"").split(`
`)[0].trim();if(t.length>20)return t.slice(0,18)+"…";const a=t.match(/^[Qq]0*(\d+)$/);return a?a[1]:t||"单选题"}function Vs(e,n,t){var ue,te,G,C,A;ce(),Ie(10);const a=t.from==="daily"||t.from==="wrong"?t.from:"topic",s=t.qid,d=t.topic?decodeURIComponent(t.topic):"";if(!s&&!d&&!t.from){window.location.replace("#/");return}let r=s?n.find(x=>x.id===s):void 0;if(!r){const x=kn(n);r=x?n.find(F=>F.id===x.id):n[0]}const i=le(n);let u=d?i.find(x=>x.name===d):r?(ue=Ve(n,r.id))==null?void 0:ue.topic:i[0];u||(u=i[0]);const v=Y();if(a==="wrong"&&!u.questions.some(x=>X(v[x.id]))){const x=i.find(F=>F.questions.some(h=>X(v[h.id])));if(!x){window.location.replace("#/wrong");return}u=x,(!r||!X(v[r.id]))&&(r=x.questions.find(F=>X(v[F.id])))}const m=t.sec?parseInt(t.sec,10):void 0,L=m!=null?`&sec=${m}`:"";let y=u.questions,o=u.name;if(a==="daily")y=r?[r]:[n[0]],o="今日一题";else if(a==="wrong"){const x=u.questions.filter(F=>X(v[F.id]));x.length>0&&(y=x)}else if(a==="topic"&&m!=null){const F=yt(u.questions,u.index,u.name).find(h=>h.index===m);F&&(y=F.questions,o=`${u.name} · 第${m}节`)}const E=y.length;let S=0,q=0,B=0;for(const x of y){const F=v[x.id];F&&Be(F,a)&&(S++,F.result==="correct"?q++:F.result==="wrong"&&B++)}const l=Math.max(0,E-S),c=94.25,p=E>0?(q/E*c).toFixed(2):"0",f=E>0?(B/E*c).toFixed(2):"0",g=`-${p}`,b=(r==null?void 0:r.id)||(y[0]?y[0].id:""),T=t.retry?`&retry=${t.retry}`:"",$=`#/q/${b}?from=${a}${L}${T}`,P=y.find(x=>!Be(v[x.id],a)),R=P||r||y[0],N=y.indexOf(R)+1,ee=y.map((x,F)=>{const h=F+1,w=v[x.id],k=Be(w,a),I=k&&(w==null?void 0:w.result)==="correct",D=k&&(w==null?void 0:w.result)==="wrong",j=x.id===b,O=Qs(x),z=x.topic;return I?`
          <button
            class="overview-card overview-card-correct ${j?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${x.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">${h}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已学习
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${Te(O)}</span>
              <span class="overview-card-tag tag-correct">${Te(z)}</span>
            </div>
          </button>
        `:D?`
          <button
            class="overview-card overview-card-wrong ${j?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${x.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">${h}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${Te(O)}</span>
              <span class="overview-card-tag tag-wrong">${Te(z)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${j?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${x.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">${h}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${Te(O)}</span>
              <span class="overview-card-tag tag-unanswered">${Te(z)}</span>
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
          <h1 class="overview-page-title">${Te(o)} · 题目总览</h1>
          <p class="overview-page-sub">共 ${E} 题 · 知识点强化</p>
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
              ${parseFloat(p)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#52643b" stroke-dasharray="${p} ${c}" stroke-dashoffset="0" stroke-width="3.8"></circle>`:""}
              ${parseFloat(f)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${f} ${c}" stroke-dashoffset="${g}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${S}/${E}</span>
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
              <span class="overview-submitted-chip">已作答 ${S} 题</span>
            </div>

            <div class="overview-legend-items">
              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-green"></span>
                  <span>已学习</span>
                </div>
                <span class="overview-legend-num">${q} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-orange"></span>
                  <span>待巩固</span>
                </div>
                <span class="overview-legend-num">${B} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-gray"></span>
                  <span>未作答</span>
                </div>
                <span class="overview-legend-num">${l} 题</span>
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
            <span class="overview-grid-count-chip">${E} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${ee}
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
            <span>${P?`继续第 ${N} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(te=document.getElementById("overview-back-btn"))==null||te.addEventListener("click",()=>{V($)}),(G=document.getElementById("overview-return-btn"))==null||G.addEventListener("click",()=>{V($)}),(C=document.getElementById("overview-dock-left"))==null||C.addEventListener("click",()=>{V($)}),(A=document.getElementById("overview-dock-right"))==null||A.addEventListener("click",()=>{V(`#/q/${R.id}?from=${a}${L}${T}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(x=>{x.addEventListener("click",()=>{const F=x.getAttribute("data-qid");F&&V(`#/q/${F}?from=${a}${L}${T}`)})})}function We(e,n,t){return Math.max(n,Math.min(t,e))}function Fe(e){if(!Number.isFinite(e))return 0;let n=e%360;return n>180&&(n-=360),n<=-180&&(n+=360),n}function Gs(e){return Number.isFinite(e)?Fe(e):0}function Ys(e){if(e.length<3)return 0;let n=0;for(let t=0;t<e.length;t++){const a=e[t],s=e[(t+1)%e.length];n+=a.x*s.y-s.x*a.y}return Math.abs(n)/2}function fn(e,n,t){if(e.length===0)return[];const a=[],s=e.length,d=r=>(r.x-n.x)*t.x+(r.y-n.y)*t.y>=-1e-9;for(let r=0;r<s;r++){const i=e[r],u=e[(r+s-1)%s],v=d(i),m=d(u);if(v!==m){const L=i.x-u.x,y=i.y-u.y,o=L*t.x+y*t.y,E=Math.abs(o)<1e-12?0:((n.x-u.x)*t.x+(n.y-u.y)*t.y)/o;a.push({x:u.x+We(E,0,1)*L,y:u.y+We(E,0,1)*y})}v&&a.push(i)}return a}function hn(e,n){return[{x:0,y:0},{x:e,y:0},{x:e,y:n},{x:0,y:n}]}function Zs(e,n,t,a){const s=We(t,0,1);if(e<=0||n<=0||s<=1e-6)return[];if(s>=1-1e-6)return hn(e,n);const d=Fe(a)*Math.PI/180,r=Math.sin(d),i=Math.cos(d),u=hn(e,n),v=u.map(S=>S.x*r+S.y*i);let m=Math.min(...v),L=Math.max(...v);const y=s*e*n;for(let S=0;S<40;S++){const q=(m+L)/2,B={x:q*r,y:q*i},c=fn(u,B,{x:r,y:i});Ys(c)>y?m=q:L=q}const o=(m+L)/2,E={x:o*r,y:o*i};return fn(u,E,{x:r,y:i})}function Ks(e,n,t,a){const s=Zs(e,n,t,a);return s.length<3?"polygon(0% 0%, 0% 0%, 0% 0%)":`polygon(${s.map(r=>{const i=We(r.x/e*100,-2,102),u=We(r.y/n*100,-2,102);return`${i.toFixed(2)}% ${u.toFixed(2)}%`}).join(", ")})`}const Js={"字符串/循环":40,"元组/引用":25,"函数/默认参数":0,"列表/切片":50,字典:0,"作用域/变量":25,"类/对象":0,异常处理:0};let ke=null;function vn(e,n,t){return Math.max(n,Math.min(t,e))}function Xs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ea(e,n){var F;ke==null||ke(),ke=null;const t=Y(),s=le(n).map((h,w)=>{const k=h.questions.filter(z=>!!t[z.id]).length,I=h.questions.length,D=I>0?k/I*100:0,j=Js[h.name]??Math.round(D),O=$t(h.name);return`
        <article
          class="bottle-card"
          data-testid="water-bottle-${w}"
          data-topic-index="${w}"
          data-real-pct="${D.toFixed(2)}"
          data-demo-pct="${j}"
          data-submitted="${k}"
          data-total="${I}"
          style="--water-color: ${O};"
        >
          <div class="bottle-vessel" data-testid="water-vessel-${w}">
            <div class="bottle-water" aria-hidden="true">
              <div class="bottle-water-inner" data-testid="water-fill-${w}"></div>
            </div>
          </div>
          <div class="bottle-content">
            <div class="bottle-icon">${bt(h.name)}</div>
            <div class="bottle-text">
              <div class="bottle-name-row">
                <span class="bottle-name">${Xs(h.name)}</span>
                <span class="bottle-index">#${String(w+1).padStart(2,"0")}</span>
              </div>
              <div class="bottle-meta" data-testid="water-meta-${w}">
                已提交 ${k} / ${I} 题
              </div>
            </div>
            <span class="bottle-pill" data-testid="water-pill-${w}">${k}/${I}</span>
          </div>
        </article>
      `}).join("");e.innerHTML=`
    <div class="page-wrapper page-water-lab" data-testid="water-lab-page">
      <div class="water-lab-banner" data-testid="water-lab-banner">
        <span class="water-lab-tag">试玩 / 实验</span>
        <span>非正式玩法 · 瓶身固定 · 只动水</span>
      </div>

      <header class="water-lab-header">
        <div>
          <h1>躺瓶进度试玩</h1>
          <p>水量固定；瓶子不转；水面相对地面水平（瓶内看起来是斜的），水往低端聚集。</p>
        </div>
        <a class="water-lab-back" href="#/topics" data-testid="water-lab-back">
          ${ft()}<span>返回</span>
        </a>
      </header>

      <section class="water-lab-controls" aria-label="倾斜与演示">
        <label>
          <span>模拟倾斜（−180…180：左低 / 右低 / 倒置）</span>
          <div class="row">
            <input
              type="range"
              id="water-tilt-slider"
              data-testid="water-tilt-slider"
              min="-180"
              max="180"
              value="0"
              step="1"
            />
            <span class="val" id="water-tilt-val">0°</span>
          </div>
        </label>
        <label class="water-lab-toggle">
          <input type="checkbox" id="water-demo-fills" data-testid="water-demo-fills" checked />
          <span>演示水量（Stitch 样例，便于看出晃动）</span>
        </label>
        <p class="water-lab-hint" id="water-sensor-hint" data-mode="sim" data-testid="water-sensor-hint">
          桌面：滑杆模拟左右 −180…180。手机：只用左右倾 γ（忽略前后倾 β）。瓶身不转，液面斜率=−γ。
        </p>
      </section>

      <section class="water-lab-list" data-testid="water-lab-list" aria-label="知识点水瓶">
        ${s}
      </section>

      <p class="water-lab-footer-note">
        正式站 P2/P3 仍是方案 A（整卡横涂）。本页仅实验。<br />
        路由 <code>#/lab/water</code>
      </p>
    </div>
  `,Ie(99);const d=Array.from(e.querySelectorAll(".bottle-card")),r=e.querySelector("#water-tilt-slider"),i=e.querySelector("#water-tilt-val"),u=e.querySelector("#water-demo-fills"),v=e.querySelector("#water-sensor-hint"),m=e.querySelector(".water-lab-list");let L=0,y=0,o=!!(u!=null&&u.checked),E=0,S=!1,q=0,B=0;const l=h=>{const w=Number(o?h.dataset.demoPct||0:h.dataset.realPct||0);return vn(w/100,0,1)},c=(h,w)=>{const k=h.querySelector(".bottle-vessel"),I=h.querySelector(".bottle-water-inner");if(!I||!k)return;h.style.removeProperty("--bottle-tilt"),k.style.transform="none",I.style.transform="none";const D=k.clientWidth||h.clientWidth||320,j=k.clientHeight||66,O=l(h),z=Ks(D,j,O,w);I.style.clipPath=z,I.style.setProperty("-webkit-clip-path",z),h.dataset.tilt=w.toFixed(2),h.dataset.fill=(O*100).toFixed(1),I.dataset.clip=z},p=()=>{d.forEach(h=>c(h,y)),i&&(i.textContent=`${Math.round(y)}°`),r&&!S&&document.activeElement!==r&&(r.value=String(y))},f=()=>{let h=Fe(L-y);y=Fe(y+h*.22),Math.abs(h)<.04&&(y=Fe(L)),p(),E=requestAnimationFrame(f)};E=requestAnimationFrame(f),requestAnimationFrame(()=>p());const g=h=>{const w=Fe(h),k=Math.abs(w),I=-w,D=`液面像素角 ${I>0?"+":""}${Math.round(I)}°（= −γ，1:1）`;return k<1?`水平：水面水平，水在底部。${D}`:k>170?`倒置：顶部更低，水堆到上方。${D}`:k>80&&k<100?(w<0?"侧倾：左侧更低，水堆到左边。":"侧倾：右侧更低，水堆到右边。")+D:(w<0?"左倾：左侧更低，水堆到左边。":"右倾：右侧更低，水堆到右边。")+D},b=h=>{L=Fe(vn(h,-180,180)),v&&(v.dataset.mode="sim",v.textContent=g(L))},T=()=>{r&&b(Number(r.value))};r==null||r.addEventListener("input",T);const $=()=>{o=!!(u!=null&&u.checked),p()};u==null||u.addEventListener("change",$);const P=h=>{var w;m&&(S=!0,q=h.clientX,B=L,(w=m.setPointerCapture)==null||w.call(m,h.pointerId))},R=h=>{!S||!m||b(B+(h.clientX-q)/2)},N=h=>{var w;S&&(S=!1,(w=m==null?void 0:m.releasePointerCapture)==null||w.call(m,h.pointerId))};m==null||m.addEventListener("pointerdown",P),m==null||m.addEventListener("pointermove",R),m==null||m.addEventListener("pointerup",N),m==null||m.addEventListener("pointercancel",N);const ee=h=>{h.key==="ArrowLeft"?(h.preventDefault(),b(L-5)):h.key==="ArrowRight"?(h.preventDefault(),b(L+5)):h.key==="0"||h.key==="Home"?b(0):h.key==="End"&&(h.preventDefault(),b(180))};window.addEventListener("keydown",ee);const ue=h=>{h.gamma!=null&&(L=Gs(h.gamma),v&&(v.dataset.mode="gyro",v.textContent=`左右倾 γ=${Math.round(h.gamma)}° → 液面斜率 ${-Math.round(L)}°（1:1，忽略前后倾）。`))};let te=!1;const G=()=>{te||(window.addEventListener("deviceorientation",ue),te=!0)},C=async()=>{const h=DeviceOrientationEvent;if(typeof h.requestPermission=="function")try{await h.requestPermission()==="granted"?(G(),v&&(v.dataset.mode="gyro",v.textContent="运动权限已开，请倾斜手机。")):v&&(v.dataset.mode="sim",v.textContent="未获得运动权限，请用滑杆模拟。")}catch{v&&(v.dataset.mode="sim",v.textContent="无法请求运动权限，请用滑杆模拟。")}else G()};if(!(typeof DeviceOrientationEvent.requestPermission=="function"))G();else{const h=document.createElement("button");h.type="button",h.className="water-lab-back",h.style.marginTop="4px",h.textContent="开启手机倾斜",h.setAttribute("data-testid","water-enable-gyro"),h.addEventListener("click",()=>{C(),h.remove()}),(F=e.querySelector(".water-lab-controls"))==null||F.appendChild(h)}const x=()=>p();window.addEventListener("resize",x),ke=()=>{cancelAnimationFrame(E),r==null||r.removeEventListener("input",T),u==null||u.removeEventListener("change",$),m==null||m.removeEventListener("pointerdown",P),m==null||m.removeEventListener("pointermove",R),m==null||m.removeEventListener("pointerup",N),m==null||m.removeEventListener("pointercancel",N),window.removeEventListener("keydown",ee),window.removeEventListener("resize",x),te&&window.removeEventListener("deviceorientation",ue)}}function Fn(){ke==null||ke(),ke=null}const ve=document.getElementById("app");let pe=[],dt=!1;function Ee(){Fn();const{path:e}=Ge();if(e==="/"||e==="")ve.innerHTML=$s(pe);else if(e==="/topics")ve.innerHTML=Cs(pe);else if(e.startsWith("/topic/")){const t=e.slice(7);ve.innerHTML=Ss(pe,t)}else if(e==="/wrong"){ve.innerHTML=Ts(pe);const t=ve.querySelector('[data-testid="wrong-start"]');t==null||t.addEventListener("click",a=>{if(a.preventDefault(),dt)return;dt=!0,setTimeout(()=>{dt=!1},300);const s=As(pe);s&&(location.hash=`#/q/${s}?from=wrong`)})}else e==="/me"&&(ve.innerHTML=qs(pe,Ee));const n=Sn(e);n!=null&&Ie(n)}async function qn(){var n;xn();try{pe=await Nn()}catch{ve.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{qn()});return}xe("/",()=>{ce(),Ee()}),xe("/topics",()=>{ce(),Ee()}),xe("/wrong",()=>{ce(),Ee()}),xe("/me",()=>{ce(),Ee()}),xe("/topic/:topicIndex",()=>{ce(),Ee()}),xe("/q/:id",(t,a)=>{ce();const s=t.id,d=a.from||"topic",r=a.sec?parseInt(a.sec,10):void 0,i=a.retry==="1"||a.retry==="true";gn(ve,pe,s,d,{sec:r,retry:i})}),xe("/done/:kind/:topicIndex",(t,a)=>{ce();const d=le(pe)[Number(t.topicIndex)];if(!d||!d.questions.length){V("#/");return}const r=t.kind==="wrong"?"wrong":"topic",i=a.sec?parseInt(a.sec,10):void 0,u=r==="topic"?d.questions[d.questions.length-1].id:d.questions[0].id;gn(ve,pe,u,r,{endCard:!0,sec:i})}),xe("/overview",(t,a)=>{ce(),Vs(ve,pe,a)}),xe("/lab/water",()=>{ce(),Fn(),ea(ve,pe)}),zn(()=>{V("#/")}),Vn(()=>{const{path:t}=Ge();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ee()});const e=()=>{const{path:t}=Ge();(t==="/"||t==="")&&Ee()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Qn()}qn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
