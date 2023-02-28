import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  openBoardCell,
  decrementMines,
  decrementRest,
  incrementMines,
  incrementRest,
  runGame,
  setRes,
  stopGame,
} from '../../store/gameSlice';
import { ICell } from '../../types';

type CellProps = {
  cell: ICell,
  r: number,
  c: number,
};

export function Cell({ cell, c, r }: CellProps) {
  const dispatch = useDispatch();
  const { isActive, start, board } = useSelector((state: RootState) => state.game);

  const handleGameOver = () => {
    dispatch(stopGame());
    dispatch(setRes('fail'));
  };

  const openCell = () => {
    if (r == start.row && c === start.col) {
      console.log('first cell!');
    } else {
      checkForZero(r, c);
    }
  };

  const checkForZero = (r: number, c: number) => {
    if (!board[r][c].open) {
      dispatch(openBoardCell({ row: r, col: c }));
    }
  };
  useEffect(() => {
    if (isActive && board[r][c].val === 0) {
      if (r > 0) checkForZero(r - 1, c);
      if (r < 15) checkForZero(r + 1, c);
      if (c < 15) checkForZero(r, c + 1);
      if (c > 0) checkForZero(r, c - 1);
    }
  }, [cell.open]);

  const [mark, setMark] = useState('empty');

  const handleCellClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    if (!isActive) {
      dispatch(runGame({ row: r, col: c }));
      openCell();
    } else {
      if (cell.val === 'X') {
        handleGameOver();
      } else {
        openCell();
      }
    }
  };

  const handleMark = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    switch (mark) {
      case 'empty':
        setMark('flag');
        dispatch(decrementMines());
        dispatch(decrementRest());
        break;
      case 'flag':
        setMark('question');
        dispatch(incrementMines());
        dispatch(incrementRest());
        break;
      case 'question':
        setMark('empty');
    }
  };

  return (
    <li
      key={c}
      className={
        'cell ' +
        (mark === 'flag' ? 'cell_flag ' : '') +
        (mark === 'question' ? 'cell_question ' : '') +
        (!cell.open ? 'cell_hidden' : '')
      }
      onClick={handleCellClick}
      onContextMenu={handleMark}
    >
      {cell.val ? cell.val : ''}
    </li>
  );
}
