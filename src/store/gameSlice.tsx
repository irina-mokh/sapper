import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../types';
import { COLS, generateData, generateEmptyBoard, MINES_TOTAL, ROWS } from '../utils';

export interface GameState {
  board: IBoard;
  mines: number;
  rest: number;
  res: string;
  isActive: boolean;
  start: {
    row: number,
    col: number,
  };
}

const initialState: GameState = {
  board: generateEmptyBoard(),
  mines: MINES_TOTAL,
  rest: COLS * ROWS,
  res: '',
  isActive: false,
  start: {
    row: 0,
    col: 0,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetBoard: () => initialState,
    setBoard: (state, { payload }) => {
      state.board = payload;
    },
    openBoardCell: (state, { payload }) => {
      const { row, col } = payload;
      state.board[row][col].open = true;
      state.rest -= 1;
    },
    runGame: (state, { payload: { row, col } }) => {
      state.isActive = true;
      state.start = { row, col };
      state.board = generateData(row, col);
    },
    stopGame: (state) => {
      state.isActive = false;
    },
    incrementMines: (state) => {
      state.mines += 1;
    },
    decrementMines: (state) => {
      state.mines -= 1;
    },
    decrementRest: (state) => {
      state.rest -= 1;
    },
    incrementRest: (state) => {
      state.rest += 1;
    },
    setRes: (state, { payload }) => {
      state.res = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  resetBoard,
  setBoard,
  openBoardCell,
  incrementMines,
  decrementMines,
  incrementRest,
  decrementRest,
  runGame,
  stopGame,
  setRes,
  // check,
} = gameSlice.actions;

export default gameSlice.reducer;
