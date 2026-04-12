import { saveTheme, getTheme, applyTheme } from "./storage.js";

const board = document.getElementById("gameBoard");
const attemptsDisplay = document.getElementById("attempts");
const resetBtn = document.getElementById("reset");
const form = document.getElementById("scoreForm");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

let attempts = 0;
let flipped = [];

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
    if (!card || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    card.innerHTML = `<img src="${card.dataset.img}" alt="food card">`;

    flipped.push(card);

    if (flipped.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;

        const [c1, c2] = flipped;

        if (c1.dataset.img !== c2.dataset.img) {
            c1.classList.remove("fade-out");
            c2.classList.remove("fade-out");

            setTimeout(() => {
                c1.classList.remove("flipped", "fade-out");
                c2.classList.remove("flipped", "fade-out");

                c1.innerHTML = `<img src="images/back.png" alt="card back">`;
                c2.innerHTML = `<img src="images/back.png" alt="card back">`;
            }, 800);
        } else {
            let best = getBestScore();
            if (best == 0 || attempts < best) {
                saveBestScore(attempts);
            }
        }

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
    attempts = 0;
    attemptsDisplay.textContent = attempts;
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
