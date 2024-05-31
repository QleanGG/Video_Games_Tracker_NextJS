import { useQuery, QueryFunctionContext, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { Game } from '../types';
import { fetchAllGames } from '../services/fetchAllGames';

interface QueryParams {
  page: number;
  limit: number;
  search: string;
}

const fetchGamesQuery = async ({ queryKey }: QueryFunctionContext<readonly [string, QueryParams]>): Promise<{ data: Game[], total: number, page: number, limit: number }> => {
  const [_key, { page, limit }] = queryKey;
  return fetchAllGames({ page, limit });
};

export const useAllGames = (page = 1, limit = 12, search = ''): UseQueryResult<{ data: Game[], total: number, page: number, limit: number }, Error> => {
  return useQuery({
    queryKey: ['allGames', { page, limit, search }] as const,
    queryFn: fetchGamesQuery,
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    select: (data) => {
      const filteredData = data.data.filter(game =>
        game.title.toLowerCase().includes(search.toLowerCase())
      );
      return { ...data, data: filteredData };
    }
  });
};
