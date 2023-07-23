import { Component, EventEmitter, Input, Output,ViewChild, TemplateRef  } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocsPendientesComponent } from '../../modals/docs-pendientes/docs-pendientes.component';
import { PendientesService } from 'src/app/services/pendientes.service';


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
  notifications!:any  
  modalRef!:NgbModalRef


  constructor(
    private authenticationService:AuthenticationService,
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private pendientesService:PendientesService,
    ) { }

  
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    this.userId = localStorage.getItem('userId');
    this.getDocsPendientes(1,this.userId)
  }

  menu(){
    this.menuShow.emit(!this.menuVar);
  }

  logOut(){
    this.authenticationService.logout()
  }
 
  showPendientesModal(){
    this.modalRef=this.modalService.open(DocsPendientesComponent,{backdrop:'static',size:'md'});
    this.notifications=0
  }

  async getDocsPendientes(estado:any, responsable:any) {
    try {
      await this.spinner.show();
      this.documentosService.documentosPendientes(estado,responsable).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.pendientesService.setDocPendientes(res.docs)
              this.notifications=res.docs.length
              await this.spinner.hide();
          },
          error: async (error:any) => {
            await this.spinner.hide();
            console.log(error)
            this.toastrService.warning(error);
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



