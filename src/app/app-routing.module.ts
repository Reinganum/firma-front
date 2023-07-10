import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/private/home/home.component';

const routes: Routes = [
  {
    path: 'private',
    loadChildren: () => import('./components/private/pages.module').then(m => m.PagesModule),
    data: { animation: 'private' }
  },
  { path: 'login', loadChildren: () => import('./components/public/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
