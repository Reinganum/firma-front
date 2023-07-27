import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(
    private documentosService:DocumentosService,
    public activeModal: NgbActiveModal,
    private router:Router,
  ) {}


  ngOnInit() {
    this.docsPendientes = this.documentosService.getDocsPendientes();
    console.log(this.docsPendientes)
  }
  
  irAFirmar(){
    this.router.navigate(['/private/docsFirmar']);
    this.activeModal.close({ estado: false})
  }
}
