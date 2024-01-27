
// canvas 
var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

// box size
var box = 20;
var canvasSize = 20;

// snake
var snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// food
var food = { x: Math.floor(Math.random() * canvasSize) * box, y: Math.floor(Math.random() * canvasSize) * box };

// score
var score = 0;

// direction
var dir;

// listen for key presses
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        dir = "LEFT";
    } else if (event.keyCode == 38) {
        dir = "UP";
    } else if (event.keyCode == 39) {
        dir = "RIGHT";
    } else if (event.keyCode == 40) {
        dir = "DOWN";
    }
});

// draw everything
function draw() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // loop to draw snake
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // snake head positioning
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // snake movement
    if (dir == "LEFT") snakeX -= box;
    if (dir == "UP") snakeY -= box;
    if (dir == "RIGHT") snakeX += box;
    if (dir == "DOWN") snakeY += box;

    // checks if snake eats food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = { x: Math.floor(Math.random() * canvasSize) * box, y: Math.floor(Math.random() * canvasSize) * box };
    } else {
        snake.pop();
    }

    // new head
    var newHead = { x: snakeX, y: snakeY };

    // game over 
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || checkCollision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

// checks if head collides with body
function checkCollision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// game loop
var game = setInterval(draw, 100);

// disables scrolling with keys so game can be played without page moving
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);



