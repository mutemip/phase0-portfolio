// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections    = document.querySelectorAll('section[id]');
const navAnchors  = document.querySelectorAll('#nav-links a');

function setActiveLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
            navAnchors.forEach(a => a.classList.remove('active'));
            const match = document.querySelector(`#nav-links a[href="#${id}"]`);
            if (match) match.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===== CONTACT FORM (Formspree) =====
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn  = contactForm.querySelector('button[type="submit"]');
        const origHtml   = submitBtn.innerHTML;

        submitBtn.innerHTML  = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled   = true;
        formStatus.textContent = '';

        try {
            const response = await fetch(contactForm.action, {
                method:  'POST',
                body:    new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                formStatus.textContent = '✓ Message sent. I\'ll get back to you shortly.';
                formStatus.style.color = '#00ff41';
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    throw new Error(data.errors.map(err => err.message).join(', '));
                }
                throw new Error('Submission failed');
            }
        } catch (err) {
            formStatus.textContent = '✗ Could not send. Email me directly: laupmutemi@gmail.com';
            formStatus.style.color = '#ff00aa';
        } finally {
            submitBtn.innerHTML = origHtml;
            submitBtn.disabled  = false;
        }
    });
}
