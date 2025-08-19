const links = document.querySelectorAll('[data-direction]');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const direction = link.dataset.direction;
    const href = link.getAttribute('href');
    sessionStorage.setItem('transition', direction);
    document.body.classList.add(`slide-out-${direction}`);
    setTimeout(() => {
      window.location.href = href;
    }, 500);
  });
});

const transition = sessionStorage.getItem('transition');
if (transition) {
  document.body.classList.add(`slide-in-${transition}`);
  sessionStorage.removeItem('transition');
}
