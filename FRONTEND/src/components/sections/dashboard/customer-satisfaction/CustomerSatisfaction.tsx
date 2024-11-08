import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Paper, Typography, Divider, Stack } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { currencyFormat, getTotal } from 'helpers/utils';
import Pin from 'components/icons/Pin';
import LegendToggleButton from 'components/common/LegendToggleButton';
import CustomerSatisfactionChart from './CustomerSatisfactionChart';

const CustomerSatisfaction = () => {
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [legend, setLegend] = useState({
    'Intensity': false,
    'Relevance': false,
    'Likelihood': false,
  });
  const [data, setData] = useState<any>(null);  // For storing the fetched data
  const [loading, setLoading] = useState<boolean>(true);  // Loading state

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/data');
        const responseData = await response.json();

        // Select the first 7 data points and filter the 'intensity', 'relevance', and 'likelihood'
        const firstSevenData = responseData.slice(0, 7);
        const filteredData = {
          intensity: firstSevenData.map((item: any) => item.intensity),
          relevance: firstSevenData.map((item: any) => item.relevance),
          likelihood: firstSevenData.map((item: any) => item.likelihood),
        };
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalIntensity = useMemo(() => getTotal(data?.intensity || []), [data]);
  const totalRelevance = useMemo(() => getTotal(data?.relevance || []), [data]);
  const totalLikelihood = useMemo(() => getTotal(data?.likelihood || []), [data]);

  const handleLegendToggle = (name: keyof typeof legend) => {
    setLegend((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));

    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  return (
    <Paper sx={{ py: 3, px: 1.5, width:'26rem' }}>
      <Typography variant="h4" color="primary.dark" mb={3}>
        Overall Graph
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        data && (
          <CustomerSatisfactionChart
            chartRef={chartRef}
            data={data}
            style={{ height: 360 }}
          />
        )
      )}
    </Paper>
  );
};

export default CustomerSatisfaction;
