// script.js - Navbar blur logic function
function initializeNavbar() {
    console.log("Initializing navbar...");
    const navbar = document.getElementById("main-navbar");

    if (!navbar) {
        console.error("Failed to find #main-navbar element for initialization.");
        return;
    }

    let scrolled = false;
    let ticking = false;

    function handleScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY || document.documentElement.scrollTop;
    
          if (currentScroll > 10 && !scrolled) {
            navbar.classList.add("navbar-solid");
            scrolled = true;
          } else if (currentScroll <= 10 && scrolled) {
            navbar.classList.remove("navbar-solid");
            scrolled = false;
          }
          ticking = false;
        });
        ticking = true;
      }
    }
    
    // Initial check in case page loads already scrolled
    handleScroll();
    
    // Event listener for scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    console.log("Navbar initialized successfully.");
}


// --- Scroll to Top Button Logic ---
function initializeScrollToTop() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    console.log("Attempting to initialize scroll-to-top button...");

    if (!scrollTopBtn) {
        console.log("Scroll-to-top button NOT FOUND on this page. Initialization skipped.");
        return;
    }
    
    console.log("Scroll-to-top button FOUND:", scrollTopBtn);

    const scrollThreshold = 300;

    const handleVisibility = () => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > scrollThreshold) {
            if (!scrollTopBtn.classList.contains('visible')) {
                scrollTopBtn.classList.add('visible');
            }
        } else {
            if (scrollTopBtn.classList.contains('visible')) {
                scrollTopBtn.classList.remove('visible');
            }
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', handleVisibility);
    scrollTopBtn.addEventListener('click', scrollToTop);
    
    console.log("Scroll-to-top button initialized successfully.");
    handleVisibility();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded. Running initializers.");
    initializeScrollToTop();
    initializeScrollAnimations();
});

// --- On-Scroll Animation Logic ---
function initializeScrollAnimations() {
    const targets = document.querySelectorAll('.animate-on-scroll');
    console.log(`Found ${targets.length} elements to animate on scroll.`);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Element is intersecting, adding .is-visible:", entry.target);
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    targets.forEach(target => {
        observer.observe(target);
    });
}