document.addEventListener('DOMContentLoaded', () => {

    // HERO SLIDER MANTIĞI
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 saniyede bir değişir

    const nextSlide = () => {
        // Mevcut slayttan active class'ını al
        slides[currentSlide].classList.remove('active');
        // Bir sonraki slayta geç
        currentSlide = (currentSlide + 1) % slides.length;
        // Yeni slayta active class'ını ver
        slides[currentSlide].classList.add('active');
    };

    // Eğer sayfada slider varsa otomatik başlat
    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // 1. MOBİL MENÜ KONTROLÜ
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        // Menü içindeki linklere tıklanınca menüyü kapat
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });

        // Ekranın herhangi bir yerine tıklanınca menüyü kapat
        document.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    }

    // 2. SAYI ARTIRMA (COUNTER) EFEKTİ
    const startCounter = (targetElement) => {
        const targetValue = +targetElement.getAttribute('data-target');
        const duration = 2000; // Animasyon toplam 2 saniye sürsün
        const stepTime = 15; // Her adım arası milisaniye
        const totalSteps = duration / stepTime;
        const increment = targetValue / totalSteps;

        let currentCount = 0;

        const updateCount = () => {
            currentCount += increment;
            if (currentCount < targetValue) {
                targetElement.innerText = Math.ceil(currentCount);
                setTimeout(updateCount, stepTime);
            } else {
                targetElement.innerText = targetValue;
            }
        };
        updateCount();
    };

    // Görünürlük kontrolü (Daha stabil versiyon)
    const observerOptions = {
        threshold: 0.2 // Elementin %20'si görünse bile başlasın (mobilde daha iyi çalışır)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // querySelector yerine doğrudan class kontrolü
                const counter = entry.target.classList.contains('counter-target')
                    ? entry.target
                    : entry.target.querySelector('.counter-target');

                if (counter && counter.getAttribute('data-done') !== 'true') {
                    counter.setAttribute('data-done', 'true'); // Tekrar tetiklenmesini engelle
                    startCounter(counter);
                }
            }
        });
    }, observerOptions);

    // Tüm istatistik itemlarını veya doğrudan sayıları izle
    document.querySelectorAll('.stat-item, .counter-target').forEach(item => observer.observe(item));

    // 3. FORM GÖNDERİMİ (SİMLE)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Burada normalde API isteği (fetch) yapılır.
            alert('Talebiniz başarıyla alınmıştır. Teknik ekibimiz en kısa sürede dönüş yapacaktır.');
            contactForm.reset();
        });
    }
});

// GALERİ LIGHTBOX MANTIĞI
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeBtn = document.querySelector('.lightbox-close');

if (lightbox) {
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = img.alt;
        });
    });

    closeBtn.onclick = () => { lightbox.style.display = 'none'; };

    // Ekranın dışına tıklayınca kapatma
    lightbox.onclick = (e) => {
        if (e.target === lightbox) { lightbox.style.display = 'none'; }
    };
}