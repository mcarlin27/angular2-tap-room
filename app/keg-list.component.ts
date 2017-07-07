import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'keg-list',
  template: `
  <ul>
    <li [class]="pintsLeftColor(currentKeg)" *ngFor="let currentKeg of childKegList">{{currentKeg.name}}, {{currentKeg.brand}}, \${{currentKeg.price}}/pint, {{currentKeg.abv}}%ABV, {{currentKeg.pints}}
    <button (click)="editButtonHasBeenClicked(currentKeg)">Edit!</button>


    <button *ngIf="childShowSellPintForm" (click)="showSellPint(currentKeg)">Sell a Pint!</button>
    <label *ngIf="currentKeg === childKegToBeSold">How many pints?</label>
    <input *ngIf="currentKeg === childKegToBeSold" #howManyPints value="1" placeholder="1" type="number">
    <button *ngIf="currentKeg === childKegToBeSold" (click)="sellPintButtonHasBeenClicked(currentKeg, howManyPints.value)">Sell that Pint!</button>



    <button *ngIf="justKidding" (click)="unsellPint(currentKeg)">Unsell that Pint!</button>
    <button (click)="deleteButtonHasBeenClicked(currentKeg)">Delete Keg!</button></li>
  </ul>
  `
})

export class KegListComponent {
  @Input() childKegList: Keg[];
  @Input() childShowSellPintForm: boolean;
  @Input() childHowManyPints: boolean;
  @Input() childKegToBeSold: Keg;
  @Output() clickSender = new EventEmitter();
  @Output() sellPintClickSender = new EventEmitter();
  @Output() deleteClickSender = new EventEmitter();
  @Output() sellThisKegSender = new EventEmitter();

  editButtonHasBeenClicked(kegToEdit: Keg) {
    this.clickSender.emit(kegToEdit);
  }

  deleteButtonHasBeenClicked(kegToDelete: Keg) {
    this.deleteClickSender.emit(kegToDelete);
  }

  showSellPint(clickedKeg) {
    this.childHowManyPints = true;
    this.sellThisKegSender.emit(clickedKeg);
  }

  sellPintButtonHasBeenClicked(kegToSell: Keg, pintsToSell: string) {
    var output = {keg: kegToSell, pints: pintsToSell};
    this.sellPintClickSender.emit(output)
  }

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
