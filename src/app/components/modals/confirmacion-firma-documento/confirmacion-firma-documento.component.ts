import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../private/types';
@Component({
  selector: 'app-confirmacion-firma-documento',
  templateUrl: './confirmacion-firma-documento.component.html',
  styleUrls: ['./confirmacion-firma-documento.component.css']
})
export class ConfirmacionFirmaDocumentoComponent implements OnInit{
  constructor(public activeModal: NgbActiveModal) { }

  user:User={name:"Tania Cortés F.",rut:"15.446.942-5",email:"tcortes@otic.sofofa.cl",phone:"(+56 2) 23362890"}

  userKnown:boolean=true;

  ngOnInit(): void {
  }

  confirmar(){
    this.activeModal.close({ estado: true});
  }
}
