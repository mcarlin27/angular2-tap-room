import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'new-keg',
  template: `
  <button (click)="addNewKegClicked()">Tap New Keg</button>
    <div *ngIf="childKegInput">
      <label>Keg Name</label>
      <input #name>
      <label>Brand Name</label>
      <input #brand>
      <select #price>
        <option value="3.75">$3.75</option>
        <option value="4">$4.00</option>
        <option value="4.5">$4.50</option>
        <option value="5">$5.00</option>
      </select>
      <label>ABV</label>
      <input type="number" min="0" #abv>
      <button (click)="submitNewKegForm(name.value, brand.value, price.value, abv.value); name.value=''; brand.value=''; abv.value='';">Tap Keg</button>
      <button (click)="doneAddingButtonClicked()">Done Tapping!</button>
    </div>
  `
})

export class NewKegComponent {
  @Input() childKegInput: boolean;
  @Output() newKegSender = new EventEmitter();
  @Output() addNewKegClickedSender = new EventEmitter();
  @Output() doneAddingButtonClickedSender = new EventEmitter();

  submitNewKegForm(name: string, brand: string, price: number, abv: number) {
    var newKegToAdd: Keg = new Keg(name, brand, price, abv);
    this.newKegSender.emit(newKegToAdd);
  }

  addNewKegClicked() {
    this.addNewKegClickedSender.emit();
  }

  doneButtonClicked() {
    this.doneAddingButtonClickedSender.emit();
  }
}
