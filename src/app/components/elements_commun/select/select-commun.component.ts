import {Component, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-select-commun',
  templateUrl: './select-commun.component.html'
})
export class SelectCommunComponent {
  @Input() parentForm: FormGroup;
  @Input() option: any;

  @Output() item: any;
}
