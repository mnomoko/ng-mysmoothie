import {MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule],
})
export class MaterialsModule { }
