const simulationSteps = [
    { message: "🤖 Woah! Connecting to the super cool target server...", expected: "connect" },
    { message: "🔥 Bypassing the mega fortress firewall like a pro...", expected: "bypass" },
    { message: "💥 Injecting our secret ninja payload...", expected: "inject" },
    { message: "🕵️‍♂️ Sneaking into the secure treasure vault...", expected: "access" },
    { message: "🔓 Decrypting hidden sticker messages...", expected: "decrypt" },
    { message: "🕹️ Extracting ultra-awesome cheat codes...", expected: "extract" },
    { message: "📥 Downloading secret level data... Get ready for some magic!", expected: "download" },
    { message: "🏆 Finishing mission and cleaning up our digital tracks...", expected: "finish" }
];

// Extra fun messages to simulate deeper interaction
const extraMessages = [
    "✨ Zapping silly glitches...",
    "🚀 Boosting turbo speed to hyper mode...",
    "🎮 Loading epic game mode...",
    "🍭 Mixing magical potion codes...",
    "🦸 Activating superhero powers...",
    "🌈 Creating rainbows in the code...",
    "💡 Sparking brilliant ideas...",
    "😎 Rocking the digital world!"
];

let currentStep = 0;
const terminal = document.getElementById("hacking-terminal");
const progressBar = document.getElementById("hacking-progress");
const instructionsDiv = document.getElementById("instructions");
const commandContainer = document.getElementById("command-container");
const startButton = document.getElementById("startHack");
const executeButton = document.getElementById("executeCommand");
const commandInput = document.getElementById("hack-command");
const progressBarContainer = document.getElementById("hacking-progress-bar");

function appendMessage(msg) {
    const p = document.createElement("p");
    p.innerText = msg;
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
}

function updateProgress() {
    const percent = (currentStep / simulationSteps.length) * 100;
    progressBar.style.width = percent + "%";
}

function displayExtraMessages(callback) {
    // Display a random extra message before the next step
    const msg = extraMessages[Math.floor(Math.random() * extraMessages.length)];
    appendMessage(msg);
    setTimeout(callback, 1000);
}

function processCommand() {
    const userCommand = commandInput.value.trim().toLowerCase();
    if (userCommand === simulationSteps[currentStep].expected) {
        appendMessage("Command accepted. Initiating sequence...");
        setTimeout(() => {
            displayExtraMessages(() => {
                appendMessage(simulationSteps[currentStep].message);
                updateProgress();
                currentStep++;
                commandInput.value = "";
                if (currentStep < simulationSteps.length) {
                    appendMessage(`Awaiting command: type "${simulationSteps[currentStep].expected}"`);
                } else {
                    appendMessage("Hacking Successful! Classified data acquired!");
                    progressBar.style.width = "100%";
                    commandContainer.style.display = "none";
                }
            });
        }, 800);
    } else {
        appendMessage(`Incorrect command! Expected "${simulationSteps[currentStep].expected}". Try again.`);
        commandInput.value = "";
    }
}

startButton.addEventListener("click", () => {
    // Hide instructions and show simulation elements
    instructionsDiv.style.display = "none";
    terminal.style.display = "block";
    progressBarContainer.style.display = "block";
    commandContainer.style.display = "block";
    appendMessage("Hacking simulation initiated. Prepare for an epic cyber intrusion!");
    appendMessage(`Awaiting command: type "${simulationSteps[currentStep].expected}"`);
});

executeButton.addEventListener("click", processCommand);

commandInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        processCommand();
    }
});
