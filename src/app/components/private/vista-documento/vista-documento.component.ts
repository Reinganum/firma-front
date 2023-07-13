import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private documentosService: DocumentosService
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

  obtenerPath(id:number) {
    this.documentosService.listaDocId(id).subscribe((res:any) => {
      console.log(res);
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

  }


}
