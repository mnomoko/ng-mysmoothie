import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmoothieService } from '../../services/smoothie.service';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material';
import { FruitService } from '../../services/fruit.service';
import {Fruit} from '../../models/fruit';
import {Smoothie} from '../../models/smoothie';
import {getJuice, getJuices, Juice} from '../../../commons/enums/juices';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit, AfterViewInit {
  @Input() smoothie: Smoothie;

  private id: any;
  creationForm;
  isLoading: boolean = false;

  jus: any[] = [];
  allFruits: Fruit[] = [];
  fruits: Fruit[] = [];

  buttonToggle = {
    name: 'typeFruit',
    label: 'Type de smoothie : ',
    items: [
      { value: 'acide', label: 'Acidulé' },
      { value: 'amer', label: 'Amer' },
      { value: 'sucre', label: 'Sucré' },
      { value: 'sale', label: 'Salé' },
    ]
  };

  option: any = {
    name: 'fruit',
    label: 'Veuillez sélectionner un fruit : ',
    placeholder: 'Veuillez sélectionner un fruit',
    items: [],
    messageError: 'Veuillez sélectionner un fruit',
  };

  optionJus: any = {
    name: 'juice',
    label: 'Veuillez sélectionner un jus : ',
    placeholder: 'Veuillez sélectionner un jus',
    items: [],
    messageError: 'Veuillez sélectionner un jus',
  };

  optionNbPersonne: any = {
    name: 'nombrePersonne',
    label: 'Nombre de personne : ',
    items: [
      { label: '1', value: 1 },
      { label: '2', value: 2 }
    ]
  };

  optionNbFruit: any = {
    name: 'nombreFruit',
    label: 'Nombre de fruit : ',
    items: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 }
    ]
  };

  @ViewChild(MatButtonToggleGroup) group: MatButtonToggleGroup;
  @ViewChildren(MatButtonToggle) toggles: QueryList<MatButtonToggle>;
  ngAfterViewInit() {
    setTimeout(() => {
      this.toggles.forEach(toggle => toggle.buttonToggleGroup = this.group);
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private smoothieService: SmoothieService,
    private fruitService: FruitService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getFruits();
    this.jus = this.getJuices();
    this.setAndRefreshJuiceList(this.jus);

    this.creationForm = new FormGroup ({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      typeFruit: new FormControl(null),
      nombrePersonne: new FormControl(null),
      nombreFruit: new FormControl(null, [Validators.required]),
      juice: new FormControl('', [Validators.required]),
      fruit: new FormControl('', [Validators.required])
    });
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
      this.setAndRefreshFruitList(fruits);
    });
  }

  public setFruitsSelection(data: Fruit[]) {
    this.fruits = data;
  }

  public setAndRefreshFruitList(data: Fruit[]) {
    this.setFruitsSelection(data);
    this.option.items = data;
  }

  public setAndRefreshJuiceList(data) {
    this.optionJus.items = data;
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

  private setDefaultValue() {
    this.creationForm.patchValue({
      nombreFruit: 1
    });
  }

  public changeNbFruits(e: string) {
    console.log('just changed fruit', e);
  }
}

export interface Animal {
  name: string;
  sound: string;
}
