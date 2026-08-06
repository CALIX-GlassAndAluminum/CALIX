const projects = [
  { image: "assets/png6.PNG", tag: "Residential", title: "Window & sliding door systems", detail: "Powder-coated aluminum grid windows, sliding doors, and fitted glass panels." },
  { image: "assets/png2.PNG", tag: "Commercial", title: "Storefront glass & doors", detail: "Large architectural glass panels and aluminum framing integrated into a restaurant facade." },
  { image: "assets/png10.PNG", tag: "Residential", title: "Glass & aluminum integration", detail: "Sliding doors, fixed windows, and coordinated glass elements for a multi-storey home." },
  { image: "assets/png11.PNG", tag: "Commercial", title: "Cladding & window systems", detail: "Multi-color ACP cladding paired with aluminum awning windows and fixed glass panels." },
  { image: "assets/png 16.PNG", tag: "Interior", title: "Built-in aluminum wardrobe", detail: "Frosted glass, wood-look aluminum framing, fixed cabinetry, and illuminated display shelving." },
  { image: "assets/png 14.PNG", tag: "Interior", title: "Frameless shower enclosure", detail: "Clear frameless glass with refined chrome hardware for a clean, open bathroom finish." }
];

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector(".lightbox-figure img");
const lightboxMeta = lightbox.querySelector(".lightbox-meta");
const lightboxTitle = lightbox.querySelector(".lightbox-title");
const lightboxDetail = lightbox.querySelector(".lightbox-detail");
const closeButton = lightbox.querySelector(".lightbox-close");
const mobileNav = document.querySelector(".mobile-nav");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const copyEmailButton = document.querySelector(".copy-email");
let activeIndex = 0;
let previousFocus = null;

function renderLightbox() {
  const project = projects[activeIndex];
  lightboxImage.src = project.image;
  lightboxImage.alt = project.title;
  lightboxMeta.textContent = `${project.tag} · ${String(activeIndex + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
  lightboxTitle.textContent = project.title;
  lightboxDetail.textContent = project.detail;
  lightbox.setAttribute("aria-label", `${project.title} project image`);
}

function openLightbox(index, trigger) {
  activeIndex = index;
  previousFocus = trigger;
  renderLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  previousFocus?.focus();
}

function moveLightbox(direction) {
  activeIndex = (activeIndex + direction + projects.length) % projects.length;
  renderLightbox();
}

document.querySelectorAll(".project-photo").forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index, button));
});

closeButton.addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
lightbox.addEventListener("mousedown", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => {
  if (!lightbox.hidden) {
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") moveLightbox(1);
    if (event.key === "ArrowLeft") moveLightbox(-1);
  }
  if (event.key === "Escape" && !mobileMenu.hidden) closeMenu();
});

function closeMenu() {
  mobileMenu.hidden = true;
  mobileNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", () => {
  const willOpen = mobileMenu.hidden;
  mobileMenu.hidden = !willOpen;
  mobileNav.classList.toggle("is-open", willOpen);
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

copyEmailButton.addEventListener("click", async () => {
  const email = "weng_paeldon@yahoo.com";
  try {
    await navigator.clipboard.writeText(email);
    copyEmailButton.textContent = "Email copied ✓";
    window.setTimeout(() => { copyEmailButton.textContent = "Copy email address"; }, 2200);
  } catch {
    window.prompt("Copy the CALIX email address:", email);
  }
});
