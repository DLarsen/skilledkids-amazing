// This is the game file

let cells = [];
let totalRows = 10;
let totalCols = 20;

const setset = new SetSet();

function union(setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function tryConnectCells(x,y,direction){
  let newPair = [];
  newPair.push(x + "," + y);
  switch (direction) {
    case "N":
        if (y > 0)
        newPair.push(x+ "," +(y-1));
        break;
    case "E":
        if (x < totalCols - 1)
        newPair.push((x+1)+ "," +y);;
        break;
    case "S":
        if (y < totalRows-1)
        newPair.push(x+ "," +(y +1));
        break;
    case "W":
        if (x > 0)
        newPair.push((x-1)+ "," +y);
        break;

    default:
        break;
  }

  if (newPair.length == 2){
    return setset.add(newPair[0],newPair[1]);
  } else {
    return false;
  }

}


function setup() {

  frameRate(2);

  // create cells


  createCanvas(totalRows * 150, totalCols * 150);  

  for (const col of Array(totalCols).keys()) {
    let theColumn = [];
    for (const row of Array(totalRows).keys()) {
      theColumn.push(new Cell(col,row));
    }
    cells.push(theColumn);
    //console.log(["we made a column", theColumn]);
  }

  // make them all connect
  // START
  this.breakTheRightWalls(0,0,"W");
  // FINISH
  this.breakTheRightWalls(totalCols-1,totalRows-1,"S");

  for (const x of Array(1000).keys()) {
    if (setset.maxSetSize() < totalCols * totalRows){
      breakRandomWalls();
      console.log(["DOING setset.maxSetSize()",x, setset.maxSetSize()])
    }
  }
  console.log(["setset.maxSetSize()",setset.maxSetSize()])
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function breakRandomWalls(){
  let x = this.getRandomInt(totalCols);
  let y = this.getRandomInt(totalRows);
  let direction = this.randomItem(["N","S","E","W"]);
  
  if (this.tryConnectCells(x,y,direction)){

    // don't break the edges
    switch (direction) {
      case "N":
          if (y > 0)
          this.breakTheRightWalls(x,y,direction);
          break;
      case "E":
          if (x < totalCols - 1)
          this.breakTheRightWalls(x,y,direction);
          break;
      case "S":
          if (y < totalRows-1)
          this.breakTheRightWalls(x,y,direction);
          break;
      case "W":
          if (x > 0)
          this.breakTheRightWalls(x,y,direction);
          break;

      default:
          break;
    }

    console.log(["broke",x,y,direction]);
  }
  
}

function randomItem(items)
{
  
  return items[Math.floor(Math.random()*items.length)];
     
}

function breakTheRightWalls(x,y,direction){

  console.log([x,y,direction]);
  
  // break the one you targeted
  cells[x][y].breakWall(direction);

  // now break the matching wall
  switch (direction) {
    case "N":
        if (y > 0)
          cells[x][y-1].breakWall("S");
        break;
    case "E":
        if (x < totalCols - 1)
          cells[x+1][y].breakWall("W");
        break;
    case "S":
        if (y < totalRows-1)
          cells[x][y+1].breakWall("N");
        break;
    case "W":
        if (x > 0)
          cells[x-1][y].breakWall("E");
        break;

    default:
        break;
  }
}

function draw() {

  clear();
  background(80);


  cells.forEach(col => {
    col.forEach(cell => {
      cell.draw();
    })
  });
}
