import { useEffect, useState } from 'react';

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
    }
    return () => clearInterval(interval);
  }, [isActive, counter]);

  return <div>{counter}</div>;
};
