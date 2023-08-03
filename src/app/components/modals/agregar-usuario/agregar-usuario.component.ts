import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
	selector: 'agregar-usuario',
	templateUrl: './agregar-usuario.component.html',
	styleUrls: ['./agregar-usuario.component.css'],
})
export class AgregarUsuario implements OnInit {
	userForm!: FormGroup;

	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private spinner: NgxSpinnerService,
		private toastrService: ToastrService,
		private userService: UsuariosService,
	) { }

	ngOnInit() {
		this.userForm = this.formBuilder.group({
			name: ['', Validators.required],
			apellidoP: ['', Validators.required],
			apellidoM: ['', Validators.required],
			rut: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			cargo: ['', [Validators.required]],
			clave: ['', [Validators.required]],
			tipo: ['', [Validators.required]],
			estado: [''],
		})
	}

	async onSubmit() {
		if (this.userForm.valid) {
			let data = {
				usuario: {
					rut: this.userForm.value.rut,
					nombres: this.userForm.value.name,
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
	}
}
