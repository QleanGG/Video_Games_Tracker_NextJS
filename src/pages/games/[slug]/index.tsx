import { GetStaticPaths, GetStaticProps } from 'next';
import { Game, GameStatus, UserGame } from '@/types'; 
import { Box, Typography, Chip, CircularProgress, Button, Grid, styled, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useGame } from '@/hooks/useGame';
import { useYouTubeVideos } from '@/hooks/useYoutubevideos';
import Image from 'next/image';
import { fetchAllGames } from '@/services/fetchAllGames'; // Adjust the import path as necessary
import axios from 'axios';
import YouTubeVideo from '@/components/YoutubeVideo';
import { useAddUserGame, useUserGames } from '@/hooks/useUserGames';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';

interface GameProps {
  initialGameData: Game;
}

const StyledButton = styled(Button)(({ theme }) => ({
	'&.Mui-disabled': {
	  color: '#A63446',
	},
  }));

const GamePage = ({ initialGameData }: GameProps) => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const { user, setUser, userLoading } = useUser();
  const { data: game, isLoading: isLoadingGame, error: gameError } = useGame(slug);
  const { data: userGames, isLoading: isUserGamesLoading } = useUserGames(!!user);
  const { mutate: addUserGame, isPending: isAdding } = useAddUserGame();
  const { data: videos, isLoading: isLoadingVideos, error: videoError } = useYouTubeVideos(game ? game.title : '');

  const handleAddGame = () => {
    if (game) {
      addUserGame(
        { gameId: game.id, status: GameStatus.Interested },
        {
          onSuccess: () => {
            toast.success('Game added successfully');
          },
          onError: () => {
            toast.error('Failed to add game');
          },
        }
      );
    }
  };

  const isGameAdded = userGames?.some((userGame: UserGame) => userGame.game.id === game?.id);


  if (isLoadingGame) {
    return <Skeleton />;
  }

  if (gameError) {
    return <Typography color="error">Error fetching game data</Typography>;
  }

  if (!game) {
    return <Typography>No game data available</Typography>;
  }

  const mainVideo = videos?.[0];
  const suggestedVideos = videos?.slice(1, 3);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', mb: 4 }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h4">{game.title}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {game.genres.map((genre) => (
              <Chip color='primary' key={genre.id} label={genre.name} />
            ))}
          </Box>
          <Typography sx={{ mt: 2 }}>{game.description}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Developer: {game.developer}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publisher: {game.publisher}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {game.releaseDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {game.rating}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {game.platforms.map((platform) => (
              <Chip key={platform.id} label={platform.name} />
            ))}
          </Box>
          <Box sx={{ mt: 4 }}>
          <StyledButton
              variant="contained"
              color="primary"
              onClick={handleAddGame}
              disabled={isGameAdded || isAdding}
            >
              {isGameAdded ? 'Added' : isAdding ? 'Adding...' : 'Add to Library'}
            </StyledButton>
          </Box>
        </Box>
        <Box sx={{ width: 300, height: 200, ml: 4 }}>
          <Image
            src={game.imageUrl ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${game.imageUrl}` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/game_images/default.webp`}
            alt={game.title}
            width={300}
            height={200}
            style={{ objectFit: 'contain' }}
            quality={100}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        {isLoadingVideos ? (
          <CircularProgress />
        ) : videoError ? (
          <Typography color="error">Error fetching videos</Typography>
        ) : (
          mainVideo && (
            <YouTubeVideo
              key={mainVideo.id.videoId}
              videoId={mainVideo.id.videoId}
              title={mainVideo.snippet.title}
            />
          )
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Suggested Videos</Typography>
        {isLoadingVideos ? (
          <CircularProgress />
        ) : videoError ? (
          <Typography color="error">Error fetching videos</Typography>
        ) : (
          <Box sx={{ display: 'flex', gap: 10 }}>
            {suggestedVideos?.map((video) => (
              <Box key={video.id.videoId} sx={{ width: '50%' }}>
                <YouTubeVideo
                  videoId={video.id.videoId}
                  title={video.snippet.title}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchAllGames();

  const paths = data.map((game) => ({
    params: { slug: game.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    const { data } = await axios.get<Game>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/games/${slug}`);
    return {
      props: { initialGameData: data },
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    } else {
      throw error;
    }
  }
};

export default GamePage;