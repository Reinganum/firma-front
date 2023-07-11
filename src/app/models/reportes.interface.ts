import { ChartData, ChartType, ChartOptions } from "chart.js";

export interface ReporteResponse {
    encuestas:      Encuesta[];
    encuestasTotal?: number;
}

export interface Encuesta {
    encId:                      number;
    uuid:                       string;
    nombre:                     string;
    evalucacionEsAbierto:       number;
    fechaInicio:                string;
    fechaFin:                   string;
    plantId:                    number;
    cantidadPreguntas?:         number;
    creadoEl:                   string;
    actualizadoEl:              null | string;
    creadoPor:                  number;
    actualizadoPor:             number | null;
    estado:                     number;
    ac:                         boolean;
    nombreAC:                   string;
    tipoAC:                     string;
    nombreCursoAC:              string;
    cursoIdAC:                  number;
    areaCursoAC:                string;
    fechaInicioAC:              string;
    fechaFinAC:                 string;
    estadoAC:                   number;
    accionIdAC:                 number;
    partIdAC:                   number;
    cliComercialAC:             number;
    cliComercialNombreAC:       string;
    plantillaModel:             PlantillaModel;
    encuestaParticipanteModels: EncuestaParticipanteModel[];
    encuestaRecordatorioModels: any[];
}

export interface EncuestaParticipanteModel {
    encpartiId:           number;
    encId:                number;
    partiId:              number;
    tiprecopId:           number;
    valor:                string;
    respondida:           number;
    respondidaEl:         null;
    puntaje:              number;
    nota:                 null;
    aprobado:             number;
    participanteModel:    ParticipanteModel;
    tipoRecopiladorModel: TipoRecopiladorModel;
}

export interface ParticipanteModel {
    partiId:  number;
    nombre:   string;
    rut:      string;
    email:    Email;
    clave:    Clave;
    telefono: null | string;
}

export enum Clave {
    Fmfcwb9M = "fmfcwb9m",
}

export enum Email {
    BGmailCOM = "b@gmail.com",
    EjemploEjemploCl = "ejemplo@ejemplo.cl",
}

export interface TipoRecopiladorModel {
    tiprecopId: number;
    nombre:     Nombre;
}

export enum Nombre {
    URL = "URL",
}

export interface PlantillaModel {
    plantId:                            number;
    nombre:                             string;
    tipplaId:                           number;
    tieneEvaluacion:                    number;
    evaluacionEsNota:                   number;
    porcentajeAprobacion:               number;
    escalaNota:                         null;
    notaMinimaAprobacion:               null;
    visualizacionEsPreguntaPorPantalla: number;
    tipoEvaluacionEsUnica:              number;
    logotipo:                           string;
    colorCorporativo:                   string;
    mensajeCierre:                      string;
    estado:                             number;
    creadoEl:                           string;
    creadoPor:                          null;
    actualizadoEl:                      string;
    actualizadoPor:                     number;
    eliminado:                          number;
    eliminadoEl:                        null;
    eliminadoPor:                       null;
    tipoPlanillaModel:                  TipoPlanillaModel;
    plantillaColaboradoresModels:       any[];
    plantillaPaginasModels:             PlantillaPaginasModel[];
}

export interface PlantillaPaginasModel {
    plapagId:                          number;
    indice:                            number;
    plantId:                           number;
    plantillaPaginasComponentesModels: PlantillaPaginasComponentesModel[];
}

export interface PlantillaPaginasComponentesModel {
    plapagcoId:                      number;
    tipcoId:                         number;
    pregunta:                        string;
    vistaAlternativa:                number;
    puntaje:                         number | null;
    obligatorio:                     number | null;
    guardarBanco:                    number;
    banpreId:                        number | null;
    plapagId:                        number;
    orden:                           number;
    tipoComponenteModel:             TipoComponenteModel;
    plantillaPagComRespuestasModels: PlantillaPagCOMRespuestasModel[];
    plantillaPagComPreguntasModels:  PlantillaPagCOMPreguntasModel[];
}

export interface PlantillaPagCOMPreguntasModel {
    plapagcompreId: number;
    plapagcoId:     number;
    pregunta:       string;
}

export interface PlantillaPagCOMRespuestasModel {
    plapagcomresId: number;
    alternativa:    string;
    correcta:       number;
    orden:          number;
    correctaFor:    CorrectaFor;
    plapagcoId:     number;
    logica:         null;
}

export enum CorrectaFor {
    Empty = "[]",
    PreguntaID0 = "[{\"preguntaID\":\"0\"}]",
    PreguntaID0PreguntaID1 = "[{\"preguntaID\":\"0\"},{\"preguntaID\":\"1\"}]",
    PreguntaID1 = "[{\"preguntaID\":\"1\"}]",
    PreguntaID2 = "[{\"preguntaID\":\"2\"}]",
}

export interface TipoComponenteModel {
    tipcoId: number;
    nombre:  string;
    tipo:    string;
}

export interface TipoPlanillaModel {
    tipplaId: number;
    nombre:   string;
}



export interface Pagina{
    [nombre:string]:KPI[];
  }
  
export interface KPI {
    data: ChartData;
    type: ChartType;
    options?: ChartOptions;
  }