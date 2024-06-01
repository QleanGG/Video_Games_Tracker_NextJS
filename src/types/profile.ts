import { Game } from './game';
import { Platform, PlatformName } from './platform';
import { UserGame } from './userGame';

export interface Profile {
	profile: Profile | PromiseLike<Profile>;
	id: number;
	bio: string;
	avatarUrl: string;
	favoriteGames: string;
	gamerTag: string;
	platforms: Platform[];
	mainPlatform: Platform;
}

export interface ProfileResponse {
	profile: Profile;
	games: UserGame[];
}
