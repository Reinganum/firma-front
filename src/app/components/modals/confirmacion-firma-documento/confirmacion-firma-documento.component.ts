import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../private/types';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ComunesService } from 'src/app/services/comunes.service';


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
    private toastr: ToastrService,
    private documentosService:DocumentosService,
    private comunesServices:ComunesService
    ) {}

  userInfo:any={}

  userKnown:boolean=true;

  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;

  }

  confirmar() {/*
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/private/docsFirmados']);
      this.toastr.success("Documento firmado correctamente")
    } else {
      this.router.navigate(['/consulta-documento']);
    } */
    console.log("confirmar clickeado");
    
    this.documentosService.crearPdfFirma({
      rut:181154543
    }).subscribe({
      next: async (res)=>{
        console.log(res);
        const fileData:any = {
          key: res.nombreArchivo,
          metodo: 'get'
        }
        const resultado:any = await this.comunesServices.getSignedUrl(fileData).toPromise();
        const link = document.createElement('a');
        link.href = resultado.message;
        link.download = fileData.key.split('/')[fileData.key.split('/').length - 1];
        link.target = '_blank';
        link.click();
      }, error:(error)=>{
        console.log(error);
      }
    })
    this.activeModal.close({ estado: true});
  }
}
