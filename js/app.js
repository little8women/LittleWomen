document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileMenu();
  initHeroParallax();
  initPortfolioFilters();
  initBeforeAfterSlider();
  initProcessTimeline();
  initScrollAnimations();
  initStatsCounter();
  initTestimonialsCarousel();
  initFaqAccordion();
  initContactForm();
});

/* ==========================================================================
   PRELOADER
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Let loading animation complete, then slide up preloader
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000);
    }, 1200);
  });

  // Fallback in case load event takes too long
  setTimeout(() => {
    if (preloader.style.display !== 'none') {
      preloader.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000);
    }
  }, 4000);
}

/* ==========================================================================
   STICKY HEADER & SCROLL SPY
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (!header) return;

  // Sticky behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy navigation highlights
    let current = '';
    const scrollPosition = window.scrollY + 150; // offset for triggers

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('mobile-navigation');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = toggle.querySelectorAll('span');
    if (toggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

window.toggleMobileMenu = function() {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('mobile-navigation');
  if (toggle && nav) {
    nav.classList.remove('active');
    toggle.classList.remove('active');
    const spans = toggle.querySelectorAll('span');
    spans.forEach(span => span.style.transform = 'none');
    spans[1].style.opacity = '1';
  }
};

/* ==========================================================================
   HERO PARALLAX
   ========================================================================== */
function initHeroParallax() {
  const heroBg = document.getElementById('hero-bg-img');
  if (!heroBg) return;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    // Slow transition parallax
    heroBg.style.transform = `translateY(${scrollPosition * 0.4}px)`;
  });
}

/* ==========================================================================
   PORTFOLIO FILTERS
   ========================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter portfolio items
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400); // match CSS transitions
        }
      });
    });
  });
}

/* ==========================================================================
   BEFORE & AFTER DRAG SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('compare-slider-container');
  const afterImg = document.getElementById('compare-after-img');
  const dragHandle = document.getElementById('compare-drag-handle');

  if (!container || !afterImg || !dragHandle) return;

  let active = false;

  // Handle pointer down events
  const startDrag = () => {
    active = true;
  };

  const endDrag = () => {
    active = false;
  };

  const drag = (e) => {
    if (!active) return;
    
    // Normalize coordinates (touch vs mouse)
    const xCoord = e.pageX || (e.touches && e.touches[0].pageX);
    const bounds = container.getBoundingClientRect();
    let relativeX = xCoord - bounds.left;
    
    // Limit horizontal range between 0 and slider width
    if (relativeX < 0) relativeX = 0;
    if (relativeX > bounds.width) relativeX = bounds.width;

    const percentage = (relativeX / bounds.width) * 100;
    
    // Update widths and handle positioning
    afterImg.style.width = `${percentage}%`;
    dragHandle.style.left = `${percentage}%`;
  };

  // Mouse Listeners
  dragHandle.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('mousemove', drag);

  // Touch Listeners (Mobile compatibility)
  dragHandle.addEventListener('touchstart', startDrag);
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchmove', drag);
}

/* ==========================================================================
   PROCESS TIMELINE
   ========================================================================== */
function initProcessTimeline() {
  const steps = document.querySelectorAll('.process-step');
  const progressBar = document.getElementById('timeline-progress-bar');
  const panelTitle = document.getElementById('step-panel-title');
  const panelDesc = document.getElementById('step-panel-desc');

  if (steps.length === 0) return;

  // Process steps descriptions data
  const processData = {
    1: {
      title: "Initial Consultation",
      desc: "We meet in your space to discuss your lifestyle, functional needs, visual inspiration, and budget parameters, laying a solid foundation for the styling goals."
    },
    2: {
      title: "Design Vision",
      desc: "Our team develops a curated moodboard, layout configurations, and a signature style framework showing how your space will feel, function, and align visually."
    },
    3: {
      title: "Planning & Procurement",
      desc: "We finalize structural details, draft precise space plans, map exact decor choices, and create transparent purchase lists for your final approval."
    },
    4: {
      title: "Shopping & Sourcing",
      desc: "Using our exclusive trading network, we source your furniture, custom window treatments, rugs, lighting, and decorative accessories to secure quality at trade value."
    },
    5: {
      title: "Transformation",
      desc: "We arrange delivery timelines, manage staging builders or handymen, paint layers, arrange customized shelving, and install key design features."
    },
    6: {
      title: "Final Styling Reveal",
      desc: "Our stylists stage final textures, artwork, greenery, and lighting details. We present your beautiful new luxury space in a spectacular walkthrough reveal."
    }
  };

  const updateTimeline = (stepNum) => {
    // Update steps activation styling
    steps.forEach((step, idx) => {
      if (idx < stepNum) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update progress bar width
    const percentage = ((stepNum - 1) / (steps.length - 1)) * 100;
    progressBar.style.width = `${percentage}%`;

    // Update details card panel with fade-out/in
    const details = processData[stepNum];
    const panel = document.getElementById('step-description-panel');
    
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      panelTitle.textContent = details.title;
      panelDesc.textContent = details.desc;
      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    }, 300);
  };

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const stepNum = parseInt(step.getAttribute('data-step'), 10);
      updateTimeline(stepNum);
    });
  });
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  if (reveals.length === 0) return;

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(reveal => {
      const top = reveal.getBoundingClientRect().top;
      
      if (top < triggerBottom) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Execute once on load to reveal elements already in view
  revealOnScroll();
}

/* ==========================================================================
   STATISTICS COUNTERS
   ========================================================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-num');
  const statsSection = document.getElementById('stats');

  if (counters.length === 0 || !statsSection) return;

  let started = false;

  const countUp = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace('+', '').replace('%', '');
      
      // Determine dynamic increment step
      const increment = Math.ceil(target / 80);
      
      if (count < target) {
        const nextValue = count + increment > target ? target : count + increment;
        const suffix = counter.getAttribute('data-target') === '98' ? '%' : '+';
        counter.innerText = nextValue + suffix;
        setTimeout(countUp, 20);
      } else {
        const suffix = counter.getAttribute('data-target') === '98' ? '%' : '+';
        counter.innerText = target + suffix;
      }
    });
  };

  // Scroll event triggered counter
  window.addEventListener('scroll', () => {
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos - 100 && !started) {
      started = true;
      countUp();
    }
  });
}

/* ==========================================================================
   TESTIMONIALS CAROUSEL
   ========================================================================== */
function initTestimonialsCarousel() {
  const slider = document.getElementById('testimonial-slider-container');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dots = document.querySelectorAll('.slider-dot');

  if (!slider || slides.length === 0) return;

  let currentIdx = 0;
  let autoplayTimer;

  const showSlide = (idx) => {
    if (idx < 0) idx = slides.length - 1;
    if (idx >= slides.length) idx = 0;
    
    currentIdx = idx;

    // Slide horizontal positioning
    slider.style.transform = `translateX(-${currentIdx * 100}%)`;

    // Update Dots class
    dots.forEach(dot => {
      dot.classList.remove('active');
      if (parseInt(dot.getAttribute('data-index'), 10) === currentIdx) {
        dot.classList.add('active');
      }
    });
  };

  const nextSlide = () => {
    showSlide(currentIdx + 1);
  };

  const prevSlide = () => {
    showSlide(currentIdx - 1);
  };

  // Auto-play feature
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 7000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showSlide(idx);
      resetAutoplay();
    });
  });

  // Swipe gesture support for mobile devices
  let startX = 0;
  slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoplayTimer);
  });

  slider.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50) {
      nextSlide();
    } else if (diffX < -50) {
      prevSlide();
    }
    startAutoplay();
  });

  // Init autoplay
  startAutoplay();
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  if (faqHeaders.length === 0) return;

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');
      const isActive = item.classList.contains('active');

      // Close all other FAQ items first
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form-element');
  const statusMsg = document.getElementById('form-status-message');

  if (!form || !statusMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger premium submission mockup feedback
    statusMsg.style.display = 'block';
    statusMsg.className = 'form-status'; // reset classes
    statusMsg.textContent = 'Sending booking request...';

    // Mock API delay
    setTimeout(() => {
      statusMsg.classList.add('success');
      statusMsg.textContent = 'Thank you! Your design consultation request has been successfully submitted. Elise Vang will reach out shortly.';
      
      form.reset();
      
      // Auto-hide success message after 8 seconds
      setTimeout(() => {
        statusMsg.style.opacity = '0';
        setTimeout(() => {
          statusMsg.style.display = 'none';
          statusMsg.style.opacity = '1';
        }, 500);
      }, 8000);

    }, 1800);
  });
}
