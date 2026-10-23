(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(a){if(a.ep)return;a.ep=!0;const d=t(a);fetch(a.href,d)}})();let nt=null;async function Dn(e=!1){if(nt&&!e)return nt;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return nt=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function le(e){const n=new Map;for(const a of e)n.has(a.topic)||n.set(a.topic,[]),n.get(a.topic).push(a);const t=[];let s=0;for(const[a,d]of n.entries())t.push({name:a,index:s,questions:d}),s++;return t}function Ve(e,n){const t=le(e);for(const s of t){const a=s.questions.findIndex(d=>d.id===n);if(a!==-1)return{topic:s,indexInTopic:a}}return null}const pn=[];let un=()=>{};function xe(e,n){const t=[],s=e.replace(/:([a-zA-Z0-9_]+)/g,(d,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),a=new RegExp(`^${s}$`);pn.push({regex:a,paramNames:t,handler:n})}function _n(e){un=e}function ce(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function V(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?lt():window.location.hash=n}function ze(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),s=n.startsWith("/")?n:"/"+n,a={};return t&&new URLSearchParams(t).forEach((r,l)=>{a[l]=r}),{path:s,query:a}}function lt(){ce();const{path:e,query:n}=ze();for(const t of pn){const s=e.match(t.regex);if(s){const a={};t.paramNames.forEach((d,r)=>{a[d]=s[r+1]?decodeURIComponent(s[r+1]):""}),t.handler(a,n);return}}un({},n)}function Rn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",lt),lt()}const Ge="pydrill.v1.records",ht="pydrill.v1.last",vt="pydrill.days",dt=new Set;function jn(e){return dt.add(e),()=>{dt.delete(e)}}function gn(){for(const e of dt)try{e()}catch(n){console.error("Error in store listener:",n)}}function ee(e){if(!e||!e.inWrongBook)return!1;const n=typeof e.choice=="string"&&e.choice.length>0,t=e.result==="wrong"||e.result==="correct";return n&&t}function On(e){let n=!1;for(const t of Object.keys(e)){const s=e[t];if(s&&s.inWrongBook){const a=typeof s.choice=="string"&&s.choice.length>0,d=s.result==="wrong"||s.result==="correct";(!a||!d)&&(s.inWrongBook=!1,n=!0)}}return n}function z(){try{const e=localStorage.getItem(Ge);if(!e)return{};const n=JSON.parse(e);if(typeof n!="object"||n===null)return{};const t=n;if(On(t))try{localStorage.setItem(Ge,JSON.stringify(t))}catch(s){console.error("Failed to save sanitized records to localStorage:",s)}return t}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Le(e){return z()[e]}function De(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function fn(e){try{localStorage.setItem(Ge,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}gn()}function _e(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${s}`}function hn(){try{const e=localStorage.getItem(vt);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function vn(e){const n=_e(),t=hn();if(!t.includes(n)){t.push(n);try{localStorage.setItem(vt,JSON.stringify(t))}catch(s){console.error("Failed to save active days to localStorage:",s)}}}function Wn(e,n){vn();const t=z(),s=t[e.id],a=ee(s);let d,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(d="correct",r=a):(d="wrong",r=!0):(d="ungraded",r=!1);const f=a&&(d==="correct"||d==="wrong"),m={choice:n,result:d,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:f};if(d==="wrong")m.lastWrongChoice=n,m.lastWrongAt=m.submittedAt;else{const w=De(s);w&&(m.lastWrongChoice=w,typeof(s==null?void 0:s.lastWrongAt)=="number"?m.lastWrongAt=s.lastWrongAt:(s==null?void 0:s.result)==="wrong"&&(m.lastWrongAt=s.submittedAt))}return t[e.id]=m,fn(t),m}function Vt(e){const n=z();n[e]&&(n[e]={...n[e],inWrongBook:!1},fn(n))}function Un(){try{localStorage.removeItem(Ge)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(ht)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(vt)}catch(e){console.error("Failed to clear active days:",e)}gn()}function mn(e){try{const n=localStorage.getItem(ht);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const s=t.id,a=t.at;return typeof s!="string"||s.length===0||typeof a!="number"||!Number.isFinite(a)||!e.some(d=>d.id===s)?null:{id:s,at:a}}catch(n){return console.warn("Failed to parse last position:",n),null}}function Nn(e){try{localStorage.setItem(ht,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Ye(e){const n=z();return e.filter(t=>ee(n[t.id]))}function Qn(e){const n=z(),t=e.length;let s=0;for(const a of e)n[a.id]&&s++;return{done:s,total:t}}const Vn="pydrill.devPageIds";function pt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function zn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:pt(new URLSearchParams(e.slice(n+1)).get("dev"))}function Gn(){return!0}function wn(){const e=zn();if(e!==null)return e;const n=pt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=pt(localStorage.getItem(Vn));if(t!==null)return t}catch{}return Gn()}function bn(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:e==="/lab/water"?99:null}function zt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function Be(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!wn()){n==null||n.remove();return}const t=e===99?"试玩":`P${e}`,s=n??(()=>{const a=document.createElement("div");return a.className="dev-page-id",a.setAttribute("data-testid","dev-page-id"),a.setAttribute("aria-hidden","true"),document.body.appendChild(a),a})();if(s.textContent=t,s.setAttribute("data-page",String(e)),s.title=e===99?"方案B水瓶试玩（实验）":"长按打开方案B水瓶试玩 #/lab/water",s.classList.add("is-lab-entry"),!s.dataset.labBound){s.dataset.labBound="1";let a=null;const d=()=>{a!=null&&(window.clearTimeout(a),a=null)};s.addEventListener("pointerdown",r=>{Gt(s)!==99&&(d(),a=window.setTimeout(()=>{a=null,window.location.hash="#/lab/water"},650),r.stopPropagation())}),s.addEventListener("pointerup",d),s.addEventListener("pointerleave",d),s.addEventListener("pointercancel",d),s.addEventListener("click",()=>{Gt(s)})}}function Gt(e){return Number(e.getAttribute("data-page")||0)}function Yn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),s=n.getMonth(),a=n.getDate();return(Math.floor(Date.UTC(t,s,a)/864e5)%e+e)%e}function Zn(e,n=new Date){if(e.length===0)return;const t=Yn(e.length,n);return e[t]}function Kn(e,n){const t=new Date(e),s=new Date(n);return t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()}function Jn(e,n=new Date){const t=Le(e.id),s=n.getTime();return!t||!Kn(t.submittedAt,s)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Xn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  </svg>`}function ut(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function ss(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function as(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function yn(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  </svg>`}function gt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Yt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function cs(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function mt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function Ie(e,n=0){if(e==="none")return"";const t=e==="home",s=e==="topics",a=e==="wrong",d=e==="me";return`
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
        <a href="#/me" class="bottom-nav-item ${d?"active":""}" data-testid="tab-me">
          ${ns(d)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const ls=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,je=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,ds=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,ps=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,us=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function st(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function gs(e){const n=z(),s=Ye(e).length,a=le(e),d=a.length,r=Zn(e),l=r?Jn(r):{statusText:"今天还没做",isCompletedToday:!1},f=r?Ve(e,r.id):null,m=f?f.indexInTopic+1:1,w=f?f.topic.questions.length:2,F=r?`${r.topic} · 第 ${m}/${w} 题`:"今日一题",$=new Date,i=`${$.getMonth()+1}月${$.getDate()}日`,A=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",C=a[0],q=(C==null?void 0:C.name)||"",M=C&&C.questions.length>0?C.questions.find(b=>!n[b.id])||C.questions[0]:void 0,c=mn(e),o=c?e.find(b=>b.id===c.id):void 0,p=o?Ve(e,o.id):null,g=o!=null&&o.code?(o.code.split(`
`)[0]||"").trim():"",u=o&&p?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Yt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${st(p.topic.name)} · 第 ${p.indexInTopic+1}/${p.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${o.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${g?`<div class="continue-code"><code>${st(g)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Yt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${st(q)}」开始吧，一次一小步。</p>
          ${M?`<a href="#/q/${M.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
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
        <a href="#/q/${(r==null?void 0:r.id)||(M==null?void 0:M.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${ds}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${l.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${ps}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${d} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${us}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${s>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${u}

      ${r?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${i}</span>
              <h3 class="daily-q-title">${F}</h3>
            </div>
            <span class="chip-status ${l.result==="correct"?"chip-green":l.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${l.statusText}
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
              <span>${l.isCompletedToday?"查看结果":"开始做题"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12H19M13 6L19 12L13 18" />
              </svg>
            </a>
            <div class="daily-mascot-wrap">
              <img src="${je}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Ie("home",s)}
  `}const fs={"字符串/循环":["字符串操作","循环控制"],"元组/引用":["元组基础","引用与可变性","同一性与拷贝"],"函数/默认参数":["函数定义与返回值","参数传递与调用","默认参数机制"],"列表/切片":["切片索引与步长","列表修改与拷贝"],字典:["访问与成员检查","常用字典方法","键的特性与哈希"],"作用域/变量":["全局与局部变量","变量生命周期","嵌套作用域与闭包"],"类/对象":["类属性与实例属性","方法定义与调用","继承与特殊方法"],异常处理:["异常捕获与匹配","流程控制与清理","异常抛出与自定义"]},$n={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},xn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function Ze(e,n,t){const s=[],a=new Map;let d=0,r=null;for(const $ of e){const i=$.subtopic&&$.subtopic.trim()?$.subtopic.trim():null;if(i){r=null;let A=a.get(i);A||(A={name:i,questions:[]},a.set(i,A),s.push(A)),A.questions.push($)}else(!r||r.questions.length>=10)&&(d++,r={name:`第 ${d} 节`,questions:[]},s.push(r)),r.questions.push($)}const l=fs[t]||[],f=$=>{const i=l.indexOf($);return i<0?l.length:i};s.sort(($,i)=>f($.name)-f(i.name));const m=$=>typeof $.difficulty=="number"?$.difficulty:2;for(const $ of s)$.questions.sort((i,A)=>m(i)-m(A)||(i.id<A.id?-1:i.id>A.id?1:0));const w=[];let F=1;for(const $ of s)for(let i=0;i<$.questions.length;i+=10){const A=$.questions.slice(i,i+10),C=A.reduce((M,c)=>M+(typeof c.difficulty=="number"?c.difficulty:2),0),q=Math.max(1,Math.min(3,Math.round(C/A.length)));w.push({index:F,name:$.name,topicIndex:n,topicName:t,questions:A,avgDifficulty:q}),F++}return w}function Ue(e,n){const t=e.questions.length;let s=0;for(const l of e.questions)n[l.id]&&s++;const a=t>0&&s===t,d=s>0&&!a;return{submittedCount:s,totalCount:t,isCompleted:a,isInProgress:d,isNotStarted:s===0}}function hs(e,n,t,s){const a=Ze(e,n,t);let d=0;for(const r of a){const{isCompleted:l}=Ue(r,s);l&&d++}return{sections:a,completedSections:d,totalSections:a.length}}function vs(e){const n=le(e),t=z(),s=e.filter(r=>!!t[r.id]).length,a=Ye(e).length,d=n.map((r,l)=>{const{completedSections:f,totalSections:m}=hs(r.questions,l,r.name,t),w=m>0?f/m:0,F=$n[r.name]??xn[r.name],$=r.questions.filter(C=>!!t[C.id]).length,i=r.questions.length;let A="";return f>0&&(A=`<circle class="ring-fill-bar" cx="18" cy="18" r="14" stroke-dasharray="87.96" stroke-dashoffset="${(87.96*(1-w)).toFixed(2)}"></circle>`),`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${l}"
          onclick="window.location.hash = '#/topic/${l}'"
        >
          <div class="topic-custom-icon-box">
            ${mt(r.name)}
          </div>
          <div class="topic-card-text">
            <div class="topic-header-row">
              <h2 class="topic-name">${r.name}</h2>
              <span class="topic-index-badge">#${String(l+1).padStart(2,"0")}</span>
            </div>
            ${F?`<p class="topic-sub" data-testid="topic-sub-${l}">${F}</p>`:""}
          </div>
          <div
            class="topic-ring-col"
            data-testid="topic-ring-${l}"
            data-done-sections="${f}"
            data-total-sections="${m}"
            aria-label="${r.name}进度"
          >
            <span class="sr-only" data-testid="topic-progress-${l}">${$} / ${i}</span>
            <svg class="progress-ring-svg" viewBox="0 0 36 36">
              <circle class="ring-bg-track" cx="18" cy="18" r="14"></circle>
              ${A}
            </svg>
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${gt()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已完成 ${s} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${je}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${d}
      </section>
    </div>

    ${Ie("topics",a)}
  `}function We(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ms(e,n){const t=le(e),s=parseInt(n,10),a=t[s]||t[0];if(!a)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const d=z(),r=Ye(e).length,l=Ze(a.questions,a.index,a.name),f=$n[a.name]||xn[a.name]||"";let m=0;for(const u of l)Ue(u,d).isCompleted&&m++;const w=l.length,F=w>0?m/w:0,$=150.8,i=($*(1-F)).toFixed(1),A=l.map(u=>{const{submittedCount:b,totalCount:E,isCompleted:y,isInProgress:B}=Ue(u,d);let _="";y?_=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="0"/>
            </svg>
            <svg class="sec-ring-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
        `:B?_=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-b/E)).toFixed(1)}"/>
            </svg>
            <span class="sec-ring-num is-progress">${u.index}</span>
          </div>
        `:_=`
          <div class="sec-ring-wrap">
            <svg class="sec-ring-svg" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" class="sec-ring-track" stroke-width="2.8"/>
            </svg>
            <span class="sec-ring-num">${u.index}</span>
          </div>
        `;let N="";y?N='<span class="sec-tag tag-done">已完成</span>':B?N='<span class="sec-tag tag-progress">进行中</span>':N='<span class="sec-tag tag-pending">未开始</span>';let Z="";u.avgDifficulty===1?Z='<span class="diff-dot dot-green"></span><span>入门</span>':u.avgDifficulty===2?Z='<span class="diff-dot dot-orange"></span><span>进阶</span>':Z='<span class="diff-dot dot-orange"></span><span class="diff-dot dot-orange"></span><span>挑战</span>';const re=`#/q/${(u.questions.find(h=>!d[h.id])||u.questions[0]).id}?from=topic&sec=${u.index}${y?"&retry=1":""}`;let K="";return y?K=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${u.index}" onclick="window.location.hash='${re}'">
            再练一次
          </button>
        `:B?K=`
          <button type="button" class="sec-btn sec-btn-primary active-press" data-testid="sec-btn-${u.index}" onclick="window.location.hash='${re}'">
            <span>继续</span>
            <svg class="sec-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        `:K=`
          <button type="button" class="sec-btn sec-btn-light active-press" data-testid="sec-btn-${u.index}" onclick="window.location.hash='${re}'">
            开始练
          </button>
        `,`
        <div class="${B?"topic-detail-sec-row is-in-progress":"topic-detail-sec-row"}" data-testid="sec-row-${u.index}">
          ${B?'<span class="sec-accent-bar" aria-hidden="true"></span>':""}
          ${_}
          <div class="sec-row-center">
            <div class="sec-row-title-line">
              <span class="sec-row-title">${u.index} ${We(u.name)}</span>
              ${N}
            </div>
            <div class="sec-row-meta-line">
              <span class="sec-diff-badge">${Z}</span>
              <span class="sec-meta-sep">·</span>
              <span class="sec-count-mono" data-testid="sec-count-${u.index}">${b}/${E}</span>
            </div>
          </div>
          ${K}
        </div>
      `}).join(""),C=l.find(u=>!Ue(u,d).isCompleted),q=!C,M=q?l[0]:C,c=M.index,o=q?"再练 第1节":`继续 第${c}节`,g=`#/q/${(M.questions.find(u=>!d[u.id])||M.questions[0]).id}?from=topic&sec=${c}${q?"&retry=1":""}`;return`
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
          <h2 class="topic-detail-name">${We(a.name)}</h2>
          ${f?`<p class="topic-detail-intro">${We(f)}</p>`:""}
          <div class="topic-detail-counts">
            <span>共 ${w} 小节</span>
            <span class="topic-detail-counts-dot">·</span>
            <span>${a.questions.length} 道题目</span>
          </div>
        </div>

        <div class="topic-detail-big-ring-wrap" data-testid="detail-ring" aria-label="已完成 ${m}/${w} 节">
          <svg class="topic-detail-big-ring-svg" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" class="topic-detail-ring-track" stroke-width="5"/>
            ${m>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${$}" stroke-dashoffset="${i}"/>`:""}
          </svg>
          <div class="topic-detail-big-ring-inner">
            <span class="topic-detail-ring-fraction">${m}/${w}<span class="topic-detail-ring-unit">节</span></span>
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
            <span class="bottom-bar-title">第 ${c} 节 · ${We(M.name)}</span>
          </div>
          <button
            type="button"
            class="bottom-bar-cta-btn active-press"
            data-testid="detail-continue"
            onclick="window.location.hash='${g}'"
          >
            <span>${o}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    ${Ie("topics",r)}
  `}const ws=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function bs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const at="pydrill.lastRandomWrong";function ys(e){const n=z(),t=e.filter(r=>ee(n[r.id]));if(t.length===0)return null;if(t.length===1){const r=t[0].id;try{sessionStorage.setItem(at,r)}catch{}return r}let s=null;try{s=sessionStorage.getItem(at)}catch{}const a=s&&t.some(r=>r.id===s)?t.filter(r=>r.id!==s):t,d=a[Math.floor(Math.random()*a.length)];try{sessionStorage.setItem(at,d.id)}catch{}return d.id}function $s(e,n){var f;const t=z(),s=le(e),a=e.filter(m=>ee(t[m.id])),d=a.length;if(d===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">温习本</h1>
              <span class="title-doodle-leaf">${gt()}</span>
            </div>
            <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
          </div>
          <div class="header-illustration-right">
            <img src="${je}" alt="" class="wrong-header-img" />
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

      ${Ie("wrong",0)}
    `;const r=((f=a[Math.floor(Math.random()*a.length)])==null?void 0:f.id)??"",l=s.map(m=>{const w=m.questions.filter(C=>ee(t[C.id]));if(w.length===0)return"";const F=w.filter(C=>{var q;return!!((q=t[C.id])!=null&&q.wrongBookReviewed)}).length,$=F/w.length*100,i=String(m.index+1).padStart(2,"0");let A="";if(F>0){const C=(87.96*(1-$/100)).toFixed(2);A=`<circle class="ring-fill-bar" data-testid="wrong-topic-bar-${m.index}" cx="18" cy="18" r="14" stroke-dasharray="87.96" stroke-dashoffset="${C}"></circle>`}return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${m.index}"
          href="#/q/${w[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${mt(m.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${bs(m.name)}</span>
              <span class="wrong-topic-index">#${i}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${m.index}">${w.length}</span> 题待巩固
            </div>
          </div>
          <div
            class="topic-ring-col"
            data-testid="wrong-topic-ring-${m.index}"
            data-pct="${$}"
            aria-label="${m.name}进度"
          >
            <svg class="progress-ring-svg" viewBox="0 0 36 36">
              <circle class="ring-bg-track" cx="18" cy="18" r="14"></circle>
              ${A}
            </svg>
          </div>
        </a>
      `}).join("");return`
    <div class="page-wrapper page-wrong">
      <header class="section-header wrong-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">温习本</h1>
            <span class="title-doodle-leaf">${gt()}</span>
          </div>
          <p class="section-desc">需要温习的题会放进这里，慢慢巩固</p>
        </div>
        <div class="header-illustration-right">
          <img src="${je}" alt="" class="wrong-header-img" />
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

    ${Ie("wrong",d)}
  `}const Ne=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function rt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xs(e){const n=new Date(e),t=new Date,s=_e(t),a=_e(n);if(a===s)return"今天";const d=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return a===_e(d)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function ks(e,n){const t=z(),s=le(e),a=Ye(e).length,d=hn(),r=d.length,l=new Date,f=l.getDay(),m=f===0?-6:1-f,w=new Date(l.getFullYear(),l.getMonth(),l.getDate()+m),F=["一","二","三","四","五","六","日"],$=new Set(d);let i=0;const A=F.map((p,g)=>{const u=new Date(w.getFullYear(),w.getMonth(),w.getDate()+g),b=_e(u),E=$.has(b);return E&&i++,`
        <div class="day-dot-item">
          <span class="day-name">${p}</span>
          <div class="day-dot ${E?"active is-on":""}" data-testid="me-week-dot-${g}"></div>
        </div>
      `}).join(""),C=s.map((p,g)=>{const{done:u,total:b}=Qn(p.questions);let E="";return u>0&&(E=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(u/b*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${g}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${p.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${E}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${g}">${u}/${b}</span>
          </div>
          <span class="ring-label">${rt(p.name)}</span>
        </div>
      `}).join(""),q=a>0?`<div class="review-count-highlight">${a} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',M=Object.entries(t).filter(([p,g])=>typeof g.submittedAt=="number").sort((p,g)=>g[1].submittedAt-p[1].submittedAt).slice(0,3);let c="";M.length===0?c='<div class="recent-empty">还没有练习记录</div>':c=M.map(([p,g],u)=>{const b=e.find(N=>N.id===p);if(!b)return"";const E=b.title||(b.stem?b.stem.split(`
`)[0].trim():"Python 练习题"),y=E.match(/^[Qq]0*(\d+)$/),B=y?y[1]:E,_=xs(g.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${u}" onclick="window.location.hash='#/q/${b.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${rt(B)}</div>
              <div class="recent-topic-sub">· ${rt(b.topic)}</div>
            </div>
            <span class="recent-time">${_}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Un();const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=p=>{try{localStorage.setItem("pydrill.devPageIds",p?"true":"false")}catch{}const g=bn("/me");Be(g)});const o=wn();return`
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
          <span class="rhythm-text" data-testid="me-week-text">这周来过 ${i} 天，慢慢来就好</span>
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
          <span class="section-tag">${s.length} 个核心专题</span>
        </div>
        <div class="rings-grid">
          ${C}
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
              ${o?"checked":""}
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

    ${Ie("me",a)}
  `}const ft=globalThis;ft.Prism=ft.Prism??{};ft.Prism.manual=!0;var Zt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Cs(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var it={exports:{}},Kt;function Ss(){return Kt||(Kt=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(s){var a=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,r={},l={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function c(o){return o instanceof f?new f(o.type,c(o.content),o.alias):Array.isArray(o)?o.map(c):o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(c){return Object.prototype.toString.call(c).slice(8,-1)},objId:function(c){return c.__id||Object.defineProperty(c,"__id",{value:++d}),c.__id},clone:function c(o,p){p=p||{};var g,u;switch(l.util.type(o)){case"Object":if(u=l.util.objId(o),p[u])return p[u];g={},p[u]=g;for(var b in o)o.hasOwnProperty(b)&&(g[b]=c(o[b],p));return g;case"Array":return u=l.util.objId(o),p[u]?p[u]:(g=[],p[u]=g,o.forEach(function(E,y){g[y]=c(E,p)}),g);default:return o}},getLanguage:function(c){for(;c;){var o=a.exec(c.className);if(o)return o[1].toLowerCase();c=c.parentElement}return"none"},setLanguage:function(c,o){c.className=c.className.replace(RegExp(a,"gi"),""),c.classList.add("language-"+o)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(g){var c=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(c){var o=document.getElementsByTagName("script");for(var p in o)if(o[p].src==c)return o[p]}return null}},isActive:function(c,o,p){for(var g="no-"+o;c;){var u=c.classList;if(u.contains(o))return!0;if(u.contains(g))return!1;c=c.parentElement}return!!p}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(c,o){var p=l.util.clone(l.languages[c]);for(var g in o)p[g]=o[g];return p},insertBefore:function(c,o,p,g){g=g||l.languages;var u=g[c],b={};for(var E in u)if(u.hasOwnProperty(E)){if(E==o)for(var y in p)p.hasOwnProperty(y)&&(b[y]=p[y]);p.hasOwnProperty(E)||(b[E]=u[E])}var B=g[c];return g[c]=b,l.languages.DFS(l.languages,function(_,N){N===B&&_!=c&&(this[_]=b)}),b},DFS:function c(o,p,g,u){u=u||{};var b=l.util.objId;for(var E in o)if(o.hasOwnProperty(E)){p.call(o,E,o[E],g||E);var y=o[E],B=l.util.type(y);B==="Object"&&!u[b(y)]?(u[b(y)]=!0,c(y,p,null,u)):B==="Array"&&!u[b(y)]&&(u[b(y)]=!0,c(y,p,E,u))}}},plugins:{},highlightAll:function(c,o){l.highlightAllUnder(document,c,o)},highlightAllUnder:function(c,o,p){var g={callback:p,container:c,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};l.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),l.hooks.run("before-all-elements-highlight",g);for(var u=0,b;b=g.elements[u++];)l.highlightElement(b,o===!0,g.callback)},highlightElement:function(c,o,p){var g=l.util.getLanguage(c),u=l.languages[g];l.util.setLanguage(c,g);var b=c.parentElement;b&&b.nodeName.toLowerCase()==="pre"&&l.util.setLanguage(b,g);var E=c.textContent,y={element:c,language:g,grammar:u,code:E};function B(N){y.highlightedCode=N,l.hooks.run("before-insert",y),y.element.innerHTML=y.highlightedCode,l.hooks.run("after-highlight",y),l.hooks.run("complete",y),p&&p.call(y.element)}if(l.hooks.run("before-sanity-check",y),b=y.element.parentElement,b&&b.nodeName.toLowerCase()==="pre"&&!b.hasAttribute("tabindex")&&b.setAttribute("tabindex","0"),!y.code){l.hooks.run("complete",y),p&&p.call(y.element);return}if(l.hooks.run("before-highlight",y),!y.grammar){B(l.util.encode(y.code));return}if(o&&s.Worker){var _=new Worker(l.filename);_.onmessage=function(N){B(N.data)},_.postMessage(JSON.stringify({language:y.language,code:y.code,immediateClose:!0}))}else B(l.highlight(y.code,y.grammar,y.language))},highlight:function(c,o,p){var g={code:c,grammar:o,language:p};if(l.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=l.tokenize(g.code,g.grammar),l.hooks.run("after-tokenize",g),f.stringify(l.util.encode(g.tokens),g.language)},tokenize:function(c,o){var p=o.rest;if(p){for(var g in p)o[g]=p[g];delete o.rest}var u=new F;return $(u,u.head,c),w(c,u,o,u.head,0),A(u)},hooks:{all:{},add:function(c,o){var p=l.hooks.all;p[c]=p[c]||[],p[c].push(o)},run:function(c,o){var p=l.hooks.all[c];if(!(!p||!p.length))for(var g=0,u;u=p[g++];)u(o)}},Token:f};s.Prism=l;function f(c,o,p,g){this.type=c,this.content=o,this.alias=p,this.length=(g||"").length|0}f.stringify=function c(o,p){if(typeof o=="string")return o;if(Array.isArray(o)){var g="";return o.forEach(function(B){g+=c(B,p)}),g}var u={type:o.type,content:c(o.content,p),tag:"span",classes:["token",o.type],attributes:{},language:p},b=o.alias;b&&(Array.isArray(b)?Array.prototype.push.apply(u.classes,b):u.classes.push(b)),l.hooks.run("wrap",u);var E="";for(var y in u.attributes)E+=" "+y+'="'+(u.attributes[y]||"").replace(/"/g,"&quot;")+'"';return"<"+u.tag+' class="'+u.classes.join(" ")+'"'+E+">"+u.content+"</"+u.tag+">"};function m(c,o,p,g){c.lastIndex=o;var u=c.exec(p);if(u&&g&&u[1]){var b=u[1].length;u.index+=b,u[0]=u[0].slice(b)}return u}function w(c,o,p,g,u,b){for(var E in p)if(!(!p.hasOwnProperty(E)||!p[E])){var y=p[E];y=Array.isArray(y)?y:[y];for(var B=0;B<y.length;++B){if(b&&b.cause==E+","+B)return;var _=y[B],N=_.inside,Z=!!_.lookbehind,de=!!_.greedy,re=_.alias;if(de&&!_.pattern.global){var K=_.pattern.toString().match(/[imsuy]*$/)[0];_.pattern=RegExp(_.pattern.source,K+"g")}for(var x=_.pattern||_,h=g.next,v=u;h!==o.tail&&!(b&&v>=b.reach);v+=h.value.length,h=h.next){var S=h.value;if(o.length>c.length)return;if(!(S instanceof f)){var P=1,k;if(de){if(k=m(x,v,c,Z),!k||k.index>=c.length)break;var W=k.index,L=k.index+k[0].length,H=v;for(H+=h.value.length;W>=H;)h=h.next,H+=h.value.length;if(H-=h.value.length,v=H,h.value instanceof f)continue;for(var R=h;R!==o.tail&&(H<L||typeof R.value=="string");R=R.next)P++,H+=R.value.length;P--,S=c.slice(v,H),k.index-=v}else if(k=m(x,0,S,Z),!k)continue;var W=k.index,U=k[0],J=S.slice(0,W),Ae=S.slice(W+U.length),ge=v+S.length;b&&ge>b.reach&&(b.reach=ge);var ie=h.prev;J&&(ie=$(o,ie,J),v+=J.length),i(o,ie,P);var se=new f(E,N?l.tokenize(U,N):U,re,U);if(h=$(o,ie,se),Ae&&$(o,h,Ae),P>1){var te={cause:E+","+B,reach:ge};w(c,o,p,h.prev,v,te),b&&te.reach>b.reach&&(b.reach=te.reach)}}}}}}function F(){var c={value:null,prev:null,next:null},o={value:null,prev:c,next:null};c.next=o,this.head=c,this.tail=o,this.length=0}function $(c,o,p){var g=o.next,u={value:p,prev:o,next:g};return o.next=u,g.prev=u,c.length++,u}function i(c,o,p){for(var g=o.next,u=0;u<p&&g!==c.tail;u++)g=g.next;o.next=g,g.prev=o,c.length-=u}function A(c){for(var o=[],p=c.head.next;p!==c.tail;)o.push(p.value),p=p.next;return o}if(!s.document)return s.addEventListener&&(l.disableWorkerMessageHandler||s.addEventListener("message",function(c){var o=JSON.parse(c.data),p=o.language,g=o.code,u=o.immediateClose;s.postMessage(l.highlight(g,l.languages[p],p)),u&&s.close()},!1)),l;var C=l.util.currentScript();C&&(l.filename=C.src,C.hasAttribute("data-manual")&&(l.manual=!0));function q(){l.manual||l.highlightAll()}if(!l.manual){var M=document.readyState;M==="loading"||M==="interactive"&&C&&C.defer?document.addEventListener("DOMContentLoaded",q):window.requestAnimationFrame?window.requestAnimationFrame(q):window.setTimeout(q,16)}return l})(n);e.exports&&(e.exports=t),typeof Zt<"u"&&(Zt.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(a,d){var r={};r["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[d]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var l={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};l["language-"+d]={pattern:/[\s\S]+/,inside:t.languages[d]};var f={};f[a]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:l},t.languages.insertBefore("markup","cdata",f)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(s,a){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[a,"language-"+a],inside:t.languages[a]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(s){var a=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+a.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+a.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+a.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+a.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:a,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var d=s.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",a=function(C,q){return"✖ Error "+C+" while fetching file: "+q},d="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},l="data-src-status",f="loading",m="loaded",w="failed",F="pre[data-src]:not(["+l+'="'+m+'"]):not(['+l+'="'+f+'"])';function $(C,q,M){var c=new XMLHttpRequest;c.open("GET",C,!0),c.onreadystatechange=function(){c.readyState==4&&(c.status<400&&c.responseText?q(c.responseText):c.status>=400?M(a(c.status,c.statusText)):M(d))},c.send(null)}function i(C){var q=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(C||"");if(q){var M=Number(q[1]),c=q[2],o=q[3];return c?o?[M,Number(o)]:[M,void 0]:[M,M]}}t.hooks.add("before-highlightall",function(C){C.selector+=", "+F}),t.hooks.add("before-sanity-check",function(C){var q=C.element;if(q.matches(F)){C.code="",q.setAttribute(l,f);var M=q.appendChild(document.createElement("CODE"));M.textContent=s;var c=q.getAttribute("data-src"),o=C.language;if(o==="none"){var p=(/\.(\w+)$/.exec(c)||[,"none"])[1];o=r[p]||p}t.util.setLanguage(M,o),t.util.setLanguage(q,o);var g=t.plugins.autoloader;g&&g.loadLanguages(o),$(c,function(u){q.setAttribute(l,m);var b=i(q.getAttribute("data-range"));if(b){var E=u.split(/\r\n?|\n/g),y=b[0],B=b[1]==null?E.length:b[1];y<0&&(y+=E.length),y=Math.max(0,Math.min(y-1,E.length)),B<0&&(B+=E.length),B=Math.max(0,Math.min(B,E.length)),u=E.slice(y,B).join(`
`),q.hasAttribute("data-start")||q.setAttribute("data-start",String(y+1))}M.textContent=u,t.highlightElement(M)},function(u){q.setAttribute(l,w),M.textContent=u})}}),t.plugins.fileHighlight={highlight:function(q){for(var M=(q||document).querySelectorAll(F),c=0,o;o=M[c++];)t.highlightElement(o)}};var A=!1;t.fileHighlight=function(){A||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),A=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(it)),it.exports}var Ls=Ss();const Jt=Cs(Ls);var Xt={},en;function Es(){return en||(en=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),Xt}Es();function As(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((a,d)=>{const r=d+1,f=Jt.highlight(a,Jt.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${f}</span></div>`}).join("")}</code></pre></div>`}function tn(e){const n=e.match(/^[Qq]0*(\d+)$/);return n?n[1]:e}function nn(e){const n=new Date(e),t=n.getMonth()+1,s=n.getDate(),a=String(n.getHours()).padStart(2,"0"),d=String(n.getMinutes()).padStart(2,"0");return`${t}月${s}日 ${a}:${d}`}function ne(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const sn=200,an=1600,rn=300,Ts=1800;let Fe=0,be=0,on=!1;function Fs(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let Qe="#/overview";function qs(e,n){return n<=3?Array.from({length:n},(t,s)=>s):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function Re(){Fe+=1,be&&(window.clearTimeout(be),be=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function Ms(){on||(on=!0,window.addEventListener("hashchange",Re))}function Bs(e,n){const t=n.getBoundingClientRect(),s=t.left+t.width/2,a=e.offsetWidth,d=e.offsetHeight,r=1,l=6,f=40,m=8,w=document.documentElement.clientWidth;let F=s+r+f+l,$=F-a;$<m&&($=m,F=$+a),F>w-m&&(F=w-m,$=Math.max(m,F-a),F=$+a);let i=F-r-l-s;const A=12,C=Math.max(A,a-r*2-12-A);i<A&&(i=A),i>C&&(i=C),e.style.right=`${Math.round(w-F)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-d)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(i)}px`)}function Is(e,n){if(n!==Fe||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(a=>a.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:rn,easing:"ease",fill:"forwards"}),s=()=>{n===Fe&&e.remove()};t.onfinish=s,window.setTimeout(s,rn+60)}function ot(e,n,t,s){be&&window.clearTimeout(be),be=window.setTimeout(()=>{if(be=0,!(n!==Fe||!e.isConnected)){if(!s){e.remove();return}Is(e,n)}},t)}function Ps(e=Qe){var l;const n=document.getElementById("q-next-btn");if(!n)return;Qe=e,Fe+=1;const t=Fe;be&&(window.clearTimeout(be),be=0);const s=Fs();let a=document.querySelector(".finish-tip");const d=!!a;if(a?document.querySelectorAll(".finish-tip").forEach(f=>{f!==a&&f.remove()}):(a=document.createElement("div"),a.className="finish-tip tip-bubble",a.setAttribute("data-testid","tip-bubble"),a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(a),(l=a.querySelector(".finish-tip-tag"))==null||l.addEventListener("click",f=>{f.stopPropagation(),Re(),V(Qe)})),Bs(a,n),s){a.getAnimations().forEach(f=>f.cancel()),a.style.opacity="1",a.style.transform="none",ot(a,t,Ts,!1);return}if(d){a.getAnimations().forEach(f=>f.cancel()),a.style.opacity="1",a.style.transform="translateY(0)",ot(a,t,an,!0);return}const r=a.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:sn,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==Fe||!a.isConnected||(a.style.opacity="1",a.style.transform="translateY(0)")},ot(a,t,sn+an,!0)}function cn(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${ne(t)}</code>`)}function Hs(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let s=e,a="";n!==-1&&(s=e.slice(0,n).trim(),a=e.slice(n+t).trim(),a=a.replace(/^[：:\s]+/,""));const d=s.split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>`<p class="explanation-p">${cn(l)}</p>`).join("");let r="";if(a){const l=cn(a);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${yn(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${l}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${d}
      ${r}
    </div>
  `}function Me(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function Ds(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),s=n.querySelector(".code-header");if(!t)return;const a=()=>{const d=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",d),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${s?s.offsetHeight:0}px`),a(),t.addEventListener("scroll",a,{passive:!0})})}function ln(e,n,t,s="topic",a={}){Ms(),Re(),ce();const d=s==="daily"||s==="wrong"?s:"topic",r=n.find(x=>x.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Be(zt(d,!1));return}if(d==="wrong"&&!a.endCard&&!ee(Le(r.id))){window.location.replace(`#/q/${r.id}?from=topic`);return}a.endCard||Nn(r.id);const l=Ve(n,r.id),f=(l==null?void 0:l.topic)||le(n)[0],m=l?l.indexInTopic:0,w=f.questions.length,F=Le(r.id);f.questions.filter(x=>ee(z()[x.id])).length;const $=!!a.retry&&d==="topic",i={from:d,sec:a.sec,retry:$,prevChoice:F==null?void 0:F.choice,selectedChoice:d==="wrong"||$?null:F?F.choice:null,isRedoing:$,wrongFresh:d==="wrong",showLastTrace:!1,showEndCard:!!a.endCard&&d!=="daily",justRemovedWrong:!1},A=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let C=0,q=null,M=!1;const c='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',o='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function p(x){return/Error|Exception/.test(x)}function g(x,h,v,S){return h!=="graded"?v===x?"selected":"idle":r.answer&&x===r.answer?"correct":v===x&&(S==null?void 0:S.result)==="wrong"?"wrong":"locked"}function u(x,h,v){const S=x.querySelector(".opt-badge"),P=x.querySelector(".opt-text"),k=x.querySelector(".opt-status");if(!S||!P||!k)return;const L=x.getAttribute("data-error")==="1";x.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),S.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),P.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),x.setAttribute("aria-checked",v?"true":"false"),h==="correct"?x.setAttribute("data-state","correct"):h==="wrong"?x.setAttribute("data-state","wrong"):x.removeAttribute("data-state"),h==="selected"||h==="correct"?(x.classList.add(h==="correct"?"opt-card-correct":"opt-card-selected"),h==="selected"&&x.classList.add("opt-pressable"),S.classList.add(h==="correct"?"opt-badge-correct":"opt-badge-selected"),P.classList.add("opt-text-strong"),k.innerHTML=c):h==="wrong"?(x.classList.add("opt-card-wrong"),S.classList.add("opt-badge-wrong"),P.classList.add("opt-text-strong","opt-text-wrong"),k.innerHTML=o):h==="locked"?(x.classList.add("opt-card-locked"),S.classList.add("opt-badge-default"),L&&P.classList.add("opt-text-error"),k.innerHTML=""):(x.classList.add("opt-card-default","opt-pressable"),S.classList.add("opt-badge-default"),L&&P.classList.add("opt-text-error"),k.innerHTML="")}function b(x,h,v,S){const P=p(x.text),k=["option-item"],L=["opt-badge"],H=["opt-text"];let R="",W="";h==="selected"?(k.push("opt-card-selected","opt-pressable"),L.push("opt-badge-selected"),H.push("opt-text-strong"),R=c):h==="correct"?(k.push("opt-card-correct"),L.push("opt-badge-correct"),H.push("opt-text-strong"),R=c,W='data-state="correct"'):h==="wrong"?(k.push("opt-card-wrong"),L.push("opt-badge-wrong"),H.push("opt-text-strong","opt-text-wrong"),R=o,W='data-state="wrong"'):h==="locked"?(k.push("opt-card-locked"),L.push("opt-badge-default"),P&&H.push("opt-text-error")):(k.push("opt-card-default","opt-pressable"),L.push("opt-badge-default"),P&&H.push("opt-text-error"));const U=(x.hint||"").trim(),J=S!=="none"&&U?`<div class="opt-hint-clip${S==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${ne(x.key)}">${ne(U)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${v?"true":"false"}"
            ${W}
            class="${k.join(" ")}"
            data-testid="option-${ne(x.key)}"
            data-key="${ne(x.key)}"
            data-error="${P?"1":"0"}"
          >
            <span class="${L.join(" ")}">${ne(x.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${H.join(" ")}">${ne(x.text)}</span>
                <span class="opt-status">${R}</span>
              </div>
              ${J}
            </div>
          </div>
        `}const E='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',y='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let B=0;function _(){var h;(h=document.getElementById("pydrill-wrong-toast"))==null||h.remove();const x=document.createElement("div");x.id="pydrill-wrong-toast",x.className="wrong-toast",x.setAttribute("role","status"),x.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(x),window.setTimeout(()=>{x.remove()},1500)}function N(){const x=e.querySelector("#q-toggle-last");if(!x)return;const h=i.showLastTrace;x.setAttribute("aria-pressed",h?"true":"false");const v=x.querySelector("span");v&&(v.textContent=h?"隐藏上次":"看上次思路");const S=x.querySelector("svg");S&&(S.outerHTML=h?y:E)}function Z(x,h,v,S){const P=(h.hint||"").trim(),k=x.querySelector(".opt-body");if(!k)return;let L=x.querySelector(".opt-hint-clip");if(v&&P){L||(L=document.createElement("div"),L.className="opt-hint-clip",L.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${ne(h.key)}">${ne(P)}</p></div>`,k.appendChild(L));const H=L;requestAnimationFrame(()=>{requestAnimationFrame(()=>{S===B&&H.classList.add("is-open")})})}else if(L){L.classList.remove("is-open");const H=L,R=S,W=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{R===B&&H.remove()},W?0:200)}}function de(x){const h=++B,v=Le(r.id),S=i.from==="topic"&&(i.prevChoice||(v==null?void 0:v.choice))||De(v),P=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(L=>{const H=L.getAttribute("data-key")||"",R=r.options.find(te=>te.key===H);if(!x){const te=i.selectedChoice===H;u(L,te?"selected":"idle",te),R&&Z(L,R,!1,h);return}const W=L.querySelector(".opt-badge"),U=L.querySelector(".opt-text"),J=L.querySelector(".opt-status");if(!W||!U||!J)return;const Ae=L.getAttribute("data-error")==="1",ge=!!S&&H===S,ie=!!P&&H===P;L.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),W.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),U.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),L.setAttribute("aria-checked","false"),L.removeAttribute("data-state"),ge&&!ie?(L.classList.add("opt-card-trace-last"),W.classList.add("opt-badge-trace-last"),U.classList.add("opt-text-strong","opt-text-trace-last")):ie?(L.classList.add("opt-card-trace-correct"),W.classList.add("opt-badge-trace-correct"),U.classList.add("opt-text-strong","opt-text-trace-correct")):(L.classList.add("opt-card-default","opt-card-trace-dim"),W.classList.add("opt-badge-default"),Ae&&U.classList.add("opt-text-error"));const se=[];ge&&se.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${ne(H)}">上次选的 ${ne(H)}</span>`),ie&&se.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${ne(H)}">正确答案 ${ne(H)}</span>`),J.innerHTML=se.length?`<span class="opt-trace-tag-row">${se.join("")}</span>`:"",R&&Z(L,R,ge||ie,h)});const k=e.querySelector("#q-submit-btn");if(k){const L=x||!i.selectedChoice;k.disabled=L,k.classList.toggle("btn-disabled",L)}}function re(x){Be(zt(i.from,i.showEndCard)),(x||i.showEndCard)&&ce()}function K(){var Mt,Bt,It,Pt,Ht,Dt,_t,Rt,jt,Ot,Wt,Ut,Nt;Re();const x=++C,h=q!==r.id;q=r.id;const v=Le(r.id),S=i.from==="topic"?!!(i.prevChoice||v!=null&&v.choice||De(v)):De(v).length>0,k=i.isRedoing||i.wrongFresh?void 0:v,L=!!k;L&&(i.showLastTrace=!1);const H=M&&L;M=!1;const R=i.sec!=null?`&sec=${i.sec}`:"",W=i.from==="topic"&&i.retry?"&retry=1":"";let U="#/topics";i.from==="daily"&&(U="#/"),i.from==="wrong"&&(U="#/wrong"),i.from==="topic"&&i.sec!=null&&(U=`#/topic/${f.index}`);const J=`#/overview?from=${i.from}&qid=${r.id}${i.from==="topic"?"&topic="+encodeURIComponent(f.name):""}${R}${W}`;Qe=J;let Ae="题目总览";i.from==="daily"&&(Ae="今日一题");let ge=null,ie=null,se=!1,te=!1,G=f.questions,fe=m;if(i.from==="wrong"){const T=z();G=f.questions.filter(I=>ee(T[I.id])),fe=G.findIndex(I=>I.id===r.id)}else if(i.from==="topic"&&i.sec!=null){const I=Ze(f.questions,f.index,f.name).find(D=>D.index===i.sec);I&&(G=I.questions,fe=G.findIndex(D=>D.id===r.id))}i.from==="daily"?(te=!0,se=!0,G=[r],fe=0):fe<0?(te=!0,se=!0):(te=fe===0,se=fe>=G.length-1,te||(ge=G[fe-1].id),se||(ie=G[fe+1].id));const Sn=z(),Ln=G.length>0&&G.every(T=>Me(Sn[T.id],i.from)),wt=se&&!Ln,bt=fe>=0?fe+1:1,yt=i.from==="wrong"?Math.max(G.length,1):i.sec!=null?G.length:w,En=i.from==="wrong"?`${f.name} · 温习 ${bt}/${yt}`:i.from==="daily"?`今日一题 · ${f.name}`:i.sec!=null?`${f.name} · 第${i.sec}节 ${bt}/${yt}`:`${f.name} · 第 ${m+1}/${w} 题`;if(i.showEndCard){if(i.from==="daily"){V("#/");return}const T=i.from==="topic",I=z();let D="",j="",O="#/topics",Y="返回知识点列表",me="",qe="",ye="";if(T){if(i.sec!=null)D=`第 ${i.sec} 节做完了`,j=`这一节共 ${G.length} 道题目，循序渐进掌握每一个知识点`,O=`#/topic/${f.index}`,Y="返回小节列表",ye="",qe="";else{let Q=0;for(const X of f.questions)((Mt=I[X.id])==null?void 0:Mt.result)==="wrong"&&Q++;D="这个知识点做完了",Q>0?(j=`今天发现 ${Q} 道需要巩固的题`,ye=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):j="这一组你已经完全掌握了",O="#/topics",Y="返回知识点列表";const we=le(n),Ce=we.findIndex(X=>X.name===f.name),oe=Ce!==-1&&Ce<we.length-1?we[Ce+1]:null;oe&&oe.questions.length>0&&(qe=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}me=`
          <div class="end-questions-list">
            ${(i.sec!=null?G:f.questions).map((Q,we)=>{const Ce=we+1,oe=I[Q.id],X=(oe==null?void 0:oe.result)==="correct",ae=(oe==null?void 0:oe.result)==="wrong";let Se="end-chip-gray",pe="· 未做";X?(Se="end-chip-green",pe="✓ 已完成"):ae&&(Se="end-chip-red",pe="待巩固");const Xe=tn(Q.title&&Q.title.trim()?Q.title.trim():Q.code?Q.code.split(`
`)[0].trim():Q.stem);return`
              <a href="${`#/q/${Q.id}?from=topic${R}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${Ce} 题</span>
                  <span class="end-q-code">${ne(Xe)}</span>
                </div>
                <span class="end-chip ${Se}">${pe}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const he=f.questions.filter(X=>ee(I[X.id])),$e=he.length,Q=he.filter(X=>{var ae;return((ae=I[X.id])==null?void 0:ae.result)==="correct"}).length;D="温习本这一轮看完了",Q>0?j=`好样的！你已经纠正了 ${Q} 道之前做错的题。`:j="再练一轮，会越来越熟。",O="#/wrong",Y="返回温习本",$e>0?me=`
            <div class="end-questions-list">
              ${he.map((ae,Se)=>{const pe=I[ae.id],Xe=(pe==null?void 0:pe.result)==="correct",Qt=(pe==null?void 0:pe.result)==="wrong";let et="end-chip-gray",tt="· 未做";Xe?(et="end-chip-green",tt="✓ 答对"):Qt&&(et="end-chip-red",tt="待巩固");const Hn=tn(ae.title&&ae.title.trim()?ae.title.trim():ae.code?ae.code.split(`
`)[0].trim():ae.stem);return`
                <a href="#/q/${ae.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${Se+1}/${$e}</span>
                    <span class="end-q-code">${ne(Hn)}</span>
                  </div>
                  <span class="end-chip ${et}">${tt}</span>
                </a>
              `}).join("")}
            </div>
          `:me=`
            <div class="end-empty-row">
              ${cs(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const we=le(n),Ce=we.findIndex(X=>X.name===f.name);let oe=null;if(Ce!==-1)for(let X=1;X<we.length;X++){const Se=we[(Ce+X)%we.length].questions.find(pe=>ee(I[pe.id]));if(Se){oe=Se.id;break}}oe&&(qe=`
            <a
              href="#/q/${oe}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const He=i.from==="wrong"?"温习本 · 完成":`${f.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${A}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${ut()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${He}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Ne}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${D}</h2>
              <p class="end-sub" data-testid="end-subtitle">${j}</p>

              ${me}

              <div class="end-action-wrap flex-col-gap">
                ${ye}
                <button
                  type="button"
                  class="${ye?"btn-secondary":"btn-primary"} w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${Y}
                </button>
                ${qe}
              </div>
            </div>
          </main>
        </div>
      `,(Bt=document.getElementById("q-back-btn"))==null||Bt.addEventListener("click",()=>{V(U)}),(It=document.getElementById("end-leave-btn"))==null||It.addEventListener("click",()=>{V(O)}),(Pt=document.getElementById("end-next-topic-btn"))==null||Pt.addEventListener("click",()=>{const he=le(n),$e=he.findIndex(Q=>Q.name===f.name);if($e!==-1&&$e<he.length-1){const Q=he[$e+1];V(`#/q/${Q.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(he=>{he.addEventListener("click",$e=>{const Q=he.getAttribute("href");Q&&($e.preventDefault(),V(Q))})}),re(h);return}const Oe=L?H?"pending":"graded":"answering",An=Oe==="answering"?"none":Oe==="pending"?"closed":"open",$t=Oe==="graded"?(k==null?void 0:k.choice)??null:i.selectedChoice,Tn=r.options.map(T=>b(T,g(T.key,Oe,$t,k),$t===T.key,An)).join("");let xt="";if(L&&k){let T=Ne,I="答对了，理解到位";const D=nn(k.submittedAt);let j=`你选了 ${k.choice} · 正确答案 ${r.answer} · ${D} 提交`,O="banner-correct",Y="",me="";k.result==="wrong"?(T=je,I="这题有个小坑，看看解析",j=`你选了 ${k.choice} · 正确答案是 ${r.answer} · ${D} 提交`,O="banner-wrong",k.inWrongBook&&(Y='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):k.result==="correct"?k.inWrongBook&&i.from!=="wrong"?me=`
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
          `:i.justRemovedWrong&&i.from!=="wrong"&&(me=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出温习本 ✓</span>
            </div>
          `):k.result==="ungraded"&&(T=Ne,I="已提交（未判分）",j=`这题的答案还没编写 · ${D} 提交`,O="banner-ungraded"),xt=`
        <section class="result-banner ${O}" data-testid="result-banner" data-result="${k.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${T}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${I}</h2>
              <p class="result-sub">${j}</p>
              ${Y?`<div class="result-tag-wrap result-tag-below">${Y}</div>`:""}
            </div>
          </div>
          ${me}
        </section>
      `}let kt="";if(L&&k){const T=Hs(r.explanation);kt=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${yn()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${T}
          </div>
        </section>
      `}let Ct="";r.animationId!=null&&L&&(Ct=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let St="";if(i.isRedoing&&i.from!=="wrong"){const T=Le(r.id);if(T){const I=T.result==="correct"?"已学习":T.result==="wrong"?"待巩固":"已提交",D=nn(T.submittedAt);St=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${I}（选 ${T.choice} · ${D}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Lt=i.from==="wrong"||i.sec!=null?G:f.questions,Fn=i.from!=="wrong"||L,qn=Lt.length,Mn=qs(Math.max(0,fe),qn).map(T=>{const I=Lt[T],D=T+1,j=I.id===r.id,O=Le(I.id),Y=Fn&&Me(O,i.from),me=Y&&(O==null?void 0:O.result)==="correct",qe=Y&&(O==null?void 0:O.result)==="wrong";let ye="switcher-unanswered",He=`<span>${D}</span>`;return me?(ye="switcher-correct",He=ss()):qe&&(ye="switcher-wrong",He=as()),j&&(ye+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${ye} active-press"
            data-testid="q-switch-${D}"
            data-qid="${I.id}"
            title="第 ${D} 题"
          >
            ${He}
          </button>
        `}).join(""),Bn=L?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${is(14)}
          <span>重做</span>
        </button>
      `:"",Et=`
      <button
        type="button"
        class="btn-nav-prev active-press ${te?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${te?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,At=se?"完成":"下一题 ›",Tt=se?' data-action="finish"':"",Ft=wt?" btn-finish-locked":"",qt=wt?' aria-disabled="true"':"",In=`
      <button
        type="button"
        class="btn-nav-next active-press${Ft}"
        data-testid="next"
        id="q-next-btn"${Tt}${qt}
      >
        <span>${At}</span>
      </button>
    `,Pn=`
      <button
        type="button"
        class="btn-next-main active-press${Ft}"
        data-testid="next"
        id="q-next-btn"${Tt}${qt}
      >
        <span>${At}</span>
      </button>
    `;let Ke="";if(L)Ke=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${Et}
            ${Bn}
            ${Pn}
          </div>
        </div>
      `;else{const T=!!i.selectedChoice;Ke=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${Et}
            <button
              type="button"
              class="btn-submit-main active-press ${T?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${T?"":"disabled"}
            >
              <span>${T?"提交答案":"提交"}</span>
            </button>
            ${In}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${A}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${ut()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${En}</span>
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
              <span>${Ae}</span>
            </button>
            ${i.from==="wrong"||i.from==="topic"&&(i.retry||i.isRedoing)?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${i.showLastTrace?"true":"false"}" ${S?"":"disabled"}>
                    ${i.showLastTrace?y:E}
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
          ${St}

          <!-- 4. Result Banner (if submitted) -->
          ${xt}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${r.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${r.code?As(r.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Tn}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${kt}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${Ct}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ke}
      </div>
    `,(Ht=document.getElementById("q-back-btn"))==null||Ht.addEventListener("click",()=>{V(U)}),(Dt=document.getElementById("q-overview-chip"))==null||Dt.addEventListener("click",()=>{V(J)}),L)(Rt=document.getElementById("q-redo-btn"))==null||Rt.addEventListener("click",()=>{var T;i.isRedoing=!0,i.prevChoice=(T=Le(r.id))==null?void 0:T.choice,i.selectedChoice=null,i.showLastTrace=!1,i.justRemovedWrong=!1,K()}),i.from!=="wrong"&&((jt=document.getElementById("q-remove-wrong-btn"))==null||jt.addEventListener("click",()=>{Vt(r.id),i.justRemovedWrong=!0,K()}));else{const T=e.querySelectorAll(".option-item");T.forEach(I=>{I.addEventListener("click",()=>{if(i.showLastTrace)return;const D=I.getAttribute("data-key");if(!D||D===i.selectedChoice)return;i.selectedChoice=D,T.forEach(O=>{const Y=O.getAttribute("data-key")===D;u(O,Y?"selected":"idle",Y)});const j=e.querySelector("#q-submit-btn");if(j){j.disabled=!1,j.classList.remove("btn-disabled");const O=j.querySelector("span");O&&(O.textContent="提交答案")}})}),(_t=document.getElementById("q-submit-btn"))==null||_t.addEventListener("click",()=>{!i.selectedChoice||i.showLastTrace||(Wn(r,i.selectedChoice),i.isRedoing=!1,i.retry=!1,i.wrongFresh=!1,i.showLastTrace=!1,i.justRemovedWrong=!1,M=!0,K())})}i.from==="wrong"&&((Ot=document.getElementById("q-remove-wrong-btn"))==null||Ot.addEventListener("click",()=>{const T=r.id;Vt(T),_();const I=z(),D=f.questions.find(j=>j.id===T||!ee(I[j.id])?!1:f.questions.findIndex(O=>O.id===j.id)>m);V(D?`#/q/${D.id}?from=wrong`:"#/wrong")})),(Wt=document.getElementById("q-toggle-last"))==null||Wt.addEventListener("click",()=>{const T=e.querySelector("#q-toggle-last");if(!(!T||T.disabled)){if(i.showLastTrace=!i.showLastTrace,L&&!i.showLastTrace){K();return}N(),de(i.showLastTrace)}}),(Ut=document.getElementById("q-prev-btn"))==null||Ut.addEventListener("click",()=>{ge&&V(`#/q/${ge}?from=${i.from}${R}${W}`)}),(Nt=document.getElementById("q-next-btn"))==null||Nt.addEventListener("click",()=>{if(ie){V(`#/q/${ie}?from=${i.from}${R}${W}`);return}const T=z();if(!(G.length>0&&G.every(j=>Me(T[j.id],i.from)))){Ps(J);return}if(i.from==="daily"){V("#/");return}const D=i.from==="wrong"?"wrong":"topic";Re(),window.history.replaceState(null,"",U),window.location.hash=`#/done/${D}/${f.index}${i.sec!=null?"?sec="+i.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(T=>{T.addEventListener("click",()=>{const I=T.getAttribute("data-qid");I&&I!==r.id&&V(`#/q/${I}?from=${i.from}${R}${W}`)})});const Pe=e.querySelector(".q-switcher-group"),Je=e.querySelector(".switcher-current");if(Pe&&Je){const T=Je.getBoundingClientRect().left-Pe.getBoundingClientRect().left,I=Pe.scrollLeft+T-(Pe.clientWidth-Je.offsetWidth)/2;Pe.scrollLeft=Math.max(0,I)}if(H&&k){const T=k;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(x!==C||!e.isConnected)return;const I=e.querySelector("[data-view-token]");!I||I.getAttribute("data-view-token")!==A||e.querySelectorAll(".option-item").forEach(D=>{var Y;const j=D.getAttribute("data-key")||"",O=T.choice===j;u(D,g(j,"graded",T.choice,T),O),(Y=D.querySelector(".opt-hint-clip"))==null||Y.classList.add("is-open")})})})}Ds(e),re(h)}K()}function Te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _s(e){const n=e.title||e.summary;if(n&&n.trim()){const a=n.trim(),d=a.match(/^[Qq]0*(\d+)$/);return d?d[1]:a}const t=(e.stem||"").split(`
`)[0].trim();if(t.length>20)return t.slice(0,18)+"…";const s=t.match(/^[Qq]0*(\d+)$/);return s?s[1]:t||"单选题"}function Rs(e,n,t){var de,re,K,x,h;ce(),Be(10);const s=t.from==="daily"||t.from==="wrong"?t.from:"topic",a=t.qid,d=t.topic?decodeURIComponent(t.topic):"";if(!a&&!d&&!t.from){window.location.replace("#/");return}let r=a?n.find(v=>v.id===a):void 0;if(!r){const v=mn(n);r=v?n.find(S=>S.id===v.id):n[0]}const l=le(n);let f=d?l.find(v=>v.name===d):r?(de=Ve(n,r.id))==null?void 0:de.topic:l[0];f||(f=l[0]);const m=z();if(s==="wrong"&&!f.questions.some(v=>ee(m[v.id]))){const v=l.find(S=>S.questions.some(P=>ee(m[P.id])));if(!v){window.location.replace("#/wrong");return}f=v,(!r||!ee(m[r.id]))&&(r=v.questions.find(S=>ee(m[S.id])))}const w=t.sec?parseInt(t.sec,10):void 0,F=w!=null?`&sec=${w}`:"";let $=f.questions,i=f.name;if(s==="daily")$=r?[r]:[n[0]],i="今日一题";else if(s==="wrong"){const v=f.questions.filter(S=>ee(m[S.id]));v.length>0&&($=v)}else if(s==="topic"&&w!=null){const S=Ze(f.questions,f.index,f.name).find(P=>P.index===w);S&&($=S.questions,i=`${f.name} · 第${w}节`)}const A=$.length;let C=0,q=0,M=0;for(const v of $){const S=m[v.id];S&&Me(S,s)&&(C++,S.result==="correct"?q++:S.result==="wrong"&&M++)}const c=Math.max(0,A-C),o=94.25,p=A>0?(q/A*o).toFixed(2):"0",g=A>0?(M/A*o).toFixed(2):"0",u=`-${p}`,b=(r==null?void 0:r.id)||($[0]?$[0].id:""),E=t.retry?`&retry=${t.retry}`:"",y=`#/q/${b}?from=${s}${F}${E}`,B=$.find(v=>!Me(m[v.id],s)),_=B||r||$[0],N=$.indexOf(_)+1,Z=$.map((v,S)=>{const P=S+1,k=m[v.id],L=Me(k,s),H=L&&(k==null?void 0:k.result)==="correct",R=L&&(k==null?void 0:k.result)==="wrong",W=v.id===b,U=_s(v),J=v.topic;return H?`
          <button
            class="overview-card overview-card-correct ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${v.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-correct">${P}</span>
              <span class="overview-card-status-pill pill-correct">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                已学习
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-correct">${Te(U)}</span>
              <span class="overview-card-tag tag-correct">${Te(J)}</span>
            </div>
          </button>
        `:R?`
          <button
            class="overview-card overview-card-wrong ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${v.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-wrong">${P}</span>
              <span class="overview-card-status-pill pill-wrong">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                待巩固
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-wrong">${Te(U)}</span>
              <span class="overview-card-tag tag-wrong">${Te(J)}</span>
            </div>
          </button>
        `:`
          <button
            class="overview-card overview-card-unanswered ${W?"overview-card-current":""}"
            type="button"
            data-testid="overview-card"
            data-qid="${v.id}"
          >
            <div class="overview-card-header">
              <span class="overview-card-badge-num num-unanswered">${P}</span>
              <span class="overview-card-status-pill pill-unanswered">
                未作答
              </span>
            </div>
            <div class="overview-card-body">
              <span class="overview-card-title text-unanswered">${Te(U)}</span>
              <span class="overview-card-tag tag-unanswered">${Te(J)}</span>
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
          <h1 class="overview-page-title">${Te(i)} · 题目总览</h1>
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
              ${parseFloat(p)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#52643b" stroke-dasharray="${p} ${o}" stroke-dashoffset="0" stroke-width="3.8"></circle>`:""}
              ${parseFloat(g)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${g} ${o}" stroke-dashoffset="${u}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${C}/${A}</span>
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
              <span class="overview-submitted-chip">已作答 ${C} 题</span>
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
                <span class="overview-legend-num">${M} 题</span>
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
            <span class="overview-grid-count-chip">${A} 题</span>
          </div>

          <div class="overview-cards-grid">
            ${Z}
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
            <span>${B?`继续第 ${N} 题`:"继续做题"}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,(re=document.getElementById("overview-back-btn"))==null||re.addEventListener("click",()=>{V(y)}),(K=document.getElementById("overview-return-btn"))==null||K.addEventListener("click",()=>{V(y)}),(x=document.getElementById("overview-dock-left"))==null||x.addEventListener("click",()=>{V(y)}),(h=document.getElementById("overview-dock-right"))==null||h.addEventListener("click",()=>{V(`#/q/${_.id}?from=${s}${F}${E}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(v=>{v.addEventListener("click",()=>{const S=v.getAttribute("data-qid");S&&V(`#/q/${S}?from=${s}${F}${E}`)})})}const js={"字符串/循环":"#7a9a5c","元组/引用":"#8a6b55","函数/默认参数":"#c47a3a","列表/切片":"#5f8a7a",字典:"#9a6b7a","作用域/变量":"#6b7a8a","类/对象":"#8a7a5c",异常处理:"#a07050"},Os={"字符串/循环":40,"元组/引用":25,"函数/默认参数":0,"列表/切片":50,字典:0,"作用域/变量":25,"类/对象":0,异常处理:0},Ws="#7a9a5c";let ke=null;function Us(e){return js[e]??Ws}function dn(e,n,t){return Math.max(n,Math.min(t,e))}function Ns(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Qs(e,n){var x;ke==null||ke(),ke=null;const t=z(),a=le(n).map((h,v)=>{const S=h.questions.filter(R=>!!t[R.id]).length,P=h.questions.length,k=P>0?S/P*100:0,L=Os[h.name]??Math.round(k),H=Us(h.name);return`
        <article
          class="bottle-card"
          data-testid="water-bottle-${v}"
          data-topic-index="${v}"
          data-real-pct="${k.toFixed(2)}"
          data-demo-pct="${L}"
          data-submitted="${S}"
          data-total="${P}"
          style="--water-color: ${H}; --fill-pct: ${k.toFixed(2)}; --tilt-deg: 0deg;"
        >
          <div class="bottle-water" aria-hidden="true">
            <div class="bottle-water-inner" data-testid="water-fill-${v}"></div>
          </div>
          <div class="bottle-content">
            <div class="bottle-icon">${mt(h.name)}</div>
            <div class="bottle-text">
              <div class="bottle-name-row">
                <span class="bottle-name">${Ns(h.name)}</span>
                <span class="bottle-index">#${String(v+1).padStart(2,"0")}</span>
              </div>
              <div class="bottle-meta" data-testid="water-meta-${v}">
                已提交 ${S} / ${P} 题
              </div>
            </div>
            <span class="bottle-pill" data-testid="water-pill-${v}">${S}/${P}</span>
          </div>
        </article>
      `}).join("");e.innerHTML=`
    <div class="page-wrapper page-water-lab" data-testid="water-lab-page">
      <div class="water-lab-banner" data-testid="water-lab-banner">
        <span class="water-lab-tag">试玩 / 实验</span>
        <span>非正式玩法 · 不上正式入口 · 方案 B 水瓶倾斜</span>
      </div>

      <header class="water-lab-header">
        <div>
          <h1>躺瓶进度试玩</h1>
          <p>水量 = 该科已提交 / 总题。左右倾斜手机，水往低的一端流。</p>
        </div>
        <a class="water-lab-back" href="#/topics" data-testid="water-lab-back">
          ${ut()}<span>返回</span>
        </a>
      </header>

      <section class="water-lab-controls" aria-label="倾斜与演示">
        <label>
          <span>模拟左右倾斜（桌面无陀螺仪时用）</span>
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
          <input type="checkbox" id="water-demo-fills" data-testid="water-demo-fills" />
          <span>演示水量（Stitch 样例，便于看出晃动）</span>
        </label>
        <p class="water-lab-hint" id="water-sensor-hint" data-mode="sim" data-testid="water-sensor-hint">
          桌面：拖滑杆或在卡片区左右拖。手机：允许运动与方向后倾斜即可。
        </p>
      </section>

      <section class="water-lab-list" data-testid="water-lab-list" aria-label="知识点水瓶">
        ${a}
      </section>

      <p class="water-lab-footer-note">
        正式站 P2/P3 仍是方案 A（整卡横涂）。本页仅实验。<br />
        路由 <code>#/lab/water</code>
      </p>
    </div>
  `,Be(99);const d=Array.from(e.querySelectorAll(".bottle-card")),r=e.querySelector("#water-tilt-slider"),l=e.querySelector("#water-tilt-val"),f=e.querySelector("#water-demo-fills"),m=e.querySelector("#water-sensor-hint"),w=e.querySelector(".water-lab-list");let F=0,$=0,i=!1,A=0,C=!1,q=0,M=0;const c=()=>{d.forEach(h=>{const v=Number(i?h.dataset.demoPct||0:h.dataset.realPct||0);h.style.setProperty("--fill-pct",v.toFixed(2))})},o=()=>{const h=`${$.toFixed(2)}deg`;d.forEach(v=>{v.style.setProperty("--tilt-deg",h)}),l&&(l.textContent=`${Math.round($)}°`),r&&!C&&document.activeElement!==r&&(r.value=String($))},p=()=>{$+=(F-$)*.18,Math.abs(F-$)<.05&&($=F),o(),A=requestAnimationFrame(p)};A=requestAnimationFrame(p);const g=h=>{F=dn(h,-35,35),m&&(m.dataset.mode="sim",m.textContent="模拟倾斜中。手机请点下方授权或直接倾斜（若已授权）。")},u=()=>{r&&g(Number(r.value))};r==null||r.addEventListener("input",u);const b=()=>{i=!!(f!=null&&f.checked),c()};f==null||f.addEventListener("change",b);const E=h=>{var v;w&&(C=!0,q=h.clientX,M=F,(v=w.setPointerCapture)==null||v.call(w,h.pointerId))},y=h=>{if(!C||!w)return;const v=h.clientX-q;g(M+v/4)},B=h=>{var v;C&&(C=!1,(v=w==null?void 0:w.releasePointerCapture)==null||v.call(w,h.pointerId))};w==null||w.addEventListener("pointerdown",E),w==null||w.addEventListener("pointermove",y),w==null||w.addEventListener("pointerup",B),w==null||w.addEventListener("pointercancel",B);const _=h=>{h.key==="ArrowLeft"?(h.preventDefault(),g(F-3)):h.key==="ArrowRight"?(h.preventDefault(),g(F+3)):(h.key==="0"||h.key==="Home")&&g(0)};window.addEventListener("keydown",_);const N=h=>{h.gamma!=null&&(F=dn(-h.gamma*.85,-35,35),m&&(m.dataset.mode="gyro",m.textContent="已用陀螺仪。左右倾斜手机，水会流向低端。"))};let Z=!1;const de=()=>{Z||(window.addEventListener("deviceorientation",N),Z=!0)},re=async()=>{const h=DeviceOrientationEvent;if(typeof h.requestPermission=="function")try{await h.requestPermission()==="granted"?(de(),m&&(m.dataset.mode="gyro",m.textContent="运动权限已开，请倾斜手机。")):m&&(m.dataset.mode="sim",m.textContent="未获得运动权限，请用滑杆或拖卡片区模拟。")}catch{m&&(m.dataset.mode="sim",m.textContent="无法请求运动权限，请用滑杆模拟。")}else de()};if(!(typeof DeviceOrientationEvent.requestPermission=="function"))de();else{const h=document.createElement("button");h.type="button",h.className="water-lab-back",h.style.marginTop="4px",h.textContent="开启手机倾斜",h.setAttribute("data-testid","water-enable-gyro"),h.addEventListener("click",()=>{re(),h.remove()}),(x=e.querySelector(".water-lab-controls"))==null||x.appendChild(h)}c(),o(),ke=()=>{cancelAnimationFrame(A),r==null||r.removeEventListener("input",u),f==null||f.removeEventListener("change",b),w==null||w.removeEventListener("pointerdown",E),w==null||w.removeEventListener("pointermove",y),w==null||w.removeEventListener("pointerup",B),w==null||w.removeEventListener("pointercancel",B),window.removeEventListener("keydown",_),Z&&window.removeEventListener("deviceorientation",N)}}function kn(){ke==null||ke(),ke=null}const ve=document.getElementById("app");let ue=[],ct=!1;function Ee(){kn();const{path:e}=ze();if(e==="/"||e==="")ve.innerHTML=gs(ue);else if(e==="/topics")ve.innerHTML=vs(ue);else if(e.startsWith("/topic/")){const t=e.slice(7);ve.innerHTML=ms(ue,t)}else if(e==="/wrong"){ve.innerHTML=$s(ue);const t=ve.querySelector('[data-testid="wrong-start"]');t==null||t.addEventListener("click",s=>{if(s.preventDefault(),ct)return;ct=!0,setTimeout(()=>{ct=!1},300);const a=ys(ue);a&&(location.hash=`#/q/${a}?from=wrong`)})}else e==="/me"&&(ve.innerHTML=ks(ue,Ee));const n=bn(e);n!=null&&Be(n)}async function Cn(){var n;vn();try{ue=await Dn()}catch{ve.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{Cn()});return}xe("/",()=>{ce(),Ee()}),xe("/topics",()=>{ce(),Ee()}),xe("/wrong",()=>{ce(),Ee()}),xe("/me",()=>{ce(),Ee()}),xe("/topic/:topicIndex",()=>{ce(),Ee()}),xe("/q/:id",(t,s)=>{ce();const a=t.id,d=s.from||"topic",r=s.sec?parseInt(s.sec,10):void 0,l=s.retry==="1"||s.retry==="true";ln(ve,ue,a,d,{sec:r,retry:l})}),xe("/done/:kind/:topicIndex",(t,s)=>{ce();const d=le(ue)[Number(t.topicIndex)];if(!d||!d.questions.length){V("#/");return}const r=t.kind==="wrong"?"wrong":"topic",l=s.sec?parseInt(s.sec,10):void 0,f=r==="topic"?d.questions[d.questions.length-1].id:d.questions[0].id;ln(ve,ue,f,r,{endCard:!0,sec:l})}),xe("/overview",(t,s)=>{ce(),Rs(ve,ue,s)}),xe("/lab/water",()=>{ce(),kn(),Qs(ve,ue)}),_n(()=>{V("#/")}),jn(()=>{const{path:t}=ze();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ee()});const e=()=>{const{path:t}=ze();(t==="/"||t==="")&&Ee()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Rn()}Cn();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
