function toggleContent(sectionId) {
    var selectedContent = document.getElementById(sectionId);
    var isActive = selectedContent.classList.toggle('active');

    var contentContainers = document.getElementsByClassName('content');
    for (var i = 0; i < contentContainers.length; i++) {
        if (contentContainers[i] !== selectedContent) {
            contentContainers[i].classList.remove('active');
        }
    }
}

function toggleProject(projectId) {
    var selectedProjectContent = document.getElementById(projectId + '-content');
    var isActive = selectedProjectContent.classList.toggle('active');

    var projectContents = document.getElementsByClassName('project-content');
    for (var i = 0; i < projectContents.length; i++) {
        if (projectContents[i] !== selectedProjectContent && projectContents[i].classList.contains('active')) {
            projectContents[i].classList.remove('active');
        }
    }

    var projectLink = selectedProjectContent.querySelector('.project-link');
    if (isActive) {
        projectLink.style.display = 'block';
    } else {
        projectLink.style.display = 'none';
    }
}

function openLinkInNewTab(url) {
    window.open(url, '_blank');
}