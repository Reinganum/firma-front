import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComunesService } from 'src/app/services/comunes.service';
import { DocumentosService } from 'src/app/services/documentos.service';

@Component({
  selector: 'app-vista-documento',
  templateUrl: './vista-documento.component.html',
  styleUrls: ['./vista-documento.component.css']
})
export class VistaDocumentoComponent implements OnInit {
  archivoFirmar:string = '';
  idDoc!:number;

  constructor(
    private comunesServices: ComunesService,
    private route: ActivatedRoute,
    private documentosService: DocumentosService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      console.log(params);
      console.log(params["id"]);
      this.idDoc = params["id"];
      this.obtenerPath(this.idDoc);
    })
  }

  async obtenerPath(id:number) {
    await this.spinner.show();
    this.documentosService.listaDocId(id).subscribe(async (res:any) => {
      console.log(res);
      if (!res.documento) {
        await this.spinner.hide();
        this.router.navigate(["consulta-documento"]);
        this.toaster.warning("No se encontró el documento.");
        return ;
      }
      this.obtenerPathS3(res.documento.nombreArchivo)
    });
  }

  async obtenerPathS3(archivo:any) {
    console.log(archivo);

    const fileData:any = {
      key: archivo,
      metodo: 'get'
    }
    const resultado:any = await this.comunesServices.getSignedUrl(fileData).toPromise();
    console.log(resultado);
    this.archivoFirmar = resultado.message;
    this.toaster.success("Documento cargado correctamente!");
    await this.spinner.hide();

  }


}
