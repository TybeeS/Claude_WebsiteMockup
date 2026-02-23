// Search menu items by name/description
// Assumes search input has id="search-input"
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const menuItems = document.querySelectorAll('.menu-item');

  if (!searchInput) {
    console.warn('Search input not found in DOM');
    return;
  }

  if (menuItems.length === 0) {
    console.warn('Menu items not found in DOM');
    return;
  }

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();

    menuItems.forEach(item => {
      // Get title and all description text
      const title = item.querySelector('h3')?.textContent || '';
      const descriptions = Array.from(item.querySelectorAll('p'))
        .map(p => p.textContent)
        .join(' ');
      const combinedText = (title + ' ' + descriptions).toLowerCase();

      // Show item if search term matches or search box is empty
      if (searchTerm === '' || combinedText.includes(searchTerm)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});
