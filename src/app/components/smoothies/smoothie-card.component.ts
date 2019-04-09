import {Component, Inject, Input, OnInit} from '@angular/core';
import {Smoothie} from '../../models/smoothie';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-smoothie-card',
  templateUrl: './smoothie-card.component.html',
  styleUrls: ['./smoothie.component.css'],
})
export class SmoothieCardComponent {
  @Input() smoothie: Smoothie;

  constructor(public dialog: MatDialog) {}

  public openDialog(smoothie) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = { smoothie };

    const dialogRef = this.dialog.open(SmoothieModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-smoothie-modal',
  templateUrl: 'smoothie-modal.html',
})
export class SmoothieModalComponent {
  smoothie: Smoothie;

  constructor(private dialogRef: MatDialogRef<SmoothieModalComponent>,
              @Inject(MAT_DIALOG_DATA) { smoothie }) {
    this.smoothie = smoothie;
  }
}
