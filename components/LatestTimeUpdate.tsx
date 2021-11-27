import Link from 'next/link';
import { ImStopwatch } from 'react-icons/im';
import styled from 'styled-components';

import TextLoader from '@/components/TextLoader';
import useCircuits from '@/hooks/useCircuits';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const StyledLatestTimeUpdate = styled.div`
  margin: 10px;
  padding: 10px;
  background: #f3f3f3;
  border-radius: 3px;
  min-height: 56px;

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

const LatestTimeUpdate = () => {
  const latestTime = useCircuits('https://f1-api.vercel.app/api/times/latest');

  if (latestTime.error) {
    return (
      <>{latestTime.error}</>
    );
  }

  if (latestTime.loading) {
    return (
      <StyledLatestTimeUpdate>
        <a>
          <div className="title">
            <div className="icon"><ImStopwatch /></div>
            <TextLoader width="120px" height="20px" />
          </div>
          <div>
            <p><TextLoader width="50px" height="14px" /></p>
            <p><small><TextLoader width="90px" height="14px" /></small></p>
          </div>
          <div>
            <p><TextLoader width="50px" height="14px" /></p>
            <p><small><TextLoader width="90px" height="14px" /></small></p>
          </div>
        </a>
      </StyledLatestTimeUpdate>
    );
  }

  return (
    <StyledLatestTimeUpdate>
      <Link href={`/circuits/${latestTime.data.times[0].circuit}`}>
        <a>
          <div className="title">
            <div className="icon"><ImStopwatch /></div>
            Latest time set
          </div>
          <div>
            <p>{latestTime.data.times[0].circuit}</p>
            <p><small>{latestTime.data.times[0].gamertag}</small></p>
          </div>
          <div>
            <p>{latestTime.data.times[0].time}</p>
            <p><small>{dayjs(latestTime.data.times[0].creationDate).fromNow()}</small></p>
          </div>
        </a>
      </Link>
    </StyledLatestTimeUpdate>
  );
};
export default LatestTimeUpdate;
