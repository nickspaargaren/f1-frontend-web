import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';

import styles from '../../styles/Home.module.css';
import { Circuit, Time } from '../../types';

export type Response = {
  success: boolean,
  data:{
    circuit: Circuit,
    times: Time[]
  }
}

const Circuit: NextPage<Response> = (data): ReactElement => {
  const sortedTimes = data.data.times.sort((a, b) => {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    return 0;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>F1 web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{data.data.circuit.name}</h1>
        <table style={{ textAlign: 'left' }}>
          <tbody>

            {sortedTimes.map((item) => (
              <tr key={item._id}>
                <td>{item.gamertag}</td>
                <td style={{ textAlign: 'right' }}>{item.time}</td>
              </tr>
            ))}

          </tbody>
        </table>
        <Link href="/">Back</Link>
      </main>

    </div>
  );
};

Circuit.getInitialProps = async (ctx) => {
  const { circuit } = ctx.query;

  const res = await fetch(`https://f1-api.vercel.app/api/circuits/${circuit}?times=true`);
  const data = await res.json();
  return data;
};

export default Circuit;
