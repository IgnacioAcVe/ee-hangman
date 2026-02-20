
// version 1.0.0

// No borrar ni modificar las constantes y variables que ya están declaradas, ya que son necesarias para el funcionamiento del juego.
// Simplemente comenta las líneas indicadas más abajo una vez hagas las pruebas del funcionamiento del código inicial.

let username = "";

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ------------------- Ejemplo para pedir datos al usuario ----------------------

// Llama a la función getUserInput para obtener la entrada del usuario.
// De esta manera debes pedir datos al usuario durante el juego.
// Simplemente guardarás la respuesta en otra variable para el fin que corresponda.

// username = await getUserInput("What is your name?"); // COMENTA esta linea cuando empieces a programar.

// ------------------- Función para pedir datos al usuario ----------------------
// Esta función se encarga de obtener la entrada del usuario a través de la consola. 
// Toma una pregunta como argumento, la muestra al usuario y espera su respuesta. 
// Una vez que el usuario ingresa su respuesta, la función devuelve esa respuesta como una cadena de texto.
function getUserInput(question) {
    return new Promise((resolve) => {
        rl.question(question + " ", (answer) => {
            resolve(answer);
        });
    });
}

//-------------------- Fin del código Espacio Educa ----------------------

// Recuerda que debes seguir las instrucciones del proyecto para completar el juego.
// Y no borres el código que ya está escrito, ya que es necesario para el funcionamiento del juego.
// Solo comenta las líneas indicadas más arriba.

// Get ur coffee and Empieza a codear!!

// Declara las variables que necesitas para el juego antes de llamar a la función startGame.

// Luego llama a la función startGame para iniciar el juego.

let userInput = "";

const words = [
    "abecedario", "absoluto", "abundancia", "academia", "accidente", "aceituna", "acertijo", "actividad", "adelante", "aventura",
    "aeropuerto", "agricultura", "alacran", "alegria", "alfombra", "alimento", "almanaque", "alquiler", "ambicion", "ambulancia",
    "amistad", "anatomia", "aniversario", "aprender", "arquitecto", "asombroso", "astronomia", "atardecer", "automovil", "baloncesto",
    "barbaridad", "biblioteca", "bicicleta", "biologia", "boligrafo", "brillante", "caballero", "calabaza", "calendario", "carretera",
    "castillo", "categoria", "celebrar", "centigrados", "cientifico", "cinturon", "ciudadano", "cocodrilo", "coleccion", "colombia",
    "compartir", "computadora", "conciencia", "condicion", "confianza", "construir", "creatividad", "cuaderno", "cumpleanos", "desayuno",
    "descubrir", "desierto", "diamante", "dinosaurio", "distancia", "documento", "educacion", "ejercicio", "elefante", "elegante",
    "emocion", "empleado", "enigma", "escalera", "escritura", "esfuerzo", "espectaculo", "esperanza", "esqueleto", "estacion",
    "estrella", "estudiante", "experiencia", "explicar", "expresion", "fantastico", "felicidad", "fortaleza", "fotografia", "generoso",
    "geografia", "guitarra", "herramienta", "hospital", "iluminar", "imaginacion", "importante", "incendio", "inteligente", "izquierda"
];

let validLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let guessedWords = [];

let guessedLetters = [];

let usedLetters = [];

let lives = 3;

let wins = 0;

let losses = 0;

let currentWord = getRandomWord();

guessedWords.push(currentWord);

startGame();

async function startGame() {
    console.log("Te doy la bienvenida al hangman game de Espacio Educa :)");
    console.log("El juego consiste en adivinar la palabra secreta, letra por letra.");
    console.log("Vas a contar con 3 vidas por cada palabra, si pierdes las 3 vidas, el juego termina.");
    console.log("Para terminar el juego debes escribir el numero de cedula del creador del juego (sin espacios ni guiones) en cualquier instancia del juego.");
    console.log("Quedan " + words.length + " palabras por adivinar.");
    console.log("¡Buena suerte!");

    let turn = 0;

    while (userInput !== "28443153") {

        if (turn > 0) {
            if (validateInput(userInput)) {
                if (hasBeenUsed(userInput)) {
                    userInput = await getUserInput("Ya has usado esa letra antes. Intenta con otra letra. Pulsa Enter...");
                } else {
                    if (checkLetter(userInput)) {
                        userInput = await getUserInput("¡Excelente muchachon! Has adivinado una letra. Pulsa Enter...");
                        if (checkWordStatus()) {
                            console.log("¡Felicidades! Has adivinado la palabra: " + currentWord);
                            wins++;
                            console.log("Pulsa Enter para empezar otra ronda...");
                            console.log("");
                            userInput = await getUserInput("");
                            reset();
                            if (currentWord === "Expelliarmus") {
                                console.log("¡Has adivinado todas las palabras disponibles! El juego ha terminado. Gracias por jugar :)");
                                return rl.close();
                            }
                            console.log("Quedan " + words.length + " palabras por adivinar.");
                        }
                    } else {
                        lives--;
                        userInput = await getUserInput("¡El diablazo! Esa letra no está en la palabra. Has perdido una vida. Pulsa Enter...");
                    }
                }
            } else {
                userInput = await getUserInput("Entrada no válida. Por favor ingresa una letra válida. Pulsa Enter...");
            }
        }

        if (lives <= 0) {
            console.log("¡Has perdido todas tus vidas! La palabra era: " + currentWord);
            losses++;
            console.log("Pulsa Enter para empezar otra ronda...");
            console.log("");
            userInput = await getUserInput("");
            reset();
            if (currentWord === "Expelliarmus") {
                console.log("¡Has adivinado todas las palabras disponibles! El juego ha terminado. Gracias por jugar :)");
                return rl.close();
            }
            console.log("Quedan " + words.length + " palabras por adivinar.");
        }

        console.log("");
        console.log("Victorias: " + wins + " | Derrotas: " + losses);
        console.log("Vidas restantes: " + lives);
        console.log("Tu palabra tiene " + currentWord.length + " letras.");
        console.log(getUsedLetters());
        console.log("");

        console.log(currentRoundStatus());
        console.log("");

        userInput = await getUserInput("Ingresa una letra o intenta adivinar la palabra completa:");

        turn++;

    }

    console.log("");
    console.log("Fin del juego. Gracias por jugar :)");
    return rl.close();
}

function getRandomWord() {
    if (words.length === 0) return "Expelliarmus";
    let word = "";
    const randomIndex = Math.floor(Math.random() * words.length);
    word = words[randomIndex];
    words.splice(randomIndex, 1);
    return word;
}

function currentRoundStatus() {

    let output = "";

    for (let i = 0; i < currentWord.length; i++) {
        if (guessedLetters.includes(currentWord[i].toUpperCase())) {
            output += currentWord[i].toUpperCase() + " ";
        } else {
            output += "_ ";
        }
    }

    return output;

}

function getUsedLetters() {

    let output = "";

    if (usedLetters.length > 0) {
        output += "Letras usadas: ";
        for (let i = 0; i < usedLetters.length; i++) {
            output += usedLetters[i] + " ";
        }
        return output;
    } else {
        return "No has usado ninguna letra aún.";
    }
}

function validateInput(input) {

    if (input.length === 1 && validLetters.includes(input.toUpperCase())) {
        return true;
    } else {
        return false;
    }
}

function hasBeenUsed(letter) {

    if (usedLetters.includes(letter.toUpperCase())) {
        return true;
    } else {
        usedLetters.push(letter.toUpperCase());
        return false;
    }
}

function checkLetter(letter) {

    if (currentWord.toUpperCase().includes(letter.toUpperCase())) {
        guessedLetters.push(letter.toUpperCase());
        return true;
    } else {
        return false;
    }
}

function checkWordStatus() {

    for (let i = 0; i < currentWord.length; i++) {
        if (!guessedLetters.includes(currentWord[i].toUpperCase())) {
            return false;
        }
    }

    return true;

}

function reset() {
    lives = 3;
    guessedLetters = [];
    usedLetters = [];
    currentWord = getRandomWord();
    guessedWords.push(currentWord);
}
