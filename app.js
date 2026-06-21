/* ===================================================================
   MINH LY — acid portfolio · behaviour
   cursor · mobile menu · reveal · tilt · WebGL shader · i18n (EN/繁中)
   =================================================================== */

/* ───────────────────────── custom cursor ───────────────────────── */
(function(){
  if (matchMedia('(pointer:coarse)').matches) return;
  const cur=document.getElementById('cur'), dot=document.getElementById('curDot');
  let x=innerWidth/2,y=innerHeight/2,tx=x,ty=y;
  addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;dot.style.transform=`translate(${tx}px,${ty}px)`;});
  (function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cur.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(loop);})();
  document.querySelectorAll('[data-hot]').forEach(el=>{
    el.addEventListener('mouseenter',()=>cur.classList.add('is-hot'));
    el.addEventListener('mouseleave',()=>cur.classList.remove('is-hot'));
  });
})();

/* ───────────────────────── mobile menu ─────────────────────────── */
(function(){
  const btn=document.getElementById('menuBtn'), nav=document.getElementById('nav');
  btn.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
})();

/* ───────────────────────── reveal on scroll ────────────────────── */
(function(){
  const io=new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* ───────────────────────── card tilt / spotlight ───────────────── */
(function(){
  document.querySelectorAll('.tilt').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      card.style.setProperty('--mx',px*100+'%');
      card.style.setProperty('--my',py*100+'%');
      const rx=(.5-py)*8, ry=(px-.5)*8;
      card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
})();

/* ───────────────────── i18n · EN ⇄ 繁體中文 ─────────────────────── */
(function(){
  // English lives in the HTML (no-JS fallback); this is the 繁中 layer.
  const ZH = {
    "nav.summary":"簡介",
    "nav.skills":"技能",
    "nav.work":"作品",
    "nav.delivery":"交付",
    "nav.education":"學歷",
    "nav.blog":"部落格",
    "nav.home":"首頁",
    "nav.contact":"聯絡",
    "ui.menu":"選單",
    "ui.scroll":"向下捲動",

    "hero.kicker":"軟體工程師 · 系統設計 · AI 輔助開發",
    "hero.lede":"我打造軟體，刻意把它弄壞，再把殘骸記錄下來。把演算法、系統設計與<b>AI 輔助開發</b>，變成實際交付的專案、乾淨的 Git 紀錄，以及沒人害怕閱讀的文件。",
    "cta.work":"看作品 ↓",

    "head.summary":"誰在<span class=\"o\">敲鍵盤</span>",
    "head.skills":"工具<span class=\"o\">與武器</span>",
    "head.projects":"精選<span class=\"o\">作品</span>",
    "head.delivery":"我如何<span class=\"o\">交付</span>",
    "head.education":"學<span class=\"o\">歷</span>",
    "head.contact":"打聲<span class=\"o\">招呼</span>",

    "sum.p1":"你好，我是 <b>蘇明李</b>（To Minh Ly），一名軟體工程師。我把想法變成能運作、能交付的軟體：熟悉演算法、系統設計、資料庫與 AI 輔助開發，擁有真實的 GitHub 工作流程，以及讓人願意讀的文件。",
    "sum.p2":"我用優秀團隊的方式工作——Scrum 規劃、Jira backlog 與衝刺追蹤、Git 分支、Pull Request 與程式碼審查，並在動手前先做 SDD/BDD/TDD。我的執念：乾淨的技術寫作、像專業人士一樣整理的專案，以及能提升產出的 AI 工具——同時親手驗證每一個結果。",

    "tri.workflow.h":"工作流程",
    "tri.workflow.p":"Git、GitHub、分支、提交、Pull Request、合併流程、VS Code。",
    "tri.mgmt.h":"專案管理",
    "tri.mgmt.p":"Scrum、Jira、產品與衝刺 backlog、衝刺規劃、任務追蹤。",
    "tri.docs.h":"文件",
    "tri.docs.p":"Markdown 報告、PDF 匯出、SDD、BDD、TDD、技術寫作。",

    "st.flagship":"旗艦",
    "st.private":"私人",
    "st.public":"公開",
    "st.coursework":"課程作業",

    "proj.ai.desc":"一個在本機運行、由 AI 驅動的學習平台。管理員建立課程並上傳文件；學生與「懂課程」的助理對話、自動生成摘要與測驗、顯示答案、匯出 PDF 並查看歷史——全部透過本機 LLM（LM Studio）離線運行，資料不離開本機。",
    "proj.ai.f1":"針對上傳文件的課程對話——分塊檢索 → 作為本機模型的上下文",
    "proj.ai.f2":"多語言文件摘要：英文 · 越南文 · 繁體中文",
    "proj.ai.f3":"自動測驗生成，可點擊顯示答案 + 依文件／語言／題數的資料庫快取",
    "proj.ai.f4":"PDF 匯出、台灣時間的對話紀錄、MathJax 公式渲染",
    "proj.ai.f5":"管理後台，即時顯示課程／文件／測驗統計",
    "proj.ai.note":"本機建置 · FastAPI · Docker · LM Studio",

    "proj.line.desc":"串接 OpenAI API 的 LINE 聊天機器人，具備上下文記憶與用於對話紀錄的 RESTful 介面。重點：後端 API 設計、聊天機器人整合、AI 輔助互動。",
    "proj.line.note":"私人儲存庫——可應要求提供展示／程式碼審查",
    "proj.csv.desc":"以 CSV 為基礎的輕量迷你資料庫：將檔案解析進記憶體，並從主控台 REPL 執行類 SQL 查詢——以 WHERE 條件篩選並 SELECT 欄位。模擬 DBMS 的內部運作，不依賴任何外部引擎。",
    "proj.two.desc":"把經典的 Two Sum 做到位：O(n) 雜湊表解法，搭配 20 個測試案例（負數、零、重複、超大整數）、CMake 建置，以及在 Linux、macOS 與 Windows 上運行的 GitHub Actions CI。",
    "proj.imdb.desc":"IMDb 情感分類的機器學習基準，使用 BoW／TF-IDF 與邏輯迴歸——包含訓練、模型儲存與評估指標。",
    "proj.hotel.desc":"用於飯店營運的 MySQL 資料庫——訂房、付款、清潔、維護。包含結構設計、觸發器、預存程序、檢視表與示範腳本。",
    "proj.sfo.desc":"一個 Python 工具，依類型或規則自動分類並移動檔案——讓本機檔案管理不再一團亂。",
    "proj.cs351.desc":"CS351 的大本營——作業、專案文件、檔案整理與以 GitHub 為基礎的工作流程，並連結到 Project 0 與 Project B。",
    "proj.viewrepo":"查看儲存庫 <span class=\"arr\">→</span>",

    "del.1.h":"了解問題",
    "del.1.p":"釐清需求，拆成 user story 與 Jira backlog，估算工作量並先講好驗收標準——在寫任何一行程式之前。",
    "del.2.h":"先設計再寫程式——SDD · BDD",
    "del.2.p":"勾勒資料模型與架構，撰寫規格與行為情境，並先決定測試（TDD），讓目標清楚明確。",
    "del.3.h":"小步提交、互相審查",
    "del.3.p":"每個 issue 開一條分支，小步提交，開 Pull Request 並認真審查，讓 <b>main 永遠保持綠燈</b>。",
    "del.4.h":"自動化檢查——CI",
    "del.4.p":"單元測試搭配 GitHub Actions，每次推送都在 Linux、macOS 與 Windows 上執行；紅燈絕不合併。",
    "del.5.h":"交付與觀察",
    "del.5.p":"部署、在真實環境驗證、盯著 log，當現實與計畫不符時快速修正。",
    "del.6.h":"記錄與迭代",
    "del.6.p":"留下乾淨的 Markdown／PDF 文件，記錄已知問題，並把回饋直接帶進下一個衝刺。",

    "edu.1.h":"元智大學",
    "edu.1.meta":"學士 · 電腦科學",
    "edu.2.h":"Bach Khoa Aptech",
    "edu.2.meta":"大專 · 電腦科學",

    "lang.label":"語言",
    "l.vi.name":"越南文","l.vi.lvl":"母語",
    "l.zh.name":"中文","l.zh.lvl":"中高級",
    "l.en.name":"英文","l.en.lvl":"進階",

    "contact.portfolio":"作品集",

    "blog.kicker":"部落格 · 現場筆記",
    "blog.head":"現場<span class=\"o\">筆記</span>",
    "blog.course.meta":"CS351 反思 · AI 輔助軟體開發",
    "blog.course.title":"我從這門課學到了什麼",
    "blog.course.p1":"這門課改變了我對軟體開發的理解。以前我有時候只有大概想法就太快開始寫程式；現在我知道，一個好的專案需要清楚定義問題、整理任務、描述預期行為、測試、審查與文件。",
    "blog.course.callout.h":"核心收穫",
    "blog.course.callout.p":"AI 可以幫助我更快前進，但正確性仍然取決於人的責任感、仔細測試與清楚思考。",
    "blog.course.journey.h":"我的學習歷程",
    "blog.course.j1.h":"先規劃",
    "blog.course.j1.p":"我學會在寫程式前先定義問題、列出功能、把工作拆成小任務，並決定實作順序。",
    "blog.course.j2.h":"可見的流程",
    "blog.course.j2.p":"Jira、Git、GitHub 分支、commit 與 Pull Request 讓原本藏在腦中的進度，變成可以被檢查的證據。",
    "blog.course.j3.h":"測試思維",
    "blog.course.j3.p":"SDD、BDD 與 TDD 讓我學會把需求、使用者行為、測試案例與實作連在一起，而不是只在最後才測試。",
    "blog.course.j4.h":"負責任地使用 AI",
    "blog.course.j4.p":"AI 能協助解釋、除錯想法、整理結構與文件，但我仍然需要審查邏輯並驗證輸出。",
    "blog.course.projects.h":"展現進步的專案",
    "blog.course.project0.tag":"C++ · 測試 · CI",
    "blog.course.project0.h":"Project 0 - Two Sum",
    "blog.course.project0.p":"我用 O(n) 雜湊表解法練習演算法思維，並搭配 20 個測試案例、CMake 與 GitHub Actions 作為證據。",
    "blog.course.projectb.tag":"CSV · 查詢引擎",
    "blog.course.projectb.h":"Project B - CSV Mini Database",
    "blog.course.projectb.p":"我建立了一個以 CSV 為基礎的小型查詢系統，可以載入資料、存在記憶體中，並支援 SELECT 欄位與 WHERE 篩選。",
    "blog.course.repo.tag":"課程總覽",
    "blog.course.repo.h":"Course Repository",
    "blog.course.repo.p":"我把課程資料、專案連結、作業紀錄與學習證據整理在一個主要儲存庫中。",
    "blog.course.improved.h":"我進步的地方",
    "blog.course.i1":"我更懂得在實作前先規劃。",
    "blog.course.i2":"我學會把 Git 與 GitHub 當成進度紀錄，而不只是存放檔案的地方。",
    "blog.course.i3":"我練習寫出更清楚的技術文件與專案 README。",
    "blog.course.i4":"我學會測試正常案例、邊界案例與錯誤輸入，而不是只相信一次成功執行。",
    "blog.course.i5":"我學會把 AI 當成助手，但最後判斷仍然由自己負責。",
    "blog.course.future.h":"這如何幫助我未來學習",
    "blog.course.future.p":"在未來的專案中，我會從清楚需求開始，從一開始就使用 Git，更早建立測試，記錄設計決策，並在接受 AI 產生的內容前先驗證。這門課讓我理解軟體開發不只是產出程式碼，也包含溝通、證據、測試與責任。",
    "blog.course.t1":"CS351",
    "blog.course.t2":"AI 輔助開發",
    "blog.course.t3":"GitHub 工作流程",
    "blog.course.t4":"測試",
    "blog.post1.meta":"台北 Computex · 2026 年 6 月",
    "blog.post1.title":"在 Computex 的三天",
    "blog.post1.p1":"今年六月，我在台北南港展覽館待了三天逛 <b>Computex</b>。親自走過一個又一個展館，跟滑過產品發布稿是完全不同的體驗——你能真切感受到整個產業的規模。",
    "blog.s1.h":"展場現場",
    "blog.s1.p":"Source Team Taiwan、開放硬體攤位、一整面國旗牆，從開展到閉展都是人潮。我以軟體工程師的身份來，主要是好奇自己平常部署的東西，實際上是怎麼被造出來的。",
    "blog.s2.h":"NVIDIA 與這場 AI 淘金熱",
    "blog.s2.p":"NVIDIA 的攤位閃著螢光綠（很合我的調色盤）。其中一半是 Inception 計畫——Alsemy、N.LIGHT 之類的新創展示他們在這套技術堆疊上做出的東西。今年 AI 不只是個主題，而是整棟館。",
    "blog.s3.h":"機器的內部",
    "blog.s3.p":"我最喜歡的角落：ASRock Rack × NVIDIA 展出的 <b>RTX PRO Server</b>——「企業與工業級 AI 的終極通用資料中心平台」。他們把機殼打開，讓你看到一切：GPU 板、整片散熱片、走線與風扇牆。",
    "blog.s3.p2":"身為正在打造能在<b>本機</b>運行模型的離線 AI 工具的人，站在做著同一件事、但重量級版本的硬體前面，是這趟旅程的高光時刻。",
    "blog.s4.h":"InnoVEX：新創們",
    "blog.s4.p":"我在 InnoVEX 中央舞台聽了幾場 pitch。Algo Artis——DeNA 的分拆公司——談用最佳化演算法「優化社會基礎建設」，以及「以探索為導向的數位轉型」。很好的提醒：再炫的硬體，也是因為跑在上面的軟體才有意義。",
    "blog.s5.h":"我帶回了什麼",
    "blog.s5.p":"我帶著滿滿一本筆記、一支裝滿照片的手機，以及重新燃起想趕快動手做的衝動離開。和攤位上的工程師聊天——規格表與真正打造它的人之間那一小段距離——就值回整趟票價。",
    "blog.c.me":"在展場——身後是 ASRock Rack、Intel 與 Ampere。",
    "blog.c.nvidia":"NVIDIA 的 Inception 新創牆。",
    "blog.c.me2":"還是忍不住跟那面綠牆合照。",
    "blog.c.rtx":"ASRock Rack × NVIDIA RTX PRO Server。",
    "blog.c.rack1":"打開的機殼——GPU 板、散熱片，還有一大堆線。",
    "blog.c.rack2":"從插槽取出的加速器板。",
    "blog.c.gigabyte":"玻璃後的 Gigabyte 與 AMD 硬體。",
    "blog.c.startup1":"InnoVEX 中央舞台上的 Algo Artis。",
    "blog.c.startup2":"「以探索為導向的數位轉型」——這場 pitch。",
    "blog.t1":"Computex",
    "blog.t2":"硬體",
    "blog.t3":"端側 AI",
    "blog.t4":"台北",
    "blog.back":"返回作品集",

    "foot.big":"一起<br>打造",
    "foot.meta":"© 2026 蘇明李 · 以 HTML、WebGL、自製著色器與 GitHub Pages 打造 — <a href=\"https://github.com/WaterMinh\" target=\"_blank\" rel=\"noopener\" data-hot>WaterMinh</a>"
  };

  const els = document.querySelectorAll('[data-i18n]');
  const orig = new Map();
  els.forEach(el => orig.set(el, el.innerHTML));
  const btn = document.getElementById('langBtn');

  function apply(lang){
    els.forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (lang === 'zh') { if (ZH[k] != null) el.innerHTML = ZH[k]; }
      else { el.innerHTML = orig.get(el); }
    });
    document.documentElement.lang = (lang === 'zh') ? 'zh-Hant' : 'en';
    if (btn) btn.textContent = (lang === 'zh') ? 'EN' : '繁中';
    try { localStorage.setItem('lang', lang); } catch(e){}
  }

  let saved = 'en';
  try { saved = localStorage.getItem('lang') || 'en'; } catch(e){}
  apply(saved);

  if (btn) btn.addEventListener('click', () => {
    const cur = (document.documentElement.lang === 'zh-Hant') ? 'zh' : 'en';
    apply(cur === 'zh' ? 'en' : 'zh');
  });
})();

/* ───────────────────── WebGL psychedelic shader ────────────────── */
(function(){
  const cv=document.getElementById('gl');
  const gl=cv.getContext('webgl')||cv.getContext('experimental-webgl');
  if(!gl){ document.body.style.background='linear-gradient(135deg,#2a0030,#001a2a,#0a2a00)'; return; }

  const vs=`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;
  const fs=`
  precision highp float;
  uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
  uniform float u_scroll; uniform float u_vel;
  mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
  float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1,0)),c=hash(i+vec2(0,1)),d=hash(i+vec2(1,1));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<6;i++){v+=a*noise(p);p=rot(.5)*p*2.;a*=.5;}return v;}
  vec3 pal(float t){return .5+.5*cos(6.28318*(vec3(1.)*t+vec3(0.,.33,.67)));}
  float scenef(vec2 uv,float t,vec2 m){
    vec2 q=vec2(fbm(uv+t),fbm(uv+vec2(5.2,1.3)));
    vec2 r=vec2(fbm(uv+2.*q+vec2(1.7,9.2)+.15*t+m*.7),fbm(uv+2.*q+vec2(8.3,2.8)-.12*t));
    return fbm(uv+3.*r);
  }
  void main(){
    vec2 suv=(gl_FragCoord.xy-.5*u_res)/u_res.y;   // screen uv (for vignette)
    vec2 m=(u_mouse-.5*u_res)/u_res.y;
    float t=u_time*.06;
    float sc=u_scroll;
    vec2 uv=suv;
    uv*=1.0+.10*sin(t*1.3+sc*.45);                 // zoom pulses as we scroll
    uv+=vec2(.16*sc,-.22*sc);                      // fly diagonally through the field
    uv=rot(.05*sc)*uv;                             // slow barrel roll on scroll
    float f=scenef(uv,t,m);
    float ph=f+t*1.6+length(uv)*.04;
    float ca=.015+u_vel*.22;                       // chromatic fringe scales with scroll speed
    vec3 col=vec3(pal(ph+ca).r, pal(ph).g, pal(ph-ca).b);
    col=pow(col,vec3(.8));
    col=mix(col,vec3(1.,.0,.55),smoothstep(.62,.97,f));            // hot-magenta veins
    col=mix(col,vec3(.95,1.,.0),smoothstep(.16,.0,abs(f-.30))*.55); // acid-yellow streaks
    col=mix(col,vec3(.0,.92,1.),smoothstep(.16,.0,abs(f-.74))*.5);  // electric-cyan streaks
    col*=.58+.95*f;
    col=mix(col,col*vec3(1.25,1.05,1.35),u_vel*.7);                 // saturation pump while moving
    col*=1.-.5*dot(suv,suv);                                       // vignette
    gl_FragColor=vec4(col,1.);
  }`;

  function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o;}
  const prog=gl.createProgram();
  gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));
  gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
  gl.linkProgram(prog);gl.useProgram(prog);

  const buf=gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,buf);
  gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  const loc=gl.getAttribLocation(prog,'p');
  gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

  const uRes=gl.getUniformLocation(prog,'u_res');
  const uTime=gl.getUniformLocation(prog,'u_time');
  const uMouse=gl.getUniformLocation(prog,'u_mouse');
  const uScroll=gl.getUniformLocation(prog,'u_scroll');
  const uVel=gl.getUniformLocation(prog,'u_vel');

  let mx=innerWidth/2,my=innerHeight/2,smx=mx,smy=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=innerHeight-e.clientY;});
  addEventListener('touchmove',e=>{if(e.touches[0]){mx=e.touches[0].clientX;my=innerHeight-e.touches[0].clientY;}},{passive:true});

  let scY=window.scrollY||0, lastScY=scY, velS=0, velU=0;
  addEventListener('scroll',()=>{scY=window.scrollY;},{passive:true});
  const root=document.documentElement;

  const DPR=Math.min(devicePixelRatio||1,1.5);
  function resize(){
    cv.width=innerWidth*DPR;cv.height=innerHeight*DPR;
    cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';
    gl.viewport(0,0,cv.width,cv.height);
  }
  addEventListener('resize',resize);resize();

  const t0=performance.now();
  (function draw(now){
    smx+=(mx-smx)*.06;smy+=(my-smy)*.06;
    let dv=scY-lastScY; lastScY=scY;
    velS+=(dv-velS)*.15;                                   // smoothed signed scroll velocity
    velU+=(Math.min(Math.abs(velS)/46,1)-velU)*.12;        // 0..1 magnitude for the shader
    let skew=Math.max(-2.4,Math.min(2.4,velS*.06));        // content melt on fast scroll
    root.style.setProperty('--sk',skew.toFixed(3)+'deg');
    gl.uniform2f(uRes,cv.width,cv.height);
    gl.uniform1f(uTime,(now-t0)/1000);
    gl.uniform2f(uMouse,smx*DPR,smy*DPR);
    gl.uniform1f(uScroll,scY/innerHeight);
    gl.uniform1f(uVel,velU);
    gl.drawArrays(gl.TRIANGLES,0,3);
    requestAnimationFrame(draw);
  })(t0);
})();
