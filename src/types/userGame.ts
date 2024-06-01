import { Game } from './game';
import { User } from './user';

export interface UserGame {
	id: number;
	user: User;
	game: Game;
	status: GameStatus;
	review: string;
	rating: number;
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
