import { Game } from './game';
import { User } from './user';

export interface UserGame {
	id: number;
	status: GameStatus;
	review?: string | null;  
	rating?: number | null;  
	game: Game;
  }
  
export enum GameStatus {
	Interested = 'Interested',
	Own = 'Own',
	CurrentlyPlaying = 'Currently Playing',
	OnHold = 'On Hold',
	Dropped = 'Dropped',
	Finished = 'Finished',
	Completed = 'Completed',
}
