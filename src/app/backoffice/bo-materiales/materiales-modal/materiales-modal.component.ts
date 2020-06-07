import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MarcasService } from 'src/app/services/firebase/marcas.service';
import Swal from 'sweetalert2'
import { Material } from 'src/app/domain/material';

@Component({
  selector: 'app-materiales-modal',
  templateUrl: './materiales-modal.component.html',
  styleUrls: ['./materiales-modal.component.css']
})
export class MaterialesModalComponent implements OnInit {
  @Input() modalReference: NgbModalRef;
  @Input() material: any;

  public modalTitle: string;
  public materialForm: FormGroup;
  public isFormSubmitted: boolean = false;
  public materiales: Array<any> = [];
  

  constructor(
    private formBuilder: FormBuilder,
		private materialService: MarcasService
  ) { }

  ngOnInit(): void {

    this.modalTitle = (this.material) ? "Editar material: " + this.material.nombre : "Nuevo contenido";
    this.initMaterialForm();
    this.obtenerMateriales();

    if (this.material){
      this.setMaterialesData(this.material)
    }
  }

  initMaterialForm() {
	this.materialForm = this.formBuilder.group({
		'nombre': ['', Validators.required],
		'marca': [''],
		'precio': ['', Validators.required],
		'ficha':['']
    });
  }

  obtenerMateriales() {
		this.materiales = new Array<any>();
		this.materialService.obtenerMateriales().subscribe(_response => {
      
      
			this.materiales = [];
			_response.forEach(_seccion => {
				this.materiales.push({
					id: _seccion.payload.doc.id,
					data: _seccion.payload.doc.data()
				})
      });
      
      
		}, _error => {
			Swal.fire("Se ha presentado un error inesperado", "No se pudo obtener la información de los materiales debido a un error inesperado del sistema. \n Por favor contacte con el administrador del sistema.");
		});
  }

  setMaterialesData(material: any) {  
    	this.materialForm.get('nombre').setValue(material.id)
		this.materialForm.get('marca').setValue(material.matData.Marca);
    	this.materialForm.get('precio').setValue(material.matData.Precio);
    	this.materialForm.get('ficha').setValue(material.matData.Ficha);
  }


  	cerrarModal() {
		this.modalReference.dismiss();
	}

	guardarContenido() {
		this.isFormSubmitted = true;

		if (this.materialForm.valid) {
			let material = new Material;
			material.Ficha = this.materialForm.get('ficha').value;
			material.Marca = this.materialForm.get('marca').value;
			material.Precio = this.materialForm.get('precio').value;
			

			if (this.material) {
				this.materialService.actualizarMaterial(this.material.id, material).then(_response => {
					Swal.fire('Se ha actualizado el material.', 'El material ' + material.Nombre + ' se ha actualizado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El material ' + material.Nombre + ' no pudo ser actualizado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			} else {
				this.materialService.guardarMaterial(material).then(_response => {
					Swal.fire('Se ha creado el material.', 'El material ' + material.Nombre + ' se ha creado satisfactoriamente.', 'success');
					this.modalReference.close();
				}).catch(_error => {
					Swal.fire('Se ha presentado un error inesperado.', 'El material ' + material.Nombre + ' no pudo ser creado debido a un error inesperado del sistema, por favor contacte con el administrador del sistema.', 'error');
				})
			}

    	}
	  }

}
