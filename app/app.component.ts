import { Component } from '@angular/core';
import { Keg } from './keg.model';


@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Tap Room</h1>
      <hr>
      <p *ngIf="patron" (click)="patronIsShown()">Patron</p>
      <p *ngIf="employee" (click)="employeeIsShown()">Employee</p>
      <div *ngIf="patronIsHidden">
        <p>Hello, patron</p>
      </div>
      <div *ngIf="employeeIsHidden">
        <p>Hello, employee</p>

        <task-list></task-list>

        <button (click)="showKegForm()">Add Keg!</button>
        <div *ngIf="addKegInput">
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
          <button (click)="addKeg(name.value, brand.value, price.value, abv.value)">Tap Keg</button>
          <button (click)="hideKegForm()">Done Tapping!</button>
        </div>
        <div *ngIf="editKegForm">
          <h3>Edit Keg</h3>
          <label>Keg Name</label>
          <input [(ngModel)]="selectedKeg.name">
          <label>Brand Name</label>
          <input [(ngModel)]="selectedKeg.brand">
          <select [(ngModel)]="selectedKeg.price">
            <option value="3.75">$3.75</option>
            <option value="4">$4.00</option>
            <option value="4.5">$4.50</option>
            <option value="5">$5.00</option>
          </select>
          <label>ABV</label>
          <input [(ngModel)]="selectedKeg.abv">
          <button (click)="hideKegEditForm()">Done Editing!</button>
        </div>
      </div>
    </div>
  `
})

export class AppComponent {


  patron = true;
  employee = true;
  patronIsHidden = false;
  employeeIsHidden = false;
  addKegInput = false;
  selectedKeg = null;
  editKegForm = false;
  showSellPintForm = true;
  sellPintSubmit = false;
  howMany = false;
  numberOfPints = null;
  justKidding = false;
  index = null;


  patronIsShown() {
    this.patronIsHidden = true;
    this.employeeIsHidden = false;
    this.patron = false;
    this.employee = true;
  }

  employeeIsShown() {
    this.employeeIsHidden = true;
    this.patronIsHidden = false;
    this.employee = false;
    this.patron = true;
  }



  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
    this.editKegForm = true;
    this.addKegInput = false;
  }

  showSellPint() {
    this.howMany = true;
    this.showSellPintForm = false;
    this.sellPintSubmit = true;
  }

  sellPint(clickedKeg, pintCount) {
    // console.log('hello world');
    this.selectedKeg = clickedKeg;
    this.numberOfPints = pintCount;
    this.selectedKeg.pints -= this.numberOfPints;
    this.justKidding = true;
    this.showSellPintForm = true;
    this.howMany = false;
    this.sellPintSubmit = false;
    if (this.selectedKeg.pints <= 5 && this.selectedKeg.pints >= 1) {
      alert("The keg will be automatically deleted when the pints are all sold.")
    }
    if (this.selectedKeg.pints == 0) {
      this.index = this.kegs.indexOf(this.selectedKeg);
      this.kegs.splice(this.index, 1);
    }
  }

  unsellPint(clickedKeg) {
    this.selectedKeg = clickedKeg;
    this.selectedKeg.pints += 1;
    if (this.selectedKeg.pints >= 124) {
      this.justKidding = false;
    }
  }

  delete(clickedKeg) {
    this.selectedKeg = clickedKeg;
    this.index = this.kegs.indexOf(this.selectedKeg);
    this.kegs.splice(this.index, 1);
  }

  hideKegEditForm() {
    this.editKegForm = false;
  }

  showKegForm() {
    this.addKegInput = true;
  }

  addKeg(name, brand, price, abv) {
    let newKeg = new Keg(name, brand, price, abv);
    this.kegs.push(newKeg);
  }

  hideKegForm() {
    this.addKegInput = false;
  }
}
}
