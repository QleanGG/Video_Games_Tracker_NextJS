import { useQuery, UseQueryResult } from '@tanstack/react-query';
import mainApi from '@/api/apiAxios';
import { Platform } from '../types';

const fetchPlatforms = async (): Promise<Platform[]> => {
  const { data } = await mainApi.get<Platform[]>('/platforms');
  return data;
};

export const usePlatforms = (initialData?: Platform[]): UseQueryResult<Platform[], Error> => {
  return useQuery<Platform[], Error>({
    queryKey: ['platforms'],
    queryFn: fetchPlatforms,
    staleTime: 1000 * 60 * 5,
    initialData,
  });
};
