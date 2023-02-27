import { useState } from 'react';
import { generateEmptyBoard, generateGame } from '../../utils';

type GameProps = {
  isActive: boolean,
  run: (arg: boolean) => void,
  decMines: () => void,
};

export const Game = ({ run, decMines, isActive }: GameProps) => {
  const [game, setGame] = useState(generateEmptyBoard());
  const [answer, setAnswer] = useState(generateEmptyBoard());

  // const resetGame = () => {
  //   setGame(generateEmptyBoard());
  // };

  // const checkResult = () => {
  //   console.log('checking...');
  //   console.log(JSON.stringify(answer) === JSON.stringify(game));
  // };

  const handleStart = (r: number, c: number) => {
    run(true);
    setGame(generateGame(r, c));
  };

  const handleClick = (r: number, c: number) => {
    if (!isActive) {
      handleStart(r, c);
    }
    setAnswer((prev) => {
      const ans = [...prev];
      ans[r][c] = 'X';
      return ans;
    });
  };

  const rows = game.map((row, r) => {
    const cells = row.map((cell: string | number, c: number) => {
      const [mark, setMark] = useState('');
      const [hidden, setHidden] = useState(true);
      if (!isActive && cell === 'X') setHidden(false);
      return (
        <li
          key={c}
          className={
            'cell ' + (mark === 'flag' ? 'cell_flag ' : '') + (hidden ? 'cell_hidden' : '')
          }
          onClick={(e) => {
            e.preventDefault();
            setHidden(false);
            if (cell === 'X') {
              console.log('GAME OVER =(');
              // run(false);
              // TODO
            }
            handleClick(r, c);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            if (mark !== 'flag') {
              setMark('flag');
              decMines();
            } else {
              setMark('question');
            }
          }}
        >
          {cell}
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
