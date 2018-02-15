import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoaderService {

  constructor(private http:Http) { }

  private url = "http://10.212.110.200:3000/accidents/itinerary/";

  async getAccidents(): Promise<any>{
    //return await this.http.get(this.url).map((response : Response) => response.json());
    const response = await this.http.get(this.url).toPromise();
    return response.json();
  }

  getItinary(pointA, pointB){
    var urlRequest = this.url + pointA.lat + "/"+ pointA.lng + "/" + pointB.lat + "/"+ pointB.lng;
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response : Response) => response.json());
    
  }
}
