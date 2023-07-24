import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CorreosService } from 'src/app/services/correos.service';

@Component({
  selector: 'app-envio-correo',
  templateUrl: './envio-correo.component.html',
  styleUrls: ['./envio-correo.component.css']
})
export class EnvioCorreoComponent implements OnInit {
  userKnown:boolean=true;
  userInfo:any={}
  formEnvioCorreo!: FormGroup;
  @Input() documento:any;
  correos = [{value: 1, correo: 'ni.catalmir@gmail.com'},
    {value: 2, correo: 'ncatalan@nexia.cl'},
    {value: 3, correo: 'ni.catalmir@gmail.com'}]
  

  constructor(
    public activeModal: NgbActiveModal,
    private correosService: CorreosService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formEnvioCorreo = this.formBuilder.group({
      correos: [null]
    });
    console.log(this.documento);
    
  }

  confirmar() {
    const datos = {
      email: this.formEnvioCorreo.value.correos,
      asunto: 'PRUEBA DESDE EL FRONT',
      seguimiento: `N° Doc: ${this.documento.id}`
    }
    this.correosService.notificarDocFirmado(datos).subscribe({
      next: (res:any) => {
        console.log(res);        
      },
      error: (error:any) => {
        console.log(error);

      }
    });
    this.activeModal.close({estado:true});
  }
}
