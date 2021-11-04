class Game {
  constructor() {
    this.board = new Board();
    this.bot = new Bot();
  }

  setup() {
    this.board.setup();
  }

  draw() {
    this.board.draw();
  }

  mousePressed() {
    const playerMove = this.board.makeMove(mouseX, mouseY);
    if (playerMove)
    {
      if (this.board.checkForWin(playerMove.x, playerMove.y, FIELD_X)) {
        this.playAgain('You win!');
      }

      if (this.board.isFinished()) {
        this.playAgain('Draw!');
        return;
      }

      const move = this.bot.getBestMove(this.board);
      this.board.botMakeMove(move.row, move.col, FIELD_O);

      if (this.board.checkForWin(move.row, move.col, FIELD_O)) {
        this.playAgain('AI win!');
      }
    }
  }

  playAgain(msg) {
    const again = confirm(msg + ' Do you want to play again?');
    if (again) {
      this.board = new Board();
      this.board.setup();
    }
  }
}
