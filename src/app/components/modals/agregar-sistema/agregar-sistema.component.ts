import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'agregar-sistema',
  templateUrl: './agregar-sistema.component.html',
  styleUrls: ['./agregar-sistema.component.css'],
})
export class AgregarSistema implements OnInit {
  systemForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private parametrosService: ParametrosService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.systemForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      url: ['', Validators.required],
      sigla: ['', [Validators.required]],
      clave: [''],
    })
  }

  async onSubmit() {
    if (this.systemForm.valid) {
      console.log(this.systemForm.value);
      const data = {
        medio: {
          descripcion: this.systemForm.value.nombre,
          sigla: this.systemForm.value.sigla,
          url: this.systemForm.value.url,
          disponible: 1
        }
      }
      try {
        await this.spinner.show();
        this.parametrosService.crearMedio(data).subscribe(
          {
            next: async (res: any) => {
              console.log(res);
              await this.spinner.hide();
            },
            error: async (error: any) => {
              await this.spinner.hide();
              console.log(error)
              this.toastrService.warning(error);
            }
          });
      } catch (error: any) {
        await this.spinner.hide();
        console.log(error)
        if (error.status.toString() === '404') {
          this.toastrService.warning(error.error.message);
        } else if (['0', '401', '403', '504'].includes(error.status.toString())) {

        } else {
          this.toastrService.error("Ha ocurrido un error");
        }
        console.log(error);
      }
    }
  }
}


