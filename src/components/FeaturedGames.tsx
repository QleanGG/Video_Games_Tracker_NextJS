import { Box, Container, Typography } from '@mui/material';
import styles from '../styles/styles';

const FeaturedGames = () => {
  return (
    <Box sx={styles.sectionDark}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ color: 'text.primary', textAlign: 'center' }}>Featured Games</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center', mt: 2 }}>List of featured games goes here...</Typography>
      </Container>
    </Box>
  );
};

export default FeaturedGames;
