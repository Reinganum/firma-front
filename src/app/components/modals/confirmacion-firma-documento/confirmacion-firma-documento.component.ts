import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../private/types';
import { AuthenticationService } from '../../auth/service/authentication.service';
@Component({
  selector: 'app-confirmacion-firma-documento',
  templateUrl: './confirmacion-firma-documento.component.html',
  styleUrls: ['./confirmacion-firma-documento.component.css']
})
export class ConfirmacionFirmaDocumentoComponent implements OnInit{
  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService:AuthenticationService
    ) {}

  userInfo:any={}

  userKnown:boolean=true;

  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;

  }

  confirmar(){
    this.activeModal.close({ estado: true});
  }
}
