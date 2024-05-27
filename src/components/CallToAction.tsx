/* eslint-disable react/no-unescaped-entities */
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/styles';

const CallToAction = () => {
  return (
    <Box sx={styles.sectionLight}>
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: 'text.primary', mb: 2 }}>Join Game Vault Today</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          Discover a world of gaming with Game Vault. Track your games, connect with friends, and stay up-to-date with the latest news.
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={styles.featureCard}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Track Your Games</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Keep a record of all the games you own, want to play, and have completed. Stay organized and never lose track of your progress.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={styles.featureCard}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Connect with Friends</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Share your gaming experiences with friends, see what they are playing, and find new gaming buddies.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={styles.featureCard}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Stay Updated</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Get the latest news, reviews, and updates about your favorite games and platforms directly on your dashboard.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Link href="/register" passHref>
            <Button variant="contained" color="secondary" sx={{ px: 4, py: 1.5 }}>
              Get Started
            </Button>
          </Link>
        </Box>
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>What Our Users Say</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            "Game Vault has transformed the way I track my gaming progress and connect with fellow gamers. It's a must-have tool for any serious gamer!" – Alex R.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CallToAction;
