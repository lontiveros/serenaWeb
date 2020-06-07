import { Component, OnInit, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
	selector: 'app-proyecto-modal',
	templateUrl: './proyecto-modal.component.html',
	styleUrls: ['./proyecto-modal.component.css']
})
export class ProyectoInfoModalComponent implements OnInit {
	@Input()  modalReference: NgbModalRef;
	@Input() proyecto: any;
	@Input() proyectoImagenes: any;
	public currentImage: any;
	public currentImageIndex: number;

	constructor(
		private lightboxService: Lightbox,
		private galleryConfig: LightboxConfig,
	) { }

	ngOnInit(): void {
		this.currentImage = this.proyectoImagenes[0].src;
	}

	get tieneSuperficies() {
		return (this.proyecto.superficie.cubierta != 0 || this.proyecto.superficie.semicubierta != 0 || this.proyecto.superficie.pileta != 0);
	}

	get tieneLocales() {
		return (
			this.proyecto.locales.estar != 0 ||
			this.proyecto.locales.comedor != 0 ||
			this.proyecto.locales.cocina != 0 ||
			this.proyecto.locales.dormitorio != 0 ||
			this.proyecto.locales.vestidor != 0 ||
			this.proyecto.locales.estudio != 0 ||
			this.proyecto.locales.bano != 0 ||
			this.proyecto.locales.toilette != 0 ||
			this.proyecto.locales.lavadero != 0 ||
			this.proyecto.locales.baulera != 0 ||
			this.proyecto.locales.galeria != 0 
		)
	}

	cambiarImagen(imagenSrc: string, imagenIndex: number) {
		this.currentImage = imagenSrc;
		this.currentImageIndex = imagenIndex;
	}

	zoomImagen() {
		this.galleryConfig.centerVertically = true;
		this.galleryConfig.disableScrolling = true;
		this.galleryConfig.alwaysShowNavOnTouchDevices = true;

		this.lightboxService.open(this.proyectoImagenes, this.currentImageIndex);
	}

	close() {
		this.lightboxService.close();
	}
	
	cerrarModal() {
		this.modalReference.close();
	}
}
