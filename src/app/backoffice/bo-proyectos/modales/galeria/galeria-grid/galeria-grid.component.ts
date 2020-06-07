import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-galeria-grid',
	templateUrl: './galeria-grid.component.html',
	styleUrls: ['./galeria-grid.component.css']
})
export class GaleriaGridComponent implements OnInit {
	@Input() proyectoNombre: string;

	public imagenes: Array<any> = [];

	constructor(
		private firestorage: AngularFireStorage,
		private lightboxService: Lightbox,
		private galleryConfig: LightboxConfig
	) { }

	ngOnInit(): void {
		this.obtenerImagenes();
	}

	obtenerImagenes() {
		this.galleryConfig.centerVertically = true;
		this.galleryConfig.disableScrolling = true;
		this.galleryConfig.alwaysShowNavOnTouchDevices = true;

		const path = `${this.proyectoNombre}`;
		let storageReference = this.firestorage.ref(path);
		storageReference.listAll().subscribe(_response => {
			this.imagenes = new Array<any>();
			_response.items.forEach(_imagenes => {
				_imagenes.getDownloadURL().then(_url => {
					this.imagenes.push({
						src: _url,
						caption: this.proyectoNombre + " / " + _imagenes.name,
						name: _imagenes.name
					});
				});
			});
		}, _error => {
			Swal.fire("Error inesperado", "Ocurrió un error inesperado obteniendo las imágenes. \n Contacte al administrador del sistema", "error");
		});
	}

	abrirFoto(fotoIndex: number) {
		this.lightboxService.open(this.imagenes, fotoIndex);
	}

	close() {
		this.lightboxService.close();
	}

	eliminarImagen(nombreImagen: string) {
		const path = `${this.proyectoNombre}/${nombreImagen}`;
		let storageReference = this.firestorage.ref(path);
		Swal.fire({
			title: '¡Cuidado!',
			icon: 'warning',
			html: "¿Está seguro que desea eliminar esta imagen? <br> Esto es irreversible y la imagen no podrá ser recuperada.",
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Sí'
		}).then((result) => {
			if (result.value) {
				storageReference.delete().subscribe(_success => {
					Swal.fire("Imagen eliminada", "La imagen fue eliminada con éxito", "success");
					this.obtenerImagenes();
				}, _error => {
					Swal.fire("Error inesperado", "Ocurrió un error inesperado y no se pudo borrar la imagen \n Contacte al administrador del sistema", "error");
				})
			};
		});
	}
}
