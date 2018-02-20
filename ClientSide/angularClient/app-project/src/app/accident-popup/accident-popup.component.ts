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
  modifier = null;

  accident;
  /*
    accident = {
    _id: null, geometry: { coordinates: [] },
    properties: { datetime: null, adr: null, code_postal: null, nbv:null, agg:null, hrmn: null},
    comments: []
  };
  */
  id = "0";
  comments = [];

  @Input() longitude: number;
  @Input() latitude: number;
  @Input() postal: string;
  @Input() adresse: string;
  @Input() date: Date;
  @Input() heure: string;
  @Input() lieu: string;
  @Input() nbv: number;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private managementService: ManagementService, public dialogRef: MatDialogRef<AccidentPopupComponent>) {
    this.action = data.action;
    if (this.action == 'Ajouter') {
      this.mode = 'Nouvel accident';
      console.log(data);
      if (data.lng && data.lat) {
        this.longitude = data.lng;
        this.latitude = data.lat;
      }
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
      this.lieu = this.accident.properties.agg;
      this.heure = this.accident.properties.hrmn;

      this.id = this.accident._id;
      this.comments = this.accident.comments.slice();
      this.modifier = true;
    }
  }

  buildJson() {

    if (this.action == 'Ajouter') {
      this.accident = null;
      this.accident = {
        long: this.longitude, lat: this.latitude, datetime: this.date, nbv: this.nbv,
        adr: this.adresse, code_postal: this.postal, hrmn: this.heure, agg:this.lieu, comments: []
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
      this.accident.properties.agg = this.lieu;
      this.accident.properties.hrmn = this.heure;
      this.accident.properties.coord = [this.latitude, this.longitude];
    }

    console.log(this.accident);
  }

  applyAction() {
    console.log(this.action);
    if (this.action == 'Ajouter') {
      this.buildJson();
      this.managementService.addAccident(this.accident).subscribe((res) => {
        console.log('Posting accident: ' + res.text().replace(new RegExp('"', 'g'), ''));
        this.dialogRef.close(res.text().replace(new RegExp('"', 'g'),''));
      });
    } else if (this.action == 'Modifier') {
      this.buildJson();
      this.managementService.updateAccident(this.accident, this.id).subscribe((res) => {
        console.log('Puting accident');
        this.dialogRef.close('applyAction');
      });
      this.accident._id = this.id;
    } else {
      console.log('error: invalid action');
      this.dialogRef.close('close');
    }
  }

  annuler() {
    // Fermer le popup
    this.dialogRef.close('Annuler');
  }

  remove(index) {
    console.log('remove ' + index);
    this.comments.splice(index, 1);
  }

  supprimer() {
    console.log('delete accident');
    this.managementService.removeAccidents(this.id).subscribe((res) => {

    });
    this.accident = null;
    this.dialogRef.close('Delete');
  }
}
