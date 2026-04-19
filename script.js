// Toggling Skill Tabs

const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills-active');
        })

        target.classList.add('skills-active');

        tabs.forEach(tab => {
            tab.classList.remove('skills-active');
        })

        tab.classList.add('skills-active');
    })
})

//Mix it up Sorting

let mixerPortfolio = mixitup('.work-container', {
    selectors: {
        target: '.work-card'
    },
    animation: {
        duration: 300
    }
});

// Active link changing

const linkWork = document.querySelectorAll('.work-item');

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}
linkWork.forEach(l => l.addEventListener('click', activeWork));

//Portfolio Popup

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('work-button')){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open');
}

document.querySelector('.portfolio-popup-close').addEventListener('click', togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
    document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('.work-img').src;
    document.querySelector('.portfolio-popup-subtitle span').innerHTML = portfolioItem.querySelector('.work-title').innerHTML;
    document.querySelector('.portfolio-popup-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML;
}

//Services Popup
const modalViews = document.querySelectorAll('.services-modal');
const modelBtns = document.querySelectorAll('.services-button');
const modalCloses = document.querySelectorAll('.services-modal-close');

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal');
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
        })
    })
})

//Swiper Testimonial

let swiper = new Swiper(".testimonials-container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    speed: 800,
    autoplay: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

// Random auto-slide for testimonials
(function randomTestimonialSlide() {
    const delays = [2800, 3500, 4200, 2400, 3900];
    let i = 0;

    function slideToRandom() {
        const totalSlides = swiper.slides.length;
        const current = swiper.realIndex;
        let next;
        // Pick a random slide that isn't the current one
        do {
            next = Math.floor(Math.random() * totalSlides);
        } while (next === current);
        swiper.slideToLoop(next, 800);
        i = (i + 1) % delays.length;
        setTimeout(slideToRandom, delays[i]);
    }

    setTimeout(slideToRandom, delays[0]);
})();

// Dark / Light Mode Toggle

const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeIcon) { themeIcon.classList.replace('uil-sun', 'uil-moon'); }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('uil-sun', 'uil-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('uil-moon', 'uil-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Input Animation

const inputs = document.querySelectorAll('.input');

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add('focus');
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove('focus');
    }
}

inputs.forEach((input) => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
})

// Scroll Section Active Link

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    })
}

// Activating Sidebar

const navMenu = document.getElementById('sidebar');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function openSidebar() {
    navMenu.classList.add('show-sidebar');
    if (sidebarOverlay) sidebarOverlay.classList.add('show');
}

function closeSidebar() {
    navMenu.classList.remove('show-sidebar');
    if (sidebarOverlay) sidebarOverlay.classList.remove('show');
}

if(navToggle) {
    navToggle.addEventListener('click', openSidebar);
}

if(navClose) {
    navClose.addEventListener('click', closeSidebar);
}

// Close sidebar when tapping the overlay
if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when any nav link is tapped (mobile navigation)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeSidebar);
});

// Share Button
const btnShare = document.getElementById('btn-share');
if (btnShare) {
    btnShare.addEventListener('click', async () => {
        const shareData = {
            title: 'Iddris Rashid Swedi — Software Engineer & Graphic Designer',
            text: 'Check out my portfolio!',
            url: window.location.href
        };
        if (navigator.share) {
            try { await navigator.share(shareData); } catch (e) { /* user dismissed */ }
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                const icon = btnShare.querySelector('i');
                icon.classList.replace('uil-share-alt', 'uil-check');
                setTimeout(() => icon.classList.replace('uil-check', 'uil-share-alt'), 2000);
            });
        }
    });
}

// Contact Form (Web3Forms)
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const contactSubmit = document.getElementById('contact-submit');
const contactAccessKey = document.getElementById('contact-access-key');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (contactStatus) {
            contactStatus.textContent = 'Sending your message...';
            contactStatus.className = 'contact-status contact-status-loading';
        }

        if (contactSubmit) {
            contactSubmit.disabled = true;
            contactSubmit.setAttribute('aria-busy', 'true');
        }

        const formData = new FormData(contactForm);
        const rawAccessKey = contactAccessKey ? contactAccessKey.value : '';
        const accessKey = rawAccessKey.trim();
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!uuidPattern.test(accessKey)) {
            if (contactStatus) {
                contactStatus.textContent = 'Access key format is invalid. Paste the exact Web3Forms UUID key and try again.';
                contactStatus.className = 'contact-status contact-status-error';
            }
            if (contactSubmit) {
                contactSubmit.disabled = false;
                contactSubmit.removeAttribute('aria-busy');
            }
            return;
        }

        // Normalize key to avoid hidden whitespace issues from copy/paste.
        formData.set('access_key', accessKey);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || 'Form submission failed.');
            }

            if (contactStatus) {
                contactStatus.textContent = 'Message sent successfully. I will get back to you soon.';
                contactStatus.className = 'contact-status contact-status-success';
            }

            contactForm.reset();
            document.querySelectorAll('.input-container').forEach((container) => {
                container.classList.remove('focus');
            });
        } catch (error) {
            if (contactStatus) {
                contactStatus.textContent = error.message || 'Something went wrong while sending your message.';
                contactStatus.className = 'contact-status contact-status-error';
            }
        } finally {
            if (contactSubmit) {
                contactSubmit.disabled = false;
                contactSubmit.removeAttribute('aria-busy');
            }
        }
    });
}