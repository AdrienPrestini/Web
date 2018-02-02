import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  NgZone
} from '@angular/core';
declare var google:any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  titreProjet = 'Projet Client Side';


  isCollapsed = true;
  constructor(private zone: NgZone) { }

  ngOnInit() {

  }

}
