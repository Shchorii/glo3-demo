/* ===========================================================
   GLO — Intro morph: scroll choreography
   "Geo. Local. Owned." → "gl•" brand mark
   GSAP ScrollTrigger with scrub for smooth scroll-tied animation.
   =========================================================== */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (!document.getElementById('intro')) return;

  // Respect reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Initial states — brand mark hidden + centered (we manage its transform via GSAP)
  gsap.set('.intro-final', { xPercent: -50, yPercent: -50, scale: 0.7, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#intro',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.8,
    },
  });

  // 0–22%: trailing letters fade with slight slide right (staggered)
  tl.to('.iw[data-i="0"] .ir', { opacity: 0, x: 12, duration: 0.22 }, 0);
  tl.to('.iw[data-i="1"] .ir', { opacity: 0, x: 12, duration: 0.22 }, 0.04);
  tl.to('.iw[data-i="2"] .ir', { opacity: 0, x: 12, duration: 0.22 }, 0.08);

  // 0–15%: scroll hint fades
  tl.to('.intro-scroll', { opacity: 0, duration: 0.15 }, 0);

  // 30–55%: G/L/O tighten letterSpacing (focus moment)
  tl.to('.iw', { letterSpacing: '-0.08em', duration: 0.25 }, 0.30);

  // 50–72%: stack fades + scales down toward center
  tl.to('.intro-words', { opacity: 0, scale: 0.4, duration: 0.22 }, 0.50);

  // 45–80%: background photos recede (still visible, but quieter)
  tl.to('.intro-bg', { opacity: 0.35, duration: 0.35 }, 0.45);

  // 50–68%: cap fades briefly during the transition
  tl.to('.intro-cap', { opacity: 0, duration: 0.18 }, 0.50);

  // 60–80%: brand mark fades in, scales up to full (then holds 0.80–0.92)
  tl.to('.intro-final', { opacity: 1, scale: 1, duration: 0.20 }, 0.60);

  // 80–85%: cap fades back in below brand (quick reveal)
  tl.to('.intro-cap', { opacity: 1, duration: 0.05 }, 0.80);

  // 88–93%: cap fades out — beginning the transition to white
  tl.to('.intro-cap', { opacity: 0, duration: 0.05 }, 0.88);

  // 90–100%: SMOOTH HERO TRANSITION — dark canvas lifts to white
  // The stage's bg color is what fills the viewport during sticky, so
  // animating it directly hands the user off to the (white) hero with
  // zero hard cut at the section boundary.
  tl.to('.intro-stage', { backgroundColor: '#FFFFFF', duration: 0.10 }, 0.90);
  tl.to('.intro',       { backgroundColor: '#FFFFFF', duration: 0.10 }, 0.90);

  // Photo layer + vignette dissolve to nothing as the canvas brightens
  tl.to('.intro-bg',       { opacity: 0, duration: 0.10 }, 0.90);
  tl.to('.intro-vignette', { opacity: 0, duration: 0.10 }, 0.90);

  // 92–100%: brand mark flips from white-on-dark to dark-on-white, drop-
  // shadow halo dissipates. Slight delay vs. bg so the canvas changes
  // first and the mark reacts to it (feels more cinematic).
  tl.to('.intro-final', {
    color: '#0A0A0A',
    textShadow: '0 2px 24px rgba(0, 0, 0, 0)',
    duration: 0.08
  }, 0.92);
})();

/* ===========================================================
   GLO — Rapid-cut background cycler
   Single image visible at a time, hard-cuts every ~280ms.
   Pauses when section is offscreen to save CPU.
   =========================================================== */
(function () {
  const frames = document.querySelectorAll('.intro-bg .bg-frame');
  const intro = document.getElementById('intro');
  if (!frames.length || !intro) return;

  // Respect reduced motion — single still frame, no cycling
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const FRAME_MS = 280;
  let i = 0;
  let timer = null;
  let running = false;

  function step() {
    frames[i].classList.remove('is-current');
    i = (i + 1) % frames.length;
    frames[i].classList.add('is-current');
  }

  function start() {
    if (running) return;
    running = true;
    timer = setInterval(step, FRAME_MS);
  }
  function stop() {
    if (!running) return;
    running = false;
    clearInterval(timer);
    timer = null;
  }

  // Only run while the intro is in viewport
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) start(); else stop();
      }
    }, { rootMargin: '0px' });
    io.observe(intro);
  } else {
    start();
  }
})();


/* ===========================================================
   GLO — Interactive hero map
   Drag the pin. Click radius pills. Reach + address update live.
   =========================================================== */
(function () {
  const svg = document.querySelector('.real-map');
  const targeting = document.getElementById('targeting');
  const pin = document.getElementById('pin-group');
  const activeArea = document.getElementById('active-reach-area');
  const activeRing = document.getElementById('active-ring');
  const reachMeta = document.getElementById('reach-meta');
  const reachVal = document.getElementById('reach-val');
  const detailAddr = document.getElementById('detail-address');
  const detailReach = document.getElementById('detail-reach');
  const pills = document.querySelectorAll('.d-pill');
  const dragHint = document.getElementById('dragHint');

  if (!svg || !targeting || !pin) return;

  /* Radius preset data */
  const RADII = {
    90:  { r: 55,  label: '~90m',  reach: 1400 },
    300: { r: 115, label: '~300m', reach: 6200 },
    600: { r: 180, label: '~600m', reach: 12400 },
  };
  let currentRadius = 600;

  /* Street grid — for address lookup */
  const AVENUES = [
    { x: 80,  name: 'Driggs' },
    { x: 195, name: 'Roebling' },
    { x: 310, name: 'Havemeyer' },
    { x: 425, name: 'Bedford' },
  ];
  const STREETS = [
    { y: 80,  name: 'N. 9th' },
    { y: 180, name: 'N. 8th' },
    { y: 280, name: 'N. 7th' },
    { y: 380, name: 'N. 6th' },
  ];

  function fmt(n) { return n.toLocaleString('en-US'); }

  function nearestAddress(x, y) {
    const av = AVENUES.reduce((b, a) => Math.abs(x - a.x) < Math.abs(x - b.x) ? a : b);
    const st = STREETS.reduce((b, s) => Math.abs(y - s.y) < Math.abs(y - b.y) ? s : b);
    return `${av.name} & ${st.name}`;
  }

  function setRadius(r) {
    if (!RADII[r]) return;
    currentRadius = r;
    const data = RADII[r];
    activeArea.setAttribute('r', data.r);
    activeRing.setAttribute('r', data.r);
    reachMeta.textContent = `REACH · ${data.label.replace('~','')}`;
    reachVal.textContent = `${fmt(data.reach)} / day`;
    if (detailReach) detailReach.textContent = `${fmt(data.reach)} / day`;
    pills.forEach((p) => {
      const on = parseInt(p.dataset.r) === r;
      p.classList.toggle('active', on);
      p.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  /* Drag */
  const PIN_HOME = { x: 425, y: 280 };
  const BOUNDS = { minX: 40, maxX: 460, minY: 40, maxY: 440 };
  let dragOffset = { x: 0, y: 0 };
  let dragStartPt = null;
  let dragStartOffset = null;
  let isDragging = false;
  let hasInteracted = false;

  function svgPoint(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  }

  function startDrag(evt) {
    const pt = svgPoint(evt);
    if (!pt) return;
    isDragging = true;
    dragStartPt = pt;
    dragStartOffset = { x: dragOffset.x, y: dragOffset.y };
    targeting.classList.add('dragging');
    try { pin.setPointerCapture(evt.pointerId); } catch (e) {}
    evt.preventDefault();
  }

  function moveDrag(evt) {
    if (!isDragging) return;
    const pt = svgPoint(evt);
    if (!pt) return;
    let dx = dragStartOffset.x + (pt.x - dragStartPt.x);
    let dy = dragStartOffset.y + (pt.y - dragStartPt.y);
    // Clamp pin position within map area
    const newX = PIN_HOME.x + dx;
    const newY = PIN_HOME.y + dy;
    if (newX < BOUNDS.minX) dx = BOUNDS.minX - PIN_HOME.x;
    if (newX > BOUNDS.maxX) dx = BOUNDS.maxX - PIN_HOME.x;
    if (newY < BOUNDS.minY) dy = BOUNDS.minY - PIN_HOME.y;
    if (newY > BOUNDS.maxY) dy = BOUNDS.maxY - PIN_HOME.y;
    dragOffset = { x: dx, y: dy };
    targeting.setAttribute('transform', `translate(${dx} ${dy})`);
    // Update address based on current pin position
    if (detailAddr) {
      detailAddr.textContent = nearestAddress(PIN_HOME.x + dx, PIN_HOME.y + dy);
    }
    // Hide hint after first move
    if (!hasInteracted) {
      hasInteracted = true;
      if (dragHint) dragHint.classList.add('gone');
    }
  }

  function endDrag(evt) {
    if (!isDragging) return;
    isDragging = false;
    targeting.classList.remove('dragging');
    try { pin.releasePointerCapture(evt.pointerId); } catch (e) {}
  }

  pin.addEventListener('pointerdown', startDrag);
  pin.addEventListener('pointermove', moveDrag);
  pin.addEventListener('pointerup', endDrag);
  pin.addEventListener('pointercancel', endDrag);

  /* Radius pills */
  pills.forEach((p) => {
    p.addEventListener('click', () => {
      setRadius(parseInt(p.dataset.r));
      if (!hasInteracted) {
        hasInteracted = true;
        if (dragHint) dragHint.classList.add('gone');
      }
    });
  });

  /* Auto-hide hint after 8s even without interaction */
  setTimeout(() => {
    if (!hasInteracted && dragHint) dragHint.classList.add('gone');
  }, 8000);
})();


(function () {
  const targets = [
    ".hero-top",
    ".hero-app",
    ".metrics-grid",
    ".logos",
    ".press-row",
    ".feature-grid",
    ".pilot-head",
    ".pilot-grid",
    ".pilot-quote",
    ".pricing-wrap",
    ".who-grid",
    ".team-grid",
    ".fn-body",
    ".faq-list",
    ".cta-wrap",
  ];
  targets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"));
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]');
  const msg = document.getElementById("ctaMsg");
  if (!email.value) return false;
  msg.textContent = "Got it. We'll be in touch from Brooklyn within a week.";
  form.reset();
  return false;
}
