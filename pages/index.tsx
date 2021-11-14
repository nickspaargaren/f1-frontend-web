import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import Header from '@/components/header';

import { Circuit } from '../types';

export type Response = {
  data: Circuit[]
}

const Home: NextPage<Response> = ({ data }: Response): ReactElement => (
  <>
    <Head>
      <title>F1 web</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header title="F1 stats" />

    <main>
      {data
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
    </main>
  </>
);
Home.getInitialProps = () => axios.get('https://f1-api.vercel.app/api/circuits', {
  params: {
    apikey: process.env.API_KEY,
  },
}).then((response) => response.data);

export default Home;
