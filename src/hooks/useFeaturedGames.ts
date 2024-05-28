import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Game } from '../types';
import axiosInstance from '../api/axios';

const fetchFeaturedGames = async (): Promise<Game[]> => {
  const { data } = await axiosInstance.get(`/games/featured`);
  return data;
};

export const useFeaturedGames = () => {
  return useQuery<Game[], Error>({
    queryKey: ['featuredGames'],
    queryFn: fetchFeaturedGames
  });
};