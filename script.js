const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider img');
let currentSlide = 0;

function goToSlide(index) {
  currentSlide = index;
  slider.scrollTo({
    left: slider.clientWidth * currentSlide,
    behavior: 'smooth'
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

let autoSlide = setInterval(nextSlide, 3500);

slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
slider.addEventListener('mouseleave', () => {
  autoSlide = setInterval(nextSlide, 3500);
});

document.querySelectorAll('.slider-nav a').forEach((dot, index) => {
  dot.addEventListener('click', (e) => {
    e.preventDefault(); // stop the anchor's default jump behavior
    goToSlide(index);
  });
});




