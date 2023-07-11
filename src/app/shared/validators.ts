import {FormGroup,ValidationErrors} from '@angular/forms';
import * as moment from 'moment';
/**
 * @param  {string} inicio nombre del control fecha de inicio
 * @param  {'>'|'>='|'='|'!='|'<'|'<='} validacion tipo de validacion a aplicar sobre el inicio contra el fin
 * @param  {string} fin nombre del control fecha termino
 */
export const fechas = (inicio:string,validacion?:'<' | '<=',fin?:string) =>{
    return (formGroup:FormGroup):ValidationErrors | null =>{
        const fechaInicio = formGroup.get(inicio);
        const fechaFin = formGroup.get(fin!);
        let valid = true;
        if(fechaFin?.value){
            const fecha = Date.parse(fechaFin?.value);
            if(isNaN(fecha) || fecha < 0 ){
                fechaFin?.setErrors({ format:true })
                valid = false;
            }
            switch(validacion){
                case '<=':
                    if(!moment(fechaInicio?.value).isSameOrBefore(moment(fechaFin?.value))){
                        fechaInicio?.setErrors({ invalid:true });
                        fechaFin?.setErrors({ invalid:true });
                        valid = false;
                    }
                    break;
                case '<':
                    if(!moment(fechaInicio?.value).isBefore(moment(fechaFin?.value))){
                        fechaInicio?.setErrors({ invalid:true });
                        fechaFin?.setErrors({ invalid:true });
                        valid = false;
                    }
                    break;
            }
        }else if(fechaInicio?.value){
            const fecha = Date.parse(fechaInicio?.value);
            if(isNaN(fecha) || fecha < 0 ){
                fechaInicio?.setErrors({ format:true });
                valid = false;
            }
        }

        if(valid){
            fechaInicio?.setErrors(null);
            fechaFin?.setErrors(null);
            return null;
        }

        return { invalid: true};
    }
}