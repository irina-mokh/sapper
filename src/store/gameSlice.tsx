import { createSlice } from '@reduxjs/toolkit';
import { IBoard } from '../types';
import { generateData, generateEmptyBoard, MINES_TOTAL } from '../utils';

export interface GameState {
  board: IBoard;
  mines: number;
  res: string;
  isActive: boolean;
  start: {
    row: number,
    col: number,
  };
  fail: {
    row: number,
    col: number,
  };
  isDanger: boolean;
}

const initialState: GameState = {
  board: generateEmptyBoard(),
  mines: MINES_TOTAL,
  res: '',
  isActive: false,
  start: {
    row: 0,
    col: 0,
  },
  fail: {
    row: 0,
    col: 0,
  },
  isDanger: false,
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
    },
    runGame: (state, { payload: { row, col } }) => {
      state.isActive = true;
      state.res = '';
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
    setRes: (state, { payload }) => {
      state.res = payload;
    },
    setDanger: (state, { payload }) => {
      state.isDanger = payload;
    },
    setFailPosition: (state, { payload }) => {
      state.fail = payload;
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
  runGame,
  stopGame,
  setRes,
  setDanger,
  setFailPosition,
} = gameSlice.actions;

export default gameSlice.reducer;
