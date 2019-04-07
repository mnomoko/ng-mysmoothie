import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreationComponent } from './creation.component';
import { CreationsComponent } from './creations.component';

const routes: Routes = [
  {
    path: '',
    component: CreationsComponent,
    children: [
      { path: '', component: CreationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreationsRoutingModule {}

export const routedComponents = [
  CreationsComponent,
  CreationComponent
];
