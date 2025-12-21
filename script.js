// ===========================
// MODERN RETRO PORTFOLIO
// Enhanced JavaScript
// ===========================

// Toggle content sections
function toggleContent(sectionId) {
    const selectedContent = document.getElementById(sectionId);
    const isActive = selectedContent.classList.contains('active');

    // Hide all content sections
    const contentContainers = document.getElementsByClassName('content');
    for (let i = 0; i < contentContainers.length; i++) {
        contentContainers[i].classList.remove('active');
    }

    // Show selected content (unless it was already active)
    if (!isActive) {
        selectedContent.classList.add('active');

        // Smooth scroll to content on mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                selectedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }

    // Update active button state
    updateActiveButton(sectionId);

    // Trigger skill bar animations if skills section
    if (sectionId === 'skills') {
        animateSkillBars();
    }
}

// Update active button styling
function updateActiveButton(activeSectionId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        const buttonCmd = button.getAttribute('data-cmd');
        if (buttonCmd === activeSectionId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Animate skill bars on view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.getAttribute('style').match(/width:\s*(\d+%)/)[1];
        }, index * 50);
    });
}

// Open link in new tab
function openLinkInNewTab(url) {
    window.open(url, '_blank');
}

// Note: Removed Konami Code easter egg to optimize performance

// ===========================
// INITIALIZE ON LOAD
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Show Services section by default
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.classList.add('active');
        updateActiveButton('services');
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '5') {
            const sections = ['services', 'projects', 'skills', 'about', 'contact'];
            const index = parseInt(e.key) - 1;
            if (sections[index]) {
                toggleContent(sections[index]);
            }
        }
    });

    // Lazy load project images for better performance
    const projectImages = document.querySelectorAll('.project-image img');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    imageObserver.unobserve(img);
                }
            });
        });

        projectImages.forEach(img => imageObserver.observe(img));
    }

    // Performance optimization: removed terminal flicker effect
});

// Console Message for Developers
console.log('%c🚀 Welcome to the Console!', 'color: #00d9ff; font-size: 18px; font-weight: bold;');
console.log('%cKeyboard shortcuts: Press 1-5 to navigate sections', 'color: #00ff88; font-size: 12px;');
console.log('%c  1 → Services  |  2 → Portfolio  |  3 → Expertise  |  4 → About  |  5 → Contact', 'color: #6b7280; font-size: 11px;');
console.log('%c💼 Interested in hiring? Let\'s connect! 📧 rado.chobanov97@gmail.com', 'color: #a0a0a0; font-size: 12px;');
