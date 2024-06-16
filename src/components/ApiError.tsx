import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

interface ApiErrorProps {
	message: string;
}

const ApiError: React.FC<ApiErrorProps> = ({ message }) => {
	const router = useRouter();

	const handleRetry = () => {
		router.reload();
	};

	return (
		<Box sx={{ textAlign: 'center', mt: 4 }}>
			<Typography variant="h6" color="error" gutterBottom>
				{message}
			</Typography>
			<Button variant="contained" color="primary" onClick={handleRetry}>
				Retry
			</Button>
		</Box>
	);
};

export default ApiError;
