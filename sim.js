// ==== Data ====

const hackerScenarios = [
    {
        text: "🔍 You discover an exposed S3 bucket. Steal data or plant malware?",
        choices: [
            { text: "Steal Data", result: "💾 You grabbed the data!", win: true, effect: "flash", next: 1 },
            { text: "Plant Malware", result: "💣 Malware uploaded!", win: true, effect: "glitch", next: 2 }
        ]
    },
    {
        text: "📧 You use the stolen data for spear phishing. Attack HR or Finance?",
        choices: [
            { text: "Attack HR", result: "✅ HR credentials stolen!", win: true, effect: "flash", next: 3 },
            { text: "Attack Finance", result: "❌ Finance spotted the scam.", win: false, effect: "flicker", next: 3 }
        ]
    },
    {
        text: "🖥️ Malware beacon alerts: Deploy ransomware or backdoor?",
        choices: [
            { text: "Ransomware", result: "💀 Files encrypted. Big payday.", win: true, effect: "glitch", next: 3 },
            { text: "Backdoor", result: "🛠️ Long-term access achieved.", win: true, effect: "flash", next: 3 }
        ]
    },
    {
        text: "💻 Final step: Sell data on dark web or leak publicly?",
        choices: [
            { text: "Sell", result: "🤑 Big profits from buyers.", win: true, effect: "flash" },
            { text: "Leak", result: "🌍 Leak causes media chaos!", win: true, effect: "glitch" }
        ]
    }
];

const defenderScenarios = [
    {
        text: "🚨 Your IDS detects brute force login. Immediate action?",
        choices: [
            { text: "Block IP", result: "🔐 Attackers blocked.", win: true, effect: "flash", next: 1 },
            { text: "Ignore", result: "💀 Breach occurred.", win: false, effect: "glitch", next: 1 }
        ]
    },
    {
        text: "⚠️ Malware detected spreading. Act now!",
        choices: [
            { text: "Pull network cable", result: "🛑 Contained quickly.", win: true, effect: "flash", next: 2 },
            { text: "Run antivirus", result: "❌ Too slow.", win: false, effect: "flicker", next: 2 }
        ]
    },
    {
        text: "👀 Phishing reported. Mitigation?",
        choices: [
            { text: "Reset passwords company-wide", result: "🔐 Attack stopped.", win: true, effect: "flash", next: 3 },
            { text: "Ignore", result: "💀 Compromise spread.", win: false, effect: "glitch", next: 3 }
        ]
    },
    {
        text: "🛡️ Final move: Implement firewall upgrade or train staff?",
        choices: [
            { text: "Upgrade Firewall", result: "🧱 Threats reduced significantly.", win: true, effect: "flash" },
            { text: "Staff Training", result: "🎓 Phishing success drops 90%.", win: true, effect: "flash" }
        ]
    }
];

// ==== Game State ====

let currentRole = '';
let currentScenarios = [];
let currentScenarioIndex = 0;
let score = 0;
let badges = [];

const badgeList = {
    hacker: ["💻 Script Kiddie", "💣 Malware Expert", "🕶️ Shadow Operator", "🧠 Cyber Overlord"],
    defender: ["🛡️ Rookie Defender", "🧯 Incident Responder", "🔐 Security Engineer", "👑 Cyber Guardian"]
};

// ==== Audio ====

function playSound(id) {
    const sound = document.getElementById(id);
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}

// ==== Typewriter ====

function typeText(text, elementId, callback) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;
    playSound('typeSound');

    const interval = setInterval(() => {
        el.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            playSound('typeSound').pause;
            if (callback) callback();
        }
    }, 25);
}

// ==== Timer ====

let timerInterval;
let timeLeft = 20;

function startTimer() {
    timeLeft = 20;
    updateTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            handleTimeout();
        }
    }, 1000);
}

function updateTimer() {
    document.getElementById('timer').innerText = `⏱️ Time Left: ${timeLeft}s`;
}

function handleTimeout() {
    playSound('failSound');
    triggerEffect('glitch');
    alert("⌛ Timeout! Opportunity lost.");
    currentScenarioIndex++;
    updateScenario();
}

// ==== Effects ====

function triggerEffect(effect) {
    const overlay = document.getElementById('overlay');
    overlay.classList.add(effect);
    setTimeout(() => overlay.classList.remove(effect), 500);
}

// ==== Game Functions ====

function startGame(role) {
    currentRole = role;
    currentScenarios = role === 'hacker' ? hackerScenarios : defenderScenarios;
    currentScenarioIndex = 0;
    score = 0;
    badges = [];

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('scenario-screen').classList.remove('hidden');

    updateScenario();
}

function updateScenario() {
    clearInterval(timerInterval);
    clearEffects();

    if (currentScenarioIndex >= currentScenarios.length) {
        endGame();
        return;
    }

    const scenario = currentScenarios[currentScenarioIndex];

    document.getElementById('role-title').innerText = currentRole === 'hacker' ? "🕶️ Hacker Mode" : "🛡️ Defender Mode";
    typeText(scenario.text, 'scenario-text', () => {
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';

        scenario.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.innerText = choice.text;
            btn.onclick = () => selectChoice(choice);
            choicesDiv.appendChild(btn);
        });

        startTimer();
    });

    document.getElementById('score').innerText = score;
    document.getElementById('badges').innerText = badges.join(', ') || "None";
}

function selectChoice(choice) {
    clearInterval(timerInterval);
    triggerEffect(choice.effect);
    if (choice.win) {
        playSound('successSound');
        score += 1;
    } else {
        playSound('failSound');
    }

    alert(choice.result);

    if (choice.next !== undefined) {
        currentScenarioIndex = choice.next;
    } else {
        currentScenarioIndex++;
    }

    updateScenario();
}

function endGame() {
    assignBadge();

    document.getElementById('scenario-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');

    document.getElementById('result-text').innerText = score > 0
        ? "🔥 Great job! You handled cybersecurity threats like a pro."
        : "💀 Ouch. The attackers won this round. Train harder!";

    document.getElementById('final-score').innerText = score;
    document.getElementById('final-badges').innerText = badges.join(', ') || "None";

    updateLeaderboard();
}

function assignBadge() {
    const badgeSet = currentRole === 'hacker' ? badgeList.hacker : badgeList.defender;
    const badge = badgeSet[Math.min(score, badgeSet.length - 1)];
    if (badge) badges.push(badge);
}

function restartGame() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

// ==== Leaderboard ====

function updateLeaderboard() {
    const key = `${currentRole}-highscore`;
    const highscore = Math.max(localStorage.getItem(key) || 0, score);
    localStorage.setItem(key, highscore);

    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = `
        <li>🕶️ Hacker High Score: ${localStorage.getItem('hacker-highscore') || 0}</li>
        <li>🛡️ Defender High Score: ${localStorage.getItem('defender-highscore') || 0}</li>
    `;
}

window.onload = updateLeaderboard;
