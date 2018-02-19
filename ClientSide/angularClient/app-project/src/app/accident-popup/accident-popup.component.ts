import { Component, OnInit, Input, Inject } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

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
  comments = [];

  @Input() longitude: number;
  @Input() latitude: number;
  @Input() postal: string;
  @Input() adresse: string;
  @Input() date: Date;
  @Input() nbv: number;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private managementService: ManagementService, public dialogRef: MatDialogRef<AccidentPopupComponent>) {
    this.action = data.action;
    if (this.action == 'Ajouter') {
      this.mode = 'Nouvel accident';
    } else {
      this.mode = 'Modifier accident';
      this.accident = data.accident;
    }
  }

  ngOnInit() {
    if (this.action == 'Modifier') {
      this.longitude = this.accident.geometry.coordinates[0];
      this.latitude = this.accident.geometry.coordinates[1];
      this.date = this.accident.properties.datetime;
      this.adresse = this.accident.properties.adr;
      this.postal = this.accident.properties.code_postal;
      this.nbv = this.accident.properties.nbv;

      this.id = this.accident._id;
      this.comments = this.accident.comments.slice();
    }
  }

  buildJson() {

    if (this.action == 'Ajouter') {
      this.accident = {
        long: this.longitude, lat: this.latitude, datetime: this.date, nbv: this.nbv,
        adr: this.adresse, code_postal: this.postal, comments: []
      }
    } else {
      delete this.accident._id;
      this.accident.comments = this.comments;
      this.accident.geometry.coordinates[0] = this.longitude;
      this.accident.geometry.coordinates[1] = this.latitude;
      this.accident.properties.datetime = this.date;
      this.accident.properties.adr = this.adresse;
      this.accident.properties.code_postal = this.postal
      this.accident.properties.nbv = this.nbv;
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
      this.managementService.updateAccident(this.accident, this.id).subscribe((res) => {
        console.log('Puting accident');
      });
      this.accident._id = this.id;
    } else {
      console.log('error: invalid action');
    }
    this.dialogRef.close('applyAction');
  }

  annuler() {
    // Fermer le popup
    this.dialogRef.close('Annuler');
  }

  remove(index) {
    console.log('remove ' + index);
    this.comments.splice(index, 1);
  }
}
