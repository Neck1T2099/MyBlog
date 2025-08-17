function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const messages = [
    "Welcome on my blog.",
    "My name is Nick.",
    "I am a beginner programmer."
];

const messageEl = document.getElementById('message');
const nameInputContainer = document.getElementById('nameInput');
const usernameInput = document.getElementById('username');
const submitNameBtn = document.getElementById('submitName');
const skipBtn = document.getElementById('skipBtn');

let skipIntro = false;

async function runIntro() {
    await sleep(1000); // initial pause
    for (const msg of messages) {
        if (skipIntro) return;
        messageEl.textContent = msg;
        messageEl.classList.add('visible');
        await sleep(2000); // show message
        if (skipIntro) return;
        messageEl.classList.remove('visible');
        await sleep(1000); // fade out
        if (skipIntro) return;
    }
    if (skipIntro) return;
    messageEl.textContent = "Welcome";
    messageEl.classList.add('visible');
    nameInputContainer.classList.remove('hidden');
    usernameInput.focus();
}

function displayFinal() {
    skipIntro = true;
    nameInputContainer.classList.add('hidden');
    messageEl.classList.remove('visible');
    setTimeout(() => {
        messageEl.textContent = "Enjoy your time on my personal blog.";
        messageEl.classList.add('visible');
    }, 100);
}

submitNameBtn.addEventListener('click', displayFinal);
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        displayFinal();
    }
});

skipBtn.addEventListener('click', () => {
    displayFinal();
});

runIntro();
