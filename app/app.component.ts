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
          <li *ngFor="let currentKeg of kegs">{{currentKeg.name}}</li>
        </ul>
        <button (click)="showKegForm()">Add Keg!</button>
        <div *ngIf="addKegInput">
          <label for="name">Keg Name</label>
          <input type="text" #name name="name">
          <label for="brand">Brand Name</label>
          <input type="text" #brand name="brand">
          <select #price>
            <option value="3.75">$3.75</option>
            <option value="4">$4.00</option>
            <option value="4.5">$4.50</option>
            <option value="5">$5.00</option>
          </select>
          <label for="abv">ABV</label>
          <input type="number" #abv name="abv">
          <button (click)="addKeg(name.value, brand.value, price.value, abv.value)">Tap Keg</button>
          <button (click)="hideKegForm()">Done Tapping!</button>
        </div>
      </div>
    </div>
  `
})

export class AppComponent {
  kegs: Keg[] = [];

  patronIsHidden = false;
  employeeIsHidden = false;
  addKegInput = false;


  patronIsShown() {
    this.patronIsHidden = true;
    this.employeeIsHidden = false;
  }

  employeeIsShown() {
    this.employeeIsHidden = true;
    this.patronIsHidden = false;
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
  constructor(public name: string, public brand: string, public price: string, public abv: number) {
    this.name = name,
    this.brand = brand,
    this.price = price,
    this.abv = abv;
  }
}
