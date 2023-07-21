import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() menuVar:any;
  @Output() menuShow = new EventEmitter();
  currentUser!:any
  userId!:any
  newDocs!:any

  constructor(
    private authenticationService:AuthenticationService,
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    ) { }

  hidden=false;

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userId = localStorage.getItem('userId');
    this.getDocsPendientes(1,63)
  }

  menu(){
    this.menuShow.emit(!this.menuVar);
  }

  logOut(){
    this.authenticationService.logout()
  }
  toggleBadgeVisibility(){
    this.hidden = !this.hidden;
  }

  async getDocsPendientes(estado:any, responsable:any) {
    try {
      await this.spinner.show();
      this.documentosService.documentosPendientes(estado,responsable).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.newDocs = res;
              await this.spinner.hide();
          },
          error: async (error:any) => {
            await this.spinner.hide();
            console.log(error)
            if (error.status.toString() === '404') {
              this.toastrService.warning(error.error.message);
            } else if (['0', '401', '403', '504'].includes(error.status.toString())) {
              this.toastrService.error("Error de conexión.");
            } else {
              this.toastrService.error("Ha ocurrido un error.");
            }
          }
      });
    } catch (error:any) {
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



