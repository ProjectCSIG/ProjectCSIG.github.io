const steps = [
    "Step 1: Open the browser's developer tools (Inspect Element).",
    "Step 2: Locate the hidden bank login credentials in the HTML (look for an element with ID 'hidden-credentials').",
    "Step 3: Type `verifyCredentials('admin', 'secure123')` into the console to simulate logging into the bank system.",
    "Step 4: Locate the encryption key in the HTML (look for an element with ID 'hidden-encryption-key').",
    "Step 5: Type `useEncryptionKey('3xmpl3K3y')` into the console to decrypt sensitive data.",
    "Step 6: Locate the security bypass token in the HTML (look for an element with ID 'hidden-bypass-token').",
    "Step 7: Type `bypassSecurity('T0k3n123')` into the console to gain admin access.",
    "Step 8: Type `transferFunds()` into the console to complete the hack."
];

let currentStep = 0;

function verifyCredentials(username, password) {
    if (currentStep === 2 && username === 'admin' && password === 'secure123') {
        currentStep++;
        updateInstructions();
        console.log("Verifying credentials...");
        setTimeout(() => console.log("Credentials verified successfully. Proceeding to the next step."), 1000);
    } else {
        console.error("Invalid credentials. Follow the instructions.");
    }
}

function useEncryptionKey(key) {
    if (currentStep === 4 && key === '3xmpl3K3y') {
        currentStep++;
        updateInstructions();
        console.log("Using encryption key...");
        setTimeout(() => console.log("Sensitive data decrypted successfully. Proceeding to the next step."), 1000);
    } else {
        console.error("Invalid encryption key. Follow the instructions.");
    }
}

function bypassSecurity(token) {
    if (currentStep === 6 && token === 'T0k3n123') {
        currentStep++;
        updateInstructions();
        console.log("Bypassing security...");
        setTimeout(() => console.log("Admin access granted. Proceeding to the next step."), 1000);
    } else {
        console.error("Invalid bypass token. Follow the instructions.");
    }
}

function transferFunds() {
    if (currentStep === 7) {
        console.log("Initiating fund transfer...");
        setTimeout(() => {
            console.log("Funds transferred successfully. Hack complete!");
            window.location.href = "hack-finished.html"; // Redirect to the hack finished page
        }, 1000);
    } else {
        console.error("Invalid action. Follow the instructions.");
    }
}

function updateInstructions() {
    const instructions = document.getElementById("instructions");
    instructions.innerHTML = `<p>${steps[currentStep]}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    const storylineScreen = document.getElementById("storyline-screen");
    const instructionsScreen = document.getElementById("instructions-screen");
    const startButton = document.getElementById("start-button");
    const nextButton = document.getElementById("next-button");

    startButton.addEventListener("click", () => {
        storylineScreen.style.display = "none";
        instructionsScreen.style.display = "block";
        updateInstructions();
    });

    nextButton.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            updateInstructions();
        } else {
            document.getElementById("feedback-container").innerText = "You've reached the end of the instructions.";
        }
    });
});
