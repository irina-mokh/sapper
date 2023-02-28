import { Cell } from '../Cell';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ICell } from '../../types';

export const Board = () => {
  const { board } = useSelector((state: RootState) => state.game);

  const rows = board.map((row, r) => {
    const cells = row.map((cell: ICell, c: number) => (
      <Cell key={`${r}-${c}`} cell={cell} c={c} r={r} />
    ));
    return (
      <ul key={r} className="row">
        {cells}
      </ul>
    );
  });
  return <main className="board">{rows}</main>;
};
