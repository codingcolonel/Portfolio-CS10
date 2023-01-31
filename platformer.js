// SET UP CANVAS AND 2D GRAPHICS CONTEXT
// CHANGE SIZE
let cnv = document.querySelector("canvas")
let ctx = cnv.getContext("2d")
cnv.width = 800;
cnv.height = 700;

// GLOBAL VARIABLES
var ground = 475
var directionRight = false
var directionLeft = false
var spacePressed = false
var loop = 0
var groundCheck = true
var walljump = false
var rightIsHeld = false
var leftIsHeld = false
var onspikes = false
var downIsHeld = false
var health = 350
var trueHealth = 100
var damage = 10
var damageTimer = false
var timer
var spikeCheck = false
var gameOver = false
var htmlImg = document.getElementById("heart")
var htmlImg2 = document.getElementById("cooldown")
var heartCollectedL = false
var heartCollectedR = false
var ranNum
var groundCheck2 = true
var enemyCheck = true
var inEnemy = false
var timesLeftClicked = 0
var timesRightClicked = 0
var dashing = false

var player = {
  x: 375,
  y: 475,
  xvelocity: 0,
  yvelocity: 0,
  gravity: 0.01,
  gravityspeed: 0,
}

var enemy = {
  x: 200,
  y: 475,
  xvelocity: 2,
  yvelocity: 0,
  gravity: 0.01,
  gravityspeed: 0,
}

// let spikes = {
//   [{}]}
// }

var startTime = new Date().getTime();
var lastTime = null;
var frameRate = 1000 / 60

// DELTATIME
requestAnimationFrame(deltaTime)
function deltaTime() {
  if (lastTime == null) {
    lastTime = new Date().getTime();
  }
  var dt = new Date().getTime() - lastTime;
  lastTime = new Date().getTime();
  var updateCount = dt / frameRate


  if (gameOver === false) {
    for (var i = 0; i < updateCount; i++) {
      update();
    }
    draw();
    requestAnimationFrame(deltaTime);
  }
}

function update() {
  // UPDATE ELEMENTS ON CANVAS
  if (player.y < ground && dashing === false) {
    player.gravityspeed += player.gravity
    player.yvelocity += player.gravityspeed
  }
  player.x = player.x + player.xvelocity;
  player.y = player.y + player.yvelocity;

  // UPDATE VARIABLE
  health = trueHealth * 7.75

  // HELPER FUNCTION
  physics()
  aiEnemy()

  // CONSOLE.LOGS FOR TESTING
  // console.log("gr " + ground)
  // console.log("py " + player.y)
  // console.log("px " + player.x)
  // console.log("yv " + player.yvelocity)
  console.log("xv " + player.xvelocity)
  // console.log("gv " + player.gravityspeed)
  // console.log("dr " + directionRight)
  // console.log("dl " + directionLeft)
  // console.log("lh " + leftIsHeld)
  // console.log("rh " + rightIsHeld)
  // console.log("gc " + groundCheck)
  // console.log("th " + trueHealth)
  // console.log("dt " + damageTimer)
  // console.log("sc " + spikeCheck)
  // console.log("rn " + ranNum)
  // console.log("ey " + enemy.y)
  // console.log("ex " + enemy.x)
  // console.log("eyv " + enemy.yvelocity)
  // console.log("exv " + enemy.xvelocity)
  // console.log("egv " + enemy.gravityspeed)
  // console.log("ec " + enemyCheck)
  console.log("dash" + dashing)
}

function draw() {
  // DRAW BACKROUND
  ctx.fillStyle = "blue"
  ctx.fillRect(0, 0, 800, 600);

  // DRAW GROUND
  ctx.fillStyle = "green"
  ctx.fillRect(0, 525, 800, 100);

  // DRAW PLATFORM
  ctx.fillStyle = "saddlebrown"
  ctx.fillRect(100, 300, 600, 5);

  // DRAW SPIKES
  ctx.beginPath();
  ctx.moveTo(340, 275);
  ctx.lineTo(320, 297);
  ctx.lineTo(360, 297);
  ctx.closePath();

  // OUTLINE
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // FILL
  ctx.fillStyle = "gray";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(380, 275);
  ctx.lineTo(360, 297);
  ctx.lineTo(400, 297);
  ctx.closePath();

  // OUTLINE
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // FILL
  ctx.fillStyle = "gray";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(420, 275);
  ctx.lineTo(400, 297);
  ctx.lineTo(440, 297);
  ctx.closePath();

  // OUTLINE
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // FILL
  ctx.fillStyle = "gray";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(460, 275);
  ctx.lineTo(440, 297);
  ctx.lineTo(480, 297);
  ctx.closePath();

  // OUTLINE
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();

  // FILL
  ctx.fillStyle = "gray";
  ctx.fill();

  // DRAW ENEMY
  ctx.fillStyle = "red";
  ctx.fillRect(enemy.x, enemy.y, 50, 50);

  // DRAW PLAYER
  if (player.y <= 475) {
    if (player.x <= 0) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, player.y, 50, 50);
    } else if (player.x >= 750) {
      ctx.fillStyle = "black";
      ctx.fillRect(750, player.y, 50, 50);
    } else {
      ctx.fillStyle = "black";
      ctx.fillRect(player.x, player.y, 50, 50);
    }
  }

  // DRAW HEARTS
  if (heartCollectedL === false) {
    ctx.drawImage(htmlImg, 0, 475, 50, 50)
  } else {
    ctx.drawImage(htmlImg2, 0, 475, 50, 50)
  }

  if (heartCollectedR === false) {
    ctx.drawImage(htmlImg, 750, 475, 50, 50)
  } else {
    ctx.drawImage(htmlImg2, 750, 475, 50, 50)
  }


  // DRAW HEALTHBAR SECTION BACKROUND
  ctx.fillStyle = "white"
  ctx.fillRect(0, 600, 800, 100);

  // DRAW HEALTH BAR
  ctx.strokeStyle = "black"
  ctx.strokeRect(10, 630, 780, 45);

  // DRAW HEALTH
  ctx.fillStyle = "red"
  ctx.fillRect(13, 632.5, health, 40);

  // DRAW HEALTH NUMBER
  ctx.font = "20px monospace"
  ctx.fillStyle = "black"
  ctx.fillText(trueHealth + "/100", 365, 695)
}

function physics() {
  // IF PLAYER GOES BELLOW GROUND, MOVE UP
  if (player.y > ground) {
    player.y = ground
  }
  // RESET Y VELOCITY + GRAVITY
  if (player.y === ground && groundCheck === true) {
    if (directionLeft === false && directionRight === false && dashing === false) {
      player.xvelocity = 0
    }
    player.gravityspeed = 0
    player.yvelocity = 0
    groundCheck = false
    walljump = false
  }

  // INTIATE GROUND CHECK WHEN ON GROUND
  if (player.yvelocity > 0) {
    groundCheck = true
    spikeCheck = true
  }

  if (downIsHeld === true && player.y === 250 && ground === 250) {
    ground = 475
  }

  // BOUNDARIES
  if (player.x > 750) {
    player.x = 750
  } else if (player.x < 0) {
    player.x = 0
  }
  if (player.y < 0) {
    player.y = 0
  }

  // SET COOLDOWN TIMER FOR WHEN SPECIFIC DIRECTION CAN BE PRESSED AFTER WALLJUMP
  if (player.x === 0) {
    directionLeft = false
    setTimeout(function setTrue() {
      if (leftIsHeld === true) {
        directionLeft = true
      }
    }, 500)
  }

  if (player.x === 750) {
    directionRight = false
    setTimeout(function setTrue() {
      if (rightIsHeld === true) {
        directionRight = true
      }
    }, 500)
  }

  // PLATFORM COLLISION
  if (player.y <= 250 && player.x > 50 && player.x < 700 && (downIsHeld === false || ground === 225)) {
    ground = 250
  }

  if (player.y >= 250 && (player.x < 50 || player.x > 700)) {
    ground = 475
  }

  if (player.y < 305 && player.y > 300 && player.x > 265 && player.x < 485) {
    player.y = 305
    player.yvelocity = 0
  }

  if (directionLeft === true && player.x !== 0) {
    player.xvelocity = -5
  } else if (directionRight === true && player.x !== 750) {
    player.xvelocity = 5
  } else if (player.y === ground || onspikes === true) {
    player.xvelocity = 0
  }

  // SPIKES COLLISION
  if (player.x > 265 && player.x < 485 && player.y > 224 && player.y <= 250) {
    player.y = 225
    ground = 225
    onspikes = true
  }

  //STOP TAKING DAMAGE WHEN OFF SPIKE 
  if (ground !== 225 && inEnemy === false) {
    onspikes = false
    damageTimer = false
    callMyInterval()
  }

  // INITIAL DAMAGE WHEN FIRST LANDING ON SPIKES + START DAMAGE TIMER
  if (spikeCheck === true) {
    if (onspikes === true) {
      damageTimer = true
      callMyInterval()
      spikeCheck = false
    }
  }

  // GAME OVER
  if (trueHealth <= 0) {
    setTimeout(function gameover() {
      gameOver = true
      // DRAW GAME OVER SCREEN
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, 800, 600);

      ctx.font = "100px monospace"
      ctx.fillStyle = "white"
      ctx.fillText("GAME OVER", 150, 325)

      console.log("GAME OVER")
    }, 10)
  }

  // HEART COLLECTION LEFT
  if (player.y > 425 && player.x < 50 && heartCollectedL === false) {
    heartCollectedL = true
    trueHealth += 25
    setTimeout(function setFalse() {
      heartCollectedL = false
    }, 5000)
  }

  // HEART COLLECTION RIGHT
  if (player.y > 425 && player.x > 700 && heartCollectedR === false) {
    heartCollectedR = true
    trueHealth += 25
    setTimeout(function setFalse() {
      heartCollectedR = false
    }, 5000)
  }

  if (trueHealth > 100) {
    trueHealth = 100
  }
  if (trueHealth < 0) {
    trueHealth = 0
  }

  // ENEMY COLLISION
  if (player.x >= enemy.x - 50 && player.x <= enemy.x + 50 && player.y >= enemy.y - 50 && player.y <= enemy.y + 50) {
    if (enemyCheck === true) {
      inEnemy = true
      damageTimer = true
      callMyInterval()
      enemyCheck = false
    }
  } else {
    inEnemy = false
  }
}

function callMyInterval() {
  if (damageTimer === true) {
    trueHealth -= 10
    timer = setInterval(takeDamage, 1000)
  } else {
    clearInterval(timer)
    enemyCheck = true
  }
}

function takeDamage() {
  trueHealth -= damage
}

// EVENT LISTENERS AND HANDLERS
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  // JUMP
  if (event.code === "Space" && player.y === ground && spacePressed === false) {
    spacePressed = true
    player.yvelocity = -10
  }
  // WALLJUMP
  if (event.code == "Space" && player.y !== ground && player.xvelocity !== 0 && spacePressed === false && (player.x === 0 || player.x === 750)) {
    player.xvelocity = -player.xvelocity
    player.gravityspeed = 0
    player.yvelocity = -7
    walljump = true
  }
  // X MOVEMENT
  if (!event.repeat && dashing === false) {
    if (event.code === "ArrowRight" && player.x < 750) {
      timesRightClicked++
      player.xvelocity = 5
      directionRight = true
      rightIsHeld = true
      if(timesRightClicked >= 2) {
        console.log("doubleR")
        dashing = true
        player.xvelocity = 100
        setTimeout(function resetRSpeed() {
          dashing = false
          if (rightIsHeld === true) {
            player.xvelocity = 5
          } else {
            player.xvelocity = 0
          }
        }, 1000)
      }
    }
    if (event.code === "ArrowLeft" && player.x > 0) {
      timesLeftClicked++
      player.xvelocity = -5
      directionLeft = true
      leftIsHeld = true
      if(timesLeftClicked >= 2) {
        console.log("doubleL")
        dashing = true
        player.xvelocity = -100
        gravityspeed = 0
        setTimeout(function resetLSpeed() {
          dashing = false
          if (leftIsHeld === true) {
            player.xvelocity = -5
          } else {
            player.xvelocity = 0
          }
        }, 1000)
      }
    }
    setTimeout(() => (timesLeftClicked = 0), 200)
    setTimeout(() => (timesRightClicked = 0), 200)
  }
  // FALL THROUGH PLATFORM
  if (event.code === "ArrowDown") {
    downIsHeld = true
  }
}

function keyupHandler(event) {
  // PREVENT SPACE FROM BEING HELD DOWN TO JUMP
  if (event.code === "Space") {
    spacePressed = false
    player.yvelocity = 0
  }

  // RESET X MOVEMENT
  if (event.code === "ArrowRight" && player.x <= 750 && player.x >= 0) {
    directionRight = false
    rightIsHeld = false
  }
  if (event.code === "ArrowLeft" && player.x <= 750 && player.x >= 0) {
    directionLeft = false
    leftIsHeld = false
  }
  if (event.code === "ArrowDown") {
    downIsHeld = false
  }
}


function aiEnemy() {
  // UPDATE AI ELEMENTS
  if (enemy.y < 475) {
    enemy.gravityspeed += enemy.gravity
    enemy.yvelocity += enemy.gravityspeed
  }
  enemy.y = enemy.y + enemy.yvelocity;

  // JUMPING
  ranNum = Math.random()
  if (ranNum < 0.0083 && enemy.yvelocity === 0) {
    enemy.yvelocity = -7
  }

  // AI RIGHT MOVEMENT
  if (player.x > enemy.x) {
    enemy.x += Math.min(enemy.xvelocity, player.x - enemy.x)
  } // AI LEFT MOVEMENT
  else if (player.x < enemy.x) {
    enemy.x -= Math.min(enemy.xvelocity, enemy.x - player.x)
  }

  // IF ENEMY GOES BELLOW GROUND, MOVE UP
  if (enemy.y > 475) {
    enemy.y = 475
  }
  // RESET Y VELOCITY + GRAVITY
  if (enemy.y === 475 && groundCheck2 === true) {
    enemy.gravityspeed = 0
    enemy.yvelocity = 0
    groundCheck2 = false
  }
  // INTIATE GROUND CHECK WHEN ENEMY ON GROUND
  if (enemy.yvelocity > 0) {
    groundCheck2 = true
  }
}

// IDEAS/TO DO:
// LEFT/RIGHT SIMULTANIOUSLY - DONE
// ONE-WAY PLATFORMS - DONE
// SMOOTH JUMPING - DONE
// JUMP ACCEL - DONE
// SPIKES - DONE
// ENEMY - DONE
// HIGHER/LOWER JUMPS - DONE
// UNIQUE GAME MECHANIC
// WALL JUMP - DONE
// STOP AFTER FALLING TO GROUND - DONE
// POWERUP/HEALTH REGEN - DONE
// DIFFERENT LEVELS??