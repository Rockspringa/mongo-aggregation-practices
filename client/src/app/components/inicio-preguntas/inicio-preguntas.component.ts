import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PreguntaService } from 'src/app/game-preguntas/services/pregunta.service';
import { Trivia } from 'src/app/game-preguntas/interfaces/pregunta.interface';

@Component({
  selector: 'app-inicio-preguntas',
  templateUrl: './inicio-preguntas.component.html',
  styleUrls: ['./inicio-preguntas.component.css']
})
export class InicioPreguntasComponent {
  constructor(private preguntaService: PreguntaService, private router: Router) {}
  
  triviasPublicas: any[] = [
    {
      titulo: 'Ciencia General',
      descripcion: 'Una trivia sobre conceptos científicos generales.'
    },
    {
      titulo: 'Historia Mundial',
      descripcion: 'Una trivia para poner a prueba tus conocimientos históricos.'
    },
    // Agrega más trivias públicas aquí
  ];

  puntajesAltos: any[] = [
    {
      nombre: 'Estuardo',
      puntaje: 100
    },
    {
      nombre: 'Lore2',
      puntaje: 70
    },
    {
      nombre: 'Fer123',
      puntaje: 66
    },
    {
      nombre: 'Jhon',
      puntaje: 50
    },
    
    
    // Agrega más puntajes altos aquí
  ];

  trivia!:Trivia;

  
  codigoAcceso!:string;



  // ingresarTrivia(){
  //   this.preguntaService.buscarTriviaPorcodigo(this.codigoAcceso)
  //   .subscribe(trivia => {
  //     this.trivia=trivia
  //     console.log(this.trivia)
  //   })
  
  // }

  

  ingresarTrivia() {
    this.preguntaService.buscarTriviaPorcodigo(this.codigoAcceso)
      .subscribe(
        trivia => {
          this.trivia = trivia;
          console.log(this.trivia);
          if (!trivia) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se encontró la trivia',
              timer: 2000,
              showConfirmButton: true
            });
          } else {
            this.router.navigate(['/pregunta', { trivia: JSON.stringify(this.trivia) }]);
          }
        },
        error => {
          // Manejar el error
        }
      );
  }
  

}
