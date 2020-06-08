import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  public editorConfig: any = {};
  
  
  constructor(
    private formBuilder: FormBuilder,
		private contenidoService: ContenidoService
  ) { }

  	ngOnInit(): void {
		this.modalTitle = (this.contenido) ? "Editar contenido: " + this.contenido.id : "Nuevo contenido";
		this.initContenidoForm();
		this.editorConfig = {
			base_url: '/tinymce',
			language: 'es_MX',
			language_url : '/assets/lang/editor_es.js',
			suffix: '.min',
			height: 200,
			menubar: false,
			plugins: [
				'advlist autolink lists link image charmap print preview anchor',
				'searchreplace visualblocks code fullscreen',
				'insertdatetime media table paste code help wordcount'
			],
			toolbar:
				'undo redo | formatselect | bold italic | \
				alignleft aligncenter alignright alignjustify'
		}

		if (this.contenido){
			this.setContenidoData(this.contenido)
		}
	}

  initContenidoForm() {
		this.contenidoForm = this.formBuilder.group({
			'seccion':[''],
      		'titulo': [''],
			'texto': [''],
			'direccion': [''],
			'telPrefijo': [''],
			'telNumero': [''],
			'email': ['']
    });
  }
  
  setContenidoData(contenido: any) {
	  this.contenidoForm.get('titulo').setValue(contenido.contenidosData.titulo);
	
	  if (contenido.id == "Nosotros") {
		this.contenidoForm.get('seccion').setValue(contenido.contenidosData.seccion);
		this.contenidoForm.get('texto').setValue(contenido.contenidosData.text);
	}

	if (contenido.id == "Contacto") {
		this.contenidoForm.get('direccion').setValue(contenido.contenidosData.direccion);
		this.contenidoForm.get('telPrefijo').setValue(contenido.contenidosData.telPrefijo);
		this.contenidoForm.get('telNumero').setValue(contenido.contenidosData.telNumero);
		this.contenidoForm.get('email').setValue(contenido.contenidosData.email);
	}
  }

  cerrarModal() {
		this.modalReference.dismiss();
  }
  
  guardarContenido() {
		this.isFormSubmitted = true;
		if (this.contenidoForm.valid) {
			let contenido:any = {};
			contenido.seccion = this.contenido.id;
			contenido.titulo = this.contenidoForm.get('titulo').value;

			if (this.contenido.id == "Nosotros") {
				contenido.text = this.contenidoForm.get('texto').value;
			}  else {
				contenido.direccion = this.contenidoForm.get('direccion').value;
				contenido.telPrefijo = this.contenidoForm.get('telPrefijo').value;
				contenido.telNumero = this.contenidoForm.get('telNumero').value;
				contenido.email = this.contenidoForm.get('email').value;
			}

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
