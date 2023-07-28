import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';

@Component({
  selector: 'app-mantenedor-usuarios',
  templateUrl: './mantenedor-usuarios.component.html',
  styleUrls: ['./mantenedor-usuarios.component.css']
})
export class MantenedorUsuariosComponent implements OnInit {

  @ViewChild(MatPaginator,{static:true}) paginador!:MatPaginator;
  documentData:any;
  // documentList:any;
  totalFilas!:number;
  pageSize = 5;
  pageSizeOptions:any;
  tipoTabla:any;
  currentUser:any;
  cabeceras = [
    {nombre:"ID"},
    {nombre:"RUT"},
    {nombre:"Nombre"},
    {nombre:"Tipo"},
    {nombre:"Cargo"},
    {nombre:"Correo"},
    {nombre:"Estado"},
    {nombre:"Opciones"},
  ];
  dataSource!:any;
  listaUsuarios!:any;
  myForm!: FormGroup;


  constructor(
    private usuarioService: UsuariosService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
  }

  ngAfterViewInit(){
    this.paginador._intl.itemsPerPageLabel="Items por Página";
    this.paginador._intl.nextPageLabel="Página Siguiente";
    this.paginador._intl.previousPageLabel="Página Anterior";
    this.paginador._intl.getRangeLabel=dutchRangeLabel;
    console.log(this.paginador.pageSize)
    this.paginador.page.subscribe((data)=>{
      this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize);
    })
  }


  async listarUsuarios(pageOffset:any, pageLimit:any) {
    await this.spinner.show();
    this.usuarioService.listarUsuarios(pageOffset, pageLimit).subscribe({
      next: async (res:any) => {
        console.log(res);
        this.listaUsuarios = res.usuarios;
        this.dataSource=res.usuarios
        this.totalFilas = res.usuarios.length;
        await this.spinner.hide();
      },
      error: async (error:any) => {
        await this.spinner.hide();

            if (error.status.toString() === '404') {
              this.toastrService.warning(error.error.message);
            } else if (['0', '401', '403', '504'].includes(error.status.toString())) {
              this.toastrService.error("Error de conexión.");
            } else {
              this.toastrService.error("Ha ocurrido un error.");
            }
      }
    });
  }

  entregarAcceso(user:any):void{
    console.log(user)
    this.spinner.show();
    user.estado=user.estado===0?1:0
    let datos = {
      tipoEvento: 'put',
      id:user.id,
      usuario: {
        estado:user.estado
      }
    };
    this.usuarioService.entregarAcceso(datos).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`Se ha modificado el acceso al usuario ${user.email}`);
        await this.spinner.hide();
        this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize)
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
    });
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



