import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, TextField, Button, CircularProgress, Avatar, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';
import { useUser } from '@/contexts/UserContext';
import styles from '@/styles/styles';
import { toast } from 'react-toastify';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { Profile, PlatformName, UserGame, Platform } from '@/types';
import mainApi from '@/api/apiAxios';

const ProfilePage = () => {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformName[]>([]);

  const { data, isPending: profilePending } = useProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  useEffect(() => {
    if (data && data.profile && Array.isArray(data.profile.platforms)) {
      const platformNames = data.profile.platforms.map((platform: Platform) => platform.name as PlatformName);
      setSelectedPlatforms(platformNames);
    }
  }, [data]);

  const handleUpdateProfile = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append('platforms', JSON.stringify(selectedPlatforms));
    console.log(formData);
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Profile updated successfully.');
      },
      onError: () => {
        toast.error('Failed to update profile.');
      },
    });
  };

  const handlePlatformChange = (event: SelectChangeEvent<PlatformName[]>) => {
    setSelectedPlatforms(event.target.value as PlatformName[]);
  };

  const handleLogout = async () => {
    await mainApi.get('/auth/logout');
    setUser(null);
    router.push('/login');
  };

  if (profilePending || userLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || !data.profile) {
    return null;
  }

  return (
    <Box sx={styles.profileContainer}>
      <Typography variant="h4" sx={styles.profileTitle}>Profile</Typography>
      <Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.profile.avatarUrl}`} alt={user?.username || 'User'} sx={{ width: 100, height: 100, mb: 3 }} />
      <Box component="form" onSubmit={handleUpdateProfile} sx={styles.formContainer}>
        <TextField
          label="Bio"
          name="bio"
          fullWidth
          margin="normal"
          defaultValue={data.profile.bio}
          sx={styles.formField}
        />
        <TextField
          label="Favorite Games"
          name="favoriteGames"
          fullWidth
          margin="normal"
          defaultValue={data.profile.favoriteGames}
          sx={styles.formField}
        />
        <TextField
          label="Gamer Tag"
          name="gamerTag"
          fullWidth
          margin="normal"
          defaultValue={data.profile.gamerTag}
          sx={styles.formField}
        />
        <FormControl fullWidth margin="normal" sx={styles.mainPlatformField}>
          <InputLabel>Main Platform</InputLabel>
          <Select
            label="Main Platform"
            name="mainPlatform"
            defaultValue={data.profile.mainPlatform?.name} // Adjusted
            sx={styles.formField}
          >
            <MenuItem value={PlatformName.PlayStation5} sx={styles.menuItem}>PlayStation 5</MenuItem>
            <MenuItem value={PlatformName.PC} sx={styles.menuItem}>PC</MenuItem>
            <MenuItem value={PlatformName.NintendoSwitch} sx={styles.menuItem}>Nintendo Switch</MenuItem>
            <MenuItem value={PlatformName.XboxSeriesX} sx={styles.menuItem}>Xbox Series X</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" sx={styles.formField}>
          <InputLabel>Platforms</InputLabel>
          <Select
            label="Platforms"
            multiple
            value={selectedPlatforms}
            onChange={handlePlatformChange}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {Object.values(PlatformName).map((platform) => (
              <MenuItem key={platform} value={platform} sx={styles.menuItem}>
                <Checkbox checked={selectedPlatforms.indexOf(platform) > -1} />
                <ListItemText primary={platform} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Avatar
          <input type="file" name="avatar" hidden />
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={styles.submitButton} disabled={updating}>
          {updating ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
        </Button>
      </Box>

      {/* Display User Games */}
      <Box sx={{ mt: 4, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Your Games</Typography>
        {data.games.length > 0 ? (
          data.games.map((userGame: UserGame) => (
            <Box key={userGame.id} sx={styles.userGameCard}>
              <Typography variant="h6">{userGame.game.title}</Typography>
              <Typography variant="body2">Status: {userGame.status}</Typography>
              <Typography variant="body2">Rating: {userGame.rating}</Typography>
              <Typography variant="body2">Review: {userGame.review}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">You have no games added.</Typography>
        )}
      </Box>

      <Button variant="contained" color="secondary" sx={{ mt: 4 }} onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default ProfilePage;
