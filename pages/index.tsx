import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import useCircuits from '@/hooks/useCircuits';

import { Circuit } from '../types';

export type Response = {
  data: Circuit[]
}

const Home: NextPage = (): ReactElement => {
  const circuits = useCircuits();

  if (circuits.error) {
    return <Layout title="Circuits error" description="Circuits error">{circuits.error}</Layout>;
  }

  if (circuits.loading) {
    return <Layout title="Circuits laden.." description="Circuits laden..">Circuits laden...</Layout>;
  }

  return (
    <Layout title="bal" description="bla">
      {circuits.data
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((item) => (
          <div key={item._id} className="circuit">
            <Link href={`/circuits/${item.name}`}>
              <a>
                <div className="image">
                  {item.flag
                      && <Image src={`/images/flags/${item.flag}.png`} alt={item.flag} width={30} height={18} />}
                </div>
                <div>
                  {item.name}
                  <br />
                  <small>{item.description}</small>
                </div>
              </a>
            </Link>
          </div>
        ))}
    </Layout>
  );
};

export default Home;
