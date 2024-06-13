import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import dynamic from 'next/dynamic';


const Nav = dynamic(() => import('./Nav'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box color={'text.primary'} sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 2 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
