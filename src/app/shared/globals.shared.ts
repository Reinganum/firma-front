import { Injectable } from '@angular/core';
//import Swal, { SweetAlertResult } from 'sweetalert2';
import { LocalStorageService } from 'angular-web-storage';
import { Router } from '@angular/router';
import * as moment from "moment";
//import {AgendaModel} from "../models/agenda.model";
import {ToastrService} from 'ngx-toastr';
@Injectable()
export class GlobalService {
    // validarPermiso(permiso: string, permisos: any[]): boolean {
    //     const acceso = permisos.find((x: any) => x.permisoId.toString() === permiso);
    //     if (acceso) {
    //         return true;
    //     }
    //     return false;
    // }
    constructor(private toastrService: ToastrService){
    }
    cerrarSesion(localStorageService: LocalStorageService, router: Router): void {
        this.toastrService.info("Tu sesión ha caducado, favor ingresa nuevamente");
       /* Swal.fire({
            title: 'Información',
            text: 'Tu sesión ha caducado, favor ingresa nuevamente',
            icon: 'info',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((action: SweetAlertResult) => {
            if (action.isConfirmed) {
              localStorageService.clear();
              router.navigate(['/login']);
            }
          }); */
    }
}
export enum EnumTipoValidacion {
    CAMPOREQUERIDO = 'Campo Requerido',
    CAMPONOREQUERIDO = 'Campo No Requerido',
    LARGOMAXIMO = 'Largo Máximo',
    TIPODATO = 'Tipo Dato',
    RUTVALIDO = 'RUT Válido',
    FONOVALIDO = 'Fono Válido',
    MAILVALIDO = 'Mail Válido',
    FECHAVALIDA = 'Fecha Válida',
    SELECCIONVALIDA = 'Seleccion Válida',
    COMPARARFECHAINIFIN = 'Comparar Fecha Inicio y Fecha Fin',
    DIFERENCIADIASHABILES = 'Diferencia Días Hábiles',
    DIFERENCIADIAS = 'Diferencia Días',
    DIFERENCIAANIOS = 'Diferencia Años',
    MISMOANIO = 'Mismo Año',
    COMPARARBLOQUES = 'Comparar Bloques'
}
export function formatoFecha(fecha: string): string {
    if (fecha) {
        fecha = fecha.replace('.000Z', '');
        return moment(fecha).format('DD/MM/YYYY');
    }
    return '';
}
export function hrsmins(horas: any) {
    const sign = horas < 0 ? '-' : '';
    const hrs = Math.floor(Math.abs(horas));
    const min = Math.round((Math.abs(horas) * 60) % 60);
    return sign + (hrs < 10 ? '0' : '') + hrs + ':' + (min < 10 ? '0' : '') + min;
}