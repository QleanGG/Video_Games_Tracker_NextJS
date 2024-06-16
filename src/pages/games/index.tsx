// pages/games/index.tsx
import React from 'react';
import { Container, Skeleton } from '@mui/material';
import { useGenres } from '@/hooks/useGenres';
import GameList from '@/components/Games/GameList';
import ApiError from '@/components/ApiError';

const GamesPage = () => {
  const { data: genres, isLoading: genresLoading, error: genresError } = useGenres();

  if (genresLoading) {
    return (
      <Container>
        <Skeleton variant="text" width="50%" height={40} />
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Container>
    );
  }

  if (genresError) {
    return <ApiError message="Error loading genres" />;
  }

  return (
    <Container>
      <GameList genres={genres || []} />
    </Container>
  );
};

export default GamesPage;
