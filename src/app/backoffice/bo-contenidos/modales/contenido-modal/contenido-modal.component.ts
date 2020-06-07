import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Contenido } from 'src/app/domain/contenido';
import { ContenidoService } from 'src/app/services/firebase/contenido.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contenido-modal',
  templateUrl: './contenido-modal.component.html',
  styleUrls: ['./contenido-modal.component.css']
})
export class ContenidoModalComponent implements OnInit {
  @Input() modalReference: NgbModalRef;
  @Input() contenido: any;

  public modalTitle: string;
  public contenidoForm: FormGroup;
  public isFormSubmitted: boolean = false;
  public secciones: Array<any> = [];
  
  
  constructor(
    private formBuilder: FormBuilder,
		private contenidoService: ContenidoService
  ) { }

  ngOnInit(): void {
    this.modalTitle = (this.contenido) ? "Editar proyecto: " + this.contenido.id : "Nuevo contenido";
    this.initContenidoForm();
    this.obtenerSecciones();

    if (this.contenido){
      this.setContenidoData(this.contenido)
    }
  }

  initContenidoForm() {
		this.contenidoForm = this.formBuilder.group({
			'seccion':[''],
      		'titulo': [''],
			'texto': ['']
    });
  }

  obtenerSecciones() {
		this.secciones = new Array<any>();
		this.contenidoService.obtenerSecciones().subscribe(_response => {      
			this.secciones = [];
			_response.forEach(_seccion => {
				this.secciones.push({
					id: _seccion.payload.doc.id,
					data: _seccion.payload.doc.data()
				})
      });
      
      
		}, _error => {
			Swal.fire("Se ha presentado un error inesperado", "No se pudo obtener la información de las secciones debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.");
		});
  }

  agregarSeccion() {
		let seccion = Swal.fire({
			title: 'Agregar seccion',
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

		seccion.then(_result => {
			if (_result.value) {
				this.contenidoService.guardarSeccion(_result.value);
			}
		});

		this.obtenerSecciones();
	}
  
  setContenidoData(contenido: any) {    
	this.contenidoForm.get('seccion').setValue(contenido.contenidosData.seccion);
	this.contenidoForm.get('titulo').setValue(contenido.contenidosData.titulo);
    this.contenidoForm.get('texto').setValue(contenido.contenidosData.text);
  }

  cerrarModal() {
		this.modalReference.dismiss();
  }
  
  guardarContenido() {
		this.isFormSubmitted = true;

		if (this.contenidoForm.valid) {
			let contenido = new Contenido;
			contenido.seccion = this.contenidoForm.get('seccion').value;
			contenido.titulo = this.contenidoForm.get('titulo').value;
			contenido.text = this.contenidoForm.get('texto').value;
			//console.log(contenido);
			
			

			if (this.contenido) {
				this.contenidoService.actualizarContenido(contenido.seccion, contenido).then(_response => {
					Swal.fire('Se ha actualizado el contenido.', 'El contenido de ' + contenido.seccion + ' se ha actualizado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El contenido de ' + contenido.seccion + ' no pudo ser actualizado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
					
					
				})
			} else {
				this.contenidoService.guardarContenido(contenido).then(_response => {
					Swal.fire('Se ha creado el contenido.', 'El contenido de ' + contenido.seccion + ' se ha creado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El contenido de ' + contenido.seccion + ' no pudo ser creado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			}

    }
  }

}
