import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import styles from '../styles/styles';

const HeroSection = () => {
  return (
    <Box sx={styles.heroSection}>
      <Typography variant="h2" align="center" sx={{ color: 'text.primary' }}>Welcome to Game Vault</Typography>
      <Typography variant="h5" align="center" sx={{ mt: 2, color: 'text.secondary' }}>Track your games and share your story</Typography>
      <Link href="/register" passHref>
        <Button variant="contained" color="primary" sx={{ mt: 4 }}>
          Get Started
        </Button>
      </Link>
    </Box>
  );
};

export default HeroSection;
