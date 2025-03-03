document.addEventListener('DOMContentLoaded', function() {
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
    
    // ===== Валидация форм и обработка отправки =====
    
    // Функция валидации номера телефона
    function validatePhone(phoneInput, errorElement) {
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^[0-9+\-()\s]*$/;
        
        if (!phoneRegex.test(phoneValue)) {
            showError(phoneInput, errorElement, 'Пожалуйста, введите только цифры');
            return false;
        } else if (phoneValue.replace(/\D/g, '').length < 10) {
            showError(phoneInput, errorElement, 'Номер телефона должен содержать минимум 10 цифр');
            return false;
        } else {
            clearError(phoneInput, errorElement);
            return true;
        }
    }
    
    // Функция валидации email
    function validateEmail(emailInput, errorElement) {
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailValue)) {
            showError(emailInput, errorElement, 'Пожалуйста, введите корректный email');
            return false;
        } else {
            clearError(emailInput, errorElement);
            return true;
        }
    }
    
    // Функция валидации обязательных полей
    function validateRequired(input, errorElement, message = 'Это поле обязательно для заполнения') {
        if (!input.value.trim()) {
            showError(input, errorElement, message);
            return false;
        } else {
            clearError(input, errorElement);
            return true;
        }
    }
    
    // Функция отображения ошибки
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
    
    // Функция очистки ошибки
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('active');
    }
    
    // Функция проверки валидности формы
    function validateForm(form) {
        let isValid = true;
        
        // Проверяем все обязательные поля
        form.querySelectorAll('[required]').forEach(field => {
            const fieldName = field.name;
            const errorElement = document.getElementById(fieldName + 'Error') || 
                                field.parentElement.querySelector('.error-message');
            
            if (field.type === 'tel') {
                if (!validatePhone(field, errorElement)) {
                    isValid = false;
                }
            } else if (field.type === 'email') {
                if (!validateEmail(field, errorElement)) {
                    isValid = false;
                }
            } else {
                if (!validateRequired(field, errorElement)) {
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Функция для отображения уведомления
    function showNotification(message) {
        const notification = document.getElementById('successNotification');
        const notificationText = document.querySelector('.notification-content p');
        
        // Устанавливаем текст уведомления в зависимости от переданного сообщения
        if (notificationText) {
            notificationText.textContent = message;
        }
        
        notification.classList.add('active');
        
        // Автоматически скрыть уведомление через 5 секунд
        setTimeout(() => {
            notification.classList.remove('active');
        }, 5000);
    }
    
    // ===== Обработка основной формы контакта =====
    const contactForm = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    
    if (contactForm && phoneInput) {
        // Добавляем элемент для сообщения об ошибке, если его нет
        if (!document.getElementById('phoneError')) {
            const errorElement = document.createElement('div');
            errorElement.id = 'phoneError';
            errorElement.className = 'error-message';
            phoneInput.parentElement.appendChild(errorElement);
        }
        
        // Валидация телефона при вводе
        phoneInput.addEventListener('input', function() {
            validatePhone(this, document.getElementById('phoneError'));
        });
        
        // Форматирование телефона
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
        
        // Обработка отправки формы
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                // Данные для отправки на сервер (в реальной ситуации)
                const formData = {
                    name: document.getElementById('name').value,
                    company: document.getElementById('company').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    service: document.getElementById('service').value,
                    employees: document.getElementById('employees').value,
                    message: document.getElementById('message').value
                };
                
                // В реальном проекте здесь был бы AJAX-запрос к серверу
                console.log('Данные формы контакта:', formData);
                
                // Показываем уведомление об успешной отправке с соответствующим сообщением
                showNotification('Спасибо! Мы свяжемся с Вами.');
                
                // Сбрасываем форму
                contactForm.reset();
            }
        });
    }
    
    // ===== Модальное окно и форма обратной связи =====
    const feedbackBtn = document.getElementById('feedbackBtn');
    const feedbackModal = document.getElementById('feedbackModal');
    const modalClose = document.getElementById('modalClose');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackSubmit = document.getElementById('feedbackSubmit');
    const feedbackPhone = document.getElementById('feedbackPhone');
    const feedbackName = document.getElementById('feedbackName');
    const feedbackEmail = document.getElementById('feedbackEmail');
    const notificationClose = document.getElementById('notificationClose');
    const feedbackLink = document.querySelector('.feedback-link');
    
    // Открытие модального окна
    if (feedbackBtn && feedbackModal) {
        feedbackBtn.addEventListener('click', function(e) {
            e.preventDefault();
            feedbackModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
        });
    }
    
    // Открытие модального окна через футер-ссылку
    if (feedbackLink && feedbackModal) {
        feedbackLink.addEventListener('click', function(e) {
            e.preventDefault();
            feedbackModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Закрытие модального окна
    if (modalClose && feedbackModal) {
        modalClose.addEventListener('click', function() {
            feedbackModal.classList.remove('active');
            document.body.style.overflow = ''; // Восстанавливаем прокрутку страницы
        });
        
        // Закрытие при клике на оверлей
        feedbackModal.addEventListener('click', function(e) {
            if (e.target === feedbackModal) {
                feedbackModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Закрытие уведомления
    if (notificationClose) {
        notificationClose.addEventListener('click', function() {
            document.getElementById('successNotification').classList.remove('active');
        });
    }
    
    // Валидация формы обратной связи
    if (feedbackForm && feedbackSubmit) {
        const requiredFields = feedbackForm.querySelectorAll('[required]');
        
        // Функция проверки разблокировки кнопки отправки
        function checkFormValidity() {
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                } else if (field.type === 'tel' && !/^[0-9+\-()\s]*$/.test(field.value)) {
                    isValid = false;
                } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                    isValid = false;
                }
            });
            
            feedbackSubmit.disabled = !isValid;
        }
        
        // Валидация каждого поля при вводе
        requiredFields.forEach(field => {
            field.addEventListener('input', function() {
                if (field.type === 'tel') {
                    validatePhone(field, document.getElementById('phoneError'));
                } else if (field.type === 'email') {
                    validateEmail(field, document.getElementById('emailError'));
                } else {
                    validateRequired(field, document.getElementById('nameError'));
                }
                
                checkFormValidity();
            });
        });
        
        // Форматирование телефона в форме обратной связи
        if (feedbackPhone) {
            feedbackPhone.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value[0] === '7' || value[0] === '8') {
                        value = value.substring(1);
                    }
                    const matches = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                    e.target.value = !matches[2] ? '+7 (' + matches[1] : '+7 (' + matches[1] + ') ' + matches[2] + (matches[3] ? '-' + matches[3] : '') + (matches[4] ? '-' + matches[4] : '');
                }
                
                validatePhone(this, document.getElementById('phoneError'));
                checkFormValidity();
            });
        }
        
        // Обработка отправки формы обратной связи
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(feedbackForm)) {
                // Данные для отправки на сервер (в реальной ситуации)
                const formData = {
                    name: feedbackName.value,
                    company: document.getElementById('feedbackCompany').value,
                    email: feedbackEmail.value,
                    phone: feedbackPhone.value,
                    message: document.getElementById('feedbackMessage').value
                };
                
                // В реальном проекте здесь был бы AJAX-запрос к серверу
                console.log('Данные формы обратной связи:', formData);
                
                // Закрываем модальное окно
                feedbackModal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Показываем уведомление об успешной отправке с соответствующим сообщением
                showNotification('Спасибо! Ваша обратная связь очень важна для нас.');
                
                // Сбрасываем форму
                feedbackForm.reset();
                feedbackSubmit.disabled = true;
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return; // Пропускаем, если это кнопка обратной связи
            
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