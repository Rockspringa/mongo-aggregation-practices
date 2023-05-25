import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LetterState } from 'src/model/enums/letter-state.enum';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.css'],
})
export class LetterComponent {
  @Input() letter: string = '';
  @Input() disabled: boolean = false;
  @Input() state?: LetterState;
  @Input() wordIndexes?: number[];

  @Output() changed = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();

  gotChange(value: string) {
    const char = value
      .replace(this.letter || '', '')
      .charAt(0)
      .toUpperCase();

    this.letter = char;

    if (this.state === LetterState.CORRECT) {
      return;
    }
    this.changed.emit(char);
  }

  gotFocused() {
    this.focus.emit();
  }

  public get background() {
    if (this.state === undefined) {
      return ['input-ghost'];
    }
    switch (this.state) {
      case LetterState.SELECTED:
        return ['kbd', 'input-bordered', 'input-info'];
      case LetterState.CORRECT:
        return ['kbd', 'bg-accent'];
      case LetterState.ERROR:
        return ['kbd', 'input-bordered', 'input-error'];
      case LetterState.DEFAULT:
        return ['kbd', 'input-bordered'];
      default:
        return ['input-ghost'];
    }
  }

  public get classes() {
    return [
      'input',
      'text-center',
      'p-0',
      'rounded-lg',
      'w-0.5',
      'h-0.5',
      ...this.background,
    ];
  }
}
