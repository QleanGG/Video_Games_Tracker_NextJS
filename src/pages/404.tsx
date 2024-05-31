import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1">404 - Page Not Found</Typography>
      <Typography variant="body1">Sorry, the page you are looking for does not exist.</Typography>
    </Box>
  );
};

export default NotFoundPage;
