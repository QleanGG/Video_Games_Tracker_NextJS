const featuredGamesStyles = {
    sectionDark: {
      bgcolor: 'primary.dark',
      p: 4,
      textAlign: 'center' as const,
      width: '100vw',
      position: 'relative' as const,
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      overflow: 'hidden',
    },
    skeletonContainer: {
      display: 'block',
      textAlign: 'center' as const,
      gap: 16,
    },
    loadingContainer: {
      display: 'block',
      textAlign: 'center' as const,
      height: '100vh',
      lineHeight: '100vh', // Center vertically
    },
    errorContainer: {
      display: 'block',
      textAlign: 'center' as const,
      height: '100vh',
      lineHeight: '100vh', // Center vertically
    },
    noGamesContainer: {
      display: 'block',
      textAlign: 'center' as const,
      height: '100vh',
      lineHeight: '100vh', // Center vertically
    },
  };
  
  export default featuredGamesStyles;
  