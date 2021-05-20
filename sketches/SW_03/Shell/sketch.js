let circlePoints = 20;
let circleWidth = 50;
let circleHeight = 50;

let angleStep = 360 / 60;
let width = 100;
let height = 100;

let circlesVertices = [];

let shellCount = 2;

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
  strokeWeight(1);
  stroke(120);
}

function draw() {
  background(220);
  randomSeed(93);

  drawGuides();
  drawDonut();
  // drawShell();

  circlesVertices = [];
}

// create circle vertices rotated around a circle
function drawDonut() {
  for (let i = 0; i <= 360; i += angleStep) {
    let x = width * sin(i);
    let y = height * cos(i);
    let z = 0;
    let center = { x, y, z };
    circlesVertices.push(createCircleVertices(center, i, 1));
  }
  drawVertices();
}

function drawShell() {
  for (let i = 0; i <= 360 * shellCount; i += angleStep) {
    let shrinkFactor = map(i, 0, 360 * shellCount, 1, 0);
    let x = width * sin(i) * shrinkFactor;
    let y = height * cos(i) * shrinkFactor;
    let z = i / 4;
    let center = { x, y, z };
    circlesVertices.push(createCircleVertices(center, i, shrinkFactor));
  }
  drawVertices();
}

function createCircleVertices(center, deg, shrinkFactor) {
  let angleStep = 360 / circlePoints;
  let vertices = [];
  let origin = vec3.fromValues(center.x, center.y, center.z);

  for (let i = 1; i < 360; i += angleStep) {
    let x = (center.x + circleWidth * sin(i)) * shrinkFactor;
    let y = (center.y + circleHeight * cos(i)) * shrinkFactor;
    let z = center.z;

    let vertexVector = vec3.fromValues(x, y, z);
    let transformedVector = vec3.create();
    vec3.rotateY(
      transformedVector,
      vertexVector,
      origin,
      glMatrix.toRadian(90)
    );
    vec3.rotateZ(
      transformedVector,
      transformedVector,
      origin,
      glMatrix.toRadian(-deg)
    );

    vertices.push({
      x: transformedVector[0],
      y: transformedVector[1],
      z: transformedVector[2],
    });
  }
  return vertices;
}

function drawVertices() {
  // for each circle
  for (let i = 0; i < circlesVertices.length; i++) {
    const currentCircle = circlesVertices[i];

    // for each point of a circle
    for (let j = 0; j < currentCircle.length; j++) {
      let r = random(255);
      let g = random(255);
      let b = random(255);
      noStroke();
      fill(r, g, b);

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
    let y = height * cos(i);
    let z = 0;
    vertex(x, y, z);
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
