import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private service_url : string = 'https://api.giphy.com/v1/gifs';
  private apiKey      : string = 'qHP06AaMiukPFrkExvErMG5BcFPg7obC';
  private _history    : string[] = [];
  public resultsAPI   : Gif[] = [];


  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    // localStorage.getItem('history') ? this._history = JSON.parse(localStorage.getItem('history')!) : this._history = [];
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.resultsAPI = JSON.parse(localStorage.getItem('resultsAPI')!) || [];
  }

  searchGifs(query: string = ''): string[] {
    query = query.trim().toLowerCase();
    if(!this._history.includes(query)){
      this._history.unshift( query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify( this._history) );
    }

    const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', query)
            .set('limit', '10');

    this.http.get<SearchGifsResponse>(`${this.service_url}/search`, { params })
    .subscribe( (response) => {
      // console.log(response.data);
      this.resultsAPI = response.data;
      localStorage.setItem('resultsAPI', JSON.stringify( this.resultsAPI) );
    } );
    return this._history;
  }

}
