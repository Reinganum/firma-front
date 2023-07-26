import { NgModule } from "@angular/core";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RouterModule,
    MaterialModule
  ],
  exports: [LoginComponent]
})

export class LoginModule { }
