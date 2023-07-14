import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar-documento',
  templateUrl: './consultar-documento.component.html',
  styleUrls: ['./consultar-documento.component.css']
})
export class ConsultarDocumentoComponent implements OnInit{

  formDatosUsuario!:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.formDatosUsuario = this.formBuilder.group({
      codigoDoc: [null]
    });
  }
  consultarDocumento() {
    console.log(this.formDatosUsuario.value.codigoDoc);
    this.toaster.success("Código del documento:" + this.formDatosUsuario.value.codigoDoc);
    this.router.navigate([`private/vista/${this.formDatosUsuario.value.codigoDoc}`]);
  }
}
