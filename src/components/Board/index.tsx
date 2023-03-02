import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store';
import { setRes } from '../../store/gameSlice';
import { MINES_TOTAL } from '../../utils';
import { ICell } from '../../types';
import { Cell } from '../Cell';

export const Board = () => {
  const { board, mines } = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mines === 0) {
      let counter = 0;
      board.forEach((row) => {
        row.forEach((cell) => {
          if (!cell.open) counter++;
        });
      });
      if (counter === MINES_TOTAL) {
        console.log('WIN!!!');
        dispatch(setRes('win'));
      }
    }
  }, [mines]);

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
  return <main className="board shadow_inside">{rows}</main>;
};
