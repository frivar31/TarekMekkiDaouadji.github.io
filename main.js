document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const icon = toggleBtn ? toggleBtn.querySelector("i") : null;

  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.add("active");
    if (icon) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
    document.body.style.overflow = "hidden";
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("active");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
    document.body.style.overflow = "";
    if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!navMenu) return;
    navMenu.classList.contains("active") ? closeMenu() : openMenu();
  }

  // 1) Menu mobile: clic + clavier (Enter/Espace)
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", toggleMenu);
    toggleBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // 2) Fermer le menu quand on clique sur un lien
  if (navMenu) {
    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth <= 992) closeMenu();
      });
    });
  }

  // 3) Fermer si on repasse en desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMenu();
  });

  // 4) Mise en surbrillance du lien actif (au cas où)
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .nav-actions a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) link.classList.add("active");
  });

  // 5) Reveal Animation (inchangé)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});
