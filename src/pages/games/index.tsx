import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Container, Grid, TextField, Typography, Button, CircularProgress } from '@mui/material';
import { useAllGames } from '../../hooks/useAllGames';
import { useAddUserGame, useUserGames } from '@/hooks/useUserGames';
import GameCard from '@/components/cards/GameCard';
import { GameStatus } from '@/types';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/router';

const GamesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data: allGamesData, error, isLoading: isAllGamesLoading } = useAllGames(page, 12, search);
  const { user, setUser, userLoading } = useUser();
  const { data: userGames, isLoading: isUserGamesLoading } = useUserGames(!!user); 
  const { mutate: addUserGame, isPending: isAdding } = useAddUserGame();
  const router = useRouter();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleAddGame = (gameId: number) => {
    if (!user) {
      router.push('/login');
      toast.info('Please log in to add games to your library');
      return; 
    }
    addUserGame(
      { gameId, status: GameStatus.Interested },
      {
        onSuccess: () => {
          toast.success('Game added successfully');
        },
        onError: () => {
          toast.error('Failed to add game');
        },
      }
    );
  };

  if (isAllGamesLoading || isUserGamesLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading games</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Games
      </Typography>
      <Box mb={4}>
        <TextField
          fullWidth
          label="Search games..."
          value={search}
          onChange={handleSearch}
          variant="outlined"
        />
      </Box>
      <Grid container spacing={4}>
        {allGamesData?.data.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <GameCard
              game={{
                ...game,
                description: game.description || "No description available",
                imageUrl: game.imageUrl || '/game_images/default.webp'
              }}
              onAddGame={handleAddGame}
              userGames={userGames || []} // Pass the user games to GameCard
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Box mx={2}>
          <Typography variant="body1">
            Page {page}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (!isAllGamesLoading && allGamesData && allGamesData.data && allGamesData.data.length === 12) {
              setPage((old) => old + 1);
            }
          }}
          disabled={!allGamesData || !allGamesData.data || allGamesData.data.length < 12}
        >
          Next
        </Button>
      </Box>
      {isAdding && (
        <Box mt={2} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default GamesPage;
