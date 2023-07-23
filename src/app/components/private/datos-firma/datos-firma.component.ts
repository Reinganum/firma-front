import { Component , OnInit} from '@angular/core';
import { User } from '../types';
import { AuthenticationService } from '../../auth/service/authentication.service';
@Component({
  selector: 'app-datos-firma',
  templateUrl: './datos-firma.component.html',
  styleUrls: ['./datos-firma.component.css']
})
export class DatosFirmaComponent implements OnInit{
  currentUser:any={}
  user:User={name:"Tania Cortés F.",rut:"15.446.942-5",email:"tcortes@otic.sofofa.cl",phone:"(+56 2) 23362890"}
  constructor(private authenticationService:AuthenticationService){}
  ngOnInit(): void {
    const user = localStorage.getItem("currentUser");
    if(typeof user === "string"){
      this.currentUser=JSON.parse(user)
    }
    console.log(this.currentUser);
  }
}


