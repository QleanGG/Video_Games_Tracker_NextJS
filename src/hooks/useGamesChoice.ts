//* This hook is for GameList, it will filter the data depending if it's a platforms page or games page

import { useAllGames } from './useAllGames';
import { useGamesByPlatform } from './useGamesByPlatform';

export const useGamesChoice = (
  platformName: string | undefined,
  page: number,
  limit: number,
  search: string,
  genre: string
) => {
  const allGames = useAllGames(page, limit, search, genre);
  const gamesByPlatform = useGamesByPlatform(platformName || '', page, limit, search);

  if (platformName) {
    return gamesByPlatform;
  }

  return allGames;
};
