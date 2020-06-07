import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/firebase/proyectos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoModalComponent } from './modales/proyecto-modal/proyecto-modal.component';
import Swal from 'sweetalert2';
import { GaleriaComponent } from './modales/galeria/galeria.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
	selector: 'app-bo-proyectos',
	templateUrl: './bo-proyectos.component.html',
	styleUrls: ['./bo-proyectos.component.css']
})
export class BoProyectosComponent implements OnInit {
	public breadcrumbs: Array<any> = [];
	public proyectos: Array<any> = [];
	private modalReference: NgbModalRef;

	constructor(
		private proyectoService: ProyectosService,
		private modalService: NgbModal,
		private firestorage: AngularFireStorage
	) { }

	ngOnInit(): void {
		this.breadcrumbs = [{ "title": "Administración de proyectos" }]
		this.obtenerProyectos()
	}

	obtenerProyectos() {
		this.proyectos = new Array<any>();
		this.proyectoService.obtenerProyectos().subscribe(response => {
			response.forEach(proyecto => {
				this.proyectoService.obtenerProyecto(proyecto.payload.doc.id).subscribe(_response => {
					_response.forEach(_proyecto => {
						this.proyectos.push({
							id: _proyecto.payload.doc.id,
							obraData: _proyecto.payload.doc.data()
						});
					});
				}, _error => Swal.fire('Se ha presentado un error inesperado.', 'No se pudo obtener la información de los proyectos debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.', 'error'));
			});
		}, _error => Swal.fire('Se ha presentado un error inesperado.', 'No se pudo obtener la información de los proyectos debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.', 'error'));
	}

	abrirProyectoModal(proyecto: any = null) {
		this.modalReference = this.modalService.open(ProyectoModalComponent, {
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
		this.modalReference.componentInstance.proyecto = proyecto;

		this.modalReference.result.then(_close => {
			this.obtenerProyectos();
		}, _dismiss => {});
	}

	eliminarProyecto(proyecto: any) {
		Swal.fire({
			title: '¡Cuidado!',
			icon: 'warning',
			html: "¿Está seguro que desea eliminar este proyecto? <br> Esto es irreversible y los datos se perderán.",
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Sí'
		}).then((result) => {
			if (result.value) {
				this.proyectoService.eliminarProyecto(proyecto.id, proyecto.obraData.zona);
				this.proyectoService.eliminarImagenes(proyecto.obraData.nombre);
				this.obtenerProyectos();
			};
		});
	}

	abrirGaleria(proyecto: any) {
		this.modalReference = this.modalService.open(GaleriaComponent, {
			centered: true,
			size: "lg"
		});

		this.modalReference.componentInstance.modalReference = this.modalReference;
		this.modalReference.componentInstance.proyecto = proyecto;
	}
}
