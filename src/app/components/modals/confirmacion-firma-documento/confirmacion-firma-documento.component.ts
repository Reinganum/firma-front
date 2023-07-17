import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../private/types';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-confirmacion-firma-documento',
  templateUrl: './confirmacion-firma-documento.component.html',
  styleUrls: ['./confirmacion-firma-documento.component.css']
})
export class ConfirmacionFirmaDocumentoComponent implements OnInit{
  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService:AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) {}

  userInfo:any={}

  userKnown:boolean=true;

  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;

  }

  confirmar(){
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/private/docsFirmados']);
      this.toastr.success("Documento firmado correctamente")
    } else {
      this.router.navigate(['/consulta-documento']);
    }
    this.activeModal.close({ estado: true});
  }
}
