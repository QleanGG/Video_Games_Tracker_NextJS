import React from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia, Button, CardActions } from '@mui/material';
import { useFeaturedGames } from '../hooks/useFeaturedGames';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/styles';
import { Game } from '../types/game';

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
        {games.map((game: Game, index: number) => (
          <Card key={`${game.id}-${index}`} sx={styles.card}>
            <CardMedia>
              <Box sx={{ position: 'relative', width: '100%', height: 150 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${game.imageUrl}`}
                  alt={game.title}
                  width={250}
                  height={150}
                  style={{objectFit: "cover"}}
                  quality={100}
                  sizes="(max-width: 250px) 100vw, 50vw"
                />
              </Box>
            </CardMedia>
            <CardContent>
              <Typography variant="h6" color={"text.secondary"} sx={styles.truncatedText}>{game.title}</Typography>
              <Typography variant="body2" color="text.primary" >
                {/* {game.description} */}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Rating: {game.rating}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Platforms: {game.platforms.map(platform => platform.name).join(', ')}
              </Typography>
              <Typography variant="body2" color="text.primary">
                Genres: {game.genres.map(genre => genre.name).join(', ')}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Link href={`/games/${game.slug}`}>
                <Button variant='contained' color='primary' size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default FeaturedGames;
