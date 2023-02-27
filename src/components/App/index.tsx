import React from 'react';
import { Game } from '../Game';

export const App = () => {
  return (
    <div className="app">
      <header className="app__header">{/* <div>{timer}</div> */}</header>
      <Game></Game>
    </div>
  );
};

export default App;
