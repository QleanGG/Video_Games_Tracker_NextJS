import React from 'react';
import { Box, Typography, IconButton, Chip, Tooltip, styled } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Game, UserGame, GameStatus } from '@/types';

interface GameCardProps {
  game: Game;
  userGames?: UserGame[];
  onAddGame: (gameId: number) => void;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&.Mui-disabled': {
    color: 'white',
    backgroundColor: 'transparent',
  },
}));

const GameCard: React.FC<GameCardProps> = ({ game, userGames = [], onAddGame }) => {
  const router = useRouter();

  const handleNavigate = (slug: string) => {
    router.push(`/games/${slug}`);
  };

  const isGameAdded = userGames.some((userGame) => userGame.game.id === game.id);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => handleNavigate(game.slug)}>
        <Image
          src={
            game.imageUrl != null
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${game.imageUrl}`
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}/game_images/default.webp`
          }
          alt={game.title}
          width={267}
          height={358}
          priority={true}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
        <Typography
          variant="h6"
          component="h2"
          onClick={() => handleNavigate(game.slug)}
          sx={{ cursor: 'pointer' }}
        >
          {game.title}
        </Typography>
        <Tooltip title={isGameAdded ? "Already Added" : "Add Game"}>
          <span>
            <StyledIconButton
              color="primary"
              onClick={() => onAddGame(game.id)}
              disabled={isGameAdded}
            >
              {isGameAdded ? <CheckCircleOutlineIcon /> : <AddCircleOutlineIcon />}
            </StyledIconButton>
          </span>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
        {game.genres.map((genre) => (
          <Chip color="primary" key={genre.id} label={genre.name} />
        ))}
      </Box>
    </Box>
  );
};

export default GameCard;
