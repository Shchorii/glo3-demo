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
