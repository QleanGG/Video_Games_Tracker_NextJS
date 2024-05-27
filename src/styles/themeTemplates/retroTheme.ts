import { createTheme } from '@mui/material/styles';

const retroTheme = createTheme({
  palette: {
    primary: {
      main: '#2E294E', // Dark Purple
    },
    secondary: {
      main: '#EF476F', // Vibrant Pink
    },
    warning: {
      main: '#FFD166', // Bright Yellow
    },
    success: {
      main: '#06D6A0', // Bright Mint
    },
    background: {
      default: '#2E294E', // Dark Purple
      paper: '#2E294E', // Dark Purple
    },
    text: {
      primary: '#06D6A0', // Bright Mint
      secondary: '#EF476F', // Vibrant Pink
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

export default retroTheme;
