import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmoothieListComponent } from './smoothie-list.component';
import { SmoothieComponent } from './smoothie.component';
import { SmoothiesComponent } from './smoothies.component';

const routes: Routes = [
  {
    path: '',
    component: SmoothiesComponent,
    children: [
      { path: '', component: SmoothieListComponent },
      { path: ':id', component: SmoothieComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmoothiesRoutingModule {}

export const routedComponents = [
  SmoothiesComponent,
  SmoothieListComponent,
  SmoothieComponent
];
