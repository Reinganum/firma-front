import { Component, OnInit, ViewChild } from '@angular/core';
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
  pageSize = 10;
  pageSizeOptions:any;
  tipoTabla:any;
  currentUser:any;

  cabeceras = [
    {nombre:"ID"},
    {nombre:"RUT"},
    {nombre:"Nombre"},
    {nombre:"Correo"},
    {nombre:"Opciones"},
  ];

  listaUsuarios:any;


  constructor(
    private usuarioService: UsuariosService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
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
    this.spinner.show();
    let datos = {
      tipoEvento: 'put',
      id:user.id,
      usuario: {
        estado:1
      }
    };
    this.usuarioService.entregarAcceso(datos).subscribe({
      next: async(res:any) => {
        console.log(res)
        this.toastrService.success(`se le entregó acceso al usuario ${user.email}`);
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
    });
  }
}
