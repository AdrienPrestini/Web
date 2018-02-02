import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string = 'Projet Client Side';
  lat: number = 51.678418;
  lng: number = 7.809007;
  isCollapsed : boolean;
  constructor(){
    this.isCollapsed = true;
  }
  ngOnInit(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords); 
        console.log(position.coords.latitude); 
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
   }
  




  
}
