// ── About slider ──────────────────────────────────────────
const aboutSlider = document.querySelector('.slider');

if (aboutSlider) {
  const slides = document.querySelectorAll('.slider img');
  let currentSlide = 0;

  function goToSlide(index) {
    currentSlide = index;
    aboutSlider.scrollTo({
      left: aboutSlider.clientWidth * currentSlide,
      behavior: 'smooth'
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }

  let autoSlide = setInterval(nextSlide, 3500);

  aboutSlider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  aboutSlider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3500);
  });

  document.querySelectorAll('.slider-nav a').forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      goToSlide(index);
    });
  });
}

// ── Listings Swiper ────────────────────────────────────────
const listingsSwiperEl = document.querySelector('.container-listing');
if (listingsSwiperEl) {
  const isDetailPage = document.body.classList.contains('detail-body');

  new Swiper('.container-listing', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    focusable: false,
    keyboard: { enabled: true },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: isDetailPage ? {} : {
      480:  { slidesPerView: 1.5 },
      768:  { slidesPerView: 2.5 },
      1024: { slidesPerView: 3.2 },
      1280: { slidesPerView: 4 },
    }
  });

  document.querySelectorAll('.swiper-button-prev, .swiper-button-next').forEach(btn => {
    btn.setAttribute('tabindex', '-1');
    btn.addEventListener('mousedown', e => e.preventDefault());
  });
}

// ── Contact form submission ───────────────────────────────
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const sendButton = document.querySelector('#send-btn');

if (contactForm && formStatus && sendButton) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const originalText = sendButton.textContent;
    sendButton.disabled = true;
    sendButton.textContent = 'Enviando...';
    formStatus.textContent = 'Enviando tu mensaje...';
    formStatus.className = 'form-status loading';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        formStatus.textContent = 'Tu mensaje fue enviado. Gracias por contactarnos.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      formStatus.textContent = 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.';
      formStatus.className = 'form-status error';
    } finally {
      sendButton.disabled = false;
      sendButton.textContent = originalText;
    }
  });
}

// ── Reveal on scroll ───────────────────────────────────────
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));