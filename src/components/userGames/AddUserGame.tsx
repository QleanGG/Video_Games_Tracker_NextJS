import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useAddUserGame } from '@/hooks/useUserGames';
import { GameStatus } from '@/types';
import { toast } from 'react-toastify';

const AddUserGame = () => {
  const [gameId, setGameId] = useState('');
  const [status, setStatus] = useState('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [review, setReview] = useState<string | undefined>(undefined);
  const { mutate: addUserGame, isPending } = useAddUserGame();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUserGame({ gameId: Number(gameId), status: status as GameStatus, rating, review }, {
      onSuccess: () => {
        toast.success('Game added successfully');
        setGameId('');
        setStatus('');
        setRating(undefined);
        setReview(undefined);
      },
      onError: () => {
        toast.error('Failed to add game');
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
        fullWidth
        margin="normal"
      />
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
      <TextField
        label="Rating"
        type="number"
        value={rating !== undefined ? rating : ''}
        onChange={(e) => setRating(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Review"
        value={review !== undefined ? review : ''}
        onChange={(e) => setReview(e.target.value || undefined)}
        fullWidth
        margin="normal"
        multiline
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isPending}>
        {isPending ? 'Adding...' : 'Add Game'}
      </Button>
    </Box>
  );
};

export default AddUserGame;
