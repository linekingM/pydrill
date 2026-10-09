(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const g of i.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&c(g)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();let He=null;async function jt(e=!1){if(He&&!e)return He;try{const s=await fetch("./question-bank/questions.json");if(!s.ok)throw new Error(`HTTP ${s.status} when fetching questions`);const t=await s.json();return He=t,t}catch(s){throw console.error("Failed to load questions:",s),s}}function ue(e){const s=new Map;for(const r of e)s.has(r.topic)||s.set(r.topic,[]),s.get(r.topic).push(r);const t=[];let c=0;for(const[r,i]of s.entries())t.push({name:r,index:c,questions:i}),c++;return t}function Pe(e,s){const t=ue(e);for(const c of t){const r=c.questions.findIndex(i=>i.id===s);if(r!==-1)return{topic:c,indexInTopic:r}}return null}const wt=[];let yt=()=>{};function Ce(e,s){const t=[],c=e.replace(/:([a-zA-Z0-9_]+)/g,(i,g)=>(t.push(g),"([^/?#]+)")).replace(/\//g,"\\/"),r=new RegExp(`^${c}$`);wt.push({regex:r,paramNames:t,handler:s})}function Dt(e){yt=e}function ae(e){let s=e;s.startsWith("#")||(s="#"+(s.startsWith("/")?s:"/"+s)),window.location.hash===s?je():window.location.hash=s}function Se(){const e=window.location.hash.slice(1)||"/",[s,t]=e.split("?"),c=s.startsWith("/")?s:"/"+s,r={};return t&&new URLSearchParams(t).forEach((g,o)=>{r[o]=g}),{path:c,query:r}}function je(){const{path:e,query:s}=Se();for(const t of wt){const c=e.match(t.regex);if(c){const r={};t.paramNames.forEach((i,g)=>{r[i]=c[g+1]?decodeURIComponent(c[g+1]):""}),t.handler(r,s);return}}yt({},s)}function Rt(){window.addEventListener("hashchange",je),je()}const We="pydrill.v1.records",Ue="pydrill.v1.last",De=new Set;function Ot(e){return De.add(e),()=>{De.delete(e)}}function xt(){for(const e of De)try{e()}catch(s){console.error("Error in store listener:",s)}}function J(){try{const e=localStorage.getItem(We);if(!e)return{};const s=JSON.parse(e);return typeof s!="object"||s===null?{}:s}catch(e){return console.warn("Failed to parse records from localStorage:",e),{}}}function ye(e){return J()[e]}function $t(e){try{localStorage.setItem(We,JSON.stringify(e))}catch(s){console.error("Failed to save records to localStorage:",s)}xt()}function Wt(e,s){const t=J(),c=t[e.id];let r,i=!1;!!(e.answer&&e.answer.trim().length>0)?s===e.answer.trim()?(r="correct",i=(c==null?void 0:c.inWrongBook)??!1):(r="wrong",i=!0):(r="ungraded",i=!1);const o={choice:s,result:r,submittedAt:Date.now(),inWrongBook:i};return t[e.id]=o,$t(t),o}function ct(e){const s=J();s[e]&&(s[e]={...s[e],inWrongBook:!1},$t(s))}function Ut(){try{localStorage.removeItem(We)}catch(e){console.error("Failed to clear localStorage:",e)}try{localStorage.removeItem(Ue)}catch(e){console.error("Failed to clear last position:",e)}xt()}function zt(e){try{const s=localStorage.getItem(Ue);if(!s)return null;const t=JSON.parse(s);if(!t||typeof t!="object"||Array.isArray(t))return null;const c=t.id,r=t.at;return typeof c!="string"||c.length===0||typeof r!="number"||!Number.isFinite(r)||!e.some(i=>i.id===c)?null:{id:c,at:r}}catch(s){return console.warn("Failed to parse last position:",s),null}}function Vt(e){try{localStorage.setItem(Ue,JSON.stringify({id:e,at:Date.now()}))}catch(s){console.error("Failed to save last position:",s)}}function Gt(e){var c;const s=J();let t=0;for(const r of e)((c=s[r.id])==null?void 0:c.result)==="correct"&&t++;return t}function kt(e){const s=J();return e.filter(t=>{var c;return!!((c=s[t.id])!=null&&c.inWrongBook)})}function Qt(e){var r;const s=J(),t=e.length;let c=0;for(const i of e)((r=s[i.id])==null?void 0:r.result)==="correct"&&c++;return{correct:c,total:t}}function Nt(e){const s=J();let t=0,c=0,r=0;for(const i of e){const g=s[i.id];g&&(t++,g.result==="correct"&&c++,g.inWrongBook&&r++)}return{submittedCount:t,correctCount:c,wrongBookCount:r}}function Zt(e,s=new Date){if(e===0)return 0;const t=s.getFullYear(),c=s.getMonth(),r=s.getDate();return(Math.floor(Date.UTC(t,c,r)/864e5)%e+e)%e}function Yt(e,s=new Date){if(e.length===0)return;const t=Zt(e.length,s);return e[t]}function Kt(e,s){const t=new Date(e),c=new Date(s);return t.getFullYear()===c.getFullYear()&&t.getMonth()===c.getMonth()&&t.getDate()===c.getDate()}function Jt(e,s=new Date){const t=ye(e.id),c=s.getTime();return!t||!Kt(t.submittedAt,c)?{statusText:"今天还没做",isCompletedToday:!1}:t.result==="correct"?{statusText:"今天答对",isCompletedToday:!0,result:"correct"}:t.result==="wrong"?{statusText:"今天答错",isCompletedToday:!0,result:"wrong"}:{statusText:"今天已提交（未判分）",isCompletedToday:!0,result:"ungraded"}}function Xt(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11.8" />
    <path d="M12 14.5C8.8 14 6.2 11.2 6.5 8.2C9.5 8 11.5 10.2 12 12" />
    <path d="M12 12.8C13 10.2 15.2 7.8 18.2 8C18.5 11 16 13.8 12.8 14.2" />
    <circle cx="12" cy="7.2" r="2.2" fill="${e?"#E9964F":"none"}" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function en(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 21.5V11" />
    <path d="M12 11C12 7.2 8.5 4.2 3.8 5C3.8 9.8 6.8 13.8 12 13.8" />
    <path d="M12 14C14.8 12.2 19.5 13 20.2 17C16.5 18 12.8 17 12 14" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function tn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 19.5C4.5 18.2 5.5 17 6.8 17H19.5" />
    <path d="M6.8 3H19.5V21H6.8C5.5 21 4.5 20 4.5 18.8V5.2C4.5 4 5.5 3 6.8 3Z" />
    <path d="M14 3V9L11.5 7.5L9 9V3" fill="${e?"#E9964F":"none"}" />
    <path d="M8 13H15" stroke-dasharray="1 0.5" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function nn(e){return`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${e?"#E9964F":"currentColor"}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="7.5" r="4" />
    <path d="M15.5 7L18.5 8L15.5 9" />
    <path d="M5.5 20.5C5.8 16.2 8.5 13.5 12 13.5C15.5 13.5 18.2 16.2 18.5 20.5" />
    <path d="M12 3.5V2" />
    <path d="M10.8 2.2C11.5 2 12.8 2 13.2 2.2" />
    ${e?'<path d="M6 23.5Q12 21.8 18 23.5" stroke="#E9964F" stroke-width="2.2"/>':""}
  </svg>`}function lt(){return`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M19 12H5" />
    <path d="M11 6L5 12L11 18" />
  </svg>`}function sn(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4.5 12.5L9.5 17.5L19.5 6.5" />
  </svg>`}function an(){return`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 6L18 18" />
    <path d="M18 6L6 18" />
  </svg>`}function Ct(e=20){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 18H15" />
    <path d="M10 21H14" />
    <path d="M12 2C8.2 2 5.5 5 5.5 8.8C5.5 11.5 7.2 13.8 9 15.2V16C9 16.5 9.5 17 10 17H14C14.5 17 15 16.5 15 16V15.2C16.8 13.8 18.5 11.5 18.5 8.8C18.5 5 15.8 2 12 2Z" fill="#FDEFE3" stroke="#E9964F" />
    <path d="M12 6V9" stroke="#E9964F" stroke-width="2" />
  </svg>`}function rn(){return`<svg width="14" height="14" viewBox="0 0 16 16" fill="#E9964F">
    <circle cx="8" cy="4" r="2.4" />
    <circle cx="12" cy="7" r="2.4" />
    <circle cx="10.5" cy="11.5" r="2.4" />
    <circle cx="5.5" cy="11.5" r="2.4" />
    <circle cx="4" cy="7" r="2.4" />
    <circle cx="8" cy="8" r="1.8" fill="#FDEFE3" />
  </svg>`}function on(e=16){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 12A9 9 0 1 0 5.6 5.6L3 8" />
    <path d="M3 3V8H8" />
  </svg>`}function dt(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6H21" />
    <path d="M19 6L18.2 19.2C18.1 20.2 17.2 21 16.2 21H7.8C6.8 21 5.9 20.2 5.8 19.2L5 6" />
    <path d="M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" />
    <path d="M10 11V16" />
    <path d="M14 11V16" />
  </svg>`}function Re(){return`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C8F62" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 21C3 21 7 19 12 12C17 5 21 3 21 3C21 3 19 7 13 13C6 19 3 21 3 21Z" />
    <path d="M3 21L11 12" />
  </svg>`}function pt(e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="#78564A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-3.2L6 20V5.5a1 1 0 0 1 1-1z" fill="#F3E6D4"/>
  </svg>`}function Ft(e=16,s="#7C8F62"){return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -2px; display: inline-block;">
    <path d="M12 22V12" />
    <path d="M12 12C12 7.5 8 4 3 5C3 10 7 13.5 12 13" fill="#E3EAD6" />
    <path d="M12 14C12.5 10 16.5 7.5 21 8.5C20.5 13.5 16.5 16 12 14" fill="#E3EAD6" />
  </svg>`}function At(e){return e.includes("字符串")||e.includes("循环")?'<span class="topic-glyph-badge"><span class="glyph-orange">"</span>ab<span class="glyph-orange">"</span></span>':e.includes("元组")||e.includes("引用")?'<span class="topic-glyph-badge">(1<span class="glyph-orange">,</span>)</span>':e.includes("函数")||e.includes("默认参数")?'<span class="topic-glyph-badge"><span class="glyph-orange">f</span>()</span>':e.includes("列表")||e.includes("切片")?'<span class="topic-glyph-badge glyph-mono">[<span class="glyph-orange">::</span>]</span>':e.includes("字典")?'<span class="topic-glyph-badge glyph-mono">{<span class="glyph-orange">:</span>}</span>':e.includes("作用域")||e.includes("变量")?'<span class="topic-glyph-badge">x<span class="glyph-orange">=</span></span>':e.includes("类")||e.includes("对象")?'<span class="topic-glyph-badge"><span class="glyph-orange">c</span>ls</span>':'<span class="topic-glyph-badge"><span class="glyph-orange">t</span>ry</span>'}function Fe(e,s=0){if(e==="none")return"";const t=e==="home",c=e==="topics",r=e==="wrong",i=e==="me";return`
    <nav class="bottom-nav-container" aria-label="底部导航">
      <div class="bottom-nav-bar">
        <a href="#/" class="bottom-nav-item ${t?"active":""}" data-testid="tab-home">
          ${Xt(t)}
          <span class="bottom-nav-label">首页</span>
        </a>
        <a href="#/topics" class="bottom-nav-item ${c?"active":""}" data-testid="tab-topics">
          ${en(c)}
          <span class="bottom-nav-label">知识点</span>
        </a>
        <a href="#/wrong" class="bottom-nav-item ${r?"active":""}" data-testid="tab-wrong">
          <div class="nav-icon-wrapper">
            ${tn(r)}
            ${s>0?`<span class="nav-badge" data-testid="wrong-count">${s}</span>`:""}
          </div>
          <span class="bottom-nav-label">错题本</span>
        </a>
        <a href="#/me" class="bottom-nav-item ${i?"active":""}" data-testid="tab-me">
          ${nn(i)}
          <span class="bottom-nav-label">我的</span>
        </a>
      </div>
    </nav>
  `}const cn=""+new URL("hero-tree-BQtvnSiX.svg",import.meta.url).href,Lt=""+new URL("mascot-books-ChtzdIQo.svg",import.meta.url).href,ln=""+new URL("icon-calendar-CxLZz4gM.svg",import.meta.url).href,dn=""+new URL("icon-books-DPG9c4Rf.svg",import.meta.url).href,pn=""+new URL("icon-notebook-DrFh_u_v.svg",import.meta.url).href;function Ie(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Et(e){const s=J(),c=kt(e).length,r=ue(e),i=r.length,g=Yt(e),o=g?Jt(g):{statusText:"今天还没做",isCompletedToday:!1},y=g?Pe(e,g.id):null,S=y?y.indexInTopic+1:1,G=y?y.topic.questions.length:2,u=g?`${g.topic} · 第 ${S}/${G} 题`:"今日一题",D=new Date,Y=`${D.getMonth()+1}月${D.getDate()}日`,j=g!=null&&g.code?g.code.split(`
`).slice(0,3).join(`
`):"",A=r[0],L=(A==null?void 0:A.name)||"",M=A&&A.questions.length>0?A.questions.find(h=>!s[h.id])||A.questions[0]:void 0,a=zt(e),n=a?e.find(h=>h.id===a.id):void 0,l=n?Pe(e,n.id):null,d=n!=null&&n.code?(n.code.split(`
`)[0]||"").trim():"",p=n&&l?`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-top">
          <div class="continue-copy">
            <div class="continue-kicker">
              ${pt(18)}
              <span>继续上次</span>
            </div>
            <p class="continue-title" data-testid="continue-title">${Ie(l.topic.name)} · 第 ${l.indexInTopic+1}/${l.topic.questions.length} 题</p>
          </div>
          <a href="#/q/${n.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-btn">
            <span>继续</span>
          </a>
        </div>
        ${d?`<div class="continue-code"><code>${Ie(d)}</code></div>`:""}
      </section>
    `:`
      <section class="card paper-card continue-card" data-testid="continue-card" aria-label="继续上次">
        <div class="continue-empty" data-testid="continue-empty">
          <div class="continue-kicker">
            ${pt(18)}
            <span>还没开始呢</span>
          </div>
          <p class="continue-desc">从「${Ie(L)}」开始吧，一次一小步。</p>
          ${M?`<a href="#/q/${M.id}?from=topic" class="btn-primary continue-btn active-press" data-testid="continue-start"><span>开始第一个知识点</span></a>`:""}
        </div>
      </section>
    `;return`
    <div class="page-wrapper page-home">
      <header class="home-hero select-none">
        <div class="hero-tree-wrapper">
          <img src="${cn}" alt="PyDrill 大树与小鸟" class="hero-tree-img" />
        </div>
        <div class="hero-title-group">
          <div class="hero-logo-row">
            <h1 class="hero-logo-hand">PyDrill</h1>
            <span class="hero-flower-icon">${rn()}</span>
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
        <a href="#/q/${(g==null?void 0:g.id)||(M==null?void 0:M.id)||"q001"}?from=daily" class="entry-card active-press">
          <img src="${ln}" alt="日历" class="entry-icon-direct" />
          <span class="entry-card-title">今日一题</span>
          <span class="entry-card-sub">${o.statusText}</span>
        </a>

        <a href="#/topics" class="entry-card active-press">
          <img src="${dn}" alt="书籍" class="entry-icon-direct" />
          <span class="entry-card-title">知识点</span>
          <span class="entry-card-sub">${i} 个知识点</span>
        </a>

        <a href="#/wrong" class="entry-card active-press">
          <img src="${pn}" alt="错题本" class="entry-icon-direct" />
          <span class="entry-card-title">错题本</span>
          <span class="entry-card-sub">${c>0?`${c} 题待温习`:"错题本空"}</span>
        </a>
      </section>

      ${p}

      ${g?`
        <section class="card paper-card daily-card" data-testid="daily-card" aria-label="今日一题卡片">
          <div class="daily-header-row">
            <div class="daily-header-titles">
              <span class="daily-card-label">今日一题 · ${Y}</span>
              <h3 class="daily-q-title">${u}</h3>
            </div>
            <span class="chip-status ${o.result==="correct"?"chip-green":o.result==="wrong"?"chip-red":"chip-orange"}" data-testid="daily-status">
              ${o.statusText}
            </span>
          </div>

          <p class="daily-stem-text">${g.stem}</p>

          ${j?`
            <div class="daily-code-box">
              <pre class="daily-code-pre"><code>${j}</code></pre>
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
              <img src="${Lt}" alt="小芽啾读书" class="daily-mascot-img" />
            </div>
          </div>
        </section>
      `:""}
    </div>

    ${Fe("home",c)}
  `}const un={"字符串/循环":"文字怎么处理、循环怎么跑","元组/引用":"元组不可改，变量只是指向","函数/默认参数":"参数怎么传、默认值何时定","列表/切片":"列表增删改，切片取一段",字典:"用键存取数据、查找与更新","作用域/变量":"变量在哪能用、哪里改得到","类/对象":"用类造对象，属性和方法",异常处理:"出错时怎么接住、怎么收尾"},gn={"字符串/循环":"continue、break 与 for…else","元组/引用":"不可变的元组、+= 与引用","函数/默认参数":"默认值在 def 时就定好","列表/切片":"反向切片、复制与引用",字典:"键的相等、get 与 setdefault","作用域/变量":"局部变量、闭包晚绑定","类/对象":"类属性共享、继承与重写",异常处理:"try/except/else/finally 的顺序"};function St(e){const s=ue(e),t=J(),c=Gt(e),r=kt(e).length,i=s.map((g,o)=>{const{correct:y,total:S}=Qt(g.questions),G=S>0?y/S*100:0,u=g.questions.find(j=>!t[j.id])||g.questions[0],D=un[g.name]??gn[g.name],Y=o%4;return`
        <article
          class="card paper-card topic-card active-press"
          data-testid="topic-card-${o}"
          onclick="window.location.hash = '#/q/${u.id}?from=topic'"
        >
          <div class="topic-card-head">
            <div class="topic-custom-icon-box">
              ${At(g.name)}
            </div>
            <div class="topic-card-text">
              <div class="topic-header-row">
                <h2 class="topic-name">${g.name}</h2>
                <span class="topic-index-badge">#${String(o+1).padStart(2,"0")}</span>
              </div>
              ${D?`<p class="topic-sub" data-testid="topic-sub-${o}">${D}</p>`:""}
            </div>
            <span class="topic-count-badge" data-testid="topic-progress-${o}">${y} / ${S}</span>
          </div>
          <div class="topic-long-track" aria-hidden="true">
            ${G>0?`<div class="topic-long-fill tone-${Y}" style="width: ${G}%;"></div>`:""}
          </div>
        </article>
      `}).join("");return`
    <div class="page-wrapper page-topics">
      <header class="section-header topics-page-header">
        <div class="header-content-left">
          <div class="section-title-wrap">
            <h1 class="page-title">按知识点练习</h1>
            <span class="title-doodle-leaf">${Re()}</span>
          </div>
          <p class="section-desc">共 ${e.length} 题 · 已做对 ${c} 题</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Lt}" alt="" class="header-mascot-img" />
        </div>
      </header>

      <section class="topics-list" aria-label="知识点列表">
        ${i}
      </section>
    </div>

    ${Fe("topics",r)}
  `}const hn=""+new URL("notebook-empty-DNz-TYOq.svg",import.meta.url).href,Oe=""+new URL("mascot-sad-Dg1R60AV.svg",import.meta.url).href;function fn(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Tt(e,s){const t=J(),c=ue(e),r=e.filter(y=>{var S;return!!((S=t[y.id])!=null&&S.inWrongBook)}),i=r.length;if(i===0)return`
      <div class="page-wrapper page-wrong">
        <header class="section-header wrong-page-header">
          <div class="header-content-left">
            <div class="section-title-wrap">
              <h1 class="page-title">错题本</h1>
              <span class="title-doodle-leaf">${Re()}</span>
            </div>
            <p class="section-desc">答错的题会自动收进这里；答对后可以手动移出</p>
          </div>
          <div class="header-illustration-right">
            <img src="${Oe}" alt="" class="wrong-header-img" />
          </div>
        </header>

        <section class="card paper-card wrong-empty-card" data-testid="wrong-empty" aria-label="错题本空状态">
          <div class="wrong-empty-img-wrap">
            <img src="${hn}" alt="空白小本子" class="wrong-empty-img" />
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

      ${Fe("wrong",0)}
    `;let g=r[0].id;for(const y of c){const S=y.questions.find(G=>{var u;return!!((u=t[G.id])!=null&&u.inWrongBook)});if(S){g=S.id;break}}const o=c.map(y=>{const S=y.questions.filter(Y=>{var j;return!!((j=t[Y.id])!=null&&j.inWrongBook)});if(S.length===0)return"";const u=S.filter(Y=>{var j;return((j=t[Y.id])==null?void 0:j.result)==="correct"}).length/S.length*100,D=String(y.index+1).padStart(2,"0");return`
        <a
          class="wrong-topic-card"
          data-testid="wrong-topic-${y.index}"
          href="#/q/${S[0].id}?from=wrong"
        >
          <div class="topic-custom-icon-box">${At(y.name)}</div>
          <div class="wrong-topic-main">
            <div class="wrong-topic-name-row">
              <span class="wrong-topic-name">${fn(y.name)}</span>
              <span class="wrong-topic-index">#${D}</span>
            </div>
            <div class="wrong-topic-meta">
              <span data-testid="wrong-topic-count-${y.index}">${S.length}</span> 道错题待温习
            </div>
            <div class="wrong-topic-track" aria-hidden="true">
              <div class="wrong-topic-fill" style="width: ${u}%;"></div>
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
            <span class="title-doodle-leaf">${Re()}</span>
          </div>
          <p class="section-desc">答错的题会自动收进这里；答对后可以手动移出</p>
        </div>
        <div class="header-illustration-right">
          <img src="${Oe}" alt="" class="wrong-header-img" />
        </div>
      </header>

      <section class="card paper-card wrong-summary-card">
        <div class="wrong-summary-count-row">
          <span>现在有</span>
          <span class="wrong-summary-count-num" data-testid="wrong-count">${i}</span>
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

    ${Fe("wrong",i)}
  `}const Le=""+new URL("mascot-happy-Urhu8y7U.svg",import.meta.url).href;function qt(e,s){const{submittedCount:t,correctCount:c,wrongBookCount:r}=Nt(e);return typeof window<"u"&&(window.__pydrill_showClearDialog=()=>{const i=document.getElementById("clear-confirm-modal");i&&i.classList.remove("hidden")},window.__pydrill_hideClearDialog=()=>{const i=document.getElementById("clear-confirm-modal");i&&i.classList.add("hidden")},window.__pydrill_confirmClear=()=>{Ut();const i=document.getElementById("clear-confirm-modal");i&&i.classList.add("hidden"),s&&s()}),`
    <div class="page-wrapper page-me">
      <!-- 1. Header Profile Section -->
      <section class="me-profile-section select-none">
        <div class="me-avatar-wrapper">
          <div class="me-avatar-halo"></div>
          <img src="${Le}" alt="小芽啾" class="me-avatar-img" />
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
            <span class="stat-col-num num-orange">${c}</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-col">
            <span class="stat-col-label">错题本</span>
            <span class="stat-col-num num-brown">${r}</span>
          </div>
        </div>

        <div class="stats-motto-row">
          <span>${Ft(16)} 慢慢学，每一题都是进步的脚步</span>
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
              ${dt()}
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
            ${dt()}
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

    ${Fe("me",r)}
  `}var ut=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function mn(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var _e={exports:{}},gt;function vn(){return gt||(gt=1,(function(e){var s=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var t=(function(c){var r=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,i=0,g={},o={manual:c.Prism&&c.Prism.manual,disableWorkerMessageHandler:c.Prism&&c.Prism.disableWorkerMessageHandler,util:{encode:function a(n){return n instanceof y?new y(n.type,a(n.content),n.alias):Array.isArray(n)?n.map(a):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(a){return Object.prototype.toString.call(a).slice(8,-1)},objId:function(a){return a.__id||Object.defineProperty(a,"__id",{value:++i}),a.__id},clone:function a(n,l){l=l||{};var d,p;switch(o.util.type(n)){case"Object":if(p=o.util.objId(n),l[p])return l[p];d={},l[p]=d;for(var h in n)n.hasOwnProperty(h)&&(d[h]=a(n[h],l));return d;case"Array":return p=o.util.objId(n),l[p]?l[p]:(d=[],l[p]=d,n.forEach(function(k,m){d[m]=a(k,l)}),d);default:return n}},getLanguage:function(a){for(;a;){var n=r.exec(a.className);if(n)return n[1].toLowerCase();a=a.parentElement}return"none"},setLanguage:function(a,n){a.className=a.className.replace(RegExp(r,"gi"),""),a.classList.add("language-"+n)},currentScript:function(){if(typeof document>"u")return null;if(document.currentScript&&document.currentScript.tagName==="SCRIPT")return document.currentScript;try{throw new Error}catch(d){var a=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(d.stack)||[])[1];if(a){var n=document.getElementsByTagName("script");for(var l in n)if(n[l].src==a)return n[l]}return null}},isActive:function(a,n,l){for(var d="no-"+n;a;){var p=a.classList;if(p.contains(n))return!0;if(p.contains(d))return!1;a=a.parentElement}return!!l}},languages:{plain:g,plaintext:g,text:g,txt:g,extend:function(a,n){var l=o.util.clone(o.languages[a]);for(var d in n)l[d]=n[d];return l},insertBefore:function(a,n,l,d){d=d||o.languages;var p=d[a],h={};for(var k in p)if(p.hasOwnProperty(k)){if(k==n)for(var m in l)l.hasOwnProperty(m)&&(h[m]=l[m]);l.hasOwnProperty(k)||(h[k]=p[k])}var B=d[a];return d[a]=h,o.languages.DFS(o.languages,function(R,K){K===B&&R!=a&&(this[R]=h)}),h},DFS:function a(n,l,d,p){p=p||{};var h=o.util.objId;for(var k in n)if(n.hasOwnProperty(k)){l.call(n,k,n[k],d||k);var m=n[k],B=o.util.type(m);B==="Object"&&!p[h(m)]?(p[h(m)]=!0,a(m,l,null,p)):B==="Array"&&!p[h(m)]&&(p[h(m)]=!0,a(m,l,k,p))}}},plugins:{},highlightAll:function(a,n){o.highlightAllUnder(document,a,n)},highlightAllUnder:function(a,n,l){var d={callback:l,container:a,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};o.hooks.run("before-highlightall",d),d.elements=Array.prototype.slice.apply(d.container.querySelectorAll(d.selector)),o.hooks.run("before-all-elements-highlight",d);for(var p=0,h;h=d.elements[p++];)o.highlightElement(h,n===!0,d.callback)},highlightElement:function(a,n,l){var d=o.util.getLanguage(a),p=o.languages[d];o.util.setLanguage(a,d);var h=a.parentElement;h&&h.nodeName.toLowerCase()==="pre"&&o.util.setLanguage(h,d);var k=a.textContent,m={element:a,language:d,grammar:p,code:k};function B(K){m.highlightedCode=K,o.hooks.run("before-insert",m),m.element.innerHTML=m.highlightedCode,o.hooks.run("after-highlight",m),o.hooks.run("complete",m),l&&l.call(m.element)}if(o.hooks.run("before-sanity-check",m),h=m.element.parentElement,h&&h.nodeName.toLowerCase()==="pre"&&!h.hasAttribute("tabindex")&&h.setAttribute("tabindex","0"),!m.code){o.hooks.run("complete",m),l&&l.call(m.element);return}if(o.hooks.run("before-highlight",m),!m.grammar){B(o.util.encode(m.code));return}if(n&&c.Worker){var R=new Worker(o.filename);R.onmessage=function(K){B(K.data)},R.postMessage(JSON.stringify({language:m.language,code:m.code,immediateClose:!0}))}else B(o.highlight(m.code,m.grammar,m.language))},highlight:function(a,n,l){var d={code:a,grammar:n,language:l};if(o.hooks.run("before-tokenize",d),!d.grammar)throw new Error('The language "'+d.language+'" has no grammar.');return d.tokens=o.tokenize(d.code,d.grammar),o.hooks.run("after-tokenize",d),y.stringify(o.util.encode(d.tokens),d.language)},tokenize:function(a,n){var l=n.rest;if(l){for(var d in l)n[d]=l[d];delete n.rest}var p=new u;return D(p,p.head,a),G(a,p,n,p.head,0),j(p)},hooks:{all:{},add:function(a,n){var l=o.hooks.all;l[a]=l[a]||[],l[a].push(n)},run:function(a,n){var l=o.hooks.all[a];if(!(!l||!l.length))for(var d=0,p;p=l[d++];)p(n)}},Token:y};c.Prism=o;function y(a,n,l,d){this.type=a,this.content=n,this.alias=l,this.length=(d||"").length|0}y.stringify=function a(n,l){if(typeof n=="string")return n;if(Array.isArray(n)){var d="";return n.forEach(function(B){d+=a(B,l)}),d}var p={type:n.type,content:a(n.content,l),tag:"span",classes:["token",n.type],attributes:{},language:l},h=n.alias;h&&(Array.isArray(h)?Array.prototype.push.apply(p.classes,h):p.classes.push(h)),o.hooks.run("wrap",p);var k="";for(var m in p.attributes)k+=" "+m+'="'+(p.attributes[m]||"").replace(/"/g,"&quot;")+'"';return"<"+p.tag+' class="'+p.classes.join(" ")+'"'+k+">"+p.content+"</"+p.tag+">"};function S(a,n,l,d){a.lastIndex=n;var p=a.exec(l);if(p&&d&&p[1]){var h=p[1].length;p.index+=h,p[0]=p[0].slice(h)}return p}function G(a,n,l,d,p,h){for(var k in l)if(!(!l.hasOwnProperty(k)||!l[k])){var m=l[k];m=Array.isArray(m)?m:[m];for(var B=0;B<m.length;++B){if(h&&h.cause==k+","+B)return;var R=m[B],K=R.inside,f=!!R.lookbehind,$=!!R.greedy,O=R.alias;if($&&!R.pattern.global){var b=R.pattern.toString().match(/[imsuy]*$/)[0];R.pattern=RegExp(R.pattern.source,b+"g")}for(var F=R.pattern||R,x=d.next,v=p;x!==n.tail&&!(h&&v>=h.reach);v+=x.value.length,x=x.next){var E=x.value;if(n.length>a.length)return;if(!(E instanceof y)){var _=1,q;if($){if(q=S(F,v,a,f),!q||q.index>=a.length)break;var W=q.index,Q=q.index+q[0].length,P=v;for(P+=x.value.length;W>=P;)x=x.next,P+=x.value.length;if(P-=x.value.length,v=P,x.value instanceof y)continue;for(var V=x;V!==n.tail&&(P<Q||typeof V.value=="string");V=V.next)_++,P+=V.value.length;_--,E=a.slice(v,P),q.index-=v}else if(q=S(F,0,E,f),!q)continue;var W=q.index,ee=q[0],ne=E.slice(0,W),ie=E.slice(W+ee.length),le=v+E.length;h&&le>h.reach&&(h.reach=le);var fe=x.prev;ne&&(fe=D(n,fe,ne),v+=ne.length),Y(n,fe,_);var Ae=new y(k,K?o.tokenize(ee,K):ee,O,ee);if(x=D(n,fe,Ae),ie&&D(n,x,ie),_>1){var xe={cause:k+","+B,reach:le};G(a,n,l,x.prev,v,xe),h&&xe.reach>h.reach&&(h.reach=xe.reach)}}}}}}function u(){var a={value:null,prev:null,next:null},n={value:null,prev:a,next:null};a.next=n,this.head=a,this.tail=n,this.length=0}function D(a,n,l){var d=n.next,p={value:l,prev:n,next:d};return n.next=p,d.prev=p,a.length++,p}function Y(a,n,l){for(var d=n.next,p=0;p<l&&d!==a.tail;p++)d=d.next;n.next=d,d.prev=n,a.length-=p}function j(a){for(var n=[],l=a.head.next;l!==a.tail;)n.push(l.value),l=l.next;return n}if(!c.document)return c.addEventListener&&(o.disableWorkerMessageHandler||c.addEventListener("message",function(a){var n=JSON.parse(a.data),l=n.language,d=n.code,p=n.immediateClose;c.postMessage(o.highlight(d,o.languages[l],l)),p&&c.close()},!1)),o;var A=o.util.currentScript();A&&(o.filename=A.src,A.hasAttribute("data-manual")&&(o.manual=!0));function L(){o.manual||o.highlightAll()}if(!o.manual){var M=document.readyState;M==="loading"||M==="interactive"&&A&&A.defer?document.addEventListener("DOMContentLoaded",L):window.requestAnimationFrame?window.requestAnimationFrame(L):window.setTimeout(L,16)}return o})(s);e.exports&&(e.exports=t),typeof ut<"u"&&(ut.Prism=t),t.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},t.languages.markup.tag.inside["attr-value"].inside.entity=t.languages.markup.entity,t.languages.markup.doctype.inside["internal-subset"].inside=t.languages.markup,t.hooks.add("wrap",function(c){c.type==="entity"&&(c.attributes.title=c.content.replace(/&amp;/,"&"))}),Object.defineProperty(t.languages.markup.tag,"addInlined",{value:function(r,i){var g={};g["language-"+i]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:t.languages[i]},g.cdata=/^<!\[CDATA\[|\]\]>$/i;var o={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:g}};o["language-"+i]={pattern:/[\s\S]+/,inside:t.languages[i]};var y={};y[r]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return r}),"i"),lookbehind:!0,greedy:!0,inside:o},t.languages.insertBefore("markup","cdata",y)}}),Object.defineProperty(t.languages.markup.tag,"addAttribute",{value:function(c,r){t.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+c+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[r,"language-"+r],inside:t.languages[r]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),t.languages.html=t.languages.markup,t.languages.mathml=t.languages.markup,t.languages.svg=t.languages.markup,t.languages.xml=t.languages.extend("markup",{}),t.languages.ssml=t.languages.xml,t.languages.atom=t.languages.xml,t.languages.rss=t.languages.xml,(function(c){var r=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;c.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+r.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+r.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+r.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+r.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:r,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},c.languages.css.atrule.inside.rest=c.languages.css;var i=c.languages.markup;i&&(i.tag.addInlined("style","css"),i.tag.addAttribute("style","css"))})(t),t.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},t.languages.javascript=t.languages.extend("clike",{"class-name":[t.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),t.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,t.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:t.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:t.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:t.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:t.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:t.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),t.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:t.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),t.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),t.languages.markup&&(t.languages.markup.tag.addInlined("script","javascript"),t.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),t.languages.js=t.languages.javascript,(function(){if(typeof t>"u"||typeof document>"u")return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var c="Loading…",r=function(A,L){return"✖ Error "+A+" while fetching file: "+L},i="✖ Error: File does not exist or is empty",g={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},o="data-src-status",y="loading",S="loaded",G="failed",u="pre[data-src]:not(["+o+'="'+S+'"]):not(['+o+'="'+y+'"])';function D(A,L,M){var a=new XMLHttpRequest;a.open("GET",A,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?L(a.responseText):a.status>=400?M(r(a.status,a.statusText)):M(i))},a.send(null)}function Y(A){var L=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(A||"");if(L){var M=Number(L[1]),a=L[2],n=L[3];return a?n?[M,Number(n)]:[M,void 0]:[M,M]}}t.hooks.add("before-highlightall",function(A){A.selector+=", "+u}),t.hooks.add("before-sanity-check",function(A){var L=A.element;if(L.matches(u)){A.code="",L.setAttribute(o,y);var M=L.appendChild(document.createElement("CODE"));M.textContent=c;var a=L.getAttribute("data-src"),n=A.language;if(n==="none"){var l=(/\.(\w+)$/.exec(a)||[,"none"])[1];n=g[l]||l}t.util.setLanguage(M,n),t.util.setLanguage(L,n);var d=t.plugins.autoloader;d&&d.loadLanguages(n),D(a,function(p){L.setAttribute(o,S);var h=Y(L.getAttribute("data-range"));if(h){var k=p.split(/\r\n?|\n/g),m=h[0],B=h[1]==null?k.length:h[1];m<0&&(m+=k.length),m=Math.max(0,Math.min(m-1,k.length)),B<0&&(B+=k.length),B=Math.max(0,Math.min(B,k.length)),p=k.slice(m,B).join(`
`),L.hasAttribute("data-start")||L.setAttribute("data-start",String(m+1))}M.textContent=p,t.highlightElement(M)},function(p){L.setAttribute(o,G),M.textContent=p})}}),t.plugins.fileHighlight={highlight:function(L){for(var M=(L||document).querySelectorAll(u),a=0,n;n=M[a++];)t.highlightElement(n)}};var j=!1;t.fileHighlight=function(){j||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),j=!0),t.plugins.fileHighlight.highlight.apply(this,arguments)}})()})(_e)),_e.exports}var bn=vn();const ht=mn(bn);var ft={},mt;function wn(){return mt||(mt=1,Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python["string-interpolation"].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python),ft}wn();function yn(e){return!e||!e.trim()?"":`<div class="code-card"><div class="code-header"><div class="code-header-dots"><span class="code-dot dot-red"></span><span class="code-dot dot-yellow"></span><span class="code-dot dot-green"></span></div><span class="code-header-lang">python3</span></div><pre class="code-pre select-text"><code class="language-python">${e.replace(/\r\n/g,`
`).replace(/\r/g,`
`).split(`
`).map((r,i)=>{const g=i+1,y=ht.highlight(r,ht.languages.python,"python")||"&#8203;";return`<div class="code-line"><span class="code-line-num select-none" aria-hidden="true">${g}</span><span class="code-line-content">${y}</span></div>`}).join("")}</code></pre></div>`}function vt(e){const s=new Date(e),t=s.getMonth()+1,c=s.getDate(),r=String(s.getHours()).padStart(2,"0"),i=String(s.getMinutes()).padStart(2,"0");return`${t}月${c}日 ${r}:${i}`}function Z(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bt(e){return e.replace(/`([^`]+)`/g,(s,t)=>`<code class="inline-code">${Z(t)}</code>`)}function xn(e){if(!e||!e.trim())return"解析还没编写";let s=e.indexOf("易错点："),t=4;s===-1&&(s=e.indexOf("易错点:"),t=4);let c=e,r="";s!==-1&&(c=e.slice(0,s).trim(),r=e.slice(s+t).trim(),r=r.replace(/^[：:\s]+/,""));const i=c.split(/\n+/).map(o=>o.trim()).filter(Boolean).map(o=>`<p class="explanation-p">${bt(o)}</p>`).join("");let g="";if(r){const o=bt(r);g=`
      <div class="explanation-trap-box">
        <div class="trap-box-header">
          ${Ct(16)}
          <span class="trap-box-title">易错点</span>
        </div>
        <p class="trap-box-content">${o}</p>
      </div>
    `}return`
    <div class="explanation-content-wrapper">
      ${i}
      ${g}
    </div>
  `}function $n(e,s,t,c="topic"){const r=c==="daily"||c==="wrong"?c:"topic",i=s.find(f=>f.id===t);if(!i){e.innerHTML=`
      <div class="page-wrapper error-page">
        <div class="card paper-card text-center p-6">
          <h2 class="text-lg font-bold text-primary mb-2">未找到该题目</h2>
          <p class="text-sm text-sub mb-4">题目可能不存在或已被移除</p>
          <a href="#/topics" class="btn-primary">返回知识点列表</a>
        </div>
      </div>
    `;return}Vt(i.id);const g=Pe(s,i.id),o=(g==null?void 0:g.topic)||ue(s)[0],y=g?g.indexInTopic:0,S=o.questions.length,G=ye(i.id);o.questions.filter(f=>{var $;return!!(($=J()[f.id])!=null&&$.inWrongBook)}).length;const u={from:r,selectedChoice:r==="wrong"?null:G?G.choice:null,isRedoing:!1,wrongFresh:r==="wrong",showLastTrace:!1,showEndCard:!1,justRemovedWrong:!1},D=`q${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;let Y=0,j=!1;const A='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M8.5 12.5l2.5 2.5 5-5"></path></svg>',L='<svg class="opt-status-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path stroke-linecap="round" stroke-linejoin="round" d="M9 9l6 6m0-6l-6 6"></path></svg>';function M(f){return/Error|Exception/.test(f)}function a(f,$,O,b){return $!=="graded"?O===f?"selected":"idle":i.answer&&f===i.answer?"correct":O===f&&(b==null?void 0:b.result)==="wrong"?"wrong":"locked"}function n(f,$,O){const b=f.querySelector(".opt-badge"),F=f.querySelector(".opt-text"),x=f.querySelector(".opt-status");if(!b||!F||!x)return;const v=f.getAttribute("data-error")==="1";f.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),b.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),F.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),f.setAttribute("aria-checked",O?"true":"false"),$==="correct"?f.setAttribute("data-state","correct"):$==="wrong"?f.setAttribute("data-state","wrong"):f.removeAttribute("data-state"),$==="selected"||$==="correct"?(f.classList.add($==="correct"?"opt-card-correct":"opt-card-selected"),$==="selected"&&f.classList.add("opt-pressable"),b.classList.add($==="correct"?"opt-badge-correct":"opt-badge-selected"),F.classList.add("opt-text-strong"),x.innerHTML=A):$==="wrong"?(f.classList.add("opt-card-wrong"),b.classList.add("opt-badge-wrong"),F.classList.add("opt-text-strong","opt-text-wrong"),x.innerHTML=L):$==="locked"?(f.classList.add("opt-card-locked"),b.classList.add("opt-badge-default"),v&&F.classList.add("opt-text-error"),x.innerHTML=""):(f.classList.add("opt-card-default","opt-pressable"),b.classList.add("opt-badge-default"),v&&F.classList.add("opt-text-error"),x.innerHTML="")}function l(f,$,O,b){const F=M(f.text),x=["option-item"],v=["opt-badge"],E=["opt-text"];let _="",q="";$==="selected"?(x.push("opt-card-selected","opt-pressable"),v.push("opt-badge-selected"),E.push("opt-text-strong"),_=A):$==="correct"?(x.push("opt-card-correct"),v.push("opt-badge-correct"),E.push("opt-text-strong"),_=A,q='data-state="correct"'):$==="wrong"?(x.push("opt-card-wrong"),v.push("opt-badge-wrong"),E.push("opt-text-strong","opt-text-wrong"),_=L,q='data-state="wrong"'):$==="locked"?(x.push("opt-card-locked"),v.push("opt-badge-default"),F&&E.push("opt-text-error")):(x.push("opt-card-default","opt-pressable"),v.push("opt-badge-default"),F&&E.push("opt-text-error"));const Q=(f.hint||"").trim(),P=b!=="none"&&Q?`<div class="opt-hint-clip${b==="open"?" is-open":""}"><div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${Z(f.key)}">${Z(Q)}</p></div></div>`:"";return`
          <div
            role="radio"
            tabindex="0"
            aria-checked="${O?"true":"false"}"
            ${q}
            class="${x.join(" ")}"
            data-testid="option-${Z(f.key)}"
            data-key="${Z(f.key)}"
            data-error="${F?"1":"0"}"
          >
            <span class="${v.join(" ")}">${Z(f.key)}</span>
            <div class="opt-body">
              <div class="opt-line">
                <span class="${E.join(" ")}">${Z(f.text)}</span>
                <span class="opt-status">${_}</span>
              </div>
              ${P}
            </div>
          </div>
        `}const d='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',p='<svg class="q-toggle-last-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';let h=0;function k(){var $;($=document.getElementById("pydrill-wrong-toast"))==null||$.remove();const f=document.createElement("div");f.id="pydrill-wrong-toast",f.className="wrong-toast",f.setAttribute("role","status"),f.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A2C597" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>已从错题本移出</span>',document.body.appendChild(f),window.setTimeout(()=>{f.remove()},1500)}function m(){const f=e.querySelector("#q-toggle-last");if(!f)return;const $=u.showLastTrace;f.setAttribute("aria-pressed",$?"true":"false");const O=f.querySelector("span");O&&(O.textContent=$?"隐藏上次":"看上次答错");const b=f.querySelector("svg");b&&(b.outerHTML=$?p:d)}function B(f,$,O,b){const F=($.hint||"").trim(),x=f.querySelector(".opt-body");if(!x)return;let v=f.querySelector(".opt-hint-clip");if(O&&F){v||(v=document.createElement("div"),v.className="opt-hint-clip",v.innerHTML=`<div class="opt-hint-inner"><p class="opt-hint" data-testid="option-hint-${Z($.key)}">${Z(F)}</p></div>`,x.appendChild(v));const E=v;requestAnimationFrame(()=>{requestAnimationFrame(()=>{b===h&&E.classList.add("is-open")})})}else if(v){v.classList.remove("is-open");const E=v,_=b,q=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.setTimeout(()=>{_===h&&E.remove()},q?0:200)}}function R(f){const $=++h,O=ye(i.id),b=(O==null?void 0:O.choice)??"",F=(i.answer||"").trim();e.querySelectorAll(".option-item").forEach(v=>{const E=v.getAttribute("data-key")||"",_=i.options.find(ie=>ie.key===E);if(!f){const ie=u.selectedChoice===E;n(v,ie?"selected":"idle",ie),_&&B(v,_,!1,$);return}const q=v.querySelector(".opt-badge"),Q=v.querySelector(".opt-text"),P=v.querySelector(".opt-status");if(!q||!Q||!P)return;const V=v.getAttribute("data-error")==="1",W=!!b&&E===b,ee=!!F&&E===F;v.classList.remove("opt-card-default","opt-card-selected","opt-card-correct","opt-card-wrong","opt-card-locked","opt-pressable","opt-card-trace-last","opt-card-trace-correct","opt-card-trace-dim"),q.classList.remove("opt-badge-default","opt-badge-selected","opt-badge-correct","opt-badge-wrong","opt-badge-trace-last","opt-badge-trace-correct"),Q.classList.remove("opt-text-strong","opt-text-wrong","opt-text-error","opt-text-trace-last","opt-text-trace-correct"),v.setAttribute("aria-checked","false"),v.removeAttribute("data-state"),W&&!ee?(v.classList.add("opt-card-trace-last"),q.classList.add("opt-badge-trace-last"),Q.classList.add("opt-text-strong","opt-text-trace-last")):ee?(v.classList.add("opt-card-trace-correct"),q.classList.add("opt-badge-trace-correct"),Q.classList.add("opt-text-strong","opt-text-trace-correct")):(v.classList.add("opt-card-default","opt-card-trace-dim"),q.classList.add("opt-badge-default"),V&&Q.classList.add("opt-text-error"));const ne=[];W&&ne.push(`<span class="opt-trace-tag opt-trace-tag-last" data-testid="last-tag-${Z(E)}">上次选的 ${Z(E)}</span>`),ee&&ne.push(`<span class="opt-trace-tag opt-trace-tag-correct" data-testid="correct-tag-${Z(E)}">正确答案 ${Z(E)}</span>`),P.innerHTML=ne.length?`<span class="opt-trace-tag-row">${ne.join("")}</span>`:"",_&&B(v,_,W||ee,$)});const x=e.querySelector("#q-submit-btn");if(x){const v=f||!u.selectedChoice;x.disabled=v,x.classList.toggle("btn-disabled",v)}}function K(){var Ye,Ke,Je,Xe,et,tt,nt,st,at,rt,ot,it;const f=++Y,$=ye(i.id),b=u.isRedoing||u.wrongFresh?void 0:$,F=!!b;F&&(u.showLastTrace=!1);const x=j&&F;j=!1;let v="#/topics";u.from==="daily"&&(v="#/"),u.from==="wrong"&&(v="#/wrong");let E="知识点练习";u.from==="daily"?E="今日一题":u.from==="wrong"&&(E="错题本");let _=null,q=null,Q=!1,P=!1,V=o.questions,W=y;if(u.from==="wrong"){const w=J();V=o.questions.filter(C=>{var T;return!!((T=w[C.id])!=null&&T.inWrongBook)}),W=V.findIndex(C=>C.id===i.id)}u.from==="daily"?(P=!0,Q=!0,V=[],W=0):W<0?(P=!0,Q=!0):(P=W===0,Q=W>=V.length-1,P||(_=V[W-1].id),Q||(q=V[W+1].id));const ee=W>=0?W+1:1,ne=u.from==="wrong"?Math.max(V.length,1):S,ie=u.from==="wrong"?`${o.name} · 错题 ${ee}/${ne}`:`${o.name} · 第 ${y+1}/${S} 题`;if(u.showEndCard){const w=u.from==="topic",C=J();let T="",I="",H="#/topics",z="返回知识点列表",se="",de="";if(w){let ce=0;for(const U of o.questions)((Ye=C[U.id])==null?void 0:Ye.result)==="correct"&&ce++;T="这个知识点做完了",I=`本组共 ${S} 题 · 你已做对 ${ce}/${S} 题`,H="#/topics",z="返回知识点列表",se=`
          <div class="end-questions-list">
            ${o.questions.map((U,te)=>{const be=te+1,N=C[U.id],we=(N==null?void 0:N.result)==="correct",Me=(N==null?void 0:N.result)==="wrong";let ge="end-chip-gray",he="· 未做";we?(ge="end-chip-green",he="✓ 答对"):Me&&(ge="end-chip-red",he="✗ 答错");const Be=U.code?U.code.split(`
`)[0].trim():U.stem;return`
              <a href="#/q/${U.id}?from=topic" class="end-q-row-item active-press">
                <div class="end-q-row-left">
                  <span class="end-q-idx">第 ${be} 题</span>
                  <span class="end-q-code">${Z(Be)}</span>
                </div>
                <span class="end-chip ${ge}">${he}</span>
              </a>
            `}).join("")}
          </div>
        `;const X=ue(s),me=X.findIndex(U=>U.name===o.name),ve=me!==-1&&me<X.length-1?X[me+1]:null;ve&&ve.questions.length>0&&(de=`
            <button
              type="button"
              class="btn-secondary w-full active-press end-next-topic-btn"
              id="end-next-topic-btn"
            >
              <span>下一个知识点 →</span>
            </button>
          `)}else{const ce=o.questions.filter(U=>{var te;return!!((te=C[U.id])!=null&&te.inWrongBook)}),pe=ce.length;T="错题本这一轮看完了",I=`好样的！这一轮看了 ${pe} 题，多练几遍思路更清晰。`,H="#/wrong",z="返回错题本",pe>0?se=`
            <div class="end-questions-list">
              ${ce.map((te,be)=>{const N=C[te.id],we=(N==null?void 0:N.result)==="correct",Me=(N==null?void 0:N.result)==="wrong";let ge="end-chip-gray",he="· 未做";we?(ge="end-chip-green",he="✓ 答对"):Me&&(ge="end-chip-red",he="✗ 答错");const Be=te.code?te.code.split(`
`)[0].trim():te.stem;return`
                <a href="#/q/${te.id}?from=wrong" class="end-q-row-item active-press">
                  <div class="end-q-row-left">
                    <span class="end-q-idx">错题 ${be+1}/${pe}</span>
                    <span class="end-q-code">${Z(Be)}</span>
                  </div>
                  <span class="end-chip ${ge}">${he}</span>
                </a>
              `}).join("")}
            </div>
          `:se=`
            <div class="end-empty-row">
              ${Ft(18)}
              <span>错题本已经清空了</span>
            </div>
          `;const X=ue(s),me=X.findIndex(U=>U.name===o.name);let ve=null;if(me!==-1)for(let U=1;U<X.length;U++){const be=X[(me+U)%X.length].questions.find(N=>{var we;return!!((we=C[N.id])!=null&&we.inWrongBook)});if(be){ve=be.id;break}}ve&&(de=`
            <a
              href="#/q/${ve}?from=wrong"
              class="btn-secondary w-full active-press end-next-topic-btn"
            >
              <span>下一个知识点</span>
            </a>
          `)}const ke=u.from==="wrong"?"错题本 · 完成":`${o.name} · 完成`;e.innerHTML=`
        <div class="page-wrapper page-question select-none" data-view-token="${D}">
          <header class="q-top-nav">
            <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
              ${lt()}
            </button>
            <span class="q-nav-title" data-testid="q-title">${ke}</span>
            <div class="w-9 h-9"></div>
          </header>

          <main class="q-main-content">
            <div class="card paper-card end-card" data-testid="end-card">
              <div class="end-mascot-wrap">
                <img src="${Le}" alt="小芽啾欢呼" class="end-mascot-img" />
              </div>
              <h2 class="end-title">${T}</h2>
              <p class="end-sub">${I}</p>

              ${se}

              <div class="end-action-wrap flex-col-gap">
                <button
                  type="button"
                  class="btn-primary w-full active-press"
                  data-testid="end-leave"
                  id="end-leave-btn"
                >
                  ${z}
                </button>
                ${de}
              </div>
            </div>
          </main>
        </div>
      `,(Ke=document.getElementById("q-back-btn"))==null||Ke.addEventListener("click",()=>{ae(v)}),(Je=document.getElementById("end-leave-btn"))==null||Je.addEventListener("click",()=>{ae(H)}),(Xe=document.getElementById("end-next-topic-btn"))==null||Xe.addEventListener("click",()=>{const ce=ue(s),pe=ce.findIndex(X=>X.name===o.name);if(pe!==-1&&pe<ce.length-1){const X=ce[pe+1];ae(`#/q/${X.questions[0].id}?from=topic`)}});return}const le=F?x?"pending":"graded":"answering",fe=le==="answering"?"none":le==="pending"?"closed":"open",Ae=le==="graded"?(b==null?void 0:b.choice)??null:u.selectedChoice,xe=i.options.map(w=>l(w,a(w.key,le,Ae,b),Ae===w.key,fe)).join("");let ze="";if(F&&b){let w=Le,C="答对了！";const T=vt(b.submittedAt);let I=`你选了 ${b.choice} · 正确答案 ${i.answer} · ${T} 提交`,H="banner-correct",z="",se="";b.result==="wrong"?(w=Oe,C="答错了",I=`你选了 ${b.choice} · 正确答案是 ${i.answer} · ${T} 提交`,H="banner-wrong",b.inWrongBook&&(z='<span class="result-tag-badge tag-wrong">已加入错题本</span>')):b.result==="correct"?b.inWrongBook&&u.from!=="wrong"?se=`
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
          `:u.justRemovedWrong&&u.from!=="wrong"&&(se=`
            <div class="banner-wrong-action-row">
              <span class="banner-wrong-removed-text">已移出错题本 ✓</span>
            </div>
          `):b.result==="ungraded"&&(w=Le,C="已提交（未判分）",I=`这题的答案还没编写 · ${T} 提交`,H="banner-ungraded"),ze=`
        <section class="result-banner ${H}" data-testid="result-banner" data-result="${b.result}">
          <div class="result-banner-inner">
            <div class="result-mascot-wrap">
              <img src="${w}" alt="小芽啾状态" class="result-mascot-img" />
            </div>
            <div class="result-text-wrap">
              <h2 class="result-title">${C}</h2>
              <p class="result-sub">${I}</p>
            </div>
            ${z?`<div class="result-tag-wrap">${z}</div>`:""}
          </div>
          ${se}
        </section>
      `}let Ve="";if(F&&b){const w=xn(i.explanation);Ve=`
        <section class="card paper-card explanation-card">
          <div class="explanation-header">
            <div class="explanation-title-group">
              <span class="bulb-icon-wrap">${Ct()}</span>
              <h3 class="explanation-title">解析</h3>
            </div>
          </div>
          <div class="explanation-body font-body" data-testid="explanation">
            ${w}
          </div>
        </section>
      `}let Ge="";i.animationId!=null&&F&&(Ge=`
        <div class="card paper-card animation-notice-card">
          <p class="text-xs text-sub">这道题的动画还没做好</p>
        </div>
      `);let Qe="";if(u.isRedoing&&u.from!=="wrong"){const w=ye(i.id);if(w){const C=w.result==="correct"?"答对":w.result==="wrong"?"答错":"已提交",T=vt(w.submittedAt);Qe=`
          <div class="redo-notice-bar select-none">
            <span>正在重做 · 上次：${C}（选 ${w.choice} · ${T}）· 提交前离开不会改变成绩</span>
          </div>
        `}}const Bt=u.from==="wrong"?V:o.questions,Ne=u.from!=="wrong"||F,Ht=Bt.map((w,C)=>{const T=C+1,I=w.id===i.id,H=ye(w.id),z=Ne&&(H==null?void 0:H.result)==="correct",se=Ne&&(H==null?void 0:H.result)==="wrong";let de="switcher-unanswered",ke=`<span>${T}</span>`;return z?(de="switcher-correct",ke=sn()):se&&(de="switcher-wrong",ke=an()),I&&(de+=" switcher-current"),`
          <button
            type="button"
            class="q-switch-pill ${de} active-press"
            data-testid="q-switch-${T}"
            data-qid="${w.id}"
            title="第 ${T} 题"
          >
            ${ke}
          </button>
        `}).join(""),It=F?`
        <button
          type="button"
          class="btn-redo-pill active-press"
          data-testid="redo"
          id="q-redo-btn"
        >
          ${on(14)}
          <span>重做</span>
        </button>
      `:"",Ze=`
      <button
        type="button"
        class="btn-nav-prev active-press ${P?"btn-disabled":""}"
        data-testid="prev"
        id="q-prev-btn"
        ${P?"disabled":""}
      >
        <span>‹ 上一题</span>
      </button>
    `,_t=`
      <button
        type="button"
        class="btn-nav-next active-press"
        data-testid="next"
        id="q-next-btn"
      >
        <span>下一题 ›</span>
      </button>
    `,Pt=`
      <button
        type="button"
        class="btn-next-main active-press"
        data-testid="next"
        id="q-next-btn"
      >
        <span>下一题 ›</span>
      </button>
    `;let Te="";if(F)Te=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${Ze}
            ${It}
            ${Pt}
          </div>
        </div>
      `;else{const w=!!u.selectedChoice;Te=`
        <div class="fixed-bottom-bar select-none">
          <div class="bottom-bar-inner flex-row-actions">
            ${Ze}
            <button
              type="button"
              class="btn-submit-main active-press ${w?"":"btn-disabled"}"
              data-testid="submit"
              id="q-submit-btn"
              ${w?"":"disabled"}
            >
              <span>${w?"提交答案":"提交"}</span>
            </button>
            ${_t}
          </div>
        </div>
      `}if(e.innerHTML=`
      <div class="page-wrapper page-question" data-view-token="${D}">
        <!-- 1. Top App Bar -->
        <header class="q-top-nav select-none">
          <button type="button" class="q-nav-btn active-press" id="q-back-btn" aria-label="返回">
            ${lt()}
          </button>
          <span class="q-nav-title" data-testid="q-title">${ie}</span>
          ${u.from==="wrong"?`<button type="button" class="q-remove-wrong active-press" data-testid="remove-wrong" id="q-remove-wrong-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"></path></svg>
                  <span>移出错题本</span>
                </button>`:'<div class="w-9 h-9"></div>'}
        </header>

        <!-- 2. Sub-Header: Source Badge & Topic Switcher -->
        <div class="q-subheader select-none">
          <div class="q-badge-cluster">
            <div class="q-source-badge" data-testid="q-source">
              <span class="status-dot-green"></span>
              <span>${E}</span>
            </div>
            ${u.from==="wrong"?`<button type="button" class="q-toggle-last" data-testid="toggle-last" id="q-toggle-last" aria-pressed="${u.showLastTrace?"true":"false"}" ${$&&!F?"":"disabled"}>
                    ${u.showLastTrace?p:d}
                    <span>${u.showLastTrace?"隐藏上次":"看上次答错"}</span>
                  </button>`:""}
          </div>
          <div class="q-switcher-group">
            <div class="q-switcher-track">
              ${Ht}
            </div>
          </div>
        </div>

        <main class="q-main-content">
          <!-- 3. Redo notice bar if currently in redo mode -->
          ${Qe}

          <!-- 4. Result Banner (if submitted) -->
          ${ze}

          <!-- 5. Stem Card -->
          <section class="card paper-card q-stem-card">
            <div class="q-stem-chip">
              <span class="status-dot-green"></span>
              <span>单选题</span>
            </div>
            <h1 class="q-stem-title">${i.stem}</h1>
          </section>

          <!-- 6. Code Block (if code exists) -->
          ${i.code?yn(i.code):""}

          <!-- 7. Options List -->
          <section class="options-group" role="radiogroup" aria-label="题目选项">
            ${xe}
          </section>

          <!-- 8. Explanation Card (if submitted) -->
          ${Ve}

          <!-- 9. Animation Notice (if animationId is set and submitted) -->
          ${Ge}
        </main>

        <!-- 10. Fixed Bottom Action Bar -->
        ${Te}
      </div>
    `,(et=document.getElementById("q-back-btn"))==null||et.addEventListener("click",()=>{ae(v)}),F)(st=document.getElementById("q-redo-btn"))==null||st.addEventListener("click",()=>{u.isRedoing=!0,u.selectedChoice=null,u.showLastTrace=!1,u.justRemovedWrong=!1,K()}),u.from!=="wrong"&&((at=document.getElementById("q-remove-wrong-btn"))==null||at.addEventListener("click",()=>{ct(i.id),u.justRemovedWrong=!0,K()}));else{const w=e.querySelectorAll(".option-item");w.forEach(C=>{C.addEventListener("click",()=>{if(u.showLastTrace)return;const T=C.getAttribute("data-key");if(!T||T===u.selectedChoice)return;u.selectedChoice=T,w.forEach(H=>{const z=H.getAttribute("data-key")===T;n(H,z?"selected":"idle",z)});const I=e.querySelector("#q-submit-btn");if(I){I.disabled=!1,I.classList.remove("btn-disabled");const H=I.querySelector("span");H&&(H.textContent="提交答案")}})}),(tt=document.getElementById("q-submit-btn"))==null||tt.addEventListener("click",()=>{!u.selectedChoice||u.showLastTrace||(Wt(i,u.selectedChoice),u.isRedoing=!1,u.wrongFresh=!1,u.showLastTrace=!1,u.justRemovedWrong=!1,j=!0,K())}),(nt=document.getElementById("q-toggle-last"))==null||nt.addEventListener("click",()=>{const C=e.querySelector("#q-toggle-last");!C||C.disabled||F||(u.showLastTrace=!u.showLastTrace,m(),R(u.showLastTrace))})}u.from==="wrong"&&((rt=document.getElementById("q-remove-wrong-btn"))==null||rt.addEventListener("click",()=>{const w=i.id;ct(w),k();const C=J(),T=o.questions.find(I=>{var H;return I.id===w||!((H=C[I.id])!=null&&H.inWrongBook)?!1:o.questions.findIndex(z=>z.id===I.id)>y});ae(T?`#/q/${T.id}?from=wrong`:"#/wrong")})),(ot=document.getElementById("q-prev-btn"))==null||ot.addEventListener("click",()=>{_&&ae(`#/q/${_}?from=${u.from}`)}),(it=document.getElementById("q-next-btn"))==null||it.addEventListener("click",()=>{q?ae(`#/q/${q}?from=${u.from}`):(u.showEndCard=!0,K())}),e.querySelectorAll(".q-switch-pill").forEach(w=>{w.addEventListener("click",()=>{const C=w.getAttribute("data-qid");C&&C!==i.id&&ae(`#/q/${C}?from=${u.from}`)})});const $e=e.querySelector(".q-switcher-group"),qe=e.querySelector(".switcher-current");if($e&&qe){const w=qe.getBoundingClientRect().left-$e.getBoundingClientRect().left,C=$e.scrollLeft+w-($e.clientWidth-qe.offsetWidth)/2;$e.scrollLeft=Math.max(0,C)}if(x&&b){const w=b;requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(f!==Y||!e.isConnected)return;const C=e.querySelector("[data-view-token]");!C||C.getAttribute("data-view-token")!==D||e.querySelectorAll(".option-item").forEach(T=>{var z;const I=T.getAttribute("data-key")||"",H=w.choice===I;n(T,a(I,"graded",w.choice,w),H),(z=T.querySelector(".opt-hint-clip"))==null||z.classList.add("is-open")})})})}}K()}const re=document.getElementById("app");let oe=[];function Ee(){const{path:e}=Se();e==="/"||e===""?re.innerHTML=Et(oe):e==="/topics"?re.innerHTML=St(oe):e==="/wrong"?re.innerHTML=Tt(oe):e==="/me"&&(re.innerHTML=qt(oe,Ee))}async function Mt(){var s;try{oe=await jt()}catch{re.innerHTML=`
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
    `,(s=document.getElementById("retry-load-btn"))==null||s.addEventListener("click",()=>{Mt()});return}Ce("/",()=>{re.innerHTML=Et(oe)}),Ce("/topics",()=>{re.innerHTML=St(oe)}),Ce("/wrong",()=>{re.innerHTML=Tt(oe)}),Ce("/me",()=>{re.innerHTML=qt(oe,Ee)}),Ce("/q/:id",(t,c)=>{const r=t.id,i=c.from||"topic";$n(re,oe,r,i)}),Dt(()=>{ae("#/")}),Ot(()=>{const{path:t}=Se();(t==="/"||t==="/topics"||t==="/wrong"||t==="/me")&&Ee()});const e=()=>{const{path:t}=Se();(t==="/"||t==="")&&Ee()};document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&e()}),window.addEventListener("focus",e),Rt()}Mt();
