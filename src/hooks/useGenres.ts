import { useQuery } from '@tanstack/react-query';
import mainApi from '@/api/apiAxios';

interface Genre {
    id: number;
    name: string;
  }

export const fetchGenres = async (): Promise<Genre[]> => {
	const { data } = await mainApi.get<Genre[]>('/genre');
	return data;
};

export const useGenres = () => {
	return useQuery<Genre[], Error>({
		queryKey: ['genre'],
		queryFn: fetchGenres,
	});
};
