class Menu {
  startX = 100;
  startY = 100;
  callback = null;

  constructor() {
  }

  setup() {
    this.startX = windowWidth / 2 - 100;
    this.startY = 100;
  }

  setOnLevelSelected(callback) {
    this.callback = callback;
  }

  mousePressed() {
    if (mouseX >= this.startX && mouseX <= this.startX + 200 &&
        mouseY >= this.startY && mouseY <= this.startY + 50) {
      if (this.callback) {
        this.callback(10);
      }
    }

    if (mouseX >= this.startX && mouseX <= this.startX + 200 &&
        mouseY >= this.startY + 80 && mouseY <= this.startY + 130) {
      if (this.callback) {
        this.callback(100);
      }
    }
  }

  draw() {
    noFill();

    if (mouseX >= this.startX && mouseX <= this.startX + 200 &&
        mouseY >= this.startY && mouseY <= this.startY + 50) {
      stroke(200);
    } else {
      stroke(255);
    }

    rect(this.startX, this.startY, 200, 50);
    text('EASY', this.startX + 85, this.startY + 30);

    if (mouseX >= this.startX && mouseX <= this.startX + 200 &&
        mouseY >= this.startY + 80 && mouseY <= this.startY + 130) {
      stroke(200);
    } else {
      stroke(255);
    }

    rect(this.startX, this.startY + 80, 200, 50);
    text('HARD', this.startX + 85, this.startY + 110);
  }
}
