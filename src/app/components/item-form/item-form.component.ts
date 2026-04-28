import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-item-form',
  template: `
    <form [formGroup]="miFormulario" (ngSubmit)="enviar()">
      <input type="text" formControlName="nombre" placeholder="Nombre del Item">
      
      <div *ngIf="miFormulario.get('nombre')?.hasError('prohibido')">
        <small style="color: red;">Este nombre no está permitido por el sistema.</small>
      </div>

      <input type="text" formControlName="categoria" placeholder="Categoría">
      <div *ngIf="miFormulario.get('categoria')?.hasError('required') && miFormulario.get('categoria')?.touched">
        <small style="color: red;">La categoría es obligatoria.</small>
      </div>

      <button type="submit" [disabled]="miFormulario.invalid">Agregar</button>
    </form>
  `
})
export class ItemFormComponent {
  // Punto 1: EventEmitter decorado con @Output
  @Output() itemAgregado = new EventEmitter<string>();

  miFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
    // Punto 4: Configuración de FormGroup con al menos 2 campos
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required, this.validadorPersonalizado('error')]], // Punto 7: Validación personalizada
      categoria: ['', Validators.required]
    });
  }

  // Punto 7: Validación personalizada y parametrizable
  validadorPersonalizado(nombreInvalido: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === nombreInvalido ? { prohibido: true } : null;
    };
  }

  enviar() {
    this.itemAgregado.emit(this.miFormulario.value.nombre);
    this.miFormulario.reset();
  }
}
