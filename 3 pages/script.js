// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    const pages = document.querySelectorAll('.page');
    const heroButtons = document.querySelectorAll('.btn[data-page]');

    // Function to switch pages
    function switchPage(targetPageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(targetPageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add click event to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPageId = this.getAttribute('data-page');
            switchPage(targetPageId);
        });
    });

    // Add click event to hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetPageId = this.getAttribute('data-page');
            if (targetPageId) {
                switchPage(targetPageId);
            }
        });
    });

    // Fullscreen toggle functionality
    const fullscreenButtons = document.querySelectorAll('.fullscreen-btn');
    
    fullscreenButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                // Enter fullscreen
                document.documentElement.requestFullscreen().catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
                this.querySelector('i').classList.remove('fa-expand');
                this.querySelector('i').classList.add('fa-compress');
            } else {
                // Exit fullscreen
                document.exitFullscreen();
                this.querySelector('i').classList.remove('fa-compress');
                this.querySelector('i').classList.add('fa-expand');
            }
        });
    });

    // Update fullscreen icon when fullscreen changes
    document.addEventListener('fullscreenchange', function() {
        fullscreenButtons.forEach(button => {
            const icon = button.querySelector('i');
            if (document.fullscreenElement) {
                icon.classList.remove('fa-expand');
                icon.classList.add('fa-compress');
            } else {
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
            }
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only prevent default if it's not a navigation link
            if (!this.hasAttribute('data-page')) {
                e.preventDefault();
            }
        });
    });

    // Animate skill bars when scrolled into view
    const skillObserverOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                if (skillProgress) {
                    const targetWidth = skillProgress.getAttribute('data-width');
                    skillProgress.style.width = targetWidth;
                    entry.target.classList.add('animated');
                }
            }
        });
    }, skillObserverOptions);

    // Observe all skill items
    const skillItems = document.querySelectorAll('.skill-item, .language-item');
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            // Store the target width in a data attribute
            const targetWidth = progressBar.style.width;
            progressBar.setAttribute('data-width', targetWidth);
            // Start at 0
            progressBar.style.width = '0';
        }
        skillObserver.observe(item);
    });

    // Add hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Image error handling with placeholders
    const workspaceImg = document.getElementById('workspace-img');
    const profileImg = document.getElementById('profile-img');

    if (workspaceImg) {
        workspaceImg.onerror = function() {
            this.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800';
            this.alt = 'Developer Workspace';
        };
        // Set a default workspace image if src is not set
        if (!workspaceImg.src || workspaceImg.src === window.location.href) {
            workspaceImg.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800';
        }
    }

    if (profileImg) {
        profileImg.onerror = function() {
            this.src = 'https://via.placeholder.com/450x600/0a1628/00bcd4?text=Ahmed+Hassan';
            this.alt = 'Profile Photo';
        };
        // Set the uploaded photo
        if (!profileImg.src || profileImg.src === window.location.href) {
            profileImg.src = 'your-photo.jpg'; // This will be replaced by the actual uploaded photo
        }
    }

    // Add typing effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        let charIndex = 0;

        function typeWriter() {
            if (charIndex < originalText.length) {
                heroTitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply fade-in to various elements
    const fadeElements = document.querySelectorAll('.skill-item, .education-item, .hobby-item');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });

    console.log('Portfolio loaded successfully! 🚀');
});