// pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Avatar, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser } from '@/contexts/UserContext';
import ProfileForm from '@/components/profile/ProfileForm';
import styles from '@/styles/styles';
import mainApi from '@/api/apiAxios';
import { useProfile } from '@/hooks/useProfile';

const ProfilePage: React.FC = () => {
  const { user, setUser, userLoading } = useUser();
  const router = useRouter();
  const { data, isPending: profilePending } = useProfile();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  const handleLogout = async () => {
    await mainApi.get('/auth/logout');
    setUser(null);
    router.push('/login');
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
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
    <Box sx={styles.fullPageContainer}>
      <Typography variant="h4" sx={styles.profileTitle}>Profile</Typography>
      {editMode ? (
        <ProfileForm onCancel={handleCancelEdit} />
      ) : (
        <Grid container spacing={3} sx={styles.profileGrid}>
          <Grid item xs={12} md={4}>
            <Paper sx={styles.profilePaper}>
              <Avatar src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${data.profile.avatarUrl}`} alt={user?.username || 'User'} sx={styles.profileAvatar} />
              <Typography variant="h5" sx={styles.profileUsername}>{user?.username}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={styles.profileBioPaper}>
              <Typography variant="h6">Bio</Typography>
              <Typography variant="body1">{data.profile.bio}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.profilePaper}>
              <Typography variant="h6">Favorite Games</Typography>
              <Typography variant="body1">{data.profile.favoriteGames}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.profilePaper}>
              <Typography variant="h6">Gamer Tag</Typography>
              <Typography variant="body1">{data.profile.gamerTag}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.profilePaper}>
              <Typography variant="h6">Main Platform</Typography>
              <Typography variant="body1">{data.profile.mainPlatform?.name}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={styles.profilePaper}>
              <Typography variant="h6">Platforms</Typography>
              <Typography variant="body1">{data.profile.platforms.map(platform => platform.name).join(', ')}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ width: '100%' }}>Edit Profile</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ width: '100%' }}>Logout</Button>
          </Grid>
        </Grid>
      )}
      <Box sx={{ mt: 4, width: '100%' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Your Games</Typography>
        {data.games.length > 0 ? (
          data.games.map((userGame) => (
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
    </Box>
  );
};

export default ProfilePage;
