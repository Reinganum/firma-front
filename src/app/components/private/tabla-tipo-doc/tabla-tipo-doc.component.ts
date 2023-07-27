import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ParametrosService } from 'src/app/services/parametros.service';

@Component({
  selector: 'app-tabla-tipo-doc',
  templateUrl: './tabla-tipo-doc.component.html',
  styleUrls: ['./tabla-tipo-doc.component.css']
})
export class TablaTipoDocComponent implements OnInit {
  constructor(
    private parametrosService: ParametrosService,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) { }

  cabeceras = [
    {nombre:"ID"},
    {nombre:"Tipo Documento"},
    {nombre:"Estado"},
    {nombre:"Opciones"},
  ];

  listaTipoDocs:any;
  totalFilas!:number;
  pageSize = 10;
  pageSizeOptions = [5, 25, 100];

  ngOnInit(): void {
    this.listaTD();
  }

  listaTD() {
    this.parametrosService.listaTipoDocumentos().subscribe({
      next: (res) => {
        this.listaTipoDocs = res.listaTipoDoc;
        this.totalFilas = this.listaTipoDocs.length
      },
      error: (error) => {

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
        this.listaTD();
        await this.spinner.hide();
      },
      error: (error) => {
        console.log(error);        
      }
    });
  }

}
