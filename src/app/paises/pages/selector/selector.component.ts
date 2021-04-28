import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group({
    region:['',Validators.required]
  })

  guardar(){
    console.log(this.miFormulario.value)
  }

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

}
