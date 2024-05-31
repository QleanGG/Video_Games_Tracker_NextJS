// components/GameCard.tsx

import { Box, Typography, IconButton, Chip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Game } from '@/types';

interface GameCardProps {
    game: Game;
    onAddGame: (gameId: number) => void;
  }

const GameCard: React.FC<GameCardProps> = ({ game, onAddGame }) => {
	const router = useRouter();

	const handleNavigate = (slug: string) => {
		router.push(`/games/${slug}`);
	};

	return (
		<Box>
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
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				mt={1}
			>
				<Typography
					variant="h6"
					component="h2"
					onClick={() => handleNavigate(game.slug)}
					sx={{ cursor: 'pointer' }}
				>
					{game.title}
				</Typography>
				<IconButton color="primary" onClick={() => onAddGame(game.id)}>
					<AddCircleOutlineIcon />
				</IconButton>
			</Box>
			<Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            {game.genres.map((genre) => (
              <Chip color='primary' key={genre.id} label={genre.name} />
            ))}
          </Box>
		</Box>
	);
};

export default GameCard;
