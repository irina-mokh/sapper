import { useState } from 'react';
import { generateGame } from '../../utils';

type GameProps = {
  // startTimer: () => void,
};

export const Game = (props: GameProps) => {
  const [game, setGame] = useState(new Array(16).fill(new Array(16).fill(0)));

  const handleStart = (r: number, c: number) => {
    setGame(generateGame(r, c));
    // props.startTimer();
  };

  const rows = game.map((row, r) => {
    const cells = row.map((cell: Array<string | number>, c: number) => (
      <li
        key={c}
        className="cell"
        onClick={() => {
          handleStart(r, c);
        }}
      >
        {cell}
      </li>
    ));
    return (
      <ul key={r} className="row">
        {cells}
      </ul>
    );
  });
  return <main>{rows}</main>;
};
