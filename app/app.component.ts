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

        <keg-list [childKegList]="masterKegList" [childShowSellPintForm]="showSellPintForm" [childHowManyPints]="howMany"
        [childKegToBeSold]="kegBeingSold" (clickSender)="editKeg($event)"
        (sellPintClickSender)="sellPint($event)"
        (sellThisKegSender)="kegBeingSold = $event" (deleteClickSender)="delete($event)"></keg-list>

        <new-keg [childKegInput]="addKegInput" (newKegSender)="addKeg($event)" (addNewKegClickedSender)="showNewKegForm()" (doneAddingButtonClickedSender)="hideNewKegForm()"></new-keg>

        <edit-keg [childSelectedKeg]="selectedKeg" (doneButtonClickedSender)="hideKegEditForm()"></edit-keg>

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
  showSellPintForm = true;
  sellPintSubmit = false;
  howMany = false;
  kegBeingSold = null;
  justKidding = false;
  index = null;


  masterKegList: Keg[] = [
    new Keg('Miller Lite', 'Miller', 3.75, 4.2),
    new Keg('Wandering Aengus Wickson', 'Wandering Aengus', 5, 8.2)
  ];

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

  sellPint(object) {
    var keg = object.keg;
    var pints = object.pints;
    keg.pints -= pints;
    this.justKidding = true;
    this.showSellPintForm = true;
    this.howMany = false;
    this.sellPintSubmit = false;
    if (keg.pints <= 5 && keg.pints >= 1) {
      alert("The keg will be automatically deleted when the pints are all sold.")
    }
    if (keg.pints == 0) {
      this.index = this.masterKegList.indexOf(this.selectedKeg);
      this.masterKegList.splice(this.index, 1);
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
    var keg = clickedKeg;
    this.index = this.masterKegList.indexOf(keg);
    this.masterKegList.splice(this.index, 1);
  }

  editKeg(clickedKeg) {
    this.selectedKeg = clickedKeg;
  }

  hideKegEditForm() {
    this.selectedKeg = null;
  }

  showNewKegForm() {
    this.addKegInput = true;
  }

  addKeg(newKegFromChild) {
    this.masterKegList.push(newKegFromChild);
  }

  hideNewKegForm() {
    this.addKegInput = false;
  }
}
