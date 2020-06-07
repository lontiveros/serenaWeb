import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ContenidoModalComponent } from './modales/contenido-modal/contenido-modal.component';
import Swal from 'sweetalert2';
import { MarcasService } from 'src/app/services/firebase/marcas.service';
import { MaterialesModalComponent } from './materiales-modal/materiales-modal.component';

@Component({
  selector: 'app-bo-materiales',
  templateUrl: './bo-materiales.component.html',
  styleUrls: ['./bo-materiales.component.css']
})
export class BoMaterialesComponent implements OnInit {
  public breadcrumbs: Array<any> = [];
	public materiales: Array<any> = [];
	private modalReference: NgbModalRef;

	constructor(
		private materialesService: MarcasService,
		private modalService: NgbModal
  ) { }
  
  ngOnInit(): void {
      this.breadcrumbs = [{ "title": "Administración de materiales" }]
      this.obtenerMateriales();
  }

  obtenerMateriales() {
    this.materiales = new Array<any>();
    this.materialesService.obtenerMateriales().subscribe(response => {
      response.forEach(material => {        
        this.materialesService.obtenerMaterial(material.payload.doc.id).subscribe(_response => {
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

  abrirModalMateriales(material: any = null) {		
		this.modalReference = this.modalService.open(MaterialesModalComponent, {
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
		this.modalReference.componentInstance.material = material;

		this.modalReference.result.then(_close => {
			this.obtenerMateriales();
		}, _dismiss => {});
  }
  
  eliminarMaterial(material: any) {
		Swal.fire({
			title: '¡Cuidado!',
			icon: 'warning',
			html: "¿Está seguro que desea eliminar este contenido? <br> Esto es irreversible y los datos se perderán.",
			showCancelButton: true,
			cancelButtonText: 'No',
			confirmButtonText: 'Sí'
		}).then((result) => {
			if (result.value) {
				this.materialesService.eliminarMaterial(material.nombre, material.id).then(()=> {
					this.obtenerMateriales();
				});				
			};
		});
	}
}
