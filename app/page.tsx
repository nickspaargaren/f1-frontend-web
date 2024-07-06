"use client";

import type { NextPage } from "next";
import { ReactElement } from "react";
import { useState } from "react";

import CircuitList from "@/components/CircuitList";
import LatestTimeUpdate from "@/components/LatestTimeUpdate";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import { useTranslation } from "@/helpers/useTranslation";

const Home: NextPage = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();

  return (
    <Layout title={t("F1times", { version: "22" })} description="Circuits">
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {!searchQuery && <LatestTimeUpdate />}
      <CircuitList searchQuery={searchQuery} />
    </Layout>
  );
};

export default Home;
