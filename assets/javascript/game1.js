// initialize variables
var wordBank = ["SUPERMAN", "CYBORG", "BATMAN", "SPIDERMAN", "VISION", "RAVEN", "FALCON", "LOKI", "HAWKEYE", "THOR", "WOLVERINE", "FLASH", "SUPERGIRL", "DAREDEVIL", "HULK", "AQUAMAN", "BATGIRL", "BATWOMAN", "ANTMAN", "WASP"];
var maxTries = 12;
var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingGuesses = 0;
var hasFinished = false;
var gameStarted = false;
var wins = 0;

// Game sounds
var backgroundSound = new Audio('./assets/music/avengers-theme.mp3');
// var winSound = new Audio('./assets/sounds/you-win.wav');
// var loseSound = new Audio('./assets/sounds/you-lose.wav');

// Reset our game-level variables
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Use Math.floor to round the random number down to the nearest whole.
    currentWordIndex = Math.floor(Math.random() * (wordBank.length));
    backgroundSound.play();
    // Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        guessingWord.push(" _ ");
    }   

    // Show display
    updateDisplay();
};

//  Updates the display on the HTML Page
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText += guessingWord[i];
    }

    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters.join(" ");;
};

// This function takes a letter and finds all instances of 
// appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        if(wordBank[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        remainingGuesses--;
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
// Checks for a win by seeing if there are any remaining underscores in the guessingword we are building.
function checkWin() {
    if(guessingWord.indexOf(" _ ") === -1) {
        wins++;
        // winSound.play();
        hasFinished = true;
        resetGame();
        hasFinished = false;
    }
};


// Checks for a loss
function checkLoss()
{
    if(remainingGuesses <= 0) {
        // loseSound.play();
        hasFinished = true;
        resetGame();
        hasFinished = false;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
};


// Event listener
document.onkeydown = function(event) {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkWin();
            checkLoss();
    }
};