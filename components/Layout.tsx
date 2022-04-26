import Head from 'next/head';
import React, { PropsWithChildren, ReactElement } from 'react';

import Header from '@/components/Header';

interface LayoutProps {
  title: string;
  description: string;
  winner?: string;
}

const Layout = ({
  children, title, description, winner,
}: PropsWithChildren<LayoutProps>): ReactElement => (
  <>
    <Head>
      <title>
        {title}
        {' '}
        |
        {' '}
        Racetijden
      </title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header title={title} winner={winner} />

    <main>{children}</main>

  </>
);

export default Layout;
