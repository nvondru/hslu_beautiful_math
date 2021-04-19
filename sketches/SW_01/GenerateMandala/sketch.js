let canvas;

let axis = 16;
let angle = 360 / axis;
let baseSize = 10;

let trMouseX;
let trMouseY;
let pvTrMouseX = 0;
let pvTrMouseY = 0;

function setup() {
  canvas = createCanvas(800, 800);
  angleMode(DEGREES);
  background(100);
}

function draw() {
  translate(width / 2, height / 2);
  noStroke();
  let rndSize = random(1, baseSize);

  let trMouseX = mouseX - width / 2;
  let trMouseY = mouseY - height / 2;

  for (let i = 0; i < axis; i++) {
    push();
    rotate(i * angle);
    if (mouseIsPressed) {
      let distance = dist(trMouseX, trMouseY, pvTrMouseX, pvTrMouseY);
      let paintColor = map(distance, 0, 6, 255, 0);
      fill(paintColor);
      ellipse(trMouseX, trMouseY, rndSize, rndSize);
      scale(-1, 1);
      ellipse(trMouseX, trMouseY, rndSize, rndSize);
    }
    pop();
  }
  pvTrMouseX = trMouseX;
  pvTrMouseY = trMouseY;
}

function keyPressed() {
  if (keyCode === ENTER) {
    saveCanvas(canvas, "myCanvas", "jpg");
  }
}
