// initialize variables
var game = ["SUPERMAN", "CYBORG", "BATMAN", "SPIDERMAN", "ULTRON", "VISION", "FALCON", "LOKI", "HAWKEYE", "THOR"];
var choice = Math.floor(Math.random() * game.length - 1);
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

document.getElementById("guesses").innerHTML = "YOU HAVE " + attemptsLeft + " GUESSES LEFT!";
document.getElementById("showLettersGuessed").innerHTML = lettersGuessedAlready.join(" ");
document.getElementById("wins").innerHTML = "Wins: " + wins;
document.getElementById("losses").innerHTML = "Losses: " + losses;

// setup game function
var setup = function () {
    for (var i = 0; i < answer.length; i++) {
        display[i] = "_ ";
        output = output + display[i];
    }
    document.getElementById("game").innerHTML = output;
    output = "";
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
            document.getElementById("guesses").innerHTML = "YOU WIN!";
        } else if (attemptsLeft < 1) {
            document.getElementById("guesses").innerHTML = "YOU LOSE!"
        } else {
            document.getElementById("guesses").innerHTML = "YOU HAVE " + attemptsLeft + " GUESSES LEFT!";
        }

    }
}

// run functions

setup();