import { Component, OnInit, Input } from '@angular/core';
import { ManagementTableComponent } from '../management-table/management-table.component';
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

  constructor(public popup: MatDialog, private managementService: ManagementService) {
  }

  ngOnInit() {
    
  }

  ajouterButton() {
    console.log('lol');
    let dialogRef = this.popup.open(AccidentPopupComponent, {
      data: {
        
      }
    });
  }
}
