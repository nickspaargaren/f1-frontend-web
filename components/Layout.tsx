import Head from 'next/head';
import React from 'react';

import Header from '@/components/Headerr';

interface LayoutProps {
  children: any;
  title: string;
  description: string;
}

const Layout = ({
  children, title, description,
}: LayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header title="F1 stats" />

    <main>{children}</main>

  </>
);

export default Layout;
