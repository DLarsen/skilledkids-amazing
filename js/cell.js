class Cell {

    constructor(x,y) {
      this.x = x;
      this.y = y;

      this.cellSize = 10;
      this.margin = 20;

      this.walls = [true, true, true, true];
    }

    getWall(direction){
        switch (direction) {
            case "N":
                return 0
                break;
            case "E":
                return 1
                break;
            case "S":
                return 2
                break;
            case "W":
                return 0
                break;
        
            default:
                break;
        }
    }

    draw(){
        ellipse(
            this.x * this.cellSize + this.margin, // y
            this.y * this.cellSize + this.margin, // x
            this.cellSize // radius
            );
    }
  }