import React from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import { useFeaturedGames } from '../hooks/useFeaturedGames';
import Image from 'next/image';
import styles from '../styles/styles'; // Adjust the path as necessary
import { Game } from '../types/game'; // Import the Game type

const FeaturedGames: React.FC = () => {
  const { data: games, isLoading, error } = useFeaturedGames();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Error fetching featured games</Typography>;
  }

  if (!games || games.length === 0) {
    return <Typography>No featured games available</Typography>;
  }

  return (
    <Box sx={{ ...styles.sectionDark, overflow: 'hidden', position: 'relative', p: 2 }}>
      <Box sx={{ ...styles.marquee }}>
        {games.concat(games).map((game: Game, index: number) => (
          <Card key={`${game.id}-${index}`} sx={styles.card}>
            <CardMedia>
              <Box sx={{ position: 'relative', width: '100%', height: 150 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${game.imageUrl}`}
                  alt={game.title}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              </Box>
            </CardMedia>
            <CardContent>
              <Typography variant="h6">{game.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {game.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {game.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Platforms: {game.platforms.map(platform => platform.name).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Genres: {game.genres.map(genre => genre.name).join(', ')}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedGames;
