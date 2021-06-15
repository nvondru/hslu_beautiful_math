function setup() {
  createCanvas(800, 800);
  colorMode(HSB);
  background(200, 0, 80);
  let quantity = defineJuliaQuantity(
    (cNumber) => {
      let result = cNumber.multiply(cNumber).subtract(new ComplexNumber(1, 0));
      return result;
    },
    200,
    -2,
    2,
    0.01,
    50
  );

  console.log(quantity);

  for (let i = 0; i < quantity.length; i++) {
    const value = quantity[i];
    let x = map(value.cNumber.a, -2, 2, 0, width);
    let y = map(value.cNumber.ib, -2, 2, height, 0);
    let brightness = map(value.iterationCount, 0, 200, 100, 0);
    stroke(200, 80, brightness);
    strokeWeight(4);
    point(x, y);
  }
}

class ComplexNumber {
  constructor(a, ib) {
    this.a = a;
    this.ib = ib;
  }

  add(summand) {
    let result = new ComplexNumber(this.a + summand.a, this.ib + summand.ib);
    // console.log(result);
    return result;
  }

  subtract(subtrahend) {
    let result = new ComplexNumber(
      this.a - subtrahend.a,
      this.ib - subtrahend.ib
    );
    // console.log(result);
    return result;
  }

  multiply(factor) {
    let result = new ComplexNumber(
      this.a * factor.a - this.ib * factor.ib,
      this.a * factor.ib + factor.a * this.ib
    );
    // console.log(result);
    return result;
  }

  getLength() {
    return Math.sqrt(Math.pow(this.a, 2) + Math.pow(this.ib, 2));
  }
}

function defineJuliaQuantity(
  checkFunction,
  iterations,
  lowerLimit,
  upperLimit,
  step,
  threshold
) {
  let values = [];
  for (let a = lowerLimit; a < upperLimit; a += step) {
    for (let ib = lowerLimit; ib < upperLimit; ib += step) {
      let cNumber = new ComplexNumber(a, ib);
      let iterationCount;
      for (let j = 0; j < iterations; j++) {
        iterationCount = j;
        cNumber = checkFunction(cNumber);
        if (cNumber.getLength() > threshold) {
          break;
        }
      }
      let value = {
        cNumber: new ComplexNumber(a, ib),
        iterationCount,
      };
      values.push(value);
    }
  }
  return values;
}
