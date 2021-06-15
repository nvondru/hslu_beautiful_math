let pointsCount = 16;
let layerCount = 10;

let layers = [];
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
  layers = [];
  points = [];
  generateNoiseLayers();
  calculateFractalNoise();
  drawPoints();
  console.table(layers);
}

function calculateFractalNoise() {
  for (let i = 0; i < layers[0].length; i++) {
    let ySum = 0;
    for (let j = 0; j < layerCount; j++) {
      ySum += layers[j][i].y;
    }
    let y = ySum / layerCount;
    points.push({ x: layers[0][i].x, y: y });
  }
}

function generateNoiseLayers() {
  let xDimensions = pointsCount;
  let amplitude = 256;
  for (let i = 0; i < layerCount; i++) {
    layers[i] = [];

    let lastX = 0;
    let lastY = height / 2;

    for (let j = 1; j <= xDimensions; j++) {
      let x = j * (width / xDimensions);
      let y = random(height / 2 - amplitude, height / 2 + amplitude);
      saveInterpolatedPointsToLayer(lastX, lastY, x, y, layers[i]);
      lastX = x;
      lastY = y;
    }
    xDimensions *= 2;
    amplitude /= 2;
  }
}

function saveInterpolatedPointsToLayer(x0, y0, x1, y1, currentLayer) {
  for (let x = x0; x < x1; x += 1) {
    let y = interpolateLinear(x, x0, x1, y0, y1);
    currentLayer.push({ x, y });
  }
}

function drawPoints() {
  stroke(0);
  strokeWeight(1);
  for (let i = 0; i < points.length - 1; i++) {
    const p = points[i];
    const nextP = points[i + 1];
    line(p.x, p.y, nextP.x, nextP.y);
  }
}

// lineare Interpolationsgleichung
function interpolateLinear(x, x0, x1, y0, y1) {
  return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
}

function interpolateCosinean(x, x0, x1) {
  let t = (x - x0) / (x1 - x0);
  return 0.5 * (1 - cos(t * Math.PI));
}

function interpolateSmoothStep() {}
