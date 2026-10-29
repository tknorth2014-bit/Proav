/* =========================================================
   ProAv Charters — shared site script
   Edit SITE below to change contact details everywhere at once.
   The header and footer are built here, so a nav change made
   in this file shows up on every page.
   ========================================================= */
const SITE = {
  name: "ProAv Charters",
  phone: "+1 (352) 895-4188",
  phoneHref: "+13528954188",
  email: "ops@proavcharters.com",
  base: "Ocala International Airport (KOCF)",
  city: "Ocala, Florida",
  // Optional: paste a Formspree (https://formspree.io) endpoint here to receive
  // form submissions by email. Left empty, forms open the visitor's email app.
  formEndpoint: "",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/services", label: "Services" },
  { href: "/safety", label: "Safety" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ICONS = {
  plane: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

function currentPath() {
  let p = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p || "/";
}

function buildHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const path = currentPath();
  const links = NAV.map(
    (n) => `<li><a href="${n.href}"${n.href === path ? ' class="active" aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");
  el.className = "site-header" + (document.body.dataset.header === "solid" ? " solid" : "");
  el.innerHTML = `
    <div class="container nav">
      <a href="/" class="logo" aria-label="${SITE.name} home">
        <span class="logo-mark">${ICONS.plane}</span>
        <span class="logo-text">PROAV<small>CHARTERS</small></span>
      </a>
      <ul class="nav-links" id="nav-links">
        ${links}
        <li><a href="/contact#quote" class="btn btn-gold nav-cta">Request a Quote</a></li>
      </ul>
      <button class="menu-toggle" id="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
        <span></span><span></span><span></span>
      </button>
    </div>`;

  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-links");
  const setOpen = (open) => {
    toggle.classList.toggle("open", open);
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));

  const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function buildFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.className = "site-footer";
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a href="/" class="logo">
            <span class="logo-mark">${ICONS.plane}</span>
            <span class="logo-text">PROAV<small>CHARTERS</small></span>
          </a>
          <p>Private jet charter from Central Florida. FAA Part 135 operations backed by more than 25 years of ProAv aircraft management experience.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="/services#on-demand">On-Demand Charter</a></li>
            <li><a href="/services#business">Business Travel</a></li>
            <li><a href="/services#leisure">Leisure &amp; Family</a></li>
            <li><a href="/services#management">Aircraft Management</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><span>${SITE.base}</span></li>
            <li><span>${SITE.city}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
        <span>FAA Part 135 Certificated Air Carrier</span>
      </div>
    </div>`;
}

// Fill any element marked data-site="phone|email|base|city" with the value from SITE.
function fillSiteData() {
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    if (!(key in SITE)) return;
    el.textContent = SITE[key];
    if (el.tagName === "A" && key === "phone") el.href = "tel:" + SITE.phoneHref;
    if (el.tagName === "A" && key === "email") el.href = "mailto:" + SITE.email;
  });
}

// Show the hero photo only if images/hero.jpg exists; otherwise keep the drawn jet.
function detectHeroPhoto() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const img = new Image();
  img.onload = () => hero.classList.add("has-photo");
  img.src = "/images/hero.jpg";
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  items.forEach((i) => io.observe(i));
}

function setupForms() {
  document.querySelectorAll("form[data-quote]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const success = form.querySelector(".form-success");

      if (SITE.formEndpoint) {
        try {
          const res = await fetch(SITE.formEndpoint, {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          if (success) {
            success.textContent = "Thank you. Our charter team will be in touch shortly.";
            success.classList.add("show");
          }
          return;
        } catch {
          // Fall through to the email app if the form service is unreachable.
        }
      }

      const lines = [];
      for (const [k, v] of data.entries()) if (v) lines.push(`${k}: ${v}`);
      const subject = encodeURIComponent(form.dataset.quote || "Charter Quote Request");
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      if (success) {
        success.textContent = "Your email app should open with your request filled in. If it doesn't, call us at " + SITE.phone + ".";
        success.classList.add("show");
      }
    });
  });

  // Quick-quote bar on the home page passes its values on to the full form.
  const params = new URLSearchParams(location.search);
  ["from", "to", "date", "passengers"].forEach((k) => {
    const input = document.querySelector(`form[data-quote] [name="${k}"]`);
    if (input && params.get(k)) input.value = params.get(k);
  });

  // Don't allow departure dates in the past.
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach((d) => (d.min = today));
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  fillSiteData();
  detectHeroPhoto();
  setupReveal();
  setupForms();
});
