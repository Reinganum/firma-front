import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { Document, DocumentData } from '../types';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.css']
})
export class DocumentosFirmarComponent {
  modalRef!:NgbModalRef

  constructor(private modalService:NgbModal){}

  showModal(){
    this.modalRef=this.modalService.open(ConfirmacionFirmaDocumentoComponent,{backdrop:'static',size:'lg'});
    this.modalRef.result.then((res)=>{
      if(res.estado){
        console.log("pulsó firmar documentos")
      }
    })
  }
  documentData:DocumentData[]=[
    {icon:"../assets/img/calendario_tabla.svg",nombre:"Fecha"},
    {icon:"../assets/img/archivo_tabla.svg",nombre:"Documento"},
    {icon:"../assets/img/origen_tabla.svg",nombre:"Origen"},
    {icon:"../assets/img/opcion_tabla.svg",nombre:"Opciones"}
  ]
  documentList:Document[]=[
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"}
  ]

}
