import {Component, ElementRef, ViewChild, NgZone, Input, Inject} from '@angular/core';
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


  dir = undefined;

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
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.markers.push({
          lat: this.lat,
          lng: this.lng,
          etat:"Vous êtes ici !",
          label:'ici',
          draggable: true
        });
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
          for(var i = 0; i < this.markers.length; i++){
            if(this.markers[i].label =="A"){
              console.log("on enlève me point A");
              this.markers.splice(i,1);
              console.log(this.markers);
            }
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
          for(var i = 0; i < this.markers.length; i++){
            if(this.markers[i].label =="B"){
              this.markers.splice(i,1);
            }
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
    if(this.inputStart != "" && this.inputEnd !="" && 
    this.inputStart != undefined && this.inputEnd != undefined){
      console.log(this.inputStart);
      console.log(this.inputEnd);
      var markerStart, markerEnd;
      this.markers.forEach(item =>{
        if(item.label == "A"){
          console.log(item);
          markerStart = {
            lat : item.lat,
            lng : item.lng,
            name : this.inputStart
          };
        }
        if(item.label == "B"){
          console.log(item);
          markerEnd = {
            lat : item.lat,
            lng : item.lng,
            name : this.inputEnd
          };
        }
      });
      alert("Vous allez de " + markerStart.name + " à "+markerEnd.name);
      this.dir = {
        origin: { lat: markerStart.lat, lng: markerStart.lng },
        destination: { lat: markerEnd.lat, lng: markerEnd.lng }
      }
    //envoyer au serveur les deux points de début et fin
    }else {
      this.openDialog();
    }
  }
  
  openDialog() {
    alert("Il manque un point (de départ ou d'arrivée) à votre trajet.");
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