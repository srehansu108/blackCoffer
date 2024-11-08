import { alpha, useTheme } from '@mui/material';
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
import { MutableRefObject, useMemo } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';

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

interface CustomerSatisfactionChartProps {
  chartRef: MutableRefObject<EChartsReactCore | null>;
  data: Record<string, number[]>;  // intensity, relevance, likelihood
  style?: {
    height?: number;
    width?: number;
  };
}

const CustomerSatisfactionChart = ({ chartRef, data, style }: CustomerSatisfactionChartProps) => {
  const theme = useTheme();

  const customerSatisfactionChartOption = useMemo(() => {
    const option: EChartsOption = {
      color: [theme.palette.info.main, theme.palette.success.dark, theme.palette.warning.main],
      tooltip: {
        trigger: 'item',
        show: true,
      },
      legend: {
        show: true,
        bottom: 0, // Moves the legend to the bottom
        left: 'center', // Centers the legend horizontally
        padding: [10, 0, 20, 0], // Adds padding to the bottom to separate from the chart
      },
      grid: {
        top: 0,
        left: -26,
        right: 4,
        bottom: 60, // Increases the bottom margin for space for the legend
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Intensity',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: alpha(theme.palette.info.main, 0) },
              { offset: 0, color: alpha(theme.palette.info.main, 0.3) },
            ]),
          },
          emphasis: { focus: 'series' },
          data: data['intensity'],
          symbol: 'circle',
          symbolSize: 8,
        },
        {
          name: 'Relevance',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: alpha(theme.palette.success.main, 0) },
              { offset: 0, color: alpha(theme.palette.success.main, 0.3) },
            ]),
          },
          emphasis: { focus: 'series' },
          data: data['relevance'],
          symbol: 'circle',
          symbolSize: 8,
        },
        {
          name: 'Likelihood',
          type: 'line',
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 1, color: alpha(theme.palette.warning.main, 0) },
              { offset: 0, color: alpha(theme.palette.warning.main, 0.3) },
            ]),
          },
          emphasis: { focus: 'series' },
          data: data['likelihood'],
          symbol: 'circle',
          symbolSize: 8,
        },
      ],
    };
    return option;
  }, [theme, data]);

  return (
    <EChartsReactCore
      echarts={echarts}
      option={customerSatisfactionChartOption}
      ref={chartRef}
      style={style}
    />
  );
};

export default CustomerSatisfactionChart;
