import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [circuits, setCircuits] = useState<{
      data: any;
      loading: boolean;
      error: string | null;
    }>({
      data: null,
      loading: true,
      error: null,
    });

  useEffect(() => {
    const LoadData = async () => {
      try {
        const res = await axios.get(
          'https://f1-api.vercel.app/api/circuits',
        );

        const { data } = res;

        setCircuits({ data, loading: false, error: null });
      } catch (err) {
        setCircuits({ data: null, loading: false, error: err.message });
      }
    };

    LoadData();
  }, []);

  console.log(circuits);

  if (circuits.error) {
    return circuits.error;
  }

  if (circuits.loading) {
    return <>Laden...</>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>F1 web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>F1 stats</h1>

        {circuits.data.data.map((item) => (
          <div><Link href={`/circuits/${item.name}`}><a>{item.name}</a></Link></div>
        ))}

      </main>

    </div>
  );
};

export default Home;
