import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CorreosService } from 'src/app/services/correos.service';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-envio-correo',
  templateUrl: './envio-correo.component.html',
  styleUrls: ['./envio-correo.component.css']
})
export class EnvioCorreoComponent implements OnInit {
  userKnown:boolean=true;
  currentUser:any={}
  formEnvioCorreo!: FormGroup;
  @Input() documento:any;
  @Input() datosFirmante: any;
  correos:any;
  
/*
  [
    {value: 1, correo: 'ni.catalmir@gmail.com'},
    {value: 2, correo: 'ncatalan@nexia.cl'},
    {value: 3, correo: 'ni.catalmir@gmail.com'},
  ]
*/
  
  constructor(
    public activeModal: NgbActiveModal,
    private correosService: CorreosService,
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.correos=[{value:1, correo: this.currentUser.email}]
    this.formEnvioCorreo = this.formBuilder.group({
      correos: [null]
    });
    console.log(this.documento);
  }

  confirmar() {
    const datos = {
      email: this.formEnvioCorreo.value.correos.correo,
      asunto: 'Aviso de documento',
      seguimiento: `${this.documento.hashDoc}`,
      nombre: this.datosFirmante.nombres,
      apellido: this.datosFirmante.apellidos
    }
    this.spinner.show();
    this.correosService.notificarDocFirmado(datos).subscribe({
      next: (res:any) => {
        this.toaster.warning("El correo se envió exitosamente.");
        this.spinner.hide()        
      },
      error: (error:any) => {
        this.toaster.warning("Hubo un error en el envío del correo.");
        this.spinner.hide()  
      }
    });
    this.activeModal.close({estado:true});
  }
}
