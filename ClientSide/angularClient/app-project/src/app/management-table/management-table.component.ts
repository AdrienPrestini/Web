import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { AccidentPopupComponent } from '../accident-popup/accident-popup.component';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-management-table',
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.css'],
  entryComponents: [AccidentPopupComponent],
  providers: [ManagementService]
})
export class ManagementTableComponent implements OnInit {
  accidents;

  constructor(public popup: MatDialog, private managementService: ManagementService) { }

  ngOnInit() {

  }

  fillTable(date_debut, date_fin, heure_debut, heure_fin, postal) {
    console.log('Table filtre');
    this.managementService.getAccidents(date_debut, date_fin, heure_debut, heure_fin, postal).subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        res[i].properties.datetime = res[i].properties.datetime.substring(0, 10);
      }
      this.accidents = res;
    });
  }

  fillTableProxi(long, lat, distance) {
    console.log('Table proximite');
    this.managementService.getAccidentsProche(long, lat, distance).subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        res[i].properties.datetime = res[i].properties.datetime.substring(0, 10);
      }
      this.accidents = res;
    });
  }

  edit(index) {
    console.log('edit index ' + index);
    let dialogRef = this.popup.open(AccidentPopupComponent, {
      data: {
        action: 'Modifier',
        accident: this.accidents[index]
      }
    });
  }

  remove(index) {
    console.log('delete index ' + index);
    this.managementService.removeAccidents(this.accidents[index]._id).subscribe((res) => {

    });
    this.accidents.splice(index, 1);
  }
}
