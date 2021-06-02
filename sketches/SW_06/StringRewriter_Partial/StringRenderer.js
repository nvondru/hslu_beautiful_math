class StringRenderer {
  constructor(angleStep, stepWidth) {
    this.angleStep = angleStep;
    this.stepWidth = stepWidth;

    this.startPosition = {
      x: 0,
      y: 0,
    };
    this.currentPosition = this.startPosition;
    this.currentRotation = 90;
    this.stack = [];

    this.interpreter = {
      F: () => {
        let newPosition = this.calculateNewPosition();
        line(
          this.currentPosition.x,
          this.currentPosition.y,
          newPosition.x,
          newPosition.y
        );
        this.currentPosition.x = newPosition.x;
        this.currentPosition.y = newPosition.y;
      },
      "+": () => {
        this.currentRotation += this.angleStep;
      },
      "-": () => {
        this.currentRotation -= this.angleStep;
      },
      "[": () => {
        this.stack.push({
          position: {
            x: this.currentPosition.x,
            y: this.currentPosition.y,
          },
          rotation: this.currentRotation,
          stepWidth: this.stepWidth,
        });
      },
      "]": () => {
        let cache = this.stack.pop();
        this.currentPosition = {
          x: cache.position.x,
          y: cache.position.y,
        };
        this.currentRotation = cache.rotation;
        this.stepWidth = cache.stepWidth;
      },
      "|": () => {
        this.stepWidth *= 0.5;
        let newPosition = this.calculateNewPosition();
        line(
          this.currentPosition.x,
          this.currentPosition.y,
          newPosition.x,
          newPosition.y
        );
        this.currentPosition.x = newPosition.x;
        this.currentPosition.y = newPosition.y;
      },
    };
  }

  interpretState(state) {
    this.interpreter["["]();
    for (let i = 0; i < state[state.length - 1].length; i++) {
      const symbol = state[state.length - 1][i];
      this.interpreter[symbol]();
    }
    this.interpreter["]"]();
  }

  calculateNewPosition() {
    let distX = cos(this.currentRotation) * this.stepWidth;
    let distY = sin(this.currentRotation) * this.stepWidth;
    let newPos = {
      x: this.currentPosition.x + distX,
      y: this.currentPosition.y - distY,
    };
    return newPos;
  }
}
