import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useUserGames } from '@/hooks/useUserGames';
import GameGrid from './GameGrid';
import { UserGame, GameStatus } from '@/types';
import { useRouter } from 'next/router';

const UserGamesDashboard: React.FC = () => {
  const { data: userGames = [], isLoading } = useUserGames();
  const router = useRouter();

  const filterByStatus = (status: GameStatus) => (games: UserGame[]) =>
    games.filter((game) => game.status === status);

  const statusSections = [
    { title: 'Currently Playing', status: GameStatus.CurrentlyPlaying },
    { title: 'Own', status: GameStatus.Own },
    { title: 'On Hold', status: GameStatus.OnHold },
    { title: 'Interested', status: GameStatus.Interested },
    { title: 'Completed', status: GameStatus.Completed },
    { title: 'Finished', status: GameStatus.Finished },
    { title: 'Dropped', status: GameStatus.Dropped },
  ];

  const handleGoToGames = () => {
    router.push('/games');
  };

  if (userGames.length === 0 && !isLoading) {
    return (
      <Container sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          You don&#39;t have any games in your library. Go Add some!
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoToGames}>
          Browse Games
        </Button>
      </Container>
    );
  }


  return (
    <Container sx={{ py: 2 }}>
      {statusSections.map(({ title, status }) => {
        const filteredGames = filterByStatus(status)(userGames);
        if (filteredGames.length === 0) return null;
        return (
          <Box key={status} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                textAlign: 'center',
                fontWeight: 'bold',
                borderBottom: '2px solid #ddd',
                pb: 1,
              }}
            >
              {title}
            </Typography>
            <GameGrid userGames={filteredGames} isLoading={isLoading} />
          </Box>
        );
      })}
    </Container>
  );
};

export default UserGamesDashboard;
