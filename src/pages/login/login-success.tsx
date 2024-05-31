import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const LoginSuccess = () => {
  const router = useRouter();
  const { user } = router.query;

  useEffect(() => {
    if (user) {
      try {
        const userData = JSON.parse(user as string);
        // Save user data to local storage or context
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Login successful!');
        // Redirect to the home page or another page
        router.push('/');
      } catch (error) {
        toast.error('Failed to parse user data.');
      }
    }
  }, [user, router]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
      <Typography variant="h6" sx={{ ml: 2 }}>Logging in...</Typography>
    </Box>
  );
};

export default LoginSuccess;
