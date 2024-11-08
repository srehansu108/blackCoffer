import { Paper, Stack, Typography, Divider } from '@mui/material';
import { useMemo, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { useTheme } from '@mui/material/styles';
import LegendToggleButton from 'components/common/LegendToggleButton';
import VolumeVsServiceChart from './VolumeVsServiceChart';

const VolumeVsService = () => {
  const chartRef = useRef<EChartsReactCore | null>(null);
  const [legend, setLegend] = useState({
    industries: false,
    economic: false,
    technological: false,
    political: false,
    environmental: false,
    organization: false,
    other: false,
  });

  const [sectorData, setSectorData] = useState({
    industries: 0,
    economic: 0,
    technological: 0,
    political: 0,
    environmental: 0,
    organization: 0,
    other: 0,
  });

  const theme = useTheme();

  // Fetch data from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        const data = response.data;

        // Count occurrences of each sector
        const sectorsCount = {
          industries: data.filter(item => item.pestle === 'Industries').length,
          economic: data.filter(item => item.pestle === 'Economic').length,
          technological: data.filter(item => item.pestle === 'Technological').length,
          political: data.filter(item => item.pestle === 'Political').length,
          environmental: data.filter(item => item.pestle === 'Environmental').length,
          organization: data.filter(item => item.pestle === 'Organization').length,
          other: data.filter(item => item.pestle === 'Other').length,
        };

        // Update the sector data state
        setSectorData(sectorsCount);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleLegendToggle = (name: keyof typeof legend) => {
    setLegend((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));

    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name,
      });
    }
  };

  return (
    <Paper sx={{ p: 3, paddingBottom: 2, width: '54rem', marginLeft:'7rem'}}>
      <Typography variant="h4" color="primary.dark" mb={3}>
        Sectors Comparison Graph
      </Typography>

      <VolumeVsServiceChart
        chartRef={chartRef}
        sectorData={sectorData}
        style={{ height: 300, width: 800 }}  // Adjusted height
        sx={{ pb: 1 }}
      />

      <Stack
        direction="row"
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem sx={{ height: 20 }} />}
        sx={{ borderTop: 1, borderColor: 'grey.A100', pt: 2 }}
      >
        {/* Legend toggle buttons for each sector */}
        {Object.keys(sectorData).map((sector, index) => (
          <LegendToggleButton
            key={index}
            name={sector}
            icon="codicon:circle-filled"
            value={sectorData[sector as keyof typeof sectorData]}
            color="info.main"
            legend={legend}
            onHandleLegendToggle={handleLegendToggle}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default VolumeVsService;
