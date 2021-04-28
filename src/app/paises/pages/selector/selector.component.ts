import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {switchMap, tap} from 'rxjs/operators';
import { Paises } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group({
    region  : ['',Validators.required],
    pais    : ['',Validators.required],
    frontera: ['',Validators.required]
  })


  //llenarSelectores

  regiones:string[] = [];
  paises:Paises[] = [];
  frontera:string[] = []

  guardar(){
    console.log(this.miFormulario.value)
  }

  constructor(private fb:FormBuilder,private paisesService: PaisesService) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    //Cuando Cambie la region

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap((_)=>{
        this.miFormulario.get('pais').reset('');
      }),
      switchMap(region => this.paisesService.getPaisesPorRegion(region)  )
    )
    .subscribe(paises => {
      this.paises = paises
    })

    //cuando Cambien el Pais

    this.miFormulario.get('pais')?.valueChanges
   
    .pipe(
      tap((_)=>{
        this.miFormulario.get('frontera').reset('')
      }),
      switchMap(codigo => this.paisesService.getPaisporCodigo(codigo) )
    )

    .subscribe(pais => {
      this.frontera = pais?.borders || []
    })
  }



}
