(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const u of a)if(u.type==="childList")for(const r of u.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const u={};return a.integrity&&(u.integrity=a.integrity),a.referrerPolicy&&(u.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?u.credentials="include":a.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(a){if(a.ep)return;a.ep=!0;const u=t(a);fetch(a.href,u)}})();let Xe=null;async function Dn(e=!1){if(Xe&&!e)return Xe;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return Xe=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function le(e){const n=new Map;for(const a of e)n.has(a.topic)||n.set(a.topic,[]),n.get(a.topic).push(a);const t=[];let s=0;for(const[a,u]of n.entries())t.push({name:a,index:s,questions:u}),s++;return t}function Ne(e,n){const t=le(e);for(const s of t){const a=s.questions.findIndex(u=>u.id===n);if(a!==-1)return{topic:s,indexInTopic:a}}return null}const ln=[];let dn=()=>{};function Ce(e,n){const t=[],s=e.replace(/:([a-zA-Z0-9_]+)/g,(u,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),a=new RegExp(`^${s}$`);ln.push({regex:a,paramNames:t,handler:n})}function Pn(e){dn=e}function ce(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function Q(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?ct():window.location.hash=n}function Qe(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),s=n.startsWith("/")?n:"/"+n,a={};return t&&new URLSearchParams(t).forEach((r,l)=>{a[l]=r}),{path:s,query:a}}function ct(){ce();const{path:e,query:n}=Qe();for(const t of ln){const s=e.match(t.regex);if(s){const a={};t.paramNames.forEach((u,r)=>{a[u]=s[r+1]?decodeURIComponent(s[r+1]):""}),t.handler(a,n);return}}dn({},n)}function Rn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",ct),ct()}const ze="pydrill.v1.records",gt="pydrill.v1.last",ht="pydrill.days",lt=new Set;function jn(e){return lt.add(e),()=>{lt.delete(e)}}function pn(){for(const e of lt)try{e()}catch(n){console.error("Error in store listener:",n)}}function K(e){if(!e||!e.inWrongBook)return!1;const n=typeof e.choice=="string"&&e.choice.length>0,t=e.result==="wrong"||e.result==="correct";return n&&t}function On(e){let n=!1;for(const t of Object.keys(e)){const s=e[t];if(s&&s.inWrongBook){const a=typeof s.choice=="string"&&s.choice.length>0,u=s.result==="wrong"||s.result==="correct";(!a||!u)&&(s.inWrongBook=!1,n=!0)}}return n}function V(){try{const e=localStorage.getItem(ze);if(!e)return{};const n=JSON.parse(e);if(typeof n!="object"||n===null)return{};const t=n;if(On(t))try{localStorage.setItem(ze,JSON.stringify(t))}catch(s){console.error("Failed to save sanitized records to localStorage:",s)}return t}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Se(e){return V()[e]}function He(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function un(e){try{localStorage.setItem(ze,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}pn()}function _e(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${s}`}function gn(){try{const e=localStorage.getItem(ht);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function hn(e){const n=_e(),t=gn();if(!t.includes(n)){t.push(n);try{localStorage.setItem(ht,JSON.stringify(t))}catch(s){console.error("Failed to save active days to localStorage:",s)}}}function Wn(e,n){hn();const t=V(),s=t[e.id],a=K(s);let u,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(u="correct",r=a):(u="wrong",r=!0):(u="ungraded",r=!1);const h=a&&(u==="correct"||u==="wrong"),w={choice:n,result:u,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:h};if(u==="wrong")w.lastWrongChoice=n,w.lastWrongAt=w.submittedAt;else{const F=He(s);F&&(w.lastWrongChoice=F,typeof(s==null?void 0:s.lastWrongAt)=="number"?w.lastWrongAt=s.lastWrongAt:(s==null?void 0:s.result)==="wrong"&&(w.lastWrongAt=s.submittedAt))}return t[e.id]=w,un(t),w}function Nt(e){const n=V();n[e]&&(n[e]={...n[e],inWrongBook:!1},un(n))}function Un(){try{localStorage.removeItem(ze)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(gt)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(ht)}catch(e){console.error("Failed to clear active days:",e)}pn()}function fn(e){try{const n=localStorage.getItem(gt);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const s=t.id,a=t.at;return typeof s!="string"||s.length===0||typeof a!="number"||!Number.isFinite(a)||!e.some(u=>u.id===s)?null:{id:s,at:a}}catch(n){return console.warn("Failed to parse last position:",n),null}}function Nn(e){try{localStorage.setItem(gt,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Ve(e){const n=V();return e.filter(t=>K(n[t.id]))}function Qn(e){const n=V(),t=e.length;let s=0;for(const a of e)n[a.id]&&s++;return{done:s,total:t}}const zn="pydrill.devPageIds";function dt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function Vn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:dt(new URLSearchParams(e.slice(n+1)).get("dev"))}function Gn(){return!0}function vn(){const e=Vn();if(e!==null)return e;const n=dt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=dt(localStorage.getItem(zn));if(t!==null)return t}catch{}return Gn()}function mn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:null}function Qt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function Pe(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!vn()){n==null||n.remove();return}const t=`P${e}`;if(n){n.textContent=t,n.setAttribute("data-page",String(e));return}const s=document.createElement("div");s.className="dev-page-id",s.setAttribute("data-testid","dev-page-id"),s.setAttribute("data-page",String(e)),s.setAttribute("aria-hidden","true"),s.textContent=t,document.body.appendChild(s)}function Yn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),s=n.getMonth(),a=n.getDate();return(Math.floor(Date.UTC(t,s,a)/864e5)%e+e)%e}function Zn(e,n=new Date){if(e.length===0)return;const t=Yn(e.length,n);return e[t]}function Jn(e,n){const t=new Date(e),s=new Date(n);return t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()}function Kn(e,n=new Date){const t=Se(e.id),s=n.getTime();return!t||!Jn(t.submittedAt,s)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Xn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function es(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ts(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ns(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function zt(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function ss(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function as(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function wn(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function rs(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function is(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function os(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function pt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Vt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function cs(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function bn(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function yn(){return`<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24" width="16">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>`}function Me(e,n=0){if(e==="none")return"";const t=e==="home",s=e==="topics",a=e==="wrong",u=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${Xn(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${s?"active":""}" data-testid="tab-topics">
          ${es(s)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${a?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${ts(a)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${u?"active":""}" data-testid="tab-me">
          ${ns(u)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const ls=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,Re=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,ds=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,ps=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,us=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function et(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function gs(e){const n=V(),s=Ve(e).length,a=le(e),u=a.length,r=Zn(e),l=r?Kn(r):{statusText:"今天还没做",isCompletedToday:!1},h=r?Ne(e,r.id):null,w=h?h.indexInTopic+1:1,F=h?h.topic.questions.length:2,M=r?`${r.topic} · 第 ${w}/${F} 题`:"今日一题",b=new Date,i=`${b.getMonth()+1}月${b.getDate()}日`,T=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",L=a[0],E=(L==null?void 0:L.name)||"",q=L&&L.questions.length>0?L.questions.find(f=>!n[f.id])||L.questions[0]:void 0,o=fn(e),c=o?e.find(f=>f.id===o.id):void 0,d=c?Ne(e,c.id):null,g=c!=null&&c.code?(c.code.split(`
`)[0]||"").trim():"",p=c&&d?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Vt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${et(d.topic.name)} · 第 ${d.indexInTopic+1}/${d.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${c.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${g?`<div class="continue-code"><code>${et(g)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Vt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${et(E)}」开始吧，一次一小步。</p>
          ${q?`<a href="#/q/${q.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${ls}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${rs()}</span>
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
        <a href="#/q/${(r==null?void 0:r.id)||(q==null?void 0:q.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${ds}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${l.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${ps}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${u} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${us}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${s>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${p}

      ${r?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${i}</span>
              <h3 class="daily-q-title">${M}</h3>
            </div>
            <span class="chip-status ${l.result==="correct"?"chip-green":l.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${l.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${r.stem}</p>

          ${T?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${T}</code></pre>
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
              <img src="${Re}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Me("home",s)}
  `}const hs={"字符串/循环":["字符串操作","循环控制"],"元组/引用":["元组基础","引用与可变性","同一性与拷贝"],"函数/默认参数":["函数定义与返回值","参数传递与调用","默认参数机制"],"列表/切片":["切片索引与步长","列表修改与拷贝"],字典:["访问与成员检查","常用字典方法","键的特性与哈希"],"作用域/变量":["全局与局部变量","变量生命周期","嵌套作用域与闭包"],"类/对象":["类属性与实例属性","方法定义与调用","继承与特殊方法"],异常处理:["异常捕获与匹配","流程控制与清理","异常抛出与自定义"]},$n={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},kn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function ft(e,n,t){const s=[],a=new Map;let u=0,r=null;for(const b of e){const i=b.subtopic&&b.subtopic.trim()?b.subtopic.trim():null;if(i){r=null;let T=a.get(i);T||(T={name:i,questions:[]},a.set(i,T),s.push(T)),T.questions.push(b)}else(!r||r.questions.length>=10)&&(u++,r={name:`第 ${u} 节`,questions:[]},s.push(r)),r.questions.push(b)}const l=hs[t]||[],h=b=>{const i=l.indexOf(b);return i<0?l.length:i};s.sort((b,i)=>h(b.name)-h(i.name));const w=b=>typeof b.difficulty=="number"?b.difficulty:2;for(const b of s)b.questions.sort((i,T)=>w(i)-w(T)||(i.id<T.id?-1:i.id>T.id?1:0));const F=[];let M=1;for(const b of s)for(let i=0;i<b.questions.length;i+=10){const T=b.questions.slice(i,i+10),L=T.reduce((q,o)=>q+(typeof o.difficulty=="number"?o.difficulty:2),0),E=Math.max(1,Math.min(3,Math.round(L/T.length)));F.push({index:M,name:b.name,topicIndex:n,topicName:t,questions:T,avgDifficulty:E}),M++}return F}function tt(e,n){const t=e.questions.length;let s=0;for(const l of e.questions)n[l.id]&&s++;const a=t>0&&s===t,u=s>0&&!a;return{submittedCount:s,totalCount:t,isCompleted:a,isInProgress:u,isNotStarted:s===0}}const nt={"字符串/循环":"#7a9a5c","元组/引用":"#8a6b55","函数/默认参数":"#c47a3a","列表/切片":"#5f8a7a",字典:"#9a6b7a","作用域/变量":"#6b7a8a","类/对象":"#8a7a5c",异常处理:"#a07050"},fs="#7a9a5c";function xn(e){if(nt[e])return nt[e];for(const[n,t]of Object.entries(nt))if(e.includes(n)||n.includes(e))return t;return fs}function Gt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function vs(e){const n=le(e),t=V(),s=e.filter(r=>!!t[r.id]).length,a=Ve(e).length,u=n.map((r,l)=>{const h=$n[r.name]??kn[r.name],w=r.questions.filter(L=>!!t[L.id]).length,F=r.questions.length,M=F>0?w/F*100:0,b=M===0?"0":M.toFixed(1),i=M===0?"0%":`${M.toFixed(1)}%`,T=xn(r.name);return`
        <article
          class="card paper-card topic-card topic-progress-card active-press"
          data-testid="topic-card-${l}"
          onclick="window.location.hash = '#/topic/${l}'"
        >
          <div
            class="card-bar-fill"
            data-testid="topic-card-fill-${l}"
            data-pct="${b}"
            data-submitted="${w}"
            data-total="${F}"
            style="width: ${i}; background-color: ${T}; color: ${T};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">
              ${bn(r.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${Gt(r.name)}</h2>
                <span class="topic-index-badge">#${String(l+1).padStart(2,"0")}</span>
              </div>
              ${h?`<p class="topic-sub" data-testid="topic-sub-${l}">${Gt(h)}</p>`:""}
            </div>
            <span class="sr-only" data-testid="topic-progress-${l}">${w} / ${F}</span>
            <div class="topic-chevron-col" aria-hidden="true">
              ${yn()}
            </div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${pt()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已完成 ${s} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Re}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${u}
      </section>
    </div>

    ${Me("topics",a)}
  `}function Oe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ms(e,n){const t=le(e),s=parseInt(n,10),a=t[s]||t[0];if(!a)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const u=V(),r=Ve(e).length,l=ft(a.questions,a.index,a.name),h=$n[a.name]||kn[a.name]||"";let w=0;for(const p of l)tt(p,u).isCompleted&&w++;const F=l.length,M=F>0?w/F:0,b=150.8,i=(b*(1-M)).toFixed(1),T=l.map(p=>{const{submittedCount:f,totalCount:C,isCompleted:v,isInProgress:I}=tt(p,u);let P="";v?P=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="0"/>
            </svg>
            <svg class="sec-ring-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        `:I?P=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-f/C)).toFixed(1)}"/>
            </svg>
            <span class="sec-ring-num is-progress">${p.index}</span>
          </div>
        `:P=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
            </svg>
            <span class="sec-ring-num">${p.index}</span>
          </div>
        `;let z="";v?z='<span class="sec-tag tag-done">已完成</span>':I?z='<span class="sec-tag tag-progress">进行中</span>':z='<span class="sec-tag tag-pending">未开始</span>';let ie="";p.avgDifficulty===1?ie='<span class="diff-dot dot-green"></span><span>入门</span>':p.avgDifficulty===2?ie='<span class="diff-dot dot-orange"></span><span>进阶</span>':ie='<span class="diff-dot dot-orange"></span><span class="diff-dot dot-orange"></span><span>挑战</span>';const de=`#/q/${(p.questions.find(k=>!u[k.id])||p.questions[0]).id}?from=topic&sec=${p.index}${v?"&retry=1":""}`;let X="";return v?X=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${p.index}" onclick="window.location.hash='${de}'">
            再练一次
          </button>
        `:I?X=`
          <button type="button" class="sec-btn sec-btn-primary active-press" data-testid="sec-btn-${p.index}" onclick="window.location.hash='${de}'">
            <span>继续</span>
            <svg class="sec-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        `:X=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${p.index}" onclick="window.location.hash='${de}'">
            开始练
          </button>
        `,`
        <div class="${I?"topic-detail-sec-row is-in-progress":"topic-detail-sec-row"}" data-testid="sec-row-${p.index}">
          ${I?'<span class="sec-accent-bar" aria-hidden="true"></span>':""}
          ${P}
          <div class="sec-row-center">
            <div class="sec-row-title-line">
              <span class="sec-row-title">${p.index} ${Oe(p.name)}</span>
              ${z}
            </div>
            <div class="sec-row-meta-line">
              <span class="sec-diff-badge">${ie}</span>
              <span class="sec-meta-sep">·</span>
              <span class="sec-count-mono" data-testid="sec-count-${p.index}">${f}/${C}</span>
            </div>
          </div>
          ${X}
        </div>
      `}).join(""),L=l.find(p=>!tt(p,u).isCompleted),E=!L,q=E?l[0]:L,o=q.index,c=E?"再练 第1节":`继续 第${o}节`,g=`#/q/${(q.questions.find(p=>!u[p.id])||q.questions[0]).id}?from=topic&sec=${o}${E?"&retry=1":""}`;return`
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
          <h2 class="topic-detail-name">${Oe(a.name)}</h2>
          ${h?`<p class="topic-detail-intro">${Oe(h)}</p>`:""}
          <div class="topic-detail-counts">
            <span>共 ${F} 小节</span>
            <span class="topic-detail-counts-dot">·</span>
            <span>${a.questions.length} 道题目</span>
          </div>
        </div>

        <div class="topic-detail-big-ring-wrap" data-testid="detail-ring" aria-label="已完成 ${w}/${F} 节">
          <svg class="topic-detail-big-ring-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" class="topic-detail-ring-track" stroke-width="5"/>
            ${w>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${b}" stroke-dashoffset="${i}"/>`:""}
          </svg>
          <div class="topic-detail-big-ring-inner">
            <span class="topic-detail-ring-fraction">${w}/${F}<span class="topic-detail-ring-unit">节</span></span>
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
        ${T}
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
            <span class="bottom-bar-title">第 ${o} 节 · ${Oe(q.name)}</span>
          </div>
          <button
            type="button"
            class="bottom-bar-cta-btn active-press"
            data-testid="detail-continue"
            onclick="window.location.hash='${g}'"
          >
            <span>${c}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    ${Me("topics",r)}
  `}const ws=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function bs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const st="pydrill.lastRandomWrong";function ys(e){const n=V(),t=e.filter(r=>K(n[r.id]));if(t.length===0)return null;if(t.length===1){const r=t[0].id;try{sessionStorage.setItem(st,r)}catch{}return r}let s=null;try{s=sessionStorage.getItem(st)}catch{}const a=s&&t.some(r=>r.id===s)?t.filter(r=>r.id!==s):t,u=a[Math.floor(Math.random()*a.length)];try{sessionStorage.setItem(st,u.id)}catch{}return u.id}function $s(e,n){var h;const t=V(),s=le(e),a=e.filter(w=>K(t[w.id])),u=a.length;if(u===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${pt()}</span>
            </div>
            <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Re}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="温习本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${ws}" alt="空白小本子" class="wrong-empty-img" />
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

      ${Me("wrong",0)}
    `;const r=((h=a[Math.floor(Math.random()*a.length)])==null?void 0:h.id)??"",l=s.map(w=>{const F=w.questions.filter(o=>K(t[o.id]));if(F.length===0)return"";const M=w.questions.filter(o=>!!t[o.id]).length,b=w.questions.length,i=b>0?M/b*100:0,T=i===0?"0":i.toFixed(1),L=i===0?"0%":`${i.toFixed(1)}%`,E=xn(w.name),q=String(w.index+1).padStart(2,"0");return`
        <a
          class="topic-progress-card wrong-topic-card active-press"
          data-testid="wrong-topic-${w.index}"
          href="#/q/${F[0].id}?from=wrong"
        >
          <div
            class="card-bar-fill"
            data-testid="wrong-topic-fill-${w.index}"
            data-pct="${T}"
            data-submitted="${M}"
            data-total="${b}"
            style="width: ${L}; background-color: ${E}; color: ${E};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">${bn(w.name)}</div>
            <div class="wrong-topic-main">
              <div class="wrong-topic-name-row">
                <span class="wrong-topic-name">${bs(w.name)}</span>
                <span class="wrong-topic-index">#${q}</span>
              </div>
              <div class="wrong-topic-meta">
                <span class="topic-meta-highlight" data-testid="wrong-topic-count-${w.index}">${F.length}</span> 题待巩固
              </div>
            </div>
            <div class="topic-chevron-col" aria-hidden="true">
              ${yn()}
            </div>
          </div>
        </a>
      `}).join("");return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">温习本</h1>
            <span class="title-doodle-leaf">${pt()}</span>
          </div>
          <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Re}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <a href="#/q/${r}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>随机抽一题</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有待巩固题的知识点">
        ${l}
      </section>
    </div>

    ${Me("wrong",u)}
  `}const We=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function at(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ks(e){const n=new Date(e),t=new Date,s=_e(t),a=_e(n);if(a===s)return"今天";const u=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return a===_e(u)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function xs(e,n){const t=V(),s=le(e),a=Ve(e).length,u=gn(),r=u.length,l=new Date,h=l.getDay(),w=h===0?-6:1-h,F=new Date(l.getFullYear(),l.getMonth(),l.getDate()+w),M=["一","二","三","四","五","六","日"],b=new Set(u);let i=0;const T=M.map((d,g)=>{const p=new Date(F.getFullYear(),F.getMonth(),F.getDate()+g),f=_e(p),C=b.has(f);return C&&i++,`
        <div class="day-dot-item">
          <span class="day-name">${d}</span>
          <div class="day-dot ${C?"active is-on":""}" data-testid="me-week-dot-${g}"></div>
        </div>
      `}).join(""),L=s.map((d,g)=>{const{done:p,total:f}=Qn(d.questions);let C="";return p>0&&(C=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(p/f*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${g}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${d.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${C}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${g}">${p}/${f}</span>
          </div>
          <span class="ring-label">${at(d.name)}</span>
        </div>
      `}).join(""),E=a>0?`<div class="review-count-highlight">${a} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',q=Object.entries(t).filter(([d,g])=>typeof g.submittedAt=="number").sort((d,g)=>g[1].submittedAt-d[1].submittedAt).slice(0,3);let o="";q.length===0?o='<div class="recent-empty">还没有练习记录</div>':o=q.map(([d,g],p)=>{const f=e.find(z=>z.id===d);if(!f)return"";const C=f.title||(f.stem?f.stem.split(`
`)[0].trim():"Python 练习题"),v=C.match(/^[Qq]0*(\d+)$/),I=v?v[1]:C,P=ks(g.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${p}" onclick="window.location.hash='#/q/${f.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${at(I)}</div>
              <div class="recent-topic-sub">· ${at(f.topic)}</div>
            </div>
            <span class="recent-time">${P}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const d=document.getElementById("clear-confirm-modal");d&&d.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const d=document.getElementById("clear-confirm-modal");d&&d.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Un();const d=document.getElementById("clear-confirm-modal");d&&d.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=d=>{try{localStorage.setItem("pydrill.devPageIds",d?"true":"false")}catch{}const g=mn("/me");Pe(g)});const c=vn();return`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Card -->
      <header class="card paper-card profile-header-card select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${We}" alt="小芽啾" class="me-avatar-img" />
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
          <span class="rhythm-text" data-testid="me-week-text">这周来过 ${i} 天，慢慢来就好</span>
        </div>
        <div class="rhythm-dots-row">
          ${T}
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
          ${L}
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
            ${o}
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
            ${os()}
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

    ${Me("me",a)}
  `}const ut=globalThis;ut.Prism=ut.Prism??{};ut.Prism.manual=!0;var Yt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Cs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var rt={exports:{}},Zt;function Ss(){return Zt||(Zt=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(s){var a=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,u=0,r={},l={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function o(c){return c instanceof h?new h(c.type,o(c.content),c.alias):Array.isArray(c)?c.map(o):c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(o){return Object.prototype.toString.call(o).slice(8,-1)},objId:function(o){return o.__id||Object.defineProperty(o,"__id",{value:++u}),o.__id},clone:function o(c,d){d=d||{};var g,p;switch(l.util.type(c)){case"Object":if(p=l.util.objId(c),d[p])return d[p];g={},d[p]=g;for(var f in c)c.hasOwnProperty(f)&&(g[f]=o(c[f],d));return g;case"Array":return p=l.util.objId(c),d[p]?d[p]:(g=[],d[p]=g,c.forEach(function(C,v){g[v]=o(C,d)}),g);default:return c}},getLanguage:function(o){for(;o;){var c=a.exec(o.className);if(c)return c[1].toLowerCase();o=o.parentElement}return"none"},setLanguage:function(o,c){o.className=o.className.replace(RegExp(a,"gi"),""),o.classList.add("language-"+c)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(g){var o=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(o){var c=document.getElementsByTagName("script");for(var d in c)if(c[d].src==o)return c[d]}return null}},isActive:function(o,c,d){for(var g="no-"+c;o;){var p=o.classList;if(p.contains(c))return!0;if(p.contains(g))return!1;o=o.parentElement}return!!d}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(o,c){var d=l.util.clone(l.languages[o]);for(var g in c)d[g]=c[g];return d},insertBefore:function(o,c,d,g){g=g||l.languages;var p=g[o],f={};for(var C in p)if(p.hasOwnProperty(C)){if(C==c)for(var v in d)d.hasOwnProperty(v)&&(f[v]=d[v]);d.hasOwnProperty(C)||(f[C]=p[C])}var I=g[o];return g[o]=f,l.languages.DFS(l.languages,function(P,z){z===I&&P!=o&&(this[P]=f)}),f},DFS:function o(c,d,g,p){p=p||{};var f=l.util.objId;for(var C in c)if(c.hasOwnProperty(C)){d.call(c,C,c[C],g||C);var v=c[C],I=l.util.type(v);I==="Object"&&!p[f(v)]?(p[f(v)]=!0,o(v,d,null,p)):I==="Array"&&!p[f(v)]&&(p[f(v)]=!0,o(v,d,C,p))}}},plugins:{},highlightAll:function(o,c){l.highlightAllUnder(document,o,c)},highlightAllUnder:function(o,c,d){var g={callback:d,container:o,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};l.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),l.hooks.run("before-all-elements-highlight",g);for(var p=0,f;f=g.elements[p++];)l.highlightElement(f,c===!0,g.callback)},highlightElement:function(o,c,d){var g=l.util.getLanguage(o),p=l.languages[g];l.util.setLanguage(o,g);var f=o.parentElement;f&&f.nodeName.toLowerCase()==="pre"&&l.util.setLanguage(f,g);var C=o.textContent,v={element:o,language:g,grammar:p,code:C};function I(z){v.highlightedCode=z,l.hooks.run("before-insert",v),v.element.innerHTML=v.highlightedCode,l.hooks.run("after-highlight",v),l.hooks.run("complete",v),d&&d.call(v.element)}if(l.hooks.run("before-sanity-check",v),f=v.element.parentElement,f&&f.nodeName.toLowerCase()==="pre"&&!f.hasAttribute("tabindex")&&f.setAttribute("tabindex","0"),!v.code){l.hooks.run("complete",v),d&&d.call(v.element);return}if(l.hooks.run("before-highlight",v),!v.grammar){I(l.util.encode(v.code));return}if(c&&s.Worker){var P=new Worker(l.filename);P.onmessage=function(z){I(z.data)},P.postMessage(JSON.stringify({language:v.language,code:v.code,immediateClose:!0}))}else I(l.highlight(v.code,v.grammar,v.language))},highlight:function(o,c,d){var g={code:o,grammar:c,language:d};if(l.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=l.tokenize(g.code,g.grammar),l.hooks.run("after-tokenize",g),h.stringify(l.util.encode(g.tokens),g.language)},tokenize:function(o,c){var d=c.rest;if(d){for(var g in d)c[g]=d[g];delete c.rest}var p=new M;return b(p,p.head,o),F(o,p,c,p.head,0),T(p)},hooks:{all:{},add:function(o,c){var d=l.hooks.all;d[o]=d[o]||[],d[o].push(c)},run:function(o,c){var d=l.hooks.all[o];if(!(!d||!d.length))for(var g=0,p;p=d[g++];)p(c)}},Token:h};s.Prism=l;function h(o,c,d,g){this.type=o,this.content=c,this.alias=d,this.length=(g||"").length|0}h.stringify=function o(c,d){if(typeof c=="string")return c;if(Array.isArray(c)){var g="";return c.forEach(function(I){g+=o(I,d)}),g}var p={type:c.type,content:o(c.content,d),tag:"span",classes:["token",c.type],attributes:{},language:d},f=c.alias;f&&(Array.isArray(f)?Array.prototype.push.apply(p.classes,f):p.classes.push(f)),l.hooks.run("wrap",p);var C="";for(var v in p.attributes)C+=" "+v+'="'+(p.attributes[v]||"").replace(/"/g,"&quot;")+'"';return"<"+p.tag+' class="'+p.classes.join(" ")+'"'+C+">"+p.content+"</"+p.tag+">"};function w(o,c,d,g){o.lastIndex=c;var p=o.exec(d);if(p&&g&&p[1]){var f=p[1].length;p.index+=f,p[0]=p[0].slice(f)}return p}function F(o,c,d,g,p,f){for(var C in d)if(!(!d.hasOwnProperty(C)||!d[C])){var v=d[C];v=Array.isArray(v)?v:[v];for(var I=0;I<v.length;++I){if(f&&f.cause==C+","+I)return;var P=v[I],z=P.inside,ie=!!P.lookbehind,$e=!!P.greedy,de=P.alias;if($e&&!P.pattern.global){var X=P.pattern.toString().match(/[imsuy]*$/)[0];P.pattern=RegExp(P.pattern.source,X+"g")}for(var y=P.pattern||P,k=g.next,m=p;k!==c.tail&&!(f&&m>=f.reach);m+=k.value.length,k=k.next){var S=k.value;if(c.length>o.length)return;if(!(S instanceof h)){var D=1,$;if($e){if($=w(y,m,o,ie),!$||$.index>=o.length)break;var W=$.index,x=$.index+$[0].length,H=m;for(H+=k.value.length;W>=H;)k=k.next,H+=k.value.length;if(H-=k.value.length,m=H,k.value instanceof h)continue;for(var O=k;O!==c.tail&&(H<x||typeof O.value=="string");O=O.next)D++,H+=O.value.length;D--,S=o.slice(m,H),$.index-=m}else if($=w(y,0,S,ie),!$)continue;var W=$.index,U=$[0],Z=S.slice(0,W),Te=S.slice(W+U.length),pe=m+S.length;f&&pe>f.reach&&(f.reach=pe);var ae=k.prev;Z&&(ae=b(c,ae,Z),m+=Z.length),i(c,ae,D);var ne=new h(C,z?l.tokenize(U,z):U,de,U);if(k=b(c,ae,ne),Te&&b(c,k,Te),D>1){var ee={cause:C+","+I,reach:pe};F(o,c,d,k.prev,m,ee),f&&ee.reach>f.reach&&(f.reach=ee.reach)}}}}}}function M(){var o={value:null,prev:null,next:null},c={value:null,prev:o,next:null};o.next=c,this.head=o,this.tail=c,this.length=0}function b(o,c,d){var g=c.next,p={value:d,prev:c,next:g};return c.next=p,g.prev=p,o.length++,p}function i(o,c,d){for(var g=c.next,p=0;p<d&&g!==o.tail;p++)g=g.next;c.next=g,g.prev=c,o.length-=p}function T(o){for(var c=[],d=o.head.next;d!==o.tail;)c.push(d.value),d=d.next;return c}if(!s.document)return s.addEventListener&&(l.disableWorkerMessageHandler||s.addEventListener("message",function(o){var c=JSON.parse(o.data),d=c.language,g=c.code,p=c.immediateClose;s.postMessage(l.highlight(g,l.languages[d],d)),p&&s.close()},!1)),l;var L=l.util.currentScript();L&&(l.filename=L.src,L.hasAttribute("data-manual")&&(l.manual=!0));function E(){l.manual||l.highlightAll()}if(!l.manual){var q=document.readyState;q==="loading"||q==="interactive"&&L&&L.defer?document.addEventListener("DOMContentLoaded",E):window.requestAnimationFrame?window.requestAnimationFrame(E):window.setTimeout(E,16)}return l})(n);e.exports&&(e.exports=t),typeof Yt<"u"&&(Yt.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(a,u){var r={};r["language-"+u]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[u]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var l={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};l["language-"+u]={pattern:/[\s\S]+/,inside:t.languages[u]};var h={};h[a]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:l},t.languages.insertBefore("markup","cdata",h)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(s,a){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[a,"language-"+a],inside:t.languages[a]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(s){var a=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+a.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+a.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+a.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+a.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:a,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var u=s.languages.markup;u&&(u.tag.addInlined("style","css"),u.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",a=function(L,E){return"✖ Error "+L+" while fetching file: "+E},u="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},l="data-src-status",h="loading",w="loaded",F="failed",M="pre[data-src]:not(["+l+'="'+w+'"]):not(['+l+'="'+h+'"])';function b(L,E,q){var o=new XMLHttpRequest;o.open("GET",L,!0),o.onreadystatechange=function(){o.readyState==4&&(o.status<400&&o.responseText?E(o.responseText):o.status>=400?q(a(o.status,o.statusText)):q(u))},o.send(null)}function i(L){var E=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(L||"");if(E){var q=Number(E[1]),o=E[2],c=E[3];return o?c?[q,Number(c)]:[q,void 0]:[q,q]}}t.hooks.add("before-highlightall",function(L){L.selector+=", "+M}),t.hooks.add("before-sanity-check",function(L){var E=L.element;if(E.matches(M)){L.code="",E.setAttribute(l,h);var q=E.appendChild(document.createElement("CODE"));q.textContent=s;var o=E.getAttribute("data-src"),c=L.language;if(c==="none"){var d=(/\.(\w+)$/.exec(o)||[,"none"])[1];c=r[d]||d}t.util.setLanguage(q,c),t.util.setLanguage(E,c);var g=t.plugins.autoloader;g&&g.loadLanguages(c),b(o,function(p){E.setAttribute(l,w);var f=i(E.getAttribute("data-range"));if(f){var C=p.split(/\r\n?|\n/g),v=f[0],I=f[1]==null?C.length:f[1];v<0&&(v+=C.length),v=Math.max(0,Math.min(v-1,C.length)),I<0&&(I+=C.length),I=Math.max(0,Math.min(I,C.length)),p=C.slice(v,I).join(`
`),E.hasAttribute("data-start")||E.setAttribute("data-start",String(v+1))}q.textContent=p,t.highlightElement(q)},function(p){E.setAttribute(l,F),q.textContent=p})}}),t.plugins.fileHighlight={highlight:function(E){for(var q=(E||document).querySelectorAll(M),o=0,c;c=q[o++];)t.highlightElement(c)}};var T=!1;t.fileHighlight=function(){T||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),T=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(rt)),rt.exports}var As=Ss();const Jt=Cs(As);var Kt={},Xt;function Ts(){return Xt||(Xt=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),Kt}Ts();function Ls(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((a,u)=>{const r=u+1,h=Jt.highlight(a,Jt.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${h}</span></div>`}).join("")}</code></pre></div>`}function en(e){const n=e.match(/^[Qq]0*(\d+)$/);return n?n[1]:e}function tn(e){const n=new Date(e),t=n.getMonth()+1,s=n.getDate(),a=String(n.getHours()).padStart(2,"0"),u=String(n.getMinutes()).padStart(2,"0");return`${t}月${s}日 ${a}:${u}`}function te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const nn=200,sn=1600,an=300,Es=1800;let Ee=0,we=0,rn=!1;function Fs(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let Ue="#/overview";function qs(e,n){return n<=3?Array.from({length:n},(t,s)=>s):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function De(){Ee+=1,we&&(window.clearTimeout(we),we=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function Ms(){rn||(rn=!0,window.addEventListener("hashchange",De))}function Bs(e,n){const t=n.getBoundingClientRect(),s=t.left+t.width/2,a=e.offsetWidth,u=e.offsetHeight,r=1,l=6,h=40,w=8,F=document.documentElement.clientWidth;let M=s+r+h+l,b=M-a;b<w&&(b=w,M=b+a),M>F-w&&(M=F-w,b=Math.max(w,M-a),M=b+a);let i=M-r-l-s;const T=12,L=Math.max(T,a-r*2-12-T);i<T&&(i=T),i>L&&(i=L),e.style.right=`${Math.round(F-M)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-u)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(i)}px`)}function Is(e,n){if(n!==Ee||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(a=>a.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:an,easing:"ease",fill:"forwards"}),s=()=>{n===Ee&&e.remove()};t.onfinish=s,window.setTimeout(s,an+60)}function it(e,n,t,s){we&&window.clearTimeout(we),we=window.setTimeout(()=>{if(we=0,!(n!==Ee||!e.isConnected)){if(!s){e.remove();return}Is(e,n)}},t)}function Hs(e=Ue){var l;const n=document.getElementById("q-next-btn");if(!n)return;Ue=e,Ee+=1;const t=Ee;we&&(window.clearTimeout(we),we=0);const s=Fs();let a=document.querySelector(".finish-tip");const u=!!a;if(a?document.querySelectorAll(".finish-tip").forEach(h=>{h!==a&&h.remove()}):(a=document.createElement("div"),a.className="finish-tip tip-bubble",a.setAttribute("data-testid","tip-bubble"),a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(a),(l=a.querySelector(".finish-tip-tag"))==null||l.addEventListener("click",h=>{h.stopPropagation(),De(),Q(Ue)})),Bs(a,n),s){a.getAnimations().forEach(h=>h.cancel()),a.style.opacity="1",a.style.transform="none",it(a,t,Es,!1);return}if(u){a.getAnimations().forEach(h=>h.cancel()),a.style.opacity="1",a.style.transform="translateY(0)",it(a,t,sn,!0);return}const r=a.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:nn,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==Ee||!a.isConnected||(a.style.opacity="1",a.style.transform="translateY(0)")},it(a,t,nn+sn,!0)}function on(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${te(t)}</code>`)}function _s(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let s=e,a="";n!==-1&&(s=e.slice(0,n).trim(),a=e.slice(n+t).trim(),a=a.replace(/^[：:\s]+/,""));const u=s.split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>`<p class="explanation-p">${on(l)}</p>`).join("");let r="";if(a){const l=on(a);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${wn(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${l}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${u}
      ${r}
    </div>
  `}function qe(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function Ds(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),s=n.querySelector(".code-header");if(!t)return;const a=()=>{const u=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",u),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${s?s.offsetHeight:0}px`),a(),t.addEventListener("scroll",a,{passive:!0})})}function cn(e,n,t,s="topic",a={}){Ms(),De(),ce();const u=s==="daily"||s==="wrong"?s:"topic",r=n.find(y=>y.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Pe(Qt(u,!1));return}if(u==="wrong"&&!a.endCard&&!K(Se(r.id))){window.location.replace(`#/q/${r.id}?from=topic`);return}a.endCard||Nn(r.id);const l=Ne(n,r.id),h=(l==null?void 0:l.topic)||le(n)[0],w=l?l.indexInTopic:0,F=h.questions.length,M=Se(r.id);h.questions.filter(y=>K(V()[y.id])).length;const b=!!a.retry&&u==="topic",i={from:u,sec:a.sec,retry:b,prevChoice:M==null?void 0:M.choice,selectedChoice:u==="wrong"||b?null:M?M.choice:null,isRedoing:b,wrongFresh:u==="wrong",showLastTrace:!1,showEndCard:!!a.endCard&&u!=="daily",justRemovedWrong:!1},T=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let L=0,E=null,q=!1;const o='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',c='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function d(y){return/Error|Exception/.test(y)}function g(y,k,m,S){return k!=="graded"?m===y?"selected":"idle":r.answer&&y===r.answer?"correct":m===y&&(S==null?void 0:S.result)==="wrong"?"wrong":"locked"}function p(y,k,m){const S=y.querySelector(".opt-badge"),D=y.querySelector(".opt-text"),$=y.querySelector(".opt-status");if(!S||!D||!$)return;const x=y.getAttribute("data-error")==="1";y.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),S.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),D.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),y.setAttribute("aria-checked",m?"true":"false"),k==="correct"?y.setAttribute("data-state","correct"):k==="wrong"?y.setAttribute("data-state","wrong"):y.removeAttribute("data-state"),k==="selected"||k==="correct"?(y.classList.add(k==="correct"?"opt-card-correct":"opt-card-selected"),k==="selected"&&y.classList.add("opt-pressable"),S.classList.add(k==="correct"?"opt-badge-correct":"opt-badge-selected"),D.classList.add("opt-text-strong"),$.innerHTML=o):k==="wrong"?(y.classList.add("opt-card-wrong"),S.classList.add("opt-badge-wrong"),D.classList.add("opt-text-strong","opt-text-wrong"),$.innerHTML=c):k==="locked"?(y.classList.add("opt-card-locked"),S.classList.add("opt-badge-default"),x&&D.classList.add("opt-text-error"),$.innerHTML=""):(y.classList.add("opt-card-default","opt-pressable"),S.classList.add("opt-badge-default"),x&&D.classList.add("opt-text-error"),$.innerHTML="")}function f(y,k,m,S){const D=d(y.text),$=["option-item"],x=["opt-badge"],H=["opt-text"];let O="",W="";k==="selected"?($.push("opt-card-selected","opt-pressable"),x.push("opt-badge-selected"),H.push("opt-text-strong"),O=o):k==="correct"?($.push("opt-card-correct"),x.push("opt-badge-correct"),H.push("opt-text-strong"),O=o,W='data-state="correct"'):k==="wrong"?($.push("opt-card-wrong"),x.push("opt-badge-wrong"),H.push("opt-text-strong","opt-text-wrong"),O=c,W='data-state="wrong"'):k==="locked"?($.push("opt-card-locked"),x.push("opt-badge-default"),D&&H.push("opt-text-error")):($.push("opt-card-default","opt-pressable"),x.push("opt-badge-default"),D&&H.push("opt-text-error"));const U=(y.hint||"").trim(),Z=S!=="none"&&U?`<div class="opt-hint-clip${S==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${te(y.key)}">${te(U)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${m?"true":"false"}"
            ${W}
            class="${$.join(" ")}"
            data-testid="option-${te(y.key)}"
            data-key="${te(y.key)}"
            data-error="${D?"1":"0"}"
          >
            <span class="${x.join(" ")}">${te(y.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${H.join(" ")}">${te(y.text)}</span>
                <span class="opt-status">${O}</span>
              </div>
              ${Z}
            </div>
          </div>
        `}const C='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',v='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let I=0;function P(){var k;(k=document.getElementById("pydrill-wrong-toast"))==null||k.remove();const y=document.createElement("div");y.id="pydrill-wrong-toast",y.className="wrong-toast",y.setAttribute("role","status"),y.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(y),window.setTimeout(()=>{y.remove()},1500)}function z(){const y=e.querySelector("#q-toggle-last");if(!y)return;const k=i.showLastTrace;y.setAttribute("aria-pressed",k?"true":"false");const m=y.querySelector("span");m&&(m.textContent=k?"隐藏上次":"看上次思路");const S=y.querySelector("svg");S&&(S.outerHTML=k?v:C)}function ie(y,k,m,S){const D=(k.hint||"").trim(),$=y.querySelector(".opt-body");if(!$)return;let x=y.querySelector(".opt-hint-clip");if(m&&D){x||(x=document.createElement("div"),x.className="opt-hint-clip",x.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${te(k.key)}">${te(D)}</p></div>`,$.appendChild(x));const H=x;requestAnimationFrame(()=>{requestAnimationFrame(()=>{S===I&&H.classList.add("is-open")})})}else if(x){x.classList.remove("is-open");const H=x,O=S,W=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{O===I&&H.remove()},W?0:200)}}function $e(y){const k=++I,m=Se(r.id),S=i.from==="topic"&&(i.prevChoice||(m==null?void 0:m.choice))||He(m),D=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(x=>{const H=x.getAttribute("data-key")||"",O=r.options.find(ee=>ee.key===H);if(!y){const ee=i.selectedChoice===H;p(x,ee?"selected":"idle",ee),O&&ie(x,O,!1,k);return}const W=x.querySelector(".opt-badge"),U=x.querySelector(".opt-text"),Z=x.querySelector(".opt-status");if(!W||!U||!Z)return;const Te=x.getAttribute("data-error")==="1",pe=!!S&&H===S,ae=!!D&&H===D;x.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),W.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),U.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),x.setAttribute("aria-checked","false"),x.removeAttribute("data-state"),pe&&!ae?(x.classList.add("opt-card-trace-last"),W.classList.add("opt-badge-trace-last"),U.classList.add("opt-text-strong","opt-text-trace-last")):ae?(x.classList.add("opt-card-trace-correct"),W.classList.add("opt-badge-trace-correct"),U.classList.add("opt-text-strong","opt-text-trace-correct")):(x.classList.add("opt-card-default","opt-card-trace-dim"),W.classList.add("opt-badge-default"),Te&&U.classList.add("opt-text-error"));const ne=[];pe&&ne.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${te(H)}">上次选的 ${te(H)}</span>`),ae&&ne.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${te(H)}">正确答案 ${te(H)}</span>`),Z.innerHTML=ne.length?`<span class="opt-trace-tag-row">${ne.join("")}</span>`:"",O&&ie(x,O,pe||ae,k)});const $=e.querySelector("#q-submit-btn");if($){const x=y||!i.selectedChoice;$.disabled=x,$.classList.toggle("btn-disabled",x)}}function de(y){Pe(Qt(i.from,i.showEndCard)),(y||i.showEndCard)&&ce()}function X(){var Ft,qt,Mt,Bt,It,Ht,_t,Dt,Pt,Rt,jt,Ot,Wt;De();const y=++L,k=E!==r.id;E=r.id;const m=Se(r.id),S=i.from==="topic"?!!(i.prevChoice||m!=null&&m.choice||He(m)):He(m).length>0,$=i.isRedoing||i.wrongFresh?void 0:m,x=!!$;x&&(i.showLastTrace=!1);const H=q&&x;q=!1;const O=i.sec!=null?`&sec=${i.sec}`:"",W=i.from==="topic"&&i.retry?"&retry=1":"";let U="#/topics";i.from==="daily"&&(U="#/"),i.from==="wrong"&&(U="#/wrong"),i.from==="topic"&&i.sec!=null&&(U=`#/topic/${h.index}`);const Z=`#/overview?from=${i.from}&qid=${r.id}${i.from==="topic"?"&topic="+encodeURIComponent(h.name):""}${O}${W}`;Ue=Z;let Te="题目总览";i.from==="daily"&&(Te="今日一题");let pe=null,ae=null,ne=!1,ee=!1,G=h.questions,ue=w;if(i.from==="wrong"){const A=V();G=h.questions.filter(B=>K(A[B.id])),ue=G.findIndex(B=>B.id===r.id)}else if(i.from==="topic"&&i.sec!=null){const B=ft(h.questions,h.index,h.name).find(_=>_.index===i.sec);B&&(G=B.questions,ue=G.findIndex(_=>_.id===r.id))}i.from==="daily"?(ee=!0,ne=!0,G=[r],ue=0):ue<0?(ee=!0,ne=!0):(ee=ue===0,ne=ue>=G.length-1,ee||(pe=G[ue-1].id),ne||(ae=G[ue+1].id));const Sn=V(),An=G.length>0&&G.every(A=>qe(Sn[A.id],i.from)),vt=ne&&!An,mt=ue>=0?ue+1:1,wt=i.from==="wrong"?Math.max(G.length,1):i.sec!=null?G.length:F,Tn=i.from==="wrong"?`${h.name} · 温习 ${mt}/${wt}`:i.from==="daily"?`今日一题 · ${h.name}`:i.sec!=null?`${h.name} · 第${i.sec}节 ${mt}/${wt}`:`${h.name} · 第 ${w+1}/${F} 题`;if(i.showEndCard){if(i.from==="daily"){Q("#/");return}const A=i.from==="topic",B=V();let _="",R="",j="#/topics",Y="返回知识点列表",fe="",Fe="",be="";if(A){if(i.sec!=null)_=`第 ${i.sec} 节做完了`,R=`这一节共 ${G.length} 道题目，循序渐进掌握每一个知识点`,j=`#/topic/${h.index}`,Y="返回小节列表",be="",Fe="";else{let N=0;for(const J of h.questions)((Ft=B[J.id])==null?void 0:Ft.result)==="wrong"&&N++;_="这个知识点做完了",N>0?(R=`今天发现 ${N} 道需要巩固的题`,be=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):R="这一组你已经完全掌握了",j="#/topics",Y="返回知识点列表";const ve=le(n),ke=ve.findIndex(J=>J.name===h.name),re=ke!==-1&&ke<ve.length-1?ve[ke+1]:null;re&&re.questions.length>0&&(Fe=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}fe=`
          <div class="end-questions-list">
            ${(i.sec!=null?G:h.questions).map((N,ve)=>{const ke=ve+1,re=B[N.id],J=(re==null?void 0:re.result)==="correct",se=(re==null?void 0:re.result)==="wrong";let xe="end-chip-gray",oe="· 未做";J?(xe="end-chip-green",oe="✓ 已完成"):se&&(xe="end-chip-red",oe="待巩固");const Ze=en(N.title&&N.title.trim()?N.title.trim():N.code?N.code.split(`
`)[0].trim():N.stem);return`
              <a href="${`#/q/${N.id}?from=topic${O}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${ke} 题</span>
                  <span class="end-q-code">${te(Ze)}</span>
                </div>
                <span class="end-chip ${xe}">${oe}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const ge=h.questions.filter(J=>K(B[J.id])),ye=ge.length,N=ge.filter(J=>{var se;return((se=B[J.id])==null?void 0:se.result)==="correct"}).length;_="温习本这一轮看完了",N>0?R=`好样的！你已经纠正了 ${N} 道之前做错的题。`:R="再练一轮，会越来越熟。",j="#/wrong",Y="返回温习本",ye>0?fe=`
            <div class="end-questions-list">
              ${ge.map((se,xe)=>{const oe=B[se.id],Ze=(oe==null?void 0:oe.result)==="correct",Ut=(oe==null?void 0:oe.result)==="wrong";let Je="end-chip-gray",Ke="· 未做";Ze?(Je="end-chip-green",Ke="✓ 答对"):Ut&&(Je="end-chip-red",Ke="待巩固");const _n=en(se.title&&se.title.trim()?se.title.trim():se.code?se.code.split(`
`)[0].trim():se.stem);return`
                <a href="#/q/${se.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${xe+1}/${ye}</span>
                    <span class="end-q-code">${te(_n)}</span>
                  </div>
                  <span class="end-chip ${Je}">${Ke}</span>
                </a>
              `}).join("")}
            </div>
          `:fe=`
            <div class="end-empty-row">
              ${cs(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const ve=le(n),ke=ve.findIndex(J=>J.name===h.name);let re=null;if(ke!==-1)for(let J=1;J<ve.length;J++){const xe=ve[(ke+J)%ve.length].questions.find(oe=>K(B[oe.id]));if(xe){re=xe.id;break}}re&&(Fe=`
            <a
              href="#/q/${re}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const Ie=i.from==="wrong"?"温习本 · 完成":`${h.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${T}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${zt()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${Ie}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${We}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${_}</h2>
              <p class="end-sub" data-testid="end-subtitle">${R}</p>

              ${fe}

              <div class="end-action-wrap flex-col-gap">
                ${be}
                <button
                  type="button"
                  class="${be?"btn-secondary":"btn-primary"} w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${Y}
                </button>
                ${Fe}
              </div>
            </div>
          </main>
        </div>
      `,(qt=document.getElementById("q-back-btn"))==null||qt.addEventListener("click",()=>{Q(U)}),(Mt=document.getElementById("end-leave-btn"))==null||Mt.addEventListener("click",()=>{Q(j)}),(Bt=document.getElementById("end-next-topic-btn"))==null||Bt.addEventListener("click",()=>{const ge=le(n),ye=ge.findIndex(N=>N.name===h.name);if(ye!==-1&&ye<ge.length-1){const N=ge[ye+1];Q(`#/q/${N.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(ge=>{ge.addEventListener("click",ye=>{const N=ge.getAttribute("href");N&&(ye.preventDefault(),Q(N))})}),de(k);return}const je=x?H?"pending":"graded":"answering",Ln=je==="answering"?"none":je==="pending"?"closed":"open",bt=je==="graded"?($==null?void 0:$.choice)??null:i.selectedChoice,En=r.options.map(A=>f(A,g(A.key,je,bt,$),bt===A.key,Ln)).join("");let yt="";if(x&&$){let A=We,B="答对了，理解到位";const _=tn($.submittedAt);let R=`你选了 ${$.choice} · 正确答案 ${r.answer} · ${_} 提交`,j="banner-correct",Y="",fe="";$.result==="wrong"?(A=Re,B="这题有个小坑，看看解析",R=`你选了 ${$.choice} · 正确答案是 ${r.answer} · ${_} 提交`,j="banner-wrong",$.inWrongBook&&(Y='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):$.result==="correct"?$.inWrongBook&&i.from!=="wrong"?fe=`
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
          `:i.justRemovedWrong&&i.from!=="wrong"&&(fe=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出温习本 ✓</span>
            </div>
          `):$.result==="ungraded"&&(A=We,B="已提交（未判分）",R=`这题的答案还没编写 · ${_} 提交`,j="banner-ungraded"),yt=`
        <section class="result-banner ${j}" data-testid="result-banner" data-result="${$.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${A}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${B}</h2>
              <p class="result-sub">${R}</p>
              ${Y?`<div class="result-tag-wrap result-tag-below">${Y}</div>`:""}
            </div>
          </div>
          ${fe}
        </section>
      `}let $t="";if(x&&$){const A=_s(r.explanation);$t=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${wn()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${A}
          </div>
        </section>
      `}let kt="";r.animationId!=null&&x&&(kt=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let xt="";if(i.isRedoing&&i.from!=="wrong"){const A=Se(r.id);if(A){const B=A.result==="correct"?"已学习":A.result==="wrong"?"待巩固":"已提交",_=tn(A.submittedAt);xt=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${B}（选 ${A.choice} · ${_}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Ct=i.from==="wrong"||i.sec!=null?G:h.questions,Fn=i.from!=="wrong"||x,qn=Ct.length,Mn=qs(Math.max(0,ue),qn).map(A=>{const B=Ct[A],_=A+1,R=B.id===r.id,j=Se(B.id),Y=Fn&&qe(j,i.from),fe=Y&&(j==null?void 0:j.result)==="correct",Fe=Y&&(j==null?void 0:j.result)==="wrong";let be="switcher-unanswered",Ie=`<span>${_}</span>`;return fe?(be="switcher-correct",Ie=ss()):Fe&&(be="switcher-wrong",Ie=as()),R&&(be+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${be} active-press"
            data-testid="q-switch-${_}"
            data-qid="${B.id}"
            title="第 ${_} 题"
          >
            ${Ie}
          </button>
        `}).join(""),Bn=x?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${is(14)}
          <span>重做</span>
        </button>
      `:"",St=`
      <button
        type="button"
        class="btn-nav-prev active-press ${ee?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${ee?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,At=ne?"完成":"下一题 ›",Tt=ne?' data-action="finish"':"",Lt=vt?" btn-finish-locked":"",Et=vt?' aria-disabled="true"':"",In=`
      <button
        type="button"
        class="btn-nav-next active-press${Lt}"
        data-testid="next"
        id="q-next-btn"${Tt}${Et}
      >
        <span>${At}</span>
      </button>
    `,Hn=`
      <button
        type="button"
        class="btn-next-main active-press${Lt}"
        data-testid="next"
        id="q-next-btn"${Tt}${Et}
      >
        <span>${At}</span>
      </button>
    `;let Ge="";if(x)Ge=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${St}
            ${Bn}
            ${Hn}
          </div>
        </div>
      `;else{const A=!!i.selectedChoice;Ge=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${St}
            <button
              type="button"
              class="btn-submit-main active-press ${A?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${A?"":"disabled"}
            >
              <span>${A?"提交答案":"提交"}</span>
            </button>
            ${In}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${T}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${zt()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${Tn}</span>
          ${i.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出温习本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <button type="button" class="q-source-badge q-source-chip active-press" data-testid="q-source" id="q-overview-chip">
              <span class="status-dot-green"></span>
              <span>${Te}</span>
            </button>
            ${i.from==="wrong"||i.from==="topic"&&(i.retry||i.isRedoing)?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${i.showLastTrace?"true":"false"}" ${S?"":"disabled"}>
                    ${i.showLastTrace?v:C}
                    <span>${i.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${Mn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${xt}

          <!-- 4. Result Banner (if submitted) -->
          ${yt}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${r.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${r.code?Ls(r.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${En}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${$t}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${kt}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ge}
      </div>
    `,(It=document.getElementById("q-back-btn"))==null||It.addEventListener("click",()=>{Q(U)}),(Ht=document.getElementById("q-overview-chip"))==null||Ht.addEventListener("click",()=>{Q(Z)}),x)(Dt=document.getElementById("q-redo-btn"))==null||Dt.addEventListener("click",()=>{var A;i.isRedoing=!0,i.prevChoice=(A=Se(r.id))==null?void 0:A.choice,i.selectedChoice=null,i.showLastTrace=!1,i.justRemovedWrong=!1,X()}),i.from!=="wrong"&&((Pt=document.getElementById("q-remove-wrong-btn"))==null||Pt.addEventListener("click",()=>{Nt(r.id),i.justRemovedWrong=!0,X()}));else{const A=e.querySelectorAll(".option-item");A.forEach(B=>{B.addEventListener("click",()=>{if(i.showLastTrace)return;const _=B.getAttribute("data-key");if(!_||_===i.selectedChoice)return;i.selectedChoice=_,A.forEach(j=>{const Y=j.getAttribute("data-key")===_;p(j,Y?"selected":"idle",Y)});const R=e.querySelector("#q-submit-btn");if(R){R.disabled=!1,R.classList.remove("btn-disabled");const j=R.querySelector("span");j&&(j.textContent="提交答案")}})}),(_t=document.getElementById("q-submit-btn"))==null||_t.addEventListener("click",()=>{!i.selectedChoice||i.showLastTrace||(Wn(r,i.selectedChoice),i.isRedoing=!1,i.retry=!1,i.wrongFresh=!1,i.showLastTrace=!1,i.justRemovedWrong=!1,q=!0,X())})}i.from==="wrong"&&((Rt=document.getElementById("q-remove-wrong-btn"))==null||Rt.addEventListener("click",()=>{const A=r.id;Nt(A),P();const B=V(),_=h.questions.find(R=>R.id===A||!K(B[R.id])?!1:h.questions.findIndex(j=>j.id===R.id)>w);Q(_?`#/q/${_.id}?from=wrong`:"#/wrong")})),(jt=document.getElementById("q-toggle-last"))==null||jt.addEventListener("click",()=>{const A=e.querySelector("#q-toggle-last");if(!(!A||A.disabled)){if(i.showLastTrace=!i.showLastTrace,x&&!i.showLastTrace){X();return}z(),$e(i.showLastTrace)}}),(Ot=document.getElementById("q-prev-btn"))==null||Ot.addEventListener("click",()=>{pe&&Q(`#/q/${pe}?from=${i.from}${O}${W}`)}),(Wt=document.getElementById("q-next-btn"))==null||Wt.addEventListener("click",()=>{if(ae){Q(`#/q/${ae}?from=${i.from}${O}${W}`);return}const A=V();if(!(G.length>0&&G.every(R=>qe(A[R.id],i.from)))){Hs(Z);return}if(i.from==="daily"){Q("#/");return}const _=i.from==="wrong"?"wrong":"topic";De(),window.history.replaceState(null,"",U),window.location.hash=`#/done/${_}/${h.index}${i.sec!=null?"?sec="+i.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(A=>{A.addEventListener("click",()=>{const B=A.getAttribute("data-qid");B&&B!==r.id&&Q(`#/q/${B}?from=${i.from}${O}${W}`)})});const Be=e.querySelector(".q-switcher-group"),Ye=e.querySelector(".switcher-current");if(Be&&Ye){const A=Ye.getBoundingClientRect().left-Be.getBoundingClientRect().left,B=Be.scrollLeft+A-(Be.clientWidth-Ye.offsetWidth)/2;Be.scrollLeft=Math.max(0,B)}if(H&&$){const A=$;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(y!==L||!e.isConnected)return;const B=e.querySelector("[data-view-token]");!B||B.getAttribute("data-view-token")!==T||e.querySelectorAll(".option-item").forEach(_=>{var Y;const R=_.getAttribute("data-key")||"",j=A.choice===R;p(_,g(R,"graded",A.choice,A),j),(Y=_.querySelector(".opt-hint-clip"))==null||Y.classList.add("is-open")})})})}Ds(e),de(k)}X()}function Le(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ps(e){const n=e.title||e.summary;if(n&&n.trim()){const a=n.trim(),u=a.match(/^[Qq]0*(\d+)$/);return u?u[1]:a}const t=(e.stem||"").split(`
`)[0].trim();if(t.length>20)return t.slice(0,18)+"…";const s=t.match(/^[Qq]0*(\d+)$/);return s?s[1]:t||"单选题"}function Rs(e,n,t){var $e,de,X,y,k;ce(),Pe(10);const s=t.from==="daily"||t.from==="wrong"?t.from:"topic",a=t.qid,u=t.topic?decodeURIComponent(t.topic):"";if(!a&&!u&&!t.from){window.location.replace("#/");return}let r=a?n.find(m=>m.id===a):void 0;if(!r){const m=fn(n);r=m?n.find(S=>S.id===m.id):n[0]}const l=le(n);let h=u?l.find(m=>m.name===u):r?($e=Ne(n,r.id))==null?void 0:$e.topic:l[0];h||(h=l[0]);const w=V();if(s==="wrong"&&!h.questions.some(m=>K(w[m.id]))){const m=l.find(S=>S.questions.some(D=>K(w[D.id])));if(!m){window.location.replace("#/wrong");return}h=m,(!r||!K(w[r.id]))&&(r=m.questions.find(S=>K(w[S.id])))}const F=t.sec?parseInt(t.sec,10):void 0,M=F!=null?`&sec=${F}`:"";let b=h.questions,i=h.name;if(s==="daily")b=r?[r]:[n[0]],i="今日一题";else if(s==="wrong"){const m=h.questions.filter(S=>K(w[S.id]));m.length>0&&(b=m)}else if(s==="topic"&&F!=null){const S=ft(h.questions,h.index,h.name).find(D=>D.index===F);S&&(b=S.questions,i=`${h.name} · 第${F}节`)}const T=b.length;let L=0,E=0,q=0;for(const m of b){const S=w[m.id];S&&qe(S,s)&&(L++,S.result==="correct"?E++:S.result==="wrong"&&q++)}const o=Math.max(0,T-L),c=94.25,d=T>0?(E/T*c).toFixed(2):"0",g=T>0?(q/T*c).toFixed(2):"0",p=`-${d}`,f=(r==null?void 0:r.id)||(b[0]?b[0].id:""),C=t.retry?`&retry=${t.retry}`:"",v=`#/q/${f}?from=${s}${M}${C}`,I=b.find(m=>!qe(w[m.id],s)),P=I||r||b[0],z=b.indexOf(P)+1,ie=b.map((m,S)=>{const D=S+1,$=w[m.id],x=qe($,s),H=x&&($==null?void 0:$.result)==="correct",O=x&&($==null?void 0:$.result)==="wrong",W=m.id===f,U=Ps(m),Z=m.topic;return H?`
          <button
            class="overview-card overview-card-correct ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${m.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">${D}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已学习
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${Le(U)}</span>
              <span class="overview-card-tag tag-correct">${Le(Z)}</span>
            </div>
          </button>
        `:O?`
          <button
            class="overview-card overview-card-wrong ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${m.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">${D}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${Le(U)}</span>
              <span class="overview-card-tag tag-wrong">${Le(Z)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${m.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">${D}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${Le(U)}</span>
              <span class="overview-card-tag tag-unanswered">${Le(Z)}</span>
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
          <h1 class="overview-page-title">${Le(i)} · 题目总览</h1>
          <p class="overview-page-sub">共 ${T} 题 · 知识点强化</p>
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
              ${parseFloat(d)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#52643b" stroke-dasharray="${d} ${c}" stroke-dashoffset="0" stroke-width="3.8"></circle>`:""}
              ${parseFloat(g)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${g} ${c}" stroke-dashoffset="${p}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${L}/${T}</span>
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
              <span class="overview-submitted-chip">已作答 ${L} 题</span>
            </div>

            <div class="overview-legend-items">
              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-green"></span>
                  <span>已学习</span>
                </div>
                <span class="overview-legend-num">${E} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-orange"></span>
                  <span>待巩固</span>
                </div>
                <span class="overview-legend-num">${q} 题</span>
              </div>

              <div class="overview-legend-row">
                <div class="overview-legend-label">
                  <span class="overview-legend-dot dot-gray"></span>
                  <span>未作答</span>
                </div>
                <span class="overview-legend-num">${o} 题</span>
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
            <span class="overview-grid-count-chip">${T} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${ie}
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
            <span>${I?`继续第 ${z} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(de=document.getElementById("overview-back-btn"))==null||de.addEventListener("click",()=>{Q(v)}),(X=document.getElementById("overview-return-btn"))==null||X.addEventListener("click",()=>{Q(v)}),(y=document.getElementById("overview-dock-left"))==null||y.addEventListener("click",()=>{Q(v)}),(k=document.getElementById("overview-dock-right"))==null||k.addEventListener("click",()=>{Q(`#/q/${P.id}?from=${s}${M}${C}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(m=>{m.addEventListener("click",()=>{const S=m.getAttribute("data-qid");S&&Q(`#/q/${S}?from=${s}${M}${C}`)})})}const me=document.getElementById("app");let he=[],ot=!1;function Ae(){const{path:e}=Qe();if(e==="/"||e==="")me.innerHTML=gs(he);else if(e==="/topics")me.innerHTML=vs(he);else if(e.startsWith("/topic/")){const t=e.slice(7);me.innerHTML=ms(he,t)}else if(e==="/wrong"){me.innerHTML=$s(he);const t=me.querySelector('[data-testid="wrong-start"]');t==null||t.addEventListener("click",s=>{if(s.preventDefault(),ot)return;ot=!0,setTimeout(()=>{ot=!1},300);const a=ys(he);a&&(location.hash=`#/q/${a}?from=wrong`)})}else e==="/me"&&(me.innerHTML=xs(he,Ae));const n=mn(e);n!=null&&Pe(n)}async function Cn(){var n;hn();try{he=await Dn()}catch{me.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Cn()});return}Ce("/",()=>{ce(),Ae()}),Ce("/topics",()=>{ce(),Ae()}),Ce("/wrong",()=>{ce(),Ae()}),Ce("/me",()=>{ce(),Ae()}),Ce("/topic/:topicIndex",()=>{ce(),Ae()}),Ce("/q/:id",(t,s)=>{ce();const a=t.id,u=s.from||"topic",r=s.sec?parseInt(s.sec,10):void 0,l=s.retry==="1"||s.retry==="true";cn(me,he,a,u,{sec:r,retry:l})}),Ce("/done/:kind/:topicIndex",(t,s)=>{ce();const u=le(he)[Number(t.topicIndex)];if(!u||!u.questions.length){Q("#/");return}const r=t.kind==="wrong"?"wrong":"topic",l=s.sec?parseInt(s.sec,10):void 0,h=r==="topic"?u.questions[u.questions.length-1].id:u.questions[0].id;cn(me,he,h,r,{endCard:!0,sec:l})}),Ce("/overview",(t,s)=>{ce(),Rs(me,he,s)}),Pn(()=>{Q("#/")}),jn(()=>{const{path:t}=Qe();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ae()});const e=()=>{const{path:t}=Qe();(t==="/"||t==="")&&Ae()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Rn()}Cn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
