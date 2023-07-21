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
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    ) { }
 
  async ngOnInit(){
    this.obtenerDocumentos(1,63)
  } 
  async obtenerDocumentos(estado:any, responsable:any) {
    try {
      await this.spinner.show();
      this.documentosService.documentosPendientes(estado,responsable).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.documentList = res.documentos;
              await this.spinner.hide();
          },
          error: async (error:any) => {
            await this.spinner.hide();
            console.log(error)
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
      console.log(error)
      if (error.status.toString() === '404') {
        this.toastrService.warning(error.error.message);
      } else if (['0', '401', '403', '504'].includes(error.status.toString())) {

      } else {
        this.toastrService.error("Ha ocurrido un error");
      }
      console.log(error);
    }
  }
}
