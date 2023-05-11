//global variables
//establishes how large a block is
var blockSize = 25; 

//sets how many rows and collumns are in the game
var rows = 20; 
var cols = 20; 

var board; 
var context;  

//sets the starting size of the snake to 5 blocks 
var snakeX = blockSize * 5; 

var snakeY = blockSize * 5; 

//sets the starting velocity for the snake
var velocityX = 0; 

var velocityY = 0; 

//creates a list for the snake body, this is used for the coordinates of the snake if it collides or interacts with a fruit
var snakeBody = [];

var foodX; 

var foodY; 

var score = 0;

//sets the game to running unless the game over conditions are met
var gameOver = false; 

window.onload = function() { 

 

    board = document.getElementById("board"); 

 

    board.height = rows * blockSize; 

 

    board.width = cols * blockSize; 

 
    //used for drawing on the board 
    context = board.getContext("2d"); 

    //places a food to start the game
    placeFood(); 

    document.addEventListener("keyup", changeDirection); 

    //calls the updata function every 100 milliseconds
    setInterval(update, 1000/10);
}
 
//if the game over conditions are met, the game will end
function update() { 
    if (gameOver) { 

 

        return; 
    } 

    context.fillStyle="black"; 

    context.fillRect(0, 0, board.width, board.height); 

    context.fillStyle="green"; 

    context.fillRect(foodX, foodY, blockSize, blockSize); 


    //calls the place food function of the snake eats the fruit

    if (snakeX == foodX && snakeY == foodY) { 

        snakeBody.push([foodX, foodY]); 

        placeFood();

        score + 1;
    } 

    //if the snake eats a fruit, grow the length of the snakes body
    for (let i = snakeBody.length-1; i > 0; i--) { 

        snakeBody[i] = snakeBody[i-1]; 
    } 


    if (snakeBody.length) { 

        snakeBody[0] = [snakeX, snakeY]; 
    } 

    context.fillStyle= "blue"; 

    snakeX += velocityX * blockSize; 
    snakeY += velocityY * blockSize; 

    context.fillRect(snakeX, snakeY, blockSize, blockSize); 

    for (let i = 0; i < snakeBody.length; i++) { 

        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize); 
    } 


    //game over conditions 
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) { 

        gameOver = true; 

        alert("Game Over"); 
    } 

    for (let i = 0; i < snakeBody.length; i++) { 

        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 

            gameOver = true; 

            alert("Game Over"); 
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

function printScore(score) {
    document.write(score)
}