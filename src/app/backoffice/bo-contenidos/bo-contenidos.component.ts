import { Component, OnInit } from '@angular/core';
import { ContenidoService } from 'src/app/services/firebase/contenido.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContenidoModalComponent } from './modales/contenido-modal/contenido-modal.component';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-bo-contenidos',
	templateUrl: './bo-contenidos.component.html',
	styleUrls: ['./bo-contenidos.component.css']
})
export class BoContenidosComponent implements OnInit {
	public breadcrumbs: Array<any> = [];
	public contenidos: Array<any> = [];
	private modalReference: NgbModalRef;

	constructor(
		private contenidoService: ContenidoService,
		private modalService: NgbModal
	) { }

	ngOnInit(): void {
		this.breadcrumbs = [{ "title": "Administración de contenidos" }]
		this.obtenerContenidos();
	}

	obtenerContenidos() {		
		this.contenidos = new Array<any>();
		this.contenidoService.obtenerContenidos().subscribe(response => {			
			response.forEach(_contenido => {				
				this.contenidos.push({
					id: _contenido.payload.doc.id,
					contenidosData: _contenido.payload.doc.data()
				})				
			})
		});
	}

	abrirModalTextos(contenido: any = null) {		
		this.modalReference = this.modalService.open(ContenidoModalComponent, {
			centered: true,
			size: "lg",
			beforeDismiss: () => {
				return Swal.fire({
					title: '¡Cuidado!',
					icon: 'warning',
					html: "¿Está seguro que desea cerrar la pantalla? <br> No se guardarán los cambios.",
					showCancelButton: true,
					cancelButtonText: 'No',
					confirmButtonText: 'Sí'
				}).then((result) => {
					return (result.value) ? true : false;
				});
			}
		});

		this.modalReference.componentInstance.modalReference = this.modalReference;
		this.modalReference.componentInstance.contenido = contenido;

		this.modalReference.result.then(_close => {
			this.obtenerContenidos();
		}, _dismiss => {});
	}

	eliminarContenido(contenido: any) {
		Swal.fire({
			title: '¡Cuidado!',
			icon: 'warning',
			html: "¿Está seguro que desea eliminar este contenido? <br> Esto es irreversible y los datos se perderán.",
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Sí'
		}).then((result) => {
			if (result.value) {
				this.contenidoService.eliminarContenido(contenido.id).then(()=> {
					this.obtenerContenidos();
				});				
			};
		});
	}

}
