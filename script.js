document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const logoImg = document.getElementById('logo-img');
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile Navigation
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const navIndicator = document.querySelector('.nav-indicator');
    
    // Toggle mobile menu
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update navigation indicator
        updateNavIndicator();
    });
    
    // Navigation indicator
    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = navbar.getBoundingClientRect();
            
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        }
    }
    
    // Initialize navigation indicator
    setTimeout(updateNavIndicator, 100);
    
    // Recalculate indicator on window resize
    window.addEventListener('resize', updateNavIndicator);
    
    // Update active links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        updateNavIndicator();
    });
    
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Certificates slider
    const certificateSlides = document.querySelectorAll('.certificate-slide');
    const sliderDots = document.querySelector('.slider-dots');
    const sliderPrev = document.querySelector('.slider-prev');
    const sliderNext = document.querySelector('.slider-next');
    
    certificateSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        certificateSlides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        certificateSlides[index].style.display = 'flex';
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function goToSlide(index) {
        showSlide(index);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % certificateSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + certificateSlides.length) % certificateSlides.length;
        showSlide(currentSlide);
    }
    
    sliderNext.addEventListener('click', nextSlide);
    sliderPrev.addEventListener('click', prevSlide);
    
    let slideInterval = setInterval(nextSlide, 5000);
    
    const slider = document.querySelector('.certificates-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    showSlide(0);
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    function animateStats() {
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-count').replace(/[^0-9\.]/g,'');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    number.textContent = target + (number.getAttribute('data-count').includes('%') ? '%' : '+');
                    clearInterval(counter);
                } else {
                    number.textContent = Math.floor(current) + (number.getAttribute('data-count').includes('%') ? '%' : '');
                }
            }, 16);
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);
    
    // Modal functionality
    const registerBtns = document.querySelectorAll('#register-btn, #hero-register-btn');
    const registerModal = document.getElementById('register-modal');
    const modalClose = document.querySelector('.modal-close');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            this.reset();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const logoImg = document.getElementById('logo-img');
    
    // تحميل وضع الثيم من localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    // تغيير وضع الثيم
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navbar.classList.remove('active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });
    
    // Header Scroll Effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // إظهار/إخفاء الهيدر عند التمرير
        if (currentScroll <= 0) {
            header.classList.remove('scrolled-up');
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled-up')) {
            // التمرير لأسفل
            header.classList.remove('scrolled');
            header.classList.add('scrolled-up');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled-up')) {
            // التمرير لأعلى
            header.classList.remove('scrolled-up');
            header.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
        
        // إضافة كلاس scrolled بعد مسافة معينة
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        updateNavIndicator();
    });
    
    // Navigation Indicator
    function updateNavIndicator() {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            const linkRect = activeLink.getBoundingClientRect();
            const navRect = navbar.getBoundingClientRect();
            
            navIndicator.style.width = `${linkRect.width}px`;
            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
        }
    }
    
    // Initialize navigation indicator
    setTimeout(updateNavIndicator, 100);
    
    // Recalculate indicator on window resize
    window.addEventListener('resize', updateNavIndicator);
    
    // Update active links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        const navHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 20;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        updateNavIndicator();
    });
    
    // Modal functionality
    const registerBtns = document.querySelectorAll('#register-btn, #hero-register-btn');
    const registerModal = document.getElementById('register-modal');
    const modalClose = document.querySelector('.modal-close');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        registerModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    registerModal.addEventListener('click', (e) => {
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            this.reset();
        });
    }
});