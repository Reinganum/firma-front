import { Component } from '@angular/core';
import { User } from '../types';
@Component({
  selector: 'app-datos-firma',
  templateUrl: './datos-firma.component.html',
  styleUrls: ['./datos-firma.component.css']
})
export class DatosFirmaComponent {
  user:User={name:"Tania Cortés F.",rut:"15.446.942-5",email:"tcortes@otic.sofofa.cl",phone:"(+56 2) 23362890"}
}


