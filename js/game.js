// This is the game file

let cells = [
  new Cell(0,0),
  new Cell(0,1),
  new Cell(1,0),
  new Cell(1,1)
];

function setup() {
  createCanvas(400, 400);
  background(80);
}

function draw() {
  //if (mouseIsPressed) {
  //  fill(80);
  //} else {
    //fill(255);
  //}
  //ellipse(mouseX, mouseY, 80, 80);

  cells.forEach(cell => {
    cell.draw();
  });
}
