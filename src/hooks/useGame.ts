import { useQuery } from '@tanstack/react-query';
// import fetchGame from '../api/fetchGame';
import { Game } from '../types';
import axios from 'axios';
import axiosInstance from '@/api/apiAxios';

const fetchGame = async (slug: string): Promise<Game> => {
	const { data } = await axiosInstance.get<Game>(`/games/${slug}`);
	return data;
};

export const useGame = (slug: string) => {
	return useQuery<Game, Error>({
		queryKey: ['game', slug], // Query key
		queryFn: () => fetchGame(slug), // Query function
		enabled: !!slug, // Only run the query if the slug exists
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};
