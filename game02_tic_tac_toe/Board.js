const FIELD_FREE    = ' ';
const FIELD_X       = 'X';
const FIELD_O       = 'O';

class Board {
  constructor() {
    this.fields = [];
  }

  setup() {
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        row[j] = FIELD_FREE;
      }
      this.fields.push(row);
    }

    this.boardSize = 500;
    this.boardX = windowWidth / 2 - this.boardSize / 2;
    this.boardY = 100;
    this.fieldSize = 500 / 3;
  }

  draw() {
    background(36, 34, 29);

    this.drawBoard();

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.fields[i][j] === FIELD_X) {
          this.drawX(i, j);
        } else if (this.fields[i][j] === FIELD_O) {
          this.drawO(i, j);
        }
      }
    }
  }

  makeMove(x, y) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const fieldX = this.boardX + this.fieldSize * j;
        const fieldY = this.boardY + this.fieldSize * i;

        if (x >= fieldX && x <= fieldX + this.fieldSize &&
            y >= fieldY && y <= fieldY + this.fieldSize) {
          if (this.fields[i][j] === FIELD_FREE) {
            this.fields[i][j] = FIELD_X;
            this.checkForWin(i, j, FIELD_X);

            return {
              x: i,
              y: j,
            }
          } else {
            return null;
          }
        }
      }
    }

    return null;
  }

  botMakeMove(row, col, player) {
    if (this.fields[row][col] === FIELD_FREE) {
        this.fields[row][col] = player;
        return true;
        //this.checkForWin(row, col, FIELD_O);
    }

    return false;
  }

  makeFieldFree(row, col) {
    this.fields[row][col] = FIELD_FREE;
  }

  checkForWin(row, col, player) {
    let countRow = 0;
    let countCol = 0;
    let countD1 = 0;
    let countD2 = 0;

    for (let i = 0; i < 3; i++) {
      if (this.fields[row][i] === player) {
        countRow++;
      }
      if (this.fields[i][col] === player) {
        countCol++;
      }
      if (this.fields[i][i] === player) {
        countD1++;
      }
      if (this.fields[i][2 - i] === player) {
        countD2++;
      }
    }

    if (countRow === 3 || countCol === 3 || countD1 === 3 || countD2 === 3) {
      return true;
    }

    return false;
  }

  isFinished() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.fields[i][j] === FIELD_FREE) {
          return false;
        }
      }
    }

    return true;
  }

  drawBoard() {
    stroke(166, 118, 0);
    noFill();
    rect(this.boardX, this.boardY, this.boardSize, this.boardSize);

    for (let i = 1; i < 3; i++) {
      const lineX = this.boardX + (this.boardSize / 3) * i;
      line(lineX, this.boardY + 10, lineX, this.boardY + this.boardSize - 10);
      const lineY = this.boardY + (this.boardSize / 3) * i;
      line(this.boardX + 10, lineY, this.boardX + this.boardSize - 10, lineY);
    }
  }

  drawX(row, col) {
    const x = this.boardX + this.fieldSize * col + (this.fieldSize / 2 - 50);
    const y = this.boardY + this.fieldSize * row + (this.fieldSize / 2 - 50);

    stroke(255, 0, 0);
    line(x, y, x + 100, y + 100);
    line(x, y + 100, x + 100, y);
  }

  drawO(row, col) {
    const x = this.boardX + this.fieldSize * col + (this.fieldSize / 2);
    const y = this.boardY + this.fieldSize * row + (this.fieldSize / 2);

    stroke(255, 0, 0);
    noFill();
    circle(x, y, 120)
  }
}
