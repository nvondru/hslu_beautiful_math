let canvas;

function setup() {
  canvas = createCanvas(800, 800);
  angleMode(DEGREES);
  background(0);
}

function draw() {
  translate(width / 2, height / 2);
  drawWithVertex();
}

function drawCircleWithEllipses() {
  let resolution = 10000;
  let radius = 200;
  let dotSize = 2;

  for (let i = 0; i < resolution; i++) {
    push();
    rotate(i * (360 / resolution));
    fill(255);
    noStroke();
    ellipse(0, radius, dotSize, dotSize);
    pop();
  }
}

function drawSpiralWithEllipses() {
  let resolution = 800;
  let radius = 200;
  let dotSize = 2;
  let spiralWaves = 10;

  for (let i = 0; i < resolution; i++) {
    push();
    rotate(i * (360 / resolution) * spiralWaves);
    fill(255);
    noStroke();
    ellipse(0, (i * radius) / resolution, dotSize, dotSize);
    pop();
  }
}

function drawWithVertex() {
  let points = 3;
  let angleStep = 360 / points;
  let width = 300;
  let height = 300;

  let prevX = 0;
  let prevY = 100;

  stroke(255);
  strokeWeight(4);
  noFill();

  // TODO
  // -------------------------------------------------
  beginShape();
  for (let i = 1; i < 360; i += angleStep) {
    let x = width * sin(i);
    let y = height * cos(i);
    // line(prevX, prevY, x, y);
    prevX = x;
    prevY = y;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawWithLines() {
  angleMode(RADIANS);
  let points = 4;
  let radius = 100;
  let gamma = (2 * PI) / points;
  let alpha = (PI - gamma) / 2;

  ellipse(0, 0, 2, 2);

  let side = 2 * alpha * sin(gamma / 2) * radius;
  let offset = Math.sqrt(radius * radius - (side * side) / 4);

  for (let i = 0; i < points; i++) {
    push();
    rotate(i * gamma);
    line(-side / 2, offset, side / 2, offset);

    console.log(-side / 2 + " " + offset + " " + side / 2 + " " + offset);
    pop();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    saveCanvas(canvas, "myCanvas", "jpg");
  }
}
