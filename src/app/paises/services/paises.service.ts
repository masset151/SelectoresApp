import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Paises, PaisSmall } from '../interfaces/paises.interface';

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



  getPaisesPorRegion(continente:string):Observable<Paises[]>| null{
    const url:string = `${this._baseUr}/region/${continente}?fields=alpha3Code;name`
    return this.http.get<Paises[]>(url)
  }

  getPaisPorCodigo(codigo:string):Observable<Paises>{

    if(!codigo){
      return of(null)
    }

    const url:string = `${this._baseUr}/alpha/${codigo}`
    return this.http.get<Paises>(url)

  }

  getPaisPorCodigoSmall(codigo:string):Observable<PaisSmall>{

    const url:string = `${this._baseUr}/alpha/${codigo}?fields=alpha3Code;name`
    return this.http.get<PaisSmall>(url)

  }

  getPaisesPorCodigos( borders: string[] ): Observable<PaisSmall[]>{
    if(!borders){
      return of([])

    }
    
   
    const peticiones: Observable<PaisSmall>[] = [];

    borders.forEach( codigo => {
      const peticion = this.getPaisPorCodigoSmall(codigo);
      peticiones.push( peticion );
    });

    return combineLatest(peticiones)
     
   }


  }


