function setup() {
  createCanvas(800, 400, WEBGL);
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
  translate(-width / 2, 0);
  drawPlane(600, 100, 40);
  fill(80);
  stroke(240);
}

function drawPlane(rWidth, rHeight, meshCount) {
  beginShape(TRIANGLES);

  for (let i = 0; i < rWidth; i += rWidth / (meshCount / 2)) {
    let mWidth = rWidth / (meshCount / 2);
    let mHeight = rHeight;
    let offset = i;
    createRectangleMesh(mWidth, mHeight, offset);
  }
  endShape();
}

function createRectangleMesh(mWidth, mHeight, offset) {
  // lower triangle
  createPolygon(mWidth, mHeight, offset);
  // upper triangle
  createPolygon(-mWidth, -mHeight, offset + mWidth);
}

function createPolygon(baseLength, baseHeight, xPos) {
  vertex(xPos, baseHeight / 2);
  vertex(xPos + baseLength, baseHeight / 2);
  vertex(xPos, -baseHeight / 2);
}
