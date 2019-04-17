import {ParamObject} from '../param-object';

export class RadioCommun extends ParamObject {
  items: RBItem[];
  messageError: string;

  constructor(name: string, label: string, items: RBItem[], messageError?: string) {
    super(name, label);
    this.items = items;
    this.messageError = messageError;
  }
}

export class RBItem {
  label: string;
  value: any;

  constructor(label: string, value: any) {
    this.label = label;
    this.value = value;
  }
}
