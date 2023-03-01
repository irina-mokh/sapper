import { ICell } from '../types';
export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const MINES_TOTAL = 40;
export const COLS = 16;
export const ROWS = 16;

export const generateEmptyBoard = () => {
  const board = [];
  while (board.length < ROWS) {
    const row = [];
    while (row.length < COLS) {
      const cell: ICell = { val: 0, open: false };

      row.push(cell);
    }
    board.push(row);
  }

  return board;
};
export const generateData = (rowStart: number, colStart: number) => {
  const board = [...generateEmptyBoard()];
  let mines = 0;
  while (mines < MINES_TOTAL) {
    //generate col(c) and row(r) indexes
    const c = randomIntFromInterval(0, COLS - 1);
    const r = randomIntFromInterval(0, ROWS - 1);

    if (board[r][c].val !== 'X' && r !== rowStart && c !== colStart) {
      board[r][c].val = 'X';
      mines++;
    }
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].val !== 'X') {
        let i = 0;
        const cols = COLS - 1;
        const rows = ROWS - 1;
        if (r > 0) {
          if (board[r - 1][c].val === 'X') i++;
          if (c < cols && board[r - 1][c + 1].val === 'X') i++;
          if (c > 0 && board[r - 1][c - 1].val === 'X') i++;
        }
        if (r < rows) {
          if (board[r + 1][c].val === 'X') i++;
          if (c < cols && board[r + 1][c + 1].val === 'X') i++;
          if (c > 0 && board[r + 1][c - 1].val === 'X') i++;
        }
        if (c < cols && board[r][c + 1].val === 'X') i++;
        if (c > 0 && board[r][c - 1].val === 'X') i++;

        board[r][c].val = i;
      }
    }
  }
  // board[rowStart][colStart].open = true;
  return board;
};

type INums = {
  [key: number]: string,
};
const NUMS: INums = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
};

export const generateNumClass = (text: string, n: number) => {
  return text + NUMS[n];
};
