import { Component, EventEmitter, Output } from '@angular/core';
import { LetterState } from 'src/model/enums/letter-state.enum';
import { Hint } from 'src/model/interfaces/hint.interface';
import { Letter } from 'src/model/interfaces/letter.interface';

@Component({
  selector: 'app-crosswords-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent {
  gridCols = 'grid-cols-20';
  actualWord: number = 0;
  hints: Hint[] = [{ description: '', answered: false }];
  letters: (Letter | undefined)[] = Array(220).map((_) => undefined);
  state = LetterState.DEFAULT;

  @Output() changeState = new EventEmitter<any>();

  public get classes(): string[] {
    return ['grid', 'gap-1', 'm-2', this.gridCols];
  }

  public getLetter(letter: Letter | undefined) {
    return letter?.char || '';
  }

  public changeLetter(letterIndex: number, value: string) {
    if (!value) {
      this.letters[letterIndex] = undefined;
      return;
    }

    const indexes = new Set(this.letters[letterIndex]?.wordIndexes);
    indexes.add(this.actualWord);

    this.letters[letterIndex] = {
      char: value,
      state: LetterState.DEFAULT,
      actualChar: '',
      wordIndexes: [...indexes],
    };

    this.changeState.emit({ letters: this.letters, hints: this.hints });
  }
}
