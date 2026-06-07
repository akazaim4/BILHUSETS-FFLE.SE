document.addEventListener("DOMContentLoaded", () => {

    // 1. Preloader
    const preloader = document.querySelector(".preloader");
    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.style.display = "none", 600);
        }, 400);
    });

    // Fallback if load event doesn't fire fast enough
    setTimeout(() => {
        if(preloader) preloader.style.display = "none";
    }, 2500);

    // 2. Mobilmeny (Hamburger-funktion)
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // 3. Ändra Navbar vid Scroll
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 4. Scroll-Reveal Animationer
    const revealItems = document.querySelectorAll(".scroll-reveal");
    const revealOnScroll = () => {
        revealItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.88) {
                item.classList.add("active");
            }
        });
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Kör en gång direkt ifall element redan är synliga

    // 5. Animerade Räknare (Stats-räknare)
    const stats = document.querySelectorAll(".stat-number");
    let started = false;

    const startCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute("data-target"));
            const count = () => {
                const current = parseInt(stat.innerText);
                const increment = target / 50; 
                if (current < target) {
                    stat.innerText = Math.ceil(current + increment);
                    setTimeout(count, 30);
                } else {
                    stat.innerText = target + (stat.getAttribute("data-target") === "99" ? "%" : "+");
                }
            };
            count();
        });
    };

    // Trigger räknare när sektionen blir synlig
    const statsSection = document.querySelector(".stats-section");
    window.addEventListener("scroll", () => {
        if(statsSection) {
            const rect = statsSection.getBoundingClientRect();
            if(rect.top < window.innerHeight && !started) {
                startCounters();
                started = true;
            }
        }
    });

    // 6. Lightbox för Bildgalleriet
    const galleryItems = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.querySelector(".lightbox-close");

    galleryItems.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    lightboxClose.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if(e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    });
});