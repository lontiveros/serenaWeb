import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MontosService } from 'src/app/services/firebase/montos.service';
import { Monto } from 'src/app/domain/monto';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-monto-modal',
	templateUrl: './monto-modal.component.html',
	styleUrls: ['./monto-modal.component.css']
})
export class MontoModalComponent implements OnInit {
	@Input() modalReference: NgbModalRef;
	@Input() monto: any;

	public modalTitle: string;
	public montoForm: FormGroup;
	public isFormSubmitted: boolean = false;
	public montos: Array<any> = [];

	constructor(
		private formBuilder: FormBuilder,
		private montoService: MontosService
	) { }

	ngOnInit(): void {
		this.modalTitle = (this.montos) ? "Editando monto: " + this.monto.id : "Nuevo contenido";

		this.initMontoForm();
		this.obtenerMontos();

		if (this.monto) {
			this.setMontosData(this.monto)
		}
	}

	initMontoForm() {
		this.montoForm = this.formBuilder.group({
			'monto': ['', Validators.required]
		});
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


	setMontosData(monto: any) {
		this.montoForm.get('monto').setValue(monto.montosData.valor);

	}

	cerrarModal() {
		this.modalReference.dismiss();
	}

	guardarMonto() {
		this.isFormSubmitted = true;

		if (this.montoForm.valid) {
			let monto = new Monto;
			monto.valor = this.montoForm.get('valor').value;


			if (this.monto) {
				this.montoService.actualizarMonto(this.monto.id, monto).then(_response => {
					Swal.fire('Se ha actualizado el monto.', 'El monto ' + this.monto.id + ' se ha actualizado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El monto ' + this.monto.id + ' no pudo ser actualizado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			} else {
				this.montoService.guardarMonto(this.monto.id, monto.valor).then(_response => {
					Swal.fire('Se creo el nuevo monto.', 'El monto ' + this.monto.id + ' se ha creado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El monto ' + this.monto.id + ' no pudo ser creado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			}

		}
	}

}
