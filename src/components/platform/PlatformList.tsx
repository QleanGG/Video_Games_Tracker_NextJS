import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, CardHeader, CardMedia } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { usePlatforms } from '@/hooks/usePlatforms';
import { Platform } from '@/types';
import { platformMappings } from '@/mappings/platformMappings';

const PlatformList: React.FC = () => {
	const { data: platforms, isLoading, error } = usePlatforms();

	if (isLoading) return <Typography>Loading...</Typography>;
	if (error) return <Typography>Error loading platforms</Typography>;

	if (!platforms || platforms.length === 0) {
		return <Typography>No platforms available</Typography>;
	}

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Platforms
			</Typography>
			<Grid container spacing={3}>
				{platforms.map((platform: Platform) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={platform.id}>
						<Card sx={{textAlign:'center'}}>
							<CardHeader title={platform.name} />
              <CardMedia>
              <Image
									src={`/platforms/${platform.name.toLowerCase().replace(/\s+/g, '_')}.webp`} // Adjust the path and filename accordingly
									alt={platform.name}
									width={267}
									height={200}
									objectFit="cover"
									quality={100}
									priority={true}
								/>
              </CardMedia>
							<CardContent>
								{/* <Typography variant="h6">{platform.name}</Typography> */}
								<Link
									href={`/platforms/${Object.keys(platformMappings).find(
										(key) => platformMappings[key] === platform.name
									)}/games`}
									passHref
								>
									<Button variant="contained" color="primary" sx={{ mt: 2 }}>
										View Games
									</Button>
								</Link>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default PlatformList;
