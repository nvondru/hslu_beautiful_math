let sourceImg;
let currentImg;
let d;

function preload() {
  sourceImg = loadImage("./images/gnome.jpg");
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
      currentImg.pixels[loc] = r;
      currentImg.pixels[loc + 1] = g;
      currentImg.pixels[loc + 2] = b;
      currentImg.pixels[loc + 3] = a;
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
      if (bright >= 80) {
        let neighLoc = getRandomNeighbour(x, y, 1);

        currentImg.pixels[neighLoc] = currentImg.pixels[loc];
        currentImg.pixels[neighLoc + 1] = currentImg.pixels[loc + 1];
        currentImg.pixels[neighLoc + 2] = currentImg.pixels[loc + 2];
        currentImg.pixels[neighLoc + 3] = currentImg.pixels[loc + 3];

        currentImg.pixels[loc] = 0;
        currentImg.pixels[loc + 1] = 0;
        currentImg.pixels[loc + 2] = 0;
        currentImg.pixels[loc + 3] = 255;
      }
    }
  }
  currentImg.updatePixels();
  image(currentImg, width / 2, height / 2);
}

function getRandomNeighbour(x, y, stepWidth) {
  let dir = Math.floor(random(0, 4));
  let neighLoc;
  if (dir == 0) {
    // top
    neighLoc = 4 * ((y - stepWidth) * currentImg.width + x);
  } else if (dir == 1) {
    // right
    neighLoc = 4 * (y * currentImg.width + x) + 4 * stepWidth;
  } else if (dir == 2) {
    // bottom
    neighLoc = 4 * ((y + stepWidth) * currentImg.width + x);
  } else {
    // left
    neighLoc = 4 * (y * currentImg.width + x) - 4 * stepWidth;
  }
  return neighLoc;
}
