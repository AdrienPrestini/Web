import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ManagementTableComponent } from '../management-table/management-table.component';
import { ManagementMapComponent } from '../management-map/management-map.component';
import { ManagementService } from '../services/management.service';
import { AccidentPopupComponent } from '../accident-popup/accident-popup.component';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-management-bar',
  templateUrl: './management-bar.component.html',
  styleUrls: ['./management-bar.component.css'],
  providers: [ManagementService],
  entryComponents: [AccidentPopupComponent]
})
export class ManagementBarComponent implements OnInit {

  lng;
  lat;
  distance = 2000;

  postal;
  date_debut;
  date_fin;
  heure_debut;
  heure_fin;

  mode = "carte";

  @ViewChild('managementTable') managementTable: ManagementTableComponent;
  @ViewChild('managementMap') managementMap: ManagementMapComponent;

  constructor(public popup: MatDialog, private managementService: ManagementService) {
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  ajouterButton() {
    let dialogRef = this.popup.open(AccidentPopupComponent, {
      data: {
        action:'Ajouter'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if (result != 'close' && result != undefined) {
        console.log('add completed');
        if (this.mode == 'carte') {
          console.log('goAdd map');
          this.managementMap.addAccident(result);
        } else if (this.mode == 'table') {
          console.log('goAdd table');
          this.managementTable.addAccident(result);
        }
      }
    });
  }

  tableau() {
    this.mode = 'table';
  }

  carte() {
    this.mode = 'carte';
  }
}
