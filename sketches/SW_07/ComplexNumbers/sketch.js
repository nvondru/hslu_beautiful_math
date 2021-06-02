function setup() {
  let number1 = new ComplexNumber(10, 5);
  let number2 = new ComplexNumber(15, 20);

  number1.add(number2);
  number1.subtract(number2);
  number1.multiply(number2);
}

class ComplexNumber {
  constructor(a, ib) {
    this.a = a;
    this.ib = ib;
  }

  add(summand) {
    let result = new ComplexNumber(this.a + summand.a, this.ib + summand.ib);
    console.log(result);
    return result;
  }

  subtract(subtrahend) {
    let result = new ComplexNumber(
      this.a - subtrahend.a,
      this.ib - subtrahend.ib
    );
    console.log(result);
    return result;
  }

  multiply(factor) {
    let result = new ComplexNumber(
      this.a * factor.a - this.ib * factor.ib,
      this.a * factor.ib + factor.a * this.ib
    );
    console.log(result);
    return result;
  }
}
