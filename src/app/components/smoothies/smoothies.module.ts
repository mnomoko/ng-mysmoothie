import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SmoothieService} from '../../services/smoothie.service';
import {routedComponents, SmoothiesRoutingModule} from './smoothies-routing.module';
import {FlexModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, SmoothiesRoutingModule, FlexModule, SharedModule ],
  declarations: [routedComponents],
  providers: [SmoothieService]
})
export class SmoothiesModule {}
