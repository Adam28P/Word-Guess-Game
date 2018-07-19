// initialize variables
var game = ["SUPERMAN", "CYBORG", "BATMAN", "SPIDERMAN", "VISION", "FALCON", "LOKI", "HAWKEYE", "THOR", "WOLVERINE", "FLASH", "SUPERGIRL", "DAREDEVIL", "HULK", "AQUAMAN", "BATGIRL", "BATWOMAN", "WONDERWOMAN", "ANTMAN", "WASP"];
var choice = Math.floor(Math.random() * game.length);
var answer = game[choice];
var myLength = answer.length;
var display = [myLength];
var win = myLength;
var letters = answer.split('');
var attemptsLeft = 12;
var output = "";
var userLetter = "";
var lettersGuessedAlready = [];
var wins = 0;
var losses = 0;
var wordToGuessIndex = 0;

var x = document.getElementById("startAudio"); 

function playAudio() { 
    x.play(); 
} 

document.getElementById("guesses").innerHTML = attemptsLeft;
document.getElementById("showLettersGuessed").innerHTML = lettersGuessedAlready.join(" ");
document.getElementById("wins").innerHTML =  wins;

// setup game function
var setup = function () {
    for (var i = 0; i < answer.length; i++) {
        display[i] = "_ ";
        output = output + display[i];
    }
    document.getElementById("game").innerHTML = output;
    output = "";
    playAudio();
}

document.onkeyup = function (event) {
    output = "";
    userLetter = event.key.toUpperCase();

    if (event.key.length == 1) {

        for (var c = 0; c < answer.length; c++) {
            if (userLetter.toUpperCase() == letters[c]) {
                display[c] = userLetter.toUpperCase();
                win--;
            }
            output = output + display[c] + " ";
        }

        document.getElementById("game").innerHTML = output;
        output = "";
        attemptsLeft--;
        lettersGuessedAlready.push(userLetter);
        document.getElementById("showLettersGuessed").innerHTML = lettersGuessedAlready.join(" ");

        if (win < 1) {
           // you win
        } else if (attemptsLeft < 1) {
            // lose
        } else {
            document.getElementById("guesses").innerHTML = attemptsLeft;
        }

    }
}



// run functions

setup();