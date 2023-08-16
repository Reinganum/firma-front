import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ObtenerRutComponent } from '../../modals/obtener-rut/obtener-rut.component';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../../auth/service/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser!: any
  totalDocs!: number

  constructor(
    private documentosService: DocumentosService,
    private toastrService: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.obtenerDocumentos()
    this.currentUser = this.authenticationService.currentUserValue;
  }

  async obtenerDocumentos() {
    try {
      await this.spinner.show();
      this.documentosService.documentosPendientes(this.currentUser.email).subscribe(
        {
          next: async (res: any) => {
            console.log(res);
            this.totalDocs = res.docs.data.length
            await this.spinner.hide();
          },
          error: async (error: any) => {
            console.log(error)
            await this.spinner.hide();
          }
        });
    } catch (error: any) {
      await this.spinner.hide();
      console.log(error)
      if (error.status.toString() === '404') {
        this.toastrService.warning(error.error.message);
      } else if (['0', '401', '403', '504'].includes(error.status.toString())) {

      } else {
        this.toastrService.error("Ha ocurrido un error");
      }
      console.log(error);
    }
  }
}
