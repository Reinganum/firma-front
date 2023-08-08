import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  permisosPush!:any

  constructor(
    private router:Router,
    private authenticationService: AuthenticationService,
    private _toastrService:ToastrService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuariosService,
    private swPush:SwPush
    ){}

    async ngOnInit() {
      if (this.authenticationService.isTokenNoValid()) {
        this._toastrService.show("No hay token guardado")
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
          user.tipo=this.verifyEmail(user.email,"sofofa");
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
              tipo: this.verifyEmail(user.email,"sofofa"), // 1 = OTIC - 2 = EXTERNO,
              email: user.email,
              estado:null
            }
          };
          await this.spinner.show();
          this.usuarioService.mantenerUsuario(datos).subscribe({
            next: async (res:any) => {
              console.log(res);
              if(res.code===1){
               this._toastrService.success(res.message)
                console.log(res.usuario.id)
                localStorage.setItem('userId', JSON.stringify(res.usuario.id));
                this.router.navigate(['/private/home']);
              } else if (res.code===2){
               this._toastrService.success(res.message)
                return 
              } else if (res.code===0){
                this._toastrService.warning(res.message)
                return 
              }
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

  verifyEmail(email:string,domainToCheck:string) {
    return this.emailContainsDomain(email, domainToCheck) ? 1 : 2;
  }

  private emailContainsDomain(email: string, domainToCheck: string): boolean {
    const regex = /@(.+)/;
    const match = email.match(regex);

    if (match) {
      const domain = match[1];
      return domain.includes(domainToCheck);
    }

    return false;
}
  subscribeToNotifications(){
    this.swPush.requestSubscription({serverPublicKey:""})
    .then(res=>{
      this.permisosPush=res
    })
    .catch(error=>{
      this.permisosPush=error
    })
  }
}
