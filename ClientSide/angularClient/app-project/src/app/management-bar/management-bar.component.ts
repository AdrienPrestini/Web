import { Component, OnInit, Inject } from '@angular/core';
import { ManagementTableComponent } from '../management-table/management-table.component';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-management-bar',
  templateUrl: './management-bar.component.html',
  styleUrls: ['./management-bar.component.css'],
  providers: [ManagementService]
})
export class ManagementBarComponent implements OnInit {

  @Inject(ManagementTableComponent) managementTable: ManagementTableComponent;

  constructor(private managementService: ManagementService) {
    this.managementTable = new ManagementTableComponent(managementService)
  }

  ngOnInit() {
    this.managementTable.filTable();
  }

}
