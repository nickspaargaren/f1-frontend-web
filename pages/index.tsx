import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import LatestTimeUpdate from '@/components/LatestTimeUpdate';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Winner from '@/components/Winner';
import useCircuits from '@/hooks/useCircuits';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const Home: NextPage = (): ReactElement => {
  const circuits = useCircuits('https://f1-api.vercel.app/api/circuits');
  const latestTime = useCircuits('https://f1-api.vercel.app/api/times/latest');

  if (circuits.error || latestTime.error) {
    return (
      <Layout title="F1 stats" description="Circuits">
        {circuits.error}
      </Layout>
    );
  }

  if (circuits.loading || latestTime.loading) {
    return (
      <Layout title="F1 stats" description="Circuits">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout title="F1 stats" description="Circuits">
      <LatestTimeUpdate circuit={latestTime.data.times[0].circuit} gamertag={latestTime.data.times[0].gamertag} time={latestTime.data.times[0].time} creationDate={dayjs(latestTime.data.times[0].creationDate).fromNow()} />
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
    </Layout>
  );
};

export default Home;
