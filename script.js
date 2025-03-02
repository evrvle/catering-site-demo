document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }
    
    // Theme toggle handler
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Initialize Yandex Map
    ymaps.ready(function () {
        const map = new ymaps.Map('map', {
            center: [56.129373, 40.398272], // Координаты ул. Лакина, 4
            zoom: 16
        });

        // Add marker
        const placemark = new ymaps.Placemark([56.129373, 40.398272], {
            balloonContent: 'Столовая РТС<br>ул. Лакина, 4',
            hintContent: 'Столовая РТС'
        }, {
            preset: 'islands#blueIcon'
        });

        map.geoObjects.add(placemark);
        map.behaviors.disable('scrollZoom');
        
        // Enable zoom on click
        map.events.add('click', function() {
            map.behaviors.enable('scrollZoom');
        });
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Menu Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (filterBtns.length && menuItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filterValue = btn.getAttribute('data-filter');
                
                // Show/hide menu items based on filter
                menuItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Testimonials Slider (Simple Version)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonials() {
        // For screens smaller than 768px, show only one testimonial at a time
        if (window.innerWidth < 768 && testimonials.length > 1) {
            testimonials.forEach((testimonial, index) => {
                if (index === currentTestimonial) {
                    testimonial.style.display = 'block';
                } else {
                    testimonial.style.display = 'none';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            setTimeout(showTestimonials, 5000); // Change testimonial every 5 seconds
        }
    }
    
    if (testimonials.length > 1) {
        // Initial check
        if (window.innerWidth < 768) {
            showTestimonials();
        }
        
        // Check on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth < 768) {
                showTestimonials();
            } else {
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
            }
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                employees: document.getElementById('employees').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (!formData.name || !formData.company || !formData.email || !formData.phone || !formData.service) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Here you would normally send the data to a server
            // For demonstration, we'll just show an alert
            alert(`Спасибо за заявку, ${formData.name}! Мы свяжемся с вами в ближайшее время для обсуждения организации питания в компании "${formData.company}".`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                const matches = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = !matches[2] ? '+7 (' + matches[1] : '+7 (' + matches[1] + ') ' + matches[2] + (matches[3] ? '-' + matches[3] : '') + (matches[4] ? '-' + matches[4] : '');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.padding = '15px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.padding = '20px 0';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.07)';
            }
        });
    }
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-menu a[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.nav-menu a[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Simple animation on scroll
    function revealOnScroll() {
        const elements = document.querySelectorAll('.section-header, .about-content, .service-card, .menu-item, .faq-item, .testimonial, .contact-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .section-header, .about-content, .service-card, .menu-item, .faq-item, .testimonial, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s ease, transform 1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Initial check and add scroll listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
}); 