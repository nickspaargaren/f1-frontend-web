import useCircuits from '@/hooks/useCircuits';

import CircuitItem from './CircuitItem';

const CircuitList = () => {
  const circuits = useCircuits('https://f1-api.vercel.app/api/circuits');

  if (circuits.error) {
    return (
      <>{circuits.error}</>
    );
  }

  if (circuits.loading) {
    return [...Array(10)].map(() => <CircuitItem loading />);
  }

  return (
    <>
      {circuits.data.circuits
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => (
          <CircuitItem item={item} />
        ))}
    </>
  );
};

export default CircuitList;
