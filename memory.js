const terms = [
    { term: "Phishing", definition: "An email scam to steal personal information." },
    { term: "Firewall", definition: "A network security system that monitors traffic." },
    { term: "VPN", definition: "A virtual private network for secure browsing." },
    { term: "Malware", definition: "Malicious software designed to harm systems." },
    { term: "Encryption", definition: "The process of encoding data for security." },
    { term: "Ransomware", definition: "Malware that demands payment to unlock data." }
];

let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let matches = 0;

const memoryGame = document.getElementById("memory-game");
const matchesDisplay = document.getElementById("matches");

function shuffleCards() {
    shuffledCards = [...terms.map(card => ({ ...card, type: "term" })), 
                     ...terms.map(card => ({ ...card, type: "definition" }))]
                     .sort(() => Math.random() - 0.5);
}

function createCardElement(card, index) {
    const content = card.type === "term" ? card.term : card.definition;
    return `
        <div class="memory-card" data-index="${index}" data-term="${card.term}" data-type="${card.type}">
            <div class="card-front">?</div>
            <div class="card-back">${content}</div>
        </div>
    `;
}

function loadCards() {
    shuffleCards();
    memoryGame.innerHTML = shuffledCards.map((card, index) => createCardElement(card, index)).join("");
    document.querySelectorAll(".memory-card").forEach(card => {
        card.addEventListener("click", handleCardClick);
    });
}

function handleCardClick(e) {
    const card = e.currentTarget;
    if (card.classList.contains("flipped") || secondCard) return;

    card.classList.add("flipped");
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    const term1 = firstCard.dataset.term;
    const term2 = secondCard.dataset.term;
    const type1 = firstCard.dataset.type;
    const type2 = secondCard.dataset.type;

    if (term1 === term2 && type1 !== type2) {
        matches++;
        matchesDisplay.innerText = matches;
        firstCard = null;
        secondCard = null;
        if (matches === terms.length) {
            setTimeout(() => alert("Congratulations! You matched all terms!"), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

loadCards();
