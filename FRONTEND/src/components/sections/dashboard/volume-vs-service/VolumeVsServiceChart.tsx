import { SxProps, useTheme } from '@mui/material';
import { MutableRefObject, useMemo } from 'react';
import * as echarts from 'echarts/core';
import { TooltipComponent, TooltipComponentOption, LegendComponent, GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import EChartsReactCore from 'echarts-for-react/lib/core';
import ReactEchart from 'components/base/ReactEhart';

// Register ECharts components
echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]);

type EChartsOption = echarts.ComposeOption<TooltipComponentOption | GridComponentOption | BarSeriesOption>;

interface VolumeVsServiceChartProps {
  chartRef: MutableRefObject<EChartsReactCore | null>;
  sectorData: {
    industries: number;
    economic: number;
    technological: number;
    political: number;
    environmental: number;
    organization: number;
    other: number;
  };
  style?: {
    height: number;
    width?: number;
  };
  sx: SxProps;
}

const VolumeVsServiceChart = ({ chartRef, sectorData, style, ...rest }: VolumeVsServiceChartProps) => {
  const theme = useTheme();

  const volumeVsServiceChartOption = useMemo(() => {
    const option: EChartsOption = {
      color: [
        theme.palette.info.main, 
        theme.palette.success.main, 
        theme.palette.warning.main, 
        theme.palette.primary.main, 
        theme.palette.secondary.main, 
        theme.palette.error.main, 
        theme.palette.text.primary
      ],
      tooltip: {
        confine: true,
        trigger: 'axis',
      },
      legend: {
        show: true,
        data: Object.keys(sectorData),
      },
      xAxis: {
        type: 'category',
        data: ['Sectors'],
      },
      yAxis: {
        type: 'value',
      },
      grid: {
        top: 20,
        bottom: 20,
        left: 30,
        right: 20,
        containLabel: true,
      },
      series: Object.keys(sectorData).map((sector, index) => ({
        name: sector.charAt(0).toUpperCase() + sector.slice(1),
        type: 'bar',
        data: [sectorData[sector as keyof typeof sectorData]],
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}',
        },
      })),
    };
    return option;
  }, [theme, sectorData]);

  return (
    <ReactEchart
      echarts={echarts}
      option={volumeVsServiceChartOption}
      ref={chartRef}
      style={style}
      {...rest}
    />
  );
};

export default VolumeVsServiceChart;
