/* ==========================================================
   GLO — scroll choreography
   Lenis for smooth scroll + GSAP ScrollTrigger for pinning
   and tied-to-scroll animations. Manual char splitting.
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Lenis smooth scroll ---------- */
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* Bridge Lenis → ScrollTrigger */
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ---------- Char / word splitter ---------- */
  function splitChars(el) {
    if (el.dataset.split === "done") return;
    const text = el.textContent;
    el.innerHTML = "";
    // Tokenize into words and spaces. Wrap each word in a .word-wrap (display: inline-block;
    // white-space: nowrap) so wrapping happens at word boundaries — not mid-word.
    // Inside each word, split into .char spans for individual animation.
    const tokens = text.split(/(\s+)/);
    tokens.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        // Real whitespace text node — preserves natural line-break opportunities
        el.appendChild(document.createTextNode(" "));
      } else {
        const wrap = document.createElement("span");
        wrap.className = "word-wrap";
        [...tok].forEach((c) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = c;
          wrap.appendChild(span);
        });
        el.appendChild(wrap);
      }
    });
    el.dataset.split = "done";
  }

  function splitWords(el) {
    if (el.dataset.split === "done") return;
    const text = el.textContent;
    el.innerHTML = "";
    text.split(/(\s+)/).forEach((w) => {
      if (!w) return;
      if (/^\s+$/.test(w)) {
        el.appendChild(document.createTextNode(" "));
      } else {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = w;
        el.appendChild(span);
      }
    });
    el.dataset.split = "done";
  }

  document.querySelectorAll("[data-split-chars]").forEach(splitChars);
  document.querySelectorAll("[data-split-words]").forEach(splitWords);

  /* ---------- Cursor glow ---------- */
  const cursor = document.getElementById("cursorGlow");
  if (cursor && window.matchMedia("(hover: hover)").matches) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
    });
    function loop() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  } else if (cursor) {
    cursor.style.display = "none";
  }

  /* ---------- Theme tracker (so cursor adapts) ---------- */
  document.querySelectorAll("[data-theme]").forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => document.body.setAttribute("data-theme", sec.dataset.theme),
      onEnterBack: () => document.body.setAttribute("data-theme", sec.dataset.theme),
    });
  });

  /* ================================================================
     HERO — letter cascade on load
  ================================================================ */
  const heroChars = document.querySelectorAll(".hero-title .char");
  const heroSubWords = document.querySelectorAll(".hero-sub .word");

  gsap.set(heroChars, { yPercent: 110, opacity: 0, rotate: 8 });
  gsap.set(heroSubWords, { yPercent: 100, opacity: 0 });
  gsap.set(".hero-eyebrow", { opacity: 0, y: 12 });
  gsap.set(".hero-foot", { opacity: 0, y: 12 });
  gsap.set(".hero-scroll", { opacity: 0 });

  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0)
    .to(heroChars, {
      yPercent: 0,
      opacity: 1,
      rotate: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: "expo.out",
    }, 0.2)
    .to(heroSubWords, {
      yPercent: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.06,
      ease: "expo.out",
    }, 0.7)
    .to(".hero-foot", { opacity: 1, y: 0, duration: 0.8 }, 1.1)
    .to(".hero-scroll", { opacity: 1, duration: 0.6 }, 1.3);

  /* Hero parallax on scroll */
  gsap.to(".hero-streetlamp", {
    y: 200,
    scale: 1.2,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero-grid", {
    y: 120,
    opacity: 0.3,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".hero-title", {
    y: -80,
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  /* ================================================================
     PROBLEM — pinned, lines reveal letter by letter on scroll
  ================================================================ */
  const problemLines = document.querySelectorAll(".problem-line");
  const problemTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".problem",
      start: "top top",
      end: "+=2400",
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    },
  });

  problemTl
    .to(".line-a", { opacity: 1, y: 0, duration: 1 })
    .from(".line-a .emph .char", {
      opacity: 0,
      y: 30,
      stagger: 0.02,
      duration: 0.6,
    }, "<+0.1")
    .to(".line-b", { opacity: 1, y: 0, duration: 1 }, ">+0.5")
    .from(".line-b .emph .char", {
      opacity: 0,
      y: 30,
      color: "#15151c",
      stagger: 0.025,
      duration: 0.6,
    }, "<+0.1")
    .to(".line-c", { opacity: 1, y: 0, duration: 1 }, ">+0.6")
    .from(".break-line .char", {
      opacity: 0,
      y: 60,
      rotate: 8,
      stagger: 0.04,
      duration: 0.8,
      ease: "expo.out",
    }, "<+0.1")
    .to({}, { duration: 1.5 }); // hold

  /* ================================================================
     IMAGINE — pinned, prefix appears, morph words cycle, list reveals
  ================================================================ */
  const morphWords = document.querySelectorAll(".morph-word");
  const imagineList = document.querySelectorAll(".imagine-list li");

  gsap.set(".imagine-prefix .word", { yPercent: 100, opacity: 0 });

  const imagineTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".imagine",
      start: "top top",
      end: "+=3200",
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
    },
  });

  imagineTl
    .to(".imagine-prefix .word", {
      yPercent: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.5,
      ease: "expo.out",
    })
    .to({}, { duration: 0.4 })
    .fromTo(morphWords[0], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, ">")
    .to({}, { duration: 0.8 })
    .to(morphWords[0], { opacity: 0, y: -30, duration: 0.4 })
    .fromTo(morphWords[1], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, "<+0.1")
    .to({}, { duration: 0.8 })
    .to(morphWords[1], { opacity: 0, y: -30, duration: 0.4 })
    .fromTo(morphWords[2], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5 }, "<+0.1")
    .to({}, { duration: 0.6 })
    .to(imagineList, {
      opacity: 1,
      x: 0,
      stagger: 0.18,
      duration: 0.6,
      ease: "power2.out",
    }, ">")
    .to({}, { duration: 1.4 });

  /* ================================================================
     BLOCK MAP — generate grid, animate blocks lighting up
  ================================================================ */
  const grid = document.getElementById("blockGrid");
  if (grid) {
    const N = 12 * 12;
    for (let i = 0; i < N; i++) {
      const b = document.createElement("div");
      b.className = "block";
      grid.appendChild(b);
    }

    // Define a "targeted neighborhood" — a cluster of cells
    const targetCells = [];
    const dimCells = [];

    // Cluster center around row 5-7, col 6-8
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 12; c++) {
        const idx = r * 12 + c;
        const dr = Math.abs(r - 6);
        const dc = Math.abs(c - 7);
        const d = Math.sqrt(dr * dr + dc * dc);
        if (d <= 1.6) targetCells.push(idx);
        else if (d <= 3) dimCells.push(idx);
      }
    }

    const blocks = grid.querySelectorAll(".block");
    ScrollTrigger.create({
      trigger: ".blockmap",
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => animateGrid(),
      onEnterBack: () => animateGrid(),
    });

    let animated = false;
    function animateGrid() {
      if (animated) return;
      animated = true;
      // Section heading words
      gsap.from(".blockmap .section-h .word", {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        duration: 0.7,
        ease: "expo.out",
      });
      // Light up dim first
      gsap.to(dimCells.map((i) => blocks[i]), {
        background: "rgba(255, 169, 77, 0.18)",
        stagger: { each: 0.015, from: "random" },
        duration: 0.4,
        delay: 0.2,
      });
      // Then the bright cluster
      gsap.to(targetCells.map((i) => blocks[i]), {
        background: "#ffa94d",
        boxShadow: "0 0 12px #ffa94d, 0 0 24px rgba(255, 169, 77, 0.5)",
        stagger: { each: 0.05, from: "center" },
        duration: 0.6,
        delay: 0.6,
        ease: "power2.out",
      });
    }
  }

  /* ================================================================
     PRICE — char drop, sub-line stagger
  ================================================================ */
  gsap.from(".price-eyebrow", {
    opacity: 0, y: 12,
    duration: 0.7,
    scrollTrigger: { trigger: ".price", start: "top 75%" },
  });
  gsap.from(".price-mega .char", {
    opacity: 0,
    yPercent: 110,
    rotate: 8,
    stagger: 0.08,
    duration: 1.2,
    ease: "expo.out",
    scrollTrigger: { trigger: ".price", start: "top 70%" },
  });
  gsap.to(".price-sub span", {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: { trigger: ".price-sub", start: "top 80%" },
  });
  gsap.from(".price-foot", {
    opacity: 0, y: 20,
    duration: 0.8,
    scrollTrigger: { trigger: ".price-foot", start: "top 85%" },
  });

  /* ================================================================
     CITIES — staggered reveal
  ================================================================ */
  gsap.from(".cities .section-h", {
    opacity: 0, y: 30,
    duration: 0.9,
    scrollTrigger: { trigger: ".cities", start: "top 70%" },
  });
  gsap.from(".cities .section-eyebrow", {
    opacity: 0, y: 12,
    duration: 0.7,
    scrollTrigger: { trigger: ".cities", start: "top 70%" },
  });
  gsap.utils.toArray(".city").forEach((city, i) => {
    gsap.from(city, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: city, start: "top 80%" },
    });
    // count up the stats
    const statEl = city.querySelector(".city-stat span");
    if (statEl) {
      const target = parseInt(statEl.textContent.replace(/[^0-9]/g, ""), 10);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: city, start: "top 75%" },
        onUpdate: () => {
          statEl.textContent = Math.round(obj.v).toLocaleString();
        },
      });
    }
  });

  /* ================================================================
     MOAT — emphasis sweep
  ================================================================ */
  gsap.from(".moat .section-eyebrow", {
    opacity: 0, y: 12,
    duration: 0.7,
    scrollTrigger: { trigger: ".moat", start: "top 70%" },
  });
  gsap.from(".moat-h", {
    opacity: 0,
    y: 30,
    duration: 1.1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".moat", start: "top 65%" },
  });
  gsap.from(".moat-p", {
    opacity: 0,
    y: 20,
    duration: 0.9,
    scrollTrigger: { trigger: ".moat-p", start: "top 80%" },
  });

  /* ================================================================
     QUOTE — words reveal
  ================================================================ */
  gsap.set(".quote .word", { opacity: 0.15, y: 0 });
  gsap.to(".quote .word", {
    opacity: 1,
    stagger: 0.04,
    ease: "none",
    scrollTrigger: {
      trigger: ".quote blockquote",
      start: "top 75%",
      end: "bottom 50%",
      scrub: 1,
    },
  });
  gsap.from(".quote footer", {
    opacity: 0,
    y: 10,
    duration: 0.7,
    scrollTrigger: { trigger: ".quote footer", start: "top 85%" },
  });
  gsap.from(".quote-mark", {
    opacity: 0,
    scale: 0.7,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: { trigger: ".quote", start: "top 70%" },
  });

  /* ================================================================
     CTA — letter cascade + glow pulse
  ================================================================ */
  gsap.from(".cta-h .char", {
    opacity: 0,
    yPercent: 110,
    rotate: 8,
    stagger: 0.05,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: { trigger: ".cta", start: "top 70%" },
  });
  gsap.from(".cta-p", {
    opacity: 0, y: 20,
    duration: 0.8,
    scrollTrigger: { trigger: ".cta-p", start: "top 80%" },
  });
  gsap.from(".cta-form", {
    opacity: 0, y: 20,
    duration: 0.9,
    scrollTrigger: { trigger: ".cta-form", start: "top 85%" },
  });
  gsap.to(".cta-glow", {
    scale: 1.15,
    opacity: 1.2,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });

  /* Refresh ScrollTrigger after layout settles */
  window.addEventListener("load", () => ScrollTrigger.refresh());
});

/* ---------- Form handler ---------- */
function handleSubmit(e) {
  e.preventDefault();
  const input = e.target.querySelector("input");
  const msg = document.getElementById("ctaMsg");
  if (!input.value) return false;
  msg.textContent = "● You're on the list. We'll be in touch from Brooklyn.";
  input.value = "";
  return false;
}
