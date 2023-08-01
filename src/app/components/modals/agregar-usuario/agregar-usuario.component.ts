import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosService } from 'src/app/services/documentos.service';



@Component({
  selector: 'agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuario implements OnInit {
  docsPendientes: any[] = [];
  
  constructor(
    public activeModal: NgbActiveModal,
    private router:Router,
  ) {}

  ngOnInit() {

  }

}
