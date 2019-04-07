import {Component, Input, OnInit} from '@angular/core';
import {Smoothie} from '../../models/smoothie';

@Component({
  selector: 'app-smoothie-card',
  templateUrl: './smoothie-card.component.html',
  styleUrls: ['./smoothie.component.css'],
})
export class SmoothieCardComponent implements OnInit {
  @Input() smoothie: Smoothie;

  constructor() {}

  ngOnInit() {}
}
