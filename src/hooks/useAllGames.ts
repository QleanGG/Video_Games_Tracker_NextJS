import { useQuery, UseQueryResult, keepPreviousData, QueryFunctionContext } from '@tanstack/react-query';
import { Game } from '../types';
import { fetchAllGames } from '../services/fetchAllGames';

interface QueryParams {
  page: number;
  limit: number;
  search: string;
  genre?: string;
}

const fetchGamesQuery = async ({ queryKey }: QueryFunctionContext<readonly [string, QueryParams]>): Promise<{ data: Game[], total: number, page: number, limit: number }> => {
  const [_key, { page, limit, search, genre }] = queryKey;
  return fetchAllGames({ page, limit, search, genre });
};

export const useAllGames = (
  page = 1,
  limit = 9,
  search = '',
  genre = ''
): UseQueryResult<{ data: Game[]; total: number; page: number; limit: number }, Error> => {
  return useQuery({
    queryKey: ['allGames', { page, limit, search, genre }] as const,
    queryFn: fetchGamesQuery,
    staleTime: 1000 * 60 * 5,
    placeholderData: {
      data: [],
      total: 0,
      page,
      limit,
    },
  });
};
