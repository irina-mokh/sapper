import { generateNumClass } from '../../utils';

type CounterProps = {
  n: number,
};
export const Counter = ({ n }: CounterProps) => {
  const arr = n.toString().split('');
  while (arr.length < 3) arr.unshift('0');
  const nums = arr.map((num, i) => (
    <div key={`${i}-${num}`} className={generateNumClass('sprite num num_', Number(num))}></div>
  ));
  return <div className="counter">{nums}</div>;
};
