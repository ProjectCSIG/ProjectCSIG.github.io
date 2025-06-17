const scenarios = [
    {
        scenario: "You receive an email from an unknown sender asking for your password. What do you do?",
        options: [
            { text: "Ignore the email.", score: 20 },
            { text: "Reply with your password.", score: -20 },
            { text: "Click the link to investigate.", score: -10 }
        ]
    },
    {
        scenario: "You are setting up a new account. What password do you choose?",
        options: [
            { text: "123456", score: -20 },
            { text: "P@ssw0rd!", score: 20 },
            { text: "password", score: -10 }
        ]
    },
    {
        scenario: "You are browsing a website, and a pop-up claims you've won a prize. What do you do?",
        options: [
            { text: "Click the pop-up to claim your prize.", score: -20 },
            { text: "Close the pop-up immediately.", score: 20 },
            { text: "Enter your email to learn more.", score: -10 }
        ]
    },
    {
        scenario: "Your friend asks for your Wi-Fi password. What do you do?",
        options: [
            { text: "Share it without hesitation.", score: -10 },
            { text: "Politely refuse and explain why.", score: 20 },
            { text: "Change the password and share it.", score: 10 }
        ]
    },
    {
        scenario: "You find a USB drive in the parking lot. What do you do?",
        options: [
            { text: "Plug it into your computer to check.", score: -20 },
            { text: "Hand it over to IT or security.", score: 20 },
            { text: "Leave it where you found it.", score: 10 }
        ]
    },
    {
        scenario: "You are using public Wi-Fi at a coffee shop. What do you do?",
        options: [
            { text: "Access sensitive accounts.", score: -20 },
            { text: "Use a VPN for secure browsing.", score: 20 },
            { text: "Avoid using the Wi-Fi altogether.", score: 10 }
        ]
    },
    {
        scenario: "Your antivirus software subscription has expired. What do you do?",
        options: [
            { text: "Ignore it and continue browsing.", score: -20 },
            { text: "Renew the subscription immediately.", score: 20 },
            { text: "Uninstall the antivirus software.", score: -10 }
        ]
    },
    {
        scenario: "You receive a friend request from someone you don't know on social media. What do you do?",
        options: [
            { text: "Accept the request.", score: -20 },
            { text: "Ignore the request.", score: 20 },
            { text: "Message them to ask who they are.", score: -10 }
        ]
    },
    {
        scenario: "You notice a suspicious login attempt on your account. What do you do?",
        options: [
            { text: "Ignore it.", score: -20 },
            { text: "Change your password immediately.", score: 20 },
            { text: "Log out of all devices.", score: 10 }
        ]
    },
    {
        scenario: "You are asked to download a file from an untrusted website. What do you do?",
        options: [
            { text: "Download it anyway.", score: -20 },
            { text: "Verify the source first.", score: 20 },
            { text: "Avoid downloading it.", score: 10 }
        ]
    },
    {
        scenario: "You receive a call claiming to be from your bank asking for your account details. What do you do?",
        options: [
            { text: "Provide the details.", score: -20 },
            { text: "Hang up and call the bank directly.", score: 20 },
            { text: "Ignore the call.", score: 10 }
        ]
    },
    {
        scenario: "You are asked to install a browser extension from an unknown source. What do you do?",
        options: [
            { text: "Install it.", score: -20 },
            { text: "Research the extension first.", score: 20 },
            { text: "Avoid installing it.", score: 10 }
        ]
    },
    {
        scenario: "You notice your computer is running slower than usual. What do you do?",
        options: [
            { text: "Ignore it.", score: -10 },
            { text: "Run a malware scan.", score: 20 },
            { text: "Restart your computer.", score: 10 }
        ]
    },
    {
        scenario: "You receive a link to a free software download from an unknown source. What do you do?",
        options: [
            { text: "Download and install it.", score: -20 },
            { text: "Verify the source first.", score: 20 },
            { text: "Ignore the link.", score: 10 }
        ]
    },
    {
        scenario: "You are asked to share your personal information on a survey website. What do you do?",
        options: [
            { text: "Share the information.", score: -20 },
            { text: "Verify the website's legitimacy.", score: 20 },
            { text: "Avoid sharing any information.", score: 10 }
        ]
    },
    {
        scenario: "You notice a strange app installed on your phone. What do you do?",
        options: [
            { text: "Ignore it.", score: -20 },
            { text: "Uninstall the app immediately.", score: 20 },
            { text: "Run a security scan.", score: 10 }
        ]
    },
    {
        scenario: "You are asked to click on a link to claim a prize. What do you do?",
        options: [
            { text: "Click the link.", score: -20 },
            { text: "Verify the link's legitimacy.", score: 20 },
            { text: "Ignore the link.", score: 10 }
        ]
    },
    {
        scenario: "You are asked to disable your antivirus software to install a program. What do you do?",
        options: [
            { text: "Disable the antivirus.", score: -20 },
            { text: "Refuse and verify the program.", score: 20 },
            { text: "Ignore the request.", score: 10 }
        ]
    },
    {
        scenario: "You receive a notification about a software update. What do you do?",
        options: [
            { text: "Ignore the update.", score: -10 },
            { text: "Install the update immediately.", score: 20 },
            { text: "Research the update first.", score: 10 }
        ]
    },
    {
        scenario: "You are asked to share your password with a colleague. What do you do?",
        options: [
            { text: "Share the password.", score: -20 },
            { text: "Politely refuse and explain why.", score: 20 },
            { text: "Change the password and share it.", score: 10 }
        ]
    },
    {
        scenario: "You notice a pop-up asking for your credit card details. What do you do?",
        options: [
            { text: "Enter your details.", score: -20 },
            { text: "Close the pop-up immediately.", score: 20 },
            { text: "Report the pop-up.", score: 10 }
        ]
    }
];

let currentScenario = 0;
let score = 0;

const scenarioContainer = document.getElementById('scenario-container');
const feedbackContainer = document.getElementById('feedback-container');
const scoreContainer = document.getElementById('score');
const progressBar = document.getElementById('progress');
const decisionSound = document.getElementById('decision-sound');

function loadScenario() {
    if (currentScenario < scenarios.length) {
        const scenario = scenarios[currentScenario];
        scenarioContainer.innerHTML = `
            <p>${scenario.scenario}</p>
            ${scenario.options.map((option, index) => `
                <button class="option-button" data-score="${option.score}" data-feedback="${option.text}">${option.text}</button>
            `).join('')}
        `;
        document.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const selectedScore = parseInt(e.target.getAttribute('data-score'));
                const feedbackText = e.target.getAttribute('data-feedback');
                score += selectedScore;
                scoreContainer.innerText = score;
                progressBar.style.width = `${((currentScenario + 1) / scenarios.length) * 100}%`;
                feedbackContainer.innerText = `You chose: "${feedbackText}"`;
                feedbackContainer.style.display = 'block';
                feedbackContainer.classList.add('feedback-animation');
                decisionSound.play();
                setTimeout(() => {
                    feedbackContainer.style.display = 'none';
                    feedbackContainer.classList.remove('feedback-animation');
                    currentScenario++;
                    loadScenario();
                }, 1500); // Delay for better user experience
            });
        });
    } else {
        localStorage.setItem('score', score);
        window.location.href = 'results.html';
    }
}

loadScenario();
