import { useQuery } from '@tanstack/react-query';
import mainApi from '@/api/apiAxios';
import { User } from '@/types';


const fetchUser = async (): Promise<User> => {
	const { data } = await mainApi.get<User>('/auth/user');
	return data;
};

export const useUser = () => {

  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};