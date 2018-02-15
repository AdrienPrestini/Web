import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [ManagementService]
})

export class ManagementComponent implements OnInit {

  accidents;

  constructor(private managementService: ManagementService) { }

  ngOnInit() {
    
    console.log('tamere');
    this.managementService.getAccidents().subscribe((res) => {
      console.log('xd');
      this.accidents = res;
    });
    
  }

}
