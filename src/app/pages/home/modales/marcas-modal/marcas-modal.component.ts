import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { MarcasService } from 'src/app/services/firebase/marcas.service';

@Component({
	selector: 'app-marcas-modal',
	templateUrl: './marcas-modal.component.html',
	styleUrls: ['./marcas-modal.component.css']
})
export class MarcasModalComponent implements OnInit {
	@Input()  modalReference: NgbModalRef;
	public materiales: Array<any> = [];

	constructor(
		private marcasService: MarcasService
	) { }

	ngOnInit(): void {
		this.obtenerMateriales();
	}

	obtenerMateriales() {
		this.materiales = new Array<any>();
		this.marcasService.obtenerMateriales().subscribe(response => {
		  response.forEach(material => {        
			this.marcasService.obtenerMaterial(material.payload.doc.id).subscribe(_response => {
			  _response.forEach(_material => {
				this.materiales.push({
				  id:material.payload.doc.id,
				  nombre: _material.payload.doc.id,
				  matData: _material.payload.doc.data()
				});
				
			  });
			}, _error => Swal.fire('Se presentó un error inesperado.', 'No se pudo obtener la información de los materiales debido a un error inesperado del sistema. \n Por favor contactese con el administrador del sistema.', 'error'));
		  });
		}, _error => Swal.fire('Se presento un error inesperado.', 'No se pudo obtener la información de los materiales debido a un error inesperado del sistema. \n Por favor contactese con el administrador del sistema.', 'error'));
	  }

	cerrarModal() {
		this.modalReference.close();
	}
}
