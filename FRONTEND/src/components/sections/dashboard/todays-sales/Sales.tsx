import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Stack, Button } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import OrderIcon from 'components/icons/OrderIcon';
import SalesIcon from 'components/icons/SalesIcon';
import SaleCard from './SaleCard';
import { SvgIconProps } from '@mui/material';

// SaleItem interface definition
export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: SvgIconProps) => JSX.Element;
}

// Data structure for the response from the API
interface ApiData {
  intensity: number;
  relevance: number;
  likelihood: number;
}

// Initial sales data array
const initialSales: SaleItem[] = [
  {
    label: 'Average Intensity',
    value: '$0', // Placeholder for average intensity
    growth: '+1.1%',
    bgColor: 'error.lighter',
    iconBackgroundColor: 'error.main',
    svgIcon: SalesIcon,
  },
  {
    label: 'Average Relevance',
    value: '$0', // Placeholder for average relevance
    growth: '+2.2%',
    bgColor: 'warning.lighter',
    iconBackgroundColor: 'error.dark',
    svgIcon: OrderIcon,
  },
  {
    label: 'Average Likelihood',
    value: '$0', // Placeholder for average likelihood
    growth: '+1.2%',
    bgColor: 'success.lighter',
    iconBackgroundColor: 'success.darker',
    icon: 'ion:pricetag',
  },
];

const Sales: React.FC = () => {
  const [sales, setSales] = useState<SaleItem[]>(initialSales);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/data'); // Corrected URL

        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data: ApiData[] = await response.json(); // Specify the expected data structure

        // Calculate averages
        const totalIntensity = data.reduce((sum: number, item: ApiData) => sum + item.intensity, 0);
        const totalRelevance = data.reduce((sum: number, item: ApiData) => sum + item.relevance, 0);
        const totalLikelihood = data.reduce((sum: number, item: ApiData) => sum + item.likelihood, 0);
        
        const averageIntensity = (totalIntensity / data.length).toFixed(2);
        const averageRelevance = (totalRelevance / data.length).toFixed(2);
        const averageLikelihood = (totalLikelihood / data.length).toFixed(2);

        setSales((prevSales) =>
          prevSales.map((sale) => {
            switch (sale.label) {
              case 'Average Intensity':
                return { ...sale, value: averageIntensity };
              case 'Average Relevance':
                return { ...sale, value: averageRelevance };
              case 'Average Likelihood':
                return { ...sale, value: averageLikelihood };
              default:
                return sale;
            }
          }) // Corrected closing parentheses
        );
      } catch (err) {
        setError('Failed to fetch data: ' + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Paper sx={{ pt: 2.875, pb: 4, px: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5.375}>
        <div>
          <Typography variant="h4" mb={0.5}>
            Average Insights
          </Typography>
          <Typography variant="subtitle1" color="primary.lighter">
            Insights Summary
          </Typography>
        </div>
        <Button variant="outlined" startIcon={<IconifyIcon icon="solar:upload-linear" />}>
          Export
        </Button>
      </Stack>

      <Grid container spacing={{ xs: 3.875, xl: 8 }} columns={{ xs: 1, sm: 2, md: 4 }}>
        {sales.map((item) => (
          <Grid item xs={1} key={item.label} sx={{ p: 2, ml: 2, mr: 3 }}> {/* Adds padding around each card */}
            <SaleCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sales;
