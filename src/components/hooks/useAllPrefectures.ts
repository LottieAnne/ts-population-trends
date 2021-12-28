import { useCallback, useState } from 'react';

import axios from 'axios';

export const useAllPrefectures = () => {
  const [prefectures, setPrefectures] = useState<{
    message: null;
    result: {
      prefCode: number;
      prefName: string;
    }[];
  } | null>(null);

  const getPrefectures = useCallback(() => {
    axios
      .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY },
      })
      .then((results) => {
        setPrefectures(results.data);
      })
      .catch((error) => {});
  }, []);

  return { getPrefectures, prefectures };
};
