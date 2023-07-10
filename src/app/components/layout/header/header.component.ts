import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() menuVar:any;
  @Output() menuShow = new EventEmitter();
  userInfo:any={}

  constructor() { }
  // constructor(private authenticationService: AuthenticationService) {

  //  }

  ngOnInit(): void {
    // this.userInfo = this.authenticationService.currentUserValue;
    console.log(this.userInfo);
  }


  menu(){
    this.menuShow.emit(!this.menuVar);
  }

  logOut(){
    // this.authenticationService.logout()
  }
}
