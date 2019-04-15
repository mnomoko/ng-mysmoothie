import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { SmoothieService } from '../../services/smoothie.service';
import {Smoothie} from '../../models/smoothie';

@Component({
  selector: 'app-smoothie-list',
  templateUrl: './smoothie-list.component.html',
  styleUrls: ['./smoothie.component.css']
})
export class SmoothieListComponent implements OnInit {
  smoothies: Smoothie[];
  isLoading: boolean = true;

  regularDistribution = 100 / 3;

  constructor(private smoothieService: SmoothieService) {}

  ngOnInit() {
    this.isLoading = true;
    this.smoothieService
      .getSmoothies()
      .subscribe(smoothies => {
        this.smoothies = smoothies;
        this.isLoading = false;
      });
  }
}
