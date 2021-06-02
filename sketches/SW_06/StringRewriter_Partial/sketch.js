let stringRewriter;
let renderer;

let rules = [];
let layers = [];
let trees = [];
let firstTimestamp = Date.now();

function setup() {
  createCanvas(800, 800);
  frameRate(100);

  rules = [
    {
      formula: "|[+F]|[-F]+F",
      angle: 20,
      stepSize: 300,
      maxLevels: 5,
      strokeWeight: 1,
    },
    {
      formula: "|[-F][+F]",
      angle: 20,
      stepSize: 300,
      maxLevels: 5,
      strokeWeight: 1,
    },
    {
      formula: "|[--F][+F]-F",
      angle: 20,
      stepSize: 300,
      maxLevels: 5,
      strokeWeight: 1,
    },
    {
      formula: "FF+[+F-F-F]-[-F+F+F]",
      angle: 25,
      stepSize: 2,
      maxLevels: 4,
      strokeWeight: 0.3,
    },
  ];

  background(110, 104, 94);
  // // Define colors
  // c1 = color(100, 10, 10);
  // c2 = color(250, 225, 106);
  // setGradient(c1, c2);
  // // randomSeed(20);
  // layers.push(drawLandscape(300, 100, 10, 20, 120, 0.2));
  // layers.push(drawLandscape(500, 80, 3, 6, 70, 0.5));
  // layers.push(drawLandscape(600, 50, 3, 8, 0, 1));
  stroke(0);
  angleMode(DEGREES);
}

function draw() {
  let randomX = random(0, width);
  let randomY = random(0, height);
  trees.push(spawnRandomTree(randomX, randomY));

  trees.forEach((tree) => {
    if (tree.stringRewriter.levels <= tree.rule.maxLevels) {
      growTree(tree);
    }
  });
}

function spawnRandomTree(posX, posY) {
  let randomRule = rules[Math.floor(random(0, rules.length))];
  stringRewriter = new StringRewriter(["F"], "F", {
    F: randomRule.formula,
  });
  let randomSizeAmplitude = random(
    -randomRule.stepSize / 4,
    randomRule.stepSize / 4
  );
  renderer = new StringRenderer(
    randomRule.angle,
    randomRule.stepSize + randomSizeAmplitude
  );
  let deltaTime = Date.now() - firstTimestamp;
  let shift = cos(deltaTime / 100);
  let hue = map(shift, -1, 1, 25, 140);
  console.log(hue);
  let tree = {
    stringRewriter,
    renderer,
    posX,
    posY,
    rule: randomRule,
    saturation: random(0, 65),
    hue,
  };
  growTree(tree);
  return tree;
}

function growTree(tree) {
  push();
  colorMode(HSL);
  stroke(tree.hue, tree.saturation, 20, 0.7);
  strokeWeight(tree.rule.strokeWeight);
  translate(tree.posX, tree.posY);
  let state = tree.stringRewriter.state;
  state = tree.stringRewriter.createNextGeneration();

  tree.renderer.interpretState(state);
  pop();
}

function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = 0; y < height / 2; y++) {
    var inter = map(y, 0, height / 2, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    strokeWeight(2);
    line(0, y, width, y);
  }
}

function drawLandscape(
  horizonLine,
  amplitude,
  minPoints,
  maxPoints,
  fillColor,
  sizeFactor
) {
  let gridPoints = [];
  let pointsCount = random(minPoints, maxPoints);

  for (let i = 0; i < pointsCount; i++) {
    let x = map(i, 0, pointsCount - 1, 0, width);
    let y = random(horizonLine - amplitude, horizonLine + amplitude);
    gridPoints[i] = { x, y };
  }

  let points = [];
  for (let i = 0; i < gridPoints.length - 1; i++) {
    const point = gridPoints[i];
    let nextPoint = gridPoints[i + 1];
    points = points.concat(drawLine(point, nextPoint, fillColor));
    console.log("sad");
  }
  return {
    horizonLine,
    sizeFactor,
    points,
    fillColor,
  };
}

function drawLine(p1, p2, fillColor) {
  let x0 = p1.x;
  let x1 = p2.x;
  let y0 = p1.y;
  let y1 = p2.y;

  let interpolatedPoints = [];

  for (let x = x0; x < x1; x += 1) {
    let y = interpolateSmoothStep(x, x0, x1, y0, y1);
    stroke(fillColor);
    strokeWeight(2);
    line(x, height, x, y);
    interpolatedPoints.push({
      x,
      y,
    });
  }
  return interpolatedPoints;
}

function interpolateSmoothStep(x, x0, x1, y0, y1) {
  let t = (x - x0) / (x1 - x0);
  t = 6 * Math.pow(t, 5) - 15 * Math.pow(t, 4) + 10 * Math.pow(t, 3);
  return y0 + t * (y1 - y0);
}
