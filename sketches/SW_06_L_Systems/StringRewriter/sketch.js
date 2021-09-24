let stringRewriter;
let renderer;

let rules = [
  {
    formula: "|[+F]|[-F]+F",
    angle: 20,
    stepSize: 300,
  },
  {
    formula: "|[-F][+F]",
    angle: 20,
    stepSize: 300,
  },
  {
    formula: "|[--F][+F]-F",
    angle: 20,
    stepSize: 300,
  },
];
let layers = [];
let trees = [];

function setup() {
  createCanvas(800, 800);
  frameRate(10);
  // Define colors
  c1 = color(100, 10, 10);
  c2 = color(250, 225, 106);
  setGradient(c1, c2);
  // randomSeed(20);
  layers.push(drawLandscape(300, 100, 10, 20, 120, 0.2));
  layers.push(drawLandscape(500, 80, 3, 6, 70, 0.5));
  layers.push(drawLandscape(600, 50, 3, 8, 0, 1));

  stroke(0);
  angleMode(DEGREES);
}

function draw() {
  let randomLayer = layers[Math.floor(random(0, layers.length))];
  let randomPointOnLayer =
    randomLayer.points[Math.floor(random(0, randomLayer.points.length))];

  trees.push(
    spawnRandomTree(randomPointOnLayer.x, randomPointOnLayer.y, randomLayer)
  );

  let randomTree = trees[Math.floor(random(0, trees.length))];
  // growTree(randomTree);

  trees.forEach((tree) => {
    if (tree.stringRewriter.levels <= 5) {
      growTree(tree);
    }
  });
}

function spawnRandomTree(posX, posY, layer) {
  let randomRule = rules[Math.floor(random(0, rules.length))];
  stringRewriter = new StringRewriter(["F"], "F", {
    F: randomRule.formula,
  });
  let randomSizeAmplitude = random(
    -(randomRule.stepSize * layer.sizeFactor) / 2,
    (randomRule.stepSize * layer.sizeFactor) / 2
  );
  renderer = new StringRenderer(
    randomRule.angle,
    randomRule.stepSize * layer.sizeFactor + randomSizeAmplitude
  );
  let tree = {
    stringRewriter,
    renderer,
    posX,
    posY,
    layer,
  };
  growTree(tree);
  return tree;
}

function growTree(tree) {
  push();
  // let fillColor = tree.layer.fillColor;
  let r = random(70, 90);
  let g = random(80, 120);
  let b = random(20, 60);
  stroke(r, g, b);
  // stroke(fillColor, fillColor, fillColor);
  strokeWeight(1);
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
