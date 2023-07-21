import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PendientesService } from 'src/app/services/pendientes.service';

@Component({
  selector: 'app-docs-pendientes',
  templateUrl: './docs-pendientes.component.html',
  styleUrls: ['./docs-pendientes.component.css']
})
export class DocsPendientesComponent implements OnInit {
  docsPendientes: any[] = [];
  array=["aidaoidjaiodjaiosdjioasdjoiadjioasdjioajdiodja","aisdjoiasjdiosadjoiasjdiosajdi","sjadioasjdiosjdoiajdioa",
        "asiodasidjsadiojaisdjaiodjaod,doakdkaopkopdadkopskdpos","saiodjadijaoaisjdadadioajd","saidjasodjasidiasdjaiodjaiodj",
        "saidjaiodjaoidjoiaaoidsajo","sasdjasijdaoidjiadjaiosdjisd"]
  constructor(
    private pendientesService:PendientesService,
    public activeModal: NgbActiveModal,
  ) {}


  ngOnInit() {
    this.docsPendientes = this.pendientesService.getDocsPendientes();
    console.log(this.docsPendientes)
  }
  
  aceptar() {
    this.activeModal.close({estado:true})
  }
}
