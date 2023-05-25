import { Chat } from './chat';
import { Player } from './player';

export interface Matches {
    _id?: string;
    game: string;
    creator: string;
    createdAt: Date;
    gameTime?: number;
    players: Player[];
    chat: Chat[];
    state?: any;
}
