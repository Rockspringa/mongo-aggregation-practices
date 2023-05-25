import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-game-sopa',
  templateUrl: './game-sopa.component.html',
  styleUrls: ['./game-sopa.component.css']
})
export class GameSopaComponent {
  size = 10; // Tamaño del tablero
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Alfabeto para generar letras aleatorias
  letters: string[][] = [];
//  @Input() wordsToFind: string[] = [];
  //Arreglo que tiene las palabras
  wordsToFind: string[] = ['DOG', 'CAT', 'SOFTWARE'];
  selectedLetters: { row: number, col: number }[] = [];
  foundWords: string[] = []; // Palabras encontradas
  gameFinished = false;
  selectedWord: string = '';

  //Variables para el tiempo
  timeElapsed = 0; // Tiempo transcurrido en segundos
  timerInterval: any; // Variable para almacenar el intervalo del temporizador
  
  @Output() winned = new EventEmitter<number>();
  
  constructor() {}
  
  ngOnInit(): void {
    this.generateBoard();
    this.startTimer();
  }
  
//-----------------------------------------VARIABLES DEL TIEMPO
startTimer(): void {
  this.timerInterval = setInterval(() => {
    this.timeElapsed++;
  }, 1000);
}

stopTimer(): void {
  clearInterval(this.timerInterval);
}

formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
}

padTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

//-------------------------------------LOGIA DEL Tablero

  generateBoard(): void {
    this.letters = [];
  
    // Generar una matriz vacía
    for (let i = 0; i < this.size; i++) {
      const row: string[] = [];
      for (let j = 0; j < this.size; j++) {
        row.push('');
      }
      this.letters.push(row);
    }
  
    // Colocar las palabras en el tablero
    for (const word of this.wordsToFind) {
      let placed = false;
      while (!placed) {
        const direction = Math.floor(Math.random() * 8); // Dirección aleatoria para colocar la palabra
        const startRow = Math.floor(Math.random() * this.size); // Fila inicial aleatoria
        const startCol = Math.floor(Math.random() * this.size); // Columna inicial aleatoria
  
        placed = this.placeWord(word, direction, startRow, startCol);
      }
    }
  
    // Rellenar espacios vacíos con letras aleatorias
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.letters[i][j] === '') {
          const randomIndex = Math.floor(Math.random() * this.alphabet.length);
          const randomLetter = this.alphabet.charAt(randomIndex);
          this.letters[i][j] = randomLetter;
        }
      }
    }
  }
  
  placeWord(word: string, direction: number, startRow: number, startCol: number): boolean {
    const wordLength = word.length;
    const endRow = startRow + this.getRowIncrement(direction) * (wordLength - 1);
    const endCol = startCol + this.getColIncrement(direction) * (wordLength - 1);
  
    // Verificar si la palabra se ajusta dentro del tablero
    if (
      endRow >= 0 && endRow < this.size &&
      endCol >= 0 && endCol < this.size
    ) {
      // Verificar si las casillas están vacías o contienen la misma letra que la palabra
      let validPlacement = true;
      for (let i = 0; i < wordLength; i++) {
        const row = startRow + i * this.getRowIncrement(direction);
        const col = startCol + i * this.getColIncrement(direction);
        const letter = this.letters[row][col];
  
        if (letter !== '' && letter !== word.charAt(i)) {
          validPlacement = false;
          break;
        }
      }
  
      // Colocar la palabra en el tablero si la ubicación es válida
      if (validPlacement) {
        for (let i = 0; i < wordLength; i++) {
          const row = startRow + i * this.getRowIncrement(direction);
          const col = startCol + i * this.getColIncrement(direction);
          this.letters[row][col] = word.charAt(i);
        }
        return true;
      }
    }
  
    return false;
  }
  
  getRowIncrement(direction: number): number {
    // Direcciones verticales: arriba, abajo
    if (direction === 0 || direction === 1 || direction === 7) {
      return -1;
    } else if (direction === 3 || direction === 4 || direction === 5) {
      return 1;
    } else {
      return 0;
    }
  }
  
  getColIncrement(direction: number): number {
    // Direcciones horizontales: izquierda, derecha
    if (direction === 1 || direction === 2 || direction === 3) {
      return -1;
    } else if (direction === 5 || direction === 6 || direction === 7) {
      return 1;
    } else {
      return 0;
    }
  }

 //----------------------------------------------------------------Logica del la seleccion de palabras 
  selectLetter(rowIndex: number, colIndex: number): void {
    const letterAlreadySelected = this.selectedLetters.some(
      (letter) => letter.row === rowIndex && letter.col === colIndex
    );
  
    if (letterAlreadySelected) {
      this.selectedLetters = this.selectedLetters.filter(
        (letter) => !(letter.row === rowIndex && letter.col === colIndex)
      );
    } else {
      this.selectedLetters.push({ row: rowIndex, col: colIndex });
    }
  
    // Actualizar la palabra seleccionada actualmente
    this.selectedWord = this.findWordFromLetters();
  
    // Verificar si se ha seleccionado una palabra completa
    if (this.selectedWord && this.selectedLetters.length === this.selectedWord.length) {
      console.log("Has encontrado una palabra");
      if (this.isWordFound(this.selectedWord)) {

      }
    }
  
    // Verificar si se han encontrado todas las palabras
    this.checkSelectedWords();
  }
  
  findWordFromLetters(): string {
    let word = '';
    const sortedLetters = this.selectedLetters.sort((a, b) => a.row - b.row || a.col - b.col);
  
    for (const letter of sortedLetters) {
      word += this.letters[letter.row][letter.col];
    }
  
    return word;
  }
  
  checkSelectedWords(): void {
    const selectedWords: string[] = [];
  
    for (const word of this.wordsToFind) {
      if (this.isWordFound(word.toUpperCase())) {
        selectedWords.push(word);
      }
    }
  
    // Reconstruir la lista de palabras encontradas basada en las letras seleccionadas
    this.foundWords = [];
    for (const letter of this.selectedLetters) {
      const word = this.findWordFromLetter(letter.row, letter.col);
      if (word && !this.foundWords.includes(word)) {
        this.foundWords.push(word);
      }
    }
  
    // Verificar si se ha encontrado la palabra seleccionada completamente
    const selectedWordFound = this.foundWords.includes(this.selectedWord);
  
    // Verificar si se han encontrado todas las palabras
    const lowercaseWordsToFind = this.wordsToFind.map(word => word.toLowerCase());
    const lowercaseFoundWords = this.foundWords.map(word => word.toLowerCase());
    const allWordsFound = lowercaseWordsToFind.every(word => lowercaseFoundWords.includes(word));
  
    if (allWordsFound) {
      this.gameFinished = true;
      this.stopTimer();
      const finalTime = this.formatTime(this.timeElapsed);
      this.winned.emit(10_000_000_000 / this.timeElapsed);
      console.log("Has encontrado todas las palabras");
//      alert('Has encontrado todas las palabras');
      alert(`¡Has encontrado todas las palabras!\nTiempo final: ${finalTime}`);
    } else if (selectedWordFound) {
      console.log("Has encontrado una palabra");
      // Mostrar la palabra encontrada solo si se han seleccionado todas las letras
      if (this.selectedWord.length === selectedWords.find(word => word === this.selectedWord)?.length) {
      //  alert(`Has encontrado la palabra: ${this.selectedWord}`);
      }
    }
  }
  
  findWordFromLetter(row: number, col: number): string | null {
    const directions = [
      [0, 1],   // Derecha
      [0, -1],  // Izquierda
      [1, 0],   // Abajo
      [-1, 0],  // Arriba
      [1, 1],   // Abajo-Derecha
      [1, -1],  // Abajo-Izquierda
      [-1, 1],  // Arriba-Derecha
      [-1, -1]  // Arriba-Izquierda
    ];
  
    for (const [rowIncrement, colIncrement] of directions) {
      const word = this.searchWordInDirection(row, col, rowIncrement, colIncrement);
      if (word) {
        return word;
      }
    }
  
    return null;
  }
  
  searchWordInDirection(row: number, col: number, rowIncrement: number, colIncrement: number): string | null {
    let word = '';
    let newRow = row;
    let newCol = col;
  
    while (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size) {
      word += this.letters[newRow][newCol];
  
      if (this.isWord(word)) {
        return word;
      }
  
      newRow += rowIncrement;
      newCol += colIncrement;
    }
  
    return null;
  }
  
  isWord(word: string): boolean {
    const lowercaseWord = word.toLowerCase();
    return this.wordsToFind.map(w => w.toLowerCase()).includes(lowercaseWord);
  }
  
  findWord(word: string): string | null {
    const wordLength = word.length;
  
    for (let rowIndex = 0; rowIndex < this.size; rowIndex++) {
      for (let colIndex = 0; colIndex < this.size; colIndex++) {
        if (this.searchWordInDirection(rowIndex, colIndex, 0, 1) === word) {
          return word;
        }
        if (this.searchWordInDirection(rowIndex, colIndex, 1, 0) === word) {
          return word;
        }
        if (this.searchWordInDirection(rowIndex, colIndex, 1, 1) === word) {
          return word;
        }
        if (this.searchWordInDirection(rowIndex, colIndex, -1, 1) === word) {
          return word;
        }
      }
    }
  
    return null;
  }
  
  searchInDirection(
    word: string,
    startRow: number,
    startCol: number,
    rowIncrement: number,
    colIncrement: number,
    wordLength: number
  ): boolean {
    if (
      startRow + rowIncrement * (wordLength - 1) >= 0 &&
      startRow + rowIncrement * (wordLength - 1) < this.size &&
      startCol + colIncrement * (wordLength - 1) >= 0 &&
      startCol + colIncrement * (wordLength - 1) < this.size
    ) {
      let foundWord = '';
  
      for (let i = 0; i < wordLength; i++) {
        const row = startRow + i * rowIncrement;
        const col = startCol + i * colIncrement;
  
        foundWord += this.letters[row][col];
      }
  
      if (foundWord.toUpperCase() === word.toUpperCase()) {
        return true;
      }
    }
  
    return false;
  }
  
  isSelected(rowIndex: number, colIndex: number): boolean {
    return this.selectedLetters.some(letter => letter.row === rowIndex && letter.col === colIndex);
  }
  
  isWordFound(word: string): boolean {
    return this.foundWords.includes(word.toUpperCase());
  }
  
}
