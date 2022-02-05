import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

import TextLoader from '@/components/TextLoader';
import { CircuitType } from '@/types';

import SlideAnimation from './SlideAnimation';
import Winner from './Winner';

type CircuitItemType = {
  item?: CircuitType;
  loading?: boolean;
}

const StyledCircuitItem = styled.div`

  > a {
    padding: 10px 15px 10px 10px;
    line-height: 1;
    background: rgba(255,255,255,.05);
    display: flex;
    margin: 0 0 10px;
    border-radius: 3px;

    .image {display: flex; min-width: 30px; align-items: center; justify-content: center;}
    .image > span {border-radius: 1px;}
    .title {margin: auto 10px;}
    .winner {margin: auto 0 auto auto;}

  }

  @media screen and (min-width: 768px) {
    > a:hover {background: rgba(255,255,255,.075);}
  }

`;

const CircuitItem = ({ item, loading }: CircuitItemType): ReactElement => {
  if (loading || !item) {
    return (
      <StyledCircuitItem>
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
      </StyledCircuitItem>
    );
  }

  return (
    <SlideAnimation>
      <StyledCircuitItem>
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
      </StyledCircuitItem>
    </SlideAnimation>
  );
};

export default CircuitItem;
