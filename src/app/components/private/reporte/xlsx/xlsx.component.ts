import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-xlsx',
  templateUrl: './xlsx.component.html',
  styleUrls: ['./xlsx.component.css']
})
export class XlsxComponent implements OnInit {
  @Input() paginas:any[] = [];

  get encuestas(){
    return this.paginas[0];
  }

  get participantes(){
    return this.paginas[1];
  }

  constructor(private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit(): void {}
}
