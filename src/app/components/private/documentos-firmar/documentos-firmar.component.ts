import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { DocumentData } from '../types';
import { ActivatedRoute, Params} from '@angular/router';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.css']
})

export class DocumentosFirmarComponent implements OnInit {
  modalRef!:NgbModalRef
  isChecked: boolean = false
  firmaParam!:any
  userInfo:any={}
  totalFilas!:number
  pageSize=5
  pageSizeOptions=[5,10,20]
  constructor(
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,

    private route:ActivatedRoute,
      ){}
  ngOnInit(): void {
    this.obtenerDocumentos(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    const rutaActual = this.route.snapshot.routeConfig?.path;
    if (rutaActual?.includes('docsFirmar')) {
      console.log("docsFirmar");

    } else if (rutaActual?.includes('docsFirmados')) {
      console.log("docsFirmados");

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


  OnPageChange(event:PageEvent){
    console.log(event)
  }

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
      await this.spinner.show();
      this.documentosService.listarDocumentos(pageOffset,pageLimit).subscribe(async (res:any) => {
        console.log(res);
        this.documentList = res.documentos;
        this.totalFilas=this.documentList[0].contadorDocumentos;
        await this.spinner.hide();
      });
    } catch (error:any) {
      console.log(error);
    }
  }

  vistaPrevia(documento:any) {
    this.router.navigate([`private/vista/${documento.id}`]);
  }

  showModal(){
    this.modalRef=this.modalService.open(ConfirmacionFirmaDocumentoComponent,{backdrop:'static',size:'lg'});
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
    {icon:"../assets/img/opcion_tabla.svg",nombre:"Opciones"}
  ];

  /*documentList:any[]=[
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , medio: 3, id:0},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , medio: 2, id:1},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , medio: 1, id:2},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , medio: 3, id:3},
     {fecha: new Date("11-04-2023 10:30"), nombreArchivo: "CarlosMirandaPrecontrato.pdf" , medio: 2, id:4}
   ];
*/
  documentList!:any[];

}
