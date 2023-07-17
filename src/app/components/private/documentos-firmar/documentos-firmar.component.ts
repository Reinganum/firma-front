import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { DocumentData } from '../types';
import { ActivatedRoute} from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';
import {NgxSpinnerService} from "ngx-spinner";
import { Location } from '@angular/common';

enum SwitchRender{
  "Usuario OTEC Firmar"=1,
  "Usuario OTEC Firmado",
  "Usuario externo firmar",
  "Usuario externo firmado"
}

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.css']
})

export class DocumentosFirmarComponent implements OnInit {
  modalRef!:NgbModalRef
  isChecked: boolean = false
  firmaParam:any="firmar"
  userInfo:any={}
  totalFilas!:number
  pageSize=5
  pageSizeOptions=[5,10,20];
  tipoTabla:string = '';
  constructor(
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route:ActivatedRoute,
    private location: Location

      ){}

  casosSwitch:SwitchRender=SwitchRender['Usuario OTEC Firmar'];

  ngOnInit(): void {
    this.obtenerDocumentos(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    const rutaActual = window.location.pathname;

    if (rutaActual?.includes('docsFirmar')) {
      console.log("docsFirmar");
      this.tipoTabla = 'firmar';
      this.casosSwitch=SwitchRender['Usuario OTEC Firmar'];
    } else if (rutaActual?.includes('docsFirmados')) {
      console.log("docsFirmados");
      this.tipoTabla = 'firmados';
      this.casosSwitch=SwitchRender['Usuario OTEC Firmado'];
    }
  }

  ngAfterViewInit(){
    this.paginador._intl.itemsPerPageLabel="Items por Página";
    this.paginador._intl.nextPageLabel="Página Siguiente";
    this.paginador._intl.previousPageLabel="Página Anterior";
    this.paginador._intl.getRangeLabel=dutchRangeLabel;
    console.log(this.paginador.pageSize)
    this.paginador.page.subscribe((data)=>{
      this.obtenerDocumentos(this.paginador.pageIndex, this.paginador.pageSize);
    })
  }

  @ViewChild(MatPaginator,{static:true}) paginador!:MatPaginator;
  @ViewChild(MatTable,{static:true}) table!:MatTable<any>;


  documentosFirmar:any[]=[]
  onCheckChange($event:any){
    if($event.target.checked){
      this.documentosFirmar.push(this.documentList[$event.target.value]);
      console.log(this.documentosFirmar);
    } else {
      this.documentosFirmar.splice($event.target.value,1);
      console.log(this.documentosFirmar);
    }
  }
  
  async obtenerDocumentos(pageOffset:number,pageLimit:number) {
    try {
      // await this.spinner.show();
      this.documentosService.listarDocumentos(pageOffset,pageLimit).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.documentList = res.documentos.data;
              this.totalFilas= res.documentos.total;
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
        this.toastrService.info('Pinchaste firmar documentos toastr')
      }
    })
  }

  documentData:DocumentData[]=[
    {icon:"../assets/img/calendario_tabla.svg",nombre:"Fecha"},
    {icon:"../assets/img/archivo_tabla.svg",nombre:"Documento"},
    {icon:"../assets/img/origen_tabla.svg",nombre:"Origen"},
    //{icon:"../assets/img/firma_tabla.svg",nombre:"Estado"},
    {icon:"../assets/img/opcion_tabla.svg",nombre:"Opciones"}
  ];

  documentList:any[]=[
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , estado: "Firma parcial", medio: 3, id:0},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , estado: "Rechazado", medio: 2, id:1},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , estado: "Firmado", medio: 1, id:2},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , estado: "Firmado", medio: 3, id:3},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , estado: "Firma parcial", medio: 2, id:4}
   ];

  //  documentList!:any[];
}
