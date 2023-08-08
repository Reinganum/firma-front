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
  editingRowId!:any;
  editForm!:any
  selected=1

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
    this.editForm=this.formBuilder.group({
      Nombres: [null],
      RUT: [null],
      Mail: [null],
      Cargo: [null],
      Clave: [null]
    })
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

  showEditModal(usuario:any){
    this.modalRef=this.modalService.open(AgregarUsuario,{backdrop:'static',size:'md'});
    this.modalRef.componentInstance.usuario = usuario
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize)
        this.modalRef.close();
      }
    })
  }

  deleteUser(row:any){
    this.spinner.show();
    this.usuarioService.eliminarUsuario(row.id).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`Se ha eliminado el usuario ${row.nombres} ${row.apelidoP}`);
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
        this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
        this.modalRef.close()
      }
    })
  }

  filtrar(){
    let data ={
      pageOffset:this.paginador.pageIndex,
      pageLimit:(this.paginador.pageSize | this.pageSize),
      nombre:this.filtrosForm.value.nombre!==null?this.filtrosForm.value.nombre.toLowerCase():null,
      rut:this.filtrosForm.value.rut,
      email:this.filtrosForm.value.mail,
      estado:this.filtrosForm.value.estado!==null?this.filtrosForm.value.estado:"1"
    }
    console.log(data)
    this.spinner.show()
    this.usuarioService.filtrarUsuarios(data).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.dataSource=res.usuarios.data
        console.log(this.dataSource)
        await this.spinner.hide();
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    });
  }

  limpiar(){
    this.filtrosForm.reset()
    this.listarUsuarios(this.paginador.pageIndex, this.paginador.pageSize)
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
      cell: (element: any) => `${element.nombres + ' ' + element.apellidoP + ' ' + element.apellidoM}`,
    },
    {
      columnDef: 'RUT',
      header: 'RUT',
      icon:"../assets/img/rut_tabla.svg",
      cell: (element: any) => `${element.rut}`,
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
      cell: (element: any) => `${element.cargo}`,
    },
    {
      columnDef: 'Clave',
      header: 'Clave',
      icon:"../assets/img/clave_tabla.svg",
      cell: (element: any) => `${element.clave}`,
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

  inputClick(event:any){
    
  }
}



