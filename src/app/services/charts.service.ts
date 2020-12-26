import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  backEndUrl = environment.apiUrl + 'charts/';
  constructor(private http: HttpClient) { }

  getCompleteChartsData() {
    console.log("hello");

    return this.http.get<{message: string, data: any}>(this.backEndUrl);
  }
}
