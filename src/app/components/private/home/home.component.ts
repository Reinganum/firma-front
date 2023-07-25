import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerRutComponent } from '../../modals/obtener-rut/obtener-rut.component';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  documentList!:any
  totalFilas!:any

  constructor(
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,) {}

  async ngOnInit(){
    //this.obtenerDocumentos({})
  }
  async obtenerDocumentos() {
    try {
      await this.spinner.show();
      const data = {
        documento: {
          archivo:`Cargas/PDFFirmados/${Date.now()}_181154543-firmado.pdf`,
          archivoFirmado:null,
          estado:2,
          firmantes:null,
          fecha:"2023-07-24",
          tipoGestion:1,
          responsable:63,
          idAc:null,
          medio:1,
          fechaFirma:null
        }
      }
        
      this.documentosService.crearDocumento(data).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              await this.spinner.hide();
          },
          error: async (error:any) => {
            await this.spinner.hide();

            if (error.status.toString() === '404') {
              this.toastrService.warning(error.error.message);
            } else if (['0', '401', '403', '504'].includes(error.status.toString())) {
              this.toastrService.error("Error de conexión.");
            } else {
              this.toastrService.error("Ha ocurrido un error.");
            }
          }
      });
    } catch (error:any) {
      await this.spinner.hide();

      if (error.status.toString() === '404') {
        this.toastrService.warning(error.error.message);
      } else if (['0', '401', '403', '504'].includes(error.status.toString())) {

      } else {
        this.toastrService.error("No se pudo crear documento");
      }
      console.log(error);
    }
  }
}
