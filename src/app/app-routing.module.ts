import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./components/private/pages.module').then(m => m.PagesModule),
    data: { animation: 'private' }
  },
  {path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./components/public/login/login.module').then(m => m.LoginModule) },
  { path: 'consulta-documento', loadChildren: () => import('./components/public/consultar-documento/consultar-documento.module').then(m => m.ConsultarDocumentoModule)},
  { path: 'vista/:id/:token', loadChildren: () => import('./components/public/firma-externos/firma-externos.module').then(m => m.FirmaExternosModule)},
  { path: 'vista-publica/:id', loadChildren: () => import('./components/public/vista-publica/vista-publica.module').then(m => m.VistaPublicaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
