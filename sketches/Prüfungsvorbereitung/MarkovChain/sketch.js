let sourceImg;
let currentImg;
let d;

function preload() {
  sourceImg = loadImage("./images/illidan.jpg");
}

function setup() {
  createCanvas(800, 800);
  imageMode(CENTER);
}

function draw() {
  background(100);
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
      if (bright <= 50) {
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
