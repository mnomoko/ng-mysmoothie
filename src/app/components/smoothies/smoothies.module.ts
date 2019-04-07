import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmoothieService } from '../../services/smoothie.service';
import {
  routedComponents,
  SmoothiesRoutingModule
} from './smoothies-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, SmoothiesRoutingModule],
  declarations: [routedComponents],
  providers: [SmoothieService]
})
export class SmoothiesModule {}
