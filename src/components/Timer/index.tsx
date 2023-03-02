import { useEffect, useState } from 'react';
import { Counter } from '../Counter';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type TimerProps = {
  isActive: boolean,
};
export const Timer = ({ isActive }: TimerProps) => {
  const [counter, setCounter] = useState(0);
  const { res } = useSelector((state: RootState) => state.game);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isActive) {
      interval = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 1000);
    } else {
      if (!res) {
        setCounter(0);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, counter, res]);

  return <Counter n={counter} />;
};
