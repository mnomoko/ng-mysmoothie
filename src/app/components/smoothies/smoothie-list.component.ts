import { Component, OnInit } from '@angular/core';
import { SmoothieService } from '../../services/smoothie.service';
import {Smoothie} from '../../models/smoothie';

@Component({
  selector: 'app-smoothie-list',
  templateUrl: './smoothie-list.component.html',
  styleUrls: ['./smoothie.component.css']
})
export class SmoothieListComponent implements OnInit {
  smoothies: Smoothie[];

  constructor(private smoothieService: SmoothieService) {}

  ngOnInit() {
    this.smoothieService
      .getSmoothies()
      .subscribe(smoothies => (this.smoothies = smoothies));
  }
}
