// Integrated filter and search functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const menuItems = document.querySelectorAll('.menu-item');

  // Validate elements exist
  if (filterButtons.length === 0 || menuItems.length === 0 || !searchInput) {
    console.warn('Filter buttons, search input, or menu items not found in DOM');
    return;
  }

  // Initialize selected category from DOM state
  let selectedCategory = Array.from(filterButtons)
    .find(btn => btn.classList.contains('is-active'))
    ?.getAttribute('data-category') || 'all';

  // Cache extracted text to avoid re-parsing on every search
  const itemTextCache = new Map();
  menuItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');
    if (!itemCategory) {
      console.warn('Menu item missing data-category attribute');
    }

    const title = item.querySelector('h3')?.textContent || '';
    const descriptions = Array.from(item.querySelectorAll('p'))
      .map(p => p.textContent)
      .join(' ');
    itemTextCache.set(item, (title + ' ' + descriptions).toLowerCase());
  });

  // Function to apply both filter and search
  function applyFilterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    menuItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');

      // Check category match
      const categoryMatches = selectedCategory === 'all' || itemCategory === selectedCategory;

      // Check search match (use cached text)
      const combinedText = itemTextCache.get(item) || '';
      const searchMatches = searchTerm === '' || combinedText.includes(searchTerm);

      // Show item only if both category AND search match
      if (categoryMatches && searchMatches) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  // Filter button click handler
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const clickedCategory = this.getAttribute('data-category');

      if (!clickedCategory) {
        console.warn('Filter button missing data-category attribute');
        return;
      }

      // Skip if already selected
      if (selectedCategory === clickedCategory) {
        return;
      }

      // Update selected category
      selectedCategory = clickedCategory;

      // Update active button state
      filterButtons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('is-active');
      this.setAttribute('aria-pressed', 'true');

      // Apply combined filter and search
      applyFilterAndSearch();
    });
  });

  // Search input handler
  searchInput.addEventListener('input', function() {
    applyFilterAndSearch();
  });

  // Apply initial state on page load
  applyFilterAndSearch();
});
