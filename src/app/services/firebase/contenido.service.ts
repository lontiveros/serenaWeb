import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contenido } from 'src/app/domain/contenido';

@Injectable({
	providedIn: 'root'
})
export class ContenidoService {

	constructor(
		private firestore: AngularFirestore
	) { }

	/* Crear un contenido.
		@params
		nombreContenido -> El nombre de la sección que se crea.
		contenido -> Objeto que se crea (Nombre, Texto).
	*/
	crearContenido(nombreContenido: string, contenido: any) {
		return this.firestore.collection('Contenidos').doc(nombreContenido).set(contenido);
	}

	// Obtiene el listado con todos los contenidos.
	obtenerContenidos() {
		return this.firestore.collection('Contenidos').snapshotChanges();
	}

	/* Actualiza cada contenido de la página.
		@params 
		nombreContenido -> El nombre de la sección que se actualiza.
		contenido -> Objeto que se edita (Nombre, Texto).
	*/
	actualizarContenido(nombreContenido: string, contenido: Contenido) {		
		return this.firestore.collection('Contenidos').doc(nombreContenido).update({text: contenido.text, titulo: contenido.titulo});
	}

	/* Obtiene el contenido de una sección específica.
		@params 
		nombreContenido -> El nombre de la sección que se quiere obtener.
	*/
	obtenerContenido(nombreContenido: string) {
		return this.firestore.collection('Contenidos').doc(nombreContenido).snapshotChanges();
	}

	guardarContenido(contenido: Contenido) {
		return this.firestore.collection('Contenidos').doc(contenido.titulo).set({ text: contenido.text, titulo: contenido.titulo });
	}

	eliminarContenido(Seccion: string) {		
		return this.firestore.collection('Contenidos').doc(Seccion).delete();
	}

	guardarSeccionEnContenido(seccion: string): void {
		this.firestore.collection('Contenidos').doc(seccion);
	}

	guardarSeccion(Seccion: string) {
		this.guardarSeccionEnContenido(Seccion);
		return this.firestore.collection('Secciones').doc(Seccion).set({ descripcion: Seccion });
	}
	obtenerSecciones() {
		return this.firestore.collection('Secciones').snapshotChanges();
	}
}
