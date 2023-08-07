import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  hiddenInput!:any[]
  hideToggle:boolean=false


  constructor( 
    private authenticationService:AuthenticationService,
    private parametrosService:ParametrosService,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService,
    private modalService:NgbModal
    ) {}

  @ViewChild('docInput') docInput!: ElementRef;
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
              this.medios=res.listaMediosGestion.data
              this.hiddenInput=[]
              this.medios.forEach(()=>this.hiddenInput.push({visible:false, expanded:false}))
              console.log(this.medios)
              this.documentos=this.medios.map((medio:any)=>{
              if(medio.medioGestionData===null) return null
              return medio.medioGestionData
              })
              console.log(this.documentos)
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

  async onEnterDoc(event:any, idMedio:any){
    console.log(event.target.value)
    console.log(idMedio)
    const data = {
      tipoDoc: {
        descripcion:event.target.value,
        disponible:1,
        id:idMedio
      }
    }
    try {
      await this.spinner.show();
      this.parametrosService.crearTipoDocumento(data).subscribe(
        {
          next: async (res: any) => {
            console.log(res);
            await this.spinner.hide();
            this.obtenerMedios();
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

  agregarDocumento(index:any){
    this.hiddenInput[index].visible=this.hiddenInput[index].visible===true?false:true;
    if (this.docInput) {
      const inputValue = this.docInput.nativeElement.value;
      console.log(inputValue);
    }
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

  modificarAccesoSis(medio:any):void{
    let estado=medio.me_disponible===1?0:1;
    let data = {
      medio: {
        disponible:estado
      },
      id: medio.me_id
    }
    this.spinner.show();
    this.parametrosService.editarMedio(data).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`${res.message}`);
        this.obtenerMedios();
        await this.spinner.hide();
      },
      error: async (error:any) =>{
        await this.spinner.hide();
        console.log(error)
      }
    })
  };

  modificarAccesoDoc(documento:any,medio:any){
    if (medio.me_disponible === 0) return 
    let estado=documento.disponible===1?0:1;
    let data = {
      medioGestion: {
        disponible:estado
      },
      idMedioGestion: documento.idMedioGestion
    }
    this.spinner.show();
    this.parametrosService.editarTipoDocumento(data).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`${res.message}`);
        this.obtenerMedios();
      },
      error: async (error:any) =>{
        await this.spinner.hide();
        console.log(error)
      }
    })
  }

  switchToggle(index:any){
    this.hiddenInput[index].expanded=this.hiddenInput[index].expanded===true?false:true;
    console.log(this.hideToggle)
  }

}
