const links = document.querySelectorAll('[data-direction]');
const avatar = document.querySelector('.avatar-container');
const TRANSITION_DURATION = 1000;

// Ensure the avatar always starts in the center
const resetAvatar = () => {
  if (avatar) {
    avatar.classList.remove('fly-left', 'fly-right', 'fly-up', 'fly-down');
  }
};

// Reset position on initial load and when navigating via browser history
resetAvatar();
window.addEventListener('pageshow', resetAvatar);

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const direction = link.dataset.direction;
    const href = link.getAttribute('href');
    sessionStorage.setItem('transition', direction);
    if (avatar) {
      resetAvatar();
      // Force reflow so the new class triggers the animation
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
    avatar.classList.add(`fly-${transition}`);
    requestAnimationFrame(() => {
      avatar.classList.remove(`fly-${transition}`);
    });
  }
  sessionStorage.removeItem('transition');
  } else {
  // No transition set (e.g., direct navigation) – ensure avatar centered
  resetAvatar();
}
