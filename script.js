// 1. Configuración inicial
const palabras = ["BIBLIOTECA", "COMPUTADORA", "AVENTURA", "ESTUDIANTE", "FORTALEZA"];
let validLetters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
let selectedWord = "";
let displayWord = [];
let lives = 3;
let wins = 0;
let losses = 0;

// Referencias al DOM
const wordDisplay = document.getElementById("word-display");
const keyboard = document.getElementById("keyboard");
const livesDisplay = document.getElementById("lives");
const wordsLeftDisplay = document.getElementById("words-left");
const winsDisplay = document.getElementById("wins");
const lossesDisplay = document.getElementById("losses");

// 2. Generar el teclado con Array.forEach
function createKeyboard() {
    keyboard.innerHTML = ""; // Limpiar
    validLetters.forEach(letra => {
        const btn = document.createElement("button");
        btn.innerText = letra;
        btn.classList.add("key-btn");
        btn.onclick = () => handleGuess(letra, btn);
        keyboard.appendChild(btn);
    });
}

// 3. Iniciar juego
function initGame() {
    if (palabras.length === 0) {
        alert("¡Felicidades! Completaste todas las palabras.");
        return;
    }

    lives = 3;
    const randomIndex = Math.floor(Math.random() * palabras.length);
    selectedWord = palabras.splice(randomIndex, 1)[0]; // Saca la palabra del array
    
    // Usamos .map para crear el array de guiones
    displayWord = selectedWord.split("").map(() => "_");
    
    updateUI();
    createKeyboard();
    resetHangman();
}

// 4. Manejar el intento del usuario
// Se activa cuando el usuario presiona una tecla
// Letter es la variable que contiene la letra que el usuario ha presionado
function handleGuess(letter, button) {
    button.disabled = true; // Deshabilitar tecla usada

    if (selectedWord.includes(letter)) {
        // Actualizar guiones usando forEach
        selectedWord.split("").forEach((wordLetter, index) => {
            if ( wordLetter === letter) displayWord[index] = letter;
        });
        button.style.background = "#22c55e"; // Color verde éxito
    } else {
        lives--;
        button.style.background = "#ef4444"; // Color rojo fallo
        updateHangmanVisual();
    }

    checkGameStatus();
    updateUI();
}

function checkGameStatus() {
    if (!displayWord.includes("_")) {
        wins++;
        alert("¡Ganaste! La palabra era: " + selectedWord);
        initGame();
    } else if (lives === 0) {
        losses++;
        alert("Perdiste. La palabra era: " + selectedWord);
        initGame();
    }
}

// Actualizar Interfaz de Usuario
function updateUI() {
    wordDisplay.innerText = displayWord.join(" ");
    livesDisplay.innerText = lives;
    wordsLeftDisplay.innerText = palabras.length;
    winsDisplay.innerText = wins;
    lossesDisplay.innerText = losses;
}

// Control visual del dibujo SVG según las vidas restantes
function updateHangmanVisual() {
    const parts = ["head", "body", "armL", "armR", "legL", "legR"];
    // Mostramos una parte según las vidas perdidas (asumiendo 6 partes, 
    // podrías ajustar tus vidas iniciales a 6 para que coincida)
    const partToShow = parts[3 - (lives + 1)]; 
    if(document.getElementById(partToShow)) {
        document.getElementById(partToShow).style.opacity = "1";
    }
}

// Reconstruir el dibujo
function resetHangman() {
    ["head", "body", "armL", "armR", "legL", "legR"].forEach(id => {
        document.getElementById(id).style.opacity = "0";
    });
}

// Iniciar por primera vez
document.getElementById("reset-btn").onclick = () => {
    location.reload(); // Reinicio total
};

initGame();