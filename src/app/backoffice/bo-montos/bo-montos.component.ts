import { Component, OnInit } from '@angular/core';
import { MontosService } from 'src/app/services/firebase/montos.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MontoModalComponent } from './modales/monto-modal/monto-modal.component';

@Component({
	selector: 'app-bo-montos',
	templateUrl: './bo-montos.component.html',
	styleUrls: ['./bo-montos.component.css']
})
export class BoMontosComponent implements OnInit {

	public breadcrumbs: Array<any> = [];
	public montos: Array<any> = [];
	private modalReference: NgbModalRef;

	constructor(
		private montoService: MontosService,
		private modal: NgbModal
	) { }

	ngOnInit(): void {
		this.breadcrumbs = [{ "title": "Administración de Montos" }];
		this.obtenerMontos();
	}

	obtenerMontos() {
		this.montos = new Array<any>();
		this.montoService.obtenerMontos().subscribe(response => {
			response.forEach(_monto => {
				this.montos.push({
					id: _monto.payload.doc.id,
					montosData: _monto.payload.doc.data()
				})
			});
		});
	}

	abrirModalMontos(monto: any = null) {
		this.modalReference = this.modal.open(MontoModalComponent, {
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
		this.modalReference.componentInstance.monto = monto;

		this.modalReference.result.then(_close => {
			this.obtenerMontos();
		}, _dismiss => { });
	}

	eliminarMonto(monto: any) {
		Swal.fire({
			title: '¡Cuidado!',
			icon: 'warning',
			html: "¿Está seguro que desea eliminar este contenido? <br> Esto es irreversible y los datos se perderán.",
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Sí'
		}).then((result) => {
			if (result.value) {
				this.montoService.eliminarMonto(monto.id).then(() => {
					this.obtenerMontos();
				});
			};
		});
	}

}
