/*
  Vorname/Name:   Nicolas Vondru
  Designabsicht:  Regarding the current discussion about climate change and littering of our nature I want to encourage people to think about the effect of their behaviour. 
                  If we don't change our habits drastically over the coming years, our seas will loose their beauty and will no longer be home to many wonderful species of our planet.
                  I express the progressive decomposition of nature through image manipulations based on different cellular automata rules.
                  The original colours of the original images are retained and further alienated.
  Datum:          16.06.2021
  Modul:          Beautiful Mathematics / I.BA_172_MATH2.F2101
  Kursleitung:    Dragica Kahlina
  Projektname:    SEA LIFE 2050
*/

let sourceImg;
let currentImg;
let d;
let threshold = 50;
let started = false;

function preload() {
  sourceImg = loadImage("./images/corals_all_low.png");
}

function setup() {
  // add functionality to start the "animation"
  document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("banner").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    started = true;
  });
  createCanvas(innerWidth, innerHeight);
  imageMode(CENTER);

  // setup the initial copy of the loaded image
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
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2, width, height);
  if (started) {
    tick();
  }
}

// manipulate the current image over time
function tick() {
  nextGrid = currentImg.pixels;

  // some inspiration from: https://www.youtube.com/watch?v=j-ZLDEnhT3Q -> Coding Train
  for (let x = 0; x < currentImg.width; x++) {
    for (let y = 0; y < currentImg.height; y++) {
      let loc = 4 * (y * currentImg.width + x);
      let r = currentImg.pixels[loc];
      let g = currentImg.pixels[loc + 1];
      let b = currentImg.pixels[loc + 2];
      let a = currentImg.pixels[loc + 3];
      let c = color(r, g, b, a);
      let bright = brightness(c);

      //  get indices for all neighbours (topleft, top, topright, left, right, bottomleft, bottom, bottomright)
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

      // calculates the average rgb values from all surrounding alive neighbours
      let averageAliveColor = getAverageAliveColor(aliveNeighbours);

      // calculates the average rgb values from all surrounding dead neighbours
      let averageDeadColor = getAverageDeadColor(deadNeighbours);

      let aliveNeighbourCount = aliveNeighbours.length;
      let rCopy = averageDeadColor.r;
      let gCopy = averageDeadColor.g;
      let bCopy = averageDeadColor.b;

      if (x <= currentImg.width / 2 && y < currentImg.height / 2) {
        // ------------- Game of Life (B3/S23) -----------------
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
      } else if (x >= currentImg.width / 2 && y < currentImg.height / 2) {
        // ------------- ANNEAL (B4678/S35678) -----------------
        // Survival
        if (
          (bright < threshold && aliveNeighbourCount === 3) ||
          (bright < threshold && aliveNeighbourCount === 5) ||
          (bright < threshold && aliveNeighbourCount === 6) ||
          (bright < threshold && aliveNeighbourCount === 7) ||
          (bright < threshold && aliveNeighbourCount === 8)
        ) {
          rCopy = r;
          gCopy = g;
          bCopy = b;
        } else if (
          // Birth
          (bright >= threshold && aliveNeighbourCount == 4) ||
          (bright >= threshold && aliveNeighbourCount == 6) ||
          (bright >= threshold && aliveNeighbourCount == 7) ||
          (bright >= threshold && aliveNeighbourCount == 8)
        ) {
          rCopy = averageAliveColor.r;
          gCopy = averageAliveColor.g;
          bCopy = averageAliveColor.b;
        }
      } else if (x <= currentImg.width / 2 && y >= currentImg.height / 2) {
        // ------------- Diamoeba (B35678/S5678) -----------------
        // Survival
        if (
          (bright < threshold && aliveNeighbourCount === 5) ||
          (bright < threshold && aliveNeighbourCount === 6) ||
          (bright < threshold && aliveNeighbourCount === 7) ||
          (bright < threshold && aliveNeighbourCount === 8)
        ) {
          rCopy = r;
          gCopy = g;
          bCopy = b;
        } else if (
          // Birth
          (bright >= threshold && aliveNeighbourCount == 3) ||
          (bright >= threshold && aliveNeighbourCount == 5) ||
          (bright >= threshold && aliveNeighbourCount == 6) ||
          (bright >= threshold && aliveNeighbourCount == 7) ||
          (bright >= threshold && aliveNeighbourCount == 8)
        ) {
          rCopy = averageAliveColor.r;
          gCopy = averageAliveColor.g;
          bCopy = averageAliveColor.b;
        }
      } else {
        // ------------------  Seeds (B2/S) --------------------------
        if (
          // Birth
          bright >= threshold &&
          aliveNeighbourCount == 2
        ) {
          rCopy = averageAliveColor.r;
          gCopy = averageAliveColor.g;
          bCopy = averageAliveColor.b;
        }
      }

      // set new pixel rgb values
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
