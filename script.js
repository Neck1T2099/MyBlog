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
const mainContent = document.getElementById('mainContent');

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

function displayFinal() {
    const name = usernameInput.value.trim();
    nameInputContainer.classList.add('hidden');
    messageEl.classList.remove('visible');
    setTimeout(() => {
        messageEl.textContent = `Welcome ${name || ''}`.trim();
        messageEl.classList.add('visible');
        setTimeout(() => {
            messageEl.classList.remove('visible');
            setTimeout(() => {
                messageEl.textContent = "Enjoy your time on my personal blog.";
                messageEl.classList.add('visible');
                mainContent.classList.remove('hidden');
            }, 500);
        }, 2000);
    }, 100);
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

runIntro();