import { useState, ChangeEvent } from 'react';
import { Box, Container, Grid, Typography, Button, Skeleton } from '@mui/material';
import { useAllGames } from '../../hooks/useAllGames';
import { useAddUserGame, useUserGames } from '@/hooks/useUserGames';
import GameCard from '@/components/cards/GameCard';
import { GameStatus } from '@/types';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { useGenres } from '@/hooks/useGenres';
import GameFilters from '@/components/search/GameFilters';
import { SelectChangeEvent } from '@mui/material/Select';

const GamesPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const { data: allGamesData, error, isLoading: isAllGamesLoading } = useAllGames(page, 12, search, selectedGenre);
  const { data: user } = useUser();
  const { data: userGames, isLoading: isUserGamesLoading } = useUserGames(!!user); 
  const { mutate: addUserGame, isPending: isAdding } = useAddUserGame();
  const { data: genres, isLoading: genresLoading, error: genresError } = useGenres();
  const router = useRouter();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setSelectedGenre(event.target.value as string);
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

  if (error) return <div>Error loading games</div>;
  if (genresError) return <div>Error loading genres</div>;

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Games
      </Typography>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box sx={{ width: '20%', pr: 2 }}>
          <GameFilters
            search={search}
            genre={selectedGenre}
            genres={genres}
            onSearchChange={handleSearchChange}
            onGenreChange={handleGenreChange}
          />
        </Box>
        <Box sx={{ width: '80%' }}>
          <Grid container spacing={4}>
            {(isAllGamesLoading || isUserGamesLoading) ? (
              Array.from(new Array(12)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton variant="rectangular" width={267} height={358} />
                  <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={30} />
                  </Box>
                </Grid>
              ))
            ) : (
              allGamesData?.data.map((game) => (
                <Grid item xs={12} sm={6} md={4} key={game.id}>
                  <GameCard
                    game={{
                      ...game,
                      description: game.description || "No description available",
                      imageUrl: game.imageUrl || '/game_images/default.webp'
                    }}
                    onAddGame={handleAddGame}
                    userGames={userGames || []}
                  />
                </Grid>
              ))
            )}
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
        </Box>
      </Box>
    </Container>
  );
};

export default GamesPage;