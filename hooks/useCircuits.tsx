import axios from 'axios';
import { useEffect, useState } from 'react';

import { Circuit } from '../types';

const useCircuits = () => {
  const [circuits, setCircuits] = useState<{
    data: Circuit[];
    loading: boolean;
    error: string | null;
  }>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const LoadData = async () => {
      try {
        const res = await
        axios.get('https://f1-api.vercel.app/api/circuits', {
          params: {
            apikey: process.env.API_KEY,
          },
        });
        const { data } = res;
        setCircuits({ ...data, loading: false, error: null });
      } catch (err: any) {
        setCircuits({ data: [], loading: false, error: err.message });
      }
    };

    LoadData();
  }, []);

  return circuits;
};

export default useCircuits;
