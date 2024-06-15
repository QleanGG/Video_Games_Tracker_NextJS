import React from 'react';
import { useRouter } from 'next/router';
import GamesByPlatform from '@/components/platform/GamesByPlatform';

const PlatformGamesPage: React.FC = () => {
  const router = useRouter();
  const { platformName } = router.query;
  console.log(platformName)

  if (!platformName) {
    return <div>Loading...</div>;
  }

  return <GamesByPlatform platformName={platformName as string} />;
};

export default PlatformGamesPage;
