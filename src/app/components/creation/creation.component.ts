import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SmoothieService } from '../../services/smoothie.service';
import { FruitService } from '../../services/fruit.service';
import {Fruit} from '../../models/fruit';
import {Smoothie} from '../../models/smoothie';
import {getJuice, getJuices, Juice} from '../../../commons/enums/juices';
import {BTCItem, ButtonToggleCommun} from '../elements_commun/button_toggle/button-toggle-commun';
import {RadioCommun, RBItem} from '../elements_commun/radio/radio-commun';
import {SelectCommun} from '../elements_commun/select/select-commun';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  @Input() smoothie: Smoothie;

  creationForm;
  isLoading: boolean = false;

  jus: any[] = [];
  allFruits: Fruit[] = [];
  fruits: Fruit[] = [];

  buttonToggle: ButtonToggleCommun;
  optionNbPersonne: RadioCommun;
  optionNbFruit: RadioCommun;
  option: SelectCommun;
  optionJus: SelectCommun;

  nombreSelectionFruit: number;

  constructor(private router: Router, private smoothieService: SmoothieService, private fruitService: FruitService) {
    this.createForm();
  }

  ngOnInit() {
    this.setNombreSelectionFruit(DEFAULT_NOMBRE_FRUIT);

    this.jus = this.getJuices();
    this.getFruits();
    this.createForm();
    this.setDefaultValue();
  }

  private getJuices() {
    return getJuices().map(k => getJuice(k));
  }

  private getFruits() {
    this.isLoading = true;
    this.fruitService.getFruits().subscribe(fruits => {
      this.isLoading = false;
      this.allFruits = fruits;
      this.initView(fruits, this.jus);
    });
  }

  public setFruitsSelection(data: Fruit[]) {
    this.fruits = data;
  }

  public setAndRefreshFruitList(data: Fruit[]) {
    this.setFruitsSelection(data);
    this.option.items = data;
  }

  public postSmoothie(smoothie) {
    this.smoothieService
      .postSmoothie(smoothie)
      .subscribe(() => this.gotoSmoothies());
  }

  private gotoSmoothies() {
    const route = ['/smoothies'];
    this.router.navigate(route);
  }

  private setEditSmoothie(smoothie: Smoothie) {
    if (smoothie) {
      this.smoothie = smoothie;
    } else {
      this.gotoSmoothies();
    }
  }

  public filterListCareUnit(event) {
    this.setAndRefreshFruitList(event ? this.allFruits.filter((fruit) => fruit.gouts.includes(event.value)) : this.allFruits);
  }

  private createForm() {
    this.creationForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      typeFruit: new FormControl(null),
      nombrePersonne: new FormControl(null),
      nombreFruit: new FormControl(null),
      juice: new FormControl('', [Validators.required]),
      fruit: new FormControl('', [Validators.required])
    });
  }

  private initTypeFruit() {
    const itemsBTC: BTCItem[] = [];
    itemsBTC.push(new BTCItem('Acidulé', 'acide'));
    itemsBTC.push(new BTCItem('Amer', 'amer'));
    itemsBTC.push(new BTCItem('Sucré', 'sucre'));
    itemsBTC.push(new BTCItem('Salé', 'sale'));
    this.buttonToggle = new ButtonToggleCommun('typeFruit', 'Type de smoothie : ', itemsBTC);
  }

  private initNombrePersonne() {
    const itemsRB: RBItem[] = [];
    itemsRB.push(new RBItem('1', 1));
    itemsRB.push(new RBItem('2', 2));
    this.optionNbPersonne = new ButtonToggleCommun('nombrePersonne', 'Nombre de personne : ', itemsRB);
  }

  private initNombreFruit() {
    const itemsRB: RBItem[] = [];
    itemsRB.push(new RBItem('1', 1));
    itemsRB.push(new RBItem('2', 2));
    itemsRB.push(new RBItem('3', 3));
    itemsRB.push(new RBItem('4', 4));
    itemsRB.push(new RBItem('5', 5));
    this.optionNbFruit = new ButtonToggleCommun('nombreFruit', 'Nombre de fruit : ', itemsRB);
  }

  private initSelection(name: string, label: string, items: any[], placeholder?: string, messageError?: string): SelectCommun {
    return new SelectCommun(name, label, items, placeholder, messageError);
  }

  private initSelectionFruit(items: any) {
    this.option = this.initSelection('fruit', 'Sélectionner un fruit : ', items, 'Sélectionner un fruit : ', 'Sélectionner un fruit : ');
  }

  private initSelectionJus(items: any[]) {
    this.optionJus = this.initSelection('juice', 'Sélectionner un jus : ', items, 'Sélectionner un jus : ', 'Sélectionner un jus : ');
  }

  private initView(fruits: Fruit[], juices: any[]) {
    this.initTypeFruit();
    this.initNombreFruit();
    this.initNombrePersonne();
    this.initSelectionFruit(fruits);
    this.initSelectionJus(juices);
  }

  private setDefaultValue() {
    this.creationForm.patchValue({
      nombreFruit: DEFAULT_NOMBRE_FRUIT
    });
  }

  private changeNumberToIntArray(value: number) {
    return Array(value).fill().map((x, i) => i);
  }

  private setNombreSelectionFruit(value: number) {
    console.log('just changed fruit', value);
    this.nombreSelectionFruit = this.changeNumberToIntArray(value);
  }

  public changeNbFruits(e: string) {
    console.log('just changed fruit', e);
    this.setNombreSelectionFruit(e.value);
  }
}

const DEFAULT_NOMBRE_FRUIT = 2;

export interface Animal {
  name: string;
  sound: string;
}
