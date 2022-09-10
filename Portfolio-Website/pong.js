// SET UP CANVAS AND 2D GRAPHICS CONTEXT
// CHANGE SIZE
let cnv = document.querySelector("canvas")
let ctx = cnv.getContext("2d")
cnv.width = 800;
cnv.height = 600;

// GLOBAL VARIABLES
var colide = false;
var colideR = false;
var playerScreen = true;
var difficultyScreen = false;
var p1 = null;
var p2 = null;
var mouseX = null;
var mouseY = null;
var mouseX2 = null;
var mouseY2 = null;
var ranNum = 40;
var ranNum2 = 40;
var aiSpeed = 0
var boundingRect = cnv.getBoundingClientRect();

var ball = {
  x: 400,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
};

var paddle1 = {
  x: 700,
  y: 260,
  ySpeed: 0,
};

var paddle2 = {
  x: 85,
  y: 260,
  ySpeed: 0,
  aiYSpeed: 0,
};


var ranNumY = Math.floor(Math.random() * 581) + 11
window.addEventListener("load", playerSelector)

function playerSelector() {
  // GET MOUSE POSITION
  document.querySelector("canvas").addEventListener("mouseup", getXYPosition)
  function getXYPosition(event) {
    mouseX = event.clientX - boundingRect.left;
    mouseY = event.clientY - boundingRect.top;
  }

  // DRAW Background
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, 800, 600);

  // DRAW BOX
  ctx.fillStyle = "white"
  ctx.fillRect(200, 150, 400, 300);

  // DRAW P1 TEXT
  ctx.font = "70px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("1 PLAYER", 250, 250)

  // DRAW LINE UNDER P1 TEXT
  ctx.fillStyle = "black"
  ctx.fillRect(250, 260, 310, 10);

  // DRAW P2 TEXT
  ctx.font = "70px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("2 PLAYER", 250, 375)

  // DRAW LINE UNDER P2 TEXT
  ctx.fillStyle = "black"
  ctx.fillRect(250, 390, 310, 10);

  // DRAW CONTROLS TEXT
  ctx.font = "12px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("CONTROLS: P1: UP AND DOWN ARROW P2: W AND S KEYS", 250, 430)

  // LOAD PLAYER 1
  if (mouseX > 255 && mouseY > 205 && mouseX < 562 && mouseY < 270) {
    p1 = true
    difficultyScreen = true;
    difficulty()
    playerScreen = false;
  }
  // LOAD PLAYER 2
  else if (mouseX > 255 && mouseY > 330 && mouseX < 560 && mouseY < 400) {
    p2 = true
    preStart()
    playerScreen = false;
  }

  if (playerScreen === true) {
    window.requestAnimationFrame(playerSelector)
  }
}

function difficulty() {
  // SECOND GET EVENT NEEDED TO PREVENT PLAYER AND DIFFICULTY BEING SELECTED AT THE SAME TIME
  if (playerScreen === false) {
    document.querySelector("canvas").addEventListener("mouseup", getXYPosition2)
    function getXYPosition2(event) {
      mouseX2 = event.clientX - boundingRect.left;
      mouseY2 = event.clientY - boundingRect.top;
    }
  }

  // DRAW BACKGROUND
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, 800, 600);

  // DRAW BOX
  ctx.fillStyle = "white"
  ctx.fillRect(200, 150, 400, 300);

  // DRAW EASY TEXT
  ctx.font = "40px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("EASY", 248, 210)

  // DRAW LINE UNDER EASY TEXT
  ctx.fillStyle = "black"
  ctx.fillRect(250, 215, 85, 10);

  // DRAW NORMAL TEXT
  ctx.font = "40px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("NORMAL", 248, 275)

  // DRAW LINE UNDER NORMAL TEXT
  ctx.fillStyle = "black"
  ctx.fillRect(250, 280, 130, 10);

  // DRAW HARD TEXT
  ctx.font = "40px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("HARD", 248, 340)

  // DRAW LINE UNDER HARD TEXT
  ctx.fillStyle = "black"
  ctx.fillRect(250, 345, 85, 10);

  // DRAW IMPOSSIBLE TEXT
  ctx.font = "40px Monospace"
  ctx.fillStyle = "black"
  ctx.fillText("IMPOSSIBLE", 248, 405)

  // DRAW LINE UNDER IMPOSSIBLE TEXT
  ctx.fillStyle = "black"
  ctx.fillRect(250, 410, 220, 10);

  if (playerScreen === false) {
    if (mouseX2 > 250 && mouseY2 > 184 && mouseX2 < 336 && mouseY2 < 225) {
      paddle2.aiYSpeed = 1.5
      preStart()
      difficultyScreen = false;
    }
    else if (mouseX2 > 250 && mouseY2 > 250 && mouseX2 < 382 && mouseY2 < 292) {
      paddle2.aiYSpeed = 3
      preStart()
      difficultyScreen = false;
    }
    else if (mouseX2 > 250 && mouseY2 > 315 && mouseX2 < 335 && mouseY2 < 356) {
      paddle2.aiYSpeed = 4.5
      preStart()
      difficultyScreen = false;
    }
    else if (mouseX2 > 250 && mouseY2 > 380 && mouseX2 < 470 && mouseY2 < 420) {
      paddle2.aiYSpeed = 20
      preStart()
      difficultyScreen = false;
    }
  }

  if (difficultyScreen === true) {
    window.requestAnimationFrame(difficulty)
  }
}

function preStart() {
  ranNumY = Math.floor(Math.random() * 581) + 11
  ball.x = 400
  ball.y = ranNumY
  ball.ySpeed = 0
  ball.xSpeed = 0
  paddle1.y = 260
  paddle2.y = 260
  setTimeout(start, 2000);
}

function start() {
  // RANDOMIZE Y POSITION
  ball.y = ranNumY
  ball.x = 400

  // RESET SPEED
  ball.xSpeed = 3.75
  ball.ySpeed = Math.random() * 3

  // RANDOMIZE X DIRECTION
  if (Math.random() > 0.5) {
    ball.xSpeed = -ball.xSpeed
  };

  // RANDOMIZE Y DIRECTION
  if (Math.random() > 0.5) {
    ball.ySpeed = -ball.ySpeed
  };
};

var startTime = new Date().getTime();
var lastTime = null;
var frameRate = 1000 / 60

requestAnimationFrame(deltaTime)
function deltaTime() {
  if (lastTime == null) {
    lastTime = new Date().getTime();
  }
  var dt = new Date().getTime() - lastTime;
  lastTime = new Date().getTime();
  var updateCount = dt / frameRate


  for (var i = 0; i < updateCount; i++) {
    update();
  }

  draw();
  requestAnimationFrame(deltaTime);
}


// UPDATE SCORE
var score1 = 0;
var score2 = 0;
var execute = 1;


// window.requestAnimationFrame(update);
function update() {
  if (execute == 1) {
    // UPDATE ELEMENTS ON CANVAS
    ball.x = ball.x + ball.xSpeed;
    ball.y = ball.y + ball.ySpeed;

    paddle1.y = paddle1.y + paddle1.ySpeed;
    paddle2.y = paddle2.y + paddle2.ySpeed;

    // RUN HELPER FUNCTIONS
    draw()
    collision()
    other()

    if (p1 === true) {
      aiPaddle()
    }

    // REQUEST ANIMATION FRAME
    // window.requestAnimationFrame(update);
  }
}

function draw() {
  // DRAW CANVAS
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, cnv.width, cnv.height); // Background

  // DRAW BALL
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 7.5, 0, 2 * Math.PI);
  ctx.fill();

  // DRAW PADDLE1
  if (paddle1.y <= 0) {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle1.x, 0, 15, 80);
  } else if (paddle1.y >= 520) {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle1.x, 520, 15, 80);
  } else {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle1.x, paddle1.y, 15, 80);
  }

  // DRAW PADDLE2
  if (paddle2.y <= 0) {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle2.x, 0, 15, 80);
  } else if (paddle2.y >= 520) {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle2.x, 520, 15, 80);
  } else {
    ctx.fillStyle = "white";
    ctx.fillRect(paddle2.x, paddle2.y, 15, 80);
  }

  // DRAW CENTER LINE
  ctx.setLineDash([25, 25]);
  ctx.strokeStyle = "white"

  ctx.beginPath();
  ctx.moveTo(400, 12.5);
  ctx.lineTo(400, 600);
  ctx.stroke();

  // DRAW SCORE 1
  ctx.font = "80px Monospace"
  ctx.fillStyle = "white"
  ctx.direction = "rtl"
  ctx.fillText(score1, 300, 75)

  // DRAW SCORE 2
  ctx.font = "80px Monospace"
  ctx.fillStyle = "white"
  ctx.direction = "ltr"
  ctx.fillText(score2, 500, 75)
}

function collision() {
  // CHECK BALL COLLISION (PADDLE 1)
  if (ball.x > 700 && ball.x < 715 && ball.y > paddle1.y && ball.y < paddle1.y + 40 && Math.sign(ball.xSpeed) === 1) {
    let diff = ball.y - paddle1.y
    if (diff <= 5 && diff >= 0) {
      ball.ySpeed = -7.5
    } else if (diff <= 10 && diff > 5) {
      ball.ySpeed = -4.5
    } else if (diff <= 15 && diff > 10) {
      ball.ySpeed = -3.75
    } else if (diff <= 20 && diff > 15) {
      ball.ySpeed = -3
    } else if (diff <= 25 && diff > 20) {
      ball.ySpeed = -2.25
    } else if (diff <= 30 && diff > 25) {
      ball.ySpeed = -1.5
    } else if (diff <= 35 && diff > 30) {
      ball.ySpeed = -0.75
    } else if (diff <= 40 && diff > 35) {
      ball.ySpeed = -0.225
    }
    ball.xSpeed = -ball.xSpeed
    colide = true
    colideR = true
  }

  else if (ball.x > 700 && ball.x < 715 && ball.y > paddle1.y + 40 && ball.y < paddle1.y + 80 && Math.sign(ball.xSpeed) === 1) {
    let diff2 = ball.y - paddle1.y - 40
    if (diff2 <= 5 && diff2 >= 0) {
      ball.ySpeed = 0.225
    } else if (diff2 <= 10 && diff2 > 5) {
      ball.ySpeed = 0.75
    } else if (diff2 <= 15 && diff2 > 10) {
      ball.ySpeed = 1.5
    } else if (diff2 <= 20 && diff2 > 15) {
      ball.ySpeed = 2.25
    } else if (diff2 <= 25 && diff2 > 20) {
      ball.ySpeed = 3
    } else if (diff2 <= 30 && diff2 > 25) {
      ball.ySpeed = 3.75
    } else if (diff2 <= 35 && diff2 > 30) {
      ball.ySpeed = 4.5
    } else if (diff2 <= 40 && diff2 > 35) {
      ball.ySpeed = 7.5
    }
    ball.xSpeed = -ball.xSpeed
    colide = true
    colideR = true
  }

  // CHECK BALL COLLISION (PADDLE 2)
  if (ball.x < 100 && ball.x > 85 && ball.y > paddle2.y && ball.y < paddle2.y + 40 && Math.sign(ball.xSpeed) === -1) {
    let diff3 = ball.y - paddle2.y
    if (diff3 <= 5 && diff3 >= 0) {
      ball.ySpeed = -7.5
    } else if (diff3 <= 10 && diff3 > 5) {
      ball.ySpeed = -4.5
    } else if (diff3 <= 15 && diff3 > 10) {
      ball.ySpeed = -3.75
    } else if (diff3 <= 20 && diff3 > 15) {
      ball.ySpeed = -3
    } else if (diff3 <= 25 && diff3 > 20) {
      ball.ySpeed = -2.25
    } else if (diff3 <= 30 && diff3 > 25) {
      ball.ySpeed = -1.5
    } else if (diff3 <= 35 && diff3 > 30) {
      ball.ySpeed = -0.75
    } else if (diff3 <= 40 && diff3 > 35) {
      ball.ySpeed = -0.225
    }
    ball.xSpeed = -ball.xSpeed
    colide = true
  }

  else if (ball.x < 100 && ball.x > 85 && ball.y > paddle2.y + 40 && ball.y < paddle2.y + 80 && Math.sign(ball.xSpeed) === -1) {
    let diff4 = ball.y - paddle2.y - 40
    if (diff4 <= 5 && diff4 >= 0) {
      ball.ySpeed = 0.225
    } else if (diff4 <= 10 && diff4 > 5) {
      ball.ySpeed = 0.75
    } else if (diff4 <= 15 && diff4 > 10) {
      ball.ySpeed = 1.5
    } else if (diff4 <= 20 && diff4 > 15) {
      ball.ySpeed = 2.25
    } else if (diff4 <= 25 && diff4 > 20) {
      ball.ySpeed = 3
    } else if (diff4 <= 30 && diff4 > 25) {
      ball.ySpeed = 3.75
    } else if (diff4 <= 35 && diff4 > 30) {
      ball.ySpeed = 4.5
    } else if (diff4 <= 40 && diff4 > 35) {
      ball.ySpeed = 7.5
    }
    ball.xSpeed = -ball.xSpeed
    colide = true
  }

  // CHECK BALL COLLISION (TOP + BOTTOM)
  if (ball.y > 592.5) {
    ball.ySpeed = -ball.ySpeed
  } else if (ball.y < 7.5) {
    ball.ySpeed = -ball.ySpeed
  }

  // CHECK PADDLE COLLISION
  if (paddle1.y < 0) {
    paddle1.y = 0
  }

  if (paddle1.y > 520) {
    paddle1.y = 520
  }
  if (paddle2.y < 0) {
    paddle2.y = 0
  }

  if (paddle2.y > 520) {
    paddle2.y = 520
  }
}

function other() {
  // SPEEDUP WHEN HITTING A WALL
  if (colide === true && ball.xSpeed < 9 && ball.xSpeed > -9) {
    ball.xSpeed = ball.xSpeed * 1.10
    colide = false
  }
  // ADJUST SCORE1
  if (ball.x > 830) {
    score1++
    preStart()
  }
  // ADJUST SCORE2
  if (ball.x < -30) {
    score2++
    preStart()
  }

  // WIN/LOSE CONDITION
  if (score1 === 10) {
    if (p1 === true) {
      setTimeout(function compWin() {
        execute++
        document.querySelector("p").innerHTML = "Computer Wins!"
      }, 500)
    } else {
      setTimeout(function p1Win() {
        execute++
        document.querySelector("p").innerHTML = "Player 1 Wins!"
      }, 500)
    }
  }
  if (score2 === 10) {
    if (p1 === true) {
      setTimeout(function youWin() {
        execute++
        document.querySelector("p").innerHTML = "You Win!"
      }, 500)
    } else {
      setTimeout(function p2Win() {
        execute++
        document.querySelector("p").innerHTML = "Player 2 Wins!"
      }, 500)
    }
  }
}

// Event Listeners & Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "ArrowUp" && paddle1.y > 0) {
    paddle1.ySpeed = -7.5
  } else if (event.code == "ArrowDown" && paddle1.y < 520) {
    paddle1.ySpeed = 7.5
  }
  if (p2 === true) {
    if (event.code == "KeyW" && paddle2.y > 0) {
      paddle2.ySpeed = -7.5
    } else if (event.code == "KeyS" && paddle2.y < 520) {
      paddle2.ySpeed = 7.5
    }
  }
}

function keyupHandler(event) {
  if (event.code == "ArrowUp" && paddle1.ySpeed < 0) {
    paddle1.ySpeed = 0
  } else if (event.code == "ArrowDown" && paddle1.ySpeed > 0) {
    paddle1.ySpeed = 0
  }
  if (p2 === true) {
    if (event.code == "KeyW" && paddle2.ySpeed < 0) {
      paddle2.ySpeed = 0
    } else if (event.code == "KeyS" && paddle2.ySpeed > 0) {
      paddle2.ySpeed = 0
    }
  }
}

function aiPaddle() {
  // RANDOMIZE WHERE THE AI WILL AIM FOR
  if (colideR === true) {
    ranNum = Math.floor(Math.random() * 78 + 1)
    colideR = false
  }

  // AI DOWN MOVEMENT
  if (ball.y > paddle2.y + ranNum) {
    paddle2.y += Math.min(paddle2.aiYSpeed, ball.y - (paddle2.y + ranNum))
  } // AI UP MOVEMENT
  else if (ball.y < paddle2.y + ranNum) {
    paddle2.y -= Math.min(paddle2.aiYSpeed, (paddle2.y + ranNum) - ball.y)
  }
}

// https://portfolio-website.ethanvink1.repl.co/pong.html
