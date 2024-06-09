import { AppBar, Container, Skeleton, Toolbar } from '@mui/material';
import React from 'react'

const LoadingNav = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Skeleton variant="rectangular" width={40} height={40} />
                <Skeleton variant="text" width="70%" />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default LoadingNav