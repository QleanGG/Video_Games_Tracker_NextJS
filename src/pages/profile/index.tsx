// pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Avatar, Grid, Paper, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/useUser';
import ProfileForm from '@/components/profile/ProfileForm';
import styles from '@/styles/styles';
import { useProfile } from '@/hooks/useProfile';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { useGlobalLogout } from '@/utils/authUtils';

const ProfilePage: React.FC = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const router = useRouter();
  const { data, isPending: profilePending } = useProfile(!!user);
  const [editMode, setEditMode] = useState(false);
  const { logout } = useGlobalLogout();

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/login');
    }
  }, [user, userLoading, router]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  if (profilePending || userLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
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
        <ProfileForm avatarUrl={data.profile.avatarUrl} onCancel={handleCancelEdit} />
      ) : (
        <Grid container spacing={3} sx={styles.profileGrid}>
          <Grid item xs={12} md={4}>
            <Paper sx={styles.profilePaper}>
              <ProfileAvatar avatarUrl={data.profile.avatarUrl}/>
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
              <Typography variant="body1">{data.profile.platforms? data.profile.platforms.map(platform => platform.name).join(', '): ''}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleEditClick} sx={{ width: '100%' }}>Edit Profile</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" onClick={logout} sx={{ width: '100%' }}>Logout</Button>
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
