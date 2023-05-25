import { Letter } from './../../../../model/interfaces/letter.interface';
import { MatchesService } from '../../../services/matches/matches.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LetterState } from 'src/model/enums/letter-state.enum';
import { Hint } from 'src/model/interfaces/hint.interface';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  gridCols = 'grid-cols-20';
  actualLetter?: Letter;
  begin = new Date();

  @Input() id!: string;
  @Input() letters!: (Letter | undefined)[];
  @Input() hints!: Hint[];

  @Output() winned = new EventEmitter<number>();

  public get classes(): string[] {
    return ['grid', 'gap-1', 'm-2', this.gridCols];
  }

  public checkWords(actualLetter: Letter, value: string) {
    actualLetter.actualChar = value;

    const actualWords = actualLetter.wordIndexes.map(
      (actualWord) =>
        this.letters.filter((letter) =>
          letter?.wordIndexes.includes(actualWord)
        ) as Letter[]
    );

    for (let i = 0; i < actualWords.length; i++) {
      if (actualWords[i].some(({ actualChar }) => !actualChar)) {
        actualWords[i].forEach(
          (selected) => (selected.state = LetterState.SELECTED)
        );
        return;
      }

      if (actualWords[i].some(({ char, actualChar }) => char !== actualChar)) {
        actualWords[i].forEach(
          (selected) => (selected.state = LetterState.ERROR)
        );
        return;
      }

      this.hints[actualLetter.wordIndexes[i]].answered = true;
      actualWords[i].forEach(
        (selected) => (selected.state = LetterState.CORRECT)
      );
    }

    if (this.hints.every(({ answered }) => answered)) {
      const points = 10_000_000_000 / (+new Date() - +this.begin);
      this.winned.emit(points);
    }
  }

  public focusWord(actualLetter: Letter) {
    this.actualLetter = actualLetter;

    this.letters.forEach((letter) => {
      if (!letter || letter?.state === LetterState.CORRECT) {
        return;
      }
      if (
        letter.wordIndexes.some((wordIndex) =>
          actualLetter.wordIndexes.includes(wordIndex)
        )
      ) {
        letter.state = LetterState.SELECTED;
      } else {
        letter.state = LetterState.DEFAULT;
      }
    });
  }
}
