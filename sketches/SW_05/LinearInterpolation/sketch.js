let point1 = {};
let point2 = {};

function setup() {
  createCanvas(400, 400);
  point1.x = random(0, 401);
  point1.y = random(0, 401);
  point2.x = random(0, 401);
  point2.y = random(0, 401);
  fill(0);
  noStroke();
}

function draw() {
  background(220);
  ellipse(point1.x, point1.y, 10, 10);
  ellipse(point2.x, point2.y, 10, 10);
  drawLine(point1, point2);
}

function drawLine(p1, p2) {
  xDelta = Math.abs(p1.x - p2.x);
  // console.log(xDelta);

  let c = color(0);

  let x0;
  let x1;

  let y0;
  let y1;

  if (p1.x <= p2.x) {
    x0 = p1.x;
    x1 = p2.x;
    y0 = p1.y;
    y1 = p2.y;
  } else {
    x0 = p2.x;
    x1 = p1.x;
    y0 = p2.y;
    y1 = p1.y;
  }

  for (let x = x0; x < x1; x++) {
    let y = y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
    set(x, y, color(0));
  }
  updatePixels();
}
