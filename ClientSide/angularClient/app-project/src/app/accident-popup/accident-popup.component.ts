import { Component, OnInit, Input } from '@angular/core';
import { ManagementService } from '../services/management.service';

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-accident-popup',
  templateUrl: './accident-popup.component.html',
  styleUrls: ['./accident-popup.component.css'],
  providers: [ManagementService]
})
export class AccidentPopupComponent implements OnInit {

  mode: String = 'Nouvel accident'; //'Modifier l'accident'
  action: String = 'Ajouter'; //'Confirmer'

  accident = {};
  id = "0";

  @Input() longitude: number;
  @Input() latitude: number;
  @Input() postal: string;
  @Input() adresse: string;
  @Input() date: Date;
  @Input() nbv: number;

  constructor(private managementService: ManagementService, public dialogRef: MatDialogRef<AccidentPopupComponent>) { }

  ngOnInit() {
    if (this.action == 'Ajouter') {
      this.mode = 'Nouvel accident';
    } else {
      this.mode = 'Modifier accident';
    }
  }

  buildJson() {

    if (this.action == 'Ajouter') {
      this.accident = {
        long: this.longitude, lat: this.latitude, datetime: this.date, nbv: this.nbv,
        adr: this.adresse, code_postal: this.postal, comments: []
      }
    } else {

    }

    console.log(this.accident);
  }

  applyAction() {
    console.log(this.action);
    if (this.action == 'Ajouter') {
      this.buildJson();
      this.managementService.addAccident(this.accident).subscribe((res) => {
        console.log('Posting accident');
      });
    } else if (this.action == 'Modifier') {
      this.buildJson();
      //this.managementService.updateAccident(this.accident, this.id);
    } else {
      console.log('error: invalid action');
    }
    this.dialogRef.close('applyAction');
  }

  annuler() {
    // Fermer le popup
    this.dialogRef.close('Annuler');
  }

}
