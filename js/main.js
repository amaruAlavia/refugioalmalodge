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
