/* ==========================================================
   GLO — Minimal scripts.
   Smooth scroll via Lenis. IntersectionObserver-based reveals
   on a few elements. No GSAP, no scroll-jacking, no loader.
   ========================================================== */

(function () {
  // Smooth scroll
  if (window.Lenis) {
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Reveal-on-scroll. Selectively tag the elements that benefit from it.
  const revealTargets = [
    ".hero-h", ".hero-p", ".hero-actions", ".hero-meta", ".hero-product",
    ".section-h", ".how-copy", ".how-numbers", ".p-card",
    ".pricing-table-wrap", ".pricing-aside", ".who-tile",
    ".testimonial blockquote", ".faq-item", ".cta-h", ".cta-p", ".cta-form",
  ];

  revealTargets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"));
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // small stagger for siblings entering together
          const parent = entry.target.parentElement;
          const siblings = parent ? Array.from(parent.children).filter((c) => c.classList.contains("reveal")) : [entry.target];
          const idx = siblings.indexOf(entry.target);
          const delay = Math.min(idx, 6) * 70;
          setTimeout(() => entry.target.classList.add("in"), delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

/* Form */
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[type="email"]');
  const msg = document.getElementById("ctaMsg");
  if (!email.value) return false;
  msg.textContent = "You're on the list. We'll be in touch from Brooklyn within a week.";
  form.reset();
  return false;
}
