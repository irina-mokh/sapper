import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { Board } from '../Board';
import { Timer } from '../Timer';
import { Button } from '../Button';
import { Counter } from '../Counter';
import { Footer } from '../Footer/Footer';

export const App = () => {
  const { isActive, mines } = useSelector((state: RootState) => state.game);
  return (
    <div className="app">
      <div className="game shadow">
        <header className="header shadow_inside">
          <Counter n={mines}></Counter>
          <Button></Button>
          <Timer isActive={isActive}></Timer>
        </header>
        <Board />
      </div>
      <Footer />
    </div>
  );
};

export default App;
