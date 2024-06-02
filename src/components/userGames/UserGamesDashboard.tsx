import React, { useState } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal } from '@mui/material';
import { useUserGames, useDeleteUserGame } from '@/hooks/useUserGames';
import AddUserGame from './AddUserGame';
import EditUserGame from './EditUserGame';
import { UserGame } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import styles from '@/styles/styles';

const UserGamesDashboard = () => {
  const { data: userGames, isLoading } = useUserGames();
  const { mutate: deleteUserGame } = useDeleteUserGame();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editUserGameId, setEditUserGameId] = useState<number | null>(null);

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

  return (
    <Box sx={styles.dashboardContainer}>
      {/* <Button variant="contained" sx={styles.addButton} onClick={() => setIsAddModalOpen(true)}>
        Add Game
      </Button> */}
      <List sx={{ mt: 2 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          userGames?.map((userGame) => (
            <ListItem key={userGame.id} sx={styles.listItem}>
              <ListItemText
                primary={userGame.game.title}
                secondary={`Status: ${userGame.status}, Rating: ${userGame.rating}`}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => setEditUserGameId(userGame.id)} sx={{ color: 'text.primary' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(userGame.id)} sx={{ color: 'text.primary' }}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        )}
      </List>
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box sx={styles.modalContainer}>
          <AddUserGame />
        </Box>
      </Modal>
      <Modal open={!!editUserGameId} onClose={() => setEditUserGameId(null)}>
        <Box sx={styles.modalContainer}>
          <EditUserGame userGameId={editUserGameId!} onClose={() => setEditUserGameId(null)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default UserGamesDashboard;
