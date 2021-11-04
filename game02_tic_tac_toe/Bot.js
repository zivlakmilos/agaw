class Bot {
  constructor() {
  }

  getBestMove(board) {
    this.board = Object.assign(Object.create(Object.getPrototypeOf(board)), board);

    let bestMove = {
      score: -100,
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board.botMakeMove(i, j, FIELD_O)) {
          const move = this.minimax(i, j, FIELD_O);
          if (move.score >= bestMove.score) {
            bestMove = {
              row: i,
              col: j,
              score: move.score,
            }
          }

          this.board.makeFieldFree(i, j);
        }
      }
    }

    return bestMove;
  }

  minimax(row, col, player) {
    if (this.board.checkForWin(row, col, player)) {
      return {
        row: row,
        col: col,
        score: player === FIELD_O ? 1 : -1,
      }
    }

    if (!this.isNextMoveExists()) {
      return {
        row: row,
        col: col,
        score: 0,
      }
    }

    if (player === FIELD_O) {
      let move = { score: 100 }

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board.botMakeMove(i, j, FIELD_X)) {
            const newMove = this.minimax(i, j, FIELD_X);
            if (newMove.score <= move.score) {
              move = {
                row: i,
                column: j,
                score: newMove.score,
              }
            }
            this.board.makeFieldFree(i, j);
          }
        }
      }

      return move;
    } else {
      let move = { score: -100 }

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (this.board.botMakeMove(i, j, FIELD_O)) {
            const newMove = this.minimax(i, j, FIELD_O);
            if (newMove.score >= move.score) {
              move = {
                row: i,
                column: j,
                score: newMove.score,
              }
            }
            this.board.makeFieldFree(i, j);
          }
        }
      }

      return move;
    }
  }

  isNextMoveExists() {
    let moveExists = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board.botMakeMove(i, j, FIELD_FREE)) {
          moveExists = true;
          this.board.makeFieldFree(i, j);
          if (moveExists) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
