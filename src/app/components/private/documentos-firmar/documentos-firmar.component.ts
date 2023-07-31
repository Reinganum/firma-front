import { Component, OnInit, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { DocumentData } from '../types';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup } from '@angular/forms';
import { CorreosService } from 'src/app/services/correos.service';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { EnvioCorreoComponent } from '../../modals/envio-correo/envio-correo.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.css']
})

export class DocumentosFirmarComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  modalRef!:NgbModalRef
  isChecked: boolean = false
  firmaParam:any="firmar"
  userInfo:any={}
  totalFilas!:number
  pageSize=5
  pageSizeOptions=[5,10,20];
  tipoTabla:string = '';
  flagFiltros = false;
  filtrosForm!: FormGroup;
  dataSource:any;
  columnasFirmados: string[] = ['select','fecha', 'documento', 'origen', 'opciones'];

  constructor(
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private correosService: CorreosService,
      ){
        this.filtrosForm = this.formBuilder.group({
          fechaDoc: [null],
          origen: [null],
          fechaInicio: [null],
          fechaComunicacion: [null]
        });
        this.dataSource = new MatTableDataSource();
      }
  currentUser:any;
  estadoDoc!:number;
  selection = new SelectionModel<any>(true, []);
  
  ngOnInit():void {
    const rutaActual = window.location.pathname;
    const user=localStorage.getItem("currentUser");
    if(typeof user === "string"){
      this.currentUser=JSON.parse(user)
    }
    console.log(this.currentUser)
    if (rutaActual?.includes('docsFirmar')) {
      console.log("docsFirmar");
      this.tipoTabla = 'firmar';
      this.estadoDoc = 1;
    } else if (rutaActual?.includes('docsFirmados')) {
      this.estadoDoc = 2;
      console.log("docsFirmados");
      this.tipoTabla = 'firmados';
      this.documentData=[
        {icon:"../assets/img/calendario_tabla.svg",nombre:"Fecha"},
        {icon:"../assets/img/archivo_tabla.svg",nombre:"Documento"},
        {icon:"../assets/img/origen_tabla.svg",nombre:"Origen"},
        {icon:"../assets/img/firma_tabla.svg",nombre:"Estado"},
        {icon:"../assets/img/opcion_tabla.svg",nombre:"Opciones"}
      ]
    }
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    
    this.filtrosForm = this.formBuilder.group({
      fechaDoc: [null],
      origen: [null],
      RUT: [null],
      fechaComunicacion: [null],
    });
  }

  ngAfterViewInit(){
    this.paginador._intl.itemsPerPageLabel="Items por Página";
    this.paginador._intl.nextPageLabel="Página Siguiente";
    this.paginador._intl.previousPageLabel="Página Anterior";
    this.paginador._intl.getRangeLabel=dutchRangeLabel;

    this.sort.sortChange.subscribe(async () => {
      this.paginador.firstPage();
      this.obtenerDocumentos(this.sort.active, this.sort.direction, this.paginador.pageSize, this.paginador.pageIndex);
    });
    
    this.paginador.page.subscribe(async ()=>{
      this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    })
  }

  @ViewChild(MatPaginator,{static:true}) paginador!:MatPaginator;
  @ViewChild(MatTable,{static:true}) table!:MatTable<any>;


  documentosFirmar:any[]=[]

  filtrar() {
    this.paginador.firstPage();
    this.paginador.pageSize = this.pageSize;
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
  }

  limpiar() {
    this.filtrosForm.reset()
  }

  masterToggle() {
    if (this.isAllSelected()) {
      console.log(this.selection)
      this.selection.clear() 
    } else {
      this.documentList.forEach((row:any) => this.selection.select(row));
    }      
  }
  isAllSelected() {        
    const numSelected = this.selection.selected.length;
    const numRows = this.documentList.length;
    return numSelected === numRows;    
  }

  exportar() {

  }
  
  tag:boolean=false;

  async obtenerDocumentos(sortField: any, sortDirection: any, pageLimit: any, pageOffset: any) {
    try {
      console.log(this.estadoDoc);
      await this.spinner.show();
      this.documentosService.obtenerDocumentos(
      this.estadoDoc,
      this.filtrosForm.value.origen,
      this.convertDateForDB(this.filtrosForm.value.fechaDoc),
      sortField, 
      sortDirection == '' ? '' : sortDirection,
      pageLimit,
      pageOffset).subscribe(
        {
          next: async (res:any) => {
            console.log(
              "estado : ", this.estadoDoc,
              "origen : ", this.filtrosForm.value.origen,
              "fecha : ",this.filtrosForm.value.fechaDoc,
              "sort : ", sortField, 
              "Sdirect : ", sortDirection == '' ? '' : sortDirection,
              "Limit : ", pageLimit,
              "Offset : ", pageOffset
            )
              console.log(res);
              this.documentList = res.listaDocs.data;
              this.totalFilas= res.listaDocs.total;
              this.dataSource = new MatTableDataSource(this.documentList);
              this.tag = false;
              //this.documentList = res.listaDocs;
              //this.totalFilas= res.listaDocs.length;
              await this.spinner.hide();
          },
          error: async (error:any) => {
            console.log(error)
            this.documentList = [];
            this.totalFilas = 0;
            this.tag = true;
            await this.spinner.hide();
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

  vistaPrevia(documento:any) {
    this.router.navigate([`private/vista/${documento.id}`]);
  }

  showModal(documento:any){
    this.modalRef=this.modalService.open(ConfirmacionFirmaDocumentoComponent,{backdrop:'static',size:'md'});
    this.modalRef.componentInstance.documento = documento;
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.modalRef.close();
      }
    })
  }

  showModalCorreo(documento:any){
    this.modalRef=this.modalService.open(EnvioCorreoComponent,{backdrop:'static',size:'md'});
    this.modalRef.componentInstance.documento = documento;
    this.modalRef.componentInstance.key = `Cargas/Documentos/${documento.archivo}`;
    this.modalRef.componentInstance.documento = documento;
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.modalRef.close();
      }
    })
  }

  enviarNotificacion() {
    console.log(this.currentUser);
    const datosCorreo = {
      email: this.currentUser.email,
      asunto: "Envio Documento Firmado",
      nombre: `${this.currentUser.firstName} ${this.currentUser.lastName}`
    }
    this.correosService.notificarDocFirmado(datosCorreo).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  documentData:DocumentData[]=[
    {icon:"../assets/img/calendario_tabla.svg",nombre:"Fecha"},
    {icon:"../assets/img/archivo_tabla.svg",nombre:"Documento"},
    {icon:"../assets/img/origen_tabla.svg",nombre:"Origen"},
    {icon:"../assets/img/opcion_tabla.svg",nombre:"Opciones"}
  ];

  opcionesOrigen:any[]=[
    {value:1,origen:"Gestión Normativa"},
    {value:3,origen:"Portal Proveedores"},
    {value:2,origen:"Gestor Capital Humano"}
  ]

  private convertDateForDB(inputDate: string): string {
    if (inputDate) {
      const dateObject = new Date(inputDate);
      const day = this.addLeadingZero(dateObject.getDate());
      const month = this.addLeadingZero(dateObject.getMonth() + 1);
      const year = dateObject.getFullYear();

      return `${year}-${month}-${day}`;
    }
    return '';
  }

  public convertDateForTable(inputDate: string): string {
    if (inputDate) {
      const day = inputDate.slice(8,10)
      const month = inputDate.slice(5,7)
      const year = inputDate.slice(0,4)
  
      return `${day}-${month}-${year}`;
    }

    return '';
  }

  private addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

   documentList:any;

   async firmarSeleccionados(){
    if(this.selection.selected.length===0){
      return
    }
    this.selection.selected.forEach((document)=>{
      let firmantesJson
      const firmantes = `${document.firmantes.replace(/\[|\]/g, '')}`;
      try {
        firmantesJson = JSON.parse(`[${firmantes}]`);
      } catch (error:any) {
        console.error('Error al parsear el JSON:', error.message);
      }
        let esFirmante=false;
        document.firmantes=firmantesJson.map((firmante:any) => {
        if (firmante.correo == this.userInfo.email) {
          firmante.firmo = true;
          esFirmante=true
          console.log("usuario si pertenece a la lista de firmantes")
        }
        return firmante
      })
      if(esFirmante===false){
        this.toastrService.warning(`Tu usuario no está registrado para firmar el documento ${document.archivo}`)
      } else {
        this.documentosService.crearPdfFirma(document).subscribe({
          next: async (res) => {
         console.log(res);
         this.enviarNotificacion()
         await this.spinner.hide();
        },
        error: async (error) => {
          console.log(error);
          await this.spinner.hide();
        }
      });
      }
    })
  }
  
   extraerIniciales(origen:string){
    const strArr=origen.split(' ');
    if(strArr.length===1){
      return strArr[0].slice(0,1)
    } else {
      return strArr[0].slice(0,1)+strArr[1].slice(0,1)
    }
   }
}
