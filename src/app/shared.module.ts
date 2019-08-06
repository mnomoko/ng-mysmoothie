import {NgModule} from '@angular/core';
import {FormSmoothieComponent} from './components/elements_commun/formulaire-smoothie/form-smoothie.component';
import {SmoothieCardComponent, SmoothieModalComponent} from './components/smoothies/smoothie-card.component';
import {ButtonToggleCommunComponent} from './components/elements_commun/button_toggle/button-toggle-commun.component';
import {MaterialsModule} from './materials-module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RadioCommunComponent} from './components/elements_commun/radio/radio-commun.component';
import {SelectCommunComponent} from './components/elements_commun/select/select-commun.component';
import {NavBarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [FormsModule, FlexLayoutModule, MaterialsModule, ReactiveFormsModule, RouterModule, CommonModule],
  declarations: [ ButtonToggleCommunComponent, FormSmoothieComponent, RadioCommunComponent, SelectCommunComponent, SmoothieCardComponent, NavBarComponent, SmoothieModalComponent ],
  exports: [ ButtonToggleCommunComponent, FormSmoothieComponent, SmoothieCardComponent, MaterialsModule, FlexLayoutModule, FormsModule, RadioCommunComponent, SelectCommunComponent, NavBarComponent, SmoothieModalComponent ]
})
export class SharedModule { }
