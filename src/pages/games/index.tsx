
import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Container, Grid, TextField, Typography, Button, IconButton } from '@mui/material';
import { useAllGames } from '../../hooks/useAllGames';
import GameCard from '@/components/cards/GameCard';

const GamesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, error, isLoading } = useAllGames(page, 12, search);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleAddGame = (gameId: number) => {
    // Logic to add the game
    console.log(`Add game with ID: ${gameId}`);
  };

  if (isLoading) return <div>Loading...</div>;
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
        {data?.data.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <GameCard game={{
              ...game,
              description: game.description || "No description available",
              imageUrl: game.imageUrl || '/game_images/default.webp'
            }} onAddGame={handleAddGame} />
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
            if (!isLoading && data && data.data && data.data.length === 12) {
              setPage((old) => old + 1);
            }
          }}
          disabled={!data || !data.data || data.data.length < 10}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default GamesPage;
