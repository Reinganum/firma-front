import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';
import { AgregarUsuario } from '../../modals/agregar-usuario/agregar-usuario.component';

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
  pageSize = 10;
  pageSizeOptions:any;
  modalRef!:NgbModalRef
  tipoTabla:any;
  currentUser:any;
  flagFiltros = false;

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
  filtrosForm!: FormGroup;

  constructor(
    private usuarioService: UsuariosService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService,
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private modalService:NgbModal,
  ) {}
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    this.filtrosForm = this.formBuilder.group({
      nombre: [null],
      rut: [null],
      mail: [null],
      estado: [null]
    });
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
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    });
  }

  entregarAcceso(user:any):void{
    console.log(user)
    let datos = {
      tipoEvento: 'put',
      id:user.id,
      usuario: {
        estado:(user.estado==0?1:0)
      }
    };
    console.log(datos)
    this.spinner.show();
    this.usuarioService.entregarAcceso(datos).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`Se ha modificado el acceso al usuario ${user.email}`);
        await this.spinner.hide();
        this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize)
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    });
  }

  agregarUsuario(){
    this.modalRef=this.modalService.open(AgregarUsuario,{backdrop:'static',size:'md'});
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.modalRef.close();
      }
    })
  }

  filtrar(){
    console.log(this.filtrosForm.value)
  }

  limpiar(){
    this.filtrosForm.reset()
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



