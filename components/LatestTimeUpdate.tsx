import Link from 'next/link';
import styled from 'styled-components';

import TextLoader from '@/components/TextLoader';
import useCircuits from '@/hooks/useCircuits';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const StyledLatestTimeUpdate = styled.div`
  margin: 10px;
  padding: 10px;
  background: rgba(255,255,255,.05);
  border-radius: 3px;
  min-height: 56px;

  a {
    display: flex;
    gap: 10px;

    > div {flex: 1;}

    .vhr {
      flex: 0;
      border-right: 1px solid rgba(255,255,255,.1);
      border-left: 1px solid rgba(0,0,0,.2);
    }

    p {
      margin: 0;
    }
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
          <div>
            <p><TextLoader width="50px" height="14px" /></p>
            <p><small><TextLoader width="90px" height="14px" /></small></p>
          </div>
          <div className="vhr" />
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
          <div>
            <p>{latestTime.data.times[0].circuit}</p>
            <p><small>{latestTime.data.times[0].gamertag}</small></p>
          </div>
          <div className="vhr" />
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
