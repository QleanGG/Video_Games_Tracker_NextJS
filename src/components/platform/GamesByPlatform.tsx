// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { Box, Typography, Grid, Button, TextField, Container } from '@mui/material';
// import { useRouter } from 'next/router';
// import { useGamesByPlatform } from '@/hooks/useGamesByPlatform';
// import GameCardSkeleton from '@/components/cards/GameCardSkeleton';
// import GameCard from '@/components/cards/GameCard';
// import { toast } from 'react-toastify';
// import { useAddUserGame, useUserGames } from '@/hooks/useUserGames';
// import { platformMappings } from '@/mappings/platformMappings';
// import { GameStatus } from '@/types';
// import Link from 'next/link';
// import { useUser } from '@/hooks/useUser';

// interface GamesByPlatformProps {
//   platformName: string;
// }

// const GamesByPlatform: React.FC<GamesByPlatformProps> = ({ platformName }) => {
//   const router = useRouter();
//   const [page, setPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { data: user } = useUser();
//   const { data: userGames, isLoading: isUserGamesLoading } = useUserGames(!!user);

//   const validPlatformName = platformMappings[platformName.toLowerCase()];

//   const { data: gamesData, isLoading, error } = useGamesByPlatform(platformName, page, 9, searchQuery);
//   const { mutate: addUserGame } = useAddUserGame();

//   useEffect(() => {
//     if (error) {
//       toast.error('Error loading games. Please try again later.');
//     }
//   }, [error]);

//   const handleAddGame = (gameId: number) => {
//     if (!user) {
//       router.push('/login');
//       toast.info('Please log in to add games to your library');
//       return;
//     }
//     addUserGame({ gameId, status: GameStatus.Interested }, {
//       onSuccess: () => {
//         toast.success('Game added successfully');
//       },
//       onError: () => {
//         toast.error('Failed to add game');
//       }
//     });
//   };

//   const handleNextPage = () => {
//     setPage((prev) => prev + 1);
//   };

//   const handlePrevPage = () => {
//     if (page > 1) {
//       setPage((prev) => prev - 1);
//     }
//   };

//   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//     setPage(1);
//   };

//   if (!validPlatformName) {
//     return (
//       <Container>
//         <Box sx={{ p: 3, textAlign: 'center' }}>
//           <Typography variant="h4" color="error" sx={{ mb: 3 }}>
//             Invalid Platform
//           </Typography>
//           <Link href='/platforms' passHref>
//             <Button variant="contained" color="primary">Back to Platforms Page</Button>
//           </Link>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Games for {validPlatformName}
//       </Typography>
//       <Box mb={4}>
//         <TextField
//           fullWidth
//           label="Search games..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           variant="outlined"
//         />
//       </Box>
//       <Grid container spacing={4}>
//         {(isLoading || isUserGamesLoading) ? (
//           Array.from(new Array(9)).map((_, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <GameCardSkeleton />
//             </Grid>
//           ))
//         ) : (
//           gamesData?.data.map((game) => (
//             <Grid item xs={12} sm={6} md={4} key={game.id}>
//               <GameCard
//                 game={game}
//                 onAddGame={handleAddGame}
//                 userGames={userGames || []}
//               />
//             </Grid>
//           ))
//         )}
//       </Grid>
//       <Box mt={4} display="flex" justifyContent="center" alignItems="center">
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handlePrevPage}
//           disabled={page === 1}
//           sx={{ mx: 1 }}
//         >
//           Previous
//         </Button>
//         <Typography variant="body1" sx={{ mx: 2 }}>
//           Page {page}
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleNextPage}
//           disabled={!gamesData || !gamesData.data || gamesData.data.length < 9}
//           sx={{ mx: 1 }}
//         >
//           Next
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default GamesByPlatform;
