const questions = [
    { question: "What is phishing?", options: ["A type of malware", "An email scam", "A firewall", "A password"], answer: 1 },
    { question: "What does HTTPS stand for?", options: ["HyperText Transfer Protocol Secure", "HyperText Transfer Protocol Standard", "High Transfer Protocol Secure", "None of the above"], answer: 0 },
    { question: "What is a strong password?", options: ["123456", "password", "P@ssw0rd!", "qwerty"], answer: 2 },
    { question: "What is two-factor authentication?", options: ["A type of encryption", "A second layer of security", "A password manager", "None of the above"], answer: 1 },
    { question: "What is a firewall?", options: ["A physical wall", "A network security system", "A type of virus", "None of the above"], answer: 1 },
    { question: "What is the purpose of antivirus software?", options: ["To speed up your computer", "To protect against malware", "To block ads", "To manage passwords"], answer: 1 },
    { question: "What should you do if you receive a suspicious email?", options: ["Open it to investigate", "Delete it immediately", "Reply to the sender", "Forward it to your friends"], answer: 1 },
    { question: "What is a VPN?", options: ["A virus protection network", "A virtual private network", "A very private network", "None of the above"], answer: 1 },
    { question: "What is social engineering?", options: ["A type of malware", "A method of hacking people", "A way to build networks", "None of the above"], answer: 1 },
    { question: "What is the best way to secure your online accounts?", options: ["Use the same password everywhere", "Use a password manager", "Write passwords on paper", "Share passwords with friends"], answer: 1 },
    { question: "What is malware?", options: ["A type of software", "A malicious program", "A firewall", "A password"], answer: 1 },
    { question: "What is the purpose of encryption?", options: ["To secure data", "To delete data", "To compress files", "To share files"], answer: 0 },
    { question: "What is a brute force attack?", options: ["A physical attack", "A method to guess passwords", "A type of malware", "None of the above"], answer: 1 },
    { question: "What is the safest way to store passwords?", options: ["In a password manager", "In a text file", "On paper", "In your browser"], answer: 0 },
    { question: "What is ransomware?", options: ["A type of malware", "A type of firewall", "A secure protocol", "None of the above"], answer: 0 },
    { question: "What is a DDoS attack?", options: ["A type of malware", "A network attack", "A phishing scam", "A password attack"], answer: 1 },
    { question: "What is the purpose of a CAPTCHA?", options: ["To block bots", "To encrypt data", "To manage passwords", "To scan for malware"], answer: 0 },
    { question: "What is a zero-day vulnerability?", options: ["A known security flaw", "An unpatched security flaw", "A type of malware", "A type of firewall"], answer: 1 },
    { question: "What is the safest way to connect to public Wi-Fi?", options: ["Use a VPN", "Disable antivirus", "Turn off encryption", "Use any open network"], answer: 0 },
    { question: "What is a keylogger?", options: ["A type of malware", "A password manager", "A network tool", "A firewall"], answer: 0 },
    { question: "What is the purpose of two-factor authentication?", options: ["To encrypt data", "To add an extra layer of security", "To manage passwords", "To block malware"], answer: 1 },
    { question: "What is a botnet?", options: ["A network of infected devices", "A type of firewall", "A secure protocol", "A password manager"], answer: 0 },
    { question: "What is the purpose of a security patch?", options: ["To fix vulnerabilities", "To block ads", "To speed up your computer", "To manage passwords"], answer: 0 },
    { question: "What is the safest way to handle sensitive documents?", options: ["Store them in a secure cloud", "Email them to yourself", "Save them on a public computer", "Share them via unencrypted email"], answer: 0 },
    { question: "What is the purpose of a digital certificate?", options: ["To verify identity", "To encrypt data", "To block malware", "To manage passwords"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 180;

const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-button');
const progressBar = document.getElementById('progress');
const timerElement = document.getElementById('time-left');
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        quizContainer.innerHTML = `
            <p>${q.question}</p>
            ${q.options.map((option, index) => `
                <label>
                    <input type="radio" name="answer" value="${index}">
                    ${option}
                </label><br>
            `).join('')}
        `;
        progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    } else {
        localStorage.setItem('score', score);
        window.location.href = 'results.html';
    }
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 10) {
            timerElement.classList.add('warning');
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            localStorage.setItem('score', score);
            window.location.href = 'results.html';
        }
    }, 1000);
}

submitButton.addEventListener('click', () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        if (parseInt(selected.value) === questions[currentQuestion].answer) {
            score++;
            correctSound.play();
            quizContainer.classList.add('correct-feedback');
        } else {
            incorrectSound.play();
            quizContainer.classList.add('incorrect-feedback');
        }
        setTimeout(() => quizContainer.classList.remove('correct-feedback', 'incorrect-feedback'), 500);
    }
    currentQuestion++;
    loadQuestion();
});

loadQuestion();
startTimer();
