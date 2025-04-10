document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Tabs for prompts
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all tab panes
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Show the selected tab pane
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Testimonial Slider
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialDots.length > 0 && testimonialCards.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Remove active class from all dots and testimonials
                testimonialDots.forEach(d => d.classList.remove('active'));
                testimonialCards.forEach(card => card.classList.remove('active'));
                
                // Add active class to clicked dot and corresponding testimonial
                dot.classList.add('active');
                testimonialCards[index].classList.add('active');
            });
        });
        
        // Auto rotate testimonials
        let currentTestimonial = 0;
        
        function rotateTestimonials() {
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialCards.forEach(card => card.classList.remove('active'));
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            
            testimonialDots[currentTestimonial].classList.add('active');
            testimonialCards[currentTestimonial].classList.add('active');
        }
        
        // Change testimonial every 5 seconds
        setInterval(rotateTestimonials, 5000);
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                
                // Toggle active class on the clicked FAQ item
                faqItem.classList.toggle('active');
                
                // If you want only one FAQ open at a time, uncomment the following:
                /*
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.parentElement.classList.remove('active');
                    }
                });
                */
            });
        });
    }
    
    // Show more modules button
    const showMoreButton = document.getElementById('showMoreModules');
    const moduleCards = document.querySelectorAll('.module-card');
    
    if (showMoreButton && moduleCards.length > 6) {
        // Initially hide modules after the 6th one
        for (let i = 6; i < moduleCards.length; i++) {
            moduleCards[i].style.display = 'none';
        }
        
        showMoreButton.addEventListener('click', function() {
            // Show all hidden modules
            for (let i = 6; i < moduleCards.length; i++) {
                moduleCards[i].style.display = 'block';
            }
            
            // Change button text and disable it
            this.innerHTML = 'Tous les modules affichés <i class="fas fa-check"></i>';
            this.disabled = true;
            this.style.opacity = '0.7';
            this.style.cursor = 'default';
        });
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show the success message
            contactForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Scroll to success message
            formSuccess.scrollIntoView({behavior: 'smooth'});
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the subscription request to a server
            // For demo purposes, we'll just change the button text
            const submitButton = this.querySelector('button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = 'Abonné <i class="fas fa-check"></i>';
            submitButton.disabled = true;
            
            // Reset form
            this.querySelector('input').value = '';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }
    
    // Animate on scroll effect
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Elements to animate when they come into view
    const animateElements = document.querySelectorAll('.benefit-card, .module-card, .prompt-item, .contact-card');
    
    function checkAnimations() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animationName = 'fadeInUp';
                element.style.animationDuration = '0.6s';
                element.style.animationFillMode = 'both';
            }
        });
    }
    
    // Check animations on load and scroll
    checkAnimations();
    window.addEventListener('scroll', checkAnimations);
    
    // Add fadeInUp animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translate3d(0, 30px, 0);
            }
            to {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
        }
    `;
    document.head.appendChild(style);
});

