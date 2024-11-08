import { useTheme } from '@mui/material';
import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import EChartsReactCore from 'echarts-for-react/lib/core';
import ReactEchart from 'components/base/ReactEhart';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | LineSeriesOption
>;

interface VisitorInsightsChartProps {
  chartRef: MutableRefObject<EChartsReactCore | null>;
  style?: {
    height: number;
    width?: number;
  };
}

const VisitorInsightsChart = ({ chartRef, style }: VisitorInsightsChartProps) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState({
    intensity: [] as number[],
    relevance: [] as number[],
    likelihood: [] as number[],
  });

  // Fetch data from the backend and set chart data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const first10Data = response.data.slice(0, 10);

        // Extract intensity, relevance, and likelihood
        const intensity = first10Data.map((item: any) => item.intensity);
        const relevance = first10Data.map((item: any) => item.relevance);
        const likelihood = first10Data.map((item: any) => item.likelihood);

        setChartData({ intensity, relevance, likelihood });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Configure chart options based on fetched data
  const visitorInsightsChartOption = useMemo(() => {
    const option: EChartsOption = {
      color: [
        theme.palette.secondary.darker,
        theme.palette.error.darker,
        theme.palette.success.darker,
      ],

      tooltip: {
        trigger: 'axis',
        confine: true,
        axisPointer: {
          lineStyle: {
            color: theme.palette.error.main,
          },
        },
      },

      xAxis: {
        type: 'category',
        data: Array.from({ length: 10 }, (_, i) => (i + 1).toString()), // Label as 1 to 10
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontFamily: theme.typography.button.fontFamily,
          fontSize: theme.typography.fontSize / 1.4,
          color: theme.palette.grey[200],
        },
        axisLine: {
          show: false,
        },
      },

      yAxis: {
        type: 'value',
        min: 0,
        axisLabel: {
          fontSize: theme.typography.caption.fontSize,
          color: theme.palette.grey.A200,
        },
        splitLine: {
          lineStyle: {
            color: theme.palette.grey.A400,
          },
        },
      },

      grid: {
        top: 8,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
      },

      series: [
        {
          name: 'Intensity',
          type: 'line',
          data: chartData.intensity,
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 14,
          lineStyle: {
            width: 4,
          },
        },
        {
          name: 'Relevance',
          type: 'line',
          data: chartData.relevance,
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 14,
          lineStyle: {
            width: 4,
          },
        },
        {
          name: 'Likelihood',
          type: 'line',
          data: chartData.likelihood,
          smooth: true,
          symbol: 'circle',
          showSymbol: false,
          symbolSize: 14,
          lineStyle: {
            width: 4,
          },
        },
      ],
    };
    return option;
  }, [theme, chartData]);

  return (
    <ReactEchart
      echarts={echarts}
      option={visitorInsightsChartOption}
      ref={chartRef}
      style={style}
    />
  );
};

export default VisitorInsightsChart;
