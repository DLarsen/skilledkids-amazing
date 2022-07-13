// This is the game file
function setup() {
  createCanvas(400, 400);
  background(80);
}

function draw() {
  if (mouseIsPressed) {
    fill(80);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}
