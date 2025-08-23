function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const messages = [
    "Welcome on my blog",
    "My name is Nick",
    "I am a beginner programmer"
];

const messageEl = document.getElementById('message');
const nameInputContainer = document.getElementById('nameInput');
const usernameInput = document.getElementById('username');
const submitNameBtn = document.getElementById('submitName');
const skipBtn = document.getElementById('skipBtn');
const intro = document.getElementById('intro');
const mainContent = document.getElementById('mainContent');
const radialNav = document.getElementById('radialNav');
const avatarImg = document.getElementById('avatar');
const githubLink = document.getElementById('githubLink');
const avatarContainer = document.querySelector('.avatar-container');
// GitHub profile information
const githubUsername = 'Neck1T2099';
avatarImg.src = `https://github.com/${githubUsername}.png`;
githubLink.href = `https://github.com/${githubUsername}`;
avatarImg.onerror = () => {
    avatarImg.src = 'images/myprofilephoto.png';
};
let skipIntro = false;

function showNameInput() {
    messageEl.textContent = "Welcome";
    messageEl.classList.add('visible');
    nameInputContainer.classList.remove('hidden');
    usernameInput.focus();
    skipBtn.classList.add('hidden');
}

async function runIntro() {
    await sleep(1000); // initial pause
    for (const msg of messages) {
        if (skipIntro) break;
        messageEl.textContent = msg;
        messageEl.classList.add('visible');
        await sleep(2000); // show message
        if (skipIntro) break;
        messageEl.classList.remove('visible');
        await sleep(1000); // fade out
    }
    showNameInput();
}

async function displayFinal() {
    const name = usernameInput.value.trim();
    localStorage.setItem('username', name);
    sessionStorage.setItem('welcomeShown', 'true');
    nameInputContainer.classList.add('hidden');
    messageEl.classList.remove('visible');
    await sleep(1000); // wait for fade-out

    messageEl.textContent = `Welcome ${name || ''}`.trim();
    messageEl.classList.add('visible');
    await sleep(2000); // show welcome with name

    messageEl.classList.remove('visible');
    await sleep(1000); // fade-out

    messageEl.textContent = "Enjoy your time on my personal blog";
    messageEl.classList.add('visible');
    await sleep(2000);
    messageEl.classList.remove('visible');
    await sleep(1000);

    intro.classList.add('hidden');
    mainContent.classList.remove('hidden');
    radialNav.classList.add('visible');
}

async function welcomeBack(name) {
    sessionStorage.setItem('welcomeShown', 'true');
    messageEl.textContent = `Welcome ${name}`;
    messageEl.classList.add('visible');
    await sleep(2000);
    messageEl.classList.remove('visible');
    await sleep(1000);
    intro.classList.add('hidden');
    mainContent.classList.remove('hidden');
    radialNav.classList.add('visible');
}

submitNameBtn.addEventListener('click', displayFinal);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        displayFinal();
    }
});

skipBtn.addEventListener('click', () => {
    skipIntro = true;
    showNameInput();
});

const storedName = localStorage.getItem('username');
const welcomeShown = sessionStorage.getItem('welcomeShown');
if (storedName) {
    skipBtn.classList.add('hidden');
    if (!welcomeShown) {
        welcomeBack(storedName);
    } else {
        intro.classList.add('hidden');
        mainContent.classList.remove('hidden');
        radialNav.classList.add('visible');
    }
} else {
    runIntro();
}

let navCloseTimeout;

avatarContainer.addEventListener('mouseenter', () => {
    radialNav.classList.add('open');
    clearTimeout(navCloseTimeout);
});

avatarContainer.addEventListener('mouseleave', () => {
    clearTimeout(navCloseTimeout);
    navCloseTimeout = setTimeout(() => {
        radialNav.classList.remove('open');
    }, 6000);
});
