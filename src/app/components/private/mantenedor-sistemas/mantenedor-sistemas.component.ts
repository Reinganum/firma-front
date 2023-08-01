import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AgregarSistema } from '../../modals/agregar-sistema/agregar-sistema.component';

@Component({
  selector: 'app-mantenedor-sistemas',
  templateUrl: './mantenedor-sistemas.component.html',
  styleUrls: ['./mantenedor-sistemas.component.css']
})
export class MantenedorSistemasComponent implements OnInit {
  currentUser:any;
  dataSource!:any;
  flagFiltros =false;
  panelOpenState = false;
  medios!:any
  documentos!:any
  modalRef!:NgbModalRef
  constructor( 
    private authenticationService:AuthenticationService,
    private parametrosService:ParametrosService,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService,
    private modalService:NgbModal
    ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.obtenerMedios()
  }
  
  async obtenerMedios() {
    try {
      await this.spinner.show();
      this.parametrosService.listaMedios().subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.medios=res.listaMediosGestion.data
            
              try{
                  this.documentos=this.medios.map((medio:any)=>{
                  const inputString=medio.medioGestionData
                  const validJsonStr=formatJSONString(inputString)
                  return JSON.parse(validJsonStr)
                })
                function formatJSONString(inputString:string) {
                  const regex = /([\w]+):[\s]*([\w\s]+),/g;
                  const formattedString = inputString.replace(regex, '"$1": "$2",');
                  const finalString = formattedString.replace(/disponible: (\d)/g, '"disponible": $1');
                  return '[' + finalString + ']';
                }
                console.log(this.documentos)
              }catch(error){
                console.log(error)
                await this.spinner.hide();
              }
              await this.spinner.hide();
          },
          error: async (error:any) => {
            console.log(error)
            await this.spinner.hide();
          }
      });
    } catch (error:any) {
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

  agregarDocumento(){

  }

  agregarSistema(){
    this.modalRef=this.modalService.open(AgregarSistema,{size:'md'});
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.modalRef.close();
      }
    })
  }

  columns = ["ID","URL","API","Clave Aleatoria"];

  modificarAcceso(medio:any):void{
    console.log(medio)
    this.spinner.show();
    medio.estado=medio.estado===0?1:0
    let datos={

    }}/*
    this.parametrosService.editarMedio(datos).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`${res.message}`);
        await this.spinner.hide();

      },
      error: async (error:any) =>{
        await this.spinner.hide();
        if (error.status.toString() === '404') {
          this.toastrService.warning(error.error.message);
        } else if (['0', '401', '403', '504'].includes(error.status.toString())) {
          this.toastrService.error("Error de conexión.");
        } else {
          this.toastrService.error("Ha ocurrido un error.");
        }
      }
    });*/
}
