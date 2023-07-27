import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-tabla-origenes',
  templateUrl: './tabla-origenes.component.html',
  styleUrls: ['./tabla-origenes.component.css']
})
export class TablaOrigenesComponent implements OnInit {
  cabeceras = [
    {nombre:"ID"},
    {nombre:"ORIGEN"},
    {nombre:"Sigla"},
    {nombre:"Estado"},
    {nombre:"Opciones"},
  ];

  totalFilas!:number;
  pageSize = 10;
  pageSizeOptions = [5, 25, 100];
  listaOrigen:any;

  constructor(
    private parametrosService: ParametrosService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.obtenerListaMedios();
  }

  obtenerListaMedios() {
    this.parametrosService.listaMedios().subscribe({
      next: (res) => {
        this.listaOrigen = res.listaMedios;
        this.totalFilas = this.listaOrigen.length
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error(error);
        this.listaOrigen = [];
        this.totalFilas = 0;
        
      }
    });
  }

  async changeDisp(origen:any) {
    console.log(origen);
    const datos = {
      medio: {
        disponible: origen.disponible == 0 ? 1 : 0
      },
      id: origen.id
    }
    await this.spinner.show();
    this.parametrosService.editarMedio(datos).subscribe({
      next: async (res) => {
        this.toastrService.success(res.message);
        this.obtenerListaMedios();
        await this.spinner.hide();
      },
      error: (error) => {
        console.log(error);        
      }
    });
  }
}
