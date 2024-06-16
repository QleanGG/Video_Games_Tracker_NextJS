import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Avatar, Grid, Paper, Skeleton, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/useUser';
import ProfileForm from '@/components/profile/ProfileForm';
import styles from '@/styles/styles';
import { useProfile } from '@/hooks/useProfile';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { useGlobalLogout } from '@/utils/authUtils';
import { useUserGames } from '@/hooks/useUserGames';
import GameGrid from '@/components/userGames/GameGrid';
import { UserGame, GameStatus } from '@/types';

const ProfilePage: React.FC = () => {
  const { data: user, isLoading: userLoading } = useUser();
  const router = useRouter();
  const { data, isPending: profilePending } = useProfile(!!user);
  const { data: userGames = [], isLoading: gamesLoading } = useUserGames();
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

  const filterByStatus = (status: GameStatus) => (games: UserGame[]) =>
    games.filter((game) => game.status === status);

  const statusSections = [
    { title: 'Completed', status: GameStatus.Completed },
    { title: 'Finished', status: GameStatus.Finished },
    { title: 'Currently Playing', status: GameStatus.CurrentlyPlaying },
  ];

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
      <Container sx={{ py: 2, mt: 4, width: '100%' }}>
        {statusSections.map(({ title, status }) => {
          const filteredGames = filterByStatus(status)(userGames);
          if (filteredGames.length === 0) return null;
          return (
            <Box key={status} sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  mb: 3,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  borderBottom: '2px solid #ddd',
                  pb: 1,
                }}
              >
                {title}
              </Typography>
              <GameGrid userGames={filteredGames} isLoading={gamesLoading} />
            </Box>
          );
        })}
      </Container>
    </Box>
  );
};

export default ProfilePage;
