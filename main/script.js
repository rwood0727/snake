//global variables
//establishes how large a block is
var blockSize = 25; 

//sets how many rows and collumns are in the game
var rows = 20; 
var cols = 20; 

//initalizes global variables for use later
var board; 
var context;  
var snakeX; 
var snakeY; 
var foodX; 
var foodY; 
var score;
//sets the starting velocity for the snake
var velocityX = 0; 
var velocityY = 0; 

//creates a list for the snake body, this is used for the coordinates of the snake if it collides or interacts with a fruit
var snakeBody = [];


//sets the game to running unless the game over conditions are met
var gameOver = false; 

//used to initialize the canvas when the site is fully loaded
window.onload = function() {initialize()};
function initialize() { 
    board = document.getElementById("board"); 
    board.height = rows * blockSize; 
    board.width = cols * blockSize; 
    //used for drawing on the board 
    context = board.getContext("2d"); 
    startGame();
}
    //listener for when the user presses one of the movement keys
    document.addEventListener("keyup", changeDirection); 

    //calls the update function every 100 milliseconds
    setInterval(update, 1000/10);

//used for the restart button to reset the snake size and position and fruit position
function startGame() {
    score = 0;
    updateScore(score);
    placeFood();
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    snakeBody=[];
    gameOver = false;
    //snakeBody[0]=[snakeX, snakeY];
}

//if the game over conditions are met, the game will end
function update() { 
    if (gameOver) { 
       showGameOver();
       velocityX = 0;
       velocityY = 0;
       return;
    } 

    //background fill color
    context.fillStyle="black"; 

    context.fillRect(0, 0, board.width, board.height); 

    //fruit fill color
    context.fillStyle="red"; 

    context.fillRect(foodX, foodY, blockSize, blockSize); 


    //calls the place food function of the snake eats the fruit
    if (snakeX == foodX && snakeY == foodY) { 

        snakeBody.push([foodX, foodY]); 

        placeFood();

        score += 1;

        updateScore(score)
    } 

    //if the snake eats a fruit, grow the length of the snakes body
    for (let i = snakeBody.length-1; i > 0; i--) { 

        snakeBody[i] = snakeBody[i-1]; 
    } 


    if (snakeBody.length) { 

        snakeBody[0] = [snakeX, snakeY]; 
    } 

    //snake fill color
    context.fillStyle= "lime"; 

    snakeX += velocityX * blockSize; 
    snakeY += velocityY * blockSize; 

    context.fillRect(snakeX, snakeY, blockSize, blockSize); 

    for (let i = 0; i < snakeBody.length; i++) { 

        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); 
    } 


    //game over conditions 
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) { 
        showGameOver();
    } 

    for (let i = 0; i < snakeBody.length; i++) { 

        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            showGameOver();
        } 
    } 
} 


//changes the direction of the snake based on what keys the user is pressing
function changeDirection(e) { 
    if (e.code == "ArrowUp" && velocityY != 1) { 
        velocityX = 0; 

        velocityY = -1; 
    } 

    else if (e.code == "ArrowDown" && velocityY != -1) { 
        velocityX = 0; 

        velocityY = 1; 
    } 

    else if (e.code == "ArrowLeft" && velocityX != 1) { 
        velocityX = -1; 

        velocityY = 0; 
    } 

    else if (e.code == "ArrowRight" && velocityX != -1) { 
        velocityX = 1; 

        velocityY = 0; 
    } 
} 


function placeFood() { 

    //sets the fruit to be placed in a random location on the canvas
    foodX = Math.floor(Math.random() * cols) * blockSize; 

    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//updates the score
function updateScore(score) {
    document.getElementById("score").innerHTML = score;
}

//called when the reset button is pressed
function resetGame() {
    hideGameOver();
    startGame();

}

//shows the game over menu when the snake has met one of the game over conditions
function showGameOver() {
    document.getElementById("game_over").classList.add("show");
    document.getElementById("game_over").classList.remove("hide");
}

//hides the game over menu
function hideGameOver() {
    document.getElementById("game_over").classList.remove("show");
    document.getElementById("game_over").classList.add("hide");
}

//changes the background to gray
function darkBackground() {
    document.getElementById("background").classList.remove("light");
    document.getElementById("background").classList.add("dark");
}

//changes the background to white
function lightBackground() {
    document.getElementById("background").classList.remove("dark");
    document.getElementById("background").classList.add("light");
}