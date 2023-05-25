import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-game-inicio',
  templateUrl: './game-inicio.component.html',
  styleUrls: ['./game-inicio.component.css']
})

export class GameInicioComponent implements OnInit {
  
  words: string[] = ['ROSAS', 'CASA', 'GATO', 'OSO'];
  letters: string[] = this.getUniqueLetters(this.words.join(''));
  selectedLetters: string[] = [];
  revealedLetters: string[][] = [];
  completedWords: string[] = [];
  showAlert: boolean = false;
  isWordValid: boolean = false;
  alertMessage: string = '';
  hintLetters: string[][] = [];
  startTime: Date = new Date();
//Jugadores  
  players: string[] = ['Fe12', 'Marco1']; // Array con los nombres de los jugadores
  currentPlayerIndex: number = 0; // Índice del jugador actual
  playerScores: number[] = [0, 0]; // Puntajes de los jugadores
//  Configuracion del tiempo
  timer: any;
  timeElapsed: number = 0;
  gameFinished: boolean = false;

  @Output() winned = new EventEmitter<number>();

 // constructor() {}
// constructor(private gameDataService: GameDataService) { }
constructor(private gameDataService: GameDataService, private router: Router) {}

 ngOnInit() {
    // Revelar las pistas de letras al inicio del juego
    for (const word of this.words) {
      this.revealWord(word);
    }
     // Iniciar el temporizador
  this.startTimer();
  }

  startTimer(): void {
    this.startTime = new Date();
    this.timer = setInterval(() => {
      this.timeElapsed = Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000);
    }, 1000);
  }
  
  stopTimer(): void {
    clearInterval(this.timer);
  }

  private getUniqueLetters(word: string): string[] {
    return Array.from(new Set(word.split('')));
  }

  selectLetter(letter: string): void {
    this.selectedLetters.push(letter);
  }

  removeSelectedLetter(index: number): void {
    this.selectedLetters.splice(index, 1);
  }

  formWord(): void {
    const formedWord = this.selectedLetters.join('');
    const currentPlayerIndex = this.currentPlayerIndex;
    const currentPlayerScore = this.playerScores[currentPlayerIndex];
  
    if (this.words.includes(formedWord)) {
      this.showAlert = true;
      this.isWordValid = true;
      this.alertMessage = '¡Palabra válida!';
      this.updateRevealedLetters(formedWord); // Actualizar las letras reveladas para la palabra completada
      this.completeWord(formedWord, currentPlayerIndex, currentPlayerScore + 10);
    } else {
      this.showAlert = true;
      this.isWordValid = false;
      this.alertMessage = 'Palabra inválida';
      this.completeWord(formedWord, currentPlayerIndex, currentPlayerScore - 3);
    }
    this.selectedLetters = []; // Limpiar las letras seleccionadas
  
    // Comprobar si todas las palabras han sido encontradas
    const foundWords = this.completedWords.filter(word => this.words.includes(word));
    if (foundWords.length === this.words.length) {
      const totalTime = this.getElapsedTime();
      const winnerIndex = this.getWinnerIndex();
      const winner = this.players[winnerIndex];
      const winnerScore = this.playerScores[winnerIndex];
      const winnerScores = this.gameDataService.playerScores[winnerIndex];
  
      console.log('¡Has encontrado todas las palabras en', totalTime, 'segundos!');
      console.log('El ganador es', winner, 'con', winnerScore, 'puntos.');

      this.winned.emit(winnerScore);
      this.gameFinished = true;
      alert(
        '¡Has encontrado todas las palabras en ' +
          totalTime +
          ' segundos!\n\n' +
          'El ganador es ' +
          winner +
          ' con ' +
          winnerScore +
          ' puntos.'
      );
      // Detener el temporizador
      this.stopTimer();
      // Guardar los datos en el servicio
      this.gameDataService.players = this.players;
      this.gameDataService.startTime = this.startTime;
      this.router.navigate(['/ranking']);
    } else {
      // Cambiar al siguiente jugador
      // this.moveToNextPlayer();
    }
  }
  
  moveToNextPlayer(): void {
   this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0; // Volver al primer jugador
    }

    const currentPlayer = this.players[this.currentPlayerIndex];
    alert('Turno del jugador: ' + currentPlayer);

  }  


  updateRevealedLetters(word: string): void {
    const wordIndex = this.words.indexOf(word);
    if (wordIndex !== -1) {
      const revealedLetters: string[] = [];
      for (let i = 0; i < word.length; i++) {
        if (this.selectedLetters.includes(word[i])) {
          revealedLetters.push(word[i]);
        } else {
          revealedLetters.push('');
        }
      }
      this.revealedLetters[wordIndex] = revealedLetters;
    }
  }

  completeWord(word: string, playerIndex: number, newScore: number): void {
    this.completedWords.push(word);
    this.playerScores[playerIndex] = newScore;
    this.gameDataService.playerScores[playerIndex] = newScore;

  }
  
  getWinnerIndex(): number {
    let maxScore = -Infinity;
    let winnerIndex = 0;
  
    for (let i = 0; i < this.playerScores.length; i++) {
      if (this.playerScores[i] > maxScore) {
        maxScore = this.playerScores[i];
        winnerIndex = i;
      }
    }
  
    return winnerIndex;
  }


  // Método para obtener el tiempo transcurrido en segundos
  revealWord(word: string): void {
    const revealedLetters: string[] = [];
    const hintLetters: string[] = [];
  
    // Generar una matriz de letras de pista para la palabra
    const randomIndices = this.getRandomIndices(word.length);
    for (let i = 0; i < word.length; i++) {
      if (randomIndices.includes(i)) {
        hintLetters[i] = word[i];
        revealedLetters.push(word[i]);
      } else {
        hintLetters[i] = '';
      }
    }
  
    this.revealedLetters.push(revealedLetters);
    this.hintLetters.push(hintLetters);
  }
  
  
  private getRandomIndices(length: number): number[] {
    const indices: number[] = [];
    while (indices.length < Math.floor(length / 2)) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  }
   
  isLetterRevealed(wordIndex: number, letterIndex: number): boolean {
    return (
      this.revealedLetters[wordIndex] &&
      this.revealedLetters[wordIndex].length > letterIndex
    );
  }

  getLetterDisplay(wordIndex: number, letterIndex: number): string {
    const word = this.words[wordIndex];
    const letter = word[letterIndex];
  
    if (this.isLetterRevealed(wordIndex, letterIndex)) {
      return letter;
    }
  
    const hintLetters = this.hintLetters[wordIndex];
    if (hintLetters && hintLetters[letterIndex]) {
      return hintLetters[letterIndex];
    }
  
    return '-';
  }
  
  isWordCompleted(wordIndex: number): boolean {
    const word = this.words[wordIndex];
    return this.completedWords.includes(word);
  }
//Para iniciar el tiempo del juego
  getElapsedTime(): number {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime.getTime() - this.startTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    return elapsedSeconds;
  }
  
}
