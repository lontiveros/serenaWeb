import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Proyecto } from 'src/app/domain/Proyecto';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root'
})
export class ProyectosService {

	constructor(
		private firestore: AngularFirestore,
		private firestorage: AngularFireStorage
	) { }

	/* Obtiene el contenido de un proyecto específic.
		@params 
		zonaProyecto -> El nombre de la zona en la que se ubica el proyecto.
		nombreProyecto -> El nombre del proyecto.
	
	obtenerProyecto(zonaProyecto: string, nombreProyecto: string) {
		return this.firestore.collection(zonaProyecto).doc(nombreProyecto)
	}
	*/

	obtenerProyectos() {
		return this.firestore.collection('Proyectos').snapshotChanges();
	}

	obtenerProyecto(zonaProyecto: string) {
		return this.firestore.collection('Proyectos').doc(zonaProyecto).collection('Obras').snapshotChanges();
	}

	guardarProyecto(proyecto: Proyecto) {
		return this.firestore.collection('Proyectos').doc(proyecto.zona).collection('Obras').add({ ...proyecto });
	}

	actualizarProyecto(proyectoId: string, proyecto: Proyecto) {
		return this.firestore.collection('Proyectos').doc(proyecto.zona).collection('Obras').doc(proyectoId).update({ ...proyecto });
	}

	eliminarProyecto(proyectoId: string, zona: string) {
		return this.firestore.collection('Proyectos').doc(zona).collection('Obras').doc(proyectoId).delete();
	}

	eliminarImagenes(proyectoNombre){
		let storageReference = this.firestorage.ref(proyectoNombre);
		
		storageReference.listAll().subscribe(_response => {
			if (_response.items.length > 0) {
				_response.items.forEach(_imagenes => {
					let path = `${proyectoNombre}/${_imagenes.name}`;
					let storageReference = this.firestorage.ref(path);
					storageReference.delete()
				});
			}
		});
	}

	guardarZona(zona: string) {
		this.guardarZonaEnProyecto(zona);
		return this.firestore.collection('Zonas').doc(zona).set({ descripcion: zona });
	}
	
	guardarZonaEnProyecto(zona: string): void {
		this.firestore.collection('Proyectos').doc(zona);
	}

	obtenerZonas() {
		return this.firestore.collection('Zonas').snapshotChanges();
	}

	guardarBarrio(barrio: string) {
		return this.firestore.collection('Barrios').doc(barrio).set({ descripcion: barrio });
	}

	obtenerBarrios() {
		return this.firestore.collection('Barrios').snapshotChanges();
	}

	guardarArea(area: string) {
		return this.firestore.collection('Areas').doc(area).set({ descripcion: area });
	}

	obtenerAreas() {
		return this.firestore.collection('Areas').snapshotChanges();
	}
}
