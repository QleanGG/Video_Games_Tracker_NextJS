import { createTheme } from '@mui/material/styles';

const futuristicTheme = createTheme({
  palette: {
    primary: {
      main: '#0B0C10', // Dark Blue-Black
    },
    secondary: {
      main: '#66FCF1', // Bright Cyan
    },
    info: {
      main: '#45A29E', // Muted Teal
    },
    background: {
      default: '#0B0C10', // Dark Blue-Black
      paper: '#0B0C10', // Dark Blue-Black
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#66FCF1', // Bright Cyan
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Open Sans',
      'sans-serif',
    ].join(','),
  },
});

export default futuristicTheme;
