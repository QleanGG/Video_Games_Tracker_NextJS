import { Genre } from './genre';
import { Platform } from './platform';

export interface Game {
  id: number;
  title: string;
  description?: string;
  publisher?: string;
  developer: string;
  releaseDate?: string; // Use string type for date to keep it simple
  rating?: number;
  imageUrl?: string;
  platforms: Platform[];
  genres: Genre[];
}
