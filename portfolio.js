
// ============================================================
// app.js — 描画 + スマホ編集エンジン
//  - ドキュメントは「ページ」の集まり。1ページずつ表示。
//  - ?view を付けると閲覧専用（企業に見せる用）
//  - 追加/削除/差し替え すべてブラウザに自動保存
// ============================================================
(function () {
  const LS = { layout: 'eito-multipage-v1-layout', text: 'eito-multipage-v1-text', set: 'eito-multipage-v1-settings', page: 'eito-multipage-v1-page' };
  const FONTS = {
    zen:   { label: 'Zen角ゴ', family: "'Zen Kaku Gothic New', sans-serif", weight: 700, tracking: '-0.03em' },
    noto:  { label: 'Noto JP', family: "'Noto Sans JP', sans-serif", weight: 900, tracking: '-0.04em' },
    mplus: { label: 'M PLUS 1p', family: "'M PLUS 1p', sans-serif", weight: 800, tracking: '-0.03em' },
    zenl:  { label: 'Zen角 (細)', family: "'Zen Kaku Gothic New', sans-serif", weight: 500, tracking: '-0.01em' },
  };
  const ACCENTS = ['#8fb8e8', '#a8e0e6', '#c4b5f0', '#f0c4d2'];
  const DEFAULTS = { fontBase: 16, scaleH1: 3.2, scaleH2: 2.1, scaleH3: 1.28, leading: 1.85, contentMax: 1100, accent: '#8fb8e8', font: 'zen', snow: 1 };

  const viewOnly = !new URLSearchParams(location.search).has('edit');
  let layout, text, settings, cur = 0;
  let editing = false;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
  // 単体ファイル版では画像が ASSET_MAP の dataURL に置き換わる
  const src = u => (window.ASSET_MAP && window.ASSET_MAP[u]) || u;

  const FIXED_ROUTES = [
    {key:'home',label:'ホーム',group:'',ids:['cover','toc','profile','end']},
    {key:'nprtoonrenderer',label:'NPRToonRenderer',group:'個人制作',prefix:'npr-',image:'assets/exploration-forest.png',summary:'NPR / PBRの描画と、探索・撮影を支える専用エディター。',status:'開発中'},
    {key:'normal-tools',label:'Custom Normal Editing Tools',group:'個人制作',prefix:'cne-',image:'assets/cne-after.jpg',summary:'陰影を整えるBlender法線編集アドオン。実コードのクラス図を掲載。',status:'Blender / Python'},
    {key:'bloom-shift',label:'Bl∞m Shift',group:'チーム制作',prefix:'bloom-',image:'assets/bloom-anim.jpg',summary:'2Dワイヤーアクション。アニメーション実装、企画・仕様、進行管理を担当。',status:'11人 / DirectX 11'},
    {key:'neo-zip',label:'Neo Zip',group:'チーム制作',prefix:'neo-',image:'assets/neozip-title.png',summary:'Unityのマップツールと、データで組み立てるカットシーンシステム。',status:'10人 / Unity'},
    {key:'hitoriga',label:'ヒトリガ',group:'チーム制作',prefix:'hitoriga-',summary:'2026年9月から制作中。約10人のチームでグラフィックスを担当。',status:'制作中 / Unity'},
    {key:'ballistic',label:'Ballistic',group:'チーム制作',prefix:'balistick-',summary:'対戦アクション向けのトゥーンシェーダー、チーム識別と制作支援ツール。',status:'制作中 / Unity 6・URP'}
  ];
  let activeRoute = new URLSearchParams(location.search).get('work') || window.PORTFOLIO_ROUTE || 'home';
  function routeFor(p) {
    if(!p)return 'home';
    for(const r of FIXED_ROUTES)if(r.ids?.includes(p.id)||(r.prefix&&p.id.startsWith(r.prefix)))return r.key;
    return p.id==='team-works'?'home':p.id;
  }
  function routes() {
    const list=FIXED_ROUTES.filter(r=>r.key==='home'||layout.pages.some(p=>routeFor(p)===r.key));
    for(const p of layout.pages)if(p.id!=='team-works'&&!list.some(r=>r.key===routeFor(p)))list.push({key:p.id,label:p.label,group:'作品',status:'',summary:p.blocks.find(b=>b.type==='head')?.sub||''});
    return list;
  }
  function routeInfo(){return routes().find(r=>r.key===activeRoute)||FIXED_ROUTES[0];}
  function routeURL(key,section) {
    const fixed=FIXED_ROUTES.some(r=>r.key===key);
    const path=key==='home'?'./':fixed?'works/'+encodeURIComponent(key)+'/':'./?work='+encodeURIComponent(key);
    const url=new URL(path,document.baseURI);
    if(location.protocol==='file:'&&(key==='home'||fixed))url.pathname+='index.html';
    if(!viewOnly)url.searchParams.set('edit','');
    if(section)url.hash=section;
    return url.href;
  }
  function visiblePages(){return layout.pages.filter(p=>p.id!=='team-works'&&routeFor(p)===activeRoute);}
  function pageURL(index){const p=layout.pages[index];return routeURL(routeFor(p),p?.id);}
  function titleFor(route){return route.key==='home'?'富岡栄斗 — Technical Artist / Graphics Engineer':route.label+'｜富岡栄斗 ポートフォリオ';}
  function renderWorkIndex() {
    let html='<h1 class="h1">作品一覧・目次</h1><p class="index-lead">作品名をタップすると、それぞれの詳細ページへ移動します。</p>';
    for(const group of ['個人制作','チーム制作','作品']) {
      const works=routes().filter(r=>r.group===group);if(!works.length)continue;
      html+='<h2 class="nav-group">'+esc(group)+'</h2><div class="work-index-grid">';
      html+=works.map((r,i)=>{
        let hero=r.image;
        if(!hero){const section=layout.pages.find(p=>routeFor(p)===r.key);hero=section?.blocks.find(b=>b.type==='img')?.img;}
        return '<a class="work-entry" href="'+esc(routeURL(r.key))+'">'+
          '<div class="work-entry-image">'+(hero?'<img src="'+esc(src(hero))+'" alt="'+esc(r.label)+'" loading="lazy" decoding="async">':'<span>'+esc(r.label)+'</span>')+'</div>'+
          '<div class="work-entry-copy"><span class="work-status">'+esc(r.status||group)+'</span><h3>'+esc(r.label)+' <span aria-hidden="true">↗</span></h3><p>'+esc(r.summary)+'</p><span class="work-open">詳細を見る <span aria-hidden="true">→</span></span></div></a>';
      }).join('');html+='</div>';
    }return html;
  }
  function renderRouteNav() {
    if(activeRoute==='home')return '';
    const r=routeInfo(),sections=visiblePages();
    return '<nav class="detail-nav" aria-label="この作品の目次"><a class="back-home" href="'+esc(routeURL('home','toc'))+'">← 作品一覧に戻る</a><div class="detail-links">'+sections.map((p,i)=>'<a href="'+esc(pageURL(layout.pages.indexOf(p)))+'" data-section="'+layout.pages.indexOf(p)+'">'+esc(i===0?'概要':p.label.replace(/^(NPRToonRenderer|CNE|Bl∞m Shift|Neo Zip)\s*[—｜]\s*/,''))+'</a>').join('')+'</div></nav>';
  }
  function renderRouteFooter() {
    if(activeRoute==='home')return '';
    const list=routes(),index=list.findIndex(r=>r.key===activeRoute),next=list[index+1];
    return '<nav class="route-footer" aria-label="作品の移動"><a class="btn" href="'+esc(routeURL('home','toc'))+'">← 作品一覧</a>'+(next?'<a class="btn" href="'+esc(routeURL(next.key))+'">次の作品：'+esc(next.label)+' →</a>':'<a class="btn" href="'+esc(routeURL('home','end'))+'">連絡先 →</a>')+'</nav>';
  }
  function migrateMultiPage() {
    if(layout.multiPageVersion===1)return;
    const published=window.PUBLISHED_DATA.layout;
    const replaceIDs=new Set(published.pages.filter(p=>p.id.startsWith('npr-')||p.id==='cne-3'||p.id==='cne-4').map(p=>p.id));
    const clearText=b=>{for(const k of Object.keys(text))if(k.startsWith(b.uid+'.'))delete text[k];if(b.items)b.items.forEach(clearText);};
    layout.pages.filter(p=>replaceIDs.has(p.id)).forEach(p=>p.blocks.forEach(clearText));
    layout.pages=layout.pages.map(p=>replaceIDs.has(p.id)?deep(published.pages.find(q=>q.id===p.id)):p);
    layout.multiPageVersion=1;
  }


  // ---------- 保存・読み込み ----------
  function deep(o) { return JSON.parse(JSON.stringify(o)); }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { hint('保存容量がいっぱいです'); } }
  function read(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }


  function portfolioGroup(page) {
    if (/^(bloom-|neo-|team-|hitoriga-|balistick-)/.test(page.id)) return 'チーム制作';
    if (/^(npr-|cne-)/.test(page.id)) return '個人制作';
    return '';
  }
  function organizeTeamWorks() {
    if (layout.teamGroupingVersion === 1) return;
    const works = layout.pages.filter(p => /^(bloom-|neo-)/.test(p.id));
    if (works.length && !layout.pages.some(p => p.id === 'team-works')) {
      layout.pages = layout.pages.filter(p => !/^(bloom-|neo-)/.test(p.id));
      const end = layout.pages.findIndex(p => p.id === 'end');
      layout.pages.splice(end < 0 ? layout.pages.length : end, 0, {"id": "team-works", "uid": "p-team-works", "label": "チーム制作", "blocks": [{"type": "h1", "uid": "b-team-title", "k": "チーム制作"}, {"type": "p", "uid": "b-team-lead", "p": "複数人で制作したゲームと、その中で担当した実装・制作支援を紹介します。"}, {"type": "cols", "uid": "b-team-cards", "r": "1 1", "items": [{"t": "worklink", "uid": "b-team-bloom", "target": "bloom-1", "k": "Bl∞m Shift", "img": "assets/bloom-anim.jpg", "fit": "contain", "p": "11人で制作した2Dワイヤーアクション。アニメーション実装、企画・仕様、プロジェクト管理を担当しました。"}, {"t": "worklink", "uid": "b-team-neo", "target": "neo-1", "k": "Neo Zip", "img": "assets/neozip-play.jpg", "fit": "contain", "p": "10人で制作する2Dアクションゲーム。Unityでのマップツールとカットシーンシステムなど、演出・ツール制作を担当しています。"}]}]}, ...works);
    }
    layout.teamGroupingVersion = 1;
  }

  function addAutumnTeamWorks() {
    if (layout.teamAutumn2026Version === 1) return;
    const additions = [{"id": "hitoriga-1", "uid": "p-hitoriga", "label": "ヒトリガ｜制作中", "blocks": [{"type": "head", "uid": "b-hitoriga-head", "k": "ヒトリガ", "sub": "制作中｜2026年9月からUnityで開発している、約10人規模のチーム制作作品です。グラフィックス周りを担当しています。"}, {"type": "specs", "uid": "b-hitoriga-specs", "rows": [["開発環境", "Unity"], ["開発期間", "2026年9月〜（制作中）"], ["開発人数", "約10人"], ["担当箇所", "グラフィックス周り"]]}, {"type": "img", "uid": "b-hitoriga-main", "img": "", "fit": "contain", "placeholder": "制作中 · 画像準備中", "cap": "開発中の実行画面"}, {"type": "note", "uid": "b-hitoriga-role", "k": "担当内容", "p": "チーム内でグラフィックス周りの制作を担当しています。"}, {"type": "h1", "uid": "b-hitoriga-gallery-title", "k": "制作ギャラリー"}, {"type": "figs", "uid": "b-hitoriga-gallery", "cols": 2, "items": [{"uid": "b-hitoriga-detail-1", "img": "", "fit": "contain", "placeholder": "画像準備中", "cap": "制作画面・表現の詳細"}, {"uid": "b-hitoriga-detail-2", "img": "", "fit": "contain", "placeholder": "画像準備中", "cap": "制作画面・表現の詳細"}]}]}, {"id": "balistick-1", "uid": "p-balistick", "label": "Balistick｜制作中", "blocks": [{"type": "head", "uid": "b-balistick-head", "k": "Balistick", "sub": "制作中｜2026年9月からUnityで開発している、約10人規模のチーム制作作品です。グラフィックス周りを担当しています。"}, {"type": "specs", "uid": "b-balistick-specs", "rows": [["開発環境", "Unity"], ["開発期間", "2026年9月〜（制作中）"], ["開発人数", "約10人"], ["担当箇所", "グラフィックス周り"]]}, {"type": "img", "uid": "b-balistick-main", "img": "", "fit": "contain", "placeholder": "制作中 · 画像準備中", "cap": "開発中の実行画面"}, {"type": "note", "uid": "b-balistick-role", "k": "担当内容", "p": "チーム内でグラフィックス周りの制作を担当しています。"}, {"type": "h1", "uid": "b-balistick-gallery-title", "k": "制作ギャラリー"}, {"type": "figs", "uid": "b-balistick-gallery", "cols": 2, "items": [{"uid": "b-balistick-detail-1", "img": "", "fit": "contain", "placeholder": "画像準備中", "cap": "制作画面・表現の詳細"}, {"uid": "b-balistick-detail-2", "img": "", "fit": "contain", "placeholder": "画像準備中", "cap": "制作画面・表現の詳細"}]}]}];
    additions.forEach(page => {
      if (layout.pages.some(p => p.id === page.id)) return;
      const end = layout.pages.findIndex(p => p.id === 'end');
      layout.pages.splice(end < 0 ? layout.pages.length : end, 0, page);
    });
    const team = layout.pages.find(p => p.id === 'team-works');
    if (team && !team.blocks.some(b => b.uid === 'b-team-autumn-cards')) {
      team.blocks.push({type:'cols', uid:'b-team-autumn-cards', r:'1 1', items:[{"t": "worklink", "uid": "b-hitoriga-card", "target": "hitoriga-1", "imageTarget": "b-hitoriga-main", "k": "ヒトリガ", "p": "制作中｜Unity / 2026年9月〜 / 約10人。グラフィックス周りを担当しています。"}, {"t": "worklink", "uid": "b-balistick-card", "target": "balistick-1", "imageTarget": "b-balistick-main", "k": "Balistick", "p": "制作中｜Unity / 2026年9月〜 / 約10人。グラフィックス周りを担当しています。"}]});
    }
    layout.teamAutumn2026Version = 1;
  }

  function addNprEditorScreenshot() {
    if (layout.nprEditorScreenshotVersion === 1) return;
    const page = layout.pages.find(p => p.id === 'npr-4');
    if (!page) return;
    if (!page.blocks.some(b => b.uid === 'b-npr-editor-screenshot')) {
      const tags = page.blocks.findIndex(b => b.type === 'tags');
      page.blocks.splice(tags >= 0 ? tags + 1 : 1, 0, {
        type: 'img', uid: 'b-npr-editor-screenshot',
        img: 'assets/npr-editor-workspace.png', fit: 'contain',
        cap: '専用エディタの実行画面｜シーン表示・アニメ調ライティングの調整・GPU描画時間とメモリ使用量の確認'
      });
    }
    layout.nprEditorScreenshotVersion = 1;
  }

  function updateTeamRolePresentation() {
    if (layout.teamRolePresentationVersion === 1) return;
    const roles = {"bloom-1": "アニメーション実装、企画・仕様書作成、プロジェクト管理、Git管理を担当しました。進行・タスク管理を行いながら、イラストをゲーム内のアニメーションとして実装しました。", "neo-1": "演出・ツール開発を担当しています。Unity Editor拡張によるマップツールと、ScriptableObjectを利用したカットシーンシステムを制作しています。"};
    layout.pages.forEach(page => {
      if (!roles[page.id]) return;
      page.blocks = page.blocks.map(block => (block.type === 'team' || block.t === 'team')
        ? {type: 'note', uid: block.uid, k: '担当分野・制作内容', p: roles[page.id]}
        : block);
      // Existing text edits keyed to the old member heading must not restore it.
      page.blocks.filter(block => block.k === '担当分野・制作内容').forEach(block => {
        delete text[block.uid + '.k'];
      });
      if (page.id === 'neo-1') {
        const head = page.blocks.find(block => block.type === 'head');
        if (head) head.logo = 'assets/neozip-title.png';
      }
    });
    layout.teamRolePresentationVersion = 1;
    save(LS.text, text);
  }

  function addBallisticShaderWork() {
    if (layout.ballisticShaderVersion === 1) return;
    const page = layout.pages.find(p => p.id === 'balistick-1');
    if (!page) return;
    page.label = 'Ballistic｜制作中';
    const head = page.blocks.find(b => b.type === 'head');
    if (head) {
      head.k = 'Ballistic'; head.sub = "制作中｜約10人規模で開発する対戦アクションゲーム。グラフィックスを担当し、Unity 6 / URP向けのキャラクター用トゥーンシェーダーと、演出・設定を支えるC#・エディタ拡張を制作しています。";
      delete text[head.uid + '.k']; delete text[head.uid + '.sub'];
    }
    const specs = page.blocks.find(b => b.type === 'specs');
    if (specs) specs.rows = specs.rows.map(row => row[0] === '開発環境' ? [row[0], 'Unity 6 / URP'] : row[0] === '担当箇所' ? [row[0], 'グラフィックス／トゥーンシェーダー・ツール開発'] : row);
    if (specs) { delete text[specs.uid + '.開発環境']; delete text[specs.uid + '.担当箇所']; }
    const role = page.blocks.find(b => b.uid === 'b-balistick-role');
    if (role) {
      role.k = '開発したもの｜キャラクター用トゥーンシェーダー'; role.p = "「アニメ調の絵づくり」と「敵味方がひと目でわかること」の両立を目標に、キャラクター用トゥーンシェーダーを開発しました。1ファイル4パス（ForwardLit / Outline / ShadowCaster / DepthOnly）で構成し、エディタ拡張とゲーム側のC#も含めて実装しています。";
      delete text[role.uid + '.k']; delete text[role.uid + '.p'];
    }
    const additions = [{"type": "tags", "uid": "b-ballistic-tech", "k": "技術構成", "chips": ["Unity 6 / URP", "HLSL / ShaderLab", "C#", "4パス構成", "ShaderGUI", "MaterialPropertyBlock"]}, {"type": "h1", "uid": "b-ballistic-shader-features", "k": "トゥーンシェーダーで工夫した点"}, {"type": "p", "uid": "b-ballistic-feature-1", "k": "材質ごとのランプ", "p": "ランプテクスチャの行をShading IDに対応させ、1枚のテクスチャで肌・布・金属などに異なる陰影を付けられるようにしました。影の色を紫寄りに調整し、アニメ調の印象を作っています。"}, {"type": "p", "uid": "b-ballistic-feature-2", "k": "黒くならない落ち影", "p": "落ち影の中の明るさに下限を設け、影に入ってもキャラクターの色が残るようにしました。環境光は真上向きで取得し、セル画らしい平坦さを出しています。"}, {"type": "p", "uid": "b-ballistic-feature-3", "k": "顔の影", "p": "顔の法線を球状に置き換え、鼻や目のまわりにまだらな影が出るのを抑えました。当初はUVで顔の範囲を判定していましたが、AI生成テクスチャではUVが散らばっていたため、「頭からの距離＋正面方向」による判定へ切り替えました。"}, {"type": "p", "uid": "b-ballistic-feature-4", "k": "アウトライン", "p": "線の太さを画面のピクセル幅で指定し、解像度が変わっても安定するようにしました。角で線が割れないよう、取り込み時にスムーズ法線をUV2へ焼き込みます。Tangentは法線マップ用に確保し、線の色はベースカラーの明度を下げて作っています。"}, {"type": "p", "uid": "b-ballistic-feature-5", "k": "チームハイライト", "p": "見るプレイヤーを基準に、敵は赤、味方はターコイズの縁取りで識別できるようにしました。オンラインでチーム情報の確定が遅れた場合も、確定した時点で表示を更新します。値はMaterialPropertyBlockで渡し、ほかのスクリプトの設定と干渉しないようにしています。"}, {"type": "p", "uid": "b-ballistic-feature-6", "k": "ポストエフェクト", "p": "Bloomを控えめに調整し、設定画面からオン・オフできるようにしました。古いセーブデータとの互換性も維持しています。トーンマップにはNeutralを採用し、チーム識別に使う赤の色味がずれるのを抑えました。"}, {"type": "p", "uid": "b-ballistic-feature-7", "k": "制作を支えるツール", "p": "日本語で項目を出し分けるカスタムShaderGUIと、設定画面を自動で生成するエディタ拡張を制作しました。シェーダーの調整からゲーム内の設定反映までを扱える構成にしています。"}];
    const gallery = page.blocks.findIndex(b => b.uid === 'b-balistick-gallery-title');
    page.blocks.splice(gallery >= 0 ? gallery : page.blocks.length, 0, ...additions);
    walkBlocks(b => {
      if (b.uid !== 'b-balistick-card') return;
      b.k = 'Ballistic'; b.p = '制作中｜Unity 6 / URP / 約10人。キャラクター用トゥーンシェーダー、チーム識別ハイライト、制作支援ツールなど、グラフィックス周りを担当しています。';
      delete text[b.uid + '.k']; delete text[b.uid + '.p'];
    });
    layout.ballisticShaderVersion = 1;
    save(LS.text, text);
  }

  function initData() {
    const published=window.PUBLISHED_DATA;
    const legacyLayout=!viewOnly?read('eito-npr20261028-layout',null):null;
    layout=deep(viewOnly?published.layout:(read(LS.layout,null)||legacyLayout||published.layout));
    text=deep(viewOnly?published.text:(read(LS.text,null)||(legacyLayout?read('eito-npr20261028-text',{}):published.text)));
    settings=Object.assign({},DEFAULTS,viewOnly?published.set:(read(LS.set,null)||published.set));
    migrateMultiPage();
    let seq=layout.seq||1;
    walkBlocks(b=>{if(!b.uid)b.uid='b'+(seq++);});layout.seq=seq;
    if(!viewOnly){save(LS.layout,layout);save(LS.text,text);}
    if(!routes().some(r=>r.key===activeRoute))activeRoute='home';
  }

  function walkBlocks(fn) {
    layout.pages.forEach(p => p.blocks.forEach(b => {
      fn(b, p);
      if (b.items) b.items.forEach(it => { fn(it, p); if (it.items) it.items.forEach(x => fn(x, p)); });
    }));
  }

  // ---------- 設定 ----------
  function applySettings() {
    const s = settings, r = document.documentElement.style;
    r.setProperty('--font-base', s.fontBase + 'px');
    r.setProperty('--scale-h1', s.scaleH1);
    r.setProperty('--scale-h2', s.scaleH2);
    r.setProperty('--scale-h3', s.scaleH3);
    r.setProperty('--leading', s.leading);
    r.setProperty('--content-max', s.contentMax + 'px');
    r.setProperty('--accent', s.accent);
    r.setProperty('--accent-soft', s.accent + '26');
    const f = FONTS[s.font] || FONTS.zen;
    r.setProperty('--font-display', f.family);
    r.setProperty('--display-weight', f.weight);
    r.setProperty('--display-tracking', f.tracking);
    if (window.setSnowDensity) window.setSnowDensity(s.snow); else window.__snowDensity = s.snow;
  }

  // ---------- 描画 ----------
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function T(uid, field, value, tag, cls) {
    const key = uid + '.' + field;
    const v = text[key] != null ? text[key] : value;
    const c = cls ? ' class="' + cls + '"' : '';
    return '<' + tag + c + ' data-k="' + key + '">' + esc(v).replace(/\n/g, '<br>') + '</' + tag + '>';
  }
  // Reserve original image dimensions before lazy loading to keep navigation stable.
  const assetSizes = {"assets/npr-editor-workspace.png": [1919, 1079], "assets/bloom-anim.jpg": [1920, 1080], "assets/bloom-gantt.jpg": [1272, 276], "assets/bloom-logo.jpg": [2214, 2235], "assets/bloom-spec.jpg": [1411, 609], "assets/cne-after.jpg": [1576, 849], "assets/cne-average.jpg": [1269, 720], "assets/cne-before.jpg": [1568, 872], "assets/cne-face-back.jpg": [1560, 685], "assets/cne-face-front.jpg": [1572, 753], "assets/cne-files.jpg": [992, 586], "assets/cne-unity.jpg": [769, 429], "assets/neozip-chara.png": [587, 448], "assets/neozip-cutscene.jpg": [842, 610], "assets/neozip-maptool.jpg": [661, 602], "assets/neozip-play.jpg": [1577, 885], "assets/npr-feature.jpg": [506, 286], "assets/npr-feature2.jpg": [532, 292], "assets/npr-imgui.jpg": [434, 839], "assets/npr-main.jpg": [548, 308], "assets/npr-outline.jpg": [532, 298], "assets/npr-shadow-off.jpg": [305, 165], "assets/npr-shadow-on.jpg": [303, 169], "assets/portrait.png": [1250, 1668], "assets/profile-group.jpg": [3840, 2160], "assets/neozip-player-original.png": [512, 512], "assets/neozip-companion-original.png": [510, 825], "assets/exploration-forest.png": [1280, 720], "assets/exploration-coast.png": [1280, 720], "assets/exploration-meadow.png": [1280, 720], "assets/exploration-highlands.png": [1280, 720], "assets/exploration-cape.png": [1280, 720], "assets/exploration-snow.png": [1280, 720]};
  function IMG(b, cls) {
    const size = assetSizes[b.img];
    const dims = size ? ' width="' + size[0] + '" height="' + size[1] + '"' : '';
    const containSize = size && b.fit === 'contain'
      ? ' style="width:' + size[0] + 'px;max-width:100%;height:auto;aspect-ratio:' + size[0] + '/' + size[1] + '"' : '';
    const inner = b.img
      ? '<img src="' + esc(src(b.img)) + '" alt="' + esc(b.cap || b.k || '作品の画像') + '"' + dims + containSize + '>'
      : '';
    return '<div class="is ' + (b.img ? (((b.fit === 'contain') ? 'contain' : 'cover')) : 'empty') + ' ' + (cls || '') +
      '" data-img="' + b.uid + '"' + (b.placeholder ? ' data-placeholder="' + esc(b.placeholder) + '"' : '') + (b.bg && b.bg !== 'none' ? ' style="background:' + b.bg + '"' : '') + '>' + inner + '</div>';
  }
  function FIG(b, cls) {
    return '<figure>' + IMG(b, cls) + (b.cap !== undefined ? '<figcaption>' + T(b.uid, 'cap', b.cap, 'span') + '</figcaption>' : '') + '</figure>';
  }

  function renderBlock(b, page) {
    const type = b.type || b.t;   // cols 内は t キー
    switch (type) {
      case 'cover': return '';      // 表紙本体は次の 'u' ブロックが描画する
      case 'u': {
        const p = page;
        return '<div class="cover-layout">' +
          '<div>' +
            '<div class="cover-eyebrow">' + T(p.uid, 'eyebrow', b.eyebrow, 'span') + '</div>' +
            '<div class="cover-k">' + T(p.uid, 'k', b.k, 'span') + '</div>' +
            '<div class="cover-lead">' + T(p.uid, 'lead', b.lead, 'span') + '</div>' +
            '<div class="cover-name">' +
              '<span class="ja">' + T(p.uid, 'name', b.name, 'span') + '</span>' +
              '<span class="en">' + T(p.uid, 'en', b.en, 'span') + '</span>' +
            '</div>' +
            '<div class="cover-school">' + T(p.uid, 'school', b.school, 'span') + '</div>' +
            '<div class="cover-cta">' +
              '<a class="btn primary" data-go-next="1">' + T(p.uid, 'cta1', b.cta1, 'span') + ' ↓</a>' +
              '<a class="btn" data-go-last="1">' + T(p.uid, 'cta2', b.cta2, 'span') + '</a>' +
            '</div>' +
          '</div>' +
          (b.img ? '<div class="cover-visual">' + IMG(b) + '</div>' : '') +
          '</div>';
      }
      case 'toc': return renderWorkIndex();
      case 'worklink': {
        const target = layout.pages.findIndex(p => p.id === b.target);
        let imageBlock = b;
        if (b.imageTarget) walkBlocks(it => { if (it.uid === b.imageTarget) imageBlock = it; });
        return '<article class="work-card">' + IMG(imageBlock, 'r169') +
          T(b.uid, 'k', b.k, 'h3') + T(b.uid, 'p', b.p, 'p') +
          (target >= 0 ? '<button class="btn" data-go-page="' + target + '">' + esc(b.k) + 'を見る →</button>' : '') + '</article>';
      }
      case 'head': {
        return '<div class="hd"><div class="hd-top"><div>' +
          '<div class="hd-kicker">' + portfolioGroup(page) + ' · Work ' + workNo(page) + '</div>' +
          T(b.uid, 'k', b.k, page===visiblePages()[0]?'h1':'h2', 'hd-title') +
          '</div>' + (b.logo ? '<div class="hd-logo"><img src="' + src(b.logo) + '" alt=""></div>' : '') +
          '</div>' + (b.sub ? T(b.uid, 'sub', b.sub, 'p', 'hd-sub') : '') + '</div>';
      }
      case 'specs':
        return '<div class="specs">' + (b.rows || []).map(r =>
          '<div><span class="k">' + esc(r[0]) + '</span><span class="v">' + T(b.uid, esc(r[0]), r[1], 'span') + '</span></div>').join('') + '</div>';
      case 'h1': return '<div class="h1">' + T(b.uid, 'k', b.k, 'span') + '</div>';
      case 'p': return (b.k ? T(b.uid, 'k', b.k, 'div', 'p-title') : '') + T(b.uid, 'p', b.p, 'p');
      case 'note': return '<div class="note">' + T(b.uid, 'k', b.k, 'div', 'p-title') + T(b.uid, 'p', b.p, 'p') + '</div>';
      case 'tags': return (b.k ? T(b.uid, 'k', b.k, 'div', 'p-title') : '') + '<div class="tags">' + (b.chips || []).map((c, i) =>
        '<span class="chip">' + T(b.uid, 'c' + i, c, 'span') + '</span>').join('') + '</div>';
      case 'flow': return '<div>' + T(b.uid, 'k', b.k, 'div', 'p-title') + '<div class="flow v">' +
        (b.steps || []).map((s, i) => T(b.uid, 's' + i, s, 'span') + (i < b.steps.length - 1 ? '<i>↓</i>' : '')).join('') + '</div></div>';
      case 'layers': return '<div class="layers">' + (b.steps || []).map((s, i) =>
        '<div class="layer"><b>' + T(b.uid, 'n' + i, s[0], 'span') + '</b><small>' + T(b.uid, 'd' + i, s[1], 'span') + '</small></div>' +
        (i < b.steps.length - 1 ? '<div style="text-align:center;color:var(--accent)">↓</div>' : '')).join('') + '</div>';
      case 'spec': return '<dl class="spec-dl">' + (b.rows || []).map(r =>
        '<dt>' + esc(r[0]) + '</dt><dd>' + T(b.uid, 'd' + r[0], r[1], 'span') + '</dd>').join('') + '</dl>';
      case 'team': return (b.k ? T(b.uid, 'k', b.k, 'div', 'p-title') : '') + '<div class="team">' + (b.rows || []).map((r, i) =>
        '<div class="team-row"><span class="nm">' + T(b.uid, 'nm' + i, r[0], 'span') + '</span><span class="rl">' + T(b.uid, 'rl' + i, r[1], 'span') + '</span></div>').join('') + '</div>';
      case 'figs': return '<div class="figs c' + (b.cols || 1) + '">' + (b.items || []).map(it => FIG(it)).join('') + '</div>';
      case 'cols': return '<div class="cols" style="grid-template-columns:' + String(b.r || '1 1').trim().split(/\s+/).map(v => /^\d*\.?\d+$/.test(v) ? 'minmax(0,' + v + 'fr)' : v).join(' ') + '">' +
        (b.items || []).map(it => '<div>' + renderBlock(it, page) + '</div>').join('') + '</div>';
      case 'img': return FIG(b, b.ratio ? '' : '');
      case 'diagram': return '<figure class="class-diagram"><div class="diagram-scroll" role="region" aria-label="拡大して読めるクラス図" tabindex="0"><img src="'+esc(src(b.img))+'" alt="Normal Toolsのクラス図。MYNT_PT_mainと5つのOperator、共通編集関数、normal_logicモジュールの関係" loading="lazy"></div><figcaption>'+esc(b.cap)+'</figcaption><div class="diagram-actions"><a class="btn" href="'+esc(src(b.img))+'" target="_blank" rel="noopener">図を大きく開く ↗</a><a class="btn" href="'+esc(src(b.source))+'" download>Mermaidソース</a></div></figure>';
      case 'end': {
        const p = page;
        return '<div>' +
          '<div class="h1">' + T(p.uid, 'k', '連絡先', 'span') + '</div>' +
          '<div class="end-catch">' + T(p.uid, 'catch', b.catch || '一緒に、\nいい絵を作りましょう。', 'span') + '</div>' +
          '<p style="max-width:560px">' + T(p.uid, 'body', b.body || 'インターン・選考・作品についてのご質問など、お気軽にご連絡ください。', 'span') + '</p>' +
          '<a class="end-mail" href="mailto:eito.tomioka.42728@gmail.com">' + T(p.uid, 'mail', 'eito.tomioka.42728@gmail.com', 'span') + '</a>' +
          '<div class="cover-cta" style="margin-top:0;display:flex;gap:12px;flex-wrap:wrap">' +
            '<a class="btn" href="https://drive.google.com/drive/folders/1ns9dEZLfNeuqj9HKDLNTw5gzvBcohHa0" target="_blank" rel="noopener">' + T(p.uid, 'drive', '作品データ（Google Drive）', 'span') + ' ↗</a>' +
            '<a class="btn" href="https://github.com/Leeeito" target="_blank" rel="noopener">' + T(p.uid, 'gh', 'GitHub', 'span') + ' ↗</a>' +
          '</div>' +
          '<div class="blk-hint" style="margin-top:40px;font-family:var(--font-mono);font-size:.7rem;color:var(--text-mute)">' + T(p.uid, 'foot', '© 2026 Eito Tomioka — HAL Tokyo Game Dept.', 'span') + '</div>' +
          '</div>';
      }
      default: return '';
    }
  }
  function workNo(page) {
    const works = layout.pages.filter(x => x.blocks.some(b => b.type === 'head'));
    const n = works.indexOf(page);
    return String((n < 0 ? works.length : n) + 1).padStart(2, '0');
  }

  function render() {
    const doc=$('.doc'),r=routeInfo();document.title=titleFor(r);
    doc.innerHTML=renderRouteNav()+visiblePages().map(p=>{
      const i=layout.pages.indexOf(p);
      return '<section class="page" id="'+esc(p.id)+'" data-page="'+i+'" aria-label="'+esc(p.label)+'">'+
        (p.id==='cover'?'':'<div class="pg-tag">'+esc(p.label)+'</div>')+
        '<div class="page-inner">'+p.blocks.map(b=>'<div class="blk-wrap" data-bi="'+esc(b.uid)+'">'+
          (editing&&p.blocks.length>1?'<button class="blk-del" data-delblk="'+esc(b.uid)+'">このブロックを削除</button>':'')+
          '<div class="blk">'+renderBlock(b,p)+'</div></div>').join('')+'</div></section>';
    }).join('')+renderRouteFooter();
    $$('[data-go-page]',doc).forEach(el=>el.addEventListener('click',()=>goto(+el.dataset.goPage)));
    $$('[data-section]',doc).forEach(el=>el.addEventListener('click',e=>{e.preventDefault();goto(+el.dataset.section);}));
    $$('[data-go-next]',doc).forEach(el=>{el.href=routeURL('home','toc');el.addEventListener('click',e=>{e.preventDefault();goto(layout.pages.findIndex(p=>p.id==='toc'));});});
    $$('[data-go-last]',doc).forEach(el=>{el.href=routeURL('home','end');el.addEventListener('click',e=>{e.preventDefault();goto(layout.pages.findIndex(p=>p.id==='end'));});});
    $$('.cover-visual .is',doc).forEach(s=>s.classList.add('contain'));
    $$('img',doc).forEach(im=>{im.loading='lazy';im.decoding='async';});
    const hero=$('.cover-visual img',doc)||$('.page img',doc);if(hero){hero.loading='eager';hero.fetchPriority='high';}
    if(editing)setEditable(true);observePages();applyEditState();buildDrawer();updateBars();
  }
  let io;

  function observePages() {
    if (io) io.disconnect();
    const pages = $$('.page');
    if (!('IntersectionObserver' in window)) { pages.forEach(p => p.classList.add('in')); return; }
    io = new IntersectionObserver(es => es.forEach(en => {
      if (en.isIntersecting) en.target.classList.add('in');
    }), { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
    pages.forEach(p => io.observe(p));

    // どのページを見ているか（ツールバーの表示用）
    if (window.__pageIO) window.__pageIO.disconnect();
    window.__pageIO = new IntersectionObserver(es => {
      let best = null;
      es.forEach(en => { if (en.isIntersecting && (!best || en.intersectionRatio > best.intersectionRatio)) best = en; });
      if (best) { cur = +best.target.getAttribute('data-page'); save(LS.page, cur); updateBars(); }
    }, { threshold: [.25, .5, .75] });
    pages.forEach(p => window.__pageIO.observe(p));
  }

  // ---------- 移動・追跡 ----------
  function goto(i) {
    i=Math.min(Math.max(0,i),layout.pages.length-1);const p=layout.pages[i];
    if(routeFor(p)!==activeRoute){location.href=pageURL(i);return;}
    const el=document.getElementById(p.id);if(!el)return;
    cur=i;el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    history.replaceState(null,'',pageURL(i));updateBars();
  }

  function setupProgress() {
    const bar = document.createElement('div'); bar.className = 'progress';
    document.body.appendChild(bar);
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(1, window.scrollY / h) * 100 : 0) + '%';
    };
    f(); window.addEventListener('scroll', f, { passive: true });
    window.addEventListener('resize', f);
  }
  function updateBars() {
    const list=routes(),index=list.findIndex(r=>r.key===activeRoute);
    $$('.pg-cur').forEach(el=>el.textContent=String(index+1));
    $$('.pg-total').forEach(el=>el.textContent=list.length);
    $$('.pg-name').forEach(el=>el.textContent=routeInfo().label);
    $$('[data-nav="prev"]').forEach(b=>b.disabled=index<=0);
    $$('[data-nav="next"]').forEach(b=>b.disabled=index===list.length-1);
  }

  function setEditable(on) {
    $$('[data-k]').forEach(el => {
      if (on) el.setAttribute('contenteditable', 'true');
      else el.removeAttribute('contenteditable');
    });
  }
  // body の editing クラスと contenteditable を必ず同期させる
  function applyEditState() {
    setEditable(document.body.classList.contains('editing'));
  }
  document.addEventListener('input', e => {
    const el = e.target.closest && e.target.closest('[data-k]');
    if (!el || !editing) return;
    text[el.getAttribute('data-k')] = el.innerText;
    save(LS.text, text);
  }, true);

  // ---------- 画像 ----------
  let fileTarget = null;
  const picker = document.createElement('input');
  picker.type = 'file'; picker.accept = 'image/*'; picker.style.display = 'none';
  document.body.appendChild(picker);
  picker.addEventListener('change', () => { if (fileTarget && picker.files[0]) useFile(fileTarget, picker.files[0]); picker.value = ''; });

  function useFile(uid, file) {
    const fr = new FileReader();
    fr.onload = () => shrink(fr.result, 1800, .86).then(d => {
      walkBlocks(b => { if (b.uid === uid) b.img = d; });
      save(LS.layout, layout); render(); hint('画像を差し替えました');
    });
    fr.readAsDataURL(file);
  }
  function shrink(src, max, q) {
    return new Promise(res => {
      const im = new Image();
      im.onload = () => {
        const k = Math.min(max / im.width, max / im.height, 1);
        const c = document.createElement('canvas');
        c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', q));
      };
      im.onerror = () => res(src); im.src = src;
    });
  }
  document.addEventListener('click', e => {
    const slot = e.target.closest && e.target.closest('.is');
    if (slot) {
      const uid = slot.getAttribute('data-img');
      if (editing) { e.preventDefault(); e.stopPropagation(); fileTarget = uid; picker.click(); }
      else { const im = slot.querySelector('img'); if (im) lightbox(im.src); }
      return;
    }
    const del = e.target.closest && e.target.closest('[data-delblk]');
    if (del && editing) {
      const uid = del.getAttribute('data-delblk');
      layout.pages[cur].blocks = layout.pages[cur].blocks.filter(b => b.uid !== uid);
      save(LS.layout, layout); render(); hint('削除しました');
    }
  });
  document.addEventListener('dragover', e => { if (editing && e.target.closest && e.target.closest('.is')) e.preventDefault(); });
  document.addEventListener('drop', e => {
    const slot = e.target.closest && e.target.closest('.is');
    if (!slot || !editing) return;
    e.preventDefault(); useFile(slot.getAttribute('data-img'), e.dataTransfer.files[0]);
  }, true);

  let lb;
  function lightbox(src) {
    if (!lb) { lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = '<img alt="">'; lb.addEventListener('click', () => lb.classList.remove('open')); document.body.appendChild(lb); }
    lb.querySelector('img').src = src; lb.classList.add('open');
  }

  // ---------- パネル（ボトムシート） ----------
  let sheet;
  function buildSheet() {
    sheet = document.createElement('div');
    sheet.className = 'sheet';
    const row = (k, l, min, max, st) => '<div class="row"><label>' + l + '<span class="val" data-v="' + k + '"></span></label><input type="range" data-s="' + k + '" min="' + min + '" max="' + max + '" step="' + st + '"></div>';
    sheet.innerHTML =
      '<div class="sheet-grip" data-close></div>' +
      '<p class="sh-title">編集</p><p class="sh-sub">文字はタップして書き換え。「差し替え」をタップで画像変更。この端末のブラウザーに保存されます。公開サイトへの反映はZIPを書き出してGitHubへアップロードしてください。</p>' +
      '<h4>このページ</h4><div class="grid2">' +
        '<button class="act" data-act="add-text">テキスト追加</button>' +
        '<button class="act" data-act="add-img">画像追加</button>' +
        '<button class="act" data-act="add-note">囲み枠追加</button>' +
        '<button class="act" data-act="add-key">見出し追加</button>' +
      '</div>' +
      '<div class="grid2" style="margin-top:8px">' +
        '<button class="act" data-act="add-work">＋ 新しい作品ページ</button>' +
        '<button class="act" data-act="del-page">このページを削除</button>' +
      '</div>' +
      '<h4>見出しのフォント</h4><div class="grid4">' +
        Object.keys(FONTS).map(k => '<button class="choice" data-font="' + k + '">' + FONTS[k].label + '</button>').join('') +
      '</div>' +
      '<h4>文字</h4>' +
      row('fontBase', '本文の大きさ', 13, 21, 1) + row('scaleH1', 'キャッチコピー', 2.2, 6, .1) +
      row('scaleH2', '見出し', 1.5, 4, .1) + row('scaleH3', '小見出し', 1, 2.2, .05) + row('leading', '行間', 1.4, 2.3, .05) +
      '<h4>レイアウト・演出</h4>' + row('contentMax', '横幅 (px)', 720, 1440, 20) + row('snow', '雪の量', 0, 3, .1) +
      '<h4>アクセント色</h4><div class="grid4">' +
        ACCENTS.map(c => '<button class="choice" data-accent="' + c + '"><i style="background:' + c + '"></i></button>').join('') + '</div>' +
      '<h4>保存・公開</h4><div class="grid2">' +
        '<button class="act" data-act="export">公開用ZIP</button>' +
        '<button class="act" data-act="backup">バックアップ保存</button>' +
        '<button class="act" data-act="restore">バックアップ読込</button>' +
        '<button class="act" data-act="reset-s">表示を初期化</button>' +
        '<button class="act danger" data-act="reset-c" style="grid-column:1/-1">内容を全部初期化</button>' +
      '</div>' +
      '<div style="height:8px"></div>';
    document.body.appendChild(sheet);

    function refresh() {
      $$('[data-s]', sheet).forEach(i => i.value = settings[i.getAttribute('data-s')]);
      $$('[data-v]', sheet).forEach(v => v.textContent = settings[v.getAttribute('data-v')]);
      $$('[data-font]', sheet).forEach(b => b.classList.toggle('active', b.getAttribute('data-font') === settings.font));
      $$('[data-accent]', sheet).forEach(b => b.classList.toggle('active', b.getAttribute('data-accent') === settings.accent));
    }
    sheet.addEventListener('input', e => {
      const k = e.target.getAttribute && e.target.getAttribute('data-s'); if (!k) return;
      settings[k] = parseFloat(e.target.value); applySettings(); save(LS.set, settings); refresh();
    });
    sheet.addEventListener('click', e => {
      if (e.target.closest('[data-close]')) return closeSheet();
      const b = e.target.closest('button'); if (!b) return;
      const f = b.getAttribute('data-font'), a = b.getAttribute('data-accent'), act = b.getAttribute('data-act');
      if (f) { settings.font = f; applySettings(); save(LS.set, settings); return refresh(); }
      if (a) { settings.accent = a; applySettings(); save(LS.set, settings); return refresh(); }
      if (!act) return;
      if (act === 'add-text') addBlock({ type: 'p', k: null, p: '新しい文章。タップして書き換えてください。' });
      if (act === 'add-img') addBlock({ type: 'figs', cols: 1, items: [{ t: 'img', img: '', fit: 'cover', cap: 'キャプション' }] });
      if (act === 'add-note') addBlock({ type: 'note', k: '小見出し', p: 'ここに補足を書きます。' });
      if (act === 'add-key') addBlock({ type: 'h1', k: '見出し' });
      if (act === 'add-work') addWork();
      if (act === 'del-page') delPage();
      if (act === 'export') return exportSite();
      if (act === 'backup') return download('portfolio-backup.json', JSON.stringify({ v: 3, layout, text, settings, set: settings }), 'application/json');
      if (act === 'restore') return restore();
      if (act === 'reset-s') { settings = Object.assign({}, DEFAULTS); applySettings(); save(LS.set, settings); return refresh(); }
      if (act === 'reset-c') {
        if (confirm('追加した作品や書き換えた内容をすべて元に戻します。よろしいですか？')) {
          [LS.layout, LS.text, LS.set, LS.page].forEach(k => localStorage.removeItem(k));
          location.reload();
        }
      }
    });
    refresh();
    return refresh;
  }
  let sheetRefresh;
  function openSheet() { sheet.classList.add('open'); if (sheetRefresh) sheetRefresh(); }
  function closeSheet() { sheet.classList.remove('open'); }

  function addBlock(b) {
    let seq = layout.seq || 1;
    const assign=b=>{b.uid='b'+(++seq);if(b.items)b.items.forEach(assign);};assign(b);layout.seq=seq;
    layout.pages[cur].blocks.push(b);
    save(LS.layout, layout); render(); hint('追加しました');
  }
  function addWork() {
    const name = prompt('作品の名前を入れてください', '新しい作品');
    if (!name) return;
    const seq = layout.seq = (layout.seq || 1) + 10;
    const uid = k => 'b' + (seq + k);
    // 目次ページの直後に差し込む
    const tocIdx = layout.pages.findIndex(p => p.id === 'toc');
    const page = {
      id: 'w' + Date.now(), label: name,
      blocks: [
        { type: 'head', uid: uid(1), k: name, sub: '作品の概要をここに書きます。' },
        { type: 'specs', uid: uid(2), rows: [['開発環境', '—'], ['開発期間', '—'], ['開発人数', '1人'], ['担当箇所', 'すべて']] },
        { type: 'figs', uid: uid(3), cols: 1, items: [{ t: 'img', uid: uid(4), img: '', fit: 'cover', cap: '画像をタップして差し替え' }] },
        { type: 'p', uid: uid(5), k: '作品概要', p: 'ここに内容を書きます。' }
      ]
    };
    layout.pages.splice(tocIdx + 1, 0, page);
    layout.seq = seq + 10;
    save(LS.layout, layout);
    location.href=routeURL(page.id);
    hint('作品ページを追加しました');
  }
  function delPage() {
    if (layout.pages.length <= 1) return;
    if (!confirm('「' + layout.pages[cur].label + '」を削除します。よろしいですか？')) return;
    layout.pages.splice(cur, 1);
    save(LS.layout, layout);
    cur = Math.max(0, cur - 1);
    save(LS.page, cur);
    if(!visiblePages().length)location.href=routeURL('home');else {cur=layout.pages.indexOf(visiblePages()[0]);render();goto(cur);}
  }

  // ---------- 入出力 ----------
  function download(name, data, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([data], { type }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 600);
  }
  function restore() {
    const i = document.createElement('input'); i.type = 'file'; i.accept = '.json,application/json';
    i.onchange = () => {
      const fr = new FileReader();
      fr.onload = () => {
        try {
          const d = JSON.parse(fr.result);
          if (!d.layout) throw 0;
          save(LS.layout, d.layout); save(LS.text, d.text || {});
          save(LS.set, Object.assign({}, DEFAULTS, d.settings || d.set || {}));
          location.reload();
        } catch (e) { alert('読み込めませんでした'); }
      };
      fr.readAsText(i.files[0]);
    };
    i.click();
  }
  // Store-mode ZIP: no external service/library; all pages share the same edited data.
  function zipBytes(entries) {
    const encoder=new TextEncoder(),parts=[],central=[];let offset=0;
    const table=new Uint32Array(256);
    for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;table[n]=c>>>0;}
    const crc=data=>{let c=0xffffffff;for(const v of data)c=table[(c^v)&255]^(c>>>8);return(c^0xffffffff)>>>0;};
    for(const [path,raw] of entries){
      const name=encoder.encode(path),data=typeof raw==='string'?encoder.encode(raw):raw,checksum=crc(data);
      const local=new Uint8Array(30+name.length),v=new DataView(local.buffer);
      v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint32(14,checksum,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,name.length,true);local.set(name,30);
      const dir=new Uint8Array(46+name.length),d=new DataView(dir.buffer);
      d.setUint32(0,0x02014b50,true);d.setUint16(4,20,true);d.setUint16(6,20,true);d.setUint16(8,0x800,true);d.setUint32(16,checksum,true);d.setUint32(20,data.length,true);d.setUint32(24,data.length,true);d.setUint16(28,name.length,true);d.setUint32(42,offset,true);dir.set(name,46);
      parts.push(local,data);central.push(dir);offset+=local.length+data.length;
    }
    const centralSize=central.reduce((n,b)=>n+b.length,0),end=new Uint8Array(22),e=new DataView(end.buffer);
    e.setUint32(0,0x06054b50,true);e.setUint16(8,entries.length,true);e.setUint16(10,entries.length,true);e.setUint32(12,centralSize,true);e.setUint32(16,offset,true);
    return new Blob([...parts,...central,end],{type:'application/zip'});
  }
  async function exportSite() {
    hint('全ページのZIPを書き出しています…');
    try {
      const manifest=await(await fetch(new URL('publish-manifest.json',document.baseURI))).json();
      const templateResponse=await fetch(new URL('site-template.html',document.baseURI));if(!templateResponse.ok)throw Error('template');
      const template=await templateResponse.text(),entries=[];
      // Sequential reads keep peak memory lower on mobile.
      for(const file of manifest.files) {
        if(file==='portfolio-data.js')continue;
        const response=await fetch(new URL(file,document.baseURI));if(!response.ok)throw Error(file);
        entries.push([file,new Uint8Array(await response.arrayBuffer())]);
      }
      const data={layout,text,set:settings};
      entries.push(['portfolio-data.js','window.PUBLISHED_DATA='+JSON.stringify(data).replace(/</g,'\\u003c')+';\n']);
      for(const r of routes()) {
        const html=template.replaceAll('__BASE__',r.key==='home'?'./':'../../').replaceAll('__TITLE__',esc(titleFor(r)))
          .replaceAll('__DESCRIPTION__',esc(r.summary||'富岡栄斗の作品・プロフィール・連絡先'))
          .replaceAll('__ROUTE_JSON__',JSON.stringify(r.key).replace(/</g,'\\u003c'));
        entries.push([r.key==='home'?'index.html':'works/'+r.key+'/index.html',html]);
      }
      const blob=zipBytes(entries);download('eito-portfolio-pages.zip',blob,'application/zip');
      hint('公開用ZIPを保存しました。解凍した中身をGitHubへ反映できます');
    } catch(error){hint('書き出せませんでした。通信を確認するか、バックアップ保存をお使いください');console.error('Portfolio export failed',error);}
  }


  // ---------- ドロワー（ページ一覧） ----------
  let drawer;
  function buildDrawer() {
    if(!drawer){drawer=document.createElement('div');drawer.className='drawer';drawer.addEventListener('click',e=>{if(e.target===drawer)drawer.classList.remove('open');});document.body.appendChild(drawer);}
    drawer.innerHTML='<div class="drawer-inner" role="dialog" aria-label="作品一覧"><button class="drawer-close btn">閉じる ×</button><p class="sh-title">作品一覧</p>'+routes().map(r=>'<a class="drawer-row'+(r.key===activeRoute?' cur':'')+'" href="'+esc(routeURL(r.key))+'"><span class="n">'+(r.group==='チーム制作'?'TEAM':r.group==='個人制作'?'SOLO':'TOP')+'</span><span class="l">'+esc(r.label)+'</span><span>→</span></a>').join('')+'</div>';
    $('.drawer-close',drawer).addEventListener('click',()=>drawer.classList.remove('open'));
  }

  function buildBars() {
    const wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="toolbar viewbar">' +
        '<button class="tb-btn icon" data-nav="prev" aria-label="前の作品ページ">←</button>' +
        '<button class="tb-btn icon" data-nav="next" aria-label="次の作品ページ">→</button>' +
        '<span class="pg-label"><b class="pg-cur">1</b>/<span class="pg-total">1</span> · <span class="pg-name"></span></span>' +
        '<span class="tb-spacer"></span>' +
        '<button class="tb-btn" data-open="list">一覧</button>' +
        (viewOnly ? '' : '<button class="tb-btn" data-act="edit">編集</button>') +
      '</div>' +
      '<div class="toolbar editbar">' +
        '<button class="tb-btn icon" data-nav="prev" aria-label="前の作品ページ">←</button>' +
        '<button class="tb-btn icon" data-nav="next" aria-label="次の作品ページ">→</button>' +
        '<span class="pg-label"><b class="pg-cur">1</b>/<span class="pg-total">1</span></span>' +
        '<span class="tb-spacer"></span>' +
        '<button class="tb-btn" data-open="list">一覧</button>' +
        '<button class="tb-btn" data-act="sheet">＋ 追加・設定</button>' +
        '<button class="tb-btn" data-act="done">完了</button>' +
      '</div>' +
      '<div class="hint"></div>';
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);

    document.addEventListener('click', e => {
      const t = e.target.closest('button'); if (!t) return;
      const nav = t.getAttribute('data-nav');
      if(nav==='prev'||nav==='next'){const list=routes(),i=list.findIndex(r=>r.key===activeRoute),target=list[i+(nav==='prev'?-1:1)];if(target)location.href=routeURL(target.key);return;}
      if (t.getAttribute('data-open') === 'list') return drawer.classList.toggle('open');
      const a = t.getAttribute('data-act');
      if (a === 'edit') { editing = true; document.body.classList.add('editing'); render(); applyEditState(); hint('編集モード：タップで書き換え'); }
      if (a === 'done') { editing = false; document.body.classList.remove('editing'); closeSheet(); render(); applyEditState(); hint('編集を終了しました'); }
      if (a === 'sheet') { openSheet(); }
    });
  }

  let ht;
  function hint(t) {
    const h = $('.hint'); if (!h) return;
    h.textContent = t; h.classList.add('show');
    clearTimeout(ht); ht = setTimeout(() => h.classList.remove('show'), 1900);
  }

  // 横スワイプはスクロール体験を壊すので使わない
  function setupSwipe() {}

  // ---------- 起動 ----------
  function init() {
    initData();
    applySettings();
    buildBars();
    sheetRefresh = buildSheet();
    setupSwipe();
    cur=layout.pages.indexOf(visiblePages()[0]);if(cur<0)cur=0;
    render();setupProgress();
    document.querySelectorAll('[data-site-home]').forEach(a=>a.href=routeURL('home'));
    document.querySelectorAll('[data-home-section]').forEach(a=>a.href=routeURL('home',a.dataset.homeSection));
    document.querySelector('.skip-link').href=location.pathname+location.search+'#main';
    const anchor=decodeURIComponent(location.hash.slice(1));
    if(anchor)requestAnimationFrame(()=>document.getElementById(anchor)?.scrollIntoView());
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){drawer?.classList.remove('open');lb?.classList.remove('open');closeSheet();}});
    if (window.setSnowDensity) window.setSnowDensity(settings.snow);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
