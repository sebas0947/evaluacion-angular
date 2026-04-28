import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; // Importante para las rutas
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { itemsReducer } from './state/items.reducer';

// AQUÍ ESTÁ EL PUNTO 2:
// 1. Un path que emplea un 'redirect' (el primero)
// 2. Otro path que indica un 'component' (el segundo)
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // Punto 2: Se aplica la configuración
    StoreModule.forRoot({ items: itemsReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
