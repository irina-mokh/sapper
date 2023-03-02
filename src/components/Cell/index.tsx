import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  openBoardCell,
  decrementMines,
  incrementMines,
  runGame,
  setRes,
  stopGame,
  setDanger,
  setFailPosition,
} from '../../store/gameSlice';
import { ICell } from '../../types';
import { generateNumClass } from '../../utils';

type CellProps = {
  cell: ICell,
  r: number,
  c: number,
};

export function Cell({ cell, c, r }: CellProps) {
  const dispatch = useDispatch();
  const { isActive, board, res, isDanger, fail } = useSelector((state: RootState) => state.game);

  const handleGameOver = () => {
    dispatch(stopGame());
    dispatch(setRes('fail'));
    dispatch(setFailPosition({ row: r, col: c }));
  };

  const openCell = () => {
    checkForZero(r, c);
  };

  const checkForZero = (r: number, c: number) => {
    if (!board[r][c].open) {
      dispatch(openBoardCell({ row: r, col: c }));
    }
  };
  useEffect(() => {
    if (isActive && board[r][c].val === 0 && board[r][c].open) {
      if (r > 0) checkForZero(r - 1, c);
      if (r < 15) checkForZero(r + 1, c);
      if (c < 15) checkForZero(r, c + 1);
      if (c > 0) checkForZero(r, c - 1);
    }
  }, [cell.open]);

  useEffect(() => {
    if (res === 'fail' && cell.val === 'X') {
      dispatch(openBoardCell({ row: r, col: c }));
    }
  }, [res]);

  const [mark, setMark] = useState('empty');

  // reset marks on restart
  useEffect(() => {
    if (!res) setMark('empty');
  }, [res, isActive]);

  const handleCellClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    if (!res) {
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
    }
  };

  const handleMark = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      e.preventDefault();
      if (isActive) {
        switch (mark) {
          case 'empty':
            setMark('flag');
            dispatch(decrementMines());
            break;
          case 'flag':
            setMark('question');
            dispatch(incrementMines());
            break;
          case 'question':
            setMark('empty');
        }
      }
    },
    [mark, isActive]
  );

  const [classByVal, setClass] = useState('');
  //change classNames by value generated
  useEffect(() => {
    let newClass = '';

    if (typeof cell.val === 'number') {
      newClass += generateNumClass('cell_', cell.val);
    } else {
      if (res === 'fail' && cell.val === 'X') {
        if (r === fail.row && c === fail.col) {
          newClass += 'cell_explode ';
        } else {
          newClass += 'cell_bomb ';
        }
      }
    }
    setClass(newClass);
  }, [cell.val, res]);

  const toggleDanger = (e: React.MouseEvent) => {
    if (e.nativeEvent.which === 1) {
      dispatch(setDanger(!isDanger));
    }
  };

  return (
    <li
      key={c}
      className="cell"
      onClick={handleCellClick}
      onContextMenu={handleMark}
      onMouseDown={toggleDanger}
      onMouseUp={toggleDanger}
    >
      {!cell.open && (
        <p
          className={
            'cell__up sprite cell_hidden ' +
            (mark === 'flag' ? 'cell_flag ' : '') +
            (res === 'fail' && mark === 'flag' ? 'cell_mistake ' : '') +
            (mark === 'question' ? 'cell_question ' : '')
          }
        ></p>
      )}
      <p className={'cell__down sprite ' + classByVal}></p>
    </li>
  );
}
