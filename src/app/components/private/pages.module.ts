import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "../layout/header/header.component";
import { FooterComponent } from "../layout/footer/footer.component";
import { PagesComponent } from "./pages.component";
import { MenuComponent } from "../layout/menu/menu.component";
import { MenuModule } from "../layout/menu/menu.module";
import { HeaderModule } from "../layout/header/header.module";
import { FooterModule } from "../layout/footer/footer.module";
import { VistaDocumentoComponent } from './vista-documento/vista-documento.component';
import { VistaDocumentoModule } from "./vista-documento/vista-documento.module";
import { MantenedorUsuariosComponent } from './mantenedor-usuarios/mantenedor-usuarios.component';
import { MantenedorUsuariosModule } from "./mantenedor-usuarios/mantenedor-usuarios.module";
import { AuthGuard } from "../auth/helpers/auth.guard";
import { MantenedorSistemasComponent } from './mantenedor-sistemas/mantenedor-sistemas.component';
import { MantenedorSistemasModule } from "./mantenedor-sistemas/mantenedor-sistemas.module";
import { TablaOrigenesComponent } from './tabla-origenes/tabla-origenes.component';
import { TablaOrigenesModule } from "./tabla-origenes/tabla-origenes.module";

// routing
const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: { animation: 'home' }
      },
      {path: 'docsFirmar', loadChildren: () => import('./documentos-firmar/documentos-firmar.module').then(m => m.DocumentosFirmarModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {animation: 'docsFirmar'}
      },
      {path: 'vista/:id', loadChildren: () => import('./vista-documento/vista-documento.module').then(m => m.VistaDocumentoModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {animation: 'vista'}
      },
      {path: 'docsFirmados', loadChildren: () => import('./documentos-firmar/documentos-firmar.module').then(m => m.DocumentosFirmarModule),
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {animation: 'docsFirmar'}
      },
      {path: 'mantenedor', 
      children: [
        {path: 'usuarios',loadChildren: () => import('./mantenedor-usuarios/mantenedor-usuarios.module').then(m => m.MantenedorUsuariosModule)},
        {path: 'sistemas',loadChildren: () => import('./mantenedor-sistemas/mantenedor-sistemas.module').then(m => m.MantenedorSistemasModule)},
      ],
        canActivate: [AuthGuard],
        canLoad: [AuthGuard],
        data: {animation: 'mantenedor'},
      },
      // {
      //   path: 'bancoPreguntas', loadChildren: () => import('./bancoPreguntas/banco-preguntas/banco-preguntas.module').then(m => m.BancoPreguntasModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'bancoPreguntas' }
      // },
      // {
      //   path: 'disenoPlantillas', loadChildren: () => import('./plantilla/diseno-plantillas/diseno-plantillas.module').then(m => m.DisenoPlantillasModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'disenoPlantillas' }
      // },
      // {
      //   path: 'agregarPlantilla', loadChildren: () => import('./plantilla/agregar-plantilla/agregar-plantilla.module').then(m => m.AgregarPlantillaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'agregarPlantilla' }
      // },
      // {
      //   path: 'agregarPregunta', loadChildren: () => import('./bancoPreguntas/agregar-pregunta/agregar-pregunta.module').then(m => m.AgregarPreguntaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'agregarPregunta' }
      // },
      // {
      //   path: 'editarPlantilla/:id', loadChildren: () => import('./plantilla/editar-plantilla/editar-plantilla.module').then(m => m.EditarPlantillaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'editarPlantilla' }
      // },
      // {
      //   path: 'editarPregunta/:banpreId', loadChildren: () => import('./bancoPreguntas/editar-pregunta/editar-pregunta.module').then(m => m.EditarPreguntaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'editarPregunta' }
      // },
      // {
      //   path: 'formularioPregunta', loadChildren: () => import('./bancoPreguntas/formulario-pregunta/formulario-pregunta.module').then(m => m.FormularioPreguntaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'formularioPregunta' }
      // },
      // {
      //   path: 'clonar/:id', loadChildren: () => import('./plantilla/clonar/clonar.module').then(m => m.ClonarModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'clonar' }
      // },

      // {
      //   path: 'listadoEncuestas', loadChildren: () => import('./encuestas/listado-encuestas/listado-encuestas.module').then(m => m.ListadoEncuestasModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'listadoEncuestas' }
      // },
      // {
      //   path: 'agregarEncuesta', loadChildren: () => import('./encuestas/agregar-encuesta/agregar-encuesta.module').then(m => m.AgregarEncuestaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'agregarEncuesta' }
      // },
      // {
      //   path: 'crearDesdeAC/:idAccion', loadChildren: () => import('./encuestas/ac-encuesta/ac-encuesta.module').then(m => m.AcEncuestaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'crearDesdeAC' }
      // },
      // {
      //   path: 'editarEncuesta/:id', loadChildren: () => import('./encuestas/editar-encuesta/editar-encuesta.module').then(m => m.EditarEncuestaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'editarEncuesta' }
      // },
      // {
      //   path: 'formularioEncuesta', loadChildren: () => import('./encuestas/formulario-encuesta/formulario-encuesta.module').then(m => m.FormularioEncuestaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'formularioEncuesta' }
      // },
      // {
      //   path: 'gestionarEncuesta/:id', loadChildren: () => import('./encuestas/gestionar-encuesta/gestionar-encuesta.module').then(m => m.GestionarEncuestaModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'gestionarEncuesta' }
      // },
      // {
      //   path: 'reporte', loadChildren: () => import('./reporte/reporte.module').then(m => m.ReporteModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'reporte' }
      // },
      // {
      //   path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'usuarios' }
      // },
      // {
      //   path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
      //   canActivate: [AuthGuard],
      //   canLoad: [AuthGuard],
      //   data: { animation: 'categorias' }
      // },
    ]
  },




];

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HeaderModule,
    MenuModule,
    FooterModule,
    VistaDocumentoModule,
    MantenedorUsuariosModule,
    MantenedorSistemasModule
  ],
  exports: [
    PagesComponent,
    MenuModule,
    HeaderComponent,
  ]
})

export class PagesModule { }
