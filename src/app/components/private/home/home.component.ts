import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerRutComponent } from '../../modals/obtener-rut/obtener-rut.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  modalRef!:NgbModalRef;
  constructor(
    private modalService:NgbModal
  ) {}
  async ngOnInit() {
    this.abrirModalRut();
  }

  abrirModalRut() {
    this.modalRef = this.modalService.open(ObtenerRutComponent, { backdrop: 'static', size: 'sm'});
    this.modalRef.result.then(res => {
      if (res.estado) {
        console.log(res);
        console.log(res.estado);
      }

    });
  }
}
