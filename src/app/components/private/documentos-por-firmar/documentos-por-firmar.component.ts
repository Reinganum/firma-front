import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';

@Component({
  selector: 'app-documentos-por-firmar',
  templateUrl: './documentos-por-firmar.component.html',
  styleUrls: ['./documentos-por-firmar.component.css']
})
export class DocumentosPorFirmarComponent {
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
}
