import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';

import Header from '../components/header';
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
      <table cellSpacing="0" cellPadding="0" style={{ textAlign: 'left' }}>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <Link href={`/circuits/${item.name}`}>
                  <a>
                    {item.name}
                    <br />
                    <small>{item.description}</small>
                  </a>
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  </>
);
Home.getInitialProps = async () => {
  const res = await fetch('https://f1-api.vercel.app/api/circuits');
  const data = await res.json();

  return data;
};

export default Home;
