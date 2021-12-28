import { VFC, useEffect, useState } from 'react';
import CheckField from './CheckField';
import Graph from './Graph';
import { HeadingPrefecture } from '../molecules/HeadingPrefecture';
import { HeadingGraph } from '../molecules/HeadingGraph';
import { useAllPrefectures } from '../../hooks/useAllPrefectures';

import axios from 'axios';

export const Main: VFC = () => {
  const { getPrefectures, prefectures } = useAllPrefectures();

  const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);

  useEffect(() => getPrefectures(), []);
  // チェックボックスをクリックした際の処理
  const handleClickCheck = (
    prefName: string,
    prefCode: number,
    check: boolean
  ) => {
    let c_prefPopulation = prefPopulation.slice();

    // check action
    if (check) {
      if (
        c_prefPopulation.findIndex((value) => value.prefName === prefName) !==
        -1
      )
        return;

      axios
        .get(
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=' +
            String(prefCode),
          {
            headers: {
              'X-API-KEY': process.env.REACT_APP_API_KEY,
            },
          }
        )
        .then((results) => {
          c_prefPopulation.push({
            prefName: prefName,
            data: results.data.result.data[0].data,
          });

          setPrefPopulation(c_prefPopulation);
        })
        .catch((error) => {
          return;
        });
    }
    // uncheck action
    else {
      const deleteIndex = c_prefPopulation.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) return;
      c_prefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(c_prefPopulation);
    }
  };

  return (
    <main>
      <HeadingPrefecture />
      {prefectures && (
        <CheckField
          prefectures={prefectures.result}
          onChange={handleClickCheck}
        />
      )}
      <HeadingGraph />
      <Graph populationdata={prefPopulation} />
    </main>
  );
};
