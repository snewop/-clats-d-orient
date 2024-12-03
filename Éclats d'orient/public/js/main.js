// Gestion du menu hamburger avec optimisation des performances
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // Utilisation de requestAnimationFrame pour les animations
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        requestAnimationFrame(() => {
            hamburger.classList.toggle('active', isMenuOpen);
            navLinks.classList.toggle('active', isMenuOpen);
        });
    }

    hamburger.addEventListener('click', toggleMenu);

    // Gestion optimisée des clics sur les liens
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                requestAnimationFrame(() => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            }
        });
    });
});
