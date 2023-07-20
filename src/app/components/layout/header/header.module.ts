import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./header.component";
import { MatBadgeModule } from "@angular/material/badge";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule { }
