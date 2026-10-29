/* =========================================================
   ProAv Charters — shared site script
   Edit SITE below to change contact details everywhere at once.
   The header and footer are built here, so a menu change made
   in this file shows up on every page.
   ========================================================= */
const SITE = {
  name: "ProAv Charters",
  phone: "(352) 895-4188",
  phoneHref: "+13528954188",
  email: "charters@proavcharters.com",
  base: "Ocala International Airport (KOCF)",
  street: "7500 SW 60th Ave",
  cityLine: "Ocala, FL 34474",
  // Optional: paste a Formspree (https://formspree.io) endpoint here to receive
  // form submissions straight to your inbox. Left empty, forms open the
  // visitor's email app with the details filled in.
  formEndpoint: "",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const LOGO = '<span class="pro">Pro</span><span class="charters">avcharters</span>';

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
  el.className = "site-header";
  el.innerHTML = `
    <div class="container nav">
      <a href="/" class="logo" aria-label="${SITE.name} home">${LOGO}</a>
      <ul class="nav-links" id="nav-links">
        ${links}
        <li><a href="/quote" class="btn btn-primary nav-cta">Request a Quote</a></li>
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
}

function buildFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.className = "site-footer";
  el.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-about">
          <a href="/" class="logo">${LOGO}</a>
          <p>Customized private aviation solutions from Central Florida, built on over 35 years of experience and a commitment to safety, reliability, and personalized service.</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>${NAV.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="/services#business">Business Travel</a></li>
            <li><a href="/services#leisure">Leisure Travel</a></li>
            <li><a href="/services#events">Special Events</a></li>
            <li><a href="/services#urgent">Urgent Travel</a></li>
            <li><a href="/services#cargo">Cargo Solutions</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li>${SITE.base}</li>
            <li>${SITE.street}, ${SITE.cityLine}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</span>
        <a href="/quote">Request a Charter Quote &rarr;</a>
      </div>
    </div>`;
}

// Fill any element marked data-site="phone|email|base|street|cityLine" from SITE.
function fillSiteData() {
  document.querySelectorAll("[data-site]").forEach((el) => {
    const key = el.dataset.site;
    if (!(key in SITE)) return;
    el.textContent = SITE[key];
    if (el.tagName === "A" && key === "phone") el.href = "tel:" + SITE.phoneHref;
    if (el.tagName === "A" && key === "email") el.href = "mailto:" + SITE.email;
  });
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
    { threshold: 0.1 }
  );
  items.forEach((i) => io.observe(i));
}

/* ---------- Forms (quote + contact) ---------- */
function setupForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const success = form.querySelector(".form-success");
      const show = (msg) => {
        if (!success) return;
        success.textContent = msg;
        success.classList.add("show");
      };

      if (SITE.formEndpoint) {
        try {
          data.append("_subject", form.dataset.form);
          const res = await fetch(SITE.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error("Request failed");
          form.reset();
          form.dispatchEvent(new Event("reset-ui"));
          show("Thank you! Our team will be in touch shortly.");
          return;
        } catch {
          // Fall back to the visitor's email app if the form service is unreachable.
        }
      }

      const lines = [];
      for (const [k, v] of data.entries()) if (v) lines.push(`${k.replace(/_/g, " ")}: ${v}`);
      const subject = encodeURIComponent(form.dataset.form);
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      show(`Your email app should open with your details filled in. If it doesn't, call us at ${SITE.phone}.`);
    });
  });

  // Don't allow dates in the past.
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach((d) => (d.min = today));
}

/* ---------- Quote form: trip type tabs and multi-city legs ---------- */
function setupQuoteForm() {
  const form = document.getElementById("quote-form");
  if (!form) return;
  const tabs = form.querySelectorAll(".tab");
  const tripType = form.querySelector('[name="trip_type"]');
  const returnField = form.querySelector("#return-field");
  const legs = form.querySelector("#extra-legs");
  const addLeg = form.querySelector("#add-leg");
  let legCount = 1;

  const setType = (type) => {
    tabs.forEach((t) => t.classList.toggle("active", t.dataset.type === type));
    tripType.value = type;
    returnField.querySelector("input").required = type === "Round Trip";
    returnField.querySelector(".req").classList.toggle("hidden", type !== "Round Trip");
    const multi = type === "Multi-City";
    legs.classList.toggle("hidden", !multi);
    addLeg.classList.toggle("hidden", !multi);
    if (multi && !legs.children.length) addLegRow();
  };

  const addLegRow = () => {
    legCount += 1;
    const n = legCount;
    const row = document.createElement("div");
    row.className = "form-grid full leg";
    row.innerHTML = `
      <div class="leg-title full">Leg ${n} <button type="button" class="leg-remove">Remove</button></div>
      <div class="field"><label>From</label><input name="leg_${n}_from" type="text" placeholder="e.g. KTEB - Teterboro, NJ"></div>
      <div class="field"><label>To</label><input name="leg_${n}_to" type="text" placeholder="e.g. KMIA - Miami, FL"></div>
      <div class="field full"><label>Date</label><input name="leg_${n}_date" type="date" min="${new Date().toISOString().split("T")[0]}"></div>`;
    row.querySelector(".leg-remove").addEventListener("click", () => row.remove());
    legs.appendChild(row);
  };

  tabs.forEach((t) => t.addEventListener("click", () => setType(t.dataset.type)));
  addLeg.addEventListener("click", addLegRow);
  form.addEventListener("reset-ui", () => {
    legs.innerHTML = "";
    legCount = 1;
    setType("One Way");
  });

  // Pre-fill from links such as /quote?aircraft=Citation%20XLS%2B
  const params = new URLSearchParams(location.search);
  const aircraft = params.get("aircraft");
  if (aircraft) {
    const select = form.querySelector('[name="aircraft_preference"]');
    if (![...select.options].some((o) => o.value === aircraft)) select.add(new Option(aircraft, aircraft));
    select.value = aircraft;
  }
  ["from", "to"].forEach((k) => {
    const v = params.get(k);
    if (v) form.querySelector(`[name="${k}"]`).value = v;
  });
  setType(params.get("trip") || "One Way");
}

/* ---------- Fleet: category filters and details popup ---------- */
function setupFleet() {
  const grid = document.getElementById("fleet-grid");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".aircraft-card")];
  const empty = document.getElementById("fleet-empty");
  const filters = document.querySelectorAll(".filter");

  filters.forEach((f) =>
    f.addEventListener("click", () => {
      filters.forEach((x) => x.classList.toggle("active", x === f));
      const cat = f.dataset.filter;
      let shown = 0;
      cards.forEach((c) => {
        const match = cat === "all" || c.dataset.category === cat;
        c.classList.toggle("hidden", !match);
        if (match) shown++;
      });
      empty.classList.toggle("show", shown === 0);
      if (shown === 0) empty.querySelector("[data-cat]").textContent = f.textContent.trim().toLowerCase();
    })
  );

  const modal = document.getElementById("aircraft-modal");
  const body = modal.querySelector(".modal-content");
  const close = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };
  cards.forEach((c) =>
    c.querySelector(".details-btn").addEventListener("click", () => {
      const d = c.dataset;
      const rows = [
        ["Category", d.class],
        ["Passengers", d.pax],
        ["Range", d.range],
        ["Cruise Speed", d.speed],
        ["Cabin Height", d.cabin],
        ["Baggage", d.baggage],
      ]
        .filter((r) => r[1])
        .map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`)
        .join("");
      body.innerHTML = `
        <img src="${c.querySelector("img").src}" alt="${d.name}">
        <div class="modal-body">
          <h3>${d.name}</h3>
          <p class="class">${d.class}</p>
          <p>${d.desc}</p>
          <table class="spec-table">${rows}</table>
          <a href="/quote?aircraft=${encodeURIComponent(d.name)}" class="btn btn-primary btn-block">Request a Quote for This Aircraft</a>
        </div>`;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      modal.querySelector(".modal-close").focus();
    })
  );
  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.addEventListener("click", (e) => e.target === modal && close());
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
}

document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  fillSiteData();
  setupReveal();
  setupForms();
  setupQuoteForm();
  setupFleet();
});
