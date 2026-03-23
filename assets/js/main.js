// Hero
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

    // Parallax on Mouse Move
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

(function () {
    'use strict';
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }
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
    // Animated counters
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
    // Drag-to-scroll track
    var track = document.getElementById('catTrack');
    if (track) {
        var isDown = false, startX, scrollLeft, hasDragged = false;
        track.addEventListener('mousedown', function (e) {
            isDown = true;
            hasDragged = false;
            track.classList.add('grabbing');
            startX = e.pageX;
            scrollLeft = track.scrollLeft;
            e.preventDefault();
        });
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
        track.addEventListener('click', function (e) {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);
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
    // Arrow buttons
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (prevBtn && track) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -320, behavior: 'smooth' }); });
    if (nextBtn && track) nextBtn.addEventListener('click', function () { track.scrollBy({ left: 320, behavior: 'smooth' }); });
    // Animated counters
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
    // Spine glow fill on scroll
    (function () {
        var glow = document.getElementById('hsSpineGlow');
        var tl = document.querySelector('.hs-timeline');
        if (!glow || !tl) return;
        function update() {
            var r = tl.getBoundingClientRect(), wh = window.innerHeight;
            var prog = (wh * 0.9 - r.top) / (r.height + wh * 0.6);
            glow.style.height = Math.max(0, Math.min(1, prog)) * 100 + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }());
    // Animated counters (ribbon)
    (function () {
        var ribbon = document.querySelector('.hs-ribbon');
        if (!ribbon) return;
        function anim(el, target, dur) {
            dur = dur || 1800; var s = null;
            (function step(ts) {
                if (!s) s = ts;
                var p = Math.min((ts - s) / dur, 1), e = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(e * target);
                if (p < 1) requestAnimationFrame(step);
            }(performance.now()));
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    ribbon.querySelectorAll('.sr-num[data-target]').forEach(function (el) {
                        anim(el, +el.dataset.target);
                    });
                    obs.disconnect();
                }
            });
        }, { threshold: 0.5 });
        obs.observe(ribbon);
    }());

    // Cursor glow follow on cards
    document.querySelectorAll('.hs-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var r = card.getBoundingClientRect();
            var glow = card.querySelector('.card-corner-glow');
            if (glow) { glow.style.left = (e.clientX - r.left - 60) + 'px'; glow.style.top = (e.clientY - r.top - 60) + 'px'; }
        });
    });

})();

// menu tabs
document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.tab;
        document.querySelectorAll('.menu-panel').forEach(function (p) { p.classList.remove('active'); });
        var target = document.getElementById('panel-' + cat);
        if (target) {
            target.classList.add('active');
            target.querySelectorAll('.sr').forEach(function (el) { el.classList.remove('visible'); });
            setTimeout(function () {
                target.querySelectorAll('.sr').forEach(function (el, i) {
                    setTimeout(function () { el.classList.add('visible'); }, i * 70);
                });
            }, 30);
        }
    });
});

// testimonial slider
(function () {
    var wrap = document.querySelector('.testi-slider-wrap');
    var track = document.getElementById('testiTrack');
    var dotsEl = document.getElementById('testiDots');
    var prevBtn = document.getElementById('testiPrev');
    var nextBtn = document.getElementById('testiNext');
    if (!track || !wrap) return;

    var cards = Array.from(track.querySelectorAll('.testi-card'));
    var total = cards.length;
    var current = 0;
    var GAP = 24;
    var timer;

    function perView() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
    }

    function maxPage() { return Math.ceil(total / perView()); }

    /* Set pixel width on each card from real container size */
    function setCardWidths() {
        var pv = perView();
        var cardW = (wrap.offsetWidth - GAP * (pv - 1)) / pv;
        cards.forEach(function (c) { c.style.width = cardW + 'px'; });
    }

    function buildDots() {
        dotsEl.innerHTML = '';
        var pages = maxPage();
        for (var i = 0; i < pages; i++) {
            (function (idx) {
                var btn = document.createElement('button');
                btn.className = 'testi-dot' + (idx === 0 ? ' active' : '');
                btn.setAttribute('aria-label', 'Slide ' + (idx + 1));
                btn.addEventListener('click', function () { goTo(idx); });
                dotsEl.appendChild(btn);
            })(i);
        }
    }

    function goTo(idx) {
        var pages = maxPage();
        current = (idx + pages) % pages;
        var pv = perView();
        var cardW = cards[0].offsetWidth;
        var offset = current * pv * (cardW + GAP);
        var maxOffset = (total - pv) * (cardW + GAP);
        track.style.transform = 'translateX(-' + Math.min(offset, maxOffset) + 'px)';
        dotsEl.querySelectorAll('.testi-dot').forEach(function (d, i) {
            d.classList.toggle('active', i === current);
        });
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function () { goTo(current + 1); }, 5000);
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); startTimer(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); startTimer(); });

    track.addEventListener('mouseenter', function () { clearInterval(timer); });
    track.addEventListener('mouseleave', startTimer);

    var tx = 0;
    track.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
        var dx = tx - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 40) { goTo(dx > 0 ? current + 1 : current - 1); startTimer(); }
    });

    window.addEventListener('resize', function () {
        current = 0;
        setCardWidths();
        buildDots();
        goTo(0);
    });

    setCardWidths();
    buildDots();
    startTimer();
}());

/* COUNTDOWN */
let end = Date.now() + (8 * 3600 + 47 * 60 + 30) * 1000;
(function tick() {
    const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
    document.getElementById('cdH').textContent = String(Math.floor(diff / 3600)).padStart(2, '0');
    document.getElementById('cdM').textContent = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    document.getElementById('cdS').textContent = String(diff % 60).padStart(2, '0');
    setTimeout(tick, 1000);
})();
