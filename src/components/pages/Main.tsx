import { VFC, useEffect, useState } from 'react';
import CheckField from './CheckField';
import Graph from './Graph';
import { HeadingPrefecture } from '../molecules/HeadingPrefecture';
import { HeadingGraph } from '../molecules/HeadingGraph';
import { useAllPrefectures } from '..//hooks/useAllPrefectures';

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
    const cPrefPopulation = prefPopulation.slice();

    // check action
    if (check) {
      if (
        cPrefPopulation.findIndex((value) => value.prefName === prefName) !== -1
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
          cPrefPopulation.push({
            prefName: prefName,
            data: results.data.result.data[0].data,
          });

          setPrefPopulation(cPrefPopulation);
        })
        .catch((error) => {
          return;
        });
    }
    // uncheck action
    if (!check) {
      const deleteIndex = cPrefPopulation.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) return;
      cPrefPopulation.splice(deleteIndex, 1);
      setPrefPopulation(cPrefPopulation);
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
