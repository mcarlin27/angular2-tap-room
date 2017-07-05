import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Tap Room</h1>
      <hr>
      <p (click)="patronIsShown()">Patron</p>
      <p (click)="employeeIsShown()">Employee</p>
    </div>
    <div [hidden]="patronIsHidden">
      <p>Hello, patron</p>
    </div>
    <div [hidden]="employeeIsHidden">
      <p>Hello, employee</p>
    </div>
  `
})

export class AppComponent {
  patronIsHidden: boolean = true;
  employeeIsHidden: boolean = true;


  patronIsShown() {
    this.patronIsHidden = false;
    this.employeeIsHidden = true;
  }

  employeeIsShown() {
    this.employeeIsHidden = false;
    this.patronIsHidden = true;
  }
}
