let canvas;
let radius = 300;
let points = 10;
let debug = true;
let action = "polygon_points";
let animationAngleStep = 1;
let animationAngle = 0;

let slider_radius;
let slider_points;
let checkbox_debugging;
let select_action;

function setup() {
  canvas = createCanvas(800, 800);
  angleMode(DEGREES);
  frameRate(30);
  slider_points = createSlider(1, 300, points, 1);
  slider_radius = createSlider(10, width, radius, 1);
  checkbox_debugging = createCheckbox("Debugging", debug);
  checkbox_debugging.changed(toggleDebug);
  select_action = createSelect();
  select_action.option("polygon_points");
  select_action.option("polygon_lines");
  select_action.option("polygon_vertex");
  select_action.option("spiral_archimedean");
  select_action.option("spiral_logarithmic");
  select_action.changed(changeAction);
}

function changeAction() {
  action = select_action.value();
}

function toggleDebug() {
  debug = this.checked();
}

function draw() {
  radius = slider_radius.value();
  points = slider_points.value();
  background(40);
  translate(width / 2, height / 2);
  animationAngle += animationAngleStep;
  rotate(animationAngle);

  switch (action) {
    case "polygon_points":
      drawWithLines_points();
      break;

    case "polygon_lines":
      drawWithLines_width();
      break;

    case "polygon_vertex":
      drawWithVertex();
      break;

    case "spiral_archimedean":
      drawSpiralWithEllipses_archimedean();
      break;

    case "spiral_logarithmic":
      drawSpiralWithEllipses_logarithmic();
      break;

    default:
      break;
  }
  //add this function call to enable commenting
  displayComment(width, height);
}

function drawCircleWithEllipses() {
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

function drawSpiralWithEllipses_archimedean() {
  let totalAngle = 360 * 4;
  let dotSize = 2;

  if (debug === true) {
    showDebugLines();
  }

  fill(255);
  noStroke();

  for (
    let curAngle = 0;
    curAngle < totalAngle;
    curAngle += totalAngle / points
  ) {
    let curRadius = radius * (curAngle / totalAngle);
    let x = sin(curAngle) * curRadius;
    let y = cos(curAngle) * curRadius;
    ellipse(x, y, dotSize, dotSize);
  }
}

function drawSpiralWithEllipses_logarithmic() {
  let step = 10;
  let exponent = 0.0003;
  let dotSize = 5;
  let curRadius = 0;
  let angle = 0;
  noStroke();
  fill(255);
  while (curRadius < radius) {
    curRadius = Math.exp(exponent * angle);
    let x = curRadius * cos(angle);
    let y = curRadius * sin(angle);
    ellipse(x, y, dotSize, dotSize);
    angle += step;
  }
}

function drawWithVertex() {
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

function drawWithLines_points() {
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

function drawWithLines_width() {
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
  stroke(255, 0, 0, 0.6);
  let gamma = 360 / points;
  for (let i = 0; i < 360; i += gamma) {
    line(0, 0, radius * sin(i), radius * cos(i));
  }

  pop();
}
