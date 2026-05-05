// ===========================
// MODERN RETRO PORTFOLIO
// ===========================

// Navigate to a section and optionally push a history entry
function navigateTo(sectionId, pushHistory = true) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
    target.classList.add('active');
    updateActiveButton(sectionId);

    if (pushHistory) {
        history.pushState({ section: sectionId }, '', '#' + sectionId);
    }

    if (window.innerWidth <= 768) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
}

// Public API called from onclick attributes throughout the HTML
function toggleContent(sectionId) {
    navigateTo(sectionId, true);
}

// Update active nav button
function updateActiveButton(activeSectionId) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cmd') === activeSectionId);
    });
}

// Open link in new tab
function openLinkInNewTab(url) {
    window.open(url, '_blank');
}

// Handle browser back / forward
window.addEventListener('popstate', (e) => {
    const sectionId = e.state?.section;
    if (sectionId) {
        navigateTo(sectionId, false); // don't push again
    } else {
        // Popped back to before any navigation — hide all sections
        document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
        updateActiveButton(null);
    }
});

// ===========================
// INITIALIZE ON LOAD
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Respect deep-link hash, otherwise default to services
    const initial = window.location.hash.slice(1) || 'services';
    const initialEl = document.getElementById(initial);

    if (initialEl) {
        initialEl.classList.add('active');
        updateActiveButton(initial);
    }

    // Stamp the initial state so popstate has something to return to
    history.replaceState({ section: initial }, '', '#' + initial);

    // Keyboard shortcuts 1–5
    document.addEventListener('keydown', (e) => {
        const sections = ['services', 'projects', 'skills', 'about', 'contact'];
        const index = parseInt(e.key) - 1;
        if (index >= 0 && index < sections.length) {
            toggleContent(sections[index]);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

console.log('%c Welcome to the Console!', 'color: #3dba2f; font-size: 16px; font-weight: bold;');
console.log('%c Keyboard shortcuts: 1-5 to jump to sections', 'color: #2a7a20; font-size: 12px;');
