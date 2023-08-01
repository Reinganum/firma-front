import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'agregar-sistema',
  templateUrl: './agregar-sistema.component.html',
  styleUrls: ['./agregar-sistema.component.css'],
})
export class AgregarSistema implements OnInit {
  systemForm!: FormGroup;
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.systemForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      api: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    })
  }

  onSubmit(){
    if (this.systemForm.valid) {
      console.log(this.systemForm.value);
      
    }
  }
}