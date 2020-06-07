import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GaleriaGridComponent } from './galeria-grid/galeria-grid.component';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-galeria',
	templateUrl: './galeria.component.html',
	styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
	@Input() modalReference: NgbModalRef;
	@Input() proyecto: any;

	@ViewChild(GaleriaGridComponent) grid: GaleriaGridComponent;

	public modalTitle: string;
	public uploadTask: AngularFireUploadTask;
	public porcentaje: Observable<number>;
	public snapshot: Observable<any>;
	public descargaUrl: Observable<any>;
	public files: File[] = [];
	public isHovering: boolean;
	private fileCount: number = 1;

	constructor(
		private storage: AngularFireStorage
	) { }

	ngOnInit(): void {
		this.modalTitle = "Galería del proyecto: " + this.proyecto.obraData.nombre;
		this.obtenerImagenes();
	}

	obtenerImagenes() {}

	toggleHover(event: boolean) {
		this.isHovering = event;
	}

	onDrop(files: FileList) {
		for (let i = 0; i < files.length; i++) {
			const extension = files[i].type.split('/')[0];
		
			// Valida que sean imágenes
			if (extension != "image") {
				Swal.fire("Error", "Disculpe solo se permite subir imágenes", "error");
				return;
			} else {
				this.files.push(files.item(i));
			}
		}
	}
	
	cerrarModal() {
		this.modalReference.close();
	}

	actualizarGaleria() {
		if (this.fileCount == this.files.length) {
			this.grid.obtenerImagenes()
		} else {
			this.fileCount++;
		}
	}

}
