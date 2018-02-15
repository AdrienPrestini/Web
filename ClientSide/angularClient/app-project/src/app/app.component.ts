import { Component, ElementRef, ViewChild, NgZone, Input, Inject} from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormControl } from '@angular/forms';
import { MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import { MouseEvent } from '@agm/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from './loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  titreProjet: string = 'Client Side';
  lat: number = 51.678418;
  lng: number = 7.809007;
  isCollapsed: boolean;
  dir = undefined;

  markers: marker[] = []
  markersAccidents: marker[] = []
  @ViewChild('searchStart') public searchElementStart: ElementRef;
  @ViewChild('searchEnd') public searchElementEnd: ElementRef;
  @Input() inputStart: string;
  @Input() inputEnd: string;
  isSearched = false;

  instructions;
  markerStart;
  markerEnd;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private modalService : NgbModal, private loaderService : LoaderService){
    this.isCollapsed = true;
  }
  /*async getAccidents(){
    this.instructions = await this.loaderService.getAccidents();
    console.log(this.instructions.data);
  }*/
  async ngOnInit(){
    //this.getAccidents();
      // on récupère la localisation du client
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.markers.push({
          lat: this.lat,
          lng: this.lng,
          etat:"Vous êtes ici !",
          label:'ici',
          draggable: false,
        });
        //examples TODO : Remove later. Is for testing event click marker
        this.markersAccidents.push({
          lat: this.lat,
          lng: this.lng,
          etat:"Vous êtes ici !",
          label:'ici',
          draggable: false,
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
              this.markers.splice(i,1);
            }
          }

          this.markers.push({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            etat:"Debut de la course",
            label : 'A',
            draggable: false,
          });
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
            draggable: false
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
      this.markers.forEach(item =>{
        if(item.label == "A"){
          console.log(item);
          this.markerStart = {
            lat : item.lat,
            lng : item.lng,
            name : this.inputStart
          };
        }
        if(item.label == "B"){
          console.log(item);
          this.markerEnd = {
            lat : item.lat,
            lng : item.lng,
            name : this.inputEnd
          };
        }
      });
      this.deleteMarkers();
      this.dir = {
        origin: { lat: this.markerStart.lat, lng: this.markerStart.lng },
        destination: { lat: this.markerEnd.lat, lng: this.markerEnd.lng }
      }
    //envoyer au serveur les deux points de début et fin pour avoir les instructions et les accidents
    
    this.sendPointsToGetInstructionsAndAccidents();
    }else {
      this.openDialog();
    }
    
  }
  
  openDialog() {
    alert("Il manque un point (de départ ou d'arrivée) à votre trajet.");
  }
  
  clickedMarker(lat: number, lng: number) {
    /*let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
  }

  mapClicked($event: MouseEvent) {
    
  }

  deleteMarkers(){
//  console.log("Suppression des items inutiles");
    this.markers = [this.markers[0]];
  }
  sendPointsToGetInstructionsAndAccidents() {
    this.instructions = this.loaderService.getItinary(this.markerStart, this.markerEnd).subscribe((res) => {
      this.instructions = [];
      console.log(res);
      this.instructions = res.steps;
      console.log(this.instructions);
      this.isSearched = true;     
      //on remplit les marqueurs 
      res.dangerPoint.forEach(element => {
        this.markersAccidents.push({
          lat: element.properties.coordonnees[0],
          lng: element.properties.coordonnees[1],
          etat: element.properties.adr +"\n" + element.properties.agg,
          label : '!',
          draggable: false,
          id : element.properties._id
        })
        
      });

    });
  }
}
// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  etat: string,
  draggable: boolean,
  id?:string
}
enum ModalDismissReasons {
  BACKDROP_CLICK,
  ESC
}