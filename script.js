/**
 * JavaScript for Tiwari Infrastructure Pvt Ltd
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });

    // 1. Modern Smooth Navigation & URL Cleaning
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle '#' as Home root
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.history.pushState(null, null, window.location.pathname);
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust position for sticky header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL modernly without hash for #home, keep hash invisible for others if preferred
                if (targetId === '#home') {
                    window.history.pushState(null, null, window.location.pathname);
                } else {
                    // Modern pushState keeps it clean
                    window.history.pushState(null, null, targetId);
                }

                // Close mobile menu
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });

    // 1.5 Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check local storage for theme preference, default to light
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Show sun icon when in dark mode
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme') || 'light';

        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme'); // default is now light
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // 2. Sticky Navbar Effect on Scroll
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link switching based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });


    // 3. Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-counter');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            // Duration logic
            const speed = 200;
            const updateCount = () => {
                const current = +counter.innerText;
                const inc = target / speed;

                if (current < target) {
                    counter.innerText = Math.ceil(current + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    // Intersection Observer to trigger counter animation when in view
    const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
            animateCounters();
            hasAnimated = true;
        }
    }, {
        root: null,
        threshold: 0.5
    });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // 4. Contact Form Submit Prevention (Demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';

            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                btn.style.borderColor = '#9fb36d';
                btn.style.opacity = '1';
                contactForm.reset();

                // Revert button back after a few seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.borderColor = '';
                }, 3000);

            }, 1500);
        });
    }

    // 5. Scroll Animations (Intersection Observer)
    const timelineItems = document.querySelectorAll('.timeline-item');
    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tl-visible');
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => tlObserver.observe(item));

    const fadeElements = document.querySelectorAll('.animate-on-scroll');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px 50px 0px"
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 6. View Archive Toggling
    const viewArchiveBtn = document.getElementById('view-archive-btn');
    const archivedProjects = document.querySelectorAll('.archived-project');

    if (viewArchiveBtn && archivedProjects.length > 0) {
        let isArchiveVisible = false;

        viewArchiveBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump to top
            isArchiveVisible = !isArchiveVisible;

            archivedProjects.forEach(project => {
                if (isArchiveVisible) {
                    project.classList.add('show');
                } else {
                    project.classList.remove('show');
                }
            });

            if (isArchiveVisible) {
                viewArchiveBtn.innerHTML = 'HIDE ARCHIVE &nbsp;<i class="fa-solid fa-arrow-up"></i>';
            } else {
                viewArchiveBtn.innerHTML = 'VIEW ARCHIVE &nbsp;<i class="fa-solid fa-arrow-right"></i>';
            }
        });
    }

    // 7. Interactive Services Modal
    const modalData = {
        metro: {
            title: "Metro Rail & Tunneling Engineering",
            image: "Pune Metro Segment Transportation.png",
            desc: "We specialize in the complex engineering required for urban rapid transit systems. From deep tunnel excavation using TBMs to the structural development of multi-level underground stations, our expertise ensures timely delivery of critical metro corridors.",
            features: [
                { title: "TBM Excavation", text: "Precision tunneling using state-of-the-art Tunnel Boring Machines for dense urban environments." },
                { title: "Station Infrastructure", text: "Developing complex underground and elevated station structures with integrated civil works." },
                { title: "Precast Segment Casting", text: "High-volume production of precision-engineered concrete segment rings for tunnel lining." }
            ]
        },
        highway: {
            title: "Highway & Bridge Construction",
            image: "homeSlider/9th.png",
            desc: "Our primary expertise lies in the end-to-end execution of massive highway and bridge projects. We bring decades of engineering prowess to tackle challenging terrains, ensuring that every mile we lay is built for safety, efficiency, and longevity.",
            features: [
                { title: "Expressway Networks", text: "High-speed corridors designed with modern safety barriers and advanced drainage systems." },
                { title: "Long-Span Bridges", text: "Specialized cable-stayed and suspension bridges over major rivers and challenging valleys." },
                { title: "Smart Traffic Systems", text: "Integration of modern tolling, surveillance, and automated traffic management technology." }
            ]
        },
        aviation: {
            title: "Aviation Infrastructure",
            image: "Aviation_Infrastructure.png",
            desc: "Constructing an airport requires precision that leaves no room for error. We specialize in building commercial runways, rapid-exit taxiways, and sprawling terminal facilities that adhere strictly to international aviation standards (ICAO and FAA).",
            features: [
                { title: "Runway Construction", text: "High-grade polymer-modified bitumen layers for extreme load-bearing capacity and durability." },
                { title: "Terminal Buildings", text: "Energy-efficient structural steel terminals with modern aesthetics and passenger-centric design." },
                { title: "Airfield Lighting", text: "Complete installation of precision approach path indicators and modern airfield control systems." }
            ]
        },
        urban: {
            title: "Urban & Site Development",
            image: "STP Plant.png",
            desc: "Cities are the heart of human progress. We play a pivotal role in urban expansion by developing essential civil infrastructure, including massive storm-water systems, utility tunnels, and foundational work for smart cities.",
            features: [
                { title: "Utility Tunnels", text: "Highly integrated underground corridors for power, telecommunications, and city-wide water supply." },
                { title: "Industrial Yard Setup", text: "Design and execution of specialized casting yards for large-scale precast infrastructure components." },
                { title: "Commercial Foundations", text: "Heavy-duty deep foundation and piling work for mega-structures, skyscrapers, and urban malls." }
            ]
        }
    };

    const modalOverlay = document.getElementById('service-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body-content');

    // Select all buttons that trigger the modal (both services and projects)
    const learnMoreBtns = document.querySelectorAll('.learn-more.btn-link, .portfolio-action');

    // Open Modal
    if (modalOverlay && learnMoreBtns.length > 0) {
        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id');
                const data = modalData[id];

                if (data) {
                    // Update Title and Desc in the fixed header
                    const titleEl = document.getElementById('service-modal-title');
                    const descEl = document.getElementById('service-modal-desc');
                    if (titleEl) titleEl.innerText = data.title;
                    if (descEl) descEl.innerText = data.desc;

                    // Build features HTML
                    let featuresHtml = '';
                    data.features.forEach(feat => {
                        featuresHtml += `
                            <div class="modal-feature-item">
                                <div class="feat-dot"></div>
                                <div class="feat-info">
                                    <h4>${feat.title}</h4>
                                    <p>${feat.text}</p>
                                </div>
                            </div>
                        `;
                    });

                    // Inject Main Body (Image and Features Grid)
                    modalBody.innerHTML = `
                        <div class="service-modal-main">
                             <div class="service-image-wrap">
                                <img src="${data.image}" alt="${data.title}" class="modal-image">
                             </div>
                             <div class="service-competencies">
                                <h3 class="competency-title">CORE COMPETENCIES</h3>
                                <div class="modal-features-grid">
                                    ${featuresHtml}
                                </div>
                             </div>
                        </div>
                    `;

                    // Show modal
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close Modal functions
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            setTimeout(() => { modalBody.innerHTML = ''; }, 300); // Clear content after transition
        };

        modalCloseBtn.addEventListener('click', closeModal);

        // Close on clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 8. Pill Button Filter for Projects (JKumar Style)
    const pillContainer = document.getElementById('project-pills');
    const projectModal = document.getElementById("project-modal");
    const closeProjectBtn = document.getElementById("close-project-modal");
    const projectGallery = document.getElementById("modal-project-gallery");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    let currentGalleryImages = [];
    let currentLightboxIndex = 0;

    const closeModal = () => {
        if (projectModal) {
            projectModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    const openLightbox = (index) => {
        currentLightboxIndex = index;
        if (lb && lbImg) {
            lbImg.src = currentGalleryImages[currentLightboxIndex];
            lb.classList.add("active");
        }
    };

    if (pillContainer) {
        const pills = pillContainer.querySelectorAll('.filter-pill');
        const projectCards = Array.from(document.querySelectorAll('.pcard'));
        const showMoreBtnWrap = document.querySelector('.show-more-projects-wrap');
        const showMoreBtn = document.querySelector('.btn-show-more');

        let currentFilter = 'all';
        let isShowingAll = false;

        const filterProjects = (filter) => {
            currentFilter = filter;
            let matchCount = 0;

            projectCards.forEach((card) => {
                const sector = card.getAttribute('data-sector');
                const isMatch = (filter === 'all' || sector === filter);

                if (isMatch) {
                    matchCount++;
                    if (filter === 'all' && !isShowingAll && matchCount > 6) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'flex';
                        card.style.animation = 'none';
                        void card.offsetWidth;
                        card.style.animation = 'pcardFadeIn 0.5s ease forwards';
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            if (filter === 'all' && !isShowingAll && projectCards.length > 6) {
                if (showMoreBtnWrap) showMoreBtnWrap.style.display = 'flex';
            } else {
                if (showMoreBtnWrap) showMoreBtnWrap.style.display = 'none';
            }
        };

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const filter = pill.getAttribute('data-filter');
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                filterProjects(filter);
            });
        });

        filterProjects('all');

        if (showMoreBtn) {
            showMoreBtn.onclick = () => {
                isShowingAll = true;
                filterProjects(currentFilter);
            };
        }

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.pcard');
            if (card) {
                const title = card.getAttribute("data-title") || "Project Details";
                const desc = card.getAttribute("data-desc") || "";
                const mainImg = card.querySelector("img") ? card.querySelector("img").src : "";

                document.getElementById("modal-project-title").innerText = title;
                document.getElementById("modal-project-desc").innerText = desc;

                let galleryImages = [];
                const dataGallery = card.getAttribute("data-gallery");
                if (dataGallery) {
                    galleryImages = dataGallery.split(',').map(s => s.trim());
                } else {
                    galleryImages = [mainImg];
                }

                currentGalleryImages = galleryImages.filter(src => src && src !== "undefined");
                projectGallery.innerHTML = "";
                currentGalleryImages.forEach((src, index) => {
                    const item = document.createElement("div");
                    item.className = "gallery-item";
                    item.innerHTML = `<img src="${src}" alt="view ${index + 1}">`;
                    item.onclick = (ev) => {
                        ev.stopPropagation();
                        openLightbox(index);
                    };
                    projectGallery.appendChild(item);
                });

                projectModal.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    }

    if (closeProjectBtn) closeProjectBtn.onclick = closeModal;
    // --- Project Modal Functions ---
    const closePModal = () => {
        if (projectModal) {
            projectModal.classList.remove("active");
            document.body.style.overflow = "";
        }
    };

    if (closeProjectBtn) closeProjectBtn.onclick = closePModal;
    if (projectModal) {
        projectModal.onclick = (e) => {
            if (e.target.classList.contains('modal-overlay')) closePModal();
        };
    }

    // --- Lightbox Logic ---
    const lb = document.getElementById("lightbox");
    const lbClose = document.getElementById("lightbox-close");
    const lbPrev = document.getElementById("lightbox-prev");
    const lbNext = document.getElementById("lightbox-next");
    const lbImg = document.getElementById("lightbox-img");

    const closeLB = () => { if (lb) lb.classList.remove("active"); };
    const nextLB = (e) => {
        if (e) e.stopPropagation();
        if (currentGalleryImages.length > 0) {
            currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryImages.length;
            if (lbImg) lbImg.src = currentGalleryImages[currentLightboxIndex];
        }
    };
    const prevLB = (e) => {
        if (e) e.stopPropagation();
        if (currentGalleryImages.length > 0) {
            currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
            if (lbImg) lbImg.src = currentGalleryImages[currentLightboxIndex];
        }
    };

    if (lb) {
        if (lbClose) lbClose.onclick = closeLB;
        if (lbNext) lbNext.onclick = nextLB;
        if (lbPrev) lbPrev.onclick = prevLB;
        lb.onclick = (e) => { if (e.target === lb) closeLB(); };
    }

    document.addEventListener("keydown", (e) => {
        if (lb && lb.classList.contains("active")) {
            if (e.key === "Escape") closeLB();
            if (e.key === "ArrowRight") nextLB();
            if (e.key === "ArrowLeft") prevLB();
        }
    });

    // 10. Hero Image Slider (Horizontal Slide Effect)
    const slides = document.querySelectorAll('.hero-slide');
    const sliderTrack = document.getElementById('hero-slider-track');
    const dots = document.querySelectorAll('.hero-slider-dots .dot');

    if (slides.length && sliderTrack) {
        let currentSlide = 0;

        const updateSlider = (index) => {
            currentSlide = index;
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Sync dots
            if (dots.length) {
                dots.forEach(d => d.classList.remove('active'));
                dots[currentSlide].classList.add('active');
            }
        };

        const slideInterval = setInterval(() => {
            let next = (currentSlide + 1) % slides.length;
            updateSlider(next);
        }, 5000);

        // Dot clicks
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                updateSlider(i);
            });
        });
    }

    // 11. Mobile Touch Support - Simplified for full card click
    // Note: The main click listener on .pcard already handles both mobile and desktop.
    // Removed old touchstart preventDefault that was blocking modals.

});

/* ── Scripts for removed Map Section have been deleted to avoid errors ── */




const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);

    const res = await fetch(" https://formspree.io/f/xojkgrol", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (res.ok) {
        // alert("✅ Inquiry Submitted Successfully!");
        // form.reset();
    } else {
        alert("❌ Something went wrong!");
    }
});

/* ── Back To Top Button ── */
(function () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    // Show button after scrolling 400px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth scroll to top on click
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ── Timeline Scroll Animation ── */
(function () {
    const items = document.querySelectorAll('.timeline-item');
    if (!items.length) return;

    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Slight stagger delay based on position
                setTimeout(() => {
                    entry.target.classList.add('tl-visible');
                }, 100);
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => tlObserver.observe(item));
})();

/* ── Nav Dropdown — Mobile Accordion Toggle ── */
(function () {
    const dropdown = document.getElementById('nav-about-dropdown');
    if (!dropdown) return;

    const trigger = dropdown.querySelector('.nav-dropdown-trigger');

    trigger.addEventListener('click', function (e) {
        // Only act as accordion on mobile
        if (window.innerWidth <= 900) {
            e.preventDefault();
            dropdown.classList.toggle('mobile-open');
        }
    });

    // Close dropdown when any item inside is clicked
    dropdown.querySelectorAll('.nav-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            dropdown.classList.remove('mobile-open');
            // Also close the mobile nav
            const navLinks = document.querySelector('.nav-links');
            const menuIcon = document.querySelector('.mobile-menu-btn i');
            if (navLinks) navLinks.classList.remove('active');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
})();

/* ── Footer Project Link Filter Trigger ── */
(function () {
    const footerPillLinks = document.querySelectorAll('.footer-pill-link');
    footerPillLinks.forEach(link => {
        link.addEventListener('click', () => {
            const filter = link.getAttribute('data-filter');
            const targetPill = document.querySelector(`.filter-pill[data-filter="${filter}"]`);
            if (targetPill) targetPill.click();
        });
    });
})();
