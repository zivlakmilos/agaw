const game = new Game();
const menu = new Menu();

let isInMenu = true;

function onLevelSelected(level) {
  game.shuffle(level);
  isInMenu = false;
}

function preload() {
  game.preload();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  game.setup();
  menu.setup();

  menu.setOnLevelSelected(onLevelSelected);
}

function mousePressed() {
  if (isInMenu) {
    menu.mousePressed();
  } else {
    game.mousePressed();
  }
}

function draw() {
  background(52, 155, 235);
  if (isInMenu) {
    menu.draw();
  } else {
    game.draw();
  }
}
