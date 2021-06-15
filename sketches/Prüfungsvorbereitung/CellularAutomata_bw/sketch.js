let sourceImg;
let currentImg;
let d;

function preload() {
  sourceImg = loadImage("./images/maron.jpg");
}

function setup() {
  createCanvas(800, 800);
  frameRate(1);
  imageMode(CENTER);
  currentImg = createImage(sourceImg.width, sourceImg.height);
  sourceImg.loadPixels();
  currentImg.loadPixels();
  for (let x = 0; x < sourceImg.width; x++) {
    for (let y = 0; y < sourceImg.height; y++) {
      let loc = 4 * (y * sourceImg.width + x);
      let r = sourceImg.pixels[loc];
      let g = sourceImg.pixels[loc + 1];
      let b = sourceImg.pixels[loc + 2];
      let a = sourceImg.pixels[loc + 3];
      let c = color(r, g, b, a);
      let bright = brightness(c);
      if (bright <= 10) {
        currentImg.pixels[loc] = 255;
        currentImg.pixels[loc + 1] = 255;
        currentImg.pixels[loc + 2] = 255;
      } else {
        currentImg.pixels[loc] = 0;
        currentImg.pixels[loc + 1] = 0;
        currentImg.pixels[loc + 2] = 0;
      }
      currentImg.pixels[loc + 3] = 255;
    }
  }
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2);
}

function draw() {
  background(100);
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2);
  tick();
}

function tick() {
  nextGrid = currentImg.pixels;

  for (let x = 0; x < currentImg.width; x++) {
    for (let y = 0; y < currentImg.height; y++) {
      let loc = 4 * (y * currentImg.width + x);
      let r = currentImg.pixels[loc];
      let g = currentImg.pixels[loc + 1];
      let b = currentImg.pixels[loc + 2];
      let a = currentImg.pixels[loc + 3];
      let c = color(r, g, b, a);
      let bright = brightness(c);

      let neighbourLocs = getNeighbourLocs(x, y);
      let aliveNeighbours = neighbourLocs.filter((neighbourLoc) => {
        return currentImg.pixels[neighbourLoc] == 0;
      }).length;

      //  -------------------- Game of Life --------------------
      // colorVal = r;
      // if (r == 0 && aliveNeighbours < 2) {
      //   colorVal = 255;
      // } else if (
      //   (r == 0 && aliveNeighbours === 2) ||
      //   (r == 0 && aliveNeighbours === 3)
      // ) {
      //   colorVal = 0;
      // } else if (r == 0 && aliveNeighbours > 3) {
      //   colorVal = 255;
      // } else if (!(r == 0) && aliveNeighbours === 3) {
      //   colorVal = 0;
      // }

      // --------------------- Anneal --------------------------
      // colorVal = 255;
      // // Survival
      // if (
      //   (r == 0 && aliveNeighbours === 3) ||
      //   (r == 0 && aliveNeighbours === 5) ||
      //   (r == 0 && aliveNeighbours === 6) ||
      //   (r == 0 && aliveNeighbours === 7) ||
      //   (r == 0 && aliveNeighbours === 8)
      // ) {
      //   colorVal = r;
      // } else if (
      //   // Birth
      //   (r == 255 && aliveNeighbours == 4) ||
      //   (r == 255 && aliveNeighbours == 6) ||
      //   (r == 255 && aliveNeighbours == 7) ||
      //   (r == 255 && aliveNeighbours == 8)
      // ) {
      //   colorVal = 0;
      // }

      // -------------- Seeds -----------------------
      colorVal = 255;
      if (
        // Birth
        r == 255 &&
        aliveNeighbours == 2
      ) {
        colorVal = 0;
      }

      nextGrid[loc] = colorVal;
      nextGrid[loc + 1] = colorVal;
      nextGrid[loc + 2] = colorVal;
      nextGrid[loc + 3] = 255;
    }
    currentImg.pixels = nextGrid;
  }

  function getNeighbourLocs(x, y) {
    let neighbourLocs = [];
    neighbourLocs.push(4 * ((y - 1) * currentImg.width + x) - 4);
    neighbourLocs.push(4 * ((y - 1) * currentImg.width + x));
    neighbourLocs.push(4 * ((y - 1) * currentImg.width + x) + 4);
    neighbourLocs.push(4 * (y * currentImg.width + x) - 4);
    neighbourLocs.push(4 * (y * currentImg.width + x) + 4);
    neighbourLocs.push(4 * ((y + 1) * currentImg.width + x) - 4);
    neighbourLocs.push(4 * ((y + 1) * currentImg.width + x));
    neighbourLocs.push(4 * ((y + 1) * currentImg.width + x) + 4);
    return neighbourLocs;
  }

  // currentGrid.forEach((row) => {
  //   row.forEach((currentField) => {
  //     let neighbours = getNeighbours(
  //       currentField,
  //       currentGrid.length,
  //       row.length
  //     );
  //     let aliveNeighbours = neighbours.filter((neighbour) => {
  //       return neighbour.isAlive;
  //     }).length;

  //     let currentField_copy = {
  //       x: currentField.x,
  //       y: currentField.y,
  //       isAlive: currentField.isAlive,
  //     };

  //     if (currentField.isAlive && aliveNeighbours < 2) {
  //       currentField_copy.isAlive = false;
  //     } else if (
  //       (currentField.isAlive && aliveNeighbours === 2) ||
  //       (currentField.isAlive && aliveNeighbours === 3)
  //     ) {
  //       currentField_copy.isAlive = true;
  //     } else if (currentField.isAlive && aliveNeighbours > 3) {
  //       currentField_copy.isAlive = false;
  //     } else if (!currentField.isAlive && aliveNeighbours === 3) {
  //       currentField_copy.isAlive = true;
  //     }

  //     if (currentField_copy.isAlive) {
  //       aliveCells += 1;
  //     }
  //     nextGrid[currentField.y][currentField.x] = currentField_copy;
  //   });
  // });
  // currentGrid = nextGrid;
}
