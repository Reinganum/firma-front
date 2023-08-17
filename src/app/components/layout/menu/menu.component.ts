import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation } from '@angular/core';
  import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { DocsPendientesComponent } from '../../modals/docs-pendientes/docs-pendientes.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DocumentosService } from 'src/app/services/documentos.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isCollapsed: boolean=false;
  isScrolled: boolean = false;
  mouseEnter: boolean = false;
  modalRef!:NgbModalRef
  notifications=0
  currentUser!:any
  @Input() menuVar:any;
  @Output() menuShow = new EventEmitter();
  @Output() menuColapsar = new EventEmitter();
  constructor(
    private authenticationService:AuthenticationService,
    private modalService:NgbModal,
    private documentosService:DocumentosService
    ) { }

    /**
   * On Sidebar scroll set isScrolled as true
   */
    onSidebarScroll(): void {
      // @ts-ignore
      if (this.directiveRef.position(true).y > 3) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }
    /**
     * Toggle sidebar collapsed status
     */
    menu(){
      console.log('!this.menuVar',!this.menuVar);
      this.menuShow.emit(!this.menuVar);
    }

    colapsar(){
      console.log('!this.isCollapsed',!this.isCollapsed);
      this.isCollapsed=!this.isCollapsed;
      this.menuColapsar.emit(this.isCollapsed)
    }

    /**
     * On Sidebar's Mouseenter Event
     */
    @HostListener('mouseenter')
    onMouseEnter(): void {
      // Expand the sidebar temporarily
      this.mouseEnter=true;
    }

    /**
     * On Sidebar's Mouseleave Event
     */
    @HostListener('mouseleave')
    onMouseLeave(): void {
      // Collapse the sidebar temporarily
      this.mouseEnter=false;
    }

    ngOnInit() {
      this.colapsar();
      this.currentUser = this.authenticationService.currentUserValue;
      console.log(this.currentUser);
    }

    logout(){
      this.authenticationService.logout()
    }

    showPendientesModal(){
      this.modalRef=this.modalService.open(DocsPendientesComponent,{backdrop:'static',size:'md'});
      this.notifications=0
      this.modalRef.componentInstance.notificaciones = this.documentosService.getNotis()
      this.modalRef.componentInstance.docsPendientes = this.documentosService.getDocsPendientes()
      this.modalRef.result.then((res)=>{
        if(res.estado){
          this.modalRef.close();
        }
      })
    }
}
