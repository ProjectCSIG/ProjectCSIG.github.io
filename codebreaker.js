function generateCode() {
    const digits = '0123456789'.split('');
    let code = '';
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        code += digits.splice(randomIndex, 1)[0];
    }
    return code;
}

const secretCode = generateCode();
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');
const feedbackDiv = document.getElementById('feedback');
const attemptsDiv = document.getElementById('attempts');

submitGuess.addEventListener('click', () => {
    const guess = guessInput.value;
    if (guess.length !== 4 || isNaN(guess)) {
        feedbackDiv.innerText = "Please enter a valid 4-digit number.";
        return;
    }
    attempts++;
    attemptsDiv.innerText = "Attempts: " + attempts;
    if (guess === secretCode) {
        feedbackDiv.innerText = "Congratulations! You've cracked the code: " + secretCode;
        submitGuess.disabled = true;
        guessInput.disabled = true;
    } else {
        // Count correct positions and correct digits in wrong positions
        let correctPos = 0;
        let correctDigit = 0;
        for (let i = 0; i < 4; i++) {
            if (guess[i] === secretCode[i]) {
                correctPos++;
            } else if (secretCode.includes(guess[i])) {
                correctDigit++;
            }
        }
        feedbackDiv.innerText = `Correct position: ${correctPos}, Correct digit (wrong position): ${correctDigit}`;
    }
    guessInput.value = "";
});
