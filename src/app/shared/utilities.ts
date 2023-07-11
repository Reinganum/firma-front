export const scrollToInvalid = () => {
    const firstInvalidControl:HTMLElement | null = document.querySelector(
        "mat-form-field.ng-invalid"
      );

      if(firstInvalidControl){
          window.scroll({
            top: getTopOffset(firstInvalidControl),
            left: 0,
            behavior: "smooth"
          });
      }
  
}

export const getTopOffset = (controlEl: HTMLElement): number => {
    const labelOffset = 75;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
}

export const validateEmail = (email:string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const validateRut = (rutcompleto: string): boolean => {
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutcompleto ))
    return false;
  let tmp 	= rutcompleto.split('-');
  let digv	= tmp[1];
  let rut 	= tmp[0];
  if ( digv == 'K' ) digv = 'k' ;
  return (checkDV(rut) == digv );
}

const checkDV = (T: any): any => {
  let M=0,S=1;
  for(;T;T=Math.floor(T/10))
    S=(S+T%10*(9-M++%6))%11;
  return S?S-1:'k';
}