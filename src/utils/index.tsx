export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const MINES_TOTAL = 40;
const COLS = 16;
const ROWS = 16;

export const generateGame = (rowStart: number, colStart: number) => {
  const game = [];
  while (game.length < ROWS) {
    game.push(new Array(COLS).fill(0));
  }

  let mines = 0;
  while (mines <= MINES_TOTAL) {
    //generate col(c) and row(r) indexes
    const c = randomIntFromInterval(0, COLS - 1);
    const r = randomIntFromInterval(0, ROWS - 1);

    if (game[r][c] !== 'X' && r !== rowStart && c !== colStart) {
      game[r][c] = 'X';
      mines++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (game[r][c] !== 'X') {
        let i = 0;
        const cols = COLS - 1;
        const rows = ROWS - 1;
        if (r > 0) {
          if (game[r - 1][c] === 'X') i++;
          if (c < cols && game[r - 1][c + 1] === 'X') i++;
          if (c > 0 && game[r - 1][c - 1] === 'X') i++;
        }
        if (r < rows) {
          if (game[r + 1][c] === 'X') i++;
          if (c < cols && game[r + 1][c + 1] === 'X') i++;
          if (c > 0 && game[r + 1][c - 1] === 'X') i++;
        }
        if (c < cols && game[r][c + 1] === 'X') i++;
        if (c > 0 && game[r][c - 1] === 'X') i++;

        game[r][c] = i;
      }
    }
  }
  return game;
};
