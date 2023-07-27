import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenedor-sistemas',
  templateUrl: './mantenedor-sistemas.component.html',
  styleUrls: ['./mantenedor-sistemas.component.css']
})
export class MantenedorSistemasComponent implements OnInit {
  currentUser:any;
  constructor( ) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
  }

  
}
