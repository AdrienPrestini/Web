import {Component, ElementRef, ViewChild, NgZone, Input} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl } from '@angular/forms';
import { MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  titreProjet: string = 'Client Side Project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  isCollapsed: boolean;

  markers: marker[] = []
  @ViewChild('searchStart') public searchElementStart: ElementRef;
  @ViewChild('searchEnd') public searchElementEnd: ElementRef;
  @Input() inputStart: string;
  @Input() inputEnd: string;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone){
    this.isCollapsed = true;
  }
  ngOnInit(){

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        console.log(position.coords.latitude);

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
    //load Places Autocomplete for start
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementStart.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.markers.push({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            etat:"Debut de la course",
            draggable: true,
            label : 'A'
          })
          this.inputStart = place.formatted_address;
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

        });
      });
    });
    //load Places Autocomplete for end
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementEnd.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.markers.push({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            etat:"Fin de la course",
            label : 'B',
            draggable: true
          });
          this.inputEnd = place.formatted_address;
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();

        });
      });
    });
  }
  computePath(){
    if(this.inputStart != "" && this.inputEnd !=""){
      console.log("début : "+ this.inputStart);
      console.log("fin : "+ this.inputEnd);
    }
  }

}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  etat: string
  draggable: boolean;
}

