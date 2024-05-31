// src/api/fetchGame.ts
import axios from 'axios';
import { Game } from '../types';

const fetchGame = async (slug: string): Promise<Game> => {
  const { data } = await axios.get<Game>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/games/slug/${slug}`);
  return data;
};

export default fetchGame;
