import { Component , OnInit} from '@angular/core';
import { User } from '../types';
import { AuthenticationService } from '../../auth/service/authentication.service';
@Component({
  selector: 'app-datos-firma',
  templateUrl: './datos-firma.component.html',
  styleUrls: ['./datos-firma.component.css']
})
export class DatosFirmaComponent implements OnInit{
  userInfo:any={}
  user:User={name:"Tania Cortés F.",rut:"15.446.942-5",email:"tcortes@otic.sofofa.cl",phone:"(+56 2) 23362890"}
  constructor(private authenticationService:AuthenticationService){}
  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;
    console.log(this.userInfo);
  }
}


