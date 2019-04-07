import {AfterViewInit, Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SmoothieService } from '../../services/smoothie.service';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material';
import { FruitService } from '../../services/fruit.service';
import {Fruit} from '../../models/fruit';
import {Smoothie} from '../../models/smoothie';
import {Juice} from '../../../commons/enums/juices';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit, AfterViewInit {
  @Input() smoothie: Smoothie;

  private id: any;

  creationForm = new FormGroup ({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    typeFruit: new FormControl(null, [Validators.required]),
    nombrePersonne: new FormControl(null),
    nombreFruit: new FormControl(null, [Validators.required]),
    juice: new FormControl('', [Validators.required]),
    fruit: new FormControl('', [Validators.required])
  });

  jus: Juice[] = [];
  fruits: Fruit[] = [];

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
  }

  private getFruits() {
    this.fruitService.getFruits().subscribe(fruits => this.fruits = fruits);
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

  createForm() {
    this.creationForm = this.formBuilder.group({
      name: '',
      description: '',
      typeFruit: '',
      nombrePersonne: '',
      nombreFruit: '',
      juice: '',
      fruit: ''
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
