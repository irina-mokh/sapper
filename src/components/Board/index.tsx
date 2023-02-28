import React, { useEffect, useRef, useState } from 'react';
import { ROWS, COLS, generateData } from '../../utils';

export type ICell = { val: number | string, open: boolean };
type IBoard = Array<Array<ICell>>;
type BoardProps = {
  isActive: boolean,
  run: (arg: boolean) => void,
  mines: {
    amount: number,
    inc: () => void,
    dec: () => void,
  },
  board: IBoard,
  setBoard: (arg: IBoard) => void,
  setRes: (status: string) => void,
};

export const Board = ({ run, mines, isActive, board, setBoard, setRes }: BoardProps) => {
  const rest = useRef(COLS * ROWS);
  // start position
  const start = useRef<{ row: number | null, col: number | null }>({
    row: null,
    col: null,
  });
  const handleGameOver = () => {
    run(false);
    console.log('GAME OVER =(');
    setRes('fail');
  };

  const openCell = (r: number, c: number) => {
    const newBoard = [...board];
    newBoard[r][c].open = true;
    setBoard(newBoard);
    rest.current--;
  };

  const checkForZero = (r: number, c: number) => {
    if (!board[r][c].open) {
      openCell(r, c);
      if (board[r][c].val === 0) {
        if (r > 0) checkForZero(r - 1, c);
        if (r < 15) checkForZero(r + 1, c);
        if (c < 15) checkForZero(r, c + 1);
        if (c > 0) checkForZero(r, c - 1);
      }
    }
  };

  const rows = board.map((row, r) => {
    const cells = row.map((cell: ICell, c: number) => {
      const [mark, setMark] = useState('empty');

      //effect for checking first cell after render
      useEffect(() => {
        if (isActive && r === start.current.row && c === start.current.col) {
          checkForZero(r, c);
        }
      }, [isActive]);
      // useEffect(() => {
      //   console.log('rest:', rest.current);
      //   if (rest.current === 0) {
      //     setRes('win');
      //   }
      // }, [rest.current]);

      const handleCellClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();

        if (!isActive) {
          run(true);
          setBoard(generateData(r, c));
          start.current = { row: r, col: c };
        } else {
          if (cell.val === 'X') {
            handleGameOver();
          } else {
            checkForZero(r, c);
          }
        }
      };

      const handleMark = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        switch (mark) {
          case 'empty':
            setMark('flag');
            mines.dec();
            rest.current--;
            break;
          case 'flag':
            setMark('question');
            mines.inc();
            rest.current++;
            break;
          case 'question':
            setMark('empty');
        }
      };

      useEffect(() => {
        if (!isActive && cell.val === 'X') openCell(r, c);
      }, [isActive]);

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
    });
    return (
      <ul key={r} className="row">
        {cells}
      </ul>
    );
  });
  return <main className="board">{rows}</main>;
};
