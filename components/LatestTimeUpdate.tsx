import "dayjs/locale/nl";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { ReactElement } from "react";
import styled from "styled-components";

import TextLoader from "@/components/TextLoader";
import useCircuits from "@/hooks/useCircuits";

dayjs.locale("nl");

dayjs.extend(relativeTime);

const StyledLatestTimeUpdate = styled.div`
  margin: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  min-height: 56px;

  a {
    display: flex;
    gap: 10px;

    > div {
      flex: 1;
    }

    .vhr {
      flex: 0;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }

    p {
      margin: 0;
    }
  }
`;

const LatestTimeUpdate = (): ReactElement => {
  const latestTime = useCircuits("/api/times/latest");

  if (latestTime.error) {
    return <>{latestTime.error}</>;
  }

  if (latestTime.loading) {
    return (
      <StyledLatestTimeUpdate>
        <a>
          <div>
            <p>
              <TextLoader width="50px" height="14px" />
            </p>
            <p>
              <small>
                <TextLoader width="90px" height="14px" />
              </small>
            </p>
          </div>
          <div className="vhr" />
          <div>
            <p>
              <TextLoader width="50px" height="14px" />
            </p>
            <p>
              <small>
                <TextLoader width="90px" height="14px" />
              </small>
            </p>
          </div>
        </a>
      </StyledLatestTimeUpdate>
    );
  }

  return (
    <StyledLatestTimeUpdate>
      <Link href={`/circuits/${latestTime.data.times[0].circuit.name}`}>
        <a data-cy="latesttime">
          <div>
            <p>{latestTime.data.times[0].circuit.name}</p>
            <p>
              <small>{latestTime.data.times[0].gamertag}</small>
            </p>
          </div>
          <div className="vhr" />
          <div>
            <p>{latestTime.data.times[0].time}</p>
            <p>
              <small>
                {dayjs(latestTime.data.times[0].updatedAt).fromNow()}
              </small>
            </p>
          </div>
        </a>
      </Link>
    </StyledLatestTimeUpdate>
  );
};
export default LatestTimeUpdate;
