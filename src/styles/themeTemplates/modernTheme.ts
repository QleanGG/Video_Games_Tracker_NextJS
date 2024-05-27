import { createTheme } from '@mui/material/styles';

const modernCleanTheme = createTheme({
  palette: {
    primary: {
      main: '#212121', // Dark Gray
    },
    secondary: {
      main: '#FDD835', // Bright Yellow
    },
    warning: {
      main: '#FF7043', // Orange
    },
    background: {
      default: '#212121', // Dark Gray
      paper: '#212121', // Dark Gray
    },
    text: {
      primary: '#FFFFFF', // White
      secondary: '#FDD835', // Bright Yellow
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

export default modernCleanTheme;
