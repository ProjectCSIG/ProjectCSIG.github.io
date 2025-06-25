/// Clear overlay effects
function clearEffects() {
  const overlay = document.getElementById('overlay');
  overlay.classList.remove('flash', 'flicker', 'glitch');
}

// Game variables
let currentScenario = null;
let playerRole = null;

// Scenarios object with branching paths and longer text
const scenarios = {
  hacker: [
    {
      id: 1,
      text: `You’ve found a vulnerable server with outdated software. What do you do?`,
      choices: [
        { text: 'Exploit the vulnerability to gain access.', nextId: 2, effect: 'glitch' },
        { text: 'Scan further for more vulnerabilities.', nextId: 3, effect: 'flicker' },
      ]
    },
    {
      id: 2,
      text: `You’ve exploited the vulnerability and gained access.\nYou find encrypted files—do you try to decrypt or plant malware?`,
      choices: [
        { text: 'Attempt to decrypt files.', nextId: 4, effect: 'flash' },
        { text: 'Plant malware for future access.', nextId: 5, effect: 'glitch' },
      ]
    },
    {
      id: 3,
      text: `Scanning reveals a backup server with weak passwords.\nDo you try brute force attack or phishing to get credentials?`,
      choices: [
        { text: 'Brute force the password.', nextId: 5, effect: 'flicker' },
        { text: 'Launch a phishing campaign.', nextId: 6, effect: 'flash' },
      ]
    },
    {
      id: 4,
      text: `You decrypted the files and found sensitive user data.\nSecurity is tightening; do you exfiltrate data quickly or cover tracks first?`,
      choices: [
        { text: 'Exfiltrate data immediately.', nextId: 'win', effect: 'flash' },
        { text: 'Cover tracks before exfiltrating.', nextId: 'lose', effect: 'glitch' },
      ]
    },
    {
      id: 5,
      text: `Malware planted successfully, but security detected unusual activity.\nDo you disconnect or try to confuse the defenders?`,
      choices: [
        { text: 'Disconnect and cover tracks.', nextId: 'win', effect: 'flash' },
        { text: 'Deploy fake signals to confuse defenders.', nextId: 'lose', effect: 'flicker' },
      ]
    },
    {
      id: 6,
      text: `Phishing campaign launched, but your email was traced.\nYou’re caught before accessing the system.\nGame over.`,
      choices: []
    },
  ],

  defender: [
    {
      id: 1,
      text: `You notice strange login attempts from an unknown IP.\nDo you block the IP or monitor activity silently?`,
      choices: [
        { text: 'Block the IP immediately.', nextId: 2, effect: 'flash' },
        { text: 'Monitor silently for more info.', nextId: 3, effect: 'flicker' },
      ]
    },
    {
      id: 2,
      text: `IP blocked. Attackers switch tactics and start phishing attempts.\nDo you educate employees or enhance email filters?`,
      choices: [
        { text: 'Conduct employee cybersecurity training.', nextId: 4, effect: 'glitch' },
        { text: 'Deploy advanced email filtering.', nextId: 5, effect: 'flash' },
      ]
    },
    {
      id: 3,
      text: `Monitoring reveals attacker uses social engineering.\nDo you simulate a phishing attack to test employees or tighten network security?`,
      choices: [
        { text: 'Simulate phishing attack.', nextId: 4, effect: 'flicker' },
        { text: 'Increase network security protocols.', nextId: 5, effect: 'glitch' },
      ]
    },
    {
      id: 4,
      text: `Employees trained and alert.\nPhishing attempts reduced significantly.\nDo you invest in threat detection software or hire a security consultant?`,
      choices: [
        { text: 'Invest in threat detection software.', nextId: 'win', effect: 'flash' },
        { text: 'Hire an external security consultant.', nextId: 'lose', effect: 'glitch' },
      ]
    },
    {
      id: 5,
      text: `Email filters updated.\nSome phishing emails still got through.\nData breach occurred.\nGame over.`,
      choices: []
    }
  ]
};

// Start the game by role
function startGame(role) {
  playerRole = role;
  currentScenario = 1;
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('end-screen').classList.add('hidden');
  document.getElementById('scenario-screen').classList.remove('hidden');
  showScenario(currentScenario);
}

// Show scenario text and choices
function showScenario(id) {
  clearEffects();

  const scenario = scenarios[playerRole].find(s => s.id === id);
  if (!scenario) {
    // Scenario not found, end game with error
    showEnd('Error: Scenario not found!');
    return;
  }

  // Check for win or lose id
  if (id === 'win') {
    showEnd('🎉 Congratulations! You succeeded!');
    return;
  } else if (id === 'lose') {
    showEnd('💥 You failed. Better luck next time!');
    return;
  }

  const scenarioText = document.getElementById('scenario-text');
  const choicesDiv = document.getElementById('choices');

  scenarioText.textContent = scenario.text;
  choicesDiv.innerHTML = '';

  scenario.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.onclick = () => {
      playEffect(choice.effect);
      setTimeout(() => {
        showScenario(choice.nextId);
      }, 600);
    };
    choicesDiv.appendChild(btn);
  });
}

// Show end screen with message
function showEnd(message) {
  clearEffects();
  document.getElementById('scenario-screen').classList.add('hidden');
  const endScreen = document.getElementById('end-screen');
  document.getElementById('end-message').textContent = message;
  endScreen.classList.remove('hidden');
}

// Restart game
function restartGame() {
  playerRole = null;
  currentScenario = null;
  document.getElementById('end-screen').classList.add('hidden');
  document.getElementById('scenario-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
}

// Play screen effect based on effect name
function playEffect(effect) {
  clearEffects();
  const overlay = document.getElementById('overlay');
  if (effect && ['flash', 'flicker', 'glitch'].includes(effect)) {
    overlay.classList.add(effect);
  }
}
