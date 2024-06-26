import { useQuery, UseQueryResult } from '@tanstack/react-query';
import mainApi from '@/api/apiAxios';
import { User } from '@/types';
import axios from 'axios';


const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await mainApi.get<User>('/auth/user');
    if (response.status === 401) {
      return null
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }
    throw error; // Re-throw if it's not a 403 error
  }
};

export const useUser = (): UseQueryResult<User | null, Error> => {
  return useQuery<User | null, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};