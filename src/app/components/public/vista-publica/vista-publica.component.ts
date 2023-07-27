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
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface Firmante {
  estado:number|string
  rut:string,
  nombres:string
}

@Component({
  selector: 'app-vista-publica',
  templateUrl: './vista-publica.component.html',
  styleUrls: ['./vista-publica.component.css'],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
]
})

export class VistaPublicaComponent implements OnInit {
  archivoFirmar:string = '';
  idDoc!:number;
  token!:string;
  modalRef!: NgbModalRef;
  zoom:number=1
  rotation:number=0
  currentPage:number=1
  totalPages:number=1
  fileName:string=""
  currentUser:any=""
  page!:any
  pdfMake = pdfFonts.pdfMake.vfs;
  userName!:string
  firmantes!:any // res.documento.firmantes

  constructor(
    private comunesServices: ComunesService,
    private route: ActivatedRoute,
    private documentosService: DocumentosService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private authenticationService:AuthenticationService,
    private jwt:JwtHelperService
  ) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      this.idDoc = params["id"];
      try{
          this.obtenerPath(this.idDoc);
      } catch (error){
        console.log(error)
      }
    })
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
          this.toaster.warning("No se encontró el documento.");
          return ;
        }
        this.obtenerPathS3(res.documento.archivo)
        this.fileName=res.documento.archivo
        let firmantesJson
        const firmantes = `${res.documento.firmantes.replace(/\[|\]/g, '')}`;
        try {
          firmantesJson = JSON.parse(`[${firmantes}]`);
          this.FIRMANTES_DATA=[]; // solo mientras exista el otro Firmantes data hardcoded
          firmantesJson.forEach((firmante:Firmante)=>{
            this.FIRMANTES_DATA.push({
                estado:firmante.estado===0?"Pendiente":"Firmado",rut:firmante.rut,nombres:firmante.nombres})
          })
        } catch (error:any) {
          console.error('Error al parsear el JSON:', error.message);
        }
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
    const resultado:any = await this.comunesServices.getSignedUrl(fileData).toPromise();
    console.log(resultado);
    this.archivoFirmar = resultado.message;
    this.toaster.success("Documento cargado correctamente!");
    await this.spinner.hide();
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
  columns = [
    {
      columnDef: 'Estado',
      header: 'Estado',
      cell: (element: Firmante) => `${element.estado}`,
    },
    {
      columnDef: 'RUT',
      header: 'RUT',
      cell: (element: Firmante) => `${element.rut}`,
    },
    {
      columnDef: 'Nombre',
      header: 'Nombre',
      cell: (element: Firmante) => `${element.nombres}`,
    },
  ];
  FIRMANTES_DATA: Firmante[] = [
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Carlos Valdivieso"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Alonso Pizarro"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Fernando Aravena"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Patricio Durán"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Carlos Valdivieso"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Alonso Pizarro"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Fernando Aravena"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Patricio Durán"},
    {estado: "Firmado", rut: '19.154.322-4', nombres:"Alonso Pizarro"},
    {estado: "Pendiente", rut: '19.154.322-4', nombres:"Fernando Aravena"},
    {estado: "Rechazado", rut: '19.154.322-4', nombres:"Patricio Durán"},
  ];
  dataSource = this.FIRMANTES_DATA;
  displayedColumns = this.columns.map(c => c.columnDef);
}

