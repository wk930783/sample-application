import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  titleForBar = '學期作業';

  constructor(
  ) {}

  ngOnInit(): void {
  }
}
