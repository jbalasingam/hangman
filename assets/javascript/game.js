//Set the variables for the automobile hangman game
var hangmanStages = [
	`
	`,
	`
	|
	|
	|
	|
	|
	|
	|
	`,
	`
	|---------
	|
	|
	|
	|
	|
	|
	`,
	`
	|---------
	|    |
	|
	|
	|
	|
	|
	`,
	`
	|---------
	|    |
	|    O
	|
	|
	|
	|
	`,
	`
	|---------
	|    |
	|    O
	|    |
	|
	|
	|
	`,
	`
	|---------
	|    |
	|    O
	|    |-
	|
	|
	|
	`,
	`
	|---------
	|    |
	|    O
	|   -|-
	|
	|
	|
	`,
	`
	|---------
	|    |
	|    O
	|   -|-
	|     \\
	|
	|
	`,
	`
	|---------
	|    |
	|    O
	|   -|-
	|   / \\
	|
	|
	`,
	];
	
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
	//randomly select a number between 0 and the length of the word list
	//this number will be used to select the word and the associated picture
	var number = Math.round(Math.random() * wordList.length)
	currentWord = wordList[number];
	
	this.guessedLetters = [];
	this.errors = 0;
	this.usedLetters = [];
	this.gameOver = false;
	for (var i = 0; i < currentWord.length; i++) {
		this.usedLetters[i] = (false);
	}
}

//---------------------------------------------------------------------------------------
Hangman.prototype.checkGuess = function(char) {
	//once the input has been verified, it is passed to this function
	this.guessedLetters.push(char);

	//now you loop through the letters of the current word chosen at random
	// and make sure the type of input as well as the character matches
	var isInWord = false;
	for (var i = 0; i < currentWord.length; i++) {
		if (currentWord.charAt(i) === char) {
			isInWord = true;
			this.usedLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		this.gameOver = true;
	}

	if (!this.usedLetters.includes(false)) {
		wins++;
		this.gameOver = true;
	}

	game.updatePageData();
};

//---------------------------------------------------------------------------------------
Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.usedLetters.length; i++) {
		tempString += ((this.usedLetters[i] || this.gameOver) ? currentWord.charAt(i).toUpperCase() : "_");
		if (i < (this.usedLetters.length - 1)) tempString += " ";
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