import { Link, Stack, SxProps, Typography } from '@mui/material';
import { rootPaths } from 'routes/paths';

interface LogoHeaderProps {
  sx?: SxProps;
}

const LogoHeader = (props: LogoHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      columnGap={3}
      component={Link}
      href={rootPaths.root}
      {...props}
    >
      <img
        src="https://media.licdn.com/dms/image/v2/C560BAQFCVjlwyyHoNw/company-logo_200_200/company-logo_200_200/0/1631311944859?e=2147483647&v=beta&t=5SPcu9rr7h_Z6fSZ1MHhEGE9HvjbSe6xIcpWnbLD5Z0"
        alt="BlackCoffer Logo"
        style={{ width: '56px', height: '56px', objectFit: 'contain' }} // Adjust size as needed
      />
      <Typography variant="h2" color="primary.darker">
        BlackCoffer
      </Typography>
    </Stack>
  );
};

export default LogoHeader;
