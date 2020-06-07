import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from 'src/app/domain/material';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  obtenerMateriales(){
    return this.firestore.collection('Materiales').snapshotChanges();
  }

  obtenerMaterial(tipoMaterial: string) {
		return this.firestore.collection('Materiales').doc(tipoMaterial).collection('Articulos').snapshotChanges();
  }

  guardarMaterial(material: Material) {
		return this.firestore.collection('Materiales').doc(material.Nombre).set({ Ficha: material.Ficha, Precio: material.Precio, Marca: material.Marca });
  }
  
  actualizarMaterial(nombreMaterial: string, material: any) {
		return this.firestore.collection('Materiales').doc(nombreMaterial).update(material);
  }

	eliminarMaterial(materialId: string, categoria: string) {
		return this.firestore.collection('Materiales').doc(categoria).collection('Articulos').doc(materialId).delete();
	}
  

}
