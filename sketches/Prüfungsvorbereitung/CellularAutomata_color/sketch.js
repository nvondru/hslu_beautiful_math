let sourceImg;
let currentImg;
let d;
let threshold = 50;

function preload() {
  sourceImg = loadImage("./images/illidan.jpg");
}

function setup() {
  createCanvas(800, 800);
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

      currentImg.pixels[loc + 0] = r;
      currentImg.pixels[loc + 1] = g;
      currentImg.pixels[loc + 2] = b;
      currentImg.pixels[loc + 3] = a;
    }
  }
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2);
}

function draw() {
  background(100);
  tick();
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2);
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
        let r = currentImg.pixels[neighbourLoc];
        let g = currentImg.pixels[neighbourLoc + 1];
        let b = currentImg.pixels[neighbourLoc + 2];

        return brightness(color(r, g, b)) <= threshold;
      });
      let deadNeighbours = neighbourLocs.filter((neighbourLoc) => {
        let r = currentImg.pixels[neighbourLoc];
        let g = currentImg.pixels[neighbourLoc + 1];
        let b = currentImg.pixels[neighbourLoc + 2];

        return brightness(color(r, g, b)) > threshold;
      });

      let averageAliveColor = getAverageAliveColor(aliveNeighbours);
      let averageDeadColor = getAverageDeadColor(deadNeighbours);

      let aliveNeighbourCount = aliveNeighbours.length;

      //  -------------------- Game of Life --------------------
      let rCopy = averageDeadColor.r;
      let gCopy = averageDeadColor.g;
      let bCopy = averageDeadColor.b;
      // // Survival
      if (
        (bright < threshold && aliveNeighbourCount === 2) ||
        (bright < threshold && aliveNeighbourCount === 3)
      ) {
        rCopy = r;
        gCopy = g;
        bCopy = b;
      } else if (
        // Birth -> gets average value from alive neighbours
        bright >= threshold &&
        aliveNeighbourCount == 3
      ) {
        rCopy = averageAliveColor.r;
        gCopy = averageAliveColor.g;
        bCopy = averageAliveColor.b;
      }

      nextGrid[loc] = rCopy;
      nextGrid[loc + 1] = gCopy;
      nextGrid[loc + 2] = bCopy;
      nextGrid[loc + 3] = 255;
    }
    currentImg.pixels = nextGrid;
  }
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

function getAverageDeadColor(neighs) {
  let r = 0;
  let g = 0;
  let b = 0;

  neighs.forEach((neigh) => {
    r += currentImg.pixels[neigh];
    g += currentImg.pixels[neigh + 1];
    b += currentImg.pixels[neigh + 2];
  });

  return {
    r: r / neighs.length,
    g: g / neighs.length,
    b: b / neighs.length,
  };
}

function getAverageAliveColor(neighs) {
  let r = 0;
  let g = 0;
  let b = 0;

  neighs.forEach((neigh) => {
    r += currentImg.pixels[neigh];
    g += currentImg.pixels[neigh + 1];
    b += currentImg.pixels[neigh + 2];
  });

  return {
    r: r / neighs.length,
    g: g / neighs.length,
    b: b / neighs.length,
  };
}
