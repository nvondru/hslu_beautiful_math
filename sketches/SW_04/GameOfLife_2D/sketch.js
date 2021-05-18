let currentGrid;
let nextGrid;

let canvasWidth = 800;
let canvasHeight = 800;

let gridDimension = 100;
let fieldWidth = canvasWidth / gridDimension;
let fieldHeight = canvasHeight / gridDimension;

let fps = 5;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  frameRate(fps);
  // noStroke();
  // initialize seed
  currentGrid = [];
  for (let i = 0; i < gridDimension; i++) {
    let currentRow = [];
    for (let j = 0; j < gridDimension; j++) {
      currentRow[j] = {
        x: j,
        y: i,
        isAlive: false,
      };
      if (
        i >= Math.floor(gridDimension / 2) - Math.floor(gridDimension / 5) &&
        i <= Math.floor(gridDimension / 2) + Math.floor(gridDimension / 5) &&
        j >= Math.floor(gridDimension / 2) - Math.floor(gridDimension / 5) &&
        j <= Math.floor(gridDimension / 2) + Math.floor(gridDimension / 5)
      ) {
        currentRow[j].isAlive = true;
      }
    }
    currentGrid.push(currentRow);
  }
  drawCurrentGrid();
}

function draw() {
  background(220);
  tick();
  drawCurrentGrid();
}

function drawCurrentGrid() {
  currentGrid.forEach((row) => {
    row.forEach((field) => {
      if (field.isAlive) {
        fill(0);
        stroke(0);
      } else {
        fill(255);
        stroke(180);
      }
      rect(
        field.x * fieldWidth,
        field.y * fieldHeight,
        fieldWidth,
        fieldHeight
      );
    });
  });
}

function tick() {
  nextGrid = [];
  for (let y = 0; y < gridDimension; y++) {
    nextGrid[y] = [];
  }
  currentGrid.forEach((row) => {
    row.forEach((currentField) => {
      let neighbours = getNeighbours(
        currentField,
        currentGrid.length,
        row.length
      );
      let aliveNeighbours = neighbours.filter((neighbour) => {
        return neighbour.isAlive;
      }).length;

      let currentField_copy = {
        x: currentField.x,
        y: currentField.y,
        isAlive: currentField.isAlive,
      };

      if (currentField.isAlive && aliveNeighbours < 2) {
        currentField_copy.isAlive = false;
      } else if (
        (currentField.isAlive && aliveNeighbours === 2) ||
        (currentField.isAlive && aliveNeighbours === 3)
      ) {
        currentField_copy.isAlive = true;
      } else if (currentField.isAlive && aliveNeighbours > 3) {
        currentField_copy.isAlive = false;
      } else if (!currentField.isAlive && aliveNeighbours === 3) {
        currentField_copy.isAlive = true;
      }

      nextGrid[currentField.y][currentField.x] = currentField_copy;
    });
  });
  currentGrid = nextGrid;
}

function getNeighbours(currentField, rowCount, columnCount) {
  let neighbours = [];
  let indexTop;
  let indexBottom;
  let indexLeft;
  let indexRight;

  // get index of row above
  if (currentField.y - 1 < 0) {
    indexTop = rowCount - 1;
  } else {
    indexTop = currentField.y - 1;
  }

  // get index of row below
  if (currentField.y + 1 > rowCount - 1) {
    indexBottom = 0;
  } else {
    indexBottom = currentField.y + 1;
  }

  // get index of column left
  if (currentField.x - 1 < 0) {
    indexLeft = columnCount - 1;
  } else {
    indexLeft = currentField.x - 1;
  }

  // get index of column right
  if (currentField.x + 1 > columnCount - 1) {
    indexRight = 0;
  } else {
    indexRight = currentField.x + 1;
  }

  neighbours.push(currentGrid[indexTop][indexLeft]);
  neighbours.push(currentGrid[indexTop][currentField.x]);
  neighbours.push(currentGrid[indexTop][indexRight]);
  neighbours.push(currentGrid[currentField.y][indexLeft]);
  neighbours.push(currentGrid[currentField.y][indexRight]);
  neighbours.push(currentGrid[indexBottom][indexLeft]);
  neighbours.push(currentGrid[indexBottom][currentField.x]);
  neighbours.push(currentGrid[indexBottom][indexRight]);
  return neighbours;
}

function reset() {}
