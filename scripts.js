document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation & Menu ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const navbar = document.getElementById('navbar');

    function openMenu() {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Form Validation (Basic) ---
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation simulation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name && email) {
                alert(`Thank you, ${name}. Your request for ${document.getElementById('destination').value} has been received. We will contact you at ${email} shortly.`);
                bookingForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // --- Parallax Effect for Hero (Simple) ---
    const heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.5}px)`;
        }
    });

});
