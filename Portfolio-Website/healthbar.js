// SET UP CANVAS AND 2D GRAPHICS CONTEXT
// CHANGE SIZE
let cnv = document.querySelector("canvas")
let ctx = cnv.getContext("2d")
cnv.width = 800;
cnv.height = 200;

// VARIABLES
let health = 350
let trueHealth = 50

let incBtn = document.getElementById("increase")
let decBtn = document.getElementById("decrease")

incBtn.addEventListener("click", incFunc)
decBtn.addEventListener("click", decFunc)

function incFunc() {
  if (trueHealth < 100) {
    trueHealth += 5
  }
}

function decFunc() {
    if (trueHealth > 0) {
    trueHealth -= 5
  }
}

requestAnimationFrame(draw)
function draw() {
  // DRAW BACKROUND
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, 800, 400);

  // DRAW HEALTH BAR
  ctx.strokeStyle = "white"
  ctx.strokeRect(50, 50, 700, 100);

  // DRAW HEALTH
  ctx.fillStyle = "green"
  ctx.fillRect(50, 50, health, 100);

  // DRAW HEALTH NUMBER
  ctx.font = "30px monospace"
  ctx.fillStyle = "white"
  ctx.fillText(trueHealth + "/100", 350, 180)

  requestAnimationFrame(draw)
}
