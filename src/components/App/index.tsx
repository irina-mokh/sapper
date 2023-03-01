import { RootState } from '../../store';
import { Board } from '../Board';
import { Timer } from '../Timer';
import { useSelector } from 'react-redux';
import { Button } from '../Button';

export const App = () => {
  const { isActive, mines } = useSelector((state: RootState) => state.game);
  return (
    <div className="app">
      <div className="game shadow">
        <header className="header shadow_inside">
          <div>{mines}</div>
          <Button></Button>
          <Timer isActive={isActive}></Timer>
        </header>
        <Board />
      </div>
    </div>
  );
};

export default App;
