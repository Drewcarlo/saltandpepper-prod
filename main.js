// =============================================
// SALT & PEPPER PRODUCTIONS — main.js
// =============================================

// --- NAV SCROLL EFFECT ---
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// --- MOBILE MENU TOGGLE ---
function toggleMenu() {
  const left = document.querySelector('.nav-links--left');
  const right = document.querySelector('.nav-links--right');
  if (left) left.classList.toggle('open');
  if (right) right.classList.toggle('open');
}

// Close menu on link click
document.querySelectorAll('.nav-links--left a, .nav-links--right a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-links--left, .nav-links--right').forEach(l => l.classList.remove('open'));
  });
});

// --- SCROLL REVEAL ---
const reveals = document.querySelectorAll(
  '.about-inner, .about-text, .about-image-wrap, .feat-card, .video-card, ' +
  '.service-item, .process-step, .contact-form-wrap, .contact-info, .stat'
);

reveals.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => observer.observe(el));

// --- GALLERY FILTER ---
function filterVideos(category, btn) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Show/hide cards
  document.querySelectorAll('.video-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.style.display = match ? '' : 'none';
    // Re-trigger reveal for visible cards
    if (match) {
      card.classList.remove('visible');
      setTimeout(() => card.classList.add('visible'), 50);
    }
  });
}

// --- CONTACT FORM SUBMIT ---
emailjs.init({
  publicKey: "ryUWC_1UjGNjw5owq"
});

const contactForm = document.getElementById('contact-form');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const templateParams = {

      from_name:
        document.getElementById('fname').value +
        ' ' +
        document.getElementById('lname').value,

      from_email:
        document.getElementById('email').value,

      phone:
        document.getElementById('phone').value,

      service:
        document.getElementById('service').value,

      message:
        document.getElementById('message').value

    };
    emailjs.send(
  'service_k1yen7s',
  'template_8hnplyf',
  templateParams
)

    .then(function () {

      const success = document.getElementById('form-success');

      contactForm.classList.add('hidden');
      success.classList.add('visible');

      window.scrollTo({
        top: success.offsetTop - 120,
        behavior: 'smooth'
      });

    })

    .catch(function (error) {

      alert(
        'Sorry, something went wrong. Please try again.'
      );

      console.error(error);

    })

    .finally(function () {

      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';

    });

  });

}
