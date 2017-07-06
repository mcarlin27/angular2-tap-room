import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Tap Room</h1>
      <hr>
      <p (click)="patronIsShown()">Patron</p>
      <p (click)="employeeIsShown()">Employee</p>
      <div *ngIf="patronIsHidden">
        <p>Hello, patron</p>
      </div>
      <div *ngIf="employeeIsHidden">
        <p>Hello, employee</p>
        <ul>
          <li *ngFor="let currentKeg of kegs">{{currentKeg.name}}, {{currentKeg.brand}}, \${{currentKeg.price}}/pint, {{currentKeg.abv}}%ABV, {{currentKeg.pints}} <button (click)="editKeg(currentKeg)">Edit!</button> <button (click)="sellPint(currentKeg)">Sell a Pint!</button> <button *ngIf="justKidding" (click)="unsellPint(currentKeg)">Unsell that Pint!</button></li>
        </ul>
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
  kegs: Keg[] = [
    new Keg('Miller Lite', 'Miller', 3.75, 4.2),
    new Keg('Wandering Aengus Wickson', 'Wandering Aengus', 5, 8.2)
  ];

  patronIsHidden = false;
  employeeIsHidden = false;
  addKegInput = false;
  selectedKeg = null;
  editKegForm = false;
  justKidding = false;


  patronIsShown() {
    this.patronIsHidden = true;
    this.employeeIsHidden = false;
  }

  employeeIsShown() {
    this.employeeIsHidden = true;
    this.patronIsHidden = false;
  }

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
    this.editKegForm = true;
    this.addKegInput = false;
  }

  sellPint(clickedKeg) {
    this.selectedKeg = clickedKeg;
    this.selectedKeg.pints -= 1;
    this.justKidding = true;
  }

  unsellPint(clickedKeg) {
    this.selectedKeg = clickedKeg;
    this.selectedKeg.pints += 1;
    if (this.selectedKeg.pints >= 124) {
      this.justKidding = false;
    }
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

export class Keg {
  public pints: number = 124;
  constructor(public name: string, public brand: string, public price: number, public abv: number) {
    this.name = name,
    this.brand = brand,
    this.price = price,
    this.abv = abv;
  }
}
