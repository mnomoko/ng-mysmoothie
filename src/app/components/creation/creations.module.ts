import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SmoothieService } from '../../services/smoothie.service';
import {
  routedComponents,
  CreationsRoutingModule
} from './creations-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, CreationsRoutingModule],
  declarations: [routedComponents],
  providers: [SmoothieService]
})
export class CreationModule {}
