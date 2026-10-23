(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const d of s)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const d={};return s.integrity&&(d.integrity=s.integrity),s.referrerPolicy&&(d.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?d.credentials="include":s.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function a(s){if(s.ep)return;s.ep=!0;const d=t(s);fetch(s.href,d)}})();let lt=null;async function Nn(e=!1){if(lt&&!e)return lt;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return lt=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function pe(e){const n=new Map;for(const s of e)n.has(s.topic)||n.set(s.topic,[]),n.get(s.topic).push(s);const t=[];let a=0;for(const[s,d]of n.entries())t.push({name:s,index:a,questions:d}),a++;return t}function et(e,n){const t=pe(e);for(const a of t){const s=a.questions.findIndex(d=>d.id===n);if(s!==-1)return{topic:a,indexInTopic:s}}return null}const $n=[];let xn=()=>{};function xe(e,n){const t=[],a=e.replace(/:([a-zA-Z0-9_]+)/g,(d,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),s=new RegExp(`^${a}$`);$n.push({regex:s,paramNames:t,handler:n})}function Qn(e){xn=e}function de(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function Z(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?wt():window.location.hash=n}function tt(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),a=n.startsWith("/")?n:"/"+n,s={};return t&&new URLSearchParams(t).forEach((r,c)=>{s[c]=r}),{path:a,query:s}}function wt(){de();const{path:e,query:n}=tt();for(const t of $n){const a=e.match(t.regex);if(a){const s={};t.paramNames.forEach((d,r)=>{s[d]=a[r+1]?decodeURIComponent(a[r+1]):""}),t.handler(s,n);return}}xn({},n)}function Vn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",wt),wt()}const nt="pydrill.v1.records",St="pydrill.v1.last",Ct="pydrill.days",bt=new Set;function Gn(e){return bt.add(e),()=>{bt.delete(e)}}function kn(){for(const e of bt)try{e()}catch(n){console.error("Error in store listener:",n)}}function se(e){if(!e||!e.inWrongBook)return!1;const n=typeof e.choice=="string"&&e.choice.length>0,t=e.result==="wrong"||e.result==="correct";return n&&t}function Yn(e){let n=!1;for(const t of Object.keys(e)){const a=e[t];if(a&&a.inWrongBook){const s=typeof a.choice=="string"&&a.choice.length>0,d=a.result==="wrong"||a.result==="correct";(!s||!d)&&(a.inWrongBook=!1,n=!0)}}return n}function K(){try{const e=localStorage.getItem(nt);if(!e)return{};const n=JSON.parse(e);if(typeof n!="object"||n===null)return{};const t=n;if(Yn(t))try{localStorage.setItem(nt,JSON.stringify(t))}catch(a){console.error("Failed to save sanitized records to localStorage:",a)}return t}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Ee(e){return K()[e]}function Ne(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function Sn(e){try{localStorage.setItem(nt,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}kn()}function Qe(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${a}`}function Cn(){try{const e=localStorage.getItem(Ct);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function Ln(e){const n=Qe(),t=Cn();if(!t.includes(n)){t.push(n);try{localStorage.setItem(Ct,JSON.stringify(t))}catch(a){console.error("Failed to save active days to localStorage:",a)}}}function Zn(e,n){Ln();const t=K(),a=t[e.id],s=se(a);let d,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(d="correct",r=s):(d="wrong",r=!0):(d="ungraded",r=!1);const p=s&&(d==="correct"||d==="wrong"),v={choice:n,result:d,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:p};if(d==="wrong")v.lastWrongChoice=n,v.lastWrongAt=v.submittedAt;else{const h=Ne(a);h&&(v.lastWrongChoice=h,typeof(a==null?void 0:a.lastWrongAt)=="number"?v.lastWrongAt=a.lastWrongAt:(a==null?void 0:a.result)==="wrong"&&(v.lastWrongAt=a.submittedAt))}return t[e.id]=v,Sn(t),v}function en(e){const n=K();n[e]&&(n[e]={...n[e],inWrongBook:!1},Sn(n))}function Kn(){try{localStorage.removeItem(nt)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(St)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(Ct)}catch(e){console.error("Failed to clear active days:",e)}kn()}function En(e){try{const n=localStorage.getItem(St);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const a=t.id,s=t.at;return typeof a!="string"||a.length===0||typeof s!="number"||!Number.isFinite(s)||!e.some(d=>d.id===a)?null:{id:a,at:s}}catch(n){return console.warn("Failed to parse last position:",n),null}}function Jn(e){try{localStorage.setItem(St,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function st(e){const n=K();return e.filter(t=>se(n[t.id]))}function Xn(e){const n=K(),t=e.length;let a=0;for(const s of e)n[s.id]&&a++;return{done:a,total:t}}const es="pydrill.devPageIds";function yt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function ts(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:yt(new URLSearchParams(e.slice(n+1)).get("dev"))}function ns(){return!0}function An(){const e=ts();if(e!==null)return e;const n=yt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=yt(localStorage.getItem(es));if(t!==null)return t}catch{}return ns()}function Tn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:e==="/lab/water"?99:null}function tn(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function ss(e){return Number(e.getAttribute("data-page")||0)}function Re(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!An()){n==null||n.remove();return}const t=e===99?"试玩":`P${e}`,a=n??(()=>{const s=document.createElement("div");return s.className="dev-page-id",s.setAttribute("data-testid","dev-page-id"),s.setAttribute("aria-hidden","true"),document.body.appendChild(s),s})();if(a.textContent=t,a.setAttribute("data-page",String(e)),a.title=e===99?"方案B水瓶试玩（实验）":"长按打开方案B水瓶试玩 #/lab/water",a.classList.add("is-lab-entry"),!a.dataset.labBound){a.dataset.labBound="1";let s=null;const d=()=>{s!=null&&(window.clearTimeout(s),s=null)};a.addEventListener("pointerdown",r=>{ss(a)!==99&&(d(),s=window.setTimeout(()=>{s=null,window.location.hash="#/lab/water"},650),r.stopPropagation())}),a.addEventListener("pointerup",d),a.addEventListener("pointerleave",d),a.addEventListener("pointercancel",d)}}function as(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),a=n.getMonth(),s=n.getDate();return(Math.floor(Date.UTC(t,a,s)/864e5)%e+e)%e}function rs(e,n=new Date){if(e.length===0)return;const t=as(e.length,n);return e[t]}function os(e,n){const t=new Date(e),a=new Date(n);return t.getFullYear()===a.getFullYear()&&t.getMonth()===a.getMonth()&&t.getDate()===a.getDate()}function is(e,n=new Date){const t=Ee(e.id),a=n.getTime();return!t||!os(t.submittedAt,a)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function cs(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ls(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ds(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ps(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function $t(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function us(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function gs(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Fn(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function fs(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function hs(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function vs(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function xt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function nn(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function ms(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function Lt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function qn(){return`<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24" width="16">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>`}function je(e,n=0){if(e==="none")return"";const t=e==="home",a=e==="topics",s=e==="wrong",d=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${cs(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${a?"active":""}" data-testid="tab-topics">
          ${ls(a)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${s?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${ds(s)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${d?"active":""}" data-testid="tab-me">
          ${ps(d)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const ws=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,Ge=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,bs=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,ys=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,$s=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function dt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function xs(e){const n=K(),a=st(e).length,s=pe(e),d=s.length,r=rs(e),c=r?is(r):{statusText:"今天还没做",isCompletedToday:!1},p=r?et(e,r.id):null,v=p?p.indexInTopic+1:1,h=p?p.topic.questions.length:2,I=r?`${r.topic} · 第 ${v}/${h} 题`:"今日一题",y=new Date,o=`${y.getMonth()+1}月${y.getDate()}日`,x=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",S=s[0],F=(S==null?void 0:S.name)||"",q=S&&S.questions.length>0?S.questions.find(w=>!n[w.id])||S.questions[0]:void 0,l=En(e),i=l?e.find(w=>w.id===l.id):void 0,u=i?et(e,i.id):null,f=i!=null&&i.code?(i.code.split(`
`)[0]||"").trim():"",g=i&&u?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${nn(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${dt(u.topic.name)} · 第 ${u.indexInTopic+1}/${u.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${i.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${f?`<div class="continue-code"><code>${dt(f)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${nn(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${dt(F)}」开始吧，一次一小步。</p>
          ${q?`<a href="#/q/${q.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${ws}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${fs()}</span>
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
          <img src="${bs}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${c.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${ys}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${d} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${$s}" alt="温习本" class="entry-icon-direct" />
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
              <h3 class="daily-q-title">${I}</h3>
            </div>
            <span class="chip-status ${c.result==="correct"?"chip-green":c.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${c.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${r.stem}</p>

          ${x?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${x}</code></pre>
            </div>
          `:""}

          <div class="daily-action-row">
            <a href="#/q/${r.id}?from=daily" class="btn-primary daily-btn active-press" data-testid="daily-start">
              <span>${c.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${Ge}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${je("home",a)}
  `}const ks={"字符串/循环":["字符串操作","循环控制"],"元组/引用":["元组基础","引用与可变性","同一性与拷贝"],"函数/默认参数":["函数定义与返回值","参数传递与调用","默认参数机制"],"列表/切片":["切片索引与步长","列表修改与拷贝"],字典:["访问与成员检查","常用字典方法","键的特性与哈希"],"作用域/变量":["全局与局部变量","变量生命周期","嵌套作用域与闭包"],"类/对象":["类属性与实例属性","方法定义与调用","继承与特殊方法"],异常处理:["异常捕获与匹配","流程控制与清理","异常抛出与自定义"]},Mn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Bn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Et(e,n,t){const a=[],s=new Map;let d=0,r=null;for(const y of e){const o=y.subtopic&&y.subtopic.trim()?y.subtopic.trim():null;if(o){r=null;let x=s.get(o);x||(x={name:o,questions:[]},s.set(o,x),a.push(x)),x.questions.push(y)}else(!r||r.questions.length>=10)&&(d++,r={name:`第 ${d} 节`,questions:[]},a.push(r)),r.questions.push(y)}const c=ks[t]||[],p=y=>{const o=c.indexOf(y);return o<0?c.length:o};a.sort((y,o)=>p(y.name)-p(o.name));const v=y=>typeof y.difficulty=="number"?y.difficulty:2;for(const y of a)y.questions.sort((o,x)=>v(o)-v(x)||(o.id<x.id?-1:o.id>x.id?1:0));const h=[];let I=1;for(const y of a)for(let o=0;o<y.questions.length;o+=10){const x=y.questions.slice(o,o+10),S=x.reduce((q,l)=>q+(typeof l.difficulty=="number"?l.difficulty:2),0),F=Math.max(1,Math.min(3,Math.round(S/x.length)));h.push({index:I,name:y.name,topicIndex:n,topicName:t,questions:x,avgDifficulty:F}),I++}return h}function pt(e,n){const t=e.questions.length;let a=0;for(const c of e.questions)n[c.id]&&a++;const s=t>0&&a===t,d=a>0&&!s;return{submittedCount:a,totalCount:t,isCompleted:s,isInProgress:d,isNotStarted:a===0}}const ut={"字符串/循环":"#7a9a5c","元组/引用":"#8a6b55","函数/默认参数":"#c47a3a","列表/切片":"#5f8a7a",字典:"#9a6b7a","作用域/变量":"#6b7a8a","类/对象":"#8a7a5c",异常处理:"#a07050"},Ss="#7a9a5c";function At(e){if(ut[e])return ut[e];for(const[n,t]of Object.entries(ut))if(e.includes(n)||n.includes(e))return t;return Ss}function sn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Cs(e){const n=pe(e),t=K(),a=e.filter(r=>!!t[r.id]).length,s=st(e).length,d=n.map((r,c)=>{const p=Mn[r.name]??Bn[r.name],v=r.questions.filter(S=>!!t[S.id]).length,h=r.questions.length,I=h>0?v/h*100:0,y=I===0?"0":I.toFixed(1),o=I===0?"0%":`${I.toFixed(1)}%`,x=At(r.name);return`
        <article
          class="card paper-card topic-card topic-progress-card active-press"
          data-testid="topic-card-${c}"
          onclick="window.location.hash = '#/topic/${c}'"
        >
          <div
            class="card-bar-fill"
            data-testid="topic-card-fill-${c}"
            data-pct="${y}"
            data-submitted="${v}"
            data-total="${h}"
            style="width: ${o}; background-color: ${x}; color: ${x};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">
              ${Lt(r.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${sn(r.name)}</h2>
                <span class="topic-index-badge">#${String(c+1).padStart(2,"0")}</span>
              </div>
              ${p?`<p class="topic-sub" data-testid="topic-sub-${c}">${sn(p)}</p>`:""}
            </div>
            <span class="sr-only" data-testid="topic-progress-${c}">${v} / ${h}</span>
            <div class="topic-chevron-col" aria-hidden="true">
              ${qn()}
            </div>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${xt()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已完成 ${a} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Ge}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${d}
      </section>
    </div>

    ${je("topics",s)}
  `}function Ke(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ls(e,n){const t=pe(e),a=parseInt(n,10),s=t[a]||t[0];if(!s)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const d=K(),r=st(e).length,c=Et(s.questions,s.index,s.name),p=Mn[s.name]||Bn[s.name]||"";let v=0;for(const g of c)pt(g,d).isCompleted&&v++;const h=c.length,I=h>0?v/h:0,y=150.8,o=(y*(1-I)).toFixed(1),x=c.map(g=>{const{submittedCount:w,totalCount:T,isCompleted:$,isInProgress:P}=pt(g,d);let O="";$?O=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="0"/>
            </svg>
            <svg class="sec-ring-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        `:P?O=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-w/T)).toFixed(1)}"/>
            </svg>
            <span class="sec-ring-num is-progress">${g.index}</span>
          </div>
        `:O=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
            </svg>
            <span class="sec-ring-num">${g.index}</span>
          </div>
        `;let N="";$?N='<span class="sec-tag tag-done">已完成</span>':P?N='<span class="sec-tag tag-progress">进行中</span>':N='<span class="sec-tag tag-pending">未开始</span>';let ae="";g.avgDifficulty===1?ae='<span class="diff-dot dot-green"></span><span>入门</span>':g.avgDifficulty===2?ae='<span class="diff-dot dot-orange"></span><span>进阶</span>':ae='<span class="diff-dot dot-orange"></span><span class="diff-dot dot-orange"></span><span>挑战</span>';const oe=`#/q/${(g.questions.find(A=>!d[A.id])||g.questions[0]).id}?from=topic&sec=${g.index}${$?"&retry=1":""}`;let J="";return $?J=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${g.index}" onclick="window.location.hash='${oe}'">
            再练一次
          </button>
        `:P?J=`
          <button type="button" class="sec-btn sec-btn-primary active-press" data-testid="sec-btn-${g.index}" onclick="window.location.hash='${oe}'">
            <span>继续</span>
            <svg class="sec-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        `:J=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${g.index}" onclick="window.location.hash='${oe}'">
            开始练
          </button>
        `,`
        <div class="${P?"topic-detail-sec-row is-in-progress":"topic-detail-sec-row"}" data-testid="sec-row-${g.index}">
          ${P?'<span class="sec-accent-bar" aria-hidden="true"></span>':""}
          ${O}
          <div class="sec-row-center">
            <div class="sec-row-title-line">
              <span class="sec-row-title">${g.index} ${Ke(g.name)}</span>
              ${N}
            </div>
            <div class="sec-row-meta-line">
              <span class="sec-diff-badge">${ae}</span>
              <span class="sec-meta-sep">·</span>
              <span class="sec-count-mono" data-testid="sec-count-${g.index}">${w}/${T}</span>
            </div>
          </div>
          ${J}
        </div>
      `}).join(""),S=c.find(g=>!pt(g,d).isCompleted),F=!S,q=F?c[0]:S,l=q.index,i=F?"再练 第1节":`继续 第${l}节`,f=`#/q/${(q.questions.find(g=>!d[g.id])||q.questions[0]).id}?from=topic&sec=${l}${F?"&retry=1":""}`;return`
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
          <h2 class="topic-detail-name">${Ke(s.name)}</h2>
          ${p?`<p class="topic-detail-intro">${Ke(p)}</p>`:""}
          <div class="topic-detail-counts">
            <span>共 ${h} 小节</span>
            <span class="topic-detail-counts-dot">·</span>
            <span>${s.questions.length} 道题目</span>
          </div>
        </div>

        <div class="topic-detail-big-ring-wrap" data-testid="detail-ring" aria-label="已完成 ${v}/${h} 节">
          <svg class="topic-detail-big-ring-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" class="topic-detail-ring-track" stroke-width="5"/>
            ${v>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${y}" stroke-dashoffset="${o}"/>`:""}
          </svg>
          <div class="topic-detail-big-ring-inner">
            <span class="topic-detail-ring-fraction">${v}/${h}<span class="topic-detail-ring-unit">节</span></span>
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
        ${x}
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
            <span class="bottom-bar-title">第 ${l} 节 · ${Ke(q.name)}</span>
          </div>
          <button
            type="button"
            class="bottom-bar-cta-btn active-press"
            data-testid="detail-continue"
            onclick="window.location.hash='${f}'"
          >
            <span>${i}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    ${je("topics",r)}
  `}const Es=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function As(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const gt="pydrill.lastRandomWrong";function Ts(e){const n=K(),t=e.filter(r=>se(n[r.id]));if(t.length===0)return null;if(t.length===1){const r=t[0].id;try{sessionStorage.setItem(gt,r)}catch{}return r}let a=null;try{a=sessionStorage.getItem(gt)}catch{}const s=a&&t.some(r=>r.id===a)?t.filter(r=>r.id!==a):t,d=s[Math.floor(Math.random()*s.length)];try{sessionStorage.setItem(gt,d.id)}catch{}return d.id}function Fs(e,n){var p;const t=K(),a=pe(e),s=e.filter(v=>se(t[v.id])),d=s.length;if(d===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${xt()}</span>
            </div>
            <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Ge}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="温习本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${Es}" alt="空白小本子" class="wrong-empty-img" />
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

      ${je("wrong",0)}
    `;const r=((p=s[Math.floor(Math.random()*s.length)])==null?void 0:p.id)??"",c=a.map(v=>{const h=v.questions.filter(l=>se(t[l.id]));if(h.length===0)return"";const I=v.questions.filter(l=>!!t[l.id]).length,y=v.questions.length,o=y>0?I/y*100:0,x=o===0?"0":o.toFixed(1),S=o===0?"0%":`${o.toFixed(1)}%`,F=At(v.name),q=String(v.index+1).padStart(2,"0");return`
        <a
          class="topic-progress-card wrong-topic-card active-press"
          data-testid="wrong-topic-${v.index}"
          href="#/q/${h[0].id}?from=wrong"
        >
          <div
            class="card-bar-fill"
            data-testid="wrong-topic-fill-${v.index}"
            data-pct="${x}"
            data-submitted="${I}"
            data-total="${y}"
            style="width: ${S}; background-color: ${F}; color: ${F};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">${Lt(v.name)}</div>
            <div class="wrong-topic-main">
              <div class="wrong-topic-name-row">
                <span class="wrong-topic-name">${As(v.name)}</span>
                <span class="wrong-topic-index">#${q}</span>
              </div>
              <div class="wrong-topic-meta">
                <span class="topic-meta-highlight" data-testid="wrong-topic-count-${v.index}">${h.length}</span> 题待巩固
              </div>
            </div>
            <div class="topic-chevron-col" aria-hidden="true">
              ${qn()}
            </div>
          </div>
        </a>
      `}).join("");return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">温习本</h1>
            <span class="title-doodle-leaf">${xt()}</span>
          </div>
          <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Ge}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <a href="#/q/${r}?from=wrong" class="btn-primary wrong-start-btn active-press" data-testid="wrong-start">
          <span>随机抽一题</span>
        </a>
      </section>

      <section class="wrong-topic-list" aria-label="有待巩固题的知识点">
        ${c}
      </section>
    </div>

    ${je("wrong",d)}
  `}const Je=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function ft(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qs(e){const n=new Date(e),t=new Date,a=Qe(t),s=Qe(n);if(s===a)return"今天";const d=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return s===Qe(d)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function Ms(e,n){const t=K(),a=pe(e),s=st(e).length,d=Cn(),r=d.length,c=new Date,p=c.getDay(),v=p===0?-6:1-p,h=new Date(c.getFullYear(),c.getMonth(),c.getDate()+v),I=["一","二","三","四","五","六","日"],y=new Set(d);let o=0;const x=I.map((u,f)=>{const g=new Date(h.getFullYear(),h.getMonth(),h.getDate()+f),w=Qe(g),T=y.has(w);return T&&o++,`
        <div class="day-dot-item">
          <span class="day-name">${u}</span>
          <div class="day-dot ${T?"active is-on":""}" data-testid="me-week-dot-${f}"></div>
        </div>
      `}).join(""),S=a.map((u,f)=>{const{done:g,total:w}=Xn(u.questions);let T="";return g>0&&(T=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(g/w*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${f}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${u.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${T}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${f}">${g}/${w}</span>
          </div>
          <span class="ring-label">${ft(u.name)}</span>
        </div>
      `}).join(""),F=s>0?`<div class="review-count-highlight">${s} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',q=Object.entries(t).filter(([u,f])=>typeof f.submittedAt=="number").sort((u,f)=>f[1].submittedAt-u[1].submittedAt).slice(0,3);let l="";q.length===0?l='<div class="recent-empty">还没有练习记录</div>':l=q.map(([u,f],g)=>{const w=e.find(N=>N.id===u);if(!w)return"";const T=w.title||(w.stem?w.stem.split(`
`)[0].trim():"Python 练习题"),$=T.match(/^[Qq]0*(\d+)$/),P=$?$[1]:T,O=qs(f.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${g}" onclick="window.location.hash='#/q/${w.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${ft(P)}</div>
              <div class="recent-topic-sub">· ${ft(w.topic)}</div>
            </div>
            <span class="recent-time">${O}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const u=document.getElementById("clear-confirm-modal");u&&u.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const u=document.getElementById("clear-confirm-modal");u&&u.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Kn();const u=document.getElementById("clear-confirm-modal");u&&u.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=u=>{try{localStorage.setItem("pydrill.devPageIds",u?"true":"false")}catch{}const f=Tn("/me");Re(f)});const i=An();return`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Card -->
      <header class="card paper-card profile-header-card select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Je}" alt="小芽啾" class="me-avatar-img" />
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
          ${x}
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
            ${vs()}
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

    ${je("me",s)}
  `}const kt=globalThis;kt.Prism=kt.Prism??{};kt.Prism.manual=!0;var an=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Bs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ht={exports:{}},rn;function Is(){return rn||(rn=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(a){var s=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,r={},c={manual:a.Prism&&a.Prism.manual,disableWorkerMessageHandler:a.Prism&&a.Prism.disableWorkerMessageHandler,util:{encode:function l(i){return i instanceof p?new p(i.type,l(i.content),i.alias):Array.isArray(i)?i.map(l):i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(l){return Object.prototype.toString.call(l).slice(8,-1)},objId:function(l){return l.__id||Object.defineProperty(l,"__id",{value:++d}),l.__id},clone:function l(i,u){u=u||{};var f,g;switch(c.util.type(i)){case"Object":if(g=c.util.objId(i),u[g])return u[g];f={},u[g]=f;for(var w in i)i.hasOwnProperty(w)&&(f[w]=l(i[w],u));return f;case"Array":return g=c.util.objId(i),u[g]?u[g]:(f=[],u[g]=f,i.forEach(function(T,$){f[$]=l(T,u)}),f);default:return i}},getLanguage:function(l){for(;l;){var i=s.exec(l.className);if(i)return i[1].toLowerCase();l=l.parentElement}return"none"},setLanguage:function(l,i){l.className=l.className.replace(RegExp(s,"gi"),""),l.classList.add("language-"+i)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(f){var l=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(f.stack)||[])[1];if(l){var i=document.getElementsByTagName("script");for(var u in i)if(i[u].src==l)return i[u]}return null}},isActive:function(l,i,u){for(var f="no-"+i;l;){var g=l.classList;if(g.contains(i))return!0;if(g.contains(f))return!1;l=l.parentElement}return!!u}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(l,i){var u=c.util.clone(c.languages[l]);for(var f in i)u[f]=i[f];return u},insertBefore:function(l,i,u,f){f=f||c.languages;var g=f[l],w={};for(var T in g)if(g.hasOwnProperty(T)){if(T==i)for(var $ in u)u.hasOwnProperty($)&&(w[$]=u[$]);u.hasOwnProperty(T)||(w[T]=g[T])}var P=f[l];return f[l]=w,c.languages.DFS(c.languages,function(O,N){N===P&&O!=l&&(this[O]=w)}),w},DFS:function l(i,u,f,g){g=g||{};var w=c.util.objId;for(var T in i)if(i.hasOwnProperty(T)){u.call(i,T,i[T],f||T);var $=i[T],P=c.util.type($);P==="Object"&&!g[w($)]?(g[w($)]=!0,l($,u,null,g)):P==="Array"&&!g[w($)]&&(g[w($)]=!0,l($,u,T,g))}}},plugins:{},highlightAll:function(l,i){c.highlightAllUnder(document,l,i)},highlightAllUnder:function(l,i,u){var f={callback:u,container:l,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};c.hooks.run("before-highlightall",f),f.elements=Array.prototype.slice.apply(f.container.querySelectorAll(f.selector)),c.hooks.run("before-all-elements-highlight",f);for(var g=0,w;w=f.elements[g++];)c.highlightElement(w,i===!0,f.callback)},highlightElement:function(l,i,u){var f=c.util.getLanguage(l),g=c.languages[f];c.util.setLanguage(l,f);var w=l.parentElement;w&&w.nodeName.toLowerCase()==="pre"&&c.util.setLanguage(w,f);var T=l.textContent,$={element:l,language:f,grammar:g,code:T};function P(N){$.highlightedCode=N,c.hooks.run("before-insert",$),$.element.innerHTML=$.highlightedCode,c.hooks.run("after-highlight",$),c.hooks.run("complete",$),u&&u.call($.element)}if(c.hooks.run("before-sanity-check",$),w=$.element.parentElement,w&&w.nodeName.toLowerCase()==="pre"&&!w.hasAttribute("tabindex")&&w.setAttribute("tabindex","0"),!$.code){c.hooks.run("complete",$),u&&u.call($.element);return}if(c.hooks.run("before-highlight",$),!$.grammar){P(c.util.encode($.code));return}if(i&&a.Worker){var O=new Worker(c.filename);O.onmessage=function(N){P(N.data)},O.postMessage(JSON.stringify({language:$.language,code:$.code,immediateClose:!0}))}else P(c.highlight($.code,$.grammar,$.language))},highlight:function(l,i,u){var f={code:l,grammar:i,language:u};if(c.hooks.run("before-tokenize",f),!f.grammar)throw new Error('The language "'+f.language+'" has no grammar.');return f.tokens=c.tokenize(f.code,f.grammar),c.hooks.run("after-tokenize",f),p.stringify(c.util.encode(f.tokens),f.language)},tokenize:function(l,i){var u=i.rest;if(u){for(var f in u)i[f]=u[f];delete i.rest}var g=new I;return y(g,g.head,l),h(l,g,i,g.head,0),x(g)},hooks:{all:{},add:function(l,i){var u=c.hooks.all;u[l]=u[l]||[],u[l].push(i)},run:function(l,i){var u=c.hooks.all[l];if(!(!u||!u.length))for(var f=0,g;g=u[f++];)g(i)}},Token:p};a.Prism=c;function p(l,i,u,f){this.type=l,this.content=i,this.alias=u,this.length=(f||"").length|0}p.stringify=function l(i,u){if(typeof i=="string")return i;if(Array.isArray(i)){var f="";return i.forEach(function(P){f+=l(P,u)}),f}var g={type:i.type,content:l(i.content,u),tag:"span",classes:["token",i.type],attributes:{},language:u},w=i.alias;w&&(Array.isArray(w)?Array.prototype.push.apply(g.classes,w):g.classes.push(w)),c.hooks.run("wrap",g);var T="";for(var $ in g.attributes)T+=" "+$+'="'+(g.attributes[$]||"").replace(/"/g,"&quot;")+'"';return"<"+g.tag+' class="'+g.classes.join(" ")+'"'+T+">"+g.content+"</"+g.tag+">"};function v(l,i,u,f){l.lastIndex=i;var g=l.exec(u);if(g&&f&&g[1]){var w=g[1].length;g.index+=w,g[0]=g[0].slice(w)}return g}function h(l,i,u,f,g,w){for(var T in u)if(!(!u.hasOwnProperty(T)||!u[T])){var $=u[T];$=Array.isArray($)?$:[$];for(var P=0;P<$.length;++P){if(w&&w.cause==T+","+P)return;var O=$[P],N=O.inside,ae=!!O.lookbehind,fe=!!O.greedy,oe=O.alias;if(fe&&!O.pattern.global){var J=O.pattern.toString().match(/[imsuy]*$/)[0];O.pattern=RegExp(O.pattern.source,J+"g")}for(var k=O.pattern||O,A=f.next,b=g;A!==i.tail&&!(w&&b>=w.reach);b+=A.value.length,A=A.next){var E=A.value;if(i.length>l.length)return;if(!(E instanceof p)){var D=1,C;if(fe){if(C=v(k,b,l,ae),!C||C.index>=l.length)break;var U=C.index,L=C.index+C[0].length,_=b;for(_+=A.value.length;U>=_;)A=A.next,_+=A.value.length;if(_-=A.value.length,b=_,A.value instanceof p)continue;for(var W=A;W!==i.tail&&(_<L||typeof W.value=="string");W=W.next)D++,_+=W.value.length;D--,E=l.slice(b,_),C.index-=b}else if(C=v(k,0,E,ae),!C)continue;var U=C.index,z=C[0],X=E.slice(0,U),Se=E.slice(U+z.length),ie=b+E.length;w&&ie>w.reach&&(w.reach=ie);var te=A.prev;X&&(te=y(i,te,X),b+=X.length),o(i,te,D);var m=new p(T,N?c.tokenize(z,N):z,oe,z);if(A=y(i,te,m),Se&&y(i,A,Se),D>1){var M={cause:T+","+P,reach:ie};h(l,i,u,A.prev,b,M),w&&M.reach>w.reach&&(w.reach=M.reach)}}}}}}function I(){var l={value:null,prev:null,next:null},i={value:null,prev:l,next:null};l.next=i,this.head=l,this.tail=i,this.length=0}function y(l,i,u){var f=i.next,g={value:u,prev:i,next:f};return i.next=g,f.prev=g,l.length++,g}function o(l,i,u){for(var f=i.next,g=0;g<u&&f!==l.tail;g++)f=f.next;i.next=f,f.prev=i,l.length-=g}function x(l){for(var i=[],u=l.head.next;u!==l.tail;)i.push(u.value),u=u.next;return i}if(!a.document)return a.addEventListener&&(c.disableWorkerMessageHandler||a.addEventListener("message",function(l){var i=JSON.parse(l.data),u=i.language,f=i.code,g=i.immediateClose;a.postMessage(c.highlight(f,c.languages[u],u)),g&&a.close()},!1)),c;var S=c.util.currentScript();S&&(c.filename=S.src,S.hasAttribute("data-manual")&&(c.manual=!0));function F(){c.manual||c.highlightAll()}if(!c.manual){var q=document.readyState;q==="loading"||q==="interactive"&&S&&S.defer?document.addEventListener("DOMContentLoaded",F):window.requestAnimationFrame?window.requestAnimationFrame(F):window.setTimeout(F,16)}return c})(n);e.exports&&(e.exports=t),typeof an<"u"&&(an.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(a){a.type==="entity"&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(s,d){var r={};r["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[d]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var c={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};c["language-"+d]={pattern:/[\s\S]+/,inside:t.languages[d]};var p={};p[s]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return s}),"i"),lookbehind:!0,greedy:!0,inside:c},t.languages.insertBefore("markup","cdata",p)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(a,s){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+a+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[s,"language-"+s],inside:t.languages[s]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(a){var s=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+s.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+s.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+s.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+s.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:s,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},a.languages.css.atrule.inside.rest=a.languages.css;var d=a.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var a="Loading…",s=function(S,F){return"✖ Error "+S+" while fetching file: "+F},d="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},c="data-src-status",p="loading",v="loaded",h="failed",I="pre[data-src]:not(["+c+'="'+v+'"]):not(['+c+'="'+p+'"])';function y(S,F,q){var l=new XMLHttpRequest;l.open("GET",S,!0),l.onreadystatechange=function(){l.readyState==4&&(l.status<400&&l.responseText?F(l.responseText):l.status>=400?q(s(l.status,l.statusText)):q(d))},l.send(null)}function o(S){var F=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(S||"");if(F){var q=Number(F[1]),l=F[2],i=F[3];return l?i?[q,Number(i)]:[q,void 0]:[q,q]}}t.hooks.add("before-highlightall",function(S){S.selector+=", "+I}),t.hooks.add("before-sanity-check",function(S){var F=S.element;if(F.matches(I)){S.code="",F.setAttribute(c,p);var q=F.appendChild(document.createElement("CODE"));q.textContent=a;var l=F.getAttribute("data-src"),i=S.language;if(i==="none"){var u=(/\.(\w+)$/.exec(l)||[,"none"])[1];i=r[u]||u}t.util.setLanguage(q,i),t.util.setLanguage(F,i);var f=t.plugins.autoloader;f&&f.loadLanguages(i),y(l,function(g){F.setAttribute(c,v);var w=o(F.getAttribute("data-range"));if(w){var T=g.split(/\r\n?|\n/g),$=w[0],P=w[1]==null?T.length:w[1];$<0&&($+=T.length),$=Math.max(0,Math.min($-1,T.length)),P<0&&(P+=T.length),P=Math.max(0,Math.min(P,T.length)),g=T.slice($,P).join(`
`),F.hasAttribute("data-start")||F.setAttribute("data-start",String($+1))}q.textContent=g,t.highlightElement(q)},function(g){F.setAttribute(c,h),q.textContent=g})}}),t.plugins.fileHighlight={highlight:function(F){for(var q=(F||document).querySelectorAll(I),l=0,i;i=q[l++];)t.highlightElement(i)}};var x=!1;t.fileHighlight=function(){x||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),x=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(ht)),ht.exports}var Ps=Is();const on=Bs(Ps);var cn={},ln;function Ds(){return ln||(ln=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),cn}Ds();function Hs(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((s,d)=>{const r=d+1,p=on.highlight(s,on.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${p}</span></div>`}).join("")}</code></pre></div>`}function dn(e){const n=e.match(/^[Qq]0*(\d+)$/);return n?n[1]:e}function pn(e){const n=new Date(e),t=n.getMonth()+1,a=n.getDate(),s=String(n.getHours()).padStart(2,"0"),d=String(n.getMinutes()).padStart(2,"0");return`${t}月${a}日 ${s}:${d}`}function re(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const un=200,gn=1600,fn=300,_s=1800;let Ie=0,be=0,hn=!1;function Rs(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let Xe="#/overview";function js(e,n){return n<=3?Array.from({length:n},(t,a)=>a):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function Ve(){Ie+=1,be&&(window.clearTimeout(be),be=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function Os(){hn||(hn=!0,window.addEventListener("hashchange",Ve))}function Ws(e,n){const t=n.getBoundingClientRect(),a=t.left+t.width/2,s=e.offsetWidth,d=e.offsetHeight,r=1,c=6,p=40,v=8,h=document.documentElement.clientWidth;let I=a+r+p+c,y=I-s;y<v&&(y=v,I=y+s),I>h-v&&(I=h-v,y=Math.max(v,I-s),I=y+s);let o=I-r-c-a;const x=12,S=Math.max(x,s-r*2-12-x);o<x&&(o=x),o>S&&(o=S),e.style.right=`${Math.round(h-I)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-d)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(o)}px`)}function Us(e,n){if(n!==Ie||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(s=>s.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:fn,easing:"ease",fill:"forwards"}),a=()=>{n===Ie&&e.remove()};t.onfinish=a,window.setTimeout(a,fn+60)}function vt(e,n,t,a){be&&window.clearTimeout(be),be=window.setTimeout(()=>{if(be=0,!(n!==Ie||!e.isConnected)){if(!a){e.remove();return}Us(e,n)}},t)}function zs(e=Xe){var c;const n=document.getElementById("q-next-btn");if(!n)return;Xe=e,Ie+=1;const t=Ie;be&&(window.clearTimeout(be),be=0);const a=Rs();let s=document.querySelector(".finish-tip");const d=!!s;if(s?document.querySelectorAll(".finish-tip").forEach(p=>{p!==s&&p.remove()}):(s=document.createElement("div"),s.className="finish-tip tip-bubble",s.setAttribute("data-testid","tip-bubble"),s.setAttribute("role","status"),s.setAttribute("aria-live","polite"),s.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(s),(c=s.querySelector(".finish-tip-tag"))==null||c.addEventListener("click",p=>{p.stopPropagation(),Ve(),Z(Xe)})),Ws(s,n),a){s.getAnimations().forEach(p=>p.cancel()),s.style.opacity="1",s.style.transform="none",vt(s,t,_s,!1);return}if(d){s.getAnimations().forEach(p=>p.cancel()),s.style.opacity="1",s.style.transform="translateY(0)",vt(s,t,gn,!0);return}const r=s.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:un,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==Ie||!s.isConnected||(s.style.opacity="1",s.style.transform="translateY(0)")},vt(s,t,un+gn,!0)}function vn(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${re(t)}</code>`)}function Ns(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let a=e,s="";n!==-1&&(a=e.slice(0,n).trim(),s=e.slice(n+t).trim(),s=s.replace(/^[：:\s]+/,""));const d=a.split(/\n+/).map(c=>c.trim()).filter(Boolean).map(c=>`<p class="explanation-p">${vn(c)}</p>`).join("");let r="";if(s){const c=vn(s);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Fn(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${c}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${d}
      ${r}
    </div>
  `}function _e(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function Qs(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),a=n.querySelector(".code-header");if(!t)return;const s=()=>{const d=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",d),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${a?a.offsetHeight:0}px`),s(),t.addEventListener("scroll",s,{passive:!0})})}function mn(e,n,t,a="topic",s={}){Os(),Ve(),de();const d=a==="daily"||a==="wrong"?a:"topic",r=n.find(k=>k.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Re(tn(d,!1));return}if(d==="wrong"&&!s.endCard&&!se(Ee(r.id))){window.location.replace(`#/q/${r.id}?from=topic`);return}s.endCard||Jn(r.id);const c=et(n,r.id),p=(c==null?void 0:c.topic)||pe(n)[0],v=c?c.indexInTopic:0,h=p.questions.length,I=Ee(r.id);p.questions.filter(k=>se(K()[k.id])).length;const y=!!s.retry&&d==="topic",o={from:d,sec:s.sec,retry:y,prevChoice:I==null?void 0:I.choice,selectedChoice:d==="wrong"||y?null:I?I.choice:null,isRedoing:y,wrongFresh:d==="wrong",showLastTrace:!1,showEndCard:!!s.endCard&&d!=="daily",justRemovedWrong:!1},x=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let S=0,F=null,q=!1;const l='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',i='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function u(k){return/Error|Exception/.test(k)}function f(k,A,b,E){return A!=="graded"?b===k?"selected":"idle":r.answer&&k===r.answer?"correct":b===k&&(E==null?void 0:E.result)==="wrong"?"wrong":"locked"}function g(k,A,b){const E=k.querySelector(".opt-badge"),D=k.querySelector(".opt-text"),C=k.querySelector(".opt-status");if(!E||!D||!C)return;const L=k.getAttribute("data-error")==="1";k.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),E.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),D.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),k.setAttribute("aria-checked",b?"true":"false"),A==="correct"?k.setAttribute("data-state","correct"):A==="wrong"?k.setAttribute("data-state","wrong"):k.removeAttribute("data-state"),A==="selected"||A==="correct"?(k.classList.add(A==="correct"?"opt-card-correct":"opt-card-selected"),A==="selected"&&k.classList.add("opt-pressable"),E.classList.add(A==="correct"?"opt-badge-correct":"opt-badge-selected"),D.classList.add("opt-text-strong"),C.innerHTML=l):A==="wrong"?(k.classList.add("opt-card-wrong"),E.classList.add("opt-badge-wrong"),D.classList.add("opt-text-strong","opt-text-wrong"),C.innerHTML=i):A==="locked"?(k.classList.add("opt-card-locked"),E.classList.add("opt-badge-default"),L&&D.classList.add("opt-text-error"),C.innerHTML=""):(k.classList.add("opt-card-default","opt-pressable"),E.classList.add("opt-badge-default"),L&&D.classList.add("opt-text-error"),C.innerHTML="")}function w(k,A,b,E){const D=u(k.text),C=["option-item"],L=["opt-badge"],_=["opt-text"];let W="",U="";A==="selected"?(C.push("opt-card-selected","opt-pressable"),L.push("opt-badge-selected"),_.push("opt-text-strong"),W=l):A==="correct"?(C.push("opt-card-correct"),L.push("opt-badge-correct"),_.push("opt-text-strong"),W=l,U='data-state="correct"'):A==="wrong"?(C.push("opt-card-wrong"),L.push("opt-badge-wrong"),_.push("opt-text-strong","opt-text-wrong"),W=i,U='data-state="wrong"'):A==="locked"?(C.push("opt-card-locked"),L.push("opt-badge-default"),D&&_.push("opt-text-error")):(C.push("opt-card-default","opt-pressable"),L.push("opt-badge-default"),D&&_.push("opt-text-error"));const z=(k.hint||"").trim(),X=E!=="none"&&z?`<div class="opt-hint-clip${E==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${re(k.key)}">${re(z)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${b?"true":"false"}"
            ${U}
            class="${C.join(" ")}"
            data-testid="option-${re(k.key)}"
            data-key="${re(k.key)}"
            data-error="${D?"1":"0"}"
          >
            <span class="${L.join(" ")}">${re(k.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${_.join(" ")}">${re(k.text)}</span>
                <span class="opt-status">${W}</span>
              </div>
              ${X}
            </div>
          </div>
        `}const T='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',$='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let P=0;function O(){var A;(A=document.getElementById("pydrill-wrong-toast"))==null||A.remove();const k=document.createElement("div");k.id="pydrill-wrong-toast",k.className="wrong-toast",k.setAttribute("role","status"),k.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(k),window.setTimeout(()=>{k.remove()},1500)}function N(){const k=e.querySelector("#q-toggle-last");if(!k)return;const A=o.showLastTrace;k.setAttribute("aria-pressed",A?"true":"false");const b=k.querySelector("span");b&&(b.textContent=A?"隐藏上次":"看上次思路");const E=k.querySelector("svg");E&&(E.outerHTML=A?$:T)}function ae(k,A,b,E){const D=(A.hint||"").trim(),C=k.querySelector(".opt-body");if(!C)return;let L=k.querySelector(".opt-hint-clip");if(b&&D){L||(L=document.createElement("div"),L.className="opt-hint-clip",L.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${re(A.key)}">${re(D)}</p></div>`,C.appendChild(L));const _=L;requestAnimationFrame(()=>{requestAnimationFrame(()=>{E===P&&_.classList.add("is-open")})})}else if(L){L.classList.remove("is-open");const _=L,W=E,U=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{W===P&&_.remove()},U?0:200)}}function fe(k){const A=++P,b=Ee(r.id),E=o.from==="topic"&&(o.prevChoice||(b==null?void 0:b.choice))||Ne(b),D=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(L=>{const _=L.getAttribute("data-key")||"",W=r.options.find(M=>M.key===_);if(!k){const M=o.selectedChoice===_;g(L,M?"selected":"idle",M),W&&ae(L,W,!1,A);return}const U=L.querySelector(".opt-badge"),z=L.querySelector(".opt-text"),X=L.querySelector(".opt-status");if(!U||!z||!X)return;const Se=L.getAttribute("data-error")==="1",ie=!!E&&_===E,te=!!D&&_===D;L.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),U.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),z.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),L.setAttribute("aria-checked","false"),L.removeAttribute("data-state"),ie&&!te?(L.classList.add("opt-card-trace-last"),U.classList.add("opt-badge-trace-last"),z.classList.add("opt-text-strong","opt-text-trace-last")):te?(L.classList.add("opt-card-trace-correct"),U.classList.add("opt-badge-trace-correct"),z.classList.add("opt-text-strong","opt-text-trace-correct")):(L.classList.add("opt-card-default","opt-card-trace-dim"),U.classList.add("opt-badge-default"),Se&&z.classList.add("opt-text-error"));const m=[];ie&&m.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${re(_)}">上次选的 ${re(_)}</span>`),te&&m.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${re(_)}">正确答案 ${re(_)}</span>`),X.innerHTML=m.length?`<span class="opt-trace-tag-row">${m.join("")}</span>`:"",W&&ae(L,W,ie||te,A)});const C=e.querySelector("#q-submit-btn");if(C){const L=k||!o.selectedChoice;C.disabled=L,C.classList.toggle("btn-disabled",L)}}function oe(k){Re(tn(o.from,o.showEndCard)),(k||o.showEndCard)&&de()}function J(){var jt,Ot,Wt,Ut,zt,Nt,Qt,Vt,Gt,Yt,Zt,Kt,Jt;Ve();const k=++S,A=F!==r.id;F=r.id;const b=Ee(r.id),E=o.from==="topic"?!!(o.prevChoice||b!=null&&b.choice||Ne(b)):Ne(b).length>0,C=o.isRedoing||o.wrongFresh?void 0:b,L=!!C;L&&(o.showLastTrace=!1);const _=q&&L;q=!1;const W=o.sec!=null?`&sec=${o.sec}`:"",U=o.from==="topic"&&o.retry?"&retry=1":"";let z="#/topics";o.from==="daily"&&(z="#/"),o.from==="wrong"&&(z="#/wrong"),o.from==="topic"&&o.sec!=null&&(z=`#/topic/${p.index}`);const X=`#/overview?from=${o.from}&qid=${r.id}${o.from==="topic"?"&topic="+encodeURIComponent(p.name):""}${W}${U}`;Xe=X;let Se="题目总览";o.from==="daily"&&(Se="今日一题");let ie=null,te=null,m=!1,M=!1,R=p.questions,G=v;if(o.from==="wrong"){const B=K();R=p.questions.filter(H=>se(B[H.id])),G=R.findIndex(H=>H.id===r.id)}else if(o.from==="topic"&&o.sec!=null){const H=Et(p.questions,p.index,p.name).find(j=>j.index===o.sec);H&&(R=H.questions,G=R.findIndex(j=>j.id===r.id))}o.from==="daily"?(M=!0,m=!0,R=[r],G=0):G<0?(M=!0,m=!0):(M=G===0,m=G>=R.length-1,M||(ie=R[G-1].id),m||(te=R[G+1].id));const Fe=K(),Oe=R.length>0&&R.every(B=>_e(Fe[B.id],o.from)),Pe=m&&!Oe,qe=G>=0?G+1:1,De=o.from==="wrong"?Math.max(R.length,1):o.sec!=null?R.length:h,We=o.from==="wrong"?`${p.name} · 温习 ${qe}/${De}`:o.from==="daily"?`今日一题 · ${p.name}`:o.sec!=null?`${p.name} · 第${o.sec}节 ${qe}/${De}`:`${p.name} · 第 ${v+1}/${h} 题`;if(o.showEndCard){if(o.from==="daily"){Z("#/");return}const B=o.from==="topic",H=K();let j="",Q="",V="#/topics",ee="返回知识点列表",me="",He="",ye="";if(B){if(o.sec!=null)j=`第 ${o.sec} 节做完了`,Q=`这一节共 ${R.length} 道题目，循序渐进掌握每一个知识点`,V=`#/topic/${p.index}`,ee="返回小节列表",ye="",He="";else{let Y=0;for(const ne of p.questions)((jt=H[ne.id])==null?void 0:jt.result)==="wrong"&&Y++;j="这个知识点做完了",Y>0?(Q=`今天发现 ${Y} 道需要巩固的题`,ye=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):Q="这一组你已经完全掌握了",V="#/topics",ee="返回知识点列表";const we=pe(n),Ce=we.findIndex(ne=>ne.name===p.name),le=Ce!==-1&&Ce<we.length-1?we[Ce+1]:null;le&&le.questions.length>0&&(He=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}me=`
          <div class="end-questions-list">
            ${(o.sec!=null?R:p.questions).map((Y,we)=>{const Ce=we+1,le=H[Y.id],ne=(le==null?void 0:le.result)==="correct",ce=(le==null?void 0:le.result)==="wrong";let Le="end-chip-gray",ue="· 未做";ne?(Le="end-chip-green",ue="✓ 已完成"):ce&&(Le="end-chip-red",ue="待巩固");const ot=dn(Y.title&&Y.title.trim()?Y.title.trim():Y.code?Y.code.split(`
`)[0].trim():Y.stem);return`
              <a href="${`#/q/${Y.id}?from=topic${W}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${Ce} 题</span>
                  <span class="end-q-code">${re(ot)}</span>
                </div>
                <span class="end-chip ${Le}">${ue}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const he=p.questions.filter(ne=>se(H[ne.id])),$e=he.length,Y=he.filter(ne=>{var ce;return((ce=H[ne.id])==null?void 0:ce.result)==="correct"}).length;j="温习本这一轮看完了",Y>0?Q=`好样的！你已经纠正了 ${Y} 道之前做错的题。`:Q="再练一轮，会越来越熟。",V="#/wrong",ee="返回温习本",$e>0?me=`
            <div class="end-questions-list">
              ${he.map((ce,Le)=>{const ue=H[ce.id],ot=(ue==null?void 0:ue.result)==="correct",Xt=(ue==null?void 0:ue.result)==="wrong";let it="end-chip-gray",ct="· 未做";ot?(it="end-chip-green",ct="✓ 答对"):Xt&&(it="end-chip-red",ct="待巩固");const zn=dn(ce.title&&ce.title.trim()?ce.title.trim():ce.code?ce.code.split(`
`)[0].trim():ce.stem);return`
                <a href="#/q/${ce.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${Le+1}/${$e}</span>
                    <span class="end-q-code">${re(zn)}</span>
                  </div>
                  <span class="end-chip ${it}">${ct}</span>
                </a>
              `}).join("")}
            </div>
          `:me=`
            <div class="end-empty-row">
              ${ms(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const we=pe(n),Ce=we.findIndex(ne=>ne.name===p.name);let le=null;if(Ce!==-1)for(let ne=1;ne<we.length;ne++){const Le=we[(Ce+ne)%we.length].questions.find(ue=>se(H[ue.id]));if(Le){le=Le.id;break}}le&&(He=`
            <a
              href="#/q/${le}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const ze=o.from==="wrong"?"温习本 · 完成":`${p.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${x}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${$t()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${ze}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Je}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${j}</h2>
              <p class="end-sub" data-testid="end-subtitle">${Q}</p>

              ${me}

              <div class="end-action-wrap flex-col-gap">
                ${ye}
                <button
                  type="button"
                  class="${ye?"btn-secondary":"btn-primary"} w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${ee}
                </button>
                ${He}
              </div>
            </div>
          </main>
        </div>
      `,(Ot=document.getElementById("q-back-btn"))==null||Ot.addEventListener("click",()=>{Z(z)}),(Wt=document.getElementById("end-leave-btn"))==null||Wt.addEventListener("click",()=>{Z(V)}),(Ut=document.getElementById("end-next-topic-btn"))==null||Ut.addEventListener("click",()=>{const he=pe(n),$e=he.findIndex(Y=>Y.name===p.name);if($e!==-1&&$e<he.length-1){const Y=he[$e+1];Z(`#/q/${Y.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(he=>{he.addEventListener("click",$e=>{const Y=he.getAttribute("href");Y&&($e.preventDefault(),Z(Y))})}),oe(A);return}const Ze=L?_?"pending":"graded":"answering",Dn=Ze==="answering"?"none":Ze==="pending"?"closed":"open",Tt=Ze==="graded"?(C==null?void 0:C.choice)??null:o.selectedChoice,Hn=r.options.map(B=>w(B,f(B.key,Ze,Tt,C),Tt===B.key,Dn)).join("");let Ft="";if(L&&C){let B=Je,H="答对了，理解到位";const j=pn(C.submittedAt);let Q=`你选了 ${C.choice} · 正确答案 ${r.answer} · ${j} 提交`,V="banner-correct",ee="",me="";C.result==="wrong"?(B=Ge,H="这题有个小坑，看看解析",Q=`你选了 ${C.choice} · 正确答案是 ${r.answer} · ${j} 提交`,V="banner-wrong",C.inWrongBook&&(ee='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):C.result==="correct"?C.inWrongBook&&o.from!=="wrong"?me=`
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
          `):C.result==="ungraded"&&(B=Je,H="已提交（未判分）",Q=`这题的答案还没编写 · ${j} 提交`,V="banner-ungraded"),Ft=`
        <section class="result-banner ${V}" data-testid="result-banner" data-result="${C.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${B}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${H}</h2>
              <p class="result-sub">${Q}</p>
              ${ee?`<div class="result-tag-wrap result-tag-below">${ee}</div>`:""}
            </div>
          </div>
          ${me}
        </section>
      `}let qt="";if(L&&C){const B=Ns(r.explanation);qt=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Fn()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${B}
          </div>
        </section>
      `}let Mt="";r.animationId!=null&&L&&(Mt=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let Bt="";if(o.isRedoing&&o.from!=="wrong"){const B=Ee(r.id);if(B){const H=B.result==="correct"?"已学习":B.result==="wrong"?"待巩固":"已提交",j=pn(B.submittedAt);Bt=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${H}（选 ${B.choice} · ${j}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const It=o.from==="wrong"||o.sec!=null?R:p.questions,_n=o.from!=="wrong"||L,Rn=It.length,jn=js(Math.max(0,G),Rn).map(B=>{const H=It[B],j=B+1,Q=H.id===r.id,V=Ee(H.id),ee=_n&&_e(V,o.from),me=ee&&(V==null?void 0:V.result)==="correct",He=ee&&(V==null?void 0:V.result)==="wrong";let ye="switcher-unanswered",ze=`<span>${j}</span>`;return me?(ye="switcher-correct",ze=us()):He&&(ye="switcher-wrong",ze=gs()),Q&&(ye+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${ye} active-press"
            data-testid="q-switch-${j}"
            data-qid="${H.id}"
            title="第 ${j} 题"
          >
            ${ze}
          </button>
        `}).join(""),On=L?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${hs(14)}
          <span>重做</span>
        </button>
      `:"",Pt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${M?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${M?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,Dt=m?"完成":"下一题 ›",Ht=m?' data-action="finish"':"",_t=Pe?" btn-finish-locked":"",Rt=Pe?' aria-disabled="true"':"",Wn=`
      <button
        type="button"
        class="btn-nav-next active-press${_t}"
        data-testid="next"
        id="q-next-btn"${Ht}${Rt}
      >
        <span>${Dt}</span>
      </button>
    `,Un=`
      <button
        type="button"
        class="btn-next-main active-press${_t}"
        data-testid="next"
        id="q-next-btn"${Ht}${Rt}
      >
        <span>${Dt}</span>
      </button>
    `;let at="";if(L)at=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${Pt}
            ${On}
            ${Un}
          </div>
        </div>
      `;else{const B=!!o.selectedChoice;at=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${Pt}
            <button
              type="button"
              class="btn-submit-main active-press ${B?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${B?"":"disabled"}
            >
              <span>${B?"提交答案":"提交"}</span>
            </button>
            ${Wn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${x}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${$t()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${We}</span>
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
              <span>${Se}</span>
            </button>
            ${o.from==="wrong"||o.from==="topic"&&(o.retry||o.isRedoing)?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${o.showLastTrace?"true":"false"}" ${E?"":"disabled"}>
                    ${o.showLastTrace?$:T}
                    <span>${o.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${jn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${Bt}

          <!-- 4. Result Banner (if submitted) -->
          ${Ft}

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
          ${qt}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${Mt}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${at}
      </div>
    `,(zt=document.getElementById("q-back-btn"))==null||zt.addEventListener("click",()=>{Z(z)}),(Nt=document.getElementById("q-overview-chip"))==null||Nt.addEventListener("click",()=>{Z(X)}),L)(Vt=document.getElementById("q-redo-btn"))==null||Vt.addEventListener("click",()=>{var B;o.isRedoing=!0,o.prevChoice=(B=Ee(r.id))==null?void 0:B.choice,o.selectedChoice=null,o.showLastTrace=!1,o.justRemovedWrong=!1,J()}),o.from!=="wrong"&&((Gt=document.getElementById("q-remove-wrong-btn"))==null||Gt.addEventListener("click",()=>{en(r.id),o.justRemovedWrong=!0,J()}));else{const B=e.querySelectorAll(".option-item");B.forEach(H=>{H.addEventListener("click",()=>{if(o.showLastTrace)return;const j=H.getAttribute("data-key");if(!j||j===o.selectedChoice)return;o.selectedChoice=j,B.forEach(V=>{const ee=V.getAttribute("data-key")===j;g(V,ee?"selected":"idle",ee)});const Q=e.querySelector("#q-submit-btn");if(Q){Q.disabled=!1,Q.classList.remove("btn-disabled");const V=Q.querySelector("span");V&&(V.textContent="提交答案")}})}),(Qt=document.getElementById("q-submit-btn"))==null||Qt.addEventListener("click",()=>{!o.selectedChoice||o.showLastTrace||(Zn(r,o.selectedChoice),o.isRedoing=!1,o.retry=!1,o.wrongFresh=!1,o.showLastTrace=!1,o.justRemovedWrong=!1,q=!0,J())})}o.from==="wrong"&&((Yt=document.getElementById("q-remove-wrong-btn"))==null||Yt.addEventListener("click",()=>{const B=r.id;en(B),O();const H=K(),j=p.questions.find(Q=>Q.id===B||!se(H[Q.id])?!1:p.questions.findIndex(V=>V.id===Q.id)>v);Z(j?`#/q/${j.id}?from=wrong`:"#/wrong")})),(Zt=document.getElementById("q-toggle-last"))==null||Zt.addEventListener("click",()=>{const B=e.querySelector("#q-toggle-last");if(!(!B||B.disabled)){if(o.showLastTrace=!o.showLastTrace,L&&!o.showLastTrace){J();return}N(),fe(o.showLastTrace)}}),(Kt=document.getElementById("q-prev-btn"))==null||Kt.addEventListener("click",()=>{ie&&Z(`#/q/${ie}?from=${o.from}${W}${U}`)}),(Jt=document.getElementById("q-next-btn"))==null||Jt.addEventListener("click",()=>{if(te){Z(`#/q/${te}?from=${o.from}${W}${U}`);return}const B=K();if(!(R.length>0&&R.every(Q=>_e(B[Q.id],o.from)))){zs(X);return}if(o.from==="daily"){Z("#/");return}const j=o.from==="wrong"?"wrong":"topic";Ve(),window.history.replaceState(null,"",z),window.location.hash=`#/done/${j}/${p.index}${o.sec!=null?"?sec="+o.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(B=>{B.addEventListener("click",()=>{const H=B.getAttribute("data-qid");H&&H!==r.id&&Z(`#/q/${H}?from=${o.from}${W}${U}`)})});const Ue=e.querySelector(".q-switcher-group"),rt=e.querySelector(".switcher-current");if(Ue&&rt){const B=rt.getBoundingClientRect().left-Ue.getBoundingClientRect().left,H=Ue.scrollLeft+B-(Ue.clientWidth-rt.offsetWidth)/2;Ue.scrollLeft=Math.max(0,H)}if(_&&C){const B=C;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(k!==S||!e.isConnected)return;const H=e.querySelector("[data-view-token]");!H||H.getAttribute("data-view-token")!==x||e.querySelectorAll(".option-item").forEach(j=>{var ee;const Q=j.getAttribute("data-key")||"",V=B.choice===Q;g(j,f(Q,"graded",B.choice,B),V),(ee=j.querySelector(".opt-hint-clip"))==null||ee.classList.add("is-open")})})})}Qs(e),oe(A)}J()}function Me(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Vs(e){const n=e.title||e.summary;if(n&&n.trim()){const s=n.trim(),d=s.match(/^[Qq]0*(\d+)$/);return d?d[1]:s}const t=(e.stem||"").split(`
`)[0].trim();if(t.length>20)return t.slice(0,18)+"…";const a=t.match(/^[Qq]0*(\d+)$/);return a?a[1]:t||"单选题"}function Gs(e,n,t){var fe,oe,J,k,A;de(),Re(10);const a=t.from==="daily"||t.from==="wrong"?t.from:"topic",s=t.qid,d=t.topic?decodeURIComponent(t.topic):"";if(!s&&!d&&!t.from){window.location.replace("#/");return}let r=s?n.find(b=>b.id===s):void 0;if(!r){const b=En(n);r=b?n.find(E=>E.id===b.id):n[0]}const c=pe(n);let p=d?c.find(b=>b.name===d):r?(fe=et(n,r.id))==null?void 0:fe.topic:c[0];p||(p=c[0]);const v=K();if(a==="wrong"&&!p.questions.some(b=>se(v[b.id]))){const b=c.find(E=>E.questions.some(D=>se(v[D.id])));if(!b){window.location.replace("#/wrong");return}p=b,(!r||!se(v[r.id]))&&(r=b.questions.find(E=>se(v[E.id])))}const h=t.sec?parseInt(t.sec,10):void 0,I=h!=null?`&sec=${h}`:"";let y=p.questions,o=p.name;if(a==="daily")y=r?[r]:[n[0]],o="今日一题";else if(a==="wrong"){const b=p.questions.filter(E=>se(v[E.id]));b.length>0&&(y=b)}else if(a==="topic"&&h!=null){const E=Et(p.questions,p.index,p.name).find(D=>D.index===h);E&&(y=E.questions,o=`${p.name} · 第${h}节`)}const x=y.length;let S=0,F=0,q=0;for(const b of y){const E=v[b.id];E&&_e(E,a)&&(S++,E.result==="correct"?F++:E.result==="wrong"&&q++)}const l=Math.max(0,x-S),i=94.25,u=x>0?(F/x*i).toFixed(2):"0",f=x>0?(q/x*i).toFixed(2):"0",g=`-${u}`,w=(r==null?void 0:r.id)||(y[0]?y[0].id:""),T=t.retry?`&retry=${t.retry}`:"",$=`#/q/${w}?from=${a}${I}${T}`,P=y.find(b=>!_e(v[b.id],a)),O=P||r||y[0],N=y.indexOf(O)+1,ae=y.map((b,E)=>{const D=E+1,C=v[b.id],L=_e(C,a),_=L&&(C==null?void 0:C.result)==="correct",W=L&&(C==null?void 0:C.result)==="wrong",U=b.id===w,z=Vs(b),X=b.topic;return _?`
          <button
            class="overview-card overview-card-correct ${U?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${b.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">${D}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已学习
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${Me(z)}</span>
              <span class="overview-card-tag tag-correct">${Me(X)}</span>
            </div>
          </button>
        `:W?`
          <button
            class="overview-card overview-card-wrong ${U?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${b.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">${D}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${Me(z)}</span>
              <span class="overview-card-tag tag-wrong">${Me(X)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${U?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${b.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">${D}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${Me(z)}</span>
              <span class="overview-card-tag tag-unanswered">${Me(X)}</span>
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
          <h1 class="overview-page-title">${Me(o)} · 题目总览</h1>
          <p class="overview-page-sub">共 ${x} 题 · 知识点强化</p>
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
              ${parseFloat(u)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#52643b" stroke-dasharray="${u} ${i}" stroke-dashoffset="0" stroke-width="3.8"></circle>`:""}
              ${parseFloat(f)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${f} ${i}" stroke-dashoffset="${g}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${S}/${x}</span>
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
                <span class="overview-legend-num">${q} 题</span>
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
            <span class="overview-grid-count-chip">${x} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${ae}
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
  `,(oe=document.getElementById("overview-back-btn"))==null||oe.addEventListener("click",()=>{Z($)}),(J=document.getElementById("overview-return-btn"))==null||J.addEventListener("click",()=>{Z($)}),(k=document.getElementById("overview-dock-left"))==null||k.addEventListener("click",()=>{Z($)}),(A=document.getElementById("overview-dock-right"))==null||A.addEventListener("click",()=>{Z(`#/q/${O.id}?from=${a}${I}${T}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(b=>{b.addEventListener("click",()=>{const E=b.getAttribute("data-qid");E&&Z(`#/q/${E}?from=${a}${I}${T}`)})})}function Ye(e,n,t){return Math.max(n,Math.min(t,e))}function Te(e){if(!Number.isFinite(e))return 0;let n=e%360;return n>180&&(n-=360),n<=-180&&(n+=360),n}function Ys(e,n,t=0){if(!Number.isFinite(e)||!Number.isFinite(n))return 0;const a=Number.isFinite(t)?t:0,s=Math.hypot(n,a);if(s<1e-6&&Math.abs(e)<1e-6)return 0;const d=Math.atan2(-e,s)*180/Math.PI;return Te(-d)}function Zs(e){return Number.isFinite(e)?Te(e):0}function Ks(e){if(e.length<3)return 0;let n=0;for(let t=0;t<e.length;t++){const a=e[t],s=e[(t+1)%e.length];n+=a.x*s.y-s.x*a.y}return Math.abs(n)/2}function wn(e,n,t){if(e.length===0)return[];const a=[],s=e.length,d=r=>(r.x-n.x)*t.x+(r.y-n.y)*t.y>=-1e-9;for(let r=0;r<s;r++){const c=e[r],p=e[(r+s-1)%s],v=d(c),h=d(p);if(v!==h){const I=c.x-p.x,y=c.y-p.y,o=I*t.x+y*t.y,x=Math.abs(o)<1e-12?0:((n.x-p.x)*t.x+(n.y-p.y)*t.y)/o;a.push({x:p.x+Ye(x,0,1)*I,y:p.y+Ye(x,0,1)*y})}v&&a.push(c)}return a}function bn(e,n){return[{x:0,y:0},{x:e,y:0},{x:e,y:n},{x:0,y:n}]}function Js(e,n,t,a){const s=Ye(t,0,1);if(e<=0||n<=0||s<=1e-6)return[];if(s>=1-1e-6)return bn(e,n);const d=Te(a)*Math.PI/180,r=Math.sin(d),c=Math.cos(d),p=bn(e,n),v=p.map(S=>S.x*r+S.y*c);let h=Math.min(...v),I=Math.max(...v);const y=s*e*n;for(let S=0;S<40;S++){const F=(h+I)/2,q={x:F*r,y:F*c},i=wn(p,q,{x:r,y:c});Ks(i)>y?h=F:I=F}const o=(h+I)/2,x={x:o*r,y:o*c};return wn(p,x,{x:r,y:c})}function Xs(e,n,t,a){const s=Js(e,n,t,a);return s.length<3?"polygon(0% 0%, 0% 0%, 0% 0%)":`polygon(${s.map(r=>{const c=Ye(r.x/e*100,-2,102),p=Ye(r.y/n*100,-2,102);return`${c.toFixed(2)}% ${p.toFixed(2)}%`}).join(", ")})`}const ea={"字符串/循环":40,"元组/引用":25,"函数/默认参数":0,"列表/切片":50,字典:0,"作用域/变量":25,"类/对象":0,异常处理:0};let ke=null;function yn(e,n,t){return Math.max(n,Math.min(t,e))}function ta(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Be(e){const n=Math.round(e);return`${n>0?"+":""}${n}°`}function na(e,n){var te;ke==null||ke(),ke=null;const t=K(),s=pe(n).map((m,M)=>{const R=m.questions.filter(qe=>!!t[qe.id]).length,G=m.questions.length,Fe=G>0?R/G*100:0,Oe=ea[m.name]??Math.round(Fe),Pe=At(m.name);return`
        <article
          class="bottle-card"
          data-testid="water-bottle-${M}"
          data-topic-index="${M}"
          data-real-pct="${Fe.toFixed(2)}"
          data-demo-pct="${Oe}"
          data-submitted="${R}"
          data-total="${G}"
          style="--water-color: ${Pe}; --horizon-angle: 0deg;"
        >
          <div class="bottle-vessel" data-testid="water-vessel-${M}">
            <div class="bottle-water" aria-hidden="true">
              <div class="bottle-water-inner" data-testid="water-fill-${M}"></div>
            </div>
            <div class="bottle-horizon" data-testid="water-horizon-${M}" aria-hidden="true"></div>
          </div>
          <div class="bottle-content">
            <div class="bottle-icon">${Lt(m.name)}</div>
            <div class="bottle-text">
              <div class="bottle-name-row">
                <span class="bottle-name">${ta(m.name)}</span>
                <span class="bottle-index">#${String(M+1).padStart(2,"0")}</span>
              </div>
              <div class="bottle-meta" data-testid="water-meta-${M}">
                已提交 ${R} / ${G} 题
              </div>
            </div>
            <span class="bottle-pill" data-testid="water-pill-${M}">${R}/${G}</span>
          </div>
        </article>
      `}).join("");e.innerHTML=`
    <div class="page-wrapper page-water-lab" data-testid="water-lab-page">
      <div class="water-lab-banner" data-testid="water-lab-banner">
        <span class="water-lab-tag">试玩 / 实验</span>
        <span>瓶身固定 · 重力/γ 驱动液面 · 红线=真水平</span>
      </div>

      <header class="water-lab-header">
        <div>
          <h1>躺瓶进度试玩</h1>
          <p>瓶子不转。优先手机重力加速度算左右倾；水面与红线同角（真水平）。</p>
        </div>
        <a class="water-lab-back" href="#/topics" data-testid="water-lab-back">
          ${$t()}<span>返回</span>
        </a>
      </header>

      <section class="water-lab-readout" data-testid="water-lab-readout" aria-live="polite">
        <div class="water-lab-readout-row">
          <span class="water-lab-readout-label">传感器</span>
          <span class="water-lab-readout-num" id="water-sensor-deg" data-testid="water-sensor-deg">+0°</span>
        </div>
        <div class="water-lab-readout-row">
          <span class="water-lab-readout-label">液面相对瓶</span>
          <span class="water-lab-readout-num" id="water-surface-deg" data-testid="water-surface-deg">+0°</span>
        </div>
        <p class="water-lab-readout-src" id="water-sensor-src" data-testid="water-sensor-src">来源：滑杆模拟</p>
      </section>

      <section class="water-lab-controls" aria-label="倾斜与演示">
        <label>
          <span>模拟左右倾（−180…180，右低为正）</span>
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
          红线 = 真水平参考（与液面同倾角）。可对照门框。优先重力 ax/ay，否则 γ。
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
  `,Re(99);const d=Array.from(e.querySelectorAll(".bottle-card")),r=e.querySelector("#water-tilt-slider"),c=e.querySelector("#water-tilt-val"),p=e.querySelector("#water-demo-fills"),v=e.querySelector("#water-sensor-hint"),h=e.querySelector(".water-lab-list"),I=e.querySelector("#water-sensor-deg"),y=e.querySelector("#water-surface-deg"),o=e.querySelector("#water-sensor-src");let x=0,S=0,F=!!(p!=null&&p.checked),q="sim",l=0,i=!1,u=0,f=0,g=0;const w=m=>{const M=Number(F?m.dataset.demoPct||0:m.dataset.realPct||0);return yn(M/100,0,1)},T=(m,M)=>{const R=m.querySelector(".bottle-vessel"),G=m.querySelector(".bottle-water-inner"),Fe=m.querySelector(".bottle-horizon");if(!G||!R)return;m.style.removeProperty("--bottle-tilt"),R.style.transform="none",G.style.transform="none";const Oe=R.clientWidth||m.clientWidth||320,Pe=R.clientHeight||66,qe=w(m),De=Xs(Oe,Pe,qe,M);G.style.clipPath=De,G.style.setProperty("-webkit-clip-path",De);const We=-M;m.style.setProperty("--horizon-angle",`${We.toFixed(3)}deg`),Fe&&(Fe.style.transform=`translate(-50%, -50%) rotate(${We.toFixed(3)}deg)`),m.dataset.tilt=M.toFixed(2),m.dataset.surfaceDeg=We.toFixed(2),m.dataset.fill=(qe*100).toFixed(1),G.dataset.clip=De},$=()=>{const m=S,M=S;if(I&&(I.textContent=Be(m)),y&&(y.textContent=Be(M)),o){const R=q==="motion"?"来源：DeviceMotion 重力 atan2(ax,ay)（忽略纯 pitch）":q==="gamma"?"来源：DeviceOrientation.gamma 原样":q==="sim"?"来源：滑杆模拟":"来源：无传感器";o.textContent=R}c&&(c.textContent=`${Math.round(S)}°`)},P=()=>{d.forEach(m=>T(m,S)),$(),r&&!i&&document.activeElement!==r&&(r.value=String(Math.round(S)))},O=()=>{let m=Te(x-S);S=Te(S+m*.28),Math.abs(m)<.05&&(S=Te(x)),P(),l=requestAnimationFrame(O)};l=requestAnimationFrame(O),requestAnimationFrame(()=>P());const N=m=>{q="sim",g=performance.now()+800,x=Te(yn(m,-180,180)),v&&(v.dataset.mode="sim",v.textContent=`滑杆 ${Be(x)} · 液面读数 ${Be(x)} · 红线=真水平（像素角 ${Be(-x)}）`)},ae=()=>{r&&N(Number(r.value))};r==null||r.addEventListener("input",ae);const fe=()=>{F=!!(p!=null&&p.checked),P()};p==null||p.addEventListener("change",fe);const oe=m=>{var M;h&&(i=!0,u=m.clientX,f=x,(M=h.setPointerCapture)==null||M.call(h,m.pointerId))},J=m=>{!i||!h||N(f+(m.clientX-u)/2)},k=m=>{var M;i&&(i=!1,(M=h==null?void 0:h.releasePointerCapture)==null||M.call(h,m.pointerId))};h==null||h.addEventListener("pointerdown",oe),h==null||h.addEventListener("pointermove",J),h==null||h.addEventListener("pointerup",k),h==null||h.addEventListener("pointercancel",k);const A=m=>{m.key==="ArrowLeft"?(m.preventDefault(),N(x-5)):m.key==="ArrowRight"?(m.preventDefault(),N(x+5)):m.key==="0"||m.key==="Home"?N(0):m.key==="End"&&(m.preventDefault(),N(180))};window.addEventListener("keydown",A);const b=(m,M)=>{performance.now()<g||(q=M,x=Te(m),v&&(v.dataset.mode="gyro",v.textContent=M==="motion"?`重力 roll ${Be(x)}（atan2；纯前后点头不改）。液面读数应同值。`:`γ ${Be(x)}（重力不可用时回退）。液面读数应同值。`))};let E=!1,D=!1,C=0,L=!1;const _=m=>{const M=m.accelerationIncludingGravity;if(!M||M.x==null||M.y==null)return;const R=M.z==null?0:M.z;C=performance.now(),L||(L=!0,D&&(window.removeEventListener("deviceorientation",W),D=!1)),b(Ys(M.x,M.y,R),"motion")},W=m=>{L||E&&C>0&&performance.now()-C<1500||m.gamma!=null&&b(Zs(m.gamma),"gamma")},U=()=>{E||(window.addEventListener("devicemotion",_),E=!0)},z=()=>{D||L||(window.addEventListener("deviceorientation",W),D=!0)},X=async()=>{const m=DeviceOrientationEvent,M=DeviceMotionEvent;try{typeof M.requestPermission=="function"?await M.requestPermission()==="granted"&&U():U()}catch{}try{typeof m.requestPermission=="function"?await m.requestPermission()==="granted"&&z():z()}catch{v&&(v.dataset.mode="sim",v.textContent="无法请求运动权限，请用滑杆模拟。")}v&&(E||D)&&(v.dataset.mode="gyro",v.textContent=E?"已开重力：纯前后点头水面应不动；只有左右倾才动水。":"仅 γ 回退（前后倾可能漂移）；优先用重力。")};if(!(typeof DeviceOrientationEvent.requestPermission=="function"||typeof DeviceMotionEvent.requestPermission=="function"))U(),z(),window.setTimeout(()=>{L&&D&&(window.removeEventListener("deviceorientation",W),D=!1)},800);else{const m=document.createElement("button");m.type="button",m.className="water-lab-back",m.style.marginTop="4px",m.textContent="开启手机重力/倾斜",m.setAttribute("data-testid","water-enable-gyro"),m.addEventListener("click",()=>{X(),m.remove()}),(te=e.querySelector(".water-lab-controls"))==null||te.appendChild(m)}const ie=()=>P();window.addEventListener("resize",ie),ke=()=>{cancelAnimationFrame(l),r==null||r.removeEventListener("input",ae),p==null||p.removeEventListener("change",fe),h==null||h.removeEventListener("pointerdown",oe),h==null||h.removeEventListener("pointermove",J),h==null||h.removeEventListener("pointerup",k),h==null||h.removeEventListener("pointercancel",k),window.removeEventListener("keydown",A),window.removeEventListener("resize",ie),E&&window.removeEventListener("devicemotion",_),D&&window.removeEventListener("deviceorientation",W)}}function In(){ke==null||ke(),ke=null}const ve=document.getElementById("app");let ge=[],mt=!1;function Ae(){In();const{path:e}=tt();if(e==="/"||e==="")ve.innerHTML=xs(ge);else if(e==="/topics")ve.innerHTML=Cs(ge);else if(e.startsWith("/topic/")){const t=e.slice(7);ve.innerHTML=Ls(ge,t)}else if(e==="/wrong"){ve.innerHTML=Fs(ge);const t=ve.querySelector('[data-testid="wrong-start"]');t==null||t.addEventListener("click",a=>{if(a.preventDefault(),mt)return;mt=!0,setTimeout(()=>{mt=!1},300);const s=Ts(ge);s&&(location.hash=`#/q/${s}?from=wrong`)})}else e==="/me"&&(ve.innerHTML=Ms(ge,Ae));const n=Tn(e);n!=null&&Re(n)}async function Pn(){var n;Ln();try{ge=await Nn()}catch{ve.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Pn()});return}xe("/",()=>{de(),Ae()}),xe("/topics",()=>{de(),Ae()}),xe("/wrong",()=>{de(),Ae()}),xe("/me",()=>{de(),Ae()}),xe("/topic/:topicIndex",()=>{de(),Ae()}),xe("/q/:id",(t,a)=>{de();const s=t.id,d=a.from||"topic",r=a.sec?parseInt(a.sec,10):void 0,c=a.retry==="1"||a.retry==="true";mn(ve,ge,s,d,{sec:r,retry:c})}),xe("/done/:kind/:topicIndex",(t,a)=>{de();const d=pe(ge)[Number(t.topicIndex)];if(!d||!d.questions.length){Z("#/");return}const r=t.kind==="wrong"?"wrong":"topic",c=a.sec?parseInt(a.sec,10):void 0,p=r==="topic"?d.questions[d.questions.length-1].id:d.questions[0].id;mn(ve,ge,p,r,{endCard:!0,sec:c})}),xe("/overview",(t,a)=>{de(),Gs(ve,ge,a)}),xe("/lab/water",()=>{de(),In(),na(ve,ge)}),Qn(()=>{Z("#/")}),Gn(()=>{const{path:t}=tt();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ae()});const e=()=>{const{path:t}=tt();(t==="/"||t==="")&&Ae()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Vn()}Pn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
