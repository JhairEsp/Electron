// Function to load pages into the iframe
function loadPage(page) {
    document.getElementById('page-content').src = `pages/${page}.html`;
    
    // Remove active class from all links
    const links = document.querySelectorAll('.sidebar ul li a');
    links.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    event.currentTarget.classList.add('active');
  }
  
  // Theme toggle functionality
  function toggleTheme() {
    document.body.classList.toggle('dark');

    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.classList.add('animate');

    setTimeout(() => {
        themeToggle.classList.remove('animate');
    }, 600);

    const isDarkMode = document.body.classList.contains('dark');
    localStorage.setItem('darkMode', isDarkMode);

    // Aplicar el modo oscuro en el iframe
    const iframe = document.getElementById('page-content');
    if (iframe.contentWindow.document.body) {
        if (isDarkMode) {
            iframe.contentWindow.document.body.classList.add('dark');
        } else {
            iframe.contentWindow.document.body.classList.remove('dark');
        }
    }
}

  
  // Add mobile menu toggle functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    if (window.innerWidth <= 480) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'menu-toggle';
      toggleBtn.innerHTML = '☰';
      document.body.appendChild(toggleBtn);
      
      toggleBtn.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('open');
      });
    }
    
    // Set the first menu item as active by default
    const firstLink = document.querySelector('.sidebar ul li a');
    if (firstLink) {
      firstLink.classList.add('active');
    }
    
    // Create and add theme toggle button
    const sidebar = document.querySelector('.sidebar');
    const themeToggleWrapper = document.createElement('div');
    themeToggleWrapper.className = 'theme-toggle-wrapper';
    
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    themeToggle.innerHTML = `
      <div class="icon">
        <div class="icon-sun">☀️</div>
        <div class="icon-moon">🌙</div>
      </div>
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleWrapper.appendChild(themeToggle);
    sidebar.appendChild(themeToggleWrapper);
    
    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.body.classList.add('dark');
    }
  });