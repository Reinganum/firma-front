import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComunesService } from 'src/app/services/comunes.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CanvasElement } from 'pdfmake/interfaces';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { Location } from '@angular/common';
import { Firmante } from '../../private/types';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-firma-externos',
  templateUrl: './firma-externos.component.html',
  styleUrls: ['./firma-externos.component.css'],
})

export class FirmaExternosComponent implements OnInit {
  archivoFirmar:string = '';
  idDoc!:number;
  modalRef!: NgbModalRef;
  zoom:number=1
  rotation:number=0
  currentPage:number=1
  totalPages:number=1
  fileName:string=""
  currentUser:any=""
  page!:any
  pdfMake = pdfFonts.pdfMake.vfs;
  token!:any;

  constructor(
    private comunesServices: ComunesService,
    private route: ActivatedRoute,
    private documentosService: DocumentosService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private authenticationService:AuthenticationService,
    private location: Location
  ) {
    
  }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.route.params.subscribe((params:any) => {
      this.token=params["token"] || null;
      this.idDoc = params["id"];
      console.log(this.token)
      localStorage.setItem('tokenUrl', JSON.stringify(this.token));
      try{
           /*
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          });
          */ 
          this.obtenerPath(this.idDoc);
      } catch (error){
        console.log(error)
      }
    })
  }

  volver() {
    this.location.back();
  }

  rotate():void{
    this.rotation+=90
  }

  zoomIn():void{
    this.zoom += 0.25
  }

  zoomOut():void{
    this.zoom > 0.25 ? this.zoom -= 0.25 : this.zoom;
  }
  async obtenerPath(id:number) {
    await this.spinner.show();
    this.documentosService.listaDocId(id).subscribe({
      next: async (res:any) => {
        console.log(res);
        if (!res.documento) {
          await this.spinner.hide();
          this.router.navigate(["consulta-documento"]);
          this.toaster.warning("No se encontró el documento.");
          return ;
        }
        this.obtenerPathS3(res.documento.archivo)
        this.fileName=res.documento.archivo
      },
      error: async (error:any) => {
        await this.spinner.hide();
        console.error(error);

      }
    });
  }

  async obtenerPathS3(archivo:any) {
    console.log(archivo);
    const fileData:any = {
      key: archivo,
      metodo: 'get'
    }
    let resultado:any;
    try {
      resultado = await this.comunesServices.getSignedUrl(fileData).toPromise();
      console.log(resultado);
      this.archivoFirmar = resultado.message;
      this.toaster.success("Documento cargado correctamente!");
      await this.spinner.hide();
    } catch (error:any) {
      console.log(error);      
      await this.spinner.hide();
    }
  }

  async descargarArchivo(archivo:any){
    const fileData:any = {
      key: archivo,
      metodo: 'get'
    }
    const resultado:any = await this.comunesServices.getSignedUrl(fileData).toPromise();
    const link = document.createElement('a');
    link.href = resultado.message;
    link.download = fileData.key.split('/')[fileData.key.split('/').length - 1];
    link.target = '_blank';
    link.click();
  }

  modalFirmar() {
    this.modalRef = this.modalService.open(ConfirmacionFirmaDocumentoComponent, {backdrop: 'static', size: 'lg'});
  }
  callBackFn(pdf: PDFDocumentProxy) {
    this.totalPages=pdf._pdfInfo.numPages
    console.log(pdf._pdfInfo.numPages)
 }
  pasarPagina():void{
    this.currentPage < this.totalPages ? this.currentPage+=1 : this.currentPage=1
  }
}

