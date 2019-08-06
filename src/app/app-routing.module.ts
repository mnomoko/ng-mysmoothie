import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreationComponent} from './components/creation/creation.component';
import {PageNotFoundComponent} from './page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'smoothies' },
  { path: 'smoothies', loadChildren: './components/smoothies/smoothies.module#SmoothiesModule' },
  // { path: 'smoothies/:id', component: SmoothieEditComponent },
  { path: 'creations', component: CreationComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routableComponents = [
  CreationComponent,
  PageNotFoundComponent
];
