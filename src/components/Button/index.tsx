import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { stopGame, resetBoard } from '../../store/gameSlice';

export const Button = () => {
  const { res } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(resetBoard());
    dispatch(stopGame());
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
    <button onClick={resetGame} className={buttonClass()}>
      reset
    </button>
  );
};
