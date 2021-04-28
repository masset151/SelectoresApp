import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paises } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUr:string = 'https://restcountries.eu/rest/v2'
  private _regiones:string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] ;

  get regiones():string[]{
    return [...this._regiones]
  }

  constructor(private http:HttpClient) { }



  getPaisesPorRegion(continente:string):Observable<Paises[]>{
    const url:string = `${this._baseUr}/region/${continente}?fields=alpha3Code;name`
    return this.http.get<Paises[]>(url)
  }

}
