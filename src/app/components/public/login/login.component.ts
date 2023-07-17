import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService
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
        await this.spinner.show();
        if (user && user.token) {
          this.authenticationService.currentUser=user
          localStorage.setItem('currentUser', JSON.stringify(user));

          this.router.navigate(['/private/home']);
        } else {
          await this.spinner.hide();
          this._toastrService.info('Tu usuario debe ser activado','Contacte con el Administrador')
        }
        // this.timersService.startTimerToken();
        // this.fechaCreacion = moment().format("YYYY/MM/DD HH:mm");
        // let that = this;
        // nombre = res.firstName + ' ' + res.lastName;
        // correo = res.email;
        // token = res.token;
        // this.spinner.show();
        // this.usuariosService.agregarUsuario({
        //       us_correo: correo,
        //       us_nombres: nombre,
        //       us_fecha_creacion: that.fechaCreacion,
        //     }).subscribe({
        //       next: (result) => {
        //         if (result.message.toString() === "ok") {
        //           this.localStorageService.set("userData", {
        //             nombre: result.usuario.us_nombres,
        //             email: result.usuario.us_correo,
        //           });
        //           this.localStorageService.set(
        //             "nombres",
        //             result.usuario.us_nombres
        //           );
        //           this.localStorageService.set("token", token);
        //           localStorage.setItem("nombres", result.usuario.us_nombres);
        //           localStorage.setItem("correo", result.usuario.us_correo);
        //           localStorage.setItem("rol", JSON.stringify(result.permisos));
        //           localStorage.setItem(
        //             "currentUser",
        //             JSON.stringify(result.usuario)
        //           );
        //           this.router.navigate(["/home"]).then(() => {
        //             window.location.reload()
        //           });
        //         }

        //         if (result.message === "creado") {
        //           Swal.fire({
        //             title: "Información",
        //             text: "Se ha enviado la Solicitud de Alta al Administrador, se te notificará cuando sea aprobada.",
        //             icon: "success",
        //             confirmButtonText: "Aceptar",
        //             allowOutsideClick: false,
        //             allowEscapeKey: false,
        //           }).then((action: SweetAlertResult) => {
        //             if (action.isConfirmed) {
        //               this.authenticationService.logout();
        //               this.router.navigate(["/login"]);
        //             }
        //           });
        //         }

        //         if (result.message === 'inhabilitado') {
        //           Swal.fire({
        //             title: 'Información',
        //             text: 'El usuario no se encuentra habilitado.',
        //             icon: 'info',
        //             confirmButtonText: 'Aceptar',
        //             allowOutsideClick: false,
        //             allowEscapeKey: false
        //           }).then((action: SweetAlertResult) => {
        //             if (action.isConfirmed) {
        //               this.authenticationService.logout();
        //               // this.router.navigate(['/login']);
        //               this.router.navigate(['/home']);
        //             }
        //           });
        //         }
        //         this.spinner.hide();
        //       },
        //       error: (error) => {
        //         console.log(error);
        //         this.spinner.hide();
        //       }})
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
