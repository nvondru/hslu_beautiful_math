let pointsCount = 16;
let points = [];

let btnRedraw;

function setup() {
  createCanvas(512, 512);
  fill(0);
  noStroke();
  btnRedraw = document.getElementById("btnRedraw");
  btnRedraw.addEventListener("click", drawManually);
  drawManually();
}

function drawManually() {
  background(220);
  drawPoints();
  connectPoints();
}

function drawPoints() {
  points = [];
  for (let i = 0; i < pointsCount; i++) {
    let x = map(i, 0, pointsCount - 1, 0, width);
    let y = random(0, height + 1);
    points[i] = { x, y };
  }
}

function connectPoints() {
  for (let i = 0; i < points.length - 1; i++) {
    const point = points[i];
    let nextPoint = points[i + 1];
    drawLine(point, nextPoint);
  }
}

function drawLine(p1, p2) {
  let x0 = p1.x;
  let x1 = p2.x;
  let y0 = p1.y;
  let y1 = p2.y;

  let step = 1;
  for (let x = x0; x < x1; x += step) {
    let y = interpolateLinear(x, x0, x1, y0, y1);
    let nextY = interpolateLinear(x + step, x0, x1, y0, y1);

    // let y = interpolateCosinean(x, x0, x1, y0, y1);
    // let nextY = interpolateCosinean(x + step, x0, x1, y0, y1);

    // let y = interpolateSmoothStep(x, x0, x1, y0, y1);
    // let nextY = interpolateSmoothStep(x + step, x0, x1, y0, y1);

    stroke(0);
    strokeWeight(1);
    line(x, y, x + step, nextY);
  }
}

// lineare Interpolationsgleichung
function interpolateLinear(x, x0, x1, y0, y1) {
  return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
}

function interpolateCosinean(x, x0, x1, y0, y1) {
  let t = (x - x0) / (x1 - x0);
  t = 0.5 * (1 - cos(t * Math.PI));
  return y0 + t * (y1 - y0);
}

function interpolateSmoothStep(x, x0, x1, y0, y1) {
  let t = (x - x0) / (x1 - x0);
  t = 6 * Math.pow(t, 5) - 15 * Math.pow(t, 4) + 10 * Math.pow(t, 3);
  return y0 + t * (y1 - y0);
}
