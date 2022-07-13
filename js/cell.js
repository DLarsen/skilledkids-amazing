
class Cell {

    constructor(x,y) {
      this.x = x;
      this.y = y;

      this.cellSize = 10;
      this.margin = 20.5;
      this.spacing = 0;

      this.wallWidth = 1;
      // this.walls = [this.randomBool(), this.randomBool(), this.randomBool(), this.randomBool()];
      this.walls = [true,true,true,true];
    }

    breakWall(direction){
      this.walls[this.getWall(direction)] = false;
    }

    randomBool(){
      return Math.random() < 0.5;
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
                return 3
                break;
        
            default:
                break;
        }
    }

    draw(){
      // stroke(14);
      // strokeWeight(1);  
      // square(
      //       this.x * (this.cellSize + this.spacing) + this.margin, // x
      //       this.y * (this.cellSize + this.spacing) + this.margin, // y
      //       this.cellSize // radius
      //       );
        
        // NORTH WALL
        if (this.walls[this.getWall("N")]){
          stroke(255, 0, 0);
          strokeWeight(this.wallWidth);
          line(
            this.x * (this.cellSize + this.spacing) + this.margin, // x1
            this.y * (this.cellSize + this.spacing) + this.margin, // y1
            this.x * (this.cellSize + this.spacing) + this.margin + this.cellSize, // x2
            this.y * (this.cellSize + this.spacing) + this.margin  // y2
            );
        }
        
        // SOUTH WALL
        if (this.walls[this.getWall("S")]){
          stroke(0, 0, 255);
          strokeWeight(this.wallWidth);
          line(
            this.x * (this.cellSize + this.spacing) + this.margin, // x1
            this.y * (this.cellSize + this.spacing) + this.margin + this.cellSize, // y1
            this.x * (this.cellSize + this.spacing) + this.margin + this.cellSize, // x2
            this.y * (this.cellSize + this.spacing) + this.margin + this.cellSize  // y2
            );
        }

        // EAST WALL
        if (this.walls[this.getWall("E")]){
          stroke(0, 255, 0);
          strokeWeight(this.wallWidth);
          line(
            this.x * (this.cellSize + this.spacing) + this.margin + this.cellSize, // x1
            this.y * (this.cellSize + this.spacing) + this.margin, // y1
            this.x * (this.cellSize + this.spacing) + this.margin + this.cellSize, // x2
            this.y * (this.cellSize + this.spacing) + this.margin + this.cellSize  // y2
            );
        }
        
        // WEST WALL
        if (this.walls[this.getWall("W")]){
          stroke(255, 0, 255);
          strokeWeight(this.wallWidth);
          line(
            this.x * (this.cellSize + this.spacing) + this.margin, // x1
            this.y * (this.cellSize + this.spacing) + this.margin, // y1
            this.x * (this.cellSize + this.spacing) + this.margin, // x2
            this.y * (this.cellSize + this.spacing) + this.margin + this.cellSize  // y2
            );
        }
    }
  }