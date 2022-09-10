// SET UP CANVAS AND 2D GRAPHICS CONTEXT
// CHANGE SIZE
let cnv = document.querySelector("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 680;
cnv.height = 650;

var score = 0;
var highScore = localStorage.getItem("bestScore");
var keyDirection = "string";
var currentDirection = "start";
var bananaCollect = false;
var gameOver = false;
var boundingRect = cnv.getBoundingClientRect();
var mouseX = null
var mouseY = null
var htmlImg = document.getElementById("trophy")
var htmlImg2 = document.getElementById("banana")

let snake = [{ x: 200, y: 280 }, { x: 160, y: 280 }, { x: 120, y: 280 }]

let banana = {
  x: 480,
  y: 280,
}

if (highScore === null) {
  highScore = 0
}

window.requestAnimationFrame(update)
function update() {
  // RUN HELPER FUNCTIONS
  draw()
  collision()
  gameOverScreen()

  // REQUEST ANIMATION FRAME
  window.requestAnimationFrame(update);
}


function draw() {
  // DRAW BACKROUND
  ctx.fillStyle = "green"
  ctx.fillRect(0, 0, 680, 600);

  // DRAW BOXS
  for (let i = 0; i < cnv.width; i += 80) {
    for (let j = 0; j < 600; j += 80) {
      ctx.fillStyle = "yellowgreen"
      ctx.fillRect(i, j, 40, 40);
    }
  }
  for (let i = 40; i < cnv.width; i += 80) {
    for (let j = 40; j < 600; j += 80) {
      ctx.fillStyle = "yellowgreen"
      ctx.fillRect(i, j, 40, 40);
    }
  }

  // DRAW BAR AT BOTTOM
  ctx.fillStyle = "darkgreen"
  ctx.fillRect(0, 600, 680, 50);

  // DRAW SCORE BANANA
  ctx.drawImage(htmlImg2, 0, 605, 40, 40)

  // DRAW SCORE
  ctx.font = "40px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText(score, 45, 640)

  // DRAW TROPHY
  ctx.drawImage(htmlImg, 120, 605, 40, 40)

  // DRAW HIGH SCORE
  ctx.font = "40px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText(highScore, 165, 640)

  // DRAW ALL SNAKE PARTS
  snake.forEach(drawSnake)

  // DRAW BANANA
  ctx.drawImage(htmlImg2, banana.x, banana.y, 40, 40)
}

function drawSnake(snake) {
  if (gameOver === false) {
    // DRAW SNAKE
    ctx.fillStyle = "black"
    ctx.fillRect(snake.x, snake.y, 40, 40);
    ctx.strokeStyle = "white"
    ctx.strokeRect(snake.x, snake.y, 40, 40);
  }
}

function collision() {
  let inSnake = (element) => element.x === banana.x && element.y === banana.y;

  let noHeadSnake = snake.slice(1)

  let snakeCollide = (element) => snake[0].x === element.x && snake[0].y === element.y;

  // SNAKE ON SNAKE COLLISION
  if (noHeadSnake.some(snakeCollide) === true) {
    if (score > highScore) {
      localStorage.setItem("bestScore", score)
    }
    gameOver = true
  }
  // OUTER BOUNDARIES 
  if (snake[0].y < 0 || snake[0].y > 560 || snake[0].x < 0 || snake[0].x > 640) {
    if (score > highScore) {
      localStorage.setItem("bestScore", score)
    }
    gameOver = true
  }
  // BANANA COLLECTION
  if (snake[0].y === banana.y && snake[0].x === banana.x) {
    banana.x = Math.floor(Math.random() * 17) * 40
    banana.y = Math.floor(Math.random() * 15) * 40
    bananaCollect = true
  }
  // PREVENT BANANA SPAWNING INSIDE THE SNAKE
  while (snake.some(inSnake) === true) {
    banana.x = Math.floor(Math.random() * 17) * 40
    banana.y = Math.floor(Math.random() * 15) * 40
  }
  score = snake.length - 3
}

setInterval(move, 150)
function move() {
  // CHANGE KEY DIRECTION TO CURRENT DIRECTION
  if (keyDirection === "up" && currentDirection !== "down") {
    currentDirection = "up"
  }
  else if (keyDirection === "down" && currentDirection !== "up") {
    currentDirection = "down"
  }
  else if (keyDirection === "right" && currentDirection !== "left") {
    currentDirection = "right"
  }
  else if (keyDirection === "left" && currentDirection !== "right" && currentDirection !== "start") {
    currentDirection = "left"
  }

  if (bananaCollect === true) {
    // GROW SNAKE - ADD NEW OBJECT TO THE START OF THE ARRAY
    if (currentDirection === "up") {
      snake.unshift({ x: 0, y: 0 })
      snake[0].y = snake[1].y - 40
      snake[0].x = snake[1].x
      bananaCollect = false
    }
    else if (currentDirection === "down") {
      snake.unshift({ x: 0, y: 0 })
      snake[0].y = snake[1].y + 40
      snake[0].x = snake[1].x
      bananaCollect = false
    }
    else if (currentDirection === "right") {
      snake.unshift({ x: 0, y: 0 })
      snake[0].y = snake[1].y
      snake[0].x = snake[1].x + 40
      bananaCollect = false
    }
    else if (currentDirection === "left") {
      snake.unshift({ x: 0, y: 0 })
      snake[0].y = snake[1].y
      snake[0].x = snake[1].x - 40
      bananaCollect = false
    }
  }
  else {
    // MOVE SNAKE - COPY-PASTE
    if (currentDirection === "up") {
      snake[snake.length - 1].y = snake[0].y - 40
      snake[snake.length - 1].x = snake[0].x
      snake.unshift(snake.pop())
    }
    else if (currentDirection === "down") {
      snake[snake.length - 1].y = snake[0].y + 40
      snake[snake.length - 1].x = snake[0].x
      snake.unshift(snake.pop())
    }
    else if (currentDirection === "right") {
      snake[snake.length - 1].y = snake[0].y
      snake[snake.length - 1].x = snake[0].x + 40
      snake.unshift(snake.pop())
    }
    else if (currentDirection === "left") {
      snake[snake.length - 1].y = snake[0].y
      snake[snake.length - 1].x = snake[0].x - 40
      snake.unshift(snake.pop())
    }
  }
}

function gameOverScreen() {
  if (gameOver === true) {
    // STOP SNAKE FROM MOVING
    currentDirection = "start"
    keyDirection = "string"

    // DRAW GAME OVER BOX
    ctx.fillStyle = "darkgreen"
    ctx.fillRect(160, 160, 360, 280);

    // DRAW GAME OVER BOX 2.0
    ctx.fillStyle = "greenyellow"
    ctx.fillRect(170, 170, 340, 260);

    // DRAW GAME OVER BOX 3.0
    ctx.fillStyle = "forestgreen"
    ctx.fillRect(170, 170, 340, 60);

    // DRAW GAME OVER TEXT
    ctx.font = "50px Copperplate"
    ctx.fillStyle = "black"
    ctx.fillText("GAME OVER", 190, 215)

    // DRAW SCORE BANANA AGAIN
    ctx.drawImage(htmlImg2, 200, 240, 40, 40)

    // DRAW SCORE AGAIN
    ctx.font = "40px Monospace"
    ctx.fillStyle = "black"
    ctx.fillText(score, 245, 275)

    // DRAW TROPHY AGAIN
    ctx.drawImage(htmlImg, 360, 240, 40, 40)

    // DRAW HIGH SCORE AGAIN
    ctx.font = "40px Monospace"
    ctx.fillStyle = "black"
    ctx.fillText(localStorage.getItem("bestScore"), 405, 275)

    // DRAW RETRY BUTTON
    ctx.fillStyle = "green"
    ctx.fillRect(200, 320, 280, 80);

    // DRAW RETRY BUTTON TEXT
    ctx.font = "75px Monospace"
    ctx.fillStyle = "black"
    ctx.fillText("RETRY", 235, 385)

    // RESET GAME
    if (mouseX > 200 && mouseY > 321 && mouseX < 482 && mouseY < 401) {
      score = 0;
      highScore = localStorage.getItem("bestScore");
      snake = [{ x: 200, y: 280 }, { x: 160, y: 280 }, { x: 120, y: 280 }]
      mouseX = 0
      mouseY = 0
      gameOver = false;
      banana = {
        x: 480,
        y: 280,
      }
    }
  }
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.querySelector("canvas").addEventListener("click", getXYPosition)

function keydownHandler(event) {
  // UP/DOWN MOVEMENT
  if (event.repeat === false) {
    if (event.code == "ArrowUp") {
      keyDirection = "up"
    } else if (event.code == "ArrowDown") {
      keyDirection = "down"
    }
    // LEFT/RIGHT MOVEMENT
    else if (event.code == "ArrowRight") {
      keyDirection = "right"
    } else if (event.code == "ArrowLeft") {
      keyDirection = "left"
    }
  }
}

function getXYPosition(event) {
  if (gameOver === true) {
    mouseX = event.clientX - boundingRect.left;
    mouseY = event.clientY - boundingRect.top;

    console.log("x" + mouseX)
    console.log("y" + mouseY)
  }
}

// ARRAYS
// .shift, , .pop, .slice, .unshift, .push, .some

// THINGS
// FIX BANANA SPAWNING - DONE
// GROW SNAKE - DONE
// SNAKE ON SNAKE COLLISION - DONE
// DRAW SCORE - DONE
// HIGH SCORE??? => LOCAL STORAGE - DONE
// GAME OVER SCREEN - DONEISH
// RETRY BUTTON - NOT DONE

// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage