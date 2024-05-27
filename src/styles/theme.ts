import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1A1A1D', // Almost Black
		},
		secondary: {
			main: '#C3073F', // Bold Red
		},
		error: {
			main: '#950740', // Dark Red
		},
		background: {
			default: '#1A1A1D', // Almost Black
			paper: '#1A1A1D', // Almost Black
		},
		text: {
			primary: '#FFFFFF', // White
			secondary: '#C3073F', // Bold Red
		},
	},
	typography: {
		fontFamily: ['Roboto', 'Open Sans', 'sans-serif'].join(','),
	},
});

export default theme;
