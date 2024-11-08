import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ReactEchart from 'components/base/ReactEhart';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import axios from 'axios';

echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | GridComponentOption | LegendComponentOption | BarSeriesOption
>;

interface TotalRevenueChartProps {
  style?: {
    height?: number;
    width?: number;
  };
}

const TotalRevenueChart = ({ style }: TotalRevenueChartProps) => {
  const theme = useTheme();
  const { up } = useBreakpoints();
  const isSm = up('sm');

  // State to store fetched data
  const [chartData, setChartData] = useState<{ intensity: number[]; relevance: number[]; likelihood: number[] }>({
    intensity: [],
    relevance: [],
    likelihood: [],
  });

  useEffect(() => {
    // Fetch data from API and process the first 5 entries
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const data = response.data.slice(0, 5); // Get the first 5 data entries
        const intensity = data.map((item: any) => item.intensity);
        const relevance = data.map((item: any) => item.relevance);
        const likelihood = data.map((item: any) => item.likelihood);

        // Update chart data state
        setChartData({ intensity, relevance, likelihood });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalRevenueChartOption: EChartsOption = useMemo(() => {
    return {
      color: [theme.palette.info.main, theme.palette.success.main, theme.palette.warning.main],
      tooltip: {
        confine: true,
      },
      legend: {
        data: ['Intensity', 'Relevance', 'Likelihood'],
        left: 'center',
        bottom: 0,
        icon: 'circle',
        textStyle: {
          fontFamily: theme.typography.body2.fontFamily,
        },
        itemGap: isSm ? 20 : 10,
        itemHeight: 11,
      },
      xAxis: {
        data: ['Entry 1', 'Entry 2', 'Entry 3', 'Entry 4', 'Entry 5'], // X-axis labels for each entry
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: {
          fontSize: theme.typography.fontSize - 2,
          color: theme.palette.grey.A200,
          margin: 18,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: theme.typography.fontSize - 2,
          color: theme.palette.grey.A200,
          formatter: '{value}',
          margin: 18,
        },
        splitLine: {
          lineStyle: { color: theme.palette.grey.A400 },
        },
      },
      grid: {
        top: '4%',
        left: 0,
        right: 6,
        bottom: 45,
        containLabel: true,
      },
      series: [
        {
          name: 'Intensity',
          type: 'bar',
          data: chartData.intensity,
          itemStyle: { borderRadius: 2 },
          barCategoryGap: '65%',
        },
        {
          name: 'Relevance',
          type: 'bar',
          data: chartData.relevance,
          itemStyle: { borderRadius: 2 },
          barCategoryGap: '65%',
        },
        {
          name: 'Likelihood',
          type: 'bar',
          data: chartData.likelihood,
          itemStyle: { borderRadius: 2 },
          barCategoryGap: '65%',
        },
      ],
    };
  }, [theme, chartData, isSm]);

  return <ReactEchart echarts={echarts} option={totalRevenueChartOption} style={style} />;
};

export default TotalRevenueChart;
