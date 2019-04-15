import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-button-toggle-commun',
  templateUrl: './button-toggle-commun.component.html'
})
export class ButtonToggleCommunComponent {
  @Input() parentForm: FormGroup;
  @Input() option: any;

  @Output() item = new EventEmitter();

  public buttonToggleClick(val) {
    this.item.emit(val);
  }
}
