import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./components/private/pages.module').then(m => m.PagesModule),
    data: { animation: 'private' }
  },
  {path: '', redirectTo:'login',pathMatch:'full'},
  { path: 'login', loadChildren: () => import('./components/public/login/login.module').then(m => m.LoginModule) },
  { path: 'consulta-documento', loadChildren: () => import('./components/public/consultar-documento/consultar-documento.module').then(m => m.ConsultarDocumentoModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
