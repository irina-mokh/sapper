import { useEffect, useState } from 'react';
import { Counter } from '../Counter';

type TimerProps = {
  isActive: boolean,
};
export const Timer = ({ isActive }: TimerProps) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isActive) {
      interval = setInterval(() => {
        setCounter((counter) => counter + 1);
      }, 1000);
    } else {
      setCounter(0);
    }
    return () => clearInterval(interval);
  }, [isActive, counter]);

  return <Counter n={counter} />;
};
