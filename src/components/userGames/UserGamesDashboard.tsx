import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useUserGames } from '@/hooks/useUserGames';
import GameGrid from './GameGrid';
import { UserGame, GameStatus } from '@/types';

const UserGamesDashboard: React.FC = () => {
  const { data: userGames = [], isLoading } = useUserGames();

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
