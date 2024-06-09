import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Game } from '../types';
import mainApi from '@/api/apiAxios';

const fetchGame = async (slug: string): Promise<Game> => {
  const { data } = await mainApi.get<Game>(`/games/${slug}`);
  return data;
};

export const useGame = (slug: string, initialData?: Game): UseQueryResult<Game, Error> => {
  return useQuery<Game, Error>({
    queryKey: ['game', slug],
    queryFn: () => fetchGame(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    initialData,
  });
};
