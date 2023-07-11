import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { PdfComponent } from '../components/private/reporte/pdf/pdf.component';
import { PptComponent } from '../components/private/reporte/ppt/ppt.component';
import { XlsxComponent } from '../components/private/reporte/xlsx/xlsx.component';
import { Pagina } from '../models/reportes.interface';

@Directive({
  selector: '[dynamicComponents]'
})
export class DynamicComponentsDirective implements OnInit {
  @Input() logo:SafeUrl = '';
  constructor(public viewContainerRef:ViewContainerRef) {}

  ngOnInit(): void {}

  createPDFPage(paginas:Pagina){
    console.log('pagina creada')
    const page = this.viewContainerRef.createComponent(PdfComponent);
    page.instance.paginas = paginas;
  }

  createPPTPage(paginas:any){
    console.log('pagina creada')
    const page = this.viewContainerRef.createComponent(PptComponent);
  }

  createXLSXSheet(paginas:any,cliComercial?:string,logo?:any){
    console.log('sheet creado');
    const book = this.viewContainerRef.createComponent(XlsxComponent);
    book.instance.paginas = paginas;
  }

}
