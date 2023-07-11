import { ChangeDetectorRef, Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, forkJoin } from 'rxjs';
import { ComunesService } from 'src/app/services/comunes.service';
import { fechas } from 'src/app/shared/validators';
import {ToastrService} from "ngx-toastr";

import { ReportesService } from '../../../services/reportes.service';
import { PreviewComponent } from './preview/preview.component';
import { Encuesta } from 'src/app/models/reportes.interface';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  isCollapsedFiltrar = false;
  page = 1;
  pageSize = 5;
  filtrosForm: FormGroup;
  clientesAll: any[] = [];
  areasAll: any[] = [];
  cursosAll: any[] = [];
  encuestas: any = [];
  encuestasTotal: number = 0;
  allPagesSice = [5, 10, 25, 50, 80, 100];
  maxPage:number = 5;
  encuestasReportes: Encuesta[] = [];
  pageReporte = 1;
  pageSizeReporte = 10;
  cantidad: number = 0;

  headerExcel: any = ['nombreEnc', 'nombrePlan', 'tipoPlan', 'cantidad','colaboradores','actualizado', 'estado'];

  isBusy:boolean = false;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private reportesService: ReportesService,
    private comunesService: ComunesService,
    private spinner: NgxSpinnerService,
    private modalService:NgbModal,
    private changeDetectorRef:ChangeDetectorRef
  ) {
    this.filtrosForm = this.fb.group({
      encuesta: this.fb.control(null),
      cliComercial: this.fb.control(null),
      fechaDesde: this.fb.control(null),
      fechaHasta: this.fb.control(null),
      fechaDesdeTermino: this.fb.control(null),
      fechaHastaTermino: this.fb.control(null),
      areas: this.fb.control(null),
      cursos: this.fb.control(null)
    }, {
      validators: fechas('fechaDesde', '<=', 'fechaHasta')
    })
  }

  ngOnInit(): void {
    this.checkSize();
    this.spinner.show()
    forkJoin([
      this.comunesService.obtenerAreas(),
      this.comunesService.obtenerClientes(),
      this.comunesService.obtenerCursos()
    ])
      .pipe(finalize(() => this.spinner.hide())).subscribe(([areas, clientes, cursos]) => {
        this.areasAll = areas;
        this.clientesAll = clientes;
        this.cursosAll = cursos
        console.log(areas, clientes, cursos);
      })
  }

  checkSize() {
    this.maxPage = window.innerWidth > 1190 ? 5 : 3;
  }

  aplicarFiltros() {
    this.filtrosForm.markAllAsTouched();
    if (!this.filtrosForm.valid) {
      return;
    }
  }

  resetFiltros() {
    this.filtrosForm.reset();
  }

  setPage() {
    this.spinner.show();
    this.reportesService.generarReporte({ page: this.page, pageSize: this.pageSize, offset: this.page - 1, filtro: this.filtrosForm.value }).subscribe({
      next: (resp: any) => {
        this.spinner.hide();
        this.encuestas = resp.encuestas;
        this.encuestasTotal = resp.encuestasTotal;
        this.cantidadPag();
        console.log(resp);
      }, error: (err: any) => {
        this.spinner.hide();
        console.log(err);
      }
    })
  }

  getAcrom(str: string) {
    return str.split(/\s/).reduce((response: any, word: any) => response += word.slice(0, 1), '')
  }

  generarReporteExcel() {
    this.spinner.show();
    if(this.encuestas.length == 0){
      this.spinner.hide();
      this.toastrService.info('Debes filtrar antes de generar el reporte');
      return
    }
    if (this.cantidad != this.pageReporte){
      this.reportesService.generarReporte({ page: this.pageReporte, pageSize: this.pageSizeReporte, offset: this.pageReporte - 1, filtro: this.filtrosForm.value }).subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          this.encuestasReportes = this.encuestasReportes.concat(resp.encuestas);
          this.pageReporte ++;
          this.generarReporteExcel();
        }, error: (err: any) => {
          this.spinner.hide();
          console.log(err);
        }
      })
    }else{
      this.spinner.hide();
      console.log(this.encuestasReportes);
      console.log('termino')
      this.generarExcel();
    }

  }

  generarReportePDF(){
    this.spinner.show();
    if(this.encuestas.length == 0){
      this.spinner.hide();
      this.toastrService.info('Debes filtrar antes de generar el reporte');
      return
    }
    if (this.cantidad != this.pageReporte){
      this.reportesService.generarReporteDetalles({ page: this.pageReporte, pageSize: this.pageSizeReporte, offset: this.pageReporte - 1, filtro: this.filtrosForm.value }).subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          this.encuestasReportes = this.encuestasReportes.concat(resp.encuestas);
          this.pageReporte ++;
          this.generarReportePDF();
        }, error: (err: any) => {
          this.spinner.hide();
          console.log(err);
        }
      })
    }else{
      this.spinner.hide();
      console.log(this.encuestasReportes);
      console.log('termino')
      this.generarPDF();
    }
  }
  generarReportePPT(){
    this.spinner.show();
    if(this.encuestas.length == 0){
      this.spinner.hide();
      this.toastrService.info('Debes filtrar antes de generar el reporte');
      return
    }
    if (this.cantidad != this.pageReporte){
      this.reportesService.generarReporteDetalles({ page: this.pageReporte, pageSize: this.pageSizeReporte, offset: this.pageReporte - 1, filtro: this.filtrosForm.value }).subscribe({
        next: (resp: any) => {
          this.spinner.hide();
          this.encuestasReportes = this.encuestasReportes.concat(resp.encuestas);
          this.pageReporte ++;
          this.generarReportePDF();
        }, error: (err: any) => {
          this.spinner.hide();
          console.log(err);
        }
      })
    }else{
      this.spinner.hide();
      console.log(this.encuestasReportes);
      console.log('termino')
      this.generarPPT();
    }
  }

  generarPDF(){
    const modalRef = this.modalService.open(PreviewComponent,{size:'lg',scrollable:true});
    modalRef.componentInstance.tipo = 'PDF'
    modalRef.componentInstance.setEncuestas(this.encuestasReportes);
    modalRef.componentInstance.previewPDF();
    (modalRef.componentInstance.changeDetectorRef as ChangeDetectorRef).detectChanges();

    this.changeDetectorRef.markForCheck();
  }
  generarPPT(){
    const modalRef = this.modalService.open(PreviewComponent,{size:'lg',scrollable:true});
    modalRef.componentInstance.tipo = 'PPT'
    modalRef.componentInstance.setEncuestas(this.encuestasReportes);
    modalRef.componentInstance.previewPPT();
    (modalRef.componentInstance.changeDetectorRef as ChangeDetectorRef).detectChanges();

    this.changeDetectorRef.markForCheck();
  }
  generarExcel() {
    const modalRef = this.modalService.open(PreviewComponent,{size:'lg',scrollable:true});
    modalRef.componentInstance.tipo = 'XLSX'
    modalRef.componentInstance.setEncuestas(this.encuestasReportes);
    modalRef.componentInstance.previewXLSX();
    (modalRef.componentInstance.changeDetectorRef as ChangeDetectorRef).detectChanges();

    this.changeDetectorRef.markForCheck();
  }

  cantidadPag() {
    this.cantidad = Math.ceil(this.encuestasTotal / this.pageSizeReporte) +1;
    return;
  }


}
