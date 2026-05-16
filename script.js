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
    const hash = window.location.hash.slice(1);
    const initial = hash || 'services';
    const initialEl = document.getElementById(initial);

    if (initialEl) {
        document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
        initialEl.classList.add('active');
        updateActiveButton(initial);
    }

    // Only stamp a hash if one was already in the URL — adding #services when there
    // was no hash causes Chrome to scroll the #services element into view.
    history.replaceState({ section: initial }, '', hash ? '#' + initial : window.location.pathname);

    // Keyboard shortcuts 1–5
    document.addEventListener('keydown', (e) => {
        const sections = ['services', 'projects', 'skills', 'about', 'contact'];
        const index = parseInt(e.key) - 1;
        if (index >= 0 && index < sections.length) {
            toggleContent(sections[index]);
        }
    });

});

console.log('%c Welcome to the Console!', 'color: #3dba2f; font-size: 16px; font-weight: bold;');
console.log('%c Keyboard shortcuts: 1-5 to jump to sections', 'color: #2a7a20; font-size: 12px;');
