import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-radio-commun',
  templateUrl: './radio-commun.component.html',
  styleUrls: ['./radio-commun.component.css']
})
export class RadioCommunComponent {
  @Input() parentForm: FormGroup;
  @Input() option: any;

  @Output() item = new EventEmitter();

  public radioClick(val) {
    this.item.emit(val);
  }
}
