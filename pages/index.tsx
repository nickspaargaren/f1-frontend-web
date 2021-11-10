import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';

import styles from '../styles/Home.module.css';
import { Circuit } from '../types';

export type Response = {
  data: Circuit[]
}

const Home: NextPage<Response> = ({ data }: Response): ReactElement => (
  <div className={styles.container}>
    <Head>
      <title>F1 web</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>F1 stats</h1>

      {data.map((item) => (
        <div><Link href={`/circuits/${item.name}`}><a>{item.name}</a></Link></div>
      ))}

    </main>

  </div>
);
Home.getInitialProps = async () => {
  const res = await fetch('https://f1-api.vercel.app/api/circuits');
  const data = await res.json();

  return data;
};

export default Home;
