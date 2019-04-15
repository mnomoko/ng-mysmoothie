import {MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule],
  exports: [MatButtonModule, MatButtonToggleModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule, MatRadioModule, MatCardModule, MatDialogModule, MatProgressSpinnerModule],
})
export class MaterialsModule { }
