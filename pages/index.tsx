import type { NextPage } from "next";
import { ReactElement } from "react";

import CircuitList from "@/components/CircuitList";
import LatestTimeUpdate from "@/components/LatestTimeUpdate";
import Layout from "@/components/Layout";

const Home: NextPage = (): ReactElement => (
  <Layout title="F1 stats" description="Circuits">
    <LatestTimeUpdate />
    <CircuitList />
  </Layout>
);

export default Home;
