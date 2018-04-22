var winCount = 0;
var lossCount = 0;

var maxTries = 9;

var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");

var blinkElements = document.getElementsByClassName("blinking");
var alertLineElements = document.getElementsByClassName("alert-line");


var pressAnyKeyToStart = "Press Any Key To Start";
var youWin = "You Win";
var youLose = "You Lose";
var emptyAlert = " ";

var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

function Hangman() {
        this.wordList = [
            "audi",
            "honda",
            "ferrari",
            "jaguar",
            "lexus",
            "mercedes",
        ]

        this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        this.guessedLetters = [];
        this.errors = 0;
        this.visibleLetters = [];
        this.gameOver = false;
        this.alertLines = emptyAlert;
        for (var i = 0; i < this.word.length; i++) {
            this.visibleLetters[i] = (false);
        }
}








document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}


