class StringRewriter {
  constructor(alphabet, axiom, rules) {
    this.alphabet = alphabet;
    this.axiom = axiom;
    this.rules = rules;
    // prettier-ignore
    this.state = [
        axiom
      ];
    this.levels = 0;
  }

  createGenerations(count) {
    for (let i = 0; i < count; i++) {
      this.createNextGeneration();
    }
    return this.state;
  }

  createNextGeneration() {
    let nextGeneration = "";
    for (let i = 0; i < this.getCurrentGeneration().length; i++) {
      const symbol = this.getCurrentGeneration()[i];

      if (this.alphabet.includes(symbol)) {
        nextGeneration += this.rules[symbol];
      } else {
        nextGeneration += symbol;
      }
    }
    this.state.push(nextGeneration);
    this.levels += 1;
    return this.state;
  }

  getCurrentGeneration() {
    return this.state[this.state.length - 1];
  }

  logState() {
    console.table(this.state);
  }
}
