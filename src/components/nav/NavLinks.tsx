import React from 'react';
import { Box, Button, Link as MuiLink } from '@mui/material';
import NextLink from 'next/link';

const NavLinks = ({ mobile }: { mobile?: boolean }) => (
  <Box sx={{ ml: 2, display: mobile ? 'block' : 'flex', gap: mobile ? 0 : 2 }}>
    <NextLink href="/" passHref>
      <MuiLink component="button" underline="none">
        <Button sx={{ color: 'text.primary' }}>Home</Button>
      </MuiLink>
    </NextLink>
    <NextLink href="/about" passHref>
      <MuiLink component="button" underline="none">
        <Button sx={{ color: 'text.primary' }}>About Us</Button>
      </MuiLink>
    </NextLink>
    <NextLink href="/games" passHref>
      <MuiLink component="button" underline="none">
        <Button sx={{ color: 'text.primary' }}>Games</Button>
      </MuiLink>
    </NextLink>
    <NextLink href="/platforms" passHref>
      <MuiLink component="button" underline="none">
        <Button sx={{ color: 'text.primary' }}>Platforms</Button>
      </MuiLink>
    </NextLink>
  </Box>
);

export default NavLinks;