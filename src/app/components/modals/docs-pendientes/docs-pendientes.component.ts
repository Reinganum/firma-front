import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PendientesService } from 'src/app/services/pendientes.service';


@Component({
  selector: 'app-docs-pendientes',
  templateUrl: './docs-pendientes.component.html',
  styleUrls: ['./docs-pendientes.component.css'],
})
export class DocsPendientesComponent implements OnInit {
  docsPendientes: any[] = [];
  
  constructor(
    private pendientesService:PendientesService,
    public activeModal: NgbActiveModal,
    private router:Router,
  ) {}


  ngOnInit() {
    this.docsPendientes = this.pendientesService.getDocsPendientes();
    console.log(this.docsPendientes)
  }
  
  irAFirmar(){
    this.router.navigate(['/private/docsFirmar']);
    this.activeModal.close({ estado: false})
  }
}
