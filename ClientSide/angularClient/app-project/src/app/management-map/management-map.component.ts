import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-map',
  templateUrl: './management-map.component.html',
  styleUrls: ['./management-map.component.css']
})
export class ManagementMapComponent implements OnInit {
  accidentsMarkers :marker[] = [];
  latitudeCenter:number = 51.678418;;
  longitudeCenter:number = 7.809007;

  constructor() { }

  ngOnInit() {
    //Permet de connaître la position de l'utilisateur pour center la carte
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitudeCenter = position.coords.latitude;
        this.longitudeCenter = position.coords.longitude;
      });
    }


  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  etat: string,
  draggable: boolean,
  id?: string
}
