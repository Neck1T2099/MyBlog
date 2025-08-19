const links = document.querySelectorAll('[data-direction]');
const avatar = document.querySelector('.avatar-container');
const TRANSITION_DURATION = 1000;

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const direction = link.dataset.direction;
    const href = link.getAttribute('href');
    sessionStorage.setItem('transition', direction);
    document.body.classList.add(`slide-out-${direction}`);
    if (avatar) {
      avatar.classList.remove('fly-left', 'fly-right', 'fly-up', 'fly-down');
      void avatar.offsetWidth;
      avatar.classList.add(`fly-${direction}`);
    }
    setTimeout(() => {
      window.location.href = href;
    }, TRANSITION_DURATION);
  });
});

const transition = sessionStorage.getItem('transition');
if (transition) {
  document.body.classList.add(`slide-in-${transition}`);
  if (avatar) {
    const opposite = { left: 'right', right: 'left', up: 'down', down: 'up' }[transition];
    avatar.classList.remove('fly-left', 'fly-right', 'fly-up', 'fly-down');
    avatar.classList.add(`fly-${opposite}`);
    requestAnimationFrame(() => {
      avatar.classList.remove(`fly-${opposite}`);
    });
  }
  sessionStorage.removeItem('transition');
}
