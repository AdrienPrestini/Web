import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoaderService {

  constructor(private http:Http) { }

  private url = "http://localhost:3000/";
//accidents?latstart=43.692887&lngstart=7.249432&latend=45.162432&lngend=5.715637
  async getAccidents(): Promise<any>{
    //return await this.http.get(this.url).map((response : Response) => response.json());
    const response = await this.http.get(this.url).toPromise();
    return response.json();
  }

  getItinary(pointA, pointB){
    var urlRequest = this.url +"accidents/itinerary?latstart=" +pointA.lat + "&lngstart="+ pointA.lng + "&latend=" + pointB.lat + "&lngend="+ pointB.lng;
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response : Response) => response.json());
    
  }

  getAccidentsRadius(pointA){
    ///accidents/polygon?lat_center=43.296482&lng_center=5.36978&distance=1500
    var urlRequest = this.url +"accidents/polygon?lat_center=" +pointA.lat + "&lng_center="+ pointA.lng + "&distance=1500";
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response : Response) => response.json());
  }
}
