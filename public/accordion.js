document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      items.forEach((el) => {
        const c = el.querySelector('.accordion-content');
        if (el !== item) {
          el.classList.remove('open');
          c.style.maxHeight = null;
        }
      });

      const isOpen = item.classList.toggle('open');
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : null;
    });
  });
});