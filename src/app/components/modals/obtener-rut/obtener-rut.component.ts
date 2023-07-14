import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-obtener-rut',
  templateUrl: './obtener-rut.component.html',
  styleUrls: ['./obtener-rut.component.css']
})
export class ObtenerRutComponent implements OnInit {
  formDatosUsuario!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formDatosUsuario = this.formBuilder.group({
      rutUsuario: [null]
    });
  }

  aceptar() {
    this.activeModal.close({estado:true})
  }
}
