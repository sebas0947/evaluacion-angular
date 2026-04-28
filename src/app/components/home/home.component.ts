import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addItem, voteUp, voteDown, Item } from '../../state/items.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
    <section>
      <h2>Panel de Control</h2>
      
      <app-item-form (eventoHijo)="recibirNombre($event)"></app-item-form>
      
      <hr>

      <h3>Lista de Elementos</h3>
      <div *ngFor="let item of (items$ | async)" style="border: 1px solid #ccc; margin: 5px; padding: 10px;">
        <strong>{{ item.name }}</strong>
        
        <p>Votos actuales: {{ item.votes }}</p>
        <button (click)="votarPositivo(item.id)">+ Voto Positivo</button>
        <button (click)="votarNegativo(item.id)">- Voto Negativo</button>
      </div>
    </section>
  `
})
export class HomeComponent {
  items$: Observable<Item[]>;

  constructor(private store: Store<{ items: Item[] }>) {
    this.items$ = store.select('items');
  }

  // Punto 6: Método que recibe el evento emitido por el hijo
  recibirNombre(nombre: string) {
    this.store.dispatch(addItem({ name: nombre }));
  }

  // Punto 10: Despacho de acciones de Redux para votos
  votarPositivo(id: number) { this.store.dispatch(voteUp({ id })); }
  votarNegativo(id: number) { this.store.dispatch(voteDown({ id })); }
}
