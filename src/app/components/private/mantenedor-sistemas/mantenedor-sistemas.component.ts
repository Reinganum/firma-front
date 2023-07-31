import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ParametrosService } from 'src/app/services/parametros.service';


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
  constructor( 
    private authenticationService:AuthenticationService,
    private parametrosService:ParametrosService
    ) {}

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  
  agregarSistema(){

  }

  columns = [
    {
      columnDef: 'Toggle',
      header: '',
      cell: (element: any) => ``,
    },
    {
      columnDef: 'Nombres',
      header: 'Nombre',
      icon:"../assets/img/user_header.svg",
      cell: (element: any) => `${element.nombres + ' ' + element.apellidoP}`,
    },
    {
      columnDef: 'RUT',
      header: 'RUT',
      icon:"../assets/img/rut_tabla.svg",
      cell: (element: any) => `${"19.153.293-3"}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  
}
