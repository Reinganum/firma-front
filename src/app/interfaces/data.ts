import { Validacion } from './validacion';
export interface Data {
    nombreCampo: string;
    valor: string | null;
    validaciones: Validacion[]
}

