export const environment = {
  production: true,
  SW: true,

  API_DOMAINS: {
    USUARIOS: 'https://j42wt568v5.execute-api.us-east-1.amazonaws.com/local',
    DOCUMENTOS: 'https://vosip7qx50.execute-api.us-east-1.amazonaws.com/local',
    COMUNES: 'https://au8clsl9fg.execute-api.us-east-1.amazonaws.com/local'
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
