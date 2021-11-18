import axios from 'axios';
import type { NextPage } from 'next';
import { ReactElement, useRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import Header from '@/components/Header';
import Layout from '@/components/Layout';

import { Circuit, Time } from '../../types';

export type Response = {
  success: boolean,
  data:{
    circuit: Circuit,
    times: Time[]
  }
}

const NewTimeForm = styled.div`
  background-color: #15151e;
  padding: 10px;

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    input {
      display: block;
      width: 100%;
      margin: 0 0 10px;
      line-height: normal;
      padding: 5px;
      border: 0;
      border-radius: 0;
      font-size: 16px;
    }
  }

  .button {
    background-color: #e30600;
    color: #fff;
    text-align: center;
    line-height: normal;
    padding: 5px;
    font-size: 16px;
  }

`;

const addNewTime = async (gamertag: string, circuit: string, time: string) => {
  await axios.post(`https://f1-api.vercel.app/api/times/${gamertag}?apikey=${process.env.API_KEY}&circuit=${circuit}&time=${time}`);
  window.location.reload();
};

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

  const [newTime, setNewTime] = useState({ gamertag: '', circuit: data.data.circuit.name, time: '' });

  const gamertagRef = useRef<any>(null);
  const timeRef = useRef<any>(null);

  return (
    <Layout title={data.data.circuit.name} description={data.data.circuit.description} winner={winner}>

      <main>
        <table cellSpacing="0" cellPadding="0" style={{ textAlign: 'left' }} className="times">
          <tbody>
            {sortedTimes.map((item) => (
              <tr key={item._id}>
                <td onClick={() => setNewTime({ ...newTime, gamertag: item.gamertag })}>{item.gamertag}</td>
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
      <NewTimeForm>
        <div className="grid">
          <input type="text" placeholder="Gamertag" ref={gamertagRef} value={newTime.gamertag} onChange={() => setNewTime({ ...newTime, gamertag: gamertagRef.current.value })} />
          <input type="hidden" ref={timeRef} />
          <NumberFormat format="##:##.###" mask="_" type="text" placeholder="Time" getInputRef={timeRef} onChange={() => setNewTime({ ...newTime, time: timeRef.current.value })} />
        </div>
        <div onClick={() => addNewTime(newTime.gamertag, newTime.circuit, newTime.time)} className="button">Add time</div>
      </NewTimeForm>
    </Layout>
  );
};

Circuit.getInitialProps = (ctx) => {
  const { circuit } = ctx.query;

  return axios.get(`https://f1-api.vercel.app/api/circuits/${circuit}?times=true`, {
    params: {
      apikey: process.env.API_KEY,
    },
  }).then((response) => response.data);
};

export default Circuit;
