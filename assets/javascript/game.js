// Initialize variables
var wordBank = ["SUPERMAN", "BLACKWIDOW", "ROBIN", "STARLORD", "SHURI", "VALKYRIE", "DEADPOOL", "ELEKTRA", "SHAZAM", "DRAX", "MANTIS", "LOCKJAW", "OKOYE", "ROCKET", "MYSTIQUE", "STORM", "FIRESTORM", "CYBORG", "GAMORA", "GROOT", "BATMAN", "SPIDERMAN", "VISION", "RAVEN", "FALCON", "CYCLOPS", "NIGHTCRAWLER", "LOKI", "HAWKEYE", "THOR", "WOLVERINE", "QUICKSILVER", "FLASH", "SUPERGIRL", "DAREDEVIL", "HULK", "AQUAMAN", "BATGIRL", "BATWOMAN", "ANTMAN", "WASP"];
var guessAttempts = 10;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var hasFinished = false;
var gameStarted = false;
var wins = 0;

// Background game sounds
var backgroundSound = new Audio('assets/music/avengers-theme.mp3');
var winSound = new Audio('assets/music/you-win.mp3');
var loseSound = new Audio('assets/music/you-lose.mp3');

// Play background music when web page loads
window.onload = function () {
    backgroundSound.play();
};

// Function to reset our game
function resetGame() {
    hasFinished = false;
    remainingGuesses = guessAttempts;
    gameStarted = false;
    backgroundSound.play();
    // Generate random number to select a word from our wordBank array
    currentWordIndex = Math.floor(Math.random() * (wordBank.length));


    guessedLetters = [];
    guessingWord = [];

    // Display word on screen as underscores
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        guessingWord.push(" _ ");
    }

    updateGame();
};

// Function to update the game on the index.html page
function updateGame() {

    document.getElementById("totalWins").innerText = wins;

    // Display the parts of the word we have revealed on the user screen
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    // Display variables in the following elemnts on the index.html page
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters.join(" ");;
};

// Function to replace underscore with correct letter that user guessed 
function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        if (wordBank[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter + " ";
        }
    }
};

// Function to check for a win
function checkWin() {
    if (guessingWord.indexOf(" _ ") === -1) {
        hasFinished = true;
        wins++;
        backgroundSound.pause();
        winSound.play();
        setTimeout(resetGame, 5000);
    }
};


//Function to check for a loss
function checkLoss() {
    if (remainingGuesses <= 0) {
        hasFinished = true;
        document.getElementById("currentWord").innerText = wordBank[currentWordIndex];
        backgroundSound.pause();
        loseSound.play();
        setTimeout(resetGame, 4000);
    }
}

// Function for when the user makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

};




// Event listener for when the user presses a key

document.onkeydown = function (event) {
    if (hasFinished === false) {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateGame();
            checkWin();
            checkLoss();
        }
    }
};
