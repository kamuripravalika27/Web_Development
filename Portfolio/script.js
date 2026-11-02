/**
 * ============================================================================
 * KAMURI PRAVALIKA - PORTFOLIO INTERACTIVITY SCRIPT
 * Handles Dark/Light Mode, Mobile Navigation, ScrollSpy, Project Filtering,
 * and Contact Form Submission.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (DARK / LIGHT MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Apply saved theme or system preference
  if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  /* --------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER
     -------------------------------------------------------------------------- */
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  const openMobileMenu = () => {
    navMenu.classList.add('open');
    navBackdrop.classList.add('open');
    navToggleBtn.classList.add('open');
    navToggleBtn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    navBackdrop.classList.remove('open');
    navToggleBtn.classList.remove('open');
    navToggleBtn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  };

  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* --------------------------------------------------------------------------
     3. HEADER SCROLL & BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScrollEffects = () => {
    const scrollY = window.scrollY;

    // Header shadow/shrink
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });

  /* --------------------------------------------------------------------------
     4. SCROLLSPY (ACTIVE NAVIGATION LINK)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY + 120; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const matchingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          matchingNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* --------------------------------------------------------------------------
     5. PROJECT CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     6. CONTACT FORM VALIDATION & SUBMISSION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateField = (input, errorId, condition) => {
      const formGroup = input.closest('.form-group');
      if (condition) {
        formGroup.classList.remove('has-error');
        return true;
      } else {
        formGroup.classList.add('has-error');
        return false;
      }
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const isNameValid = validateField(nameInput, 'name-error', nameInput.value.trim().length > 1);
      const isEmailValid = validateField(emailInput, 'email-error', validateEmail(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, 'subject-error', subjectInput.value.trim().length > 1);
      const isMessageValid = validateField(messageInput, 'message-error', messageInput.value.trim().length > 5);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Simulate sending state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span class="btn-text">Send Message</span> <i class="fas fa-paper-plane btn-icon"></i>';

          // Show success banner
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
          formAlert.style.display = 'block';

          // Reset inputs
          contactForm.reset();

          // Hide message after 6 seconds
          setTimeout(() => {
            formAlert.style.display = 'none';
          }, 6000);
        }, 1200);
      } else {
        // Show validation warning
        formAlert.className = 'form-alert error';
        formAlert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please correct the highlighted errors before submitting.';
        formAlert.style.display = 'block';
      }
    });

    // Realtime error removal on input
    ['contact-name', 'contact-email', 'contact-subject', 'contact-message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => {
          const formGroup = input.closest('.form-group');
          if (formGroup && formGroup.classList.contains('has-error')) {
            formGroup.classList.remove('has-error');
            if (formAlert) formAlert.style.display = 'none';
          }
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     8. ANIMATE SKILL PROGRESS BARS ON SCROLL
     -------------------------------------------------------------------------- */
  const skillsSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.skill-progress');

  if (skillsSection && progressBars.length > 0) {
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          progressBars.forEach(bar => {
            const targetWidth = bar.style.getPropertyValue('--target-width') || '85%';
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = targetWidth;
            }, 100);
          });
          animated = true;
        }
      });
    }, { threshold: 0.25 });

    observer.observe(skillsSection);
  }
});

