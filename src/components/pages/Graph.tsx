import { VFC, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Population } from '../types/api/population';

// Component that view Graph of selected prefecture

  const Graph: VFC<Population> = ({ populationdata }) => {
    const series: Highcharts.SeriesOptionsType[] = [];
    const categories = [];
    useEffect(() => {

    for (let p of populationdata) {
      const data: Array<number> = [];
  
      for (let pd of p.data) {
        data.push(pd.value);
        categories.push(String(pd.year));
      }
  
      series.push({
        type: 'line',
        name: p.prefName,
        data: data,
      });
    }
},[]);

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
    },

    title: {
      text: 'Total Population Trends by Prefecture',
    },
    yAxis: {
      title: {
        text: 'Population',
        textAlign: 'right',
        rotation: 0,
        y: -160,
    },
    min: 0,
    tickWidth: 1,
    tickInterval: 500000,
  },

    xAxis: {
      title: {
        text: 'Year',
      },
    categories: categories,
  },

    series: series,
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },
  };


  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
