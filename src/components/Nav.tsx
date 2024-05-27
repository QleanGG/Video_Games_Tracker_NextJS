import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'secondary.main' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" passHref>
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Image src="/game_logo.webp" alt="Game Vault Logo" width={40} height={40} />
              </Box>
            </Link>
            <Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
              <Link href="/" passHref>
                <Button sx={{ color: 'text.primary' }}>Home</Button>
              </Link>
              <Link href="/games" passHref>
                <Button sx={{ color: 'text.primary' }}>Games</Button>
              </Link>
              <Link href="/platforms" passHref>
                <Button sx={{ color: 'text.primary' }}>Platforms</Button>
              </Link>
              <Link href="/profile" passHref>
                <Button sx={{ color: 'text.primary' }}>Profile</Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/login" passHref>
              <Button sx={{ color: 'text.primary' }}>Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button sx={{ color: 'text.primary' }}>Register</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
