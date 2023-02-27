import React, { useState } from 'react';
import { MINES_TOTAL } from '../../utils';
import { Game } from '../Game';
import { Timer } from '../Timer';

export const App = () => {
  const [isActive, setIsActive] = useState(false);
  const [mines, setMines] = useState(MINES_TOTAL);

  const decrementMines = () => {
    setMines((mines) => mines - 1);
  };

  return (
    <div className="app">
      <header className="header">
        <div>{mines}</div>
        <button>PLAY</button>
        <Timer isActive={isActive}></Timer>
      </header>
      <Game
        run={(boolean) => setIsActive(boolean)}
        isActive={isActive}
        decMines={decrementMines}
      ></Game>
    </div>
  );
};

export default App;
