import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { SmoothieService } from '../../services/smoothie.service';
import {Smoothie} from '../../models/smoothie';

@Component({
  selector: 'app-smoothie',
  templateUrl: './smoothie.component.html',
  styleUrls: ['./smoothie.component.css']
})
export class SmoothieComponent implements OnInit {
  @Input() smoothie: Smoothie;

  private id: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smoothieService: SmoothieService
  ) {}

  ngOnInit() {
    if (!this.smoothie) {
      this.route.params
        .pipe(
          map(params => params['id']),
          tap(id => (this.id = +id))
        )
        .subscribe(id => this.getSmoothie());
    }
  }

  private getSmoothie() {
    this.smoothieService
      .getSmoothie(this.id)
      .subscribe((smoothie: Smoothie) => this.setEditSmoothie(smoothie));
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
}
