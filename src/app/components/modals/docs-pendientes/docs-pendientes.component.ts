import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-docs-pendientes',
  templateUrl: './docs-pendientes.component.html',
  styleUrls: ['./docs-pendientes.component.css'],
})
export class DocsPendientesComponent implements OnInit {
  docsPendientes: any[] = [];
  @Input() notificaciones: any;
  mensajesNotificacion!:any

  constructor(
    private documentosService:DocumentosService,
    public activeModal: NgbActiveModal,
    private router:Router,
  ) {}


  ngOnInit() {
    this.docsPendientes = this.documentosService.getDocsPendientes();
    this.mensajesNotificacion=this.notificaciones.map((noti:any)=>{
      if(noti.mail_firmante==="1"){
        return {
          tipo:"nuevoDoc",
          msg:`Se ha cargado un nuevo documento ${noti.doc_firmado} en el que figuras como firmante`
        }
      } else{ 
        return {
          tipo:"nuevaFirma",
          msg:`Su documento "${noti.doc_firmado}" ha sido firmado por el usuario ${noti.mail_firmante}`
        }
      }
    })
  }
  
  irAFirmar(){
    this.router.navigate(['/private/docsFirmar']);
    this.activeModal.close({ estado: false})
  }

  irAlDocumento(docId:any){
    this.router.navigate([`private/vista/${docId}`]);
  }
}
