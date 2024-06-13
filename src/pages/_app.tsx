import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css';
import Layout from '@/components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { UserProvider } from '@/contexts/UserContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
					<CssBaseline />
					<ToastContainer />
					<Layout>
						<Component {...pageProps} />
					</Layout>
					<SpeedInsights />
					<Analytics />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
