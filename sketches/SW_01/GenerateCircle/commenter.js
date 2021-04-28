let comment = "";

function displayComment(width, height) {
  push();
  textSize(20);
  textAlign(CENTER);
  fill(0, 255, 0);
  noStroke();
  text(comment, -width / 2, -(height / 2 - 50), width);
  pop();
}

function keyTyped(event) {
  if (event.key === "Enter") {
    saveCanvas(canvas, comment.slice(0, 21), "png");
  } else {
    comment += event.key;
  }
}

function keyPressed(event) {
  let key = event.key;
  if (key === "Backspace") {
    comment = comment.slice(0, comment.length - 1);
  } else if (key === "Delete") {
    comment = "";
  }
}
