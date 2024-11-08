import { Paper, Typography } from '@mui/material';
import TotalRevenueChart from './TotalRevenueChart';

const TotalRevenue = () => {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" mb={3}>
        Top 7 Data Overview
      </Typography>

      <TotalRevenueChart style={{ height: 247 }} />
    </Paper>
  );
};

export default TotalRevenue;
