/* Minimal: subtle reveal animations + form handler */
(function () {
  const targets = [
    ".hero-top",
    ".hero-app",
    ".metrics-grid",
    ".logos",
    ".feature-grid",
    ".pricing-wrap",
    ".who-grid",
    ".team-grid",
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
