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

  edit(index) {
    console.log('edit index ' + index);
  }

  remove(index) {
    console.log('delete index ' + index);
    this.managementService.removeAccidents(this.accidents[index]._id).subscribe((res) => {
      
    });
    this.accidents.splice(index, 1);
  }
}
