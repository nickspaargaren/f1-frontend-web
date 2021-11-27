import Image from 'next/image';
import Link from 'next/link';

import TextLoader from '@/components/TextLoader';
import { CircuitType } from '@/types';

import Winner from './Winner';

type CircuitItemType = {
  item?: CircuitType;
  loading?: boolean;
}

const CircuitItem = ({ item, loading }: CircuitItemType) => {
  if (loading || !item) {
    return (
      <div className="circuit">
        <a>
          <div className="image">
            <TextLoader width="30px" height="18px" />
          </div>
          <div className="title">
            <TextLoader width="90px" height="14px" />
            <small><TextLoader width="120px" height="14px" /></small>
          </div>
          <div className="winner">
            <TextLoader width="120px" height="14px" />
          </div>
        </a>

      </div>
    );
  }

  return (
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
  );
};

export default CircuitItem;
