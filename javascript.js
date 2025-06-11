document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.demo-carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let currentIndex = 0;
    let autoSlide;

    function updateCarousel() {
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === currentIndex) {
                item.classList.add('active');
                item.style.opacity = '1';
                item.style.transform = 'translateX(0) scale(1)';
                item.style.zIndex = '10';
            } else {
                item.style.opacity = '0';
                item.style.transform = `translateX(${(i - currentIndex) * 100}%) scale(0.8)`;
                item.style.zIndex = '1';
            }
        });
        updateDots();
    }

    function showSlide(direction) {
        currentIndex = direction === 'next'
            ? (currentIndex + 1) % items.length
            : (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function createDots() {
        items.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Navigation buttons
    prevBtn.addEventListener('click', () => showSlide('prev'));
    nextBtn.addEventListener('click', () => showSlide('next'));

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) showSlide('next');
        if (touchEndX - touchStartX > 50) showSlide('prev');
    });

    // Auto-slide every 5 seconds
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            showSlide('next');
        }, 5000);
    }

    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
    carousel.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    createDots();
    updateCarousel();
    startAutoSlide();
});