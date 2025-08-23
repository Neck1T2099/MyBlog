(function() {
  const backMenu = document.querySelector('.back-menu');
  if (!backMenu) return;
  const backBtn = backMenu.querySelector('.back-btn');
  if (!backBtn) return;

  let pressTimer;
  let menuOpen = false;

  const startPress = () => {
    if (menuOpen) return;
    backBtn.style.transition = 'background 0.33s ease-in-out, transform 1.5s linear';
    backBtn.classList.add('holding');
    pressTimer = setTimeout(() => {
      backMenu.classList.add('show-nav');
      menuOpen = true;
      backBtn.style.transition = '';
    }, 1500);
  };

  const cancelPress = () => {
    clearTimeout(pressTimer);
    if (!menuOpen) {
      backBtn.classList.remove('holding');
      backBtn.style.transition = '';
    }
  };

  backBtn.addEventListener('mousedown', startPress);
  backBtn.addEventListener('mouseup', cancelPress);
  backBtn.addEventListener('mouseleave', cancelPress);
  backBtn.addEventListener('touchstart', startPress);
  backBtn.addEventListener('touchend', cancelPress);
  backBtn.addEventListener('touchcancel', cancelPress);

  backBtn.addEventListener('click', (e) => {
    if (menuOpen) {
      e.preventDefault();
      backMenu.classList.remove('show-nav');
      backBtn.classList.remove('holding');
      menuOpen = false;
    }
  });

  document.addEventListener('click', (e) => {
    if (menuOpen && !backMenu.contains(e.target)) {
      backMenu.classList.remove('show-nav');
      backBtn.classList.remove('holding');
      menuOpen = false;
    }
  });
})();
