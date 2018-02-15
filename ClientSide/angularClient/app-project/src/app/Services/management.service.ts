import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ManagementService {

  private url = "http://10.212.110.200:3000/"
  private urlGet = this.url + "accidents/departement/5a846515c0ae05d77c22e5fd";
  private urlRemove = this.url + "accidents/";

  constructor(private http: Http) { }

  getAccidents() {
    var urlRequest = this.urlGet;
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response: Response) => response.json());

  }

  removeAccidents(id) {
    var urlRequest = this.urlRemove + id;
    console.log(urlRequest);
    return this.http.delete(urlRequest);
  }
}
