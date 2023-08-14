import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComunesService } from 'src/app/services/comunes.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CanvasElement } from 'pdfmake/interfaces';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-firma-externos',
  templateUrl: './firma-externos.component.html',
  styleUrls: ['./firma-externos.component.css']
})

export class FirmaExternosComponent implements OnInit {
  archivoFirmar: string = '';
  idDoc!: number;
  modalRef!: NgbModalRef;
  zoom: number = 1
  rotation: number = 0
  currentPage: number = 1
  totalPages: number = 1
  fileName: string = ""
  currentUser: any = ""
  page!: any
  pdfMake = pdfFonts.pdfMake.vfs;
  token!: any;
  esFirmante=false;
  nombre=""
  rut!:any
 
  firmanteExterno=[{firmo:0}]

  constructor(
    private comunesServices: ComunesService,
    private route: ActivatedRoute,
    private documentosService: DocumentosService,
    private userService: UsuariosService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private location: Location,
    private jwtHelper: JwtHelperService
  ) {

  }

  ngOnInit(): void {
    
    this.currentUser = this.authenticationService.currentUserValue;
    this.route.params.subscribe((params: any) => {
      this.token = params["token"] || null;
      this.idDoc = params["id"];
      const token=this.jwtHelper.decodeToken(this.token)
      this.nombre=token.data.nombre
      this.rut=token.data.rut
      localStorage.setItem('tokenUrl', this.token);
      try {
        this.userService.verificarToken(this.token).subscribe({
          next: async (res: any) => {
            try {
              this.esFirmante=true
              this.obtenerPath(this.idDoc);
            } catch (error) {
              this.toaster.show("El token es inválido o ya expiró");
              return ;
            }
          },
          error: async (error: any) => {
            this.toaster.show("El token es inválido o ya expiró");
            console.error(error);
          }
        })
      } catch (error) {
        console.log(error);
        return;
      }
    })
  }

  volver() {
    this.location.back();
  }

  rotate(): void {
    this.rotation += 90
  }

  zoomIn(): void {
    this.zoom += 0.25
  }

  zoomOut(): void {
    this.zoom > 0.25 ? this.zoom -= 0.25 : this.zoom;
  }

  async obtenerPath(id:number) {
    await this.spinner.show();
    this.documentosService.listaDocId(id).subscribe({
      next: async (res: any) => {
        if (!res.documento) {
          await this.spinner.hide();
          this.router.navigate(["consulta-documento"]);
          this.toaster.warning("No se encontró el documento.");
          return;
        }
        this.obtenerPathS3(`Cargas/Documentos/${res.documento.data[0].archivo}`)
        this.fileName=res.documento.data[0].archivo;
        this.documento = res.documento.data[0];
        this.firmanteExterno=this.documento.firmantes.filter((f:any)=>f.rut=='19585125-5')
        console.log(this.firmanteExterno)
        console.log(res)
      },
      error: async (error: any) => {
        await this.spinner.hide();
        console.error(error);
      }
    });
  }
  documento:any;
  async obtenerPathS3(archivo:any) {
    const fileData:any = {
      key: archivo,
      metodo: 'get'
    }
    let resultado: any;
    try {
      resultado = await this.comunesServices.getSignedUrl(fileData).toPromise();
      this.archivoFirmar = resultado.message;
      this.toaster.success("Documento cargado correctamente!");
      await this.spinner.hide();
    } catch (error: any) {
      console.log(error);
      await this.spinner.hide();
    }
  }

  async descargarArchivo(archivo:any){
    const fileData:any = {
      key: `Cargas/Documentos/${archivo}`,
      metodo: 'get'
    }
    const resultado: any = await this.comunesServices.getSignedUrl(fileData).toPromise();
    const link = document.createElement('a');
    link.href = resultado.message;
    link.download = fileData.key.split('/')[fileData.key.split('/').length - 1];
    link.target = '_blank';
    link.click();
  }

  modalFirmar(){
    this.modalRef=this.modalService.open(ConfirmacionFirmaDocumentoComponent,{backdrop:'static',size:'md'});
    this.modalRef.componentInstance.documento = this.documento;
    this.modalRef.componentInstance.firmanteExterno=this.firmanteExterno
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.modalRef.close();
      }
    })
  }
  
  callBackFn(pdf: PDFDocumentProxy) {
    this.totalPages = pdf._pdfInfo.numPages
  }
  pasarPagina(): void {
    this.currentPage < this.totalPages ? this.currentPage += 1 : this.currentPage = 1
  }
}

