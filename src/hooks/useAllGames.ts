import {
	useQuery,
	QueryFunctionContext,
	UseQueryResult,
	keepPreviousData,
} from '@tanstack/react-query';
import { Game } from '../types';
import { fetchAllGames } from '../services/fetchAllGames';

interface QueryParams {
	page: number;
	limit: number;
	search: string;
	genre: string;
}

export const useAllGames = (
	page = 1,
	limit = 12,
	search = '',
	genre = ''
): UseQueryResult<{ data: Game[]; total: number; page: number; limit: number }, Error> => {
	return useQuery({
		queryKey: ['allGames', { page, limit, search, genre }] as const,
		queryFn: () => fetchAllGames({ page, limit, search, genre }),
		staleTime: 1000 * 60 * 5,
    placeholderData: {
      data: [],
      total: 0,
      page,
      limit,
    },
		select: (data) => {
			const filteredData = data.data.filter(
				(game) =>
					game.title.toLowerCase().includes(search.toLowerCase()) &&
					(genre === '' || game.genres.some((g) => g.name.toLowerCase() === genre.toLowerCase()))
			);
			return { ...data, data: filteredData };
		},
	});
};
