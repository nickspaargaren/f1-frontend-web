import axios from "axios";
import useSWR, { Fetcher } from "swr";

const useCircuits = <T extends object>(url: string) => {
  const fetcher: Fetcher<T> = (url: string) =>
    axios
      .get<T>(url, {
        params: {
          apikey: process.env.API_KEY,
        },
      })
      .then((res) => res.data);

  const { data, error } = useSWR<T>(url, fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useCircuits;
