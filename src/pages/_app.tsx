import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css';
import Layout from '@/components/layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { getTitle } from '@/utils/titleUtils';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [title, setTitle] = useState('GameVault');

	useEffect(() => {
		const handleRouteChange = () => {
		  setTitle(getTitle(router.pathname, router.query));
		};
	
		// Set the initial title
		handleRouteChange();
	
		// Update title on route change
		router.events.on('routeChangeComplete', handleRouteChange);
	
		// Cleanup the event listener on unmount
		return () => {
		  router.events.off('routeChangeComplete', handleRouteChange);
		};
	  }, [router.events, router.pathname, router.query]);

	const toastClassName = (() => {
		switch (router.pathname) {
			case '/register':
			case '/login':
				return 'toast-bottom-center';
			default:
				return '';
		}
	})();

	const toastPosition = (() => {
		switch (router.pathname) {
			case '/register':
			case '/login':
				return 'bottom-center';
			default:
				return 'top-right';
		}
	})();


	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta name="description" content="GameVault helps you track your video games, user interactions, and recommendations. Join now to manage your game library and discover new games!" />
					<title>{title}</title>
				</Head>
				<ToastContainer
					className={toastClassName}
					position={toastPosition}
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
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
