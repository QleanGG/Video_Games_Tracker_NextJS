// src/components/GameCard.tsx
import React from 'react';
import { Box, Typography, IconButton, Chip, Tooltip, styled } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Game, GameStatus, UserGame } from '@/types';
import { useAddUserGame } from '@/hooks/useUserGames';
import { toast } from 'react-toastify';

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

const GameCard: React.FC<GameCardProps> = ({ game, userGames = [] }) => {
  const router = useRouter();
  const { mutate: addUserGame } = useAddUserGame();

  const handleNavigate = (slug: string) => {
    router.push(`/games/${slug}`);
  };

  const handleAddGame = () => {
    addUserGame(
      { gameId: game.id, status: GameStatus.Interested},
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

  const isGameAdded = userGames.some((userGame) => userGame.game.id === game.id);

  return (
    <Box>
      <Box sx={{ cursor: 'pointer' }} onClick={() => handleNavigate(game.slug)}>
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
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
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
              onClick={handleAddGame}
              disabled={isGameAdded}
            >
              {isGameAdded ? <CheckCircleOutlineIcon /> : <AddCircleOutlineIcon />}
            </StyledIconButton>
          </span>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {game.genres.map((genre) => (
          <Chip color="primary" key={genre.id} label={genre.name} />
        ))}
      </Box>
    </Box>
  );
};

export default GameCard;
