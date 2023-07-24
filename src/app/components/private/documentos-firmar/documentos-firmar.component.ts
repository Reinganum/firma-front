import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { DocumentData } from '../types';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { CorreosService } from 'src/app/services/correos.service';
import { MatSort } from '@angular/material/sort';

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

  constructor(
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private correosService: CorreosService

      ){
        this.filtrosForm = this.formBuilder.group({
          fechaDoc: [null],
          origen: [null],
          fechaInicio: [null],
          fechaComunicacion: [null]
        });
      }
  currentUser:any;

  ngOnInit():void {
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    const rutaActual = window.location.pathname;
    const user=localStorage.getItem("currentUser");
    if(typeof user === "string"){
      this.currentUser=JSON.parse(user)
    }
    console.log(this.currentUser)
    if (rutaActual?.includes('docsFirmar')) {
      console.log("docsFirmar");
      this.tipoTabla = 'firmar';

    } else if (rutaActual?.includes('docsFirmados')) {
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
    console.log(this.paginador.pageSize)

    this.sort.sortChange.subscribe(async () => {
      this.paginador.firstPage();
      await this.obtenerDocumentos(this.sort.active, this.sort.direction, this.paginador.pageSize, this.paginador.pageIndex);
    });
    
    this.paginador.page.subscribe(async ()=>{
      await this.obtenerDocumentos(this.sort.active, this.sort.direction, this.paginador.pageSize, this.paginador.pageIndex);
    })
  }

  @ViewChild(MatPaginator,{static:true}) paginador!:MatPaginator;
  @ViewChild(MatTable,{static:true}) table!:MatTable<any>;


  documentosFirmar:any[]=[]

  filtrar() {
    this.paginador.firstPage();
    this.paginador.pageSize = this.pageSize;
    const formattedDate=this.convertDateFormat(this.filtrosForm.value.fechaDoc)
    console.log(formattedDate)
    console.log(this.filtrosForm.value)
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
  }

  limpiar() {
    this.filtrosForm.reset()
  }

  exportar() {

  }

  onCheckChange($event:any){
    if($event.target.checked){
      this.documentosFirmar.push(this.documentList[$event.target.value]);
      console.log(this.documentosFirmar);
    } else {
      this.documentosFirmar.splice($event.target.value,1);
      console.log(this.documentosFirmar);
    }
  }

  async obtenerDocumentos(sortField: any, sortDirection: any, pageLimit: any, pageOffset: any) {
    try {
      await this.spinner.show();
      this.documentosService.obtenerDocumentos(
        this.filtrosForm.value.origen,
        this.filtrosForm.value.fechaDoc,
        sortField, 
        sortDirection,
        pageLimit,
        pageOffset).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.documentList = res.listaDocs.data;
              this.totalFilas= res.listaDocs.total;
              //this.documentList = res.listaDocs;
              //this.totalFilas= res.listaDocs.length;
              await this.spinner.hide();
          },
          error: async (error:any) => {
            console.log(error)
            this.documentList = [];
            this.totalFilas = 0;
            await this.spinner.hide();
          }
      });
    } catch (error:any) {
      await this.spinner.hide();

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

  showModal(){
    this.modalRef=this.modalService.open(ConfirmacionFirmaDocumentoComponent,{backdrop:'static',size:'md'});
    this.modalRef.result.then((res)=>{
      if(res.estado){

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

  private convertDateFormat(inputDate: string): string {
    const dateObject = new Date(inputDate);
    const day = this.addLeadingZero(dateObject.getDate());
    const month = this.addLeadingZero(dateObject.getMonth() + 1);
    const year = dateObject.getFullYear();

    return `${day}-${month}-${year}`;
  }

  private addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

   documentList!:any[];

   async firmarSeleccionados(){
    // falta ver lógica de multifirma
    await this.spinner.show();
    this.documentosService.crearPdfFirma({rut:"181154543"}).subscribe({
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
}
