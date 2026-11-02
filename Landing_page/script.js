/**
 * NovaFlow Landing Page - Interactive JavaScript
 * Implements:
 * - Theme Switcher (Dark/Light mode with localStorage persistence)
 * - Mobile Navigation Menu Toggle & Outside Click Handler
 * - Sticky Navbar Shadow on Scroll
 * - Tabbed Product Showcase Switcher
 * - Pricing Billing Toggle (Monthly vs Annual recalculation)
 * - Animated Numbers Counter with IntersectionObserver
 * - Accessible FAQ Accordion
 * - Interactive Modal Video Preview
 * - Newsletter Form Validation & Feedback
 * - Scroll to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC COPYRIGHT YEAR
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. THEME TOGGLE (Dark / Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('novaflow-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (!prefersDark) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('novaflow-theme', newTheme);
    });
  }

  // 3. STICKY NAVBAR SCROLL EFFECT
  const navbar = document.getElementById('navbar');
  const scrollToTopBtn = document.getElementById('scrollToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar style
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll-to-top button visibility
    if (scrollToTopBtn) {
      if (scrollY > 450) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-actions a');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 5. INTERACTIVE SHOWCASE TABS
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Update pane states
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
      });
      const targetPane = document.getElementById(`pane-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 6. PRICING BILLING SWITCHER (Monthly vs Annual)
  const billingToggle = document.getElementById('billingToggle');
  const monthlyLabel = document.querySelector('.billing-label.monthly');
  const annualLabel = document.querySelector('.billing-label.annual');
  const priceElements = document.querySelectorAll('.price-val');
  const annualNote = document.getElementById('annualNote');

  let isAnnual = false;

  function updatePricing() {
    if (billingToggle) {
      if (isAnnual) {
        billingToggle.classList.add('annual');
        if (monthlyLabel) monthlyLabel.classList.remove('active');
        if (annualLabel) annualLabel.classList.add('active');
        if (annualNote) annualNote.textContent = 'Billed annually (Save $60/yr)';
      } else {
        billingToggle.classList.remove('annual');
        if (monthlyLabel) monthlyLabel.classList.add('active');
        if (annualLabel) annualLabel.classList.remove('active');
        if (annualNote) annualNote.textContent = 'Billed monthly';
      }
    }

    priceElements.forEach(priceEl => {
      const monthlyPrice = priceEl.getAttribute('data-monthly');
      const annualPrice = priceEl.getAttribute('data-annual');
      priceEl.textContent = isAnnual ? annualPrice : monthlyPrice;
    });
  }

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      isAnnual = !isAnnual;
      updatePricing();
    });
  }

  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => {
      isAnnual = false;
      updatePricing();
    });
  }

  if (annualLabel) {
    annualLabel.addEventListener('click', () => {
      isAnnual = true;
      updatePricing();
    });
  }

  // 7. FAQ ACCORDION
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.accordion-trigger');
          if (otherTrigger) {
            otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked item
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 8. ANIMATED METRICS COUNTER (Intersection Observer)
  const metricNumbers = document.querySelectorAll('.metric-number');
  let metricsAnimated = false;

  function animateCounters() {
    metricNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const span = el.querySelector('span');
      const suffix = span ? span.outerHTML : '';
      let current = 0;
      const step = Math.ceil(target / 40);
      const intervalTime = 30;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.innerHTML = `${current}${suffix}`;
      }, intervalTime);
    });
  }

  const metricsSection = document.getElementById('metrics');
  if (metricsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !metricsAnimated) {
          metricsAnimated = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(metricsSection);
  }

  // 9. DEMO MODAL POPUP
  const demoButton = document.getElementById('demoButton');
  const demoModal = document.getElementById('demoModal');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  function openModal() {
    if (demoModal) {
      demoModal.classList.add('active');
      demoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (demoModal) {
      demoModal.classList.remove('active');
      demoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (demoButton) demoButton.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 10. NEWSLETTER & CTA FORM VALIDATION
  const newsletterForm = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const formFeedback = document.getElementById('formFeedback');

  if (newsletterForm && emailInput && formFeedback) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      // Simple regex for email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        formFeedback.textContent = 'Please enter your work email.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      if (!emailRegex.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.className = 'form-feedback error';
        return;
      }

      // Success simulation
      formFeedback.textContent = `🎉 Welcome aboard! A trial invitation has been sent to ${email}.`;
      formFeedback.className = 'form-feedback success';
      emailInput.value = '';

      setTimeout(() => {
        formFeedback.textContent = '';
      }, 7000);
    });
  }
});

