import React, { PropsWithChildren, ReactElement } from "react";

import Header from "@/components/Header";

type LayoutProps = {
  title: string;
  winner?: string;
};

const Layout = ({
  children,
  title,
  winner,
}: PropsWithChildren<LayoutProps>): ReactElement => (
  <>
    <Header title={title} winner={winner} />
    <main>{children}</main>
  </>
);

export default Layout;
