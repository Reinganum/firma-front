import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthenticationService } from '../../auth/service/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() menuVar:any;
  @Output() menuShow = new EventEmitter();
  currentUser!:any

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue;
    console.log(this.currentUser);
  }


  menu(){
    this.menuShow.emit(!this.menuVar);
  }

  logOut(){
    this.authenticationService.logout()
  }
}
