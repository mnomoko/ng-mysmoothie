import {ParamObject} from '../param-object';

export class SelectCommun extends ParamObject {
  items: any[];
  placeholder: string;
  messageError: string;

  constructor(name: string, label: string, items: any[], placeholder?: string, isRequire?: boolean, messageError?: string) {
    super(name, label);
    this.items = items;
    this.placeholder = placeholder;
    this.messageError = messageError;
  }
}
