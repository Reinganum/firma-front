import { Component, OnInit, Input } from '@angular/core';
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
export class ConfirmacionFirmaDocumentoComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private documentosService: DocumentosService,
    private comunesServices: ComunesService,
    private spinner: NgxSpinnerService,
    private correosService: CorreosService
  ) { }

  userInfo: any = {}
  @Input() documento: any;
  @Input() key: any;
  userKnown: boolean = true;

  firmantes: any[] = []

  ngOnInit(): void {
    this.userInfo = this.authenticationService.currentUserValue;
    console.log(this.documento);
    console.log(this.userInfo);
  }

  async confirmar() {
    // if (localStorage.getItem('currentUser')) {
    //   this.router.navigate(['/private/docsFirmados']);
    //   this.toastr.success("Documento firmado correctamente")
    // } else {
    //   this.router.navigate(['/consulta-documento']);
    // }
    // let firmantesJson
    // console.log(this.documento.firmantes)
    // const firmantes = typeof this.documento.firmantes ==="string" ? `${}`: this.documento?.firmantes;
    // let esFirmante=false
    let firmantes: any = this.documento?.firmantes.replace(/\[|\]/g, '')
    try {
      firmantes = JSON.parse(`[${firmantes}]`)
    } catch (error: any) {
      console.error('Error al parsear el JSON:', error.message);
    }
    let firma: boolean;
    let valida: any = firmantes.map((firmante: any, i: any) => {
      if (firmante.correo == "asd@gmail.com") { // AQUI TIENE QUE IR this.userInfo.email
        firmante.firmo = true;
        firma = true;
        return true;
      }
      firmante.firmo = false;
      return false;
    })
    console.log(firmantes);
    console.log(valida);

    if (!valida[0] && !valida[1]) {
      this.toastr.warning("No puedes firmar el documento, ya que no estás dentro de los firmantes");
      return;
    }

    await this.spinner.show();
    console.log(this.documento)
    this.documentosService.crearPdfFirma({
      key: `Cargas/Documentos/${this.documento.archivo}`,
      firmantes
    }).subscribe({
      next: async (res) => {
        console.log(res);
        res.datosTabla
        res.pdfBase64
        await this.firmar(res.datosTabla, res.pdfBase64);

      },
      error: async (error) => {
        console.log(error);
        await this.spinner.hide();
      }
    });
    this.activeModal.close({ estado: true });
  }

  async firmar(datosTabla: any, pdfBase64: any) {

    this.editarEstadoFirma()
    console.log(datosTabla);
    console.log(pdfBase64);

    const firma = await this.comunesServices.firma({ datosTabla: [["Nombre", "Rut", "Correo"], ["Nicola22s", "", "asd@gmail.com"]], pdfBase64 }).toPromise();
    console.log(firma);

    this.notificarFirma()/*
    let bucket = window.location.hostname !== "localhost" ? 'firma-otic-qa-doc' : "ofe-local-services"
    const url:any = await this.comunesServices.getSignedUrl({bucket, key: firma.key, metodo: 'get'}).toPromise();
    const link = document.createElement('a');
    link.href = url.message;
    link.download = firma.key.split('/')[firma.key.split('/').length - 1];
    link.target = '_blank';
    link.click();
    */
    await this.spinner.hide();
  }

  editarEstadoFirma() {
    const datos = {
      documento: {
        estado: 2,
        id: this.documento.id
      }
    }
    console.log(datos)
    this.documentosService.editarDocumento(datos).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.activeModal.close({ estado: true });
  }

  notificarFirma() {
    console.log(`se está enviando mail a ${this.userInfo.email}`)
    const datos = {
      email: `${this.userInfo.email}`,
      asunto: 'Nuevo documento firmado',
      seguimiento: `N° Doc: ${this.documento.id}`
    }
    
    this.correosService.notificarDocFirmado(datos).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.activeModal.close({ estado: true });
  }
}

