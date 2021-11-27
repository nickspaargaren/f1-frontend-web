import Link from 'next/link';
import { ImStopwatch } from 'react-icons/im';
import styled from 'styled-components';

type LatestTimeUpdateType = {
    circuit: string,
    gamertag: string,
    time: string,
    creationDate: string
}

const StyledLatestTimeUpdate = styled.div`
  margin: 10px;
  padding: 10px;
  background: #f3f3f3;
  border-radius: 3px;

  a {
    display: flex;
    gap: 10px;


    .title {
      display: flex;
      margin: auto auto auto 0;

      .icon {
        margin: auto 6px auto auto;
        line-height: 0;
      }
    }

    p {
      margin: 0;
    }
  }


  @media (prefers-color-scheme: dark) {
    background: rgba(255,255,255,.05);
  }

`;

const LatestTimeUpdate = ({
  circuit, gamertag, time, creationDate,
}: LatestTimeUpdateType) => (
  <StyledLatestTimeUpdate>
    <Link href={`/circuits/${circuit}`}>
      <a>
        <div className="title">
          <div className="icon"><ImStopwatch /></div>
          Latest time set
        </div>
        <div>
          <p>{circuit}</p>
          <p><small>{gamertag}</small></p>
        </div>
        <div>
          <p>{time}</p>
          <p><small>{creationDate}</small></p>
        </div>

      </a>
    </Link>
  </StyledLatestTimeUpdate>
);
export default LatestTimeUpdate;
