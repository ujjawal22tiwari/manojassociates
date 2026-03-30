
/* =============================================
Theme Toggle & Shared Logic
============================================= */
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector('i');
    if (!icon) return;
    icon.classList.toggle('fa-moon', theme !== 'light');
    icon.classList.toggle('fa-sun', theme === 'light');
}

/* =============================================
   Mobile Menu
============================================= */
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
}

// Mobile Dropdown Toggle Logic (Sync with script.js)
const navDropdowns = document.querySelectorAll('.nav-dropdown');
navDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                dropdown.classList.toggle('mobile-open');
            }
        });
    }
});

/* =============================================
   Sticky Header on Scroll
============================================= */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

/* =============================================
   Auto-Scroll Slider with Dot Sync
============================================= */
const sliderTrack = document.getElementById('slider-track');
const dots = document.querySelectorAll('.slider-dots .dot');
let currentSlide = 0;
const totalSlides = 3;
const pauseDuration = 4000; // ms on each slide

// Sync dots with CSS animation
function syncDots() {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }, pauseDuration);
}
syncDots();

// Click on dots to jump (pauses & restarts animation)
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.slide);
        currentSlide = idx;
        sliderTrack.style.animation = 'none';
        sliderTrack.style.transform = `translateX(-${idx * (100 / totalSlides)}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));

        // Resume auto-play after a pause
        setTimeout(() => {
            sliderTrack.style.animation = '';
            sliderTrack.style.transform = '';
        }, pauseDuration);
    });
});

/* =============================================
   Lightbox
============================================= */
function openLightbox(card) {
    const img = card.querySelector('.award-card-image img');
    const title = card.querySelector('h3');

    if (!img) return; // no image yet

    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-caption').textContent = title ? title.textContent.trim() : '';
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

/* =============================================
   Animate Cards on Scroll
============================================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.award-card, .stat-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${i * 0.12}s`;
    observer.observe(el);
});
