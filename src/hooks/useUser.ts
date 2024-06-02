import { useQuery } from '@tanstack/react-query';
import { User } from '@/types';
import mainApi from '@/api/apiAxios';

const fetchUser = async (): Promise<User> => {
  const { data } = await mainApi.get<User>('/auth/user');
  return data;
};

export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false, // To prevent refetching on window focus
  });
};