import React from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Skeleton } from '@mui/material';
import { useFeaturedGames } from '../hooks/useFeaturedGames';
import CarouselSlider from './animations/CarouselSlider';
import featuredGamesStyles from '../styles/featuredGamesStyles';
import { Game } from '../types/game';

const FeaturedGames: React.FC = () => {
  const { data: games, isLoading, error } = useFeaturedGames();

  if (isLoading) {
    return (
      <Box sx={featuredGamesStyles.loadingContainer}>
        <CircularProgress />
        <Box sx={featuredGamesStyles.skeletonContainer}>
          {[...Array(3)].map((_, index) => (
            <Card key={index} sx={{ margin: '0 8px', height: '350px', width: '250px' }}>
              <CardMedia>
                <Skeleton variant="rectangular" width="100%" height={150} />
              </CardMedia>
              <CardContent>
                <Skeleton width="80%" />
                <Skeleton width="60%" />
                <Skeleton width="40%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={featuredGamesStyles.errorContainer}>
        <Typography color="error">Error fetching featured games</Typography>
      </Box>
    );
  }

  if (!games || games.length === 0) {
    return (
      <Box sx={featuredGamesStyles.noGamesContainer}>
        <Typography>No featured games available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ ...featuredGamesStyles.sectionDark}}>
      <CarouselSlider games={games} />
    </Box>
  );
};

export default FeaturedGames;
