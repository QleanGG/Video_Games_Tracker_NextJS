import React from 'react';
import { Card, CardMedia, CardContent, Box, Skeleton } from '@mui/material';

const GameCardSkeleton: React.FC = () => (
  <Card>
    <CardMedia>
      <Skeleton variant="rectangular" width="100%" height={140} />
    </CardMedia>
    <CardContent>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </CardContent>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Skeleton variant="rectangular" width={100} height={36} />
    </Box>
  </Card>
);

export default GameCardSkeleton;
