function showHome() {
  hideAllPages();
  document.getElementById('home-page').style.display = 'block';
  updateNavigation('home');
}

function showCategory(category) {
  hideAllPages();
  document.getElementById(category + '-page').style.display = 'block';
  updateNavigation(category);
}

function hideAllPages() {
  const pages = document.querySelectorAll('.page-content');
  pages.forEach(page => {
      page.style.display = 'none';
  });
}

function updateNavigation(activeSection) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.classList.remove('active');
  });
  
  if (activeSection === 'home') {
      navLinks[0].classList.add('active');
  } else if (activeSection === 'films') {
      navLinks[1].classList.add('active');
  } else if (activeSection === 'series') {
      navLinks[2].classList.add('active');
  } else if (activeSection === 'documentaires') {
      navLinks[3].classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  showHome();
});