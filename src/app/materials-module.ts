import {MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule, MatDialogModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule, MatDialogModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule, MatDialogModule],
})
export class MaterialsModule { }
