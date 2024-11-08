import { useEffect, useState, useMemo, useRef } from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { TooltipComponent, TooltipComponentOption, GeoComponent, GeoComponentOption } from 'echarts/components';
import { MapChart, MapSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { CallbackDataParams } from 'echarts/types/src/util/types.js';
import world from 'assets/json/world.json'; // Update path as necessary
import ReactEchart from 'components/base/ReactEhart'; // Update path if needed

// Register necessary ECharts components
echarts.use([TooltipComponent, GeoComponent, MapChart, CanvasRenderer]);
echarts.registerMap('world', { geoJSON: world });

interface SalesMappingDataItem {
  name: string;
  value: number;
  itemStyle: {
    areaColor: string;
  };
}

const SalesMapping = () => {
  const [salesData, setSalesData] = useState<SalesMappingDataItem[]>([]);
  const salesMappingChartRef = useRef<null | EChartsReactCore>(null);
  const theme = useTheme();

  // Function to fetch data from the backend API
  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data');
      const data = await response.json();
      
      // Assuming the response contains an array of objects with country attribute
      const countries = data.map((item: any) => item.country);

      // Count the occurrences of each country
      const countryCount: { [key: string]: number } = {};
      countries.forEach((country) => {
        if (countryCount[country]) {
          countryCount[country]++;
        } else {
          countryCount[country] = 1;
        }
      });

      // Create a mapping of countries with their respective counts and dynamic color based on value
      const processedData = Object.keys(countryCount).map((country) => {
        const count = countryCount[country];
        
        // Dynamic color based on count (You can adjust this logic as per your needs)
        const color = count > 20
          ? theme.palette.red.main
          : count > 10
          ? theme.palette.orange.main
          : theme.palette.green.main;

        return {
          name: country,
          value: count, // The count of occurrences for each country
          itemStyle: { areaColor: color },
        };
      });
      
      setSalesData(processedData);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  const salesMappingChartOption = useMemo(() => {
    const option = {
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: (params: CallbackDataParams) => {
          const { name, value } = params;
          if (value) return `${name} : ${value}`;
          else return `${name} : 0`;
        },
      },

      series: [
        {
          type: 'map',
          map: 'world',
          data: salesData,
          roam: true,
          scaleLimit: {
            min: 0.75,
            max: 1.1,
          },
          left: 0,
          right: 0,
          label: {
            show: false,
          },
          selectedMode: false,
          itemStyle: {
            areaColor: theme.palette.grey.A700,
            borderColor: theme.palette.common.white,
            borderWidth: 0.2,
          },

          emphasis: {
            disabled: true,
          },
        },
      ],
    };
    return option;
  }, [theme, salesData]);

  return (
    <Paper sx={{ p: 3, width:'40rem' }}>
      <Typography variant="h4" color="primary.dark" mb={1.375}>
        Mapping by Country
      </Typography>

      <ReactEchart
        echarts={echarts}
        option={salesMappingChartOption}
        ref={salesMappingChartRef}
        style={{ height: 260 }}
        sx={{ px: 3 }}
      />
    </Paper>
  );
};

export default SalesMapping;
