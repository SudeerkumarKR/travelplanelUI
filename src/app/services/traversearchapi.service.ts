import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SEARCH } from '../constants';
@Injectable({
  providedIn: 'root'
})
export class TravelSearchAPIService {

  constructor(private http: HttpClient) { }

  getCity(city: string) {
    console.log(`${SEARCH}${city}`)
    return this.http.get(`${SEARCH}${city}`); 
}
}
