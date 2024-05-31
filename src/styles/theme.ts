import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A63446', // Crimson
    },
    secondary: {
      main: '#FBFEF9', // Off-White
    },
    error: {
      main: '#D7263D', // Bright Red
    },
    background: {
      default: '#1A1A1D', // Almost Black
      paper: '#2A2A2D', // Dark Grey
    },
    text: {
      primary: '#FBFEF9', // Off-White
      secondary: '#A63446', // Crimson
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Open Sans', 'sans-serif'].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A2A2D', // Dark Grey background for cards
        },
      },
    },
  },
});

export default theme;
