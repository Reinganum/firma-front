import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { MaterialModule } from "src/app/material.module";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { JwtModule } from "@auth0/angular-jwt";

import { VistaPublicaComponent } from "./vista-publica.component";
import { HeaderModule } from "../../layout/header/header.module";
import { HeaderComponent } from "../../layout/header/header.component";
import { FooterModule } from "../../layout/footer/footer.module";
import {CoreDirectivesModule} from "../../../directives/directives";

const routes: Routes = [
  { path: '', component: VistaPublicaComponent }
];

@NgModule({
  declarations: [
    VistaPublicaComponent,
    
  ],
  imports: [
    CommonModule,
    PdfViewerModule,
    RouterModule.forChild(routes),
    MaterialModule,
    JwtModule,
    HeaderModule,
    FooterModule,
    CoreDirectivesModule
  ],
  exports: [
    VistaPublicaComponent
  ]
})

export class VistaPublicaModule {}
