import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmoothieService } from '../../services/smoothie.service';
import { FruitService } from '../../services/fruit.service';
import { Fruit } from '../../models/fruit';
import { Smoothie } from '../../models/smoothie';
import { getJuice, getJuices } from '../../../commons/enums/juices';
import { ButtonToggleCommun } from '../elements_commun/button_toggle/button-toggle-commun';
import { RadioCommun } from '../elements_commun/radio/radio-commun';
import { SelectCommun } from '../elements_commun/select/select-commun';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {
  @Input() smoothie: Smoothie;

  isLoading = false;

  jus: any[] = [];
  allFruits: Fruit[] = [];

  constructor(private router: Router, private smoothieService: SmoothieService, private fruitService: FruitService) {}

  ngOnInit() {
    this.jus = this.getJuices();
    this.getFruits();
  }

  private getJuices() {
    return getJuices().map(k => getJuice(k));
  }

  private getFruits() {
    this.isLoading = true;
    this.fruitService.getFruits().subscribe(fruits => {
      this.isLoading = false;
      this.allFruits = fruits;
    });
  }

  private gotoSmoothies() {
    const route = ['/smoothies'];
    this.router.navigate(route);
  }

  public createSmoothie(smoothie: Smoothie) {
    console.log('smoothie : ', smoothie);

    this.isLoading = true;
    this.smoothieService.postSmoothie(smoothie).pipe(finalize(() => { this.isLoading = false; })).subscribe(() => {
      this.gotoSmoothies();
    });

  }
}
