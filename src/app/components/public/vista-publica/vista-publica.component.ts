import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComunesService } from 'src/app/services/comunes.service';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ConfirmacionFirmaDocumentoComponent } from '../../modals/confirmacion-firma-documento/confirmacion-firma-documento.component';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CanvasElement } from 'pdfmake/interfaces';
import { AuthenticationService } from '../../auth/service/authentication.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface Firmante {
	firmo: any;
	rut: string,
	nombres: string
}

@Component({
	selector: 'app-vista-publica',
	templateUrl: './vista-publica.component.html',
	styleUrls: ['./vista-publica.component.css'],
	providers: [
		{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
		JwtHelperService
	]
})

export class VistaPublicaComponent implements OnInit {
	archivoFirmar: string = '';
	docHash!: string;
	token!: string;
	modalRef!: NgbModalRef;
	zoom: number = 1
	rotation: number = 0
	currentPage: number = 1
	totalPages: number = 1
	fileName: string = ""
	currentUser: any = ""
	page!: any
	pdfMake = pdfFonts.pdfMake.vfs;
	userName!: string
	firmantes!: any // res.documento.firmantes
	FIRMANTES_DATA: any;
	dataSource: any;
	displayedColumns: any;
	columns: any;

	constructor(
		private comunesServices: ComunesService,
		private route: ActivatedRoute,
		private documentosService: DocumentosService,
		private spinner: NgxSpinnerService,
		private toaster: ToastrService,
		private router: Router,
		private modalService: NgbModal,
		private authenticationService: AuthenticationService,
		private jwt: JwtHelperService
	) {

	}
	ngOnInit(): void {
		this.route.params.subscribe((params: any) => {
			this.docHash = params["docHash"];
			try {
				this.obtenerPath(this.docHash);
			} catch (error) {
				console.log(error)
			}
		})
	}

	rotate(): void {
		this.rotation += 90
	}

	zoomIn(): void {
		this.zoom += 0.25
	}

	zoomOut(): void {
		this.zoom > 0.25 ? this.zoom -= 0.25 : this.zoom;
	}
	async obtenerPath(docHash: any) {
		await this.spinner.show();
		this.documentosService.listaDocHash(docHash).subscribe({
			next: async (res: any) => {
				console.log(res);
				if (!res.documento) {
					await this.spinner.hide();
					this.toaster.warning("No se encontró el documento.");
					return;
				}
				this.obtenerPathS3(res.documento.data[0].archivo)
				this.fileName = res.documento.data[0].archivo;
				let firmantes = res.documento.data[0].firmantes;
				console.log(firmantes)
				this.columns = [
					{
						columnDef: 'Estado',
						header: 'Estado',
						cell: (element: Firmante) => `${element.firmo === 0 ? 'Pendiente' : 'Firmado'}`,
					},
					{
						columnDef: 'RUT',
						header: 'RUT',
						cell: (element: Firmante) => `${element.rut}`,
					},
					{
						columnDef: 'Nombre',
						header: 'Nombre',
						cell: (element: Firmante) => `${element.nombres}`,
					},
				];
				this.dataSource = firmantes;
				this.displayedColumns = this.columns.map((c: { columnDef: any; }) => c.columnDef);
			},
			error: async (error: any) => {
				await this.spinner.hide();
				console.error(error);
			}
		});
	}

	async obtenerPathS3(archivo: any) {
		console.log(archivo);
		const fileData: any = {
			key: archivo,
			metodo: 'get'
		}
		const resultado: any = await this.comunesServices.getSignedUrl(fileData).toPromise();
		console.log(resultado);
		this.archivoFirmar = resultado.message;
		this.toaster.success("Documento cargado correctamente!");
		await this.spinner.hide();
	}

	async descargarArchivo(archivo: any) {
		const fileData: any = {
			key: `Cargas/Documentos/${archivo}`,
			metodo: 'get'
		}
		const resultado: any = await this.comunesServices.getSignedUrl(fileData).toPromise();
		const link = document.createElement('a');
		link.href = resultado.message;
		link.download = fileData.key.split('/')[fileData.key.split('/').length - 1];
		link.target = '_blank';
		link.click();
	}

	modalFirmar() {
		this.modalRef = this.modalService.open(ConfirmacionFirmaDocumentoComponent, { backdrop: 'static', size: 'lg' });
	}
	callBackFn(pdf: PDFDocumentProxy) {
		this.totalPages = pdf._pdfInfo.numPages
		console.log(pdf._pdfInfo.numPages)
	}
	pasarPagina(): void {
		this.currentPage < this.totalPages ? this.currentPage += 1 : this.currentPage = 1
	}
}

