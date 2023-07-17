export const environment = {
  production: true,
  SW: true,

  API_DOMAINS: {
    USUARIOS: 'http://localhost:3500/local',
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
