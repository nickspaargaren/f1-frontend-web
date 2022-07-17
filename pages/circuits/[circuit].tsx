import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import styled from "styled-components";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import useCircuits from "@/hooks/useCircuits";
import { getwinner } from "@/utils";

const TextButton = styled.button`
  border: 0;
  background: none;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  color: inherit;
`;

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
    display: block;
    width: 100%;
    outline: none;
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
  }
`;

type newtimeProps = {
  circuitId: number;
  time: string;
  gamertag: string;
};

const Circuit: NextPage = ({ circuit }: any): ReactElement => {
  const circuits = useCircuits(`/api/circuits/${circuit}?times=true`);

  const addNewTime = async (data: newtimeProps) => {
    if (
      data.gamertag !== "" &&
      data.time !== "99:99.999" &&
      !data.time.includes("_")
    ) {
      await axios.post(
        `/api/times/${data.gamertag}?apikey=${process.env.API_KEY}&time=${data.time}&circuitId=${data.circuitId}`
      );
      window.location.reload();
    } else {
      alert("Controleer je gamertag en tijd.");
    }
  };

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      circuitId: 0,
      time: "99:99.999",
      gamertag: "",
    },
  });

  if (circuits.error) {
    return (
      <Layout title="F1 stats" description="Circuits">
        {circuits.error}
      </Layout>
    );
  }

  if (circuits.loading) {
    return (
      <Layout title={circuit} description="Loading...">
        <Loading />
      </Layout>
    );
  }

  const [currentCircuit] = circuits.data.circuits;

  setValue("circuitId", currentCircuit.id);

  const winner = getwinner(currentCircuit.times);

  return (
    <Layout
      title={currentCircuit.name}
      description={currentCircuit.description}
      winner={winner}
    >
      <main>
        {winner ? (
          <table
            cellSpacing="0"
            cellPadding="0"
            style={{ textAlign: "left" }}
            className="times"
          >
            <tbody>
              {currentCircuit.times.map((item) => (
                <tr key={item._id}>
                  <td>
                    <TextButton
                      type="button"
                      onClick={() => setValue("gamertag", item.gamertag)}
                    >
                      {item.gamertag}
                    </TextButton>
                  </td>
                  <td
                    style={{
                      textAlign: "right",
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      fontSize: "14px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {item.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{ padding: "10px", textAlign: "center" }}
            data-cy="notimes"
          >
            Nog geen tijden
          </div>
        )}
      </main>
      <NewTimeForm>
        <form onSubmit={handleSubmit(addNewTime)}>
          <div className="grid">
            <input
              type="text"
              placeholder="Gamertag"
              data-cy="gamertag"
              {...register("gamertag")}
            />
            <NumberFormat
              format="##:##.###"
              mask="_"
              type="text"
              placeholder="Tijd"
              data-cy="time"
              onValueChange={(v) => setValue("time", v.formattedValue)}
            />
          </div>
          <input
            type="submit"
            className="button"
            value="Toevoegen"
            data-cy="submit"
          />
        </form>
      </NewTimeForm>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      circuit: context.query.circuit,
    },
  };
};

export default Circuit;
