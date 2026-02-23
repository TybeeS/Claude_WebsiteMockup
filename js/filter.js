document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  if (filterButtons.length === 0 || menuItems.length === 0) {
    console.warn('Filter buttons or menu items not found in DOM');
    return;
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const selectedCategory = this.getAttribute('data-category');

      if (!selectedCategory) {
        console.warn('Filter button missing data-category attribute');
        return;
      }

      filterButtons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('is-active');
      this.setAttribute('aria-pressed', 'true');

      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
});
