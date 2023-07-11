import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
//Documentos
import jsPDF from 'jspdf';
import { Workbook } from 'exceljs';
import html2canvas from 'html2canvas';
import fs from 'file-saver';

import { cloneDeep } from 'lodash';

import { DynamicComponentsDirective } from 'src/app/directives/dynamic-components.directive';
import { ComunesService } from 'src/app/services/comunes.service';
import { Encuesta, KPI, Pagina } from 'src/app/models/reportes.interface';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {
  @Input() tipo!: 'PDF' | 'PPT' | 'XLSX';
  @Input() encuestas:any[] = [];

  @ViewChild(DynamicComponentsDirective, {static:false}) paginas !: DynamicComponentsDirective
  @ViewChild('pdf',{static:false}) pdf : ElementRef | undefined;

  data:any[] = [];
  colorCorporativo:string = '';
  imagenCorporativa:any;

  isBusy:boolean = false;

  constructor(
    public modal:NgbActiveModal,
    public changeDetectorRef:ChangeDetectorRef,
    private spinner:NgxSpinnerService,
    private comunesServices:ComunesService
    ) {}

  ngOnInit(): void {}

  async setEncuestas(encuestas:any){
    this.encuestas = cloneDeep(encuestas);
    
    this.colorCorporativo = '#' + this.encuestas[0].plantillaModel.colorCorporativo;
  }

  previewPDF(){
    this.isBusy = true;

    this.changeDetectorRef.detectChanges();

    this.paginas.logo = this.imagenCorporativa;

    const data = this.getDataPDF(this.encuestas);
    this.paginas.createPDFPage(data);

    this.isBusy = false;
  }

  previewPPT(){
    this.isBusy = true;

    const data = this.getDataPDF(this.encuestas);
    this.paginas.createPPTPage(data);

    this.isBusy = false;
  }

  async previewXLSX(){
    this.isBusy = true;
    
    this.changeDetectorRef.detectChanges();


    this.paginas.logo = this.imagenCorporativa;
      
    const data = await this.getDataXLSX(this.encuestas as Encuesta[]);
    this.paginas.createXLSXSheet(data);

    this.changeDetectorRef.markForCheck();


    this.isBusy = false;
  }

  getDataPDF(encuestas:Encuesta[]):Pagina{
    const participanteKPI:KPI[] = [];
    const curso = [...new Set(encuestas.map((encuesta) => encuesta.cursoIdAC))];


     return {
      'Participantes':participanteKPI,
      'Cursos':[],
      'Convocatorias':[]
     }
  }

  getDataPPT(encuestas:Encuesta[]){}

  async getDataXLSX(encuestas:Encuesta[]){
    const encuesta:any = {};
    const participantes:any = {};

    encuesta.encabezados = ['Logo Encuesta','Nombre Encuesta', 'Nombre Plantilla', 'Tipo Plantilla', 'Cantidad Preguntas', 'Colaboradores','Actualizado El', 'Estado'];
    encuesta.filas = [];

    participantes.encabezados = ['RUN' ,'Nombre Participantes' ,'Fecha Respuesta' ,'Cantidad Recordatorios' ,'Encuesta' ,'Curso'];
    participantes.filas = [];

    for(const d of encuestas){
      let tipoPlan = d.plantillaModel.tipoPlanillaModel ? d.plantillaModel.tipoPlanillaModel.nombre : '';
      let estado = d.estado == 0 ? 'Borrador': d.estado == 1 ? 'Enviada' : 'Cerrada';
      let colaborador = '';
      for(let cola of d.plantillaModel.plantillaColaboradoresModels){
        colaborador = colaborador.concat(this.getAcrom(cola.usuariosModel.nombre+' '+cola.usuariosModel.apellido) + ',');
      }
      let base64Logo
      if(!!d.plantillaModel.logotipo){
        base64Logo = await this.comunesServices.getImagenBase64(d.plantillaModel.logotipo);
      }

      encuesta.filas.push([base64Logo,d.nombre, d.plantillaModel.nombre , tipoPlan , d.cantidadPreguntas, colaborador , d.plantillaModel.actualizadoEl , estado]);

      for(const participanteModel of d.encuestaParticipanteModels){
        const { participanteModel:participante } = participanteModel;
        participantes.filas.push([participante.rut , participante.nombre , participanteModel.respondidaEl , 0 , d.nombre , d.nombreCursoAC]);
      }
    }

    return [encuesta,participantes]
  }

  getAcrom(str: string) {
    return str.split(/\s/).reduce((response: any, word: any) => response += word.slice(0, 1), '')
  }

  download(){
    switch(this.tipo){
      case 'PDF':
        this.downloadPDF();
        break;
      case 'PPT':
        break;
      case'XLSX':
        this.downloadXLSX();
        break
    }

    this.modal.close(true)
  }

  async downloadPDF(){
    await this.spinner.show();
    const doc = new jsPDF('p','px','letter');
    const html = this.pdf?.nativeElement;
    const pages = html.querySelectorAll('.pagina') as NodeListOf<HTMLElement>;

    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    for(let index=0; index < pages.length; index++){
      const page = pages.item(index);

      await html2canvas(page,{useCORS:true,scale:2}).then((dataURL) => {
        doc.addImage(dataURL,'PNG',15,15,width,height);
        if(index < (pages.length -1)){
          doc.addPage();
        }
      }).catch(console.log)

    }

    doc.save('Reporte.pdf');

    await this.spinner.hide();
  }

  async downloadXLSX(){
    this.spinner.show();
      
    let workbook = new Workbook();
    let sheet = workbook.addWorksheet('Encuestas');
    let sheetParticipantes = workbook.addWorksheet('Participantes');

    const styleHeader: any = {
      font: {
        bold: true,
      },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'A5B9E0'
        }
      }
    };

    sheet.columns = [
      { header: 'Logo Encuesta', key: 'logoEnc', width: 30 },
      { header: 'Nombre Encuesta', key: 'nombreEnc', width: 20 },
      { header: 'Nombre Plantilla', key: 'nombrePlan', width: 20 },
      { header: 'Tipo Plantilla', key: 'tipoPlan', width: 20 },
      { header: 'Cantidad Preguntas', key: 'cantidad', width: 20 },
      { header: 'Colaboradores', key: 'colaboradores', width: 20 },
      { header: 'Actualizado El', key: 'actualizado', width: 20 },
      { header: 'Estado', key: 'estado', width: 20 },
    ];

    sheet.getCell('A1').style = styleHeader;
    sheet.getCell('B1').style = styleHeader;
    sheet.getCell('C1').style = styleHeader;
    sheet.getCell('D1').style = styleHeader;
    sheet.getCell('E1').style = styleHeader;
    sheet.getCell('F1').style = styleHeader;
    sheet.getCell('G1').style = styleHeader;
    sheet.getCell('H1').style = styleHeader;

    sheetParticipantes.columns = [ 
      { header: 'RUN', key: 'runPart', width: 30 },
      { header: 'Nombre Participantes', key: 'nombrePart', width: 20 },
      { header: 'Fecha Respuesta', key: 'fechaPart', width: 20 },
      { header: 'Cantidad Recordatorios', key: 'recordatorios', width: 20 },
      { header: 'Encuesta', key: 'encuesta', width: 20 },
      { header: 'Curso', key: 'cursoEnc', width: 100 },
    ];

    sheetParticipantes.getCell('A1').style = styleHeader;
    sheetParticipantes.getCell('B1').style = styleHeader;
    sheetParticipantes.getCell('C1').style = styleHeader;
    sheetParticipantes.getCell('D1').style = styleHeader;
    sheetParticipantes.getCell('E1').style = styleHeader;
    sheetParticipantes.getCell('F1').style = styleHeader;

    for(let [r,d] of this.encuestas.entries()){
      const row = r + 2;
      let tipoPlan = d.plantillaModel.tipoPlanillaModel ? d.plantillaModel.tipoPlanillaModel.nombre : '';
      let estado = d.estado == 0 ? 'Borrador': d.estado == 1 ? 'Enviada' : 'Cerrada';
      let colaborador = '';

      for(let cola of d.plantillaModel.plantillaColaboradoresModels){
        colaborador = colaborador.concat(this.getAcrom(cola.usuariosModel.nombre+' '+cola.usuariosModel.apellido) + ',');
      }

      if(!!d.plantillaModel.logotipo){
        const base64Logo = await this.comunesServices.getImagenBase64(d.plantillaModel.logotipo,false);
        const ext:any = this.comunesServices.getExtensionArchivo(d.plantillaModel.logotipo);
        const imgId = workbook.addImage({
          base64:base64Logo as string,
          extension:ext
        })
        sheet.addImage(imgId,`A${row}:A${row}`);
      }

      sheet.addRow({ nombreEnc: d.nombre, nombrePlan: d.plantillaModel.nombre , tipoPlan : tipoPlan , cantidad : d.cantidadPreguntas, colaboradores : colaborador ,actualizado : d.plantillaModel.actualizadoEl , estado : estado});
      for(const participanteModel of d.encuestaParticipanteModels){
        const { participanteModel:participante } = participanteModel;
        sheetParticipantes.addRow({runPart:participante.rut, nombrePart:participante.nombre, fechaPart:participanteModel.respondidaEl, recordatorios:0, encuesta:d.nombre, cursoEnc:d.nombreCursoAC})
      }
      sheet.getRow(row).height = 30;
    }
    //Generate & Save Excel File
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Reporte' + '.xlsx');
    })

    this.spinner.hide();
  }

}
