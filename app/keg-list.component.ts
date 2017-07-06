import { Component } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <ul>
    <li [class]="pintsLeftColor(currentKeg)" *ngFor="let currentKeg of kegs">{{currentKeg.name}}, {{currentKeg.brand}}, \${{currentKeg.price}}/pint, {{currentKeg.abv}}%ABV, {{currentKeg.pints}}
    <button (click)="editKeg(currentKeg)">Edit!</button>


    <button *ngIf="showSellPintForm" (click)="showSellPint()">Sell a Pint!</button>
    <label *ngIf="howMany">How many pints?</label>
    <input *ngIf="howMany" #howManyPints value="1" placeholder="1" type="number">
    <button *ngIf="sellPintSubmit" (click)="sellPint(currentKeg, howManyPints.value)">Sell that Pint!</button>



    <button *ngIf="justKidding" (click)="unsellPint(currentKeg)">Unsell that Pint!</button>
    <button (click)="delete(currentKeg)">Delete Keg!</button></li>
  </ul>
  `
})

export class KegListComponent {

  kegs: Keg[] = [
    new Keg('Miller Lite', 'Miller', 3.75, 4.2),
    new Keg('Wandering Aengus Wickson', 'Wandering Aengus', 5, 8.2)
  ];

  pintsLeftColor(currentKeg) {
    if (currentKeg.pints >= 90){
      return "bg-info";
    } else if (currentKeg.pints <= 89 && currentKeg.pints >= 60) {
      return  "bg-success";
    } else if (currentKeg.pints <= 59 && currentKeg.pints >= 11) {
      return "bg-warning";
    } else {
      return "bg-danger";
    }
  }

}
