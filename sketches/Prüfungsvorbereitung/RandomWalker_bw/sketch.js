let sourceImg;
let currentImg;
let d;

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
      let c = color(r, g, b, a);
      let bright = brightness(c);
      if (bright <= 80) {
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
}

function draw() {
  background(100);
  for (let x = 0; x < currentImg.width; x++) {
    for (let y = 0; y < currentImg.height; y++) {
      let loc = 4 * (y * currentImg.width + x);
      let r = currentImg.pixels[loc];
      let g = currentImg.pixels[loc + 1];
      let b = currentImg.pixels[loc + 2];
      let a = currentImg.pixels[loc + 3];
      let c = color(r, g, b, a);
      let bright = brightness(c);
      if (bright == 0) {
        let neighLoc = getRandomNeighbour(x, y);
        if (currentImg.pixels[neighLoc] == 255) {
          currentImg.pixels[neighLoc] = 0;
          currentImg.pixels[neighLoc + 1] = 0;
          currentImg.pixels[neighLoc + 2] = 0;
          currentImg.pixels[neighLoc + 3] = 255;

          currentImg.pixels[loc] = 255;
          currentImg.pixels[loc + 1] = 255;
          currentImg.pixels[loc + 2] = 255;
          currentImg.pixels[loc + 3] = 255;
        }
      }
    }
  }
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2);
}

function getRandomNeighbour(x, y) {
  let dir = Math.floor(random(0, 4));
  let neighLoc;
  if (dir == 0) {
    // top
    neighLoc = 4 * ((y - 1) * currentImg.width + x);
  } else if (dir == 1) {
    // right
    neighLoc = 4 * (y * currentImg.width + x) + 4;
  } else if (dir == 2) {
    // bottom
    neighLoc = 4 * ((y + 1) * currentImg.width + x);
  } else {
    // left
    neighLoc = 4 * (y * currentImg.width + x) - 4;
  }
  return neighLoc;
}
