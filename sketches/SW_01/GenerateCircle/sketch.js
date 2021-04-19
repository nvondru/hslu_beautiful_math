let canvas;
let radius = 300;
let points = 30000;
let commentOpen = false;
let comment = "";

let commentCard = document.getElementById("commentCard");
let commentCard__input = document.getElementById("commentCard__input");

function setup() {
  canvas = createCanvas(800, 800);
  angleMode(DEGREES);

  commentCard__input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && commentOpen) {
      comment = commentCard__input.value;
      commentCard__input.value = "";
      setTimeout(() => {
        saveCanvas(canvas, "SW_01_" + commentCard__input.value, "png");
        commentOpen = false;
        commentCard.classList.add("hidden");
      }, 50);
    }
  });

  document
    .getElementsByTagName("body")[0]
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !commentOpen) {
        commentOpen = true;
        commentCard.classList.remove("hidden");
        commentCard__input.focus();
      }
    });
}

function draw() {
  background(40);
  translate(width / 2, height / 2);
  drawSpiralWithEllipses_logarithmic(false);
  textSize(20);
  textAlign(CENTER);
  fill(0, 255, 0);
  text(comment, -400, -350, 800);
}

function drawCircleWithEllipses(debug) {
  let dotSize = 4;

  if (debug === true) {
    showDebugLines();
  }

  for (let i = 0; i < points; i++) {
    push();
    rotate(i * (360 / points));
    fill(255);
    noStroke();
    ellipse(0, radius, dotSize, dotSize);
    pop();
  }
}

function drawSpiralWithEllipses_archimedean(debug) {
  let dotSize = 2;
  let angle = 360 * 4;

  if (debug === true) {
    showDebugLines();
  }

  for (let i = 0; i < points; i++) {
    push();
    let curAngle = i * (angle / points);
    rotate(curAngle);
    fill(255);
    noStroke();
    ellipse(0, (i * radius) / points, dotSize, dotSize);
    pop();
  }
}

function drawSpiralWithEllipses_logarithmic(debug) {
  let dotSize = 2;
  let angle = 360 * 4;

  if (debug === true) {
    showDebugLines();
  }

  for (let i = 0; i < points; i++) {
    push();
    let curAngle = i * i * (angle / points);
    // console.log(curAngle);
    rotate(curAngle);
    fill(255);
    noStroke();
    ellipse(0, (i * radius) / points, dotSize, dotSize);
    pop();
  }
}

function drawWithVertex(debug) {
  let angleStep = 360 / points;
  let width = 1;
  let height = 1;

  if (debug === true) {
    showDebugLines();
  }

  stroke(255);
  strokeWeight(4);
  noFill();

  beginShape();
  for (let i = 1; i < 360; i += angleStep) {
    let x = width * radius * sin(i);
    let y = height * radius * cos(i);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function drawWithLines_points(debug) {
  let gamma = 360 / points;
  let width = 1;
  let height = 1;

  if (debug === true) {
    showDebugLines();
  }

  let prevX = width * radius * sin(0);
  let prevY = height * radius * cos(0);

  stroke(255);
  strokeWeight(4);
  noFill();

  for (let i = gamma; i <= 360; i += gamma) {
    let x = width * radius * sin(i);
    let y = height * radius * cos(i);
    line(prevX, prevY, x, y);
    prevX = x;
    prevY = y;
  }
}

function drawWithLines_width(debug) {
  let gamma = 360 / points;

  if (debug === true) {
    showDebugLines();
  }
  push();
  rotate(gamma / 2);
  // sine theorem
  let side = 2 * radius * sin(gamma / 2);
  // pythagoras
  let offset = Math.sqrt(radius * radius - (side * side) / 4);
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < points; i++) {
    push();
    rotate(i * gamma);
    line(-side / 2, offset, side / 2, offset);
    pop();
  }
  pop();
}

function showDebugLines() {
  push();
  colorMode(RGB, 255, 255, 255, 1);
  // draw outer circle (unity circle)
  stroke(0, 255, 0, 0.5);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, radius * 2, radius * 2);

  // draw connection lines from center to each vertex of the polygon
  let gamma = 360 / points;
  stroke(255, 0, 0, 0.6);
  for (let i = 0; i < 360; i += gamma) {
    line(0, 0, radius * sin(i), radius * cos(i));
  }

  pop();
}
