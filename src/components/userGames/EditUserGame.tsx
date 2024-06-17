import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useUpdateUserGame, useUserGames } from '@/hooks/useUserGames';
import { GameStatus, UserGame } from '@/types';
import { toast } from 'react-toastify';

interface EditUserGameProps {
  userGameId: number;
  onClose: () => void;
}

const EditUserGame: React.FC<EditUserGameProps> = ({ userGameId, onClose }) => {
  const { data: userGames } = useUserGames();
  const userGame = userGames?.find((game) => game.id === userGameId);
  const [status, setStatus] = useState(userGame?.status || '');
  const [rating, setRating] = useState<number | ''>(userGame?.rating || '');
  const [review, setReview] = useState<string | undefined>(userGame?.review || undefined);
  const { mutate: updateUserGame, isPending } = useUpdateUserGame();

  useEffect(() => {
    if (userGame) {
      setStatus(userGame.status);
      setRating(userGame.rating ?? '');
      setReview(userGame.review || '');
    }
  }, [userGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedRating = rating !== '' ? parseFloat(rating.toString()) : undefined;
    updateUserGame({ id: userGameId, gameId: userGame?.game.id!, status: status as GameStatus, rating: parsedRating, review }, {
      onSuccess: () => {
        toast.success('Game updated successfully');
        onClose();
      },
      onError: () => {
        toast.error('Failed to update game');
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          {Object.values(GameStatus).map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Rating"
          type="number"
          value={rating !== undefined ? rating : ''}
          onChange={(e) => setRating(e.target.value !== '' ? Number(e.target.value) : '')}
          fullWidth
        />
        <FormHelperText>Rating is 1-10</FormHelperText>
      </FormControl>
      <TextField
        label="Review"
        value={review !== undefined ? review : ''}
        onChange={(e) => setReview(e.target.value || undefined)}
        fullWidth
        margin="normal"
        multiline
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isPending}>
        {isPending ? 'Updating...' : 'Update Game'}
      </Button>
    </Box>
  );
};

export default EditUserGame;
