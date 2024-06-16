import React from 'react';
import { useRouter } from 'next/router';
import ApiError from '@/components/ApiError';
import GameList from '@/components/Games/GameList';
import { useGenres } from '@/hooks/useGenres';
import { Skeleton, Box } from '@mui/material';

const PlatformGamesPage: React.FC = () => {
  const router = useRouter();
  const { platformName } = router.query;
  const { data: genres, isLoading: genresLoading, error: genresError} = useGenres();

  if (genresLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={200} />
      </Box>
    );
  }

  if (genresError) return <ApiError message="Error loading genres" />;

  return <GameList platformName={platformName as string} genres={genres || []} />;
};

export default PlatformGamesPage;
