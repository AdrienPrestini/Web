import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { AccidentPopupComponent } from '../accident-popup/accident-popup.component';

import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-management-map',
  templateUrl: './management-map.component.html',
  styleUrls: ['./management-map.component.css'],
  entryComponents: [AccidentPopupComponent],
  providers: [ManagementService]
})
export class ManagementMapComponent implements OnInit {

  accidents;

  accidentsMarkers :marker[] = [];
  latitudeCenter:number = 51.678418;;
  longitudeCenter:number = 7.809007;

  constructor(public popup: MatDialog, private managementService: ManagementService) { }

  ngOnInit() {
    //Permet de connaître la position de l'utilisateur pour center la carte
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitudeCenter = position.coords.latitude;
        this.longitudeCenter = position.coords.longitude;
      });
    }
  }

  mapClicked($event: MouseEvent) {
    console.log('Add accident');
    let dialogRef = this.popup.open(AccidentPopupComponent, {
      data: {
        action: 'Ajouter',
        lat: $event.coords.lat,
        lng: $event.coords.lng
      }
    });
  }

  accidentsToMarker() {
    this.accidentsMarkers = [];
    for (var i = 0; i < this.accidents.length; i++) {
      var mark: marker = {
        lat: this.accidents[i].geometry.coordinates[1],
        lng: this.accidents[i].geometry.coordinates[0],
        id: i
      };
      this.accidentsMarkers.push(mark);
    }
  }

  fillMap(date_debut, date_fin, heure_debut, heure_fin, postal, mode) {
    if (mode == 'carte') {
      console.log('Carte filtre');
      this.managementService.getAccidents(date_debut, date_fin, heure_debut, heure_fin, postal).subscribe((res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].properties.datetime) {
            res[i].properties.datetime = res[i].properties.datetime.substring(0, 10);
          }
        }
        this.accidents = res;
        this.accidentsToMarker();
      });
    }
  }

  fillMapProxi(long, lat, distance, mode) {
    if (mode == 'carte') {
      console.log('Carte proximite');
      this.managementService.getAccidentsProche(long, lat, distance).subscribe((res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].properties.datetime) {
            res[i].properties.datetime = res[i].properties.datetime.substring(0, 10);
          }
        }
        this.accidents = res;
        this.accidentsToMarker();
      });
    }
  }

  edit(index) {
    console.log('edit index ' + index);
    let dialogRef = this.popup.open(AccidentPopupComponent, {
      data: {
        action: 'Modifier',
        accident: this.accidents[index]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
      if (result == 'applyAction') {
        console.log('lol ' + this.accidentsMarkers[index]);
        this.accidentsMarkers[index].lat = this.accidents[index].geometry.coordinates[1];
        this.accidentsMarkers[index].lng = this.accidents[index].geometry.coordinates[0];
        console.log(this.accidentsMarkers[index]);
      }
    });
  }

  remove(index) {
    console.log('delete index ' + index);
    this.managementService.removeAccidents(this.accidents[index]._id).subscribe((res) => {

    });
    this.accidentsMarkers.splice(index, 1);
    this.accidents.splice(index, 1);
  }

  addAccident(id) {
    this.managementService.getAccident(id).subscribe((res) => {
      console.log('size: ' + this.accidents.length);
      this.accidents.push(res);
      var mark: marker = {
        lat: Number(res.geometry.coordinates[1]),
        lng: Number(res.geometry.coordinates[0]),
        id: res._id
      };
      this.accidentsMarkers.push(mark);
      console.log('yes');
    });
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  id?: number
}
