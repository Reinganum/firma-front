import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router:Router,
    private authenticationService: AuthenticationService,
    private _toastrService:ToastrService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuariosService
    ){}



    async ngOnInit() {
      if (this.authenticationService.isTokenNoValid()) {
        localStorage.clear();
        return;
      }
      let nombre;
      let correo;
      let token:any = localStorage.getItem('token');
      if (token !== null) {
        this.router.navigate(['/private/home']);

      }
      await this.spinner.show();
      setTimeout(async () => {
        await this.spinner.hide();
      }, 2000);
      this.authenticationService.setUser().then(async (user:any) => {
        console.log(user);

        if (user && user.token) {
          console.log('aqio');

          this.authenticationService.currentUser=user
          localStorage.setItem('currentUser', JSON.stringify(user));
          let datos = {
            tipoEvento: 'add',
            usuario: {
              rut: '',
              dv: '',
              nombres: user.firstName,
              apellidoP: user.lastName,
              apellidoM: 'apellido prueba',
              tipo: 1, // 1 = OTC - 2 = EXTERNO,
              email: user.email,
              estado:null
            }
          };
          await this.spinner.show();
          this.usuarioService.mantenerUsuario(datos).subscribe({
            next: async (res:any) => {
              console.log(res);
              await this.spinner.show();
              this.router.navigate(['/private/home']);
              await this.spinner.hide();

            },
            error: (error:any) => {
              console.log(error);

            }
          })
        } else {
          await this.spinner.hide();
          this._toastrService.info('Tu usuario debe ser activado','Contacte con el Administrador')
        }
      }).catch(e => {
        // this.router.navigate(['/login']);
        this.spinner.hide();

      });
    }

  public login() {
    const url = this.authenticationService.login();
    console.log("url", url);
    window.location.href = url;

  }
}
