import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';

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
  constructor( private authenticationService:AuthenticationService ) {}

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
    {
      columnDef: 'Mail',
      header: 'Mail',
      icon:"../assets/img/mail_tabla.svg",
      cell: (element: any) => `${element.email}`,
    },
    {
      columnDef: 'Cargo',
      header: 'Cargo',
      icon:"../assets/img/origen_tabla.svg",
      cell: (element: any) => `${"Administrativo OTIC"}`,
    },
    {
      columnDef: 'Clave',
      header: 'Clave',
      icon:"../assets/img/clave_tabla.svg",
      cell: (element: any) => `${"Aci829d"}`,
    },
    {
      columnDef: 'Estado',
      header: 'Estado',
      icon:"../assets/img/archivo_tabla.svg",
      cell: (element: any) => `${element.estado!==1?"Inactivo":"Activo"}`,
    },
    {
      columnDef: 'Opciones',
      header: 'Opciones',
      icon:"../assets/img/opcion_tabla.svg",
      cell: (element: any) => `${element.estado}`,
    },
  ];
  displayedColumns = this.columns.map(c => c.columnDef);
  
}
