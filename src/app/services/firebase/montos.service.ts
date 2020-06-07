import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MontosService {

  constructor(
    private firestore: AngularFirestore
    ) { }


  obtenerMontos() {
		return this.firestore.collection('montos').snapshotChanges();
  }
  
  obtenerMonto(nombreMonto: string) {
		return this.firestore.collection('montos').doc(nombreMonto).snapshotChanges();
  }

  guardarMonto(nombreMonto:string,valor:number) {
		return this.firestore.collection('montos').doc(nombreMonto).set({ valor: valor });
  }
  
  eliminarMonto(nombreMonto: string) {
		return this.firestore.collection('montos').doc(nombreMonto).delete();
  }
  
  actualizarMonto(nombreMonto: string, monto: any) {
		return this.firestore.collection('montos').doc(nombreMonto).update(monto);
  }

}
