import { useQuery, QueryFunctionContext, UseQueryResult } from '@tanstack/react-query';
import mainApi from '@/api/apiAxios';
import { Game } from '../types';
import { toast } from 'react-toastify';

interface QueryParams {
  platformName: string;
  page: number;
  limit: number;
  search: string;
}

const fetchGamesByPlatform = async ({
  queryKey,
}: QueryFunctionContext<readonly [string, QueryParams]>): Promise<{ data: Game[], total: number, page: number, limit: number }> => {
  const [_key, { platformName, page, limit, search }] = queryKey;

  try {
    const { data } = await mainApi.get<{ data: Game[], total: number, page: number, limit: number }>(
      `/platforms/${platformName}/games`,
      {
        params: { page, limit, search },
      }
    );
    return data;
  } catch (error) {
    toast.error('Error fetching games by platform:');
    throw error;
  }
};

export const useGamesByPlatform = (
  platformName: string,
  page: number = 1,
  limit: number = 9,
  search: string = '',
  initialData?: { data: Game[], total: number, page: number, limit: number }
): UseQueryResult<{ data: Game[], total: number, page: number, limit: number }, Error> => {
  return useQuery({
    queryKey: ['gamesByPlatform', { platformName, page, limit, search }] as const,
    queryFn: fetchGamesByPlatform,
    enabled: !!platformName,
    staleTime: 1000 * 60 * 5,
    initialData,
  });
};
