const carousel = document.querySelector('.demo-carousel');
const inner = carousel.querySelector('.carousel-inner');
const items = carousel.querySelectorAll('.carousel-item');
const prevBtn = carousel.querySelector('.prev');
const nextBtn = carousel.querySelector('.next');
const dotsContainer = carousel.querySelector('.carousel-dots');
let currentIndex = 0;

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

function createDots() {
    items.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot', 'h-3', 'w-3', 'bg-gray-500', 'rounded-full', 'mx-1', 'cursor-pointer');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
    });
    updateDots();
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-blue-400', i === currentIndex);
        dot.classList.toggle('bg-gray-500', i !== currentIndex);
    });
}



prevBtn.addEventListener('click', () => {
    showSlide('prev');
});

nextBtn.addEventListener('click', () => {
    showSlide('next');
});

dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
        currentIndex = parseInt(e.target.dataset.index);
        updateCarousel();
    }
});

let touchStartX = 0;
carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) showSlide('next');
    if (touchEndX - touchStartX > 50) showSlide('prev');
});


createDots();
updateCarousel();