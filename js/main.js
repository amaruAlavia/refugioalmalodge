// Cambio de color al hacer scroll
const nav = document.getElementById("awasiNav");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Menú móvil
const toggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        toggle.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            toggle.classList.remove("active");
        });
    });
}

// Hero Slideshow
const heroSlideshow = document.getElementById("heroSlideshow");
if (heroSlideshow) {
    const images = heroSlideshow.querySelectorAll("img");
    let currentIndex = 0;
    const intervalTime = 5000; // 5 seconds

    setInterval(() => {
        // Remove active class from current image
        images[currentIndex].classList.remove("active");

        // Calculate next index
        currentIndex = (currentIndex + 1) % images.length;

        // Add active class to next image
        images[currentIndex].classList.add("active");
    }, intervalTime);
}

// Section Scroll Animation
const sections = document.querySelectorAll("section:not(#nosotros)");
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);


sections.forEach(section => {
    observer.observe(section);
});

// ScrollReveal for Nosotros section
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
});

if (document.getElementById('nosotros')) {
    sr.reveal('.about-image', {
        origin: 'left',
        distance: '120px',
        duration: 1400,
        opacity: 0,
        scale: 0.85
    });

    sr.reveal('.about-content', {
        origin: 'right',
        distance: '60px',
        duration: 1400,
        delay: 400
    });

    sr.reveal('.about-highlight', {
        origin: 'bottom',
        delay: 800,
        scale: 0.9,
        duration: 1500
    });
}

// ScrollReveal for Tours
if (document.querySelector('.tour-card')) {
    sr.reveal('.tour-card', {
        interval: 200,
        origin: 'bottom',
        distance: '50px',
        duration: 1200,
        viewFactor: 0.2
    });
}

// Audio Control
const audio = document.getElementById("heroAudio");
const audioBtn = document.getElementById("audioControl");
const iconPlay = audioBtn ? audioBtn.querySelector(".icon-play") : null;
const iconPause = audioBtn ? audioBtn.querySelector(".icon-pause") : null;

if (audio && audioBtn && iconPlay && iconPause) {
    // Set default volume to 40%
    audio.volume = 0.4;

    // Function to update icons based on state
    const updateIcons = () => {
        if (audio.paused) {
            iconPlay.style.display = "block";
            iconPause.style.display = "none";
        } else {
            iconPlay.style.display = "none";
            iconPause.style.display = "block";
        }
    };

    // Try to play on load (handling autoplay restrictions)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Autoplay started!
            updateIcons();
        }).catch(error => {
            // Autoplay was prevented.
            // Show play button so user can start playback.
            console.log("Autoplay prevented:", error);
            updateIcons();
        });
    }

    audioBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                updateIcons();
            }).catch(error => {
                console.error("Audio play failed:", error);
            });
        } else {
            audio.pause();
            updateIcons();
        }
    });
}

// Refugios Carousel (Index) - Auto Rotation
const refugiosCarousel = document.getElementById('refugiosCarousel');
if (refugiosCarousel) {
    const images = refugiosCarousel.querySelectorAll('img');
    let currentIndex = 0;
    const intervalTime = 2000; // 2 seconds

    setInterval(() => {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');

        // Calculate next index
        currentIndex = (currentIndex + 1) % images.length;

        // Add active class to next image
        images[currentIndex].classList.add('active');
    }, intervalTime);
}

// Internal Carousels (Refugios Page)
const internalCarousels = document.querySelectorAll('.carousel');

internalCarousels.forEach(carousel => {
    // Only run if this carousel has a track (to avoid errors if structure differs)
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;

    const images = track.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    if (!images.length) return;

    function scrollToImage(index) {
        const imageWidth = track.clientWidth; // Use track width for reliability
        track.scrollTo({
            left: index * imageWidth,
            behavior: 'smooth'
        });
    }

    // Button Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const imageWidth = track.clientWidth;
            const currentScroll = track.scrollLeft;
            const currentIndex = Math.round(currentScroll / imageWidth);
            const newIndex = Math.max(0, currentIndex - 1);
            scrollToImage(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const imageWidth = track.clientWidth;
            const currentScroll = track.scrollLeft;
            const currentIndex = Math.round(currentScroll / imageWidth);
            const newIndex = Math.min(images.length - 1, currentIndex + 1);
            scrollToImage(newIndex);
        });
    }
});
