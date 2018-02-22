import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './AppSettings';

@Injectable()
export class LoaderCommentsService {

  constructor(private http:Http) { }

  private url = AppSettings.ACCIDENT_SERVER_URL + "accidents/";
//accidents?latstart=43.692887&lngstart=7.249432&latend=45.162432&lngend=5.715637

  getAccidentById(id){
    ///accidents/polygon?lat_center=43.296482&lng_center=5.36978&distance=1500
    var urlRequest = this.url + id;
    console.log(urlRequest);
    return this.http.get(urlRequest).map((response : Response) => response.json());
  }

  postCommentAccident(id,comment){
    var urlRequest = this.url  + id + "/comment";
    console.log(urlRequest);

    const req = this.http.post(urlRequest, {
      text: comment,
      rate: 3,
    });
    return req;
  }
}
