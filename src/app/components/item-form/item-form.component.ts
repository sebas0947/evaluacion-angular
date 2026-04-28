import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  template: `
    <form [formGroup]="miFormulario" (ngSubmit)="enviarDato()">
      
      <label>Nombre del Elemento:</label>
      <input type="text" formControlName="nombre" placeholder="Escribe un nombre...">
      
      <div *ngIf="miFormulario.get('nombre')?.hasError('prohibido')">
        <small style="color: red;">¡Error! Este nombre está restringido por validación personalizada.</small>
      </div>

      <label>Categoría:</label>
      <input type="text" formControlName="categoria" placeholder="Escribe la categoría...">
      
      <div *ngIf="miFormulario.get('categoria')?.hasError('required') && miFormulario.get('categoria')?.touched">
        <small style="color: red;">La categoría es obligatoria.</small>
      </div>

      <button type="submit" [disabled]="miFormulario.invalid">Enviar al Padre</button>
    </form>
  `
})
export class ItemFormComponent {
  // Punto 1: Uso de EventEmitter decorado con @Output
  @Output() eventoHijo = new EventEmitter<string>();

  miFormulario: FormGroup;

  // Punto 4: Uso de FormBuilder en el constructor para configurar el FormGroup con 2 campos
  constructor(private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      // Punto 7: Validación de 'requerido' + validación 'personalizada y parametrizable'
      nombre: ['', [Validators.required, this.miValidadorPersonalizado('error')]],
      categoria: ['', Validators.required]
    });
  }

  // Punto 7: Método de validación personalizada y parametrizable
  miValidadorPersonalizado(valorProhibido: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const esInvalido = control.value === valorProhibido;
      return esInvalido ? { prohibido: true } : null;
    };
  }

  enviarDato() {
    if (this.miFormulario.valid) {
      this.eventoHijo.emit(this.miFormulario.value.nombre);
      this.miFormulario.reset();
    }
  }
}
