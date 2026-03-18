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

// Loader Logic

// function hidLoader() {
//     document.getElementById('loader').classList.add('hide');
//     document.querySelector('.overflow-wrapper').classList.add('show');
// }
// const minWait = new Promise(r => setTimeout(r, 2200));
// const pageLoad = new Promise(r => {
//     if (document.readyState === 'complete') r();
//     else window.addEventListener('load', r);
// });
// Promise.all([minWait, pageLoad]).then(hidLoader);





(function () {
    'use strict';

    // ── AOS Init ──
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }

    // ── Loader hide + site reveal ──
    var loader = document.getElementById('loader');
    var wrapper = document.querySelector('.overflow-wrapper');

    function hideLoader() {
        if (loader) loader.classList.add('hide');
        if (wrapper) wrapper.classList.add('show');
    }

    var minWait = new Promise(function (r) { setTimeout(r, 2200); });
    var pageLoad = new Promise(function (r) {
        if (document.readyState === 'complete') r();
        else window.addEventListener('load', r);
    });
    Promise.all([minWait, pageLoad]).then(hideLoader);

    // ── Loader percentage counter ──
    // var pctEl = document.getElementById('pct');
    // if (pctEl) {
    //     var duration = 2800, start = performance.now();
    //     function tick(now) {
    //         var t = Math.min((now - start) / duration, 1);
    //         var eased = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    //         pctEl.textContent = Math.round(eased * 100) + '%';
    //         if (t < 1) requestAnimationFrame(tick);
    //     }
    //     setTimeout(function () { requestAnimationFrame(tick); }, 600);
    // }

    // ── Filter tabs (categories section) ──
    // document.querySelectorAll('.filter-tab').forEach(function (btn) {
    //     btn.addEventListener('click', function () {
    //         document.querySelectorAll('.filter-tab').forEach(function (b) {
    //             b.classList.remove('active');
    //         });
    //         btn.classList.add('active');
    //     });
    // });

    // ── Animated counters (stats strip) ──
    function animCounter(el, target, suffix, dur) {
        dur = dur || 1800;
        var s = null;
        function step(ts) {
            if (!s) s = ts;
            var p = Math.min((ts - s) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var statsStrip = document.querySelector('.stats-strip');
    if (statsStrip && 'IntersectionObserver' in window) {
        var statsObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
                        animCounter(el, +el.dataset.target, el.dataset.suffix || '');
                    });
                    statsObs.disconnect();
                }
            });
        }, { threshold: 0.5 });
        statsObs.observe(statsStrip);
    }

    // ── Filter pills ──
    // document.querySelectorAll('.filter-pill').forEach(function (btn) {
    //     if (!btn) return;
    //     btn.addEventListener('click', function () {
    //         document.querySelectorAll('.filter-pill').forEach(function (b) { if (b) b.classList.remove('active'); });
    //         btn.classList.add('active');
    //     });
    // });

    // Drag-to-scroll track (flicker-free)
    var track = document.getElementById('catTrack');
    if (track) {
        var isDown = false, startX, scrollLeft, hasDragged = false;

        track.addEventListener('mousedown', function (e) {
            isDown = true;
            hasDragged = false;
            track.classList.add('grabbing');
            startX = e.pageX;
            scrollLeft = track.scrollLeft;
            e.preventDefault(); // block text/image selection immediately
        });

        // listen on document so drag outside track still works
        document.addEventListener('mouseup', function () {
            if (!isDown) return;
            isDown = false;
            track.classList.remove('grabbing');
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            var dx = e.pageX - startX;
            if (Math.abs(dx) > 4) hasDragged = true;
            track.scrollLeft = scrollLeft - dx;
        });

        // swallow click if it was actually a drag
        track.addEventListener('click', function (e) {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);

        // Touch drag
        var touchStartX = 0, touchScrollLeft = 0;
        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = track.scrollLeft;
        }, { passive: true });
        track.addEventListener('touchmove', function (e) {
            var dx = e.touches[0].pageX - touchStartX;
            track.scrollLeft = touchScrollLeft - dx;
        }, { passive: true });
    }

    // ── Arrow buttons ──
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (prevBtn && track) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -320, behavior: 'smooth' }); });
    if (nextBtn && track) nextBtn.addEventListener('click', function () { track.scrollBy({ left: 320, behavior: 'smooth' }); });

    // ── Animated counters ──
    function animCounter(el, target, suffix, dur) {
        dur = dur || 1800;
        var s = null;
        (function step(ts) {
            if (!s) s = ts;
            var p = Math.min((ts - s) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
        })(performance.now());
    }

    var band = document.querySelector('.stats-band');
    if (band && 'IntersectionObserver' in window) {
        var sObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    document.querySelectorAll('.sb-num').forEach(function (el) {
                        if (el && el.dataset.target) animCounter(el, +el.dataset.target, el.dataset.suffix || '');
                    });
                    sObs.disconnect();
                }
            });
        }, { threshold: 0.4 });
        sObs.observe(band);
    }
    

})();