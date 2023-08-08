import { Component, OnInit , Input} from '@angular/core';
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
  @Input() sistema: any;
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
      disponible: [''],
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
              this.activeModal.close({estado:true});
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
      }
    }
  }
  async onSubmitEdicion(){
    let sistema=this.removeEmptyValues(this.systemForm.value)
    sistema.id=this.sistema.me_id
      await this.spinner.show();
    let data={
      sistema
    }
    console.log(data)
      this.parametrosService.editarMedio(data).subscribe(
        {
        next: async (res: any) => {
          await this.spinner.hide();
          console.log(res)
          this.toastrService.success(res.message);
        },
        error: async (error: any) => {
          await this.spinner.hide();
          console.log(error)
          this.toastrService.warning(error);
        }
        });
  }
  removeEmptyValues(obj: any): any {
    const data: any = {};
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== '') {
        data[key] = obj[key];
      }
    }
    return data;
  }
}


