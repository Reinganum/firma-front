import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { Document } from '../types';

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
  documentList:Document[]=[
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"},
    {fecha: new Date("11-04-2023 10:30"), documento: "CarlosMirandaPrecontrato.pdf" , origen: "Gestión Normativa"}
  ]

}
