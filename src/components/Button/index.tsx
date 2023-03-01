import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { stopGame, resetBoard } from '../../store/gameSlice';

export const Button = () => {
  const { res, isDanger } = useSelector((state: RootState) => state.game);

  const dispatch = useDispatch();

  const resetGame = () => {
    dispatch(resetBoard());
    dispatch(stopGame());
  };

  const [isDown, setIsDown] = useState(false);

  const toggleDown = () => {
    setIsDown(!isDown);
  };
  const buttonClass = () => {
    let classes = `btn sprite ${isDown ? 'btn_down' : ''}`;
    switch (res) {
      case 'fail':
        classes += ' btn_fail';
        break;
      case 'win':
        classes += ' btn_win';
        break;
    }
    if (isDanger) classes += ' btn_danger';
    return classes;
  };

  return (
    <button
      onClick={resetGame}
      className={buttonClass()}
      onMouseDown={toggleDown}
      onMouseUp={toggleDown}
    ></button>
  );
};
