import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Error } from 'src/app/interfaces/error';
import { DocumentosService } from 'src/app/services/documentos.service';
import { MotoresService } from 'src/app/services/motores.service';
import { EnumTipoValidacion } from 'src/app/shared/globals.shared';
import { Data } from 'src/app/interfaces/data';
@Component({
	selector: 'agregar-usuario',
	templateUrl: './agregar-usuario.component.html',
	styleUrls: ['./agregar-usuario.component.css'],
})

export class AgregarUsuario implements OnInit {
	userForm!: FormGroup;
  @Input() usuario: any;
	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private spinner: NgxSpinnerService,
		private toastrService: ToastrService,
		private userService: UsuariosService,
    private motorServices:MotoresService
	) { }

  errores:Error[]=[]

	ngOnInit() {
		this.userForm = this.formBuilder.group({
			nombres: ['', Validators.required],
			apellidoP: ['', Validators.required],
			apellidoM: ['', Validators.required],
			rut: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			cargo: ['', [Validators.required]],
			clave: ['', [Validators.required]],
			tipo: ['', [Validators.required]],
			estado: [''],
		})
    console.log(this.usuario)
	}

	async onSubmit() {
    this.errores=[]
    const data:Data[]=[]
    data.push({
      nombreCampo: 'nombres',
      valor: this.userForm.value.name,
      validaciones: [{
          tipo: EnumTipoValidacion.CAMPOREQUERIDO
      }]
    })
    try{
      await this.motorServices.motorValidacion(data).subscribe({
        next:res=>{

        },
        error:error=>(console.log(error)
        )
      });
      try{
        if (this.userForm.valid) {
          let data = {
            usuario: {
              rut: this.userForm.value.rut,
              nombres: this.userForm.value.nombres,
              apellidoP: this.userForm.value.apellidoP,
              apellidoM: this.userForm.value.apellidoM,
              tipo: this.userForm.value.tipo,
              email: this.userForm.value.email,
              estado: this.userForm.value.estado,
              cargo: this.userForm.value.cargo,
              clave: this.userForm.value.clave,
            }
          }
          try {
            await this.spinner.show();
            this.userService.crearUsuario(data).subscribe(
              {
              next: async (res: any) => {
                await this.spinner.hide();
                this.toastrService.success(res.message);
              },
              error: async (error: any) => {
                await this.spinner.hide();
                console.log(error)
                this.toastrService.warning(error);
              }
              });
          } catch (error: any) {
            await this.spinner.hide();
            if (error.status.toString() === '404') {
              this.toastrService.warning(error.error.message);
            } else if (['0', '401', '403', '504'].includes(error.status.toString())) {
        
            } else {
              this.toastrService.error("Ha ocurrido un error");
            }
            }
        }
      }catch(error){
        console.log(error);
      }
    }catch (error:any){
      console.log(error);
      if(error=='OK'){
        for (const error of this.errores) {
          this.userForm.controls[error.atributo]?.markAsTouched();
          this.userForm.controls[error.atributo]?.setErrors({'incorrect': true});
      }
        } else {
            console.log(error);
            this.toastrService.error("Ha ocurrido un error al validar información general");
        }
      await this.spinner.hide();
            /*if (error.status.toString() === '409') {
                this.errores = [...error.error];
                for (const error of this.errores) {
                    this.userForm.controls[error.atributo]?.markAsTouched();
                    this.userForm.controls[error.atributo]?.setErrors({'incorrect': true});
                }
            } else {
                console.log(error);
                this.toastrService.error("Ha ocurrido un error al validar información general");
            }
            */
    }
	}

  async onSubmitEdicion(){
    let usuario=this.removeEmptyValues(this.userForm.value)
    usuario.id=this.usuario.id
      await this.spinner.show();
    let data={
      usuario
    }
    console.log(data)
      this.userService.editarUsuario(data).subscribe(
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
