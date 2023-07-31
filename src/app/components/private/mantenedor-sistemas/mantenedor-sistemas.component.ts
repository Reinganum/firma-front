import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ParametrosService } from 'src/app/services/parametros.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mantenedor-sistemas',
  templateUrl: './mantenedor-sistemas.component.html',
  styleUrls: ['./mantenedor-sistemas.component.css']
})
export class MantenedorSistemasComponent implements OnInit {
  currentUser:any;
  dataSource!:any;
  flagFiltros = false;
  panelOpenState = false;
  medios!:any
  constructor( 
    private authenticationService:AuthenticationService,
    private parametrosService:ParametrosService,
    private spinner: NgxSpinnerService,
    private toastrService:ToastrService
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

  agregarSistema(){

  }

  columns = [
    {
      columnDef: 'Toggle',
      header: '',
      cell: (element: any) => element.me_descripcion
    },
    {
      columnDef: 'ID',
      header: 'ID',
      cell: (element: any) => element,
    },
    {
      columnDef: 'URL',
      header: 'URL',
      cell: (element: any) => element,
    },
    {
      columnDef: 'API',
      header: 'API',
      cell: (element: any) => element,
    },
    {
      columnDef: 'Clave Aleatoria',
      header: 'Clave Aleatoria',
      cell: (element: any) => element,
    },
    {
      columnDef: 'Estado',
      header: 'Estado',
      cell: (element: any) => element,
    }
  ];
  displayedColumns = this.columns.map(c => c.columnDef);

  modificarAcceso(){

  }
  
}
