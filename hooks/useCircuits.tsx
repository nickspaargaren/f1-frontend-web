import axios from 'axios';
import { useEffect, useState } from 'react';

import { ResponseType } from '@/types';

const useCircuits = (url: string): ResponseType => {
  const [circuits, setCircuits] = useState<ResponseType>({
    data: {
      circuits: [],
      times: [],
    },
    loading: true,
    error: null,
  });

  useEffect(() => {
    const LoadData = async () => {
      try {
        const res = await axios.get(url, {
          params: {
            apikey: process.env.API_KEY,
          },
        });
        const { data } = res;
        setCircuits({ ...data, loading: false, error: null });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setCircuits({ data: { circuits: [], times: [] }, loading: false, error: err.message });
        }
      }
    };

    LoadData();
  }, []);

  return circuits;
};

export default useCircuits;
