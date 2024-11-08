import { Card, CardContent, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

// Define the SaleItem interface here
export interface SaleItem {
  label: string;
  value: string;
  growth: string;
  bgColor: string;
  iconBackgroundColor: string;
  icon?: string;
  svgIcon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element; // Updated to use React.SVGProps
}

const SaleCard = ({ item }: { item: SaleItem }) => {
  const { value, label, growth, bgColor, iconBackgroundColor, icon, svgIcon: SvgIcon } = item;

  const Icon = icon ? (
    <IconifyIcon icon={icon} sx={{ fontSize: 20, color: 'common.white' }} />
  ) : SvgIcon ? (
    <SvgIcon style={{ fontSize: 24 }} /> // Use inline styles for SvgIcon
  ) : null;

  return (
    <Card
      sx={{
        borderRadius: 4,
        bgcolor: bgColor,
        width:'13rem',
      }}
    >
      <CardContent sx={(theme) => ({ p: { xs: `${theme.spacing(2.5)} !important` } })}>
        <Stack
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: iconBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          {Icon}
        </Stack>

        <Typography variant="h3" color="primary.darker" mb={1}>
          {value}
        </Typography>
        <Typography variant="h6" color="grey.800" component="p" mb={1}>
          {label}
        </Typography>
        <Typography variant="caption" color="text.secondary" component="p" >
          Last day {growth}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SaleCard;
