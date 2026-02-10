document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBİL MENÜ
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            }
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
            });
        });
    }

    // 2. HERO SLIDER
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000);
    }

    // 3. COUNTER ANİMASYONU
    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 2000;
        const steps = duration / 16;
        const inc = target / steps;
        let current = 0;
        const update = () => {
            current += inc;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                el.innerText = target;
            }
        };
        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll
                    ? entry.target.querySelectorAll('.counter-target')
                    : [];
                const direct = entry.target.classList.contains('counter-target') ? [entry.target] : [];
                [...counters, ...direct].forEach(c => {
                    if (c.getAttribute('data-done') !== 'true') {
                        c.setAttribute('data-done', 'true');
                        startCounter(c);
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.hcb-item, .counter-target').forEach(el => counterObserver.observe(el));

    // 4. SCROLL REVEAL
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.srv-card, .why-item, .av-box, .value-card, .team-card, .gallery-item').forEach((el, i) => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 5. NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.borderBottomColor = window.scrollY > 50 ? 'rgba(240,165,0,0.2)' : 'var(--border)';
        });
    }

    // 6. LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        };
        if (closeBtn) closeBtn.onclick = closeLightbox;
        lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
    }

    // 7. FORM GÖNDERİM
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type=submit]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Talebiniz Alındı!';
            btn.style.background = 'var(--success)';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.color = '';
                form.reset();
            }, 3500);
        });
    }

    // 8. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});



document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".slide");
    const lines = document.querySelectorAll(".hero-title .line");
    const desc = document.querySelector(".hero-desc");

    let current = 0;

    function applyText(slide) {
        lines[0].textContent = slide.dataset.line1;
        lines[1].textContent = slide.dataset.line2;
        lines[2].textContent = slide.dataset.line3;
        desc.textContent   = slide.dataset.desc;
    }

    function changeSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        slides[index].classList.add("active");
        applyText(slides[index]);
    }

    applyText(slides[0]); // ilk açılış

    setInterval(() => {
        current = (current + 1) % slides.length;
        changeSlide(current);
    }, 5000);

});