import { Component, EventEmitter, Input, Output,ViewChild, TemplateRef  } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocsPendientesComponent } from '../../modals/docs-pendientes/docs-pendientes.component';
import { SwUpdate } from '@angular/service-worker';

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
  notifications=0
  modalRef!:NgbModalRef
  newNotifications!:any // luego modificar nombres 
  documentosPendientes!:any

  constructor(
    private authenticationService:AuthenticationService,
    private modalService:NgbModal,
    private documentosService: DocumentosService,
    private toastrService:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private swUpdate:SwUpdate
    
    ) { }

  
  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser) {
      this.userId = localStorage.getItem('userId');
      console.log(this.userId)
      this.getDocsPendientes()
      this.getNotificaciones()
      if (this.swUpdate.isEnabled) {
        this.swUpdate.available.subscribe(() => {
          if (confirm("Existe una nueva versión del sistema. Aceptar para actualizar")) {
            window.location.reload();
          }
        });
      }
    }
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
    this.modalRef.componentInstance.notificaciones = this.newNotifications
    this.modalRef.componentInstance.docsPendientes = this.documentosPendientes
    this.modalRef.result.then((res)=>{
      if(res.estado){
        this.modalRef.close();
      }
    })
  }

  async getDocsPendientes() {
    try {
      await this.spinner.show();
      this.documentosService.documentosPendientes(this.currentUser.email).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.documentosService.setDocPendientes(res.docs.data)
              this.documentosPendientes=res.docs.data
              this.notifications+=res.docs.data.length
              await this.spinner.hide();
              this.toastrService.warning(`Tienes un total de ${res.docs.total} documentos pendientes por firmar`);
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

  async getNotificaciones(){
    try {
      await this.spinner.show();
      this.documentosService.getNotificaciones(this.currentUser.email).subscribe(
        {
          next: async (res:any) => {
              console.log(res);
              this.newNotifications=res.notis
              this.notifications+=res.notis.length
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



