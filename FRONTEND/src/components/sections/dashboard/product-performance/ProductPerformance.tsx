import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Chip, Link, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import CustomPagination from 'components/common/CustomPagination';
import SearchFilter from 'components/common/SearchFilter';

interface DataItem {
  id: string;
  insight: string;
  sector: string;
  pestle: string;
  source: string;
  country: string;
  url: string;
}

const columns: GridColDef<DataItem>[] = [
  {
    field: 'insight',
    headerName: 'Insights',
    flex: 2.2,
    minWidth: 200,
    renderCell: (params) => (
      <Stack justifyContent="center" height={1}>
        <Typography
          variant="h6"
          component={Link}
          href={params.row.url}
          color="text.primary"
          sx={{ width: 'max-content' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.row.insight}
        </Typography>
        <Typography variant="subtitle2">{params.row.sector}</Typography>
      </Stack>
    ),
  },
  {
    field: 'pestle',
    headerName: 'Pestle',
    flex: 0.5,
    minWidth: 10,
    renderCell: (params) => {
      let color = '';
      let label = '';  // Variable to hold the label text
      switch (params.value) {
        case 'Industries':
          color = '#FFA500'; // Orange
          label = 'Industries';  // Text for Industries
          break;
        case 'Organization':
          color = '#A9A9A9'; // Light Gray
          label = 'Organization';  // Text for Organization
          break;
        case 'Environmental':
          color = '#FC869A'; // Pink
          label = 'Environmental';  // Text for Environmental
          break;
        case 'Economic':
          color = '#0000FF'; // Blue
          label = 'Economic';  // Text for Economic
          break;
        case 'Political':
          color = '#ABAB00'; // Yellow
          label = 'Political';  // Text for Political
          break;
        case 'Technological':
          color = '#008000'; // Green
          label = 'Technological';  // Text for Technological
          break;
        default:
          color = '#D3D3D3'; // Default light gray
          label = 'Other';  // Text for Other
          break;
      }
      return <Chip label={label} sx={{ bgcolor: color, color: 'white' }} />;
    },
  },
  {
    field: 'source',
    headerName: 'Source',
    flex: 0.5,
    minWidth: 10,
  },
  {
    field: 'region',
    headerName: 'Region',
    flex: 0.5,
    minWidth: 50,
  },
];

const ProductPerformance = () => {
  const [rows, setRows] = useState<DataItem[]>([]);
  const apiRef = useGridApiRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        const formattedData = response.data.map((item) => ({
          id: item._id,
          insight: item.insight,
          sector: item.sector,
          pestle: item.pestle,
          source: item.source,
          region: item.region,
          url: item.url,
        }));
        setRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction={{ md: 'row' }}
        rowGap={2}
        justifyContent="space-between"
        alignItems={{ md: 'center' }}
      >
        <Typography variant="h4" color="primary.dark">
          Data Overview
        </Typography>
        <SearchFilter apiRef={apiRef} sx={{ maxWidth: 350 }} />
      </Stack>

      <Box
        sx={{
          height: 400,
          width: 1,
          mt: 3,
        }}
      >
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={rows}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </Box>
      <CustomPagination apiRef={apiRef} />
    </Paper>
  );
};

export default ProductPerformance;
