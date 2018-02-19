import { Component, OnInit, Input } from '@angular/core';
import { ManagementTableComponent } from '../management-table/management-table.component';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-management-bar',
  templateUrl: './management-bar.component.html',
  styleUrls: ['./management-bar.component.css'],
  providers: [ManagementService]
})
export class ManagementBarComponent implements OnInit {

  constructor(private managementService: ManagementService) {
  }

  ngOnInit() {
    
  }

  ajouterButton() {
    console.log('lol');
  }
}
