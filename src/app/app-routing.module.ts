import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmoothieListComponent } from './components/smoothies/smoothie-list.component';
import { CreationComponent } from './components/creation/creation.component';
import { SmoothieComponent } from './components/smoothies/smoothie.component';
import { PageNotFoundComponent } from './page-not-found.component';
import {SmoothieEditComponent} from './components/smoothies/edit/smoothie-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'smoothies' },
  { path: 'smoothies', component: SmoothieListComponent },
  { path: 'smoothies/:id', component: SmoothieEditComponent },
  { path: 'creations', component: CreationComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routableComponents = [
  SmoothieListComponent,
  SmoothieComponent,
  SmoothieEditComponent,
  CreationComponent,
  PageNotFoundComponent
];
