import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import { ReactElement } from 'react';

import Header from '../../components/header';
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

  let winner = '';

  if (sortedTimes.length) {
    winner = sortedTimes[0].gamertag;
  }

  return (
    <>
      <Head>
        <title>F1 web</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title={data.data.circuit.name} winner={winner} />

      <main>
        <table cellSpacing="0" cellPadding="0" style={{ textAlign: 'left' }} className="times">
          <tbody>
            {sortedTimes.map((item) => (
              <tr key={item._id}>
                <td>{item.gamertag}</td>
                <td style={{
                  textAlign: 'right', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1.5px',
                }}
                >
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

    </>
  );
};

Circuit.getInitialProps = (ctx) => {
  const { circuit } = ctx.query;

  return axios.get(`https://f1-api.vercel.app/api/circuits/${circuit}?times=true`).then((response) => response.data);
};

export default Circuit;
