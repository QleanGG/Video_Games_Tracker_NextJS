import React, { useState, MouseEvent } from 'react';
import { Box, Grid, Menu, MenuItem, Modal, Skeleton, Typography } from '@mui/material';
import { useDeleteUserGame } from '@/hooks/useUserGames';
import EditUserGame from './EditUserGame';
import { UserGame } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import Image from 'next/image';
import styles from '@/styles/styles';

interface GameGridProps {
  userGames: UserGame[];
  isLoading: boolean;
}

const GameGrid: React.FC<GameGridProps> = ({ userGames, isLoading }) => {
  const [editUserGameId, setEditUserGameId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedGame, setSelectedGame] = useState<UserGame | null>(null);
  const { mutate: deleteUserGame } = useDeleteUserGame();

  const handleDelete = (userGameId: number) => {
    deleteUserGame(userGameId, {
      onSuccess: () => {
        toast.success('Game deleted successfully');
      },
      onError: () => {
        toast.error('Failed to delete game');
      },
    });
  };

  const handleMenuOpen = (event: MouseEvent<HTMLElement>, userGame: UserGame) => {
    setAnchorEl(event.currentTarget);
    setSelectedGame(userGame);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedGame(null);
  };

  return (
    <Box sx={styles.dashboardContainer}>
      <Grid container spacing={1}>
        {isLoading
          ? Array.from(new Array(9)).map((_, index) => (
              <Grid item xs={4} sm={4} md={3} lg={4} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
            ))
          : userGames.map((userGame) => (
              <Grid item xs={4} sm={4} md={3} lg={4} key={userGame.id}>
                <Box
                  onClick={(event) => handleMenuOpen(event, userGame)}
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingBottom: '150%', 
                    cursor: 'pointer',
                    overflow: 'hidden',
                    border: '1px solid #ddd',
                    borderRadius: '14px',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s',
                    },
                  }}
                >
                  <Image
                    src={
                      userGame.game.imageUrl
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${userGame.game.imageUrl}`
                        : '/game_images/default.webp'
                    }
                    alt={userGame.game.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      textAlign: 'center',
                      p: 0.5,
                    }}
                  >
                    {userGame.game.title}
                  </Typography>
                </Box>
              </Grid>
            ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => setEditUserGameId(selectedGame!.id)}>
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedGame!.id)}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
      <Modal open={!!editUserGameId} onClose={() => setEditUserGameId(null)}>
        <Box sx={styles.modalContainer}>
          <EditUserGame userGameId={editUserGameId!} onClose={() => setEditUserGameId(null)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default GameGrid;
