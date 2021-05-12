let startLine = [];
let automat = [];
let rule = [];
let imgSide = 101;
let fieldWidth;
let fieldHeight;

let ruleInput;
let startInput;

let binary;
let startIsRandom;

function setup() {
  createCanvas(800, 800);

  noStroke();
  ruleInput = document.getElementById("ruleInput");
  startInput = document.getElementById("startInput");
  sideInput = document.getElementById("sideInput");

  ruleInput.addEventListener("change", redrawImage);
  startInput.addEventListener("change", redrawImage);
  sideInput.addEventListener("change", redrawImage);

  randomSeed(10);
  readInputs();
  redrawImage();
}

function redrawImage() {
  reset();
  readInputs();
  fieldWidth = width / imgSide;
  fieldHeight = height / imgSide;
  defineRule();
  if (startIsRandom) {
    createRandomStartLine();
  } else {
    createCenteredStartLine();
  }
  createAutomat();
  drawAutomat();
}

function reset() {
  background(220);

  automat = [];
  rule = [];
}

function readInputs() {
  binary = Number(ruleInput.value);
  imgSide = Number(sideInput.value);
  startIsRandom = startInput.checked;
}
function defineRule() {
  if (binary >= 0 && binary <= 255) {
    binary = binary.toString(2);
    for (let index = 0; index < 8 - binary.length; index++) {
      rule.push(0);
    }
    for (let i = 0; i < binary.length; i++) {
      const digit = binary[i];
      rule.push(Number(digit));
    }
  }
}

function createCenteredStartLine() {
  startLine = [];
  for (let i = 0; i < imgSide; i++) {
    if (!(i == Math.floor(imgSide / 2))) {
      startLine.push(0);
    } else {
      startLine.push(1);
    }
  }
}

function createRandomStartLine() {
  startLine = [];
  for (let i = 0; i < imgSide; i++) {
    startLine.push(Math.round(random()));
  }
}

function drawAutomat() {
  for (let i = 0; i < automat.length; i++) {
    const line = automat[i];
    let yOffset = i * fieldHeight;
    for (let j = 0; j < line.length; j++) {
      const field = line[j];
      xOffset = j * fieldWidth;
      if (field === 1) {
        fill(0);
      } else {
        fill(255);
      }
      rect(xOffset, yOffset, fieldWidth, fieldHeight);
    }
  }
}

function createAutomat() {
  automat.push(startLine);
  for (let i = 0; i < imgSide; i++) {
    let currentLine = automat[i];
    let nextLine = [];
    for (let j = 0; j < currentLine.length; j++) {
      let affectors = getAffectors(currentLine, j);
      nextLine[j] = resolveAffectorsToRule(affectors);
    }
    automat.push(nextLine);
  }
}

function getAffectors(line, i) {
  let affectors = [];
  // top left affector
  if (i - 1 < 0) {
    affectors.push(line[line.length - 1]);
  } else {
    affectors.push(line[i - 1]);
  }
  // top affector
  affectors.push(line[i]);

  // top right affector
  if (i + 1 >= line.length) {
    affectors.push(line[0]);
  } else {
    affectors.push(line[i + 1]);
  }
  return affectors;
}

function resolveAffectorsToRule(affectors) {
  switch (affectors.toString()) {
    case "1,1,1":
      return rule[0];

    case "1,1,0":
      return rule[1];

    case "1,0,1":
      return rule[2];

    case "1,0,0":
      return rule[3];

    case "0,1,1":
      return rule[4];

    case "0,1,0":
      return rule[5];

    case "0,0,1":
      return rule[6];

    case "0,0,0":
      return rule[7];

    default:
      break;
  }
}
