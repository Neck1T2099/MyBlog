const links = document.querySelectorAll('[data-direction]');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const direction = link.dataset.direction;
    const href = link.getAttribute('href');
    document.body.classList.add(`slide-out-${direction}`);
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  });
});
