import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        p: 4,
        textAlign: 'center',
      }}
    >
      <Image 
        src="/404.png" 
        alt="404 Illustration" 
        width={300} 
        height={300} 
        style={{ marginBottom: '16px' }} 
      />
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Sorry, the page you are looking for does not exist or has been moved.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go Back Home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
