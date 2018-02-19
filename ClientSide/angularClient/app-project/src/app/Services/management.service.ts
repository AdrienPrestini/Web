import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ManagementService {

  private url = "http://10.212.110.200:3000/"
  private urlGet = this.url + "accidents/departement/5a846515c0ae05d77c22e5fd";
  private urlAccident = this.url + "accidents";

  constructor(private http: Http) { }

  getAccidentsProche(long, lat, distance) {
    var urlRequest = this.urlAccident + "/polygon" + "?lat_center=" + lat + "&lng_center=" +
      long + "&distance=" + distance;
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response: Response) => response.json());
  }

  getAccidents(date_debut, date_fin, heure_debut, heure_fin, postal) {
    var postal_params = "";
    var dateDebut = "";
    var dateFin = "";
    var heureDebut = "";
    var heureFin = "";
    if (postal != "" && postal != undefined) {
      postal_params = "&code_postal=" + postal;
    }
    if (date_debut != "" && date_debut != undefined) {
      dateDebut = "&date_deb=" + date_debut;
    }
    if (date_fin != "" && date_fin != undefined) {
      dateFin = "&date_fin=" + date_fin;
    }
    if (heure_debut != "" && heure_debut != undefined) {
      heureDebut = "&heure_deb=" + heure_debut;
    }
    if (heure_fin != "" && heure_fin != undefined) {
      heureFin = "&heure_fin=" + heure_fin;
    }
    var urlRequest = this.urlAccident + "?" + heureDebut + heureFin +
      dateDebut + dateFin + postal_params;
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response: Response) => response.json());

  }

  removeAccidents(id) {
    var urlRequest = this.urlAccident + "/" + id;
    console.log(urlRequest);
    return this.http.delete(urlRequest);
  }

  addAccident(jsonAccident) {
    var urlRequest = this.urlAccident + "/";
    console.log(urlRequest);
    return this.http.post(urlRequest, jsonAccident);
  }

  updateAccident(jsonAccident, id) {
    var urlRequest = this.urlAccident + "/" + id;
    console.log(urlRequest);
    return this.http.put(urlRequest, jsonAccident);
  }
}
