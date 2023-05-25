import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pregunta, Trivia } from '../interfaces/pregunta.interface';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  preguntas: any[] = [];
  apiUrl: any;
  // http: any;
  
  
  constructor(private http: HttpClient) { }
 
  agregarPregunta(pregunta: any): Observable<any> {
    this.preguntas.push(pregunta);
    console.log(this.preguntas.length);
    return of(pregunta);
  }

  agregarTrivia1(trivia:Trivia):Observable<Trivia>{
    return this.http.post<Trivia>('http://localhost:3001/trivia',trivia);

  }

  buscarTriviaPorcodigo(codigo: string): Observable<Trivia>{
    return this.http.get<Trivia>(`http://localhost:3001/trivia/codigo/${codigo}`);

  }

  agregarTrivia(trivia:Trivia){
    console.log(trivia);
  }


  obtenerPreguntas(): Observable<any[]> {
    return of(this.preguntas);
  }

  eliminarPregunta(index: number): Observable<any> {
    const preguntaEliminada = this.preguntas.splice(index, 1);
    return of(preguntaEliminada);
  }

  // guardarPregunta(pregunta: Pregunta): Observable<any> {
  //   const url = `${this.apiUrl}/preguntas`;
  //   return this.http.post(url, pregunta);
  // }

  // guardarTrivia(trivia: Trivia): Observable<any> {
  //   const url = `${this.apiUrl}/trivias`;
  //   return this.http.post(url, trivia);
  // }
  

  // matches(user:User, player: Player){
  //   match:Match={
  //     game: "preguntas",
  //     creator: "quien lo creo",
  //     player: player
  //   }
  // }

  
}
