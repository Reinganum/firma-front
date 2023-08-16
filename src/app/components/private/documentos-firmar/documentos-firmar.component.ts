import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { DocumentData } from '../types';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { dutchRangeLabel } from 'src/app/shared/dutchRangeLabel';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup } from '@angular/forms';
import { CorreosService } from 'src/app/services/correos.service';
import { MatSort } from '@angular/material/sort';
import * as moment from 'moment';
import { EnvioCorreoComponent } from '../../modals/envio-correo/envio-correo.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FirmantesService } from 'src/app/services/firmantes.service';
import { ComunesService } from 'src/app/services/comunes.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-documentos-firmar',
  templateUrl: './documentos-firmar.component.html',
  styleUrls: ['./documentos-firmar.component.css']
})

export class DocumentosFirmarComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  modalRef!: NgbModalRef
  isChecked: boolean = false
  firmaParam: any = "firmar"
  userInfo: any = {}
  totalFilas!: number
  pageSize = 5
  pageSizeOptions = [5, 10, 20];
  tipoTabla: string = '';
  flagFiltros = false;
  filtrosForm!: FormGroup;
  dataSource: any;
  datosFirmante!: any

  constructor(
    private modalService: NgbModal,
    private documentosService: DocumentosService,
    private toastrService: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private correosService: CorreosService,
    private firmantesService: FirmantesService,
    private comunesServices: ComunesService,
  ) {
    this.filtrosForm = this.formBuilder.group({
      fechaDoc: [null],
      origen: [null],
      fechaInicio: [null],
      fechaComunicacion: [null]
    });
    this.dataSource = new MatTableDataSource();
  }
  currentUser: any;
  estadoDoc!: number;
  selection = new SelectionModel<any>(true, []);

  ngOnInit(): void {
    const rutaActual = window.location.pathname;
    const user = localStorage.getItem("currentUser");
    if (typeof user === "string") {
      this.currentUser = JSON.parse(user)
    }
    if (rutaActual?.includes('docsFirmar')) {
      console.log("docsFirmar");
      this.tipoTabla = 'firmar';
      this.estadoDoc = 1;
    } else if (rutaActual?.includes('docsFirmados')) {
      this.estadoDoc = 4;
      console.log("docsFirmados");
      this.tipoTabla = 'firmados';
      this.documentData = [
        { icon: "../assets/img/calendario_tabla.svg", nombre: "Fecha"  },
        { icon: "../assets/img/archivo_tabla.svg", nombre: "Documento" },
        { icon: "../assets/img/origen_tabla.svg", nombre: "Origen"     },
        { icon: "../assets/img/opcion_tabla.svg", nombre: "Opciones"   }
      ]
    }
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    this.filtrosForm = this.formBuilder.group({
      fechaDoc: [null],
      origen: [null],
      fechaComunicacion: [null],
    });
    this.getFirmante()
  }

  ngAfterViewInit() {
    this.paginador._intl.itemsPerPageLabel = "Items por Página";
    this.paginador._intl.nextPageLabel = "Página Siguiente";
    this.paginador._intl.previousPageLabel = "Página Anterior";
    this.paginador._intl.getRangeLabel = dutchRangeLabel;

    this.sort.sortChange.subscribe(async () => {
      this.paginador.firstPage();
      this.obtenerDocumentos(this.sort.active, this.sort.direction, this.paginador.pageSize, this.paginador.pageIndex);
    });

    this.paginador.page.subscribe(async () => {
      this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
    })
  }

  @ViewChild(MatPaginator, { static: true }) paginador!: MatPaginator;
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;


  documentosFirmar: any[] = []

  filtrar() {
    console.log(this.convertDateForDB(this.filtrosForm.value.fechaDoc))
    this.paginador.firstPage();
    this.paginador.pageSize = this.pageSize;
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize);
  }

  limpiar() {
    this.filtrosForm.reset()
    this.obtenerDocumentos(null, '', this.paginador.pageIndex, this.paginador.pageSize | this.pageSize)
  }

  masterToggle() {
    if (this.isAllSelected()) {
      console.log(this.selection)
      this.selection.clear()
    } else {
      this.documentList.forEach((row: any) => this.selection.select(row));
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.documentList.length;
    return numSelected === numRows;
  }

  exportar() {

  }

  tag: boolean = false;

  async obtenerDocumentos(sortField: any, sortDirection: any, pageLimit: any, pageOffset: any) {
    try {
      console.log(this.convertDateForDB(this.filtrosForm.value.fechaDoc))
      await this.spinner.show();
      this.documentosService.obtenerDocumentos(
        // "ncatalan@nexia.cl", 
        this.currentUser.email,
        this.estadoDoc,
        this.filtrosForm.value.origen,
        this.convertDateForDB(this.filtrosForm.value.fechaDoc),
        sortField,
        sortDirection == '' ? '' : sortDirection,
        pageLimit,
        pageOffset).subscribe(
          {
            next: async (res: any) => {
              /*console.log(
                "estado : ", this.estadoDoc,
                "origen : ", this.filtrosForm.value.origen,
                "fecha : ",this.filtrosForm.value.fechaDoc,
                "sort : ", sortField,
                "Sdirect : ", sortDirection == '' ? '' : sortDirection,
                "Limit : ", pageLimit,
                "Offset : ", pageOffset
              )*/
              this.documentList = res.listaDocs.data.map((doc:any)=>{
                if(doc.firmantes.filter((f:any)=>f.correo==this.currentUser.email&&f.firmo===1).length>0){
                  doc.usuarioFirmo=true
                  return doc
                }
                return doc
              })
              console.log(this.documentList)
              //this.datosFirmante = this.documentList[0].firmantes.filter((firmante: any) => firmante.correo === this.currentUser.email)[0]
              //console.log(this.datosFirmante)
              this.totalFilas = res.listaDocs.total;
              this.dataSource = new MatTableDataSource(this.documentList);
              this.tag = false;
              await this.spinner.hide();
            },
            error: async (error: any) => {
              console.log(error)
              this.documentList = [];
              this.totalFilas = 0;
              this.tag = true;
              await this.spinner.hide();
            }
          });
    } catch (error: any) {
      await this.spinner.hide();
      console.log(error)
      if (error.status.toString() === '404') {
        this.toastrService.warning(error.error.message);
      } else if (['0', '401', '403', '504'].includes(error.status.toString())) {

      } else {
        this.toastrService.error("Ha ocurrido un error");
      }
      console.log(error);
    }

  }

  getFirmante() {
    this.spinner.show()
    this.firmantesService.getFirmante(this.currentUser.email).subscribe({
      next: (res:any) => {
        console.log(res.firmante);
        res.firmante.nombreCompleto=`${res.firmante.nombres?res.firmante.nombres:"(Sin registro)"} ${res.firmante.apellidos?res.firmante.apellidos:"(Sin registro)"}`
        this.datosFirmante=res.firmante
        this.datosFirmante.nombre
        this.spinner.hide()
      },
      error: (error) => {
        console.log(error);
        this.spinner.hide()
      }
    });
  }

  vistaPrevia(documento: any) {
    this.router.navigate([`private/vista/${documento.id}`]);
  }

  showModal(documento: any) {
    this.modalRef = this.modalService.open(ConfirmacionFirmaDocumentoComponent, { backdrop: 'static', size: 'md' });
    this.modalRef.componentInstance.documento = documento;
    this.modalRef.componentInstance.datosFirmante = this.datosFirmante
    this.modalRef.result.then((res) => {
      if (res.estado) {
        this.modalRef.close();
      }
    })
  }

  showModalCorreo(documento: any) {
    this.modalRef = this.modalService.open(EnvioCorreoComponent, { backdrop: 'static', size: 'md' });
    this.modalRef.componentInstance.documento = documento;
    this.modalRef.componentInstance.key = `Cargas/Documentos/${documento.archivo}`;
    this.modalRef.componentInstance.documento = documento;
    this.modalRef.result.then((res) => {
      if (res.estado) {
        this.modalRef.close();
      }
    })
  }

  enviarNotificacion() {
    console.log(this.currentUser);
    const datosCorreo = {
      email: this.currentUser.email,
      asunto: "Envio Documento Firmado",
      nombre: `${this.currentUser.firstName} ${this.currentUser.lastName}`
    }
    this.correosService.notificarDocFirmado(datosCorreo).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  documentData: DocumentData[] = [
    { icon: "../assets/img/calendario_tabla.svg", nombre: "Fecha" },
    { icon: "../assets/img/archivo_tabla.svg", nombre: "Documento" },
    { icon: "../assets/img/origen_tabla.svg", nombre: "Origen" },
    { icon: "../assets/img/firma_tabla.svg", nombre: "Estado" },
    { icon: "../assets/img/opcion_tabla.svg", nombre: "Opciones" }
  ];

  opcionesOrigen: any[] = [
    { value: 1, origen: "Gestión Normativa" },
    { value: 3, origen: "Portal Proveedores" },
    { value: 2, origen: "Gestor Capital Humano" }
  ]

  private convertDateForDB(inputDate: string): string {
    if (inputDate) {
      const dateObject = new Date(inputDate);
      const day = this.addLeadingZero(dateObject.getDate());
      const month = this.addLeadingZero(dateObject.getMonth() + 1);
      const year = dateObject.getFullYear();

      return `${year}-${month}-${day}`;
    }
    return '';
  }

  public convertDateForTable(inputDate: string): string {
    if (inputDate) {
      const day = inputDate.slice(8, 10)
      const month = inputDate.slice(5, 7)
      const year = inputDate.slice(0, 4)

      return `${day}-${month}-${year}`;
    }
    return '';
  }

  private addLeadingZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  documentList: any;

  async firmarSeleccionados(): Promise<any> {
    if (this.selection.selected.length === 0) {
      return this.toastrService.warning("No hay documentos seleccionados para firmar")
    }
    this.selection.selected.forEach((document) => {
      const firmantes = document.firmantes
      let esFirmante = false;
      document.firmantes = firmantes.map((firmante: any) => {
        if (firmante.correo == this.currentUser.email) {
          firmante.firmo = 1;
          esFirmante = true
          console.log("Usuario si pertenece a la lista de firmantes")
        }
        return firmante
      })
      if (esFirmante === false) {
        this.toastrService.warning(`Tu usuario no está registrado para firmar el documento ${document.archivo}`)
      } else {
        let firmante = document.firmantes.filter((firmante: any) => {
          return firmante.correo == this.currentUser.email
        })
        const dataFirmante = {
          firmante: {
            firmo: 1
          },
          idDoc: document.id,
          idFir: firmante[0].idFirmante
        }
        this.spinner.show();
        this.editarFirmante(dataFirmante)
        this.documentosService.crearPdfFirma({
          key: `Cargas/Documentos/${document.archivo}`,
          firmantes
        }).subscribe({
          next: async (res) => {
            console.log(res);
            res.datosTabla
            res.pdfBase64
            let listaNueva: any = [];
            res.datosTabla.map((datos: any) => {
              listaNueva.push(datos)
            });
            console.log(listaNueva);
            await this.firmar(document, listaNueva, res.pdfBase64);
          },
          error: async (error) => {
            console.log(error);
            await this.spinner.hide();
          }
        });
      }
    })
  }

  async firmar(documento: any, datosTabla: any, pdfBase64: any) {
    console.log(datosTabla);
    console.log(pdfBase64);
    const newDatos = JSON.stringify(datosTabla).replace("'", '"');
    console.log(JSON.parse(newDatos));
    const firma = await this.comunesServices.firma({ datosTabla, pdfBase64, hash: documento.hashDoc }).toPromise();
    console.log(firma);
    let bucket = window.location.hostname !== "localhost" ? 'firma-otic-qa-doc' : "ofe-local-services"
    const url: any = await this.comunesServices.getSignedUrl({ bucket, key: firma.key, metodo: 'get' }).toPromise();
    const link = document.createElement('a');
    console.log(url.message);

    link.href = url.message;
    link.download = firma.key.split('/')[firma.key.split('/').length - 1];
    link.target = '_blank';
    link.click();

    let estadoDoc = this.setEstadoDoc(documento?.firmantes);
    console.log(estadoDoc)
    this.editarEstadoFirma(documento, estadoDoc, firma.key);
    this.crearNotificacion(documento)
    await this.spinner.hide();
  }

  editarFirmante(data: any) {
    this.firmantesService.editarFirmante(data).subscribe({
      next: async (res) => {
        console.log(res);
        await this.spinner.hide();
      },
      error: async (error) => {
        console.log(error);
        await this.spinner.hide();
      }
    });
  }

  extraerIniciales(origen: string) {
    const strArr = origen.split(' ');
    if (strArr.length === 1) {
      return strArr[0].slice(0, 1)
    } else {
      return strArr[0].slice(0, 1) + strArr[1].slice(0, 1)
    }
  }

  editarEstadoFirma(documento: any, estadoDoc: number, url: any) {
    let datos: any = {
      documento: {
        estado: estadoDoc,
        id: documento.id,
        archivoFirmado: url,
      }
    }
    if (estadoDoc === 4) {
      datos.documento.fechaFirma = this.convertDateForDB(Date.now().toString())
    }
    this.spinner.show();
    this.documentosService.editarDocumento(datos).subscribe({
      next: (res: any) => {
        console.log(res);
        this.spinner.hide();
        this.enviarNotificacion()
      },
      error: (error: any) => {
        console.log(error);
        this.spinner.hide();
      }
    });
  }

  crearNotificacion(document: any) {
    const datos = {
      responsable: document.responsable,
      firmante: this.currentUser.email,
      docFirmado: document.archivo
    }
    this.spinner.show();
    this.documentosService.crearNotificacion(datos).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate([`private/docsFirmados`]);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  setEstadoDoc(firmantes: any) {
    console.log(firmantes)
    let firmasFaltantes=firmantes.filter((f:any)=>f.firmo===false||f.firmo===null||f.firmo===0||f.firmo==='')
    return firmasFaltantes.length > 0 ? 3 : 4
  }
}
