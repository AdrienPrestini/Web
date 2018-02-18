import { Component, OnInit, Input } from '@angular/core';
import { ManagementService } from '../services/management.service';

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

  @Input() longitude: number;
  @Input() latitude: number;
  @Input() postal: string;
  @Input() adresse: string;
  @Input() date: Date;
  @Input() nbv: number;

  constructor(private managementService: ManagementService) { }

  ngOnInit() {
  }

  buildJson() {

    this.accident = {
      "geometry": {
        "type": "Point",
        "coordinates": [
          this.latitude,
          this.longitude
        ]
      }, "properties": {
        "datetime": this.date,
        "nbv": this.nbv,
        "adr": this.adresse,
        "code_postal": this.postal,
        "coordonnees": [
          this.longitude,
          this.latitude
        ]
      }
    };
    console.log(this.accident);
  }

  applyAction() {
    console.log(this.action);
    if (this.action == 'Ajouter') {
      this.buildJson();
      this.managementService.addAccident(this.accident);
    } else if (this.action == 'Modifier') {
      this.buildJson();
      this.managementService.updateAccident(this.accident, this.id);
    } else {
      console.log('error: invalid action');
    }
  }

  annuler() {
    // Fermer le popup
    console.log('annuler');
  }

}
