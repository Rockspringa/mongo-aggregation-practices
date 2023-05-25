import { Chat } from './chat.interface';
import { Player } from './player.interface';

export interface Match {
  _id?: string;
  game: string;
  creator: string;
  createdAt: Date;
  gameTime?: number;
  state?: any;
  players: Player[];
  chat: Chat[];
}
