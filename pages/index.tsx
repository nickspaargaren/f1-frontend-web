import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';

import Layout from '@/components/Layout';
import Loading from '@/components/Loading';
import Winner from '@/components/Winner';
import useCircuits from '@/hooks/useCircuits';

const Home: NextPage = (): ReactElement => {
  const circuits = useCircuits('https://f1-api.vercel.app/api/circuits');

  const containerAnimation = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, transform: 'translateY(5px)' },
    show: { opacity: 1, transform: 'translateY(0px)' },
  };

  if (circuits.error) {
    return <Layout title="F1 stats" description="Circuits">{circuits.error}</Layout>;
  }

  if (circuits.loading) {
    return <Layout title="F1 stats" description="Circuits"><Loading /></Layout>;
  }

  return (
    <Layout title="F1 stats" description="Circuits">
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        {circuits.data.circuits
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <motion.div variants={itemAnimation}>
              <div key={item._id} className="circuit">
                <Link href={`/circuits/${item.name}`}>
                  <a>
                    <div className="image">
                      {item.flag
                      && <Image src={`/images/flags/${item.flag}.png`} alt={item.flag} width={30} height={18} />}
                    </div>
                    <div className="title">
                      {item.name}
                      <br />
                      <small>{item.description}</small>
                    </div>
                    <div className="winner">
                      {item.winner && (
                      <Winner title={item.winner} />
                      )}
                    </div>
                  </a>
                </Link>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </Layout>
  );
};

export default Home;
