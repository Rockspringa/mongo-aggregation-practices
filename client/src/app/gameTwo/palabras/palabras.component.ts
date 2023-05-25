import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatchesService } from './../services/matches.service';

@Component({
  selector: 'app-palabras',
  templateUrl: './palabras.component.html',
  styleUrls: ['./palabras.component.css']
})
export class PalabrasComponent {
  matchForm: FormGroup;
  palabras: string[] = [];
  partidaCreada: any = null;
  mensajes: string[] = [];

  @Output() changeState = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {
    this.matchForm = this.formBuilder.group({
      state: ['']
    });
  }

  onSubmit() {
    if (this.matchForm.invalid) {
      return;
    }

    const palabrasConcatenadas = this.palabras.join(', ');
    this.changeState.emit(palabrasConcatenadas)
  }

  agregarPalabra(palabra: string) {
    const palabrasIngresadas = palabra.split(' ');
  
    if (palabrasIngresadas.length === 1) {
      const palabraValida = palabrasIngresadas[0].trim();
  
      if (palabraValida.length > 0) {
        this.palabras.push(palabraValida);
        this.matchForm.patchValue({ state: '' });
      } else {
        console.error('Error: Debe ingresar una palabra');
      }
    } else {
      console.error('Error: Solo se permite ingresar una palabra a la vez');
    }
  }
  
  
  convertToUpperCase(event: any) {
    const inputValue = event.target.value.toUpperCase();
    this.matchForm.get('state')?.setValue(inputValue);
  }
  
}
