import { saveTheme, getTheme, applyTheme } from "./storage.js";

const board = document.getElementById("gameBoard");
const attemptsDisplay = document.getElementById("attempts");
const resetBtn = document.getElementById("reset");
const form = document.getElementById("scoreForm");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

let attempts = 0;
let flipped = [];
let isProcessing = false;

const cards = [
    { id: 1, img: "images/burger.png" },
    { id: 2, img: "images/burger.png" },
    { id: 3, img: "images/drink.png" },
    { id: 4, img: "images/drink.png" },
    { id: 5, img: "images/icecream.png" },
    { id: 6, img: "images/icecream.png" }
];

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function renderBoard() {
    board.innerHTML = "";

    shuffle(cards).forEach(card => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `<img src="images/back.png" alt="card back">`;

        div.dataset.img = card.img;

        div.setAttribute("tabindex", "0");
        div.setAttribute("role", "button");

        div.addEventListener("click", handleClick);

        div.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") handleClick(e);
        });

        board.appendChild(div);
    });
}

function handleClick(e) {
    const card = e.target.closest(".card");
    if (!card || card.classList.contains("flipped") || isProcessing) return;

    card.classList.add("flipped");
    card.innerHTML = `<img src="${card.dataset.img}" alt="food card">`;

    flipped.push(card);

    if (flipped.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;

        const [c1, c2] = flipped;

        if (c1.dataset.img !== c2.dataset.img) {
    isProcessing = true;

    c1.classList.add("fade-out");
    c2.classList.add("fade-out");

    setTimeout(() => {
        c1.classList.remove("flipped", "fade-out");
        c2.classList.remove("flipped", "fade-out");

        c1.innerHTML = `<img src="images/back.png" alt="card back">`;
        c2.innerHTML = `<img src="images/back.png" alt="card back">`;

        isProcessing = false;
    }, 800);
}

// ✅ ALWAYS reset after checking
flipped = [];
    }
}

const themeBtn = document.getElementById("themeToggle");

themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
});


resetBtn.addEventListener("click", () => {
    flipped = [];
    isProcessing = false;
    attempts = 0;
    attemptsDisplay.textContent = attempts;

    board.innerHTML = ""; // 🔥 ensures clean wipe
    renderBoard();
});

console.log("Type wowsier() in console");
const attemptDisplay = document.getElementById("attempts");
window.wowsier = () => {
    attempts = 100;
    if (attemptDisplay) {
        attemptsDisplay.textContent = attempts;
    }
    console.log("whoops that wasnt supposed to happen");
};

renderBoard();
