import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Keg } from './keg.model';

@Component({
  selector: 'edit-keg',
  template: `
    <div *ngIf="childSelectedKeg">
      <h3>Edit Keg</h3>
      <label>Keg Name</label>
      <input [(ngModel)]="childSelectedKeg.name">
      <label>Brand Name</label>
      <input [(ngModel)]="childSelectedKeg.brand">
      <select [(ngModel)]="childSelectedKeg.price">
        <option value="3.75">$3.75</option>
        <option value="4">$4.00</option>
        <option value="4.5">$4.50</option>
        <option value="5">$5.00</option>
      </select>
      <label>ABV</label>
      <input [(ngModel)]="childSelectedKeg.abv">
      <button (click)="doneButtonClicked()">Done Editing!</button>
    </div>
  `
})

export class EditKegComponent {
  @Input() childSelectedKeg: Keg;
  @Output() doneButtonClickedSender = new EventEmitter();

  doneButtonClicked() {
    this.doneButtonClickedSender.emit();
  }
}
