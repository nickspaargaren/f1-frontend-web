import type { NextPage } from "next";
import { ReactElement } from "react";
import { useState } from "react";

import CircuitList from "@/components/CircuitList";
import LatestTimeUpdate from "@/components/LatestTimeUpdate";
import Layout from "@/components/Layout";
import Search from "@/components/Search";

const Home: NextPage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout title="F1 stats" description="Circuits">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {!searchQuery && <LatestTimeUpdate />}
      <CircuitList searchQuery={searchQuery} />
    </Layout>
  );
};

export default Home;
