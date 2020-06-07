import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/domain/Proyecto';
import { ProyectosService } from 'src/app/services/firebase/proyectos.service';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-proyecto-modal',
	templateUrl: './proyecto-modal.component.html',
	styleUrls: ['./proyecto-modal.component.css']
})
export class ProyectoModalComponent implements OnInit {
	@Input() modalReference: NgbModalRef;
	@Input() proyecto: any;

	public modalTitle: string;
	public proyectoForm: FormGroup;
	public isFormSubmitted: boolean = false;
	public zonas: Array<any> = [];
	public barrios: Array<any> = [];
	public areas: Array<any> = [];
	public isEdit: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private proyectoService: ProyectosService
	) { }

	ngOnInit(): void {
		this.modalTitle = (this.proyecto) ? "Editar proyecto: " + this.proyecto.obraData.nombre : "Nuevo proyecto";
		this.initProyectoForm();
		this.obtenerZonas();
		this.obtenerBarrios();
		this.obtenerAreas();
		if (this.proyecto) {
			this.setProyectoData(this.proyecto.obraData)
			this.isEdit = !this.isEdit;
		}
	}

	initProyectoForm() {
		this.proyectoForm = this.formBuilder.group({
			// Datos del proyecto.
			'nombre': ['', Validators.required],
			'zona': ['', Validators.required],
			'barrio': [''],
			'area': [''],
			'lote': [''],
			
			// Datos de la superficie.
			'cubierta': [0],
			'semicubierta': [0],
			'pileta': [0],
			'total': [0],
			
			// Datos de las plantas.
			'plantas': [0],

			// Datos de los locales.
			'estar': [0],	
			'comedor': [0],
			'cocina': [0],
			'dormitorio': [0],
			'vestidor': [0],
			'estudio': [0],
			'bano': [0],
			'toilette': [0],
			'lavadero': [0],
			'baulera': [0],
			'galeria': [0]
		})
	}

	setProyectoData(proyecto: Proyecto) {
		this.proyectoForm.get('nombre').setValue(proyecto.nombre);
		this.proyectoForm.get('zona').setValue(proyecto.zona);
		this.proyectoForm.get('barrio').setValue(proyecto.barrio);
		this.proyectoForm.get('area').setValue(proyecto.area);
		this.proyectoForm.get('lote').setValue(proyecto.lote);

		this.proyectoForm.get('cubierta').setValue(proyecto.superficie.cubierta);
		this.proyectoForm.get('semicubierta').setValue(proyecto.superficie.semicubierta);
		this.proyectoForm.get('pileta').setValue(proyecto.superficie.pileta);
		this.proyectoForm.get('total').setValue(proyecto.superficie.total);
		
		this.proyectoForm.get('plantas').setValue(proyecto.plantas);
		this.proyectoForm.get('estar').setValue(proyecto.locales.estar);
		this.proyectoForm.get('comedor').setValue(proyecto.locales.comedor);
		this.proyectoForm.get('cocina').setValue(proyecto.locales.cocina);
		this.proyectoForm.get('dormitorio').setValue(proyecto.locales.dormitorio);
		this.proyectoForm.get('vestidor').setValue(proyecto.locales.vestidor);
		this.proyectoForm.get('estudio').setValue(proyecto.locales.estudio);
		this.proyectoForm.get('bano').setValue(proyecto.locales.bano);
		this.proyectoForm.get('toilette').setValue(proyecto.locales.toilette);
		this.proyectoForm.get('lavadero').setValue(proyecto.locales.lavadero);
		this.proyectoForm.get('baulera').setValue(proyecto.locales.baulera);
		this.proyectoForm.get('galeria').setValue(proyecto.locales.galeria);

		this.proyectoForm.get('zona').disable();
	}

	guardarProyecto() {
		this.isFormSubmitted = true;

		if (this.proyectoForm.valid) {
			let proyecto = new Proyecto;
			proyecto.nombre = this.proyectoForm.get('nombre').value;
			proyecto.zona = this.proyectoForm.get('zona').value;
			proyecto.barrio = this.proyectoForm.get('barrio').value;
			proyecto.area = this.proyectoForm.get('area').value;
			proyecto.lote = this.proyectoForm.get('lote').value;
			proyecto.superficie = {
				cubierta: this.proyectoForm.get('cubierta').value || 0,
				semicubierta: this.proyectoForm.get('semicubierta').value || 0,
				pileta: this.proyectoForm.get('pileta').value || 0,
				total: this.proyectoForm.get('total').value || 0
			}
			proyecto.plantas = this.proyectoForm.get('plantas').value,
			proyecto.locales = {
				estar: this.proyectoForm.get('estar').value || 0,
				comedor: this.proyectoForm.get('comedor').value || 0,
				cocina: this.proyectoForm.get('cocina').value || 0,
				dormitorio: this.proyectoForm.get('dormitorio').value || 0,
				vestidor: this.proyectoForm.get('vestidor').value || 0,
				estudio: this.proyectoForm.get('estudio').value || 0,
				bano: this.proyectoForm.get('bano').value || 0,
				toilette: this.proyectoForm.get('toilette').value || 0,
				lavadero: this.proyectoForm.get('lavadero').value || 0,
				baulera: this.proyectoForm.get('baulera').value || 0,
				galeria: this.proyectoForm.get('galeria').value || 0
			}

			if (this.proyecto) {
				this.proyectoService.actualizarProyecto(this.proyecto.id, proyecto).then(_response => {
					Swal.fire('Se ha actualizado el proyecto.', 'El proyecto ' + proyecto.nombre + ' se ha actualizado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El proyecto ' + proyecto.nombre + ' no pudo ser actualizado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			} else {
				this.proyectoService.guardarProyecto(proyecto).then(_response => {
					Swal.fire('Se ha creado el proyecto.', 'El proyecto ' + proyecto.nombre + ' se ha creado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El proyecto ' + proyecto.nombre + ' no pudo ser creado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			}

		}
	}

	cerrarModal() {
		this.modalReference.dismiss();
	}

	calcularTotal() {
		let cubierta = parseFloat(this.proyectoForm.get('cubierta').value) || 0;
		let semicubierta = parseFloat(this.proyectoForm.get('semicubierta').value) || 0;

		this.proyectoForm.get('total').setValue(cubierta + semicubierta);
	}

	agregarZona() {
		let zona = Swal.fire({
			title: 'Agregar zona',
			input: "text",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Guardar",
			inputValidator: (value) => {
				if (!value) {
					return 'El campo no puede estar vacío.';
				}
			}
		});

		zona.then(_result => {
			if (_result.value) {
				this.proyectoService.guardarZona(_result.value);
			}
		});

		this.obtenerZonas();
	}

	obtenerZonas() {
		this.zonas = new Array<any>();
		this.proyectoService.obtenerZonas().subscribe(_response => {
			this.zonas = [];
			_response.forEach(_zona => {
				this.zonas.push({
					id: _zona.payload.doc.id,
					data: _zona.payload.doc.data()
				})
			});
		}, _error => {
			Swal.fire("Se ha presentado un error inesperado", "No se pudo obtener la información de las zonas debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.");
		});
	}

	agregarBarrio() {
		let barrio = Swal.fire({
			title: 'Agregar barrio',
			input: "text",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Guardar",
			inputValidator: (value) => {
				if (!value) {
					return 'El campo no puede estar vacío.';
				}
			}
		});

		barrio.then(_result => {
			if (_result.value) {
				this.proyectoService.guardarBarrio(_result.value);
			}
		});

		this.obtenerBarrios();
	}

	obtenerBarrios() {
		this.barrios = new Array<any>();
		this.proyectoService.obtenerBarrios().subscribe(_response => {
			this.barrios = [];
			_response.forEach(_barrio => {
				this.barrios.push({
					id: _barrio.payload.doc.id,
					data: _barrio.payload.doc.data()
				})
			});
		}, _error => {
			Swal.fire("Se ha presentado un error inesperado", "No se pudo obtener la información de los barrios debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.");
		});
	}

	agregarArea() {
		let area = Swal.fire({
			title: 'Agregar área',
			input: "text",
			showCancelButton: true,
			cancelButtonText: "Cancelar",
			confirmButtonText: "Guardar",
			inputValidator: (value) => {
				if (!value) {
					return 'El campo no puede estar vacío.';
				}
			}
		});

		area.then(_result => {
			if (_result.value) {
				this.proyectoService.guardarArea(_result.value);
			}
		});

		this.obtenerAreas();
	}

	obtenerAreas() {
		this.areas = new Array<any>();
		this.proyectoService.obtenerAreas().subscribe(_response => {
			this.areas = [];
			_response.forEach(_area => {
				this.areas.push({
					id: _area.payload.doc.id,
					data: _area.payload.doc.data()
				})
			});
		}, _error => {
			Swal.fire("Se ha presentado un error inesperado", "No se pudo obtener la información de las áreas debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.");
		});
	}

}
