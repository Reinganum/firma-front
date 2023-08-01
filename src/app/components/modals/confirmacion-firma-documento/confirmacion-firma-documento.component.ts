import { Component, OnInit, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../private/types';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ComunesService } from 'src/app/services/comunes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CorreosService } from 'src/app/services/correos.service';


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
    private spinner: NgxSpinnerService,
    private correosService:CorreosService
    ) {}

  userInfo:any={}
  @Input() documento:any;
  @Input() key:any;
  userKnown:boolean=true;

  firmantes: any[] = [
    {nombre: 'Nicolas', rut: '', correo: 'nicolas@gmail.com', firmo: false},
    {nombre: 'Nicolas22', rut: '', correo: 'ncatalan@nexia.cl', firmo: false},
  ]

  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;
    console.log(this.documento);
    console.log(this.userInfo);
    
  }

  async confirmar(){
    // if (localStorage.getItem('currentUser')) {
    //   this.router.navigate(['/private/docsFirmados']);
    //   this.toastr.success("Documento firmado correctamente")
    // } else {
    //   this.router.navigate(['/consulta-documento']);
    // }
    this.firmantes.map((firmante:any) => {
      if (firmante.correo == this.userInfo.email) {
        firmante.firmo = true;
      }
    })
    await this.spinner.show();
    // this.notificarFirma() NOTIFICACION FUNCIONANDO
    this.documentosService.crearPdfFirma({
          key: this.key,
          firmantes: this.firmantes
      }).subscribe({
      next: async (res) => {
        console.log(res);
        const url:any = await this.comunesServices.getSignedUrl({key: res.archivo, metodo: 'get'}).toPromise();
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
    this.activeModal.close({ estado: true});
  }

  notificarFirma(){
    const datos = {
      email: this.userInfo.email,
      asunto: 'Nuevo documento firmado',
      seguimiento: `N° Doc: ${this.documento.id}`
    }
    this.correosService.notificarDocFirmado(datos).subscribe({
      next: (res:any) => {
        console.log(res);        
      },
      error: (error:any) => {
        console.log(error);
      }
    });
    this.activeModal.close({estado:true});
  }
}
