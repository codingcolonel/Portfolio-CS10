// SET UP CANVAS AND 2D GRAPHICS CONTEXT
// CHANGE SIZE
let cnv = document.querySelector("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 600;

var ball = {
  x: 300,
  y: 100,
  gravity: 0.05,
  gravitySpeed: 0,
}

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

function update() {
  if (ball.y < 572) {
    ball.gravitySpeed += ball.gravity
    ball.y += ball.gravitySpeed
  }
}

function draw() {
  // DRAW BACKROUND
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, 600, 600);

  // DRAW BALL
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, 25, 0, 2 * Math.PI);
  ctx.fill();
}

document.querySelector("button").addEventListener("click", reset)

function reset() {
  ball.y = 100
  ball.gravitySpeed = 0
}