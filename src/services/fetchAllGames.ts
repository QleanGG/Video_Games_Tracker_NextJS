import { Game } from '../types';
import axiosInstance from '../api/apiAxios';

interface QueryParams {
	page?: number;
	limit?: number;
	search?: string;
	genre?: string;
}

export const fetchAllGames = async (params: QueryParams = {}): Promise<{ data: Game[], total: number, page: number, limit: number }> => {
	const { data } = await axiosInstance.get('/games', { params });
	return data;
};
