import Background from 'assets/Background.webp';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const NavCard = () => {
  return (
    <Card
      sx={{
        background: `url(${Background}) no-repeat`,
        backgroundColor: 'black',  // Set the background color to black
        width: 238,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack gap={1} alignItems="center" color="common.white">
          {/* Replace LogoPro with the image */}
          <img
            src="https://media.licdn.com/dms/image/v2/C560BAQFCVjlwyyHoNw/company-logo_200_200/company-logo_200_200/0/1631311944859?e=2147483647&v=beta&t=5SPcu9rr7h_Z6fSZ1MHhEGE9HvjbSe6xIcpWnbLD5Z0"
            alt="Logo"
            style={{ width: 48, height: 48 }}
          />
          <Typography variant="h4">BlackCoffer Pro</Typography>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
            Get access to all <br /> features on tetumbas
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3.75,
              px: 5,
              color: 'primary.main',
              bgcolor: 'background.default',
              '&:hover': {
                bgcolor: 'action.hover',
                color: 'common.white',
              },
            }}
          >
            Get Pro
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NavCard;
