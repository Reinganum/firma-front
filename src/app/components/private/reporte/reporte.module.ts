import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { PdfComponent } from './pdf/pdf.component';
import { DynamicComponentsDirective } from 'src/app/directives/dynamic-components.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgChartsModule} from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { PreviewComponent } from './preview/preview.component';
import { PptComponent } from './ppt/ppt.component';
import { XlsxComponent } from './xlsx/xlsx.component';


const routes: Routes = [
  { path: '',  outlet: 'pages', component: ReporteComponent }
];

@NgModule({
  declarations: [
    ReporteComponent,
    PdfComponent,
    DynamicComponentsDirective,
    PreviewComponent,
    PptComponent,
    XlsxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatNativeDateModule,
    HttpClientModule,
    MatDatepickerModule,
    NgChartsModule.forRoot({generateColors:true,plugins:[DataLabelsPlugin],defaults:{animation:false,backgroundColor:'#ffff',events:[],devicePixelRatio:1.5}}),
  ]
})
export class ReporteModule { } 
