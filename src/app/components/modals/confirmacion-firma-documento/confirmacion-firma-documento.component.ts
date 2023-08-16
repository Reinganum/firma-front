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
import { FirmantesService } from 'src/app/services/firmantes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    private correosService: CorreosService,
    private firmantesService: FirmantesService
  ) { }

  userInfo: any = {}
  @Input() documento: any;
  @Input() key: any;
  @Input() datosFirmante: any;
  userKnown: boolean = true;
  infoFirmante:any={}

  ngOnInit(): void {
    console.log(this.datosFirmante)
    console.log(this.documento)
  }

  async confirmar() {
    let firmantes: any = this.documento?.firmantes;
    let firma: boolean;
    let valida: any = firmantes.map((firmante: any, i: any) => {
      if (firmante.correo == this.datosFirmante.correo) {
        firmante.firmo = true;
        firma = true;
        return true;
      }
      firmante.firmo = false;
      return false;
    })
    if (valida.indexOf(true) === -1) {
      this.toastr.warning("No puedes firmar el documento, ya que no estás dentro de los firmantes");
      return;
    }
    let estadoDoc = this.setEstadoDoc(firmantes)
    console.log(valida)
    let datosFirmante = firmantes.filter((firmante: any) => {
      return firmante.correo == this.datosFirmante.correo
    })
    console.log(datosFirmante)
    const dataFirmante = {
      firmante: {
        firmo: 1
      },
      idDoc:this.documento.idDoc?this.documento.idDoc:this.documento.id,
      idFir: this.datosFirmante.id
    }
    await this.spinner.show();
    console.log(dataFirmante);
    
    this.editarFirmante(dataFirmante)
    this.documentosService.crearPdfFirma({
      key: `Cargas/Documentos/${this.documento.archivo}`,
      firmantes
    }).subscribe({
      next: async (res) => {
        console.log(res);
        res.datosTabla
        res.pdfBase64
        let listaNueva: any = [];
        res.datosTabla.map((datos: any) => {
          listaNueva.push(datos)
        });
        console.log(listaNueva);

        await this.firmar(listaNueva, res.pdfBase64);

      },
      error: async (error) => {
        console.log(error);
        await this.spinner.hide();
      }
    });
    this.activeModal.close({ estado: true });
  }

  editarFirmante(data: any) {
    this.firmantesService.editarFirmante(data).subscribe({
      next: async (res) => {
        console.log(res);
        await this.spinner.hide();
      },
      error: async (error) => {
        console.log(error);
        await this.spinner.hide();
      }
    });
  }

  async firmar(datosTabla: any, pdfBase64: any) {
    console.log(datosTabla);
    console.log(pdfBase64);
    const newDatos = JSON.stringify(datosTabla).replace("'", '"');
    console.log(JSON.parse(newDatos));
    const firma = await this.comunesServices.firma({ datosTabla, pdfBase64, hash: this.documento.hashDoc }).toPromise();
    console.log(firma);
    let bucket = window.location.hostname !== "localhost" ? 'firma-otic-qa-doc' : "ofe-local-services"
    const url: any = await this.comunesServices.getSignedUrl({ bucket, key: firma.key, metodo: 'get' }).toPromise();
    const link = document.createElement('a');
    console.log(url.message);

    link.href = url.message;
    link.download = firma.key.split('/')[firma.key.split('/').length - 1];
    link.target = '_blank';
    link.click();

    let estadoDoc = this.setEstadoDoc(this.documento?.firmantes);
    console.log(estadoDoc)
    this.editarEstadoFirma(estadoDoc, firma.key);
    await this.spinner.hide();
  }

  async editarEstadoFirma(estadoDoc: number, url: any) {
    const datos:any = {
      documento: {
        estado: estadoDoc,
        id: this.documento.id,
        archivoFirmado: url,
      }
    }
    if(estadoDoc===4){
      datos.documento.fechaFirma="2023-08-10"
    }
    console.log(datos)
    this.spinner.show();
    this.documentosService.editarDocumento(datos).subscribe({
      next: (res: any) => {
        this.toastr.success("Documento firmado exitosamente")
        this.crearNotificacion(this.documento)
        console.log(res);
        this.spinner.hide();
        this.notificarFirma()
        this.router.navigate([`private/docsFirmados`]);
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    });
    this.activeModal.close({ estado: true });
  }

  notificarFirma() {
    console.log(`se está enviando mail a ${this.userInfo.email}`)
    const datos = {
      email: `${this.userInfo.email}`,
      asunto: 'Nuevo documento firmado',
      seguimiento: `${this.documento.hashDoc}`
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

  crearNotificacion(document: any) {
    const datos = {
      responsable: document.responsable,
      firmante: this.userInfo.email,
      docFirmado: document.archivo
    }
    this.spinner.show();
    this.documentosService.crearNotificacion(datos).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  setEstadoDoc(firmantes: any) {
    console.log(firmantes)
    let firmasFaltantes=firmantes.filter((f:any)=>f.firmo===false||f.firmo===null||f.firmo===0||f.firmo==='')
    return firmasFaltantes.length > 0 ? 3 : 4
  }
}

