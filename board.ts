const ROWS = 6;
const COLS = 7;
const CONNECT_N = 4;

export enum Player {
  Nobody = "_",
  PlayerX = "x",
  PlayerO = "o",
}

export class Board {
  private fields: Player[][];

  public constructor() {
    this.fields = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => Player.Nobody)
    );
  }

  public output() {
    let cols = "";
    for (let c = 0; c < this.fields[0].length; c++) {
      cols += `${c} `;
    }
    console.log(cols.trimEnd());
    for (let r = 0; r < this.fields.length; r++) {
      let row = "";
      for (let c = 0; c < this.fields[r].length; c++) {
        row += `${this.fields[r][c]} `;
      }
      console.log(row.trimEnd());
    }
  }

  public makeMove(player: Player, col: number): number {
    if (!Number.isInteger(col) || col < 0 || col >= COLS) return -1;
    for (let r = this.fields.length - 1; r >= 0; r--) {
      if (this.fields[r][col] == Player.Nobody) {
        this.fields[r][col] = player;
        return r;
      }
    }
    return -1;
  }

  public winner(player: Player, row: number, col: number): Player {
    if (row < 0 || col < 0 || col >= COLS || row >= ROWS) {
      return Player.Nobody;
    }
    if (this.horizontalWinner(player, row) != Player.Nobody) return player;
    if (this.verticalWinner(player, col) != Player.Nobody) return player;
    if (this.diagonalWinner(player, row, col) != Player.Nobody) return player;
    return Player.Nobody;
  }

  private horizontalWinner(player: Player, r: number): Player {
    const win = player.repeat(CONNECT_N);
    const row = this.fields[r].join("");
    return row.includes(win) ? player : Player.Nobody;
  }

  private verticalWinner(player: Player, c: number): Player {
    const win = player.repeat(CONNECT_N);
    const col = this.fields.map((row) => row[c]).join("");
    return col.includes(win) ? player : Player.Nobody;
  }

  private diagonalWinner(player: Player, r: number, c: number): Player {
    const [diagUp, diagDown] = this.getDiagonals(r, c);
    const win = player.repeat(CONNECT_N);
    return diagUp.includes(win) || diagDown.includes(win)
      ? player
      : Player.Nobody;
  }

  private getDiagonals(r: number, c: number): [string, string] {
    const rising: string[] = [];
    const falling: string[] = [];

    for (let i = r, j = c; i >= 0 && j < COLS; i--, j++) rising.push(this.fields[i][j]);
    for (let i = r, j = c; i < ROWS && j >= 0; i++, j--) rising.push(this.fields[i][j]);

    for (let i = r, j = c; i < ROWS && j < COLS; i++, j++) falling.push(this.fields[i][j]);
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) falling.push(this.fields[i][j]); // hier: fields[i][j]

    return [rising.join(""), falling.join("")];
  }
}