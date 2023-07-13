import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { Document, DocumentData } from '../types';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.css']
})
export class DocumentosFirmarComponent implements OnInit {
  modalRef!:NgbModalRef

  constructor(
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router
      ){}

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  async obtenerDocumentos() {
    try {
      this.documentosService.listarDocumentos(0, 5).subscribe((res:any) => {
        console.log(res);
        this.documentList = res.documentos;
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
  // documentList:any[]=[
  //   {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
  //   {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
  //   {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
  //   {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
  //   {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"}
  // ];

  documentList!:any[];

}
