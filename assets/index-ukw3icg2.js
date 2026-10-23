(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const d of a)if(d.type==="childList")for(const r of d.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const d={};return a.integrity&&(d.integrity=a.integrity),a.referrerPolicy&&(d.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?d.credentials="include":a.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(a){if(a.ep)return;a.ep=!0;const d=t(a);fetch(a.href,d)}})();let et=null;async function jn(e=!1){if(et&&!e)return et;try{const n=await fetch("./question-bank/questions.json");if(!n.ok)throw new Error(`HTTP ${n.status} when fetching questions`);const t=await n.json();return et=t,t}catch(n){throw console.error("Failed to load questions:",n),n}}function le(e){const n=new Map;for(const a of e)n.has(a.topic)||n.set(a.topic,[]),n.get(a.topic).push(a);const t=[];let s=0;for(const[a,d]of n.entries())t.push({name:a,index:s,questions:d}),s++;return t}function Qe(e,n){const t=le(e);for(const s of t){const a=s.questions.findIndex(d=>d.id===n);if(a!==-1)return{topic:s,indexInTopic:a}}return null}const gn=[];let fn=()=>{};function ke(e,n){const t=[],s=e.replace(/:([a-zA-Z0-9_]+)/g,(d,r)=>(t.push(r),"([^/?#]+)")).replace(/\//g,"\\/"),a=new RegExp(`^${s}$`);gn.push({regex:a,paramNames:t,handler:n})}function On(e){fn=e}function ce(){window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0}function V(e){let n=e;n.startsWith("#")||(n="#"+(n.startsWith("/")?n:"/"+n)),window.location.hash===n?lt():window.location.hash=n}function Ve(){const e=window.location.hash.slice(1)||"/",[n,t]=e.split("?"),s=n.startsWith("/")?n:"/"+n,a={};return t&&new URLSearchParams(t).forEach((r,l)=>{a[l]=r}),{path:s,query:a}}function lt(){ce();const{path:e,query:n}=Ve();for(const t of gn){const s=e.match(t.regex);if(s){const a={};t.paramNames.forEach((d,r)=>{a[d]=s[r+1]?decodeURIComponent(s[r+1]):""}),t.handler(a,n);return}}fn({},n)}function Wn(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),window.addEventListener("hashchange",lt),lt()}const ze="pydrill.v1.records",ht="pydrill.v1.last",vt="pydrill.days",dt=new Set;function Un(e){return dt.add(e),()=>{dt.delete(e)}}function hn(){for(const e of dt)try{e()}catch(n){console.error("Error in store listener:",n)}}function ee(e){if(!e||!e.inWrongBook)return!1;const n=typeof e.choice=="string"&&e.choice.length>0,t=e.result==="wrong"||e.result==="correct";return n&&t}function Nn(e){let n=!1;for(const t of Object.keys(e)){const s=e[t];if(s&&s.inWrongBook){const a=typeof s.choice=="string"&&s.choice.length>0,d=s.result==="wrong"||s.result==="correct";(!a||!d)&&(s.inWrongBook=!1,n=!0)}}return n}function z(){try{const e=localStorage.getItem(ze);if(!e)return{};const n=JSON.parse(e);if(typeof n!="object"||n===null)return{};const t=n;if(Nn(t))try{localStorage.setItem(ze,JSON.stringify(t))}catch(s){console.error("Failed to save sanitized records to localStorage:",s)}return t}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function Le(e){return z()[e]}function De(e){return e?typeof e.lastWrongChoice=="string"&&e.lastWrongChoice.length>0?e.lastWrongChoice:e.result==="wrong"&&e.choice?e.choice:"":""}function vn(e){try{localStorage.setItem(ze,JSON.stringify(e))}catch(n){console.error("Failed to save records to localStorage:",n)}hn()}function _e(e=new Date){const n=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${n}-${t}-${s}`}function mn(){try{const e=localStorage.getItem(vt);if(!e)return[];const n=JSON.parse(e);return Array.isArray(n)?n.filter(t=>typeof t=="string"):[]}catch(e){return console.warn("Failed to parse active days from localStorage:",e),[]}}function wn(e){const n=_e(),t=mn();if(!t.includes(n)){t.push(n);try{localStorage.setItem(vt,JSON.stringify(t))}catch(s){console.error("Failed to save active days to localStorage:",s)}}}function Qn(e,n){wn();const t=z(),s=t[e.id],a=ee(s);let d,r=!1;!!(e.answer&&e.answer.trim().length>0)?n===e.answer.trim()?(d="correct",r=a):(d="wrong",r=!0):(d="ungraded",r=!1);const f=a&&(d==="correct"||d==="wrong"),m={choice:n,result:d,submittedAt:Date.now(),inWrongBook:r,wrongBookReviewed:f};if(d==="wrong")m.lastWrongChoice=n,m.lastWrongAt=m.submittedAt;else{const w=De(s);w&&(m.lastWrongChoice=w,typeof(s==null?void 0:s.lastWrongAt)=="number"?m.lastWrongAt=s.lastWrongAt:(s==null?void 0:s.result)==="wrong"&&(m.lastWrongAt=s.submittedAt))}return t[e.id]=m,vn(t),m}function Gt(e){const n=z();n[e]&&(n[e]={...n[e],inWrongBook:!1},vn(n))}function Vn(){try{localStorage.removeItem(ze)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(ht)}catch(e){console.error("Failed to clear last position:",e)}try{localStorage.removeItem(vt)}catch(e){console.error("Failed to clear active days:",e)}hn()}function bn(e){try{const n=localStorage.getItem(ht);if(!n)return null;const t=JSON.parse(n);if(!t||typeof t!="object"||Array.isArray(t))return null;const s=t.id,a=t.at;return typeof s!="string"||s.length===0||typeof a!="number"||!Number.isFinite(a)||!e.some(d=>d.id===s)?null:{id:s,at:a}}catch(n){return console.warn("Failed to parse last position:",n),null}}function zn(e){try{localStorage.setItem(ht,JSON.stringify({id:e,at:Date.now()}))}catch(n){console.error("Failed to save last position:",n)}}function Ge(e){const n=z();return e.filter(t=>ee(n[t.id]))}function Gn(e){const n=z(),t=e.length;let s=0;for(const a of e)n[a.id]&&s++;return{done:s,total:t}}const Yn="pydrill.devPageIds";function pt(e){if(e==null)return null;const n=e.trim();return n==="1"||n==="true"?!0:n==="0"||n==="false"?!1:null}function Zn(){const e=window.location.hash.startsWith("#")?window.location.hash.slice(1):window.location.hash,n=e.indexOf("?");return n===-1?null:pt(new URLSearchParams(e.slice(n+1)).get("dev"))}function Kn(){return!0}function yn(){const e=Zn();if(e!==null)return e;const n=pt(new URLSearchParams(window.location.search).get("dev"));if(n!==null)return n;try{const t=pt(localStorage.getItem(Yn));if(t!==null)return t}catch{}return Kn()}function $n(e){return e==="/"||e===""?1:e==="/topics"?2:e==="/wrong"?3:e==="/me"?4:e.startsWith("/topic/")?11:e==="/overview"?10:e==="/lab/water"?99:null}function Yt(e,n){return e==="daily"?6:n?e==="wrong"?9:8:e==="wrong"?7:5}function Jn(e){return Number(e.getAttribute("data-page")||0)}function Be(e){const n=document.querySelector('[data-testid="dev-page-id"]');if(e==null||!yn()){n==null||n.remove();return}const t=e===99?"试玩":`P${e}`,s=n??(()=>{const a=document.createElement("div");return a.className="dev-page-id",a.setAttribute("data-testid","dev-page-id"),a.setAttribute("aria-hidden","true"),document.body.appendChild(a),a})();if(s.textContent=t,s.setAttribute("data-page",String(e)),s.title=e===99?"方案B水瓶试玩（实验）":"长按打开方案B水瓶试玩 #/lab/water",s.classList.add("is-lab-entry"),!s.dataset.labBound){s.dataset.labBound="1";let a=null;const d=()=>{a!=null&&(window.clearTimeout(a),a=null)};s.addEventListener("pointerdown",r=>{Jn(s)!==99&&(d(),a=window.setTimeout(()=>{a=null,window.location.hash="#/lab/water"},650),r.stopPropagation())}),s.addEventListener("pointerup",d),s.addEventListener("pointerleave",d),s.addEventListener("pointercancel",d)}}function Xn(e,n=new Date){if(e===0)return 0;const t=n.getFullYear(),s=n.getMonth(),a=n.getDate();return(Math.floor(Date.UTC(t,s,a)/864e5)%e+e)%e}function es(e,n=new Date){if(e.length===0)return;const t=Xn(e.length,n);return e[t]}function ts(e,n){const t=new Date(e),s=new Date(n);return t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()}function ns(e,n=new Date){const t=Le(e.id),s=n.getTime();return!t||!ts(t.submittedAt,s)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天已完成，已加入温习本",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function ss(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function as(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function rs(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function os(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function ut(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function is(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function cs(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function kn(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function ls(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function ds(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function ps(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function gt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function Zt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function us(e=16,n="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${n}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function mt(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function xn(){return`<svg fill="none" height="16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" viewBox="0 0 24 24" width="16">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>`}function Ie(e,n=0){if(e==="none")return"";const t=e==="home",s=e==="topics",a=e==="wrong",d=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${ss(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${s?"active":""}" data-testid="tab-topics">
          ${as(s)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${a?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${rs(a)}
            ${n>0?`<span class="nav-badge" data-testid="wrong-count">${n}</span>`:""}
          </div>
          <span class="bottom-nav-label">温习本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${d?"active":""}" data-testid="tab-me">
          ${os(d)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const gs=""+new URL("hero-tree-DJ0FWq1D.webp",import.meta.url).href,je=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,fs=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,hs=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,vs=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function tt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ms(e){const n=z(),s=Ge(e).length,a=le(e),d=a.length,r=es(e),l=r?ns(r):{statusText:"今天还没做",isCompletedToday:!1},f=r?Qe(e,r.id):null,m=f?f.indexInTopic+1:1,w=f?f.topic.questions.length:2,F=r?`${r.topic} · 第 ${m}/${w} 题`:"今日一题",$=new Date,o=`${$.getMonth()+1}月${$.getDate()}日`,A=r!=null&&r.code?r.code.split(`
`).slice(0,3).join(`
`):"",E=a[0],q=(E==null?void 0:E.name)||"",M=E&&E.questions.length>0?E.questions.find(b=>!n[b.id])||E.questions[0]:void 0,i=bn(e),c=i?e.find(b=>b.id===i.id):void 0,p=c?Qe(e,c.id):null,g=c!=null&&c.code?(c.code.split(`
`)[0]||"").trim():"",u=c&&p?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${Zt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${tt(p.topic.name)} · 第 ${p.indexInTopic+1}/${p.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${c.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${g?`<div class="continue-code"><code>${tt(g)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${Zt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${tt(q)}」开始吧，一次一小步。</p>
          ${M?`<a href="#/q/${M.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${gs}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${ls()}</span>
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
          <img src="${fs}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${l.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${hs}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${d} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${vs}" alt="温习本" class="entry-icon-direct" />
          <span class="entry-card-title">温习本</span>
          <span class="entry-card-sub">${s>0?"去温习":"温习本空"}</span>
        </a>
      </section>

      ${u}

      ${r?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${o}</span>
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
  `}const ws={"字符串/循环":["字符串操作","循环控制"],"元组/引用":["元组基础","引用与可变性","同一性与拷贝"],"函数/默认参数":["函数定义与返回值","参数传递与调用","默认参数机制"],"列表/切片":["切片索引与步长","列表修改与拷贝"],字典:["访问与成员检查","常用字典方法","键的特性与哈希"],"作用域/变量":["全局与局部变量","变量生命周期","嵌套作用域与闭包"],"类/对象":["类属性与实例属性","方法定义与调用","继承与特殊方法"],异常处理:["异常捕获与匹配","流程控制与清理","异常抛出与自定义"]},Cn={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},Sn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function wt(e,n,t){const s=[],a=new Map;let d=0,r=null;for(const $ of e){const o=$.subtopic&&$.subtopic.trim()?$.subtopic.trim():null;if(o){r=null;let A=a.get(o);A||(A={name:o,questions:[]},a.set(o,A),s.push(A)),A.questions.push($)}else(!r||r.questions.length>=10)&&(d++,r={name:`第 ${d} 节`,questions:[]},s.push(r)),r.questions.push($)}const l=ws[t]||[],f=$=>{const o=l.indexOf($);return o<0?l.length:o};s.sort(($,o)=>f($.name)-f(o.name));const m=$=>typeof $.difficulty=="number"?$.difficulty:2;for(const $ of s)$.questions.sort((o,A)=>m(o)-m(A)||(o.id<A.id?-1:o.id>A.id?1:0));const w=[];let F=1;for(const $ of s)for(let o=0;o<$.questions.length;o+=10){const A=$.questions.slice(o,o+10),E=A.reduce((M,i)=>M+(typeof i.difficulty=="number"?i.difficulty:2),0),q=Math.max(1,Math.min(3,Math.round(E/A.length)));w.push({index:F,name:$.name,topicIndex:n,topicName:t,questions:A,avgDifficulty:q}),F++}return w}function nt(e,n){const t=e.questions.length;let s=0;for(const l of e.questions)n[l.id]&&s++;const a=t>0&&s===t,d=s>0&&!a;return{submittedCount:s,totalCount:t,isCompleted:a,isInProgress:d,isNotStarted:s===0}}const st={"字符串/循环":"#7a9a5c","元组/引用":"#8a6b55","函数/默认参数":"#c47a3a","列表/切片":"#5f8a7a",字典:"#9a6b7a","作用域/变量":"#6b7a8a","类/对象":"#8a7a5c",异常处理:"#a07050"},bs="#7a9a5c";function bt(e){if(st[e])return st[e];for(const[n,t]of Object.entries(st))if(e.includes(n)||n.includes(e))return t;return bs}function Kt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function ys(e){const n=le(e),t=z(),s=e.filter(r=>!!t[r.id]).length,a=Ge(e).length,d=n.map((r,l)=>{const f=Cn[r.name]??Sn[r.name],m=r.questions.filter(E=>!!t[E.id]).length,w=r.questions.length,F=w>0?m/w*100:0,$=F===0?"0":F.toFixed(1),o=F===0?"0%":`${F.toFixed(1)}%`,A=bt(r.name);return`
        <article
          class="card paper-card topic-card topic-progress-card active-press"
          data-testid="topic-card-${l}"
          onclick="window.location.hash = '#/topic/${l}'"
        >
          <div
            class="card-bar-fill"
            data-testid="topic-card-fill-${l}"
            data-pct="${$}"
            data-submitted="${m}"
            data-total="${w}"
            style="width: ${o}; background-color: ${A}; color: ${A};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">
              ${mt(r.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${Kt(r.name)}</h2>
                <span class="topic-index-badge">#${String(l+1).padStart(2,"0")}</span>
              </div>
              ${f?`<p class="topic-sub" data-testid="topic-sub-${l}">${Kt(f)}</p>`:""}
            </div>
            <span class="sr-only" data-testid="topic-progress-${l}">${m} / ${w}</span>
            <div class="topic-chevron-col" aria-hidden="true">
              ${xn()}
            </div>
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
  `}function We(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $s(e,n){const t=le(e),s=parseInt(n,10),a=t[s]||t[0];if(!a)return'<div class="page-wrapper"><p>未找到该知识点</p></div>';const d=z(),r=Ge(e).length,l=wt(a.questions,a.index,a.name),f=Cn[a.name]||Sn[a.name]||"";let m=0;for(const u of l)nt(u,d).isCompleted&&m++;const w=l.length,F=w>0?m/w:0,$=150.8,o=($*(1-F)).toFixed(1),A=l.map(u=>{const{submittedCount:b,totalCount:L,isCompleted:y,isInProgress:B}=nt(u,d);let _="";y?_=`
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
              <circle cx="14" cy="14" r="11" class="sec-ring-fill" stroke-width="2.8" stroke-dasharray="69.1" stroke-dashoffset="${(69.1*(1-b/L)).toFixed(1)}"/>
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
              <span class="sec-count-mono" data-testid="sec-count-${u.index}">${b}/${L}</span>
            </div>
          </div>
          ${K}
        </div>
      `}).join(""),E=l.find(u=>!nt(u,d).isCompleted),q=!E,M=q?l[0]:E,i=M.index,c=q?"再练 第1节":`继续 第${i}节`,g=`#/q/${(M.questions.find(u=>!d[u.id])||M.questions[0]).id}?from=topic&sec=${i}${q?"&retry=1":""}`;return`
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
            ${m>0?`<circle cx="30" cy="30" r="24" class="topic-detail-ring-fill" stroke-width="5" stroke-dasharray="${$}" stroke-dashoffset="${o}"/>`:""}
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
            <span class="bottom-bar-title">第 ${i} 节 · ${We(M.name)}</span>
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

    ${Ie("topics",r)}
  `}const ks=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href;function xs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const at="pydrill.lastRandomWrong";function Cs(e){const n=z(),t=e.filter(r=>ee(n[r.id]));if(t.length===0)return null;if(t.length===1){const r=t[0].id;try{sessionStorage.setItem(at,r)}catch{}return r}let s=null;try{s=sessionStorage.getItem(at)}catch{}const a=s&&t.some(r=>r.id===s)?t.filter(r=>r.id!==s):t,d=a[Math.floor(Math.random()*a.length)];try{sessionStorage.setItem(at,d.id)}catch{}return d.id}function Ss(e,n){var f;const t=z(),s=le(e),a=e.filter(m=>ee(t[m.id])),d=a.length;if(d===0)return`
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
            <img src="${ks}" alt="空白小本子" class="wrong-empty-img" />
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
    `;const r=((f=a[Math.floor(Math.random()*a.length)])==null?void 0:f.id)??"",l=s.map(m=>{const w=m.questions.filter(i=>ee(t[i.id]));if(w.length===0)return"";const F=m.questions.filter(i=>!!t[i.id]).length,$=m.questions.length,o=$>0?F/$*100:0,A=o===0?"0":o.toFixed(1),E=o===0?"0%":`${o.toFixed(1)}%`,q=bt(m.name),M=String(m.index+1).padStart(2,"0");return`
        <a
          class="topic-progress-card wrong-topic-card active-press"
          data-testid="wrong-topic-${m.index}"
          href="#/q/${w[0].id}?from=wrong"
        >
          <div
            class="card-bar-fill"
            data-testid="wrong-topic-fill-${m.index}"
            data-pct="${A}"
            data-submitted="${F}"
            data-total="${$}"
            style="width: ${E}; background-color: ${q}; color: ${q};"
          ></div>
          <div class="topic-card-content">
            <div class="topic-glyph-disc topic-custom-icon-box">${mt(m.name)}</div>
            <div class="wrong-topic-main">
              <div class="wrong-topic-name-row">
                <span class="wrong-topic-name">${xs(m.name)}</span>
                <span class="wrong-topic-index">#${M}</span>
              </div>
              <div class="wrong-topic-meta">
                <span class="topic-meta-highlight" data-testid="wrong-topic-count-${m.index}">${w.length}</span> 题待巩固
              </div>
            </div>
            <div class="topic-chevron-col" aria-hidden="true">
              ${xn()}
            </div>
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
  `}const Ue=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function rt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ls(e){const n=new Date(e),t=new Date,s=_e(t),a=_e(n);if(a===s)return"今天";const d=new Date(t.getFullYear(),t.getMonth(),t.getDate()-1);return a===_e(d)?"昨天":`${n.getMonth()+1}月${n.getDate()}日`}function Es(e,n){const t=z(),s=le(e),a=Ge(e).length,d=mn(),r=d.length,l=new Date,f=l.getDay(),m=f===0?-6:1-f,w=new Date(l.getFullYear(),l.getMonth(),l.getDate()+m),F=["一","二","三","四","五","六","日"],$=new Set(d);let o=0;const A=F.map((p,g)=>{const u=new Date(w.getFullYear(),w.getMonth(),w.getDate()+g),b=_e(u),L=$.has(b);return L&&o++,`
        <div class="day-dot-item">
          <span class="day-name">${p}</span>
          <div class="day-dot ${L?"active is-on":""}" data-testid="me-week-dot-${g}"></div>
        </div>
      `}).join(""),E=s.map((p,g)=>{const{done:u,total:b}=Gn(p.questions);let L="";return u>0&&(L=`<circle cx="22" cy="22" fill="none" r="18" stroke="var(--plant-green)" stroke-dasharray="${(u/b*113.1).toFixed(1)} 113.1" stroke-linecap="round" stroke-width="4"></circle>`),`
        <div class="ring-tile active-press" data-testid="me-map-${g}" style="cursor: pointer;" onclick="window.location.hash='#/topic/${p.index}'">
          <div class="ring-svg-wrap">
            <svg class="ring-svg" viewBox="0 0 44 44">
              <circle cx="22" cy="22" fill="none" r="18" stroke="var(--ring-track, #e3e4d5)" stroke-width="4"></circle>
              ${L}
            </svg>
            <span class="ring-text" data-testid="me-map-text-${g}">${u}/${b}</span>
          </div>
          <span class="ring-label">${rt(p.name)}</span>
        </div>
      `}).join(""),q=a>0?`<div class="review-count-highlight">${a} 题待巩固</div><span class="review-count-sub">在温习里慢慢消化</span>`:'<div class="review-count-highlight review-count-empty">暂时没有要温习的</div><span class="review-count-sub">掌握得很好，继续保持</span>',M=Object.entries(t).filter(([p,g])=>typeof g.submittedAt=="number").sort((p,g)=>g[1].submittedAt-p[1].submittedAt).slice(0,3);let i="";M.length===0?i='<div class="recent-empty">还没有练习记录</div>':i=M.map(([p,g],u)=>{const b=e.find(N=>N.id===p);if(!b)return"";const L=b.title||(b.stem?b.stem.split(`
`)[0].trim():"Python 练习题"),y=L.match(/^[Qq]0*(\d+)$/),B=y?y[1]:L,_=Ls(g.submittedAt);return`
          <div class="recent-item" data-testid="me-recent-${u}" onclick="window.location.hash='#/q/${b.id}?from=topic'">
            <div class="recent-topic-info">
              <div class="recent-topic-title">${rt(B)}</div>
              <div class="recent-topic-sub">· ${rt(b.topic)}</div>
            </div>
            <span class="recent-time">${_}</span>
          </div>
        `}).join(""),typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Vn();const p=document.getElementById("clear-confirm-modal");p&&p.classList.add("hidden"),n&&n()},window.__pydrill_toggleDevPage=p=>{try{localStorage.setItem("pydrill.devPageIds",p?"true":"false")}catch{}const g=$n("/me");Be(g)});const c=yn();return`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Card -->
      <header class="card paper-card profile-header-card select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Ue}" alt="小芽啾" class="me-avatar-img" />
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
          <span class="section-tag">${s.length} 个核心专题</span>
        </div>
        <div class="rings-grid">
          ${E}
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
            ${i}
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
            ${ps()}
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
  `}const ft=globalThis;ft.Prism=ft.Prism??{};ft.Prism.manual=!0;var Jt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function As(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ot={exports:{}},Xt;function Ts(){return Xt||(Xt=1,(function(e){var n=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(s){var a=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,d=0,r={},l={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function i(c){return c instanceof f?new f(c.type,i(c.content),c.alias):Array.isArray(c)?c.map(i):c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(i){return Object.prototype.toString.call(i).slice(8,-1)},objId:function(i){return i.__id||Object.defineProperty(i,"__id",{value:++d}),i.__id},clone:function i(c,p){p=p||{};var g,u;switch(l.util.type(c)){case"Object":if(u=l.util.objId(c),p[u])return p[u];g={},p[u]=g;for(var b in c)c.hasOwnProperty(b)&&(g[b]=i(c[b],p));return g;case"Array":return u=l.util.objId(c),p[u]?p[u]:(g=[],p[u]=g,c.forEach(function(L,y){g[y]=i(L,p)}),g);default:return c}},getLanguage:function(i){for(;i;){var c=a.exec(i.className);if(c)return c[1].toLowerCase();i=i.parentElement}return"none"},setLanguage:function(i,c){i.className=i.className.replace(RegExp(a,"gi"),""),i.classList.add("language-"+c)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(g){var i=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(g.stack)||[])[1];if(i){var c=document.getElementsByTagName("script");for(var p in c)if(c[p].src==i)return c[p]}return null}},isActive:function(i,c,p){for(var g="no-"+c;i;){var u=i.classList;if(u.contains(c))return!0;if(u.contains(g))return!1;i=i.parentElement}return!!p}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(i,c){var p=l.util.clone(l.languages[i]);for(var g in c)p[g]=c[g];return p},insertBefore:function(i,c,p,g){g=g||l.languages;var u=g[i],b={};for(var L in u)if(u.hasOwnProperty(L)){if(L==c)for(var y in p)p.hasOwnProperty(y)&&(b[y]=p[y]);p.hasOwnProperty(L)||(b[L]=u[L])}var B=g[i];return g[i]=b,l.languages.DFS(l.languages,function(_,N){N===B&&_!=i&&(this[_]=b)}),b},DFS:function i(c,p,g,u){u=u||{};var b=l.util.objId;for(var L in c)if(c.hasOwnProperty(L)){p.call(c,L,c[L],g||L);var y=c[L],B=l.util.type(y);B==="Object"&&!u[b(y)]?(u[b(y)]=!0,i(y,p,null,u)):B==="Array"&&!u[b(y)]&&(u[b(y)]=!0,i(y,p,L,u))}}},plugins:{},highlightAll:function(i,c){l.highlightAllUnder(document,i,c)},highlightAllUnder:function(i,c,p){var g={callback:p,container:i,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};l.hooks.run("before-highlightall",g),g.elements=Array.prototype.slice.apply(g.container.querySelectorAll(g.selector)),l.hooks.run("before-all-elements-highlight",g);for(var u=0,b;b=g.elements[u++];)l.highlightElement(b,c===!0,g.callback)},highlightElement:function(i,c,p){var g=l.util.getLanguage(i),u=l.languages[g];l.util.setLanguage(i,g);var b=i.parentElement;b&&b.nodeName.toLowerCase()==="pre"&&l.util.setLanguage(b,g);var L=i.textContent,y={element:i,language:g,grammar:u,code:L};function B(N){y.highlightedCode=N,l.hooks.run("before-insert",y),y.element.innerHTML=y.highlightedCode,l.hooks.run("after-highlight",y),l.hooks.run("complete",y),p&&p.call(y.element)}if(l.hooks.run("before-sanity-check",y),b=y.element.parentElement,b&&b.nodeName.toLowerCase()==="pre"&&!b.hasAttribute("tabindex")&&b.setAttribute("tabindex","0"),!y.code){l.hooks.run("complete",y),p&&p.call(y.element);return}if(l.hooks.run("before-highlight",y),!y.grammar){B(l.util.encode(y.code));return}if(c&&s.Worker){var _=new Worker(l.filename);_.onmessage=function(N){B(N.data)},_.postMessage(JSON.stringify({language:y.language,code:y.code,immediateClose:!0}))}else B(l.highlight(y.code,y.grammar,y.language))},highlight:function(i,c,p){var g={code:i,grammar:c,language:p};if(l.hooks.run("before-tokenize",g),!g.grammar)throw new Error('The language "'+g.language+'" has no grammar.');return g.tokens=l.tokenize(g.code,g.grammar),l.hooks.run("after-tokenize",g),f.stringify(l.util.encode(g.tokens),g.language)},tokenize:function(i,c){var p=c.rest;if(p){for(var g in p)c[g]=p[g];delete c.rest}var u=new F;return $(u,u.head,i),w(i,u,c,u.head,0),A(u)},hooks:{all:{},add:function(i,c){var p=l.hooks.all;p[i]=p[i]||[],p[i].push(c)},run:function(i,c){var p=l.hooks.all[i];if(!(!p||!p.length))for(var g=0,u;u=p[g++];)u(c)}},Token:f};s.Prism=l;function f(i,c,p,g){this.type=i,this.content=c,this.alias=p,this.length=(g||"").length|0}f.stringify=function i(c,p){if(typeof c=="string")return c;if(Array.isArray(c)){var g="";return c.forEach(function(B){g+=i(B,p)}),g}var u={type:c.type,content:i(c.content,p),tag:"span",classes:["token",c.type],attributes:{},language:p},b=c.alias;b&&(Array.isArray(b)?Array.prototype.push.apply(u.classes,b):u.classes.push(b)),l.hooks.run("wrap",u);var L="";for(var y in u.attributes)L+=" "+y+'="'+(u.attributes[y]||"").replace(/"/g,"&quot;")+'"';return"<"+u.tag+' class="'+u.classes.join(" ")+'"'+L+">"+u.content+"</"+u.tag+">"};function m(i,c,p,g){i.lastIndex=c;var u=i.exec(p);if(u&&g&&u[1]){var b=u[1].length;u.index+=b,u[0]=u[0].slice(b)}return u}function w(i,c,p,g,u,b){for(var L in p)if(!(!p.hasOwnProperty(L)||!p[L])){var y=p[L];y=Array.isArray(y)?y:[y];for(var B=0;B<y.length;++B){if(b&&b.cause==L+","+B)return;var _=y[B],N=_.inside,Z=!!_.lookbehind,de=!!_.greedy,re=_.alias;if(de&&!_.pattern.global){var K=_.pattern.toString().match(/[imsuy]*$/)[0];_.pattern=RegExp(_.pattern.source,K+"g")}for(var k=_.pattern||_,h=g.next,v=u;h!==c.tail&&!(b&&v>=b.reach);v+=h.value.length,h=h.next){var C=h.value;if(c.length>i.length)return;if(!(C instanceof f)){var P=1,x;if(de){if(x=m(k,v,i,Z),!x||x.index>=i.length)break;var W=x.index,S=x.index+x[0].length,H=v;for(H+=h.value.length;W>=H;)h=h.next,H+=h.value.length;if(H-=h.value.length,v=H,h.value instanceof f)continue;for(var R=h;R!==c.tail&&(H<S||typeof R.value=="string");R=R.next)P++,H+=R.value.length;P--,C=i.slice(v,H),x.index-=v}else if(x=m(k,0,C,Z),!x)continue;var W=x.index,U=x[0],J=C.slice(0,W),Ae=C.slice(W+U.length),ge=v+C.length;b&&ge>b.reach&&(b.reach=ge);var oe=h.prev;J&&(oe=$(c,oe,J),v+=J.length),o(c,oe,P);var se=new f(L,N?l.tokenize(U,N):U,re,U);if(h=$(c,oe,se),Ae&&$(c,h,Ae),P>1){var te={cause:L+","+B,reach:ge};w(i,c,p,h.prev,v,te),b&&te.reach>b.reach&&(b.reach=te.reach)}}}}}}function F(){var i={value:null,prev:null,next:null},c={value:null,prev:i,next:null};i.next=c,this.head=i,this.tail=c,this.length=0}function $(i,c,p){var g=c.next,u={value:p,prev:c,next:g};return c.next=u,g.prev=u,i.length++,u}function o(i,c,p){for(var g=c.next,u=0;u<p&&g!==i.tail;u++)g=g.next;c.next=g,g.prev=c,i.length-=u}function A(i){for(var c=[],p=i.head.next;p!==i.tail;)c.push(p.value),p=p.next;return c}if(!s.document)return s.addEventListener&&(l.disableWorkerMessageHandler||s.addEventListener("message",function(i){var c=JSON.parse(i.data),p=c.language,g=c.code,u=c.immediateClose;s.postMessage(l.highlight(g,l.languages[p],p)),u&&s.close()},!1)),l;var E=l.util.currentScript();E&&(l.filename=E.src,E.hasAttribute("data-manual")&&(l.manual=!0));function q(){l.manual||l.highlightAll()}if(!l.manual){var M=document.readyState;M==="loading"||M==="interactive"&&E&&E.defer?document.addEventListener("DOMContentLoaded",q):window.requestAnimationFrame?window.requestAnimationFrame(q):window.setTimeout(q,16)}return l})(n);e.exports&&(e.exports=t),typeof Jt<"u"&&(Jt.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(s){s.type==="entity"&&(s.attributes.title=s.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(a,d){var r={};r["language-"+d]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[d]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var l={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};l["language-"+d]={pattern:/[\s\S]+/,inside:t.languages[d]};var f={};f[a]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return a}),"i"),lookbehind:!0,greedy:!0,inside:l},t.languages.insertBefore("markup","cdata",f)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(s,a){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+s+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[a,"language-"+a],inside:t.languages[a]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(s){var a=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;s.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+a.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+a.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+a.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+a.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:a,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},s.languages.css.atrule.inside.rest=s.languages.css;var d=s.languages.markup;d&&(d.tag.addInlined("style","css"),d.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var s="Loading…",a=function(E,q){return"✖ Error "+E+" while fetching file: "+q},d="✖ Error: File does not exist or is empty",r={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},l="data-src-status",f="loading",m="loaded",w="failed",F="pre[data-src]:not(["+l+'="'+m+'"]):not(['+l+'="'+f+'"])';function $(E,q,M){var i=new XMLHttpRequest;i.open("GET",E,!0),i.onreadystatechange=function(){i.readyState==4&&(i.status<400&&i.responseText?q(i.responseText):i.status>=400?M(a(i.status,i.statusText)):M(d))},i.send(null)}function o(E){var q=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(E||"");if(q){var M=Number(q[1]),i=q[2],c=q[3];return i?c?[M,Number(c)]:[M,void 0]:[M,M]}}t.hooks.add("before-highlightall",function(E){E.selector+=", "+F}),t.hooks.add("before-sanity-check",function(E){var q=E.element;if(q.matches(F)){E.code="",q.setAttribute(l,f);var M=q.appendChild(document.createElement("CODE"));M.textContent=s;var i=q.getAttribute("data-src"),c=E.language;if(c==="none"){var p=(/\.(\w+)$/.exec(i)||[,"none"])[1];c=r[p]||p}t.util.setLanguage(M,c),t.util.setLanguage(q,c);var g=t.plugins.autoloader;g&&g.loadLanguages(c),$(i,function(u){q.setAttribute(l,m);var b=o(q.getAttribute("data-range"));if(b){var L=u.split(/\r\n?|\n/g),y=b[0],B=b[1]==null?L.length:b[1];y<0&&(y+=L.length),y=Math.max(0,Math.min(y-1,L.length)),B<0&&(B+=L.length),B=Math.max(0,Math.min(B,L.length)),u=L.slice(y,B).join(`
`),q.hasAttribute("data-start")||q.setAttribute("data-start",String(y+1))}M.textContent=u,t.highlightElement(M)},function(u){q.setAttribute(l,w),M.textContent=u})}}),t.plugins.fileHighlight={highlight:function(q){for(var M=(q||document).querySelectorAll(F),i=0,c;c=M[i++];)t.highlightElement(c)}};var A=!1;t.fileHighlight=function(){A||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),A=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(ot)),ot.exports}var Fs=Ts();const en=As(Fs);var tn={},nn;function qs(){return nn||(nn=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),tn}qs();function Ms(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="code-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((a,d)=>{const r=d+1,f=en.highlight(a,en.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${r}</span><span class="code-line-content">${f}</span></div>`}).join("")}</code></pre></div>`}function sn(e){const n=e.match(/^[Qq]0*(\d+)$/);return n?n[1]:e}function an(e){const n=new Date(e),t=n.getMonth()+1,s=n.getDate(),a=String(n.getHours()).padStart(2,"0"),d=String(n.getMinutes()).padStart(2,"0");return`${t}月${s}日 ${a}:${d}`}function ne(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const rn=200,on=1600,cn=300,Bs=1800;let Fe=0,be=0,ln=!1;function Is(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}let Ne="#/overview";function Ps(e,n){return n<=3?Array.from({length:n},(t,s)=>s):e===0?[0,1,2]:e===n-1?[n-3,n-2,n-1]:[e-1,e,e+1]}function Re(){Fe+=1,be&&(window.clearTimeout(be),be=0),document.querySelectorAll('.finish-tip, [data-testid="tip-bubble"]').forEach(e=>{e.getAnimations().forEach(n=>n.cancel()),e.remove()})}function Hs(){ln||(ln=!0,window.addEventListener("hashchange",Re))}function Ds(e,n){const t=n.getBoundingClientRect(),s=t.left+t.width/2,a=e.offsetWidth,d=e.offsetHeight,r=1,l=6,f=40,m=8,w=document.documentElement.clientWidth;let F=s+r+f+l,$=F-a;$<m&&($=m,F=$+a),F>w-m&&(F=w-m,$=Math.max(m,F-a),F=$+a);let o=F-r-l-s;const A=12,E=Math.max(A,a-r*2-12-A);o<A&&(o=A),o>E&&(o=E),e.style.right=`${Math.round(w-F)}px`,e.style.left="auto",e.style.top=`${Math.round(t.top-8-d)}px`,e.style.setProperty("--finish-tip-arrow-right",`${Math.round(o)}px`)}function _s(e,n){if(n!==Fe||!e.isConnected)return;e.style.opacity="1",e.style.transform="translateY(0)",e.getAnimations().forEach(a=>a.cancel());const t=e.animate([{opacity:1},{opacity:0}],{duration:cn,easing:"ease",fill:"forwards"}),s=()=>{n===Fe&&e.remove()};t.onfinish=s,window.setTimeout(s,cn+60)}function it(e,n,t,s){be&&window.clearTimeout(be),be=window.setTimeout(()=>{if(be=0,!(n!==Fe||!e.isConnected)){if(!s){e.remove();return}_s(e,n)}},t)}function Rs(e=Ne){var l;const n=document.getElementById("q-next-btn");if(!n)return;Ne=e,Fe+=1;const t=Fe;be&&(window.clearTimeout(be),be=0);const s=Is();let a=document.querySelector(".finish-tip");const d=!!a;if(a?document.querySelectorAll(".finish-tip").forEach(f=>{f!==a&&f.remove()}):(a=document.createElement("div"),a.className="finish-tip tip-bubble",a.setAttribute("data-testid","tip-bubble"),a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML='<div class="finish-tip-content" data-testid="finish-tip"><span class="finish-tip-dot"></span><span class="finish-tip-text">还有题没做完哟，点<span class="finish-tip-tag" data-testid="tip-overview-tag">题目总览</span>试试看。</span></div><div class="finish-tip-arrow"></div>',document.body.appendChild(a),(l=a.querySelector(".finish-tip-tag"))==null||l.addEventListener("click",f=>{f.stopPropagation(),Re(),V(Ne)})),Ds(a,n),s){a.getAnimations().forEach(f=>f.cancel()),a.style.opacity="1",a.style.transform="none",it(a,t,Bs,!1);return}if(d){a.getAnimations().forEach(f=>f.cancel()),a.style.opacity="1",a.style.transform="translateY(0)",it(a,t,on,!0);return}const r=a.animate([{opacity:0,transform:"translateY(4px)"},{opacity:1,transform:"translateY(0)"}],{duration:rn,easing:"ease-out",fill:"forwards"});r.onfinish=()=>{t!==Fe||!a.isConnected||(a.style.opacity="1",a.style.transform="translateY(0)")},it(a,t,rn+on,!0)}function dn(e){return e.replace(/`([^`]+)`/g,(n,t)=>`<code class="inline-code">${ne(t)}</code>`)}function js(e){if(!e||!e.trim())return"解析还没编写";let n=e.indexOf("易错点："),t=4;n===-1&&(n=e.indexOf("易错点:"),t=4);let s=e,a="";n!==-1&&(s=e.slice(0,n).trim(),a=e.slice(n+t).trim(),a=a.replace(/^[：:\s]+/,""));const d=s.split(/\n+/).map(l=>l.trim()).filter(Boolean).map(l=>`<p class="explanation-p">${dn(l)}</p>`).join("");let r="";if(a){const l=dn(a);r=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${kn(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${l}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${d}
      ${r}
    </div>
  `}function Me(e,n){return e?n==="wrong"?!!e.wrongBookReviewed:!0:!1}function Os(e){e.querySelectorAll(".code-card").forEach(n=>{const t=n.querySelector("pre.code-pre"),s=n.querySelector(".code-header");if(!t)return;const a=()=>{const d=t.scrollWidth>t.clientWidth+1;n.classList.toggle("is-scrollable",d),n.classList.toggle("at-end",t.scrollLeft+t.clientWidth>=t.scrollWidth-2)};n.style.setProperty("--code-head-h",`${s?s.offsetHeight:0}px`),a(),t.addEventListener("scroll",a,{passive:!0})})}function pn(e,n,t,s="topic",a={}){Hs(),Re(),ce();const d=s==="daily"||s==="wrong"?s:"topic",r=n.find(k=>k.id===t);if(!r){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `,Be(Yt(d,!1));return}if(d==="wrong"&&!a.endCard&&!ee(Le(r.id))){window.location.replace(`#/q/${r.id}?from=topic`);return}a.endCard||zn(r.id);const l=Qe(n,r.id),f=(l==null?void 0:l.topic)||le(n)[0],m=l?l.indexInTopic:0,w=f.questions.length,F=Le(r.id);f.questions.filter(k=>ee(z()[k.id])).length;const $=!!a.retry&&d==="topic",o={from:d,sec:a.sec,retry:$,prevChoice:F==null?void 0:F.choice,selectedChoice:d==="wrong"||$?null:F?F.choice:null,isRedoing:$,wrongFresh:d==="wrong",showLastTrace:!1,showEndCard:!!a.endCard&&d!=="daily",justRemovedWrong:!1},A=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let E=0,q=null,M=!1;const i='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',c='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function p(k){return/Error|Exception/.test(k)}function g(k,h,v,C){return h!=="graded"?v===k?"selected":"idle":r.answer&&k===r.answer?"correct":v===k&&(C==null?void 0:C.result)==="wrong"?"wrong":"locked"}function u(k,h,v){const C=k.querySelector(".opt-badge"),P=k.querySelector(".opt-text"),x=k.querySelector(".opt-status");if(!C||!P||!x)return;const S=k.getAttribute("data-error")==="1";k.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),C.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),P.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),k.setAttribute("aria-checked",v?"true":"false"),h==="correct"?k.setAttribute("data-state","correct"):h==="wrong"?k.setAttribute("data-state","wrong"):k.removeAttribute("data-state"),h==="selected"||h==="correct"?(k.classList.add(h==="correct"?"opt-card-correct":"opt-card-selected"),h==="selected"&&k.classList.add("opt-pressable"),C.classList.add(h==="correct"?"opt-badge-correct":"opt-badge-selected"),P.classList.add("opt-text-strong"),x.innerHTML=i):h==="wrong"?(k.classList.add("opt-card-wrong"),C.classList.add("opt-badge-wrong"),P.classList.add("opt-text-strong","opt-text-wrong"),x.innerHTML=c):h==="locked"?(k.classList.add("opt-card-locked"),C.classList.add("opt-badge-default"),S&&P.classList.add("opt-text-error"),x.innerHTML=""):(k.classList.add("opt-card-default","opt-pressable"),C.classList.add("opt-badge-default"),S&&P.classList.add("opt-text-error"),x.innerHTML="")}function b(k,h,v,C){const P=p(k.text),x=["option-item"],S=["opt-badge"],H=["opt-text"];let R="",W="";h==="selected"?(x.push("opt-card-selected","opt-pressable"),S.push("opt-badge-selected"),H.push("opt-text-strong"),R=i):h==="correct"?(x.push("opt-card-correct"),S.push("opt-badge-correct"),H.push("opt-text-strong"),R=i,W='data-state="correct"'):h==="wrong"?(x.push("opt-card-wrong"),S.push("opt-badge-wrong"),H.push("opt-text-strong","opt-text-wrong"),R=c,W='data-state="wrong"'):h==="locked"?(x.push("opt-card-locked"),S.push("opt-badge-default"),P&&H.push("opt-text-error")):(x.push("opt-card-default","opt-pressable"),S.push("opt-badge-default"),P&&H.push("opt-text-error"));const U=(k.hint||"").trim(),J=C!=="none"&&U?`<div class="opt-hint-clip${C==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${ne(k.key)}">${ne(U)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${v?"true":"false"}"
            ${W}
            class="${x.join(" ")}"
            data-testid="option-${ne(k.key)}"
            data-key="${ne(k.key)}"
            data-error="${P?"1":"0"}"
          >
            <span class="${S.join(" ")}">${ne(k.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${H.join(" ")}">${ne(k.text)}</span>
                <span class="opt-status">${R}</span>
              </div>
              ${J}
            </div>
          </div>
        `}const L='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',y='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let B=0;function _(){var h;(h=document.getElementById("pydrill-wrong-toast"))==null||h.remove();const k=document.createElement("div");k.id="pydrill-wrong-toast",k.className="wrong-toast",k.setAttribute("role","status"),k.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从温习本移出</span>',document.body.appendChild(k),window.setTimeout(()=>{k.remove()},1500)}function N(){const k=e.querySelector("#q-toggle-last");if(!k)return;const h=o.showLastTrace;k.setAttribute("aria-pressed",h?"true":"false");const v=k.querySelector("span");v&&(v.textContent=h?"隐藏上次":"看上次思路");const C=k.querySelector("svg");C&&(C.outerHTML=h?y:L)}function Z(k,h,v,C){const P=(h.hint||"").trim(),x=k.querySelector(".opt-body");if(!x)return;let S=k.querySelector(".opt-hint-clip");if(v&&P){S||(S=document.createElement("div"),S.className="opt-hint-clip",S.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${ne(h.key)}">${ne(P)}</p></div>`,x.appendChild(S));const H=S;requestAnimationFrame(()=>{requestAnimationFrame(()=>{C===B&&H.classList.add("is-open")})})}else if(S){S.classList.remove("is-open");const H=S,R=C,W=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{R===B&&H.remove()},W?0:200)}}function de(k){const h=++B,v=Le(r.id),C=o.from==="topic"&&(o.prevChoice||(v==null?void 0:v.choice))||De(v),P=(r.answer||"").trim();e.querySelectorAll(".option-item").forEach(S=>{const H=S.getAttribute("data-key")||"",R=r.options.find(te=>te.key===H);if(!k){const te=o.selectedChoice===H;u(S,te?"selected":"idle",te),R&&Z(S,R,!1,h);return}const W=S.querySelector(".opt-badge"),U=S.querySelector(".opt-text"),J=S.querySelector(".opt-status");if(!W||!U||!J)return;const Ae=S.getAttribute("data-error")==="1",ge=!!C&&H===C,oe=!!P&&H===P;S.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),W.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),U.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),S.setAttribute("aria-checked","false"),S.removeAttribute("data-state"),ge&&!oe?(S.classList.add("opt-card-trace-last"),W.classList.add("opt-badge-trace-last"),U.classList.add("opt-text-strong","opt-text-trace-last")):oe?(S.classList.add("opt-card-trace-correct"),W.classList.add("opt-badge-trace-correct"),U.classList.add("opt-text-strong","opt-text-trace-correct")):(S.classList.add("opt-card-default","opt-card-trace-dim"),W.classList.add("opt-badge-default"),Ae&&U.classList.add("opt-text-error"));const se=[];ge&&se.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${ne(H)}">上次选的 ${ne(H)}</span>`),oe&&se.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${ne(H)}">正确答案 ${ne(H)}</span>`),J.innerHTML=se.length?`<span class="opt-trace-tag-row">${se.join("")}</span>`:"",R&&Z(S,R,ge||oe,h)});const x=e.querySelector("#q-submit-btn");if(x){const S=k||!o.selectedChoice;x.disabled=S,x.classList.toggle("btn-disabled",S)}}function re(k){Be(Yt(o.from,o.showEndCard)),(k||o.showEndCard)&&ce()}function K(){var It,Pt,Ht,Dt,_t,Rt,jt,Ot,Wt,Ut,Nt,Qt,Vt;Re();const k=++E,h=q!==r.id;q=r.id;const v=Le(r.id),C=o.from==="topic"?!!(o.prevChoice||v!=null&&v.choice||De(v)):De(v).length>0,x=o.isRedoing||o.wrongFresh?void 0:v,S=!!x;S&&(o.showLastTrace=!1);const H=M&&S;M=!1;const R=o.sec!=null?`&sec=${o.sec}`:"",W=o.from==="topic"&&o.retry?"&retry=1":"";let U="#/topics";o.from==="daily"&&(U="#/"),o.from==="wrong"&&(U="#/wrong"),o.from==="topic"&&o.sec!=null&&(U=`#/topic/${f.index}`);const J=`#/overview?from=${o.from}&qid=${r.id}${o.from==="topic"?"&topic="+encodeURIComponent(f.name):""}${R}${W}`;Ne=J;let Ae="题目总览";o.from==="daily"&&(Ae="今日一题");let ge=null,oe=null,se=!1,te=!1,G=f.questions,fe=m;if(o.from==="wrong"){const T=z();G=f.questions.filter(I=>ee(T[I.id])),fe=G.findIndex(I=>I.id===r.id)}else if(o.from==="topic"&&o.sec!=null){const I=wt(f.questions,f.index,f.name).find(D=>D.index===o.sec);I&&(G=I.questions,fe=G.findIndex(D=>D.id===r.id))}o.from==="daily"?(te=!0,se=!0,G=[r],fe=0):fe<0?(te=!0,se=!0):(te=fe===0,se=fe>=G.length-1,te||(ge=G[fe-1].id),se||(oe=G[fe+1].id));const An=z(),Tn=G.length>0&&G.every(T=>Me(An[T.id],o.from)),yt=se&&!Tn,$t=fe>=0?fe+1:1,kt=o.from==="wrong"?Math.max(G.length,1):o.sec!=null?G.length:w,Fn=o.from==="wrong"?`${f.name} · 温习 ${$t}/${kt}`:o.from==="daily"?`今日一题 · ${f.name}`:o.sec!=null?`${f.name} · 第${o.sec}节 ${$t}/${kt}`:`${f.name} · 第 ${m+1}/${w} 题`;if(o.showEndCard){if(o.from==="daily"){V("#/");return}const T=o.from==="topic",I=z();let D="",j="",O="#/topics",Y="返回知识点列表",me="",qe="",ye="";if(T){if(o.sec!=null)D=`第 ${o.sec} 节做完了`,j=`这一节共 ${G.length} 道题目，循序渐进掌握每一个知识点`,O=`#/topic/${f.index}`,Y="返回小节列表",ye="",qe="";else{let Q=0;for(const X of f.questions)((It=I[X.id])==null?void 0:It.result)==="wrong"&&Q++;D="这个知识点做完了",Q>0?(j=`今天发现 ${Q} 道需要巩固的题`,ye=`
              <a
                href="#/wrong"
                class="btn-primary w-full active-press end-review-btn"
                data-testid="end-wrong-btn"
                id="end-wrong-btn"
              >
                <span>去温习</span>
              </a>
            `):j="这一组你已经完全掌握了",O="#/topics",Y="返回知识点列表";const we=le(n),Ce=we.findIndex(X=>X.name===f.name),ie=Ce!==-1&&Ce<we.length-1?we[Ce+1]:null;ie&&ie.questions.length>0&&(qe=`
              <button
                type="button"
                class="btn-secondary w-full active-press end-next-topic-btn"
                id="end-next-topic-btn"
              >
                <span>下一个知识点 →</span>
              </button>
            `)}me=`
          <div class="end-questions-list">
            ${(o.sec!=null?G:f.questions).map((Q,we)=>{const Ce=we+1,ie=I[Q.id],X=(ie==null?void 0:ie.result)==="correct",ae=(ie==null?void 0:ie.result)==="wrong";let Se="end-chip-gray",pe="· 未做";X?(Se="end-chip-green",pe="✓ 已完成"):ae&&(Se="end-chip-red",pe="待巩固");const Ke=sn(Q.title&&Q.title.trim()?Q.title.trim():Q.code?Q.code.split(`
`)[0].trim():Q.stem);return`
              <a href="${`#/q/${Q.id}?from=topic${R}`}" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${Ce} 题</span>
                  <span class="end-q-code">${ne(Ke)}</span>
                </div>
                <span class="end-chip ${Se}">${pe}</span>
              </a>
            `}).join("")}
          </div>
        `}else{const he=f.questions.filter(X=>ee(I[X.id])),$e=he.length,Q=he.filter(X=>{var ae;return((ae=I[X.id])==null?void 0:ae.result)==="correct"}).length;D="温习本这一轮看完了",Q>0?j=`好样的！你已经纠正了 ${Q} 道之前做错的题。`:j="再练一轮，会越来越熟。",O="#/wrong",Y="返回温习本",$e>0?me=`
            <div class="end-questions-list">
              ${he.map((ae,Se)=>{const pe=I[ae.id],Ke=(pe==null?void 0:pe.result)==="correct",zt=(pe==null?void 0:pe.result)==="wrong";let Je="end-chip-gray",Xe="· 未做";Ke?(Je="end-chip-green",Xe="✓ 答对"):zt&&(Je="end-chip-red",Xe="待巩固");const Rn=sn(ae.title&&ae.title.trim()?ae.title.trim():ae.code?ae.code.split(`
`)[0].trim():ae.stem);return`
                <a href="#/q/${ae.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">温习 ${Se+1}/${$e}</span>
                    <span class="end-q-code">${ne(Rn)}</span>
                  </div>
                  <span class="end-chip ${Je}">${Xe}</span>
                </a>
              `}).join("")}
            </div>
          `:me=`
            <div class="end-empty-row">
              ${us(18)}
              <span>温习本已经清空了</span>
            </div>
          `;const we=le(n),Ce=we.findIndex(X=>X.name===f.name);let ie=null;if(Ce!==-1)for(let X=1;X<we.length;X++){const Se=we[(Ce+X)%we.length].questions.find(pe=>ee(I[pe.id]));if(Se){ie=Se.id;break}}ie&&(qe=`
            <a
              href="#/q/${ie}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const He=o.from==="wrong"?"温习本 · 完成":`${f.name} · 完成`;e.innerHTML=`
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
                <img src="${Ue}" alt="小芽啾欢呼" class="end-mascot-img" />
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
      `,(Pt=document.getElementById("q-back-btn"))==null||Pt.addEventListener("click",()=>{V(U)}),(Ht=document.getElementById("end-leave-btn"))==null||Ht.addEventListener("click",()=>{V(O)}),(Dt=document.getElementById("end-next-topic-btn"))==null||Dt.addEventListener("click",()=>{const he=le(n),$e=he.findIndex(Q=>Q.name===f.name);if($e!==-1&&$e<he.length-1){const Q=he[$e+1];V(`#/q/${Q.questions[0].id}?from=topic`)}}),e.querySelectorAll('a[href^="#"]').forEach(he=>{he.addEventListener("click",$e=>{const Q=he.getAttribute("href");Q&&($e.preventDefault(),V(Q))})}),re(h);return}const Oe=S?H?"pending":"graded":"answering",qn=Oe==="answering"?"none":Oe==="pending"?"closed":"open",xt=Oe==="graded"?(x==null?void 0:x.choice)??null:o.selectedChoice,Mn=r.options.map(T=>b(T,g(T.key,Oe,xt,x),xt===T.key,qn)).join("");let Ct="";if(S&&x){let T=Ue,I="答对了，理解到位";const D=an(x.submittedAt);let j=`你选了 ${x.choice} · 正确答案 ${r.answer} · ${D} 提交`,O="banner-correct",Y="",me="";x.result==="wrong"?(T=je,I="这题有个小坑，看看解析",j=`你选了 ${x.choice} · 正确答案是 ${r.answer} · ${D} 提交`,O="banner-wrong",x.inWrongBook&&(Y='<span class="result-tag-badge tag-wrong">已加入温习本</span>')):x.result==="correct"?x.inWrongBook&&o.from!=="wrong"?me=`
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
          `):x.result==="ungraded"&&(T=Ue,I="已提交（未判分）",j=`这题的答案还没编写 · ${D} 提交`,O="banner-ungraded"),Ct=`
        <section class="result-banner ${O}" data-testid="result-banner" data-result="${x.result}">
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
      `}let St="";if(S&&x){const T=js(r.explanation);St=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${kn()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${T}
          </div>
        </section>
      `}let Lt="";r.animationId!=null&&S&&(Lt=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let Et="";if(o.isRedoing&&o.from!=="wrong"){const T=Le(r.id);if(T){const I=T.result==="correct"?"已学习":T.result==="wrong"?"待巩固":"已提交",D=an(T.submittedAt);Et=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${I}（选 ${T.choice} · ${D}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const At=o.from==="wrong"||o.sec!=null?G:f.questions,Bn=o.from!=="wrong"||S,In=At.length,Pn=Ps(Math.max(0,fe),In).map(T=>{const I=At[T],D=T+1,j=I.id===r.id,O=Le(I.id),Y=Bn&&Me(O,o.from),me=Y&&(O==null?void 0:O.result)==="correct",qe=Y&&(O==null?void 0:O.result)==="wrong";let ye="switcher-unanswered",He=`<span>${D}</span>`;return me?(ye="switcher-correct",He=is()):qe&&(ye="switcher-wrong",He=cs()),j&&(ye+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${ye} active-press"
            data-testid="q-switch-${D}"
            data-qid="${I.id}"
            title="第 ${D} 题"
          >
            ${He}
          </button>
        `}).join(""),Hn=S?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${ds(14)}
          <span>重做</span>
        </button>
      `:"",Tt=`
      <button
        type="button"
        class="btn-nav-prev active-press ${te?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${te?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,Ft=se?"完成":"下一题 ›",qt=se?' data-action="finish"':"",Mt=yt?" btn-finish-locked":"",Bt=yt?' aria-disabled="true"':"",Dn=`
      <button
        type="button"
        class="btn-nav-next active-press${Mt}"
        data-testid="next"
        id="q-next-btn"${qt}${Bt}
      >
        <span>${Ft}</span>
      </button>
    `,_n=`
      <button
        type="button"
        class="btn-next-main active-press${Mt}"
        data-testid="next"
        id="q-next-btn"${qt}${Bt}
      >
        <span>${Ft}</span>
      </button>
    `;let Ye="";if(S)Ye=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${Tt}
            ${Hn}
            ${_n}
          </div>
        </div>
      `;else{const T=!!o.selectedChoice;Ye=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-tray flex-row-actions">
            ${Tt}
            <button
              type="button"
              class="btn-submit-main active-press ${T?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${T?"":"disabled"}
            >
              <span>${T?"提交答案":"提交"}</span>
            </button>
            ${Dn}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${A}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${ut()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${Fn}</span>
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
            ${o.from==="wrong"||o.from==="topic"&&(o.retry||o.isRedoing)?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${o.showLastTrace?"true":"false"}" ${C?"":"disabled"}>
                    ${o.showLastTrace?y:L}
                    <span>${o.showLastTrace?"隐藏上次":"看上次思路"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${Pn}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${Et}

          <!-- 4. Result Banner (if submitted) -->
          ${Ct}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${r.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${r.code?Ms(r.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${Mn}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${St}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${Lt}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Ye}
      </div>
    `,(_t=document.getElementById("q-back-btn"))==null||_t.addEventListener("click",()=>{V(U)}),(Rt=document.getElementById("q-overview-chip"))==null||Rt.addEventListener("click",()=>{V(J)}),S)(Ot=document.getElementById("q-redo-btn"))==null||Ot.addEventListener("click",()=>{var T;o.isRedoing=!0,o.prevChoice=(T=Le(r.id))==null?void 0:T.choice,o.selectedChoice=null,o.showLastTrace=!1,o.justRemovedWrong=!1,K()}),o.from!=="wrong"&&((Wt=document.getElementById("q-remove-wrong-btn"))==null||Wt.addEventListener("click",()=>{Gt(r.id),o.justRemovedWrong=!0,K()}));else{const T=e.querySelectorAll(".option-item");T.forEach(I=>{I.addEventListener("click",()=>{if(o.showLastTrace)return;const D=I.getAttribute("data-key");if(!D||D===o.selectedChoice)return;o.selectedChoice=D,T.forEach(O=>{const Y=O.getAttribute("data-key")===D;u(O,Y?"selected":"idle",Y)});const j=e.querySelector("#q-submit-btn");if(j){j.disabled=!1,j.classList.remove("btn-disabled");const O=j.querySelector("span");O&&(O.textContent="提交答案")}})}),(jt=document.getElementById("q-submit-btn"))==null||jt.addEventListener("click",()=>{!o.selectedChoice||o.showLastTrace||(Qn(r,o.selectedChoice),o.isRedoing=!1,o.retry=!1,o.wrongFresh=!1,o.showLastTrace=!1,o.justRemovedWrong=!1,M=!0,K())})}o.from==="wrong"&&((Ut=document.getElementById("q-remove-wrong-btn"))==null||Ut.addEventListener("click",()=>{const T=r.id;Gt(T),_();const I=z(),D=f.questions.find(j=>j.id===T||!ee(I[j.id])?!1:f.questions.findIndex(O=>O.id===j.id)>m);V(D?`#/q/${D.id}?from=wrong`:"#/wrong")})),(Nt=document.getElementById("q-toggle-last"))==null||Nt.addEventListener("click",()=>{const T=e.querySelector("#q-toggle-last");if(!(!T||T.disabled)){if(o.showLastTrace=!o.showLastTrace,S&&!o.showLastTrace){K();return}N(),de(o.showLastTrace)}}),(Qt=document.getElementById("q-prev-btn"))==null||Qt.addEventListener("click",()=>{ge&&V(`#/q/${ge}?from=${o.from}${R}${W}`)}),(Vt=document.getElementById("q-next-btn"))==null||Vt.addEventListener("click",()=>{if(oe){V(`#/q/${oe}?from=${o.from}${R}${W}`);return}const T=z();if(!(G.length>0&&G.every(j=>Me(T[j.id],o.from)))){Rs(J);return}if(o.from==="daily"){V("#/");return}const D=o.from==="wrong"?"wrong":"topic";Re(),window.history.replaceState(null,"",U),window.location.hash=`#/done/${D}/${f.index}${o.sec!=null?"?sec="+o.sec:""}`}),e.querySelectorAll(".q-switch-pill").forEach(T=>{T.addEventListener("click",()=>{const I=T.getAttribute("data-qid");I&&I!==r.id&&V(`#/q/${I}?from=${o.from}${R}${W}`)})});const Pe=e.querySelector(".q-switcher-group"),Ze=e.querySelector(".switcher-current");if(Pe&&Ze){const T=Ze.getBoundingClientRect().left-Pe.getBoundingClientRect().left,I=Pe.scrollLeft+T-(Pe.clientWidth-Ze.offsetWidth)/2;Pe.scrollLeft=Math.max(0,I)}if(H&&x){const T=x;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(k!==E||!e.isConnected)return;const I=e.querySelector("[data-view-token]");!I||I.getAttribute("data-view-token")!==A||e.querySelectorAll(".option-item").forEach(D=>{var Y;const j=D.getAttribute("data-key")||"",O=T.choice===j;u(D,g(j,"graded",T.choice,T),O),(Y=D.querySelector(".opt-hint-clip"))==null||Y.classList.add("is-open")})})})}Os(e),re(h)}K()}function Te(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ws(e){const n=e.title||e.summary;if(n&&n.trim()){const a=n.trim(),d=a.match(/^[Qq]0*(\d+)$/);return d?d[1]:a}const t=(e.stem||"").split(`
`)[0].trim();if(t.length>20)return t.slice(0,18)+"…";const s=t.match(/^[Qq]0*(\d+)$/);return s?s[1]:t||"单选题"}function Us(e,n,t){var de,re,K,k,h;ce(),Be(10);const s=t.from==="daily"||t.from==="wrong"?t.from:"topic",a=t.qid,d=t.topic?decodeURIComponent(t.topic):"";if(!a&&!d&&!t.from){window.location.replace("#/");return}let r=a?n.find(v=>v.id===a):void 0;if(!r){const v=bn(n);r=v?n.find(C=>C.id===v.id):n[0]}const l=le(n);let f=d?l.find(v=>v.name===d):r?(de=Qe(n,r.id))==null?void 0:de.topic:l[0];f||(f=l[0]);const m=z();if(s==="wrong"&&!f.questions.some(v=>ee(m[v.id]))){const v=l.find(C=>C.questions.some(P=>ee(m[P.id])));if(!v){window.location.replace("#/wrong");return}f=v,(!r||!ee(m[r.id]))&&(r=v.questions.find(C=>ee(m[C.id])))}const w=t.sec?parseInt(t.sec,10):void 0,F=w!=null?`&sec=${w}`:"";let $=f.questions,o=f.name;if(s==="daily")$=r?[r]:[n[0]],o="今日一题";else if(s==="wrong"){const v=f.questions.filter(C=>ee(m[C.id]));v.length>0&&($=v)}else if(s==="topic"&&w!=null){const C=wt(f.questions,f.index,f.name).find(P=>P.index===w);C&&($=C.questions,o=`${f.name} · 第${w}节`)}const A=$.length;let E=0,q=0,M=0;for(const v of $){const C=m[v.id];C&&Me(C,s)&&(E++,C.result==="correct"?q++:C.result==="wrong"&&M++)}const i=Math.max(0,A-E),c=94.25,p=A>0?(q/A*c).toFixed(2):"0",g=A>0?(M/A*c).toFixed(2):"0",u=`-${p}`,b=(r==null?void 0:r.id)||($[0]?$[0].id:""),L=t.retry?`&retry=${t.retry}`:"",y=`#/q/${b}?from=${s}${F}${L}`,B=$.find(v=>!Me(m[v.id],s)),_=B||r||$[0],N=$.indexOf(_)+1,Z=$.map((v,C)=>{const P=C+1,x=m[v.id],S=Me(x,s),H=S&&(x==null?void 0:x.result)==="correct",R=S&&(x==null?void 0:x.result)==="wrong",W=v.id===b,U=Ws(v),J=v.topic;return H?`
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
              ${parseFloat(g)>0?`<circle cx="18" cy="18" fill="none" r="15" stroke="#8f4d07" stroke-dasharray="${g} ${c}" stroke-dashoffset="${u}" stroke-width="3.8"></circle>`:""}
            </svg>
            <div class="overview-donut-center">
              <span class="overview-donut-pct">${E}/${A}</span>
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
              <span class="overview-submitted-chip">已作答 ${E} 题</span>
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
                <span class="overview-legend-num">${i} 题</span>
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
  `,(re=document.getElementById("overview-back-btn"))==null||re.addEventListener("click",()=>{V(y)}),(K=document.getElementById("overview-return-btn"))==null||K.addEventListener("click",()=>{V(y)}),(k=document.getElementById("overview-dock-left"))==null||k.addEventListener("click",()=>{V(y)}),(h=document.getElementById("overview-dock-right"))==null||h.addEventListener("click",()=>{V(`#/q/${_.id}?from=${s}${F}${L}`)}),e.querySelectorAll('[data-testid="overview-card"]').forEach(v=>{v.addEventListener("click",()=>{const C=v.getAttribute("data-qid");C&&V(`#/q/${C}?from=${s}${F}${L}`)})})}const Ns={"字符串/循环":40,"元组/引用":25,"函数/默认参数":0,"列表/切片":50,字典:0,"作用域/变量":25,"类/对象":0,异常处理:0};let xe=null;function un(e,n,t){return Math.max(n,Math.min(t,e))}function Qs(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Vs(e,n){var k;xe==null||xe(),xe=null;const t=z(),a=le(n).map((h,v)=>{const C=h.questions.filter(R=>!!t[R.id]).length,P=h.questions.length,x=P>0?C/P*100:0,S=Ns[h.name]??Math.round(x),H=bt(h.name);return`
        <article
          class="bottle-card"
          data-testid="water-bottle-${v}"
          data-topic-index="${v}"
          data-real-pct="${x.toFixed(2)}"
          data-demo-pct="${S}"
          data-submitted="${C}"
          data-total="${P}"
          style="--water-color: ${H}; --fill-pct: ${x.toFixed(2)}; --tilt-deg: 0deg;"
        >
          <div class="bottle-water" aria-hidden="true">
            <div class="bottle-water-inner" data-testid="water-fill-${v}"></div>
          </div>
          <div class="bottle-content">
            <div class="bottle-icon">${mt(h.name)}</div>
            <div class="bottle-text">
              <div class="bottle-name-row">
                <span class="bottle-name">${Qs(h.name)}</span>
                <span class="bottle-index">#${String(v+1).padStart(2,"0")}</span>
              </div>
              <div class="bottle-meta" data-testid="water-meta-${v}">
                已提交 ${C} / ${P} 题
              </div>
            </div>
            <span class="bottle-pill" data-testid="water-pill-${v}">${C}/${P}</span>
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
  `,Be(99);const d=Array.from(e.querySelectorAll(".bottle-card")),r=e.querySelector("#water-tilt-slider"),l=e.querySelector("#water-tilt-val"),f=e.querySelector("#water-demo-fills"),m=e.querySelector("#water-sensor-hint"),w=e.querySelector(".water-lab-list");let F=0,$=0,o=!1,A=0,E=!1,q=0,M=0;const i=()=>{d.forEach(h=>{const v=Number(o?h.dataset.demoPct||0:h.dataset.realPct||0);h.style.setProperty("--fill-pct",v.toFixed(2))})},c=()=>{const h=`${$.toFixed(2)}deg`;d.forEach(v=>{v.style.setProperty("--tilt-deg",h)}),l&&(l.textContent=`${Math.round($)}°`),r&&!E&&document.activeElement!==r&&(r.value=String($))},p=()=>{$+=(F-$)*.18,Math.abs(F-$)<.05&&($=F),c(),A=requestAnimationFrame(p)};A=requestAnimationFrame(p);const g=h=>{F=un(h,-35,35),m&&(m.dataset.mode="sim",m.textContent="模拟倾斜中。手机请点下方授权或直接倾斜（若已授权）。")},u=()=>{r&&g(Number(r.value))};r==null||r.addEventListener("input",u);const b=()=>{o=!!(f!=null&&f.checked),i()};f==null||f.addEventListener("change",b);const L=h=>{var v;w&&(E=!0,q=h.clientX,M=F,(v=w.setPointerCapture)==null||v.call(w,h.pointerId))},y=h=>{if(!E||!w)return;const v=h.clientX-q;g(M+v/4)},B=h=>{var v;E&&(E=!1,(v=w==null?void 0:w.releasePointerCapture)==null||v.call(w,h.pointerId))};w==null||w.addEventListener("pointerdown",L),w==null||w.addEventListener("pointermove",y),w==null||w.addEventListener("pointerup",B),w==null||w.addEventListener("pointercancel",B);const _=h=>{h.key==="ArrowLeft"?(h.preventDefault(),g(F-3)):h.key==="ArrowRight"?(h.preventDefault(),g(F+3)):(h.key==="0"||h.key==="Home")&&g(0)};window.addEventListener("keydown",_);const N=h=>{h.gamma!=null&&(F=un(-h.gamma*.85,-35,35),m&&(m.dataset.mode="gyro",m.textContent="已用陀螺仪。左右倾斜手机，水会流向低端。"))};let Z=!1;const de=()=>{Z||(window.addEventListener("deviceorientation",N),Z=!0)},re=async()=>{const h=DeviceOrientationEvent;if(typeof h.requestPermission=="function")try{await h.requestPermission()==="granted"?(de(),m&&(m.dataset.mode="gyro",m.textContent="运动权限已开，请倾斜手机。")):m&&(m.dataset.mode="sim",m.textContent="未获得运动权限，请用滑杆或拖卡片区模拟。")}catch{m&&(m.dataset.mode="sim",m.textContent="无法请求运动权限，请用滑杆模拟。")}else de()};if(!(typeof DeviceOrientationEvent.requestPermission=="function"))de();else{const h=document.createElement("button");h.type="button",h.className="water-lab-back",h.style.marginTop="4px",h.textContent="开启手机倾斜",h.setAttribute("data-testid","water-enable-gyro"),h.addEventListener("click",()=>{re(),h.remove()}),(k=e.querySelector(".water-lab-controls"))==null||k.appendChild(h)}i(),c(),xe=()=>{cancelAnimationFrame(A),r==null||r.removeEventListener("input",u),f==null||f.removeEventListener("change",b),w==null||w.removeEventListener("pointerdown",L),w==null||w.removeEventListener("pointermove",y),w==null||w.removeEventListener("pointerup",B),w==null||w.removeEventListener("pointercancel",B),window.removeEventListener("keydown",_),Z&&window.removeEventListener("deviceorientation",N)}}function Ln(){xe==null||xe(),xe=null}const ve=document.getElementById("app");let ue=[],ct=!1;function Ee(){Ln();const{path:e}=Ve();if(e==="/"||e==="")ve.innerHTML=ms(ue);else if(e==="/topics")ve.innerHTML=ys(ue);else if(e.startsWith("/topic/")){const t=e.slice(7);ve.innerHTML=$s(ue,t)}else if(e==="/wrong"){ve.innerHTML=Ss(ue);const t=ve.querySelector('[data-testid="wrong-start"]');t==null||t.addEventListener("click",s=>{if(s.preventDefault(),ct)return;ct=!0,setTimeout(()=>{ct=!1},300);const a=Cs(ue);a&&(location.hash=`#/q/${a}?from=wrong`)})}else e==="/me"&&(ve.innerHTML=Es(ue,Ee));const n=$n(e);n!=null&&Be(n)}async function En(){var n;wn();try{ue=await jn()}catch{ve.innerHTML=`
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
    `,(n=document.getElementById("retry-load-btn"))==null||n.addEventListener("click",()=>{En()});return}ke("/",()=>{ce(),Ee()}),ke("/topics",()=>{ce(),Ee()}),ke("/wrong",()=>{ce(),Ee()}),ke("/me",()=>{ce(),Ee()}),ke("/topic/:topicIndex",()=>{ce(),Ee()}),ke("/q/:id",(t,s)=>{ce();const a=t.id,d=s.from||"topic",r=s.sec?parseInt(s.sec,10):void 0,l=s.retry==="1"||s.retry==="true";pn(ve,ue,a,d,{sec:r,retry:l})}),ke("/done/:kind/:topicIndex",(t,s)=>{ce();const d=le(ue)[Number(t.topicIndex)];if(!d||!d.questions.length){V("#/");return}const r=t.kind==="wrong"?"wrong":"topic",l=s.sec?parseInt(s.sec,10):void 0,f=r==="topic"?d.questions[d.questions.length-1].id:d.questions[0].id;pn(ve,ue,f,r,{endCard:!0,sec:l})}),ke("/overview",(t,s)=>{ce(),Us(ve,ue,s)}),ke("/lab/water",()=>{ce(),Ln(),Vs(ve,ue)}),On(()=>{V("#/")}),Un(()=>{const{path:t}=Ve();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me"||t.startsWith("/topic/"))&&Ee()});const e=()=>{const{path:t}=Ve();(t==="/"||t==="")&&Ee()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Wn()}En();"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(e=>{console.warn("service worker register failed",e)})});
