import {Component, OnInit} from '@angular/core';
import {FruitService} from '../../../services/fruit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SmoothieService} from '../../../services/smoothie.service';
import {Smoothie} from '../../../models/smoothie';
import {getJuice, getJuices} from '../../../../commons/enums/juices';
import {finalize, map, tap} from 'rxjs/operators';
import {Fruit} from '../../../models/fruit';

@Component({
  templateUrl: 'smoothie-edit.component.html',
  styleUrls: ['smoothie-edit.component.css']
})
export class SmoothieEditComponent implements OnInit {
  isLoading = false;

  private id: any;

  smoothie: Smoothie;
  jus: any[] = [];
  allFruits: Fruit[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private smoothieService: SmoothieService, private fruitService: FruitService) {}

  ngOnInit() {
    if (!this.smoothie) {
      this.route.params
        .pipe(
          map(params => params['id']),
          tap(id => (this.id = +id))
        )
        .subscribe(id => this.getSmoothie());
    }
    this.jus = this.getJuices();
    this.getFruits();
  }

  private getSmoothie() {
    this.smoothieService
      .getSmoothie(this.id)
      .subscribe((smoothie: Smoothie) => this.setEditSmoothie(smoothie));
  }

  private setEditSmoothie(smoothie: Smoothie) {
    if (smoothie) {
      this.smoothie = smoothie;
    } else {
      this.gotoSmoothies();
    }
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
    this.smoothieService.putSmoothie(smoothie).pipe(finalize(() => { this.isLoading = false; })).subscribe(() => {
      this.gotoSmoothies();
    });

  }
}
