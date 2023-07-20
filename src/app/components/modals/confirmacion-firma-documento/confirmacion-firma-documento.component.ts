import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../private/types';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ComunesService } from 'src/app/services/comunes.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private documentosService: DocumentosService,
    private comunesServices: ComunesService,
    private spinner: NgxSpinnerService
    ) {}

  userInfo:any={}

  userKnown:boolean=true;

  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;

  }

  async confirmar(){
    // if (localStorage.getItem('currentUser')) {
    //   this.router.navigate(['/private/docsFirmados']);
    //   this.toastr.success("Documento firmado correctamente")
    // } else {
    //   this.router.navigate(['/consulta-documento']);
    // }
    await this.spinner.show();
    this.documentosService.crearPdfFirma({rut:"23323"}).subscribe({
      next: async (res) => {
        console.log(res);
        const url:any = await this.comunesServices.getSignedUrl({key: res.nombreArchivo, metodo: 'get'}).toPromise();
        const link = document.createElement('a');
        link.href = url.message;
        link.download = res.nombreArchivo.split('/')[res.nombreArchivo.split('/').length - 1];
        link.target = '_blank';
        link.click();
        await this.spinner.hide();
      },
      error: async (error) => {
        console.log(error);
        await this.spinner.hide();

      }
    });
    // this.activeModal.close({ estado: true});
  }
}
