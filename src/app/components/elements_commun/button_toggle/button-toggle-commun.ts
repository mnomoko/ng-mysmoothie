import {ParamObject} from '../param-object';

export class ButtonToggleCommun extends ParamObject {
  items: BTCItem[];
  messageError: string;

  constructor(name: string, label: string, items: BTCItem[], messageError?: string) {
    super(name, label);
    this.items = items;
    this.messageError = messageError;
  }
}

export class BTCItem {
  label: string;
  value: string;

  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}
