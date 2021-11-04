const game = new Game();

function mousePressed() {
  game.mousePressed();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  game.setup();
}

function draw() {
  game.draw();
}
