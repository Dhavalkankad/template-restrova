// ====================== AOS Init ======================
AOS.init({ duration: 800, once: true, offset: 80 });

// ====================== Hero GSAP Entrance ======================
document.addEventListener("DOMContentLoaded", function () {

    // Staggered entrance for hero content
    gsap.from(".hero-badge", { opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: "power3.out" });
    gsap.from(".hero-title", { opacity: 0, y: 50, duration: 0.8, delay: 0.4, ease: "power3.out" });
    gsap.from(".hero-desc", { opacity: 0, y: 30, duration: 0.7, delay: 0.6, ease: "power3.out" });
    gsap.from(".hero-actions", { opacity: 0, y: 30, duration: 0.7, delay: 0.75, ease: "power3.out" });
    gsap.from(".hero-stats", { opacity: 0, y: 20, duration: 0.7, delay: 0.9, ease: "power3.out" });

    // Pizza plate entrance
    gsap.from(".hero-pizza", { opacity: 0, scale: 0.6, rotation: -15, duration: 1, delay: 0.5, ease: "back.out(1.4)" });
    gsap.from(".plate-ring", { opacity: 0, scale: 0.5, duration: 0.8, delay: 0.8, ease: "power2.out" });
    gsap.from(".ring-2", { opacity: 0, scale: 0.5, duration: 0.8, delay: 1.0, ease: "power2.out" });

    // Food badges entrance
    gsap.from(".badge-top-right", { opacity: 0, x: 40, duration: 0.7, delay: 1.1, ease: "back.out(1.7)" });
    gsap.from(".badge-bottom-left", { opacity: 0, x: -40, duration: 0.7, delay: 1.2, ease: "back.out(1.7)" });
    gsap.from(".badge-top-left", { opacity: 0, x: -40, duration: 0.7, delay: 1.3, ease: "back.out(1.7)" });

    // Shapes entrance
    gsap.from(".hero-shape", {
        opacity: 0,
        scale: 0.3,
        duration: 1,
        delay: 0.3,
        stagger: 0.15,
        ease: "back.out(1.4)"
    });

    // ====================== Parallax on Mouse Move ======================
    const hero = document.querySelector(".hero-section");
    const shapes = document.querySelectorAll(".hero-shape");
    const orbs = document.querySelectorAll(".hero-orb");

    if (hero) {
        hero.addEventListener("mousemove", function (e) {
            const cx = hero.offsetWidth / 2;
            const cy = hero.offsetHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            shapes.forEach(function (shape, i) {
                const depth = (i % 3 + 1) * 12;
                gsap.to(shape, {
                    x: dx * depth,
                    y: dy * depth,
                    duration: 0.8,
                    ease: "power1.out"
                });
            });

            orbs.forEach(function (orb, i) {
                const depth = (i + 1) * 20;
                gsap.to(orb, {
                    x: dx * depth,
                    y: dy * depth,
                    duration: 1.2,
                    ease: "power1.out"
                });
            });
        });

        hero.addEventListener("mouseleave", function () {
            gsap.to(shapes, { x: 0, y: 0, duration: 1, ease: "power2.out" });
            gsap.to(orbs, { x: 0, y: 0, duration: 1, ease: "power2.out" });
        });
    }

});

// Mobile dropdown accordion
document.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            var parent = this.closest('.has-dropdown');
            var isOpen = parent.classList.contains('mobile-open');
            // Close all
            document.querySelectorAll('.has-dropdown.mobile-open').forEach(function (el) {
                el.classList.remove('mobile-open');
            });
            // Toggle clicked
            if (!isOpen) parent.classList.add('mobile-open');
        }
    });
});
// Close mobile menu dropdowns when menu collapses
document.getElementById('menu').addEventListener('hide.bs.collapse', function () {
    document.querySelectorAll('.has-dropdown.mobile-open').forEach(function (el) {
        el.classList.remove('mobile-open');
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('footerScrollTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
