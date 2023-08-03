import { Component, Input, OnInit } from '@angular/core';
// Interfaces
import { Error } from 'src/app/interfaces/error';
@Component({
  selector: 'app-errores-formulario',
  templateUrl: './errores-formulario.component.html',
  styleUrls: ['./errores-formulario.component.css']
})
export class ErroresFormularioComponent implements OnInit {
  @Input() errores: Error[] = [];
  @Input() atributo!: string;
  error!: Error | undefined;
  constructor() { }
  ngOnInit(): void {
    const error = this.errores.find(x => x.atributo === this.atributo);
    this.error = error;
  }
}




