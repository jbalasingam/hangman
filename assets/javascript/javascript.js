//Set the variables for the automobile hangman game
var hangmanStages = [
	`<br>|<br>|<br>|<br>|<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|<br>|<br>|<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|<br>|<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O|<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O<br>|    |<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O<br>|    |-<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O<br>|   -|-<br>|<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O<br>|   -|-<br>|     \\<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O<br>|   -|-<br>|   / \\<br>|<br>|<br>`,
	`<br>|---------<br>|    |<br>|    O<br>|   -|-<br>|   / \\<br>|<br>|<br>`
	];
	
var wins = 0;
var maxErrors = 9;
var word = document.getElementById("words");
var Input = document.getElementById("guesses");
var TotalErrors= document.getElementById("errors");
var NumberOfWins = document.getElementById("wins");
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
	"bentley",
	"bmw"
	]
//set an array of pictures to use with the words
var imgArray = [
	"assets/images/honda.png",
	"assets/images/audi.png",
	"assets/images/ferrari.png",
	"assets/images/jaguar.png",
	"assets/images/lexus.png",
	"assets/images/mercedes.png",
	"assets/images/lamborghini.png",
	"assets/images/porsche.png",
	"assets/images/koenigsegg.png",
	"assets/images/maserati.png",
	"assets/images/bugatti.png",
	"assets/images/bentley.png",
	"assets/images/bmw.png"
	]

//Always start a new game
var game = new Hangman();

//---------------------------------------------------------------------------------------
//listen for user input and make sure 
document.onkeyup = function(event) {
	var userInput = event.key;
	$("#textinput").focus();


	if (!game.Restart) {
		//only if the input is included in the alphabets list and not included in the guessed letters then check guess
		if (alphabet.includes(userInput) && !game.guessedLetters.includes(userInput)) {
			game.checkGuess(userInput);
			
			var number = TotalErrors.textContent.charAt(0);
			
			document.getElementById("start").innerHTML = hangmanStages[number];
		}
		// or else restart the game and reset the page data
	} else {
		game = new Hangman();
		game.updatePageData();
		document.getElementById("start").innerHTML = hangmanStages[0];
	}
}
//---------------------------------------------------------------------------------------
function Hangman() {
	//randomly select a number between 0 and the length of the word list
	//this number will be used to select the word and the associated picture
	var number = Math.floor(Math.random() * wordList.length)
	currentWord = wordList[number];

	document.getElementById("picture").src = imgArray[number];
	
	this.guessedLetters = [];
	this.errors = 0;
	this.usedLetters = [];
	this.Restart = false;
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
		this.Restart = true;
	}

	if (!this.usedLetters.includes(false)) {
		wins++;
		this.Restart = true;
	}

	game.updatePageData();
};



//---------------------------------------------------------------------------------------
Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.usedLetters.length; i++) {
		tempString += ((this.usedLetters[i] || this.Restart) ? currentWord.charAt(i).toUpperCase() : "_");
		if (i < (this.usedLetters.length - 1)) tempString += " ";
	}
	word.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 100; i++) {
		tempString += " ";
	}
	Input.textContent = tempString;

	
	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 100; i++) {
		tempString += " ";
	}
	TotalErrors.textContent = tempString;
	
	tempString = wins + "";
	for (var i = tempString.length; i < 100; i++) {
		tempString += " ";
	}
	NumberOfWins.textContent = tempString;

}


game.updatePageData();
//---------------------------------------------------------------------------------------