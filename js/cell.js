class Cell {

    constructor(x,y) {
      this.x = x;
      this.y = y;

      this.cellSize = 10;
      this.margin = 20;
    }

    draw(){
        ellipse(
            this.x * this.cellSize + this.margin, // y
            this.y * this.cellSize + this.margin, // x
            this.cellSize // radius
            );
    }
  }