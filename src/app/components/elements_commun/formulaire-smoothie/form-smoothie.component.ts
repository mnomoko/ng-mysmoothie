import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fruit } from '../../../models/fruit';
import { Smoothie } from '../../../models/smoothie';
import { BTCItem, ButtonToggleCommun } from '../button_toggle/button-toggle-commun';
import { RadioCommun, RBItem } from '../radio/radio-commun';
import { SelectCommun } from '../select/select-commun';
import {getJuiceByCode, IJuice} from '../../../../commons/enums/juices';

@Component({
  selector: 'app-form-smoothie',
  templateUrl: './form-smoothie.component.html',
  styleUrls: ['./form-smoothie.component.css']
})
export class FormSmoothieComponent implements OnInit {
  @Input() smoothie: Smoothie;
  @Input() allFruits: Fruit[];
  @Input() jus: any[] = [];
  @Output() item = new EventEmitter();

  editionForm;
  isLoading: boolean;

  fruits: Fruit[] = [];
  options: Map<number, SelectCommun> = new Map<number, SelectCommun>();

  buttonToggle: ButtonToggleCommun;
  optionNbPersonne: RadioCommun;
  optionNbFruit: RadioCommun;
  optionJus: SelectCommun;

  nombreSelectionFruit: number[];

  ngOnInit() {
    this.isLoading = true;
    this.createForm();
    this.initView(this.allFruits, this.jus);
    this.isLoading = false;
  }

  private setFruitsSelection(data: Fruit[]) {
    this.fruits = data;
  }

  private setAndRefreshFruitList(data: Fruit[]) {
    this.setFruitsSelection(data);
    this.options.forEach(option => option.items = data);
  }

  /* TODO get list filtered to set on new selection fruit */
  public filterListByGout(event): Fruit[] {
    return event ? this.allFruits.filter((fruit) => fruit.gouts.includes(event.value)) : this.allFruits;
  }

  public filterListCareUnit(event) {
    this.setAndRefreshFruitList(event ? this.allFruits.filter((fruit) => fruit.gouts.includes(event.value)) : this.allFruits);
  }

  private createForm() {
    this.editionForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      typeFruit: new FormControl(null),
      nombrePersonne: new FormControl(null),
      nombreFruit: new FormControl(null),
      juice: new FormControl('', [Validators.required]),
      fruit0: new FormControl(null, [Validators.required]),
      fruit1: new FormControl(null, [Validators.required]),
      fruit2: new FormControl(null),
      fruit3: new FormControl(null),
      fruit4: new FormControl(null)
    });
  }

  private initTypeFruit() {
    const items: any[] = [{label: 'Acidulé', value: 'acide'}, {label: 'Amer', value: 'amer'}, {label: 'Sucre', value: 'sucre'}, {label: 'Salé', value: 'sale'}, ];
    const itemsBTC: BTCItem[] = items.map(e => new BTCItem(e.label, e.value));
    this.buttonToggle = new ButtonToggleCommun('typeFruit', 'Type de smoothie : ', itemsBTC);
  }

  private initNombrePersonne() {
    const items: number[] = [1, 2];
    const itemsRB: RBItem[] = items.map(e => new RBItem(`${e}`, e));
    this.optionNbPersonne = new ButtonToggleCommun('nombrePersonne', 'Nombre de personne : ', itemsRB);
  }

  private initNombreFruit() {
    const items: number[] = [1, 2, 3, 4, 5];
    const itemsRB: RBItem[] = items.map(e => new RBItem(`${e}`, e));
    this.optionNbFruit = new ButtonToggleCommun('nombreFruit', 'Nombre de fruit : ', itemsRB);
  }

  private initSelection(name: string, label: string, items: any[], placeholder?: string, messageError?: string): SelectCommun {
    return new SelectCommun(name, label, items, placeholder, true, messageError);
  }

  private addSelectionFruit(items: any[], id: number) {
    const option = this.initSelection(`fruit${id}`, 'Sélectionner un fruit : ', items, 'Sélectionner un fruit : ', 'Sélectionner un fruit : ');
    this.options.set(id, option);
  }

  private removeSelectionFruit(id: number) {
    this.options.delete(id);
  }

  private initSelectionFruit(items: any[], id: number) {
    const array = this.changeNumberToIntArray(id);
    array.forEach(e => {
      this.addSelectionFruit(items, e);
    });
  }

  private initSelectionJus(items: any[]) {
    this.optionJus = this.initSelection('juice', 'Sélectionner un jus : ', items, 'Sélectionner un jus : ', 'Sélectionner un jus : ');
  }

  private initView(fruits: Fruit[], juices: any[]) {
    this.initTypeFruit();
    this.initNombreFruit();
    this.initNombrePersonne();
    this.setDefaultValue(fruits, juices);
    this.initSelectionFruit(fruits, this.editionForm.value.nombreFruit);
    this.initSelectionJus(juices);
  }

  private setDefaultValue(fruitsArray: Fruit[], juices: IJuice[]) {
    const getSmoothieFruit = (fruit) => fruit ? fruit : null;
    const getSelected = (list, value, field) => list.find(e => value && e[field] === value[field]);
    if (this.smoothie && this.smoothie.id) {
      const { description, fruits, name } = this.smoothie;
      this.editionForm.patchValue({
        name: name,
        description: description,
        nombreFruit: (fruits.map(e => null != e)).length,
        juice: getSelected(juices, this.smoothie.jus, 'id'),
        fruit0: getSelected(fruitsArray, getSmoothieFruit(fruits[0]), 'id'),
        fruit1: getSelected(fruitsArray, getSmoothieFruit(fruits[1]), 'id'),
        fruit2: getSelected(fruitsArray, getSmoothieFruit(fruits[2]), 'id'),
        fruit3: getSelected(fruitsArray, getSmoothieFruit(fruits[3]), 'id'),
        fruit4: getSelected(fruitsArray, getSmoothieFruit(fruits[4]), 'id')
      });
      this.setNombreSelectionFruit((fruits.map(e => null != e)).length);
    } else {
      this.editionForm.patchValue({
        nombreFruit: DEFAULT_NOMBRE_FRUIT
      });
    }
  }

  private changeNumberToIntArray(value: number) {
    return Array(value).fill(undefined).map((x, i) => i);
  }

  private setNombreSelectionFruit(value: number) {
    this.nombreSelectionFruit = this.changeNumberToIntArray(value);
  }

  private refreshFruitsForm(size: number) {
    const optionLength = this.nombreSelectionFruit.length;

    if (size > optionLength) {
      for (let i = optionLength; i < size; i++) {
        this.editionForm.controls[`fruit${i}`].reset();
        this.editionForm.controls[`fruit${i}`].setValidators(Validators.required);
        this.editionForm.controls[`fruit${i}`].updateValueAndValidity();
        this.addSelectionFruit(this.allFruits, i);
      }
    } else {
      for (let i = size; i < optionLength; i++) {
        this.editionForm.controls[`fruit${i}`].clearValidators();
        this.editionForm.controls[`fruit${i}`].updateValueAndValidity();
        this.removeSelectionFruit(i);
      }
    }
  }

  public changeNbFruits(e: any) {
    const size: number = e.value;
    this.refreshFruitsForm(size);
    this.setNombreSelectionFruit(size);
  }

  public sendSmoothie() {
    const { description, fruit0, fruit1, fruit2, fruit3, fruit4, juice, name } = this.editionForm.value;
    const filteredFruits = (...fruits) => fruits.filter(e => null != e);
    const smoothieFruits = filteredFruits(fruit0, fruit1, fruit2, fruit3, fruit4);
    const smoothie = this.saveOrUpdateSmoothie(name, smoothieFruits, juice, description);

    this.item.emit(smoothie);
  }

  private saveOrUpdateSmoothie(name: string, fruits: Fruit[], juice: IJuice, description: string): Smoothie {
    let smoothie: Smoothie;
    if (this.smoothie && this.smoothie.id) {
      smoothie = this.smoothie;
      smoothie.name = name;
      smoothie.fruits = fruits;
      smoothie.jus = juice;
      smoothie.description = description;
    } else {
      smoothie = new Smoothie(name, fruits, juice, description);
    }
    return smoothie;
  }
}

const DEFAULT_NOMBRE_FRUIT = 2;
