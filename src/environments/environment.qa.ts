export const environment = {
  production: false,
  SW: true,

  API_DOMAINS: {
    USUARIOS: 'https://api-firma-qa.0s.cl/usuarios',
    DOCUMENTOS: 'https://api-firma-qa.0s.cl/documentos',
    COMUNES: 'https://api-firma-qa.0s.cl/comunes',
    CORREOS: 'https://api-firma-qa.0s.cl/correos',
  },
  URL_SENCE: 'https://eligemejor.sence.cl/BuscarCurso/DetalleCurso?curso=',
  API_MOTORES: {
    MV: 'https://api-motores-otic-qa.0s.cl/motoresotic/motorValidacion',
    MR: 'https://api-motores-otic-qa.0s.cl/motoresotic/motorReglas',
    APIKEY: 'RVo1pHTI5s8ZxBNrybG8q8LMl0RVilZj6LDR2ztz'
  },
  sso: {
    url: 'https://sso-dev.0s.cl/auth',
    realm: 'OTIC',
    clientId: 'vinculate',
    credentials: {
      secret: 'AMfKa2Obzv4Hk5RkA17uDs5jFjh5KONq'
    }
  }
};
