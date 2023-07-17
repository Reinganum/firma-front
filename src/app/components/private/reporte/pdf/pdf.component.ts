import { ChangeDetectorRef, Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Pagina } from 'src/app/models/reportes.interface';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css', './../preview/preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfComponent implements OnInit {
  @Input() paginas:Pagina = {};

  plugins = [DataLabelsPlugin];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {}
}
