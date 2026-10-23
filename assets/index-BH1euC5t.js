(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(s){if(s.ep)return;s.ep=!0;const d=t(s);fetch(s.href,d)}})();let tt=null;async function Un(e=!1){if(tt&&!e)return tt;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return tt=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function le(e){const n=new Map;for(const s of e)n.has(s.topic)||n.set(s.topic,[]),n.get(s.topic).push(s);const t=[];let a=0;for(const[s,d]of n.entries())t.push({name:s,index:a,questions:d}),a++;return t}function Qe(e,n){const t=le(e);for(const a of t){const s=a.questions.findIndex(d=>d.id===n);if(s!==-1)return{topic:a,indexInTopic:s}}return null}const vn=[];let mn=()=>{};function xe(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(d,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),s=new RegExp(`^${a}$`);vn.push({regex:s,paramNames:t,handler:n})}function Nn(e){mn=e}function ce(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function Q(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?pt():window.location.hash=n}function Ve(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,s={};return t&&new URLSearchParams(t).forEach((r,i)=>{s[i]=r}),{path:a,query:s}}function pt(){ce();const{path:e,query:n}=Ve();for(const t of vn){const a=e.match(t.regex);if(a){const s={};t.paramNames.forEach((d,r)=>{s[d]=a[r+1]?decodeURIComponent(a[r+1]):""}),t.handler(s,n);return}}mn({},n)}function zn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",pt),pt()}const Ge="pydrill.v1.records",mt="pydrill.v1.last",wt="pydrill.days",ut=new Set;function Qn(e){return ut.add(e),()=>{ut.delete(e)}}function wn(){for(const e of ut)try{e()}catch(n){console.error("Error in store listener:",n)}}function X(e){if(!e||!e.inWrongBook)return!1;const n=typeof e.choice=="string"&&e.choice.length>0,t=e.result==="wrong"||e.result==="correct";return n&&t}function Vn(e){let n=!1;for(const t of Object.keys(e)){const a=e[t];if(a&&a.inWrongBook){const s=typeof a.choice=="string"&&a.choice.length>0,d=a.result==="wrong"||a.result==="correct";(!s||!d)&&(a.inWrongBook=!1,n=!0)}}return n}function V(){try{const e=localStorage.getItem(Ge);if(!e)return{};const n=JSON.parse(e);if(typeof n!="object"||n===null)return{};const t=n;if(Vn(t))try{localStorage.setItem(Ge,JSON.stringify(t))}catch(a){console.error("Failed to save sanitized records to localStorage:",a)}return t}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Le(e){return V()[e]}function _e(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function bn(e){try{localStorage.setItem(Ge,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}wn()}function Re(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${a}`}function yn(){try{const e=localStorage.getItem(wt);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function $n(e){const n=Re(),t=yn();if(!t.includes(n)){t.push(n);try{localStorage.setItem(wt,JSON.stringify(t))}catch(a){console.error("Failed to save active days to localStorage:",a)}}}function Gn(e,n){$n();const t=V(),a=t[e.id],s=X(a);let d,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(d="correct",r=s):(d="wrong",r=!0):(d="ungraded",r=!1);const g=s&&(d==="correct"||d==="wrong"),v={choice:n,result:d,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:g};if(d==="wrong")v.lastWrongChoice=n,v.lastWrongAt=v.submittedAt;else{const m=_e(a);m&&(v.lastWrongChoice=m,typeof(a==null?void 0:a.lastWrongAt)=="number"?v.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&(v.lastWrongAt=a.submittedAt))}return t[e.id]=v,bn(t),v}function Zt(e){const n=V();n[e]&&(n[e]={...n[e],inWrongBook:!1},bn(n))}function Yn(){try{localStorage.removeItem(Ge)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(mt)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(wt)}catch(e){console.error("Failed to clear active days:",e)}wn()}function xn(e){try{const n=localStorage.getItem(mt);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,s=t.at;return typeof a!="string"||a.length===0||typeof s!="number"||!Number.isFinite(s)||!e.some(d=>d.id===a)?null:{id:a,at:s}}catch(n){return console.warn("Failed to parse last position:",n),null}}function Zn(e){try{localStorage.setItem(mt,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Ye(e){const n=V();return e.filter(t=>X(n[t.id]))}function Kn(e){const n=V(),t=e.length;let a=0;for(const s of e)n[s.id]&&a++;return{done:a,total:t}}const Jn="pydrill.devPageIds";function gt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function Xn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:gt(new URLSearchParams(e.slice(n+1)).get("dev"))}function es(){return!0}function kn(){const e=Xn();if(e!==null)return e;const n=gt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=gt(localStorage.getItem(Jn));if(t!==null)return t}catch{}return es()}function Cn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:e==="/lab/water"?99:null}function Kt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function ts(e){return Number(e.getAttribute("data-page")||0)}function Be(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!kn()){n==null||n.remove();return}const t=e===99?"试玩":`P${e}`,a=n??(()=>{const s=document.createElement("div");return s.className="dev-page-id",s.setAttribute("data-testid","dev-page-id"),s.setAttribute("aria-hidden","true"),document.body.appendChild(s),s})();if(a.textContent=t,a.setAttribute("data-page",String(e)),a.title=e===99?"方案B水瓶试玩（实验）":"长按打开方案B水瓶试玩 #/lab/water",a.classList.add("is-lab-entry"),!a.dataset.labBound){a.dataset.labBound="1";let s=null;const d=()=>{s!=null&&(window.clearTimeout(s),s=null)};a.addEventListener("pointerdown",r=>{ts(a)!==99&&(d(),s=window.setTimeout(()=>{s=null,window.location.hash="#/lab/water"},650),r.stopPropagation())}),a.addEventListener("pointerup",d),a.addEventListener("pointerleave",d),a.addEventListener("pointercancel",d)}}function ns(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),s=n.getDate();return(Math.floor(Date.UTC(t,a,s)/864e5)%e+e)%e}function ss(e,n=new Date){if(e.length===0)return;const t=ns(e.length,n);return e[t]}function as(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function rs(e,n=new Date){const t=Le(e.id),a=n.getTime();return!t||!as(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function os(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function is(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function cs(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ls(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ft(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function ds(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function ps(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Sn(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function us(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function gs(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function fs(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  </svg>`}function hs(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function bt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function Ln(){return`<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24" width="16">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>`}function Ie(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",s=e==="wrong",d=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${os(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${is(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${s?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${cs(s)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${d?"active":""}" data-testid="tab-me">
          ${ls(d)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const vs=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,Oe=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,ms=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,ws=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,bs=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function nt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ys(e){const n=V(),a=Ye(e).length,s=le(e),d=s.length,r=ss(e),i=r?rs(r):{statusText:"今天还没做",isCompletedToday:!1},g=r?Qe(e,r.id):null,v=g?g.indexInTopic+1:1,m=g?g.topic.questions.length:2,L=r?`${r.topic} · 第 ${v}/${m} 题`:"今日一题",b=new Date,o=`${b.getMonth()+1}月${b.getDate()}日`,A=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",S=s[0],F=(S==null?void 0:S.name)||"",B=S&&S.questions.length>0?S.questions.find(w=>!n[w.id])||S.questions[0]:void 0,l=xn(e),c=l?e.find(w=>w.id===l.id):void 0,p=c?Qe(e,c.id):null,h=c!=null&&c.code?(c.code.split(`
`)[0]||"").trim():"",u=c&&p?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Jt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${nt(p.topic.name)} · 第 ${p.indexInTopic+1}/${p.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${c.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${h?`<div class="continue-code"><code>${nt(h)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Jt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${nt(F)}」开始吧，一次一小步。</p>
          ${B?`<a href="#/q/${B.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${vs}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${us()}</span>
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
          <img src="${ms}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${i.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${ws}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${d} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${bs}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${a>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${u}

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

          ${A?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${A}</code></pre>
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

    ${Ie("home",a)}
  `}const $s={"字符串/循环":["字符串操作","循环控制"],"元组/引用":["元组基础","引用与可变性","同一性与拷贝"],"函数/默认参数":["函数定义与返回值","参数传递与调用","默认参数机制"],"列表/切片":["切片索引与步长","列表修改与拷贝"],字典:["访问与成员检查","常用字典方法","键的特性与哈希"],"作用域/变量":["全局与局部变量","变量生命周期","嵌套作用域与闭包"],"类/对象":["类属性与实例属性","方法定义与调用","继承与特殊方法"],异常处理:["异常捕获与匹配","流程控制与清理","异常抛出与自定义"]},En={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},An={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function yt(e,n,t){const a=[],s=new Map;let d=0,r=null;for(const b of e){const o=b.subtopic&&b.subtopic.trim()?b.subtopic.trim():null;if(o){r=null;let A=s.get(o);A||(A={name:o,questions:[]},s.set(o,A),a.push(A)),A.questions.push(b)}else(!r||r.questions.length>=10)&&(d++,r={name:`第 ${d} 节`,questions:[]},a.push(r)),r.questions.push(b)}const i=$s[t]||[],g=b=>{const o=i.indexOf(b);return o<0?i.length:o};a.sort((b,o)=>g(b.name)-g(o.name));const v=b=>typeof b.difficulty=="number"?b.difficulty:2;for(const b of a)b.questions.sort((o,A)=>v(o)-v(A)||(o.id<A.id?-1:o.id>A.id?1:0));const m=[];let L=1;for(const b of a)for(let o=0;o<b.questions.length;o+=10){const A=b.questions.slice(o,o+10),S=A.reduce((B,l)=>B+(typeof l.difficulty=="number"?l.difficulty:2),0),F=Math.max(1,Math.min(3,Math.round(S/A.length)));m.push({index:L,name:b.name,topicIndex:n,topicName:t,questions:A,avgDifficulty:F}),L++}return m}function st(e,n){const t=e.questions.length;let a=0;for(const i of e.questions)n[i.id]&&a++;const s=t>0&&a===t,d=a>0&&!s;return{submittedCount:a,totalCount:t,isCompleted:s,isInProgress:d,isNotStarted:a===0}}const at={"字符串/循环":"#7a9a5c","元组/引用":"#8a6b55","函数/默认参数":"#c47a3a","列表/切片":"#5f8a7a",字典:"#9a6b7a","作用域/变量":"#6b7a8a","类/对象":"#8a7a5c",异常处理:"#a07050"},xs="#7a9a5c";function $t(e){if(at[e])return at[e];for(const[n,t]of Object.entries(at))if(e.includes(n)||n.includes(e))return t;return xs}function Xt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ks(e){const n=le(e),t=V(),a=e.filter(r=>!!t[r.id]).length,s=Ye(e).length,d=n.map((r,i)=>{const g=En[r.name]??An[r.name],v=r.questions.filter(S=>!!t[S.id]).length,m=r.questions.length,L=m>0?v/m*100:0,b=L===0?"0":L.toFixed(1),o=L===0?"0%":`${L.toFixed(1)}%`,A=$t(r.name);return`
        <article
          class="card paper-card topic-card topic-progress-card active-press"
          data-testid="topic-card-${i}"
          onclick="window.location.hash = '#/topic/${i}'"
        >
          <div
            class="card-bar-fill"
            data-testid="topic-card-fill-${i}"
            data-pct="${b}"
            data-submitted="${v}"
            data-total="${m}"
            style="width: ${o}; background-color: ${A}; color: ${A};"
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
              ${g?`<p class="topic-sub" data-testid="topic-sub-${i}">${Xt(g)}</p>`:""}
            </div>
            <span class="sr-only" data-testid="topic-progress-${i}">${v} / ${m}</span>
            <div class="topic-chevron-col" aria-hidden="true">
              ${Ln()}
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

    ${Ie("topics",s)}
  `}function Ue(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Cs(e,n){const t=le(e),a=parseInt(n,10),s=t[a]||t[0];if(!s)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const d=V(),r=Ye(e).length,i=yt(s.questions,s.index,s.name),g=En[s.name]||An[s.name]||"";let v=0;for(const u of i)st(u,d).isCompleted&&v++;const m=i.length,L=m>0?v/m:0,b=150.8,o=(b*(1-L)).toFixed(1),A=i.map(u=>{const{submittedCount:w,totalCount:T,isCompleted:y,isInProgress:I}=st(u,d);let D="";y?D=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="0"/>
            </svg>
            <svg class="sec-ring-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        `:I?D=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-w/T)).toFixed(1)}"/>
            </svg>
            <span class="sec-ring-num is-progress">${u.index}</span>
          </div>
        `:D=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
            </svg>
            <span class="sec-ring-num">${u.index}</span>
          </div>
        `;let N="";y?N='<span class="sec-tag tag-done">已完成</span>':I?N='<span class="sec-tag tag-progress">进行中</span>':N='<span class="sec-tag tag-pending">未开始</span>';let ee="";u.avgDifficulty===1?ee='<span class="diff-dot dot-green"></span><span>入门</span>':u.avgDifficulty===2?ee='<span class="diff-dot dot-orange"></span><span>进阶</span>':ee='<span class="diff-dot dot-orange"></span><span class="diff-dot dot-orange"></span><span>挑战</span>';const te=`#/q/${(u.questions.find(E=>!d[E.id])||u.questions[0]).id}?from=topic&sec=${u.index}${y?"&retry=1":""}`;let G="";return y?G=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${u.index}" onclick="window.location.hash='${te}'">
            再练一次
          </button>
        `:I?G=`
          <button type="button" class="sec-btn sec-btn-primary active-press" data-testid="sec-btn-${u.index}" onclick="window.location.hash='${te}'">
            <span>继续</span>
            <svg class="sec-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        `:G=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${u.index}" onclick="window.location.hash='${te}'">
            开始练
          </button>
        `,`
        <div class="${I?"topic-detail-sec-row is-in-progress":"topic-detail-sec-row"}" data-testid="sec-row-${u.index}">
          ${I?'<span class="sec-accent-bar" aria-hidden="true"></span>':""}
          ${D}
          <div class="sec-row-center">
            <div class="sec-row-title-line">
              <span class="sec-row-title">${u.index} ${Ue(u.name)}</span>
              ${N}
            </div>
            <div class="sec-row-meta-line">
              <span class="sec-diff-badge">${ee}</span>
              <span class="sec-meta-sep">·</span>
              <span class="sec-count-mono" data-testid="sec-count-${u.index}">${w}/${T}</span>
            </div>
          </div>
          ${G}
        </div>
      `}).join(""),S=i.find(u=>!st(u,d).isCompleted),F=!S,B=F?i[0]:S,l=B.index,c=F?"再练 第1节":`继续 第${l}节`,h=`#/q/${(B.questions.find(u=>!d[u.id])||B.questions[0]).id}?from=topic&sec=${l}${F?"&retry=1":""}`;return`
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
          <h2 class="topic-detail-name">${Ue(s.name)}</h2>
          ${g?`<p class="topic-detail-intro">${Ue(g)}</p>`:""}
          <div class="topic-detail-counts">
            <span>共 ${m} 小节</span>
            <span class="topic-detail-counts-dot">·</span>
            <span>${s.questions.length} 道题目</span>
          </div>
        </div>

        <div class="topic-detail-big-ring-wrap" data-testid="detail-ring" aria-label="已完成 ${v}/${m} 节">
          <svg class="topic-detail-big-ring-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" class="topic-detail-ring-track" stroke-width="5"/>
            ${v>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${b}" stroke-dashoffset="${o}"/>`:""}
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
        ${A}
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
            <span class="bottom-bar-title">第 ${l} 节 · ${Ue(B.name)}</span>
          </div>
          <button
            type="button"
            class="bottom-bar-cta-btn active-press"
            data-testid="detail-continue"
            onclick="window.location.hash='${h}'"
          >
            <span>${c}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    ${Ie("topics",r)}
  `}const Ss=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function Ls(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const rt="pydrill.lastRandomWrong";function Es(e){const n=V(),t=e.filter(r=>X(n[r.id]));if(t.length===0)return null;if(t.length===1){const r=t[0].id;try{sessionStorage.setItem(rt,r)}catch{}return r}let a=null;try{a=sessionStorage.getItem(rt)}catch{}const s=a&&t.some(r=>r.id===a)?t.filter(r=>r.id!==a):t,d=s[Math.floor(Math.random()*s.length)];try{sessionStorage.setItem(rt,d.id)}catch{}return d.id}function As(e,n){var g;const t=V(),a=le(e),s=e.filter(v=>X(t[v.id])),d=s.length;if(d===0)return`
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
            <img src="${Ss}" alt="空白小本子" class="wrong-empty-img" />
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

      ${Ie("wrong",0)}
    `;const r=((g=s[Math.floor(Math.random()*s.length)])==null?void 0:g.id)??"",i=a.map(v=>{const m=v.questions.filter(l=>X(t[l.id]));if(m.length===0)return"";const L=v.questions.filter(l=>!!t[l.id]).length,b=v.questions.length,o=b>0?L/b*100:0,A=o===0?"0":o.toFixed(1),S=o===0?"0%":`${o.toFixed(1)}%`,F=$t(v.name),B=String(v.index+1).padStart(2,"0");return`
        <a
          class="topic-progress-card wrong-topic-card active-press"
          data-testid="wrong-topic-${v.index}"
          href="#/q/${m[0].id}?from=wrong"
        >
          <div
            class="card-bar-fill"
            data-testid="wrong-topic-fill-${v.index}"
            data-pct="${A}"
            data-submitted="${L}"
            data-total="${b}"
            style="width: ${S}; background-color: ${F}; color: ${F};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">${bt(v.name)}</div>
            <div class="wrong-topic-main">
              <div class="wrong-topic-name-row">
                <span class="wrong-topic-name">${Ls(v.name)}</span>
                <span class="wrong-topic-index">#${B}</span>
              </div>
              <div class="wrong-topic-meta">
                <span class="topic-meta-highlight" data-testid="wrong-topic-count-${v.index}">${m.length}</span> 题待巩固
              </div>
            </div>
            <div class="topic-chevron-col" aria-hidden="true">
              ${Ln()}
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

    ${Ie("wrong",d)}
  `}const Ne=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function ot(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ts(e){const n=new Date(e),t=new Date,a=Re(t),s=Re(n);if(s===a)return"今天";const d=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return s===Re(d)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function Fs(e,n){const t=V(),a=le(e),s=Ye(e).length,d=yn(),r=d.length,i=new Date,g=i.getDay(),v=g===0?-6:1-g,m=new Date(i.getFullYear(),i.getMonth(),i.getDate()+v),L=["一","二","三","四","五","六","日"],b=new Set(d);let o=0;const A=L.map((p,h)=>{const u=new Date(m.getFullYear(),m.getMonth(),m.getDate()+h),w=Re(u),T=b.has(w);return T&&o++,`
        <div class="day-dot-item">
          <span class="day-name">${p}</span>
          <div class="day-dot ${T?"active is-on":""}" data-testid="me-week-dot-${h}"></div>
        </div>
      `}).join(""),S=a.map((p,h)=>{const{done:u,total:w}=Kn(p.questions);let T="";return u>0&&(T=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(u/w*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${h}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${p.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${T}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${h}">${u}/${w}</span>
          </div>
          <span class="ring-label">${ot(p.name)}</span>
        </div>
      `}).join(""),F=s>0?`<div class="review-count-highlight">${s} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',B=Object.entries(t).filter(([p,h])=>typeof h.submittedAt=="number").sort((p,h)=>h[1].submittedAt-p[1].submittedAt).slice(0,3);let l="";B.length===0?l='<div class="recent-empty">还没有练习记录</div>':l=B.map(([p,h],u)=>{const w=e.find(N=>N.id===p);if(!w)return"";const T=w.title||(w.stem?w.stem.split(`
`)[0].trim():"Python 练习题"),y=T.match(/^[Qq]0*(\d+)$/),I=y?y[1]:T,D=Ts(h.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${u}" onclick="window.location.hash='#/q/${w.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${ot(I)}</div>
              <div class="recent-topic-sub">· ${ot(w.topic)}</div>
            </div>
            <span class="recent-time">${D}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Yn();const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=p=>{try{localStorage.setItem("pydrill.devPageIds",p?"true":"false")}catch{}const h=Cn("/me");Be(h)});const c=kn();return`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Card -->
      <header class="card paper-card profile-header-card select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Ne}" alt="小芽啾" class="me-avatar-img" />
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
          ${A}
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
            ${F}
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
            ${fs()}
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

    ${Ie("me",s)}
  `}const vt=globalThis;vt.Prism=vt.Prism??{};vt.Prism.manual=!0;var en=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function qs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var it={exports:{}},tn;function Ms(){return tn||(tn=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,r={},i={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function l(c){return c instanceof g?new g(c.type,l(c.content),c.alias):Array.isArray(c)?c.map(l):c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(l){return Object.prototype.toString.call(l).slice(8,-1)},objId:function(l){return l.__id||Object.defineProperty(l,"__id",{value:++d}),l.__id},clone:function l(c,p){p=p||{};var h,u;switch(i.util.type(c)){case"Object":if(u=i.util.objId(c),p[u])return p[u];h={},p[u]=h;for(var w in c)c.hasOwnProperty(w)&&(h[w]=l(c[w],p));return h;case"Array":return u=i.util.objId(c),p[u]?p[u]:(h=[],p[u]=h,c.forEach(function(T,y){h[y]=l(T,p)}),h);default:return c}},getLanguage:function(l){for(;l;){var c=s.exec(l.className);if(c)return c[1].toLowerCase();l=l.parentElement}return"none"},setLanguage:function(l,c){l.className=l.className.replace(RegExp(s,"gi"),""),l.classList.add("language-"+c)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(h){var l=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(h.stack)||[])[1];if(l){var c=document.getElementsByTagName("script");for(var p in c)if(c[p].src==l)return c[p]}return null}},isActive:function(l,c,p){for(var h="no-"+c;l;){var u=l.classList;if(u.contains(c))return!0;if(u.contains(h))return!1;l=l.parentElement}return!!p}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(l,c){var p=i.util.clone(i.languages[l]);for(var h in c)p[h]=c[h];return p},insertBefore:function(l,c,p,h){h=h||i.languages;var u=h[l],w={};for(var T in u)if(u.hasOwnProperty(T)){if(T==c)for(var y in p)p.hasOwnProperty(y)&&(w[y]=p[y]);p.hasOwnProperty(T)||(w[T]=u[T])}var I=h[l];return h[l]=w,i.languages.DFS(i.languages,function(D,N){N===I&&D!=l&&(this[D]=w)}),w},DFS:function l(c,p,h,u){u=u||{};var w=i.util.objId;for(var T in c)if(c.hasOwnProperty(T)){p.call(c,T,c[T],h||T);var y=c[T],I=i.util.type(y);I==="Object"&&!u[w(y)]?(u[w(y)]=!0,l(y,p,null,u)):I==="Array"&&!u[w(y)]&&(u[w(y)]=!0,l(y,p,T,u))}}},plugins:{},highlightAll:function(l,c){i.highlightAllUnder(document,l,c)},highlightAllUnder:function(l,c,p){var h={callback:p,container:l,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};i.hooks.run("before-highlightall",h),h.elements=Array.prototype.slice.apply(h.container.querySelectorAll(h.selector)),i.hooks.run("before-all-elements-highlight",h);for(var u=0,w;w=h.elements[u++];)i.highlightElement(w,c===!0,h.callback)},highlightElement:function(l,c,p){var h=i.util.getLanguage(l),u=i.languages[h];i.util.setLanguage(l,h);var w=l.parentElement;w&&w.nodeName.toLowerCase()==="pre"&&i.util.setLanguage(w,h);var T=l.textContent,y={element:l,language:h,grammar:u,code:T};function I(N){y.highlightedCode=N,i.hooks.run("before-insert",y),y.element.innerHTML=y.highlightedCode,i.hooks.run("after-highlight",y),i.hooks.run("complete",y),p&&p.call(y.element)}if(i.hooks.run("before-sanity-check",y),w=y.element.parentElement,w&&w.nodeName.toLowerCase()==="pre"&&!w.hasAttribute("tabindex")&&w.setAttribute("tabindex","0"),!y.code){i.hooks.run("complete",y),p&&p.call(y.element);return}if(i.hooks.run("before-highlight",y),!y.grammar){I(i.util.encode(y.code));return}if(c&&a.Worker){var D=new Worker(i.filename);D.onmessage=function(N){I(N.data)},D.postMessage(JSON.stringify({language:y.language,code:y.code,immediateClose:!0}))}else I(i.highlight(y.code,y.grammar,y.language))},highlight:function(l,c,p){var h={code:l,grammar:c,language:p};if(i.hooks.run("before-tokenize",h),!h.grammar)throw new Error('The language "'+h.language+'" has no grammar.');return h.tokens=i.tokenize(h.code,h.grammar),i.hooks.run("after-tokenize",h),g.stringify(i.util.encode(h.tokens),h.language)},tokenize:function(l,c){var p=c.rest;if(p){for(var h in p)c[h]=p[h];delete c.rest}var u=new L;return b(u,u.head,l),m(l,u,c,u.head,0),A(u)},hooks:{all:{},add:function(l,c){var p=i.hooks.all;p[l]=p[l]||[],p[l].push(c)},run:function(l,c){var p=i.hooks.all[l];if(!(!p||!p.length))for(var h=0,u;u=p[h++];)u(c)}},Token:g};a.Prism=i;function g(l,c,p,h){this.type=l,this.content=c,this.alias=p,this.length=(h||"").length|0}g.stringify=function l(c,p){if(typeof c=="string")return c;if(Array.isArray(c)){var h="";return c.forEach(function(I){h+=l(I,p)}),h}var u={type:c.type,content:l(c.content,p),tag:"span",classes:["token",c.type],attributes:{},language:p},w=c.alias;w&&(Array.isArray(w)?Array.prototype.push.apply(u.classes,w):u.classes.push(w)),i.hooks.run("wrap",u);var T="";for(var y in u.attributes)T+=" "+y+'="'+(u.attributes[y]||"").replace(/"/g,"&quot;")+'"';return"<"+u.tag+' class="'+u.classes.join(" ")+'"'+T+">"+u.content+"</"+u.tag+">"};function v(l,c,p,h){l.lastIndex=c;var u=l.exec(p);if(u&&h&&u[1]){var w=u[1].length;u.index+=w,u[0]=u[0].slice(w)}return u}function m(l,c,p,h,u,w){for(var T in p)if(!(!p.hasOwnProperty(T)||!p[T])){var y=p[T];y=Array.isArray(y)?y:[y];for(var I=0;I<y.length;++I){if(w&&w.cause==T+","+I)return;var D=y[I],N=D.inside,ee=!!D.lookbehind,de=!!D.greedy,te=D.alias;if(de&&!D.pattern.global){var G=D.pattern.toString().match(/[imsuy]*$/)[0];D.pattern=RegExp(D.pattern.source,G+"g")}for(var C=D.pattern||D,E=h.next,$=u;E!==c.tail&&!(w&&$>=w.reach);$+=E.value.length,E=E.next){var f=E.value;if(c.length>l.length)return;if(!(f instanceof g)){var M=1,x;if(de){if(x=v(C,$,l,ee),!x||x.index>=l.length)break;var R=x.index,k=x.index+x[0].length,P=$;for(P+=E.value.length;R>=P;)E=E.next,P+=E.value.length;if(P-=E.value.length,$=P,E.value instanceof g)continue;for(var O=E;O!==c.tail&&(P<k||typeof O.value=="string");O=O.next)M++,P+=O.value.length;M--,f=l.slice($,P),x.index-=$}else if(x=v(C,0,f,ee),!x)continue;var R=x.index,j=x[0],K=f.slice(0,R),Ae=f.slice(R+j.length),ge=$+f.length;w&&ge>w.reach&&(w.reach=ge);var oe=E.prev;K&&(oe=b(c,oe,K),$+=K.length),o(c,oe,M);var ae=new g(T,N?i.tokenize(j,N):j,te,j);if(E=b(c,oe,ae),Ae&&b(c,E,Ae),M>1){var ne={cause:T+","+I,reach:ge};m(l,c,p,E.prev,$,ne),w&&ne.reach>w.reach&&(w.reach=ne.reach)}}}}}}function L(){var l={value:null,prev:null,next:null},c={value:null,prev:l,next:null};l.next=c,this.head=l,this.tail=c,this.length=0}function b(l,c,p){var h=c.next,u={value:p,prev:c,next:h};return c.next=u,h.prev=u,l.length++,u}function o(l,c,p){for(var h=c.next,u=0;u<p&&h!==l.tail;u++)h=h.next;c.next=h,h.prev=c,l.length-=u}function A(l){for(var c=[],p=l.head.next;p!==l.tail;)c.push(p.value),p=p.next;return c}if(!a.document)return a.addEventListener&&(i.disableWorkerMessageHandler||a.addEventListener("message",function(l){var c=JSON.parse(l.data),p=c.language,h=c.code,u=c.immediateClose;a.postMessage(i.highlight(h,i.languages[p],p)),u&&a.close()},!1)),i;var S=i.util.currentScript();S&&(i.filename=S.src,S.hasAttribute("data-manual")&&(i.manual=!0));function F(){i.manual||i.highlightAll()}if(!i.manual){var B=document.readyState;B==="loading"||B==="interactive"&&S&&S.defer?document.addEventListener("DOMContentLoaded",F):window.requestAnimationFrame?window.requestAnimationFrame(F):window.setTimeout(F,16)}return i})(n);e.exports&&(e.exports=t),typeof en<"u"&&(en.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,d){var r={};r["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[d]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};i["language-"+d]={pattern:/[\s\S]+/,inside:t.languages[d]};var g={};g[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:i},t.languages.insertBefore("markup","cdata",g)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var d=a.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",s=function(S,F){return"✖ Error "+S+" while fetching file: "+F},d="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},i="data-src-status",g="loading",v="loaded",m="failed",L="pre[data-src]:not(["+i+'="'+v+'"]):not(['+i+'="'+g+'"])';function b(S,F,B){var l=new XMLHttpRequest;l.open("GET",S,!0),l.onreadystatechange=function(){l.readyState==4&&(l.status<400&&l.responseText?F(l.responseText):l.status>=400?B(s(l.status,l.statusText)):B(d))},l.send(null)}function o(S){var F=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S||"");if(F){var B=Number(F[1]),l=F[2],c=F[3];return l?c?[B,Number(c)]:[B,void 0]:[B,B]}}t.hooks.add("before-highlightall",function(S){S.selector+=", "+L}),t.hooks.add("before-sanity-check",function(S){var F=S.element;if(F.matches(L)){S.code="",F.setAttribute(i,g);var B=F.appendChild(document.createElement("CODE"));B.textContent=a;var l=F.getAttribute("data-src"),c=S.language;if(c==="none"){var p=(/\.(\w+)$/.exec(l)||[,"none"])[1];c=r[p]||p}t.util.setLanguage(B,c),t.util.setLanguage(F,c);var h=t.plugins.autoloader;h&&h.loadLanguages(c),b(l,function(u){F.setAttribute(i,v);var w=o(F.getAttribute("data-range"));if(w){var T=u.split(/\r\n?|\n/g),y=w[0],I=w[1]==null?T.length:w[1];y<0&&(y+=T.length),y=Math.max(0,Math.min(y-1,T.length)),I<0&&(I+=T.length),I=Math.max(0,Math.min(I,T.length)),u=T.slice(y,I).join(`
`),F.hasAttribute("data-start")||F.setAttribute("data-start",String(y+1))}B.textContent=u,t.highlightElement(B)},function(u){F.setAttribute(i,m),B.textContent=u})}}),t.plugins.fileHighlight={highlight:function(F){for(var B=(F||document).querySelectorAll(L),l=0,c;c=B[l++];)t.highlightElement(c)}};var A=!1;t.fileHighlight=function(){A||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),A=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(it)),it.exports}var Bs=Ms();const nn=qs(Bs);var sn={},an;function Is(){return an||(an=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),sn}Is();function Ps(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((s,d)=>{const r=d+1,g=nn.highlight(s,nn.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${g}</span></div>`}).join("")}</code></pre></div>`}function rn(e){const n=e.match(/^[Qq]0*(\d+)$/);return n?n[1]:e}function on(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),s=String(n.getHours()).padStart(2,"0"),d=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${s}:${d}`}function se(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const cn=200,ln=1600,dn=300,Hs=1800;let Fe=0,be=0,pn=!1;function Ds(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let ze="#/overview";function _s(e,n){return n<=3?Array.from({length:n},(t,a)=>a):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function je(){Fe+=1,be&&(window.clearTimeout(be),be=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function Rs(){pn||(pn=!0,window.addEventListener("hashchange",je))}function js(e,n){const t=n.getBoundingClientRect(),a=t.left+t.width/2,s=e.offsetWidth,d=e.offsetHeight,r=1,i=6,g=40,v=8,m=document.documentElement.clientWidth;let L=a+r+g+i,b=L-s;b<v&&(b=v,L=b+s),L>m-v&&(L=m-v,b=Math.max(v,L-s),L=b+s);let o=L-r-i-a;const A=12,S=Math.max(A,s-r*2-12-A);o<A&&(o=A),o>S&&(o=S),e.style.right=`${Math.round(m-L)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-d)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(o)}px`)}function Os(e,n){if(n!==Fe||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(s=>s.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:dn,easing:"ease",fill:"forwards"}),a=()=>{n===Fe&&e.remove()};t.onfinish=a,window.setTimeout(a,dn+60)}function ct(e,n,t,a){be&&window.clearTimeout(be),be=window.setTimeout(()=>{if(be=0,!(n!==Fe||!e.isConnected)){if(!a){e.remove();return}Os(e,n)}},t)}function Ws(e=ze){var i;const n=document.getElementById("q-next-btn");if(!n)return;ze=e,Fe+=1;const t=Fe;be&&(window.clearTimeout(be),be=0);const a=Ds();let s=document.querySelector(".finish-tip");const d=!!s;if(s?document.querySelectorAll(".finish-tip").forEach(g=>{g!==s&&g.remove()}):(s=document.createElement("div"),s.className="finish-tip tip-bubble",s.setAttribute("data-testid","tip-bubble"),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(s),(i=s.querySelector(".finish-tip-tag"))==null||i.addEventListener("click",g=>{g.stopPropagation(),je(),Q(ze)})),js(s,n),a){s.getAnimations().forEach(g=>g.cancel()),s.style.opacity="1",s.style.transform="none",ct(s,t,Hs,!1);return}if(d){s.getAnimations().forEach(g=>g.cancel()),s.style.opacity="1",s.style.transform="translateY(0)",ct(s,t,ln,!0);return}const r=s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:cn,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==Fe||!s.isConnected||(s.style.opacity="1",s.style.transform="translateY(0)")},ct(s,t,cn+ln,!0)}function un(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${se(t)}</code>`)}function Us(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,s="";n!==-1&&(a=e.slice(0,n).trim(),s=e.slice(n+t).trim(),s=s.replace(/^[：:\s]+/,""));const d=a.split(/\n+/).map(i=>i.trim()).filter(Boolean).map(i=>`<p class="explanation-p">${un(i)}</p>`).join("");let r="";if(s){const i=un(s);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Sn(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${i}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${d}
      ${r}
    </div>
  `}function Me(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function Ns(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),a=n.querySelector(".code-header");if(!t)return;const s=()=>{const d=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",d),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${a?a.offsetHeight:0}px`),s(),t.addEventListener("scroll",s,{passive:!0})})}function gn(e,n,t,a="topic",s={}){Rs(),je(),ce();const d=a==="daily"||a==="wrong"?a:"topic",r=n.find(C=>C.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Be(Kt(d,!1));return}if(d==="wrong"&&!s.endCard&&!X(Le(r.id))){window.location.replace(`#/q/${r.id}?from=topic`);return}s.endCard||Zn(r.id);const i=Qe(n,r.id),g=(i==null?void 0:i.topic)||le(n)[0],v=i?i.indexInTopic:0,m=g.questions.length,L=Le(r.id);g.questions.filter(C=>X(V()[C.id])).length;const b=!!s.retry&&d==="topic",o={from:d,sec:s.sec,retry:b,prevChoice:L==null?void 0:L.choice,selectedChoice:d==="wrong"||b?null:L?L.choice:null,isRedoing:b,wrongFresh:d==="wrong",showLastTrace:!1,showEndCard:!!s.endCard&&d!=="daily",justRemovedWrong:!1},A=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let S=0,F=null,B=!1;const l='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',c='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function p(C){return/Error|Exception/.test(C)}function h(C,E,$,f){return E!=="graded"?$===C?"selected":"idle":r.answer&&C===r.answer?"correct":$===C&&(f==null?void 0:f.result)==="wrong"?"wrong":"locked"}function u(C,E,$){const f=C.querySelector(".opt-badge"),M=C.querySelector(".opt-text"),x=C.querySelector(".opt-status");if(!f||!M||!x)return;const k=C.getAttribute("data-error")==="1";C.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),f.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),M.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),C.setAttribute("aria-checked",$?"true":"false"),E==="correct"?C.setAttribute("data-state","correct"):E==="wrong"?C.setAttribute("data-state","wrong"):C.removeAttribute("data-state"),E==="selected"||E==="correct"?(C.classList.add(E==="correct"?"opt-card-correct":"opt-card-selected"),E==="selected"&&C.classList.add("opt-pressable"),f.classList.add(E==="correct"?"opt-badge-correct":"opt-badge-selected"),M.classList.add("opt-text-strong"),x.innerHTML=l):E==="wrong"?(C.classList.add("opt-card-wrong"),f.classList.add("opt-badge-wrong"),M.classList.add("opt-text-strong","opt-text-wrong"),x.innerHTML=c):E==="locked"?(C.classList.add("opt-card-locked"),f.classList.add("opt-badge-default"),k&&M.classList.add("opt-text-error"),x.innerHTML=""):(C.classList.add("opt-card-default","opt-pressable"),f.classList.add("opt-badge-default"),k&&M.classList.add("opt-text-error"),x.innerHTML="")}function w(C,E,$,f){const M=p(C.text),x=["option-item"],k=["opt-badge"],P=["opt-text"];let O="",R="";E==="selected"?(x.push("opt-card-selected","opt-pressable"),k.push("opt-badge-selected"),P.push("opt-text-strong"),O=l):E==="correct"?(x.push("opt-card-correct"),k.push("opt-badge-correct"),P.push("opt-text-strong"),O=l,R='data-state="correct"'):E==="wrong"?(x.push("opt-card-wrong"),k.push("opt-badge-wrong"),P.push("opt-text-strong","opt-text-wrong"),O=c,R='data-state="wrong"'):E==="locked"?(x.push("opt-card-locked"),k.push("opt-badge-default"),M&&P.push("opt-text-error")):(x.push("opt-card-default","opt-pressable"),k.push("opt-badge-default"),M&&P.push("opt-text-error"));const j=(C.hint||"").trim(),K=f!=="none"&&j?`<div class="opt-hint-clip${f==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${se(C.key)}">${se(j)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${$?"true":"false"}"
            ${R}
            class="${x.join(" ")}"
            data-testid="option-${se(C.key)}"
            data-key="${se(C.key)}"
            data-error="${M?"1":"0"}"
          >
            <span class="${k.join(" ")}">${se(C.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${P.join(" ")}">${se(C.text)}</span>
                <span class="opt-status">${O}</span>
              </div>
              ${K}
            </div>
          </div>
        `}const T='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',y='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let I=0;function D(){var E;(E=document.getElementById("pydrill-wrong-toast"))==null||E.remove();const C=document.createElement("div");C.id="pydrill-wrong-toast",C.className="wrong-toast",C.setAttribute("role","status"),C.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(C),window.setTimeout(()=>{C.remove()},1500)}function N(){const C=e.querySelector("#q-toggle-last");if(!C)return;const E=o.showLastTrace;C.setAttribute("aria-pressed",E?"true":"false");const $=C.querySelector("span");$&&($.textContent=E?"隐藏上次":"看上次思路");const f=C.querySelector("svg");f&&(f.outerHTML=E?y:T)}function ee(C,E,$,f){const M=(E.hint||"").trim(),x=C.querySelector(".opt-body");if(!x)return;let k=C.querySelector(".opt-hint-clip");if($&&M){k||(k=document.createElement("div"),k.className="opt-hint-clip",k.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${se(E.key)}">${se(M)}</p></div>`,x.appendChild(k));const P=k;requestAnimationFrame(()=>{requestAnimationFrame(()=>{f===I&&P.classList.add("is-open")})})}else if(k){k.classList.remove("is-open");const P=k,O=f,R=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{O===I&&P.remove()},R?0:200)}}function de(C){const E=++I,$=Le(r.id),f=o.from==="topic"&&(o.prevChoice||($==null?void 0:$.choice))||_e($),M=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(k=>{const P=k.getAttribute("data-key")||"",O=r.options.find(ne=>ne.key===P);if(!C){const ne=o.selectedChoice===P;u(k,ne?"selected":"idle",ne),O&&ee(k,O,!1,E);return}const R=k.querySelector(".opt-badge"),j=k.querySelector(".opt-text"),K=k.querySelector(".opt-status");if(!R||!j||!K)return;const Ae=k.getAttribute("data-error")==="1",ge=!!f&&P===f,oe=!!M&&P===M;k.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),R.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),j.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),k.setAttribute("aria-checked","false"),k.removeAttribute("data-state"),ge&&!oe?(k.classList.add("opt-card-trace-last"),R.classList.add("opt-badge-trace-last"),j.classList.add("opt-text-strong","opt-text-trace-last")):oe?(k.classList.add("opt-card-trace-correct"),R.classList.add("opt-badge-trace-correct"),j.classList.add("opt-text-strong","opt-text-trace-correct")):(k.classList.add("opt-card-default","opt-card-trace-dim"),R.classList.add("opt-badge-default"),Ae&&j.classList.add("opt-text-error"));const ae=[];ge&&ae.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${se(P)}">上次选的 ${se(P)}</span>`),oe&&ae.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${se(P)}">正确答案 ${se(P)}</span>`),K.innerHTML=ae.length?`<span class="opt-trace-tag-row">${ae.join("")}</span>`:"",O&&ee(k,O,ge||oe,E)});const x=e.querySelector("#q-submit-btn");if(x){const k=C||!o.selectedChoice;x.disabled=k,x.classList.toggle("btn-disabled",k)}}function te(C){Be(Kt(o.from,o.showEndCard)),(C||o.showEndCard)&&ce()}function G(){var Ht,Dt,_t,Rt,jt,Ot,Wt,Ut,Nt,zt,Qt,Vt,Gt;je();const C=++S,E=F!==r.id;F=r.id;const $=Le(r.id),f=o.from==="topic"?!!(o.prevChoice||$!=null&&$.choice||_e($)):_e($).length>0,x=o.isRedoing||o.wrongFresh?void 0:$,k=!!x;k&&(o.showLastTrace=!1);const P=B&&k;B=!1;const O=o.sec!=null?`&sec=${o.sec}`:"",R=o.from==="topic"&&o.retry?"&retry=1":"";let j="#/topics";o.from==="daily"&&(j="#/"),o.from==="wrong"&&(j="#/wrong"),o.from==="topic"&&o.sec!=null&&(j=`#/topic/${g.index}`);const K=`#/overview?from=${o.from}&qid=${r.id}${o.from==="topic"?"&topic="+encodeURIComponent(g.name):""}${O}${R}`;ze=K;let Ae="题目总览";o.from==="daily"&&(Ae="今日一题");let ge=null,oe=null,ae=!1,ne=!1,Y=g.questions,fe=v;if(o.from==="wrong"){const q=V();Y=g.questions.filter(H=>X(q[H.id])),fe=Y.findIndex(H=>H.id===r.id)}else if(o.from==="topic"&&o.sec!=null){const H=yt(g.questions,g.index,g.name).find(_=>_.index===o.sec);H&&(Y=H.questions,fe=Y.findIndex(_=>_.id===r.id))}o.from==="daily"?(ne=!0,ae=!0,Y=[r],fe=0):fe<0?(ne=!0,ae=!0):(ne=fe===0,ae=fe>=Y.length-1,ne||(ge=Y[fe-1].id),ae||(oe=Y[fe+1].id));const qn=V(),Mn=Y.length>0&&Y.every(q=>Me(qn[q.id],o.from)),xt=ae&&!Mn,kt=fe>=0?fe+1:1,Ct=o.from==="wrong"?Math.max(Y.length,1):o.sec!=null?Y.length:m,Bn=o.from==="wrong"?`${g.name} · 温习 ${kt}/${Ct}`:o.from==="daily"?`今日一题 · ${g.name}`:o.sec!=null?`${g.name} · 第${o.sec}节 ${kt}/${Ct}`:`${g.name} · 第 ${v+1}/${m} 题`;if(o.showEndCard){if(o.from==="daily"){Q("#/");return}const q=o.from==="topic",H=V();let _="",W="",U="#/topics",Z="返回知识点列表",me="",qe="",ye="";if(q){if(o.sec!=null)_=`第 ${o.sec} 节做完了`,W=`这一节共 ${Y.length} 道题目，循序渐进掌握每一个知识点`,U=`#/topic/${g.index}`,Z="返回小节列表",ye="",qe="";else{let z=0;for(const J of g.questions)((Ht=H[J.id])==null?void 0:Ht.result)==="wrong"&&z++;_="这个知识点做完了",z>0?(W=`今天发现 ${z} 道需要巩固的题`,ye=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):W="这一组你已经完全掌握了",U="#/topics",Z="返回知识点列表";const we=le(n),Ce=we.findIndex(J=>J.name===g.name),ie=Ce!==-1&&Ce<we.length-1?we[Ce+1]:null;ie&&ie.questions.length>0&&(qe=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}me=`
          <div class="end-questions-list">
            ${(o.sec!=null?Y:g.questions).map((z,we)=>{const Ce=we+1,ie=H[z.id],J=(ie==null?void 0:ie.result)==="correct",re=(ie==null?void 0:ie.result)==="wrong";let Se="end-chip-gray",pe="· 未做";J?(Se="end-chip-green",pe="✓ 已完成"):re&&(Se="end-chip-red",pe="待巩固");const Je=rn(z.title&&z.title.trim()?z.title.trim():z.code?z.code.split(`
`)[0].trim():z.stem);return`
              <a href="${`#/q/${z.id}?from=topic${O}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${Ce} 题</span>
                  <span class="end-q-code">${se(Je)}</span>
                </div>
                <span class="end-chip ${Se}">${pe}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const he=g.questions.filter(J=>X(H[J.id])),$e=he.length,z=he.filter(J=>{var re;return((re=H[J.id])==null?void 0:re.result)==="correct"}).length;_="温习本这一轮看完了",z>0?W=`好样的！你已经纠正了 ${z} 道之前做错的题。`:W="再练一轮，会越来越熟。",U="#/wrong",Z="返回温习本",$e>0?me=`
            <div class="end-questions-list">
              ${he.map((re,Se)=>{const pe=H[re.id],Je=(pe==null?void 0:pe.result)==="correct",Yt=(pe==null?void 0:pe.result)==="wrong";let Xe="end-chip-gray",et="· 未做";Je?(Xe="end-chip-green",et="✓ 答对"):Yt&&(Xe="end-chip-red",et="待巩固");const Wn=rn(re.title&&re.title.trim()?re.title.trim():re.code?re.code.split(`
`)[0].trim():re.stem);return`
                <a href="#/q/${re.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${Se+1}/${$e}</span>
                    <span class="end-q-code">${se(Wn)}</span>
                  </div>
                  <span class="end-chip ${Xe}">${et}</span>
                </a>
              `}).join("")}
            </div>
          `:me=`
            <div class="end-empty-row">
              ${hs(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const we=le(n),Ce=we.findIndex(J=>J.name===g.name);let ie=null;if(Ce!==-1)for(let J=1;J<we.length;J++){const Se=we[(Ce+J)%we.length].questions.find(pe=>X(H[pe.id]));if(Se){ie=Se.id;break}}ie&&(qe=`
            <a
              href="#/q/${ie}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const De=o.from==="wrong"?"温习本 · 完成":`${g.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${A}">
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
                <img src="${Ne}" alt="小芽啾欢呼" class="end-mascot-img" />
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
                  ${Z}
                </button>
                ${qe}
              </div>
            </div>
          </main>
        </div>
      `,(Dt=document.getElementById("q-back-btn"))==null||Dt.addEventListener("click",()=>{Q(j)}),(_t=document.getElementById("end-leave-btn"))==null||_t.addEventListener("click",()=>{Q(U)}),(Rt=document.getElementById("end-next-topic-btn"))==null||Rt.addEventListener("click",()=>{const he=le(n),$e=he.findIndex(z=>z.name===g.name);if($e!==-1&&$e<he.length-1){const z=he[$e+1];Q(`#/q/${z.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(he=>{he.addEventListener("click",$e=>{const z=he.getAttribute("href");z&&($e.preventDefault(),Q(z))})}),te(E);return}const We=k?P?"pending":"graded":"answering",In=We==="answering"?"none":We==="pending"?"closed":"open",St=We==="graded"?(x==null?void 0:x.choice)??null:o.selectedChoice,Pn=r.options.map(q=>w(q,h(q.key,We,St,x),St===q.key,In)).join("");let Lt="";if(k&&x){let q=Ne,H="答对了，理解到位";const _=on(x.submittedAt);let W=`你选了 ${x.choice} · 正确答案 ${r.answer} · ${_} 提交`,U="banner-correct",Z="",me="";x.result==="wrong"?(q=Oe,H="这题有个小坑，看看解析",W=`你选了 ${x.choice} · 正确答案是 ${r.answer} · ${_} 提交`,U="banner-wrong",x.inWrongBook&&(Z='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):x.result==="correct"?x.inWrongBook&&o.from!=="wrong"?me=`
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
          `):x.result==="ungraded"&&(q=Ne,H="已提交（未判分）",W=`这题的答案还没编写 · ${_} 提交`,U="banner-ungraded"),Lt=`
        <section class="result-banner ${U}" data-testid="result-banner" data-result="${x.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${q}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${H}</h2>
              <p class="result-sub">${W}</p>
              ${Z?`<div class="result-tag-wrap result-tag-below">${Z}</div>`:""}
            </div>
          </div>
          ${me}
        </section>
      `}let Et="";if(k&&x){const q=Us(r.explanation);Et=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Sn()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${q}
          </div>
        </section>
      `}let At="";r.animationId!=null&&k&&(At=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let Tt="";if(o.isRedoing&&o.from!=="wrong"){const q=Le(r.id);if(q){const H=q.result==="correct"?"已学习":q.result==="wrong"?"待巩固":"已提交",_=on(q.submittedAt);Tt=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${H}（选 ${q.choice} · ${_}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Ft=o.from==="wrong"||o.sec!=null?Y:g.questions,Hn=o.from!=="wrong"||k,Dn=Ft.length,_n=_s(Math.max(0,fe),Dn).map(q=>{const H=Ft[q],_=q+1,W=H.id===r.id,U=Le(H.id),Z=Hn&&Me(U,o.from),me=Z&&(U==null?void 0:U.result)==="correct",qe=Z&&(U==null?void 0:U.result)==="wrong";let ye="switcher-unanswered",De=`<span>${_}</span>`;return me?(ye="switcher-correct",De=ds()):qe&&(ye="switcher-wrong",De=ps()),W&&(ye+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${ye} active-press"
            data-testid="q-switch-${_}"
            data-qid="${H.id}"
            title="第 ${_} 题"
          >
            ${De}
          </button>
        `}).join(""),Rn=k?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${gs(14)}
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
    `,Mt=ae?"完成":"下一题 ›",Bt=ae?' data-action="finish"':"",It=xt?" btn-finish-locked":"",Pt=xt?' aria-disabled="true"':"",jn=`
      <button
        type="button"
        class="btn-nav-next active-press${It}"
        data-testid="next"
        id="q-next-btn"${Bt}${Pt}
      >
        <span>${Mt}</span>
      </button>
    `,On=`
      <button
        type="button"
        class="btn-next-main active-press${It}"
        data-testid="next"
        id="q-next-btn"${Bt}${Pt}
      >
        <span>${Mt}</span>
      </button>
    `;let Ze="";if(k)Ze=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${qt}
            ${Rn}
            ${On}
          </div>
        </div>
      `;else{const q=!!o.selectedChoice;Ze=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${qt}
            <button
              type="button"
              class="btn-submit-main active-press ${q?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${q?"":"disabled"}
            >
              <span>${q?"提交答案":"提交"}</span>
            </button>
            ${jn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${A}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${ft()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${Bn}</span>
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
            ${o.from==="wrong"||o.from==="topic"&&(o.retry||o.isRedoing)?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${o.showLastTrace?"true":"false"}" ${f?"":"disabled"}>
                    ${o.showLastTrace?y:T}
                    <span>${o.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${_n}
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
          ${r.code?Ps(r.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Pn}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${Et}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${At}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ze}
      </div>
    `,(jt=document.getElementById("q-back-btn"))==null||jt.addEventListener("click",()=>{Q(j)}),(Ot=document.getElementById("q-overview-chip"))==null||Ot.addEventListener("click",()=>{Q(K)}),k)(Ut=document.getElementById("q-redo-btn"))==null||Ut.addEventListener("click",()=>{var q;o.isRedoing=!0,o.prevChoice=(q=Le(r.id))==null?void 0:q.choice,o.selectedChoice=null,o.showLastTrace=!1,o.justRemovedWrong=!1,G()}),o.from!=="wrong"&&((Nt=document.getElementById("q-remove-wrong-btn"))==null||Nt.addEventListener("click",()=>{Zt(r.id),o.justRemovedWrong=!0,G()}));else{const q=e.querySelectorAll(".option-item");q.forEach(H=>{H.addEventListener("click",()=>{if(o.showLastTrace)return;const _=H.getAttribute("data-key");if(!_||_===o.selectedChoice)return;o.selectedChoice=_,q.forEach(U=>{const Z=U.getAttribute("data-key")===_;u(U,Z?"selected":"idle",Z)});const W=e.querySelector("#q-submit-btn");if(W){W.disabled=!1,W.classList.remove("btn-disabled");const U=W.querySelector("span");U&&(U.textContent="提交答案")}})}),(Wt=document.getElementById("q-submit-btn"))==null||Wt.addEventListener("click",()=>{!o.selectedChoice||o.showLastTrace||(Gn(r,o.selectedChoice),o.isRedoing=!1,o.retry=!1,o.wrongFresh=!1,o.showLastTrace=!1,o.justRemovedWrong=!1,B=!0,G())})}o.from==="wrong"&&((zt=document.getElementById("q-remove-wrong-btn"))==null||zt.addEventListener("click",()=>{const q=r.id;Zt(q),D();const H=V(),_=g.questions.find(W=>W.id===q||!X(H[W.id])?!1:g.questions.findIndex(U=>U.id===W.id)>v);Q(_?`#/q/${_.id}?from=wrong`:"#/wrong")})),(Qt=document.getElementById("q-toggle-last"))==null||Qt.addEventListener("click",()=>{const q=e.querySelector("#q-toggle-last");if(!(!q||q.disabled)){if(o.showLastTrace=!o.showLastTrace,k&&!o.showLastTrace){G();return}N(),de(o.showLastTrace)}}),(Vt=document.getElementById("q-prev-btn"))==null||Vt.addEventListener("click",()=>{ge&&Q(`#/q/${ge}?from=${o.from}${O}${R}`)}),(Gt=document.getElementById("q-next-btn"))==null||Gt.addEventListener("click",()=>{if(oe){Q(`#/q/${oe}?from=${o.from}${O}${R}`);return}const q=V();if(!(Y.length>0&&Y.every(W=>Me(q[W.id],o.from)))){Ws(K);return}if(o.from==="daily"){Q("#/");return}const _=o.from==="wrong"?"wrong":"topic";je(),window.history.replaceState(null,"",j),window.location.hash=`#/done/${_}/${g.index}${o.sec!=null?"?sec="+o.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(q=>{q.addEventListener("click",()=>{const H=q.getAttribute("data-qid");H&&H!==r.id&&Q(`#/q/${H}?from=${o.from}${O}${R}`)})});const He=e.querySelector(".q-switcher-group"),Ke=e.querySelector(".switcher-current");if(He&&Ke){const q=Ke.getBoundingClientRect().left-He.getBoundingClientRect().left,H=He.scrollLeft+q-(He.clientWidth-Ke.offsetWidth)/2;He.scrollLeft=Math.max(0,H)}if(P&&x){const q=x;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(C!==S||!e.isConnected)return;const H=e.querySelector("[data-view-token]");!H||H.getAttribute("data-view-token")!==A||e.querySelectorAll(".option-item").forEach(_=>{var Z;const W=_.getAttribute("data-key")||"",U=q.choice===W;u(_,h(W,"graded",q.choice,q),U),(Z=_.querySelector(".opt-hint-clip"))==null||Z.classList.add("is-open")})})})}Ns(e),te(E)}G()}function Te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function zs(e){const n=e.title||e.summary;if(n&&n.trim()){const s=n.trim(),d=s.match(/^[Qq]0*(\d+)$/);return d?d[1]:s}const t=(e.stem||"").split(`
`)[0].trim();if(t.length>20)return t.slice(0,18)+"…";const a=t.match(/^[Qq]0*(\d+)$/);return a?a[1]:t||"单选题"}function Qs(e,n,t){var de,te,G,C,E;ce(),Be(10);const a=t.from==="daily"||t.from==="wrong"?t.from:"topic",s=t.qid,d=t.topic?decodeURIComponent(t.topic):"";if(!s&&!d&&!t.from){window.location.replace("#/");return}let r=s?n.find($=>$.id===s):void 0;if(!r){const $=xn(n);r=$?n.find(f=>f.id===$.id):n[0]}const i=le(n);let g=d?i.find($=>$.name===d):r?(de=Qe(n,r.id))==null?void 0:de.topic:i[0];g||(g=i[0]);const v=V();if(a==="wrong"&&!g.questions.some($=>X(v[$.id]))){const $=i.find(f=>f.questions.some(M=>X(v[M.id])));if(!$){window.location.replace("#/wrong");return}g=$,(!r||!X(v[r.id]))&&(r=$.questions.find(f=>X(v[f.id])))}const m=t.sec?parseInt(t.sec,10):void 0,L=m!=null?`&sec=${m}`:"";let b=g.questions,o=g.name;if(a==="daily")b=r?[r]:[n[0]],o="今日一题";else if(a==="wrong"){const $=g.questions.filter(f=>X(v[f.id]));$.length>0&&(b=$)}else if(a==="topic"&&m!=null){const f=yt(g.questions,g.index,g.name).find(M=>M.index===m);f&&(b=f.questions,o=`${g.name} · 第${m}节`)}const A=b.length;let S=0,F=0,B=0;for(const $ of b){const f=v[$.id];f&&Me(f,a)&&(S++,f.result==="correct"?F++:f.result==="wrong"&&B++)}const l=Math.max(0,A-S),c=94.25,p=A>0?(F/A*c).toFixed(2):"0",h=A>0?(B/A*c).toFixed(2):"0",u=`-${p}`,w=(r==null?void 0:r.id)||(b[0]?b[0].id:""),T=t.retry?`&retry=${t.retry}`:"",y=`#/q/${w}?from=${a}${L}${T}`,I=b.find($=>!Me(v[$.id],a)),D=I||r||b[0],N=b.indexOf(D)+1,ee=b.map(($,f)=>{const M=f+1,x=v[$.id],k=Me(x,a),P=k&&(x==null?void 0:x.result)==="correct",O=k&&(x==null?void 0:x.result)==="wrong",R=$.id===w,j=zs($),K=$.topic;return P?`
          <button
            class="overview-card overview-card-correct ${R?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${$.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">${M}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已学习
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${Te(j)}</span>
              <span class="overview-card-tag tag-correct">${Te(K)}</span>
            </div>
          </button>
        `:O?`
          <button
            class="overview-card overview-card-wrong ${R?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${$.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">${M}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${Te(j)}</span>
              <span class="overview-card-tag tag-wrong">${Te(K)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${R?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${$.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">${M}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${Te(j)}</span>
              <span class="overview-card-tag tag-unanswered">${Te(K)}</span>
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
          <p class="overview-page-sub">共 ${A} 题 · 知识点强化</p>
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
              ${parseFloat(h)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${h} ${c}" stroke-dashoffset="${u}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${S}/${A}</span>
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
                <span class="overview-legend-num">${F} 题</span>
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
            <span class="overview-grid-count-chip">${A} 题</span>
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
            <span>${I?`继续第 ${N} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(te=document.getElementById("overview-back-btn"))==null||te.addEventListener("click",()=>{Q(y)}),(G=document.getElementById("overview-return-btn"))==null||G.addEventListener("click",()=>{Q(y)}),(C=document.getElementById("overview-dock-left"))==null||C.addEventListener("click",()=>{Q(y)}),(E=document.getElementById("overview-dock-right"))==null||E.addEventListener("click",()=>{Q(`#/q/${D.id}?from=${a}${L}${T}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach($=>{$.addEventListener("click",()=>{const f=$.getAttribute("data-qid");f&&Q(`#/q/${f}?from=${a}${L}${T}`)})})}function Pe(e,n,t){return Math.max(n,Math.min(t,e))}function Vs(e){if(e.length<3)return 0;let n=0;for(let t=0;t<e.length;t++){const a=e[t],s=e[(t+1)%e.length];n+=a.x*s.y-s.x*a.y}return Math.abs(n)/2}function fn(e,n,t){if(e.length===0)return[];const a=[],s=e.length,d=r=>(r.x-n.x)*t.x+(r.y-n.y)*t.y>=-1e-9;for(let r=0;r<s;r++){const i=e[r],g=e[(r+s-1)%s],v=d(i),m=d(g);if(v!==m){const L=i.x-g.x,b=i.y-g.y,o=L*t.x+b*t.y,A=Math.abs(o)<1e-12?0:((n.x-g.x)*t.x+(n.y-g.y)*t.y)/o;a.push({x:g.x+Pe(A,0,1)*L,y:g.y+Pe(A,0,1)*b})}v&&a.push(i)}return a}function hn(e,n){return[{x:0,y:0},{x:e,y:0},{x:e,y:n},{x:0,y:n}]}function Gs(e,n,t,a){const s=Pe(t,0,1);if(e<=0||n<=0||s<=1e-6)return[];if(s>=1-1e-6)return hn(e,n);const d=Pe(a,-80,80)*Math.PI/180,r=Math.sin(d),i=Math.cos(d),g=hn(e,n),v=g.map(S=>S.x*r+S.y*i);let m=Math.min(...v),L=Math.max(...v);const b=s*e*n;for(let S=0;S<40;S++){const F=(m+L)/2,B={x:F*r,y:F*i},c=fn(g,B,{x:r,y:i});Vs(c)>b?m=F:L=F}const o=(m+L)/2,A={x:o*r,y:o*i};return fn(g,A,{x:r,y:i})}function Ys(e,n,t,a){const s=Gs(e,n,t,a);return s.length<3?"polygon(0% 0%, 0% 0%, 0% 0%)":`polygon(${s.map(r=>{const i=Pe(r.x/e*100,-2,102),g=Pe(r.y/n*100,-2,102);return`${i.toFixed(2)}% ${g.toFixed(2)}%`}).join(", ")})`}const Zs={"字符串/循环":40,"元组/引用":25,"函数/默认参数":0,"列表/切片":50,字典:0,"作用域/变量":25,"类/对象":0,异常处理:0};let ke=null;function lt(e,n,t){return Math.max(n,Math.min(t,e))}function Ks(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Js(e,n){var $;ke==null||ke(),ke=null;const t=V(),s=le(n).map((f,M)=>{const x=f.questions.filter(j=>!!t[j.id]).length,k=f.questions.length,P=k>0?x/k*100:0,O=Zs[f.name]??Math.round(P),R=$t(f.name);return`
        <article
          class="bottle-card"
          data-testid="water-bottle-${M}"
          data-topic-index="${M}"
          data-real-pct="${P.toFixed(2)}"
          data-demo-pct="${O}"
          data-submitted="${x}"
          data-total="${k}"
          style="--water-color: ${R};"
        >
          <div class="bottle-vessel" data-testid="water-vessel-${M}">
            <div class="bottle-water" aria-hidden="true">
              <div class="bottle-water-inner" data-testid="water-fill-${M}"></div>
            </div>
          </div>
          <div class="bottle-content">
            <div class="bottle-icon">${bt(f.name)}</div>
            <div class="bottle-text">
              <div class="bottle-name-row">
                <span class="bottle-name">${Ks(f.name)}</span>
                <span class="bottle-index">#${String(M+1).padStart(2,"0")}</span>
              </div>
              <div class="bottle-meta" data-testid="water-meta-${M}">
                已提交 ${x} / ${k} 题
              </div>
            </div>
            <span class="bottle-pill" data-testid="water-pill-${M}">${x}/${k}</span>
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
          <span>模拟左右倾斜（− 左低 / + 右低）</span>
          <div class="row">
            <input
              type="range"
              id="water-tilt-slider"
              data-testid="water-tilt-slider"
              min="-35"
              max="35"
              value="0"
              step="0.5"
            />
            <span class="val" id="water-tilt-val">0°</span>
          </div>
        </label>
        <label class="water-lab-toggle">
          <input type="checkbox" id="water-demo-fills" data-testid="water-demo-fills" checked />
          <span>演示水量（Stitch 样例，便于看出晃动）</span>
        </label>
        <p class="water-lab-hint" id="water-sensor-hint" data-mode="sim" data-testid="water-sensor-hint">
          桌面：拖滑杆。手机：授权后倾斜。水面始终相对地面水平。
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
  `,Be(99);const d=Array.from(e.querySelectorAll(".bottle-card")),r=e.querySelector("#water-tilt-slider"),i=e.querySelector("#water-tilt-val"),g=e.querySelector("#water-demo-fills"),v=e.querySelector("#water-sensor-hint"),m=e.querySelector(".water-lab-list");let L=0,b=0,o=!!(g!=null&&g.checked),A=0,S=!1,F=0,B=0;const l=f=>{const M=Number(o?f.dataset.demoPct||0:f.dataset.realPct||0);return lt(M/100,0,1)},c=(f,M)=>{const x=f.querySelector(".bottle-vessel"),k=f.querySelector(".bottle-water-inner");if(!k||!x)return;f.style.removeProperty("--bottle-tilt"),x.style.transform="none",k.style.transform="none";const P=x.clientWidth||f.clientWidth||320,O=x.clientHeight||66,R=l(f),j=Ys(P,O,R,M);k.style.clipPath=j,k.style.setProperty("-webkit-clip-path",j),f.dataset.tilt=M.toFixed(2),f.dataset.fill=(R*100).toFixed(1),k.dataset.clip=j},p=()=>{d.forEach(f=>c(f,b)),i&&(i.textContent=`${Math.round(b)}°`),r&&!S&&document.activeElement!==r&&(r.value=String(b))},h=()=>{b+=(L-b)*.22,Math.abs(L-b)<.04&&(b=L),p(),A=requestAnimationFrame(h)};A=requestAnimationFrame(h),requestAnimationFrame(()=>p());const u=f=>{L=lt(f,-35,35),v&&(v.dataset.mode="sim",v.textContent=L<-1?"左倾：左侧更低，水堆到左边。":L>1?"右倾：右侧更低，水堆到右边。":"水平：水面水平，水在底部。")},w=()=>{r&&u(Number(r.value))};r==null||r.addEventListener("input",w);const T=()=>{o=!!(g!=null&&g.checked),p()};g==null||g.addEventListener("change",T);const y=f=>{var M;m&&(S=!0,F=f.clientX,B=L,(M=m.setPointerCapture)==null||M.call(m,f.pointerId))},I=f=>{!S||!m||u(B+(f.clientX-F)/4)},D=f=>{var M;S&&(S=!1,(M=m==null?void 0:m.releasePointerCapture)==null||M.call(m,f.pointerId))};m==null||m.addEventListener("pointerdown",y),m==null||m.addEventListener("pointermove",I),m==null||m.addEventListener("pointerup",D),m==null||m.addEventListener("pointercancel",D);const N=f=>{f.key==="ArrowLeft"?(f.preventDefault(),u(L-3)):f.key==="ArrowRight"?(f.preventDefault(),u(L+3)):(f.key==="0"||f.key==="Home")&&u(0)};window.addEventListener("keydown",N);const ee=f=>{f.gamma!=null&&(L=lt(f.gamma*.9,-35,35),v&&(v.dataset.mode="gyro",v.textContent="陀螺仪：水面相对地面水平，水往低端流。"))};let de=!1;const te=()=>{de||(window.addEventListener("deviceorientation",ee),de=!0)},G=async()=>{const f=DeviceOrientationEvent;if(typeof f.requestPermission=="function")try{await f.requestPermission()==="granted"?(te(),v&&(v.dataset.mode="gyro",v.textContent="运动权限已开，请倾斜手机。")):v&&(v.dataset.mode="sim",v.textContent="未获得运动权限，请用滑杆模拟。")}catch{v&&(v.dataset.mode="sim",v.textContent="无法请求运动权限，请用滑杆模拟。")}else te()};if(!(typeof DeviceOrientationEvent.requestPermission=="function"))te();else{const f=document.createElement("button");f.type="button",f.className="water-lab-back",f.style.marginTop="4px",f.textContent="开启手机倾斜",f.setAttribute("data-testid","water-enable-gyro"),f.addEventListener("click",()=>{G(),f.remove()}),($=e.querySelector(".water-lab-controls"))==null||$.appendChild(f)}const E=()=>p();window.addEventListener("resize",E),ke=()=>{cancelAnimationFrame(A),r==null||r.removeEventListener("input",w),g==null||g.removeEventListener("change",T),m==null||m.removeEventListener("pointerdown",y),m==null||m.removeEventListener("pointermove",I),m==null||m.removeEventListener("pointerup",D),m==null||m.removeEventListener("pointercancel",D),window.removeEventListener("keydown",N),window.removeEventListener("resize",E),de&&window.removeEventListener("deviceorientation",ee)}}function Tn(){ke==null||ke(),ke=null}const ve=document.getElementById("app");let ue=[],dt=!1;function Ee(){Tn();const{path:e}=Ve();if(e==="/"||e==="")ve.innerHTML=ys(ue);else if(e==="/topics")ve.innerHTML=ks(ue);else if(e.startsWith("/topic/")){const t=e.slice(7);ve.innerHTML=Cs(ue,t)}else if(e==="/wrong"){ve.innerHTML=As(ue);const t=ve.querySelector('[data-testid="wrong-start"]');t==null||t.addEventListener("click",a=>{if(a.preventDefault(),dt)return;dt=!0,setTimeout(()=>{dt=!1},300);const s=Es(ue);s&&(location.hash=`#/q/${s}?from=wrong`)})}else e==="/me"&&(ve.innerHTML=Fs(ue,Ee));const n=Cn(e);n!=null&&Be(n)}async function Fn(){var n;$n();try{ue=await Un()}catch{ve.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Fn()});return}xe("/",()=>{ce(),Ee()}),xe("/topics",()=>{ce(),Ee()}),xe("/wrong",()=>{ce(),Ee()}),xe("/me",()=>{ce(),Ee()}),xe("/topic/:topicIndex",()=>{ce(),Ee()}),xe("/q/:id",(t,a)=>{ce();const s=t.id,d=a.from||"topic",r=a.sec?parseInt(a.sec,10):void 0,i=a.retry==="1"||a.retry==="true";gn(ve,ue,s,d,{sec:r,retry:i})}),xe("/done/:kind/:topicIndex",(t,a)=>{ce();const d=le(ue)[Number(t.topicIndex)];if(!d||!d.questions.length){Q("#/");return}const r=t.kind==="wrong"?"wrong":"topic",i=a.sec?parseInt(a.sec,10):void 0,g=r==="topic"?d.questions[d.questions.length-1].id:d.questions[0].id;gn(ve,ue,g,r,{endCard:!0,sec:i})}),xe("/overview",(t,a)=>{ce(),Qs(ve,ue,a)}),xe("/lab/water",()=>{ce(),Tn(),Js(ve,ue)}),Nn(()=>{Q("#/")}),Qn(()=>{const{path:t}=Ve();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ee()});const e=()=>{const{path:t}=Ve();(t==="/"||t==="")&&Ee()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),zn()}Fn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
