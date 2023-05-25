import { LetterState } from '../enums/letter-state.enum';

export interface Letter {
  char: string;
  state: LetterState;
  wordIndexes: number[];
  actualChar: string;
}
