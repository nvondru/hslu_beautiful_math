let fieldWidth;
let fieldHeight;

let ruleInput;
let startInput;

let currentGrid;
let nextGrid;

function setup() {
  createCanvas(800, 800);

  noStroke();

  ruleInput = document.getElementById("ruleInput");
  startInput = document.getElementById("startInput");

  currentGrid = [];

  for (let i = 0; i < 11; i++) {
    let currentRow = [];
    for (let j = 0; j < 11; j++) {
      if (i == 5 && j == 5) {
        currentRow[j] = 1;
      } else {
        currentRow[j] = 0;
      }
    }
    currentGrid.push(currentRow);
  }

  console.log(currentGrid);
}

function draw() {
  background(220);

  // create nextGrid
  for (let i = 0; i < currentGrid.length; i++) {
    const row = currentGrid[i];

    for (let j = 0; j < row.length; j++) {
      const field = row[j];
      let neighbours = getNeighbours(i, j, currentGrid.length, row.length);
      // check how man alive
      // switch cases
      // set state of i/j accoridngly
      // push to next
      //at the end set next as current
      // draw current
      // repeat
    }
  }
}

function getNeighbours(i, j, rowCount, columnCount) {
  let neighbours = [];
  let indexTop;
  let indexBottom;
  let indexLeft;
  let indexRight;

  // get index of row above
  if (i - 1 < 0) {
    indexTop = rowCount - 1;
  } else {
    indexTop = i - 1;
  }

  // get index of row below
  if (i + 1 > rowCount - 1) {
    indexBottom = 0;
  } else {
    indexBottom = i + 1;
  }

  // get index of column left
  if (j - 1 < 0) {
    indexLeft = columnCount - 1;
  } else {
    indexLeft = j - 1;
  }

  // get index of column right
  if (j + 1 > columnCount - 1) {
    indexRight = 0;
  } else {
    indexRight = j + 1;
  }

  neighbours.push(currentGrid[indexTop][indexLeft]);
  neighbours.push(currentGrid[indexTop][j]);
  neighbours.push(currentGrid[indexTop][indexRight]);
  neighbours.push(currentGrid[i][indexLeft]);
  neighbours.push(currentGrid[i][indexRight]);
  neighbours.push(currentGrid[indexBottom][indexLeft]);
  neighbours.push(currentGrid[indexBottom][j]);
  neighbours.push(currentGrid[indexBottom][indexRight]);
}

function reset() {}
