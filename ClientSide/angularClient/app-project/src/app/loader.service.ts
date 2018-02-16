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
    var urlRequest = this.url +"accidents/circle/" +pointA.lat + "/"+ pointA.lng + "/1000";
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response : Response) => response.json());
  }
}
