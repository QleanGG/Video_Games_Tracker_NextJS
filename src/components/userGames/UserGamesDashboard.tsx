import React, { useState } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Modal } from '@mui/material';
import { useUserGames, useDeleteUserGame } from '@/hooks/useUserGames';
import AddUserGame from './AddUserGame';
import EditUserGame from './EditUserGame';
import { UserGame } from '@/types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

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

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
        Add Game
      </Button>
      <List sx={{ mt: 2 }}>
        {userGames?.map((userGame) => (
          <ListItem key={userGame.id}>
            <ListItemText
              primary={userGame.game.title}
              secondary={`Status: ${userGame.status}, Rating: ${userGame.rating}`}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => setEditUserGameId(userGame.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(userGame.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 1, maxWidth: 500, margin: 'auto', mt: 5 }}>
          <AddUserGame />
        </Box>
      </Modal>
      <Modal open={!!editUserGameId} onClose={() => setEditUserGameId(null)}>
        <Box sx={{ p: 3, backgroundColor: 'white', borderRadius: 1, maxWidth: 500, margin: 'auto', mt: 5 }}>
          <EditUserGame userGameId={editUserGameId!} onClose={() => setEditUserGameId(null)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default UserGamesDashboard;
