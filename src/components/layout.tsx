import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import Nav from './Nav';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 2 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
