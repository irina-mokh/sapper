import React, { useState } from 'react';
import { MINES_TOTAL } from '../../utils';
import { Board } from '../Board';
import { Timer } from '../Timer';
import { generateEmptyBoard } from '../../utils';

export const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [mines, setMines] = useState(MINES_TOTAL);
  const minesController = {
    amount: mines,
    inc: () => setMines((mines) => mines + 1),
    dec: () => setMines((mines) => mines - 1),
  };
  const [board, setBoard] = useState(generateEmptyBoard());
  const [res, setRes] = useState('');

  const run = (isActive: boolean) => {
    setIsActive(isActive);
  };

  const resetGame = () => {
    setBoard(generateEmptyBoard());
    setIsActive(false);
  };

  const buttonClass = () => {
    let classes = 'btn';
    switch (res) {
      case 'fail':
        classes += ' btn_fail';
        break;
      case 'win':
        classes += ' btn_win';
        break;
    }
    return classes;
  };

  return (
    <div className="app">
      <header className="header">
        <div>{mines}</div>
        <button onClick={resetGame} className={buttonClass()}>
          reset
        </button>
        <Timer isActive={isActive}></Timer>
      </header>
      <Board
        run={run}
        isActive={isActive}
        mines={minesController}
        board={board}
        setBoard={(board) => setBoard(board)}
        setRes={(res) => setRes(res)}
      ></Board>
    </div>
  );
};

export default App;
