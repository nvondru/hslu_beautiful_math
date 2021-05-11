let circlePoints = 20;
let circleWidth = 50;
let circleHeight = 50;

let angleStep = 360 / 10;
let width = 100;
let height = 100;

let circlesVertices = [];

function setup() {
  createCanvas(800, 800, WEBGL);
  // setup easyCam
  createEasyCam();
  document.oncontextmenu = function () {
    return false;
  };
  document.onmousedown = function () {
    return false;
  };

  angleMode(DEGREES);
}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(0.2);

  drawGuides();
  createVertices();
  drawVertices();

  circlesVertices = [];
}

// create circle vertices rotated around a circle
function createVertices() {
  // for (let i = 1; i < 360; i += angleStep) {
  //   let x = width * sin(i);
  //   let z = height * cos(i);
  //   let center = { x: x, y: 0, z: z };

  // }

  // old
  for (let i = 0; i < 20; i++) {
    circlesVertices.push(createCircleVertices(i * -20));
  }
}

function drawVertices() {
  // for each circle
  for (let i = 0; i < circlesVertices.length; i++) {
    const currentCircle = circlesVertices[i];

    // for each point of a circle
    for (let j = 0; j < currentCircle.length; j++) {
      // if not last circle
      if (i + 1 < circlesVertices.length) {
        let nextCircle = circlesVertices[i + 1];
        createConnection(currentCircle, nextCircle, j, 1);
      }
      // if not first circle
      if (i > 0) {
        let previousCircle = circlesVertices[i - 1];
        createConnection(currentCircle, previousCircle, j, -1);
      }
    }
  }
}
function drawGuides() {
  push();
  // draw guide
  stroke(255, 0, 0);
  strokeWeight(4);
  noFill();

  beginShape();
  for (let i = 1; i < 360; i += angleStep) {
    let x = width * sin(i);
    let z = height * cos(i);
    vertex(x, 0, z);
  }
  endShape(CLOSE);
  pop();
}

function createConnection(
  currentCircle,
  connectorCircle,
  j,
  connectionDirection
) {
  let currentPoint = currentCircle[j];
  let connector_1 = connectorCircle[j];
  let connector_2;

  if (connectionDirection == 1 && j + 1 >= currentCircle.length) {
    connector_2 = connectorCircle[0];
  } else if (connectionDirection == -1 && j - 1 < 0) {
    connector_2 = connectorCircle[connectorCircle.length - 1];
  } else {
    connector_2 = connectorCircle[j + connectionDirection];
  }
  vertex_1 = { x: currentPoint.x, y: currentPoint.y, z: currentPoint.z };
  vertex_2 = { x: connector_1.x, y: connector_1.y, z: connector_1.z };
  vertex_3 = { x: connector_2.x, y: connector_2.y, z: connector_2.z };
  drawPolygon(vertex_1, vertex_2, vertex_3);
}

function drawPolygon(vertex_1, vertex_2, vertex_3) {
  beginShape(TRIANGLES);
  vertex(vertex_1.x, vertex_1.y, vertex_1.z);
  vertex(vertex_2.x, vertex_2.y, vertex_2.z);
  vertex(vertex_3.x, vertex_3.y, vertex_3.z);
  endShape();
}

function createCircleVertices(z) {
  let angleStep = 360 / circlePoints;
  let vertices = [];

  for (let i = 1; i < 360; i += angleStep) {
    let x = circleWidth * sin(i);
    let y = circleHeight * cos(i);
    vertices.push({ x, y, z });
  }
  return vertices;
}
