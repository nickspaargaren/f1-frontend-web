import Head from 'next/head';
import React from 'react';

import Header from '@/components/Header';

interface LayoutProps {
  children: any;
  title: string;
  description: string;
  winner?: string;
}

const Layout = ({
  children, title, description, winner,
}: LayoutProps) => (
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
