const links = document.querySelectorAll('[data-direction]');
const avatar = document.querySelector('.avatar-container');
const TRANSITION_DURATION = 1000;
const TRANSITION_KEY = 'transition';
const DIRECTION_KEY = 'transitionDirection';
const FADE_OUT_CLASS = 'page-fade-out';
const FADE_IN_CLASS = 'page-fade-in';

// Ensure the avatar always starts in the center
const resetAvatar = () => {
  if (avatar) {
    avatar.classList.remove('fly-left', 'fly-right', 'fly-up', 'fly-down');
  }
};

// Reset position on initial load and when navigating via browser history
resetAvatar();
window.addEventListener('pageshow', resetAvatar);

const startFadeOut = href => {
  document.body.classList.remove(FADE_IN_CLASS);
  document.body.classList.add(FADE_OUT_CLASS);
  setTimeout(() => {
    window.location.href = href;
  }, TRANSITION_DURATION);
};

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const direction = link.dataset.direction;
    const href = link.getAttribute('href');
    sessionStorage.setItem(TRANSITION_KEY, 'fade');
    if (direction) {
      sessionStorage.setItem(DIRECTION_KEY, direction);
    }
    if (avatar) {
      resetAvatar();
      // Force reflow so the new class triggers the animation
      void avatar.offsetWidth;
      if (direction) {
        avatar.classList.add(`fly-${direction}`);
      }
    }
    requestAnimationFrame(() => {
      startFadeOut(href);
    });
  });
});

const playFadeIn = () => {
  document.body.classList.remove(FADE_OUT_CLASS);
  document.body.classList.add(FADE_IN_CLASS);
};

const transition = sessionStorage.getItem(TRANSITION_KEY);
if (transition === 'fade') {
  requestAnimationFrame(playFadeIn);
  sessionStorage.removeItem(TRANSITION_KEY);
} else {
  requestAnimationFrame(playFadeIn);
}

const storedDirection = sessionStorage.getItem(DIRECTION_KEY);
if (avatar && storedDirection) {
  avatar.classList.add(`fly-${storedDirection}`);
  requestAnimationFrame(() => {
    avatar.classList.remove(`fly-${storedDirection}`);
  });
  sessionStorage.removeItem(DIRECTION_KEY);
} else if (!storedDirection) {
  resetAvatar();
  } else {
  sessionStorage.removeItem(DIRECTION_KEY);
}
