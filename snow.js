
// 静かに舞う雪 — 控えめ、低密度
(function () {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1;
  let flakes = [];
  let densityMul = (window.__snowDensity != null) ? window.__snowDensity : 1;
  window.setSnowDensity = function (m) { densityMul = m; initFlakes(); };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    initFlakes();
  }

  function initFlakes() {
    // 密度控えめ: 画面広さに応じて調整
    const density = Math.round(Math.max(28, Math.floor((W * H) / 26000)) * densityMul);
    flakes = [];
    for (let i = 0; i < density; i++) {
      flakes.push(makeFlake(true));
    }
  }

  function makeFlake(initial) {
    const r = Math.random();
    return {
      x: Math.random() * W,
      y: initial ? Math.random() * H : -10,
      r: 0.4 + r * 1.6,          // radius
      vy: 0.15 + r * 0.5,        // fall speed
      vx: (Math.random() - 0.5) * 0.15,
      drift: Math.random() * Math.PI * 2,
      driftSpeed: 0.002 + Math.random() * 0.005,
      alpha: 0.25 + r * 0.55,
    };
  }

  let last = performance.now();
  function tick(now) {
    const dt = Math.min(now - last, 50);
    last = now;
    ctx.clearRect(0, 0, W, H);

    for (const f of flakes) {
      f.drift += f.driftSpeed * dt;
      f.x += (f.vx + Math.sin(f.drift) * 0.2) * (dt / 16);
      f.y += f.vy * (dt / 16);

      if (f.y - f.r > H) {
        Object.assign(f, makeFlake(false));
        f.x = Math.random() * W;
      }
      if (f.x < -10) f.x = W + 10;
      if (f.x > W + 10) f.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(220, 232, 250, ${f.alpha})`;
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(tick);
})();
