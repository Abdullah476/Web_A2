var player = document.getElementById("player");	// Player object
var ball = document.getElementById("ball");		// Ball object
var prompt = document.getElementById("prompt"); // Prompt object
var playerName = "Abdullah";					// Player Name
var playerScore = 10;							// Player's Initial Score
var playerRollNo = "19I-0476";					// PLayer's Roll Number
var speed = 150;								// Initial speed of the ball
var interval;									// Variable to manage the ball movement
var pause = 0;									// Managing the pause menu
var intervalTime = 1000;						// Interval time 1sec
var gameStart = 0								// Initial setting of the game
var gameOver = 0;								// Initial setting for game over

// Set player name, score, and roll number
document.getElementById("player-name").textContent = "Name: " + playerName;
document.getElementById("player-score").textContent = "Score: " + playerScore;
document.getElementById("player-rollno").textContent = "Roll No: " + playerRollNo;

// Move the ball and check for collisions
function moveBall() {
	var ballPos = ball.getBoundingClientRect();

	// Move the ball towards player according to different speed
	ball.style.left = (ballPos.left - speed) + "px";

	// Check the current position of the ball
	if(ballPos.right < 0) {
		// If the player has missed the ball, deduct the points from the score
		deductPoints();		
	}
}

// Get points based on the last digit of the roll number
function getPoints() {
	var lastDigit = playerRollNo.split("").pop();
	var points = parseInt(lastDigit);
	return points;
}

// Function to deduct the points from the score
function deductPoints() {
	// Deduct the points from the score
	playerScore -= getPoints();
	// Display the score
	document.getElementById("player-score").textContent = "Score: " + playerScore;
	// Check if the points are below zero
	if (playerScore < 0) {
		gameOver = 1;												// Change the game over status
		prompt.textContent = "Game Over! Press Enter to Reset!";	// Change the content in the prompt
		prompt.style.display = "block";								// Display the prompt
		clearInterval(interval);									// Remove the time interval
	}else{
		// Reset the position of the ball for next ball
		resetBall();
	}
}

function resetScore() {
	playerScore = 10;																// Reset the score to '10'
	document.getElementById("player-score").textContent = "Score: " + playerScore;	// Display the score
}

// Function to add the point to the score
function addPoints() {
	// Add the points to the score
	playerScore += getPoints();
	// Display the score
	document.getElementById("player-score").textContent = "Score: " + playerScore;
	// Reset the position of the ball for next ball
	resetBall();
}

// Reset the ball to its starting position
function resetBall() {
	ball.style.left = "1000px";
	// Generate the random number
	var randomPos = Math.floor(Math.random() * 2);
	// If number is zero set the ball to position-01
	if (randomPos === 0) {
		ball.style.top = "300px";
		// High speed at position-01
		speed = 250;
	} else {	
		// Else set the ball to postion-02
		ball.style.top = "500px";
		// Low speed at position-02
		speed = 150;
	}
}

// Add event listner to the document that check if the player has hit the ball or not
document.addEventListener("keydown", function(event) {
	var playerPos = player.getBoundingClientRect();
	var ballPos = ball.getBoundingClientRect();
	// If the ball is in range of the player
	if (event.key === " " && ballPos.left >= playerPos.left && ballPos.left <= playerPos.left + speed){
		// The player has hit the ball, add the points to the score
		addPoints();
	}
});

// Set the interval for ball movement
document.addEventListener("keydown", function(event) {
	// If the enter key is pressed and the game is not yet started, start the game
	if(event.key === "Enter" && gameStart === 0){
		gameStart = 1;										// Change the game status to start
		prompt.style.display = "none";						// Hide the prompt
		interval = setInterval(moveBall, intervalTime);		// Set the time interval
	}
	// If the game over status is true
	if (event.key === "Enter" && gameOver === 1) {
		gameOver = 0;										// Change the gameover status
		resetBall();										// Reset the Position of the ball
		resetScore();										// Reset the Player Score
		prompt.style.display = "none";							// Hide the prompt container
		interval = setInterval(moveBall, intervalTime);		// Set the time interval
	}
});

document.addEventListener("keydown", function(event) {
	if (gameOver === 0) {
		// Check if key pressed is "P"
		if((event.key === "p" || event.key === "P") && gameStart === 1) {
			// Check if the pause is active
			if(pause === 1) {
				pause = 0;											// Change the pause status to not active
				interval = setInterval(moveBall, intervalTime);		// Set the time interval
				prompt.style.display = "none";
			}else{
				// Activate the Pause
				pause = 1;											// Change the pause status to active
				clearInterval(interval);							// Remove the time interval
				prompt.textContent = "Press \"P\" to Continue!";	// Change the content in the container
				prompt.style.display = "block";						// Display the container
			}
		}
	}
});
