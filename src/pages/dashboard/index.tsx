import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import UserGamesDashboard from '@/components/userGames/UserGamesDashboard';

const GamesDashboardPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Games Dashboard
        </Typography>
        <UserGamesDashboard />
      </Box>
    </Container>
  );
};

export default GamesDashboardPage;
