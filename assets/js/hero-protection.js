document.addEventListener('DOMContentLoaded', () => {
  const heroSectionProtection = setInterval(() => {
    const title = document.querySelector('.hero-title');
    const stats = document.querySelector('.hero-stats');
    
    if (title && stats) {
      // Force colors and visibility
      title.style.color = 'white';
      title.style.opacity = '1';
      stats.style.display = 'flex';
      
      // Add protective classes
      title.classList.add('protected-title');
      stats.classList.add('protected-stats');
    }
  }, 500);

  // Clean up after 10 seconds
  setTimeout(() => {
    clearInterval(heroSectionProtection);
  }, 10000);
});