import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import UserGamesDashboard from '@/components/userGames/UserGamesDashboard';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/router';

const GamesDashboardPage = () => {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);
  
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
