function setup() {
  let juliaQuantity = defineJuliaQuantity(
    (value) => {
      return Math.pow(value, 2);
    },
    2000,
    -10,
    10,
    0.0001,
    1000
  );
  console.log(juliaQuantity);
}

function defineJuliaQuantity(
  definedFunction,
  iterations,
  lowerLimit,
  upperLimit,
  step,
  threshold
) {
  let partialElements = [];
  for (let i = lowerLimit; i < upperLimit; i += step) {
    let value = i;
    for (let j = 0; j < iterations; j++) {
      value = definedFunction(value);
    }
    if (value < threshold) {
      partialElements.push({ value: i, iterationResult: value });
    }
  }
  return {
    firstElement: partialElements[0],
    lastElement: partialElements[partialElements.length - 1],
    elements: partialElements,
  };
}
