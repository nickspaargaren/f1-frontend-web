import { ReactElement } from 'react';

import useCircuits from '@/hooks/useCircuits';

import CircuitItem from './CircuitItem';

const CircuitList = (): ReactElement => {
  const circuits = useCircuits('https://f1.racetijden.nl/api/circuits');

  if (circuits.error) {
    return (
      <>{circuits.error}</>
    );
  }

  if (circuits.loading) {
    return (
      <>
        {[...Array(10)].map((index) => <CircuitItem key={index} loading />)}
      </>
    );
  }

  return (
    <>
      {circuits.data.circuits
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => (
          <CircuitItem key={item._id} item={item} />
        ))}
    </>
  );
};

export default CircuitList;
