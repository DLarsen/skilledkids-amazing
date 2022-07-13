// This is the game file

let cells = [];
let totalRows = 3;
let totalCols = 4;

const connectedCellSets = [];

function union(setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function connectCells(x,y,direction){
  let newPair = new Set();
  newPair.add(x + "," + y);
  switch (direction) {
    case "N":
        if (y > 0)
        newPair.add(x+ "," +y-1);
        break;
    case "E":
        if (x < totalCols - 1)
        newPair.add(x+1+ "," +y);;
        break;
    case "S":
        if (y < totalRows-1)
        newPair.add(x,y+ "," +1);
        break;
    case "W":
        if (x > 0)
        newPair.add(x-1+ "," +y);
        break;

    default:
        break;
  }

  // look for either of these in an existing set
  var found = false;

  var unmatchedSets = [];
  var matchedSet = new Set();

  newPair.forEach(item => {
    console.log(["looking for ", item])
    connectedCellSets.forEach(otherSet => {
      console.log(["checking ", otherSet])
      if (otherSet.has(item)){
        newPair.forEach(item => { matchedSet.add(item)});
        otherSet.forEach(item => { matchedSet.add(item)});
        // maybe better to have function to get index of which set it's found in
        // if it's in zero sets, push to array of sets
        // if it's in one set, add to that set
        // if it's in two sets, then merge them
      }
    })
  })

  if (!found){
    connectedCellSets.push(newPair);
  }

  console.log(connectedCellSets);
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

  for (const col of Array(1000).keys()) {
    //breakRandomWalls();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function breakRandomWalls(){
  let x = this.getRandomInt(totalCols);
  let y = this.getRandomInt(totalRows);
  let direction = this.randomItem(["N","S","E","W"]);
  

  
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
