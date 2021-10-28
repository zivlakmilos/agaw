const BOARD_WIDTH = 4;
const BOARD_HEIGHT = 4;

class Game {
  img = null;
  tiles = [];
  tileWidth = 0;
  tileHeight = 0;
  startX = 0;
  startY = 0;
  time = 0;
  moves = 0;
  isFinished = false;
  isDisplayed = false;

  constructor() {
  }

  preload() {
    this.img = loadImage('img/cat.png');
  }

  setup() {
    this.tileWidth = Math.floor(this.img.width / BOARD_WIDTH);
    this.tileHeight = Math.floor(this.img.height / BOARD_HEIGHT);

    let index = 1;
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      const row = [];
      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (i === BOARD_WIDTH - 1 && j === BOARD_HEIGHT - 1) {
          row.push(null);
          continue;
        }

        const x = j * this.tileWidth;
        const y = i * this.tileHeight;
        const tmp = createImage(this.tileWidth, this.tileHeight);
        tmp.copy(this.img, x, y, this.tileWidth, this.tileHeight, 0, 0, this.tileWidth, this.tileHeight);
        row.push(new Tile(tmp, index));
        index++;
      }
      this.tiles.push(row);

      this.time = 0;
      this.moves = 0;
    }

    this.startX = Math.floor(windowWidth / 2 - this.img.height / 2);
    this.startY = 100;
  }

  moveTile(fromI, fromJ, toI, toJ) {
    this.tiles[toI][toJ] = this.tiles[fromI][fromJ];
    this.tiles[fromI][fromJ] = null;
  }

  canMove(i, j) {
    if (i < 0 || i >= BOARD_HEIGHT) {
      return false;
    }
    if (j < 0 || j >= BOARD_WIDTH) {
      return false;
    }

    return this.tiles[i][j] === null;
  }

  mousePressed() {
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      for (let j = 0; j < BOARD_WIDTH; j++) {
        const x = this.startX + j * (this.tileWidth + 2);
        const y = this.startY + i * (this.tileHeight + 2);

        const isOnTile = mouseX >= x && mouseX <= x + this.tileWidth &&
                         mouseY >= y && mouseY <= y + this.tileHeight && this.tiles[i][j];
        if (isOnTile) {
          if (this.canMove(i - 1, j)) {
            this.moveTile(i, j, i - 1, j);
            this.moves++;
          } else if (this.canMove(i + 1, j)) {
            this.moveTile(i, j, i + 1, j);
            this.moves++;
          } else if (this.canMove(i, j - 1)) {
            this.moveTile(i, j, i, j - 1);
            this.moves++;
          } else if (this.canMove(i, j + 1)) {
            this.moveTile(i, j, i, j + 1);
            this.moves++;
          }

          if (this.checkIsFinished()) {
            this.isFinished = true;
          }

          return;
        }
      }
    }
  }

  checkIsFinished() {
    let index = 1;
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (i === BOARD_HEIGHT - 1 && j === BOARD_WIDTH - 1) {
          return true;
        }
        if (!this.tiles[i][j]) {
          return false;
        }
        if (this.tiles[i][j].getNum() !== index) {
          return false;
        }
        index++;
      }
    }
  }

  makeRandomMove(i, j) {
    const moves = [];
    if (i > 0) moves.push([i - 1, j]);
    if (i < BOARD_HEIGHT - 1) moves.push([i + 1, j]);
    if (j > 0) moves.push([i, j - 1]);
    if (j < BOARD_WIDTH - 1) moves.push([i, j + 1]);

    const currentMove = moves[Math.floor(Math.random() * moves.length)];
    this.moveTile(currentMove[0], currentMove[1], i, j);
    return currentMove;
  }

  shuffle(level) {
    let blankI = BOARD_HEIGHT - 1;
    let blankJ = BOARD_WIDTH - 1;;
    for (let i = 0; i < level; i++) {
      const currentMove = this.makeRandomMove(blankI, blankJ);
      blankI = currentMove[0];
      blankJ = currentMove[1];
    }
  }

  draw() {
    fill(255);
    text('Time: ' + Math.floor(this.time / 1000), this.startX - 10, 50);
    text('Moves: ' + this.moves, this.startX + this.img.height - 100, 50);

    stroke(255);
    noFill();
    rect(this.startX - 10, this.startY - 10, this.img.width + 24, this.img.height + 24);
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      for (let j = 0; j < BOARD_WIDTH; j++) {
        if (!this.tiles[i][j]) {
          continue;
        }
        const x = this.startX + j * (this.tileWidth + 2);
        const y = this.startY + i * (this.tileHeight + 2);
        image(this.tiles[i][j].getImg(), x, y);
      }
    }

    if (!this.isFinished) {
      this.time += deltaTime;
    } else if (!this.isDisplayed) {
      alert('Time: ' + Math.floor((this.time / 1000)) + 's\nMoves: ' + this.moves);
      this.isDisplayed = true;
    }
  }
}
