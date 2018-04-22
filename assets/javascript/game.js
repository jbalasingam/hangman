//Set the variables for the automobile hangman game
var wins = 0;
var maxErrors = 9;
var word = document.getElementById("words");
var Input = document.getElementById("guesses");
var errorCounter= document.getElementById("errors");
var winCountElement = document.getElementById("wins");
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var wordList = [
	"honda",
	"audi",
	"ferrari",
	"jaguar",
	"lexus",
	"mercedes",
	"lamborghini",
	"porsche",
	"koenigsegg",
	"maserati",
	"bugatti",
	"bentley"
	]
//set an array of pictures to use with the words
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = 'images/img/Splash_image1.jpg';

//Always start a new game
var game = new Hangman();

//---------------------------------------------------------------------------------------
//listen for user input and make sure 
document.onkeyup = function(event) {
	var userInput = event.key;

	if (!game.gameOver) {
		//only if the input is included in the alphabets list and not included in the guessed letters then check guess
		if (alphabet.includes(userInput) && !game.guessedLetters.includes(userInput)) {
			game.checkGuess(userInput);
		}
		// or else restart the game and reset the page data
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}
//---------------------------------------------------------------------------------------
function Hangman() {
	var number = Math.round(Math.random() * wordList.length)

	this.word = wordList[number];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

//---------------------------------------------------------------------------------------
Hangman.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.gameOver = true;
	}

	game.updatePageData();
};

//---------------------------------------------------------------------------------------
Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	word.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	Input.textContent = tempString;

	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCounter.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

}

game.updatePageData();
//---------------------------------------------------------------------------------------