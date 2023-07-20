import { NgModule } from "@angular/core";
import { DatosFirmaComponent } from "./datos-firma.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "src/app/material.module";

@NgModule({
  declarations: [
    DatosFirmaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DatosFirmaComponent
  ]
})

export class DatosFirmaModule { }
