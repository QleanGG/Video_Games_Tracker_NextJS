import React, { useEffect } from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import UserGamesDashboard from '@/components/userGames/UserGamesDashboard';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';

const GamesDashboardPage = () => {
  const { data: user, isLoading, isError} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Error loading user data.
          </Typography>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <UserGamesDashboard />
      </Box>
    </Container>
  );
};

export default GamesDashboardPage;
