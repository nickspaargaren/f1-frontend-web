import Image from 'next/image';
import Link from 'next/link';

import useCircuits from '@/hooks/useCircuits';

import Loading from './Loading';
import Winner from './Winner';

const CircuitList = () => {
  const circuits = useCircuits('https://f1-api.vercel.app/api/circuits');

  if (circuits.error) {
    return (
      <>{circuits.error}</>
    );
  }

  if (circuits.loading) {
    return (
      <Loading />
    );
  }
  return (
    <>
      {circuits.data.circuits
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => (
          <div key={item._id} className="circuit">
            <Link href={`/circuits/${item.name}`}>
              <a>
                <div className="image">
                  {item.flag
                    && <Image src={`/images/flags/${item.flag}.png`} alt={item.flag} width={30} height={18} />}
                </div>
                <div className="title">
                  {item.name}
                  <br />
                  <small>{item.description}</small>
                </div>
                <div className="winner">
                  {item.winner && (
                  <Winner title={item.winner} />
                  )}
                </div>
              </a>
            </Link>
          </div>
        ))}
    </>
  );
};

export default CircuitList;
