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

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
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
        threshold: 0.01,
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
            image: "https://p1.pxfuel.com/preview/261/12/379/airport-runway-tarmac-plane.jpg",
            desc: "Constructing an airport requires precision that leaves no room for error. We specialize in building commercial runways, rapid-exit taxiways, and sprawling terminal facilities that adhere strictly to international aviation standards (ICAO and FAA).",
            features: [
                { title: "Runway Construction", text: "High-grade polymer-modified bitumen layers for extreme load-bearing capacity and durability." },
                { title: "Terminal Buildings", text: "Energy-efficient structural steel terminals with modern aesthetics and passenger-centric design." },
                { title: "Airfield Lighting", text: "Complete installation of precision approach path indicators and modern airfield control systems." }
            ]
        },
        urban: {
            title: "Urban & Site Development",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
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
                    if(titleEl) titleEl.innerText = data.title;
                    if(descEl) descEl.innerText = data.desc;

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
    if (pillContainer) {
        const pills = pillContainer.querySelectorAll('.filter-pill');
        const projectCards = document.querySelectorAll('.pcard');
        const noProjectsMsg = document.getElementById('no-projects-msg');

        // Filter functionality
        const filterProjects = (filter) => {
            let visibleCount = 0;
            projectCards.forEach((card, index) => {
                // Remove hidden class if used previously for pagination
                card.classList.remove('hidden-by-show-more'); 
                
                const sector = card.getAttribute('data-sector');
                const isMatch = filter === 'all' || sector === filter;

                if (isMatch) {
                    card.style.display = 'flex';
                    // Trigger a small entry animation
                    card.style.animation = 'none';
                    void card.offsetWidth; // force reflow
                    card.style.animation = 'pcardFadeIn 0.5s ease forwards';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Handle no results
            if (noProjectsMsg) {
                noProjectsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        };

        // Initialize filtering based on current active item
        const activeItem = pillContainer.querySelector('.filter-pill.active');
        if (activeItem) {
            const initialFilter = activeItem.getAttribute('data-filter');
            filterProjects(initialFilter);
        }

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                const filter = pill.getAttribute('data-filter');

                // Update UI
                pills.forEach(i => i.classList.remove('active'));
                pill.classList.add('active');

                // Filter logic
                filterProjects(filter);
            });
        });

        // Mobile override: Default to "airport" if on small screen
        if (pillContainer && window.innerWidth <= 768) {
            const airportPill = pillContainer.querySelector('.filter-pill[data-filter="airport"]');
            if (airportPill) {
                pills.forEach(i => i.classList.remove('active'));
                airportPill.classList.add('active');
                filterProjects('airport');
            }
        }

        // Simple Show More handler
        const showMoreBtn = document.getElementById('show-more-projects');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                showMoreBtn.innerText = "All Projects Loaded";
                showMoreBtn.classList.add('disabled');
                showMoreBtn.style.opacity = '0.5';
            });
        }
    }
    // 9. Modern Project Modal & Lightbox Logic
    const projectModal = document.getElementById("project-modal");
    const closeProjectBtn = document.getElementById("close-project-modal");
    const projectGallery = document.getElementById("modal-project-gallery");
    const viewButtons = document.querySelectorAll(".pcard");

    // Lightbox Elements
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentGalleryImages = [];
    let currentLightboxIndex = 0;

    if (projectModal && viewButtons.length > 0) {

        viewButtons.forEach(card => {
            card.addEventListener("click", (e) => {
                // Extract data from card attributes
                const title = card.getAttribute("data-title") || "Project Details";
                const desc = card.getAttribute("data-desc") || "";
                const mainImg = card.querySelector("img") ? card.querySelector("img").src : "";
                
                // Set Header Content
                document.getElementById("modal-project-title").innerText = title;
                document.getElementById("modal-project-desc").innerText = desc;

                // Generate Gallery images
                let galleryImages = [];
                const dataGallery = card.getAttribute("data-gallery");
                
                if (dataGallery) {
                    galleryImages = dataGallery.split(',').map(s => s.trim());
                } else {
                    // Fallback to default project-specific mock gallery for demonstration
                    galleryImages = [
                        mainImg,
                        "Lucknow Metro Civil Works.png",
                        "Pune Metro Finishing Works.png",
                        "Pune Metro Segment Transportation.png",
                        "Lucknow Metro Casting Yard.png",
                        "GMLR.png",
                        "airport.png",
                        "STP Plant.png"
                    ];
                }

                currentGalleryImages = galleryImages.filter(src => src && src !== "undefined");

                // Clear and Populate Gallery
                projectGallery.innerHTML = "";
                currentGalleryImages.forEach((src, index) => {
                    const item = document.createElement("div");
                    item.className = "gallery-item animate-on-scroll is-visible";
                    item.innerHTML = `<img src="${src}" alt="${title} view ${index + 1}" loading="lazy">`;
                    item.addEventListener("click", (e) => {
                        e.stopPropagation();
                        openLightbox(index);
                    });
                    projectGallery.appendChild(item);
                });

                // Open modal
                projectModal.classList.add("active");
                document.body.style.overflow = "hidden"; // Prevent scroll
            });
        });

        // Close logic
        const closeModal = () => {
            projectModal.classList.remove("active");
            document.body.style.overflow = "";
        };

        if (closeProjectBtn) closeProjectBtn.addEventListener("click", closeModal);

        projectModal.addEventListener("click", (e) => {
            if (e.target.classList.contains('modal-overlay')) closeModal();
        });
    }

    // Lightbox Functionality
    function openLightbox(index) {
        currentLightboxIndex = index;
        updateLightbox();
        lightbox.classList.add("active");
    }

    function updateLightbox() {
        const src = currentGalleryImages[currentLightboxIndex];
        lightboxImg.src = src;
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    function nextLightbox(e) {
        if(e) e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryImages.length;
        updateLightbox();
    }

    function prevLightbox(e) {
        if(e) e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        updateLightbox();
    }

    if (lightbox) {
        lightboxClose.addEventListener("click", closeLightbox);
        lightboxNext.addEventListener("click", nextLightbox);
        lightboxPrev.addEventListener("click", prevLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content')) closeLightbox();
        });

        // Key listeners for Lightbox
        document.addEventListener("keydown", (e) => {
            if (!lightbox.classList.contains("active")) return;
            
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextLightbox();
            if (e.key === "ArrowLeft") prevLightbox();
        });
    }

    // Global ESC handler (ensures closing right thing)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (lightbox && lightbox.classList.contains("active")) {
                closeLightbox();
            } else if (projectModal && projectModal.classList.contains("active")) {
                closeModal();
            }
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

    // 11. Mobile Touch Support for Project Card Overlays
    const isTouchDevice = () => window.matchMedia('(hover: none)').matches;
    if (isTouchDevice()) {
        const allPcards = document.querySelectorAll('.pcard');
        let currentlyOpenCard = null;

        allPcards.forEach(card => {
            const imageArea = card.querySelector('.pcard-image');
            if (imageArea) {
                imageArea.addEventListener('touchstart', (e) => {
                    if (e.target.closest('.view-details-btn')) return;
                    e.preventDefault();
                    if (currentlyOpenCard && currentlyOpenCard !== card) {
                        currentlyOpenCard.classList.remove('touch-active');
                    }
                    card.classList.toggle('touch-active');
                    currentlyOpenCard = card.classList.contains('touch-active') ? card : null;
                }, { passive: false });
            }
        });

        document.addEventListener('touchstart', (e) => {
            if (!e.target.closest('.pcard') && currentlyOpenCard) {
                currentlyOpenCard.classList.remove('touch-active');
                currentlyOpenCard = null;
            }
        });
    }
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
        alert("✅ Inquiry Submitted Successfully!");
        form.reset();
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
