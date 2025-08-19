const links = document.querySelectorAll('[data-direction]');
const avatar = document.querySelector('.avatar-container');
const TRANSITION_DURATION = 1000;

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const direction = link.dataset.direction;
    const href = link.getAttribute('href');
    sessionStorage.setItem('transition', direction);
    if (avatar) {
      avatar.classList.remove('fly-left', 'fly-right', 'fly-up', 'fly-down');
      void avatar.offsetWidth;
      avatar.classList.add(`fly-${direction}`);
    }
    requestAnimationFrame(() => {
      document.body.classList.add(`slide-out-${direction}`);
      setTimeout(() => {
        window.location.href = href;
      }, TRANSITION_DURATION);
    });
  });
});

const transition = sessionStorage.getItem('transition');
if (transition) {
  document.body.classList.add(`slide-in-${transition}`);
  if (avatar) {
    const opposite = { left: 'left', right: 'right', up: 'up', down: 'down' }[transition];
    avatar.classList.remove('fly-left', 'fly-right', 'fly-up', 'fly-down');
    avatar.classList.add(`fly-${transition}`);
    requestAnimationFrame(() => {
      avatar.classList.remove(`fly-${transition}`);
    });
  }
  sessionStorage.removeItem('transition');
}
