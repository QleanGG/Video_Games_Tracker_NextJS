import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/">
              <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Image src="/gameLogo.webp" alt="Game Vault Logo" width={40} height={40} priority={true}/>
              </Box>
            </Link>
            <Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
              <Link href="/">
                <Button sx={{ color: 'text.primary' }}>Home</Button>
              </Link>
              <Link href="/games">
                <Button sx={{ color: 'text.primary' }}>Games</Button>
              </Link>
              <Link href="/platforms" >
                <Button sx={{ color: 'text.primary' }}>Platforms</Button>
              </Link>
              <Link href="/profile">
                <Button sx={{ color: 'text.primary' }}>Profile</Button>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/login" >
              <Button sx={{ color: 'text.primary' }}>Login</Button>
            </Link>
            <Link href="/register" >
              <Button sx={{ color: 'text.primary' }}>Register</Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
