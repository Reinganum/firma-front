import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
  @Input() logo!:string;
  @Input() nombreEncuesta!:string;
  @Input() data : any;
  constructor() { }

  ngOnInit(): void {
  }

}
