import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';

@Component({
  selector: 'app-management-table',
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.css'],
  //providers: [ManagementService]
})
export class ManagementTableComponent implements OnInit {
  accidents;

  constructor(private managementService: ManagementService) { }

  ngOnInit() {

  }

  fillTable() {
    console.log('tamere');
    ///console.log(str);
    /*this.managementService.getAccidents().subscribe((res) => {
      console.log('xd');
      this.accidents = res;
    });*/
    this.accidents = [{
      "_id": "5a78a49ee9eaca2f596686a6",
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          7.591112,
          48.368193
        ]
      },
      "properties": {
        "int": "Intersection en T",
        "nbv": 2,
        "datetime": "2015-01-13T18:30:00+01:00",
        "obsm": "Véhicule,Véhicule",
        "situ": "Sur chaussée",
        "pr": "0",
        "adr": "Rue du Moulin",
        "actp": "Se déplaçant,Se déplaçant,Se déplaçant",
        "larrout": 60,
        "lartpc": 0,
        "nom_com": "Benfeld",
        "circ": "Bidirectionnelle",
        "catr": "Voie Communale",
        "hrmn": "18:30",
        "catu": "Conducteur,Passager,Conducteur",
        "catv": "Bicyclette,VL seul",
        "place": "1,2,1",
        "lum": "Plein jour",
        "gps": "Métropole",
        "surf": "normale",
        "mois": "01",
        "sexe": "Féminin,Masculin,Masculin",
        "voie": "1",
        "an_nais": "1978,1996,1995",
        "secu_utl": "Oui,Non,Non",
        "num_acc": "201500006109",
        "insee": "67028",
        "pr1": 0,
        "plan": "Partie rectiligne",
        "jour": "13",
        "an": "15",
        "coordonnees": [
          48.368193,
          7.591112
        ],
        "trajet": "Domicile – travail,Promenade – loisirs",
        "choc": "Avant gauche,Avant",
        "code_postal": "67230",
        "manv": "Tournant A gauche,Sans changement de direction",
        "dep": "67",
        "env1": "99",
        "atm": "Normale",
        "grav": "Indemne,Blessé,Blessé",
        "agg": "En agglomération",
        "num_veh": "B02,A01",
        "secu": "Ceinture,Autre,Autre",
        "com": "028",
        "col": "Deux véhicules – par le coté"
      },
      "comments": [
        {
          "id": "d6856a61-39bb-4ed1-aa07-bc9174c8b427",
          "text": "Très dangereux sur chaussée glissante",
          "rate": 5
        }
      ]
    }];
    console.log('lapute');
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
