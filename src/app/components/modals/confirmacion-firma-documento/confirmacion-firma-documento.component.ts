import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirmacion-firma-documento',
  templateUrl: './confirmacion-firma-documento.component.html',
  styleUrls: ['./confirmacion-firma-documento.component.css']
})
export class ConfirmacionFirmaDocumentoComponent implements OnInit{
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  confirmar(){
    this.activeModal.close({ estado: true});
  }
}
